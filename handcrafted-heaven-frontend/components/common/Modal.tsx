export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6 w-full max-w-md">
        {title && (
          <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
            {title}
          </h2>
        )}
        {children}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
