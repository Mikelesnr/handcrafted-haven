// app/context/ModalContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

type ModalType = "login" | "register" | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalStore = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalStore must be used within ModalProvider");
  return context;
};
