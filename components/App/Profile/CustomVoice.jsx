import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";

export default function CustomVoice({ voiceMessageText, setVoiceMessageText }) {
  return (
    <Card>
      <CardTitle>Custom voice script</CardTitle>
      <p>If Tattle calls one of your contacts, it cycles through a few predefined responses. Some of which you can hear here. The field below allows you to use your own custom Tattle voice message.</p>
      <div className="mt-6">
        <label htmlFor="custom-voice" className="block text-sm font-medium text-gray-700">
          Add your custom message
        </label>
        <div className="mt-1">
        <textarea
          rows={4}
          name="custom-voice"
          id="custom-voice"
          className="shadow-sm focus:ring-yellow-400 focus:border-yellow-400 block w-full sm:text-sm border-gray-300 rounded-md"
          value={voiceMessageText}
          onChange={(e) => setVoiceMessageText(e.target.value)}
        />
          <p className={`${voiceMessageText?.length > 140 && "text-red-400"} flex justify-end font-light text-gray-400 mt-1`}>
            {300 - voiceMessageText?.length} / 300 characters remaining
          </p>
        </div>
      </div>
    </Card>
  )
}