import React from "react";

const Search = ({ onSearch }) => {
  return (
    <form className="search-form">
      <input
        onChange={(event) => onSearch(event.target.value)}
        className="form-control "
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </form>
  );
};

export default Search;
