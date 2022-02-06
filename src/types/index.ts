export type infoType = {
    stage: number;
    time: number;
    point: number;
    isPlaying: boolean;
}

export type Action = {
    type: "CLICK_CORRECT";
} | {
    type: "CLICK_WRONG"
} | {
    type: "TIME_OVER";
} | {
    type: "DECREASE_TIME"
} | {
    type: "RESET"
} 
