const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// ejs
//app.set('views',path.join(__dirname,'../client/dist'));
//app.set('view engine','ejs');


// bodyParser setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files setting
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/src/static')));

// routing path join
let routePath = path.join(__dirname, '../app/routes');
let files = fs.readdirSync(routePath);

// routing path mapping
files.map((file) => {
   require(`${routePath}/${file}`)(app);
});

// express error handling
app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(err.statusCode || 500).send({message: err.message});
});

// develop/production mode log
console.log("mode : " + app.get('env'));

// app export
module.exports = app;
