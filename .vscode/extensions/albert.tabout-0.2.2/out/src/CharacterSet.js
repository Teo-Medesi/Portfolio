"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterSet = void 0;
const vscode = require("vscode");
class CharacterSet {
    constructor(o, c) {
        if (typeof o === 'string') {
            this.open = o;
            this.close = c;
        }
        else {
            this.open = o.open;
            this.close = o.close;
        }
    }
    static loadCharacterSets() {
        return vscode.workspace.getConfiguration(`tabout`).get(`charactersToTabOutFrom`, [
            { open: '[', close: ']' },
            { open: '{', close: '}' },
            { open: '(', close: ')' },
            { open: '\'', close: '\'' },
            { open: '"', close: '"' },
            { open: ':', close: ':' },
            { open: '=', close: '=' },
            { open: '>', close: '>' },
            { open: '<', close: '<' },
            { open: '.', close: '.' },
            { open: '`', close: '`' },
            { open: ';', close: ';' },
        ]).map(o => new CharacterSet(o));
    }
}
exports.CharacterSet = CharacterSet;
//# sourceMappingURL=CharacterSet.js.map