class Game {
  constructor(p1, p2, width = 7, height = 6) {
    this.player1 = p1;
    this.player2 = p2;
    this.width = width;
    this.height = height;
    this.player = p1;
    this.clickcounter = 1;
    this.placeInTable;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    board.append(top);
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push([]);
      for (let x = 0; x < this.width; x++) {
        this.board[y].push(null);
      }
    }
  }

  findSpotForCol(x) {
    let spotForCol = null;
    for (let i = this.board.length - 1; i >= 0; i--) {
      if (this.board[i][x] === null) {
        spotForCol = i;
        break;
      }
      if (this.board[i][x] === true) {
        spotForCol = i - 1;
      }
    }
    return spotForCol;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.player.color;

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    setTimeout(() => (alert(msg) ? '' : window.location.reload()), 10);
  }

  handleClick(evt) {
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.player;
    this.placeInTable(y, x);

    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame('Tie!');
    }

    if (this.checkForWin()) {
      return this.endGame(`The ${this.player.color} player won!`);
    }

    this.clickcounter % 2 === 0
      ? (this.player = this.player1)
      : (this.player = this.player2);
    this.clickcounter++;
  }

  checkForWin() {
    const _win = (cells) =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.player
      );

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
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
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

function startGame() {
  let p1 = new Player(document.getElementById('color1').value);
  let p2 = new Player(document.getElementById('color2').value);
  input1.style.color = p1.color;
  input2.style.color = p2.color;
  startBtn.innerText = 'Restart Game';

  startBtn.addEventListener('click', function (e) {
    location.reload();
  });
  new Game(p1, p2);
  input1.setAttribute('disabled', 'disabled');
  input2.setAttribute('disabled', 'disabled');
}

let startBtn = document.querySelector('#start-game');
let input1 = document.getElementById('color1');
let input2 = document.getElementById('color2');

startBtn.addEventListener('click', startGame);
