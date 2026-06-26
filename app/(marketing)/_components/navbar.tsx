// @ts-nocheck
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useScrollTop } from "@/Hooks/use-scroll-top";
import { ModeToggle } from "./theme";
import { MenuIcon } from "./menu";
import { useConvexAuth } from "convex/react";
import { SignOutButton, SignInButton, UserButton } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "next-themes";
export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 fixed top-0 justify-between flex items-center w-full p-6",
        scrolled
          ? "border-b shadow-sm  backdrop-blur-xs  duration-500"
          : "duration-300",
      )}
    >
      <div className="flex items-center justify-start gap-0.5 ">
        <img
          src="/edited-photo.png"
          alt="icon"
          className="w-8 h-8 self-center"
        />
        <p className="font-bricolage font-bold text-2xl self-center">Zettel</p>
      </div>
      <div className="flex gap-x-4 items-center hidden sm:flex ">
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button
                variant={"ghost"}
                className="font-bold  text-[#323232] dark:text-white"
              >
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button
                size={"sm"}
                className="bg-brand mx-auto rounded-full p-4 hover:bg-brand/90"
              >
                <p className="text-[#323232] dark:text-white  font-bold">
                  Get Zettel free
                </p>
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button
              size={"sm"}
              className="bg-brand mx-auto rounded-full p-4 hover:bg-brand/90"
            >
              <Link
                href="/document"
                className="text-[#323232] dark:text-white  font-bold"
              >
                Enter Zettel
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        {isLoading && (
          <div className="flex dark:text-white justify-center h-full items-center">
            <Spinner />
          </div>
        )}

        <ModeToggle />
      </div>
      <div className="sm:hidden">
        <MenuIcon />
      </div>
    </div>
  );
};

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="flex  bg-background items-center justify-between w-full   m-0 ">
      <div className="flex md:justify-between md:flex-row flex-col sm:gap-4 items-center   gap-x-2 text-muted-foreground overflow-hidden w-full h-[160px]   py-0 px-6">
        <div className="  md:ml-[-80px] ml-[-50px] md:mt-2  lg:mt-3 mt-12 gap-2  flex self-start items-center justify-center gap-2">
          {theme === "dark" ? (
            <img
              src="/white-logo.png"
              alt="Zettel"
              className=" w-[120px] md:w-[160px]   text-grey opacity-20"
            />
          ) : (
            <img
              src="/dark-logo.png"
              alt="Zettel"
              className=" w-[120px] md:w-[160px]    text-grey opacity-20"
            />
          )}
          <p className="font-extrabold md:text-[150px] text-[110px] dark:text-white opacity-20 text-black  ">
            Zettel
          </p>
        </div>
        <div className="mt-[-200px] md:mt-0 md:flex-col lg:flex-row items-start flex gap-2">
          <Button variant={"ghost"} size="sm">
            Privacy Policy
          </Button>
          <Button variant={"ghost"} size="sm">
            Terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  );
};
