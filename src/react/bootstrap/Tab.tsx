// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

interface Props {
  eventKey: string,
  className?: string,
  title: string,
  render?(): JSX.Element,
}

export default function Tab(props: Props) {
  return <>{props.title}</>;
}

Tab.defaultProps = {
  className: '',
};
