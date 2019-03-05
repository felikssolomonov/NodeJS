let currentDate = new Date();
module.exports.date = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');

const moment = require('moment');
global.dateNow = moment().format('LLL');//.add(3, 'days')

module.exports.getMessage = function(name){
    let hour = currentDate.getHours();
    if(hour > 16)
        return "Добрый вечер, " + name;
    else if(hour > 10)
        return "Добрый день, " + name;
    else
        return "Доброе утро, " + name;
}
