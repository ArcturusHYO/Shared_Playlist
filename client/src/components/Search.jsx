import React from 'react';
import { FormControl } from 'react-bootstrap';

const Search = (props) => {
  const {
    placeholder, onSearchChange, name, value,
  } = props;
  return (
    <FormControl
      type="text"
      placeholder={placeholder}
      onChange={(e) => onSearchChange(e.target.value)}
      name={name}
      value={value}
    />
  );
};

export default Search;
