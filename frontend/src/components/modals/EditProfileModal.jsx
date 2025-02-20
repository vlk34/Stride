import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const EditProfileModal = ({ isOpen, onClose, onUpdate, userData }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    about: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when modal opens or user data changes
  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        name: userData.name || "",
        role: userData.role || "",
        description: userData.description || "",
        about: userData.about || "",
      });
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the optimistic update handler first
      onUpdate(formData);

      // Wait for both updates to complete
      await Promise.all([
        // Update metadata
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            role: formData.role,
            description: formData.description,
            about: formData.about,
          },
        }),
        // Update user's name if changed
        formData.name !== user.fullName &&
          (async () => {
            const [firstName, ...lastNameParts] = formData.name.split(" ");
            await user.update({
              firstName,
              lastName: lastNameParts.join(" "),
            });
          })(),
      ]);

      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsSubmitting(false);
      // The Profile component will handle reverting the optimistic update
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About
              </label>
              <textarea
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
