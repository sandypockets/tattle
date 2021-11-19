import AppLayout from "../../components/App/Layout/AppLayout";
import CardTitle from "../../components/Global/CardTitle";
import Button from "../../components/Global/Button";
import Card from "../../components/Global/Card";
import Banner from "../../components/App/Banner";
import GoalsEmptyState from "../../components/App/Goals/GoalsEmptyState";
import Link from 'next/link'

export default function Goals() {
  return (
    <AppLayout>
      <div className="flex justify-between">
        <CardTitle>Goals</CardTitle>
        <div className="max-w-min">
          <Button>Create</Button>
        </div>
      </div>
      <Banner>
        <p className="h-12">Before you can create a goal, you need to{' '}
          <Link href="/app/contacts">
            <a className="text-yellow-200">
              create a contact
            </a>
          </Link>
          .</p>
      </Banner>
      <Card>
        <CardTitle>Manage your goals</CardTitle>
        <p className="my-4">Add your mom, your best friend, or anyone else that will help keep you accountable.</p>
        <p>After saving a contact, you can assign the contact to any goals you create.</p>
      </Card>
      <Card>

        <GoalsEmptyState />
      </Card>
    </AppLayout>
  )
}