# StackSpy

StackSpy provides a utility for profiling and an application for viewing the structure of the call stack when running recursive functions.

*This is a total WIP.  At this point a crude profiling works and all of the wiring is complete for the app infrastructure.  Needs `d3` for visualization on the frontend and the utilities need to be built out more and documented.  Probably should be packaged as a wheel that installs an executable on the path to allow starting the app by simply calling `stackspy` and the utilities could then be imported using `from stackspy.utils import ...`*

## Usage

### start the app
From project root, run:

```
./api/.env/Scripts/activate
```

then start the flask development server by issuing:

```
npm run start-api
```

now you can visit `localhost:5000` in the browser.

### example - profile function

create the following file (currently, in project root until this get packaged properly)

```python
from util import profile_stack_calls, send_stack_info

@profile_stack_calls()
def fibonacci(n, p_id=None, id=1):
    '''
    recursively compute the nth fibonacci number

    fibonacci numbers are:
        1, 2, 3, 5, 8, 13, 21, ...
    or in other words ...
        1, 2, n_{i-2} + n_{i-1}, ...
    '''
    if n == 1:
        return 1
    elif n == 2:
        return 2
    else:
        return (
            fibonacci(n-2, p_id = id, id = id*2) + 
            fibonacci(n-1, p_id = id, id = id*2+1)
        )


send_stack_info(fibonacci(4))
```
