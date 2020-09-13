exports.emailTemplate = function (type, data) {
    var template = `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
    
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">
    
        <!-- CSS Reset : BEGIN -->
        <style>
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
                background: #201e1e;
            }
    
            /* What it does: Stops email clients resizing small text. */
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            /* What it does: Centers email on Android 4.4 */
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
    
            /* What it does: Stops Outlook from adding extra spacing to tables. */
    
            /* What it does: Fixes webkit padding issue. */
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }
    
            /* What it does: Uses a better rendering method when resizing images in IE. */
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
            a {
                text-decoration: none;
            }
    
            /* What it does: A work-around for email clients meddling in triggered links. */
            *[x-apple-data-detectors],
            /* iOS */
            .unstyle-auto-detected-links *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
            .a6S {
                display: none !important;
                opacity: 0.01 !important;
            }
    
            /* What it does: Prevents Gmail from changing the text color in conversation threads. */
            .im {
                color: inherit !important;
            }
    
            /* If the above doesn't work, add a .g-img class to any image in question. */
            img.g-img+div {
                display: none !important;
            }
    
            /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
            /* Create one of these media queries for each additional viewport size you'd like to fix */
    
            /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
            @media only screen and (min-width: 320px) and (max-width: 374px) {
                u~div .email-container {
                    min-width: 320px !important;
                }
            }
    
            /* iPhone 6, 6S, 7, 8, and X */
            @media only screen and (min-width: 375px) and (max-width: 413px) {
                u~div .email-container {
                    min-width: 375px !important;
                }
            }
    
            /* iPhone 6+, 7+, and 8+ */
            @media only screen and (min-width: 414px) {
                u~div .email-container {
                    min-width: 414px !important;
                }
            }
        </style>
    
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
        <style>
            .primary {
                background: #583504;
            }
    
            .bg_white {
                background: #ffffff;
            }
    
            .bg_light {
                background: #fafafa;
            }
    
            .bg_black {
                background: #242222;
            }
    
            .bg_dark {
                background: rgba(100, 75, 75, 0.8);
            }
    
            .bg_dark-otp {
                background: rgba(216, 187, 26, 0.8);
            }
    
            .email-section {
                padding: 2em;
            }
    
            /*BUTTON*/
            .btn {
                padding: 10px 15px;
            }
    
            .btn.btn-primary {
                border-radius: 30px;
                background: #f3a333;
                color: #ffffff;
            }
    
    
    
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font-family: 'Playfair Display', serif;
                color: #000000;
                margin-top: 0;
            }
    
            body {
                font-family: 'Montserrat', sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 1.8;
                color: rgba(0, 0, 0, .4);
            }
    
            a {
                color: #f3a333;
            }
    
    
            /*LOGO*/
    
            .logo h1 {
                margin: 0;
            }
    
            .logo h1 a {
                color: #000;
                font-size: 20px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: 'Montserrat', sans-serif;
            }
    
            /*HERO*/
            .hero {
                position: relative;
            }
    
            .hero .text {
                color: rgba(255, 255, 255, .8);
            }
    
            .hero .text h2 {
                color: #ffffff;
                font-size: 30px;
                margin-bottom: 0;
            }
    
    
            /*HEADING SECTION*/
    
            .heading-section h2 {
                color: #000000;
                font-size: 28px;
                margin-top: 0;
                line-height: 1.4;
            }
    
            .heading-section .subheading {
                margin-bottom: 20px !important;
                display: inline-block;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: rgba(0, 0, 0, .4);
                position: relative;
            }
    
            .heading-section .subheading::after {
                position: absolute;
                left: 0;
                right: 0;
                bottom: -10px;
                content: '';
                width: 100%;
                height: 2px;
                background: #f3a333;
                margin: 0 auto;
            }
    
            .heading-section-white {
                color: rgba(255, 255, 255, .8);
            }
    
            .heading-section-white h2 {
                font-size: 28px;
                font-family: 'Montserrat', sans-serif;
                line-height: 1;
                padding-bottom: 0;
            }
    
            .heading-section-white h2 {
                color: #ffffff;
            }
    
            .heading-section-white .subheading {
                margin-bottom: 0;
                display: inline-block;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: rgba(255, 255, 255, .4);
            }
    
    
            .icon {
                text-align: center;
            }
    
            /*SERVICES*/
            .text-services {
                padding: 10px 10px 0;
                text-align: center;
            }
    
            .text-services h3 {
                font-size: 20px;
            }
    
            /*BLOG*/
            .text-services .meta {
                text-transform: uppercase;
                font-size: 14px;
            }
    
            /*TESTIMONY*/
            .text-testimony .name {
                margin: 0;
            }
    
            .text-testimony .position {
                color: rgba(0, 0, 0, .3);
    
            }
    
    
            /*VIDEO*/
            .img {
                width: 100%;
                height: auto;
                position: relative;
            }
    
            .img .icon {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                bottom: 0;
                margin-top: -25px;
            }
    
            .img .icon a {
                display: block;
                width: 60px;
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -25px;
            }
    
    
    
            /*COUNTER*/
            .counter-text {
                text-align: center;
            }
    
            .counter-text .num {
                display: block;
                color: #ffffff;
                font-size: 34px;
                font-weight: 700;
            }
    
            .counter-text .name {
                display: block;
                color: rgba(255, 255, 255, .9);
                font-size: 13px;
            }
    
    
            /*FOOTER*/
    
            .footer {
                color: rgba(255, 255, 255, .5);
    
            }
    
            .footer .heading {
                color: #ffffff;
                font-size: 20px;
            }
    
            .footer ul {
                margin: 0;
                padding: 0;
            }
    
            .footer ul li {
                list-style: none;
                margin-bottom: 10px;
            }
    
            .footer ul li a {
                color: rgba(255, 255, 255, 1);
            }
    
    
            @media screen and (max-width: 500px) {
    
                .icon {
                    text-align: left;
                }
    
                .text-services {
                    padding-left: 0;
                    padding-right: 20px;
                    text-align: left;
                }
    
            }
        </style>
    
    
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important;">
        <div style="width: 100%; background-color: #f1f1f1;">
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="margin: auto;">
                    <tr>
                        <td class="bg_white">
                            <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                    <td class="bg_dark email-section" style="text-align:center;">
                                        <div class="heading-section heading-section-white">
                                            <span class="subheading">Welcome</span>
                                            <h2>Welcome To Cadtech</h2>
                                            <p>A Software Solution to learn technologies online </p>
                                        </div>
                                    </td>
                                </tr>
                                 ${getEmailBody(type, data)}
                            </table>
                        </td>
                    </tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="margin: auto;">
                    <tr>
                        <td valign="middle" class="bg_black footer email-section">
                            <table>
                                <tr>
                                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td style="text-align: left; padding-right: 10px;">
                                                    <h3 class="heading">Cadtech</h3>
                                                    <p>A online platform where learning is maked simple. Our cources and
                                                        live classes help you to achieve bright furture.
    
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                                    <h3 class="heading">Contact Info</h3>
                                                    <ul>
                                                        <li><span class="text">Sushant Lok-11 Grugaon-122001,
                                                                INDIA</span></li>
                                                        <li><span class="text">+91-9988776634</span></a></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td style="text-align: left; padding-left: 10px;">
                                                    <h3 class="heading">Useful Links</h3>
                                                    <ul>
                                                        <li><a href="#">About Us</a></li>
                                                        <li><a href="#">Live Class</a></li>
                                                        <li><a href="#">Cources</a></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" class="bg_black footer email-section">
                            <table>
                                <tr>
                                    <td valign="top" width="33.333%">
                                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td style="text-align: left; padding-right: 10px;">
                                                    <p>&copy; 2020 Cadtech. All Rights Reserved</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="top" width="33.333%">
                                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                            <tr>
                                                <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                                                    <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
    
            </div>
        </div>
    </body>
    
    </html>`
    return template;
}


function getEmailBody(type, data) {
    let body = '';
    switch (type) {
        case 'registration':
            body = ` <div>
            <tr>
                <td class="bg_white email-section">
                    <div class="heading-section" style="text-align: center; padding: 0 30px;">
                        <span class="subheading">Services</span>
                        <h2>Our Services</h2>
                        <p></p>
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top" width="50%" style="padding-top: 20px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                    <tr>
                                        <td class="icon">
                                            <img src="images/001-diet.png" alt=""
                                                style="width: 60px; max-width: 600px; height: auto; margin: auto; display: block;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-services">
                                            <h3>Live Class</h3>
                                            <p>To learn more attend our live face to face classes
                                                towords a bright future.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td valign="top" width="50%" style="padding-top: 20px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                    <tr>
                                        <td class="icon">
                                            <img src="images/003-recipe-book.png" alt=""
                                                style="width: 60px; max-width: 600px; height: auto; margin: auto; display: block;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-services">
                                            <h3>Courses</h3>
                                            <p>We facilitate wide range of cources to fulfill your
                                                requirement
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </div>`
            break;
        case 'forgotPassword':
            body = ` <div>
            <div class="bg_white email-section">
                <div  style="text-align: center; padding: 0 30px;">
                   <p  class="thankemail">
                    Please Click below Link to Complete your Forgot Password to your cadtech account.
                    This is valid for next ${process.env.EMAIL_OTP_VALID_TIME} minutes and can be used just once.
                       </p >
                    </br>
                      <h2 >
                      <a href="${data}" target="_blank">Verification Link</a>
                        </h2>
                </div> 
            </div>
        
    </div>`
            break;
        case 'contactUs':
            body = `  <div>
                            
            <div class="bg_white email-section">
                <div class="heading-section" style="text-align: center; padding: 0 30px;">
                    <span class="subheading">Thank You</span>
                <div  style="text-align: center; padding: 0 30px;">
                    
                   <p  class="thankemail">
                    Thank you for filling out your information!                                                                                                                                          
                    We have received your detail and appreciate you contacting us One of our staff will get back in touch with you soon!
                    
                       </p >
                       <h4>
                       <p class="thankemail"> Have a great day!</p>
                    </h4>
                   
            
                </div>
                
            
            </div>
        </div>`
            break;
        case 'otp':
            body = ` <div>
                            
            <div class="bg_white email-section">
              
                <div  style="text-align: center; padding: 0 30px;">
                    <h2 >
                        <p class="thankemail">  OTP : ${data}</p></h2>
                   <p  class="thankemail">
                    Please Use this OTP(One-Time-Password) to Complete your Sign in to your cadtech account.
                    This is valid for next 10 minutes and can be used just once.
                       </p >
                    </br>
                       <h4>
                       <p class="thankemail"> Thank You..</p>
                       </h4>
                </div> 
            </div>
        
    </div>`
            break;
        case 'subscribe':
            body = `  <div>
                            
            <div class="bg_white email-section">
                <div class="heading-section" style="text-align: center; padding: 0 30px;">
                    <span class="subheading">Thank You</span>
                <div  style="text-align: center; padding: 0 30px;">
                    
                   <p  class="thankemail">
                    Thank you for subscribing to our newsletter!                                                                                                                                          
                    Now you will receive all our news and updates!
                    
                       </p >
                       <h4>
                       <p class="thankemail"> Have a great day!</p>
                    </h4>
                   
            
                </div>
                
            
            </div>
        </div>`
            break;
    }
    return body;
}