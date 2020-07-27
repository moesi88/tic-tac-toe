import Ember from "ember";
const { get, set, computed } = Ember;

const checkIfWon = (result, playedCharacters) => {
  for (let i = 0; i < result.length; i++) {
    let count = 0;
    for (let j = 0; j < playedCharacters.length; j++) {
      if (result[i].includes(playedCharacters[j])) {
        count += 1;
      }
    }
    if (count === 3) {
      return true;
    }
  }
  return false;
};

const computerPlay = (board) => {
  let boardCells = [];
  for (let key in board) {
    board[key] === null && boardCells.push(key);
  }
  if (boardCells.length !== 0) {
    let random = Math.floor(Math.random() * boardCells.length);
    return boardCells[random];
  }
};
const gameLogic = (that, playedChar, symbol, box, number, winningPatterns) => {
  set(that, box, symbol);
  playedChar.pushObject(number);
  let won = checkIfWon(winningPatterns, playedChar);
  if (won) {
    set(that, "outcome", "won");
    set(that, "showReset", true);
  } else {
    let computerSymbol = get(that, "computer");
    let board = {
      one: get(that, "one"),
      two: get(that, "two"),
      three: get(that, "three"),
      four: get(that, "four"),
      five: get(that, "five"),
      six: get(that, "six"),
      seven: get(that, "seven"),
      eight: get(that, "eight"),
      nine: get(that, "nine"),
    };
    let boardMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };
    let computerMarked = computerPlay(board);
    let computerPlayed = get(that, "computerPlayed");
    computerPlayed.pushObject(boardMap[computerMarked]);
    if (computerMarked === undefined) {
      set(that, "outcome", "draw");
      set(that, "showReset", true);
    } else {
      set(that, computerMarked, computerSymbol);
      let computerWon = checkIfWon(winningPatterns, computerPlayed);
      if (computerWon) {
        set(that, "outcome", "lost");
        set(that, "showReset", true);
      }
    }
  }
};

export default Ember.Controller.extend({
  showDialog: true,
  playerOne: null,
  computer: null,
  showReset: false,
  outcome: null,
  startingPlayer: computed("playerOne", function () {
    let playerOne = get(this, "playerOne");
    return playerOne;
  }),
  //board values
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  seven: null,
  eight: null,
  nine: null,
  winningPatterns: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
  xPlayed: [],
  oPlayed: [],
  computerPlayed: [],
  actions: {
    closeDialog() {
      set(this, "showDialog", false);
    },
    selectSymbol(symbol) {
      set(this, "playerOne", symbol);
      if (symbol === "X") {
        set(this, "computer", "O");
      } else {
        set(this, "computer", "X");
      }
      set(this, "showDialog", false);
    },
    markBox(symbol, box, number) {
      let xPlayed = get(this, "xPlayed");
      let oPlayed = get(this, "oPlayed");
      let winningPatterns = get(this, "winningPatterns");
      if (get(this, "hasQuit")) {
        return;
      }
      if (symbol === "X" && get(this, box) === null) {
        gameLogic(this, xPlayed, "X", box, number, winningPatterns);
      }
      if (symbol === "O" && get(this, box) === null) {
        gameLogic(this, oPlayed, "O", box, number, winningPatterns);
      }
    },
  },
});
