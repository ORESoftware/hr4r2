import * as React from 'react';
import * as store from '../../data-stores/redux-store';


var asyncActionCreator = function () {

    return function (dispatch) {

        fetch('https://www.reddit.com/subreddits/search.json?q=reactjs', {
            method: 'get',
        }).then(response => {
            console.log('response => ', response);

            response.json().then(function (json) {
                console.log('json => ', json);
                dispatch({
                    type: 'GET_REACTJS_REDDIT',
                    result: json.data.children.map(function (c) {
                        return c.data.title;
                    })
                })
            });

        }).catch(err => {
            console.error(err.stack || err);
        });

    }
};


let i = 0;

interface State {
    items: Array[]
}


export = class Home extends React.Component<any, State> {

    unsubscribe: Function;

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const s = store.getState();
        this.unsubscribe = store.subscribe(() => {
            console.log('home is subscribed => ' + i++,
                'items =>', store.getState().items);
            this.setState({
                items: store.getState().items
            });
        });

    }

    componentWillUnmount() {
        console.log('component will unsubscribe');
        this.unsubscribe();
    }

    collateRedditResuls() {
        return this.state.items.map(function (item) {
            console.log('item => ', item);
            return (
                <div>{item}</div>
            )
        });
    }

    onClick(){
        store.dispatch(asyncActionCreator())
    }

    render() {
        return (

            <div>
                <button onClick={this.onClick}> Retrieve SubReddits on ReactJS</button>
                <div>
                    <b> Results:</b>
                {this.collateRedditResuls()}
                </div>
            </div>

        )
    }
}