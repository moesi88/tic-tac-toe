import Ember from 'ember';

export default Ember.Component.extend({
  outcome: null,
  actions: {
    quit() {
       this.sendAction('quit');
    },

    reset() {
      this.sendAction('reset');
    }
  }
});
