/*
  Author: Maverick Peppers
  Github: TheMaverickProgrammer
  Webstite: maverickpeppers.com
  Module: Weltmeister
  Dependencies:
   - glob
   - braces
   - chalk
   - fs
   - express

   This module exports an object that accepts weltmeister configurations
   and the express server application object. The object is set to use a specific
   endpoint '/wm/api' as found in the lib/weltmeister/config.js file.

   Further work can be done to make the configuration between the two files
   seemless.
*/
module.exports = function(opts, app) {
  // Create a config object on the options
  var conf = {
    // Use the current file directory as the basis for fetching objects
    // Or, if supplied, use another directory as specified in the options object.
    WM_ROOT_DIR:(typeof opts.rootDir == 'undefined')?  "" + __dirname + "/" : "" + opts.rootDir + "/"
  }

  // instantiate the router
  var wmRouter = require('./weltmeister-api-router')(conf);

  // Use the router
  app.use('/wm/api', wmRouter);
}
