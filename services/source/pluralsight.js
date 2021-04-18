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

exports.getAllCourses = async function () {
	try {
		return await Pluralsight.find({});
	} catch (e) {
		throw Error("Error trying to find course");
	}
};

exports.updateCourses = async function (courses_to_update) {
	try {
		for(var course of courses_to_update){
			await Pluralsight.updateOne({id: course.id}, {$set: course})
		}
	} catch (e) {
		console.log(e)
		throw Error("Error trying to update a course");
	}
};