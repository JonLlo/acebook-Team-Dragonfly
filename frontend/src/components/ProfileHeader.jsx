import { useState } from "react";
import { updateUserProfile } from "../services/user";

function ProfileHeader({ user, postsCount, onProfileUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    surname: user.surname || "",
    email: user.email || "",
    userBiography: user.userBiography || "",
  });

  const handleEditClick = () => {
    setFormData({
      firstName: user.firstName || "",
      surname: user.surname || "",
      email: user.email || "",
      userBiography: user.userBiography || "",
    });
    setError("");
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await updateUserProfile(user._id, formData);
      onProfileUpdated(data.user);
      setIsEditing(false);
    } catch (error) {
      setError(error.message || "Failed to update profile");
    }
  };

  return (
    <section className="profile-header">
      <div className="profile-header__image-container">
        <img
          className="profile-header__image"
          src={user.userImage}
          alt={`${user.firstName} ${user.surname}`}
        />
      </div>

      <div className="profile-header__info">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="userBiography">Biography</label>
              <textarea
                id="userBiography"
                name="userBiography"
                value={formData.userBiography}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>

            {error && <p>{error}</p>}
          </form>
        ) : (
          <>
            <h1>
              {user.firstName} {user.surname}
            </h1>
            {user.userBiography && <p>{user.userBiography}</p>}
            <p>{user.email}</p>
            <p>Posts: {postsCount}</p>

            <button type="button" onClick={handleEditClick}>
              Edit profile
            </button>

            {error && <p>{error}</p>}
          </>
        )}
      </div>
    </section>
  );
}

export default ProfileHeader;
