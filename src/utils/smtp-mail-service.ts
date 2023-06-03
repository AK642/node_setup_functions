import nodemailer, { TransportOptions } from "nodemailer"; 
import jwt from 'jwt-simple';

const tokenkey: string = process.env.TOKEN_KEY || 'tailordesk';

interface SMTPConfig extends TransportOptions { 
    service: string | undefined;
    host: string | undefined;
    port: string | undefined;
    secure: string | undefined;
    auth: {
        user: string | undefined;
        pass: string | undefined;
    } 
    tls: {
        rejectunauthorized: boolean;
    }
}
const smtpConfig: SMTPConfig = { 
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE, 
    auth: {
        user: process.env.SMTP_EMAIL, 
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        rejectunauthorized: false
    }
} 

const transporter = nodemailer.createTransport(smtpConfig);

export const sendEmail = async (to: string, subject: string, html: string) => {
    const mail = {
        to,
        from: process.env.SMTP_EMAIL,
        subject,
        html
    }

    transporter.sendMail(mail);
}

