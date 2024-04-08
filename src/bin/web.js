const app = require('../apps/app');
const port = require('config').get('app.port');
const logger = require('../common/logger');

module.exports = () => {
    return app.listen(port, (req, res) => {
        logger.info(`Server running on port ${port} ...`);
    });
}