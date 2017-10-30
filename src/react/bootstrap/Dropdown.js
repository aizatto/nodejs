// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import classnames from 'classnames';

const State = {
  OPENED: 'opened',
  CLOSED: 'closed',
};

export default class Dropdown extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.array,
    className: PropTypes.string,
  };

  static defaultProps = {
    children: [],
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      open: State.CLOSED,
    };
  }

  render() {
    const className = classnames([
      'dropdown',
      {
        show: this.state.open === State.OPENED,
      },
    ]);

    const title = this.props.title;

    return (
      <div className={className}>
        <button
          className={classnames(
            'btn',
            'btn-secondary',
            'dropdown-toggle',
            this.props.className,
          )}
          onClick={() => this.toggleState()}
          type="button"
          aria-haspopup="true"
          aria-expanded={this.state.open === State.OPENED}
        >
          {title}
        </button>
        {this.renderChildren()}
      </div>
    );
  }

  renderChildren() {
    const children = this.props.children.map((child, index) => {
      const {
        title,
        onClick: onClickProp,
      } = child.props;

      const onClick = (e) => {
        e.preventDefault();
        this.setState({
          open: State.CLOSED,
        }, () => {
          if (onClickProp) {
            onClickProp(e);
          }
        });
      };

      return (
        <a
          key={index}
          onClick={onClick}
          className="dropdown-item"
          href="#dropdown">{title}</a>
      );
    });

    const className = classnames([
      'dropdown-menu',
      {
        show: this.state.open === State.OPENED,
      },
    ]);

    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  toggleState() {
    this.setState({
      open: this.state.open === State.OPENED
        ? State.CLOSED
        : State.OPENED,
    });
  }

}
