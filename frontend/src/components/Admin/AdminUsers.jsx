import React, { useState } from "react";
import { Search, Trash2, Filter, MoreVertical } from "lucide-react";
import { useAllUsers } from "../../hooks/tanstack/useAdminFunctions";
import axios from "axios";

// Helper function to get the session token from cookie
const getSessionToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("__session=")) {
      return cookie.substring("__session=".length, cookie.length);
    }
  }
  return null;
};

// Confirmation Modal Component
const DeleteConfirmationModal = ({ user, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-red-600 mb-2">
          Confirm Deletion
        </h3>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-medium">{user.name}</span>?
        </p>
        <div className="bg-red-50 p-3 rounded-md mb-4">
          <p className="text-red-800 text-sm">
            <strong>Warning:</strong> This action is destructive and cannot be
            undone. All user data, applications, and history will be permanently
            lost.
          </p>
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
            type="button"
            onClick={onConfirm}
            className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  // Replace static data with useAllUsers hook
  const { data: users = [], isLoading, error, refetch } = useAllUsers();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // Helper function to get role display color
  const getRoleColorClass = (role) => {
    const normalizedRole = (role || "user").toLowerCase();
    if (normalizedRole === "admin") {
      return "bg-blue-100 text-blue-800";
    } else if (normalizedRole === "business") {
      return "bg-purple-100 text-purple-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get role display text
  const getRoleDisplayText = (role) => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  // Filter users based on search query and role filter
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "All" ||
        (user.role || "user").toLowerCase() === roleFilter.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setActiveActionMenu(null);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const sessionToken = getSessionToken();
      await axios.post(
        "http://localhost:8080/deleteuser",
        { user_id: userToDelete.user_id },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      // Refetch users after deletion
      refetch();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const toggleActionMenu = (userId) => {
    setActiveActionMenu(activeActionMenu === userId ? null : userId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
        <div className="bg-red-50 p-4 rounded-md">
          <h3 className="text-red-800 font-medium">Error loading users</h3>
          <p className="text-red-700 mt-1">
            {error.message || "Failed to load users. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Manage Users</h2>
      </div>

      {/* Search and Filter */}
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
            <option value="user">User</option>
            <option value="business">Business</option>
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

      {/* No users message */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-600">
            {searchQuery || roleFilter !== "All"
              ? "No users match your search criteria."
              : "There are no users in the system."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {/* Large screen full table */}
          <div className="hidden lg:hidden custom-lg-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.image && (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-8 w-8 rounded-full mr-3 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/32?text=User";
                            }}
                          />
                        )}
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColorClass(
                          user.role
                        )}`}
                      >
                        {getRoleDisplayText(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => openDeleteModal(user)}
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

          {/* Medium screen simplified table */}
          <div className="hidden md:block lg:block custom-md-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/4">
                    Name
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Role
                  </th>
                  <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="px-3 py-3">
                      <div className="flex items-center">
                        {user.image && (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-8 w-8 rounded-full mr-3 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/32?text=User";
                            }}
                          />
                        )}
                        <div>
                          <div className="font-medium truncate">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColorClass(
                          user.role
                        )}`}
                      >
                        {getRoleDisplayText(user.role)}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-right">
                      <div className="flex justify-end">
                        <button
                          onClick={() => openDeleteModal(user)}
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
                <div
                  key={user.user_id}
                  className="p-4 bg-white relative hover:bg-gray-50"
                >
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleActionMenu(user.user_id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Mobile Action Menu */}
                    {activeActionMenu === user.user_id && (
                      <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-32 z-10">
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 pr-8 flex items-center">
                    {user.image && (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/40?text=User";
                        }}
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-lg">{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColorClass(
                        user.role
                      )}`}
                    >
                      {getRoleDisplayText(user.role)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <DeleteConfirmationModal
          user={userToDelete}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminUsers;
