import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// utils
import { useWebSocketWithAuth } from './auth';

const API_BASE = process.env.REACT_APP_WEBSOCKET_URL;

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

export function ListenForCategories() {
  const dispatch = useDispatch();
  const { id: householdID } = useSelector(store => store.user.household);
  const { categories } = useSelector(store => store.expenses);

  const socketURL = `${API_BASE}/expenditure-category/${householdID}/`;

  const { lastJsonMessage } = useWebSocketWithAuth(socketURL);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.id) {
      const existingCategoryIndex = categories.findIndex(c => (Number(c.id) === Number(lastJsonMessage.id)));
      const updatedCategories = [ ...categories ];

      // if the category doesn't exist and is new, then just append it to the list
      if (existingCategoryIndex < 0) {
        dispatch({ type: 'SET_EXPENDITURE_KEY', categories: updatedCategories.push(lastJsonMessage) });
      // if the category does exist then we should replace the existing one with the updated version
      } else {
        updatedCategories.splice(existingCategoryIndex, 1, lastJsonMessage);
        dispatch({ type: 'SET_EXPENDITURE_KEY', payload: { categories: updatedCategories } });
      }
    }
  }, [lastJsonMessage]);

  return <div style={{ display: 'none' }} />;
}
