from flask import Blueprint, request, jsonify, abort, g
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Event import Event, EventSchema
from lib.secure_route import secure_route

router = Blueprint(__name__, 'events')

@router.route('/events', methods=['GET'])
@db_session
def index():
    schema = EventSchema(many=True)
    events = Event.select()
    print(events)
    return schema.dumps(events)


@router.route('/events', methods=['POST'])
@db_session
@secure_route
def create():
    schema = EventSchema()
    try:
        data = schema.load(request.get_json())
        event = Event(**data, created_by=g.current_user)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422
    return schema.dumps(event), 201

@router.route('/events/<int:event_id>', methods=['GET'])
@db_session
def show(event_id):
    schema = EventSchema()
    event = Event.get(id=event_id)
    if not event:
        abort(404)
    return schema.dumps(event)


@router.route('/events/<int:event_id>', methods=['PUT'])
@db_session
def update(event_id):

    schema = EventSchema()
    event = Event.get(id=event_id)

    if not event:
        abort(404)

    try:
        data = schema.load(request.get_json())
        event.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(event)


@router.route('/events/<int:event_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(event_id):

    event = Event.get(id=event_id)

    if not event:
        abort(404)

    event.delete()
    db.commit()

    return '', 204
