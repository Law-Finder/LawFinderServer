module.exports = {
    port : process.env.PORT ||  8000,
    prefixApiVersion : process.env.PREFIX_API_VERSION || "/api/v1",
    secretKey : process.env.SECRET_KEY,
    static_folder: `${__dirname}/../src/public`,
    view_folder : `${__dirname}/../src/public/views`,
    view_engine : "ejs"
}