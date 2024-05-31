import React from 'react';

function TextInput({
  handleChange,
  label,
  name,
  value,
  placeholder,
  type = 'text', // 'text' or 'number'
  id,
  handleClear,
}) {
  return (
    <div className="mt-3">
      {label && (
        <label className="form-label" htmlFor={`expenditure-${name}`}>
          {label}
        </label>
      )}
      <div className={handleClear ? 'input-group' : ''}>
        <input
          type={type}
          className="form-control"
          id={id || `expenditure-${name}`}
          name={name}
          value={value || ''}
          onChange={(e) => handleChange(e, name)}
          placeholder={placeholder}
        />
        {handleClear && (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleClear()}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default TextInput;
