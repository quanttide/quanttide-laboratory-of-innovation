"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageResponse = void 0;
var PageResponse = (function () {
    function PageResponse() {
    }
    PageResponse.getAttributeTypeMap = function () {
        return PageResponse.attributeTypeMap;
    };
    PageResponse.discriminator = undefined;
    PageResponse.mapping = undefined;
    PageResponse.attributeTypeMap = [
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<User>",
            "format": ""
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number",
            "format": ""
        },
        {
            "name": "page",
            "baseName": "page",
            "type": "number",
            "format": ""
        },
        {
            "name": "size",
            "baseName": "size",
            "type": "number",
            "format": ""
        }
    ];
    return PageResponse;
}());
exports.PageResponse = PageResponse;
//# sourceMappingURL=PageResponse.js.map