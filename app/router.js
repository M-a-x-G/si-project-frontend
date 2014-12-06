import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('books');
  this.route('new_book');
  this.resource('search');
  this.route('about');
});

export default Router;
