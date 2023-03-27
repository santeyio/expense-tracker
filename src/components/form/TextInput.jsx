import React from 'react';

function TextInput({
  handleChange,
  label,
  name,
  value,
}) {
  return (
    <div className="mt-3">
      <label className="form-label" htmlFor={`expenditure-${name}`}>
        {label}
      </label>
      <input
        className="form-control"
        id={`expenditure-${name}`}
        name={name}
        value={value || ''}
        onChange={(e) => handleChange(e, name)}
      />
    </div>
  );
}

export default TextInput;
