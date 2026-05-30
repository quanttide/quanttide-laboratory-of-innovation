"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRequest = void 0;
var PageRequest = (function () {
    function PageRequest() {
    }
    PageRequest.getAttributeTypeMap = function () {
        return PageRequest.attributeTypeMap;
    };
    PageRequest.discriminator = undefined;
    PageRequest.mapping = undefined;
    PageRequest.attributeTypeMap = [
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
    return PageRequest;
}());
exports.PageRequest = PageRequest;
//# sourceMappingURL=PageRequest.js.map