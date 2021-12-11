import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";

export default function CustomSms({ smsMessageText, setSmsMessageText }) {
  return (
    <Card>
      <CardTitle>Custom SMS message</CardTitle>
      <p>If Tattle sends an SMS to one of your contacts, it cycles through a few predefined responses. Some of which you can see here. The field below allows you to use your own custom Tattle SMS message.</p>
      <div className="mt-6">
        <label htmlFor="custom-sms" className="block text-sm font-medium text-gray-700">
          Add your custom message
        </label>
        <div className="mt-1">
        <textarea
          rows={4}
          name="custom-sms"
          id="custom-sms"
          className="shadow-sm focus:ring-yellow-400 focus:border-yellow-400 block w-full sm:text-sm border-gray-300 rounded-md"
          value={smsMessageText}
          onChange={(e) => setSmsMessageText(e.target.value)}
        />
          <p className={`${smsMessageText?.length > 140 && "text-red-400"} flex justify-end font-light text-gray-400 mt-1`}>
            {140 - smsMessageText?.length}/140 characters remaining
          </p>
        </div>
      </div>
    </Card>
  )
}