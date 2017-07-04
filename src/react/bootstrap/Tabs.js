// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

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

    const children = _.flatten(this.props.children).map((child) => {
      const {
        eventKey,
        render: childRender,
        title,
        ...childProps
      } = { ...child.props };

      if (eventKey === activeKey) {
        childProps.className = 'active {childProps.className}';
        content = childRender();
      }

      const fn = childProps.onClick;
      childProps.key = eventKey;
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

      return <li role="presentation" {...childProps}><a href={`#${eventKey}`}>{title}</a></li>;
    });

    props.className = "nav nav-tabs {props.className}"

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
