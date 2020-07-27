import Ember from "ember";
const { get, set, computed } = Ember;

export default Ember.Controller.extend({
  showDialog: true,
  playerOne: null,
  computer: null,
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
  },
});
