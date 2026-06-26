// @ts-nocheck
"use client";

import { usePathname, useParams, useRouter } from "next/navigation";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { UserItems } from "./user-items";
import { TrashBox } from "./trash-box";
import { Navbar } from "./navbar";

import { useState, useRef, useEffect, type ElementRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./items";
import { toast } from "sonner";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { DocumentList } from "./document-list";
import { SearchCommand } from "@/components/search-command";
import { useSearch } from "../../../Hooks/use-search";
import { useSettings } from "../../../Hooks/use-settings";

export const Navigation = () => {
  const pathname = usePathname();
  const search = useSearch();
  const settings = useSettings();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const isResizingRef = useRef(false);
  const navbarRef = useRef<ElementRef<"nav">>(null);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(isMobile);

  const create = useMutation(api.documents.create);
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    addEventListener("mousemove", handleMouseMove);
    addEventListener("mouseup", handleMouseUp);
  };
  const ResetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "300px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 300px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "0" : `300px`);
      setTimeout(() => setIsResetting(false), 310);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 250) newWidth = 250;
    if (newWidth > 600) newWidth = 600;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const Collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      Collapse();
    } else {
      ResetWidth();
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      Collapse();
    }
  }, [pathname, isMobile]);

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully!",
      error: "Failed to create note.",
    });
    promise.then((result) => router.push(`/document/${result}`));
  };

  return (
    <>
      <aside
        className={cn(
          `group/sidebar h-full bg-gray-200 dark:bg-secondary overflow-y-auto relative flex w-60 flex-col z-40 `,
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
          isCollapsed && "w-0 transition-all ease-in-out duration-300",
          !isCollapsed && "w-60 transition-all ease-in-out duration-300",
        )}
        ref={sidebarRef}
      >
        <div
          onClick={Collapse}
          role="button"
          className={cn(
            " h-8 w-8 text-muted-foreground rounded-sm hover:bg-neutral-300 transition dark:bg-neutral-600 absolute top-4 right-4 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="h-8 w-8 bg-brand dark:text-white text-brand-foreground rounded-[8px]" />
        </div>
        <div>
          <UserItems />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>

        <div className="mt-4">
          <DocumentList />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={ResetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-30 left-60 w-[calc(100%-240px)] transition-all ease-in-out duration-300",
          isMobile && "w-full left-0",
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={ResetWidth} />
        ) : (
          <nav className=" px-3 py-2 w-full transition-all ease-in-out duration-300">
            {isCollapsed && (
              <MenuIcon
                className="p-1 mt-2 ml-1 text-brand-foreground dark:text-white  bg-brand h-8 w-8 rounded-[8px]"
                role="button"
                onClick={ResetWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
