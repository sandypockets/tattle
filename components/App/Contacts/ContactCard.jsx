import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GridCard from "../../Global/GridCard";

export default function ContactCard({ contact }) {
  const router = useRouter()

  // set goal as urgent if due in the next 24 hours
  useEffect(() => {
    const dayInUnixTime = 86400
    const unixDueDate = new Date(contact['created_at']).getTime() / 1000
    const timeLeft = unixDueDate - dayInUnixTime
    const dateNow = Date.now().toString().slice(0, -3)
  }, [contact])

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        return router.push({
          pathname: '/app/contacts/[id]',
          query: { id: contact.id },
        })
      }}>
      <GridCard>
        <h2 className="font-extrabold text-gray-900 bg-white text-lg mb-2 truncate">{contact.name}</h2>
        <h2 className="font-extrabold text-gray-900 bg-white text-lg mb-2 truncate">{contact.phone}</h2>
        <h2 className="font-extrabold text-gray-900 bg-white text-lg mb-2 truncate">{contact.created_at}</h2>
      </GridCard>
    </div>
  )
}