from flask import Flask
from flask.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from api.config import Config




db = SQLAlchemy() # To create an instance of that database
# this is for hashing a password enterd by user
bcrypt = Bcrypt()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder="../build", static_url_path="/")
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    from api.users.routes import users
    from api.main.routes import main
    from api.index.routes import index

    app.register_blueprint(users)
    app.register_blueprint(main)
    app.register_blueprint(index)
    

    return app