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
                    <h3 className="center">New Questions</h3>
                {doneQuestions.map((doneQuestion)=>(
                    <ul className="tweet-info" key={doneQuestion}>
                        <h2 className="center">{questions[doneQuestion].author}</h2>
                        <a className="center replying-to" >{formatDate(questions[doneQuestion].timestamp)}</a>
                        <button className="btn"  onClick={(e)=>toNewQuestion(e,doneQuestion)}>Show</button>
                    </ul>
                ))}
                </div>
                <div>
                <h3 className="center">Done</h3>
                {newQuestions.map((newQuestion)=>(
                    <ul className="tweet-info" key={newQuestion}>
                    <h2 className="center">{questions[newQuestion].author}</h2>
                    <a className="center replying-to">{formatDate(questions[newQuestion].timestamp)}</a>
                    <button className="btn"  onClick={(e)=>toDoneQuestion(e,newQuestion)}>Show</button>
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