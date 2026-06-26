// @ts-nocheck

"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ModeToggle } from "./theme";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useConvexAuth } from "convex/react";
import { SignOutButton, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MenuIcon() {
  const { setTheme } = useTheme();
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [isOpen, setIsOpen] = useState(false);
  const OpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button variant={"ghost"} size={"icon"} onClick={OpenMenu}>
        <Menu className={`w-20 h-20  ${isOpen ? "hidden" : "flex"}`} />
      </Button>
      <div
        className={`fixed z-150 top-0 left-0 w-full flex items-center justify-center h-screen flex-col transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"} bg-[#323232] dark:bg-white gap-y-4`}
      >
        <X
          onClick={OpenMenu}
          className=" absolute top-8 left-6 dark:text-[#323232] text-white"
        />
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button
                variant={"ghost"}
                className="font-bold text-white dark:text-[#323232]"
              >
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button
                size={"sm"}
                className="dark:bg-background bg-white mx-auto rounded-full p-4 "
              >
                <p className="text-brand  font-bold">Get Zettel free</p>
              </Button>
            </SignInButton>
          </>
        )}
        {isLoading && (
          <div className="flex dark:text-white justify-center h-full items-center">
            <Spinner />
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex flex-col space-y-4 items-center">
            <Button
              size={"sm"}
              className="dark:bg-background bg-white mx-auto rounded-full p-4  text-brand"
            >
              <Link href="/document">Enter Zettel</Link>
            </Button>
            <UserButton afterSignOutUrl="/" align="end" />
          </div>
        )}

        <div className="flex flex-col justify-center items-center self-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] text-[#323232] w-[1.2rem] dark:text-[#323232] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] text-white w-[1.2rem] dark:text-[#323232] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
