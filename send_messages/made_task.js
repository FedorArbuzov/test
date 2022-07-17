let axios = require('axios');
let configDict = require('../config');

const url = configDict['url'];
const apiToken = configDict['apiToken'];


exports.madeTask = async (task, userID, db) => {
    let res = {}
    let today = new Date()
    res[`${task}`] = today
    console.log(task, userID)
    await db.collection('traction').doc(userID.toString()).set(res, {merge: true});
}