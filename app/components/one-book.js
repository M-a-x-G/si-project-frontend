import Ember from 'ember';

export default Ember.Component.extend({
  actions: {

    //question: function () {
    //  Ember.$(".undernav").append('<div class="modal fade" id="really-remove">' +
    //  ' <div class="modal-dialog modal-sm">' +
    //  '<div class="modal-content">' +
    //  ' <div class="modal-header">' +
    //  ' <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
    //  ' <h4 class="modal-title">Sure?</h4>' +
    //  '</div>' +
    //  '<div class="modal-body">' +
    //  '<p>You really want to delete <strong>'+this.get("title")+'</strong>?</p>' +
    //  '</div>' +
    //  '<div class="modal-footer">' +
    //  '<button type="button" class="btn btn-default " data-dismiss="modal">No</button>' +
    //  '<button {{action "removeBook"'+ this.get("title")+'}} type="button" class="btn btn-primary button-coloring">Yes I do</button>' +
    //  '</div>' +
    //  '</div><!-- /.modal-content -->' +
    //  '</div><!-- /.modal-dialog -->' +
    //  '</div><!-- /.modal -->');
    //},

    removeBook: function (id) {
      var store = this.get('targetObject.store');
      store.find('book', id).then(function (book) {
        book.destroyRecord();
      });
    }
  }
});
