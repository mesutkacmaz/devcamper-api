const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1w',
  })
}

const generateRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
}
