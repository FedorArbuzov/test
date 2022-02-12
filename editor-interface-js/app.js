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
  jsConfetti.addConfetti()
  fetch(`https://quiet-stream-57326.herokuapp.com/success-submit/${task}/${localStorage.getItem('telegramID')}`).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    }).catch(function() {
      console.log("Booo");
    });
}

var firebaseConfig = {
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
  mode: 'javascript',
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

const telegramID = localStorage.getItem('telegramID');
console.log(telegramID);
if (telegramID === null){
   document.querySelector('.login-form').style.display = "block";
}
else {
  document.querySelector('.login-form').style.display = "none";
}

document.querySelector('.login-form > form').addEventListener('submit', function(evt){
  evt.preventDefault();
  let inputTelegramId = document.querySelector('.telegram-input').value
  document.querySelector('.login-form').style.display = "none";
  localStorage.setItem('telegramID', inputTelegramId);
  let userDoc = firebase.firestore().collection('users').doc(localStorage.getItem('telegramID'));
  userDoc.set({}, {merge: true});

  userDoc = firebase.firestore().collection('traction').doc(localStorage.getItem('telegramID'));
  userDoc.set({}, {merge: true});
})


editor.on("change",function(cm,change){
  console.log(cm.getValue());
  localStorage.setItem('code', cm.getValue());
});

let slider = document.getElementById("myRange");
//let firstCodeEditor = document.querySelector(".CodeMirror:nth-child(2)");
let codeEditors = document.querySelectorAll(".CodeMirror");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  console.log(this.value);
  codeEditors[0].style.width = `${this.value}%`
  codeEditors[1].style.width = `${100 - this.value}%`
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


let ResultsStorage = [];
let InputStorage = [];
let consoleInResultsStorage = function(obj){
ResultsStorage.push(obj.toString());
}
let promptFromFakeStorage = function(){
return InputStorage.shift();
}

let submit=document.querySelector("#run_button")
submit.addEventListener("click", function(){

console.log(editor.getValue())
let userCode = editor.getValue()
userCode = "'use strict';" + userCode
userCode = userCode.replaceAll("console.log", "consoleInFakeEditor")

editorResult.setValue("")
try {
      eval(userCode);
  } catch (e) {
    editorResult.setValue(convertTrase(e.stack))
    return
  }
  let userDoc = firebase.firestore().collection('users').doc(localStorage.getItem('telegramID'));
  // Atomically increment by 1.
  let res = {}
  let today = (new Date()).toLocaleDateString("en-US").replaceAll('/', '')
  res[`${today}.${task}.runs`] = firebase.firestore.FieldValue.increment(1)
  userDoc.update(res);
})
let submit1=document.querySelector("#submit_button")
submit1.addEventListener("click",function(){
editorResult.setValue("")
let userCode=editor.getValue()
userCode = "'use strict';" + userCode
userCode = userCode.replaceAll("prompt", "promptFromFakeStorage")
userCode = userCode.replaceAll("console.log", "consoleInResultsStorage")
let testData = []
let result = [];
let j = 0;
console.log(document.task)
document.task.test_data = document.task['test_data_txt'].split('\n')
for (let i = 0; i < document.task.test_data.length-1; i++){
  if (document.task.test_data[i] === '_________________________'){ //Returning true if it's just numbers
      j = j + 1;
      testData[j] = [];
      // testData[j].push(document.task.test_data[i]);
      result.push(testData[j]);
  } else {
      testData[j].push(document.task.test_data[i]);
  }
}
let good_cases = 0
for (let i = 0; i < result.length; i++) {
  let splitIdx = result[i].indexOf('=========================')
  let inputData = result[i].slice(0, splitIdx);
  let outputData = result[i].slice(splitIdx+1);
  InputStorage = inputData;
  console.log(InputStorage);
  editorResult.setValue(editorResult.getValue() + "==================================" + "\n")
  editorResult.setValue(editorResult.getValue() + "ВХОДНЫЕ ДАННЫЕ: " + "\n")
  editorResult.setValue(editorResult.getValue() + InputStorage.join("\n") + "\n")
  ResultsStorage = [];
  try {
      eval(userCode);
  } catch (e) {
    editorResult.setValue(e.message)
    break
  }
  editorResult.setValue(editorResult.getValue() + "ОЖИДАЕМЫЙ РЕЗУЛЬТАТ: " + "\n")
  editorResult.setValue(editorResult.getValue() + outputData.join("\n") + "\n")
  editorResult.setValue(editorResult.getValue() + "ВАШ РЕЗУЛЬТАТ: " + "\n")
  editorResult.setValue(editorResult.getValue() + ResultsStorage.join("\n") + "\n")
  console.log(ResultsStorage);
  console.log(outputData);
  if (JSON.stringify(ResultsStorage) == JSON.stringify(outputData)){
    editorResult.setValue(editorResult.getValue() + "OK" + "\n")
    good_cases += 1
  } else {
    editorResult.setValue(editorResult.getValue() + "NOT OK" + "\n")
  }
}
if (good_cases === result.length){
  editorResult.setValue("ВСЕ ТЕСТЫ ПРОЙДЕНЫ, ПОЗДРАВЛЯЕМ!" + "\n" + editorResult.getValue())
  let userDoc = firebase.firestore().collection('traction').doc(localStorage.getItem('telegramID'));
  // Atomically increment by 1.
  let res = {}
  let today = new Date()
  res[`${task}`] = today
  userDoc.set(res, {merge: true});
  taskSuccessSubmit();
}
else{
  editorResult.setValue(`ПРОЙДЕНО ТЕСТОВ: ${good_cases} ИЗ ${result.length}, ИЗУЧИТЕ ВЫВОД И ПОПРОБУЙТЕ ЕЩЕ РАЗ!)` + "\n" + editorResult.getValue())
}
let userDoc = firebase.firestore().collection('users').doc(localStorage.getItem('telegramID'));
// Atomically increment by 1.
let res = {}
let today = (new Date()).toLocaleDateString("en-US").replaceAll('/', '')
res[`${today}.${task}.submits`] = firebase.firestore.FieldValue.increment(1)
userDoc.update(res);
})