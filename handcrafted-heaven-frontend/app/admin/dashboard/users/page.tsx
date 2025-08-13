"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import UserTable from "@/components/admin/UserTable";
import Pagination from "@/components/admin/Pagination";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    api
      .get("/admin/users", { params: { page, limit: 10 } })
      .then((res) => {
        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Failed to fetch users:", err))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <>
          <UserTable users={users} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

