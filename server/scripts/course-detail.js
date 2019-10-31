/**
 * Returns course's detail
 * @param {String} userId Student's identifier
 * @param {String} courseName Course name
 * @param {Object} callback Loopback Student's model
 * @param {Function} callback Loopback callback function
 */
const courseDetail = async (userId, courseName, studentModel, callback) => {
  const user = await studentModel.findOne({ where: { id: userId } });
  if (!user) {
    const err = Error('No se encontró al usuario');
    err.name = 'Not Found';
    err.stack = undefined;
    err.statusCode = 404;
    callback(err);
  }
  const lines = user.career.lines;
  let course;
  for (const line of lines) {
    const flaj = line.courses.find(course => course.name == courseName);
    if (flaj) {
      course = flaj;
      break;
    }
  }
  if (!course) {
    const err = Error('No se encontró el curso');
    err.name = 'Not Found';
    err.stack = undefined;
    err.statusCode = 404;
    callback(err);
  }
  callback(null, course);
};

module.exports = { courseDetail };
