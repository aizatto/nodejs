import { GraphQLResolveInfo } from 'graphql';
declare type Args = {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
    order?: string;
    sort?: string;
};
interface WhereQuery {
    limit(number?: number): WhereQuery;
    offset(number?: number): WhereQuery;
    orderBy(order?: string, sort?: string): Array<any>;
}
export declare function connectionArgsToLimitAndOffset(args: any): {
    limit: any;
    offset: any;
};
export declare function fieldsFromInfo(info: GraphQLResolveInfo): Set<unknown>;
export declare function addArgsToQuery(args: Args, query: WhereQuery): WhereQuery;
export declare function connectionFromKnex(args: Args, query: WhereQuery, countQuery: Promise<any>, info?: GraphQLResolveInfo): Promise<any>;
export {};
//# sourceMappingURL=fn.d.ts.map