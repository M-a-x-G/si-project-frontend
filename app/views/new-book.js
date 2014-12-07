import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function () {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function () {
      Ember.$("#authors").selectize({
        plugins: ['remove_button', 'restore_on_backspace'],
        delimiter: ',',
        persist: false,
        create: function (input) {
          return {
            value: input,
            text: input
          };
        }
      });
    });
  }

});
