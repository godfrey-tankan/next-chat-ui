import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7001/api/user/users"
        );
        setUsers(response.data); // Set users from the response data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-white">Loading users...</p>;
  }

  return (
    <div className="overflow-y-auto h-screen pt-4 border-r-4 border-r-gray-700">
      <h1 className="flex items-center text-white text-lg font-bold pt-4 px-4 pb-7 space-x-2">
        <span>Users</span>
        <span>
          <input
            type="search"
            className="p-1 text-gray-900 rounded-md focus:outline-none ml-6"
            placeholder="Search..."
          />
        </span>
      </h1>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => onUserClick(user)}
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user.profilePicture || "https://via.placeholder.com/50"}
            alt={user.username}
          />
          <div className="flex-1 ml-2">
            <span className="text-white font-bold">{user.username}</span>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
