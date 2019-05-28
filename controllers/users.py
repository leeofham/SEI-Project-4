from flask import Blueprint
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
