import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  return (
    <nav>
      <h1>📰 News Summarizer</h1>
      <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
        <button onClick={() => onSearch(query)}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
