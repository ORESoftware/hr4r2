

import {createStore, combineReducers} from 'redux';


const userReducer = function (state = {}, action) {

    console.log('userReducer was called with state', state, 'and action', action);

    switch (action.type) {
        // etc.
        default:
            return state;
    }
};

const itemsReducer = function (state = [], action) {


    console.log('itemsReducer was called with state', state, 'and action', action);

    switch (action.type) {
        // etc.
        default:
            return state;
    }
};


const reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
});


const store = createStore(reducer);
console.log('store_0 state after initialization:', store.getState());

import module = require('module')
console.log(module.id);

export = store;