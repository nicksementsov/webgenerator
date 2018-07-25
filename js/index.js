var express = require("express");
var bodyPar = require("body-parser");
var mongoose = require("mongoose");

// Start express
var app = express();
app.use(bodyPar.urlencoded({extended: true}));
app.use(express.static("img"));

// Database setup
mongoose.connect("mongodb://localhost/generatordb");

var postSchema = new mongoose.Schema({
	author: String,
	date: String,
	postContent: String
});

var Post = mongoose.model("Post", postSchema);

// Views
app.get("/", function(req, res) {
	res.render("/index.ejs");
});

app.post("/newgeneration", function(req, res) {
	var postDate = Date();
	var newPost = new Post({
		author: req.body.author,
		date: postDate,
		postContent: req.body.inputText
	});

	newPost.save(function(err, post) {
		if (err) {
			console.log("There was an error");
			console.log(err);
			res.redirect("/");
		} else {
			res.redirect("/archive/" + post._id);
		}
	});
});

app.get("/archive", function(req, res) {
	Post.find({}).sort('-date').exec(function(err, posts) {
		if (err) {
			console.log("ERROR!");
			console.log(err);
			res.redirect("/");
		} else {
			res.render("archive.ejs", {posts: posts});
		}
	});
});

app.get("/archive/:postid", function(req, res) {
	Post.findById(req.params.postid, function(err, post) {
		if (err) {
			console.log("ERROR!");
			console.log(err);
			res.redirect("/");
		} else {
			if (post) {
				res.render("viewpost.ejs", {post: post});
			}
			
		}
	});
});


// Start Server
app.listen(3000, function() {
	console.log("Server has started");
});


//Nick Sementsov