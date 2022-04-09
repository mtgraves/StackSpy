from flask import send_from_directory, current_app
from . import main

@main.route('/')
def index():
    '''
    entrypoint to serve react bundle
    '''
    return send_from_directory(current_app.config['REACT_BUILD_PATH'], 'index.html')

@main.errorhandler(404)
def not_found(e):
    '''
    route to serve the react bundle when a request is made that would throw 404
    '''
    return send_from_directory(current_app.config['REACT_BUILD_PATH'], 'index.html')
