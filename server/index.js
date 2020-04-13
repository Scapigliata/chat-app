const app = require('express')();
const server = require('http').createServer(app);
const io = (module.exports.io = require('socket.io').listen(server));
const PORT = process.env.PORT || 8080;
const logger = require('./logger');
module.exports.time = 120000;
const socketHelper = require('./socket');
const cors = require('cors');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown')
  .GracefulShutdownManager;

app.use(
  cors({
    origin: '*',
  })
);

app.get('/', cors(), (req, res) => {
  res.status(200).send('Server is running');
});

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
