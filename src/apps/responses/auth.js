module.exports = (message, acccessToken, idToken) => {
    return {
        timestamp : new Date().toLocaleString(),
        status : true,
        message,
        token : {
            acccessToken,
            idToken
        }
    }
}