const jwt = require('jsonwebtoken')

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1w',
  })

  return res
    .status(statusCode)
    .json({ success: true, data: { ...user.toObject(), token } })
}

module.exports = sendTokenResponse
