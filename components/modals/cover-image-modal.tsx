"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/Hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import {
  UploaderProvider,
  type CompletedFileState,
} from "@/components/upload/uploader-provider";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    coverImage.onClose();
  };

  const handleUploadCompleted = async (file: CompletedFileState) => {
    await update({
      id: params.documentId as Id<"documents">,
      coverImage: file.url,
    });
    onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <UploaderProvider
          uploadFn={async ({ file, signal, onProgressChange }) => {
            const res = await edgestore.publicFiles.upload({
              file,
              signal,
              onProgressChange,
              options: {
                replaceTargetUrl: coverImage.url,
              },
            });
            return { url: res.url };
          }}
          autoUpload={true}
          onUploadCompleted={handleUploadCompleted}
        >
          <SingleImageDropzone className="w-full outline-none" />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
};
