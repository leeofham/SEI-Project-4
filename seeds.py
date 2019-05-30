import datetime
from pony.orm import db_session
from app import db
from models.Event import Event
from models.Venue import Venue
from models.User import User, UserSchema


db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    schema = UserSchema()
    current_user = User(
        username='leeofham',
        email='leeofham@gmail.com',
        password_hash=schema.generate_hash('pass'),
    )
    gen_pub1 = Venue(
        name='Generic pub',
    )
    gen_pub2 = Venue(
        name='Generic pub2',
    )
    gen_pub3 = Venue(
        name='Generic pub3',
    )

    Event(
        date=datetime.date(2019, 6, 14).strftime("%d/%m/%Y"),
        start='17:00',
        end='22:00',
        venue=gen_pub1,
        created_by=current_user
    )

    Event(
        date=datetime.date(2019, 7, 12).strftime("%d/%m/%Y"),
        start='15:00',
        end='18:00',
        venue=gen_pub1,
        created_by=current_user
    )

    db.commit()
