var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/trip_planner');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


var placeSchema = new mongoose.Schema({
  address:    String,
  city: String,
  state: String,
  phone:     String,
  location:  [Number]
});

var hotelSchema = new mongoose.Schema({
  name:    String,
  // normally use this but for the perpose of this workshop we use simpified version
  //place: [{ type: Schema.Types.ObjectId, ref: 'Place'}],
  place: [placeSchema],
  num_stars: Number,
  amenities:  String
});

var thingToDoSchema = new mongoose.Schema({
  name:    String,
  place: [placeSchema],
  age_range: String
});

var restaurantSchema = new mongoose.Schema({
  name:    String,
  place: [placeSchema],
  cuisine: String,
  price:  Number
});



var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  ThingToDo: ThingToDo,
  Restaurant: Restaurant
};

