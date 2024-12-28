const userRepository = require("../repositories/index");
const { hashedPassword } = require("../utils/index")

const signup = async (req, res)  =>{
    try{
    const { email, username, password, role, birth_date } = req.body;
    const userExists = await userRepository.findUser(email);
    if(userExists){
        return res.status(401).json({ error: "User already exists!" });
    }

    const encryptedPassword = hashedPassword(password);

    const data = {
        email,
        username,
        password : encryptedPassword,
        role,
        birth_date
    }

    const user = await userRepository.createUser(data);
    
    if (user) {
        return res.status(200).json({ message: "Successfully created user" })
      }
    } catch (error) {
      return res.status(400).json(error)
    }
}

module.exports = {
    signup,
}