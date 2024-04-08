const socket = require('../apps/socket');
const port = require('config').get('socket.port');
const logger = require('../common/logger');

module.exports = () => {
    return socket.listen(port, () => {
        logger.info(`Socket listening on port ${port} ...`);
    })
}

