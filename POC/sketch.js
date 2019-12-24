
function setup() {
  createCanvas(400, 400);
  createNodes();
  createObtacles();
  addNeighbors();
  displayNodes();
  dataWrraper.openSet.push(dataWrraper.gridInfos.startPoint);
}

function draw() {
  findOptimalPath(dataWrraper.gridInfos.endPoint);
  displayOptimalPath();
}



