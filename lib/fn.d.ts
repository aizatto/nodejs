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
export declare function setEqual<T>(a: Set<T>, b: Set<T>): boolean;
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
export declare class Counter<T> {
    map: Map<T, number>;
    constructor();
    increment(key: T): void;
    keys(): T[];
}
export declare class MatrixCounter<T, T2> {
    map: Map<T, Counter<T2>>;
    columns: Set<T2>;
    constructor();
    increment(key: T, key2: T2): void;
    keys(): T[];
}
//# sourceMappingURL=fn.d.ts.map