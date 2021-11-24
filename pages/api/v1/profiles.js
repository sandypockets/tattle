import {supabase} from "../../../lib/supabaseClient";

async function updateProfileEmail(req, res) {
  const userId = req.body['user_id']
  const email = req.body['email']
  console.log("UPDATE profile: ", req.body) // Debug
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

// Not actually updating yet. Have not received confirm email
async function updateAuthEmail(req, res) {
  const email = req.body['email']
  try {
    const { user, error } = await supabase.auth.update({email: email})
    if (user) {
      console.log("Auth success", user)
    }
  } catch (err) {
    console.error(err)
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'update') {
      if (req.body.content === 'email') {
        // update email
        updateProfileEmail(req, res)
        updateAuthEmail(req, res)
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