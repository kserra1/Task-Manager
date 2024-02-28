// reducers/index.js
import { combineReducers } from 'redux';
import cookieReducer from './cookieReducer'; // Import your reducers

const rootReducer = combineReducers({
  cookie: cookieReducer, // Add other reducers as needed
});

export default rootReducer;
