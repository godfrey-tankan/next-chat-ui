// pages/edit-profile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EditProfile = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:7001/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setProfilePicture(userData.profilePicture);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:7001/api/user/profile",
        {
          username,
          email,
          profilePicture,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        router.push("/chat");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Error display */}
      {successMessage && (
        <div className="text-green-500">{successMessage}</div>
      )}{" "}
      {/* Success message display */}
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
