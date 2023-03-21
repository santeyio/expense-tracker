const initialState = {
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
