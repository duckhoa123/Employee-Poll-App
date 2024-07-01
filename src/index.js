import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import Login from './components/Login';
import reducer from "./reducers";
import middleware from "./middleware";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Page from './components/Page';





const store=createStore(reducer,middleware);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router> 
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/app/*" element={<App />}></Route>
        
        
        </Routes> </Router>
  
  </Provider>
);


