import * as gameActionTypes from './actionTypes';
import axios from 'axios';

export const startGame = (options) => dispatch => {

	console.log(options)
    const {token} = JSON.parse(localStorage.getItem('userData'));

    axios({
        method: 'get',
        url: `http://localhost:8080/questions/newgame/${options.difficulty}?question_count=${options.question_count}`,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(({data}) => {
    	console.log(data)
    })
    .catch(({response: {data}}) => {
    	console.log(data)
    });
}