import { infoType, Action } from "src/types";

const CLICK_BOARD = "CLICK_BOARD";
const TIME_OVER = "TIME_OVER";
const DELETE_TIME = "DELETE_TIME";

export const initalState: infoType = { stage: 1, time: 15, point: 0, isPlaying: true };

export function reducer(state: infoType, action: Action): infoType {
    switch (action.type) {
        case CLICK_BOARD: // 입력창에 입력이 됐을 때 발생하는 action
            return action.payload ? {
                ...state,
                time: 15,
                point: state.point + Math.pow(state.stage, 3) * state.time,
                stage: state.stage + 1
            } : {
                ...state, time: state.time - 3
            }
        case TIME_OVER:
            return {
                ...initalState,
                isPlaying: !action.payload,
            }
        case DELETE_TIME:
            return {
                ...state,
                time: state.time - 1
            }
        default:
            return state
    }
}


export const clickBoard: (payload: boolean) => Action = (payload: boolean) => {
    return {
        type: CLICK_BOARD,
        payload
    }
}

export const timeOver: (payload: boolean) => Action = (payload: boolean) => {
    return {
        type: TIME_OVER,
        payload
    }
}

export const deleteTime: () => Action = () => {
    return {
        type: DELETE_TIME,
    }
}