import { supabase } from "../../../lib/supabaseClient";

const accountSid = process.env.NEXT_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_TWILIO_AUTH_TOKEN;
const toPhoneNumber = process.env.NEXT_TEST_TO_PHONE_NUMBER;
const fromPhoneNumber = process.env.NEXT_TEST_FROM_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

function sendSmsMessage(contactName, goalTitle, ownerName) {
  client.messages
    .create({
      body: `Hey ${contactName}! ${ownerName} didn't achieve their goal: ${goalTitle}`,
      from: fromPhoneNumber,
      to: toPhoneNumber
    })
    .then(message => console.log(message.sid))
    .catch((err) => console.error(err));
}

export async function getContactData(contactId, goalId, goalTitle, ownerName){
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
        "owner_name": ownerName
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
      .select('due_date, id, contact_id, title, owner_name')
      .eq('due_date', todayDate)
    if (data) {
      let dataArr = []
      for (const item in data) {
        const contactData = await getContactData(data[item]['contact_id'], data[item]['id'], data[item]['title'], data[item]['owner_name'])
        dataArr.push(contactData)
      }
      console.log("dataArr: ", dataArr)
      for (const item in dataArr) {
        sendSmsMessage(dataArr[item]['contact_name'], dataArr[item]['goal_title'], dataArr[item]['owner_name'])
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