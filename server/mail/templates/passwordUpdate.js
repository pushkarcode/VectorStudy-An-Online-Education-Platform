exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                margin-top: 1.4vw;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
            .anchor {
				text-decoration: none;
				color: inherit;
			  }
		   .push{
			display: inline;
			padding: .5vw .7vw;
			border-radius: .6vw;
			font-size: 2vw;
			font-weight: 600;
			background-color: yellow;
			font-family: "Gilroy";
			font-size: 20px;
			margin-bottom: 30px;
            color: rgb(36, 28, 43);
		   }
		   .golu {
			   font-weight: 100;
			   color: rgb(36, 28, 43);
		   }
        </style>
    
    </head>
    
    <body>
        <div class="container">
        <a class="anchor" href="https://studynotion-edtech-project.vercel.app"
        ><p class="push"><span class="golu">𐎏</span>VectorStudy</p></a>
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.
                </p>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@vectorstudy.com">info@vectorstudy.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};