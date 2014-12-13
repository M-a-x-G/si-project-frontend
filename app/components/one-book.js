import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    removeBook:function(id){
      var store = this.get('targetObject.store');
      store.find('book', id).then(function (book) {
        book.destroyRecord();
      });
    }
  }
});
