const multer = require("multer");
const fs = require("fs");
const randomstring = require("randomstring");
const path = require("path");
const s3 = require('s3');
const AWS = require('aws-sdk');
var XLSX = require('xlsx');

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const awsS3 = new AWS.S3({
    apiVersion: '2006-03-01'
});



// var client = s3.createClient({
//     maxAsyncS3: 20, // this is the default
//     s3RetryCount: 3, // this is the default
//     s3RetryDelay: 1000, // this is the default
//     multipartUploadThreshold: 20971520, // this is the default (20 MB)
//     multipartUploadSize: 15728640, // this is the default (15 MB)
//     s3Options: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: process.env.AWS_REGION_NAME
//     },
// });



exports.uploadFilesLocal = function (folderName, subFolderName, userId, request, response, callback) {
    try {
        var storage = multer.diskStorage({
            destination: function (request, response, callback) {
                var root = './uploads';
                if (!fs.existsSync(root)) {
                    fs.mkdirSync(root);
                }
                var dir = root + '/' + folderName + '/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                dir = root + '/' + folderName + '/' + subFolderName + '/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                dir = root + '/' + folderName + '/' + subFolderName + '/' + userId + "/";
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                callback(null, dir);

            },
            filename: function (req, file, callback) {
                var convFileName = Date.now() + randomstring.generate({ length: 4, charset: 'alphabetic' }) + path.extname(file.originalname);
                callback(null, convFileName);
            },
            limits: "limit"
        });

        var upload = multer({
            storage: storage
        }).any();

        upload(request, response, callback);
    } catch (error) {
        console.log("from multer", error);

    }

}

exports.downloadFileFromS3 = function (key) {
    return new Promise((resolve, reject) => {
        var param = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        };
        awsS3.getObject(param, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }

        })
    })
}

exports.uploadFileOnS3 = function (folderPath, localFolderName, fileName) {
    const localFilePath = localFolderName + "/" + fileName;
    return new Promise((resolve, reject) => {
        fs.readFile(localFilePath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: folderPath + "/" + fileName,
                    Body: JSON.stringify(data, null, 2)
                };
                awsS3.u(params, function (error, data) {
                    if (error) {
                        return reject(error);
                    }
                    console.log(`File uploaded successfully at ${data.Location}`);
                    resolve(data);
                });
            }
        })
    })
}

exports.readBulkFile = function (uploadedFile) {
    //convert array data into json
    var headers = [];
    var sheet = uploadedFile;
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;
    /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({
            c: C,
            r: R
        })];
        /* find the cell in the first row */

        var hdr = C; // replaced header with coulumn name
        if (cell && cell.t) {
            hdr = XLSX.utils.format_cell(cell);
        }
        headers.push(hdr);
    }
    // For each sheets, convert to json.
    var data = XLSX.utils.sheet_to_json(uploadedFile);
    if (data.length > 0) {
        data.forEach(function (row) {
            // Set empty cell to blank string ' '.
            headers.forEach(function (hd) {
                if (row[hd] === undefined) {
                    row[hd] = null;
                }
            });
        });
    }
    return data;
}