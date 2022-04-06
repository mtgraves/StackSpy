import requests
import uuid
import inspect
import traceback
import json
from functools import wraps

def send_stack_info(stack_info):
    r = requests.post(
        'http://localhost:5000/stackinspector/add',
        json=json.dumps(stack_info)
    )


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
    def decorator(f):
        # we send a unique id for each recursive stack so that 
        # the listener makes sure it can aggregate everything together
        unique_id = str(uuid.uuid1())
        
        @wraps(f)
        def decorated_function(*args, **kwargs):

            # first one comes in without kwargs, which is desired
            # since we can just call the function as normal.
            if kwargs == {}:
                id = 'top'
                depth = 0
            else:
                id = kwargs['identifier']
                depth = kwargs['recursion_depth']

            send_stack_info(
                build_stack_call_obj(
                    stack_trace=traceback.format_stack(),
                    identifier=id,
                    n=args[0],
                    whoami = whoami(),
                    whocalledme = whocalledme(),
                    recursion_depth = depth,
                    unique_id = unique_id,
                )
            )
            return f(*args, **kwargs)#, stack_call_list
        return decorated_function
    return decorator


def build_stack_call_obj(stack_trace, **kwargs):
    '''
    builds a stack trace information dictionary that contains
    the stack trace itself plus any additional metadata
    that was provided to it.
    '''
    object2return = {
        'stack_trace': stack_trace,
    }
    for kwarg in kwargs:
        object2return[kwarg] = kwargs[kwarg]
    return object2return