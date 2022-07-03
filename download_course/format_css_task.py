from os import listdir
from os.path import isfile, join

import requests
from bs4 import BeautifulSoup


url = f'https://schoolsw3.com/css/'

html_template = """
<html>
    <head>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        {0}
    </body>
</html>
"""

mypath = 'css_formated'
mypath_formated = 'css_task_formated'

onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
print(onlyfiles)

def format_css_try(body):
    soup = BeautifulSoup(body, 'html.parser')
    src_ya = soup.find('script', {"src": "https://www.googletagmanager.com/gtag/js?id=UA-106562886-1"})
    src_ya.decompose()
    for script_tag in soup.find_all('script'):
        script_tag_contents = script_tag.get_text()
        if "https://mc.yandex.ru/metrika/tag.js" in script_tag_contents:
            script_tag.decompose()
    return str(soup)    

for i in onlyfiles:
    try:
        print(i)
        f = open(f'{mypath}/{i}', encoding='utf-8')
        soup = BeautifulSoup(f.read(), 'html.parser')
        f.close()
        for i in soup.find_all('a'):
            href = i['href']
            if 'trycss' in href:
                print(href)
                if 'filename' in href:
                    result_link = href.split('filename=')[1]
                else:
                    result_link = href.split('.')[0]
                    print(result_link)
                    r = requests.get(url + href)
                    with open(f'css_try/{result_link}.html', 'w', encoding='utf-8') as file:
                        file.write(format_css_try(r.text))
                    break

            

        # f = open(f'pages/css_theory/{i}', 'w', encoding='utf-8')
        # f.write(str(soup))
        # f.close()
    except Exception as e:
        print(e, i)
