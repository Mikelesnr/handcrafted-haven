"use client";

import UserRow from "./UserRow";

export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Orders</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Joined</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

