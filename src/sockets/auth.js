/* eslint-disable import/prefer-default-export */
import useWebSocket from 'react-use-websocket';

export function handleSocketAuth(event) {
  const { target } = event;
  const token = localStorage.getItem('SessionToken');
  target.send(`{ "token": "${token}" }`);
}

export const useWebSocketWithAuth = (socketURL, options = {}) => useWebSocket(
  socketURL,
  {
    onOpen: handleSocketAuth,
    ...options,
  },
);
