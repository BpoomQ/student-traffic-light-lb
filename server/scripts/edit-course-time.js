/**
 * Update user's course time
 * @param {String} userId Student's identifier
 * @param {String} courseName Course name
 * @param {Number} userHours User Time Course
 * @param {Object} callback Loopback Student's model
 * @param {Function} callback Loopback callback function
 */
const editCourseTime = async (
  userId,
  courseName,
  userHours,
  studentModel,
  callback
) => {
  try {
    const user = await studentModel.findOne({ where: { id: userId } });
    if (!user) {
      const err = Error('No se encontró al usuario');
      err.name = 'Not Found';
      err.stack = undefined;
      err.statusCode = 404;
      return callback(err);
    }
    const lines = user.career.lines;
    let course;
    for (const line of lines) {
      const flaj = line.courses.find(course => course.name === courseName);
      if (flaj) {
        course = flaj;
        course.userHours = userHours;
        break;
      }
    }
    if (!course) {
      const err = Error('No se encontró el curso');
      err.name = 'Not Found';
      err.stack = undefined;
      err.statusCode = 404;
      return callback(err);
    }
    await user.updateAttribute('career', user.career);
    return callback(null, course);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { editCourseTime };
