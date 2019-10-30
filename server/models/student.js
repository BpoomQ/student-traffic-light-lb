const { signIn } = require('../scripts/sign-in.js');

module.exports = Student => {
  Student.signIn = async (email, password, callback) =>
    await signIn(email, password, Student, callback);

  Student.remoteMethod('signIn', {
    description: 'validate if the user is registered',
    http: { path: '/sign-in', verb: 'post' },
    accepts: [
      { arg: 'email', type: 'string', description: `student's email` },
      { arg: 'password', type: 'string', description: `student's email` }
    ],
    returns: { arg: 'user', type: 'object', description: `registered student` }
  });
};
