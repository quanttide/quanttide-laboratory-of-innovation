"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
var OrderItem = (function () {
    function OrderItem() {
    }
    OrderItem.getAttributeTypeMap = function () {
        return OrderItem.attributeTypeMap;
    };
    OrderItem.discriminator = undefined;
    OrderItem.mapping = undefined;
    OrderItem.attributeTypeMap = [
        {
            "name": "productId",
            "baseName": "productId",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "productName",
            "baseName": "productName",
            "type": "string",
            "format": ""
        },
        {
            "name": "quantity",
            "baseName": "quantity",
            "type": "number",
            "format": ""
        },
        {
            "name": "price",
            "baseName": "price",
            "type": "number",
            "format": ""
        }
    ];
    return OrderItem;
}());
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map