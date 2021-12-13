import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import Button from "../../Global/Button";

export default function YourPaymentInfo({ subscriptionData }) {
  console.log("YourPaymentInfo: ", subscriptionData)
  return (
    <Card>
      <div className="flex justify-between">
        <div className="justify-start">
          <CardTitle>Payment methods</CardTitle>
        </div>
        <div>
          <p className="max-w-md pb-4">Change your payment method, or cancel your subscription.</p>
          {/*<div className="px-48 mx-3" />*/}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <section className="pl-4">
          <p className="font-bold">**** **** **** {subscriptionData?.charge?.card_last_four}</p>
          <p className="font-bold flex justify-end capitalize -mt-6 sm:mt-0 mb-6">{subscriptionData?.charge?.card_brand}{' '}</p>
        </section>
        <div className="flex">
          <div className="w-48 mr-6">
            <Button>
              Cancel subscription
            </Button>
          </div>
          <div className="w-48">
            <Button>
              Add payment method
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}