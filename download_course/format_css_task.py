from os import listdir
from os.path import isfile, join

import requests
from bs4 import BeautifulSoup


url = f'https://schoolsw3.com/css/'

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

mypath = 'css_formated'
mypath_formated = 'css_task_formated'

onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

def format_css_try(body):
    soup = BeautifulSoup(body, 'html.parser')
    src_ya = soup.find('script', {"src": "https://www.googletagmanager.com/gtag/js?id=UA-106562886-1"})
    src_ya.decompose()
    for script_tag in soup.find_all('script'):
        script_tag_contents = script_tag.get_text()
        if "https://mc.yandex.ru/metrika/tag.js" in script_tag_contents or "https://www.google-analytics.com/analytics.js" in script_tag_contents:
            script_tag.decompose()
    return str(soup)    

for i in onlyfiles:
    try:
        
        f = open(f'{mypath}/{i}', encoding='utf-8')
        soup = BeautifulSoup(f.read(), 'html.parser')
        f.close()
        printed = False
        for a in soup.find_all('a'):
            if 'exercise_' in a['href'] and not 'exercise.php?' in a['href']:
                printed = True
                good = a['href'].split('.')[0] 
                #print(good)
                print(f'<li><a href="/css-task?page={good}">{" ".join(good.split("_"))}</a></li>')
                a['href'] = f'/css-task?page={good}'
        if printed:
            #print(i)
            print(f'<li><a href="/css-theory?page={i}">{" ".join(i.split("_"))}</a></li>')
        # main = soup.find('div', {'id': 'main'})  

        # f = open(f'pages/css_theory/{i}', 'w', encoding='utf-8')
        # f.write(html_template.format(str(soup)))
        # f.close()
    except Exception as e:
        print(e, i)
