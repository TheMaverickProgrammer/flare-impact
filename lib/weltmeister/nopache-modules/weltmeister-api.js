/*
  Author: Maverick Peppers
  Github: TheMaverickProgrammer
  Webstite: maverickpeppers.com
  Module: Weltmeister-api

  This module exports an object that contain the functions used at the endpoints
  at localhost/wm/api/browse, localhost/wm/api/glob, localhost/wm/api/save
  which are configured by the Welmeister-api-router module.
*/
module.exports = function(conf) {

  // Make available for all functions
  var public = {conf: conf};

  // dependencies
  var glob = require('glob');
  var braces = require('braces');
  var fs = require('fs');
  var chalk = require('chalk');

  // aux function
  // references https://github.com/kvz/locutus/blob/master/src/php/var/empty.js
  function empty(mixedVar) {
    var undef
    var key
    var i
    var len
    var emptyValues = [undef, null, false, 0, '', '0']

    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true
      }
    }

    if (typeof mixedVar === 'object') {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
          return false
        }
      }
      return true
    }

    return false
  }

  /*
    Browse fetches all files within a directory and is filtered by type.
    The type is read from req.query.dir and can have one of the following values:
    1 - images (.png, .gif, .jpg, .jpeg)
    2 - scripts (.js)
  */
  this.Browse = function(req) {
    var dir = "";
    if(!empty(req.query.dir)) {
      req.query.dir = String(req.query.dir);
      dir = req.query.dir.replace( '..', '');
    }

    if( dir[dir.length-1] != '/' ) {
    	dir += '/';
    }

    var find = '*.*';
    switch(req.query.type) {
    	case 'images':
    		find = braces('*.{png,gif,jpg,jpeg}');
    		break;
    	case 'scripts':
    		find = ['*.js'];
    		break;
    }

    var dirs = [];
    try {
      dirs = glob.sync(dir + "*/", {mark: true});
    } catch(e) {
      console.log(chalk.yellow("Welmeister caught an exception: ") + e);
      dirs = [];
    }

    var files = [];
    for(var f = 0; f < find.length; f++) {
      try {
        var matchingFiles = glob.sync(dir + find[f]);
        files = files.concat(matchingFiles);
      } catch(e) {
        console.log(chalk.yellow("Welmeister caught an exception: ") + e);
        files = [];
      }
    }

    /*
    var fileRootLength = public.conf.WM_ROOT_DIR.length;
    for(var i = 0; i < files.length; i++) {
      files[i] = files[i].substring(0,fileRootLength);
    }
    */

    for(var j = 0; j < dirs.length; j++) {
      // ! This is needed !
      dirs[j] = dirs[j].substr(0, dirs[j].length-1); // drop the '/' character
    }

    // substr at second-to-last '/'
    var parent = req.query.dir.substring(0, req.query.dir.lastIndexOf('/'));

    var result = {
      'parent': empty(req.query.dir)? false : parent,
      'dirs': dirs,
      'files': files
    };

    return JSON.stringify(result);
  }

  /*
    Glob fetches the entity files used in the requested level
  */
  this.Glob = function(req) {
    var files = [];

    if(!empty(req.query.glob)) {
      var globs = Array.isArray(req.query.glob)? req.query.glob : [req.query.glob];

      for(var g = 0; g < globs.length; g++) {
          pattern = "" + globs[g].replace('..', '');
          try {
            var currentFiles = glob.sync(pattern); // glob returns array
            files = files.concat(currentFiles);
          } catch(e) {
            currentFiles = false;
            console.log(chalk.yellow("Welmeister caught an exception: ") + e);
          }
      }
    }
    //console.log("JSON.stringify(files): " + JSON.stringify(files));
    return JSON.stringify(files);
  }

  /*
    Save writes level data to a file. Will return errors if:
      1 - The file failed to write (directory doesn't exist)
      2 - File does not have a .js suffix
      3 - No data is found in the level workspace
      4 - No path was specified
    */
  this.Save = function(req) {
    result = {'error': 0};

    if( !empty(req.body.path) && !empty(req.body.data) ) {
    	var path = public.conf.WM_ROOT_DIR + String(req.body.path).replace('..', '');

    	if(path.match(/.*\.js/g)) {
        try {
    		  success = fs.writeFileSync( path, req.body.data );
        } catch(e) {
          success = false;
          console.log(chalk.yellow("Welmeister caught an exception: ") + e);
        }

    	  if(success === false) {
    	  	result = {
    		  	'error': '2',
    		  	'msg': "Couldn't write to file: " + path
    		  };
    	  }
      } else { // end if match js
        result = {
        	'error': '3',
        	'msg': "File must have a .js suffix"
        };
      }
    } else { // end if path or data has value
    	result = {
  	  	'error': '1',
  		  'msg': "No Data or Path specified"
  	  };
    }
    return(JSON.stringify(result));
  }
  return this;
}
