
const options = [
  {name: 'Option 1', id: 1},
  {name: 'Option 2', id: 2},
  {name: 'Option 3', id: 3}
]

export default function ChooseContact({ selectedContact, setSelectedContact }) {

  return (
    <div className="flex mx-2 mt-6 justify-between flex-row-reverse">
      <div className="flex flex-col">
        <p>Choose a contact</p>
        <select className="w-48" onChange={(e) => setSelectedContact(event.target.value)}>
          {options.map((option) => (
            <option value={option.name} key={option.id}>{option.name}</option>
          ) )}
        </select>
      </div>
      <p className="self-center mt-4 max-w-md">Select the person you'd like us to contact if you don't achieve your goal.</p>
    </div>
  )
}