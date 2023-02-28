
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  console.log(user);
  return jwt.sign({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin : user.isAdmin
  },
  process.env.JWT_SECRET,
  {
      expiresIn : '30d'
  }
  )
}
module.exports = {generateToken}