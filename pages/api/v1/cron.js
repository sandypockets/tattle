import { supabase } from "../../../lib/supabaseClient";

export async function sendMessage(contactId, goalId){
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .select('phone, id')
      .eq('id', contactId)
    if (data) {
      console.log("contact Data: ", data)
      return {
        "phone": data[0].phone,
        "contact_id": data[0]['id'],
        "goal_id": goalId
      }
    }
    if (error) {
      console.error("contact Error: ", error)
    }
    if (status) {
      console.log("contact Status: ", status)
    }
  } catch (err) {
    console.error(err)
  }
}

async function cronCheck(req, res) {
  const todayDate = new Date().toLocaleDateString('en-CA').toString()
  console.log("today date: ", todayDate)
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select('due_date, id, contact_id')
      .eq('due_date', todayDate)
    if (data) {
      console.log("Data: ", data)
      // API call to api/v1/message to trigger a message for each due goal
      console.log("data[0]id", data[0].id)
      let dataArr = []
      for (const item in data) {
        const phoneNum = await sendMessage(data[item]['contact_id'], data[item]['id'])
        dataArr.push(phoneNum)
      }
      // sendMessage(data[0].contact_id)
      console.log("dataArr: ", dataArr)
    }
    if (error) {
      console.error("Error: ", error)
    }
    if (status) {
      console.log("Status: ", status)
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