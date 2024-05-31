import React from 'react';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';

function Caret({
  isOpen = false,
  style = {},
  className = '',
}) {
  return isOpen ? (
    <CaretUpFill style={style} className={className} />
  ) : (
    <CaretDownFill style={style} className={className} />
  );
}

export default Caret;
