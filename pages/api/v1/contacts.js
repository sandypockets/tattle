import { supabase } from "../../../lib/supabaseClient";

async function createContact(req, res) {
  const { ownerId, name, phone, countryCode } = req.body
  if (name && phone) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          "owner_id": ownerId,
          "name": name,
          "phone": phone,
          "country_code": countryCode
        }])
      if (data) {
        console.log("Create Contact Data: ", data)
        res.status(status).json(data)
      }
      if (error) {
        res.status(status).json(error)
      }
    } catch (error) {
      res.json(error)
    } finally {
      res.end()
    }
  } else {
    res.json('Error - No content').end()
  }
}

async function updateContact(req, res) {
  const { userId, contactId, name, phone } = req.body
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .update({
        name: name,
        phone: phone
      })
      .match({id: contactId, "owner_id": userId})
    if (data) {
      res.status(status).json(data)
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

async function getContacts(req, res) {
  const { ownerId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .select()
      .eq('owner_id', ownerId)
    if (data) {
      res.status(status).json(data)
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

async function getSingleContact(req, res) {
  const { ownerId, contactId } = req.query
  try {
    const { data, error, status } = await supabase
      .from('contacts')
      .select('name')
      .match({ owner_id: ownerId, id: contactId })
    if (data) {
      res.status(status).json(data)
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
    if (req.body.type === 'create') {
      return createContact(req, res)
    } else if (req.body.type === 'update') {
      return updateContact(req, res)
    }
  } else if (req.method === 'GET') {
    if (req.query.type === 'all') {
      return getContacts(req, res)
    } else if (req.query.type === 'single') {
      return getSingleContact(req, res)
    }
  } else {
    res.send("Something's not right. Check your query.")
  }
}