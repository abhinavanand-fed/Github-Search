import React, { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
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
  const data = [
    { name: "Public Repos", value: user.public_repos },
    { name: "Public Gists", value: user.public_gists },
    { name: "Followers", value: user.followers },
    { name: "Following", value: user.following },
  ];

  return (
    <div className="user-details">
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
      <a href={user.html_url}>View on Github</a>
      <BarChart width={400} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `XXXXXXXXXXXX`
        }
      });
      setUser(res.data);
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="app">
      <SearchForm onSearch={handleSearch} />
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <UserDetails user={user} />
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default App;
