const initialState = {
  categories: [],
  addForm: {},
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_EXPENDITURE_KEY':
      return { ...state, ...action.payload };
    case 'UPDATE_EXPENDITURE_FORM':
      return {
        ...state,
        addForm: {
          ...state.addForm,
          ...action.payload,
        },
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
