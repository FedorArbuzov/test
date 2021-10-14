const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const url = 'https://api.telegram.org/bot';
const apiToken = '2080851679:AAHe4ELNXqRxfymhzeSST5swFE7i5qYgjkE';

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/', (req, res) => {  
    // console.log(req.body);
    const chatId = req.body.message.chat.id;
    const sentMessage = req.body.message.text;
    // Regex for hello
    if (sentMessage.match(/hello/gi)) {
         axios.post(`${url}${apiToken}/sendMessage`,
              {
                   chat_id: chatId,
                   text: 'hello back 👋'
              })
              .then((response) => { 
                   res.status(200).send(response);
              }).catch((error) => {
                   res.send(error);
              });
    } else {
         // if no hello present, just respond with 200 
         res.status(200).send({});
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



