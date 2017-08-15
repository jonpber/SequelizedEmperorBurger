var express = require("express");
var app = express();
var path = require("path");
var body = require("body-parser")
var db = require("../models");

var router = express.Router();

router.get("/", function(req, res){
	db.Burger.findAll({ include: [db.Customer],
		order: [
    	['burger_name', 'ASC']
    	]
}).then(function(result){
		var burgers = result;
		for (var burger in burgers){
			burgers[burger].idMod = burgers[burger].id % 4;
		}
		res.render("index", {burger: burgers});
	});
})

router.post("/api/burgers", function(req, res){
	db.Customer.findAll({where: {
		name: req.body.chef_name
	}}).then(function(result){
		if (result.length === 0){
			db.Customer.create({
				name: req.body.chef_name
			}).then(function(result){
				db.Burger.create({
					burger_name: req.body.burger_name,
					CustomerId: result.id
				}).then(function(result){
					res.redirect("/");
				});
			})
		}

		else {
			db.Burger.create({
					burger_name: req.body.burger_name,
					CustomerId: result[0].id
				}).then(function(result){
					res.redirect("/");
				});
		}
	})
	
});

router.put("/api/burgers/:id?", function(req, res){
	db.Burger.update({
		devoured: true
	}, {where: {
		id: req.params.id
	}}).then(function(result){
		res.redirect("/");
	});
});

module.exports = router;