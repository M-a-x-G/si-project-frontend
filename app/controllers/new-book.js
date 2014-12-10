import Ember from 'ember';


export default Ember.Controller.extend({
  yearVal: function(){ var year = this.get("year");
    year = year | 0;
    return year !== 0;}.property("year"),
  submitCover: null,
  actions: {

    removeCover: function(){
      this.set("submitCover", null);
      $("#cover-image").remove();// jshint ignore:line
      $("#remove-cover").addClass("hidden");// jshint ignore:line
    },

    saveFile: function (cover) {
      this.set("submitCover", cover);
      $("#cover-image").remove();// jshint ignore:line
      var URL = window.URL || window.webkitURL,
        imageUrl,
        image;

      if (URL) {
        imageUrl = URL.createObjectURL(cover.files[0]);
        image = document.createElement("img");

        $(image)// jshint ignore:line
          // once the image has loaded, execute this code
          .load(function () {
            // set the image hidden by default
            $(this).hide().addClass("cover-image").attr("id", "cover-image");// jshint ignore:line

            $('#dropzone')// jshint ignore:line
              .append(this);

            // fade our image in to create a nice effect
            $(this).fadeIn();// jshint ignore:line
          })

          // if there was an error loading the image, react accordingly
          .error(function () {
            // notify the user that the image could not be loaded
          })

          // *finally*, set the src attribute of the new image to our image
          .attr('src', imageUrl);
          $("#remove-cover").removeClass("hidden");// jshint ignore:line
      }
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

