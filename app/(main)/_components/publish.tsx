"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/Hooks/use-origin";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note Published.",
      error: "Failed to Publish Note.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });
    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note Unpublished.",
      error: "Failed to Unpublish Note.",
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button size="sm" className="bg-[#ef8508]">
            Publish
            {initialData.isPublished && <Globe className="  w-4 h-4 ml-2" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8}>
          {initialData.isPublished ? (
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <Globe className="w-4 h-4 animate-pulse" />
                <p className="text-xs font-medium ">
                  This note is live on the web.
                </p>
              </div>
              <div className="flex items-center">
                <input
                  value={url}
                  disabled
                  className="flex px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                />
                <Button
                  onClick={onCopy}
                  disabled={copied}
                  className="h-8 rounded-l-none bg-[#ef8508]"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={onUnpublish}
                size="sm"
                disabled={isSubmitting}
                className="w-full text-xs bg-[#ef8508]"
              >
                Unpublish
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Globe className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-2">Publish this note</p>
              <span className="text-xs text-muted-foreground mb-4">
                Share your work with others.
              </span>
              <Button
                disabled={isSubmitting}
                size="sm"
                className="w-full text-xs  bg-[#ef8508]"
                onClick={onPublish}
              >
                Publish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
