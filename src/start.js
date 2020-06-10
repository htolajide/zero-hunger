const logger = require('simple-node-logger').createSimpleLogger();
const app = require('./app');
// store the port number
// http://api.ipstack.com/197.210.53.116?access_key=c934a4c422466d14bb4cdcd82fa49547

const port = parseInt(process.env.PORT, 10) || 4500;
app.listen(port, () => logger.info(`Zero hunger ready at ${port}`));