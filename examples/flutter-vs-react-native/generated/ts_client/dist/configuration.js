"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfiguration = createConfiguration;
exports.mergeConfiguration = mergeConfiguration;
exports.wrapOptions = wrapOptions;
var middleware_1 = require("./middleware");
var isomorphic_fetch_1 = require("./http/isomorphic-fetch");
var servers_1 = require("./servers");
var auth_1 = require("./auth/auth");
function createConfiguration(conf) {
    if (conf === void 0) { conf = {}; }
    var configuration = {
        baseServer: conf.baseServer !== undefined ? conf.baseServer : servers_1.server1,
        httpApi: conf.httpApi || new isomorphic_fetch_1.IsomorphicFetchHttpLibrary(),
        middleware: conf.middleware || [],
        authMethods: (0, auth_1.configureAuthMethods)(conf.authMethods)
    };
    if (conf.promiseMiddleware) {
        conf.promiseMiddleware.forEach(function (m) { return configuration.middleware.push(new middleware_1.PromiseMiddlewareWrapper(m)); });
    }
    return configuration;
}
function mergeConfiguration(conf, options) {
    if (!options) {
        return conf;
    }
    return {
        baseServer: options.baseServer || conf.baseServer,
        httpApi: options.httpApi || conf.httpApi,
        authMethods: options.authMethods || conf.authMethods,
        middleware: mergeMiddleware(conf.middleware, options === null || options === void 0 ? void 0 : options.middleware, options === null || options === void 0 ? void 0 : options.middlewareMergeStrategy),
    };
}
function mergeMiddleware(staticMiddleware, calltimeMiddleware, strategy) {
    if (strategy === void 0) { strategy = "replace"; }
    if (!calltimeMiddleware) {
        return staticMiddleware;
    }
    switch (strategy) {
        case "append":
            return staticMiddleware.concat(calltimeMiddleware);
        case "prepend":
            return calltimeMiddleware.concat(staticMiddleware);
        case "replace":
            return calltimeMiddleware;
        default:
            throw new Error("Unrecognized middleware merge strategy '".concat(strategy, "'"));
    }
}
function wrapOptions(options) {
    var _a;
    if (options) {
        return {
            baseServer: options.baseServer,
            httpApi: options.httpApi,
            middleware: (_a = options.middleware) === null || _a === void 0 ? void 0 : _a.map(function (m) { return new middleware_1.PromiseMiddlewareWrapper(m); }),
            middlewareMergeStrategy: options.middlewareMergeStrategy,
            authMethods: options.authMethods,
        };
    }
    return;
}
//# sourceMappingURL=configuration.js.map