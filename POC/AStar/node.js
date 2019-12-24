class Node {
  constructor(i, j) {
    this.name = `${i}${j}`;
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.obstacle = false;
    this.convertToObstacle = function () {
      this.obstacle = random(1) < 0.25 ? true : false;
    }
    this.previous = undefined;
    this.show = function (color) {
      fill(color);
      stroke(1);
      if (this == dataWrraper.gridInfos.endPoint || this == dataWrraper.gridInfos.startPoint) {
        this.obstacle = false;
        fill('yellow');
        noStroke();
      }
      if (this.obstacle) {
        fill(0);
      }
      rect(this.i * dataWrraper.gridInfos.caseWidth,
        this.j * dataWrraper.gridInfos.caseHeight,
        dataWrraper.gridInfos.caseWidth - 1,
        dataWrraper.gridInfos.caseHeight - 1);
    };
    this.addNeighbors = function (gridInfos) {
      let i = this.i;
      let j = this.j;
      if (i < gridInfos.cols - 1) {
        this.neighbors.push(gridInfos.grid[i + 1][j]);
      }
      if (j < gridInfos.rows - 1) {
        this.neighbors.push(gridInfos.grid[i][j + 1]);
      }
      if (i != 0) {
        this.neighbors.push(gridInfos.grid[i - 1][j]);
      }
      if (j != 0) {
        this.neighbors.push(gridInfos.grid[i][j - 1]);
      }
    };
  }
}



