import { supabase } from "../../../lib/supabaseClient";

async function getCustomMessages(req, res) {
  const { id } = req.query
  try {
    const { data, error } = await supabase
      .from('custom_messages')
      .select('id, custom_sms_message, custom_voice_message')
      .match({ owner_id: id })
    data && res.status(200).json(data)
    error && res.status(500).json(error)
  } catch (err) {
    err && res.status(500).json(err).end()
  }
}

async function createCustomMessages(req, res) {
  const { id, customSmsMessage, customVoiceMessage } = req.body
  try {
    const { data, error } = await supabase
      .from('custom_messages')
      .insert([{
        owner_id: id,
        custom_sms_message: customSmsMessage,
        custom_voice_message: customVoiceMessage
      }])
    data && res.status(200).json(data)
    error && res.status(500).json(error)
  } catch (err) {
    err && res.status(500).json(err).end()
  }
}

async function updateCustomMessages(req, res) {
  const { id, userId, smsMessageText, voiceMessageText } = req.body
  try {
    const { data, error } = await supabase
      .from('custom_messages')
      .update({ custom_sms_message: smsMessageText, custom_voice_message: voiceMessageText })
      .match({id: id, owner_id: userId})
    data && res.status(200).json(data)
    error && res.status(200).json(error)
  } catch (err) {
    err && res.status(500).json(err).end()
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'create') {
      return createCustomMessages(req, res)
    }
    if (req.body.type === 'update') {
      return updateCustomMessages(req, res)
    }
  } else if (req.method === 'GET') {
    return getCustomMessages(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}