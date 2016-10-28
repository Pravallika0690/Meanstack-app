/**
 * http://usejsdoc.org/
 */

var mongoose= require("mongoose");
var bodyparser=require('body-parser');
var bcrypt = require('bcrypt-node');
var express = require('express');
var SendGrid = require('sendgrid').SendGrid;
var app= express();

mongoose.connect('mongodb://localhost:27017/mymeanstack');
app.use(bodyparser.json());

var user_schema= mongoose.Schema({
	"firstname": String,
	"lastname": String,
	"address": String,
	"state": String,
	"city": String,
	"zip": Number,
	"phonenum": Number,
	"username": String
});

var login_schema = mongoose.Schema({
	
	'emailid':String,
	'username':String,
	'password': String
});

var login_model= mongoose.model("logind", login_schema);
var user_model= mongoose.model("details", user_schema)
app.get('/', function(req, res) {
	res.sendFile(__dirname+"/login.html");
	
})

var db = mongoose.connection;
db.on('error',function(){
	console.log("db connection failure")
});
app.use(express.static('assets'));
app.post('/save_details', function(req, res) {
	console.log("post is working in express!");
	var firstname=req.body.firstname;
	var lastname= req.body.lastname;
	var address= req.body.address;
	var state= req.body.state;
	var city= req.body.city;
	var zip= req.body.zip;
	var phonenum= req.body.phonenum;
	var username=req.body.username;
	
	
	var  user_document = new user_model({
		"firstname":firstname,
		"lastname": lastname,
		"address": address,
		"state":state,
		"city":city,
		"zip":zip,
		"phonenum":phonenum,
		"username": username
});
	user_document.save(function(err, save_resp) {
	if(err) {
		res.send({'flag':'err'});
	}	else {
		res.send({'flag':'success'});
	}
	});
})

app.get('/sendmail',function(req,res){
	
	var sendgrid = new SendGrid(user, key);
	sendgrid.send({
	  to: 'example@example.com',
	  from: 'other@example.com',
	  subject: 'Hello World',
	  text: 'My first email through SendGrid'
	});
	
});
app.post('/login_details',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var emailid = req.body.emailid;
	var password_hashed = bcrypt.hashSync(password);
	console.log(password_hashed);
	var login_document = new login_model({
		'emailid':emailid,
		'username' : username ,
		'password' : password_hashed
		
	});
	login_document.save(function(err ,save_resp) {
		if(err) {
			res.send({'flag':'err'});
		} else {
			res.send({'flag':'success'});
			db.collection('details').aggregate([{
			    '$lookup': {
			            from: "loginds",
			            localField: "username",
			            foreignField: "username",
			            as: "logindetails"
			        }
			       
			}, { '$out' : "details" }] , function(err, res) {
			    console.log(res.logindetails);
			   
			});
		}
	});
	
});
app.get("/get_details/:id", function(req, res) {
	console.log("entered get details express");
	user_model.findOne({"username": (req.params.id)},function(err, data) {
		res.send(JSON.stringify(data));
	});
})

app.listen(8090, function() {
	console.log('app listening at 8090');
});

