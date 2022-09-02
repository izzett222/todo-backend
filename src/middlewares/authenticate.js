const { getUserByName } = require("../services/user")
const { verify } = require("../utils/jwt")
const isUserSignedUp = async (req, res, next) => {
    try {
       const token = req.headers.authorization.slice(7)
       console.log(token)
       const userData = verify(token)
       console.log(userData);
       const user = await getUserByName(userData.username)
       console.log(user);
       if(!user) {
        return res.status(409).json({ message: "you are not allowed to perform this action"})
       }
       req.user = user
       next()
    } catch(error) {
        console.log(error)
        return res.status(409).json({ message: "you are not allowed to perform this action"})
    }
    
}

module.exports = { isUserSignedUp }