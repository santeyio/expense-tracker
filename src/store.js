import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import createRootReducer from './reducers';

// compose middleware and enhancers with dev tools helper
const middleware = applyMiddleware(ReduxThunk);
const enhancers = [ middleware ];
const composedEnhancers = composeWithDevTools(...enhancers);

// create imported root reducer and wrap with persistor
const rootReducer = createRootReducer();
const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);
