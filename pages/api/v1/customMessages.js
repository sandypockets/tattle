import axios from 'axios'

export function getCustomMessages(id, setSmsMessageText, setVoiceMessageText){
  axios.get('/api/v1/custom-messages', {
    params: { id: id }
  })
    .then(function (response) {
      console.log("Get custom messages: ", response.data)
      setSmsMessageText(response.data[0].custom_sms_message)
      setVoiceMessageText(response.data[0].custom_voice_message)
    })
    .catch(function (error) {
      console.error("Error!", error)
    })
}

export function updateCustomMessages(id, smsMessageText, voiceMessageText){
  axios
    .post('/api/v1/custom-messages', {
      "type": "update",
      id,
      smsMessageText,
      voiceMessageText
    })
    .then(function (response) {
      console.log("Create custom messages", response);
    })
    .catch(function (error) {
      console.log(error);
    });
}