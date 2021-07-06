//Set up requirements
let express = require("express");
let logger = require('morgan');
let Request = require('request');
let myStudio20 = {
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
	"460962447":"quilt",
	"460953896":"Fish",
	"460969704":"soccer",
	"460976345":"quilt",
	"460972439":"yup",
	"460964566":"Goblin",
	"460984829":"dinosaurs",
	"460983785":"Attack On Titan S4 leaked ",
	"460948256":"The power of Adobo",
	"460633291":"Darrick's Spinny Code",
	"460979720":"Untitled",
	"460979882":"Quilt Project",
	"460949117":"The Gift - Quilt",
	"460977345":"Yums Winter",
	"460996516":"scratchIntroduction",
	"460996889":"Hololive Pekora :d",
	"460989478":"scary shark",
	"460988704":"Naruto & Sasuke",
	"460612487":"Ice Cream!",
	"460981347":"Space",
	"460993160":"Cat & Chicken",
	"460981717":"Gen-quilt",
	"460994845":"Space Code",
	"461000098":"Food wars gif quilt",
	"460936032":"christmas <3",
	"460996587":"Simon Tried Code",
	"460992409":"Car Code",
	"461005010":"King in The North promotes",
	"460945167":"Quilt Thingy",
	"461040693":"Jamaal Raheem",
	"461237407":"FIFA 2077",
	"460654059":"Christmas",
	"460953103":"Jinquan.Q",
	"460992055":"CODE IS TO DIE FOR",
	"461280578":"Padoru!!",
	"461437728":"def not snow halation",
	"461433198":"Winter Nigh",
	"461004747":"Spin bear",
	"461483517":"TacoMan",
	"461575810":"Osu Spinner",
	"461568080":"Rip guy lol",
	"461574883":"CodeQuilt",
	"461624282":"christmas :) (Kyle's Quilt)",
	"461625516":"HourofCodeStarter_Stareyes",
	"461590654":"yasier-quilt",
	"461556782":"Rufayda's Quilt",
	"461632574":"Untitled",
	"461635102":"Cat fly scream",
	"461635688":"Spinning Logo",
	"461723060":"regret",
	"461841235":"Soul of Cinder",
	"461840120":"Hololive Gawr Gura",
	"461613286":"CodeQuilt",
	"460812696":"Doggo",
	"461840934":"BingusFan",
	"461852125":"Ms. Marzuoli's Woodland Paradise copy",
	"461857502":"Code",
	"461628840":"Griffin's Christmas",
	"461838133":"The Goblin and the Fairy",
	"461878419":"osu cool stuff",
	"461847920":"Untitled",
	"461915088":"No One Out Pizza's the Hut"
};

let myStudio = {};
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

app.get("/2020", function(req, res){
	res.render('index2020');
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

app.get("/api20/:studio", function(req, res){
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	let studioId = req.params.studio;
	let requestURL = 'https://api.scratch.mit.edu/studios/' + studioId + '/projects?limit=40';
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let theData = JSON.parse(body);
			//for coded quilts only
			for (let x = theData.length - 1; x >= 0; x--) {
				if (!myStudio20[theData[x].id]) {
					myStudio20[theData[x].id] = theData[x].title;
				}
			}
			//console.log('studio includes:')
			//console.log(myStudio20);
			//send all the data
			res.json(myStudio20);
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