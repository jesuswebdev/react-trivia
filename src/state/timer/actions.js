import * as timerActionTypes from './actionTypes';

export const tick = () => {
    return {
        type: timerActionTypes.TIMER_TICK
    }
}

export const reset = () => {
    return {
        type: timerActionTypes.TIMER_RESET
    }
}

export const setTimerIds = (interval, timeout) => {
    return {
        type: timerActionTypes.SET_TIMER_IDS,
        payload: {
            interval,
            timeout
        }
    }
}
