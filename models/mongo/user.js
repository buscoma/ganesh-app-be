var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	date: Date,
	last_token: String
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model(
	"User",
	UserSchema,
	"user"
);

module.exports = User;
