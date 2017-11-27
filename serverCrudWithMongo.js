const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le r√©pertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Param√®tres standards du modyle bodyParser
// qui sert √  r√©cup√©rer des param√®tres re√ßus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Lance le serveur avec express
server.listen(port);

console.log("Serveur lanc√© sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//------------------
// ROUTES
//------------------
// Utile pour indiquer le table, dans le cas
// ou il ne s'agit pas de public/table.html
app.get('/table', function(req, res) {
    res.sendFile(__dirname + '/public/paginationTable.html');
});

//------------------
// ROUTES
//------------------
// Utile pour indiquer le table, dans le cas
// ou il ne s'agit pas de public/table.html
app.get('/vueTable', function(req, res) {
    res.sendFile(__dirname + '/public/vueTable.html');
});
// Ici des routes en :
// http GET (pour r√©cup√©rer des donn√©es)
// http POST : pour ins√©rer des donn√©es
// http PUT pour modifier des donn√©es
// http DELETE pour supprimer des donn√©es

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion √  la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais apr√®s on devra
	// r√©ellement se connecte √  la base de donn√©es
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion √©tablie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

// On va rÈcupÈrer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramËtres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/restaurants', function(req, res) { 
	// Si prÈsent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 0);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);
    let nom = req.query.nom;

	if(nom) {
    	// find by name
	 	mongoDBModule.findRestaurantsByName(nom, page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchÈs par nom avec succËs",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
	 	}); 
    } else {
    	// find normal
	 	mongoDBModule.findRestaurants(page, pagesize, function(data) {
	 		var objdData = {
	 			msg:"restaurant recherchÈs avec succËs",
	 			data: data
	 		}
	 		res.send(JSON.stringify(objdData)); 
	 	}); 

    }
});
// Creation d'un restaurant par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/restaurants', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un restaurant en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les donn√©es du formulaire d'envoi
	// les params sont dans req.body m√™me si le formulaire
	// est envoy√© en multipart
	console.log(req.body);
 	mongoDBModule.createRestaurant(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un restaurant, on fera l'update par
// une requ√™te http PUT, c'est le standard REST
app.put('/api/restaurants/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updateRestaurant(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un restaurant
// On fera la suppression par une requ√™te http DELETE
// c'est le standard REST
app.delete('/api/restaurants/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteRestaurant(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})

// ICI c'est autorisÈ par la norme REST car
// "count" est un mot rÈservÈ, on ne risque pas de
// le prendre pour une TABLE ou une collection
// cf la partie "reserved words" de
// https://blog.octo.com/designer-une-api-rest/
app.get('/api/restaurants/count', function(req, res) { 
	// on renvoie le nombre de restaurants
 	mongoDBModule.countRestaurants(function(data) {
 		var objdData = {
 			msg:"Count effectuÈ avec succËs",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	});     	
});

