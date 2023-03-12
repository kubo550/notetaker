import { Keyboard } from "./Keyboard";
import { MotionWordCardDisplay } from "@/components/MotionWordCardDisplay";
import { WordInput } from "@/components/WordInput";
import Image from "next/image";
import { useEffect, useState } from "react";


function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  withinBounds?: boolean
): number {
  const normalizedValue: number = (value - start1) / (stop1 - start1);

  let mappedValue: number = (normalizedValue * (stop2 - start2)) + start2;

  if (withinBounds) {
    if (mappedValue < start2) {
      mappedValue = start2;
    } else if (mappedValue > stop2) {
      mappedValue = stop2;
    }
  }

  return mappedValue;
}





export const MotionWordCards: React.FC<{wps: number}> = ({wps}) => {
  const baseRotation = 90;


  const needleRotation = wps + baseRotation;

  // const rotatonClass = `rotate-[${needleRotation}deg]`;
  // console.log(rotatonClass);

  return (
    <div className="flex w-full flex-1 flex-col justify-center align-middle ">

      <div className="mb-auto">


        <MotionWordCardDisplay />

        <WordInput />

        <Keyboard />
      </div>

      {/*<GuessStats />*/}

      {/* Speedometer */}


      <div className="relative">
        <Image
          className={"absolute bottom-0 left-1/2 transform -translate-x-1/2"}
          src="/images/dashboard.png"
          alt="car dashboard speedometer"
          width={500}
          height={199}
        />

        <span className={'absolute left-1/2 transform -translate-x-1/2 -translate-y-9 text-xl'}>

          {wps} WPS

        </span>

        <span
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[70px] `}>
            <Image
              className=""
              style={{ transform: `rotate(${needleRotation}deg)` }}
              src="/images/needle.png"
              alt="car dashboard needle"
              width={256}
              height={256}
            />

          </span>
      </div>

    </div>
  );
};

