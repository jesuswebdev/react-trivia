import * as gameActionTypes from './actionTypes';
import { shuffleOptions } from '../../utils';

const initialState = {
	token: null,
	questions: [],
	currentQuestion: 0,
	timedOut: false,
	questionStarted: false,
	selectedCorrectAnswer: false,
	selectedWrongAnswer: false,
	victory: false
}

const gameStartSuccess = (state, action) => {
	let questions = action.payload.questions.map(question => {
		return {
			...question,
			answered: false,
			selected_option: null,
			duration: 0,
			timedOut: false,
			options: shuffleOptions(question.options)
		}
	});
	
	return {
		...state,
		token: action.payload.game_token,
		questions
	};
}

const destroyGame = (state, action) => {
	return initialState;
}

const startQuestion = (state, action) => {
	return {
		...state,
		questionStarted: true
	}
}

const timerTimedOut = (state, action) => {
	return {
		...state,
		timedOut: true,
		questions: state.questions.map((q, i) => {
			if (i === state.currentQuestion) {
				return {
					...q,
					timedOut: true,
					duration: 30
				}
			}
			return q;
		})
	}
}

const selectWrongAnswer = (state, action) => {

	let question = state.questions.filter((_, i) => i === action.payload.position);
	question = question[0];
	question.answered = true;
	question.duration = action.payload.duration;
	question.selected_option = parseInt(action.payload.option, 10);

	let questions = state.questions.map((q, i) => {
		if(i !== action.payload.position) {
			return q;
		}
		else {
			return question;
		}
	});

	return {
		...state,
		selectedWrongAnswer: true,
		questions
	}
}

const selectCorrectAnswer = (state, action) => {
	
	let question = state.questions.filter((_, i) => i === action.payload.position);
	question = question[0];
	question.answered = true;
	question.duration = action.payload.duration;
	question.selected_option = parseInt(action.payload.option, 10);

	let questions = state.questions.map((q, i) => {
		if(i !== action.payload.position) {
			return q;
		}
		else {
			return question;
		}
	});

	return {
		...state,
		selectedCorrectAnswer: true,
		questions
	}
}

const setVictory = (state, action) => {
	return {
		...state,
		victory: true
	}
}

const nextQuestion = (state, action) => {
	return {
		...state,
		currentQuestion: state.currentQuestion + 1,
		timedOut: false,
		questionStarted: false,
		selectedCorrectAnswer: false,
		selectedWrongAnswer: false,
		victory: false
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case gameActionTypes.GAME_START_SUCCESS: return gameStartSuccess(state, action);
		case gameActionTypes.DESTROY_GAME: return destroyGame(state, action);
		case gameActionTypes.START_QUESTION: return startQuestion(state, action);
		case gameActionTypes.TIMER_TIMED_OUT: return timerTimedOut(state, action);
		case gameActionTypes.SELECT_WRONG_ANSWER: return selectWrongAnswer(state, action);
		case gameActionTypes.SELECT_CORRECT_ANSWER: return selectCorrectAnswer(state, action);
		case gameActionTypes.SET_VICTORY: return setVictory(state, action);
		case gameActionTypes.NEXT_QUESTION: return nextQuestion(state, action);
		default: return state;
	}
}

export default reducer;
