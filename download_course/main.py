from base64 import encode
import requests
from bs4 import BeautifulSoup

def format_css_try(body):
    soup = BeautifulSoup(body, 'html.parser')
    try:
        src_ya = soup.find('img', {"src": "https://mc.yandex.ru/watch/45941085"})
        src_ya.decompose()
        src_ya = soup.find('script', {"src": "https://yandex.ru/ads/system/context.js"})
        src_ya.decompose()
        tag = soup.find('td', {"id": 'topTD'})
        tag['style'] = "padding-left: 20px;"
        tag = soup.find('div', {"class": 'exercisemenu'})
        tag['style'] = "display: none;"
        tag = soup.find('div', {"id": 'menubtn'})
        tag['style'] = "display: none;"
        tag = soup.find('button', {"class": 'showanswerbutton'})
        tag['style'] = "display: none;"
        tag = soup.find('span', {"id": 'correctnextbtn'})
        tag['style'] = "display: none;"
        original_tag = soup.find('body')
        new_tag = soup.new_tag("script", src="../setup.js")
        original_tag.append(new_tag)
    except Exception as e:
        print('mc error', e)
    for script_tag in soup.find_all('script'):
        script_tag_contents = script_tag.get_text()
        if "https://mc.yandex.ru/metrika/tag.js" in script_tag_contents or "https://www.google-analytics.com/analytics.js" in script_tag_contents:
            script_tag.decompose()
    return str(soup)   

theme = 'python_tasks'

url = f'https://schoolsw3.com/python/exercise.php?filename=exercise_datatypes1'

r = requests.get(url)
with open('index.html', 'w') as file:
    file.write(r.text)

soup = BeautifulSoup(r.text, 'html.parser')
header = soup.find('div', {"class": "exercisemenuinner"})
res = header.select('a[class="exbtn"]')

url = f'https://schoolsw3.com/python/'
for idx, i in enumerate(res):
    link = i['href']
    name = link.split('.')[0]
    r = requests.get(url + link)
    body = format_css_try(r.text)
    print(name)
    with open(f'pages/{theme}/{name}_{idx}.html', 'w', encoding='utf-8') as file:
        file.write(body)
