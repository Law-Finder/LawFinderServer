module.exports = (data) => {
    return {
        timestamp : new Date().toLocaleString(),
        status : true,
        data
    }
}