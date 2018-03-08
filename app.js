var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var app = express();
var router = express.Router();

/*
var con = mysql.createConnection({
  host: "54.188.245.194",
  user: "front",
  password: "m093423q3238dj2923iqv3t5mp82c4np8yv4bp58ymp9x34@C$@$np87328",
  database: "concertb_concertboom"
});
*/
var queryRes=null;
var artistSlug=null;
/*con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM ZV_PERFORMER WHERE performer_slug_cb = 'ed-sheeran' limit 1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    queryRes = result;
  });
});
*/
//View Engine
app.set('view engine' , 'ejs');

app.set('views' , path.join(__dirname, 'views'));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));
/*
app.get('/', function(req, res){
	//var title = 'Customers';
	res.render('index' , {
		title: queryRes[0].performer_description
	});
	//res.json(res);
});
*/
app.get('/artist', function(req, res){
        //var title = 'Customers';
        artistSlug = req.query.name;
 	console.log(artistSlug);
	//res.send(artistSlug);
		
	var con = mysql.createConnection({
  	host: "54.188.245.194",
  	user: "front",
  	password: "m093423q3238dj2923iqv3t5mp82c4np8yv4bp58ymp9x34@C$@$np87328",
  	database: "concertb_concertboom"
	
	});
	

	//res.send("olaaaaaaaaaaaaaagh");
	con.connect(function(err) {
	  if (err) throw err;
	  con.query("SELECT * FROM ZV_PERFORMER WHERE performer_slug_cb = '"+artistSlug+"' limit 1", function (err, result, fields) {
	    console.log(result);
	    queryRes = result;
		//console.log(queryRes[0].performer_description);
		 res.render('templates/semantic-ui/artist1' , {
                 description: (queryRes[0].performer_description).substring(1,170),
		 img_url: queryRes[0].performer_image,
		 p_name: queryRes[0].performer_name
        	});
	  });
	});
	//console.log(queryRes[0].performer_description);
		
	/*res.render('index' , {
                title: queryRes[0].performer_description
        });*/
});




app.listen(3000 , function(){
	console.log('Sever started on port 3000 ...');
})
