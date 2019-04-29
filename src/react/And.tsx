import * as React from 'react';

export default function And(props): JSX.Element {
  const children = props.children.filter(a => a);
  const length = children.length;

  const newChildren = [];
  for (let i = 0; i < length; i++) {
    newChildren.push(children[i]);

    if (i < length - 2) {
      newChildren.push(', ');
    } else if (i === length - 2) {
      newChildren.push(', and ');
    }
  }

  return <>{newChildren}</>;
}
