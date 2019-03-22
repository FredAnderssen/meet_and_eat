const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'something_else';

module.exports = ({}) => {
  return {
    hashPassword: function(pass, callback) {
      bcrypt.hash(pass, saltRounds, function(err, hashedPassword) {
        callback(err, hashedPassword)
      })
    },

    comparePwWithHash: (pw, hash, callback) => {
      bcrypt.compare(pw, hash, function(err, res) {
        callback(err, res)
      }
    )}
  }

}
