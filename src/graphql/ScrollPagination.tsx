import React, { useEffect, useRef } from "react";
import { RelayPaginationProp } from 'react-relay';

interface Props {
  loadMore: () => void;
  className?: string;
  children?: React.ReactNode;
  relay: RelayPaginationProp;
}

function Status(props: Props): JSX.Element {
  if (!props.relay.hasMore()) {
    return <></>;
  }

  // TODO: there is a race condition here
  if (props.relay.isLoading()) {
    return <>Loading...</>;
  }

  return <span onClick={() => props.loadMore()}>Scroll To Load More</span>;
}

const ScrollPagination: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = () => {
      if (!props.relay.hasMore() || props.relay.isLoading()) {
        return;
      }

      const el = ref.current;
      if (!el) {
        return;
      }

      const elementBottom = el.scrollTop + el.scrollHeight;
      const screenBottom = window.pageYOffset + window.innerHeight;

      if (elementBottom <= screenBottom) {
        props.loadMore();
      }
    };
    listener();
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return (
    <div className={props.className} ref={ref}>
      {props.children}
      <Status {...props} />
    </div>
  );
}

export default ScrollPagination;
