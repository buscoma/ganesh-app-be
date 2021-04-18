var mongoose = require("mongoose");

var PluralsightSchema = new mongoose.Schema({
	id: {
		type: String,
		required: [true, 'Course must have an id'],
		unique: true
	},
	titulo: {
		type: String,
		required: [true, 'Course must have a title']
	},
	duration: {
		type: Number,
		required: [true, 'Course must have a duration']
	},
	releaseDate: {
		type: Date,
		required: [true, 'Course must have releaseDate']
	},
	description: {
		type: String,
		required: [true, 'Course must have a description']
	},
	assessmentStatus: {
		type: String,
		default: null
	},
	isCourseRetired: {
		type: Boolean,
		required: [true, 'Course must indicate if is retired or not']
	},
});

const Pluralsight = mongoose.model(
	"Pluralsight",
	PluralsightSchema,
	"pluralsight"
);

module.exports = Pluralsight;
