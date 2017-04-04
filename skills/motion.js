var request = require('request')
var rp = require('request-promise')
var Promise = require('promise')
var apiai = require('botkit-middleware-apiai')({
    token: process.env.apiai_token,
    skip_bot: true // or false. If true, the middleware don't send the bot reply/says to api.ai
});

module.exports = function(controller) {
  // apiai.hears for intents. in this example is 'hello' the intent
  controller.hears(['motion'],'direct_message',apiai.hears,function(bot, message) {
    var motionreq = rp.get('https://api.particle.io/v1/devices/33005f001851353338363036/lastTime', {
      'auth': {
        'bearer': '577e39e2db55d1b3ffa64410b21518007248ab02'
      }
    }).then((response) => {
      var motions = JSON.parse(response).result
      bot.reply(message,'Time since last detection ' + motions);
    })
      .catch((error) => {
        console.error(error)
        bot.reply(message,'Sorry there was an error fetching your motion detections. ');
      })
  });

  // apiai.action for actions. in this example is 'user.setName' the action
  controller.hears(['get-motion'],'direct_message',apiai.action,function(bot, message) {
      bot.reply(message,'Processed through apiai action get-climate.');
  });
}
