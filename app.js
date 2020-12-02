//Set up requirements
let express = require("express");
let logger = require('morgan');
let Request = require('request');
let myStudio = [];
let port = process.env.PORT || 3000;

//Create an 'express' object
let app = express();

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

/*-----
ROUTES
-----*/

//Main Page Route - NO data
app.get("/", function(req, res){
	res.render('index');
});

//JSON Serving route
app.get("/api/:studio", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	let studioId = req.params.studio;
	let requestURL = 'https://api.scratch.mit.edu/studios/' + studioId + '/projects';
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let theData = JSON.parse(body);
			//for coded quilts only
			for (let x = theData.length - 1; x >= 0; x--) {
				let end = false;
				for (let i = 0; i < myStudio.length; i++){
					if (myStudio[i] === theData[x].id){
						end = true;
						break;
					}
				}
				if (end === true){
					break;
				}else{
					myStudio.unshift(theData[x].id);
				}
			}
			//console.log('studio includes:')
			//console.log(myStudio);
			//send all the data
			res.json(myStudio);
		}
	});
});

app.get("/image/:projectId", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	let projectId = req.params.projectId;
	let requestURL = 'https://uploads.scratch.mit.edu/projects/thumbnails/'+ projectId;
	Request(requestURL, {encoding:'binary'}, function (error, response) {
		if (response !== undefined){
			res.writeHead(200, {'Content-Type': 'image/png', 'Cache-Control': 'no-cache' });
			res.end(response.body, 'binary');
		}
	});
});

//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

// Start the server
app.listen(port);
console.log('Express started on port ' + port);