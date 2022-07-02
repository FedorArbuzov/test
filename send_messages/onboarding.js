let axios = require('axios');
let configDict = require('../config');

const url = configDict['url'];
const apiToken = configDict['apiToken'];

exports.onboarding = (chat_id, db) => {
    console.log('send onboarding message');
    axios.post(`${url}${apiToken}/sendMessage`,
    {
         chat_id: chat_id,
         text: `<b>Привет!</b>\n\nМы очень рады, что вы к нам присоеденились. Чтобы начать решать задачи просто перейди по <a href="https://quiet-stream-57326.herokuapp.com/path-js?id=${chat_id}">ссылке</a>. Открывай ее на любом устройстве и занимайся)\nМы закрепим это сообщение, чтобы ты не потерял эту ссылку!`,
         parse_mode: 'HTML'
    })
    .then(async (res) => {
        await db.collection('users').doc(chat_id.toString()).set({}, {merge: true});
        await db.collection('traction').doc(chat_id.toString()).set({}, {merge: true});
        await db.collection('user-achivments').doc(chat_id.toString()).set({}, {merge: true});
        console.log(res)
        let messageId = res.data.result.message_id
        let chatId = res.data.result.chat.id
        axios.post(`${url}${apiToken}/pinChatMessage`,
        {
             chat_id: chatId,
             message_id: messageId,
        }).catch((err) => {
            console.log(err)
        })
        
    }).catch((error) => {
        console.log(error);
    });
}