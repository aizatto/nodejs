// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

interface Props {
  className?: string,
  title: string,
}

export default function DropdownItem(props: Props) {
  return <>{props.title}</>;
}
