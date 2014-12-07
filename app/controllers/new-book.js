import Ember from 'ember';


export default Ember.Controller.extend({
  url: "",
  uploadstatus: "",
  actions: {
    submitBook: function () {
      var self = this;

      this.set("uploadstatus", "uploading");


      var book = this.store.createRecord('book', {
        title: this.get('title'),
        author: this.get('authors'),
        year: this.get('year'),
        publisher: this.get('publisher')
      });


      var onSuccess = function (book) {
        var uuid = book.get('id');
        var coverInput = self.get("cover");
        var fileList = self.get("fileupload");
        self.set("uploadstatus", "dto done");
        self.set("title", "");
        self.set("authors", "");
        self.set("year", "");
        self.set("publisher", "");

        self.set("uploadstatus", "start image");
        var jqXHR = Ember.$("#fileupload").fileupload(
          'send',
          {
            files: filesList,
            url: 'http://localhost:8080/rest/v1/coverupload?uuid='+uuid,
            sequentialUploads: true,
            dataType: 'json',
            formData: {script: true}
          }
        ).success(function (result, textStatus, jqXHR) {
            self.set("uploadstatus", "success");
          })
          .error(function (jqXHR, textStatus, errorThrown) {/* ... */
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
