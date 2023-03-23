import { combineReducers } from 'redux';
import expenditure from './expenditure';
import user from './user';

export default () => combineReducers({
  expenditure,
  user,
});
