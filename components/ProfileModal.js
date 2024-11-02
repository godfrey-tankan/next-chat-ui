import React from "react";

const ProfileModal = ({
  isModalOpen,
  setIsModalOpen,
  profile,
  handleProfileChange,
  handleProfileSave,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl text-white mb-4">Edit Profile</h2>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleProfileChange}
          className="rounded-md bg-gray-700 text-white focus:outline-none p-2 w-full mb-4"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          className="rounded-md bg-gray-700 text-white focus:outline-none p-2 w-full mb-4"
          placeholder="Email"
        />
        <input
          type="text"
          name="avatar"
          value={profile.avatar}
          onChange={handleProfileChange}
          className="rounded-md bg-gray-700 text-white focus:outline-none p-2 w-full mb-4"
          placeholder="Avatar URL"
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white rounded-md px-4 py-2"
            onClick={handleProfileSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
