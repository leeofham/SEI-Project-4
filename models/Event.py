from app import db
from pony.orm import Required
from marshmallow import Schema, fields, post_load
from .Venue import Venue


class Event(db.Entity):
    date = Required(str)
    start = Required(str)
    end = Required(str)
    venue = Required('Venue')
    created_by = Required('User')

class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Str(required=True)
    start = fields.Str(required=True)
    end = fields.Str(required=True)
    venue = fields.Nested('VenueSchema', exclude=('events', ))
    created_by = fields.Nested('UserSchema', exclude=('events', ))

    @post_load
    def load_venue(self, data):
        venue = Venue.get(yelp_id=data['venue']['yelp_id'])
        if not venue:
            venue = Venue(**data['venue'])
        data['venue'] = venue
        print(data)
        return data
