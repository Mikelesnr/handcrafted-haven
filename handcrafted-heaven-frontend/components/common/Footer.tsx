// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 py-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm">
          © {new Date().getFullYear()} Handcrafted Haven. Built with next.js and
          node express.
        </div>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
