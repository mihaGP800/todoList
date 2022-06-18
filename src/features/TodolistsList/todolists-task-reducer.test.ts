import {addTodolistTC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';

test('ids should be equals', () => {
    const startTodoLists: Array<TodolistDomainType> = []
    const startTasks: TasksStateType = {}

    const newTodoList = {
        id: 'todolistId3',
        title: 'SUPER ToDo',
        addedDate: '',
        order: 0,
    }

    const andTodoLists = todolistsReducer(startTodoLists, addTodolistTC.fulfilled({todolist: newTodoList}, 'requestId', newTodoList.title))

    const endTasks = tasksReducer(startTasks, addTodolistTC.fulfilled({todolist: newTodoList}, 'requestId', newTodoList.title))

    expect(andTodoLists.filter(tl => tl.id === newTodoList.id)[0].id).toBe('todolistId3')

    expect(Object.keys(endTasks)[0]).toBe('todolistId3')
})