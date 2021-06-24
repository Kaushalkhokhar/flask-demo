from enum import Flag
import os
import re
import secrets
from typing_extensions import ParamSpecKwargs
import jwt
import datetime
from PIL import Image
from flask import json, render_template, flash, redirect, url_for, request, jsonify, abort, make_response
from functools import wraps
from flask_cors import cross_origin
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.wrappers.request import PlainRequest
from flaskapp import app, db, bcrypt
from flaskapp.forms import RegistrationForm, LoginForm, UpdateAccountForm, PostForm
from flaskapp.models import Post, User


@app.route("/")
@app.route("/home")
def home():
    posts = Post.query.all()
    return render_template('home.html', posts=posts)

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, password=hashed_pw, email=form.email.data)
        db.session.add(user)
        db.session.commit()
        flash('Your account is created. Please log in', 'success')
        # Here second arguement in flash is category of the messsage
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next') # this is to get the query parameter added to url
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


@app.route("/account", methods=['GET', "POST"])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account', image_file=image_file, form=form)


@app.route("/post/new", methods=['GET', 'POST'])
@login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title=form.title.data, content=form.content.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created!', 'success')
        return redirect(url_for('home'))
    return render_template('create_post.html', title='New Post',
                           form=form, legend='New Post')


@app.route("/post/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id) # this return post or 404 page
    return render_template('post.html', title=post.title, post=post)

@app.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user: # this is for someone tries to access 
        # post from urls which is not created by him/her
        abort(403) 
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit() # don't need db.session.add to update the database
        flash('Your post has been updated!', 'success')
        return redirect(url_for('post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
    return render_template('create_post.html', title='Update Post',
                           form=form, legend='Update Post')

@app.route("/post/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('home'))

@app.route("/get_users")
def get_users():
    users = User.query.all()
    formated_user = []
    for user in users: 
        formated_user.append({'username': user.username, 'email': user.email})
    return jsonify({'data': {"message": "You have successfully fetched a data", "payload": formated_user}}), 201

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

validated_form_fields = {"added_all": False}
def add_validated_fields(key, value, all_added=False):
    validated_form_fields[key]= value 
    if all_added and validated_form_fields.get("username") and validated_form_fields.get("email"):
        validated_form_fields['added_all'] = True



@app.route('/add_user', methods=['POST'])
def add_user():
    
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
            add_validated_fields("username", username)
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
        add_validated_fields('email', email)
        return jsonify({'data': {"message": 'Email is available'}}), 201
        
    elif user['type'] == "password":
        password = user["value"]
        password_validation = r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
        password_match = re.match(password_validation, password)
        if password_match is None:
            return jsonify({"data": {"message": """Password must be of 8 character should include special character(i.e
          @/#/$/% etc.), a-z, A-Z and 0-9. i.e Example@1234"""}}), 401
        add_validated_fields("password", password, all_added=True)
        return jsonify({'data': {"message": 'Password is valid'}}), 201

    if validated_form_fields['added_all'] and user['type'] == 'submit' :
        hashed_pw = bcrypt.generate_password_hash(validated_form_fields['password']).decode('utf-8')

        new_user = User(username=validated_form_fields['username'], email=validated_form_fields['email'], password=hashed_pw)
        db.session.add(new_user)
        db.session.commit()
        validated_form_fields.pop("username")
        validated_form_fields.pop("email")
        validated_form_fields.pop("password")
        validated_form_fields["added_all"] = False

        return jsonify({"data": {"message": "You have registered successfully"}}), 201

    return jsonify({'data': {"message": 'Success'}}), 201

entered_value = {"all_valid": False}

@app.route('/login_user', methods=['POST'])
def login_user():
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

@app.route('/about_page')
@login_required
def about_page(current_user):
    username = current_user.username
    email = current_user.email
    return jsonify({"data": {"message": "You have successfully accessed about page", 
                            "payload": {"username":username, "email":email}}}), 201