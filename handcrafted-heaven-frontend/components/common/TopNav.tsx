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
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/components/order/useCart";
import CartSidebar from "@/components/order/CartSidebar";
import type { CartItem } from "@/components/order/cartTypes";

export default function TopNav() {
  const { activeModal, openModal, closeModal } = useModalStore();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [showCartModal, setShowCartModal] = useState(false);

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
    router.push("/");
  };

  const NavLinks = () => {
    const { state, totalAmount } = useCart();
    const totalItems = state.items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );

    const linkClasses = (href: string) => {
      const isActive =
        pathname === href ||
        (href.includes("/dashboard") && pathname.includes("/dashboard"));

      return `font-body text-sm transition-all px-2 py-1 rounded ${
        isActive
          ? "text-primary font-semibold underline underline-offset-4"
          : "text-foreground hover:text-primary hover:font-semibold"
      }`;
    };

    return (
      <>
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/about" className={linkClasses("/about")}>
          About
        </Link>
        <Link href="/products" className={linkClasses("/products")}>
          Products
        </Link>

        <button
          onClick={() => setShowCartModal(true)}
          className="relative flex items-center gap-2 text-sm text-foreground font-body hover:text-primary hover:font-semibold transition-all px-2 py-1 rounded"
          aria-label="View Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="ml-4 font-bold text-primary">
            ${totalAmount.toFixed(2)}
          </span>
        </button>

        {user ? (
          <>
            <button
              onClick={handleDashboardRedirect}
              className={linkClasses("/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4 inline-block mr-1" />
              Dashboard
            </button>
            <span className="hidden md:inline text-sm text-neutral-500 font-body">
              Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-foreground font-body hover:text-primary hover:font-semibold transition-all px-2 py-1 rounded"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => openModal("login")}
              className="flex items-center gap-1 text-sm text-foreground font-body hover:text-primary hover:font-semibold transition-all px-2 py-1 rounded"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
            <button
              onClick={() => openModal("register")}
              className="flex items-center gap-1 text-sm text-foreground font-body hover:text-primary hover:font-semibold transition-all px-2 py-1 rounded"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </button>
          </>
        )}
      </>
    );
  };

  const linkClasses = (href: string) => {
    const isActive =
      pathname === href ||
      (href.includes("/dashboard") && pathname.includes("/dashboard"));

    return `font-body text-sm transition-all px-2 py-1 rounded ${
      isActive
        ? "text-primary font-semibold underline underline-offset-4"
        : "text-foreground hover:text-primary hover:font-semibold"
    }`;
  };

  return (
    <header className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-6 py-4 shadow-md font-sans">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="text-2xl font-bold font-heading text-foreground group-hover:text-primary group-hover:font-semibold transition-all cursor-pointer">
            Handcrafted Haven
          </h1>
        </Link>

        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <nav className="hidden md:flex gap-4 items-center">
          <NavLinks />
        </nav>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col gap-4">
            <NavLinks />
          </nav>
        </div>
      )}
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
      <Modal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        title="Your Shopping Cart"
      >
        <CartSidebar />
      </Modal>
    </header>
  );
}
