import {LightBulbIcon} from "@heroicons/react/outline";

export default function Banner({ children }) {
  return (
    <section className="mt-4 mb-12 px-8 py-4 bg-blue-400 text-white rounded-lg shadow-lg h-16">
      <div className="flex">
        <div className="text-white h-14 w-14 pr-8 mt-1">
          <LightBulbIcon />
        </div>
        <div className="flex flex-col justify-center mb-0.5">
          {children}
        </div>
      </div>
    </section>
  )
}