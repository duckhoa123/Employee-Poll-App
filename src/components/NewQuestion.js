import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleSaveAnswer } from '../actions/questions';
import { useEffect } from 'react';
import Login from "./Login";
import Error from './Error';
import { handleInitialData1 } from '../actions/shared';

// Higher Order Component to inject router props
const withRouter = (Component) => {
    const ComponentWithRouterProps = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };
    return ComponentWithRouterProps;
};

const NewQuestion = (props) => {
   
    const { id } = props.router.params;
    const navigate = useNavigate();
    const { questions, dispatch, authedUser } = props;
   
    const question = questions[id];
    
    useEffect(() => {
        if (!question) {
            navigate("/app/error");
        } 
    }, []);
   
    if (!question) {
        return null;
    }
    else if (!authedUser) {
        return <Login/>;
    }

    const optionOneText = question.optionOne['text'];
    const optionTwoText = question.optionTwo['text'];

    const handleAnswer = (e, a) => {
        e.preventDefault();

        dispatch(
            handleSaveAnswer({
                authedUser,
                qid: id,
                answer: a,
            })
        );
        navigate("/app");
    };

    return (
        <div>
            <h1>Poll by {question.author}</h1>
            <ul>
                <li onClick={(e) => handleAnswer(e, 'optionOne')}>{optionOneText}</li>
                <li onClick={(e) => handleAnswer(e, 'optionTwo')}>{optionTwoText}</li>
            </ul>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions }) => {
    return {
        questions,
        authedUser,
    };
};

export default withRouter(connect(mapStateToProps)(NewQuestion));