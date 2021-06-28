import re
import jwt
import datetime
from flask import request, jsonify, Blueprint, current_app

from api import db, bcrypt
from api.models import User
from api.users.utils import send_reset_email


users = Blueprint('example_blueprint', __name__)


@users.route("/users")
def get_users():
    users = User.query.all()
    formated_user = []
    for user in users: 
        formated_user.append({'username': user.username, 'email': user.email})
    return jsonify({'data': {"message": "You have successfully fetched a data", "payload": formated_user}}), 201

@users.route('/register', methods=['POST'])
def register():
    
    user = request.get_json()

    if user['type'] == "username":
        username = user['value']

        if len(username) == 0:
            return jsonify({"data": {"message": "Username can not be blank"}}), 401

        # remove backslash(/) from start and end when copy regex from javascript
        # username_validation = r"^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
        username_validation = r"^[a-zA-Z0-9]+$" 
        user_match = re.match(username_validation, username)
        if user_match is None:
            return jsonify({"data": {"message": 'Please enter valid username between 8 to 20 characters long. i.e example123'}}), 401
        elif len(username) < 8:
            return jsonify({"data": {"message": 'Username should be at least 8 characters long'}}), 401
        elif len(username) > 20:
            return jsonify({"data": {"message": 'Username should be at most 20 characters long'}}), 401
        else:
            username_exist = User.query.filter_by(username=username).first()
            if username_exist:
                return jsonify({"data": {"message": 'Username is already taken. Please enter the other value'}}), 401
            return jsonify({'data': {"message": 'Username is available'}}), 201


    elif user['type'] == "email":
        email = user['value']

        if len(email) == 0:
            return jsonify({"data": {"message": "Email can not be blank"}}), 401
    
        email_validation = r'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
        email_match = re.match(email_validation, email)
        if email_match is None:
            return jsonify({"data": {"message": "Please enter valid email. i.e example@demo.com"}}), 401

        email_exist = User.query.filter_by(email=email).first()
        if email_exist:
            return jsonify({"data": {"message": "Email is already taken.Please enter another values"}}), 401
        return jsonify({'data': {"message": 'Email is available'}}), 201
        
    elif user['type'] == "password":
        password = user["value"]

        if len(password) == 0:
            return jsonify({"data": {"message": "Password can not be blank"}}), 401

        password_validation = r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
        password_match = re.match(password_validation, password)
        if password_match is None:
            return jsonify({"data": {"message": """Password must be of 8 character should include special character(i.e
          @/#/$/% etc.), a-z, A-Z and 0-9. i.e Example@1234"""}}), 401
        return jsonify({'data': {"message": 'Password is valid'}}), 201

    if user['type'] == 'submit' :
        user_data = user.get('value')
        hashed_pw = bcrypt.generate_password_hash(user_data.get('password'))

        new_user = User(username=user_data.get('username'), email=user_data.get('email'), password=hashed_pw)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"data": {"message": "You have registered successfully"}}), 201

    return jsonify({'data': {"message": 'Success'}}), 201


@users.route('/login', methods=['POST'])
def login():
    user = request.get_json()

    if user['type'] == 'submit':
        user_data = user.get('value')
        user = User.query.filter_by(email=user_data.get("email")).first()
        print(user_data)
        matched = bcrypt.check_password_hash(user.password, user_data.get("password"))

        if not matched:
            return jsonify({"data": {"message": 'Password is incorrect.Please enter correct password'}}), 401
 
        token = jwt.encode({'email': user_data.get('email'), 
                                'exp': datetime.datetime.utcnow() + 
                                datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'data':{"message": "You have logged in successfully", "payload": token}}), 201

    if not user or not user['type']:
        return jsonify({"data": {"message": 'Something went wrong'}}), 401
        
    if user.get('type') == 'email':
        email = user['value']

        if len(email) == 0:
            return jsonify({"data": {"message": 'Email can not be blank'}}), 401

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"data": {"message": 'Please enter valid email'}}), 401
        return jsonify({"data": {"message":'Valid email'}}), 201

    if user['type'] == 'password':
        password = user['value']

        if not len(password) > 0:
            return jsonify({"data": {"message": 'Password can not be blank'}}), 401

        password_validation = r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
        password_match = re.match(password_validation, password)
        if password_match is None:
            return jsonify({"data": {"message": """Password must be of 8 character should include special character(i.e
          @/#/$/% etc.), a-z, A-Z and 0-9. i.e Example@1234"""}}), 401
        return jsonify({"data": {"message":'Valid password'}}), 201

@users.route('/reset_request', methods=['POST'])
def reset_request():
    user = request.get_json()

    if user.get('type') == 'submit':
        userData = user.get('value')
        user = User.query.filter_by(email=userData.get('email')).first()

        if not user:
            return jsonify({"data": {"message": "Please enter valid email"}}), 401

        send_reset_email(user)

        return jsonify({"data": {"message": "An email has been sent with instructions to reset your password"}}), 201

    elif user.get('type') == 'email':
        email = user.get('value')
        email_validation = r'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
        email_match = re.match(email_validation, email)
        if email_match is None:
            return jsonify({"data": {"message": "Please enter valid email. i.e example@demo.com"}}), 401
        return jsonify({"data": {"message":'Valid email'}}), 201

    return jsonify({"data": {"message": "Something went wrong.Please try again"}}), 401

@users.route('/reset_password', methods=['POST'])
def reset_password():
    user = request.get_json()

    if user.get('type') == "password":
        password = user.get("value")
        if not len(password) > 0:
            return jsonify({"data": {"message": 'Password can not be blank'}}), 401

        password_validation = r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
        password_match = re.match(password_validation, password)
        if password_match is None:
            return jsonify({"data": {"message": """Password must be of 8 character should include special character(i.e
        @/#/$/% etc.), a-z, A-Z and 0-9. i.e Example@1234"""}}), 401
        return jsonify({"data": {"message":'Valid password'}}), 201

    if user.get('type') == 'submit':
        userData = user.get('value')

        token = userData.get('token')

        if not token:
            # this is for deployement pourpose
            # return jsonify({"data": {"message": 'Login required to access this page}}), 401
            return jsonify({"data": {"message": 'Token is missing'}}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user = User.query.filter_by(email=data['email']).first()
            hashed_password = bcrypt.generate_password_hash(userData.get('password'))
            user.password = hashed_password
            db.session.commit()

            return jsonify({"data": {"message": "Your password has been updated!You are now able to log in"}}), 201

        except:
            # this is for deployement pourpose
            # return jsonify({'data': {"message": 'Login required to access this page'}}), 401
            return jsonify({'data': {"message": 'Token is invalid!'}}), 401
