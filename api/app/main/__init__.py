"""
Stack Spy blueprint for handling communication
with the react client.
"""

from flask import Blueprint

main = Blueprint("main", __name__)

from . import routes, events
