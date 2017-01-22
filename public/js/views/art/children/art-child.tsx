import * as React from 'react';
import * as store from '../../../data-stores/redux-store';

export default class ArtChild extends React.Component<any, any> {

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
                Wekkkpp zoom REBECCKKK
            </div>

        )
    }
}