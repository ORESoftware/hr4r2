import * as React from 'react';
import * as store from '../../data-stores/redux-store';
import Child from './children/art-child';

export = class Home extends React.Component<any, any> {

    unsubscribe: Function;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const s = store.getState();
        this.unsubscribe = store.subscribe(function () {
            console.log('home is subscribed.');
        });
    }

    componentWillUnmount(){
        console.log('component will unsubscribe');
        this.unsubscribe();
    }

    render() {

        Child = require('./children/art-child').default;

        return (

            <div>
                Wekkkpp zoom peaches
                <Child />
            </div>

        )
    }
}