//compo
"use client";

import Link from "next/link";
import { useModalStore } from "@/context/ModalContext";
import Modal from "@/components/common/Modal";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function TopNav() {
  const { activeModal, openModal, closeModal } = useModalStore();

  return (
    <header className="bg-background text-foreground flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-xl font-heading">Handcrafted Haven</h1>

      <nav className="flex gap-4 items-center">
        <Link href="/" className="hover:text-secondary font-body">
          Home
        </Link>
        <Link href="/about" className="hover:text-secondary font-body">
          About
        </Link>
        <Link href="/shop" className="hover:text-secondary font-body">
          Shop
        </Link>

        <button
          onClick={() => openModal("login")}
          className="text-sm text-foreground hover:text-secondary font-body"
        >
          Login
        </button>
        <button
          onClick={() => openModal("register")}
          className="text-sm text-foreground hover:text-secondary font-body"
        >
          Register
        </button>
      </nav>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        title="Login"
      >
        <LoginForm onSuccess={closeModal} />
      </Modal>

      <Modal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        title="Register"
      >
        <RegisterForm onSuccess={closeModal} />
      </Modal>
    </header>
  );
}
