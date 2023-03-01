"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const url_1 = require("url");
const auth = __importStar(require("./auth"));
const http_proxy_agent_1 = __importDefault(require("http-proxy-agent"));
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
let accessToken;
let refreshToken;
const commandScopes = [
    'email',
    'https://www.googleapis.com/auth/cloud-platform',
    'https://www.googleapis.com/auth/cloudplatformprojects.readonly',
    'https://www.googleapis.com/auth/firebase',
    'openid',
];
let proxyUrl = null;
let strictSSL = true;
const _request = function (options, logOptions = {}) {
    const agent = getProxyAgent(options.url, { proxyUrl, strictSSL });
    options.agent = agent;
    options.strictSSL = strictSSL;
    options.headers = options.headers || {};
    options.headers['connection'] = 'keep-alive';
    return new Promise((resolve, reject) => {
        request_1.default(options, (err, response, body) => {
            if (err) {
                return reject(new Error('Server Error. ' + err.message));
            }
            if (response.statusCode >= 400 && !logOptions.skipResponseBody) {
                return reject(response);
            }
            return resolve({
                status: response.statusCode,
                response: response,
                body: body,
            });
        });
    });
};
const api = {
    clientId: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
    clientSecret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
    googleOrigin: 'https://www.googleapis.com',
    rulesOrigin: 'https://firebaserules.googleapis.com',
    configure(_proxyUrl, _strictSSL) {
        proxyUrl = _proxyUrl;
        strictSSL = _strictSSL;
    },
    setRefreshToken(token) {
        refreshToken = token;
    },
    setAccessToken(token) {
        accessToken = token;
    },
    getAccessToken() {
        return accessToken
            ? Promise.resolve({ access_token: accessToken })
            : auth.getAccessToken(refreshToken, commandScopes);
    },
    addRequestHeaders: function (reqOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!reqOptions.headers) {
                reqOptions.headers = {};
            }
            const { access_token } = yield api.getAccessToken();
            reqOptions.headers.authorization = 'Bearer ' + access_token;
            return reqOptions;
        });
    },
    request(method, resource, options) {
        options = Object.assign({ json: true }, options);
        const validMethods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'];
        if (validMethods.indexOf(method) < 0) {
            method = 'GET';
        }
        const reqOptions = {
            method: method,
            url: options.origin + resource,
            json: options.json,
            qs: options.qs,
            headers: options.headers,
            timeout: options.timeout,
        };
        if (options.data) {
            reqOptions.body = options.data;
        }
        else if (options.form) {
            reqOptions.form = options.form;
        }
        var requestFunction = function () {
            return _request(reqOptions, options.logOptions);
        };
        if (options.auth === true) {
            requestFunction = () => __awaiter(this, void 0, void 0, function* () {
                const reqOptionsWithToken = yield api.addRequestHeaders(reqOptions);
                return _request(reqOptionsWithToken, options.logOptions);
            });
        }
        return requestFunction();
    },
};
exports.default = api;
// proxy handling
function getSystemProxyURI(requestURL) {
    if (requestURL.protocol === 'http:') {
        return process.env.HTTP_PROXY || process.env.http_proxy || null;
    }
    else if (requestURL.protocol === 'https:') {
        return (process.env.HTTPS_PROXY ||
            process.env.https_proxy ||
            process.env.HTTP_PROXY ||
            process.env.http_proxy ||
            null);
    }
    return null;
}
function getProxyAgent(rawRequestURL, options = {}) {
    const requestURL = typeof rawRequestURL === 'string' ? url_1.parse(rawRequestURL) : rawRequestURL;
    const proxyURL = options.proxyUrl || getSystemProxyURI(requestURL);
    if (!proxyURL) {
        return null;
    }
    const proxyEndpoint = url_1.parse(proxyURL);
    if (!proxyEndpoint.hostname ||
        !proxyEndpoint.protocol ||
        !/^https?:$/.test(proxyEndpoint.protocol)) {
        return null;
    }
    const opts = {
        host: proxyEndpoint.hostname,
        port: Number(proxyEndpoint.port),
        auth: proxyEndpoint.auth,
        rejectUnauthorized: typeof options.strictSSL === 'boolean' ? options.strictSSL : true,
    };
    return requestURL.protocol === 'http:'
        ? http_proxy_agent_1.default(opts)
        : https_proxy_agent_1.default(opts);
}
//# sourceMappingURL=api.js.map