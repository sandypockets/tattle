export default function CheckoutLoadingState() {
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="h-12 bg-gray-200 rounded col-span-2"/>
              <div className="h-12 bg-gray-200 rounded col-span-2"/>
              <div className="h-2 bg-gray-200 rounded col-span-1 mt-3"/>
              <div className="h-8 bg-gray-200 rounded col-span-4"/>
              <div className="h-2 bg-gray-200 rounded col-span-1 mt-3"/>
              <div className="col-span-1" />
              <div className="h-2 bg-gray-200 rounded col-span-1 mt-3"/>
              <div className="h-8 bg-gray-200 rounded col-span-2"/>
              <div className="h-8 bg-gray-200 rounded col-span-2"/>
              <div className="h-2 bg-gray-200 rounded col-span-1 mt-3"/>
              <div className="col-span-1" />
              <div className="h-2 bg-gray-200 rounded col-span-1 mt-3"/>
              <div className="h-8 bg-gray-200 rounded col-span-2"/>
              <div className="h-8 bg-gray-200 rounded col-span-2"/>
            </div>
            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="h-2 bg-gray-200 rounded col-span-2"/>
              <div className="h-2 bg-gray-200 rounded col-span-1"/>
              <div className="col-span-1" />
              <div className="h-8 bg-gray-200 rounded col-span-1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}