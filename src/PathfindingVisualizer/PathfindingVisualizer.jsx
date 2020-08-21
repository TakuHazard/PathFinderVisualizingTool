import React, {Component} from 'react';
import Node from './Node/Node';
import {Navbar, NavItem, DropdownMenu} from './Navbar';
import {ReactComponent as Caret} from '../icons/caret.svg';
// import {dijkstra, getNodesInShortestPathOrder} from '.../icons/arrow.svg'

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid : [],
            mouseIsPressed : false,
        }
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    // handleMouseDown(row, col){
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid : newGrid, mouseIsPressed : true});
    // }

    // handleMouseEnter(row, col){
    //     if(!this.state.mouseIsPressed) return;
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid: newGrid});
    // }

    // handleMouseUp(){
    //     this.setState({mouseIsPressed: false});
    // }

    // animateDijkstra(visitedNodesInOrder, getNodesInShortestPathOrder){

    // }

    // visualizeDijkstra(){
    //     const {grid} = this.state;
    //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
    //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //     const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    //     const getNodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //     this.animateDijkstra(visitedNodesInOrder);
    // }

    render(){
      const {grid, mouseIsPressed} = this.state;

      return (
          <>
          <Navbar>
              <NavItem icon = {<Caret />}> 
                <DropdownMenu />
              </NavItem>
          </Navbar>
            {/* <button onClick = {()=> this.visualizeDijkstra()}> Visualize Dijkstra's Algorithm </button> */}
            <div className = "grid">
                {grid.map((row, rowIdx) => {
                    return(
                        <div key = {rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall} = node;
                                return(
                                    <Node
                                        key = {nodeIdx}
                                        col = {col}
                                        isFinish = {isFinish}
                                        isStart = {isStart}
                                        isWall = {isWall}
                                        mouseIsPressed = {mouseIsPressed}
                                        onMouseDown = {(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter = {(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp = {() => this.handleMouseUp()}
                                        row = {row}
                                    ></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div>
                <button>Clear Paths</button>
                <button>Clear Walls</button>
            </div>
          </>
      );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for(let row = 0; row < 20; row++){
        const currentRow = [];
        for(let col = 0; col < 50; col++){
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }

    return grid;
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col ===START_NODE_COL,
        isFinish : row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance : Infinity,
        isVisited : false,
        isWall : false,
        previousNode : null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall : !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

