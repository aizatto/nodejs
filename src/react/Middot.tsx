import * as React from 'react';

export default function Middot(props): JSX.Element {
  const length = props.children.length;

  const children = [];
  for (let i = 0; i < length; i++) {
    const child = props.children[i];
    children.push(child);

    if (i < length - 1) {
      children.push(<span key={i}> &middot; </span>);
    }
  }

  return <>{children}</>;
};
