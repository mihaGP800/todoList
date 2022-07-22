import {
    addTaskAC,
    addTaskWorkerSaga,
    UpdateDomainTaskModelType,
    updateTaskWorkerSaga
} from './tasks-reducer';
import {call, put, select} from 'redux-saga/effects';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {
    ResponseType,
    TaskPriorities,
    TaskStatuses,
    TaskType, todolistsAPI, UpdateTaskModelType
} from '../../api/todolists-api';


const taskId = 'taskId';
const todolistId = 'todolistId';
const title = 'title';
let meResponse: ResponseType<{ item: TaskType }>
let domainModel: UpdateDomainTaskModelType
let apiModel: UpdateTaskModelType
beforeEach(() => {
    meResponse = {
        resultCode: 0,
        messages: [],
        fieldsErrors: [],
        data: {
            item: {
                description: 'string',
                title: 'string',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                id: 'string',
                todoListId: 'string',
                order: 123,
                addedDate: 'string',
            }
        }
    }
    domainModel = {}
    apiModel = {
        title: 'string',
        description: 'string',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 'string',
        deadline: 'string',
        ...domainModel
    }
})

test('addTaskWorkerSaga added successfully', () => {
    const gen = addTaskWorkerSaga({type: 'TASKS/ADD-TASK', todolistId, title})

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.createTask, todolistId, title))

    expect(gen.next(meResponse).value).toEqual(put(addTaskAC(meResponse.data.item)))
    expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
    expect(gen.next().done).toBeTruthy()
})

test('addTaskWorkerSaga added unsuccessfully', () => {
    meResponse.resultCode = 1
    const gen = addTaskWorkerSaga({type: 'TASKS/ADD-TASK', todolistId, title})

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.createTask, todolistId, title))

    expect(gen.next(meResponse).value).toEqual(put(setAppErrorAC('Some error occurred')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))
    expect(gen.next().done).toBeTruthy()
})

test('addTaskWorkerSaga caught error', () => {
    const gen = addTaskWorkerSaga({type: 'TASKS/ADD-TASK', todolistId, title})

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.createTask, todolistId, title))

    gen.next(meResponse) // <== before throw error, you need to execute gen.next();
    expect(gen.throw({message: 'NEW ERROR'}).value).toEqual(put(setAppErrorAC('NEW' +
        ' ERROR')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))
    expect(gen.next().done).toBeTruthy()
})

//-------------updateTaskWorkerSaga------------------------------------------
test('updateTaskWorkerSaga was success', () => {
    const gen = updateTaskWorkerSaga({
        type: 'TASKS/UPDATE-TASK',
        taskId,
        todolistId,
        domainModel
    })


    expect(gen.next().value).toEqual(select())
    // expect(gen.next().value).toEqual(call(todolistsAPI.updateTask, todolistId, taskId, apiModel))
})

