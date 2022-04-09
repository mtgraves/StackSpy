import React from 'react';
import { Tree } from './Tree.js';

const StackCallTree = (props) => {
    
    const svg = React.useRef(null);
    let chart = Tree(props.stack_call_2_display, {
        label: d => d.name,
        title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
        //children: (d, n) => `${n.ancestors().reverse().map(d => d.data.children).join(".")}`,
        //link: (d, n) => `https://github.com/prefuse/Flare/${n.children ? "tree" : "blob"}/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}${n.children ? "" : ".as"}`,
        width: 1152
    })
    React.useEffect(() => {
        if (svg.current) {
            svg.current.appendChild(chart)
        }
    }, []);
    console.log(svg)
    console.log(chart)
    
    return <svg ref={svg} />
}

export default StackCallTree;