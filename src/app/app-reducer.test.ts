import {
    appReducer,
    initializeAppTC,
    RequestStatusType,
    setAppErrorAC,
    setAppStatusAC
} from './app-reducer';

let startState: { status: RequestStatusType; error: string | null; isInitialized: boolean; }
beforeEach(() => {
    startState = {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
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
    const andState = appReducer(startState, initializeAppTC.fulfilled(undefined, 'requestId'))

    expect(andState.isInitialized).toBe(true)
})
