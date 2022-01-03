import Layout from "../components/Web/Layout/Layout";
import SignUpSvg from "../components/Web/Graphics/SignUpSvg";
import AddContactSvg from "../components/Web/Graphics/AddContactSvg";
import AddGoalSvg from "../components/Web/Graphics/AddGoalSvg";
import DatePickerSvg from "../components/Web/Graphics/DatePickerSvg";
import TattledSvg from "../components/Web/Graphics/TattledSvg";

const infoItems = [
  {
    id: 1,
    header: "Sign up to Tattle.",
    body: "You'll need a first name, an email, and a password. Your first name will be used in SMS or voice messages in the event that we reach out to one of your contacts.",
    svg: <SignUpSvg />
  },
  {
    id: 2,
    header: "Create a new contact.",
    body: "Contacts are your friends or family that will help hold you accountable. If you don't achieve your goal on time, your contact is who we'll contact.",
    svg: <AddContactSvg />
  },
  {
    id: 3,
    header: "Create a new goal.",
    body: "Write down something you want to achieve, big or small. Then assign your newly created contact to the goal.",
    svg: <AddGoalSvg />
  },
  {
    id: 4,
    header: "Pick a due date.",
    body: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    svg: <DatePickerSvg />
  },
  {
    id: 5,
    header: "If you don't achieve your goal...",
    body: "If your goal isn't marked as complete in your Tattle dashboard by the due date, then we'll send an SMS or voice message to your contact, letting them know.",
    svg: <TattledSvg />
  }
]

export default function HowItWorks() {
  return (
    <Layout>
      <div className="mt-12 mx-36">
        <div className="mb-20 pt-12 ml-6">
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-6xl lg:text-6xl">How it works</h1>
          <h2 className="text-3xl">Achieve your biggest goals yet.</h2>
        </div>
        <section>
          {infoItems.map((item, index) => (
            <article key={item.id} className={index % 2 !== 0 ? "flex justify-around py-4" : "flex justify-around flex-row-reverse py-4"}>
              <div className="max-w-2xl flex flex-col justify-center">
                <h3 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-4xl">{item.header}</h3>
                <p className="mt-6 max-w-xl text-xl font-light">{item.body}</p>
              </div>
              {item.svg}
            </article>
          ))}
        </section>
      </div>
    </Layout>
  )
}