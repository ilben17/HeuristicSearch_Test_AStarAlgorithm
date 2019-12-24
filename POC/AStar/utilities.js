function heuristic(neighbor, end) {
  return Math.sqrt(Math.pow(end.i - neighbor.i, 2) + Math.pow(end.j - neighbor.j, 2));
}

Array.prototype.returnsIfExists = function (elem) {
  for (var i in this) {
    if (this[i].name === elem.name) return this[i];
  }
  return false;
}

Array.prototype.Exists = function (elem) {
  for (var i in this) {
    if (this[i].name === elem.name) return true;
  }
  return false;
}

function getGrid(rows, cols, canevasWidth, canevasHeight) {
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  };

  return {
    grid: grid,
    cols: cols,
    rows: rows,
    caseWidth: canevasWidth / cols,
    caseHeight: canevasHeight / rows
  };
}

function removeFromArray(arr, spot) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === spot) {
      arr.splice(i, 1)
    }
  }
}

function createNodes() {
  let gridInfos = dataWrraper.gridInfos;
  for (let i = 0; i < gridInfos.cols; i++) {
    for (let j = 0; j < gridInfos.rows; j++) {
      gridInfos.grid[i][j] = new Node(i, j);
    }
  }
  gridInfos.startPoint = gridInfos.grid[0][0];
  gridInfos.endPoint = gridInfos.grid[gridInfos.grid.length - 1][gridInfos.grid[gridInfos.grid.length - 1].length - 1];
}

function createObtacles() {
  let gridInfos = dataWrraper.gridInfos;
  for (let i = 0; i < gridInfos.cols; i++) {
    for (let j = 0; j < gridInfos.rows; j++) {
      gridInfos.grid[i][j].convertToObstacle();
    }
  }
  gridInfos.startPoint.obstacle = false;
  gridInfos.endPoint.obstacle = false;
}

function addNeighbors() {
  let gridInfos = dataWrraper.gridInfos;
  for (let i = 0; i < gridInfos.cols; i++) {
    for (let j = 0; j < gridInfos.rows; j++) {
      gridInfos.grid[i][j].addNeighbors(gridInfos);
    }
  }
}

function displayOptimalPath() {
  for (let index = 0; index < dataWrraper.optimalPath.length; index++) {
    dataWrraper.optimalPath[index].show('blue');
  }
  noFill();
  stroke('white');
  beginShape();
  for (let index = 0; index < dataWrraper.optimalPath.length; index++) {
    vertex(dataWrraper.optimalPath[index].i * dataWrraper.gridInfos.caseWidth + dataWrraper.gridInfos.caseWidth / 2,
      dataWrraper.optimalPath[index].j * dataWrraper.gridInfos.caseHeight + dataWrraper.gridInfos.caseHeight / 2);
  }
  endShape();
}

function displayNodes() {
  for (var i = 0; i < dataWrraper.gridInfos.cols; i++) {
    for (var j = 0; j < dataWrraper.gridInfos.rows; j++) {
      dataWrraper.gridInfos.grid[i][j].show("white");
    }
  }
}

