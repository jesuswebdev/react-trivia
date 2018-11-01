import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../config';
import * as uiContributeActions from '../ui/contribute/actions';

export const submitQuestion = (question) => dispatch => {
	dispatch(uiContributeActions.startSubmittingQuestion());
	axios({
		method: 'post',
		url: `${API_URL}/questions`,
		data: question
	})
	.then(({data}) => {
		dispatch(submitQuestionSuccess());
		dispatch(uiContributeActions.finishSubmittingQuestion());
	})
	.catch(({response: {data} = {}}) => {
		dispatch(uiContributeActions.errorSubmittingQuestion(data));
	})
}

const submitQuestionSuccess = () => {
	return {
		type: actionTypes.SUBMIT_QUESTION_SUCCESS
	}
}

export const resetSubmitQuestionState = () => {
	return {
		type: actionTypes.RESET_SUBMIT_QUESTION_STATE
	}
}