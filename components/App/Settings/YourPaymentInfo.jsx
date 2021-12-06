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
          <p className="w-80 pb-4">Change your payment method, or cancel your subscription.</p>
          <div className="px-48 mx-3" />
        </div>
      </div>
      <div className="flex justify-between">
        <section className="pl-4">
          <p className="font-bold">**** **** **** {subscriptionData[0]['card_last_four']}</p>
          <p className="font-bold flex justify-end capitalize">{subscriptionData[0]['card_type']}{' '}</p>
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