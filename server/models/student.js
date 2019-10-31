const { signIn } = require('../scripts/sign-in');
const { findUsersCareer } = require('../scripts/users-career');

module.exports = Student => {
  Student.signIn = async (email, password, callback) =>
    await signIn(email, password, Student, callback);

  Student.findUsersCareer = async (userId, callback) => {
    await findUsersCareer(userId, Student, callback);
  };

  Student.remoteMethod('findUsersCareer', {
    description: `Return the student's career`,
    http: { path: '/:id/career', verb: 'get' },
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true,
        description: `Student's identifier`
      }
    ],
    returns: {
      arg: 'career',
      type: 'object',
      description: `Returns user's career`
    }
  });

  Student.remoteMethod('signIn', {
    description: 'Validate if the user is registered',
    http: { path: '/sign-in', verb: 'post' },
    accepts: [
      {
        arg: 'email',
        type: 'string',
        required: true,
        description: `Student's email`
      },
      {
        arg: 'password',
        type: 'string',
        required: true,
        description: `Student's email`
      }
    ],
    returns: { arg: 'user', type: 'object', description: `Registered student` }
  });
};
