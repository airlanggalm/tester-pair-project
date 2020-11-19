const bcrypt = require('bcryptjs')

function hashPw(pw){
    const salt = bcrypt.genSaltSync(11)
    const hash = bcrypt.hashSync(pw, salt)
    return hash
}

function comparePw(pw, hashPw){
    return bcrypt.compareSync(pw, hashPw)
}

module.exports = { hashPw, comparePw }