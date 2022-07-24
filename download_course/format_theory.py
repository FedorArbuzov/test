from bs4 import BeautifulSoup


html_template = """
<html>
    <head>
        <link rel="stylesheet" href="../w3.css">
    </head>
    <body>
        {0}
    </body>
</html>
"""

from os import listdir
from os.path import isfile, join
mypath = '/Users/fedorarbuzov/Documents/quiet-stream-57326/pages/sql_tasks'
onlyfiles = [f.split('.')[0] for f in listdir(mypath) if isfile(join(mypath, f))]
onlyfiles = {f.rsplit('_', 1)[0]: f for f in onlyfiles}

def format_theory_try(body):
    soup = BeautifulSoup(body, 'html.parser')
    main = soup.find('div', {'id': 'main'})  
    tasks = main.find_all('div', {'class': 'exercisewindow'})
    for task in tasks:
        link = task.find('a', {'target': '_blank'})
        # print(link['href'])
        link = link['href'].split('.')[0]
        # create a new tag
        new_tag = soup.new_tag("a")
        new_tag.attrs['class'] = 'w3-btn w3-margin-bottom'
        new_tag.attrs['target'] = '_blank'
        new_tag.attrs['href'] = f'/item?type=sql_tasks&page={onlyfiles[link]}'
        new_tag.append("Открыть упражнение")

        # insert the new tag after the current tag
        task.insert_after(new_tag)
        task.decompose()
    
    nextprevs = main.find_all('div', {'class': 'nextprev'})
    for nextprev in nextprevs:
        nextprev.decompose()
    examples = main.find_all('div', {'class': 'w3-example'})
    for example in examples:
        check_link = example.find('a')
        if check_link:
            check_link.decompose()
    
    return html_template.format(str(main))   
