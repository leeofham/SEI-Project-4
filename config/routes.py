from app import app
from controllers import events


app.register_blueprint(events.router)
