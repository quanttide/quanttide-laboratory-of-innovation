export * from '../models/Address';
export * from '../models/CreateUserRequest';
export * from '../models/Order';
export * from '../models/OrderItem';
export * from '../models/OrderStatus';
export * from '../models/PageRequest';
export * from '../models/PageResponse';
export * from '../models/Product';
export * from '../models/ProductCategory';
export * from '../models/UpdateUserRequest';
export * from '../models/User';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string, format: string): any;
    static deserialize(data: any, type: string, format: string): any;
    static normalizeMediaType(mediaType: string | undefined): string | undefined;
    static getPreferredMediaType(mediaTypes: Array<string>): string;
    static stringify(data: any, mediaType: string): string;
    static parse(rawData: string, mediaType: string | undefined): any;
}
