from flask_socketio import send
from .. import socketio

@socketio.on('message')
def handleMessage(message):
    send(message, broadcast=True)
    return None
