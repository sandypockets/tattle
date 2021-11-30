export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("Message FIRED!")
    // res.status(200).json('Cron job fired!')
    // return cronCheck(req, res)

  } else if (req.method === 'GET') {
    //
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}