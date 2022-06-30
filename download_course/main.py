import requests
from bs4 import BeautifulSoup

theme = 'css_task'

url = f'https://schoolsw3.com/css/exercise_selectors1.php'

r = requests.get(url)
with open('index.html', 'w') as file:
    file.write(r.text)

soup = BeautifulSoup(r.text, 'html.parser')

header = soup.find('div', {"class": "exercisemenuinner"})
res = header.select('a[class="exbtn"]')

url = f'https://schoolsw3.com/css/'
for i in res:
    link = i['href']
    name = link.split('.')[0]
    r = requests.get(url + link)
    print(name)
    with open(f'{theme}/{name}.html', 'w') as file:
        file.write(r.text)
