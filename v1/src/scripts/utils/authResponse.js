const { generateAccessToken, generateRefreshToken } = require('./jwt')

const sendTokenResponse = (user, statusCode, res) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.security = true
  }

  res
    .status(statusCode)
    .json({ success: true, tokens: { accessToken, refreshToken } })
}

module.exports = sendTokenResponse
