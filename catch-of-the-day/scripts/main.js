import React from 'react';
import ReactDOM from 'react-dom';

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import createBrowserHistory from 'history/lib/createBrowserHistory';


// Import components
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import App from './components/App';

/* Routes */

var routes = (
  <Router history={createBrowserHistory()} >
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
  )

ReactDOM.render(routes, document.querySelector('#main'));
