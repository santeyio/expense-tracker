import { combineReducers } from 'redux';
import expenses from './expenses';
import user from './user';

export default () => combineReducers({
  expenses,
  user,
});
