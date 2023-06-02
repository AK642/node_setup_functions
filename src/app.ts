import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import env from './utils/validate-env';
import session from "express-session";
import mysqlStore from 'express-mysql-session';
import Routes from './routes/index.routes';
import path from "path";

const app: Express = express();

//* morgan: To show all APIs log
app.use(morgan('dev'));

//* Use to access data passed in req.body
app.use(express.json());
// console.log("__dirname + './MediaFiles/profiles': ", __dirname + '/MediaFiles/profiles');

// const publicfolder_Path: string = path.join(__dirname, './MediaFiles');
// console.log('publicfolder_Path : ', publicfolder_Path + '/profiles');
// app.use(`/MediaFile`, express.static(publicfolder_Path + '/profiles'));

// app.use('/MediaUploads', express.static(__dirname + '/MediaFiles'));
// app.use(session({
//     secret: env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: (60 * 60 * 1000) * 24, // 60_000 = 1 min
//     },
//     rolling: true,
//     store: MongoStore.create({
//         mongoUrl: env.MONGO_CONNECTION_STRING
//     }),
// }));

// const mysqlStore = require('express-mysql-session')(session);

// @ts-ignore
const store = mysqlStore(session);

const sessionStore = new store({
    host: env.SQL_HOST,
    user: env.SQL_USER,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATEBASE,
    connectionLimit: 10, // Adjust the limit based on your requirements
    checkExpirationInterval: 900_000, // Interval in milliseconds to check and remove expired sessions
    expiration: 86_400_000
});

app.use(session({
    secret: env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

//* Use to resolve cors error
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization, Access-Control-Allow-Headers");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use("/MediaFiles", express.static(__dirname + "/MediaFiles"));

//* API Routes
app.use('/api/v1', Routes);

//* Test wheather the server is connected or not.
app.use('/test', (req: Request, res: Response) => {
    res.send('Server works! 🚀🚀')                       
});

//* If endpoints not match then show below response
app.use((req: Request, res: Response) => {
    res.status(404).send('Endpoint not found!');
});     

export default app;