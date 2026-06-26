"use client";
import { ChevronsLeftRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, SignOutButton } from "@clerk/nextjs";

export const UserItems = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex py-2 items-center max-w-[150px]">
            <Avatar className="h-5 w-5 ">
              <AvatarImage src={user?.imageUrl} alt={user?.name} />
            </Avatar>
            <span className="text-start  line-clamp-1 font-medium">
              {user?.fullName}&apos;s Zettel
            </span>
          </div>
          <ChevronsLeftRight className="h-4 w-4 ml-2 text-muted-foreground rotate-90 " />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 "
        align="start"
        alignOffset="11"
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex items-center gap-x-2">
            <div className="rounded-medium bg-secondary p-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={user?.imageUrl} alt={user?.Name} />
              </Avatar>
            </div>
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="w-full cursor-pointer text-muted-foreground"
          >
            <SignOutButton>Log Out</SignOutButton>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
