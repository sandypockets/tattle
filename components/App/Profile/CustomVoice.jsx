import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";

export default function CustomVoice() {
  return (
    <Card>
      <CardTitle>Custom voice script</CardTitle>
      <p>If Tattle calls one of your contacts, it cycles through a few predefined responses. Some of which you can hear here. The field below allows you to use your own custom Tattle voice message.</p>
      <div>
        <label htmlFor="custom-voice" className="block text-sm font-medium text-gray-700">
          Add your custom message
        </label>
        <div className="mt-1">
        <textarea
          rows={4}
          name="custom-voice"
          id="custom-voice"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          defaultValue={''}
        />
          <p className="flex justify-end">
            12 / 140 characters remaining
          </p>
        </div>
      </div>
    </Card>
  )
}