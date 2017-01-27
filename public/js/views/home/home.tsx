import * as React from 'react';
import * as store from '@redux-store';
// import store = require('../../data-stores/redux-store');
import * as uuid from 'uuid';


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
                        return {
                            title: c.data.title,
                            description: c.data.public_description,
                            image: c.data.header_img
                        };
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
    items: Array[],
    clicked?: boolean
}


export = class Home extends React.Component<any, State> {

    unsubscribe: Function;

    constructor(props) {
        super(props);

        this.onClickRetrieve = this.onClickRetrieve.bind(this);

        this.state = {
            clicked: false,
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
        return this.state.items.map(function (item, index) {

            const style = {
                backgroundColor: index%2===0? "#ffa500" :"#0000CD"
            };

            return (
                <tr style={style} key={ uuid()}>
                    <td>{item.title}</td>
                    <td> {item.description}</td>
                    <td><img src={item.image}/></td>
                </tr>
            )
        });
    }

    onClickRetrieve() {
        this.state.clicked = true;
        store.dispatch(asyncActionCreator())
    }

    getTableHeader() {
        return (
            <thead>
            <tr>
                <th> Title</th>
                <th> Description</th>
                <th> Image </th>
            </tr>
            </thead>
        )
    }

    getTableBody() {
        return (
            <tbody>
            {this.collateRedditResuls()}
            </tbody>
        )
    }

    render() {
        return (

            <div>
                <button onClick={this.onClickRetrieve}> Click to retrieve SubReddits on ReactJS</button>
                <div>
                    <div>
                        ______________________________
                    </div>
                    <b> Reddit Search Results:</b>
                    <div>
                        ______________________________
                    </div>
                    {this.state.clicked ?
                        <table>
                            {this.getTableHeader()}
                            {this.getTableBody()}
                        </table>
                        : null}
                </div>
            </div>

        )
    }
}