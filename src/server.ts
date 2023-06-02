import 'dotenv/config';
import env from './utils/validate-env';
import app from './app';

const port = env.PORT;

//* Server creation
app.listen(port, () => {
    console.log("Server is running on port: ", port);
});