let express = require('express');
let axios = require('axios');
let admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const { onboarding } = require('./send_messages/onboarding');
const { madeTask } = require('./send_messages/made_task');
const { status, Last7Days } = require('./send_messages/satus');

const PORT = process.env.PORT || 5000;

let configDict = require('./config');
const { text } = require('express');
const { stat } = require('fs');
const config = configDict['config'];
const url = configDict['url'];
const apiToken = configDict['apiToken'];

admin.initializeApp({credential: admin.credential.cert(config)});

db = admin.firestore();

var app = express();

//app.use(express.static('editor-interface-js'))
app.use(express.static('public'))

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.post('/', async function(request, response){
  console.log(request.body);
  const chat_id = request.body.message.chat.id;
  const text = request.body.message.text;
  if (text === '/start'){
    onboarding(chat_id, db);
  }
  response.status(200).send({});
});

app.get('/success-submit/:task/:userID', async function(request, response){
  let task = request.param("task");
  let userID = parseInt(request.param("userID"));
  await madeTask(task, userID, db);
  response.status(200).send({'status': 'ok'});
});

app.get('/cron-status', async function(request, response){
  let users = db.collection('users');
  const snapshot = await users.get();
  const last7Days = Last7Days();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    status(doc.id, doc.data(), last7Days, db);
  });
  response.json({})
})

app.get('/item/', function(req, res){
  let type = req.query.type;
  let page = req.query.page;
  res.sendFile(path.join(__dirname, `/pages/${type}/${page}.html`));
})

app.get('/editor-interface-js/', function(req, res) {
  res.sendFile(path.join(__dirname, '/pages/js-editor.html'));
})

app.get('/editor-interface-python/', function(req, res) {
  res.sendFile(path.join(__dirname, '/pages/py-editor.html'));
})

app.get('/achivments/', function(req, res) {
  res.sendFile(path.join(__dirname, '/pages/achivments.html'));
})

app.get('/path-js/', function(req, res) {
  res.sendFile(path.join(__dirname, '/pages/js-path.html'));
})

console.log(`start on ${PORT}`);
app.listen(PORT);



