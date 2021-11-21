import CardTitle from "../../Global/CardTitle";
import Card from "../../Global/Card";
import Button from "../../Global/Button";
import Image from 'next/image'

export default function Avatar() {

  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <CardTitle>Avatar</CardTitle>
          <p className="mb-8">Update your profile photo</p>
        </div>
        <div className="flex flex-row-reverse mr-36">
          <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 height={120}
                 width={120}
                 className="rounded-full"
          />
          {/*<div className="max-w-min mx-auto mt-8 mr-12">*/}
          {/*  <Button>Upload</Button>*/}
          {/*</div>*/}
        </div>
      </div>


    </Card>
  )
}