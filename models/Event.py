from app import db
from pony.orm import Required
from marshmallow import Schema, fields, post_load
from .Venue import Venue


class Event(db.Entity):
    date = Required(str)
    start = Required(str)
    end = Required(str)
    venue = Required('Venue')
    created_by = Required(str)

class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Str(required=True)
    start = fields.Str(required=True)
    end = fields.Str(required=True)
    venue = fields.Nested('VenueSchema', dump_only=True, exclude=('events', ))
    venue_id = fields.Int(load_only=True)
    created_by = fields.Str(required=True)

@post_load
def load_venue(_self, data):
    data['venue'] = Venue.get(id=data['venue_id'])
    del data['venue_id']

    return data
