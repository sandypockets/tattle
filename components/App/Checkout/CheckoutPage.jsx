import Checkout from "./Checkout";
import { supabase } from "../../../lib/supabaseClient";

export default function CheckoutPage({ session }) {
  const user = supabase.auth.user()
  const months = ['January','February','March','April','May','Jun','July','August','September','October','November','December']
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const currentTImeUnix = new Date().getTime()
  const dayInUnix   = 86400000
  const trialPeriod = 1219000000
  const nextBillDate = (dayInUnix * 30) + (trialPeriod + currentTImeUnix)
  const currentMonth = new Date(nextBillDate).getMonth()
  const currentDate = new Date(nextBillDate).getDate()
  const currentDay = new Date(Date.now()).getDay()
  const currentYear = new Date(nextBillDate).getFullYear()

  const createdAtUnix = new Date(user?.created_at).getTime()
  const trialEndDate = new Date(createdAtUnix + trialPeriod).toLocaleDateString()
  let suffix = ''
  switch (currentDate.toString()[currentDate.toString().length -1]) {
    case "1":
      suffix = 'st'
      break
    case "2":
      suffix = 'nd'
      break
    case "3":
      suffix = 'rd'
      break
    default:
      suffix = 'th'
  }

  const nextBillingDate = `${days[currentDay]}, ${months[currentMonth]} ${currentDate}${suffix}`

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 mt-16 sm:px-0 md:px-10">

        <div className="mt-8 mb-8 lg:mb-0 mx-auto w-full lg:max-w-sm sm:px-6 md:px-0">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-yellow-300 mb-6 px-1">Tattle monthly</h1>
          <h4 className="-mt-6 text-md px-2">$3 USD / month. Cancel anytime.</h4>
          <div className="my-6 w-full lg:max-w-1xs bg-gray-100 dark:bg-gray-700 p-4 place-content-center">
            <div className="grid grid-cols-2">
              <p className="font-thin mr-12">Subtotal:</p>
              <p className="font-thin text-right">$3.00</p>
              <p className="font-thin">Taxes:</p>
              <p className="text-right">$0.00</p>
              <p className="font-medium text-lg mt-2">Total:</p>
              <p className="text-xl font-medium text-right mt-2">$3.00 <small className="text-sm">USD</small></p>
              <p className="font-medium text-center text-sm mt-6 col-span-2">Due by {trialEndDate}</p>
            </div>
          </div>
          <div className="flex">
            <small className="font-semibold w-32">Next billing date: </small>
            <small className="w-36">{nextBillingDate}</small>
          </div>
        </div>
        <div>
          <Checkout session={session} />
        </div>
      </div>
    </>
  )
}