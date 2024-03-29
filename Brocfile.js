/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {destDir: 'assets'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {destDir: 'fonts'});
app.import('bower_components/selectize/dist/js/standalone/selectize.js');
app.import('bower_components/selectize/dist/css/selectize.css');
app.import('bower_components/selectize/dist/css/selectize.bootstrap3.css');
app.import('bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload-process.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload-validate.js');
app.import('bower_components/jquery-file-upload/js/jquery.fileupload-image.js');
app.import('bower_components/jquery-file-upload/css/jquery.fileupload-noscript.css');
app.import('bower_components/jquery-file-upload/css/jquery.fileupload.css');
app.import('bower_components/jquery-file-upload/css/jquery.fileupload-ui.css');
app.import('bower_components/jquery-file-upload/css/jquery.fileupload-ui-noscript.css');
module.exports = app.toTree();

