import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProfile.css';

function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 👈 Modal open/close
  const [editedProfile, setEditedProfile] = useState({}); // 👈 Form fields data

  useEffect(() => {
    const fetchProfile = async () => {
      const adminId = localStorage.getItem("adminId");

      if (!adminId) {
        setError("Admin ID not found. Please login again.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/admin-profile/${adminId}`);
        setProfile(response.data.admin);

        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
          setProfileImage(storedImage);
        } else {
          setProfileImage("https://via.placeholder.com/150");
        }

      } catch (error) {
        console.error('Profile fetch error:', error);
        setError("Failed to fetch profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    }
  };

  const openEditModal = () => {
    setEditedProfile(profile); // 👈 fill current data in form
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const saveChanges = () => {
    setProfile(editedProfile); // 👈 Update profile info on screen
    setIsEditing(false); // 👈 Close Modal
    // Future me yahan backend update API call bhi kar sakte hain.
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profile || !profile.name) {
    return <div className="loading">Loading Profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <label htmlFor="fileInput" className="edit-image-icon">✏️</label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>

        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Company:</strong> {profile.company}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.number}</p>
          <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
        </div>

        <button className="edit-button" onClick={openEditModal}>
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>
            <input
              type="text"
              name="name"
              value={editedProfile.name || ''}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="email"
              value={editedProfile.email || ''}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="number"
              value={editedProfile.number || ''}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <div className="modal-buttons">
              <button onClick={saveChanges}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
