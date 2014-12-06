import DS from 'ember-data';
import Ember from "ember";

export default DS.RESTSerializer.extend({
  serializeIntoHash: function (hash, type, record, options) {
    var serialized = this.serialize(record, options);

    //Include the id in the payload
    //Jackson was complaining when it received a null id ...
    //serialized.id = record.id ? record.id : 0;

    //remove the root element
    Ember.merge(hash, serialized);
  }
});
