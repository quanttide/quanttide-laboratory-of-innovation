"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
__exportStar(require("../models/Address"), exports);
__exportStar(require("../models/CreateUserRequest"), exports);
__exportStar(require("../models/Order"), exports);
__exportStar(require("../models/OrderItem"), exports);
__exportStar(require("../models/OrderStatus"), exports);
__exportStar(require("../models/PageRequest"), exports);
__exportStar(require("../models/PageResponse"), exports);
__exportStar(require("../models/Product"), exports);
__exportStar(require("../models/ProductCategory"), exports);
__exportStar(require("../models/UpdateUserRequest"), exports);
__exportStar(require("../models/User"), exports);
var Address_1 = require("../models/Address");
var CreateUserRequest_1 = require("../models/CreateUserRequest");
var Order_1 = require("../models/Order");
var OrderItem_1 = require("../models/OrderItem");
var PageRequest_1 = require("../models/PageRequest");
var PageResponse_1 = require("../models/PageResponse");
var Product_1 = require("../models/Product");
var UpdateUserRequest_1 = require("../models/UpdateUserRequest");
var User_1 = require("../models/User");
var primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
];
var enumsMap = new Set([
    "OrderStatus",
    "ProductCategory",
]);
var typeMap = {
    "Address": Address_1.Address,
    "CreateUserRequest": CreateUserRequest_1.CreateUserRequest,
    "Order": Order_1.Order,
    "OrderItem": OrderItem_1.OrderItem,
    "PageRequest": PageRequest_1.PageRequest,
    "PageResponse": PageResponse_1.PageResponse,
    "Product": Product_1.Product,
    "UpdateUserRequest": UpdateUserRequest_1.UpdateUserRequest,
    "User": User_1.User,
};
var parseMimeType = function (mimeType) {
    var _a = mimeType.split('/'), _b = _a[0], type = _b === void 0 ? '' : _b, _c = _a[1], subtype = _c === void 0 ? '' : _c;
    return {
        type: type,
        subtype: subtype,
        subtypeTokens: subtype.split('+'),
    };
};
var mimeTypePredicateFactory = function (predicate) { return function (mimeType) { return predicate(parseMimeType(mimeType)); }; };
var mimeTypeSimplePredicateFactory = function (type, subtype) { return mimeTypePredicateFactory(function (descriptor) {
    if (descriptor.type !== type)
        return false;
    if (subtype != null && descriptor.subtype !== subtype)
        return false;
    return true;
}); };
var isTextLikeMimeType = mimeTypeSimplePredicateFactory('text');
var isJsonMimeType = mimeTypeSimplePredicateFactory('application', 'json');
var isJsonLikeMimeType = mimeTypePredicateFactory(function (descriptor) { return descriptor.type === 'application' && descriptor.subtypeTokens.some(function (item) { return item === 'json'; }); });
var isOctetStreamMimeType = mimeTypeSimplePredicateFactory('application', 'octet-stream');
var isFormUrlencodedMimeType = mimeTypeSimplePredicateFactory('application', 'x-www-form-urlencoded');
var supportedMimeTypePredicatesWithPriority = [
    isJsonMimeType,
    isJsonLikeMimeType,
    isTextLikeMimeType,
    isOctetStreamMimeType,
    isFormUrlencodedMimeType,
];
var nullableSuffix = " | null";
var optionalSuffix = " | undefined";
var arrayPrefix = "Array<";
var arraySuffix = ">";
var mapPrefix = "{ [key: string]: ";
var mapSuffix = "; }";
var ObjectSerializer = (function () {
    function ObjectSerializer() {
    }
    ObjectSerializer.findCorrectType = function (data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType;
            }
            var discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType;
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    var mapping = typeMap[expectedType].mapping;
                    if (mapping != undefined && mapping[discriminatorType]) {
                        return mapping[discriminatorType];
                    }
                    else if (typeMap[discriminatorType]) {
                        return discriminatorType;
                    }
                    else {
                        return expectedType;
                    }
                }
                else {
                    return expectedType;
                }
            }
        }
    };
    ObjectSerializer.serialize = function (data, type, format) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.endsWith(nullableSuffix)) {
            var subType = type.slice(0, -nullableSuffix.length);
            return ObjectSerializer.serialize(data, subType, format);
        }
        else if (type.endsWith(optionalSuffix)) {
            var subType = type.slice(0, -optionalSuffix.length);
            return ObjectSerializer.serialize(data, subType, format);
        }
        else if (type.startsWith(arrayPrefix)) {
            var subType = type.slice(arrayPrefix.length, -arraySuffix.length);
            var transformedData = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var date = data_1[_i];
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        }
        else if (type.startsWith(mapPrefix)) {
            var subType = type.slice(mapPrefix.length, -mapSuffix.length);
            var transformedData = {};
            for (var key in data) {
                transformedData[key] = ObjectSerializer.serialize(data[key], subType, format);
            }
            return transformedData;
        }
        else if (type === "Date") {
            if (!(data instanceof Date)) {
                return data;
            }
            if (format == "date") {
                var month = data.getMonth() + 1;
                var monthStr = month < 10 ? "0" + month.toString() : month.toString();
                var day = data.getDate();
                var dayStr = day < 10 ? "0" + day.toString() : day.toString();
                return data.getFullYear() + "-" + monthStr + "-" + dayStr;
            }
            else {
                return data.toISOString();
            }
        }
        else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            type = this.findCorrectType(data, type);
            var attributeTypes = typeMap[type].getAttributeTypeMap();
            var instance = {};
            for (var _a = 0, attributeTypes_1 = attributeTypes; _a < attributeTypes_1.length; _a++) {
                var attributeType = attributeTypes_1[_a];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    };
    ObjectSerializer.deserialize = function (data, type, format) {
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.endsWith(nullableSuffix)) {
            var subType = type.slice(0, -nullableSuffix.length);
            return ObjectSerializer.deserialize(data, subType, format);
        }
        else if (type.endsWith(optionalSuffix)) {
            var subType = type.slice(0, -optionalSuffix.length);
            return ObjectSerializer.deserialize(data, subType, format);
        }
        else if (type.startsWith(arrayPrefix)) {
            var subType = type.slice(arrayPrefix.length, -arraySuffix.length);
            var transformedData = [];
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var date = data_2[_i];
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        }
        else if (type.startsWith(mapPrefix)) {
            var subType = type.slice(mapPrefix.length, -mapSuffix.length);
            var transformedData = {};
            for (var key in data) {
                transformedData[key] = ObjectSerializer.deserialize(data[key], subType, format);
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            var instance = new typeMap[type]();
            var attributeTypes = typeMap[type].getAttributeTypeMap();
            for (var _a = 0, attributeTypes_2 = attributeTypes; _a < attributeTypes_2.length; _a++) {
                var attributeType = attributeTypes_2[_a];
                var value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
                if (value !== undefined) {
                    instance[attributeType.name] = value;
                }
            }
            return instance;
        }
    };
    ObjectSerializer.normalizeMediaType = function (mediaType) {
        var _a;
        if (mediaType === undefined) {
            return undefined;
        }
        return ((_a = mediaType.split(";")[0]) !== null && _a !== void 0 ? _a : '').trim().toLowerCase();
    };
    ObjectSerializer.getPreferredMediaType = function (mediaTypes) {
        if (mediaTypes.length === 0) {
            return "application/json";
        }
        var normalMediaTypes = mediaTypes.map(ObjectSerializer.normalizeMediaType);
        for (var _i = 0, supportedMimeTypePredicatesWithPriority_1 = supportedMimeTypePredicatesWithPriority; _i < supportedMimeTypePredicatesWithPriority_1.length; _i++) {
            var predicate = supportedMimeTypePredicatesWithPriority_1[_i];
            for (var _a = 0, normalMediaTypes_1 = normalMediaTypes; _a < normalMediaTypes_1.length; _a++) {
                var mediaType = normalMediaTypes_1[_a];
                if (mediaType != null && predicate(mediaType)) {
                    return mediaType;
                }
            }
        }
        throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
    };
    ObjectSerializer.stringify = function (data, mediaType) {
        if (isTextLikeMimeType(mediaType)) {
            return String(data);
        }
        if (isJsonLikeMimeType(mediaType)) {
            return JSON.stringify(data);
        }
        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
    };
    ObjectSerializer.parse = function (rawData, mediaType) {
        if (mediaType === undefined) {
            throw new Error("Cannot parse content. No Content-Type defined.");
        }
        if (isTextLikeMimeType(mediaType)) {
            return rawData;
        }
        if (isJsonLikeMimeType(mediaType)) {
            return JSON.parse(rawData);
        }
        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
    };
    return ObjectSerializer;
}());
exports.ObjectSerializer = ObjectSerializer;
//# sourceMappingURL=ObjectSerializer.js.map