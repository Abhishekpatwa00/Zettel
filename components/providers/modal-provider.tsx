"use client";
import { useEffect, useState } from "react";
import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { SettingsCommand } from "@/components/modals/settings-command";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <SettingsCommand />
      <CoverImageModal />
    </div>
  );
};
