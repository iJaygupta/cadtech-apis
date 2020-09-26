var fs = require('fs');
var pdf = require('html-pdf');

exports.convertHtmlToPdf = function (courseDetail) {
    const htmlCertificate = require('./certificateTemplate').getCertificateTemplate(courseDetail);
    var options = { format: 'Letter' };

    pdf.create(htmlCertificate, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}