/**
 * Search user by email and password
 * @param {String} email student's email
 * @param {String} password student's password
 * @param {Model} studentModel student loopback model
 * @param {Function} callback Callback (error, student)
 */
const signIn = async (email, password, studentModel, callback) => {
  const user = await studentModel.findOne({
    where: {
      email,
      password
    }
  });
  if (!user) {
    const err = Error('No se encontró al usuario');
    err.name = 'Not Found';
    err.stack = undefined;
    err.statusCode = 404;
    callback(err);
  }
  const student = {
    id: user.id,
    displayName: `${user.firstName} ${user.lastName}`,
    code: user.code,
    semester: user.semester,
    email: user.semester,
    career: user.career.name
  };
  callback(null, student);
};

module.exports = { signIn };
