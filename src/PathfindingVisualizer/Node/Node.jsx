import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const {
            isFinish, 
            isStart,
            isWall,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
            row,
            col,
        } 
        = this.props;

        const extraClassName = isFinish 
        ? 'node-finish' 
        : isStart 
        ? 'node-start'
        : '';

        return <div 
        className = {`node ${extraClassName}`}
        id = {`row ${row} col ${col}`}
        onMouseDown = {()=> onMouseDown(row, col)}
        onMouseUp = {()=> onMouseUp(row, col)}
        onMouseEnter = {()=> onMouseEnter(row, col)}
        >
        </div>
    }
}

export const DEFAULT_NODE = {
    row : 0,
    col : 0,
};