from config import Config
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS


# create flask extension instances, not attached to any application
socketio = SocketIO()


def register_bps(app):
    '''
    register all flask blueprints.  gets called by the app factory function.
    '''
    from .main import main as main_bp
    app.register_blueprint(main_bp, url_prefix='/')

    from .stackinspector import stackinspector as si_bp
    app.register_blueprint(si_bp, url_prefix='/stackinspector')


def create_app(debug=False):
    '''
    application factory function
    '''
    app = Flask(__name__, static_folder='../../build', static_url_path='/')
    app.debug = debug
    app.host='localhost'
    
    app.config.from_object(Config)

    # build list of whitelisted sites.
    whitelisted_sites = [app.config['APP_SITE_NAME']]

    CORS(
        app, 
        supports_credentials=True,
        origins=whitelisted_sites 
    )

    register_bps(app)

    socketio.init_app(app, cors_allowed_origins=whitelisted_sites)

    return app

