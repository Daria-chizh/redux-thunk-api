import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import serviceListReducer from '../reducers/serviceList';
import fetcherReducer from '../reducers/fetcher';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  fetcher: fetcherReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
