const app = require('express')();
const server = require('http').createServer(app);
const io = (module.exports.io = require('socket.io').listen(server));
const PORT = process.env.PORT || 4000;
const logger = require('./logger');
const socketHelper = require('./socket');
const cors = require('cors');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown')
  .GracefulShutdownManager;

app.use(cors());

io.on('connection', socketHelper);

server.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));

const shutdownManager = new GracefulShutdownManager(server);

process.on('SIGTERM', () => {
  shutdownManager.terminate(() => {
    logger.info('Server has terminated gracefully');
  });
});

process.on('SIGINT', () => {
  shutdownManager.terminate(() => {
    logger.info('Server has terminated gracefully');
  });
});
