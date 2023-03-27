const initialState = {
  categories: [],
  addForm: {},
  db: {},
};

function expenditureReducer(state = initialState, action = {}) {
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
    case 'CLEAR_EXPENDITURE_FORM':
      return { ...state, addForm: {} };
    case 'ADD_EXPENDITURE': {
      const { expenditure = {} } = action;
      return {
        ...state,
        db: {
          ...state.db,
          [expenditure.id]: expenditure,
        },
      };
    } case 'ADD_EXPENDITURES': {
      const { expenditures = [] } = action;
      const { db = {} } = state;
      expenditures.forEach(e => { db[e.id] = e; });
      return { ...state, db };
    } case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default expenditureReducer;
