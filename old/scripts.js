//In this exampple, the NY Times articles and Flickr images are not directly related

var nyTimesArticles = [];
var flickrData = [];

function makeHTML(){
	var theHTML = '';
	for (var i = 0; i < nyTimesArticles.length; i++){
		theHTML += "<div class='flickrArticle'>";
		theHTML += "<h3>" + nyTimesArticles[i].headline.main + "</h3>";
		theHTML += "<img src='" + flickrData[i].url_o + "'/>";
		theHTML += "</div>";
	}
	$('main').html(theHTML);
}

function getFlickrData(currentWord){
	//console.log("Get Flickr Data");
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&extras=url_o&text=";
	var currentSearchWord = "pokemon";
	var myFlickrKey = '&api_key=' + 'YOUR-FLICKR-API-KEY-GOES-HERE';

	var flickrReqURL = flickrURL + currentSearchWord + myFlickrKey;

	$.ajax({
		url: flickrReqURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			console.log("WooHoo!");
			//console.log(data);
			var tempFlickrData = data.photos.photo;
			console.log(tempFlickrData);
			
			for (var i = 0; i < tempFlickrData.length; i++){
				if (tempFlickrData[i].url_o){
					flickrData.push(tempFlickrData[i]);
				}
			}

			// tempFlickrData.forEach(function(fD){
			// 	if(fD.url_o){
			// 		flickrData.push(fD);
			// 	}
			// });

			console.log(flickrData);
			makeHTML();
		}
	});
}

function getStudioData(){
	console.log("Get Studio Data");
	var studioURL = 'https://api.scratch.mit.edu/studios/27961716/projects';
	console.log(studioURL);
	$.ajax({
		url: studioURL,
		type: 'GET',
		dataType: 'json',
		error: function(err){
			console.log("Uh oh...");
			console.log(err);
		},
		success: function(data){
			console.log(data);
			//nyTimesArticles = data.response.docs;
			//console.log(nyTimesArticles);
			//getFlickrData();
		}
	});
}

$(document).ready(function(){
	//console.log("I'm ready!");
	getStudioData();
});