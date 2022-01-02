const faqs = [
  {
    id: 1,
    question: "What is Tattle?",
    answer:
      "Tattle is a goal tracker. Write down goals, and set the date that you want to achieve it by. If you don't achieve your goal on time, Tattle will tell on you.",
  },
  {
    id: 2,
    question: "How many goals can I set?",
    answer:
      "100 per month. Contact us if you need more.",
  },
  {
    id: 3,
    question: "Who will Tattle call if I don't reach my goal?",
    answer:
      "You can set up to 3 contacts in your Tattle account. You can set 0-3 contacts for each goal.",
  },
  {
    id: 4,
    question: "How much does Tattle cost?",
    answer:
      "$3/month. Running servers and sending SMS or voice messages costs money. Our inexpensive plans aim only to recoup those costs.",
  },
  {
    id: 5,
    question: "How does Tattle know if I achieved a goal?",
    answer:
      "When you complete a goal, you can mark it as 'done' in your account. If a goal's due date passes, and the goal is not yet marked as done, you'll get tattled on.",
  },
]

export default function FaqSection() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Frequently asked questions</h2>
        <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto">Tattle isn't an ordinary service, and we expect that you might have a few questions. Not to worry, we've got answers.</p>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
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
  )
}
