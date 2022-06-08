import {
    appReducer,
    initialState,
    setAppErrorAC,
    setAppIsInitializedAC,
    setAppStatusAC
} from './app-reducer';

let startState: typeof initialState
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
})

test('correct error message should be set', () => {
    const andState = appReducer(startState, setAppErrorAC({error: 'ERROR'}))

    expect(andState.error).toBe('ERROR')
})

test('correct status message should be set', () => {
    const andState = appReducer(startState, setAppStatusAC({status: 'loading'}))

    expect(andState.status).toBe('loading')
})

test('correct initialized message should be set', () => {
    const andState = appReducer(startState, setAppIsInitializedAC({isInitialized: true}))

    expect(andState.isInitialized).toBe(true)
})
