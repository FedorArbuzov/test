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

for i in onlyfiles:
    try:
        f = open(f'{mypath}/{i}', encoding='utf-8')
        soup = BeautifulSoup(f.read(), 'html.parser')
        f.close()

        src_ya = soup.find('link', {"href": "/lib/codemirror.css"})
        src_ya.decompose()
        src_ya = soup.find('script', {"src": "/lib/codemirror.js"})
        src_ya.decompose()

        for script_tag in soup.find_all('script'):
            script_tag_contents = script_tag.get_text()
            if "https://mc.yandex.ru/metrika/tag.js" in script_tag_contents:
                script_tag.decompose()

        codemirrorCSS = soup.new_tag("link", href="../codemirror_html.css", rel="stylesheet")
        w3 = soup.new_tag("link", href="../w3.css", rel="stylesheet")
        codemirrorJS = soup.new_tag("script", src="../codemirror_html.js")
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
        menu['style'] = "display: none;"
        menu_items = soup.find('div', {"id": "exercisemenu"})
        menu_items['style'] = "display: none;"
        div1 = soup.find('div', {"id": "id01"})
        div1['style'] = "display: none;"
        div2 = soup.find('div', {"id": "id02"})
        div2['style'] = "display: none;"

        div2 = soup.find('td', {"id": "codeTD"})
        div2['style'] = "padding-left: 20px;"

        div2 = soup.find('td', {"id": "topTD"})
        div2['style'] = "padding-left: 20px;"

        div2 = soup.find('td', {"id": "codeTD2"})
        div2['style'] = "padding-left: 20px;"


        f = open(f'pages/css_tasks/{i}', 'w', encoding='utf-8')
        f.write(str(soup))
        f.close()
    except Exception as e:
        print(e, i)
