const log4js = require('log4js');

log4js.configure({
    appenders: {
        app : {type: "file", filename: "logs/app.log"},
        out : {type : "stdout"},
        multi : {
            type : "multiFile", base : "logs/", property : "categoryName", extension : ".log",
            maxLogSize : 10485760, backup : 3, compress : true
        }
    },
    categories : {
        default : {
            appenders : ["app","out","multi"],
            level : "debug",
        }
    }
});

module.exports = log4js.getLogger();