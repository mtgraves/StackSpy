import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";

const StackCallDisplay = (props) => {
    
    if (props.stack_call_2_display === undefined) {
        return 'YO YOU NEED TO PICK SOMETHING'
    }
    else {
        return 'this is going to be an amazing plot from d3'
    }
}

export default StackCallDisplay;