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
userCode = userCode.replace(/console.log/g, "consoleInFakeEditor")

editorResult.setValue("")
try {
      eval(userCode);
  } catch (e) {
    editorResult.setValue(convertTrase(e.stack))
    return
  }
  taskRun();
})
let submit1=document.querySelector("#submit_button")
submit1.addEventListener("click",function(){
editorResult.setValue("")
let userCode=editor.getValue()
userCode = "'use strict';" + userCode
userCode = userCode.replace(/prompt/g, "promptFromFakeStorage")
userCode = userCode.replace(/console.log/g, "consoleInResultsStorage")
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
  taskSuccessSubmit();
}
else{
  editorResult.setValue(`ПРОЙДЕНО ТЕСТОВ: ${good_cases} ИЗ ${result.length}, ИЗУЧИТЕ ВЫВОД И ПОПРОБУЙТЕ ЕЩЕ РАЗ!)` + "\n" + editorResult.getValue())
}
taskSubmit()
})