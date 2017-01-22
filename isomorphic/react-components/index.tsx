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
        return 'define(\"@AdminUIConfig\", [], function () {' +
            ' return new Object();' +
            '});'
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

        const isDev =  true || process.env.NODE_ENV === 'dev';
        return (
            <html>
            <head>
                {isDev ? this.getDevHead() : this.getProdHead()}

                {/*<script>*/}
                    {/*{this.getScript()}*/}
                {/*</script>*/}

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