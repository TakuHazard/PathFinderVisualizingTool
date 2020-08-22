export function randomWalls(rows, cols, grid, percentageOfwalls){
    let totalNumOfNodes = rows * cols;
    let totalNumOfRequiredWalls = totalNumOfNodes * percentageOfwalls;
    let countOfCells = 0;
    while(countOfCells < totalNumOfRequiredWalls){
        let randomRow = Math.floor(Math.random() * (rows));
        let randomCol = Math.floor(Math.random() * (cols));
        
        let node = grid[randomRow][randomCol];
        if(node.isStart || node.isFinish || node.isWall){
            continue;
        } else {
            node.isWall = true;
            countOfCells++;
        }
    }

    return grid;
}