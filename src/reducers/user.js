const initialState = {
  firstName: '',
  lastName: '',
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER_FIELDS':
      return { ...state, ...action.fields };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
