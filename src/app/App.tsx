import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from './store';
import {selectStatus} from './app-reducer';
import {SnackbarError} from '../components/Snackbar/Snackbar';


function App() {

    const status = useAppSelector(selectStatus)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading'&& <LinearProgress/>}
            <Container fixed>
                <TodolistsList/>
            </Container>
            <SnackbarError/>
        </div>
    )
}

export default App
