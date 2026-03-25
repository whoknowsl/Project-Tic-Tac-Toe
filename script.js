const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".boared");
const start = document.querySelector("#start");
const player1Input = document.querySelector("#player-1");
const player2Input = document.querySelector("#player-2");

let player1 = "Player 1";
let player2 = "Player 2";
let currentPlayer = "X";
let gameActive = false;

let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

// Read player names when Start is clicked
start.addEventListener("click", () => {
  player1 = player1Input.value.trim() || "Player 1";
  player2 = player2Input.value.trim() || "Player 2";
  resetGame();
  gameActive = true;
});

function getCurrentName() {
  return currentPlayer === "X" ? player1 : player2;
}

function makeMove(index) {
  if (!gameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    showMessage(` ${getCurrentName()} wins!`);
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    showMessage("🤝 It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  for (let [a, b, c] of winningPatterns) {
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
}

function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}

function showMessage(msg) {
  // Remove old message if any
  const old = board.querySelector(".result-msg");
  if (old) old.remove();

  const h3 = document.createElement("h3");
  h3.className = "result-msg";
  h3.textContent = msg;
  h3.setAttribute("style","text-align:center color:blue")
  board.appendChild(h3);
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));

  const old = board.querySelector(".result-msg");
  if (old) old.remove();
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = Number(cell.dataset.index);
    makeMove(index);
  });
});