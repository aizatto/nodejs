interface Routes {
    [key: string]: any;
}
interface RouteToValueConfig {
    [path: string]: string;
}
export declare function getValueFromPath(pathname: string, routes: Routes, routeToValue: RouteToValueConfig): {
    keys: any[];
    match: any;
    value: string;
};
export declare function getValueAndParamsFromPath(pathname: string, routes: Routes, routeToValue: RouteToValueConfig): {
    value: string;
    params: {};
};
export {};
//# sourceMappingURL=client.d.ts.map