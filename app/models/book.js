import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr("string"),
  authors: DS.attr("string"),
  year: DS.attr("number"),
  publisher: DS.attr("string"),
  coverPage: DS.attr("string")
});
