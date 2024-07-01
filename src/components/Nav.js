import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
const Nav=(props)=>{
    const navigate=useNavigate();
    const{authedUser}=props;
    return(
        <nav className="nav" >
            <ul>
                <li>
                    <Link to="/app">Home</Link>
                </li>
                <li>
                    <Link to="/app/leaderboard">Leaderboard</Link>
                </li>
                <li>
                    <Link to="/app/new">New</Link>
                </li>
                {authedUser&& 
  
  <li>{authedUser}
  <button  onClick={(e)=>{return navigate('/')} }>Log Out</button></li>}
            </ul>
           
        </nav>
    );

};
const mapStateToProps = ({ authedUser}) => {
    return {
       
        authedUser,
    };
};
export default  connect(mapStateToProps)(Nav);