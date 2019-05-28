from app import app
from controllers import events
from controllers import venues
from controllers import auth
from controllers import users

app.register_blueprint(events.router)
app.register_blueprint(venues.router)
app.register_blueprint(auth.router)
app.register_blueprint(users.router)
