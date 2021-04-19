var PluralsightController = require("../../services/source/pluralsight");

exports.getCourse = async function (req, res, _) {
	var id = req.params.id;
	try {
		var course = await PluralsightController.getCourse(id);
		if (course.length != 0){
			return res.json(course);
		} else {
			return res.status(404).json({ message: "Not found"});
		}
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.getAllCourses = async function (req, res, _) {
	var limit = parseInt(req.query.limit ? req.query.limit : 100);
	var offset = parseInt(req.query.offset ? req.query.offset : 0);
	try {
		var info = await PluralsightController.getCourses(limit, offset);
		return res.json({
			courses: info.data,
			fetched: info.data.length,
			total: info.total
		});
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.updateCourses = async function (req, res, _) {
	var courses_to_update = req.body ? req.body : [];
	try {
		await PluralsightController.updateCourses(courses_to_update);
		return res.json({ message: "Success" });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.deleteCourse = async function (req, res, _) {
	var id = req.params.id;
	try {
		await PluralsightController.deleteCourse(id);
		return res.json({ message: "Success" });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};
