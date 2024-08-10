import React from "react";
import categories from "./categories";

const Filter = ({ onSelectCategory }) => {
  return (
    <div className="mb-3 filter-dropdown">
      <select
        className="form-select"
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
