/*
  Author: Maverick Peppers
  Github: TheMaverickProgrammer
  Webstite: maverickpeppers.com
  Module: Weltmeister-api-router

  This module exports an object that passes weltmeister configurations
  to the callback objects. Then it maps the objects to api endpoints.
  The endpoints return JSON object results.

  GET  Browse -- /browse
  GET  Glob   -- /glob
  POST Save   -- /save
*/
module.exports = function(conf) {
  var express = require('express');
  var router = express.Router();

  // weltmeister api specific
  var wm = require('./weltmeister-api')(conf);
  var browse = wm.Browse;
  var glob   = wm.Glob;
  var save   = wm.Save;

  // Get Browse
  router.get('/browse', function(req, res) {
    res.send(browse(req));
  });

  // GET Glob
  router.get('/glob', function(req, res) {
    res.send(glob(req));
  });

  // POST Save
  router.post('/save', function(req, res) {
    res.send(save(req));
  });

  return router;
}
