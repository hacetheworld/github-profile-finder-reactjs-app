import React, { useState } from "react";
// import './styles.css';

const GithubProfileFinder = () => {
  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async () => {
    setLoading(true);
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setLoading(false);
    setUserProfile(data);
  };

  return (
    <div className="container">
      <h1>Find a GitHub Profile</h1>
      <input
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button onClick={fetchUserProfile} disabled={!username}>
        {loading ? "Loading..." : "Search"}
      </button>
      {userProfile && (
        <div className="profile-card">
          <img
            src={userProfile.avatar_url}
            alt={`${userProfile.login}'s avatar`}
          />
          <h2>{userProfile.login}</h2>
          <p>{userProfile.bio}</p>
          <a href={userProfile.html_url}>View profile</a>
        </div>
      )}
    </div>
  );
};

export default GithubProfileFinder;
