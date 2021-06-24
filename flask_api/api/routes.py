import re
import jwt
import datetime
from flask import request, jsonify
from functools import wraps
from api import app, db, bcrypt
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
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(email=data['email']).first()
        except:
            #  this is for deployement pourpose
            # return jsonify({'data': {"message": 'Login required to access this page'}}), 401
            return jsonify({'data': {"message": 'Token is invalid!'}}), 401


        return f(current_user, *args, **kwargs)

    return wrapper

@app.route("/users")
def get_users():
    users = User.query.all()
    formated_user = []
    for user in users: 
        formated_user.append({'username': user.username, 'email': user.email})
    return jsonify({'data': {"message": "You have successfully fetched a data", "payload": formated_user}}), 201

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

# validated_form_fields = {"added_all": False}
# def add_validated_fields(key, value, all_added=False):
#     validated_form_fields[key]= value 
#     if all_added and validated_form_fields.get("username") and validated_form_fields.get("email"):
#         validated_form_fields['added_all'] = True



@app.route('/register', methods=['POST'])
def register():
    
    user = request.get_json()

    if user['type'] == "username":
        username = user['value']
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
            # add_validated_fields("username", username)
            return jsonify({'data': {"message": 'Username is available'}}), 201


    elif user['type'] == "email":
        email = user['value']
        email_validation = r'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
        email_match = re.match(email_validation, email)
        if email_match is None:
            return jsonify({"data": {"message": "Please enter valid email. i.e example@demo.com"}}), 401

        email_exist = User.query.filter_by(email=email).first()
        if email_exist:
            return jsonify({"data": {"message": "Email is already taken.Please enter another values"}}), 401
        # add_validated_fields('email', email)
        return jsonify({'data': {"message": 'Email is available'}}), 201
        
    elif user['type'] == "password":
        password = user["value"]
        password_validation = r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
        password_match = re.match(password_validation, password)
        if password_match is None:
            return jsonify({"data": {"message": """Password must be of 8 character should include special character(i.e
          @/#/$/% etc.), a-z, A-Z and 0-9. i.e Example@1234"""}}), 401
        # add_validated_fields("password", password, all_added=True)
        return jsonify({'data': {"message": 'Password is valid'}}), 201

    if user['type'] == 'submit' :
        user_data = user.get('value')
        hashed_pw = bcrypt.generate_password_hash(user_data.get('password'))

        new_user = User(username=user_data.get('username'), email=user_data.get('email'), password=hashed_pw)
        db.session.add(new_user)
        db.session.commit()
        # validated_form_fields.pop("username")
        # validated_form_fields.pop("email")
        # validated_form_fields.pop("password")
        # validated_form_fields["added_all"] = False

        return jsonify({"data": {"message": "You have registered successfully"}}), 201

    return jsonify({'data': {"message": 'Success'}}), 201

entered_value = {"all_valid": False}

@app.route('/login', methods=['POST'])
def login():
    user = request.get_json()

    if user['type'] == 'submit' and entered_value.get('all_valid') and entered_value.get('user'):
        token = jwt.encode({'email' : entered_value['user'].email, 
                                'exp' : datetime.datetime.utcnow() + 
                                datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'data':{"message": "You have logged in successfully", "payload": token}}), 201

    if not user or not user['value'] or not user['type']:
        return jsonify({"data": {"message": 'Please enter some value'}}), 401
        
    if user.get('type') == 'email':
        email = user['value']
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"data": {"message": 'Please enter valid email'}}), 401
        entered_value['user'] = user
        return jsonify({"data": {"message":'Valid email'}}), 201

    if user['type'] == 'password':
        if not entered_value.get('user'):
            return jsonify({"data": {"message": 'First enter valid email'}}), 401
        password = user['value']

        if not bcrypt.check_password_hash(entered_value['user'].password, password):
            return jsonify({"data": {"message": 'Password is incorrect'}}), 401
        entered_value['all_valid'] = True
        return jsonify({"data": {"message":'Valid password'}}), 201

 


@app.route('/about')
@login_required
def about(current_user):
    username = current_user.username
    email = current_user.email
    return jsonify({"data": {"message": "You have successfully accessed about page", 
                            "payload": {"username":username, "email":email}}}), 201