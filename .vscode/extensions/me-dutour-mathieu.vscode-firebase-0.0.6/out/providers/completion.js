"use strict";
/**
MIT License

Copyright (c) 2019 Toba Technology

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 */
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
// from https://github.com/toba/vsfire/blob/master/src/providers/completion.ts
const vscode_1 = require("vscode");
const grammar_1 = require("../grammar");
const parse_1 = require("../parse");
const cache = {};
/**
 * Provide suggestions for previous word or partial word.
 * https://code.visualstudio.com/docs/extensionAPI/language-support#_show-code-completion-proposals
 */
class RuleCompletionProvider {
    provideCompletionItems(doc, pos, _tok) {
        const word = parse_1.priorWord(doc, pos);
        if (word == null || word == '') {
            return null;
        }
        if (word.slice(-1) == '.') {
            return members(word.slice(0, -1));
        }
        return directives(word);
    }
}
exports.default = RuleCompletionProvider;
/**
 * Completions for stand-alone directives `service`, `match` and `allow`.
 */
function directives(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cache[name]) {
            return Promise.resolve(cache[name]);
        }
        let items = null;
        if (name == 'allow') {
            const allows = yield grammar_1.accessModifiers();
            items = allows.map((a) => {
                const i = new vscode_1.CompletionItem(a.name, vscode_1.CompletionItemKind.Keyword);
                i.documentation = sanitize(a.about);
                return i;
            });
        }
        return Promise.resolve(items);
    });
}
/**
 * Build `CompletionItem`s from `TypeInfo` and `MethodInfo` lists compiled in
 * the `grammar` module.
 */
function members(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cache[name]) {
            return Promise.resolve(cache[name]);
        }
        const info = yield grammar_1.findType(name);
        let items = null;
        if (info !== null) {
            items = [];
            if (info.fields) {
                addFields(items, info.fields);
            }
            if (info.methods) {
                addMethods(items, info.methods);
            }
            if (items.length == 0) {
                items = null;
            }
        }
        cache[name] = items;
        return items;
    });
}
function addFields(items, fields) {
    Object.keys(fields).forEach((key) => {
        const name = key;
        const f = fields[name];
        const c = new vscode_1.CompletionItem(name, vscode_1.CompletionItemKind.Field);
        c.documentation = sanitize(f.about);
        items.push(c);
    });
}
function addMethods(items, methods) {
    Object.keys(methods).forEach((key) => {
        var _a;
        const name = key;
        const m = methods[name];
        const c = new vscode_1.CompletionItem(name, vscode_1.CompletionItemKind.Method);
        c.documentation = sanitize(m.about);
        c.detail = `(${(_a = m.parameters) === null || _a === void 0 ? void 0 : _a.join(', ')}) -> ${m.returns}`;
        if (m.snippet) {
            c.insertText = new vscode_1.SnippetString(m.snippet);
        }
        items.push(c);
    });
}
/**
 * Completions don't appear to support markdown.
 */
const sanitize = (text) => text.replace(/[`\*]/g, '');
//# sourceMappingURL=completion.js.map