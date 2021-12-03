export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.data.object)
    // if
    res.status(200).end()
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}