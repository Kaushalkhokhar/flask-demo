## Basic Flask and React App creation

- React
    - urls to be fetched should be start with api. i.e "/api/login"
- Flask
    - Initialize the app with app = app = Flask(__name__, static_folder="../build", static_url_path="/")
    - home route should return the index.html that we build from react app. i.e index.routes in api

## flask on wsl

- first make directory in which will hold our project
    - i.e mkdir python-projects/react-flask-app
    and move our project files(i.e api, build and run) to that directory
    - so our project directory might be like /home/kaushalk/python-projects/react-flask-app

- first update and upgrade the ubuntu by
    - sudo apt-get update && sudo apt-get upgrade

- to confirm python3 installed or not run
    - python --version

- to install pip
    - sudo apt-get install python3-pip

- to install virtual envrinment
    - sudo apt-get install python3-venv

- to create virtual env
    - go to project folder here it is 
    - python3 -m venv env

- to activate virtual env
    - source env/bin/activate

- to deactivate virtual env
    - deactivate

- to install requirements.txt
    - pip install requirements.txt


## Nginx setup

- nginx use to load static files like html, css and javaScript

- install nginx using 
    - sudo apt-get install nginx

- remove default file fo nginx
    - sudo rm /etc/nginx/sites-enabled/defualt

- to create a new configurtion file
    - sudo nano /etc/nginx/sites-avaliable/ract-flask-app.nginx
    - and add following setup
        server { <br>
            listen 80; <br>
            root /home/kaushalk/python-projects/react-flask-app/build; <br>
            # In short pointer towards the build directory <br>
            index index.html; <br>
            <br>
            location / { <br>
                try_files $uri $uri/ /index.html; <br>
            } <br>
        }
    - to enable above created confguration file 
        -  sudo ln -s /etc/nginx/sites-available/react-flask-app.nginx /etc/nginx/sites-enabled/react-flask-app.nginx

- to start/stop/restart nginx on wsl
    - sudo /etc/init.d/nginx start
    - sudo /etc/init.d/nginx stop
    - sudo /etc/init.d/nginx restart
- when we change the configuration of nginx it should be restarted first

- by doing this setup we can run our react app on localhost or 127.0.0.1, but still our flask app want be running 
to run that we need to use gunicorn

- Proxy pass 
    - The part that remains is to tell nginx to act as a reverse-proxy for the API service. This can be done with a second location block that is specific to all URLs that begin with /api <br>
    <br>
    server { <br>
        listen 80; <br>
        root /home/kaushalk/python-projects/react-flask-app/build; <br>
        index index.html; <br>
        <br>
        location / { <br>
            try_files $uri $uri/ /index.html; <br>
        } <br>
        <br>
        location /api { <br>
            include proxy_params; <br>
            proxy_pass http://localhost:5000; <br>
        } <br>
    } <br>

- Catching Configuration
    - A detail that is often ignored or glossed over is how to properly configure caching. The files created by React's build tend to be somewhat large, so it is a good idea to have proper caching directives set in place so that clients do not have to download the application every time they connect to the server.

    - The create-react-app project has a documentation section on caching, in which they suggest to give a caching time of one year to all the builds in build/static, and to disable caching for all other files, so let's implement this in the nginx configuration

    - so after adding caching configuration <br>
            <br>
            server { <br>
                listen 80; <br>
                root /home/kaushalk/python-projects/react-flask-app/build; <br>
                index index.html; <br>
                <br>
                location / { <br>
                    try_files $uri $uri/ /index.html; <br>
                    add_header Cache-Control "no-cache"; <br>
                } <br>
                <br>
                location /static { <br>
                    expires 1y; <br>
                    add_header Cache-Control "public"; <br>
                } <br>
                location /api { <br>
                    include proxy_params; <br>
                    proxy_pass http://localhost:5000; <br>
                } <br>
            } <br>


## Gunicorn configuration

- gunicorn is used to load a python files

- To run gunicorn 
    - go to the project file. i.e react-flask-app
    - actiavate the virtual environment
    - install gunicorn
        - pip install gunicorn
    - to run our project
        - gunicorn -b 127.0.0.1:5000 run:app 

    
- to run gunicorn continuosly we need to add more setup to wsl but which is not covered her