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
          <form className="profile-header__form" onSubmit={handleSubmit}>
            <div className="profile-header__field">
              <label htmlFor="firstName">First name</label>
              <input
                className="profile-header__input"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="profile-header__field">
              <label htmlFor="surname">Surname</label>
              <input
                className="profile-header__input"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>

            <div className="profile-header__field">
              <label htmlFor="email">Email</label>
              <input
                className="profile-header__input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="profile-header__field">
              <label htmlFor="userBiography">Biography</label>
              <textarea
                className="profile-header__textarea"
                id="userBiography"
                name="userBiography"
                value={formData.userBiography}
                onChange={handleChange}
              />
            </div>

            <div className="profile-header__button-row">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>

            {error && <p className="profile-header__error">{error}</p>}
          </form>
        ) : (
          <>
            <h1>
              {user.firstName} {user.surname}
            </h1>

            {user.userBiography && (
              <p className="profile-header__bio">{user.userBiography}</p>
            )}

            <p className="profile-header__email">{user.email}</p>

            <div className="profile-header__stats">
              <div className="profile-header__stat">
                <span className="profile-header__stat-number">{postsCount}</span>
                <span className="profile-header__stat-label">
                  {postsCount === 1 ? "Post" : "Posts"}
                </span>
              </div>
            </div>

            <div className="profile-header__button-row">
              <button type="button" onClick={handleEditClick}>
                Edit profile
              </button>
            </div>

            {error && <p className="profile-header__error">{error}</p>}
          </>
        )}
      </div>
    </section>
  );
}

export default ProfileHeader;
