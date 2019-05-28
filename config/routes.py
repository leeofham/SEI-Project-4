from app import app
from controllers import events
from controllers import venues


app.register_blueprint(venues.router)
app.register_blueprint(events.router)
