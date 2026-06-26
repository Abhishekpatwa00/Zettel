"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "./_components/heading";
import { Navbar, Footer } from "./_components/navbar";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/ui/spinner";
const MarketingPage = () => {
  const { isLoading } = useConvexAuth();
  return (
    <div className="flex flex-col min-h-screen dark:bg-[url('/dark-bg.png')] bg-[url('/Bg-white.png')] bg-no-repeat bg-cover bg-center">
      {!isLoading && (
        <div className="flex flex-col items-center justify-center md:justify-center text-start  flex-1 ">
          <Navbar />
          <Heading />
          <Footer />
        </div>
      )}
      {isLoading && (
        <div className="flex dark:text-white justify-center h-full items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default MarketingPage;
