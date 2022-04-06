import os

class Config(object):

    REACT_BUILD_PATH = os.path.join('..', '..', 'build')
    APP_SITE_NAME='http://localhost:3000'
    SECRET_KEY = 'thingsandstuff!!'