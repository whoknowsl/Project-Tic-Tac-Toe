const cells = document.querySelector(".cell");
const boared = document.querySelector(".boared");
const start = document.querySelector("#start");

let currentPlayer = "X";

let gameboared = ["", "", "", "", "", "", "", "", ""];

const winningpatteren = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function displayBoard() {
  console.log(`
    ${gameboared[0] || 0} | ${gameboared[1] || 1} | ${gameboared[2] || 2}
    ---------
    ${gameboared[3] || 3} | ${gameboared[4] || 4} | ${gameboared[5] || 5}
    ---------
    ${gameboared[6] || 6} | ${gameboared[7] || 7} | ${gameboared[8] || 8}
  `);
}
function makeamove(index) {
  if (gameboared[index] !== "") {
    return "eroor";
  }
  gameboared[index] = currentPlayer;
  displayBoard();

  const winner = checkWinner();
  if (winner) {
    console.log(winner);
    return;
  }
  const draw = checkDraw();
  if (draw) {
    console.log("It's a draw");
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
function checkWinner() {
  for (let combo of winningpatteren) {
    const [a, b, c] = combo;
    if (
      gameboared[a] &&
      gameboared[a] === gameboared[b] &&
      gameboared[b] === gameboared[c]
    ) {
      return gameboared[a];
    }
  }
  return null;
}
function checkDraw() {
  return gameboared.every((cell) => cell !== "");
}

cells.forEach((cell) => cell.addEventListener("click",()=>
const index = cell.dataset.index;));
