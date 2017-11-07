import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Landing from './components/Landing';
import requireAuth from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have  a token, consider the user to be signed in
if (token) {
  //we need to update application state
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory}>
    	<Route path="/" component={App}>
        <IndexRoute component={Landing}/>
    		<Route path="signin" component={Signin} />
    		<Route path="signout" component={Signout} />
    		<Route path="signup" component={Signup} />
        <Route path="feature" component={requireAuth(Feature)} />
    	</Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
