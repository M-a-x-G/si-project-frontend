import Ember from 'ember';


export default Ember.Controller.extend({
  url: "",
  submitCover: null,
  actions: {

    saveFile: function(cover){
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
        success(function (result, textStatus, jqXHR) {
          alert("success");
        })
          .error(function (jqXHR, textStatus, errorThrown) {/* ... */
            alert("eorro");
          })
          .complete(function (result, textStatus, jqXHR) {/* ... */
          });
        //
        //
        //
        //  self.transitionToRoute("books");
      };
      //
      var onFail = function (book) {
        alert("fail ");
      };

      book.save().then(onSuccess, onFail);
    }
  }
});
