"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order = (function () {
    function Order() {
    }
    Order.getAttributeTypeMap = function () {
        return Order.attributeTypeMap;
    };
    Order.discriminator = undefined;
    Order.mapping = undefined;
    Order.attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "userId",
            "baseName": "userId",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<OrderItem>",
            "format": ""
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number",
            "format": ""
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "OrderStatus",
            "format": ""
        },
        {
            "name": "shippingAddress",
            "baseName": "shippingAddress",
            "type": "Address",
            "format": ""
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "updatedAt",
            "baseName": "updatedAt",
            "type": "Date",
            "format": "date-time"
        }
    ];
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=Order.js.map