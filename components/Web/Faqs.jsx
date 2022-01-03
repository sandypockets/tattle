import QuestionSvg from "./Graphics/QuestionSvg";

const faqs = [
  {
    id: 1,
    question: "What is Tattle?",
    answer:
      "Tattle is a goal tracker. Write down goals, and set the date that you want to achieve it by. If you don't achieve your goal on time, Tattle will tell on you.",
  },
  {
    id: 2,
    question: "What happens when Tattle tells on me?",
    answer:
      "If you don't achieve your goal by the date you specify, Tattle will send an SMS or voice message to the contact you specified. We'll let them know the title of your goal, and that you didn't achieve it on time.",
  },
  {
    id: 3,
    question: "What if I don't want the goal title in my message? Can I set custom messages?",
    answer:
      "Absolutely. You can customize both the SMS or voice messages that would be sent out.",
  },
  {
    id: 4,
    question: "How much does Tattle cost?",
    answer:
      "$3/month. Running servers, maintaining the software, and sending SMS or voice messages costs money. Our inexpensive plan aims only to recoup those costs.",
  },
  {
    id: 5,
    question: "How does Tattle know if I achieved a goal?",
    answer:
      "When you complete a goal, you can mark it as 'done' in your account. If a goal's due date passes, and the goal is not yet marked as done, you'll get tattled on.",
  },
  {
    id: 6,
    question: "How many goals can I set?",
    answer:
      "100 per month. Contact us if you need more.",
  },
  {
    id: 7,
    question: "How many contacts can I have?",
    answer:
      "You can create an unlimited number of contacts, however each goal can only have a single contact assigned at one time.",
  },
  {
    id: 8,
    question: "Can one contact be assigned to multiple goals?",
    answer:
      "Yes. One contact can be assigned to as many goals as you'd like.",
  },
  {
    id: 9,
    question: "Lorem ipsum?",
    answer:
      "Lorem ipsum. Dolor.",
  },
  {
    id: 10,
    question: "Lorem ipsum?",
    answer:
      "Lorem ipsum. Dolor.",
  },
  {
    id: 11,
    question: "Lorem ipsum?",
    answer:
      "Lorem ipsum. Dolor.",
  },
  {
    id: 12,
    question: "Lorem ipsum?",
    answer:
      "Lorem ipsum. Dolor.",
  },
]

export default function Faqs() {
  return (
    <div className="bg-white mx-24 mt-6">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-24 lg:relative">
          <div className="hidden lg:block" />
          <div className="lg:fixed lg:max-w-md">
            <h2 className="text-4xl font-extrabold text-gray-900">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-gray-500">
              Tattle isn't an ordinary service, and we expect that you might have a few questions.{' '}
              <p className="pt-1">
                Not to worry, we've got a few answers too.
              </p>
            </p>
            <QuestionSvg />
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2 lg:pl-20 bg-scroll">
            <dl className="space-y-12">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
