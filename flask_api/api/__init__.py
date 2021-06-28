import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_mail import Mail

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

# this is for sending reset password mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
mail = Mail(app)


from api import routes