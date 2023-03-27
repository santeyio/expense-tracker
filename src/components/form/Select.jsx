import React from 'react';

function Select({
  handleChange,
  label,
  name,
  value,
  options = [],
}) {
  return (
    <div className="mt-3">
      <label className="form-label" htmlFor={`expenditure-${name}`}>
        {label}
      </label>
      <select
        className="form-select"
        id={`expenditure-${name}`}
        name={name}
        value={value}
        onChange={(e) => handleChange(e, name)}
      >
        {options.map(option => (
          <option value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
