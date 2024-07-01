import { RECEIVE_QUESTIONS } from "../actions/questions";
import { SAVE_ANSWER } from "../actions/questions";
import { SAVE_QUESTION } from "../actions/questions";
export default function users(state={},action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return{...state,
                ...action.questions
            
            };
        case SAVE_ANSWER:
            const{authedUser}=action;
                        return{...state,
                [action.qid]:{
                    ...state[action.qid],
                    [action.answer]:{
                        ...state[action.qid][action.answer],
                        votes:state[action.qid][action.answer].votes.concat([authedUser]),
                    }
                }
            };
            case SAVE_QUESTION:
                return {
                    ...state,
                    [action.question.id]: {
                      ...action.question,
                    },
                  };
            default:
                return state;
    }
}