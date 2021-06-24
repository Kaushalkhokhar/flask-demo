from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# This is for protecting form fields
app.config['SECRET_KEY'] = '523b5a760673e5af972e7c0d308d7bc2'
# To generate secret key secrets.token_hex(16)

# this is for react specific to allow CORS
# app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app, resources={r"/get_users": {"origins": "http://localhost:3000"}})

# This is for database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # To suppress the warning message when accessing the database
db = SQLAlchemy(app) # To create an instance of that database

# this is for hashing a password enterd by user
bcrypt = Bcrypt(app)


from api import routes