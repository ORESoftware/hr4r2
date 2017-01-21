import * as React from 'react';


class DemoProps {
    public name: string;
    public age: number;
}

export class Demo extends React.Component<DemoProps, any> {
    private foo: number;

    constructor(props: DemoProps) {
        super(props);
    }

    render() {
        return (
            <html>
            <head>
                <script data-main="/js/main" src="/vendor/require.js"></script>
                <script>
                    define('@AdminUIConfig', [], function () {
                    return new Object(<%- data %>);
                });
                </script>

            </head>
            <body>
            <div id="root">
                HELLO THERE
            </div>
            <div>
                <progress id="hot-reload-progress-bar" value="100" max="100"></progress>
            </div>
            </body>
            </html>
        )
    }
}