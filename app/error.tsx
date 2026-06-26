"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideKeyRound } from "lucide-react";

export const Error = () => {
  return (
    <div className="bg-[url('/Error.png')] sm:gap-3  gap-6 md:gap-0 p-6 items-center gap-50  bg-no-repeat bg-cover bg-center flex flex-col h-[100vh]">
      <div className="flex items-center self-start  justify-start gap-0.5 ">
        <img src="/white-logo.png" alt="icon" className="w-8 h-8 self-center" />
        <p className="font-bricolage text-white font-bold text-2xl self-center">
          Zettel
        </p>
      </div>

      <div className=" p-6 mt-[4rem] sm:mt-30 md:mt-30 lg:mt-[90px]">
        <p className="text-center text-white font-bold leading-tight font-bricolage text-[100px] sm:text-[100px] md:text-[120px] lg:text-[140px]">
          Oops!
        </p>
        <p className="  text-center  text-white font-bold text-[40px] md:text-[80px] sm:text-[60px] lg:text-[103px]">
          Page Not Found
        </p>
      </div>
      <div className="px-6 lg:mt-[-10px] mt-[-200px] sm:mt-[-20px] ">
        <Button
          className={`bg-white text-[#ef8508] hover:bg-white/90 w-[180px] h-[50px] text-xl lg:w-[280px] lg:h-[60px] rounded-full font-bold text-2xl  `}
        >
          <Link href="/document">Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;
