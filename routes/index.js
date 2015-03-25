var router = require('express').Router();
var Place = require('../models/').Place;
var Hotel = require('../models/').Hotel;
var ThingToDo=require("../models/").ThingToDo;
var Restaurant=require("../models/").Restaurant;



router.get('/', function(req, res){
	Hotel.find({}, function(err, hotels) {
    	Restaurant.find({}, function(err, restaurants) {
        	ThingToDo.find({}, function(err, thingsToDo) {
            	res.render('index', {
                	all_hotels: hotels,
                	all_restaurants: restaurants,
                	all_things_to_do: thingsToDo
            	});
	        });
	    });
	});
});

module.exports = router;