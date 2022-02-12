from browser import document, window
import sys
import traceback

storage = window.localStorage

editor = document.editor
editorResult = document.editorResult

input_data = []
output_data = []


def read_data():
  return input_data.pop(0)

def set_data(t):
  output_data.append(str(t))

class CallScriptOutput:
  def __init__(self):
      self.console = document["results"]

  def write(self, text):
      editorResult.setValue(editorResult.getValue() + text)

class TestScriptOutput:
  def __init__(self):
      self.console = document["results"]

  def write(self, text):
      editorResult.setValue(editorResult.getValue() + text)

def callScript(event):
  sys.stdout = CallScriptOutput()
  editorResult.setValue("")
  exec(editor.getValue())

def testScript(event):
  task_info = storage.getItem('task')
  task_info = task_info.split('_________________________')
  task_info = task_info[1:]
  res = []
  for i in task_info:
    res.append(i.split('========================='))
  print(res)

  sys.stdout = TestScriptOutput()
  editorResult.setValue("")
  code = editor.getValue().replace('input', 'read_data')
  code = code.replace('print', 'set_data')

  for case in res:
    print('==================================')
    print("ВХОДНЫЕ ДАННЫЕ: ")
    global output_data
    output_data = []
    global input_data
    input_data = case[0].split('\n')[1:-1]
    for i in input_data:
      print(i)
    try:
      exec(code)
    except:
      tb = traceback.format_exc()
      print(tb)
      break
    print('ОЖИДАЕМЫЙ РЕЗУЛЬТАТ: ')
    for i in output_data:
      print(i)
    print('ВАШ РЕЗУЛЬТАТ: ')
    for i in case[1].split('\n')[1:-1]:
      print(i)
    if output_data == case[1].split('\n')[1:-1]:
      editorResult.setValue(editorResult.getValue() + 'ДАННЫЕ СОВПАЛИ!!!\n')
    else:
      editorResult.setValue(editorResult.getValue() + 'ДАННЫЕ НЕ СОВПАЛИ...\n')
      editorResult.setValue('ТЕСТЫ НЕ СОВПАЛИ, ИЗУЧИТЕ ВЫВОД И ПОПРОБУЙТЕ ЕЩЕ РАЗ ...\n' + editorResult.getValue())
      break
  else:
    window.taskSuccessSubmit()
    editorResult.setValue('ЗАДАЧА РЕШЕНА, ВСЕ ТЕСТЫ ПРОЙДЕНЫ!!!!\n' + editorResult.getValue())



document["run_button"].bind("click", callScript)
document["submit_button"].bind("click", testScript)