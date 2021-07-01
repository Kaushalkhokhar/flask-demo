### FLask Important points

## Video 1
- to start an app on port 5000
    - export FLASK_APP=(name-of-app).py i.e flaskapp.py
        - on Powershell -> $env:FLASK_APP='./flaskapp.py"
    - env FLASK_APP=(name-of-app).py flask run
        - on Powershell -> flask run
    
- to start debug mode. debug mode will used to auto-update the changes made in file
    - export FLASK_DEBUG=1
        on Powershell -> $env:FLASK_DEBUG=1


- to run flask app directly without env variable we need to add
    - if __name__ == "__main__": <br>
        app.run(debug=True)
    - and now just run with -> python flaskapp.py

- we can define route with 
    - @app.route("/about") <br>
        def about(): <br>
            return "<p>About page</p>"


## Video 2 - Jinja templating and styling
- render_template is used to render a templates
    - render_template('home.html')
        - location of home.html will be -> ./flask_blog/templates/home.html

- to pass a data to templates
    - render_template('home.html', posts=posts)

- templating engin in flaks is jinja2
    - for for-loop 
        - {% for post in posts %} <br>
            {% endfor %}

    - for content
        - <p>{{ post.title }}</p>
        - <p>By {{ post.author }} on {{ post.date_posted }}</p>

    - for if-statements
        - {% if title %} <br>
                <title>Flask Blog - {{ title }}</title> <br>
            {% else %}  <br>
                <title>Flask Blog</title> <br>
            {% endif %}

    - template inheritance in jinja2
        - to create a block <br>
            {% block content %} <br>
            {% endblock content %}
        - to use this block
            {% extends "layout.html" %}
            {% block content %} <br>
                ...Your content goed here.. <br>
            {% endblock content %}

- css file should be located in 
    - ./flask_blog/static/main.css

- to locate/link the file we need to import url_for
    - from flask import url_for

    - to use this is .html file
        - href="{{ url_for('static', filename='main.css') }}"


## Video 3 - Creating forms and validation
- WTForms is used for form validation and checks
    - to install it -> pip install flask-wtf
- This is different then html forms. With WTForms we just create a class and then wtf itself renders the all forms fields with that class
- When we use this forms, we need to assign secret key for our application. Secretkey will protect agaist modifying cookies, and Crosssite request, portry attect and things like that...
    - for this
        - app.config['SECRET_KEY'] =  '523b5a760673e5af972e7c0d308d7bc2'
    - and add {{ form.hidden_tag() }} to .html for csrf token handling
- for adding class to wtforms fields
    - {{ form.username.lable(class='form-control-label') }}

- to navigate to given route we should use
    - {{ url_for('login') }}
    - here login is not the name of route but name of function 

- To accept a post request we need to allow it in route by
    - @app.route("/register", methods=['GET', 'POST'])

- to check validation of form
    - if form.validation_on_submit(): <br>
        flash(f'Message to be flashed', 'category-of-message')
    - here category can be used to specify class based on different category

- to redirect to specified page
    - redirect(url_for('home'))

- to display flash messages add following to .html
    - {% with messages = get_flashed_messages(with_categories=true) %} <br>
    {% endwith %}
    - here messages will get the return value of get_flashed_messages function

## Video 4 - Database and FLask-SQLAlchemy
- SQLAlchemy is very popular ORM for accessing different database
- ORM is Object relation mapper, is used to access database and thing which is good about it is, allows to access different database without changing a python code
- to install flask-sqlalchemy
    - pip install flask-sqlalchemy

- there is also a general sqlalchemy. but for flask we use flask-sqlalchemy

- sqlalchemy allows to create a database using classes also known as modal
- For mote about sqllechemy database access use documentation
- we do not have to do db.session.add to update the database. just directly to db.session.commit()

## Video 5 - Package Structure
- When we access any class(i.e User, Post) from modules(i.e models) it runs whole module not only section that is imported

- __init__.py will create a package structure for that folder. This file where we initilize files and bring togather different components

## Video 6 - User Authentication
- To hash a password we need to install flask-bcrypt

- for login and logout we need to install flask-login

## Video 7 - User Account and profile pic
- to work with image we need to install Pillow

## Video 8 - Posts
- we can give extra info to url_for method by
    - i.e {{ url_for('post', post_id=post_id) }}

## Video 9 - Pagination
    - Post.query.paginate()
        - will give an paginate object. we can use this object to set pagination and how many post should be rendered on a single page and like that
        - we have to use post.items to access it
        - post.iter_pages() used to set pages to be displayed
        - Post.query.order_by() is used to set order of posts
    - To get query parameter(?page=) of url in flask 
        - i.e request.query.get('<name-of-parameter>', default=<default-value> , type=<type-of-parameter>)

## Video 10 - Reset Password

    - 