from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields


class Venue(db.Entity):
    name = Required(str)
    yelp_id = Required(str)
    lat = Required(int)
    lng = Required(int)
    image = Required(str)
    events = Set('Event')


class VenueSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    yelp_id = fields.Str(required=True)
    lat = fields.Int(required=True)
    lng = fields.Int(required=True)
    image = fields.Str(required=True)
    events = fields.Nested('EventSchema', many=True, exclude=('venue', ))
