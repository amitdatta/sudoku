/* 	SUDOKU.js - used to solve SUDOKU.
 *	by Amit Datta
 *  If you are using this code for development or for application, do not delete this part of the code. Rather you are requested add your name above.
 */

function Sudoku() {
	this.grid = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
	this.iterations = 0;
	this.initGrid();
	this.checkGrid();
}

// functions to play the sudoku
// function to import the grid from the canvas
Sudoku.prototype.initGrid = function() {
	for(var row=0;row<9;row++) {
		for(var col=0;col<9;col++) {
			if(document.getElementById('gridcell'+row+''+col).innerHTML!=' ')
				this.grid[row][col] = document.getElementById('gridcell'+row+''+col).innerHTML;
		}
	}
};
Sudoku.prototype.checkGrid = function() {
	var flag=0;
	for(var row=0;row<9;row++) {
		for(var col=0;col<9;col++) {
			if(this.grid[row][col]==0)
				flag++;
			else {
				var temp = this.grid[row][col];
				this.grid[row][col] = 0;
				if(!this.isSafe(row,col,temp)) {
					flag++;
					// Wrong move found. Action to be taken here.
					$(document.getElementById('gridcell'+row+''+col)).addClass('grid-cell-state-error');
				} else {
					$(document.getElementById('gridcell'+row+''+col)).removeClass('grid-cell-state-error');
				}
				this.grid[row][col]=temp;
			}
		}
	}
	if(flag==0) {
		$('.game-over').fadeIn(1000,function(){});
	}
};




// functions to solve the sudoku
// function to find out whether a value is present in a particular row
Sudoku.prototype.usedInRow = function(row,num) {
	for(var col=0;col<9;col++) {
		if(this.grid[row][col]==num) {
			return true;
		}
	}
	return false;
};
// function to find out whether a value is present in a particular column
Sudoku.prototype.usedInCol = function(col,num) {
	for(var row=0;row<9;row++) {
		if(this.grid[row][col]==num) {
			return true;
		}
	}
	return false;
};
// function to find out whether a value is present in a particular box
Sudoku.prototype.usedInBox = function(boxStartRow,boxStartCol,num) {
	for(row=0;row<3;row++) {
		for(col=0;col<3;col++) {
			if(this.grid[boxStartRow+row][boxStartCol+col]==num)
				return true;
		}
	}
	return false;
};
// function to find out whether a number can be placed in a particular position
Sudoku.prototype.isSafe = function(row,col,num) {
	return (!this.usedInRow(row,num) && !this.usedInCol(col,num) && !this.usedInBox(row-row%3,col-col%3,num));
};
// function to find an unassigned position in the grid
Sudoku.prototype.findUnassignedLocation = function() {
	var pair = new Array();
	var row,col;
	for(row=0;row<9;row++) {
		for(col=0;col<9;col++) {
			if(this.grid[row][col]==0) {
				pair.push(row);
				pair.push(col);
				return pair;
			}
		}
	}
	pair = [-1,-1];
	return pair;
};
// function to solve the Sudoku
Sudoku.prototype.solve = function() {
	var row,col;
	var pair = new Array();
	this.iterations++;
	pair = this.findUnassignedLocation();
	if(pair[0]<0 && pair[1]<0)
		return true;
	row = pair[0];
	col = pair[1];
	for(var num=1;num<=9;num++) {
		if(this.isSafe(row,col,num)) {
			this.grid[row][col] = num;
			if(this.solve()) {
				return true;
			}
			this.grid[row][col] = 0;
		}
	}
	return false;
};
// function to print the grid
Sudoku.prototype.printGrid = function() {
	for(var row=0;row<9;row++) {
		for(var col=0;col<9;col++) {
			alert('#grid'+row+''+col);
			document.getElementById('grid'+row+''+col).innerHTML = this.grid[row][col];
		}
	}
	document.getElementById('iteration-count').innerHTML = this.iterations;
};
// function to return the grid
Sudoku.prototype.returnGrid = function() {
	if(this.solve())
		return true;
	else
		return false;	
};