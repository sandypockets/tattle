import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GridCard from "../../Global/GridCard";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function GoalCard({ goal }) {
  const [isUrgent, setIsUrgent] = useState()
  const router = useRouter()

  // set goal as urgent if due in the next 24 hours
  useEffect(() => {
    const dayInUnixTime = 86400
    const unixDueDate = new Date(goal['due_date']).getTime() / 1000
    const timeLeft = unixDueDate - dayInUnixTime
    const dateNow = Date.now().toString().slice(0, -3)
    timeLeft <= dateNow && setIsUrgent(true)
  }, [goal])

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
      router.push({
        pathname: '/app/goals/[id]',
        query: { id: goal.id },
      })
    }}>
    <GridCard>
      <h2 className="font-extrabold text-gray-900 text-lg truncate">{goal.title}</h2>
      <div className="border-b-2 border-gray-150 w-full my-2 mr-2" />
      <p className="text-sm h-10 overflow-hidden truncate mb-2 sm:mb-4">
        {goal.description}
      </p>
      <small>
        {goal['is_completed'] === false &&
          <>
            <span className="text-gray-400">Due by: </span>
            <span className={isUrgent ? 'text-red-500' : 'text-gray-500'}>{goal['due_date']}</span>
          </>
        }
        {goal['is_completed'] === true &&
          <div className="flex">
            <div className="text-gray-400 w-4 h-4 mr-1"><CheckCircleIcon /></div>
            <span className="text-gray-400 pr-1">
              Completed
            </span>
            {goal['is_completed_on_time'] === false ? <span className="text-red-400">late</span> : <span className="text-green-500">on time</span>}
          </div>
        }
      </small>
    </GridCard>
    </div>
  )
}