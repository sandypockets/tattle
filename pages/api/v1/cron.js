export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.type === 'cron') {
      console.log("CRON FIRED!")
      //
    }
  } else if (req.method === 'GET') {
    //
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}