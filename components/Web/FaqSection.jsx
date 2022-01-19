// const faqs = [
//   {
//     id: 1,
//     question: "What is Tattle?",
//     answer:
//       "Tattle is a goal tracker. Write down goals, and set the date that you want to achieve it by. If you don't achieve your goal on time, Tattle will tell on you.",
//   },
//   {
//     id: 2,
//     question: "What happens when Tattle tells on me?",
//     answer:
//       "If you don't achieve your goal by the date you specify, Tattle will send an SMS or voice message to the contact you specified. We'll let them know the title of your goal, and that you didn't achieve it on time.",
//   },
//   {
//     id: 3,
//     question: "What if I don't want the goal title in my message? Can I set custom messages?",
//     answer:
//       "Absolutely. You can customize both the SMS or voice messages that would be sent out.",
//   },
//   {
//     id: 4,
//     question: "How much does Tattle cost?",
//     answer:
//       "$3/month. Running servers, maintaining the software, and sending SMS or voice messages costs money. Our inexpensive plan aims only to recoup those costs.",
//   },
//   {
//     id: 5,
//     question: "How does Tattle know if I achieved a goal?",
//     answer:
//       "When you complete a goal, you can mark it as 'done' in your account. If a goal's due date passes, and the goal is not yet marked as done, you'll get tattled on.",
//   },
//   {
//     id: 6,
//     question: "How many goals can I set?",
//     answer:
//       "100 per month. Contact us if you need more.",
//   },
//   {
//     id: 7,
//     question: "How many contacts can I have?",
//     answer:
//       "You can create an unlimited number of contacts, however each goal can only have a single contact assigned at one time.",
//   },
//   {
//     id: 8,
//     question: "Can one contact be assigned to multiple goals?",
//     answer:
//       "Yes. One contact can be assigned to as many goals as you'd like.",
//   },
// ]
//
// export default function FaqSection() {
//   return (
//     <div className="bg-white">
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center">Frequently asked questions</h2>
//         <p className="mt-4 text-base text-gray-500 max-w-3xl mx-auto">Tattle isn't an ordinary service, and we expect that you might have a few questions. Not to worry, we've got a few answers too.</p>
//         <div className="mt-12">
//           <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
//             {faqs.map((faq) => (
//               <div key={faq.id}>
//                 <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
//                 <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
//               </div>
//             ))}
//           </dl>
//         </div>
//       </div>
//     </div>
//   )
// }
