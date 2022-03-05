import { UsersIcon } from "@heroicons/react/solid";
import Card from "../../Global/Card";

export default function ContactsEmptyState({ setState }) {
  return (
    <Card>
      <button
        type="button"
        className="
                relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center
                hover:border-gray-400 hover:text-gray-500 dark:hover:border-gray-50 dark:hover:text-gray-50 dark:text-gray-300 text-gray-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 duration-150"
        onClick={() => setState('create')}
      >
        <div className="mx-auto h-12 w-12">
          <UsersIcon />
        </div>
        <span data-cy="add-first-contact-card" className="mt-2 block text-sm font-medium">Add your first contact</span>
      </button>
    </Card>
  )
}
