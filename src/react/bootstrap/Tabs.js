// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

import url from 'url';

import { compareURL } from './../../fn';

export default class Tabs extends React.Component {

  static propTypes = {
    defaultActiveKey: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    defaultActiveKey: null,
    onSelect: null,
  }

  constructor(props) {
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

    const children = _.flatten(this.props.children).map((child) => {
      if (!child) {
        return null;
      }

      const {
        eventKey,
        href: hrefProp,
        render: childRender,
        title,
        ...childProps
      } = { ...child.props };

      let href = hrefProp;

      childProps.key = eventKey;

      let className = childProps.className
        ? childProps.className
        : ''
      delete childProps.className;

      if (href) {
        if (compareURL(currentUrl, href)) {
          className = `active ${className}`;
        };
      } else {
        if (eventKey === activeKey) {
          className = `active ${className}`;
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
          className={className}
          {...childProps}>
            <a href={href}>{title}</a>
        </li>
      );
    });

    props.className = `nav nav-tabs ${props.className ? props.className : ''}`;

    return (
      <div>
        <ul {...props}>
          {children}
        </ul>
        {content}
      </div>
    );
  }

}
