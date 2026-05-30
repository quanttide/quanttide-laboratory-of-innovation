"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = (function () {
    function Product() {
    }
    Product.getAttributeTypeMap = function () {
        return Product.attributeTypeMap;
    };
    Product.discriminator = undefined;
    Product.mapping = undefined;
    Product.attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string",
            "format": ""
        },
        {
            "name": "price",
            "baseName": "price",
            "type": "number",
            "format": ""
        },
        {
            "name": "category",
            "baseName": "category",
            "type": "ProductCategory",
            "format": ""
        },
        {
            "name": "tags",
            "baseName": "tags",
            "type": "Set<string>",
            "format": ""
        },
        {
            "name": "stock",
            "baseName": "stock",
            "type": "number",
            "format": ""
        },
        {
            "name": "published",
            "baseName": "published",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            "type": "Date",
            "format": "date-time"
        }
    ];
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map