var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var healtCheck = require("./routes/healthCheck");
var apiRouter = require("./routes/api");
var bluebird = require("bluebird");
const dotenv = require("dotenv");


// APP configurations
dotenv.config();
var app = express();
app.use(express.static('public'));
let cors = require("cors");
app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cookieParser());

// Endpoint registration
app.use("/api", apiRouter);
app.use(healtCheck);

app.get("/", function (_, res, _) {
	const listEndpoints = require('express-list-endpoints')
	var endpoints = listEndpoints(app)
	endpoints.forEach(function(v){ delete v.middleware });
	return res.json(endpoints)
});

// Database connection
mongoose.Promise = bluebird;
let url = process.env.DATABASE;
let opts = {
	useNewUrlParser: true,
	connectTimeoutMS: 20000,
	useUnifiedTopology: true,
};
mongoose
	.connect(url, opts)
	.then(() => {
		console.log(`Succesfully Connected to Mongo Database..`);
	})
	.catch((e) => {
		console.log(`Error Connecting to Mongo Database...`),
			console.log(e);
	});


// App port
var port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("Server started on port: ", port);
});



// Croned modules

// const cron = require('node-cron');
// var Pluralsight = require('./cronjobs/pluralsight')
// cron.schedule('0 0 * * *', Pluralsight.runCron);


module.exports = app;
