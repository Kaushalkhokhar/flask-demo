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
            return "<h1>About page</h1>"


## Video 2
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
        - <h1>{{ post.title }}</h1>
        - <p>By {{ post.author }} on {{ post.date_posted }}</p>

    - for if-statements
        - {% if title %} <br>
                <title>Flask Blog - {{ title }}</title> <br>
            {% else %}  <br>
                <title>Flask Blog</title> <br>
            {% endif %}