import React, { useState } from "react";
import { Search, Edit, Trash2, Plus, Filter, MoreVertical } from "lucide-react";

// Modal component for editing a user
const EditUserModal = ({ user, onClose, onSubmit }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Edit User</h3>
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
              <option value="Business">Business</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={editedUser.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
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

const AdminUsers = () => {
  // Example data remains the same
  const initialUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Business",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "Just now",
    },
    {
      id: 4,
      name: "Inactive User",
      email: "inactive@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2 months ago",
    },
    {
      id: 5,
      name: "Suspended User",
      email: "suspended@example.com",
      role: "Business",
      status: "Suspended",
      lastLogin: "1 week ago",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [userToEdit, setUserToEdit] = useState(null);
  const [activeActionMenu, setActiveActionMenu] = useState(null);

  // Filter users based on search query and role filter
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "All" || user.role === roleFilter)
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setActiveActionMenu(null);
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
      setActiveActionMenu(null);
    }
  };

  const toggleActionMenu = (userId) => {
    setActiveActionMenu(activeActionMenu === userId ? null : userId);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Manage Users</h2>
      </div>

      {/* Search and Filter - More responsive approach */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <Filter className="text-gray-400 w-5 h-5 mr-2" />
          <select
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
          >
            <option value="All">All Roles</option>
            <option value="User">User</option>
            <option value="Business">Business</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Custom styles for breakpoints */}
      <style jsx>{`
        @media (min-width: 1200px) {
          .custom-lg-visible {
            display: block;
          }
          .custom-md-visible {
            display: none;
          }
        }
        @media (max-width: 819px) and (min-width: 768px) {
          .custom-lg-visible {
            display: none;
          }
          .custom-md-visible {
            display: block;
          }
        }
      `}</style>

      {/* Responsive Table with progressive disclosure */}
      <div className="border rounded-lg overflow-hidden">
        {/* Large screen full table - now uses custom breakpoint */}
        <div className="hidden lg:hidden custom-lg-visible">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{user.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{user.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "Business"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Suspended"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-600 hover:text-blue-800 p-1 mr-1"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Medium screen simplified table - now uses custom breakpoint */}
        <div className="hidden md:block lg:block custom-md-visible">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  Name
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Role
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Status
                </th>
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3">
                    <div>
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-sm text-gray-500 truncate">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "Business"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "Suspended"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{user.lastLogin}</div>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-right">
                    <div className="flex justify-end">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-800 p-1 mr-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Small screen card layout */}
        <div className="md:hidden">
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 bg-white relative hover:bg-gray-50">
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => toggleActionMenu(user.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                  
                  {/* Mobile Action Menu */}
                  {activeActionMenu === user.id && (
                    <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-32 z-10">
                      <button
                        onClick={() => openEditModal(user)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mb-3 pr-8">
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "Business"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : user.status === "Suspended"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{user.lastLogin}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default AdminUsers;
