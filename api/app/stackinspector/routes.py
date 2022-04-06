from flask import request

from . import stackinspector

@stackinspector.route('/add', methods=['POST'])
def add_stack_info():
    '''
    add stack information
    '''
    data = request.get_json()

    print(data)

    print('HEY from in here')
    return {}, 200
