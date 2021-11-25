import {supabase} from "../../../lib/supabaseClient";

async function updateProfileEmail(req, res) {
  const { userId, email } = req.body
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        email: email,
      })
      .match({"id": userId})
    if (data) {
      console.log("Profile updated.")
      res.json(data)
    }
    if (error) {
      res.json(error)
    }
  } catch (err) {
    res.json(err)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'update') {
      if (req.body.content === 'email') {
        updateProfileEmail(req, res)
      }
      if (req.body.content === 'password') {
        // update password
      }
    }
  } else if (req.method === 'GET') {
    // get profile data
  } else {
    res.send("Something's not right. Check your query.")
  }
}