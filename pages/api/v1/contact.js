import sgMail from "@sendgrid/mail";

export default function handler(req, res) {
  if (req.method === 'POST') {

    const msg = {
      subject: `Tattle: New message from ${req.body.name} 👋`,
      text: `${req.body.name}, ${req.body.email} - ${req.body.message}`,
    }

    const parsedReq = {
      to: process.env.NEXT_SENDGRID_TO_EMAIL,
      from: process.env.NEXT_SENDGRID_FROM_EMAIL,
      subject: msg.subject,
      text: msg.text,
      html: msg.html
    }

    sgMail.setApiKey(process.env.NEXT_SENDGRID_API_KEY)
    sgMail
      .send(parsedReq)
      .then(() => {
        console.log('Email sent')
        res.status(200).json('Successfully sent!')
      })
      .catch((error) => {
        console.error(error)
        res.send(error)
      })
  } else {
    res.send("Something's not right. Check your API call. Note, this route only accepts POST requests!")
  }
}