var fs = require('fs');
var pdf = require('html-pdf');

exports.convertHtmlToPdf = function (courseDetail) {
    return new Promise((resolve, reject) => {
        const htmlCertificate = require('./certificateTemplate').getCertificateTemplate(courseDetail);
        var options = { format: 'Letter' };
        pdf.create(htmlCertificate, options).toFile(`./uploads/certificate/${courseDetail.registration_id}.pdf`, function (err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    })

}