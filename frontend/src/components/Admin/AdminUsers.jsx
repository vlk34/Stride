// src/pages/admin/ManageUsers.jsx
import React from "react";

const ManageUsers = () => {
  // Example mock data
  const mockUsers = [
    { id: 1, name: "Alice", role: "User", email: "alice@example.com" },
    { id: 2, name: "Bob", role: "Admin", email: "bob@example.com" },
    { id: 3, name: "Charlie", role: "User", email: "charlie@example.com" },
  ];

  return (
    <div className="bg-white rounded p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <button className="text-blue-600 hover:underline mr-3">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
