import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../config';
import * as uiContributeActions from '../ui/contribute/actions';

export const loadCategories = () => dispatch => {
	dispatch(uiContributeActions.startLoadingCategories());
	axios({
		method: 'get',
		url: `${API_URL}/category`
	})
	.then(({data}) => {
		dispatch(loadCategoriesSuccess(data));
		dispatch(uiContributeActions.finishLoadingCategories());
	})
	.catch(({response: {data} = {}}) => {
		dispatch(uiContributeActions.errorLoadingCategories(data));
	})
}

const loadCategoriesSuccess = (categories) => {
	return {
		type: actionTypes.LOAD_CATEGORIES_SUCCESS,
		payload: categories
	}
}