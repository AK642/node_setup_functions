import 'dotenv/config';
import env from './utils/validate-env';
import mongoose from 'mongoose';
import app from './app';

const port = env.PORT;

//* Database connection
mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("DB connected!");

    //* Server creation
    app.listen(port, () => {
        console.log("Server is running on port: ", port);
    });
});