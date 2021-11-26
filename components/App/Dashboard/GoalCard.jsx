import GridCard from "../../Global/GridCard";

export default function GoalCard({ goal }) {
  return (
    <GridCard>
      <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mb-6">{goal.title}</h2>
      <p className="text-sm h-10 overflow-hidden">
        {goal.description}
      </p>
      <p className="pt-4">Due by: {goal['due_date']}</p>
    </GridCard>
  )
}