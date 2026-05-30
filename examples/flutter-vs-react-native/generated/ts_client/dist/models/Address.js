"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var Address = (function () {
    function Address() {
    }
    Address.getAttributeTypeMap = function () {
        return Address.attributeTypeMap;
    };
    Address.discriminator = undefined;
    Address.mapping = undefined;
    Address.attributeTypeMap = [
        {
            "name": "province",
            "baseName": "province",
            "type": "string",
            "format": ""
        },
        {
            "name": "city",
            "baseName": "city",
            "type": "string",
            "format": ""
        },
        {
            "name": "district",
            "baseName": "district",
            "type": "string",
            "format": ""
        },
        {
            "name": "detail",
            "baseName": "detail",
            "type": "string",
            "format": ""
        },
        {
            "name": "postalCode",
            "baseName": "postalCode",
            "type": "string",
            "format": ""
        }
    ];
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=Address.js.map