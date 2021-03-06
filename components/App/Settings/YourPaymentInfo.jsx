import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import Button from "../../Global/Button";
import axios from 'axios'
import {supabase} from "../../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function YourPaymentInfo({ subscriptionData, setCancelModalOpen }) {
  const router = useRouter()

  return (
    <Card>
      <div className="flex flex-col">

        <div className="flex justify-between flex-col md:flex-row">
          <div className="justify-start">
            <CardTitle>Payment methods</CardTitle>
          </div>
          <div>
            <p className="max-w-md pb-4">Change your payment method, or cancel your subscription.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <section className="pl-4">
            <p className="font-bold ml-12 sm:ml-0">**** **** **** {subscriptionData?.charge?.card_last_four}</p>
            <p className="font-bold flex md:justify-end capitalize -mt-6 sm:mt-0 mb-6">{subscriptionData?.charge?.card_brand}{' '}</p>
          </section>
          <div className="flex flex-row md:flex-col lg:flex-row">
            <div className="w-48 mr-6 md:mr-0 md:mb-2 lg:mr-6">
              <Button onClickHandler={() => setCancelModalOpen(true)}>
                <div className="py-0.5">
                  Cancel subscription
                </div>
              </Button>
            </div>
            <div className="w-48">
              <Button>
                <form>
                  <div className="py-0.5">
                    <button type="submit" onClick={(e) => {
                      console.log("one")
                      e.preventDefault()
                      console.log("two")
                      const currentUser = supabase.auth.user()
                      console.log("three")
                      if (currentUser) {
                      console.log("four")
                        axios
                          .post('/api/v1/create-customer-portal-session', {
                            currentUser,
                            customerId: subscriptionData?.invoice?.customer_id
                          })
                          .then(function (response) {
                            console.log(response.data);
                            if (response.data?.length > 0) {
                              return router.push(response.data)
                            }
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }
                    }}>Manage billing</button>
                  </div>
                </form>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </Card>
  )
}