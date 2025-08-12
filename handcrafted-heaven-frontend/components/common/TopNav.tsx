"use client";

import Link from "next/link";
import { useState } from "react";
import { useModalStore } from "@/context/ModalContext";
import Modal from "@/components/common/Modal";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import {
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
  UserCircle,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const { activeModal, openModal, closeModal } = useModalStore();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleDashboardRedirect = () => {
    if (!user) return;

    switch (user.role) {
      case "SELLER":
        router.push("/seller/dashboard");
        break;
      case "ADMIN":
        router.push("/admin/dashboard");
        break;
      default:
        router.push("/customer/dashboard");
        break;
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-secondary font-body">
        Home
      </Link>
      <Link href="/about" className="hover:text-secondary font-body">
        About
      </Link>
      <Link href="/shop" className="hover:text-secondary font-body">
        Shop
      </Link>

      {!user && (
        <>
          <button
            onClick={() => openModal("login")}
            className="flex items-center gap-1 text-sm text-foreground hover:text-secondary font-body"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
          <button
            onClick={() => openModal("register")}
            className="flex items-center gap-1 text-sm text-foreground hover:text-secondary font-body"
          >
            <UserPlus className="w-4 h-4" />
            Register
          </button>
        </>
      )}

      {user && (
        <>
          <button
            onClick={handleDashboardRedirect}
            className="flex items-center gap-1 text-sm text-foreground hover:text-secondary font-body"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
          <span className="flex items-center gap-1 text-sm font-body text-foreground">
            <UserCircle className="w-4 h-4" />
            {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-foreground hover:text-secondary font-body"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-background text-foreground px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading">Handcrafted Haven</h1>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 items-center">
          <NavLinks />
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 mt-4 md:hidden">
          <NavLinks />
        </nav>
      )}

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
