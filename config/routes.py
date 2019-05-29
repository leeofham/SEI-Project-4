import os
from flask import abort
from app import app
from controllers import events
from controllers import venues
from controllers import auth
from controllers import users
from controllers import yelp


app.register_blueprint(events.router, url_prefix='/api')
app.register_blueprint(venues.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
app.register_blueprint(users.router, url_prefix='/api')
app.register_blueprint(yelp.router, url_prefix='/api')


@app.route('/')
@app.route('/<path:path>')
def catch_all(path='index.html'):
    if os.path.isfile('public/' + path):
        return app.send_static_file(path)

    return abort(404)
