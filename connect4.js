/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
let clickCounter = 0;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // TODO: add comment for this code
  const htmlBoard = document.querySelector('#board');
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  let spotForCol = null;
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][x] === null) {
      // board[i][x] = [`${i},${x}`];
      spotForCol = i;
      break;
    }
    if (board[i][x] === true) {
      // board[i - 1][x] = [`${i - 1},${x}`];
      spotForCol = i - 1;
    }
    // }
  }
  return spotForCol;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece', `player${currPlayer}`);
  // piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);
  const move = document.getElementById(`${y}-${x}`);
  move.append(piece);

  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(() => (alert(msg) ? '' : window.location.reload()), 10);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);

  if (y === null) {
    return;
  }
  console.log(board);
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (board.every((row) => row.every((col) => col !== null))) {
    return endGame("It's a tie!");
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  clickCounter++;
  clickCounter % 2 === 0 ? (currPlayer = 1) : (currPlayer = 2);
  console.log(clickCounter);

  // console.log(clickCounter);
  // console.log(currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
