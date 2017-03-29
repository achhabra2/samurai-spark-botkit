var rp = require('request-promise')
var Promise = require('promise')

var tempreq = rp.get('https://api.particle.io/v1/devices/1f0040000c47353136383631/temp', {
  'auth': {
    'bearer': '577e39e2db55d1b3ffa64410b21518007248ab02'
  }
  })
  .catch((error) => {
    console.error(error)
  })

var humidityreq = rp.get('https://api.particle.io/v1/devices/1f0040000c47353136383631/humidity', {
    'auth': {
      'bearer': '577e39e2db55d1b3ffa64410b21518007248ab02'
    }
  })
  .catch((error) => {
    console.error(error)
  })

Promise.all([tempreq, humidityreq]).then((responses) => {
  console.log('Completed HTTP Requests for Temp & Humidity')
  var temperature = JSON.parse(responses[0]).result
  var humidity = JSON.parse(responses[1]).result
  
})
