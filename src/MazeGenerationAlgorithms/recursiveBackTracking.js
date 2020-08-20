var cloneDeep = require('lodash.clonedeep');
var _ = require('lodash');

const ROWS = 14;
const COLS = 29;
const arrayBlock = [];

var count = 0;

const wallsAddedInOrder = [];
const visitedNodesInOrder = [];

var grid;

export function createBlocks(gridInput){
    let index = 0;
    grid = _.cloneDeep(gridInput);
    for(let row = 1; row < grid.length; row += 2){
        for(let col = 1; col < grid[0].length; col += 2){
            let centerpiece = grid[row][col];
            // centerpiece.isWall = true;
            // let rowB= Math.floor(row/2);
            // let colB = Math.floor(col/2);
            let block = createBlock(centerpiece,index);
            index++;
            arrayBlock.push(block);
        }
    }

    for(let block of arrayBlock){
        createWalls(block,grid);
    }

    recursiveBackTracking(arrayBlock[0],grid);

    return grid;
}

export function wallsAddedInOrderFn(){

    return wallsAddedInOrder;
}
export function removeWalls(){
    console.log('count is ', count);
    console.log('array has', visitedNodesInOrder.length)
    return visitedNodesInOrder;
}
function recursiveBackTracking(currentBlock,grid){
    currentBlock.visited = true;
    let neighbors = getNeighbors(currentBlock);
    for(let n of neighbors){
        if(n.visited){
            continue;
        } else {
            clearPath(currentBlock, n, grid);
            recursiveBackTracking(n, grid);
        }
    }

}

function clearPath(currentBlock, neighborBlock,grid){
    count++;
    // console.log('currentBlock is', currentBlock, 'centerpiece is', currentBlock.centerpiece);
    // console.log('neighbor is ', neighborBlock);
    if(currentBlock.centerpiece.col < neighborBlock.centerpiece.col){
        grid[currentBlock.centerpiece.row][currentBlock.centerpiece.col + 1].isWall = false;
        visitedNodesInOrder.push(grid[currentBlock.centerpiece.row][currentBlock.centerpiece.col + 1]);
        currentBlock.rightWall = false;
        neighborBlock.leftWall = false;

    } else if(currentBlock.centerpiece.col > neighborBlock.centerpiece.col){
        grid[currentBlock.centerpiece.row][currentBlock.centerpiece.col - 1].isWall = false;
        visitedNodesInOrder.push(grid[currentBlock.centerpiece.row][currentBlock.centerpiece.col - 1]);

        currentBlock.leftWall = false;
        neighborBlock.rightWall = false;

    } else if (currentBlock.centerpiece.row > neighborBlock.centerpiece.row){
        grid[currentBlock.centerpiece.row - 1][currentBlock.centerpiece.col].isWall =false;
        visitedNodesInOrder.push(grid[currentBlock.centerpiece.row - 1][currentBlock.centerpiece.col]);

        currentBlock.topWall = false;
        neighborBlock.bottomWall = false;

    } else if (currentBlock.centerpiece.row < neighborBlock.centerpiece.row){
        grid[currentBlock.centerpiece.row + 1][currentBlock.centerpiece.col].isWall =false;
        visitedNodesInOrder.push(grid[currentBlock.centerpiece.row + 1][currentBlock.centerpiece.col]);

        currentBlock.topWall = false;
        neighborBlock.bottomWall = false;
    }

    return;
}
function getNeighbors(currentBlock){
    let index = currentBlock.index;
    let row = 0;
    let col = 0;

    let neighbors = [];

    if(index !== 0){
        col = index % COLS;
        row = Math.floor(index/COLS);
    }


    if(row > 0){
        let neighborRow = row - 1;
        let neighborBlock = arrayBlock[(COLS * neighborRow) + col];
        if(neighborBlock !== undefined){
            neighbors.push(neighborBlock);

        }
    }

    if(row < ROWS - 1){
        let neighborRow = row + 1;
        let neighborBlock = arrayBlock[(COLS * neighborRow) + col];
        if(neighborBlock !== undefined){
            neighbors.push(neighborBlock);

        }
    }

    if(col > 0){
        let neighborCol= col - 1;
        let neighborBlock = arrayBlock[(COLS * row) + neighborCol];
        if(neighborBlock !== undefined){
            neighbors.push(neighborBlock);

        }

    }

    if(col < COLS - 1){
        let neighborCol= col + 1;
        let neighborBlock = arrayBlock[(COLS * row) + neighborCol];

        if(neighborBlock !== undefined){
            neighbors.push(neighborBlock);

        }
    }

    neighbors = shuffle(neighbors);
    return neighbors;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function createWalls(block, grid){
    let centerpiece = block.centerpiece;
    createTopWall(centerpiece, grid );
    block.topWall = true;

    createBottomWall(centerpiece, grid);
    block.bottomWall = true;

    createLeftWall(centerpiece, grid);
    block.leftWall = true;

    createRightWall(centerpiece, grid);
    block.rightWall = true;

}

function createTopWall(centerpiece, grid){
    const {row, col} = centerpiece;
    grid[row - 1][col - 1].isWall = true;
    grid[row - 1][col].isWall = true;
    grid[row - 1][col + 1].isWall = true;

    wallsAddedInOrder.push(grid[row - 1][col - 1]);
    wallsAddedInOrder.push(grid[row - 1][col]);
    wallsAddedInOrder.push(grid[row - 1][col + 1]);
}

function createBottomWall(centerpiece, grid){
    const {row, col} = centerpiece;
    grid[row + 1][col - 1].isWall = true;
    grid[row + 1][col].isWall = true;
    grid[row + 1][col + 1].isWall = true;

    wallsAddedInOrder.push(grid[row + 1][col - 1]);
    wallsAddedInOrder.push(grid[row + 1][col]);
    wallsAddedInOrder.push(grid[row + 1][col + 1]);

}

function createLeftWall(centerpiece, grid){
    const {row, col} = centerpiece;
    grid[row - 1][col - 1].isWall = true;
    grid [row][col - 1].isWall = true;
    grid[row + 1][col  - 1].isWall = true;

    wallsAddedInOrder.push(grid[row - 1][col - 1]);
    wallsAddedInOrder.push(grid[row ][col - 1]);
    wallsAddedInOrder.push(grid[row + 1][col - 1]);
}

function createRightWall(centerpiece, grid){
    const {row, col} = centerpiece;
    grid[row - 1][col + 1].isWall = true;
    grid[row][col +  1].isWall = true;
    grid[row + 1][col + 1].isWall = true;

    wallsAddedInOrder.push(grid[row - 1][col + 1]);
    wallsAddedInOrder.push(grid[row][col + 1]);
    wallsAddedInOrder.push(grid[row + 1][col + 1]);
}


function createBlock(centerpiece, index){
    return{
        centerpiece,
        index,
        topWall : false,
        bottomWall : false,
        leftWall : false,
        rightWall : false,
        visited : false
    }
}