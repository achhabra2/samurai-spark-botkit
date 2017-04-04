var request = require('request')
var rp = require('request-promise')
var Promise = require('promise')
var apiai = require('botkit-middleware-apiai')({
    token: process.env.apiai_token,
    skip_bot: true // or false. If true, the middleware don't send the bot reply/says to api.ai
});

module.exports = function(controller) {
  // apiai.hears for intents. in this example is 'hello' the intent
  controller.hears(['climate'],'direct_message',apiai.hears,function(bot, message) {
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

      bot.reply(message,'The climate at home is ' + temperature + ' *C' + ' & ' + humidity + ' %');

    }).catch((error) =>{
      console.error(error)
      bot.reply(message,'Sorry there was an error fetching your home climate. ');
    })
  });

  // apiai.action for actions. in this example is 'user.setName' the action
  controller.hears(['get-climate'],'direct_message',apiai.action,function(bot, message) {
      bot.reply(message,'Processed through apiai action get-climate.');
  });
}
