from os import listdir
from os.path import isfile, join

from bs4 import BeautifulSoup


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

mypath = 'css_task'
mypath_formated = 'css_task_formated'

onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
print(onlyfiles)


f = open(f'{mypath}/exercise_combinators2.html', encoding='utf-8')
soup = BeautifulSoup(f.read(), 'html.parser')
f.close()

src_ya = soup.find('link', {"href": "/lib/codemirror.css"})
src_ya.decompose()
src_ya = soup.find('script', {"src": "/lib/codemirror.js"})
src_ya.decompose()


codemirrorCSS = soup.new_tag("link", href="../codemirror.css", rel="stylesheet")
w3 = soup.new_tag("link", href="../w3.css", rel="stylesheet")
codemirrorJS = soup.new_tag("script", src="../codemirror.js")
codemirrorJSSetup = soup.new_tag("script", src="../codemirror_setup.js")

soup.html.head.append(codemirrorCSS)
soup.html.head.append(w3)
soup.html.head.append(codemirrorJS)
soup.html.body.append(codemirrorJSSetup)

src_ya = soup.find('script', {"src": "https://yandex.ru/ads/system/context.js"})
src_ya.decompose()
src_ya = soup.find('script', {"src": "https://www.googletagmanager.com/gtag/js?id=UA-106562886-1"})
src_ya.decompose()
menu = soup.find('div', {"id": "menubtn"})
menu.decompose()
menu_items = soup.find('div', {"id": "exercisemenu"})
menu_items.decompose()
div1 = soup.find('div', {"id": "id01"})
div1.decompose()
div2 = soup.find('div', {"id": "id02"})
div2.decompose()

div2 = soup.find('td', {"id": "codeTD"})
div2['style'] = "padding-left: 20px;"

div2 = soup.find('td', {"id": "topTD"})
div2['style'] = "padding-left: 20px;"

div2 = soup.find('td', {"id": "codeTD2"})
div2['style'] = "padding-left: 20px;"


f = open(f'{mypath_formated}/exercise_combinators2.html', 'w', encoding='utf-8')
f.write(str(soup))
f.close()