import socketio
import uuid
import inspect
import datetime
import json
from functools import wraps
from rich.pretty import pprint

def search_for_parent(stack_info_object, parent_id):
    '''
    recursively search for parent id in a tree
    
    ### parameters
    stack_info_object: `dict`
        dictionary of values build from `build_stack_call_obj`
    parent_id: `str`
        id of parent node to look for

    ### returns
    obj2return: `None` or `dict`
        if nothing is found, `None` is returned.  Otherwise the parent
        object is returned.
    '''
    obj2return = None
    if str(parent_id) == stack_info_object['name']:
        obj2return = stack_info_object
    else:
        for c_i, child_object in enumerate(stack_info_object['children']):
            obj2return = search_for_parent(child_object, parent_id)

    return obj2return

def create_stack_hierarchy(stack_info_list):
    '''
    turns stack info list into a nested stack info object
    that represents the tree structure of the call stack
    '''
    stack_info_obj = {}
    for s in stack_info_list:
        if stack_info_obj == {}:
            stack_info_obj['name'] = str(s['id'])
            stack_info_obj['parent'] = None
            stack_info_obj['children'] = []
        else:
            parent_obj = search_for_parent(stack_info_obj, s['parent_id'])
            if parent_obj != None:
                if 'children' not in parent_obj:
                    parent_obj['children'] = [
                        {
                            'name': str(s['id']),
                            'parent': str(s['parent_id']),
                            'children': [],
                        }
                    ]
                else:
                    parent_obj['children'].extend([
                        {
                            'name': str(s['id']),
                            'parent': str(s['parent_id']),
                            'children': [],
                        }
                    ])
    return stack_info_obj


def send_stack_info(stack_info):
    '''
    sends stack information to the local socketIO flask server
    '''

    # create stack info object from list
    stack_info_obj = create_stack_hierarchy(stack_info)
    
    # add a unique id to display in the client
    stack_info_obj['uuid'] = str(uuid.uuid1())
    stack_info_obj['datetime'] = datetime.datetime.utcnow()

    sio = socketio.Client()
    sio.connect('http://localhost:5000', wait_timeout=10)
    sio.emit('message', json.dumps(stack_info_obj, default=str))
    sio.disconnect()


def whoami():
    return inspect.stack()[1][3]

def whocalledme():
    return inspect.stack()[2][3]

def profile_stack_calls():
    '''
    decorator function to wrap recursive functions.

    This builds a list of stack call information, 
    adding a new list item at the beginning of each
    function call.
    '''
    call_info = []
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):

            # first one comes in without kwargs, which is desired
            # since we can just call the function as normal.
            if kwargs == {}:
                node_id = 1
                parent_id = None
            else:
                node_id = kwargs['id']
                parent_id = kwargs['p_id']
            
            call_info.extend([
                build_stack_call_obj(
                    #stack_trace=traceback.format_stack(),
                    n=args[0],
                    id=node_id,
                    parent_id = parent_id,
                    whoami = whoami(),
                    whocalledme = whocalledme(),
                )
            ])
            f(*args, **kwargs)
            return call_info
        return decorated_function
    return decorator

def build_stack_call_obj(*args, **kwargs):
    '''
    builds a stack trace information dictionary that contains
    the stack trace itself plus any additional metadata
    that was provided to it.
    '''
    object2return = {}
    for kwarg in kwargs:
        object2return[kwarg] = kwargs[kwarg]
    return object2return