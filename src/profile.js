import React, { useState, useEffect } from "react";
const GithubProfileFinder = () => {
  const [username, setUsername] = useState("hacetheworld");
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      // console.log(data, "resp");

      if (data.id !== undefined) {
        setUser(data);
        // console.log(data, "resp");
        setMessage("");
      } else {
        setMessage(data.message);
      }
    };

    const fetchRepos = async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5`
      );
      const data = await response.json();
      if (user) {
        setRepos(data);
      }
    };

    if (username !== "") {
      fetchUser();
      fetchRepos();
    }
  }, [username]);

  return (
    <div>
      <p>
        Designed by Ajay Meena :{" "}
        <a href="https://www.linkedin.com/in/ajay-meena1/">linkdin</a>
      </p>
      <div className="github-profile-finder">
        {message !== "" && <div>{message}</div>}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a GitHub username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        {user !== "" && (
          <>
            <div className="user-info">
              <img src={user.avatar_url} alt={user.name} className="avatar" />
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
              <ul>
                <li>{user.followers} followers</li>
                <li>{user.following} following</li>
                <li>{user.public_repos} repositories</li>
              </ul>
            </div>
            <div className="user-repos">
              <h2>Latest Repositories</h2>
              <ul>
                {repos.length &&
                  repos.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GithubProfileFinder;
