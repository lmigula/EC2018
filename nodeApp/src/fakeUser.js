// users.js
// Fake list of users to be used in the authentication
var users = [
  {
    id: 1,
    username: "Lars",
    email: "lmigula@accept-it.de",
    password: "password",
    admin: true
  },
  {
    id: 2,
    username: "Rudi",
    email: "rudi@entwicklercamp.de",
    password: "superS3cr3t",
    admin: false
  }
];

var validateUser = function (username, password) {
  for (let i in users) {
    let tmpUser = users[i];
    if (tmpUser.username === username && tmpUser.password === password) {
      return tmpUser;
    }
  }
  // logs "0", "1", "2", "foo"
};



module.exports = {
  validateUser: validateUser,
  users: users
};
