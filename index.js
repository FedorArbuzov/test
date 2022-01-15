let express = require('express');
let axios = require('axios');
let admin = require('firebase-admin');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

let configDict = require('./config');
const config = configDict['config'];
const url = configDict['url'];
const apiToken = configDict['apiToken'];

admin.initializeApp({credential: admin.credential.cert(config)});

db = admin.firestore();

var app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.post('/', async function(request, response){
  try {
  let update_id = request.body['update_id'].toString()
  const msg = db.collection('messages').doc(update_id);
  const res = await msg.set(request.body, { merge: true })
  } catch(err){
    console.log(err)
  }
  response.status(200).send({});

  // const doc = await cityRef.get();
  // if (message === '/start' && !doc.exists) {
  //   console.log('onboard user logic');
  //   // onboard user logic
  // } else if (message === '/start') {
  //   console.log('Document data:', doc.data());
  //   // restart progress
  // }
  // else {
  //   // save user question and send to mentor
  // }
  // axios.post(`${url}${apiToken}/sendPhoto`,
  // {
  //      chat_id: -744777013,
  //      photo: 'AgACAgIAAxkBAANEYWl5pFfpYd3np-PSrmpDDSgVa7AAApa3MRuKrFFLXw1hMutgUuwBAAMCAAN4AAMhBA'
  // })
  // .then((res) => {
  //     response.status(200).send(res);
  // }).catch((error) => {
  //     response.send(error);
  // });
});

app.get('/success-submit/:task/:userID', async function(request, response){
  let task = request.param("task");
  let userID = parseInt(request.param("userID"));
  axios.post(`${url}${apiToken}/sendMessage`,
    {
        chat_id: userID,
        text: `Вы прошли задание ${task}. Хорошая работа, продалжай дальше!`
    })
    .then((res) => {
        response.status(200).send(res);
    }).catch((error) => {
        response.send(error);
    });
  res.send("tagId is set to " + req.param("tagId"));
});

app.get('/cron-status', async function(request, response){

})

app.listen(PORT);



