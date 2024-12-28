const bcrypt = require("bcrypt");

const hashedPassword = (password) =>{
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword;
}

module.exports={
    hashedPassword,
}