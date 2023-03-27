import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// utils
import { useWebSocketWithAuth } from './auth';

const API_BASE = process.env.REACT_APP_WEBSOCKET_URL;

/* eslint-disable */
export function ListenForExpenditures() {
  const dispatch = useDispatch();
  const { id: householdID } = useSelector(store => store.user.household);

  const socketURL = `${API_BASE}/expenditure/${householdID}/`;

  const { lastJsonMessage } = useWebSocketWithAuth(socketURL);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.id) {
      dispatch({ type: 'ADD_EXPENDITURE', expenditure: lastJsonMessage });
    }
  }, [lastJsonMessage]);

  return <div style={{ display: 'none' }} />;
}

export function temp() {
  console.log('wtf');
}
