/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TextField, Box } from '@mui/material';
import "../index.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Search Products"
        fullWidth
        value={query}
        onChange={handleSearch}
        className="search-bar" 
      />
    </Box>
  );
};

export default SearchBar;
