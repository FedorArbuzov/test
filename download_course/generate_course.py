from os import listdir
from os.path import isfile, join

theme = 'sql_tasks'

mypath = f'/Users/fedorarbuzov/Documents/quiet-stream-57326/pages/{theme}'
onlyfiles = [f.split('.')[0] for f in listdir(mypath) if isfile(join(mypath, f))]
onlyfiles = {int(f.rsplit('_', 1)[1]): f for f in onlyfiles}


for i in range(100):
    #print(i, onlyfiles[i])
    try:
        print(f'<li><a href="/item?type={theme}&page={onlyfiles[i]}">{" ".join(onlyfiles[i].split("_"))}</a></li>')
    except KeyError:
        pass