<!-- script.js --------------------------------------------------------------->
/*******************************************/
//constants
const apiKey = "";
      
//global memory
var data;
var geolocation;
      
//wait for HTML to completely load into memory, then run the init() function
document.addEventListener("DOMContentLoaded", init);
      
function init(){
	//will only run when DOM (HTML) has loaded
	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(gotGeolocation);
  	getData();
  	assignListeners();
}

function gotGeolocation(position){
	geolocation = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};
}
      
function getData(){
  	//let data = {body: `$$app_token=${apiKey}`};
	//fetch("https://data.princegeorgescountymd.gov/resource/gwq4-iu9d.json", data) //get json from the url
  	fetch("https://data.princegeorgescountymd.gov/resource/gwq4-iu9d.json")
  		.then(res => res.json()) //extract the json data from the response
  		.then(json => {data = json;}); //save json data for later use
}
      
function assignListeners(){
	document.querySelector("button").addEventListener("click", search);
}
      
function search(){
	let searchTerm = document.querySelector("input").value.toLowerCase();
	console.log(data);
  	let list = data.filter(location => {
    	return location.name.toLowerCase().includes(searchTerm) || location.address.human_address.toLowerCase().includes(searchTerm);
    });
  	showData(list);
}
      
function showData(list){
  	if (!list) list = data;
	if (geolocation){
		for (let location of list){
			location.distance = distance(location.address.latitude, location.address.longitude, geolocation.lat, geolocation.lng);
		}
	}
 //  	let html = "<ul>";
 //  	if (!list.length) html += "<li>Nothing found.</li>";
	// for (let location of list){
 //    	html += `
	// 		<li>
 //      			<h3>${location.name}</h3>
	// 			<address>${location.address.human_address}</address>
 //        `;
 //        if (location.distance) html += `<p>Distance from you: ${location.distance} miles</p>`;
	// 	html += "</li>";
	// }
	// html += "</ul>";
	let html = "<table>";
	html += "<tr><th>Name</th><th>Address</th><th>City</th><th>State</th><th>Distance from you (miles)</th></tr>"

	if (!list.length) html += "<tr><td>Nothing found.</td></tr>";
	for (let location of list){ 
		var obj = JSON.parse(location.address.human_address);
		html += "<tr>";
		html += `<td>${location.name}</td>
		<td>${obj.address}</td>
		<td>${obj.city}</td>
		<td>${obj.state}</td>`
		if (location.distance)
			html += `<td>${location.distance}</td>`;
		html += "</tr>"
	}

	html += "</table>";
	document.getElementById("output").innerHTML = html;
}

function distance(lat1, lon1, lat2, lon2, unit) {
//from https://www.geodatasource.com/developers/javascript
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
/*******************************************/
