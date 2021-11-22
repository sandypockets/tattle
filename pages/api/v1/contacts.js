import { supabase } from "../../../lib/supabaseClient";

async function createContact(req, res) {
  const id = req.body['user_id']
  const name = req.body['name']
  const phone = req.body['phone']
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        "owner_id": id,
        "name": name,
        "phone": phone,
      }])
    if (data) {
      console.log("Create Contact Data: ", data)
      res.send(200)
      res.json(data)
    }
    if (error) {
      res.send(400)
      res.json(error)
    }
  } catch (error) {
    res.send(400)
    res.json(error)
  } finally {
    res.end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    createContact(req, res)
  } else if (req.method === 'GET') {
    //
  } else {
    res.send("Something's not right. Check your query.")
  }
}