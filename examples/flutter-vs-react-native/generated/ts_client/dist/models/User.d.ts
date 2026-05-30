import { Address } from '../models/Address';
export declare class User {
    'id': string;
    'name': string;
    'email': string;
    'phone'?: string;
    'address'?: Address;
    'createdAt'?: Date;
    static readonly discriminator: string | undefined;
    static readonly mapping: {
        [index: string]: string;
    } | undefined;
    static readonly attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
        format: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
        format: string;
    }[];
    constructor();
}
