import { useState } from "react";
import Layout from "../components/Web/Layout/Layout";
import axios from 'axios'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSuccessMessage('')
    setLoading(true)
    axios.post('/api/v1/contact', {
      name,
      email,
      message
    })
      .then(function (response) {
        console.log(response);
        setSuccessMessage(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        setSuccessMessage(error)
        console.log(error);
      });
  }

  return (
    <Layout>
      <div className="relative bg-white md:pt-12 lg:py-24">
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">Hey there,</h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Whether you have a question, some feedback to share, or just want to say hi, we'd love to hear from you.
              </p>
              <p className="mt-6 text-lg leading-6 text-gray-500">
                Drop us a line by filling out this form. We'll get back to you within 72 hours.
              </p>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12 rounded-lg">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="full-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="name"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-yellow-300 focus:border-yellow-300 border-gray-300 rounded-md"
                    placeholder="Full name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-yellow-300 focus:border-yellow-300 border-gray-300 rounded-md"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-yellow-300 focus:border-yellow-300 border border-gray-300 rounded-md"
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                  {successMessage.length > 0 && (
                    <p className="mt-2 text-xl font-semibold lg:mr-32">{successMessage}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
