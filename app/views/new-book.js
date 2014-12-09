import Ember from 'ember';

export default Ember.View.extend({
  data: null,
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
          url: 'http://localhost:8080/rest/v1/coverupload?uuid=lol',
          // Enable image resizing, except for Android and Opera,
          // which actually support image resizing, but fail to
          // send Blob objects via XHR requests:
          disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
          //sequentialUploads: true,
          dataType: 'text',
          //formData: {script: true},
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i,
          maxFileSize: 5000000, // 5MB
          add: function (e, data) {
            self.get('controller').send("saveFile", data);
          }
        }
      );
    });
  }

});
