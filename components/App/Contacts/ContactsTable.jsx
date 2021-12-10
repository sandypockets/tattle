import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../Global/Button";
import Slideover from "../Layout/Slideover";
import { sortTwice } from "../../../helpers/sort";
import getGoals from "../../../helpers/goals/getGoals";
import updateGoal from "../../../helpers/goals/updateGoal";
import updateGoalContact from "../../../helpers/goals/updateGoalContact";

export default function ContactsTable({ contacts, setOpen, selectedContact, setSelectedContact }) {
  const [assignSlideoverOpen, setAssignSlideoverOpen] = useState(false)
  const [goals, setGoals] = useState({})
  const [selectedGoalId, setSelectedGoalId] = useState()
  const [user, setUser] = useState({})

  useEffect(() => {
    const authUser = supabase.auth.user()
    setUser(authUser)
    getGoals(user.id, setGoals)
  }, [])

  useEffect(() => {
    goals && sortTwice(goals, 'due_date', 'id', true)
  }, [goals])

  return (
    <div className="flex flex-col my-6">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-md overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created at
                </th>
                <th scope="col" className="relative px-2 py-3">
                  <span className="sr-only">Assign</span>
                </th>
                <th scope="col" className="relative px-2 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {contacts && contacts.map((contact, index) => (
                <tr key={contact.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact['created_at']).toLocaleDateString('en-CA')}</td>
                  <td className="py-4 whitespace-nowrap text-right text-sm font-medium max-w-6xs">
                    <div className="max-w-min">
                      <Button onClickHandler={() => {
                        setSelectedContact(contact)
                        setAssignSlideoverOpen(true)
                      }}>
                        Assign
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="max-w-min">
                      <Button onClickHandler={() => {
                        setSelectedContact(contact)
                        setOpen(true)
                      }}>
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Slideover setOpen={setAssignSlideoverOpen} open={assignSlideoverOpen} title="Assign contact">
        <section className="mx-auto">
          <p className="my-2">Assign {selectedContact && selectedContact.name} to one of your goals.</p>
          <select onChange={(e) => setSelectedGoalId(e.target.value)}>
            {goals?.length > 0 && goals.map((goal, index) => (
              <option
                key={index}
                value={goal.id}
              >
                {goal.title} - {new Date(goal['created_at']).toLocaleDateString('en-CA')}
              </option>
            ))}
          </select>
          <div className="max-w-min mt-4">
            <Button onClickHandler={() => {
             user && updateGoalContact(user['id'], selectedContact.id, selectedGoalId)
            }}>
              Save
            </Button>
          </div>
        </section>
      </Slideover>
    </div>
  )
}
