import { supabase } from "../../../lib/supabaseClient";

async function createContact(req, res) {
  const id = req.body['user_id']
  const name = req.body['name']
  const phone = req.body['phone']
  if (name && phone) {
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
        res.json(data)
        res.send(200)
      }
      if (error) {
        res.json(error)
        res.send(400)
      }
    } catch (error) {
      res.send(400)
      res.json(error)
    } finally {
      res.end()
    }
  } else {
    res.json('Error - No content')
    res.end()
  }
}

async function updateContact(req, res) {
  const userId = req.body['user_id']
  const contactId = req.body['contact_id']
  const name = req.body['name']
  const phone = req.body['phone']
  console.log("UPDATE contact: ", req.body) // Debug
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({
        name: name,
        phone: phone
      })
      .match({id: contactId, "owner_id": userId})
    if (data) {
      console.log("Contact updated.")
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

async function getContacts(req, res) {
  const ownerId = req.query['id']
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .select()
      .eq('owner_id', ownerId)
    if (data) {
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
    if (req.body.type === 'create') {
      createContact(req, res)
    } else if (req.body.type === 'update') {
      updateContact(req, res)
    }
  } else if (req.method === 'GET') {
    getContacts(req, res)
  } else {
    res.send("Something's not right. Check your query.")
  }
}