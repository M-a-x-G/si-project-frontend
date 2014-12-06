import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    key: {
      refreshModel: true
    },
    value: {
      refreshModel: true
    }
  },
  model: function (params) {
    if (!params.key || !params.value) {
      return [];
    }
    return this.store.find("book", {key: params.key, value: params.value});
  }
});
