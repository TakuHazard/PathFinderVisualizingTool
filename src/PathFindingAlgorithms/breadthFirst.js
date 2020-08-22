var nodesInOrder = []
var queue = []
var foundFinishNode = false;
export function breadthFirst(startNode, finishNode, grid){
    queue.push(startNode);
    breadthFirstExplore(finishNode, grid);
    return nodesInOrder;
}

function breadthFirstExplore(finishNode, grid){
    while(queue.length != 0){
        const currNode = queue.shift();

        if(foundFinishNode){
            return;
        }

        if(currNode.isWall){
            continue;
        }
        if(currNode === finishNode){
            foundFinishNode = true;
            return;
        }
        if(currNode.isVisited){
            continue;
        }
        currNode.isVisited = true;
        nodesInOrder.push(currNode);
        const {row, col} = currNode;
        if(row > 0){
            if(!grid[row - 1][col].isVisited){
                queue.push(grid[row - 1][col]);
                grid[row - 1][col].previousNode = currNode;
            }
        }
        if(row < grid.length - 1){
            if(!grid[row + 1][col].isVisited){
                queue.push(grid[row + 1][col]);
                grid[row + 1][col].previousNode = currNode;
            }
        }
        if(col > 0){
            if(!grid[row][col - 1].isVisited){
                queue.push(grid[row][col - 1]);
                grid[row][col - 1].previousNode = currNode;
            }
        }
        if(col < grid[0].length - 1){
            if(!grid[row][col + 1].isVisited){
                queue.push(grid[row][col + 1]);
                grid[row][col + 1].previousNode = currNode;
            }
        }

    }
}

export function getShortestPathBFS(finishNode){
    const nodesInShortestPath = [];
    let currNode = finishNode;
    while(currNode !== null){
        nodesInShortestPath.unshift(currNode);
        currNode = currNode.previousNode;
    }

    return nodesInShortestPath;
}