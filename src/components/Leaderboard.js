import { connect } from "react-redux";
import Login from "./Login";
const Leaderboard=(props)=>{
    const{authedUser,users}=props;
    if(!authedUser){
        return <Login/>;
      }
  
   

   
      let keys=Object.keys(users).sort((a,b)=>(Object.keys(users[b].answers).length+users[b].questions.length)-(Object.keys(users[a].answers).length+users[a].questions.length));

    return(
        <table >
        <thead>
            <tr>
                <th>Users</th>
                <th>Answer</th>
                <th>Created</th>
                <th></th>
            </tr>
        </thead>
        <tbody> 
           
{keys.map((user)=>(
                    <tr key={user}>
                        <td>{users[user].name}</td>
                        <td>{Object.keys(users[user].answers).length}</td>
                        <td>{users[user].questions.length}</td>
                      
                    </tr>
                ))}




              
                  
        </tbody>
    </table>
    )
}
const mapStateToProps = ({ authedUser,users}) => {
    return {
        authedUser,
        
        users,
    };
};
export default connect(mapStateToProps)(Leaderboard);