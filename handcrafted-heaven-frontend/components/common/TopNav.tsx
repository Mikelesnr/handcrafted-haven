// app/components/common/TopNav.tsx
"use client";

export default function TopNav() {
  return (
    <header className="bg-background text-foreground flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-xl font-heading">Handcrafted Haven</h1>
      <nav className="flex gap-4">
        <a href="/" className="hover:text-secondary font-body">
          Home
        </a>
        <a href="/about" className="hover:text-secondary font-body">
          About
        </a>
        <a href="/shop" className="hover:text-secondary font-body">
          Shop
        </a>
      </nav>
    </header>
  );
}
