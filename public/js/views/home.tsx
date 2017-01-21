import * as React from 'react';
import * as store from 'js/data-stores/redux-store';


var asyncSayActionCreator = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log('dispatching...');
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
};

var sayActionCreator = function (message) {
    return {
        type: 'SAY',
        message
    }

};

let i = 0;


export = class Home extends React.Component<any, any> {

    unsubscribe: Function;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const s = store.getState();
        this.unsubscribe = store.subscribe(function () {
            console.log('home is subscribed => ' + i++);
        });
        setTimeout(function () {
            console.log('aidentttt');
            store.dispatch(sayActionCreator('a'));
        }, 1000);

    }

    componentWillUnmount() {
        console.log('component will unsubscribe');
        this.unsubscribe();
    }

    render() {
        return (

            <div>
                Wekkkpp zoom BBBB
            </div>

        )
    }
}