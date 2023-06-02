import { Sequelize } from 'sequelize';
import env from '../utils/validate-env';

const sequelize = new Sequelize(env.SQL_DATEBASE, env.SQL_USER, env.SQL_PASSWORD, {
    host: env.SQL_HOST,
    dialect: 'mysql',
    port: env.SQL_PORT,
    pool: {
        max: 25,
        min: 0,
        idle: 10000
    },
    logging: true,
    define: {
        timestamps: false,
    }
});

//* Database connection
sequelize.authenticate().then(async () => {
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log("Sequelize OK");
}).catch(async (err: { message: string | string[]; }) => {
    console.log('Unable to connect to the database:', err.message);
});

const db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export = db;