interface Routes {
    [key: string]: any;
}
interface RouteToValueConfig {
    [path: string]: any;
}
export declare function getValueFromPath(pathname: string, routes: Routes, routeToValue: RouteToValueConfig): {
    keys: any[];
    match: any;
    value: any;
};
export declare function getValueAndParamsFromPath(pathname: string, routes: Routes, routeToValue: RouteToValueConfig): {
    value: any;
    params: {};
};
export {};
//# sourceMappingURL=client.d.ts.map