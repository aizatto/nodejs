// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import classnames from 'classnames';

const State = {
  OPENED: 'opened',
  CLOSED: 'closed',
};

export default class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: State.CLOSED,
    }
  }

  render() {
    const title = this.props.title;

    const children = (this.props.children || []).map((child, index) => {
      const {
        title,
        onClick: onClickProp,
      } = child.props;

      let onClick = (e) => {
        this.setState({
          open: State.CLOSED,
        }, () => {
          if (onClickProp) {
            onClickProp(e);
          }
        });
      };

      return (
        <li
          key={index}
          onClick={onClick}>
          <a href="#">{title}</a>
        </li>
      );
    });

    let className = classnames([
      'dropdown',
      {
        open: this.state.open === State.OPENED,
      },
    ]);

    return (
      <div className={className}>
        <button
          className={classnames(
            "btn",
            "btn-default",
            "dropdown-toggle",
            this.props.className,
          )}
          onClick={() => this.toggleState()}
          type="button"
          id="dropdownMenu1"
          aria-haspopup="true"
          aria-expanded="true">
          {title}
          {' '}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {children}
        </ul>
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
