from datetime import datetime
from api import db


# here usermixin is for login and logout management
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # primary_key will assign a key automatically
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    # here algo for hashing password will 
    # generate 60 character long so we have assigend 60 here
    posts = db.relationship('Post', backref='author', lazy=True)
    # relationship with POST modal
    # backref is similar to adding a another column 
    # to the POST modal
    # lazy arguement defined when sqlalchemy loads data 
    # from database
    # lazy true means allows to load post data
    # this is relationship not a column of database

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # here we referencing the table/column name 
    # so it is lowercase. i.e('user.id)
    # whereas in user-posts we referecing the class 
    # so it is uppercase. i.e('Post')
    
    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"
