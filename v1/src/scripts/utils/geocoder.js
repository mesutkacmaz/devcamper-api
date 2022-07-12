const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'ZaSJa8FMkHW05Dx7FQB9POPbeCQwwVAB',
  formatter: null,
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
