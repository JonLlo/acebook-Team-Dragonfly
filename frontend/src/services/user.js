const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function updateUserProfile(userId, formData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update profile");
  }

  return data;
}

export async function getMyProfile() {
  const token = localStorage.getItem("token");
  console.log("Token------>>>", token);

  const response = await fetch(`${BACKEND_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch profile");
  }

  return data;
}
