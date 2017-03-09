"use strict";
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = process.env.MONGODB_URI || "mongodb://heroku_tzqr205d:o3s6m9sibu5ojkmqv3od0vlm8f@ds121190.mlab.com:21190/heroku_tzqr205d";

// Use connect method to connect to the server
// se ejecuta apenas se abre el servidor
var conectarBD = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to data base collection clients "+url);

  db.close();
});

var existeEsteNickName = function(nickName, funcionCallbackParaAgregarCliente){
    var existe =false;

      MongoClient.connect(url, function(err, db)
      {
        //esta haciendo esto sincrono
        console.log('1 existe nickName?');
        encontrarNickName(nickName, db, existe, function(exists)//esta funcion es el callback de abajo
        {
          existe = exists;
          console.log('2 existe nickName? este es el callback! resultado '+ exists);
          db.close();
          console.log('3 existe nickName? Devuelve '+existe);
          funcionCallbackParaAgregarCliente(existe);
        });

      });
}
var encontrarNickName = function(nickNameC, db, existe, callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("buscando a: nickName"+'"'+nickNameC+'"');
    collection.find({nickName:nickNameC}).toArray(function(err, results){
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            console.log("Found the following records para el NickName "+ JSON.stringify(results[0]));
            //docs es la respuesta a la query
            if(results.length === 0)
            {
              callback(false);
            }
            else
            {
              callback(true); //repetido
            }
          }

     });
}

module.exports = {
  existsClientNickName : existeEsteNickName, //done
  createClient: crearCliente,
  getClient: traerCliente,
  updateClient: modificarCliente,
  deleteClient: borrarCliente

};
