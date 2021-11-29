import {supabase} from "../../../lib/supabaseClient";

async function cronCheck(req, res) {
  const todayDate = new Date()
  console.log("today date: ", todayDate)
  try {
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .gte('due_date', todayDate)
    if (data) {
      console.log("DATA", data)
      // res.status(status).json(data)
    }
    if (error) {
      // res.status(status).json(error)
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