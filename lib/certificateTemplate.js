exports.getCertificateTemplate = function (courseDetails) {
    let { fullName, courseName, grade, date } = courseDetails;
    return `<div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
    <div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
        <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
        <br><br>
        <span style="font-size:25px"><i>This is to certify that</i></span>
        <br><br>
        <span style="font-size:30px"><b>${fullName}</b></span><br /><br />
        <span style="font-size:25px"><i>has completed the course</i></span> <br /><br />
        <span style="font-size:30px">${courseName}</span> <br /><br />
        <span style="font-size:20px">with score of <b>${grade}</b></span> <br /><br /><br /><br />
        <span style="font-size:25px"><i>dated</i></span><br>
        ${date}
        <span style="font-size:30px">$dt</span>
    </div>
</div>`
}