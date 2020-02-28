import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { takeEvery, put } from 'redux-saga/effects'
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
// import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('POST_PETS', postPets)
    yield takeEvery('GET_PETS', getPets)
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


function* postPets(action) {
    console.log('in postPets saga', action.payload);

    try {
        yield axios.post(`/owners/${JSON.stringify(action.payload)}`)   //stringify the payload
    } catch (error) {
        console.log('Error in postPet saga', error);
        
    }
    
}

function* getPets() {
    console.log('in getPets saga');
    try{
        let response = yield axios.get('/')
        console.log(response.data);
        
        yield put({type: 'SET_PETS', payload: response.data.json()});
    } catch (error) {
        console.log('Error in getPets', error);
        
    }
}

const setPetsReducer = (state = [], action) => {
    console.log('in setPetsReducer', action.payload);
        if (action.type = 'SET_PETS') {
            return action.payload;
        }
        return state;
}









// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        
        setPetsReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));