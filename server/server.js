const app = require('express')();
const server = require('http').createServer(app);
const io = (module.exports.io = require('socket.io').listen(server));
const PORT = process.env.PORT || 4000;
const logger = require('./logger');
const socketHelper = require('./socket');

const cors = require('cors');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

io.on('connection', socketHelper);

server.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));
