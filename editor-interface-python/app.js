const jsConfetti = new JSConfetti()

const urlParams = new URLSearchParams(window.location.search);
const course = urlParams.get('course');
const task = urlParams.get('task');

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
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  firebase
    .firestore()
    .collection("courses")
    .doc(course)
    .collection("items")
    .doc(task)
    .get()
    .then(doc => {
      const result = doc.data();
      console.log(result);
      document.querySelector(".task").innerHTML = result.theory;
      localStorage.setItem("task", JSON.stringify(result.test_data_txt));
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
    });
let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  indentUnit: 4,
  lineWrapping: true,
  mode: { name: "python", version: 3, singleLineStringErrors: false },
});

let editorResult = CodeMirror.fromTextArea(document.getElementById("results"), {
  lineNumbers: true,
  indentUnit: 4,
  lineWrapping: true,
});
document.editor = editor;
document.editorResult = editorResult;

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
let show_task=document.querySelector("#show_task")
  show_task.addEventListener("click", function(){
  if (document.querySelector(".task").style.display !== 'block'){
    document.querySelector(".task").style.display = 'block';
  } else {
    document.querySelector(".task").style.display = 'none';
  }

})