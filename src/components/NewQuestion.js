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
        <div style={styles.container}>
        <h1 style={styles.title}>Poll by {question.author}</h1>
        <ul style={styles.optionsList}>
          <li style={styles.option} onClick={(e) => handleAnswer(e, 'optionOne')}>
            {optionOneText}
          </li>
          <li style={styles.option} onClick={(e) => handleAnswer(e, 'optionTwo')}>
            {optionTwoText}
          </li>
        </ul>
      </div>
    );
};
const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    optionsList: {
      listStyleType: 'none',
      padding: 0,
    },
    option: {
      cursor: 'pointer',
      padding: '10px 20px',
      marginBottom: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
    },
    
  };
  

const mapStateToProps = ({ authedUser, questions }) => {
    return {
        questions,
        authedUser,
    };
};

export default withRouter(connect(mapStateToProps)(NewQuestion));