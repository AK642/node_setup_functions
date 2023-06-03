import { cleanEnv } from 'envalid';
import { bool, port, str } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    PORT: port(),
    SESSION_SECRET: str(),
    TOKEN_KEY: str(),

    SQL_DATEBASE: str(),
    SQL_USER: str(),
    SQL_PASSWORD: str(),
    SQL_HOST: str(),
    SQL_PORT: port(),

    SMTP_SERVICE: str(),
    SMTP_HOST: str(),
    SMTP_PORT: port(),
    SMTP_SECURE: bool(),
    SMTP_EMAIL: str(),
    SMTP_PASSWORD: str(),
    ADMIN_EMAIL: str()
})          