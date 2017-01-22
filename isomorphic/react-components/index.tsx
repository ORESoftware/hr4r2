import * as React from 'react';


class DemoProps {
    public name: string;
    public age: number;
}

export class Demo extends React.Component<DemoProps, any> {
    private foo: number;

    constructor(props: DemoProps) {
        super(props);
        this.getScript = this.getScript.bind(this);
    }

    getScript() {

        const config = JSON.stringify({
            env: process.env.NODE_ENV
        });

        return {__html:'define("@config", [], function () {' +
            ' return ' + config +';' +
            '});'}
    }

    getProdHead() {
        return (
            <script src="/optimized/bundles/common.js"></script>
        )
    }

    getDevHead() {
        return (
            <script data-main="/js/main" src="/vendor/require.js"></script>
        )
    }


    render() {

        const isDev =  process.env.NODE_ENV !== 'production';
        return (
            <html>
            <head>
                {isDev ? this.getDevHead() : this.getProdHead()}
                <script dangerouslySetInnerHTML={this.getScript()}/>
            </head>
            <div>
                <progress id="hot-reload-progress-bar" value="100" max="100"></progress>
            </div>
            <body>
            <div id="root">
                Initial Home Page
            </div>

            </body>
            </html>
        )
    }
}