define(["require", "exports", "redux", "module"], function (require, exports, redux_1, module) {
    "use strict";
    var userReducer = function (state, action) {
        if (state === void 0) { state = {}; }
        console.log('userReducer was called with state', state, 'and action', action);
        switch (action.type) {
            // etc.
            default:
                return state;
        }
    };
    var itemsReducer = function (state, action) {
        if (state === void 0) { state = []; }
        console.log('itemsReducer was called with state', state, 'and action', action);
        switch (action.type) {
            // etc.
            default:
                return state;
        }
    };
    var reducer = redux_1.combineReducers({
        user: userReducer,
        items: itemsReducer
    });
    var store = redux_1.createStore(reducer);
    console.log('store_0 state after initialization:', store.getState());
    console.log(module.id);
    return store;
});
