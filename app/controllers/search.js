import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['key', 'value'],
  key: "title",
  value: "",
  isSearched: function(){
    return this.get("value") !== "" && this.get("title") !== "";
  }.property("key", "value"),
  searchButtonText: function () {
    var key = this.get("key").toLowerCase();
    if (key === "title" || key === "authors" || key === "publisher" || key === "year") {
      return key;
    } else {
      this.set("key", "title");
      return "title";
    }
  }.property("key"),
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
