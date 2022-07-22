import {
    initializeAppWorkerSaga, setAppErrorAC,
    setAppIsInitializedAC,
    setAppStatusAC
} from './app-reducer';
import {call, put} from 'redux-saga/effects';
import {authAPI, MeResponseType, ResponseType} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {Dispatch} from 'redux';
import {handleServerAppErrorSaga} from '../utils/error-utils';

let meResponse: ResponseType<MeResponseType>
beforeEach(() => {
    meResponse = {
        resultCode: 0,
        fieldsErrors: [],
        messages: [],
        data: {
            id: 100,
            login: 'login',
            email: 'email'
        }
    }
})

test('initializeAppWorkerSaga login success', () => {
    const gen = initializeAppWorkerSaga()

    let result = gen.next()    // 1 yield
    result = gen.next()    // 2 yield
    expect(result.value).toEqual(call(authAPI.me))


    result = gen.next(meResponse as ResponseType<MeResponseType> & Dispatch)    // 3 yield
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))
    // 4 yield
    expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
    // 5 yield
    result = gen.next()
    expect(result.value).toEqual(put(setAppIsInitializedAC(true)))
    expect(result.done).toBeFalsy()
    // 6 yield, which absent
    expect(gen.next().done).toBeTruthy()
})

test('initializeAppWorkerSaga login unsuccessful', () => {
    const gen = initializeAppWorkerSaga()
    meResponse.resultCode = 1

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(authAPI.me))

    // expect(gen.next(meResponse).value).toEqual(put(setAppErrorAC(meResponse.messages[0])))
    expect(gen.next(meResponse).value).toEqual(put(setAppErrorAC('Some error occurred')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))

    expect(gen.next().value).toEqual(put(setAppIsInitializedAC(true)))
    expect(gen.next().done).toBeTruthy()
})

test('initializeAppWorkerSaga caught error', () => {
    const gen = initializeAppWorkerSaga()

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(authAPI.me))

    gen.next(meResponse) // <== before throw error, you need to execute gen.next();
    expect(gen.throw({message: 'ERROR'}).value).toEqual(put(setAppErrorAC('ERROR')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))

    expect(gen.next().value).toEqual(put(setAppIsInitializedAC(true)))
    expect(gen.next().done).toBeTruthy()
})

