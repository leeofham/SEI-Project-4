from app import db
from pony.orm import Required
from marshmallow import Schema, fields

class Event(db.Entity):
    date = Required(str)
    start = Required(str)
    end = Required(str)
    venue = Required(str)
    created_by = Required(str)

class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Str(required=True)
    start = fields.Str(required=True)
    end = fields.Str(required=True)
    venue = fields.Str(required=True)
    created_by = fields.Str(required=True)
