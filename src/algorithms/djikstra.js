const node = {
    row,
    col,
    isVisited,
    distance,
};

export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    nodes[startNode].distance = 0;
    const unvisitedNodes = nodes.slice();
    while(!! visitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // handle cases later

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) return "success";
        updateUnvistedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB)=> nodeA.distance - nodeB.distance)
}

function updateUnvistedNeighbors(node, grid){
    const neighbors = getUnVisitedNeighbors(node, grid);
    for(const neighbor of updateNeighbors) {
        neighbor.distance = node.distance + 1;
    }
}

function getUnVisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;
}

function getAllNodes(grid){
    const nodes = [];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }

    return nodes;
}

export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}