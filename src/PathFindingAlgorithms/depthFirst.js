const nodesVisitedInOrder = []
var foundFinishNode = false;

export function depthFirst(startNode, finishNode, grid){
    console.log("BEGAN DFS")
    depthFirstExploration(startNode, finishNode, grid);
    console.log("DONE DFS", finishNode);
    console.log("NODESVISITEDORDER", nodesVisitedInOrder);
    return nodesVisitedInOrder;
}


function depthFirstExploration(currentNode, finishNode, grid){
    if(foundFinishNode){
        return;
    }
    if(currentNode.isWall){
        return;
    }
    if(currentNode === finishNode){
        console.log('FOUND FINISH');
        console.log("WE VISITED", nodesVisitedInOrder.length);
        foundFinishNode = true;
    }
   
    if(currentNode.isVisited){
        return;
    }

    currentNode.isVisited = true;
    nodesVisitedInOrder.push(currentNode);
    const {row, col} = currentNode;
    if(row > 0){
        if(!grid[row - 1][col].isVisited){
            depthFirstExploration(grid[row - 1 ][col], finishNode, grid);
            grid[row - 1][col].previousNode = currentNode;

        }
    }
    if(row < grid.length - 1){
        if(!grid[row + 1][col].isVisited){
            depthFirstExploration(grid[row + 1][col], finishNode, grid);
            grid[row + 1][col].previousNode = currentNode;

        }
    }
    if(col > 0){
        if(!grid[row ][col - 1].isVisited){
            depthFirstExploration(grid[row][col - 1], finishNode, grid);
            grid[row][col - 1].previousNode = currentNode;

        }
    }
    if(col < grid[0].length - 1){
        if(!grid[row][col + 1].isVisited){
            depthFirstExploration(grid[row][col + 1], finishNode, grid);
            grid[row][col + 1].previousNode = currentNode;

        }
    }

}

export function getShortestPath(finishNode){
    const nodesInShortestPath = [];
    var currentNode = finishNode;
    while(currentNode !== null){
        nodesInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPath;
}