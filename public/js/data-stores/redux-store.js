define(["require", "exports", "redux", "redux-thunk", "module"], function (require, exports, redux_1, redux_thunk_1, module) {
    "use strict";
    var userReducer = function (state, action) {
        if (state === void 0) { state = {}; }
        console.log('userReducer was called with state', state, 'and action', action);
        switch (action.type) {
            case 'GET_REACTJS_REDDIT':
                return { items: action.result };
            default:
                return state;
        }
    };
    var store = redux_1.createStore(userReducer, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default)));
    console.log(' => store state after initialization:', store.getState());
    console.log(module.id);
    return store;
});
