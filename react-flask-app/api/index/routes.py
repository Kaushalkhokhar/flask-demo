from flask import Blueprint

index = Blueprint('index',  __name__, static_folder="../../build", static_url_path='/')
# here static_folder to hold build directory 
# static_url_path points the route for static folder

# this is required to give index.html response with
# 404 error, instead of 404 not found page  
@index.app_errorhandler(404)
def not_found(e):
    return index.send_static_file('index.html')


# this gives index.html response in response with 
# home route request
@index.route('/')
def react_route():
    return index.send_static_file('index.html')