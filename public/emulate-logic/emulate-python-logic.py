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

  global input_data
  input_data = []

  sys.stdout = TestScriptOutput()
  editorResult.setValue("")
  code = editor.getValue().replace('input', 'read_data')
  code = code.replace('print', 'set_data')

  for case in res:
    print(case)
    global output_data
    output_data = []
    input_data = case[0].split('\\n')[1:-1]
    print(input_data)
    try:
      exec(code)
    except:
      tb = traceback.format_exc()
      print(tb)
      break
    if output_data == case[1].split('\\n')[1:-1]:
      editorResult.setValue(editorResult.getValue() + 'ok\n')
    else:
      editorResult.setValue(editorResult.getValue() + 'not ok\n')
      editorResult.setValue(editorResult.getValue() + 'Данные не совпали ...\n')
      break
  else:
    window.taskSuccessSubmit()
    editorResult.setValue(editorResult.getValue() + 'Задача решена!!!!\n')



document["run_button"].bind("click", callScript)
document["submit_button"].bind("click", testScript)