let Pluralsight = require("../../models/mongo/source/pluralsight");

exports.getCourse = async function (id) {
	var query = {
		id: id,
	};
	try {
		return await Pluralsight.find(query, {_id: 0, __v: 0});
	} catch (e) {
		console.log(e)
		throw Error("Error trying to find course");
	}
};

exports.getCourses = async function (limit, offset) {
	try {
		var data =  await Pluralsight.find({}, {_id: 0, __v: 0}).skip(offset).limit(limit)
		var total = await Pluralsight.countDocuments();
		return {data: data, total: total};
	} catch (e) {
		console.log(e)
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

exports.deleteCourse = async function (id) {
	try {
		await Pluralsight.deleteOne({id: id});
	} catch (e) {
		console.log(e)
		throw Error("Error trying to update a course");
	}
};