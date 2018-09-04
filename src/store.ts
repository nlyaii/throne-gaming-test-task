export interface IAppState {
    imageCount: number
}
export const INITIAL_STATE: IAppState = {
    imageCount: 0
}

export function rootReducer(lastState: IAppState, action): IAppState {
    switch(action.type) {
        case 'INCREMENT':
            return { imageCount: lastState.imageCount + 1 };
        case 'DECREMENT':
            return { imageCount: lastState.imageCount - 1 };
        case 'REVERT':
            return {imageCount: lastState.imageCount = 0}
    }

    return lastState;
}