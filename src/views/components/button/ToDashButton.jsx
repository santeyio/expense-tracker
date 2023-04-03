import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';

function ToDashButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => navigate('/dash')}
    >
      <CaretLeftFill className="me-2" />
      Dash
    </button>
  );
}

export default ToDashButton;
