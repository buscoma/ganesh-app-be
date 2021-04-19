const request = require('request');
const csv = require('csvtojson')
var PluralsightController = require("../services/source/pluralsight");

exports.runCron = function () {
  request('http://api.pluralsight.com/api-v0.9/courses', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    csv()
      .fromString(body)
      .then((jsonObj) => {
        jsonObj.forEach((course) => {
          course.id = course.CourseId;
          course.title = course.CourseTitle;
          course.duration = course.DurationInSeconds;
          course.releaseDate = course.ReleaseDate;
          course.description = course.Description;
          course.assessmentStatus = course.AssessmentStatus;
          course.isCourseRetired = course.IsCourseRetired == 'yes';
          course.url = "https://www.pluralsight.com/courses/" + course.CourseId;
          course.image = "https://pluralsight.imgix.net/course-images/" + course.CourseId + "-v1.jpg"
          delete course.CourseId
          delete course.CourseTitle
          delete course.DurationInSeconds
          delete course.ReleaseDate
          delete course.Description
          delete course.AssessmentStatus
          delete course.IsCourseRetired
          PluralsightController.updateCourses([course])
        })
      })
  });
};