"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRequest = void 0;
var UpdateUserRequest = (function () {
    function UpdateUserRequest() {
    }
    UpdateUserRequest.getAttributeTypeMap = function () {
        return UpdateUserRequest.attributeTypeMap;
    };
    UpdateUserRequest.discriminator = undefined;
    UpdateUserRequest.mapping = undefined;
    UpdateUserRequest.attributeTypeMap = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "email",
            "baseName": "email",
            "type": "string",
            "format": "email"
        },
        {
            "name": "phone",
            "baseName": "phone",
            "type": "string",
            "format": ""
        },
        {
            "name": "address",
            "baseName": "address",
            "type": "Address",
            "format": ""
        }
    ];
    return UpdateUserRequest;
}());
exports.UpdateUserRequest = UpdateUserRequest;
//# sourceMappingURL=UpdateUserRequest.js.map