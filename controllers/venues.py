from flask import Blueprint, request, jsonify, abort
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Venue import Venue, VenueSchema
from lib.secure_route import secure_route

router = Blueprint(__name__, 'venues')

@router.route('/venues', methods=['GET'])
@db_session
@secure_route
def index():
    schema = VenueSchema(many=True)
    venues = Venue.select()
    print(venues)
    return schema.dumps(venues)


@router.route('/venues', methods=['POST'])
@db_session
@secure_route
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
@secure_route
def show(venue_id):
    schema = VenueSchema()
    venue = Venue.get(id=venue_id)
    if not venue:
        abort(404)
    return schema.dumps(venue)


@router.route('/venues/<int:venue_id>', methods=['PUT'])
@db_session
@secure_route
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
@secure_route
def delete(venue_id):

    venue = Venue.get(id=venue_id)

    if not venue:
        abort(404)

    venue.delete()
    db.commit()

    return '', 204
