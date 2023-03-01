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
const get_coverage_file_1 = require("../firebase/get-coverage-file");
const cache = {};
class RuleHoverProvider {
    provideHover(doc, pos, cancellationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const coveragePath = vscode_1.workspace
                .getConfiguration(undefined, doc.uri)
                .get('firebase.coverageFile');
            const coverage = yield get_coverage_file_1.getCoverageFile(doc.uri, coveragePath);
            if (cancellationToken.isCancellationRequested) {
                return;
            }
            if (coverage) {
                const result = coverage.filter((r) => r.range.contains(pos));
                const mostRelevant = result.sort((a, b) => a.range.contains(b.range) ? 1 : -1)[0];
                if (mostRelevant) {
                    return new vscode_1.Hover(new vscode_1.MarkdownString(buildValueString(mostRelevant.values)), mostRelevant.range);
                }
            }
            const range = doc.getWordRangeAtPosition(pos);
            const word = parse_1.currentWord(doc, range);
            if (word == null || word == '') {
                return null;
            }
            const hover = yield members(word);
            if (cancellationToken.isCancellationRequested) {
                return;
            }
            if (hover) {
                hover.range = range;
            }
            return hover;
        });
    }
}
exports.default = RuleHoverProvider;
/**
 * Build `Hover`s from `TypeInfo` and `MethodInfo` lists compiled in the
 * `grammar` module.
 */
function members(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cache[name]) {
            return cache[name];
        }
        const info = yield grammar_1.findAny(name);
        let h = null;
        if (info) {
            h = new vscode_1.Hover(info.about);
        }
        cache[name] = h;
        return h;
    });
}
/**
 * Creates the mouse-over text for each span.
 *
 * @param values The array of value objects formatted as {value: **, count: **}.
 * @return A single string for the mouse-over text.
 */
function buildValueString(values) {
    if (!values || !values.length) {
        return 'Expression never evaluated';
    }
    return values
        .map(({ value, count }) => {
        const allowedTypes = [
            'nullValue',
            'boolValue',
            'intValue',
            'floatValue',
            'stringValue',
            'bytesValue',
            'durationValue',
            'timestampValue',
            'latlngValue',
            'pathValue',
        ];
        const countString = count > 1 ? `${count} times` : 'once';
        const compressedTypes = ['mapValue', 'listValue', 'constraintValue'];
        const typeAllowed = 
        // @ts-ignore
        allowedTypes.filter((type) => value[type] !== undefined).length == 1;
        const typeCompressed = 
        // @ts-ignore
        compressedTypes.filter((type) => value[type] !== undefined).length >= 1;
        // Format is value = {returnType: returnValue}
        // A returnType of undefined is an error. Unfortunately the field is called undefined.
        if (value['undefined']) {
            // Expression evaluated to error
            return `Error '${value.undefined.causeMessage}' occurred ${countString}`;
        }
        else if (typeCompressed) {
            // These types are recursive and are hard to read
            return `\`[${Object.keys(value)[0]}]\` returned ${countString}`;
        }
        else if (typeAllowed) {
            // The response is a simple literal
            return `\`${JSON.stringify(Object.values(value)[0])}\` returned ${countString}`;
        }
        else if (Object.keys(value).length === 0) {
            // Clause not evaluated because of short-circuit.
            return `Expression short-circuited ${countString}`;
        }
        else {
            // For a properly formatted response each value should have one type.
            console.error('Found invalid expression-return type.');
            return '';
        }
    })
        .join('  \n');
}
//# sourceMappingURL=hover.js.map