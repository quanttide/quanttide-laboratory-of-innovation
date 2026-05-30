import { ProductCategory } from '../models/ProductCategory';
export declare class Product {
    'id': string;
    'name': string;
    'description'?: string;
    'price': number;
    'category': ProductCategory;
    'tags'?: Set<string>;
    'stock'?: number;
    'published'?: boolean;
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
