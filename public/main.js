// When the user clicks the about, open the modal 
$('#about a').click(function(){
	console.log('here');
	modal.style.display = "block";    
});
$('#close').click(function(){
	modal.style.display = "none";  
});
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


let projects, cols = [];

//Function to genrerate HTML string
function makeQuilt(theData){
	for (var i = 0; i < 4; i++) {
		$('#quilt').append('<div class="column" id="column'+ i +'"></div>');
	}

	let column = 0;
	let randomColor = Math.floor(Math.random()*16777215).toString(16);
	$("#column0").append('<a href="https://scratch.mit.edu/studios/27961716/projects/" target="_blank" ><img src="codeQuilt3.png" style="width:100%;outline:2px dashed #' + randomColor + ';outline-offset: -10px;"></a>');
	column = 1
	for (var i = 0; i < projects.length; i++) {
		if (column === 4){
			column = 0;
		}
		let randomColor = Math.floor(Math.random()*16777215).toString(16);
		let projectId = projects[i]
		$("#column" + column).append('<a href="https://scratch.mit.edu/projects/'+ projectId +'" target="_blank" ><img src="/image/'+ projectId +'.png" style="width:100%;outline:2px dashed #' + randomColor + ';outline-offset: -10px;"></a>');
		column++;
	}
}

//Function to get data via the server's JSON route
function getAPIData(studio){
	$.ajax({
		url: '/api/' + studio,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			//console.log("WooHoo!");
			projects = data;
			makeQuilt();
		}
	});
}

$(document).ready(function(){
	//let studio = '27961716';
	let studio = '27958137'; 
	getAPIData(studio);
});