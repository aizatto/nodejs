import React from "react";
import { RelayPaginationProp } from 'react-relay';
interface Props {
    loadMore: () => void;
    className?: string;
    children?: React.ReactNode;
    relay: RelayPaginationProp;
}
declare const ScrollPagination: React.FC<Props>;
export default ScrollPagination;
//# sourceMappingURL=ScrollPagination.d.ts.map