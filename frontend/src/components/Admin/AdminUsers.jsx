import React, { useState } from "react";

// Modal component for editing a user
const EditUserModal = ({ user, onClose, onSubmit }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...user, ...editedUser });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageUsers = () => {
  const initialUsers = [
    { id: 1, name: "Alice", role: "User", email: "alice@example.com" },
    { id: 2, name: "Bob", role: "Admin", email: "bob@example.com" },
    { id: 3, name: "Charlie", role: "User", email: "charlie@example.com" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [userToEdit, setUserToEdit] = useState(null);

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
  };

  const closeEditModal = () => {
    setUserToEdit(null);
  };

  const handleEditSubmit = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    closeEditModal();
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="bg-white rounded p-6 shadow relative">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Users Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="p-3"></th> {/* Action column header removed */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => openEditModal(user)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {userToEdit && (
        <EditUserModal
          user={userToEdit}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default ManageUsers;
