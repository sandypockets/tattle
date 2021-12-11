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

async function saveTattle(ownerId, goalId, contactId, messageBody) {
  try {
    const { data, error } = await supabase
      .from('tattles')
      .insert([
        { owner_id: ownerId, goal_id: goalId, contact_id: contactId, message_body: messageBody }
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

async function sendSmsMessage(contactName, goalTitle, ownerName, ownerId, goalId, contactId) {
  const customMessages = await getCustomMessages(ownerId)
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
  client.messages
    .create({
      body: parsedSms,
      from: fromPhoneNumber,
      to: toPhoneNumber
    })
    .then(message => {
      console.log(message.sid)
      console.log(ownerId)
      return saveTattle(ownerId, goalId, contactId, smsBody)
    })
    .catch((err) => console.error(err));
}

export async function getContactData(contactId, goalId, goalTitle, ownerName, ownerId){
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .select('name, phone, id')
      .eq('id', contactId)
    if (data) {
      return {
        "phone": data[0].phone,
        "contact_id": data[0]['id'],
        "contact_name": data[0]['name'],
        "goal_id": goalId,
        "goal_title": goalTitle,
        "owner_name": ownerName,
        "owner_id": ownerId
      }
    }
    if (error) {
      console.error("contact Error: ", error)
    }
  } catch (err) {
    console.error(err)
  }
}

async function cronCheck(req, res) {
  const todayDate = new Date().toLocaleDateString('en-CA').toString()
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select('due_date, id, contact_id, title, owner_name, owner_id')
      .eq('due_date', todayDate)
    if (data) {
      let dataArr = []
      for (const item in data) {
        const contactData = await getContactData(data[item]['contact_id'], data[item]['id'], data[item]['title'], data[item]['owner_name'], data[item]['owner_id'])
        dataArr.push(contactData)
      }
      console.log("dataArr: ", dataArr)
      for (const item in dataArr) {
        sendSmsMessage(dataArr[item]['contact_name'], dataArr[item]['goal_title'], dataArr[item]['owner_name'], dataArr[item]['owner_id'], dataArr[item]['goal_id'], dataArr[item]['contact_id'])
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