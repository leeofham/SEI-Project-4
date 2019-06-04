import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/after-work-db')
secret = os.getenv('SECRET', 'EGXvrZLKY$TzN[6_')
