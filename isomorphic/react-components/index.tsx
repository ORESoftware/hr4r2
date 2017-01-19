import * as React from 'react';


class DemoProps {
    public name: string;
    public age: number;
}

export class Demo extends React.Component<DemoProps, any> {
    private foo: number;

    constructor(props: DemoProps) {
        super(props);
        this.foo = 42;
    }

    render() {
        return (
            <html>
            <head>


            </head>
            <body>
            <div >
                <div>
                   HELLO THERE
                </div>


            </div>
            </body>
            </html>
        )
    }
}