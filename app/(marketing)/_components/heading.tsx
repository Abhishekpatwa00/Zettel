"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated } = useConvexAuth();
  return (
    <div className=" flex min-h-screen pt-15 flex-col font-bricolage justify-center max-w-3xl space-y-4">
      <h1 className="text-5xl text-center font-bricolage font-bold  md:text-6xl lg:text-7xl">
        Collect Your
        <br /> Thoughts
      </h1>
      <h3 className="text-brand text-center font-bold  md:text-xl text-lg">
        It is about putting effort
        <br />
        and ideas into action.
      </h3>
      {!isAuthenticated && (
        <SignInButton mode="modal">
          <Button
            size={"sm"}
            className="bg-brand text-brand-foreground dark:text-white mx-auto rounded-full p-4 hover:bg-brand/90"
          >
            <p className=" font-bold">Get Started</p>
          </Button>
        </SignInButton>
      )}
      {isAuthenticated && (
        <Button
          size={"sm"}
          className="bg-brand dark:text-white text-brand-foreground mx-auto rounded-full p-4 hover:bg-brand/90"
        >
          <Link
            href="/document"
            className="text-[#323232] dark:text-white text-l  font-bold"
          >
            Enter Zettel
          </Link>
        </Button>
      )}
    </div>
  );
};
