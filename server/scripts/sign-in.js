/**
 * Search user by email and password
 * @param {String} email student's email
 * @param {String} password student's password
 * @param {Model} studentModel student loopback model
 * @param {Function} callback Callback (error, student)
 */
const signIn = async (email, password, studentModel, callback) => {
  const student = await studentModel.findOne({
    where: {
      email,
      password
    }
  });
  if (!student) {
    const err = Error('No se encontró al usuario');
    err.name = 'Not Found';
    err.stack = undefined;
    err.statusCode = 404;
    callback(err);
  }
  callback(null, student);
};

module.exports = { signIn };
