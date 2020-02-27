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
}

function* postPets(action) {
    console.log('in postPets saga', action.payload);

    try {
        yield axios.get(`http://127.0.0.1:5000/owners`, action.payload)
    }catch (error) {
        console.log('Error in postPet saga', error);
        
    }
    
}





// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();






// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        postPets
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));

