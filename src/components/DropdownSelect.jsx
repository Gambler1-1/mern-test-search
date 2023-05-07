import React from 'react';
import '../styles.css';

const DropdownSelect = (props) => {
  const { options, value, onChange } = props;

  return (
    <select value={value} onChange={onChange} className="dropdown-select">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;
