import { useState,useEffect } from "react";
import {handleInitialData, handleInitialData1} from '../actions/shared';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import Login from "./Login";


const Page=(props)=>{
   
    const navigate=useNavigate();
    const{authedUser}=props;
    if(!authedUser){
      return <Login/>;
    }
  
   
            
            const{newQuestions,doneQuestions,questions}=props;
            
        const toNewQuestion=(e,id)=>{
            e.preventDefault();
            navigate(`/app/newquestion/${id}`);
        };
        const toDoneQuestion=(e,id)=>{
            e.preventDefault();
            navigate(`/app/donequestion/${id}`);
        }
            
             return(
                <ul>
                    <div>
                    <h3 >New Questions</h3>
                {doneQuestions.map((doneQuestion)=>(
                    <ul  key={doneQuestion}>
                        <div >
                        <h2 >{questions[doneQuestion].author}</h2>
                        <a >{formatDate(questions[doneQuestion].timestamp)}</a>
                        <button className="btn"  onClick={(e)=>toNewQuestion(e,doneQuestion)}>Show</button>
                        </div>
                    </ul>
                ))}
                </div>
                <div>
                <h3 >Done</h3>
                {newQuestions.map((newQuestion)=>(
                    <ul  key={newQuestion}>
                        <div >
                    <h2 >{questions[newQuestion].author}</h2>
                    <a >{formatDate(questions[newQuestion].timestamp)}</a>
                    <button  onClick={(e)=>toDoneQuestion(e,newQuestion)}>Show</button>
                    </div>
                </ul>
                ))}
                </div>

                 </ul>

           
        )}



   
;
const mapStateToProps=({authedUser,questions})=>{
    let keys=Object.keys(questions);
   const newQuestions=keys.filter((key)=>{
    const ques=questions[key];
    return(
        ques.optionOne.votes.includes(authedUser)||ques.optionTwo.votes.includes(authedUser)
    )
   }).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);

   const doneQuestions=keys.filter((key)=>{
    const ques=questions[key];
    return(
        !ques.optionOne.votes.includes(authedUser)&&!ques.optionTwo.votes.includes(authedUser)
    )
   }).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);

    return {
        newQuestions,
        doneQuestions,
        questions,
        authedUser,
        
    }
};
export default connect(mapStateToProps)(Page);