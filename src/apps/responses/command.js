module.exports = (message) => {
    return {
        timestamp : new Date().toLocaleString(),
        status : true,
        message,
    }
}