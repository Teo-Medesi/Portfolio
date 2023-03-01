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
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectProjectNameForFile = exports.detectProjectRootForFile = void 0;
const util_1 = require("util");
const vscode = __importStar(require("vscode"));
const config_store_1 = require("./config-store");
const { fs } = vscode.workspace;
const memory = new Map();
function exists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs.readFile(path);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
function detectProjectRoot(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingRoot = memory.get(cwd.path);
        if (existingRoot && (yield exists(existingRoot))) {
            return existingRoot;
        }
        let projectRootDir = cwd;
        while (!(yield exists(vscode.Uri.joinPath(projectRootDir, './firebase.json')))) {
            const parentDir = vscode.Uri.joinPath(projectRootDir, '../');
            if (parentDir === projectRootDir) {
                return null;
            }
            projectRootDir = parentDir;
        }
        return projectRootDir;
    });
}
function detectProjectRootForFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = vscode.Uri.joinPath(filePath, '../');
        const projectRoot = yield detectProjectRoot(cwd);
        if (!projectRoot) {
            return undefined;
        }
        memory.set(cwd.path, projectRoot);
        return projectRoot;
    });
}
exports.detectProjectRootForFile = detectProjectRootForFile;
function detectProjectNameForFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectRoot = yield detectProjectRootForFile(filePath);
        if (!projectRoot) {
            return undefined;
        }
        const activeProjects = config_store_1.configStore.get('activeProjects') || {};
        let projectName = activeProjects[projectRoot.path] ||
            activeProjects[projectRoot.path.replace(/\/$/, '')];
        // handle project aliases
        if (projectName) {
            const firebasercPath = vscode.Uri.joinPath(projectRoot, '.firebaserc');
            try {
                const firebasercContent = yield fs.readFile(firebasercPath);
                const firebaserc = JSON.parse(new util_1.TextDecoder('utf-8').decode(firebasercContent));
                if (firebaserc.projects[projectName]) {
                    projectName = firebaserc.projects[projectName];
                }
            }
            catch (err) { }
        }
        return projectName;
    });
}
exports.detectProjectNameForFile = detectProjectNameForFile;
//# sourceMappingURL=detect-project.js.map