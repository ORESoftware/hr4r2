import * as React from 'react';



export class ErrorView extends React.Component <any, any> {

    private error: Error;

    constructor(props) {
        super(props);
        this.error = props.error;
    }

    render() {
        return (
            <div>
                {this.error.stack || this.error}
            </div>)
    }
}