import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType, useAppSelector} from './store'
import {RequestStatusType, selectIsAuthorized, setAuthorizedTC} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom'
import {Box, CircularProgress, Grid} from '@mui/material'
import {removeAuthTC, selectIsAuthenticated} from './auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isAuthorized = useAppSelector(selectIsAuthorized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAuthorizedTC())
    }, [])


    if (!isAuthorized) return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
    </div>

    const logoutHandle = () => {
      dispatch(removeAuthTC())
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isAuthenticated && <Button color="inherit" onClick={logoutHandle}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}

            </AppBar>

            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'}
                           element={<h1 style={{color: 'red', textAlign: 'center'}}>ERROR
                               404</h1>}/>
                    <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
