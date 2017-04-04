var rp = require('request-promise')
var Promise = require('promise')

var motionreq = rp.get('https://api.particle.io/v1/devices/33005f001851353338363036/lastTime', {
  'auth': {
    'bearer': '577e39e2db55d1b3ffa64410b21518007248ab02'
  }
}).then((response) => {
  var motions = JSON.parse(response)
  console.log(motions)
})
