from flask import Blueprint
from flask import jsonify
from api.users.utils import login_required

main = Blueprint('main', __name__)

@main.route('/about')
@login_required
def about(current_user):
    username = current_user.username
    email = current_user.email
    return jsonify({"data": {"message": "You have successfully accessed about page", 
                            "payload": {"username":username, "email":email}}}), 201