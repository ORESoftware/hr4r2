import * as React from 'react';
import * as store from 'js/data-stores/redux-store';

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
        return (

            <div>
                Wekkkpp zoom peaches
            </div>

        )
    }
}