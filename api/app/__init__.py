from config import Config
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS


# create flask extension instances, not attached to any application
socketio = SocketIO()


def register_bps(app):
    """
    register all flask blueprints.  gets called by the app factory function.
    """
    from .main import main as main_bp

    app.register_blueprint(main_bp, url_prefix="/")


def create_app(debug=False):
    """
    application factory function
    """
    app = Flask(__name__, static_folder="../../build", static_url_path="/")
    app.debug = debug
    app.host = "localhost"

    app.config.from_object(Config)

    # build list of whitelisted sites.
    #   port 5000 is for client build dist
    #   port 3000 is for npm hot reloading during dev
    whitelisted_sites = [
        "http://localhost:3000",
        "http://localhost:5000",
    ]

    CORS(app, supports_credentials=True, origins=whitelisted_sites)

    register_bps(app)

    socketio.init_app(app, cors_allowed_origins=whitelisted_sites)

    return app
