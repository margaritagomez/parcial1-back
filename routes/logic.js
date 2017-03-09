"use strict";
var database = require('./database.js');

//Ejemplo cooky
var existeEsteNickName = function(nickName, funcionCallbackParaAgregarCliente) {
    var string = nickName.trim();
    if (string.indexOf(',') > -1 || string.indexOf(';') > -1 || string.indexOf(':') > -1 || string.indexOf('{') > -1 || string.indexOf(' ') > -1) {
        // letras peligrosas
        funcionCallbackParaAgregarCliente("You cant use any of these simbols : , {  nor space");
    }
    baseDatos.existsClientNickName(string, funcionCallbackParaAgregarCliente);
}

module.exports = {
	existsClientNickName : existeEsteNickName, //done
	createClient: crearCliente,					//done
	getClient: traerCliente,
	updateClient: modificarCliente,
	deleteClient: borrarCliente
};
