const hash = require('./../utils/pwdEncryption')

let pwd = 'root1212'

let sPwd = hash.encrypt(pwd)

console.log(sPwd)