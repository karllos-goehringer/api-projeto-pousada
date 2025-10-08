import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.EMAIL_SERVICE_PORT || 3001;
app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})

transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    secure: false,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
})

//https://www.freecodecamp.org/portuguese/news/como-usar-o-nodemailer-para-enviar-emails-do-seu-servidor-do-node-js/