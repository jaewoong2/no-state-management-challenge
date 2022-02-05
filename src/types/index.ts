export type infoType = {
    stage: number;
    time: number;
    point: number;
    isPlaying: boolean;
}

export type Action = {
    type: "CLICK_BOARD";
    payload: boolean
} | {
    type: "TIME_OVER";
    payload?: boolean;
} | {
    type: "DELETE_TIME"
}
