import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Card from "../../Global/Card";
import CardTitle from "../../Global/CardTitle";
import TextInput from "../../Global/TextInput";
import { updateEmail } from "../../../helpers/profile";

export default function Email({ setIsSuccess, setSectionName, setShowMessage }) {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState({})
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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <CardTitle>Email</CardTitle>
          <p>Update your email address.</p>
        </div>
        <div className="flex sm:w-full mt-4 lg:justify-end">
          <form className="flex flex-col w-full">
            <div className="w-full">
              <TextInput value={email} type={email} label="Email" onChangeHandler={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <div className="w-full mx-2 mt-2">
                <Button
                  onClickHandler={() => {
                    email && updateEmail(user['id'], email)
                    user && updateAuthEmail(email)
                  }}
                  disabled={loading}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Card>
  )
}