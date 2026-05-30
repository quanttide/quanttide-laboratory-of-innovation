"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuthMethods = configureAuthMethods;
function configureAuthMethods(config) {
    var authMethods = {};
    if (!config) {
        return authMethods;
    }
    authMethods["default"] = config["default"];
    return authMethods;
}
//# sourceMappingURL=auth.js.map