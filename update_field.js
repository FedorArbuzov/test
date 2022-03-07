let admin = require('firebase-admin');
let fs = require('fs');


let configDict = require('./config');
const config = configDict['config'];

admin.initializeApp({credential: admin.credential.cert(config)});

db = admin.firestore();

async function f(){
    for (let i = 0; i < 133; i++){
        //console.log(i);
        let data = ``;
        let task = db.collection('courses').doc('t1').collection('items').doc(i.toString());
        let res = await task.get();
        if (!res.exists) {
            console.log('No such document!');
        } else {
            fs.writeFile(`data/${i}.json`, JSON.stringify(res.data()), function(){});
            data = res.data()['meta']['task_name']
            console.log(`<li><a href="https://quiet-stream-57326.herokuapp.com/editor-interface-js/?course=t1&task=${i}">${data} (id задачи ${i})</a></li>`);
        }


        // task = db.collection('courses').doc('t1').collection('items').doc(i.toString());
        // let n = 'test_data_txt'
        // res = await task.update({[`${n}`]: data});
    }
}

f()

