const bcrypt = require('bcrypt');
const saltRounds = 12;

function passwordHash(password) {
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = { passwordHash }
