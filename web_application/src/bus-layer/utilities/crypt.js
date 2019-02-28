const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'something_else';

exports.hashPassword = function(pass, callback) {
  bcrypt.hash(pass, saltRounds, function(err, hashedPassword) {
    callback(err, hashedPassword)
  })
}
