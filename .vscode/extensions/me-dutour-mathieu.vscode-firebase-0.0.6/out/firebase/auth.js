"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const config_store_1 = require("./config-store");
const api_1 = __importDefault(require("./api"));
var INVALID_CREDENTIAL_ERROR = new Error('Authentication Error: Your credentials are no longer valid. Please run `firebase login --reauth`\n\nFor CI servers and headless environments, generate a new token with `firebase login:ci`');
const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
let lastAccessToken = null;
const _haveValidAccessToken = function (refreshToken, authScopes) {
    if (!lastAccessToken) {
        const tokens = config_store_1.configStore.get('tokens');
        if (tokens && refreshToken === tokens.refresh_token) {
            lastAccessToken = tokens;
        }
    }
    if (!lastAccessToken) {
        return false;
    }
    const scopes = lastAccessToken.scopes || [];
    return (lastAccessToken.access_token &&
        lastAccessToken.refresh_token === refreshToken &&
        authScopes.every((scope) => scopes.indexOf(scope) !== -1) &&
        lastAccessToken.expires_at > Date.now() + FIFTEEN_MINUTES_IN_MS);
};
const _refreshAccessToken = function (refreshToken, authScopes) {
    return api_1.default
        .request('POST', '/oauth2/v3/token', {
        origin: api_1.default.googleOrigin,
        form: {
            refresh_token: refreshToken,
            client_id: api_1.default.clientId,
            client_secret: api_1.default.clientSecret,
            grant_type: 'refresh_token',
            scope: (authScopes || []).join(' '),
        },
        logOptions: {
            skipResponseBody: true,
        },
    })
        .then((res) => {
        var _a;
        if (res.status === 401 || res.status === 400) {
            return { access_token: refreshToken };
        }
        if (typeof res.body.access_token !== 'string') {
            throw INVALID_CREDENTIAL_ERROR;
        }
        lastAccessToken = Object.assign({ expires_at: Date.now() + res.body.expires_in * 1000, refresh_token: refreshToken, scopes: authScopes }, res.body);
        const currentRefreshToken = (_a = config_store_1.configStore.get('tokens')) === null || _a === void 0 ? void 0 : _a.refresh_token;
        if (refreshToken === currentRefreshToken) {
            config_store_1.configStore.set('tokens', lastAccessToken);
        }
        return lastAccessToken;
    }, (err) => {
        var _a;
        if (((_a = err.body) === null || _a === void 0 ? void 0 : _a.error) === 'invalid_scope') {
            throw new Error('This command requires new authorization scopes not granted to your current session. Please run `firebase login --reauth`\n\n' +
                'For CI servers and headless environments, generate a new token with `firebase login:ci`');
        }
        throw err;
    });
};
exports.getAccessToken = function (refreshToken, authScopes) {
    if (_haveValidAccessToken(refreshToken, authScopes) && lastAccessToken) {
        return Promise.resolve(lastAccessToken);
    }
    return _refreshAccessToken(refreshToken, authScopes);
};
//# sourceMappingURL=auth.js.map