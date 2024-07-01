import { connect } from 'react-redux';
import { useLocation,useNavigate,useParams } from "react-router-dom";

const withRouter=(Component)=>{
    const ComponentWithRouterProps=(props)=>{
        let location=useLocation();
        let navigate=useNavigate();
        let params=useParams();
        return <Component {...props} router={{location,navigate,params}}/>
    };
    return ComponentWithRouterProps;
}
const DoneQuestion=(props)=>{
    const{optionOneText,optionTwoText,numOne,numTwo,perOne,perTwo,check}=props;
    const{author}=props.question;
    

    return(
        <div>
            <h1>Poll by {author} </h1>
            <div>
            <li  style={check===true? {textDecoration:'underline' }:{textDecoration:'none' }} >{optionOneText}</li>
            <li>{numOne}</li>
            <li>{perOne}%</li>
            </div>
            <div>
            <li style={check===false? {textDecoration:'underline' }:{textDecoration:'none' }}  >{optionTwoText}</li>
            <li>{numTwo}</li>
            <li>{perTwo}%</li>
            </div>
            
            
        </div>
    )
};
const mapStateToProps=({authedUser,questions,users},props)=>{
    const{id}=props.router.params;
    const question=questions[id];
    const optionOneText=question.optionOne['text'];
    
    const numOne=question.optionOne['votes'].length;
   let perOne =(numOne/Object.keys(users).length)*100;
    const optionTwoText=question.optionTwo['text'];
    const numTwo=question.optionTwo['votes'].length;
    let perTwo =(numTwo/Object.keys(users).length)*100;
    let check=true;
    if(question.optionOne.votes.includes(authedUser)){
        check=true;
    }
    else{check=false;}


    return{
        id,
       question,
       authedUser,
       optionOneText,
       optionTwoText,
       numOne,
       numTwo,
       perOne,
       perTwo,
       check,


    }
}
export default withRouter(connect(mapStateToProps)(DoneQuestion));