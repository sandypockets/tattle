import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";
import updateEmail from "../../../helpers/profile/updateEmail";

export default function Email({ setIsSuccess, setSectionName, setShowMessage }) {
  const [email, setEmail] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  async function updateAuthEmail(email) {
    setLoading(true)
    try {
      const { user, error } = await supabase.auth.update({email: email})
      if (user) {
        console.log("Updated email successfully.")
        setIsSuccess(true)
        setSectionName('email')
      }
      if (error) {
        console.error("Email update unsuccessful. Error:", error)
        setIsSuccess(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setShowMessage(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    const user = supabase.auth.user()
    user && setEmail(user.email)
    user && setUser(user)
  }, [])

  return (
    <Card>
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="mb-2 sm:mb-0">
          <CardTitle>Email</CardTitle>
          <p className="ml-2">Update your email address.</p>
        </div>
        <div className="flex lg:mr-12 flex-col sm:flex-row">
          <div className="sm:w-48 lg:w-72">
            <TextInput value={email} type={email} label="Email" onChangeHandler={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex justify-end sm:flex-col sm:justify-center md:flex-row md:justify-end mr-2 sm:mr-0">
            <div className="max-w-min mt-2 md:mt-8">
              <Button
                onClickHandler={() => {
                  email && updateEmail(user['id'], email)
                  user && updateAuthEmail(email)
                }}
                disabled={loading}
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}