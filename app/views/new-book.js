import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function () {
    this._super();
    var self = this;
    Ember.run.scheduleOnce('afterRender', this, function () {
      Ember.$("#authors").selectize({
        plugins: ['remove_button', 'restore_on_backspace'],
        delimiter: ';',
        persist: false,
        create: function (input) {
          return {
            value: input,
            text: input
          };
        }
      });
      Ember.$("#coverupload").fileupload(
        {
          url: 'http://localhost:8080/rest/v1/coverupload',
          dropZone: Ember.$('#dropzone'),
          // Enable image resizing, except for Android and Opera,
          // which actually support image resizing, but fail to
          // send Blob objects via XHR requests:
          disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
          //sequentialUploads: true,
          dataType: 'text',
          //formData: {script: true},
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i,
          maxFileSize: 2500000, // 2.5MB
          add: function (e, data) {
            self.get('controller').send("saveFile", data);
          }
        }
      );
    });

    Ember.$(document).bind('dragover', function (e) {
      var dropZone = Ember.$('#dropzone'),
        timeout = window.dropZoneTimeout;
      if (!timeout) {
        dropZone.addClass('in');
      } else {
        clearTimeout(timeout);
      }
      var found = false,
        node = e.target;
      do {
        if (node === dropZone[0]) {
          found = true;
          break;
        }
        node = node.parentNode;
      } while (node != null);
      if (found) {
        dropZone.addClass('hover');
      } else {
        dropZone.removeClass('hover');
      }
      window.dropZoneTimeout = setTimeout(function () {
        window.dropZoneTimeout = null;
        dropZone.removeClass('in hover');
      }, 100);
    });
  }

});
