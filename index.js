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
  let input = request.body
  console.log(request.body);
  let user_id = request.body['message']['from']['id']
  let message = request.body['message']
  let update_id = request.body['update_id'].toString()
  user_id = user_id.toString()
  const cityRef = db.collection('messages').doc(user_id);
  // const doc = await cityRef.get();
  let newMessage = {}
  newMessage[update_id] = message
  const res = await cityRef.set(newMessage, { merge: true })
  response.status(200).send({});
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

app.listen(PORT);



