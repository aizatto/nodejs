import * as React from 'react';
interface Props extends Omit<React.HTMLProps<HTMLElement>, "onSelect"> {
    defaultActiveKey: string;
    onSelect(eventKey: string): void;
}
interface State {
    activeKey: string;
}
export default class Tabs extends React.Component<Props, State> {
    static defaultProps: {
        defaultActiveKey: any;
        onSelect: any;
        className: string;
    };
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=Tabs.d.ts.map