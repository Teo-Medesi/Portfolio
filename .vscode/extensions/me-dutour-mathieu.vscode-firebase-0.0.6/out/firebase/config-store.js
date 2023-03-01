"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStore = void 0;
const configstore_1 = __importDefault(require("configstore"));
// we try to hook into the config store of firebase-tools
exports.configStore = new configstore_1.default('firebase-tools');
//# sourceMappingURL=config-store.js.map