let Pluralsight = require("../../models/mongo/source/pluralsight");

exports.getCourse = async function (id) {
	var query = {
		id: id,
	};
	try {
		return await Pluralsight.find(query);
	} catch (e) {
		throw Error("Error trying to find course");
	}
};

exports.getCourses = async function () {
	try {
		return await Pluralsight.find({}, {_id: 0});
	} catch (e) {
		throw Error("Error trying to find course");
	}
};

exports.updateCourses = async function (courses_to_update) {
	try {
		for(var course of courses_to_update){
			await Pluralsight.updateOne({id: course.id}, {$set: course}, {upsert: true})
		}
	} catch (e) {
		console.log(e)
		throw Error("Error trying to update a course");
	}
};