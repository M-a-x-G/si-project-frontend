import DS from 'ember-data';
import Ember from 'ember';
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('book', 'Book', {
  // Specify the other units that are required for this test.
  needs: []
});

test('Book is a valid ember-data model', function() {
  //var store = this.store();
  var book = this.subject({title: "Ember-qunit test book", author:"Max", year: 2014, publisher: "SeMa Projects", coverPage:"127.0.0.1/home"});
  ok(book);
  ok(book instanceof DS.Model);
});
