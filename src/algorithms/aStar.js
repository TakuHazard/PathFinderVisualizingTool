// f(n) = g(n) + h(n), where h(n) is the heuristic and g(n) is the actual cost from start
// closed set are points where don't need to reconsider. Open set are nodes that still need to be evaluated.
// termination point when open set is empty || get to the last point.
// open set begins with starting node.



// algorithm


var openSet = [];
var closedSet = [];
var foundFinishNode = false;

export function aStar(startNode, finishNode, grid){
    startNode.fScore = manHattanDistance(startNode, finishNode);
    startNode.distance = 0;
    openSet.push(startNode);
    aStarAlgorithm(finishNode, grid);
    return closedSet;
}

function manHattanDistance(currentNode, finishNode){
    return Math.abs(currentNode.row - finishNode.row) + Math.abs(currentNode.col - finishNode.col);
}

function aStarAlgorithm(finishNode, grid){
    while(openSet.length > 0){
        if(foundFinishNode){
            return;
        }
        sortNodesByFScore(openSet);
        let currentNode = openSet.shift();

        if(currentNode.distance === Infinity){
            return;
        }

        if(currentNode === finishNode){
            foundFinishNode = true;
            return;
        }

        if(currentNode.isVisited){
            continue;
        }

        if(currentNode.isWall){
            continue;
        }

        closedSet.push(currentNode);
        const neighbors = getUnvisitedNeighbors(currentNode, grid);

        for(const neighbor of neighbors){
            const tentativeScore = currentNode.distance + 1;
            if(tentativeScore < neighbor.distance){
                neighbor.previousNode = currentNode;
                neighbor.distance= tentativeScore;
                neighbor.fScore = neighbor.distance + manHattanDistance(neighbor, finishNode);
                if(openSet.filter(n => n === neighbor).length === 0){
                    openSet.push(neighbor);
                }
            }
        }
    }
}


function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodesByFScore(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore)
}

export function getShortestPathAStar(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}