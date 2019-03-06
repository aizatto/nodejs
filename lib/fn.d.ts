export declare function getQueryString(): any;
/**
 * To be used like so:
 *
 *   const key = getWindowHash(new Set(Object.keys(tabFns)));
 */
export declare function getWindowHash(keys: Set<string>): any;
/**
 * To be used in React components.
 *
 *   const onSelect = (key) => {
 *     this.setState(
 *       { key },
 *       setWindowHash(key),
 *     );
 *   };
 */
export declare function setWindowHash(key: any): () => void;
export declare function setMath<T>(a: Set<T>, b: Set<T>): {
    remove: T[];
    add: T[];
};
export declare function conjuction(sentences: Array<string>): string;
export declare function dayOfYear(date: Date): Number;
export declare function currentDaysOfYear(date: Date): Array<Number>;
/**
 * Scenarios:
 * * urlA has hostname, urlB does not have hostname
 *
 * TODO: replace this logic, it is really basic
 */
export declare function compareURL(stringA: string, stringB: string): Boolean;
//# sourceMappingURL=fn.d.ts.map