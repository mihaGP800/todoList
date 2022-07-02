import React, {useEffect} from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import {useAppSelector} from './store'
import {initializeAppTC} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CircularProgress} from '@mui/material'
import {logoutTC} from '../features';
import {selectIsInitialized, selectStatus} from './selectors';
import {selectIsLoggedIn} from '../features';
import {TodolistsList} from '../features/TodolistsList';
import {Login} from '../features/Auth/Login';

type PropsType = {
}



function App(props: PropsType) {
    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    let logoutHandle = () => dispatch(logoutTC());
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
                    {isLoggedIn &&
                        <Button color="inherit" onClick={logoutHandle}>LogOUT</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404"
                           element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT
                               FOUND</h1>}/>
                    <Route path="/*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
