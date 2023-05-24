import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import env from './utils/validate-env';
import session from "express-session";
import MongoStore from "connect-mongo";
import Routes from './routes/index.routes';

const app: Express = express();

//* morgan: To show all APIs log
app.use(morgan('dev'));

//* Use to access data passed in req.body
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

//* Use to resolve cors error
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization, Access-Control-Allow-Headers");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

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