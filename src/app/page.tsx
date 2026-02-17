
import Button from "@/modules/primalui/components/Button";
import SecondTestButton from "@/modules/primalui/components/SecondTestButton";
import TestButton from "@/modules/primalui/components/TestButton";
import Image from "next/image";

import React from 'react'

const Page = () => {
  return (
    <div className="flex gap-2 p-10">
      <Button className="bg-amber-500" variant={'primary'}>Test</Button>
      <TestButton></TestButton>
      <SecondTestButton></SecondTestButton>
    </div>
  )
}

export default Page