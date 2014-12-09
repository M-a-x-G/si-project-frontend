import Ember from 'ember';
import EmberValidations from 'ember-validations';

function isValidString(string){
  return string && string !== "";

}

export default Ember.Controller.extend(EmberValidations.Mixin, {
  //validations: {
  //  title: {
  //    presence: true,
  //    length: {minimum: 5}
  //  },
  //  author :{
  //    presence: true,
  //    length: {minimum: 5}
  //  },
  //  year: {
  //    numericality: true
  //    //format: { with: /({3}[0-9])({4})/, allowBlank: true, message: 'must be years only'  }
  //  }
  //
  //},
  yearVal: function(){ var year = this.get("year");
    return year && year !== "";}.property("year"),
  submitCover: null,
  actions: {

    saveFile: function (cover) {
      this.set("submitCover", cover);
    },

    submitBook: function () {
      var self = this;
      var book = this.store.createRecord('book', {
        title: this.get('title'),
        author: this.get('authors'),
        year: this.get('year'),
        publisher: this.get('publisher')
      });


      var onSuccess = function (book) {
        var uuid = book.get('id');

        self.set("uploadstatus", "dto done");
        self.set("title", "");
        self.set("authors", "");
        self.set("year", "");
        self.set("publisher", "");

        Ember.$("#coverupload").fileupload(
          {
            url: 'http://localhost:8080/rest/v1/coverupload?uuid=' + uuid
          }
        );

        self.get("submitCover").submit().
          success(function (result, textStatus, jqXHR) { // jshint ignore:line
            alert("success");
          })
          .error(function (jqXHR, textStatus, errorThrown) {// jshint ignore:line
            alert("eorro");
          })
          .complete(function (result, textStatus, jqXHR) {// jshint ignore:line
          });
        //
        //
        //
        //  self.transitionToRoute("books");
      };
      //
      var onFail = function () {
        alert("fail ");
      };

      book.save().then(onSuccess, onFail);
    }
  }
});

