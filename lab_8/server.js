//server.js
const express = require('express');
const app = express();
const path = require('path');

// Code here for how to set 'public' as the static folder for express
app.use(express.static(path.join(__dirname, 'public')));

// Code here to have the app listen on port 8080....please provide a console.log message
app.listen(8080, function(err){
	if (err) console.error(err);
	console.log("Node server listening on port 8080");
});
