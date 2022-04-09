import React from 'react';
import StackCallTree from './StackCallTree';

const StackCallDisplay = (props) => {
    
    if (props.stack_call_2_display === undefined) {
        return 'YO YOU NEED TO PICK SOMETHING'
    }
    else {
        return (
            <StackCallTree
                stack_call_2_display={props.stack_call_2_display}
            />
        )
    }
}

export default StackCallDisplay;