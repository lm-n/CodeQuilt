//Set up requirements
let express = require("express");
let logger = require('morgan');
let Request = require('request');
let myStudio = {
	"445884133":"We can code it",
	"445884429":"Hour of Code Starter",
	"445884716":"Hour of Code Starter remix",
	"460405248":"wiessmann-quilt",
	"460591262":"Mari & Flube performance ",
	"460599936":"Padoru Padoru with Hina",
	"460601244":"Code quilt addition",
	"460620937":"Coders Save World",
	"460637320":"Hour Of Code Quilt Paimon themed",
	"460679916":"CodeQuilt - Jackie",
	"460686903":"ZeroTwo",
	"460707832":"CodeQuilt QuanTran",
	"460754872":"reefblower (ft. hanamaru and mari)",
	"460758015":"Wolf and Snowman",
	"460762891":"Code quilt",
	"460765261":"naz quilt",
	"460766605":"Javier G. - Quilt",
	"460775522":"I dont even know what this is",
	"460776342":"The Eye",
	"460810431":"thing",
	"460679916":"KIRBYYYY",
	"460826480":"Popcat eats an oreo",
	"460805707":"Quilt",
	"460695226":"bear and puffs",
	"460843442":"Aki Quilt",
	"460834407":"Scratchquilt",
	"460852533":"Dragon Shark RC",
	"460892977":"LydonCodeQuiltDrakeAndJosh",
	"460892158":"HourofCodeStarter_Stareyes",
	"460696814":"C0W I.O",
	"460701756":"CS Quilt",
	"460897797":"Todoroki",
	"460904608":"Polar Bear",
	"460915055":"Bear",
	"460908849":"Code Quilt",
	"460894755":"Kevin Jim - Quilt",
	"460865145":"Timmy Quilt",
	"460942765":"JT dah Drip Monkey",
	"460906418":"CODE DUNK",
	"460930776":"CodeQuilt Yuxin",
	"460932292":"PN's Quilt",
	"460921280":"Dodge the apples",
	"460926850":"levi",
	"460940542":"Untitled",
	"460942765":"Jt in space",
	"460947982":"Lunchtime",
	"460945650":"Nobody: Disney Channel on Fridays at 7pm i",
	"460954469":"Running Cat",
	"460953514":"Food Time!!",
	"460905811":"Code Quilt but make it Beyblade",
	"460956385":"Buttons",
};
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
				if (!myStudio[theData[x].id]) {
					myStudio[theData[x].id] = theData[x].title;
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