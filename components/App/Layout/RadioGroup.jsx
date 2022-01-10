const notificationMethods = [
  { id: 'sms', title: 'Phone (SMS)' },
  { id: 'voice', title: 'Phone (Voice)' },
]

export default function RadioGroup({ state, setState, usage="row" }) {

  return (
    <div className={usage === 'row' ? "mx-8 my-8 flex justify-between" : "mx-8 my-8 flex flex-col"}>
      <div>
        <label className="align-middle text-base text-gray-900 dark:text-gray-300">How do you prefer to receive notifications?</label>
      </div>
      <fieldset className="mt-1">
        <legend className="sr-only">Notification method</legend>
        <div className={usage === 'row' ? "space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10" : "space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10 mt-4 justify-center"}>
          {notificationMethods.map((notificationMethod) => (
            <div key={notificationMethod.id} className="flex items-center">
              <input
                id={notificationMethod.id}
                name="notification-method"
                type="radio"
                defaultChecked={notificationMethod.id === state}
                className="focus:ring-yellow-400 dark:focus:ring-yellow-500 h-4 w-4 text-yellow-300 dark:text-yellow-400 border-gray-300 dark:border-black"
                onChange={() => setState(notificationMethod.id)}
              />
              <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {notificationMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
