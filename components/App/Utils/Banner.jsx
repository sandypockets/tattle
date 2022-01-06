import { LightBulbIcon } from "@heroicons/react/outline";

export default function Banner({ children }) {
  return (
    <section className="mt-4 mb-12 px-8 py-4 bg-yellow-300 text-black rounded-lg shadow-lg min-h-fit">
      <div className="flex">
        <div className="text-black h-6 w-6 mt-1 mr-8">
          <LightBulbIcon />
        </div>
        <div className="flex flex-col justify-center mb-0.5">
          {children}
        </div>
      </div>
    </section>
  )
}