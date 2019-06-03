// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

interface Props extends Omit<React.HTMLProps<HTMLElement>, "title"> {
  eventKey: string,
  title: React.ReactNode,
  href?: string,
  render?: () => JSX.Element | null,
}

export default function Tab(props: Props) {
  return <>{props.title}</>;
}
