import Ember from 'ember';

export default Ember.Controller.extend({
  url: "",
  actions: {
    submitBook: function () {
      var self = this;
      var book = this.store.createRecord('book', {
        title: this.get('title'),
        author: this.get('author'),
        year: this.get('year'),
        publisher: this.get('publisher')
      });

      var onSuccess = function (book) {
        var uuid = book.get('id');
        this.set("title", "");
        this.set("author", "");
        this.set("year", "");
        this.set("publisher", "");
        self.transitionToRoute("books");
      };

      var onFail = function (book) {
        alert("fail ");
      };

      book.save().then(onSuccess, onFail);
    }
  }
});
