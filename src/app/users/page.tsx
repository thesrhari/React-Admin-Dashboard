"use client";

import { useState, useEffect } from "react";
import { columns } from "@/components/ui/Columns";
import { DataTable } from "@/components/ui/DataTable";
import { CreateUser } from "@/components/ui/CreateUser";
import axios from "axios";
import Spinner from "@/components/ui/Spinner";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-start justify-between gap-5">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        </div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-start justify-between gap-5">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <div className="flex items-start gap-2">
          <CreateUser />
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </div>
  );
};

export default UsersPage;
