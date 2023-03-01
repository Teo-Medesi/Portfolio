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
exports.DiagnosticProvider = exports.registerDiagnosticsProvider = void 0;
const vscode = __importStar(require("vscode"));
const api_1 = __importDefault(require("../firebase/api"));
const config_store_1 = require("../firebase/config-store");
const detect_project_1 = require("../firebase/detect-project");
const API_VERSION = 'v1';
exports.registerDiagnosticsProvider = (selector, diagnosticProvider) => {
    if (vscode.window.activeTextEditor &&
        vscode.window.activeTextEditor.document.languageId === selector) {
        diagnosticProvider.refreshDiagnostics(vscode.window.activeTextEditor.document);
    }
    return vscode.Disposable.from(vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor && editor.document.languageId === selector) {
            diagnosticProvider.refreshDiagnostics(editor.document);
        }
    }), vscode.workspace.onDidChangeTextDocument((editor) => {
        if (editor.document.languageId === selector) {
            diagnosticProvider.refreshDiagnostics(editor.document);
        }
    }), vscode.workspace.onDidCloseTextDocument((document) => {
        if (document.languageId === selector) {
            diagnosticProvider.deleteDiagnostics(document);
        }
    }));
};
class DiagnosticProvider {
    constructor() {
        this.currentRefresh = null;
        this.hadNotifiedForMissingProject = {};
        this.firebaseDiagnostics = vscode.languages.createDiagnosticCollection('firebase');
        const tokens = config_store_1.configStore.get('tokens');
        const user = config_store_1.configStore.get('user');
        if (!user || !tokens) {
            vscode.window.showErrorMessage(`Failed to authenticate, have you run "npx firebase login"?`);
        }
        this.refreshToken = tokens.refresh_token;
        if (this.refreshToken) {
            api_1.default.setRefreshToken(this.refreshToken);
        }
    }
    /**
     * Analyzes the text document for problems.
     * @param doc text document to analyze
     */
    refreshDiagnostics(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.refreshToken) {
                // we need the refresh token to call the API
                return;
            }
            const project = yield detect_project_1.detectProjectNameForFile(doc.uri);
            if (!project) {
                if (!this.hadNotifiedForMissingProject[doc.uri.path]) {
                    this.hadNotifiedForMissingProject[doc.uri.path] = true;
                    vscode.window.showErrorMessage(`Failed to find firebase project, have you run "npx firebase use"?`);
                }
                return;
            }
            const currentRefresh = Math.random();
            this.currentRefresh = currentRefresh;
            const files = [{ name: doc.uri.path, content: doc.getText() }];
            try {
                const res = yield api_1.default.request('POST', `/${API_VERSION}/projects/${encodeURIComponent(project)}:test`, {
                    origin: api_1.default.rulesOrigin,
                    data: {
                        source: { files },
                    },
                    auth: true,
                });
                if (this.currentRefresh !== currentRefresh) {
                    // we started another refresh so don't override it (as it's more recent)
                    return;
                }
                if (!res.body.issues || !res.body.issues.length) {
                    this.currentRefresh = null;
                    return this.deleteDiagnostics(doc);
                }
                const diagnostics = (res.body.issues || []).map(this.createDiagnostic);
                this.firebaseDiagnostics.set(doc.uri, diagnostics);
            }
            catch (err) {
                console.error(err);
            }
            this.currentRefresh = null;
        });
    }
    deleteDiagnostics(doc) {
        this.firebaseDiagnostics.delete(doc.uri);
    }
    createDiagnostic(issue) {
        // create range that represents, where in the document the word is
        const range = new vscode.Range(issue.sourcePosition.line - 1, issue.sourcePosition.column - 1, issue.sourcePosition.line - 1, issue.sourcePosition.column +
            (issue.sourcePosition.endOffset - issue.sourcePosition.currentOffset));
        const diagnostic = new vscode.Diagnostic(range, issue.description, issue.severity === 'ERROR'
            ? vscode.DiagnosticSeverity.Error
            : vscode.DiagnosticSeverity.Warning);
        if (issue.description.indexOf('Unused function') === 0) {
            diagnostic.tags = [vscode.DiagnosticTag.Unnecessary];
        }
        return diagnostic;
    }
}
exports.DiagnosticProvider = DiagnosticProvider;
//# sourceMappingURL=diagnostics.js.map