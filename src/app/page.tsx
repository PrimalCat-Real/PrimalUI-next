
import GlassGradinetBars from "@/modules/primalui/components/aurora/GlassGradinetBars";
import GradientBars from "@/modules/primalui/components/aurora/GradientBars";
import Button from "@/modules/primalui/components/Button";
import SecondTestButton from "@/modules/primalui/components/SecondTestButton";
import TestButton from "@/modules/primalui/components/TestButton";
import GradientText from "@/modules/primalui/components/text/GradientText";
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
        {/* <GradientBars curvature={1} heightScale={0.3} minBarsHeight={0.3}>
          <GradientText>Shine gradient text</GradientText>
          <GradientText render={<h1 />}>This is h1</GradientText>
        </GradientBars> */}
        <div className="w-1/2 h-1/2 flex relative">
          <GlassGradinetBars bars={7}>

          </GlassGradinetBars>
          <svg width="1957" height="531" viewBox="0 0 1957 531" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="120.404" cy="472.363" rx="120.404" ry="472.363" transform="matrix(0.716952 0.697122 -0.960942 0.276749 907.827 75.563)" fill="#FF1DEC" />
            <ellipse cx="92.3931" cy="362.471" rx="92.3931" ry="362.471" transform="matrix(0.716952 0.697122 -0.960942 0.276749 822.31 125.503)" fill="#FECDF8" />
            <ellipse cx="119.055" cy="478.581" rx="119.055" ry="478.581" transform="matrix(-0.684223 0.729273 -0.967175 -0.25411 1166.27 243.224)" fill="#FF1DEC" />
            <ellipse cx="72.0292" cy="388.278" rx="72.0292" ry="388.278" transform="matrix(-0.684223 0.729273 -0.967175 -0.25411 1041.15 260.543)" fill="#FECDF8" />
            <ellipse cx="114.158" cy="562.029" rx="114.158" ry="562.029" transform="matrix(-0.684223 0.729273 -0.967175 -0.25411 1956.61 364.419)" fill="#FF1DEC" />
            <ellipse cx="60.6757" cy="327.076" rx="60.6757" ry="327.076" transform="matrix(-0.684223 0.729273 -0.967175 -0.25411 1744.37 357.274)" fill="#FECDF8" />
            <ellipse cx="110.318" cy="516.912" rx="110.318" ry="516.912" transform="matrix(0.393739 0.919222 -0.992883 0.119095 1867.02 26.5062)" fill="#FF1DEC" />
            <ellipse cx="60.3141" cy="338.816" rx="60.3141" ry="338.816" transform="matrix(0.393739 0.919222 -0.992883 0.119095 1681.37 97.7363)" fill="#FECDF8" />
            <ellipse cx="125.335" cy="375.095" rx="125.335" ry="375.095" transform="matrix(0.393739 0.919222 -0.992883 0.119095 1290.5 17.49)" fill="#FF1DEC" />
            <ellipse cx="74.5411" cy="283.266" rx="74.5411" ry="283.266" transform="matrix(0.393739 0.919222 -0.992883 0.119095 1159.57 82.2845)" fill="#FECDF8" />
          </svg>

        </div>


      </div>
    </div >

  )
}

export default Page