function loadSudoku() {
	var grid = 	[[9, 5, 0, 0, 3, 0, 0, 0, 7],
	             [0, 0, 0, 1, 0, 0, 0, 0, 0],
	             [0, 7, 8, 9, 0, 0, 0, 0, 2],
	             [7, 0, 4, 0, 0, 0, 3, 0, 0],
	             [0, 0, 3, 0, 2, 0, 8, 0, 0],
	             [0, 0, 5, 0, 0, 0, 6, 0, 0],
	             [5, 0, 0, 0, 0, 8, 0, 6, 0],
	             [0, 0, 0, 0, 0, 3, 0, 0, 0],
	             [8, 0, 0, 0, 7, 0, 0, 5, 1]];
	for(var row=0;row<9;row++) {
		for(var col=0;col<9;col++) {
			if(grid[row][col]!=0) {
				$(document.getElementById('gridcell'+row+''+col)).html(grid[row][col]).css({'font-weight':'bold'}).addClass('grid-cell-active').removeClass('grid-cell');
			}
		}
	}
}