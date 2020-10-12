const debug = require('debug')(`linto:skill:v2:linto-skill:browser-control:events:picture`)
const intent = 'browser_control_read'

module.exports = function (msg) {
  let tts = this.skillConfig[this.skillConfig.language] // data/tts.json loaded in this.skillConfig

  if (msg.payload.nlu.entitiesNumber !== 1) return { say: tts.say.error_entities_number }

  let action
  for (let payloadEntity of msg.payload.nlu.entities) {
    if (payloadEntity.entity === 'zoom_in') action = 'zoom_in'
    else if (payloadEntity.entity === 'zoom_out') action = 'zoom_out'
  }

  return {
    customAction: {
      kind: 'picture_' + action
    },
    say: {
      phonetic: intent + '_' + action,
      text: intent + '_' + action
    }
  }
}