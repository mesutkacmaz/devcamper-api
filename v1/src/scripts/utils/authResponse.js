const { generateAccessToken, generateRefreshToken } = require('./jwt')

const sendTokenResponse = (user, statusCode, res) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  res
    .status(statusCode)
    .json({ success: true, tokens: { accessToken, refreshToken } })
}

module.exports = sendTokenResponse
