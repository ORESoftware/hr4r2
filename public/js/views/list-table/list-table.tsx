
import * as React from 'react';

//
class ListTable extends React.Component<any, any> {


    constructor (props, context) {
        // We use the constructor to make sure our eventHandlers know of `this`
        // Otherwise they will inherit the normal event arguments
        super(props, context);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    // These event handlers (react) will be responsible for dispatching (redux) our action creators (redux)
    addItem () {
    }
    removeItem (index) {
    }
    editItem (index, event)  {
    }


    render () {
        // ES6 desconstruct some constants from our props
        // Short hand syntax for saying `const items = this.props.items`
        const {items, addItem} = this.props;

        // Here we essentially just want to loop over our `items` and render the appropiate html
        // Not too much going on, just take note of the `onChange` and `onClick` which
        // call the handlers above
        return (<div>
            <table>
                <tbody>
                {map(items, (item, index) => {
                    return (<tr key={index}>
                        <td><input onChange={this.editItem.bind(null, index)} type="text" value={item} /></td>
                        <td>
                            <button onClick={this.removeItem.bind(null, index)} className="delete">
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>);
                })}
                </tbody>
            </table>
            <button onClick={this.addItem} className="add">
                <i className="fa fa-plus"></i>
            </button>
            <InfoBox />
        </div>);
    }
}