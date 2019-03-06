// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { flatten } from 'lodash';

import { compareURL } from '../../fn';

declare const window;

interface Props {
  className: string,
  // eslint-disable-next-line react/forbid-prop-types
  defaultActiveKey: string;
  onSelect(eventKey:string): void;
  children?: any;
}

interface State {
  activeKey: string;
}

export default class Tabs extends React.Component<Props, State> {

  static defaultProps = {
    defaultActiveKey: null,
    onSelect: null,
    className: '',
  }

  constructor(props: Props) {
    super(props);
    let activeKey = props.defaultActiveKey;
    if (activeKey === null &&
        props.children.length > 0) {
      activeKey = props.children[0].props.eventKey;
    }

    this.state = {
      activeKey,
    };
  }

  render() {
    const {
      defaultActiveKey,
      onSelect,
      ...props
    } = this.props;
    const { activeKey } = this.state;
    let content = null;

    const currentUrl = window.location.toString();

    const children = flatten(this.props.children).map((child) => {
      if (!child) {
        return null;
      }

      const {
        eventKey,
        href: hrefProp,
        render: childRender,
        className,
        title,
        ...childProps
      } = child.props;

      let href = hrefProp;

      childProps.key = eventKey;
      let aClassName = '';

      if (href) {
        if (eventKey === activeKey ||
            compareURL(currentUrl, href)) {
          aClassName = 'active';
        }
      } else {
        if (eventKey === activeKey) {
          aClassName = 'active';
          content = childRender
            ? childRender()
            : null;
        }

        href = `#${eventKey}`;
        const fn = childProps.onClick;
        childProps.onClick = (e) => {
          this.setState({
            activeKey: eventKey,
          }, () => {
            if (fn) {
              fn(e);
            }
            if (onSelect) {
              onSelect(eventKey);
            }
          });
        };
      }

      return (
        <li
          role="presentation"
          className={`nav-item ${className}`}
          {...childProps}
        >
          <a className={`nav-link ${aClassName}`} href={href}>{title}</a>
        </li>
      );
    });

    const className = `nav nav-tabs ${props.className}`;

    return (
      <div>
        <ul {...props} className={className}>
          {children}
        </ul>
        {content}
      </div>
    );
  }

}
