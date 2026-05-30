import { Address } from '../models/Address';
import { OrderItem } from '../models/OrderItem';
import { OrderStatus } from '../models/OrderStatus';
export declare class Order {
    'id': string;
    'userId': string;
    'items': Array<OrderItem>;
    'total': number;
    'status': OrderStatus;
    'shippingAddress'?: Address;
    'createdAt'?: Date;
    'updatedAt'?: Date;
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
