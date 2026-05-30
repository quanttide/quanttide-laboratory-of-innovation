"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRequest = void 0;
var CreateUserRequest = (function () {
    function CreateUserRequest() {
    }
    CreateUserRequest.getAttributeTypeMap = function () {
        return CreateUserRequest.attributeTypeMap;
    };
    CreateUserRequest.discriminator = undefined;
    CreateUserRequest.mapping = undefined;
    CreateUserRequest.attributeTypeMap = [
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
    return CreateUserRequest;
}());
exports.CreateUserRequest = CreateUserRequest;
//# sourceMappingURL=CreateUserRequest.js.map