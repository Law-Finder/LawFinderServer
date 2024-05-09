const pagination = require('../../libs/pagination');

module.exports = async (model, query, data) => {
    return {
        timestamp : new Date().toLocaleString(),
        status : true,
        filter : {
            ...query,
        },
        data : {
            docs : data
        },
        pages : await pagination(model, query)
    }
}