/*

Botkit Studio Skill module to enhance the "particle" script

*/

var request = require('request')
var rp = require('request-promise')
var Promise = require('promise')

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    controller.studio.before('particle', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

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
          convo.setVar('temp', temperature); // available in message text as {{vars.date}}
          convo.setVar('humidity', humidity); // ailable as {{vars.news}}

          console.log('BEFORE: particle');
          // don't forget to call next, or your conversation will never continue.
          next()
        }).catch((error) =>{
          console.error(error)
          next()
        })


    });

    /* Validators */

    // Validate user input: question_1
    controller.studio.validate('particle','question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: particle VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('particle','question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: particle VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('particle','question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: particle VARIABLE: question_3');

        // always call next!
        next();

    });

    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    controller.studio.after('particle', function(convo, next) {

        console.log('AFTER: particle');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
