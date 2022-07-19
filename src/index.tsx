import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import {Provider} from 'react-redux';
import configureAppStore from './app/store';
import {HashRouter as Router} from 'react-router-dom';
// import {store} from './app/store';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={configureAppStore()}>
            {/*<Provider store={store}>*/}
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
