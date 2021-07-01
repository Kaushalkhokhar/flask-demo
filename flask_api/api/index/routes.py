from flask import Blueprint

index = Blueprint('index',  __name__, static_folder="../../build", static_url_path='/')

@index.app_errorhandler(404)
def not_found(e):
    return index.send_static_file('index.html')

@index.route('/')
def react_route():
    return index.send_static_file('index.html')