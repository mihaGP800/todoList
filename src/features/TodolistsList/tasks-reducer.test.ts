import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';


let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'Native',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'CodeWars',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'Tests',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
    }
})

test('correct tasks should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({
        taskId: '2',
        todolistId: 'todolistId1'
    }))

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct tasks should be added from correct array', () => {
    const newTask = {
        id: '10',
        title: 'Redux_toolkit',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }

    const endState = tasksReducer(startState, addTaskAC(newTask))

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].some(t => t.id === '10')).toBeTruthy()
    expect(endState['todolistId1'][0].title === 'Redux_toolkit').toBeTruthy()
    expect(endState['todolistId1'][0].status === TaskStatuses.New).toBeTruthy()
})

test('tasks status should be changed', () => {

    const endState = tasksReducer(startState, updateTaskAC({
        taskId: '3',
        model: {title: 'SCSS/SASS'},
        todolistId: 'todolistId1'
    }))

    expect(endState['todolistId1'][2].title).toBe('SCSS/SASS')
})

test('tasks title should be changed', () => {

    const endState = tasksReducer(startState, updateTaskAC({
        taskId: '3',
        model: {status: TaskStatuses.New,},
        todolistId: 'todolistId1'
    }))

    expect(endState['todolistId1'][2].status).toBe(TaskStatuses.New)
})

test('new array should be added when new todolist was add', () => {
    const newTodoList = {
        id: 'todolistId3',
        title: 'SUPER ToDo',
        addedDate: '',
        order: 0,
    }
    const endState = tasksReducer(startState, addTodolistAC({todolist: newTodoList}))

    expect(endState['todolistId3'].length).toBe(0)
})

test('all todoLists tasks should be removed when todolist was removed', () => {

    const endState = tasksReducer(startState, removeTodolistAC({id: 'todolistId2'}))

    expect(Object.keys(endState).length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('tasks should be added for todoList', () => {
    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId2'}))

    expect(endState['todolistId1'].length).toBe(0)
    expect(endState['todolistId2'].length).toBe(3)
})

test('add empty array tasks for each todoList when it was set', () => {
    const todolists = [
        {
            id: 'todolistId3',
            title: 'SUPER ToDo',
            addedDate: '',
            order: 0,
        },
        {
            id: 'todolistId4',
            title: 'SUPER TD',
            addedDate: '',
            order: 2,
        },

    ]
    const endState = tasksReducer({}, setTodolistsAC({todolists}))

    expect(endState['todolistId3'].length).toBe(0)
    expect(endState['todolistId4'].length).toBe(0)
})


