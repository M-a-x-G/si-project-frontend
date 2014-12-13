import Ember from 'ember';

function isValidImage(file) {
  var type = file.name.split('.').pop().toLowerCase();

  if (type && file.size <= 2500000) {
    return /(gif|jpe?g|png|bmp)/.exec(type);
  } else {
    return false;
  }
}

function alertTimeout(wait) {
  setTimeout(function () {
    Ember.$('#alert-container').children('.alert:last-child').remove();
  }, wait);
}

function showSuccessAlert(message) {
  Ember.$("#alert-container").append(
    '<div class="alert alert-success alert-dismissible" role="alert">' +
    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
    (message === ""? message : "<strong>Great</strong> Book was added correctly.") + "</div>"
  );
  alertTimeout(3500);
}

function showFailAlert(message) {
  Ember.$("#alert-container").append(
    '<div class="alert alert-danger alert-dismissible" role="alert">' +
    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
    (message !== "" ? message : "<strong>Oh no!</strong> An error occurred on upload. (no network connection?)") + "</div>"
  );
  alertTimeout(3500);
}

function removeCover(controller) {
  controller.set("submitCover", null);
  $("#cover-image").remove();// jshint ignore:line
  $("#remove-cover").addClass("hidden");// jshint ignore:line
  $("#dropzone-border").removeClass("hidden");// jshint ignore:line
}

function removeInputs(controller) {
  controller.set("title", "");
  controller.set("publisher", "");
  controller.set("year", "");
  Ember.$("#authors")[0].selectize.clear();
}

export default Ember.Controller.extend({
  yearVal: function () {
    var year = this.get("year");
    year = year | 0;
    return year !== 0;
  }.property("year"),
  submitCover: null,
  actions: {

    removeCover: function () {
      removeCover(this);
    },

    saveFile: function (cover) {

      if (cover && isValidImage(cover.files[0])) {
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
              showFailAlert("<strong>Oh no!</strong> Error while loading image.");
              // notify the user that the image could not be loaded
            })

            // *finally*, set the src attribute of the new image to our image
            .attr('src', imageUrl);
          $("#remove-cover").removeClass("hidden");// jshint ignore:line
          $("#dropzone-border").addClass("hidden");// jshint ignore:line
        }
      }
    },

    submitBook: function () {
      var self = this;
      var title = this.get('title');
      var authors = this.get('authors');
      var year = this.get('year');
      var publisher = this.get('publisher');

      if (!title || title === "") {
        showFailAlert("<strong>Simply no</strong>");
        return;
      }

      if (self.get("submitCover") === null) {

        var book = this.store.createRecord('book', {
          title: title,
          author: authors,
          year: year,
          publisher: publisher
        });
        book.save().then(showSuccessAlert, showFailAlert);
        removeInputs(self);

      } else {
        self.get("submitCover").formData = {title: title, year: year, author: authors, publisher: publisher};
        self.get("submitCover").submit().
          success(function (result, textStatus, jqXHR) { // jshint ignore:line
            removeCover(self);
            removeInputs(self);
            showSuccessAlert();

          })
          .error(function (jqXHR, textStatus, errorThrown) {// jshint ignore:line
            showFailAlert();

          })
          .complete(function (result, textStatus, jqXHR) {// jshint ignore:line
          });
      }
    }
  }
});

