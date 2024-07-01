import { useState,useEffect } from "react";
import {handleInitialData, handleInitialData2} from '../actions/shared';
import { connect } from 'react-redux';
import { useNavigate,useLocation } from "react-router-dom";


const Login=(props)=>{
    const navigate=useNavigate();
    const {pathname} = useLocation()
    useEffect(()=>{
        props.dispatch(handleInitialData2());
      },[]);
      const{users}=props;
    const [user, setUser] = useState({
        username: "",
        password: "",
 });
    const handleChange=(e)=>{
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const userAlreadyExists = checkAuth(user.username,user.password);
    
        if (!userAlreadyExists) {
            setUser({ ...user,   username: "",
                password: "", });
          alert("Login Fail. Please Try Again");
        }
        else{ props.dispatch(handleInitialData(user.username));
        alert("Success");
        if(pathname==='/')
          {navigate('/app');}
        }
    
       
      };

      const checkAuth = (currUsername,currPassword) => {
     const check=users[currUsername];
     if(!check){return false}
     else {if(check.password===currPassword)
        return true;
        else return false
     }
      }
        
      


    const isDisabled = () => {
        const { username, password } = user;
        return username === "" || password === "" ;
      };
    return(
<div>
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
        <h4>User</h4>
        <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={user.username}
            onChange={handleChange}
          />
        <h4>Password</h4>
        <input
            type="text"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
          />
        <button type="submit" disabled={isDisabled()}>
                    Submit
                </button>
    </form>
</div>
    );
};
const mapStateToProps=({users})=>{return {
    users,
}}
  
export default connect(mapStateToProps)(Login);