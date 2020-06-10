import mongoose from 'mongoose';
const logger = require('simple-node-logger').createSimpleLogger();
import configuration from './config.json';

const connectDB = () => {
    const url = process.env.NODE_ENV === 'test' ? configuration.test.url : configuration.development.url;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        logger.info("Successfully connected to MongoDB Atlas!");
    }).catch((error) => {
        logger.error("Unable to connect to MongoDb Atlas!");
        logger.error(error.message);

    });
}
export default connectDB;