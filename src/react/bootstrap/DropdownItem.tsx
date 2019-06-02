// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';

interface Props {
  className?: string,
  onClick: () => void,
  title: string,
}

export default function DropdownItem(props: Props) {
  return <>{props.title}</>;
}
