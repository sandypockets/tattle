import { UsersIcon } from "@heroicons/react/solid";

export default function ContactsEmptyState() {
  return (
    <button
      type="button"
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="mx-auto h-12 w-12 text-gray-400">
        <UsersIcon />
      </div>
      <span className="mt-2 block text-sm font-medium text-gray-900">Add your first contact</span>
    </button>
  )
}
