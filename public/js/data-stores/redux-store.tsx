

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const userReducer = function (state = {}, action) {

    console.log('userReducer was called with state', state, 'and action', action);

    switch (action.type) {
        // etc.
        case 'GET_REACTJS_REDDIT':
            return {items: action.result};
        default:
            return state;
    }
};

// const itemsReducer = function (state = [], action) {
//
//
//     console.log('itemsReducer was called with state', state, 'and action', action);
//
//     switch (action.type) {
//         // etc.
//         default:
//             return state;
//     }
// };
//
//
// const reducer = combineReducers({
//     user: userReducer,
//     items: itemsReducer
// });


const store = createStore(userReducer,
    compose(applyMiddleware(thunk))
);


console.log(' => store state after initialization:', store.getState());

import module = require('module')
console.log(module.id);

export = store;