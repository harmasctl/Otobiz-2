import { useState } from "react";

export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<() => void>(() => {});
  const [message, setMessage] = useState("");

  const confirm = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setCallback(() => onConfirm);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    callback();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
