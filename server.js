// Requires
const express 	= require("express");
const app 		= express();
const http		= require("http").Server(app);
const port 		= 1337 || process.env.PORT;

// expose jspm stuff
app.use("/jspm_packages", express.static(__dirname + "/jspm_packages"));
app.use("/config.js", express.static(__dirname + "/config.js"));

// expose my front end stuff
app.use(express.static(__dirname + "/client"));


http.listen(port, () => {

	console.log("feed me " + port + " braaaaaaainnnsss");

});