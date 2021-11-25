export function Message({ setShowMessage, isSuccess, sectionName }) {
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