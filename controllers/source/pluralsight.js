var PluralsightController = require("../../services/source/pluralsight");

exports.getCourse = async function (req, res, _) {
	var id = req.params.id;
	try {
		var course = await PluralsightController.getCourse(id);
		return res.json(course);
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.getAllCourses = async function (req, res, _) {
	try {
		var lista_cursos = await PluralsightController.getCourses();
		return res.json({
			cursos: lista_cursos,
			total: length(courses)
		});
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.updateCourses = async function (req, res, _) {
	var courses_to_update = req.body.nivel ? req.query.nivel : [];
	try {
		await PluralsightController.updateCourses(courses_to_update);
		return res.json({ message: "Success" });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};
