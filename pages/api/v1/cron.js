export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("CRON FIRED!")
    res.status(200).json('Cron job fired!')
  } else if (req.method === 'GET') {
    //
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}