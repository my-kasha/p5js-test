// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(1800, 800);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);		// create an array of our elements
  for (let i = 0; i < cols; i++) {		// loop for x coordnate
    for (let j = 0; j < rows; j++) {	// loop for y coordnate
      grid[i][j] = floor(random(3));	// filling array by random value 0 1 2 - three colors
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);	// create rectabgle 9x9 
      }else if(grid[i][j] == 2){
		fill(124);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1); 
	  }
    }
  }
///***
  let next = make2DArray(cols, rows);	// var for storing state of array on1 step ahead in time

  // Compute next based on grid
  // rules for changing cell state 
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;//***/	// meke our changes in state an reality for mane var grid
}

function countNeighbors(grid, x, y) { // smth vierd is going here
  let sum = 0;							// but i could see `borders` of computable blocks
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
		
		let col = (x + i + cols) % cols;
		let row = (y + j + rows) % rows;
		  
		if(grid[col][row] == 1){
		  sum += 1;
		]
    }
  }
  sum -= grid[x][y];
  return sum;
}

function countNeighbors2(grid, x, y) { // smth vierd is going here
  let sum = 0;							// but i could see `borders` of computable blocks
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  sum = sum/2;
  return sum;
}