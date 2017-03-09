"use strict";
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var logic = require("./logic.js");
var Flickr = require ("flickrapi")

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Ejemplo cooky
router.post('/existsClient', function(req, res, next) {
  console.log("ENTRA exist client?");
  if (req.body.length > 1e6) {
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("verifying client "+ JSON.stringify(newClient.nickName));
  clientLogic.existsClientNickName(newClient.nickName , function(respuesta){
	  	res.send(respuesta);// true, false o error
	    console.log("TERMINA exist client?");
	    res.end();
  });

});


module.exports = router;
