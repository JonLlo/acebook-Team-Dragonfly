import { useEffect, useState } from "react";
import { getMyProfile } from "../../services/user";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileUserPosts from "../../components/ProfileUserPosts";
import "./profilepage.css";
import Navbar from "../../components/Navbar";

export function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(profileData);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfile();
        setProfileData(data);
      } catch (error) {
        setErrorMessage(error.message || "`Failed to load profile");
      }
    }
    loadProfile();
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setProfileData((currentData) => ({
      ...currentData,
      user: updatedUser,
    }));
  };

  const handlePostUpdated = (updatedPost) => {
    setProfileData((currentData) => ({
      ...currentData,
      post: currentData.post.map((post) =>
        post._id === updatedPost._id ? { ...post, ...updatedPost } : post,
      ),
    }));
  };
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <ProfileHeader
          user={profileData.user}
          postsCount={profileData.post.length}
          onProfileUpdated={handleProfileUpdated}
        />
        <ProfileUserPosts
          posts={profileData.post}
          onPostUpdated={handlePostUpdated}
        />
      </div>
    </>
  );
}
