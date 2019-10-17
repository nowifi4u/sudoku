Math.div = function(val, div) {
  return val / div >> 0;
}

module.exports = function solveSudoku(grid) {
  const UNASSIGNED = 0;

  const arrRows = [{},{},{},{},{},{},{},{},{}];
  const arrCols = [{},{},{},{},{},{},{},{},{}];
  const arrBoxs = [[{},{},{}],[{},{},{}],[{},{},{}]];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      spaceTake(arrRows, arrCols, arrBoxs, row, col, grid[row][col]);
    }
  }
  if (!sudokuSolver(grid, arrRows, arrCols, arrBoxs)) return "Well something went wrong...";
  return grid;

  function spaceTake(arrRows, arrCols, arrBoxs, row, col, num) {
    arrRows[row][num] = true;
    arrCols[col][num] = true;
    arrBoxs[Math.div(row, 3)][Math.div(col, 3)][num] = true;
  }
  
  function spaceFree(arrRows, arrCols, arrBoxs, row, col, num) {
    arrRows[row][num] = undefined;
    arrCols[col][num] = undefined;
    arrBoxs[Math.div(row, 3)][Math.div(col, 3)][num] = undefined;
  }
  
  function sudokuSolver(grid, arrRows, arrCols, arrBoxs) {
    const free = findFreeLocation(grid);
    if (!free) return true;
    const row = free.row;
    const col = free.col;
    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, arrRows, arrCols, arrBoxs, row, col, num)) {
        grid[row][col] = num;
        spaceTake(arrRows, arrCols, arrBoxs, row, col, num);
  
        if (sudokuSolver(grid, arrRows, arrCols, arrBoxs)) {
          return true;
        }
  
        grid[row][col] = UNASSIGNED;
        spaceFree(arrRows, arrCols, arrBoxs, row, col, num);
      }
    }
    return false;
  }
  
  function isFree(grid, row, col) {
    return grid[row][col] == UNASSIGNED;
  }
  
  function findFreeLocation(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (isFree(grid, row, col)) return {row: row, col: col};
      }
    }
  }
  
  function isSafe(grid, arrRows, arrCols, arrBoxs, row, col, num) {
    return !arrRows[row][num] &&
        !arrCols[col][num] &&
        !arrBoxs[Math.div(row, 3)][Math.div(col, 3)][num] &&
        isFree(grid, row, col);
  }
}