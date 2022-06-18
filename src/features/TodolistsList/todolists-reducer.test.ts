import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC, removeTodolistTC,
    resetTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string
let startSate: Array<TodolistDomainType> = []
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startSate = [
        {
            id: todolistId1,
            title: 'what to learn',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: 'what to buy',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        },
    ]
})

test('correct todoList should be removed', () => {
    const andState = todolistsReducer(startSate, removeTodolistTC.fulfilled({id: todolistId1}, 'requestId', todolistId1))

    expect(andState.length).toBe(startSate.length - 1)
})

test('correct todoList should be added', () => {
    const newTodolist = {
        id: v1(),
        title: 'what to do',
        filter: 'all',
        entityStatus: 'idle',
        addedDate: '',
        order: 0
    }
    const andState = todolistsReducer(startSate, addTodolistTC.fulfilled({todolist: newTodolist}, 'requestId', newTodolist.title))

    expect(andState.length).toBe(startSate.length + 1)
})

test('changing todoLists title should be correct', () => {
    const newTitleData = {
        id: todolistId1,
        title: 'NEW TITle'
    };
    const andState = todolistsReducer(startSate, changeTodolistTitleTC.fulfilled(newTitleData, 'requestId', newTitleData))

    expect(andState.filter(tl => tl.id === todolistId1)[0].title).toBe('NEW TITle')
})

test('changing todoLists filter should be correct', () => {
    const andState = todolistsReducer(startSate, changeTodolistFilterAC({
        id: todolistId2,
        filter: 'completed'
    }))

    expect(andState.filter(tl => tl.id === todolistId2)[0].filter).toBe('completed')
})

test('changing todoLists entity status should be correct', () => {
    const andState = todolistsReducer(startSate, changeTodolistEntityStatusAC({
        id: todolistId2,
        status: 'succeeded'
    }))

    expect(andState.filter(tl => tl.id === todolistId2)[0].entityStatus).toBe('succeeded')
})

test('setting todoLists should be correct', () => {
    const newTodoLists = [
        {
            id: v1(),
            title: '111',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        },
        {
            id: v1(),
            title: '222',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        },
        {
            id: v1(),
            title: '333',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        },
        {
            id: v1(),
            title: '444',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: '',
            order: 0
        },
    ]
    const andState = todolistsReducer([], fetchTodolistsTC.fulfilled({todolists: newTodoLists}, 'requestId'))

    expect(andState.length).toBe(4)
})


test('removing todoLists should be correct', () => {

    const andState = todolistsReducer(startSate, resetTodolistsAC())

    expect(andState).toStrictEqual([])
})



