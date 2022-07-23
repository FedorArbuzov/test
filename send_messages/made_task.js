let axios = require('axios');
let configDict = require('../config');

const url = configDict['url'];
const apiToken = configDict['apiToken'];


exports.madeTask = async (task, userID, db) => {
    let res = {}
    let today = new Date()
    res[`${task}`] = today
    console.log(task, userID)
    let achivmentMessage =  await achivmentSetLogic(userID);
    await db.collection('traction').doc(userID.toString()).set(res, {merge: true});
    axios.post(`${url}${apiToken}/sendMessage`,
    {
        chat_id: userID,
        text: `Вы прошли задание ${task}. Хорошая работа, продалжай дальше! \n ${achivmentMessage}`,
        parse_mode: 'HTML'
    })
    .then((res) => {
      console.log('ok')
    }).catch((error) => {
        console.log(error)
        response.send(error);
    });
}


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