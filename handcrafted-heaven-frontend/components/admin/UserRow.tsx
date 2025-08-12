"use client";

import { useRouter } from "next/navigation";
import { UserRoundCog } from "lucide-react";
import Image from "next/image";

type Props = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    orders: Array<number>; // You can replace `any` with a proper `Order` type
    seller?: boolean;
    Image?: {
      url: string;
    };
  };
};

export default function UserRow({ user }: Props) {
  const router = useRouter();

  return (
    <tr className="border-t">
      <td className="px-4 py-2 flex items-center gap-2">
        {user.Image?.url && (
          <Image
            src={user.Image.url}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        )}
        {user.name}
      </td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2">{user.orders.length}</td>
      <td className="px-4 py-2">{user.seller ? "Seller" : "Customer"}</td>
      <td className="px-4 py-2">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => router.push(`/admin/dashboard/user/${user.id}`)}
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <UserRoundCog size={18} />
          Manage
        </button>
      </td>
    </tr>
  );
}
