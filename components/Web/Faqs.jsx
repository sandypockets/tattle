import QuestionSvg from "./Graphics/QuestionSvg";

const faqData = {
  basics: [
    {
      "faqTitle": "Basics"
    },
    [{
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
      },]
  ],
  pricing: [
    {
      "faqTitle": "Pricing"
    },
    [{
      id: 1,
      question: "How much does Tattle cost?",
      answer:
        "$3/month. Running servers, maintaining the software, and sending SMS or voice messages costs money. Our single, inexpensive plan aims only to recoup those costs, and help build new features to improve your experience.",
    },
      {
        id: 2,
        question: "Is there a free trial?",
        answer:
          "Yes. Tattle's free trial lasts 14 days. Your payment method will not be charged until the trial period has ended.",
      },
      {
        id: 3,
        question: "Do I need to add a payment method to get the free trial?",
        answer:
          "Yes. A payment method is required at the time of sign up. However it will not be charged until the 14 day trial has ended. If you cancel before the trial ends, you will not be charged.",
      },
      {
        id: 4,
        question: "How do you process payments? A secure checkout is important to me.",
        answer:
          "All our payments are handled securely by Stripe.",
      }]
  ],
  features: [
    {
      "faqTitle": "Features"
    },
    [{
      id: 1,
      question: "What if I don't want the goal title in my message? Can I set custom messages?",
      answer:
        "Absolutely. You can customize both the SMS or voice messages that would be sent out.",
    },
      {
        id: 2,
        question: "How does Tattle know if I achieved a goal?",
        answer:
          "When you achieve a goal, you can mark it as 'done' in your Tattle account. If a goal's due date passes, and the goal is not yet marked as done, you'll get tattled on.",
      },
      {
        id: 3,
        question: "How many goals can I set?",
        answer:
          "As many as you want. Dream big! But remember, if you bite off more than you can chew, and dont' achieve your goals on time, your contacts will be hearing from us!",
      },
      {
        id: 4,
        question: "Can I change a goal's due date?",
        answer:
          "Yes, you can change the due date for a goal at any time, even after it has passed. Ultimately Tattle is here to help you achieve your goals, and we understand that plans change.",
      },
      {
        id: 5,
        question: "How many contacts can I have?",
        answer:
          "Like goals, there's no limit on the number of contacts you can create. However each goal can only have a single contact assigned at one time.",
      },
      {
        id: 6,
        question: "I assigned the wrong contact to my goal. Can I change it?",
        answer:
          "Yes, you can change the contact that is assigned to your goal at any time.",
      },
      {
        id: 7,
        question: "Can one contact be assigned to multiple goals?",
        answer:
          "Yes. One contact can be assigned to as many goals as you'd like.",
      }]
  ]
}

const faqs = [faqData.basics, faqData.pricing, faqData.features]

export default function Faqs() {
  return (
    <div className="bg-white mx-24 mt-6">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-24 lg:relative">
          <div className="hidden lg:block" />
          <div className="lg:fixed lg:max-w-md">
            <h2 className="text-5xl font-extrabold text-gray-900">Frequently asked questions</h2>
            <div className="mt-4 text-lg text-gray-500">
              Tattle isn't an ordinary service, and we expect that you might have a few questions.{' '}
              <p className="pt-1">
                Not to worry, we've got a few answers too.
              </p>
            </div>
            <QuestionSvg />
          </div>
          <div className="lg:mt-0 lg:col-span-2 lg:pl-20 bg-scroll">
            {faqs.map((faq, index) => (
              <div key={faq[0].faqTitle} className="mb-12">
                <h2 className="text-xl font-extrabold mb-6 underline decoration-yellow-300 decoration-8 mt-12 lg:mt-0">{faq[0].faqTitle}</h2>
                <dl className="space-y-12">
                  {faq[1].map((subFaq) => (
                    <div key={subFaq.id}>
                      <dt className="text-lg leading-6 font-medium text-gray-900">{subFaq.question}</dt>
                      <dd className="mt-2 text-base text-gray-500">{subFaq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
