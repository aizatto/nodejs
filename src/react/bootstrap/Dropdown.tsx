// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

import classnames from 'classnames';

const State = {
  OPENED: 'opened',
  CLOSED: 'closed',
};

interface Props {
  className: string,
  title: string,
  children: any[],
}

interface ComponentState {
  open: string;
}

export default class Dropdown extends React.Component<Props, ComponentState> {

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

    const { title } = this.props;

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
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={onClick}
          className="dropdown-item"
          href="#dropdown"
        >
          {title}
        </a>
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
    this.setState((prevState) => ({
      open: prevState.open === State.OPENED
        ? State.CLOSED
        : State.OPENED,
    }));
  }

}
