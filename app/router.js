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
  this.route('serverunavailable');
  this.route('servererror');
  this.route('notfound');
  this.route('notfound', { path: "/*path" });
});

export default Router;
