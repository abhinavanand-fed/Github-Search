import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const SearchForm = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Github username"
      />
      <button type="submit">Search</button>
    </form>
  );
};

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
      <a href={user.html_url}>View on Github</a>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  const handleSearch = async (username) => {
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `TOKEN`
      }
    });
    setUser(res.data);
  };

  return (
    <div className="app">
      <SearchForm onSearch={handleSearch} />
      {user ? <UserDetails user={user} /> : <p>No user found</p>}
    </div>
  );
};

export default App;
