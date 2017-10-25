# тут типа берется список файлов из modules/, а там фунции run и они запускаются
import os
from hashlib import md5
from importlib import import_module
from pony.orm import db_session

from models import db, News
from settings import DATABASE

db.bind(**DATABASE)
db.generate_mapping(create_tables=True)

modules = os.listdir('app/news_modules')
modules = [
    (
        module.replace('.py', ''),
        import_module('news_modules.{}'.format(module.replace('.py', '')))
    )
    for module in modules if not module.startswith('__')
]


if __name__ == '__main__':
    for name, module in modules:
        news = module.run()
        for n in news:
            hash = md5(n['caption'].encode()).hexdigest()

            with db_session:
                if len(News.select(lambda n: n.hash == hash and n.source == name)):
                    continue

                News(source=name, hash=hash, **n)
