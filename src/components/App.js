import { Fragment,useEffect } from "react";
import Nav from './Nav';
import { Route,Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from './Page';
import Leaderboard from './Leaderboard';
import New from './New';
import {handleInitialData1} from '../actions/shared';
import NewQuestion from './NewQuestion';
import DoneQuestion from './DoneQuestion';
import Error from "./Error";
import { useState } from "react";



const App = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await props.dispatch(handleInitialData1());

      setLoading(false);
    };

    fetchData();
  });
 
    return (
      <Fragment>
        <div className="container">
          <Nav/>
          {loading ? (
        <p>Loading...</p>
      ) : (
              <Routes>
               
                <Route path="/" exact element={<Page/>}/>
                <Route path="/leaderboard" exact  element={<Leaderboard/>}/>
                <Route path="/new" exact  element={<New/>}/>
                <Route path="/newquestion/:id" exact  element={<NewQuestion/>}/>
                <Route path="/donequestion/:id" exact  element={<DoneQuestion/>}/>
                <Route path="/error" exact   element={<Error/>}/>
                
                
              
              </Routes>)}
            
          
        </div>
      </Fragment>
    )
  };
 
  
  export default connect()(App);
