from base64 import encode

import requests
from bs4 import BeautifulSoup

from format_task import format_task_try 
from format_theory import format_theory_try

theme = 'sql_theory'

url = f'https://schoolsw3.com/sql/index.php'

r = requests.get(url)
with open('index.html', 'w') as file:
    file.write(r.text)

soup = BeautifulSoup(r.text, 'html.parser')

header = soup.find('div', {"id": "leftmenuinnerinner"})
res = header.select('a[target="_top"]')

url = f'https://schoolsw3.com/sql/'
for idx, i in enumerate(res):
    link = i['href']
    inner_text = i.text
    name = link.split('.')[0]
    r = requests.get(url + link)
    print(f'<a href="/item?type=sql_theory&page={name}_{idx}">{inner_text}</a>')
    # print(name)
    if name == 'sql_operators':
        continue
    body = format_theory_try(r.text)
    
    with open(f'pages/{theme}/{name}_{idx}.html', 'w', encoding='utf-8') as file:
        file.write(body)
