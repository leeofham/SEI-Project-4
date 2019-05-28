from flask import Flask
from pony.orm import Database

app = Flask(__name__)
db = Database()

db.bind('postgres', 'postgres://localhost:5432/after-work-db')

# pylint: disable=W0611,C0413
from config import routes

db.generate_mapping(create_tables=True)
