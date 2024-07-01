import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";



export function handleInitialData(AUTHED_USER){
    return (dispatch)=>{
      
        return getInitialData().then(({users,questions})=>{
              dispatch(receiveUsers(users));
              dispatch(receiveQuestions(questions));
              dispatch(setAuthedUser(AUTHED_USER));
             

        }
    )}
}
export function handleInitialData2(){
    return (dispatch)=>{
      
        return getInitialData().then(({users,questions})=>{
              dispatch(receiveUsers(users));
              dispatch(receiveQuestions(questions));
              dispatch(setAuthedUser(null));
             

        }
    )}
}
export function handleInitialData1(){
    return (dispatch)=>{
      
        return getInitialData().then(({users,questions})=>{
              dispatch(receiveUsers(users));
              dispatch(receiveQuestions(questions));
              
             

        }
    )}
}