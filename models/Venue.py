from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields


class Venue(db.Entity):
    name = Required(str)
    events = Set('Event')


class VenueSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    events = fields.Nested('EventSchema', many=True, exclude=('venue', ))
