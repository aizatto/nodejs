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
  };

  static defaultProps = {
    defaultActiveKey: null,
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
    const { activeKey } = this.state;
    let content = null;

    const children = _.flatten(this.props.children).map((child) => {
      const { title, ...props } = { ...child.props };

      if (props.eventKey === activeKey) {
        props.className = 'active {props.className}';
        content = props.render();
      }

      const fn = props.onClick;
      props.key = props.eventKey;
      props.onClick = (e) => {
        this.setState({
          activeKey: props.eventKey,
        }, () => {
          if (fn) {
            fn(e);
          }
        });
      };

      return <li role="presentation" {...props}><a href={`#{props.eventKey}`}>{title}</a></li>;
    });

    return (
      <div>
        <ul className="nav nav-tabs">
          {children}
        </ul>
        {content}
      </div>
    );
  }

}
