import React from 'react';

function DateInput({
  handleChange,
  label,
  clearAction,
  name,
  value,
}) {
  return (
    <div className="mt-3">
      {label && (
        <label className="form-label" htmlFor={`expenditure-${name}`}>
          {label}
          {clearAction && (
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={() => clearAction()}
              style={{
                paddingLeft: '.5rem',
                paddingTop: '0rem',
                paddingBottom: '0rem',
                paddingRight: '0rem',
              }}
            >
              Clear
            </button>
          )}
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
