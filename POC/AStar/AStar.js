let dataWrraper = (function(){
  let obj = {};
  obj.init = function(){
    obj.gridInfos = getGrid(15, 15, 400, 400);
    obj.openSet = [];
    obj.closedSet = [];
    obj.optimalPath = [];
  };
  return obj;
})();

function findOptimalPath(end) {
    let indexBestSpot = 0;
    if (dataWrraper.openSet.length > 0) {
        let currentNode = dataWrraper.openSet[getBestIndex(indexBestSpot)];
        isCurrentNodeTarget(currentNode, end);
        currentNodeTreatement(currentNode, end);
    } else {
        noLoop();
      $('#progress').text("There is no solution. Reload the page");
        return;
    }
}

function getBestIndex(currentBestIndex){
  for (let i = 0; i < dataWrraper.openSet.length; i++) {
    if (dataWrraper.openSet[i].f < dataWrraper.openSet[currentBestIndex].f) {
      currentBestIndex = i;
    }
  }
  return currentBestIndex;
}

function isCurrentNodeTarget(currentNode, end) {
  if (currentNode.name === end.name) {
    $('#progress').text('Finded !!! Reload the page for more tests');
    buildOptimalPath(currentNode, dataWrraper.optimalPath);
    noLoop();
  }
}

function buildOptimalPath(current, path) {
    path.push(current);
    if (current.previous) {
        buildOptimalPath(current.previous, path)
    }
    return;
}


function currentNodeTreatement(currentNode, end){
  removeFromArray(dataWrraper.openSet, currentNode);
  dataWrraper.closedSet.push(currentNode);
  let neighbors = currentNode.neighbors;
  for (let i = 0; i < neighbors.length; i++) {
    let currentNeighbor = neighbors[i];
    let cost = currentNode.g + 1;
    if (currentNeighbor.obstacle){
      continue;
    }
    if (!dataWrraper.closedSet.Exists(currentNeighbor)) {
      if (dataWrraper.openSet.Exists(currentNeighbor)) {
        if (currentNeighbor.g > cost) {
          completeCurrentNeighbor(currentNode, cost, end, currentNeighbor,true);
        }
      } else {
        completeCurrentNeighbor(currentNode, cost, end, currentNeighbor);
      }
    }else{
      if (currentNeighbor.g > cost) {
        completeCurrentNeighbor(currentNode, cost, end, currentNeighbor,true);
        removeFromArray(dataWrraper.closedSet, currentNeighbor);
      }
    }
  }
}

function completeCurrentNeighbor(currentNode, cost, end, currentNeighbor, existsInOpenSet){
  currentNeighbor.previous = currentNode;
  currentNeighbor.g = cost;
  currentNeighbor.h = heuristic(currentNeighbor, end);
  currentNeighbor.f = currentNeighbor.h + currentNeighbor.g;

  if (!existsInOpenSet){
    dataWrraper.openSet.push(currentNeighbor);
  }
}
