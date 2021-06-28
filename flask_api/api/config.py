import os

class Config:
    # This is for protecting form fields
    SECRET_KEY = '523b5a760673e5af972e7c0d308d7bc2'
    # To generate secret key secrets.token_hex(16) 
    
    # This is for database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False # To suppress the warning message when accessing the database
    
    # this is for sending reset password mail
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS')
    MAIL_USERNAME = os.environ.get('EMAIL_USER')