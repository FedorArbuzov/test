from bs4 import BeautifulSoup

def format_task_try(body):
    soup = BeautifulSoup(body, 'html.parser')
    try:
        #src_ya = soup.find('script', {"async src": "https://mc.yandex.ru/metrika/tag.js"})
        #src_ya.decompose()
        #src_ya = soup.find('script', {"src": "https://www.google-analytics.com/analytics.js"})
        #src_ya.decompose()
        src_ya = soup.find('script', {"src": "https://www.googletagmanager.com/gtag/js?id=UA-106562886-1"})
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
        if "https://mc.yandex.ru/metrika/tag.js" in script_tag_contents or "https://www.google-analytics.com/analytics.js" in script_tag_contents or "yandex_rtb_R-A-1418359-1" in script_tag_contents:
            script_tag.decompose()
    return str(soup)  