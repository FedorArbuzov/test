let axios = require('axios');
let configDict = require('../config');

const url = configDict['url'];
const apiToken = configDict['apiToken'];

const DAYS_IN_ROW = 7;

exports.Last7Days = () => {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( d.toLocaleDateString("en-US").replace(/\//g, '_') )
    }

    return result;
}

function checkSolveToday(data, n=1) {
    //TODO: проверяет что за этот день было решено n задач
    return true
}

function formatMessage(data, daysInRow) {
    if (data){
        return `<b>Привет!</b>\n\n Вот твой отчет за день, за сегодня ты:`
    }
    else {
        return `<b>Привет!</b>\n\n Сегодня ты не решал задачи`
    }
}

exports.status = (chat_id, data, last7Days, db) => {
    console.log('send onboarding message');
    let daysInRow = 0;
    for (let i of last7Days){
        console.log(i);
        if (i in data && !data[i]['success_row'] && checkSolveToday(data[i])){
            daysInRow++
        }
        else {
            break
        }
    }
    console.log(daysInRow)
    if (daysInRow === DAYS_IN_ROW){
        let res = db.collection('users').doc(chat_id).update({
            [`${last7Days[0]}.success_row`]: true
        })
    }
    axios.post(`${url}${apiToken}/sendMessage`,
    {
         chat_id: chat_id,
         text: formatMessage(data[daysInRow[0]], daysInRow),
         parse_mode: 'HTML'
    })
    .then((res) => {
        console.log('success')
    }).catch((error) => {
        console.log(error);
    });
}