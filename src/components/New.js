import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import { handleAddQuestion } from "../actions/questions";
const New=(props)=>{

    const navigate=useNavigate();
    const{authedUser,dispatch}=props;
    const [question, setQuestion] = useState({
        optionOneText: "",
        optionTwoText: "",
        author:authedUser,
 });
    if(!authedUser){
      return <Login/>;
    }
   
 const handleChange=(e)=>{
    const { name, value } = e.target;

    setQuestion({ ...question, [name]: value });
};
const isDisabled = () => {
    const { optionOneText, optionTwoText } = question;
    return optionOneText === "" || optionTwoText === "" ;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
        dispatch(handleAddQuestion(question));
        navigate('/app');

   
  };

    return(
        <div>
            <h1>Would you rather</h1>
            <h2>Create your own poll</h2>
            <form onSubmit={handleSubmit}>
            <h4>First Option</h4>
        <input
            type="text"
            name="optionOneText"
            placeholder="Enter Option 1"
            value={question.optionOneText}
            onChange={handleChange}
          />
        <h4>Second Option</h4>
        <input
            type="text"
            name="optionTwoText"
            placeholder="Enter Option 2"
            value={question.optionTwoText}
            onChange={handleChange}
          />
        <button type="submit" disabled={isDisabled()}>
                    Submit
                </button>

            </form>
            

        </div>
    )
};
const mapStateToProps = ({ authedUser}) => {
    return {
       
        authedUser,
    };
};

export default connect(mapStateToProps)(New);