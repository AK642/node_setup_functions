import path from "path";
import fs from 'fs';
import { sendEmail } from './smtp-mail-service';
import jwt from 'jwt-simple';
import env from './validate-env';
const tokenKey = env.TOKEN_KEY;

export const emailVerificationMail = (user: any) => {
    const url = path.join(__dirname, '../content/emailVerification.html');
    let html = fs.readFileSync(url, 'utf8');

    const username = user.isVolunteer ? `${user.firstname} ${user.lastname}` : user.organistion_name
    const token = jwt.encode(user.email, tokenKey);
    const URL = `http://localhost:11022/api/v1/user/account-verification?token=${token}`;

    html = html.replace("{user}", username);
    html = html.replace("{email}", user.email);
    html = html.replace("{URL}", URL);

    sendEmail(user.email, "[VoluntEasy] Account Verification", html);
};
