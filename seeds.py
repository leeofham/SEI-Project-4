import datetime
from pony.orm import db_session
from app import db
from models.Event import Event
from models.Venue import Venue

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    Venue(
        name='Generic pub',
        address='123 street',
        opening='15:00',
        closing='00:00',
        lat=15,
        lon=13
    )
    Venue(
        name='Generic pub2',
        address='456 street',
        opening='15:00',
        closing='00:00',
        lat=19,
        lon=12
    )
    Venue(
        name='Generic pub3',
        address='789 street',
        opening='15:00',
        closing='00:00',
        lat=34,
        lon=52
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
