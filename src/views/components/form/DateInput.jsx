import React from 'react';

function DateInput({
  handleChange,
  label,
  name,
  value,
}) {
  return (
    <div className="mt-3">
      {label && (
        <label className="form-label" htmlFor={`expenditure-${name}`}>
          {label}
        </label>
      )}
      <input
        type="date"
        className="form-control"
        id={`expenditure-${name}`}
        name={name}
        value={value || ''}
        onChange={(e) => handleChange(e, name)}
      />
    </div>
  );
}

export default DateInput;
