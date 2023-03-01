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
exports.getCoverageFile = void 0;
const util_1 = require("util");
const vscode = __importStar(require("vscode"));
const detect_project_1 = require("./detect-project");
const { fs } = vscode.workspace;
const memory = new Map();
const watchers = [];
function flattenReport(report) {
    const res = [];
    report.forEach((r) => {
        const start = new vscode.Position(r.sourcePosition.line - 1, r.sourcePosition.column - 1);
        res.push({
            range: new vscode.Range(start, start.translate(undefined, r.sourcePosition.endOffset - r.sourcePosition.currentOffset + 2)),
            values: r.values,
        });
        if (r.children) {
            res.push(...flattenReport(r.children));
        }
    });
    return res;
}
function getCoverageFile(doc, coveragePath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!coveragePath) {
            return undefined;
        }
        const projectRoot = yield detect_project_1.detectProjectRootForFile(doc);
        if (!projectRoot) {
            return undefined;
        }
        try {
            const resolvedCoveragePath = vscode.Uri.joinPath(projectRoot, coveragePath);
            const existing = memory.get(resolvedCoveragePath.path);
            if (existing) {
                return existing;
            }
            const coveragePathContent = yield fs.readFile(resolvedCoveragePath);
            const coverage = new util_1.TextDecoder('utf-8').decode(coveragePathContent);
            const coverageData = JSON.parse(coverage
                .split('// Populated by the emulator at runtime\nconst data = ')[1]
                .split(';\n\nconst REPORT_LIMIT_SIZE')[0]);
            if (coverageData.rules.files[0].name !== doc.path) {
                console.error('report for the wrong file');
                return undefined;
            }
            const watcher = vscode.workspace.createFileSystemWatcher(resolvedCoveragePath.path);
            watcher.onDidChange((e) => {
                console.log(e.path);
                memory.delete(e.path);
            });
            watcher.onDidDelete((e) => {
                memory.delete(e.path);
            });
            watcher.onDidCreate((e) => {
                memory.delete(e.path);
            });
            watchers.push(watcher);
            const report = flattenReport(coverageData.report);
            memory.set(resolvedCoveragePath.path, report);
            return report;
        }
        catch (err) {
            console.error('cannot find coverage file');
        }
    });
}
exports.getCoverageFile = getCoverageFile;
//# sourceMappingURL=get-coverage-file.js.map