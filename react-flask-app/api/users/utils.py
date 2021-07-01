import jwt
import datetime
from flask import request, jsonify, current_app, url_for
from flask_mail import Message
from api import mail
from api.models import User

def login_required(f):
    # @wraps(f)
    def wrapper(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            #  this is for deployement pourpose
            # return jsonify({"data": {"message": 'Login required to access this page}}), 401
            return jsonify({"data": {"message": 'Token is missing'}}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(email=data['email']).first()
        except:
            #  this is for deployement pourpose
            # return jsonify({'data': {"message": 'Login required to access this page'}}), 401
            return jsonify({'data': {"message": 'Token is invalid!'}}), 401


        return f(current_user, *args, **kwargs)

    return wrapper

def send_reset_email(user, url):

    token = jwt.encode({"email": user.email, 
                            "exp": datetime.datetime.utcnow() +
                            datetime.timedelta(minutes=5)}, current_app.config["SECRET_KEY"], algorithm="HS256")

    # {url_for('reset_token', token=token, _external=True)}   
    msg = Message('Password Reset Request',
                  sender='noreply@demo.com',
                  recipients=[user.email])
    msg.body = f'''To reset your password, visit the following link:
{url + '/' + token}
If you did not make this request then simply ignore this email and no changes will be made.
'''
    mail.send(msg)