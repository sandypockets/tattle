import { useEffect } from "react";

export default function Message({ showMessage, setShowMessage, isSuccess, sectionName }) {

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false)
      }, 10000)
    }
  }, [showMessage])

  if (isSuccess) {
    return (
      <div className="bg-green-300 h-8 px-2 rounded-lg">
        <p>Your {sectionName} was updated successfully <span onClick={() => setShowMessage(false)}>X</span></p>
      </div>
    )
  } else {
    return (
      <div className="bg-red-300 h-7 px-2 rounded-lg">
        <p>Your {sectionName} was updated successfully <span onClick={() => setShowMessage(false)}>X</span></p>
      </div>
    )
  }
}