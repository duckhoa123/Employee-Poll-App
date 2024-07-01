import { saveQuestionAnswer,saveQuestion } from "../utils/api";
import { saveUserAnswer } from "./users";
export const RECEIVE_QUESTIONS="RECEIVE_QUESTIONS";

export const SAVE_ANSWER="SAVE_ANSWER";
export const SAVE_QUESTION="SAVE_QUESTION";
export function receiveQuestions(questions){
    return {
        type:RECEIVE_QUESTIONS,
        questions,
    };}
    export function saveAnswer({authedUser, qid, answer }){
        return {
            type:SAVE_ANSWER,
            authedUser,
            qid,
            answer,
        };
};
export function save_Question(question){
    return {
        type:SAVE_QUESTION,
        question,
    };
};
export function handleSaveAnswer(info){
    return(dispatch)=>{
        dispatch(saveAnswer(info));
        dispatch(saveUserAnswer(info))
        return saveQuestionAnswer(info).catch((e)=>{
            console.warn("Error handling answer:",e);
            alert("There was an error saving the answer. Try again.")
        })
    }
}
export function handleAddQuestion(question){
    const optionOneText = question.optionOneText;
    const optionTwoText = question.optionTwoText;
    const author = question.author;
    console.log(author);

    return (dispatch) => {
        return saveQuestion({ optionOneText, optionTwoText, author })
            .then((ques) => {
                dispatch(save_Question(ques));
            })
            .catch((error) => {
                console.error("Error saving question:", error);
            });
    };
}