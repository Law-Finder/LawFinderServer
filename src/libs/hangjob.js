const cron = require('node-cron');

exports.Minutely = () => {
    cron.schedule('* * * * *', () => {
        console.log("Work minutely");
    });
}

exports.Daily = (time) => {
    cron.schedule(`0 ${time} * * *`, () => {
        console.log("Work daily");
    });
}

exports.Weekly = (time) => {
    cron.schedule(`0 ${time} * * 1`, () => {
        console.log("Work weekly");
    });
}

exports.Monthly = (time, day) => {
    cron.schedule(`0 ${time} ${day} * *`, () => {
        console.log("Work monthly");
    });
}