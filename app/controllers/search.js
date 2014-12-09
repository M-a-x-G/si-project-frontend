import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['key', 'value'],
  key: "title",
  value: "",
  isSearched: function(){
    return this.get("value") != "" && this.get("title") != "";
  }.property("key", "value"),
  actions: {
    select: function (id) {
      this.set("key", id);
    },

    search: function () {
      if (this.get("searchText")) {
        this.set("value", this.get("searchText"));
      } else {
        this.set("value", "");
      }

    }
  }
});
