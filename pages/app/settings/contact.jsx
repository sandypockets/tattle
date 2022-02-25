import { useState  } from "react";
import axios from "axios";
import { supabase } from "../../../lib/supabaseClient";
import AppLayout from "../../../components/App/Layout/AppLayout";
import Button from "../../../components/Global/Button";
import Card from "../../../components/Global/Card";
import CardTitle from "../../../components/Global/CardTitle";
import StateWrapper from "../../../components/App/Layout/StateWrapper";

export default function ContactPage() {
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const user = supabase.auth.user()
    setSuccessMessage('')
    axios.post('/api/v1/contact', {
      name: user.user_metadata['name'],
      email: user.email,
      message: `Logged in feedback:  ${message}`
    })
      .then(function (response) {
        console.log(response);
        setSuccessMessage(response.data)
      })
      .catch(function (error) {
        setSuccessMessage(error)
        console.log(error);
      });
  }

  return (
    <>
      <AppLayout>
        <StateWrapper>
          <Card>
            <CardTitle>
              Contact Tattle
            </CardTitle>
            <p>Whether you have a question, some feedback, or would just like to say hello, we'd love to hear from you. Fill out the contact form below, and if you ask us to, we'll be in touch soon.</p>
            <div>
              <form>
                <label htmlFor="feedback" className="sr-only">
                  Contact Tattle Support
                </label>
                <div className="mt-6">
                  <textarea
                    rows={4}
                    name="feedback"
                    id="feedback"
                    className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-600 text-white my-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <Button type="submit" onClickHandler={(e) => handleSubmit(e)}>Submit</Button>
                </div>
                {successMessage.length > 0 && <span className="text-sm text-white">{successMessage}</span>}
              </form>
            </div>
          </Card>
        </StateWrapper>
      </AppLayout>
    </>
  )
}