from sanic import Sanic
from sanic.response import json

from pony import orm

from .models import db, News
from .settings import DATABASE

db.bind(**DATABASE)
db.generate_mapping(create_tables=True)

app = Sanic()
app.static('/', 'frontend/admin/build/index.html')
app.static('/static/', 'frontend/admin/build/static/')


@app.route('/api/')
async def news(request):
    with orm.db_session:
        news = [
            {
                'id': n.id,
                'caption': n.caption,
                'link': n.link,
                'date': n.date.strftime('%d-%m-%Y'),
                'source': n.source,
            } for n in News.select(lambda n: not n.hide) \
                   .order_by(orm.desc(News.date))]
    return json({'news': news}, headers={'Access-Control-Allow-Origin': '*'})


@app.route('/api/<id>/', methods=('DELETE',))
async def delete(request, id):
    with orm.db_session:
        n = News[id]
        n.hide = True
        orm.commit()
    return json({}, headers={'Access-Control-Allow-Origin': '*'})
