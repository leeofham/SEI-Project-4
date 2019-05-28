from flask import Blueprint, abort
from pony.orm import db_session
from models.User import User, UserSchema
from lib.secure_route import secure_route

router = Blueprint(__name__, 'users')

@router.route('/users', methods=['GET'])
@db_session
@secure_route
def index():
    schema = UserSchema(many=True)
    users = User.select()
    print(users)
    return schema.dumps(users)

@router.route('/users/<int:user_id>', methods=['GET'])
@db_session
@secure_route
def show(user_id):
    schema = UserSchema()
    user = User.get(id=user_id)
    if not user:
        abort(404)
    return schema.dumps(user)
