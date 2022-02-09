import { infoType, Action } from "src/types";

const CLICK_CORRECT = "CLICK_CORRECT";
const CLICK_WRONG = "CLICK_WRONG";
const TIME_OVER = "TIME_OVER";
const DECREASE_TIME = "DECREASE_TIME";

export const initalState: infoType = { stage: 1, time: 15, point: 0 };

export function reducer(state: infoType, action: Action): infoType {
    switch (action.type) {
        case CLICK_CORRECT: // 입력창에 입력이 됐을 때 발생하는 action
            return {
                ...state,
                time: 15,
                point: state.point + Math.pow(state.stage, 3) * state.time,
                stage: state.stage + 1
            }

        case CLICK_WRONG:
            return {
                ...state, time: state.time - 3
            }

        case TIME_OVER:
            return {
                ...initalState,
            }


        case DECREASE_TIME:
            return {
                ...state,
                time: state.time - 1
            }
        default:
            return state
    }
}


export const clickCorrect: Action = {
    type: CLICK_CORRECT,
}

export const clickWrong: Action = {
    type: CLICK_WRONG,
}

export const timeOver: Action = {
    type: TIME_OVER,
}

export const decreaseTime: Action = {
    type: DECREASE_TIME,
}