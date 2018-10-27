from datetime import datetime

from sanic import Sanic
from sanic.response import json

from aiohttp import ClientSession
from bs4 import BeautifulSoup
from pony import orm

from .models import db, News
from .settings import DATABASE

db.bind(**DATABASE)
db.generate_mapping(create_tables=True)

app = Sanic()
app.static('/', 'frontend/main/build/index.html')
app.static('/static/', 'frontend/main/build/static/')


def parse(html):
    debt = int(html['totalDebt'])
    now = datetime.now()
    return debt + (now.hour * 60 * 60 + now.minute * 60 + now.second) * 44572


@app.route('/api/number/')
async def number(requset):
    async with ClientSession() as session:
        async with session.get('https://www.treasurydirect.gov/NP_WS/debt/current?format=json') as resp:
            number = parse(await resp.json())
    return json({'number': number}, headers={'Access-Control-Allow-Origin': '*'})


@app.route('/api/news/')
async def news(request):
    page = int(request.args['page'][0])
    with orm.db_session:
        news = News.select(lambda n: not n.hide)\
            .order_by(orm.desc(News.date))[(page - 1) * 10:page * 10]
    news = [
        {
            'caption': n.caption,
            'link': n.link,
            'date': n.date.strftime('%d-%m-%Y'),
            'source': n.source,
        } for n in news]
    return json({'news': news}, headers={'Access-Control-Allow-Origin': '*'})
