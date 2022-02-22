let express = require('express');
let axios = require('axios');
let admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

let configDict = require('./config');
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
  let achivmentMessage =  await achivmentSetLogic(userID)
  console.log(achivmentMessage);
  axios.post(`${url}${apiToken}/sendMessage`,
    {
        chat_id: userID,
        text: `Вы прошли задание ${task}. Хорошая работа, продалжай дальше! \n ${achivmentMessage}`,
        parse_mode: 'HTML'
    })
    .then((res) => {
        response.status(200).send(res);
    }).catch((error) => {
        console.log(error)
        response.send(error);
    });
});

app.get('/cron-status', async function(request, response){

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


async function achivmentSetLogic(userID){
  let achivmentMessage = 'У вас новое достижение! Вы можете их посмотреть <a href="https://quiet-stream-57326.herokuapp.com/achivments">тут</a>'
  console.log('achivmentSetLogic')
  let userAchivments = db.collection('user-achivments').doc(userID.toString());
  let userAchivmentsData = await userAchivments.get();
  userAchivmentsData = userAchivmentsData.data()['achivments']
  console.log(userAchivmentsData)

  let userTraction = db.collection('traction').doc(userID.toString());
  let userTractionData = await userTraction.get();
  userTractionData = userTractionData.data()
  console.log(userTractionData)

  // проверка числа сделанных задач и наличия ачивок, если задачи сделаны, а ачивок нет - добавляем
  if (Object.keys(userTractionData).length >= 5 && !userAchivmentsData.includes('struggle')){
    // добавить ачивку пользователю и сказать об этом в сообщениях
    let arrUnion = userAchivments.update({
      achivments: admin.firestore.FieldValue.arrayUnion('struggle')
    });

    return achivmentMessage
  }
  if (Object.keys(userTractionData).length >= 1 && !userAchivmentsData.includes('trust')){
    // добавить ачивку пользователю и сказать об этом в сообщениях
    let arrUnion = userAchivments.update({
      achivments: admin.firestore.FieldValue.arrayUnion('trust')
    });

    return achivmentMessage
  }
  return ""
}



app.listen(PORT);



