import * as newGameActionTypes from './actionTypes';

export const uiNewGameStartLoadingQuestions = () => {
    return {
        type: newGameActionTypes.UI_START_LOADING_QUESTIONS
    }
}

export const uiNewGameFinishLoadingQuestions = () => {
    return {
        type: newGameActionTypes.UI_FINISH_LOADING_QUESTIONS
    }
}

export const uiNewGameFailLoadingQuestions = (error) => {
    return {
        type: newGameActionTypes.UI_FAIL_LOADING_QUESTIONS,
        error
    }
}
