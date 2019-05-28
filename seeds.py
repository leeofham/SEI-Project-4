import datetime
from pony.orm import db_session
from app import db
from models.Event import Event

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    Event(
        date=datetime.datetime(2019, 5, 17).strftime("%d/%m/%Y"),
        start='20:00',
        end='22:00',
        venue='Generic Pub',
        created_by='liam'
    )

    Event(
        date=datetime.datetime(2019, 6, 14).strftime("%d/%m/%Y"),
        start='17:00',
        end='22:00',
        venue='Generic Pub',
        created_by='liam'
    )

    Event(
        date=datetime.datetime(2019, 7, 12).strftime("%d/%m/%Y"),
        start='15:00',
        end='18:00',
        venue='Generic Pub',
        created_by='liam'
    )

    db.commit()
