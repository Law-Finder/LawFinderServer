const pagination = require('../../libs/pagination');

module.exports = async (model, page, limit, query, data) => {
    return {
        timestamp : new Date().toLocaleString(),
        status : true,
        filter : {
            ...query,
            page,
            limit
        },
        data : {
            docs : data
        },
        pages : await pagination(model, page, limit, query)
    }
}