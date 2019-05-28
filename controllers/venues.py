from flask import Blueprint, request, jsonify, abort
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Venue import Venue, VenueSchema

router = Blueprint(__name__, 'venues')

@router.route('/venues', methods=['GET'])
@db_session
def index():
    schema = VenueSchema(many=True)
    venues = Venue.select()
    print(venues)
    return schema.dumps(venues)


@router.route('/venues', methods=['POST'])
@db_session
def create():

    schema = VenueSchema()

    try:
        data = schema.load(request.get_json())
        venue = Venue(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422
    return schema.dumps(venue), 201

@router.route('/venues/<int:venue_id>', methods=['GET'])
@db_session
def show(venue_id):
    schema = VenueSchema()
    venue = Venue.get(id=venue_id)
    if not venue:
        abort(404)
    return schema.dumps(venue)


@router.route('/venues/<int:venue_id>', methods=['PUT'])
@db_session
def update(venue_id):

    schema = VenueSchema()
    venue = Venue.get(id=venue_id)

    if not venue:
        abort(404)

    try:
        data = schema.load(request.get_json())
        venue.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(venue)


@router.route('/venues/<int:venue_id>', methods=['DELETE'])
@db_session
def delete(venue_id):

    venue = Venue.get(id=venue_id)

    if not venue:
        abort(404)

    venue.delete()
    db.commit()

    return '', 204
