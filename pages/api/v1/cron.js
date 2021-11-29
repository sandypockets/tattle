import { supabase } from "../../../lib/supabaseClient";

async function cronCheck(req, res) {
  const todayDate = new Date().toLocaleDateString('en-CA').toString()
  console.log("today date: ", todayDate)
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select('due_date, id')
      .eq('due_date', todayDate)
    if (data) {
      console.log("Data: ", data)
      // API call to api/v1/message to trigger a message for each due goal
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