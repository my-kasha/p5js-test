// based on Daniel Shiffman`s p5.js scetch "Game of Life"(Cellular automata)
// 
// this version trys to recreate(simulate an image) of Belousov-Zhabotinsky reaction
// here i`m using three colors 
//
// 		Daniel Shiffman
// 		http://codingtra.in
// 		http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg


function make2DArray(cols, rows) {			// make2DArray - creates two-dimensional array
  let arr = new Array(cols);				// dimensions sets by two function argument 
  for (let i = 0; i < arr.length; i++) {	//        cols - horizontal   
    arr[i] = new Array(rows);				//        rows - vertical 
  }
  return arr;								// return an array
}

let grid;				// the array , which save current state of all rectabgles 
let cols;				// number of vertical lines in grid/next array
let rows;				// number of horizontal lines in grid/next array
let next;				// the array , which store next state of all rectabgles (current_time + 1)

let resolution = 20  ;	// number of element in array and canvas resolution differ from each other
						// this made due to fact that reactangles have some size and for better images
						// rectabgles should be enough big

let neighbors0 = 0;		// set of variables for storing number of different neighbors type reletuvly to one cell 
let neighbors1 = 0;		// respectevly neighbors0 - number of 0 values elements in array 
let neighbors2 = 0;		//             neighbors1 - number of 1 values elements in array   
						//             neighbors2 - number of 2 values elements in array   
	
function setup() {
  createCanvas(1900, 400);		// bigger canvas resolution -> bigger elements in grid array -> slower frame rate  
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);		// create an array of our elements(cells)
  for (let i = 0; i < cols; i++) {		// loop by x coordnate
    for (let j = 0; j < rows; j++) {	// loop by y coordnate
      grid[i][j] = floor(random(3));	// filling array by random value(who knows about distribution law ?) 
    }									// 0 1 2 - three colors 
  }
    
	
}

function draw() {
  //background(0);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
	  if(grid[i][j] == 0){
		fill(color(200,50,0));	// black
        stroke(195);
        rect(x, y, resolution - 0, resolution - 1);	// create rectabgle 9x9 
      }else if (grid[i][j] == 1) {
        fill(color(200,100,0));	// white
        stroke(0);
        rect(x, y, resolution - 1, resolution - 0);	// create rectabgle 9x9 
      }else if(grid[i][j] == 2){
		fill(color(200,65,40)); // gray
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1); 
	  }
    }
  }
///***
   next = make2DArray(cols, rows);	// var for storing state of array on1 step ahead in time

  // Compute next based on grid
  // rules for changing cell state 
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      //let sum = 0;
	  /***
      let neighbors0 = countNeighbors0(grid, i, j);
	  let neighbors1 = countNeighbors1(grid, i, j);
	  let neighbors2 = countNeighbors2(grid, i, j);
	  ***/
	  
	  if(state == 0 ){
		   neighbors1 = countNeighbors1(grid, i, j);
		  if(neighbors1 > 2 ){
		  next[i][j] = 1;
		  }else{
			 next[i][j] = state; 
		  }
	  }else if( state == 1 ){
		   neighbors2 = countNeighbors2(grid, i, j);
		  if( neighbors2 > 2){
		  next[i][j] = 2;
		  }else{
			 next[i][j] = state; 
		  }
	  }else if (state == 2 ){
		   neighbors0 = countNeighbors0(grid, i, j);
		  if( neighbors0 > 2){
		  next[i][j] = 0;
		  }else{
			 next[i][j] = state; 
		  }
	  }
	  
	  /***
	  if(state == 0 && neighbors1 > 2 ){
		  next[i][j] = 1;
	  }else if( state == 1 && neighbors2 > 2){
		  next[i][j] = 2;
	  }else if (state == 2 && neighbors0 > 2){
		  next[i][j] = 0;
	  }else {
		  next[i][j] = state;
	  }
	  ***/
	  /***
	  // блок правил для класики
      if (state == 0 && neighbors1 == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors1 < 2 || neighbors1 > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }// кінець блоку правил для класики
	  ***/
    }
  }

  grid = next;//***/	// meke our changes in state an reality for mane var grid
}

function countNeighbors0(grid, x, y) { // smth vierd is going here
  let sum = 0;							// but i could see `borders` of computable blocks
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
		
		let col = (x + i + cols) % cols;
		let row = (y + j + rows) % rows;
		  
		if(grid[col][row] == 0 ){
		  sum += 1;
		}
    }
  }
  sum -= !(grid[x][y]);
  return sum;
}

function countNeighbors1(grid, x, y) { // smth vierd is going here
  let sum = 0;							// but i could see `borders` of computable blocks
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
		
		let col = (x + i + cols) % cols;
		let row = (y + j + rows) % rows;
		  
		if(grid[col][row] == 1 ){
		  sum += 1;
		}
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
		  
		if(grid[col][row] == 2 ){
		  sum += 1;
		}
    }
  }
  sum -= ((grid[x][y])/2);
  return sum;
}