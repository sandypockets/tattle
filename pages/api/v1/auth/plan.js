import {supabase} from "../../../../lib/supabaseClient";

async function checkUserPlan(req, res) {
  const { ownerId } = req.query
  console.log("PLAN REQ BODY: ", req.query)
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('is_subscribed')
      .match({ id: ownerId })
    if (data) {
      console.log("PLAN DATA: ", data)
      res.status(200).json(data)
      // let counter = 0;
      // for (const item in data) {
      //   if (data[item]['payment_successful'] === true && counter <= 1) {
      //     counter++
      //     res.status(status).json(data[item]['payment_successful'])
      //     break;
      //   }
      // }
    }
    if (error) {
      res.status(status).json(error)
    }
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // handle post
  } else if (req.method === 'GET') {
    return checkUserPlan(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}