import { supabase } from "../../../lib/supabaseClient";

const accountSid = process.env.NEXT_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_TWILIO_AUTH_TOKEN;
const toPhoneNumber = process.env.NEXT_TEST_TO_PHONE_NUMBER;
const fromPhoneNumber = process.env.NEXT_TEST_FROM_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

async function getCustomMessages(ownerId) {
  try {
    const { data, error } = await supabase
      .from('custom_messages')
      .select('custom_sms_message, custom_voice_message')
      .match({ owner_id: ownerId })
    data && console.log("Custom Messages Data: ", data)
    return data
  } catch (err) {
    console.error(err)
  }
}

async function saveTattle(ownerId, goalId, contactId, messageBody, messageType) {
  try {
    const { data, error } = await supabase
      .from('tattles')
      .insert([
        { owner_id: ownerId, goal_id: goalId, contact_id: contactId, message_body: messageBody, message_type: messageType }
      ])
    if (data) {
      console.log("SaveTattle: ", data)
    }
    error && console.error(error)
  } catch (err) {
    console.error(err)
  }
}

function parseVariables(customMessageText, contactName, userName, goalTitle) {
  const varContactName = "{{ contact_name }}"
  const varUserName = "{{ user_name }}"
  const varGoalTitle = "{{ goal_title }}"
  return customMessageText.replace(varContactName, contactName).replace(varUserName, userName).replace(varGoalTitle, goalTitle)
}

async function sendSmsMessage(contactName, goalTitle, ownerName, ownerId, goalId, contactId, contactPhone, notificationType) {
  function convertToUsableNumber(phoneNumber) {
    let hasHyphens = true
    while (hasHyphens) {
      if (phoneNumber.search('-') === -1) {
        console.log("Phone number is ready")
        hasHyphens = false
        return `+1${phoneNumber}`
      } else {
        console.log('Removing characters...')
        phoneNumber = phoneNumber.replace('-', '')
      }
    }
  }

  const customMessages = await getCustomMessages(ownerId)
  const formattedPhoneNumber = convertToUsableNumber(contactPhone)
  let parsedSms;
  let parsedVoice;
  if (customMessages?.length > 0) {
    const customSms = customMessages[0].custom_sms_message
    const customVoice = customMessages[0].custom_voice_message
    parsedSms = parseVariables(customSms, contactName, ownerName, goalTitle)
    parsedVoice = parseVariables(customVoice, contactName, ownerName, goalTitle)
    console.log("customSms", parsedSms)
    console.log("customVoice", parsedVoice)
  } else {
    parsedSms = `Hey ${contactName}! ${ownerName} didn't achieve their goal: ${goalTitle}`;
    parsedVoice = `Hey ${contactName}! ${ownerName} didn't achieve their goal: ${goalTitle}`;
  }

  if (notificationType === 'voice') {
    // Send voice message
    client.calls
      .create({
        twiml: `<Response><Say>${parsedVoice}</Say></Response>`,
        to: formattedPhoneNumber,
        from: fromPhoneNumber
      })
      .then(call => {
        console.log(call.sid)
        console.log(ownerId)
        return saveTattle(ownerId, goalId, contactId, parsedVoice, 'voice')
      })
      .catch((err) => console.error(err));
  } else {
    // Send sms
    client.messages
      .create({
        body: parsedSms,
        from: fromPhoneNumber,
        to: formattedPhoneNumber
      })
      .then(message => {
        console.log(message.sid)
        console.log(ownerId)
        return saveTattle(ownerId, goalId, contactId, parsedSms, 'sms')
      })
      .catch((err) => console.error(err));
  }
}

export async function getContactData(contactId, goalId, goalTitle, ownerName, ownerId, notificationType){
  let outputData = {}
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('name, phone, id')
      .eq('id', contactId)
    if (data) {
      outputData = {
        "phone": data[0].phone,
        "contact_id": data[0]['id'],
        "contact_name": data[0]['name'],
        "goal_id": goalId,
        "goal_title": goalTitle,
        "owner_name": ownerName,
        "owner_id": ownerId,
        "notification_type": notificationType
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', ownerId)
        if (data) {
          console.log("Data! ", data[0])
          outputData = {
            ...outputData,
            "owner_name": data[0]['username']
          }
          console.log("outputData! ", outputData)
          return outputData;
        }
        if (error) console.error(error)
      } catch (err) {
        console.error(err)
      }
    }
    if (error) {
      console.error("contact Error: ", error)
    }
  } catch (err) {
    console.error(err)
  } finally {

  }
}

async function cronCheck(req, res) {
  const todayDate = new Date().toLocaleDateString('en-CA').toString()
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select('due_date, id, contact_id, title, owner_name, owner_id, notification_type')
      .eq('due_date', todayDate)
    if (data) {
      let dataArr = []
      for (const item in data) {
        const contactData = await getContactData(
          data[item]['contact_id'],
          data[item]['id'],
          data[item]['title'],
          data[item]['owner_name'],
          data[item]['owner_id'],
          data[item]['notification_type'])
        dataArr.push(contactData)
      }
      console.log("dataArr: ", dataArr)
      for (const item in dataArr) {
        sendSmsMessage(
          dataArr[item]['contact_name'],
          dataArr[item]['goal_title'],
          dataArr[item]['owner_name'],
          dataArr[item]['owner_id'],
          dataArr[item]['goal_id'],
          dataArr[item]['contact_id'],
          dataArr[item]['phone'],
          dataArr[item]['notification_type'])
      }
    }
    if (error) {
      console.error(error)
    }
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("CRON FIRED!")
    // res.status(200).json('Cron job fired!')
    return cronCheck(req, res)

  } else if (req.method === 'GET') {
    //
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}