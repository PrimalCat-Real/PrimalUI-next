
import GradientBars from "@/modules/primalui/components/aurora/GradientBars";
import Button from "@/modules/primalui/components/Button";
import SecondTestButton from "@/modules/primalui/components/SecondTestButton";
import TestButton from "@/modules/primalui/components/TestButton";
import Image from "next/image";

import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 p-10 relative z-10">
        <Button className="bg-amber-500" variant={'primary'}>Test</Button>
        <TestButton></TestButton>
        <SecondTestButton></SecondTestButton>

      </div>
      <div className="w-full h-full flex flex-col items-center">
        <GradientBars curvature={1} heightScale={0.3} minBarsHeight={0.3} />
        Test
      </div>
    </div>

  )
}

export default Page