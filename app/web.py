from sanic import Sanic
from sanic.response import json

from aiohttp import ClientSession
from bs4 import BeautifulSoup

from .models import db
from .settings import DATABASE

db.bind(**DATABASE)
db.generate_mapping(create_tables=True)

app = Sanic()
app.static('/', 'frontend/build/index.html')
app.static('/static/', 'frontend/build/static/')


def parse(html):
    soup = BeautifulSoup(html)
    return soup.find(id='debtDisplayFast').text


@app.route('/api/number/')
async def number(requset):
    async with ClientSession() as session:
        async with session.get('http://www.nationaldebtclocks.org/debtclock/unitedstates') as resp:
            number = parse(await resp.text())
    return json({'number': number}, headers={'Access-Control-Allow-Origin': '*'})


@app.route('/api/news/')
async def news(request):
    page = int(request.args['page'][0])
    async with ClientSession() as session:
        async with session.get('https://nplus1.ru/search?q=сша') as resp:
            news = parse_nplus1_news(await resp.text(), page)
    return json({'news': news}, headers={'Access-Control-Allow-Origin': '*'})
