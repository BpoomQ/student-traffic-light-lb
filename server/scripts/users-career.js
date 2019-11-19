/**
 * Returns user's career
 * @param {String} userId user's _id
 * @param {Object} studentModel Student loopback model
 * @param {Function} callback loopback callback
 */
const findUsersCareer = async (userId, studentModel, callback) => {
  const user = await studentModel.findOne({ where: { _id: userId } });
  if (!user) {
    const error = Error('No se encontró al usuario');
    error.name = 'Not Found';
    error.stack = undefined;
    error.statusCode = 404;
    callback(error);
  }
  const userCareer = user.career;
  const career = {
    name: userCareer.name,
    currentAverage: userCareer.currentAverage,
    lines: userCareer.lines.map(line => ({
      name: line.name,
      color: line.color,
      courses: line.courses.map(course => ({
        name: course.name,
        semester: course.semester,
        status: !!course.score.find(score => score.status == 'Vista')
      }))
    }))
  };
  callback(null, career);
};

module.exports = { findUsersCareer };
