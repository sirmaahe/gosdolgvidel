import requests

from bs4 import BeautifulSoup

DOMAIN = 'https://nplus1.ru'


def parse(html):
    soup = BeautifulSoup(html, "html.parser")
    news = []
    for article in soup.find_all('article'):
        link = article.find('a')['href']
        caption = article.find(class_='caption').find('h3').text
        date = article.find(class_='date').find(class_='name')['title']
        news.append({'caption': caption, 'link': '{}{}'.format(DOMAIN, link), 'date': date})
    return news


def run():
    news = []
    response = requests.get('https://nplus1.ru/search?q=сша разработали')
    news += parse(response.text)

    response = requests.get('https://nplus1.ru/search?q=американские ученые разработали')
    news += parse(response.text)

    response = requests.get('https://nplus1.ru/search?q=сша создали')
    news += parse(response.text)
    return news
