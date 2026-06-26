"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/app/(marketing)/_components/theme";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully!",
      error: "Failed to create note.",
    });
    promise.then((result) => router.push(`/document/${result}`));
  };
  return (
    <>
      <div className="flex flex-col min-h-full bg-background justify-center items-center bg-no-repeat bg-cover bg-center">
        <h2 className="font-bold text-4xl  w-[320px]  sm:w-[518px]">
          Welcome to{" "}
          <span className="text-brand ">
            {user?.firstName}
            &apos;s
          </span>{" "}
          Zettel
        </h2>

        <Button
          onClick={onCreate}
          className={`bg-brand text-brand-foreground dark:text-white font-bold rounded-full px-4 mt-4 hover:bg-brand/90`}
        >
          <Plus />
          Create a Note
        </Button>
      </div>
    </>
  );
};

export default DocumentsPage;
