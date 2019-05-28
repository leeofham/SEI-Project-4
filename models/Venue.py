from app import db
from pony.orm import Required
from marshmallow import Schema, fields

class Event(db.Entity):
    name = Required(str)
    address = Required(str)
    opening = Required(str)
    closing = Required(str)
    lat = Required(int)
    lon = Required(int)


class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    address = fields.Str(required=True)
    opening = fields.Str(required=True)
    closing = fields.Str(required=True)
    lat = fields.Int(required=True)
    lon = fields.Int(required=True)
