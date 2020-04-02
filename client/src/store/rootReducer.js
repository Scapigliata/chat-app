import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import messagesReducer from './reducers/messagesReducer';
import configReducer from './reducers/configReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  config: configReducer,
});
