import * as React from 'react';
interface Props {
    className: string;
    title: string;
    children: any[];
}
interface ComponentState {
    open: string;
}
export default class Dropdown extends React.Component<Props, ComponentState> {
    static defaultProps: {
        children: any[];
        className: string;
    };
    constructor(props: any);
    render(): JSX.Element;
    renderChildren(): JSX.Element;
    toggleState(): void;
}
export {};
//# sourceMappingURL=Dropdown.d.ts.map