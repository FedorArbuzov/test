const jsConfetti = new JSConfetti()

function convertTrase(trase) {
  trase = trase.split('\n')
  errMsg = trase[0]
  lineError = trase[1].split(':')
  lineError = lineError[lineError.length - 2]
  errMsg += `\nОшибка произошла на строчке ${lineError}`
  return errMsg
}

function taskSuccessSubmit(){

  const task = urlParams.get('task');
  let userDoc = firebase.firestore().collection('traction').doc(localStorage.getItem('telegramID'));
  // Atomically increment by 1.
  let res = {}
  let today = new Date()
  res[`${task}`] = today
  userDoc.set(res, {merge: true});

  jsConfetti.addConfetti()

  fetch(`/success-submit/${task}/${localStorage.getItem('telegramID')}`).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    }).catch(function() {
      console.log("Booo");
    });
}

function taskSubmit(){
  let userDoc = firebase.firestore().collection('users').doc(localStorage.getItem('telegramID'));
  // Atomically increment by 1.
  let res = {}
  let today = (new Date()).toLocaleDateString("en-US").replace(/\//g, '_')
  res[`${today}.${task}.submits`] = firebase.firestore.FieldValue.increment(1)
  userDoc.update(res);
}

function taskRun(){
  let userDoc = firebase.firestore().collection('users').doc(localStorage.getItem('telegramID'));
  // Atomically increment by 1.
  let res = {}
  let today = (new Date()).toLocaleDateString("en-US").replace(/\//g, '_')
  res[`${today}.${task}.runs`] = firebase.firestore.FieldValue.increment(1)
  userDoc.update(res);
}

let firebaseConfig = {
  apiKey: "AIzaSyCPnRZJWX2Yr9FpXZjEhlzw66sgi4mMXtg",
  authDomain: "exallenge.firebaseapp.com",
  databaseURL: "https://exallenge.firebaseio.com",
  projectId: "exallenge",
  storageBucket: "exallenge.appspot.com",
  messagingSenderId: "183127626486",
  appId: "1:183127626486:web:8fb4ccfec17a09949b12d7",
  measurementId: "G-8GBR72WH20",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const urlParams = new URLSearchParams(window.location.search);
const course = urlParams.get('course');
const task = urlParams.get('task');
let editorType = "javascript"
if (window.location.pathname === '/editor-interface-python/'){
  editorType = "python"
}
firebase
  .firestore()
  .collection("courses")
  .doc(course)
  .collection("items")
  .doc(task)
  .get()
  .then(doc => {
    const result = doc.data();
    document.task = result;
    window.localStorage.setItem("task", result['test_data_txt'])
    console.log(document.querySelector(".task"))
    document.querySelector(".task").innerHTML = result.theory;
  })
  .catch(err => {
    console.log(err); // eslint-disable-line no-console
  });
let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  indentUnit: 4,
  lineWrapping: true,
  mode: editorType,
  theme: 'duotone-light'
});

let editorResult = CodeMirror.fromTextArea(document.getElementById("results"), {
  lineNumbers: true,
  indentUnit: 4,
  lineWrapping: true,
  theme: 'duotone-light'
});
document.editor = editor;
document.editorResult = editorResult;

const c = localStorage.getItem('code');
if (c === null){
  editor.setValue('console.log("Hello, world!")')
}
else {
  editor.setValue(c)
}


editor.on("change",function(cm,change){
  console.log(cm.getValue());
  localStorage.setItem('code', cm.getValue());
});

let slider = document.getElementById("myRange");
//let firstCodeEditor = document.querySelector(".CodeMirror:nth-child(2)");
let codeEditors = document.querySelectorAll(".CodeMirror");

if (window.screen.width <= 1024) {
  // Resolution is 1024x768 or above
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    console.log(this.value);
    codeEditors[0].style.width = `${this.value}%`
    codeEditors[1].style.width = `${100 - this.value}%`
  }
}



//For combine keys like Alt+P
document.onkeyup = function (e) {
    var evt = window.event || e;
        if (evt.keyCode == 80 && evt.altKey) {
            document.querySelector("#run_button").click()
        }
}
let consoleInFakeEditor = function(obj){
  editorResult.setValue(editorResult.getValue() + String(obj) + "\n")
}

let show_task=document.querySelector("#show_task")
show_task.addEventListener("click", function(){
  if (document.querySelector(".task").style.display !== 'block'){
    document.querySelector(".task").style.display = 'block';
  } else {
    document.querySelector(".task").style.display = 'none';
  }

})