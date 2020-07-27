import Ember from "ember";
const { get, set, computed } = Ember;

export default Ember.Controller.extend({
    showDialog: true,
    playerOne: null,
    computer: null,
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
