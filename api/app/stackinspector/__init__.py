'''
Stack Spy blueprint for handling incoming requests
containing stack information.
'''

from flask import Blueprint

stackinspector = Blueprint('stackinspector', __name__)

from . import routes