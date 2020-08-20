import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../PathFindingAlgorithms/djikstra';
import {depthFirst,getShortestPath} from '../PathFindingAlgorithms/depthFirst';
import {breadthFirst, getShortestPathBFS} from '../PathFindingAlgorithms/breadthFirst';
import {aStar, getShortestPathAStar} from '../PathFindingAlgorithms/aStar';
import {randomWalls} from '../MazeGenerationAlgorithms/randomWalls';

import {createBlocks} from '../MazeGenerationAlgorithms/recursiveBackTracking';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const ROWS = 29;
const COLS = 59;

export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid : [],
            mouseIsPressed : false,
            movingStart : false,
            movingFinish : false,
        }
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col){
        const node = this.state.grid[row][col]
        if(node.isStart){
            this.setState({grid : this.state.grid, mouseIsPressed: false, movingStart : true, movingFinish: false})
        } else if (node.isFinish){
            this.setState({grid : this.state.grid, mouseIsPressed : false, movingStart : false, movingFinish : true })
        }
        
        else {
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({grid : newGrid, mouseIsPressed : true});
        }
      
    }

    handleMouseEnter(row, col){
        if(this.state.movingStart){
            const newGrid = movePoint(row, col, this.state.grid, true);
            this.setState({grid : newGrid});
        } 

        if(this.state.movingFinish){
            const newGrid = movePoint(row, col, this.state.grid, false);
            this.setState({grid : newGrid});
        }

        if(this.state.movingFinish){
            
        }
        if(!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp(){
        this.setState({movingStart: false});
        this.setState({movingFinish : false});
        this.setState({mouseIsPressed: false});
    }
    animateShortestPath(nodesInShortestPathOrder){
        console.log("nodes in shortest path order", nodesInShortestPathOrder)
        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            setTimeout(()=> {
                const node = nodesInShortestPathOrder[i];
                console.log("HERE",document.getElementById(`node-${node.row}-${node.col}`).className)
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, COLS * i);
        }
    }

    animateDijkstra(visitedNodesInOrder, getNodesInShortestPathOrder){
       for(let i = 0; i <= visitedNodesInOrder.length; i++){
           if(i === visitedNodesInOrder.length){
               console.log("calling animate shortest path order")
               setTimeout(()=> {
                   this.animateShortestPath(getNodesInShortestPathOrder);
               }, 10 * i);
               return;
           }

           setTimeout(()=> {
               const node = visitedNodesInOrder[i];
               document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
           }, 10 * i)
       }

    }

    visualizeAStar(){
        const {grid} = this.state;
        const startNode = getStartNode(this.state.grid);
        const finishNode = getFinishNode(this.state.grid);
        const visitedNodesInOrder = aStar(startNode, finishNode,grid);

        const nodesInShortestPathOrder = getShortestPathAStar(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDijkstra(){
        const {grid} = this.state;
        const startNode = getStartNode(this.state.grid);
        const finishNode = getFinishNode(this.state.grid);
        const visitedNodesInOrder = dijkstra(grid,startNode, finishNode);

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDepthFirst(){
        const {grid} = this.state;
        const startNode = getStartNode(this.state.grid);
        const finishNode = getFinishNode(this.state.grid);
        console.log("calling DFS JUST BEFORE")
        const visitedNodesInOrder = depthFirst(startNode, finishNode,grid);

        console.log("DONE HERE")
        const nodesInShortestPathOrder = getShortestPath(finishNode);

        console.log("DONE DFS", visitedNodesInOrder);
        console.log("DONE HERE", nodesInShortestPathOrder);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBreadthFirst(){
        const {grid} = this.state;
        const startNode = getStartNode(this.state.grid);
        const finishNode = getFinishNode(this.state.grid);
        const visitedNodesInOrder = breadthFirst(startNode, finishNode,grid);
        const nodesInShortestPathOrder = getShortestPathBFS(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    generateRandomWalls(){
        const {grid} = this.state;
        const emptyGrid = this.clearBoard();
        this.setState({grid})
        const rows = ROWS;
        const cols = COLS;

        const gridWithRandomWalls = randomWalls(rows,cols,grid, 0.3);
        this.setState({grid : gridWithRandomWalls});
    }

    generateRecursiveBackTrackingMaze(){
        const {grid} = this.state;
        const walledGrid = createBlocks(grid);
        this.setState({grid : walledGrid})
    }

    removePaths(grid){
        for(let row = 0; row < ROWS; row++){
            for(let col = 0; col < COLS; col ++){
                if(grid[row][col].isVisited){
                    grid[row][col].isVisited = false;
                }
            }
        }
    }
    clearBoard(grid){
 
        const newGrid = getInitialGrid();

        this.setState({grid : newGrid, mouseIsPressed : false})

        this.forceUpdate();
    }

    render(){
      const {grid, mouseIsPressed} = this.state;

      return (
          <>
           
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
            <button onClick = {()=> this.clearBoard(this.state.grid)}></button>
            <button onClick = {()=> this.visualizeDijkstra()}> Visualize Dijkstra's Algorithm </button>
            <button onClick = {() => this. visualizeDepthFirst() } > Visualize Depth First</button>
            <button onClick = {() => this. visualizeBreadthFirst() } > Visualize Breadth First</button>
            <button onClick = {() => this. visualizeAStar() } > Visualize AStar</button>
            <button onClick = {()=> this.generateRandomWalls()}>Generate Random Walls</button>
            <button onClick = {() => this.generateRecursiveBackTrackingMaze()}>Generate Recursive Maze</button>


          </>
      );
    }
}


const getFinishNode = (grid) => {
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            if(grid[row][col].isFinish){
                return grid[row][col]
            }
        }
    }
}
const getStartNode = (grid) => {
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            if(grid[row][col].isStart){
                return grid[row][col];
            }
        }
    }
}
const movePoint = (newRow, newCol, currentGrid, isStart) => {
    if(isStart){
        const grid = currentGrid.slice();
        for(let row = 0; row < ROWS; row++){
            for(let col = 0; col < COLS; col++){
                const node = grid[row][col];
                if(node.isStart){
                    node.isStart = false;
                }
            }
        }
    
        for(let row = 0; row < ROWS; row++){
            for(let col = 0; col < COLS; col++){
                const node = grid[row][col];
                if(row === newRow && col === newCol){
                    node.isStart = true;
                }
            }
        }
        return grid;
    }
   else{
    const grid = currentGrid.slice();
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            const node = grid[row][col];
            if(node.isFinish){
                node.isFinish = false;
            }
        }
    }

    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            const node = grid[row][col];
            if(row === newRow && col === newCol){
                node.isFinish = true;
            }
        }
    }


    return grid;
   }
}

const getInitialGrid = () => {
    const grid = [];
    for(let row = 0; row < ROWS; row++){
        const currentRow = [];
        for(let col = 0; col < COLS; col++){
            const newNode = createNode(col, row)
            if(row === START_NODE_ROW && col === START_NODE_COL){
                newNode.isStart = true;
            } else if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL){
                newNode.isFinish = true;
            }
            currentRow.push(newNode);
        }
        grid.push(currentRow);
    }

    return grid;
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: false,
        isFinish : false,
        distance : Infinity,
        isVisited : false,
        isWall : false,
        previousNode : null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    if(node.isWall){
        return grid
    }
    const newNode = {
        ...node,
        isWall : !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

