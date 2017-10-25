from datetime import datetime

from pony import orm

db = orm.Database()


class News(db.Entity):
    caption = orm.Required(str)
    hash = orm.Required(str)
    source = orm.Required(str)
    link = orm.Required(str)
    date = orm.Required(datetime)
    img = orm.Optional(str)
