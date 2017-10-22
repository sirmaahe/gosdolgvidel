from sanic import Sanic
from sanic.response import json

from aiohttp import ClientSession
from bs4 import BeautifulSoup

app = Sanic()


def parse(html):
    soup = BeautifulSoup(html)
    return soup.find(id='debtDisplayFast').text


def parse_nplus1_news(html, page):
    soup = BeautifulSoup(html)
    news = []
    for article in soup.find_all('article')[(page - 1) * 10:page * 10]:
        link = article.find('a')['href']
        caption = article.find(class_='caption').find('h3').text
        date = article.find(class_='date').find(class_='name')['title']
        news.append({'caption': caption, 'link': link, 'date': date})
    return news


@app.route('/number/')
async def number(requset):
    async with ClientSession() as session:
        async with session.get('http://www.nationaldebtclocks.org/debtclock/unitedstates') as resp:
            number = parse(await resp.text())
    return json({'number': number}, headers={'Access-Control-Allow-Origin': '*'})


@app.route('/news/')
async def news(request):
    page = int(request.args['page'][0])
    async with ClientSession() as session:
        async with session.get('https://nplus1.ru/search?q=сша') as resp:
            news = parse_nplus1_news(await resp.text(), page)
    return json({'news': news}, headers={'Access-Control-Allow-Origin': '*'})
