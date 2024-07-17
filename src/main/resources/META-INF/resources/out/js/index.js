var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/hyperscript.org/dist/_hyperscript.min.js
var require__hyperscript_min = __commonJS((exports, module) => {
  (function(e, t) {
    const r = t(e);
    if (typeof exports === "object" && typeof exports.nodeName !== "string") {
      module.exports = r;
    } else {
      e["_hyperscript"] = r;
      if ("document" in e)
        e["_hyperscript"].browserInit();
    }
  })(typeof self !== "undefined" ? self : exports, (e) => {
    const t = { dynamicResolvers: [function(e2, t2) {
      if (e2 === "Fixed") {
        return Number(t2).toFixed();
      } else if (e2.indexOf("Fixed:") === 0) {
        let r2 = e2.split(":")[1];
        return Number(t2).toFixed(parseInt(r2));
      }
    }], String: function(e2) {
      if (e2.toString) {
        return e2.toString();
      } else {
        return "" + e2;
      }
    }, Int: function(e2) {
      return parseInt(e2);
    }, Float: function(e2) {
      return parseFloat(e2);
    }, Number: function(e2) {
      return Number(e2);
    }, Date: function(e2) {
      return new Date(e2);
    }, Array: function(e2) {
      return Array.from(e2);
    }, JSON: function(e2) {
      return JSON.stringify(e2);
    }, Object: function(e2) {
      if (e2 instanceof String) {
        e2 = e2.toString();
      }
      if (typeof e2 === "string") {
        return JSON.parse(e2);
      } else {
        return Object.assign({}, e2);
      }
    } };
    const r = { attributes: "_, script, data-script", defaultTransition: "all 500ms ease-in", disableSelector: "[disable-scripting], [data-disable-scripting]", hideShowStrategies: {}, conversions: t };

    class n {
      static OP_TABLE = { "+": "PLUS", "-": "MINUS", "*": "MULTIPLY", "/": "DIVIDE", ".": "PERIOD", "..": "ELLIPSIS", "\\": "BACKSLASH", ":": "COLON", "%": "PERCENT", "|": "PIPE", "!": "EXCLAMATION", "?": "QUESTION", "#": "POUND", "&": "AMPERSAND", $: "DOLLAR", ";": "SEMI", ",": "COMMA", "(": "L_PAREN", ")": "R_PAREN", "<": "L_ANG", ">": "R_ANG", "<=": "LTE_ANG", ">=": "GTE_ANG", "==": "EQ", "===": "EQQ", "!=": "NEQ", "!==": "NEQQ", "{": "L_BRACE", "}": "R_BRACE", "[": "L_BRACKET", "]": "R_BRACKET", "=": "EQUALS" };
      static isValidCSSClassChar(e2) {
        return n.isAlpha(e2) || n.isNumeric(e2) || e2 === "-" || e2 === "_" || e2 === ":";
      }
      static isValidCSSIDChar(e2) {
        return n.isAlpha(e2) || n.isNumeric(e2) || e2 === "-" || e2 === "_" || e2 === ":";
      }
      static isWhitespace(e2) {
        return e2 === " " || e2 === "\t" || n.isNewline(e2);
      }
      static positionString(e2) {
        return "[Line: " + e2.line + ", Column: " + e2.column + "]";
      }
      static isNewline(e2) {
        return e2 === "\r" || e2 === "\n";
      }
      static isNumeric(e2) {
        return e2 >= "0" && e2 <= "9";
      }
      static isAlpha(e2) {
        return e2 >= "a" && e2 <= "z" || e2 >= "A" && e2 <= "Z";
      }
      static isIdentifierChar(e2, t2) {
        return e2 === "_" || e2 === "$";
      }
      static isReservedChar(e2) {
        return e2 === "`" || e2 === "^";
      }
      static isValidSingleQuoteStringStart(e2) {
        if (e2.length > 0) {
          var t2 = e2[e2.length - 1];
          if (t2.type === "IDENTIFIER" || t2.type === "CLASS_REF" || t2.type === "ID_REF") {
            return false;
          }
          if (t2.op && (t2.value === ">" || t2.value === ")")) {
            return false;
          }
        }
        return true;
      }
      static tokenize(e2, t2) {
        var r2 = [];
        var a2 = e2;
        var o2 = 0;
        var s2 = 0;
        var u2 = 1;
        var l2 = "<START>";
        var c2 = 0;
        function f2() {
          return t2 && c2 === 0;
        }
        while (o2 < a2.length) {
          if (q() === "-" && N() === "-" && (n.isWhitespace(I(2)) || I(2) === "" || I(2) === "-") || q() === "/" && N() === "/" && (n.isWhitespace(I(2)) || I(2) === "" || I(2) === "/")) {
            h2();
          } else if (q() === "/" && N() === "*" && (n.isWhitespace(I(2)) || I(2) === "" || I(2) === "*")) {
            v2();
          } else {
            if (n.isWhitespace(q())) {
              r2.push(A());
            } else if (!R() && q() === "." && (n.isAlpha(N()) || N() === "{" || N() === "-")) {
              r2.push(d2());
            } else if (!R() && q() === "#" && (n.isAlpha(N()) || N() === "{")) {
              r2.push(k2());
            } else if (q() === "[" && N() === "@") {
              r2.push(E2());
            } else if (q() === "@") {
              r2.push(T2());
            } else if (q() === "*" && n.isAlpha(N())) {
              r2.push(y2());
            } else if (n.isAlpha(q()) || !f2() && n.isIdentifierChar(q())) {
              r2.push(x2());
            } else if (n.isNumeric(q())) {
              r2.push(g2());
            } else if (!f2() && (q() === '"' || q() === "`")) {
              r2.push(w2());
            } else if (!f2() && q() === "'") {
              if (n.isValidSingleQuoteStringStart(r2)) {
                r2.push(w2());
              } else {
                r2.push(b2());
              }
            } else if (n.OP_TABLE[q()]) {
              if (l2 === "$" && q() === "{") {
                c2++;
              }
              if (q() === "}") {
                c2--;
              }
              r2.push(b2());
            } else if (f2() || n.isReservedChar(q())) {
              r2.push(p2("RESERVED", C()));
            } else {
              if (o2 < a2.length) {
                throw Error("Unknown token: " + q() + " ");
              }
            }
          }
        }
        return new i(r2, [], a2);
        function m2(e3, t3) {
          var r3 = p2(e3, t3);
          r3.op = true;
          return r3;
        }
        function p2(e3, t3) {
          return { type: e3, value: t3 || "", start: o2, end: o2 + 1, column: s2, line: u2 };
        }
        function h2() {
          while (q() && !n.isNewline(q())) {
            C();
          }
          C();
        }
        function v2() {
          while (q() && !(q() === "*" && N() === "/")) {
            C();
          }
          C();
          C();
        }
        function d2() {
          var e3 = p2("CLASS_REF");
          var t3 = C();
          if (q() === "{") {
            e3.template = true;
            t3 += C();
            while (q() && q() !== "}") {
              t3 += C();
            }
            if (q() !== "}") {
              throw Error("Unterminated class reference");
            } else {
              t3 += C();
            }
          } else {
            while (n.isValidCSSClassChar(q())) {
              t3 += C();
            }
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function E2() {
          var e3 = p2("ATTRIBUTE_REF");
          var t3 = C();
          while (o2 < a2.length && q() !== "]") {
            t3 += C();
          }
          if (q() === "]") {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function T2() {
          var e3 = p2("ATTRIBUTE_REF");
          var t3 = C();
          while (n.isValidCSSIDChar(q())) {
            t3 += C();
          }
          if (q() === "=") {
            t3 += C();
            if (q() === '"' || q() === "'") {
              let e4 = w2();
              t3 += e4.value;
            } else if (n.isAlpha(q()) || n.isNumeric(q()) || n.isIdentifierChar(q())) {
              let e4 = x2();
              t3 += e4.value;
            }
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function y2() {
          var e3 = p2("STYLE_REF");
          var t3 = C();
          while (n.isAlpha(q()) || q() === "-") {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function k2() {
          var e3 = p2("ID_REF");
          var t3 = C();
          if (q() === "{") {
            e3.template = true;
            t3 += C();
            while (q() && q() !== "}") {
              t3 += C();
            }
            if (q() !== "}") {
              throw Error("Unterminated id reference");
            } else {
              C();
            }
          } else {
            while (n.isValidCSSIDChar(q())) {
              t3 += C();
            }
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function x2() {
          var e3 = p2("IDENTIFIER");
          var t3 = C();
          while (n.isAlpha(q()) || n.isNumeric(q()) || n.isIdentifierChar(q())) {
            t3 += C();
          }
          if (q() === "!" && t3 === "beep") {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function g2() {
          var e3 = p2("NUMBER");
          var t3 = C();
          while (n.isNumeric(q())) {
            t3 += C();
          }
          if (q() === "." && n.isNumeric(N())) {
            t3 += C();
          }
          while (n.isNumeric(q())) {
            t3 += C();
          }
          if (q() === "e" || q() === "E") {
            if (n.isNumeric(N())) {
              t3 += C();
            } else if (N() === "-") {
              t3 += C();
              t3 += C();
            }
          }
          while (n.isNumeric(q())) {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function b2() {
          var e3 = m2();
          var t3 = C();
          while (q() && n.OP_TABLE[t3 + q()]) {
            t3 += C();
          }
          e3.type = n.OP_TABLE[t3];
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function w2() {
          var e3 = p2("STRING");
          var t3 = C();
          var r3 = "";
          while (q() && q() !== t3) {
            if (q() === "\\") {
              C();
              let t4 = C();
              if (t4 === "b") {
                r3 += "\b";
              } else if (t4 === "f") {
                r3 += "\f";
              } else if (t4 === "n") {
                r3 += "\n";
              } else if (t4 === "r") {
                r3 += "\r";
              } else if (t4 === "t") {
                r3 += "\t";
              } else if (t4 === "v") {
                r3 += "\v";
              } else if (t4 === "x") {
                const t5 = S2();
                if (Number.isNaN(t5)) {
                  throw Error("Invalid hexadecimal escape at " + n.positionString(e3));
                }
                r3 += String.fromCharCode(t5);
              } else {
                r3 += t4;
              }
            } else {
              r3 += C();
            }
          }
          if (q() !== t3) {
            throw Error("Unterminated string at " + n.positionString(e3));
          } else {
            C();
          }
          e3.value = r3;
          e3.end = o2;
          e3.template = t3 === "`";
          return e3;
        }
        function S2() {
          const e3 = 16;
          if (!q()) {
            return NaN;
          }
          let t3 = e3 * Number.parseInt(C(), e3);
          if (!q()) {
            return NaN;
          }
          t3 += Number.parseInt(C(), e3);
          return t3;
        }
        function q() {
          return a2.charAt(o2);
        }
        function N() {
          return a2.charAt(o2 + 1);
        }
        function I(e3 = 1) {
          return a2.charAt(o2 + e3);
        }
        function C() {
          l2 = q();
          o2++;
          s2++;
          return l2;
        }
        function R() {
          return n.isAlpha(l2) || n.isNumeric(l2) || l2 === ")" || l2 === '"' || l2 === "'" || l2 === "`" || l2 === "}" || l2 === "]";
        }
        function A() {
          var e3 = p2("WHITESPACE");
          var t3 = "";
          while (q() && n.isWhitespace(q())) {
            if (n.isNewline(q())) {
              s2 = 0;
              u2++;
            }
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
      }
      tokenize(e2, t2) {
        return n.tokenize(e2, t2);
      }
    }

    class i {
      constructor(e2, t2, r2) {
        this.tokens = e2;
        this.consumed = t2;
        this.source = r2;
        this.consumeWhitespace();
      }
      get list() {
        return this.tokens;
      }
      _lastConsumed = null;
      consumeWhitespace() {
        while (this.token(0, true).type === "WHITESPACE") {
          this.consumed.push(this.tokens.shift());
        }
      }
      raiseError(e2, t2) {
        a.raiseParseError(e2, t2);
      }
      requireOpToken(e2) {
        var t2 = this.matchOpToken(e2);
        if (t2) {
          return t2;
        } else {
          this.raiseError(this, "Expected '" + e2 + "' but found '" + this.currentToken().value + "'");
        }
      }
      matchAnyOpToken(e2, t2, r2) {
        for (var n2 = 0;n2 < arguments.length; n2++) {
          var i2 = arguments[n2];
          var a2 = this.matchOpToken(i2);
          if (a2) {
            return a2;
          }
        }
      }
      matchAnyToken(e2, t2, r2) {
        for (var n2 = 0;n2 < arguments.length; n2++) {
          var i2 = arguments[n2];
          var a2 = this.matchToken(i2);
          if (a2) {
            return a2;
          }
        }
      }
      matchOpToken(e2) {
        if (this.currentToken() && this.currentToken().op && this.currentToken().value === e2) {
          return this.consumeToken();
        }
      }
      requireTokenType(e2, t2, r2, n2) {
        var i2 = this.matchTokenType(e2, t2, r2, n2);
        if (i2) {
          return i2;
        } else {
          this.raiseError(this, "Expected one of " + JSON.stringify([e2, t2, r2]));
        }
      }
      matchTokenType(e2, t2, r2, n2) {
        if (this.currentToken() && this.currentToken().type && [e2, t2, r2, n2].indexOf(this.currentToken().type) >= 0) {
          return this.consumeToken();
        }
      }
      requireToken(e2, t2) {
        var r2 = this.matchToken(e2, t2);
        if (r2) {
          return r2;
        } else {
          this.raiseError(this, "Expected '" + e2 + "' but found '" + this.currentToken().value + "'");
        }
      }
      peekToken(e2, t2, r2) {
        t2 = t2 || 0;
        r2 = r2 || "IDENTIFIER";
        if (this.tokens[t2] && this.tokens[t2].value === e2 && this.tokens[t2].type === r2) {
          return this.tokens[t2];
        }
      }
      matchToken(e2, t2) {
        if (this.follows.indexOf(e2) !== -1) {
          return;
        }
        t2 = t2 || "IDENTIFIER";
        if (this.currentToken() && this.currentToken().value === e2 && this.currentToken().type === t2) {
          return this.consumeToken();
        }
      }
      consumeToken() {
        var e2 = this.tokens.shift();
        this.consumed.push(e2);
        this._lastConsumed = e2;
        this.consumeWhitespace();
        return e2;
      }
      consumeUntil(e2, t2) {
        var r2 = [];
        var n2 = this.token(0, true);
        while ((t2 == null || n2.type !== t2) && (e2 == null || n2.value !== e2) && n2.type !== "EOF") {
          var i2 = this.tokens.shift();
          this.consumed.push(i2);
          r2.push(n2);
          n2 = this.token(0, true);
        }
        this.consumeWhitespace();
        return r2;
      }
      lastWhitespace() {
        if (this.consumed[this.consumed.length - 1] && this.consumed[this.consumed.length - 1].type === "WHITESPACE") {
          return this.consumed[this.consumed.length - 1].value;
        } else {
          return "";
        }
      }
      consumeUntilWhitespace() {
        return this.consumeUntil(null, "WHITESPACE");
      }
      hasMore() {
        return this.tokens.length > 0;
      }
      token(e2, t2) {
        var r2;
        var n2 = 0;
        do {
          if (!t2) {
            while (this.tokens[n2] && this.tokens[n2].type === "WHITESPACE") {
              n2++;
            }
          }
          r2 = this.tokens[n2];
          e2--;
          n2++;
        } while (e2 > -1);
        if (r2) {
          return r2;
        } else {
          return { type: "EOF", value: "<<<EOF>>>" };
        }
      }
      currentToken() {
        return this.token(0);
      }
      lastMatch() {
        return this._lastConsumed;
      }
      static sourceFor = function() {
        return this.programSource.substring(this.startToken.start, this.endToken.end);
      };
      static lineFor = function() {
        return this.programSource.split("\n")[this.startToken.line - 1];
      };
      follows = [];
      pushFollow(e2) {
        this.follows.push(e2);
      }
      popFollow() {
        this.follows.pop();
      }
      clearFollows() {
        var e2 = this.follows;
        this.follows = [];
        return e2;
      }
      restoreFollows(e2) {
        this.follows = e2;
      }
    }

    class a {
      constructor(e2) {
        this.runtime = e2;
        this.possessivesDisabled = false;
        this.addGrammarElement("feature", function(e3, t2, r2) {
          if (r2.matchOpToken("(")) {
            var n2 = e3.requireElement("feature", r2);
            r2.requireOpToken(")");
            return n2;
          }
          var i2 = e3.FEATURES[r2.currentToken().value || ""];
          if (i2) {
            return i2(e3, t2, r2);
          }
        });
        this.addGrammarElement("command", function(e3, t2, r2) {
          if (r2.matchOpToken("(")) {
            const t3 = e3.requireElement("command", r2);
            r2.requireOpToken(")");
            return t3;
          }
          var n2 = e3.COMMANDS[r2.currentToken().value || ""];
          let i2;
          if (n2) {
            i2 = n2(e3, t2, r2);
          } else if (r2.currentToken().type === "IDENTIFIER") {
            i2 = e3.parseElement("pseudoCommand", r2);
          }
          if (i2) {
            return e3.parseElement("indirectStatement", r2, i2);
          }
          return i2;
        });
        this.addGrammarElement("commandList", function(e3, t2, r2) {
          if (r2.hasMore()) {
            var n2 = e3.parseElement("command", r2);
            if (n2) {
              r2.matchToken("then");
              const t3 = e3.parseElement("commandList", r2);
              if (t3)
                n2.next = t3;
              return n2;
            }
          }
          return { type: "emptyCommandListCommand", op: function(e4) {
            return t2.findNext(this, e4);
          }, execute: function(e4) {
            return t2.unifiedExec(this, e4);
          } };
        });
        this.addGrammarElement("leaf", function(e3, t2, r2) {
          var n2 = e3.parseAnyOf(e3.LEAF_EXPRESSIONS, r2);
          if (n2 == null) {
            return e3.parseElement("symbol", r2);
          }
          return n2;
        });
        this.addGrammarElement("indirectExpression", function(e3, t2, r2, n2) {
          for (var i2 = 0;i2 < e3.INDIRECT_EXPRESSIONS.length; i2++) {
            var a2 = e3.INDIRECT_EXPRESSIONS[i2];
            n2.endToken = r2.lastMatch();
            var o2 = e3.parseElement(a2, r2, n2);
            if (o2) {
              return o2;
            }
          }
          return n2;
        });
        this.addGrammarElement("indirectStatement", function(e3, t2, r2, n2) {
          if (r2.matchToken("unless")) {
            n2.endToken = r2.lastMatch();
            var i2 = e3.requireElement("expression", r2);
            var a2 = { type: "unlessStatementModifier", args: [i2], op: function(e4, t3) {
              if (t3) {
                return this.next;
              } else {
                return n2;
              }
            }, execute: function(e4) {
              return t2.unifiedExec(this, e4);
            } };
            n2.parent = a2;
            return a2;
          }
          return n2;
        });
        this.addGrammarElement("primaryExpression", function(e3, t2, r2) {
          var n2 = e3.parseElement("leaf", r2);
          if (n2) {
            return e3.parseElement("indirectExpression", r2, n2);
          }
          e3.raiseParseError(r2, "Unexpected value: " + r2.currentToken().value);
        });
      }
      use(e2) {
        e2(this);
        return this;
      }
      GRAMMAR = {};
      COMMANDS = {};
      FEATURES = {};
      LEAF_EXPRESSIONS = [];
      INDIRECT_EXPRESSIONS = [];
      initElt(e2, t2, r2) {
        e2.startToken = t2;
        e2.sourceFor = i.sourceFor;
        e2.lineFor = i.lineFor;
        e2.programSource = r2.source;
      }
      parseElement(e2, t2, r2 = undefined) {
        var n2 = this.GRAMMAR[e2];
        if (n2) {
          var i2 = t2.currentToken();
          var a2 = n2(this, this.runtime, t2, r2);
          if (a2) {
            this.initElt(a2, i2, t2);
            a2.endToken = a2.endToken || t2.lastMatch();
            var r2 = a2.root;
            while (r2 != null) {
              this.initElt(r2, i2, t2);
              r2 = r2.root;
            }
          }
          return a2;
        }
      }
      requireElement(e2, t2, r2, n2) {
        var i2 = this.parseElement(e2, t2, n2);
        if (!i2)
          a.raiseParseError(t2, r2 || "Expected " + e2);
        return i2;
      }
      parseAnyOf(e2, t2) {
        for (var r2 = 0;r2 < e2.length; r2++) {
          var n2 = e2[r2];
          var i2 = this.parseElement(n2, t2);
          if (i2) {
            return i2;
          }
        }
      }
      addGrammarElement(e2, t2) {
        this.GRAMMAR[e2] = t2;
      }
      addCommand(e2, t2) {
        var r2 = e2 + "Command";
        var n2 = function(e3, n3, i2) {
          const a2 = t2(e3, n3, i2);
          if (a2) {
            a2.type = r2;
            a2.execute = function(e4) {
              e4.meta.command = a2;
              return n3.unifiedExec(this, e4);
            };
            return a2;
          }
        };
        this.GRAMMAR[r2] = n2;
        this.COMMANDS[e2] = n2;
      }
      addFeature(e2, t2) {
        var r2 = e2 + "Feature";
        var n2 = function(n3, i2, a2) {
          var o2 = t2(n3, i2, a2);
          if (o2) {
            o2.isFeature = true;
            o2.keyword = e2;
            o2.type = r2;
            return o2;
          }
        };
        this.GRAMMAR[r2] = n2;
        this.FEATURES[e2] = n2;
      }
      addLeafExpression(e2, t2) {
        this.LEAF_EXPRESSIONS.push(e2);
        this.addGrammarElement(e2, t2);
      }
      addIndirectExpression(e2, t2) {
        this.INDIRECT_EXPRESSIONS.push(e2);
        this.addGrammarElement(e2, t2);
      }
      static createParserContext(e2) {
        var t2 = e2.currentToken();
        var r2 = e2.source;
        var n2 = r2.split("\n");
        var i2 = t2 && t2.line ? t2.line - 1 : n2.length - 1;
        var a2 = n2[i2];
        var o2 = t2 && t2.line ? t2.column : a2.length - 1;
        return a2 + "\n" + " ".repeat(o2) + "^^\n\n";
      }
      static raiseParseError(e2, t2) {
        t2 = (t2 || "Unexpected Token : " + e2.currentToken().value) + "\n\n" + a.createParserContext(e2);
        var r2 = new Error(t2);
        r2["tokens"] = e2;
        throw r2;
      }
      raiseParseError(e2, t2) {
        a.raiseParseError(e2, t2);
      }
      parseHyperScript(e2) {
        var t2 = this.parseElement("hyperscript", e2);
        if (e2.hasMore())
          this.raiseParseError(e2);
        if (t2)
          return t2;
      }
      setParent(e2, t2) {
        if (typeof e2 === "object") {
          e2.parent = t2;
          if (typeof t2 === "object") {
            t2.children = t2.children || new Set;
            t2.children.add(e2);
          }
          this.setParent(e2.next, t2);
        }
      }
      commandStart(e2) {
        return this.COMMANDS[e2.value || ""];
      }
      featureStart(e2) {
        return this.FEATURES[e2.value || ""];
      }
      commandBoundary(e2) {
        if (e2.value == "end" || e2.value == "then" || e2.value == "else" || e2.value == "otherwise" || e2.value == ")" || this.commandStart(e2) || this.featureStart(e2) || e2.type == "EOF") {
          return true;
        }
        return false;
      }
      parseStringTemplate(e2) {
        var t2 = [""];
        do {
          t2.push(e2.lastWhitespace());
          if (e2.currentToken().value === "$") {
            e2.consumeToken();
            var r2 = e2.matchOpToken("{");
            t2.push(this.requireElement("expression", e2));
            if (r2) {
              e2.requireOpToken("}");
            }
            t2.push("");
          } else if (e2.currentToken().value === "\\") {
            e2.consumeToken();
            e2.consumeToken();
          } else {
            var n2 = e2.consumeToken();
            t2[t2.length - 1] += n2 ? n2.value : "";
          }
        } while (e2.hasMore());
        t2.push(e2.lastWhitespace());
        return t2;
      }
      ensureTerminated(e2) {
        const t2 = this.runtime;
        var r2 = { type: "implicitReturn", op: function(e3) {
          e3.meta.returned = true;
          if (e3.meta.resolve) {
            e3.meta.resolve();
          }
          return t2.HALT;
        }, execute: function(e3) {
        } };
        var n2 = e2;
        while (n2.next) {
          n2 = n2.next;
        }
        n2.next = r2;
      }
    }

    class o {
      constructor(e2, t2) {
        this.lexer = e2 ?? new n;
        this.parser = t2 ?? new a(this).use(T).use(y);
        this.parser.runtime = this;
      }
      matchesSelector(e2, t2) {
        var r2 = e2.matches || e2.matchesSelector || e2.msMatchesSelector || e2.mozMatchesSelector || e2.webkitMatchesSelector || e2.oMatchesSelector;
        return r2 && r2.call(e2, t2);
      }
      makeEvent(t2, r2) {
        var n2;
        if (e.Event && typeof e.Event === "function") {
          n2 = new Event(t2, { bubbles: true, cancelable: true });
          n2["detail"] = r2;
        } else {
          n2 = document.createEvent("CustomEvent");
          n2.initCustomEvent(t2, true, true, r2);
        }
        return n2;
      }
      triggerEvent(e2, t2, r2, n2) {
        r2 = r2 || {};
        r2["sender"] = n2;
        var i2 = this.makeEvent(t2, r2);
        var a2 = e2.dispatchEvent(i2);
        return a2;
      }
      isArrayLike(e2) {
        return Array.isArray(e2) || typeof NodeList !== "undefined" && (e2 instanceof NodeList || e2 instanceof HTMLCollection);
      }
      isIterable(e2) {
        return typeof e2 === "object" && Symbol.iterator in e2 && typeof e2[Symbol.iterator] === "function";
      }
      shouldAutoIterate(e2) {
        return e2 != null && e2[p] || this.isArrayLike(e2);
      }
      forEach(e2, t2) {
        if (e2 == null) {
        } else if (this.isIterable(e2)) {
          for (const r3 of e2) {
            t2(r3);
          }
        } else if (this.isArrayLike(e2)) {
          for (var r2 = 0;r2 < e2.length; r2++) {
            t2(e2[r2]);
          }
        } else {
          t2(e2);
        }
      }
      implicitLoop(e2, t2) {
        if (this.shouldAutoIterate(e2)) {
          for (const r2 of e2)
            t2(r2);
        } else {
          t2(e2);
        }
      }
      wrapArrays(e2) {
        var t2 = [];
        for (var r2 = 0;r2 < e2.length; r2++) {
          var n2 = e2[r2];
          if (Array.isArray(n2)) {
            t2.push(Promise.all(n2));
          } else {
            t2.push(n2);
          }
        }
        return t2;
      }
      unwrapAsyncs(e2) {
        for (var t2 = 0;t2 < e2.length; t2++) {
          var r2 = e2[t2];
          if (r2.asyncWrapper) {
            e2[t2] = r2.value;
          }
          if (Array.isArray(r2)) {
            for (var n2 = 0;n2 < r2.length; n2++) {
              var i2 = r2[n2];
              if (i2.asyncWrapper) {
                r2[n2] = i2.value;
              }
            }
          }
        }
      }
      static HALT = {};
      HALT = o.HALT;
      unifiedExec(e2, t2) {
        while (true) {
          try {
            var r2 = this.unifiedEval(e2, t2);
          } catch (n2) {
            if (t2.meta.handlingFinally) {
              console.error(" Exception in finally block: ", n2);
              r2 = o.HALT;
            } else {
              this.registerHyperTrace(t2, n2);
              if (t2.meta.errorHandler && !t2.meta.handlingError) {
                t2.meta.handlingError = true;
                t2.locals[t2.meta.errorSymbol] = n2;
                e2 = t2.meta.errorHandler;
                continue;
              } else {
                t2.meta.currentException = n2;
                r2 = o.HALT;
              }
            }
          }
          if (r2 == null) {
            console.error(e2, " did not return a next element to execute! context: ", t2);
            return;
          } else if (r2.then) {
            r2.then((e3) => {
              this.unifiedExec(e3, t2);
            }).catch((e3) => {
              this.unifiedExec({ op: function() {
                throw e3;
              } }, t2);
            });
            return;
          } else if (r2 === o.HALT) {
            if (t2.meta.finallyHandler && !t2.meta.handlingFinally) {
              t2.meta.handlingFinally = true;
              e2 = t2.meta.finallyHandler;
            } else {
              if (t2.meta.onHalt) {
                t2.meta.onHalt();
              }
              if (t2.meta.currentException) {
                if (t2.meta.reject) {
                  t2.meta.reject(t2.meta.currentException);
                  return;
                } else {
                  throw t2.meta.currentException;
                }
              } else {
                return;
              }
            }
          } else {
            e2 = r2;
          }
        }
      }
      unifiedEval(e2, t2) {
        var r2 = [t2];
        var n2 = false;
        var i2 = false;
        if (e2.args) {
          for (var a2 = 0;a2 < e2.args.length; a2++) {
            var o2 = e2.args[a2];
            if (o2 == null) {
              r2.push(null);
            } else if (Array.isArray(o2)) {
              var s2 = [];
              for (var u2 = 0;u2 < o2.length; u2++) {
                var l2 = o2[u2];
                var c2 = l2 ? l2.evaluate(t2) : null;
                if (c2) {
                  if (c2.then) {
                    n2 = true;
                  } else if (c2.asyncWrapper) {
                    i2 = true;
                  }
                }
                s2.push(c2);
              }
              r2.push(s2);
            } else if (o2.evaluate) {
              var c2 = o2.evaluate(t2);
              if (c2) {
                if (c2.then) {
                  n2 = true;
                } else if (c2.asyncWrapper) {
                  i2 = true;
                }
              }
              r2.push(c2);
            } else {
              r2.push(o2);
            }
          }
        }
        if (n2) {
          return new Promise((t3, n3) => {
            r2 = this.wrapArrays(r2);
            Promise.all(r2).then(function(r3) {
              if (i2) {
                this.unwrapAsyncs(r3);
              }
              try {
                var a3 = e2.op.apply(e2, r3);
                t3(a3);
              } catch (e3) {
                n3(e3);
              }
            }).catch(function(e3) {
              n3(e3);
            });
          });
        } else {
          if (i2) {
            this.unwrapAsyncs(r2);
          }
          return e2.op.apply(e2, r2);
        }
      }
      _scriptAttrs = null;
      getScriptAttributes() {
        if (this._scriptAttrs == null) {
          this._scriptAttrs = r.attributes.replace(/ /g, "").split(",");
        }
        return this._scriptAttrs;
      }
      getScript(e2) {
        for (var t2 = 0;t2 < this.getScriptAttributes().length; t2++) {
          var r2 = this.getScriptAttributes()[t2];
          if (e2.hasAttribute && e2.hasAttribute(r2)) {
            return e2.getAttribute(r2);
          }
        }
        if (e2 instanceof HTMLScriptElement && e2.type === "text/hyperscript") {
          return e2.innerText;
        }
        return null;
      }
      hyperscriptFeaturesMap = new WeakMap;
      getHyperscriptFeatures(e2) {
        var t2 = this.hyperscriptFeaturesMap.get(e2);
        if (typeof t2 === "undefined") {
          if (e2) {
            this.hyperscriptFeaturesMap.set(e2, t2 = {});
          }
        }
        return t2;
      }
      addFeatures(e2, t2) {
        if (e2) {
          Object.assign(t2.locals, this.getHyperscriptFeatures(e2));
          this.addFeatures(e2.parentElement, t2);
        }
      }
      makeContext(e2, t2, r2, n2) {
        return new f(e2, t2, r2, n2, this);
      }
      getScriptSelector() {
        return this.getScriptAttributes().map(function(e2) {
          return "[" + e2 + "]";
        }).join(", ");
      }
      convertValue(e2, r2) {
        var n2 = t.dynamicResolvers;
        for (var i2 = 0;i2 < n2.length; i2++) {
          var a2 = n2[i2];
          var o2 = a2(r2, e2);
          if (o2 !== undefined) {
            return o2;
          }
        }
        if (e2 == null) {
          return null;
        }
        var s2 = t[r2];
        if (s2) {
          return s2(e2);
        }
        throw "Unknown conversion : " + r2;
      }
      parse(e2) {
        const t2 = this.lexer, r2 = this.parser;
        var n2 = t2.tokenize(e2);
        if (this.parser.commandStart(n2.currentToken())) {
          var i2 = r2.requireElement("commandList", n2);
          if (n2.hasMore())
            r2.raiseParseError(n2);
          r2.ensureTerminated(i2);
          return i2;
        } else if (r2.featureStart(n2.currentToken())) {
          var a2 = r2.requireElement("hyperscript", n2);
          if (n2.hasMore())
            r2.raiseParseError(n2);
          return a2;
        } else {
          var o2 = r2.requireElement("expression", n2);
          if (n2.hasMore())
            r2.raiseParseError(n2);
          return o2;
        }
      }
      evaluateNoPromise(e2, t2) {
        let r2 = e2.evaluate(t2);
        if (r2.next) {
          throw new Error(i.sourceFor.call(e2) + " returned a Promise in a context that they are not allowed.");
        }
        return r2;
      }
      evaluate(t2, r2, n2) {

        class i2 extends EventTarget {
          constructor(e2) {
            super();
            this.module = e2;
          }
          toString() {
            return this.module.id;
          }
        }
        var a2 = "document" in e ? e.document.body : new i2(n2 && n2.module);
        r2 = Object.assign(this.makeContext(a2, null, a2, null), r2 || {});
        var o2 = this.parse(t2);
        if (o2.execute) {
          o2.execute(r2);
          if (typeof r2.meta.returnValue !== "undefined") {
            return r2.meta.returnValue;
          } else {
            return r2.result;
          }
        } else if (o2.apply) {
          o2.apply(a2, a2, n2);
          return this.getHyperscriptFeatures(a2);
        } else {
          return o2.evaluate(r2);
        }
        function s2() {
          return {};
        }
      }
      processNode(e2) {
        var t2 = this.getScriptSelector();
        if (this.matchesSelector(e2, t2)) {
          this.initElement(e2, e2);
        }
        if (e2 instanceof HTMLScriptElement && e2.type === "text/hyperscript") {
          this.initElement(e2, document.body);
        }
        if (e2.querySelectorAll) {
          this.forEach(e2.querySelectorAll(t2 + ", [type='text/hyperscript']"), (e3) => {
            this.initElement(e3, e3 instanceof HTMLScriptElement && e3.type === "text/hyperscript" ? document.body : e3);
          });
        }
      }
      initElement(e2, t2) {
        if (e2.closest && e2.closest(r.disableSelector)) {
          return;
        }
        var n2 = this.getInternalData(e2);
        if (!n2.initialized) {
          var i2 = this.getScript(e2);
          if (i2) {
            try {
              n2.initialized = true;
              n2.script = i2;
              const r2 = this.lexer, s2 = this.parser;
              var a2 = r2.tokenize(i2);
              var o2 = s2.parseHyperScript(a2);
              if (!o2)
                return;
              o2.apply(t2 || e2, e2);
              setTimeout(() => {
                this.triggerEvent(t2 || e2, "load", { hyperscript: true });
              }, 1);
            } catch (t3) {
              this.triggerEvent(e2, "exception", { error: t3 });
              console.error("hyperscript errors were found on the following element:", e2, "\n\n", t3.message, t3.stack);
            }
          }
        }
      }
      internalDataMap = new WeakMap;
      getInternalData(e2) {
        var t2 = this.internalDataMap.get(e2);
        if (typeof t2 === "undefined") {
          this.internalDataMap.set(e2, t2 = {});
        }
        return t2;
      }
      typeCheck(e2, t2, r2) {
        if (e2 == null && r2) {
          return true;
        }
        var n2 = Object.prototype.toString.call(e2).slice(8, -1);
        return n2 === t2;
      }
      getElementScope(e2) {
        var t2 = e2.meta && e2.meta.owner;
        if (t2) {
          var r2 = this.getInternalData(t2);
          var n2 = "elementScope";
          if (e2.meta.feature && e2.meta.feature.behavior) {
            n2 = e2.meta.feature.behavior + "Scope";
          }
          var i2 = h(r2, n2);
          return i2;
        } else {
          return {};
        }
      }
      isReservedWord(e2) {
        return ["meta", "it", "result", "locals", "event", "target", "detail", "sender", "body"].includes(e2);
      }
      isHyperscriptContext(e2) {
        return e2 instanceof f;
      }
      resolveSymbol(t2, r2, n2) {
        if (t2 === "me" || t2 === "my" || t2 === "I") {
          return r2.me;
        }
        if (t2 === "it" || t2 === "its" || t2 === "result") {
          return r2.result;
        }
        if (t2 === "you" || t2 === "your" || t2 === "yourself") {
          return r2.you;
        } else {
          if (n2 === "global") {
            return e[t2];
          } else if (n2 === "element") {
            var i2 = this.getElementScope(r2);
            return i2[t2];
          } else if (n2 === "local") {
            return r2.locals[t2];
          } else {
            if (r2.meta && r2.meta.context) {
              var a2 = r2.meta.context[t2];
              if (typeof a2 !== "undefined") {
                return a2;
              }
              if (r2.meta.context.detail) {
                a2 = r2.meta.context.detail[t2];
                if (typeof a2 !== "undefined") {
                  return a2;
                }
              }
            }
            if (this.isHyperscriptContext(r2) && !this.isReservedWord(t2)) {
              var o2 = r2.locals[t2];
            } else {
              var o2 = r2[t2];
            }
            if (typeof o2 !== "undefined") {
              return o2;
            } else {
              var i2 = this.getElementScope(r2);
              o2 = i2[t2];
              if (typeof o2 !== "undefined") {
                return o2;
              } else {
                return e[t2];
              }
            }
          }
        }
      }
      setSymbol(t2, r2, n2, i2) {
        if (n2 === "global") {
          e[t2] = i2;
        } else if (n2 === "element") {
          var a2 = this.getElementScope(r2);
          a2[t2] = i2;
        } else if (n2 === "local") {
          r2.locals[t2] = i2;
        } else {
          if (this.isHyperscriptContext(r2) && !this.isReservedWord(t2) && typeof r2.locals[t2] !== "undefined") {
            r2.locals[t2] = i2;
          } else {
            var a2 = this.getElementScope(r2);
            var o2 = a2[t2];
            if (typeof o2 !== "undefined") {
              a2[t2] = i2;
            } else {
              if (this.isHyperscriptContext(r2) && !this.isReservedWord(t2)) {
                r2.locals[t2] = i2;
              } else {
                r2[t2] = i2;
              }
            }
          }
        }
      }
      findNext(e2, t2) {
        if (e2) {
          if (e2.resolveNext) {
            return e2.resolveNext(t2);
          } else if (e2.next) {
            return e2.next;
          } else {
            return this.findNext(e2.parent, t2);
          }
        }
      }
      flatGet(e2, t2, r2) {
        if (e2 != null) {
          var n2 = r2(e2, t2);
          if (typeof n2 !== "undefined") {
            return n2;
          }
          if (this.shouldAutoIterate(e2)) {
            var i2 = [];
            for (var a2 of e2) {
              var o2 = r2(a2, t2);
              i2.push(o2);
            }
            return i2;
          }
        }
      }
      resolveProperty(e2, t2) {
        return this.flatGet(e2, t2, (e3, t3) => e3[t3]);
      }
      resolveAttribute(e2, t2) {
        return this.flatGet(e2, t2, (e3, t3) => e3.getAttribute && e3.getAttribute(t3));
      }
      resolveStyle(e2, t2) {
        return this.flatGet(e2, t2, (e3, t3) => e3.style && e3.style[t3]);
      }
      resolveComputedStyle(e2, t2) {
        return this.flatGet(e2, t2, (e3, t3) => getComputedStyle(e3).getPropertyValue(t3));
      }
      assignToNamespace(t2, r2, n2, i2) {
        let a2;
        if (typeof document !== "undefined" && t2 === document.body) {
          a2 = e;
        } else {
          a2 = this.getHyperscriptFeatures(t2);
        }
        var o2;
        while ((o2 = r2.shift()) !== undefined) {
          var s2 = a2[o2];
          if (s2 == null) {
            s2 = {};
            a2[o2] = s2;
          }
          a2 = s2;
        }
        a2[n2] = i2;
      }
      getHyperTrace(e2, t2) {
        var r2 = [];
        var n2 = e2;
        while (n2.meta.caller) {
          n2 = n2.meta.caller;
        }
        if (n2.meta.traceMap) {
          return n2.meta.traceMap.get(t2, r2);
        }
      }
      registerHyperTrace(e2, t2) {
        var r2 = [];
        var n2 = null;
        while (e2 != null) {
          r2.push(e2);
          n2 = e2;
          e2 = e2.meta.caller;
        }
        if (n2.meta.traceMap == null) {
          n2.meta.traceMap = new Map;
        }
        if (!n2.meta.traceMap.get(t2)) {
          var i2 = { trace: r2, print: function(e3) {
            e3 = e3 || console.error;
            e3("hypertrace /// ");
            var t3 = 0;
            for (var n3 = 0;n3 < r2.length; n3++) {
              t3 = Math.max(t3, r2[n3].meta.feature.displayName.length);
            }
            for (var n3 = 0;n3 < r2.length; n3++) {
              var i3 = r2[n3];
              e3("  ->", i3.meta.feature.displayName.padEnd(t3 + 2), "-", i3.meta.owner);
            }
          } };
          n2.meta.traceMap.set(t2, i2);
        }
      }
      escapeSelector(e2) {
        return e2.replace(/:/g, function(e3) {
          return "\\" + e3;
        });
      }
      nullCheck(e2, t2) {
        if (e2 == null) {
          throw new Error("'" + t2.sourceFor() + "' is null");
        }
      }
      isEmpty(e2) {
        return e2 == undefined || e2.length === 0;
      }
      doesExist(e2) {
        if (e2 == null) {
          return false;
        }
        if (this.shouldAutoIterate(e2)) {
          for (const t2 of e2) {
            return true;
          }
          return false;
        }
        return true;
      }
      getRootNode(e2) {
        if (e2 && e2 instanceof Node) {
          var t2 = e2.getRootNode();
          if (t2 instanceof Document || t2 instanceof ShadowRoot)
            return t2;
        }
        return document;
      }
      getEventQueueFor(e2, t2) {
        let r2 = this.getInternalData(e2);
        var n2 = r2.eventQueues;
        if (n2 == null) {
          n2 = new Map;
          r2.eventQueues = n2;
        }
        var i2 = n2.get(t2);
        if (i2 == null) {
          i2 = { queue: [], executing: false };
          n2.set(t2, i2);
        }
        return i2;
      }
      beepValueToConsole(e2, t2, r2) {
        if (this.triggerEvent(e2, "hyperscript:beep", { element: e2, expression: t2, value: r2 })) {
          var n2;
          if (r2) {
            if (r2 instanceof m) {
              n2 = "ElementCollection";
            } else if (r2.constructor) {
              n2 = r2.constructor.name;
            } else {
              n2 = "unknown";
            }
          } else {
            n2 = "object (null)";
          }
          var a2 = r2;
          if (n2 === "String") {
            a2 = '"' + a2 + '"';
          } else if (r2 instanceof m) {
            a2 = Array.from(r2);
          }
          console.log("///_ BEEP! The expression (" + i.sourceFor.call(t2).replace("beep! ", "") + ") evaluates to:", a2, "of type " + n2);
        }
      }
      hyperscriptUrl = "document" in e && document.currentScript ? document.currentScript.src : null;
    }
    function s() {
      let e2 = document.cookie.split("; ").map((e3) => {
        let t2 = e3.split("=");
        return { name: t2[0], value: decodeURIComponent(t2[1]) };
      });
      return e2;
    }
    function u(e2) {
      document.cookie = e2 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    function l() {
      for (const e2 of s()) {
        u(e2.name);
      }
    }
    const c = new Proxy({}, { get(e2, t2) {
      if (t2 === "then" || t2 === "asyncWrapper") {
        return null;
      } else if (t2 === "length") {
        return s().length;
      } else if (t2 === "clear") {
        return u;
      } else if (t2 === "clearAll") {
        return l;
      } else if (typeof t2 === "string") {
        if (!isNaN(t2)) {
          return s()[parseInt(t2)];
        } else {
          let e3 = document.cookie.split("; ").find((e4) => e4.startsWith(t2 + "="))?.split("=")[1];
          if (e3) {
            return decodeURIComponent(e3);
          }
        }
      } else if (t2 === Symbol.iterator) {
        return s()[t2];
      }
    }, set(e2, t2, r2) {
      var n2 = null;
      if (typeof r2 === "string") {
        n2 = encodeURIComponent(r2);
        n2 += ";samesite=lax";
      } else {
        n2 = encodeURIComponent(r2.value);
        if (r2.expires) {
          n2 += ";expires=" + r2.maxAge;
        }
        if (r2.maxAge) {
          n2 += ";max-age=" + r2.maxAge;
        }
        if (r2.partitioned) {
          n2 += ";partitioned=" + r2.partitioned;
        }
        if (r2.path) {
          n2 += ";path=" + r2.path;
        }
        if (r2.samesite) {
          n2 += ";samesite=" + r2.path;
        }
        if (r2.secure) {
          n2 += ";secure=" + r2.path;
        }
      }
      document.cookie = t2 + "=" + n2;
      return true;
    } });

    class f {
      constructor(t2, r2, n2, i2, a2) {
        this.meta = { parser: a2.parser, lexer: a2.lexer, runtime: a2, owner: t2, feature: r2, iterators: {}, ctx: this };
        this.locals = { cookies: c };
        this.me = n2, this.you = undefined;
        this.result = undefined;
        this.event = i2;
        this.target = i2 ? i2.target : null;
        this.detail = i2 ? i2.detail : null;
        this.sender = i2 ? i2.detail ? i2.detail.sender : null : null;
        this.body = "document" in e ? document.body : null;
        a2.addFeatures(t2, this);
      }
    }

    class m {
      constructor(e2, t2, r2) {
        this._css = e2;
        this.relativeToElement = t2;
        this.escape = r2;
        this[p] = true;
      }
      get css() {
        if (this.escape) {
          return o.prototype.escapeSelector(this._css);
        } else {
          return this._css;
        }
      }
      get className() {
        return this._css.substr(1);
      }
      get id() {
        return this.className();
      }
      contains(e2) {
        for (let t2 of this) {
          if (t2.contains(e2)) {
            return true;
          }
        }
        return false;
      }
      get length() {
        return this.selectMatches().length;
      }
      [Symbol.iterator]() {
        let e2 = this.selectMatches();
        return e2[Symbol.iterator]();
      }
      selectMatches() {
        let e2 = o.prototype.getRootNode(this.relativeToElement).querySelectorAll(this.css);
        return e2;
      }
    }
    const p = Symbol();
    function h(e2, t2) {
      var r2 = e2[t2];
      if (r2) {
        return r2;
      } else {
        var n2 = {};
        e2[t2] = n2;
        return n2;
      }
    }
    function v(e2) {
      try {
        return JSON.parse(e2);
      } catch (e3) {
        d(e3);
        return null;
      }
    }
    function d(e2) {
      if (console.error) {
        console.error(e2);
      } else if (console.log) {
        console.log("ERROR: ", e2);
      }
    }
    function E(e2, t2) {
      return new (e2.bind.apply(e2, [e2].concat(t2)));
    }
    function T(t2) {
      t2.addLeafExpression("parenthesized", function(e2, t3, r3) {
        if (r3.matchOpToken("(")) {
          var n2 = r3.clearFollows();
          try {
            var i2 = e2.requireElement("expression", r3);
          } finally {
            r3.restoreFollows(n2);
          }
          r3.requireOpToken(")");
          return i2;
        }
      });
      t2.addLeafExpression("string", function(e2, t3, r3) {
        var i2 = r3.matchTokenType("STRING");
        if (!i2)
          return;
        var a3 = i2.value;
        var o2;
        if (i2.template) {
          var s3 = n.tokenize(a3, true);
          o2 = e2.parseStringTemplate(s3);
        } else {
          o2 = [];
        }
        return { type: "string", token: i2, args: o2, op: function(e3) {
          var t4 = "";
          for (var r4 = 1;r4 < arguments.length; r4++) {
            var n2 = arguments[r4];
            if (n2 !== undefined) {
              t4 += n2;
            }
          }
          return t4;
        }, evaluate: function(e3) {
          if (o2.length === 0) {
            return a3;
          } else {
            return t3.unifiedEval(this, e3);
          }
        } };
      });
      t2.addGrammarElement("nakedString", function(e2, t3, r3) {
        if (r3.hasMore()) {
          var n2 = r3.consumeUntilWhitespace();
          r3.matchTokenType("WHITESPACE");
          return { type: "nakedString", tokens: n2, evaluate: function(e3) {
            return n2.map(function(e4) {
              return e4.value;
            }).join("");
          } };
        }
      });
      t2.addLeafExpression("number", function(e2, t3, r3) {
        var n2 = r3.matchTokenType("NUMBER");
        if (!n2)
          return;
        var i2 = n2;
        var a3 = parseFloat(n2.value);
        return { type: "number", value: a3, numberToken: i2, evaluate: function() {
          return a3;
        } };
      });
      t2.addLeafExpression("idRef", function(e2, t3, r3) {
        var i2 = r3.matchTokenType("ID_REF");
        if (!i2)
          return;
        if (!i2.value)
          return;
        if (i2.template) {
          var a3 = i2.value.substring(2);
          var o2 = n.tokenize(a3);
          var s3 = e2.requireElement("expression", o2);
          return { type: "idRefTemplate", args: [s3], op: function(e3, r4) {
            return t3.getRootNode(e3.me).getElementById(r4);
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        } else {
          const e3 = i2.value.substring(1);
          return { type: "idRef", css: i2.value, value: e3, evaluate: function(r4) {
            return t3.getRootNode(r4.me).getElementById(e3);
          } };
        }
      });
      t2.addLeafExpression("classRef", function(e2, t3, r3) {
        var i2 = r3.matchTokenType("CLASS_REF");
        if (!i2)
          return;
        if (!i2.value)
          return;
        if (i2.template) {
          var a3 = i2.value.substring(2);
          var o2 = n.tokenize(a3);
          var s3 = e2.requireElement("expression", o2);
          return { type: "classRefTemplate", args: [s3], op: function(e3, t4) {
            return new m("." + t4, e3.me, true);
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        } else {
          const e3 = i2.value;
          return { type: "classRef", css: e3, evaluate: function(t4) {
            return new m(e3, t4.me, true);
          } };
        }
      });

      class r2 extends m {
        constructor(e2, t3, r3) {
          super(e2, t3);
          this.templateParts = r3;
          this.elements = r3.filter((e3) => e3 instanceof Element);
        }
        get css() {
          let e2 = "", t3 = 0;
          for (const r3 of this.templateParts) {
            if (r3 instanceof Element) {
              e2 += "[data-hs-query-id='" + t3++ + "']";
            } else
              e2 += r3;
          }
          return e2;
        }
        [Symbol.iterator]() {
          this.elements.forEach((e3, t3) => e3.dataset.hsQueryId = t3);
          const e2 = super[Symbol.iterator]();
          this.elements.forEach((e3) => e3.removeAttribute("data-hs-query-id"));
          return e2;
        }
      }
      t2.addLeafExpression("queryRef", function(e2, t3, i2) {
        var a3 = i2.matchOpToken("<");
        if (!a3)
          return;
        var o2 = i2.consumeUntil("/");
        i2.requireOpToken("/");
        i2.requireOpToken(">");
        var s3 = o2.map(function(e3) {
          if (e3.type === "STRING") {
            return '"' + e3.value + '"';
          } else {
            return e3.value;
          }
        }).join("");
        var u3, l3, c3;
        if (s3.indexOf("$") >= 0) {
          u3 = true;
          l3 = n.tokenize(s3, true);
          c3 = e2.parseStringTemplate(l3);
        }
        return { type: "queryRef", css: s3, args: c3, op: function(e3, ...t4) {
          if (u3) {
            return new r2(s3, e3.me, t4);
          } else {
            return new m(s3, e3.me);
          }
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addLeafExpression("attributeRef", function(e2, t3, r3) {
        var n2 = r3.matchTokenType("ATTRIBUTE_REF");
        if (!n2)
          return;
        if (!n2.value)
          return;
        var i2 = n2.value;
        if (i2.indexOf("[") === 0) {
          var a3 = i2.substring(2, i2.length - 1);
        } else {
          var a3 = i2.substring(1);
        }
        var o2 = "[" + a3 + "]";
        var s3 = a3.split("=");
        var u3 = s3[0];
        var l3 = s3[1];
        if (l3) {
          if (l3.indexOf('"') === 0) {
            l3 = l3.substring(1, l3.length - 1);
          }
        }
        return { type: "attributeRef", name: u3, css: o2, value: l3, op: function(e3) {
          var t4 = e3.you || e3.me;
          if (t4) {
            return t4.getAttribute(u3);
          }
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addLeafExpression("styleRef", function(e2, t3, r3) {
        var n2 = r3.matchTokenType("STYLE_REF");
        if (!n2)
          return;
        if (!n2.value)
          return;
        var i2 = n2.value.substr(1);
        if (i2.startsWith("computed-")) {
          i2 = i2.substr("computed-".length);
          return { type: "computedStyleRef", name: i2, op: function(e3) {
            var r4 = e3.you || e3.me;
            if (r4) {
              return t3.resolveComputedStyle(r4, i2);
            }
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        } else {
          return { type: "styleRef", name: i2, op: function(e3) {
            var r4 = e3.you || e3.me;
            if (r4) {
              return t3.resolveStyle(r4, i2);
            }
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        }
      });
      t2.addGrammarElement("objectKey", function(e2, t3, r3) {
        var n2;
        if (n2 = r3.matchTokenType("STRING")) {
          return { type: "objectKey", key: n2.value, evaluate: function() {
            return n2.value;
          } };
        } else if (r3.matchOpToken("[")) {
          var i2 = e2.parseElement("expression", r3);
          r3.requireOpToken("]");
          return { type: "objectKey", expr: i2, args: [i2], op: function(e3, t4) {
            return t4;
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        } else {
          var a3 = "";
          do {
            n2 = r3.matchTokenType("IDENTIFIER") || r3.matchOpToken("-");
            if (n2)
              a3 += n2.value;
          } while (n2);
          return { type: "objectKey", key: a3, evaluate: function() {
            return a3;
          } };
        }
      });
      t2.addLeafExpression("objectLiteral", function(e2, t3, r3) {
        if (!r3.matchOpToken("{"))
          return;
        var n2 = [];
        var i2 = [];
        if (!r3.matchOpToken("}")) {
          do {
            var a3 = e2.requireElement("objectKey", r3);
            r3.requireOpToken(":");
            var o2 = e2.requireElement("expression", r3);
            i2.push(o2);
            n2.push(a3);
          } while (r3.matchOpToken(","));
          r3.requireOpToken("}");
        }
        return { type: "objectLiteral", args: [n2, i2], op: function(e3, t4, r4) {
          var n3 = {};
          for (var i3 = 0;i3 < t4.length; i3++) {
            n3[t4[i3]] = r4[i3];
          }
          return n3;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("nakedNamedArgumentList", function(e2, t3, r3) {
        var n2 = [];
        var i2 = [];
        if (r3.currentToken().type === "IDENTIFIER") {
          do {
            var a3 = r3.requireTokenType("IDENTIFIER");
            r3.requireOpToken(":");
            var o2 = e2.requireElement("expression", r3);
            i2.push(o2);
            n2.push({ name: a3, value: o2 });
          } while (r3.matchOpToken(","));
        }
        return { type: "namedArgumentList", fields: n2, args: [i2], op: function(e3, t4) {
          var r4 = { _namedArgList_: true };
          for (var i3 = 0;i3 < t4.length; i3++) {
            var a4 = n2[i3];
            r4[a4.name.value] = t4[i3];
          }
          return r4;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("namedArgumentList", function(e2, t3, r3) {
        if (!r3.matchOpToken("("))
          return;
        var n2 = e2.requireElement("nakedNamedArgumentList", r3);
        r3.requireOpToken(")");
        return n2;
      });
      t2.addGrammarElement("symbol", function(e2, t3, r3) {
        var n2 = "default";
        if (r3.matchToken("global")) {
          n2 = "global";
        } else if (r3.matchToken("element") || r3.matchToken("module")) {
          n2 = "element";
          if (r3.matchOpToken("'")) {
            r3.requireToken("s");
          }
        } else if (r3.matchToken("local")) {
          n2 = "local";
        }
        let i2 = r3.matchOpToken(":");
        let a3 = r3.matchTokenType("IDENTIFIER");
        if (a3 && a3.value) {
          var o2 = a3.value;
          if (i2) {
            o2 = ":" + o2;
          }
          if (n2 === "default") {
            if (o2.indexOf("$") === 0) {
              n2 = "global";
            }
            if (o2.indexOf(":") === 0) {
              n2 = "element";
            }
          }
          return { type: "symbol", token: a3, scope: n2, name: o2, evaluate: function(e3) {
            return t3.resolveSymbol(o2, e3, n2);
          } };
        }
      });
      t2.addGrammarElement("implicitMeTarget", function(e2, t3, r3) {
        return { type: "implicitMeTarget", evaluate: function(e3) {
          return e3.you || e3.me;
        } };
      });
      t2.addLeafExpression("boolean", function(e2, t3, r3) {
        var n2 = r3.matchToken("true") || r3.matchToken("false");
        if (!n2)
          return;
        const i2 = n2.value === "true";
        return { type: "boolean", evaluate: function(e3) {
          return i2;
        } };
      });
      t2.addLeafExpression("null", function(e2, t3, r3) {
        if (r3.matchToken("null")) {
          return { type: "null", evaluate: function(e3) {
            return null;
          } };
        }
      });
      t2.addLeafExpression("arrayLiteral", function(e2, t3, r3) {
        if (!r3.matchOpToken("["))
          return;
        var n2 = [];
        if (!r3.matchOpToken("]")) {
          do {
            var i2 = e2.requireElement("expression", r3);
            n2.push(i2);
          } while (r3.matchOpToken(","));
          r3.requireOpToken("]");
        }
        return { type: "arrayLiteral", values: n2, args: [n2], op: function(e3, t4) {
          return t4;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addLeafExpression("blockLiteral", function(e2, t3, r3) {
        if (!r3.matchOpToken("\\"))
          return;
        var n2 = [];
        var i2 = r3.matchTokenType("IDENTIFIER");
        if (i2) {
          n2.push(i2);
          while (r3.matchOpToken(",")) {
            n2.push(r3.requireTokenType("IDENTIFIER"));
          }
        }
        r3.requireOpToken("-");
        r3.requireOpToken(">");
        var a3 = e2.requireElement("expression", r3);
        return { type: "blockLiteral", args: n2, expr: a3, evaluate: function(e3) {
          var t4 = function() {
            for (var t5 = 0;t5 < n2.length; t5++) {
              e3.locals[n2[t5].value] = arguments[t5];
            }
            return a3.evaluate(e3);
          };
          return t4;
        } };
      });
      t2.addIndirectExpression("propertyAccess", function(e2, t3, r3, n2) {
        if (!r3.matchOpToken("."))
          return;
        var i2 = r3.requireTokenType("IDENTIFIER");
        var a3 = { type: "propertyAccess", root: n2, prop: i2, args: [n2], op: function(e3, r4) {
          var n3 = t3.resolveProperty(r4, i2.value);
          return n3;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return e2.parseElement("indirectExpression", r3, a3);
      });
      t2.addIndirectExpression("of", function(e2, t3, r3, n2) {
        if (!r3.matchToken("of"))
          return;
        var i2 = e2.requireElement("unaryExpression", r3);
        var a3 = null;
        var o2 = n2;
        while (o2.root) {
          a3 = o2;
          o2 = o2.root;
        }
        if (o2.type !== "symbol" && o2.type !== "attributeRef" && o2.type !== "styleRef" && o2.type !== "computedStyleRef") {
          e2.raiseParseError(r3, "Cannot take a property of a non-symbol: " + o2.type);
        }
        var s3 = o2.type === "attributeRef";
        var u3 = o2.type === "styleRef" || o2.type === "computedStyleRef";
        if (s3 || u3) {
          var l3 = o2;
        }
        var c3 = o2.name;
        var f3 = { type: "ofExpression", prop: o2.token, root: i2, attribute: l3, expression: n2, args: [i2], op: function(e3, r4) {
          if (s3) {
            return t3.resolveAttribute(r4, c3);
          } else if (u3) {
            if (o2.type === "computedStyleRef") {
              return t3.resolveComputedStyle(r4, c3);
            } else {
              return t3.resolveStyle(r4, c3);
            }
          } else {
            return t3.resolveProperty(r4, c3);
          }
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        if (o2.type === "attributeRef") {
          f3.attribute = o2;
        }
        if (a3) {
          a3.root = f3;
          a3.args = [f3];
        } else {
          n2 = f3;
        }
        return e2.parseElement("indirectExpression", r3, n2);
      });
      t2.addIndirectExpression("possessive", function(e2, t3, r3, n2) {
        if (e2.possessivesDisabled) {
          return;
        }
        var i2 = r3.matchOpToken("'");
        if (i2 || n2.type === "symbol" && (n2.name === "my" || n2.name === "its" || n2.name === "your") && (r3.currentToken().type === "IDENTIFIER" || r3.currentToken().type === "ATTRIBUTE_REF" || r3.currentToken().type === "STYLE_REF")) {
          if (i2) {
            r3.requireToken("s");
          }
          var a3, o2, s3;
          a3 = e2.parseElement("attributeRef", r3);
          if (a3 == null) {
            o2 = e2.parseElement("styleRef", r3);
            if (o2 == null) {
              s3 = r3.requireTokenType("IDENTIFIER");
            }
          }
          var u3 = { type: "possessive", root: n2, attribute: a3 || o2, prop: s3, args: [n2], op: function(e3, r4) {
            if (a3) {
              var n3 = t3.resolveAttribute(r4, a3.name);
            } else if (o2) {
              var n3;
              if (o2.type === "computedStyleRef") {
                n3 = t3.resolveComputedStyle(r4, o2["name"]);
              } else {
                n3 = t3.resolveStyle(r4, o2["name"]);
              }
            } else {
              var n3 = t3.resolveProperty(r4, s3.value);
            }
            return n3;
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
          return e2.parseElement("indirectExpression", r3, u3);
        }
      });
      t2.addIndirectExpression("inExpression", function(e2, t3, r3, n2) {
        if (!r3.matchToken("in"))
          return;
        var i2 = e2.requireElement("unaryExpression", r3);
        var a3 = { type: "inExpression", root: n2, args: [n2, i2], op: function(e3, r4, n3) {
          var i3 = [];
          if (r4.css) {
            t3.implicitLoop(n3, function(e4) {
              var t4 = e4.querySelectorAll(r4.css);
              for (var n4 = 0;n4 < t4.length; n4++) {
                i3.push(t4[n4]);
              }
            });
          } else if (r4 instanceof Element) {
            var a4 = false;
            t3.implicitLoop(n3, function(e4) {
              if (e4.contains(r4)) {
                a4 = true;
              }
            });
            if (a4) {
              return r4;
            }
          } else {
            t3.implicitLoop(r4, function(e4) {
              t3.implicitLoop(n3, function(t4) {
                if (e4 === t4) {
                  i3.push(e4);
                }
              });
            });
          }
          return i3;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return e2.parseElement("indirectExpression", r3, a3);
      });
      t2.addIndirectExpression("asExpression", function(e2, t3, r3, n2) {
        if (!r3.matchToken("as"))
          return;
        r3.matchToken("a") || r3.matchToken("an");
        var i2 = e2.requireElement("dotOrColonPath", r3).evaluate();
        var a3 = { type: "asExpression", root: n2, args: [n2], op: function(e3, r4) {
          return t3.convertValue(r4, i2);
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return e2.parseElement("indirectExpression", r3, a3);
      });
      t2.addIndirectExpression("functionCall", function(e2, t3, r3, n2) {
        if (!r3.matchOpToken("("))
          return;
        var i2 = [];
        if (!r3.matchOpToken(")")) {
          do {
            i2.push(e2.requireElement("expression", r3));
          } while (r3.matchOpToken(","));
          r3.requireOpToken(")");
        }
        if (n2.root) {
          var a3 = { type: "functionCall", root: n2, argExressions: i2, args: [n2.root, i2], op: function(e3, r4, i3) {
            t3.nullCheck(r4, n2.root);
            var a4 = r4[n2.prop.value];
            t3.nullCheck(a4, n2);
            if (a4.hyperfunc) {
              i3.push(e3);
            }
            return a4.apply(r4, i3);
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        } else {
          var a3 = { type: "functionCall", root: n2, argExressions: i2, args: [n2, i2], op: function(e3, r4, i3) {
            t3.nullCheck(r4, n2);
            if (r4.hyperfunc) {
              i3.push(e3);
            }
            var a4 = r4.apply(null, i3);
            return a4;
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        }
        return e2.parseElement("indirectExpression", r3, a3);
      });
      t2.addIndirectExpression("attributeRefAccess", function(e2, t3, r3, n2) {
        var i2 = e2.parseElement("attributeRef", r3);
        if (!i2)
          return;
        var a3 = { type: "attributeRefAccess", root: n2, attribute: i2, args: [n2], op: function(e3, r4) {
          var n3 = t3.resolveAttribute(r4, i2.name);
          return n3;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return a3;
      });
      t2.addIndirectExpression("arrayIndex", function(e2, t3, r3, n2) {
        if (!r3.matchOpToken("["))
          return;
        var i2 = false;
        var a3 = false;
        var o2 = null;
        var s3 = null;
        if (r3.matchOpToken("..")) {
          i2 = true;
          o2 = e2.requireElement("expression", r3);
        } else {
          o2 = e2.requireElement("expression", r3);
          if (r3.matchOpToken("..")) {
            a3 = true;
            var u3 = r3.currentToken();
            if (u3.type !== "R_BRACKET") {
              s3 = e2.parseElement("expression", r3);
            }
          }
        }
        r3.requireOpToken("]");
        var l3 = { type: "arrayIndex", root: n2, prop: o2, firstIndex: o2, secondIndex: s3, args: [n2, o2, s3], op: function(e3, t4, r4, n3) {
          if (t4 == null) {
            return null;
          }
          if (i2) {
            if (r4 < 0) {
              r4 = t4.length + r4;
            }
            return t4.slice(0, r4 + 1);
          } else if (a3) {
            if (n3 != null) {
              if (n3 < 0) {
                n3 = t4.length + n3;
              }
              return t4.slice(r4, n3 + 1);
            } else {
              return t4.slice(r4);
            }
          } else {
            return t4[r4];
          }
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return e2.parseElement("indirectExpression", r3, l3);
      });
      var a2 = ["em", "ex", "cap", "ch", "ic", "rem", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax", "cm", "mm", "Q", "pc", "pt", "px"];
      t2.addGrammarElement("postfixExpression", function(e2, t3, r3) {
        var n2 = e2.parseElement("primaryExpression", r3);
        let i2 = r3.matchAnyToken.apply(r3, a2) || r3.matchOpToken("%");
        if (i2) {
          return { type: "stringPostfix", postfix: i2.value, args: [n2], op: function(e3, t4) {
            return "" + t4 + i2.value;
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        }
        var o2 = null;
        if (r3.matchToken("s") || r3.matchToken("seconds")) {
          o2 = 1000;
        } else if (r3.matchToken("ms") || r3.matchToken("milliseconds")) {
          o2 = 1;
        }
        if (o2) {
          return { type: "timeExpression", time: n2, factor: o2, args: [n2], op: function(e3, t4) {
            return t4 * o2;
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        }
        if (r3.matchOpToken(":")) {
          var s3 = r3.requireTokenType("IDENTIFIER");
          if (!s3.value)
            return;
          var u3 = !r3.matchOpToken("!");
          return { type: "typeCheck", typeName: s3, nullOk: u3, args: [n2], op: function(e3, r4) {
            var n3 = t3.typeCheck(r4, this.typeName.value, u3);
            if (n3) {
              return r4;
            } else {
              throw new Error("Typecheck failed!  Expected: " + s3.value);
            }
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        } else {
          return n2;
        }
      });
      t2.addGrammarElement("logicalNot", function(e2, t3, r3) {
        if (!r3.matchToken("not"))
          return;
        var n2 = e2.requireElement("unaryExpression", r3);
        return { type: "logicalNot", root: n2, args: [n2], op: function(e3, t4) {
          return !t4;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("noExpression", function(e2, t3, r3) {
        if (!r3.matchToken("no"))
          return;
        var n2 = e2.requireElement("unaryExpression", r3);
        return { type: "noExpression", root: n2, args: [n2], op: function(e3, r4) {
          return t3.isEmpty(r4);
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addLeafExpression("some", function(e2, t3, r3) {
        if (!r3.matchToken("some"))
          return;
        var n2 = e2.requireElement("expression", r3);
        return { type: "noExpression", root: n2, args: [n2], op: function(e3, r4) {
          return !t3.isEmpty(r4);
        }, evaluate(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("negativeNumber", function(e2, t3, r3) {
        if (!r3.matchOpToken("-"))
          return;
        var n2 = e2.requireElement("unaryExpression", r3);
        return { type: "negativeNumber", root: n2, args: [n2], op: function(e3, t4) {
          return -1 * t4;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("unaryExpression", function(e2, t3, r3) {
        r3.matchToken("the");
        return e2.parseAnyOf(["beepExpression", "logicalNot", "relativePositionalExpression", "positionalExpression", "noExpression", "negativeNumber", "postfixExpression"], r3);
      });
      t2.addGrammarElement("beepExpression", function(e2, t3, r3) {
        if (!r3.matchToken("beep!"))
          return;
        var n2 = e2.parseElement("unaryExpression", r3);
        if (n2) {
          n2["booped"] = true;
          var i2 = n2.evaluate;
          n2.evaluate = function(e3) {
            let r4 = i2.apply(n2, arguments);
            let a3 = e3.me;
            t3.beepValueToConsole(a3, n2, r4);
            return r4;
          };
          return n2;
        }
      });
      var s2 = function(e2, t3, r3, n2) {
        var i2 = t3.querySelectorAll(r3);
        for (var a3 = 0;a3 < i2.length; a3++) {
          var o2 = i2[a3];
          if (o2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_PRECEDING) {
            return o2;
          }
        }
        if (n2) {
          return i2[0];
        }
      };
      var u2 = function(e2, t3, r3, n2) {
        var i2 = t3.querySelectorAll(r3);
        for (var a3 = i2.length - 1;a3 >= 0; a3--) {
          var o2 = i2[a3];
          if (o2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_FOLLOWING) {
            return o2;
          }
        }
        if (n2) {
          return i2[i2.length - 1];
        }
      };
      var l2 = function(e2, t3, r3, n2) {
        var i2 = [];
        o.prototype.forEach(t3, function(t4) {
          if (t4.matches(r3) || t4 === e2) {
            i2.push(t4);
          }
        });
        for (var a3 = 0;a3 < i2.length - 1; a3++) {
          var s3 = i2[a3];
          if (s3 === e2) {
            return i2[a3 + 1];
          }
        }
        if (n2) {
          var u3 = i2[0];
          if (u3 && u3.matches(r3)) {
            return u3;
          }
        }
      };
      var c2 = function(e2, t3, r3, n2) {
        return l2(e2, Array.from(t3).reverse(), r3, n2);
      };
      t2.addGrammarElement("relativePositionalExpression", function(e2, t3, r3) {
        var n2 = r3.matchAnyToken("next", "previous");
        if (!n2)
          return;
        var a3 = n2.value === "next";
        var o2 = e2.parseElement("expression", r3);
        if (r3.matchToken("from")) {
          r3.pushFollow("in");
          try {
            var f3 = e2.requireElement("unaryExpression", r3);
          } finally {
            r3.popFollow();
          }
        } else {
          var f3 = e2.requireElement("implicitMeTarget", r3);
        }
        var m2 = false;
        var p3;
        if (r3.matchToken("in")) {
          m2 = true;
          var h2 = e2.requireElement("unaryExpression", r3);
        } else if (r3.matchToken("within")) {
          p3 = e2.requireElement("unaryExpression", r3);
        } else {
          p3 = document.body;
        }
        var v3 = false;
        if (r3.matchToken("with")) {
          r3.requireToken("wrapping");
          v3 = true;
        }
        return { type: "relativePositionalExpression", from: f3, forwardSearch: a3, inSearch: m2, wrapping: v3, inElt: h2, withinElt: p3, operator: n2.value, args: [o2, f3, h2, p3], op: function(e3, t4, r4, n3, f4) {
          var p4 = t4.css;
          if (p4 == null) {
            throw "Expected a CSS value to be returned by " + i.sourceFor.apply(o2);
          }
          if (m2) {
            if (n3) {
              if (a3) {
                return l2(r4, n3, p4, v3);
              } else {
                return c2(r4, n3, p4, v3);
              }
            }
          } else {
            if (f4) {
              if (a3) {
                return s2(r4, f4, p4, v3);
              } else {
                return u2(r4, f4, p4, v3);
              }
            }
          }
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("positionalExpression", function(e2, t3, r3) {
        var n2 = r3.matchAnyToken("first", "last", "random");
        if (!n2)
          return;
        r3.matchAnyToken("in", "from", "of");
        var i2 = e2.requireElement("unaryExpression", r3);
        const a3 = n2.value;
        return { type: "positionalExpression", rhs: i2, operator: n2.value, args: [i2], op: function(e3, t4) {
          if (t4 && !Array.isArray(t4)) {
            if (t4.children) {
              t4 = t4.children;
            } else {
              t4 = Array.from(t4);
            }
          }
          if (t4) {
            if (a3 === "first") {
              return t4[0];
            } else if (a3 === "last") {
              return t4[t4.length - 1];
            } else if (a3 === "random") {
              return t4[Math.floor(Math.random() * t4.length)];
            }
          }
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
      });
      t2.addGrammarElement("mathOperator", function(e2, t3, r3) {
        var n2 = e2.parseElement("unaryExpression", r3);
        var i2, a3 = null;
        i2 = r3.matchAnyOpToken("+", "-", "*", "/") || r3.matchToken("mod");
        while (i2) {
          a3 = a3 || i2;
          var o2 = i2.value;
          if (a3.value !== o2) {
            e2.raiseParseError(r3, "You must parenthesize math operations with different operators");
          }
          var s3 = e2.parseElement("unaryExpression", r3);
          n2 = { type: "mathOperator", lhs: n2, rhs: s3, operator: o2, args: [n2, s3], op: function(e3, t4, r4) {
            if (o2 === "+") {
              return t4 + r4;
            } else if (o2 === "-") {
              return t4 - r4;
            } else if (o2 === "*") {
              return t4 * r4;
            } else if (o2 === "/") {
              return t4 / r4;
            } else if (o2 === "mod") {
              return t4 % r4;
            }
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
          i2 = r3.matchAnyOpToken("+", "-", "*", "/") || r3.matchToken("mod");
        }
        return n2;
      });
      t2.addGrammarElement("mathExpression", function(e2, t3, r3) {
        return e2.parseAnyOf(["mathOperator", "unaryExpression"], r3);
      });
      function f2(e2, t3, r3) {
        if (t3["contains"]) {
          return t3.contains(r3);
        } else if (t3["includes"]) {
          return t3.includes(r3);
        } else {
          throw Error("The value of " + e2.sourceFor() + " does not have a contains or includes method on it");
        }
      }
      function p2(e2, t3, r3) {
        if (t3["match"]) {
          return !!t3.match(r3);
        } else if (t3["matches"]) {
          return t3.matches(r3);
        } else {
          throw Error("The value of " + e2.sourceFor() + " does not have a match or matches method on it");
        }
      }
      t2.addGrammarElement("comparisonOperator", function(e2, t3, r3) {
        var n2 = e2.parseElement("mathExpression", r3);
        var i2 = r3.matchAnyOpToken("<", ">", "<=", ">=", "==", "===", "!=", "!==");
        var a3 = i2 ? i2.value : null;
        var o2 = true;
        var s3 = false;
        if (a3 == null) {
          if (r3.matchToken("is") || r3.matchToken("am")) {
            if (r3.matchToken("not")) {
              if (r3.matchToken("in")) {
                a3 = "not in";
              } else if (r3.matchToken("a")) {
                a3 = "not a";
                s3 = true;
              } else if (r3.matchToken("empty")) {
                a3 = "not empty";
                o2 = false;
              } else {
                if (r3.matchToken("really")) {
                  a3 = "!==";
                } else {
                  a3 = "!=";
                }
                if (r3.matchToken("equal")) {
                  r3.matchToken("to");
                }
              }
            } else if (r3.matchToken("in")) {
              a3 = "in";
            } else if (r3.matchToken("a")) {
              a3 = "a";
              s3 = true;
            } else if (r3.matchToken("empty")) {
              a3 = "empty";
              o2 = false;
            } else if (r3.matchToken("less")) {
              r3.requireToken("than");
              if (r3.matchToken("or")) {
                r3.requireToken("equal");
                r3.requireToken("to");
                a3 = "<=";
              } else {
                a3 = "<";
              }
            } else if (r3.matchToken("greater")) {
              r3.requireToken("than");
              if (r3.matchToken("or")) {
                r3.requireToken("equal");
                r3.requireToken("to");
                a3 = ">=";
              } else {
                a3 = ">";
              }
            } else {
              if (r3.matchToken("really")) {
                a3 = "===";
              } else {
                a3 = "==";
              }
              if (r3.matchToken("equal")) {
                r3.matchToken("to");
              }
            }
          } else if (r3.matchToken("equals")) {
            a3 = "==";
          } else if (r3.matchToken("really")) {
            r3.requireToken("equals");
            a3 = "===";
          } else if (r3.matchToken("exist") || r3.matchToken("exists")) {
            a3 = "exist";
            o2 = false;
          } else if (r3.matchToken("matches") || r3.matchToken("match")) {
            a3 = "match";
          } else if (r3.matchToken("contains") || r3.matchToken("contain")) {
            a3 = "contain";
          } else if (r3.matchToken("includes") || r3.matchToken("include")) {
            a3 = "include";
          } else if (r3.matchToken("do") || r3.matchToken("does")) {
            r3.requireToken("not");
            if (r3.matchToken("matches") || r3.matchToken("match")) {
              a3 = "not match";
            } else if (r3.matchToken("contains") || r3.matchToken("contain")) {
              a3 = "not contain";
            } else if (r3.matchToken("exist") || r3.matchToken("exist")) {
              a3 = "not exist";
              o2 = false;
            } else if (r3.matchToken("include")) {
              a3 = "not include";
            } else {
              e2.raiseParseError(r3, "Expected matches or contains");
            }
          }
        }
        if (a3) {
          var u3, l3, c3;
          if (s3) {
            u3 = r3.requireTokenType("IDENTIFIER");
            l3 = !r3.matchOpToken("!");
          } else if (o2) {
            c3 = e2.requireElement("mathExpression", r3);
            if (a3 === "match" || a3 === "not match") {
              c3 = c3.css ? c3.css : c3;
            }
          }
          var m2 = n2;
          n2 = { type: "comparisonOperator", operator: a3, typeName: u3, nullOk: l3, lhs: n2, rhs: c3, args: [n2, c3], op: function(e3, r4, n3) {
            if (a3 === "==") {
              return r4 == n3;
            } else if (a3 === "!=") {
              return r4 != n3;
            }
            if (a3 === "===") {
              return r4 === n3;
            } else if (a3 === "!==") {
              return r4 !== n3;
            }
            if (a3 === "match") {
              return r4 != null && p2(m2, r4, n3);
            }
            if (a3 === "not match") {
              return r4 == null || !p2(m2, r4, n3);
            }
            if (a3 === "in") {
              return n3 != null && f2(c3, n3, r4);
            }
            if (a3 === "not in") {
              return n3 == null || !f2(c3, n3, r4);
            }
            if (a3 === "contain") {
              return r4 != null && f2(m2, r4, n3);
            }
            if (a3 === "not contain") {
              return r4 == null || !f2(m2, r4, n3);
            }
            if (a3 === "include") {
              return r4 != null && f2(m2, r4, n3);
            }
            if (a3 === "not include") {
              return r4 == null || !f2(m2, r4, n3);
            }
            if (a3 === "===") {
              return r4 === n3;
            } else if (a3 === "!==") {
              return r4 !== n3;
            } else if (a3 === "<") {
              return r4 < n3;
            } else if (a3 === ">") {
              return r4 > n3;
            } else if (a3 === "<=") {
              return r4 <= n3;
            } else if (a3 === ">=") {
              return r4 >= n3;
            } else if (a3 === "empty") {
              return t3.isEmpty(r4);
            } else if (a3 === "not empty") {
              return !t3.isEmpty(r4);
            } else if (a3 === "exist") {
              return t3.doesExist(r4);
            } else if (a3 === "not exist") {
              return !t3.doesExist(r4);
            } else if (a3 === "a") {
              return t3.typeCheck(r4, u3.value, l3);
            } else if (a3 === "not a") {
              return !t3.typeCheck(r4, u3.value, l3);
            } else {
              throw "Unknown comparison : " + a3;
            }
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
        }
        return n2;
      });
      t2.addGrammarElement("comparisonExpression", function(e2, t3, r3) {
        return e2.parseAnyOf(["comparisonOperator", "mathExpression"], r3);
      });
      t2.addGrammarElement("logicalOperator", function(e2, t3, r3) {
        var n2 = e2.parseElement("comparisonExpression", r3);
        var i2, a3 = null;
        i2 = r3.matchToken("and") || r3.matchToken("or");
        while (i2) {
          a3 = a3 || i2;
          if (a3.value !== i2.value) {
            e2.raiseParseError(r3, "You must parenthesize logical operations with different operators");
          }
          var o2 = e2.requireElement("comparisonExpression", r3);
          const s3 = i2.value;
          n2 = { type: "logicalOperator", operator: s3, lhs: n2, rhs: o2, args: [n2, o2], op: function(e3, t4, r4) {
            if (s3 === "and") {
              return t4 && r4;
            } else {
              return t4 || r4;
            }
          }, evaluate: function(e3) {
            return t3.unifiedEval(this, e3);
          } };
          i2 = r3.matchToken("and") || r3.matchToken("or");
        }
        return n2;
      });
      t2.addGrammarElement("logicalExpression", function(e2, t3, r3) {
        return e2.parseAnyOf(["logicalOperator", "mathExpression"], r3);
      });
      t2.addGrammarElement("asyncExpression", function(e2, t3, r3) {
        if (r3.matchToken("async")) {
          var n2 = e2.requireElement("logicalExpression", r3);
          var i2 = { type: "asyncExpression", value: n2, evaluate: function(e3) {
            return { asyncWrapper: true, value: this.value.evaluate(e3) };
          } };
          return i2;
        } else {
          return e2.parseElement("logicalExpression", r3);
        }
      });
      t2.addGrammarElement("expression", function(e2, t3, r3) {
        r3.matchToken("the");
        return e2.parseElement("asyncExpression", r3);
      });
      t2.addGrammarElement("assignableExpression", function(e2, t3, r3) {
        r3.matchToken("the");
        var n2 = e2.parseElement("primaryExpression", r3);
        if (n2 && (n2.type === "symbol" || n2.type === "ofExpression" || n2.type === "propertyAccess" || n2.type === "attributeRefAccess" || n2.type === "attributeRef" || n2.type === "styleRef" || n2.type === "arrayIndex" || n2.type === "possessive")) {
          return n2;
        } else {
          e2.raiseParseError(r3, "A target expression must be writable.  The expression type '" + (n2 && n2.type) + "' is not.");
        }
        return n2;
      });
      t2.addGrammarElement("hyperscript", function(e2, t3, r3) {
        var n2 = [];
        if (r3.hasMore()) {
          while (e2.featureStart(r3.currentToken()) || r3.currentToken().value === "(") {
            var i2 = e2.requireElement("feature", r3);
            n2.push(i2);
            r3.matchToken("end");
          }
        }
        return { type: "hyperscript", features: n2, apply: function(e3, t4, r4) {
          for (const i3 of n2) {
            i3.install(e3, t4, r4);
          }
        } };
      });
      var v2 = function(e2) {
        var t3 = [];
        if (e2.token(0).value === "(" && (e2.token(1).value === ")" || e2.token(2).value === "," || e2.token(2).value === ")")) {
          e2.matchOpToken("(");
          do {
            t3.push(e2.requireTokenType("IDENTIFIER"));
          } while (e2.matchOpToken(","));
          e2.requireOpToken(")");
        }
        return t3;
      };
      t2.addFeature("on", function(e2, t3, r3) {
        if (!r3.matchToken("on"))
          return;
        var n2 = false;
        if (r3.matchToken("every")) {
          n2 = true;
        }
        var i2 = [];
        var a3 = null;
        do {
          var o2 = e2.requireElement("eventName", r3, "Expected event name");
          var s3 = o2.evaluate();
          if (a3) {
            a3 = a3 + " or " + s3;
          } else {
            a3 = "on " + s3;
          }
          var u3 = v2(r3);
          var l3 = null;
          if (r3.matchOpToken("[")) {
            l3 = e2.requireElement("expression", r3);
            r3.requireOpToken("]");
          }
          var c3, f3, m2;
          if (r3.currentToken().type === "NUMBER") {
            var p3 = r3.consumeToken();
            if (!p3.value)
              return;
            c3 = parseInt(p3.value);
            if (r3.matchToken("to")) {
              var h2 = r3.consumeToken();
              if (!h2.value)
                return;
              f3 = parseInt(h2.value);
            } else if (r3.matchToken("and")) {
              m2 = true;
              r3.requireToken("on");
            }
          }
          var d3, E2;
          if (s3 === "intersection") {
            d3 = {};
            if (r3.matchToken("with")) {
              d3["with"] = e2.requireElement("expression", r3).evaluate();
            }
            if (r3.matchToken("having")) {
              do {
                if (r3.matchToken("margin")) {
                  d3["rootMargin"] = e2.requireElement("stringLike", r3).evaluate();
                } else if (r3.matchToken("threshold")) {
                  d3["threshold"] = e2.requireElement("expression", r3).evaluate();
                } else {
                  e2.raiseParseError(r3, "Unknown intersection config specification");
                }
              } while (r3.matchToken("and"));
            }
          } else if (s3 === "mutation") {
            E2 = {};
            if (r3.matchToken("of")) {
              do {
                if (r3.matchToken("anything")) {
                  E2["attributes"] = true;
                  E2["subtree"] = true;
                  E2["characterData"] = true;
                  E2["childList"] = true;
                } else if (r3.matchToken("childList")) {
                  E2["childList"] = true;
                } else if (r3.matchToken("attributes")) {
                  E2["attributes"] = true;
                  E2["attributeOldValue"] = true;
                } else if (r3.matchToken("subtree")) {
                  E2["subtree"] = true;
                } else if (r3.matchToken("characterData")) {
                  E2["characterData"] = true;
                  E2["characterDataOldValue"] = true;
                } else if (r3.currentToken().type === "ATTRIBUTE_REF") {
                  var T3 = r3.consumeToken();
                  if (E2["attributeFilter"] == null) {
                    E2["attributeFilter"] = [];
                  }
                  if (T3.value.indexOf("@") == 0) {
                    E2["attributeFilter"].push(T3.value.substring(1));
                  } else {
                    e2.raiseParseError(r3, "Only shorthand attribute references are allowed here");
                  }
                } else {
                  e2.raiseParseError(r3, "Unknown mutation config specification");
                }
              } while (r3.matchToken("or"));
            } else {
              E2["attributes"] = true;
              E2["characterData"] = true;
              E2["childList"] = true;
            }
          }
          var y3 = null;
          var k3 = false;
          if (r3.matchToken("from")) {
            if (r3.matchToken("elsewhere")) {
              k3 = true;
            } else {
              r3.pushFollow("or");
              try {
                y3 = e2.requireElement("expression", r3);
              } finally {
                r3.popFollow();
              }
              if (!y3) {
                e2.raiseParseError(r3, 'Expected either target value or "elsewhere".');
              }
            }
          }
          if (y3 === null && k3 === false && r3.matchToken("elsewhere")) {
            k3 = true;
          }
          if (r3.matchToken("in")) {
            var x3 = e2.parseElement("unaryExpression", r3);
          }
          if (r3.matchToken("debounced")) {
            r3.requireToken("at");
            var g3 = e2.requireElement("unaryExpression", r3);
            var b3 = g3.evaluate({});
          } else if (r3.matchToken("throttled")) {
            r3.requireToken("at");
            var g3 = e2.requireElement("unaryExpression", r3);
            var w3 = g3.evaluate({});
          }
          i2.push({ execCount: 0, every: n2, on: s3, args: u3, filter: l3, from: y3, inExpr: x3, elsewhere: k3, startCount: c3, endCount: f3, unbounded: m2, debounceTime: b3, throttleTime: w3, mutationSpec: E2, intersectionSpec: d3, debounced: undefined, lastExec: undefined });
        } while (r3.matchToken("or"));
        var S3 = true;
        if (!n2) {
          if (r3.matchToken("queue")) {
            if (r3.matchToken("all")) {
              var q = true;
              var S3 = false;
            } else if (r3.matchToken("first")) {
              var N = true;
            } else if (r3.matchToken("none")) {
              var I = true;
            } else {
              r3.requireToken("last");
            }
          }
        }
        var C = e2.requireElement("commandList", r3);
        e2.ensureTerminated(C);
        var R, A;
        if (r3.matchToken("catch")) {
          R = r3.requireTokenType("IDENTIFIER").value;
          A = e2.requireElement("commandList", r3);
          e2.ensureTerminated(A);
        }
        if (r3.matchToken("finally")) {
          var L = e2.requireElement("commandList", r3);
          e2.ensureTerminated(L);
        }
        var O = { displayName: a3, events: i2, start: C, every: n2, execCount: 0, errorHandler: A, errorSymbol: R, execute: function(e3) {
          let r4 = t3.getEventQueueFor(e3.me, O);
          if (r4.executing && n2 === false) {
            if (I || N && r4.queue.length > 0) {
              return;
            }
            if (S3) {
              r4.queue.length = 0;
            }
            r4.queue.push(e3);
            return;
          }
          O.execCount++;
          r4.executing = true;
          e3.meta.onHalt = function() {
            r4.executing = false;
            var e4 = r4.queue.shift();
            if (e4) {
              setTimeout(function() {
                O.execute(e4);
              }, 1);
            }
          };
          e3.meta.reject = function(r5) {
            console.error(r5.message ? r5.message : r5);
            var n3 = t3.getHyperTrace(e3, r5);
            if (n3) {
              n3.print();
            }
            t3.triggerEvent(e3.me, "exception", { error: r5 });
          };
          C.execute(e3);
        }, install: function(e3, r4) {
          for (const r5 of O.events) {
            var n3;
            if (r5.elsewhere) {
              n3 = [document];
            } else if (r5.from) {
              n3 = r5.from.evaluate(t3.makeContext(e3, O, e3, null));
            } else {
              n3 = [e3];
            }
            t3.implicitLoop(n3, function(n4) {
              var i3 = r5.on;
              if (n4 == null) {
                console.warn("'%s' feature ignored because target does not exists:", a3, e3);
                return;
              }
              if (r5.mutationSpec) {
                i3 = "hyperscript:mutation";
                const e4 = new MutationObserver(function(e5, r6) {
                  if (!O.executing) {
                    t3.triggerEvent(n4, i3, { mutationList: e5, observer: r6 });
                  }
                });
                e4.observe(n4, r5.mutationSpec);
              }
              if (r5.intersectionSpec) {
                i3 = "hyperscript:intersection";
                const e4 = new IntersectionObserver(function(r6) {
                  for (const o4 of r6) {
                    var a4 = { observer: e4 };
                    a4 = Object.assign(a4, o4);
                    a4["intersecting"] = o4.isIntersecting;
                    t3.triggerEvent(n4, i3, a4);
                  }
                }, r5.intersectionSpec);
                e4.observe(n4);
              }
              var o3 = n4.addEventListener || n4.on;
              o3.call(n4, i3, function a(o4) {
                if (typeof Node !== "undefined" && e3 instanceof Node && n4 !== e3 && !e3.isConnected) {
                  n4.removeEventListener(i3, a);
                  return;
                }
                var s4 = t3.makeContext(e3, O, e3, o4);
                if (r5.elsewhere && e3.contains(o4.target)) {
                  return;
                }
                if (r5.from) {
                  s4.result = n4;
                }
                for (const e4 of r5.args) {
                  let t4 = s4.event[e4.value];
                  if (t4 !== undefined) {
                    s4.locals[e4.value] = t4;
                  } else if ("detail" in s4.event) {
                    s4.locals[e4.value] = s4.event["detail"][e4.value];
                  }
                }
                s4.meta.errorHandler = A;
                s4.meta.errorSymbol = R;
                s4.meta.finallyHandler = L;
                if (r5.filter) {
                  var u4 = s4.meta.context;
                  s4.meta.context = s4.event;
                  try {
                    var l4 = r5.filter.evaluate(s4);
                    if (l4) {
                    } else {
                      return;
                    }
                  } finally {
                    s4.meta.context = u4;
                  }
                }
                if (r5.inExpr) {
                  var c4 = o4.target;
                  while (true) {
                    if (c4.matches && c4.matches(r5.inExpr.css)) {
                      s4.result = c4;
                      break;
                    } else {
                      c4 = c4.parentElement;
                      if (c4 == null) {
                        return;
                      }
                    }
                  }
                }
                r5.execCount++;
                if (r5.startCount) {
                  if (r5.endCount) {
                    if (r5.execCount < r5.startCount || r5.execCount > r5.endCount) {
                      return;
                    }
                  } else if (r5.unbounded) {
                    if (r5.execCount < r5.startCount) {
                      return;
                    }
                  } else if (r5.execCount !== r5.startCount) {
                    return;
                  }
                }
                if (r5.debounceTime) {
                  if (r5.debounced) {
                    clearTimeout(r5.debounced);
                  }
                  r5.debounced = setTimeout(function() {
                    O.execute(s4);
                  }, r5.debounceTime);
                  return;
                }
                if (r5.throttleTime) {
                  if (r5.lastExec && Date.now() < r5.lastExec + r5.throttleTime) {
                    return;
                  } else {
                    r5.lastExec = Date.now();
                  }
                }
                O.execute(s4);
              });
            });
          }
        } };
        e2.setParent(C, O);
        return O;
      });
      t2.addFeature("def", function(e2, t3, r3) {
        if (!r3.matchToken("def"))
          return;
        var n2 = e2.requireElement("dotOrColonPath", r3);
        var i2 = n2.evaluate();
        var a3 = i2.split(".");
        var o2 = a3.pop();
        var s3 = [];
        if (r3.matchOpToken("(")) {
          if (r3.matchOpToken(")")) {
          } else {
            do {
              s3.push(r3.requireTokenType("IDENTIFIER"));
            } while (r3.matchOpToken(","));
            r3.requireOpToken(")");
          }
        }
        var u3 = e2.requireElement("commandList", r3);
        var l3, c3;
        if (r3.matchToken("catch")) {
          l3 = r3.requireTokenType("IDENTIFIER").value;
          c3 = e2.parseElement("commandList", r3);
        }
        if (r3.matchToken("finally")) {
          var f3 = e2.requireElement("commandList", r3);
          e2.ensureTerminated(f3);
        }
        var m2 = { displayName: o2 + "(" + s3.map(function(e3) {
          return e3.value;
        }).join(", ") + ")", name: o2, args: s3, start: u3, errorHandler: c3, errorSymbol: l3, finallyHandler: f3, install: function(e3, r4) {
          var n3 = function() {
            var n4 = t3.makeContext(r4, m2, e3, null);
            n4.meta.errorHandler = c3;
            n4.meta.errorSymbol = l3;
            n4.meta.finallyHandler = f3;
            for (var i3 = 0;i3 < s3.length; i3++) {
              var a4 = s3[i3];
              var o3 = arguments[i3];
              if (a4) {
                n4.locals[a4.value] = o3;
              }
            }
            n4.meta.caller = arguments[s3.length];
            if (n4.meta.caller) {
              n4.meta.callingCommand = n4.meta.caller.meta.command;
            }
            var p3, h2 = null;
            var v3 = new Promise(function(e4, t4) {
              p3 = e4;
              h2 = t4;
            });
            u3.execute(n4);
            if (n4.meta.returned) {
              return n4.meta.returnValue;
            } else {
              n4.meta.resolve = p3;
              n4.meta.reject = h2;
              return v3;
            }
          };
          n3.hyperfunc = true;
          n3.hypername = i2;
          t3.assignToNamespace(e3, a3, o2, n3);
        } };
        e2.ensureTerminated(u3);
        if (c3) {
          e2.ensureTerminated(c3);
        }
        e2.setParent(u3, m2);
        return m2;
      });
      t2.addFeature("set", function(e2, t3, r3) {
        let n2 = e2.parseElement("setCommand", r3);
        if (n2) {
          if (n2.target.scope !== "element") {
            e2.raiseParseError(r3, "variables declared at the feature level must be element scoped.");
          }
          let i2 = { start: n2, install: function(e3, r4) {
            n2 && n2.execute(t3.makeContext(e3, i2, e3, null));
          } };
          e2.ensureTerminated(n2);
          return i2;
        }
      });
      t2.addFeature("init", function(e2, t3, r3) {
        if (!r3.matchToken("init"))
          return;
        var n2 = r3.matchToken("immediately");
        var i2 = e2.requireElement("commandList", r3);
        var a3 = { start: i2, install: function(e3, r4) {
          let o2 = function() {
            i2 && i2.execute(t3.makeContext(e3, a3, e3, null));
          };
          if (n2) {
            o2();
          } else {
            setTimeout(o2, 0);
          }
        } };
        e2.ensureTerminated(i2);
        e2.setParent(i2, a3);
        return a3;
      });
      t2.addFeature("worker", function(e2, t3, r3) {
        if (r3.matchToken("worker")) {
          e2.raiseParseError(r3, "In order to use the 'worker' feature, include " + "the _hyperscript worker plugin. See " + "https://hyperscript.org/features/worker/ for " + "more info.");
          return;
        }
      });
      t2.addFeature("behavior", function(t3, r3, n2) {
        if (!n2.matchToken("behavior"))
          return;
        var i2 = t3.requireElement("dotOrColonPath", n2).evaluate();
        var a3 = i2.split(".");
        var o2 = a3.pop();
        var s3 = [];
        if (n2.matchOpToken("(") && !n2.matchOpToken(")")) {
          do {
            s3.push(n2.requireTokenType("IDENTIFIER").value);
          } while (n2.matchOpToken(","));
          n2.requireOpToken(")");
        }
        var u3 = t3.requireElement("hyperscript", n2);
        for (var l3 = 0;l3 < u3.features.length; l3++) {
          var c3 = u3.features[l3];
          c3.behavior = i2;
        }
        return { install: function(t4, n3) {
          r3.assignToNamespace(e.document && e.document.body, a3, o2, function(e2, t5, n4) {
            var a4 = r3.getInternalData(e2);
            var o3 = h(a4, i2 + "Scope");
            for (var l4 = 0;l4 < s3.length; l4++) {
              o3[s3[l4]] = n4[s3[l4]];
            }
            u3.apply(e2, t5);
          });
        } };
      });
      t2.addFeature("install", function(t3, r3, n2) {
        if (!n2.matchToken("install"))
          return;
        var i2 = t3.requireElement("dotOrColonPath", n2).evaluate();
        var a3 = i2.split(".");
        var o2 = t3.parseElement("namedArgumentList", n2);
        var s3;
        return s3 = { install: function(t4, n3) {
          r3.unifiedEval({ args: [o2], op: function(r4, o3) {
            var s4 = e;
            for (var u3 = 0;u3 < a3.length; u3++) {
              s4 = s4[a3[u3]];
              if (typeof s4 !== "object" && typeof s4 !== "function")
                throw new Error("No such behavior defined as " + i2);
            }
            if (!(s4 instanceof Function))
              throw new Error(i2 + " is not a behavior");
            s4(t4, n3, o3);
          } }, r3.makeContext(t4, s3, t4, null));
        } };
      });
      t2.addGrammarElement("jsBody", function(e2, t3, r3) {
        var n2 = r3.currentToken().start;
        var i2 = r3.currentToken();
        var a3 = [];
        var o2 = "";
        var s3 = false;
        while (r3.hasMore()) {
          i2 = r3.consumeToken();
          var u3 = r3.token(0, true);
          if (u3.type === "IDENTIFIER" && u3.value === "end") {
            break;
          }
          if (s3) {
            if (i2.type === "IDENTIFIER" || i2.type === "NUMBER") {
              o2 += i2.value;
            } else {
              if (o2 !== "")
                a3.push(o2);
              o2 = "";
              s3 = false;
            }
          } else if (i2.type === "IDENTIFIER" && i2.value === "function") {
            s3 = true;
          }
        }
        var l3 = i2.end + 1;
        return { type: "jsBody", exposedFunctionNames: a3, jsSource: r3.source.substring(n2, l3) };
      });
      t2.addFeature("js", function(t3, r3, n2) {
        if (!n2.matchToken("js"))
          return;
        var i2 = t3.requireElement("jsBody", n2);
        var a3 = i2.jsSource + "\nreturn { " + i2.exposedFunctionNames.map(function(e2) {
          return e2 + ":" + e2;
        }).join(",") + " } ";
        var o2 = new Function(a3);
        return { jsSource: a3, function: o2, exposedFunctionNames: i2.exposedFunctionNames, install: function() {
          Object.assign(e, o2());
        } };
      });
      t2.addCommand("js", function(t3, r3, n2) {
        if (!n2.matchToken("js"))
          return;
        var i2 = [];
        if (n2.matchOpToken("(")) {
          if (n2.matchOpToken(")")) {
          } else {
            do {
              var a3 = n2.requireTokenType("IDENTIFIER");
              i2.push(a3.value);
            } while (n2.matchOpToken(","));
            n2.requireOpToken(")");
          }
        }
        var o2 = t3.requireElement("jsBody", n2);
        n2.matchToken("end");
        var s3 = E(Function, i2.concat([o2.jsSource]));
        var u3 = { jsSource: o2.jsSource, function: s3, inputs: i2, op: function(t4) {
          var n3 = [];
          i2.forEach(function(e2) {
            n3.push(r3.resolveSymbol(e2, t4, "default"));
          });
          var a4 = s3.apply(e, n3);
          if (a4 && typeof a4.then === "function") {
            return new Promise(function(e2) {
              a4.then(function(n4) {
                t4.result = n4;
                e2(r3.findNext(this, t4));
              });
            });
          } else {
            t4.result = a4;
            return r3.findNext(this, t4);
          }
        } };
        return u3;
      });
      t2.addCommand("async", function(e2, t3, r3) {
        if (!r3.matchToken("async"))
          return;
        if (r3.matchToken("do")) {
          var n2 = e2.requireElement("commandList", r3);
          var i2 = n2;
          while (i2.next)
            i2 = i2.next;
          i2.next = t3.HALT;
          r3.requireToken("end");
        } else {
          var n2 = e2.requireElement("command", r3);
        }
        var a3 = { body: n2, op: function(e3) {
          setTimeout(function() {
            n2.execute(e3);
          });
          return t3.findNext(this, e3);
        } };
        e2.setParent(n2, a3);
        return a3;
      });
      t2.addCommand("tell", function(e2, t3, r3) {
        var n2 = r3.currentToken();
        if (!r3.matchToken("tell"))
          return;
        var i2 = e2.requireElement("expression", r3);
        var a3 = e2.requireElement("commandList", r3);
        if (r3.hasMore() && !e2.featureStart(r3.currentToken())) {
          r3.requireToken("end");
        }
        var o2 = "tell_" + n2.start;
        var s3 = { value: i2, body: a3, args: [i2], resolveNext: function(e3) {
          var r4 = e3.meta.iterators[o2];
          if (r4.index < r4.value.length) {
            e3.you = r4.value[r4.index++];
            return a3;
          } else {
            e3.you = r4.originalYou;
            if (this.next) {
              return this.next;
            } else {
              return t3.findNext(this.parent, e3);
            }
          }
        }, op: function(e3, t4) {
          if (t4 == null) {
            t4 = [];
          } else if (!(Array.isArray(t4) || t4 instanceof NodeList)) {
            t4 = [t4];
          }
          e3.meta.iterators[o2] = { originalYou: e3.you, index: 0, value: t4 };
          return this.resolveNext(e3);
        } };
        e2.setParent(a3, s3);
        return s3;
      });
      t2.addCommand("wait", function(e2, t3, r3) {
        if (!r3.matchToken("wait"))
          return;
        var n2;
        if (r3.matchToken("for")) {
          r3.matchToken("a");
          var i2 = [];
          do {
            var a3 = r3.token(0);
            if (a3.type === "NUMBER" || a3.type === "L_PAREN") {
              i2.push({ time: e2.requireElement("expression", r3).evaluate() });
            } else {
              i2.push({ name: e2.requireElement("dotOrColonPath", r3, "Expected event name").evaluate(), args: v2(r3) });
            }
          } while (r3.matchToken("or"));
          if (r3.matchToken("from")) {
            var o2 = e2.requireElement("expression", r3);
          }
          n2 = { event: i2, on: o2, args: [o2], op: function(e3, r4) {
            var n3 = r4 ? r4 : e3.me;
            if (!(n3 instanceof EventTarget))
              throw new Error("Not a valid event target: " + this.on.sourceFor());
            return new Promise((r5) => {
              var a4 = false;
              for (const s4 of i2) {
                var o3 = (n4) => {
                  e3.result = n4;
                  if (s4.args) {
                    for (const t4 of s4.args) {
                      e3.locals[t4.value] = n4[t4.value] || (n4.detail ? n4.detail[t4.value] : null);
                    }
                  }
                  if (!a4) {
                    a4 = true;
                    r5(t3.findNext(this, e3));
                  }
                };
                if (s4.name) {
                  n3.addEventListener(s4.name, o3, { once: true });
                } else if (s4.time != null) {
                  setTimeout(o3, s4.time, s4.time);
                }
              }
            });
          } };
          return n2;
        } else {
          var s3;
          if (r3.matchToken("a")) {
            r3.requireToken("tick");
            s3 = 0;
          } else {
            s3 = e2.requireElement("expression", r3);
          }
          n2 = { type: "waitCmd", time: s3, args: [s3], op: function(e3, r4) {
            return new Promise((n3) => {
              setTimeout(() => {
                n3(t3.findNext(this, e3));
              }, r4);
            });
          }, execute: function(e3) {
            return t3.unifiedExec(this, e3);
          } };
          return n2;
        }
      });
      t2.addGrammarElement("dotOrColonPath", function(e2, t3, r3) {
        var n2 = r3.matchTokenType("IDENTIFIER");
        if (n2) {
          var i2 = [n2.value];
          var a3 = r3.matchOpToken(".") || r3.matchOpToken(":");
          if (a3) {
            do {
              i2.push(r3.requireTokenType("IDENTIFIER", "NUMBER").value);
            } while (r3.matchOpToken(a3.value));
          }
          return { type: "dotOrColonPath", path: i2, evaluate: function() {
            return i2.join(a3 ? a3.value : "");
          } };
        }
      });
      t2.addGrammarElement("eventName", function(e2, t3, r3) {
        var n2;
        if (n2 = r3.matchTokenType("STRING")) {
          return { evaluate: function() {
            return n2.value;
          } };
        }
        return e2.parseElement("dotOrColonPath", r3);
      });
      function d2(e2, t3, r3, n2) {
        var i2 = t3.requireElement("eventName", n2);
        var a3 = t3.parseElement("namedArgumentList", n2);
        if (e2 === "send" && n2.matchToken("to") || e2 === "trigger" && n2.matchToken("on")) {
          var o2 = t3.requireElement("expression", n2);
        } else {
          var o2 = t3.requireElement("implicitMeTarget", n2);
        }
        var s3 = { eventName: i2, details: a3, to: o2, args: [o2, i2, a3], op: function(e3, t4, n3, i3) {
          r3.nullCheck(t4, o2);
          r3.implicitLoop(t4, function(t5) {
            r3.triggerEvent(t5, n3, i3, e3.me);
          });
          return r3.findNext(s3, e3);
        } };
        return s3;
      }
      t2.addCommand("trigger", function(e2, t3, r3) {
        if (r3.matchToken("trigger")) {
          return d2("trigger", e2, t3, r3);
        }
      });
      t2.addCommand("send", function(e2, t3, r3) {
        if (r3.matchToken("send")) {
          return d2("send", e2, t3, r3);
        }
      });
      var T2 = function(e2, t3, r3, n2) {
        if (n2) {
          if (e2.commandBoundary(r3.currentToken())) {
            e2.raiseParseError(r3, "'return' commands must return a value.  If you do not wish to return a value, use 'exit' instead.");
          } else {
            var i2 = e2.requireElement("expression", r3);
          }
        }
        var a3 = { value: i2, args: [i2], op: function(e3, r4) {
          var n3 = e3.meta.resolve;
          e3.meta.returned = true;
          e3.meta.returnValue = r4;
          if (n3) {
            if (r4) {
              n3(r4);
            } else {
              n3();
            }
          }
          return t3.HALT;
        } };
        return a3;
      };
      t2.addCommand("return", function(e2, t3, r3) {
        if (r3.matchToken("return")) {
          return T2(e2, t3, r3, true);
        }
      });
      t2.addCommand("exit", function(e2, t3, r3) {
        if (r3.matchToken("exit")) {
          return T2(e2, t3, r3, false);
        }
      });
      t2.addCommand("halt", function(e2, t3, r3) {
        if (r3.matchToken("halt")) {
          if (r3.matchToken("the")) {
            r3.requireToken("event");
            if (r3.matchOpToken("'")) {
              r3.requireToken("s");
            }
            var n2 = true;
          }
          if (r3.matchToken("bubbling")) {
            var i2 = true;
          } else if (r3.matchToken("default")) {
            var a3 = true;
          }
          var o2 = T2(e2, t3, r3, false);
          var s3 = { keepExecuting: true, bubbling: i2, haltDefault: a3, exit: o2, op: function(e3) {
            if (e3.event) {
              if (i2) {
                e3.event.stopPropagation();
              } else if (a3) {
                e3.event.preventDefault();
              } else {
                e3.event.stopPropagation();
                e3.event.preventDefault();
              }
              if (n2) {
                return t3.findNext(this, e3);
              } else {
                return o2;
              }
            }
          } };
          return s3;
        }
      });
      t2.addCommand("log", function(e2, t3, r3) {
        if (!r3.matchToken("log"))
          return;
        var n2 = [e2.parseElement("expression", r3)];
        while (r3.matchOpToken(",")) {
          n2.push(e2.requireElement("expression", r3));
        }
        if (r3.matchToken("with")) {
          var i2 = e2.requireElement("expression", r3);
        }
        var a3 = { exprs: n2, withExpr: i2, args: [i2, n2], op: function(e3, r4, n3) {
          if (r4) {
            r4.apply(null, n3);
          } else {
            console.log.apply(null, n3);
          }
          return t3.findNext(this, e3);
        } };
        return a3;
      });
      t2.addCommand("beep!", function(e2, t3, r3) {
        if (!r3.matchToken("beep!"))
          return;
        var n2 = [e2.parseElement("expression", r3)];
        while (r3.matchOpToken(",")) {
          n2.push(e2.requireElement("expression", r3));
        }
        var i2 = { exprs: n2, args: [n2], op: function(e3, r4) {
          for (let i3 = 0;i3 < n2.length; i3++) {
            const a3 = n2[i3];
            const o2 = r4[i3];
            t3.beepValueToConsole(e3.me, a3, o2);
          }
          return t3.findNext(this, e3);
        } };
        return i2;
      });
      t2.addCommand("throw", function(e2, t3, r3) {
        if (!r3.matchToken("throw"))
          return;
        var n2 = e2.requireElement("expression", r3);
        var i2 = { expr: n2, args: [n2], op: function(e3, r4) {
          t3.registerHyperTrace(e3, r4);
          throw r4;
        } };
        return i2;
      });
      var y2 = function(e2, t3, r3) {
        var n2 = e2.requireElement("expression", r3);
        var i2 = { expr: n2, args: [n2], op: function(e3, r4) {
          e3.result = r4;
          return t3.findNext(i2, e3);
        } };
        return i2;
      };
      t2.addCommand("call", function(e2, t3, r3) {
        if (!r3.matchToken("call"))
          return;
        var n2 = y2(e2, t3, r3);
        if (n2.expr && n2.expr.type !== "functionCall") {
          e2.raiseParseError(r3, "Must be a function invocation");
        }
        return n2;
      });
      t2.addCommand("get", function(e2, t3, r3) {
        if (r3.matchToken("get")) {
          return y2(e2, t3, r3);
        }
      });
      t2.addCommand("make", function(e2, t3, r3) {
        if (!r3.matchToken("make"))
          return;
        r3.matchToken("a") || r3.matchToken("an");
        var n2 = e2.requireElement("expression", r3);
        var i2 = [];
        if (n2.type !== "queryRef" && r3.matchToken("from")) {
          do {
            i2.push(e2.requireElement("expression", r3));
          } while (r3.matchOpToken(","));
        }
        if (r3.matchToken("called")) {
          var a3 = e2.requireElement("symbol", r3);
        }
        var o2;
        if (n2.type === "queryRef") {
          o2 = { op: function(e3) {
            var r4, i3 = "div", o3, s3 = [];
            var u3 = /(?:(^|#|\.)([^#\. ]+))/g;
            while (r4 = u3.exec(n2.css)) {
              if (r4[1] === "")
                i3 = r4[2].trim();
              else if (r4[1] === "#")
                o3 = r4[2].trim();
              else
                s3.push(r4[2].trim());
            }
            var l3 = document.createElement(i3);
            if (o3 !== undefined)
              l3.id = o3;
            for (var c3 = 0;c3 < s3.length; c3++) {
              var f3 = s3[c3];
              l3.classList.add(f3);
            }
            e3.result = l3;
            if (a3) {
              t3.setSymbol(a3.name, e3, a3.scope, l3);
            }
            return t3.findNext(this, e3);
          } };
          return o2;
        } else {
          o2 = { args: [n2, i2], op: function(e3, r4, n3) {
            e3.result = E(r4, n3);
            if (a3) {
              t3.setSymbol(a3.name, e3, a3.scope, e3.result);
            }
            return t3.findNext(this, e3);
          } };
          return o2;
        }
      });
      t2.addGrammarElement("pseudoCommand", function(e2, t3, r3) {
        let n2 = r3.token(1);
        if (!(n2 && n2.op && (n2.value === "." || n2.value === "("))) {
          return null;
        }
        var i2 = e2.requireElement("primaryExpression", r3);
        var a3 = i2.root;
        var o2 = i2;
        while (a3.root != null) {
          o2 = o2.root;
          a3 = a3.root;
        }
        if (i2.type !== "functionCall") {
          e2.raiseParseError(r3, "Pseudo-commands must be function calls");
        }
        if (o2.type === "functionCall" && o2.root.root == null) {
          if (r3.matchAnyToken("the", "to", "on", "with", "into", "from", "at")) {
            var s3 = e2.requireElement("expression", r3);
          } else if (r3.matchToken("me")) {
            var s3 = e2.requireElement("implicitMeTarget", r3);
          }
        }
        var u3;
        if (s3) {
          u3 = { type: "pseudoCommand", root: s3, argExressions: o2.argExressions, args: [s3, o2.argExressions], op: function(e3, r4, n3) {
            t3.nullCheck(r4, s3);
            var i3 = r4[o2.root.name];
            t3.nullCheck(i3, o2);
            if (i3.hyperfunc) {
              n3.push(e3);
            }
            e3.result = i3.apply(r4, n3);
            return t3.findNext(u3, e3);
          }, execute: function(e3) {
            return t3.unifiedExec(this, e3);
          } };
        } else {
          u3 = { type: "pseudoCommand", expr: i2, args: [i2], op: function(e3, r4) {
            e3.result = r4;
            return t3.findNext(u3, e3);
          }, execute: function(e3) {
            return t3.unifiedExec(this, e3);
          } };
        }
        return u3;
      });
      var k2 = function(e2, t3, r3, n2, i2) {
        var a3 = n2.type === "symbol";
        var o2 = n2.type === "attributeRef";
        var s3 = n2.type === "styleRef";
        var u3 = n2.type === "arrayIndex";
        if (!(o2 || s3 || a3) && n2.root == null) {
          e2.raiseParseError(r3, "Can only put directly into symbols, not references");
        }
        var l3 = null;
        var c3 = null;
        if (a3) {
        } else if (o2 || s3) {
          l3 = e2.requireElement("implicitMeTarget", r3);
          var f3 = n2;
        } else if (u3) {
          c3 = n2.firstIndex;
          l3 = n2.root;
        } else {
          c3 = n2.prop ? n2.prop.value : null;
          var f3 = n2.attribute;
          l3 = n2.root;
        }
        var m2 = { target: n2, symbolWrite: a3, value: i2, args: [l3, c3, i2], op: function(e3, r4, i3, o3) {
          if (a3) {
            t3.setSymbol(n2.name, e3, n2.scope, o3);
          } else {
            t3.nullCheck(r4, l3);
            if (u3) {
              r4[i3] = o3;
            } else {
              t3.implicitLoop(r4, function(e4) {
                if (f3) {
                  if (f3.type === "attributeRef") {
                    if (o3 == null) {
                      e4.removeAttribute(f3.name);
                    } else {
                      e4.setAttribute(f3.name, o3);
                    }
                  } else {
                    e4.style[f3.name] = o3;
                  }
                } else {
                  e4[i3] = o3;
                }
              });
            }
          }
          return t3.findNext(this, e3);
        } };
        return m2;
      };
      t2.addCommand("default", function(e2, t3, r3) {
        if (!r3.matchToken("default"))
          return;
        var n2 = e2.requireElement("assignableExpression", r3);
        r3.requireToken("to");
        var i2 = e2.requireElement("expression", r3);
        var a3 = k2(e2, t3, r3, n2, i2);
        var o2 = { target: n2, value: i2, setter: a3, args: [n2], op: function(e3, r4) {
          if (r4) {
            return t3.findNext(this, e3);
          } else {
            return a3;
          }
        } };
        a3.parent = o2;
        return o2;
      });
      t2.addCommand("set", function(e2, t3, r3) {
        if (!r3.matchToken("set"))
          return;
        if (r3.currentToken().type === "L_BRACE") {
          var n2 = e2.requireElement("objectLiteral", r3);
          r3.requireToken("on");
          var i2 = e2.requireElement("expression", r3);
          var a3 = { objectLiteral: n2, target: i2, args: [n2, i2], op: function(e3, r4, n3) {
            Object.assign(n3, r4);
            return t3.findNext(this, e3);
          } };
          return a3;
        }
        try {
          r3.pushFollow("to");
          var i2 = e2.requireElement("assignableExpression", r3);
        } finally {
          r3.popFollow();
        }
        r3.requireToken("to");
        var o2 = e2.requireElement("expression", r3);
        return k2(e2, t3, r3, i2, o2);
      });
      t2.addCommand("if", function(e2, t3, r3) {
        if (!r3.matchToken("if"))
          return;
        var n2 = e2.requireElement("expression", r3);
        r3.matchToken("then");
        var i2 = e2.parseElement("commandList", r3);
        var a3 = false;
        let o2 = r3.matchToken("else") || r3.matchToken("otherwise");
        if (o2) {
          let t4 = r3.peekToken("if");
          a3 = t4 != null && t4.line === o2.line;
          if (a3) {
            var s3 = e2.parseElement("command", r3);
          } else {
            var s3 = e2.parseElement("commandList", r3);
          }
        }
        if (r3.hasMore() && !a3) {
          r3.requireToken("end");
        }
        var u3 = { expr: n2, trueBranch: i2, falseBranch: s3, args: [n2], op: function(e3, r4) {
          if (r4) {
            return i2;
          } else if (s3) {
            return s3;
          } else {
            return t3.findNext(this, e3);
          }
        } };
        e2.setParent(i2, u3);
        e2.setParent(s3, u3);
        return u3;
      });
      var x2 = function(e2, t3, r3, n2) {
        var i2 = t3.currentToken();
        var a3;
        if (t3.matchToken("for") || n2) {
          var o2 = t3.requireTokenType("IDENTIFIER");
          a3 = o2.value;
          t3.requireToken("in");
          var s3 = e2.requireElement("expression", t3);
        } else if (t3.matchToken("in")) {
          a3 = "it";
          var s3 = e2.requireElement("expression", t3);
        } else if (t3.matchToken("while")) {
          var u3 = e2.requireElement("expression", t3);
        } else if (t3.matchToken("until")) {
          var l3 = true;
          if (t3.matchToken("event")) {
            var c3 = e2.requireElement("dotOrColonPath", t3, "Expected event name");
            if (t3.matchToken("from")) {
              var f3 = e2.requireElement("expression", t3);
            }
          } else {
            var u3 = e2.requireElement("expression", t3);
          }
        } else {
          if (!e2.commandBoundary(t3.currentToken()) && t3.currentToken().value !== "forever") {
            var m2 = e2.requireElement("expression", t3);
            t3.requireToken("times");
          } else {
            t3.matchToken("forever");
            var p3 = true;
          }
        }
        if (t3.matchToken("index")) {
          var o2 = t3.requireTokenType("IDENTIFIER");
          var h2 = o2.value;
        }
        var v3 = e2.parseElement("commandList", t3);
        if (v3 && c3) {
          var d3 = v3;
          while (d3.next) {
            d3 = d3.next;
          }
          var E2 = { type: "waitATick", op: function() {
            return new Promise(function(e3) {
              setTimeout(function() {
                e3(r3.findNext(E2));
              }, 0);
            });
          } };
          d3.next = E2;
        }
        if (t3.hasMore()) {
          t3.requireToken("end");
        }
        if (a3 == null) {
          a3 = "_implicit_repeat_" + i2.start;
          var T3 = a3;
        } else {
          var T3 = a3 + "_" + i2.start;
        }
        var y3 = { identifier: a3, indexIdentifier: h2, slot: T3, expression: s3, forever: p3, times: m2, until: l3, event: c3, on: f3, whileExpr: u3, resolveNext: function() {
          return this;
        }, loop: v3, args: [u3, m2], op: function(e3, t4, n3) {
          var i3 = e3.meta.iterators[T3];
          var o3 = false;
          var s4 = null;
          if (this.forever) {
            o3 = true;
          } else if (this.until) {
            if (c3) {
              o3 = e3.meta.iterators[T3].eventFired === false;
            } else {
              o3 = t4 !== true;
            }
          } else if (u3) {
            o3 = t4;
          } else if (n3) {
            o3 = i3.index < n3;
          } else {
            var l4 = i3.iterator.next();
            o3 = !l4.done;
            s4 = l4.value;
          }
          if (o3) {
            if (i3.value) {
              e3.result = e3.locals[a3] = s4;
            } else {
              e3.result = i3.index;
            }
            if (h2) {
              e3.locals[h2] = i3.index;
            }
            i3.index++;
            return v3;
          } else {
            e3.meta.iterators[T3] = null;
            return r3.findNext(this.parent, e3);
          }
        } };
        e2.setParent(v3, y3);
        var k3 = { name: "repeatInit", args: [s3, c3, f3], op: function(e3, t4, r4, n3) {
          var i3 = { index: 0, value: t4, eventFired: false };
          e3.meta.iterators[T3] = i3;
          if (t4 && t4[Symbol.iterator]) {
            i3.iterator = t4[Symbol.iterator]();
          }
          if (c3) {
            var a4 = n3 || e3.me;
            a4.addEventListener(r4, function(t5) {
              e3.meta.iterators[T3].eventFired = true;
            }, { once: true });
          }
          return y3;
        }, execute: function(e3) {
          return r3.unifiedExec(this, e3);
        } };
        e2.setParent(y3, k3);
        return k3;
      };
      t2.addCommand("repeat", function(e2, t3, r3) {
        if (r3.matchToken("repeat")) {
          return x2(e2, r3, t3, false);
        }
      });
      t2.addCommand("for", function(e2, t3, r3) {
        if (r3.matchToken("for")) {
          return x2(e2, r3, t3, true);
        }
      });
      t2.addCommand("continue", function(e2, t3, r3) {
        if (!r3.matchToken("continue"))
          return;
        var n2 = { op: function(t4) {
          for (var n3 = this.parent;; n3 = n3.parent) {
            if (n3 == undefined) {
              e2.raiseParseError(r3, "Command `continue` cannot be used outside of a `repeat` loop.");
            }
            if (n3.loop != null) {
              return n3.resolveNext(t4);
            }
          }
        } };
        return n2;
      });
      t2.addCommand("break", function(e2, t3, r3) {
        if (!r3.matchToken("break"))
          return;
        var n2 = { op: function(n3) {
          for (var i2 = this.parent;; i2 = i2.parent) {
            if (i2 == undefined) {
              e2.raiseParseError(r3, "Command `continue` cannot be used outside of a `repeat` loop.");
            }
            if (i2.loop != null) {
              return t3.findNext(i2.parent, n3);
            }
          }
        } };
        return n2;
      });
      t2.addGrammarElement("stringLike", function(e2, t3, r3) {
        return e2.parseAnyOf(["string", "nakedString"], r3);
      });
      t2.addCommand("append", function(e2, t3, r3) {
        if (!r3.matchToken("append"))
          return;
        var n2 = null;
        var i2 = e2.requireElement("expression", r3);
        var a3 = { type: "symbol", evaluate: function(e3) {
          return t3.resolveSymbol("result", e3);
        } };
        if (r3.matchToken("to")) {
          n2 = e2.requireElement("expression", r3);
        } else {
          n2 = a3;
        }
        var o2 = null;
        if (n2.type === "symbol" || n2.type === "attributeRef" || n2.root != null) {
          o2 = k2(e2, t3, r3, n2, a3);
        }
        var s3 = { value: i2, target: n2, args: [n2, i2], op: function(e3, r4, n3) {
          if (Array.isArray(r4)) {
            r4.push(n3);
            return t3.findNext(this, e3);
          } else if (r4 instanceof Element) {
            r4.innerHTML += n3;
            return t3.findNext(this, e3);
          } else if (o2) {
            e3.result = (r4 || "") + n3;
            return o2;
          } else {
            throw Error("Unable to append a value!");
          }
        }, execute: function(e3) {
          return t3.unifiedExec(this, e3);
        } };
        if (o2 != null) {
          o2.parent = s3;
        }
        return s3;
      });
      function g2(e2, t3, r3) {
        r3.matchToken("at") || r3.matchToken("from");
        const n2 = { includeStart: true, includeEnd: false };
        n2.from = r3.matchToken("start") ? 0 : e2.requireElement("expression", r3);
        if (r3.matchToken("to") || r3.matchOpToken("..")) {
          if (r3.matchToken("end")) {
            n2.toEnd = true;
          } else {
            n2.to = e2.requireElement("expression", r3);
          }
        }
        if (r3.matchToken("inclusive"))
          n2.includeEnd = true;
        else if (r3.matchToken("exclusive"))
          n2.includeStart = false;
        return n2;
      }

      class b2 {
        constructor(e2, t3) {
          this.re = e2;
          this.str = t3;
        }
        next() {
          const e2 = this.re.exec(this.str);
          if (e2 === null)
            return { done: true };
          else
            return { value: e2 };
        }
      }

      class w2 {
        constructor(e2, t3, r3) {
          this.re = e2;
          this.flags = t3;
          this.str = r3;
        }
        [Symbol.iterator]() {
          return new b2(new RegExp(this.re, this.flags), this.str);
        }
      }
      t2.addCommand("pick", (e2, t3, r3) => {
        if (!r3.matchToken("pick"))
          return;
        r3.matchToken("the");
        if (r3.matchToken("item") || r3.matchToken("items") || r3.matchToken("character") || r3.matchToken("characters")) {
          const n2 = g2(e2, t3, r3);
          r3.requireToken("from");
          const i2 = e2.requireElement("expression", r3);
          return { args: [i2, n2.from, n2.to], op(e3, r4, i3, a3) {
            if (n2.toEnd)
              a3 = r4.length;
            if (!n2.includeStart)
              i3++;
            if (n2.includeEnd)
              a3++;
            if (a3 == null || a3 == undefined)
              a3 = i3 + 1;
            e3.result = r4.slice(i3, a3);
            return t3.findNext(this, e3);
          } };
        }
        if (r3.matchToken("match")) {
          r3.matchToken("of");
          const n2 = e2.parseElement("expression", r3);
          let i2 = "";
          if (r3.matchOpToken("|")) {
            i2 = r3.requireToken("identifier").value;
          }
          r3.requireToken("from");
          const a3 = e2.parseElement("expression", r3);
          return { args: [a3, n2], op(e3, r4, n3) {
            e3.result = new RegExp(n3, i2).exec(r4);
            return t3.findNext(this, e3);
          } };
        }
        if (r3.matchToken("matches")) {
          r3.matchToken("of");
          const n2 = e2.parseElement("expression", r3);
          let i2 = "gu";
          if (r3.matchOpToken("|")) {
            i2 = "g" + r3.requireToken("identifier").value.replace("g", "");
          }
          console.log("flags", i2);
          r3.requireToken("from");
          const a3 = e2.parseElement("expression", r3);
          return { args: [a3, n2], op(e3, r4, n3) {
            e3.result = new w2(n3, i2, r4);
            return t3.findNext(this, e3);
          } };
        }
      });
      t2.addCommand("increment", function(e2, t3, r3) {
        if (!r3.matchToken("increment"))
          return;
        var n2;
        var i2 = e2.parseElement("assignableExpression", r3);
        if (r3.matchToken("by")) {
          n2 = e2.requireElement("expression", r3);
        }
        var a3 = { type: "implicitIncrementOp", target: i2, args: [i2, n2], op: function(e3, t4, r4) {
          t4 = t4 ? parseFloat(t4) : 0;
          r4 = n2 ? parseFloat(r4) : 1;
          var i3 = t4 + r4;
          e3.result = i3;
          return i3;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return k2(e2, t3, r3, i2, a3);
      });
      t2.addCommand("decrement", function(e2, t3, r3) {
        if (!r3.matchToken("decrement"))
          return;
        var n2;
        var i2 = e2.parseElement("assignableExpression", r3);
        if (r3.matchToken("by")) {
          n2 = e2.requireElement("expression", r3);
        }
        var a3 = { type: "implicitDecrementOp", target: i2, args: [i2, n2], op: function(e3, t4, r4) {
          t4 = t4 ? parseFloat(t4) : 0;
          r4 = n2 ? parseFloat(r4) : 1;
          var i3 = t4 - r4;
          e3.result = i3;
          return i3;
        }, evaluate: function(e3) {
          return t3.unifiedEval(this, e3);
        } };
        return k2(e2, t3, r3, i2, a3);
      });
      function S2(e2, t3) {
        var r3 = "text";
        var n2;
        e2.matchToken("a") || e2.matchToken("an");
        if (e2.matchToken("json") || e2.matchToken("Object")) {
          r3 = "json";
        } else if (e2.matchToken("response")) {
          r3 = "response";
        } else if (e2.matchToken("html")) {
          r3 = "html";
        } else if (e2.matchToken("text")) {
        } else {
          n2 = t3.requireElement("dotOrColonPath", e2).evaluate();
        }
        return { type: r3, conversion: n2 };
      }
      t2.addCommand("fetch", function(e2, t3, r3) {
        if (!r3.matchToken("fetch"))
          return;
        var n2 = e2.requireElement("stringLike", r3);
        if (r3.matchToken("as")) {
          var i2 = S2(r3, e2);
        }
        if (r3.matchToken("with") && r3.currentToken().value !== "{") {
          var a3 = e2.parseElement("nakedNamedArgumentList", r3);
        } else {
          var a3 = e2.parseElement("objectLiteral", r3);
        }
        if (i2 == null && r3.matchToken("as")) {
          i2 = S2(r3, e2);
        }
        var o2 = i2 ? i2.type : "text";
        var s3 = i2 ? i2.conversion : null;
        var u3 = { url: n2, argExpressions: a3, args: [n2, a3], op: function(e3, r4, n3) {
          var i3 = n3 || {};
          i3["sender"] = e3.me;
          i3["headers"] = i3["headers"] || {};
          var a4 = new AbortController;
          let l3 = e3.me.addEventListener("fetch:abort", function() {
            a4.abort();
          }, { once: true });
          i3["signal"] = a4.signal;
          t3.triggerEvent(e3.me, "hyperscript:beforeFetch", i3);
          t3.triggerEvent(e3.me, "fetch:beforeRequest", i3);
          n3 = i3;
          var c3 = false;
          if (n3.timeout) {
            setTimeout(function() {
              if (!c3) {
                a4.abort();
              }
            }, n3.timeout);
          }
          return fetch(r4, n3).then(function(r5) {
            let n4 = { response: r5 };
            t3.triggerEvent(e3.me, "fetch:afterResponse", n4);
            r5 = n4.response;
            if (o2 === "response") {
              e3.result = r5;
              t3.triggerEvent(e3.me, "fetch:afterRequest", { result: r5 });
              c3 = true;
              return t3.findNext(u3, e3);
            }
            if (o2 === "json") {
              return r5.json().then(function(r6) {
                e3.result = r6;
                t3.triggerEvent(e3.me, "fetch:afterRequest", { result: r6 });
                c3 = true;
                return t3.findNext(u3, e3);
              });
            }
            return r5.text().then(function(r6) {
              if (s3)
                r6 = t3.convertValue(r6, s3);
              if (o2 === "html")
                r6 = t3.convertValue(r6, "Fragment");
              e3.result = r6;
              t3.triggerEvent(e3.me, "fetch:afterRequest", { result: r6 });
              c3 = true;
              return t3.findNext(u3, e3);
            });
          }).catch(function(r5) {
            t3.triggerEvent(e3.me, "fetch:error", { reason: r5 });
            throw r5;
          }).finally(function() {
            e3.me.removeEventListener("fetch:abort", l3);
          });
        } };
        return u3;
      });
    }
    function y(e2) {
      e2.addCommand("settle", function(e3, t3, r2) {
        if (r2.matchToken("settle")) {
          if (!e3.commandBoundary(r2.currentToken())) {
            var n3 = e3.requireElement("expression", r2);
          } else {
            var n3 = e3.requireElement("implicitMeTarget", r2);
          }
          var i3 = { type: "settleCmd", args: [n3], op: function(e4, r3) {
            t3.nullCheck(r3, n3);
            var a3 = null;
            var o3 = false;
            var s2 = false;
            var u2 = new Promise(function(e5) {
              a3 = e5;
            });
            r3.addEventListener("transitionstart", function() {
              s2 = true;
            }, { once: true });
            setTimeout(function() {
              if (!s2 && !o3) {
                a3(t3.findNext(i3, e4));
              }
            }, 500);
            r3.addEventListener("transitionend", function() {
              if (!o3) {
                a3(t3.findNext(i3, e4));
              }
            }, { once: true });
            return u2;
          }, execute: function(e4) {
            return t3.unifiedExec(this, e4);
          } };
          return i3;
        }
      });
      e2.addCommand("add", function(e3, t3, r2) {
        if (r2.matchToken("add")) {
          var n3 = e3.parseElement("classRef", r2);
          var i3 = null;
          var a3 = null;
          if (n3 == null) {
            i3 = e3.parseElement("attributeRef", r2);
            if (i3 == null) {
              a3 = e3.parseElement("styleLiteral", r2);
              if (a3 == null) {
                e3.raiseParseError(r2, "Expected either a class reference or attribute expression");
              }
            }
          } else {
            var o3 = [n3];
            while (n3 = e3.parseElement("classRef", r2)) {
              o3.push(n3);
            }
          }
          if (r2.matchToken("to")) {
            var s2 = e3.requireElement("expression", r2);
          } else {
            var s2 = e3.requireElement("implicitMeTarget", r2);
          }
          if (r2.matchToken("when")) {
            if (a3) {
              e3.raiseParseError(r2, "Only class and properties are supported with a when clause");
            }
            var u2 = e3.requireElement("expression", r2);
          }
          if (o3) {
            return { classRefs: o3, to: s2, args: [s2, o3], op: function(e4, r3, n4) {
              t3.nullCheck(r3, s2);
              t3.forEach(n4, function(n5) {
                t3.implicitLoop(r3, function(r4) {
                  if (u2) {
                    e4.result = r4;
                    let i4 = t3.evaluateNoPromise(u2, e4);
                    if (i4) {
                      if (r4 instanceof Element)
                        r4.classList.add(n5.className);
                    } else {
                      if (r4 instanceof Element)
                        r4.classList.remove(n5.className);
                    }
                    e4.result = null;
                  } else {
                    if (r4 instanceof Element)
                      r4.classList.add(n5.className);
                  }
                });
              });
              return t3.findNext(this, e4);
            } };
          } else if (i3) {
            return { type: "addCmd", attributeRef: i3, to: s2, args: [s2], op: function(e4, r3, n4) {
              t3.nullCheck(r3, s2);
              t3.implicitLoop(r3, function(r4) {
                if (u2) {
                  e4.result = r4;
                  let n5 = t3.evaluateNoPromise(u2, e4);
                  if (n5) {
                    r4.setAttribute(i3.name, i3.value);
                  } else {
                    r4.removeAttribute(i3.name);
                  }
                  e4.result = null;
                } else {
                  r4.setAttribute(i3.name, i3.value);
                }
              });
              return t3.findNext(this, e4);
            }, execute: function(e4) {
              return t3.unifiedExec(this, e4);
            } };
          } else {
            return { type: "addCmd", cssDeclaration: a3, to: s2, args: [s2, a3], op: function(e4, r3, n4) {
              t3.nullCheck(r3, s2);
              t3.implicitLoop(r3, function(e5) {
                e5.style.cssText += n4;
              });
              return t3.findNext(this, e4);
            }, execute: function(e4) {
              return t3.unifiedExec(this, e4);
            } };
          }
        }
      });
      e2.addGrammarElement("styleLiteral", function(e3, t3, r2) {
        if (!r2.matchOpToken("{"))
          return;
        var n3 = [""];
        var i3 = [];
        while (r2.hasMore()) {
          if (r2.matchOpToken("\\")) {
            r2.consumeToken();
          } else if (r2.matchOpToken("}")) {
            break;
          } else if (r2.matchToken("$")) {
            var a3 = r2.matchOpToken("{");
            var o3 = e3.parseElement("expression", r2);
            if (a3)
              r2.requireOpToken("}");
            i3.push(o3);
            n3.push("");
          } else {
            var s2 = r2.consumeToken();
            n3[n3.length - 1] += r2.source.substring(s2.start, s2.end);
          }
          n3[n3.length - 1] += r2.lastWhitespace();
        }
        return { type: "styleLiteral", args: [i3], op: function(e4, t4) {
          var r3 = "";
          n3.forEach(function(e5, n4) {
            r3 += e5;
            if (n4 in t4)
              r3 += t4[n4];
          });
          return r3;
        }, evaluate: function(e4) {
          return t3.unifiedEval(this, e4);
        } };
      });
      e2.addCommand("remove", function(e3, t3, r2) {
        if (r2.matchToken("remove")) {
          var n3 = e3.parseElement("classRef", r2);
          var i3 = null;
          var a3 = null;
          if (n3 == null) {
            i3 = e3.parseElement("attributeRef", r2);
            if (i3 == null) {
              a3 = e3.parseElement("expression", r2);
              if (a3 == null) {
                e3.raiseParseError(r2, "Expected either a class reference, attribute expression or value expression");
              }
            }
          } else {
            var o3 = [n3];
            while (n3 = e3.parseElement("classRef", r2)) {
              o3.push(n3);
            }
          }
          if (r2.matchToken("from")) {
            var s2 = e3.requireElement("expression", r2);
          } else {
            if (a3 == null) {
              var s2 = e3.requireElement("implicitMeTarget", r2);
            }
          }
          if (a3) {
            return { elementExpr: a3, from: s2, args: [a3, s2], op: function(e4, r3, n4) {
              t3.nullCheck(r3, a3);
              t3.implicitLoop(r3, function(e5) {
                if (e5.parentElement && (n4 == null || n4.contains(e5))) {
                  e5.parentElement.removeChild(e5);
                }
              });
              return t3.findNext(this, e4);
            } };
          } else {
            return { classRefs: o3, attributeRef: i3, elementExpr: a3, from: s2, args: [o3, s2], op: function(e4, r3, n4) {
              t3.nullCheck(n4, s2);
              if (r3) {
                t3.forEach(r3, function(e5) {
                  t3.implicitLoop(n4, function(t4) {
                    t4.classList.remove(e5.className);
                  });
                });
              } else {
                t3.implicitLoop(n4, function(e5) {
                  e5.removeAttribute(i3.name);
                });
              }
              return t3.findNext(this, e4);
            } };
          }
        }
      });
      e2.addCommand("toggle", function(e3, t3, r2) {
        if (r2.matchToken("toggle")) {
          r2.matchAnyToken("the", "my");
          if (r2.currentToken().type === "STYLE_REF") {
            let t4 = r2.consumeToken();
            var n3 = t4.value.substr(1);
            var a3 = true;
            var o3 = i2(e3, r2, n3);
            if (r2.matchToken("of")) {
              r2.pushFollow("with");
              try {
                var s2 = e3.requireElement("expression", r2);
              } finally {
                r2.popFollow();
              }
            } else {
              var s2 = e3.requireElement("implicitMeTarget", r2);
            }
          } else if (r2.matchToken("between")) {
            var u2 = true;
            var l2 = e3.parseElement("classRef", r2);
            r2.requireToken("and");
            var c2 = e3.requireElement("classRef", r2);
          } else {
            var l2 = e3.parseElement("classRef", r2);
            var f2 = null;
            if (l2 == null) {
              f2 = e3.parseElement("attributeRef", r2);
              if (f2 == null) {
                e3.raiseParseError(r2, "Expected either a class reference or attribute expression");
              }
            } else {
              var m2 = [l2];
              while (l2 = e3.parseElement("classRef", r2)) {
                m2.push(l2);
              }
            }
          }
          if (a3 !== true) {
            if (r2.matchToken("on")) {
              var s2 = e3.requireElement("expression", r2);
            } else {
              var s2 = e3.requireElement("implicitMeTarget", r2);
            }
          }
          if (r2.matchToken("for")) {
            var p2 = e3.requireElement("expression", r2);
          } else if (r2.matchToken("until")) {
            var h2 = e3.requireElement("dotOrColonPath", r2, "Expected event name");
            if (r2.matchToken("from")) {
              var v2 = e3.requireElement("expression", r2);
            }
          }
          var d2 = { classRef: l2, classRef2: c2, classRefs: m2, attributeRef: f2, on: s2, time: p2, evt: h2, from: v2, toggle: function(e4, r3, n4, i3) {
            t3.nullCheck(e4, s2);
            if (a3) {
              t3.implicitLoop(e4, function(e5) {
                o3("toggle", e5);
              });
            } else if (u2) {
              t3.implicitLoop(e4, function(e5) {
                if (e5.classList.contains(r3.className)) {
                  e5.classList.remove(r3.className);
                  e5.classList.add(n4.className);
                } else {
                  e5.classList.add(r3.className);
                  e5.classList.remove(n4.className);
                }
              });
            } else if (i3) {
              t3.forEach(i3, function(r4) {
                t3.implicitLoop(e4, function(e5) {
                  e5.classList.toggle(r4.className);
                });
              });
            } else {
              t3.forEach(e4, function(e5) {
                if (e5.hasAttribute(f2.name)) {
                  e5.removeAttribute(f2.name);
                } else {
                  e5.setAttribute(f2.name, f2.value);
                }
              });
            }
          }, args: [s2, p2, h2, v2, l2, c2, m2], op: function(e4, r3, n4, i3, a4, o4, s3, u3) {
            if (n4) {
              return new Promise(function(i4) {
                d2.toggle(r3, o4, s3, u3);
                setTimeout(function() {
                  d2.toggle(r3, o4, s3, u3);
                  i4(t3.findNext(d2, e4));
                }, n4);
              });
            } else if (i3) {
              return new Promise(function(n5) {
                var l3 = a4 || e4.me;
                l3.addEventListener(i3, function() {
                  d2.toggle(r3, o4, s3, u3);
                  n5(t3.findNext(d2, e4));
                }, { once: true });
                d2.toggle(r3, o4, s3, u3);
              });
            } else {
              this.toggle(r3, o4, s3, u3);
              return t3.findNext(d2, e4);
            }
          } };
          return d2;
        }
      });
      var t2 = { display: function(r2, n3, i3) {
        if (i3) {
          n3.style.display = i3;
        } else if (r2 === "toggle") {
          if (getComputedStyle(n3).display === "none") {
            t2.display("show", n3, i3);
          } else {
            t2.display("hide", n3, i3);
          }
        } else if (r2 === "hide") {
          const t3 = e2.runtime.getInternalData(n3);
          if (t3.originalDisplay == null) {
            t3.originalDisplay = n3.style.display;
          }
          n3.style.display = "none";
        } else {
          const t3 = e2.runtime.getInternalData(n3);
          if (t3.originalDisplay && t3.originalDisplay !== "none") {
            n3.style.display = t3.originalDisplay;
          } else {
            n3.style.removeProperty("display");
          }
        }
      }, visibility: function(e3, r2, n3) {
        if (n3) {
          r2.style.visibility = n3;
        } else if (e3 === "toggle") {
          if (getComputedStyle(r2).visibility === "hidden") {
            t2.visibility("show", r2, n3);
          } else {
            t2.visibility("hide", r2, n3);
          }
        } else if (e3 === "hide") {
          r2.style.visibility = "hidden";
        } else {
          r2.style.visibility = "visible";
        }
      }, opacity: function(e3, r2, n3) {
        if (n3) {
          r2.style.opacity = n3;
        } else if (e3 === "toggle") {
          if (getComputedStyle(r2).opacity === "0") {
            t2.opacity("show", r2, n3);
          } else {
            t2.opacity("hide", r2, n3);
          }
        } else if (e3 === "hide") {
          r2.style.opacity = "0";
        } else {
          r2.style.opacity = "1";
        }
      } };
      var n2 = function(e3, t3, r2) {
        var n3;
        var i3 = r2.currentToken();
        if (i3.value === "when" || i3.value === "with" || e3.commandBoundary(i3)) {
          n3 = e3.parseElement("implicitMeTarget", r2);
        } else {
          n3 = e3.parseElement("expression", r2);
        }
        return n3;
      };
      var i2 = function(e3, n3, i3) {
        var a3 = r.defaultHideShowStrategy;
        var o3 = t2;
        if (r.hideShowStrategies) {
          o3 = Object.assign(o3, r.hideShowStrategies);
        }
        i3 = i3 || a3 || "display";
        var s2 = o3[i3];
        if (s2 == null) {
          e3.raiseParseError(n3, "Unknown show/hide strategy : " + i3);
        }
        return s2;
      };
      e2.addCommand("hide", function(e3, t3, r2) {
        if (r2.matchToken("hide")) {
          var a3 = n2(e3, t3, r2);
          var o3 = null;
          if (r2.matchToken("with")) {
            o3 = r2.requireTokenType("IDENTIFIER", "STYLE_REF").value;
            if (o3.indexOf("*") === 0) {
              o3 = o3.substr(1);
            }
          }
          var s2 = i2(e3, r2, o3);
          return { target: a3, args: [a3], op: function(e4, r3) {
            t3.nullCheck(r3, a3);
            t3.implicitLoop(r3, function(e5) {
              s2("hide", e5);
            });
            return t3.findNext(this, e4);
          } };
        }
      });
      e2.addCommand("show", function(e3, t3, r2) {
        if (r2.matchToken("show")) {
          var a3 = n2(e3, t3, r2);
          var o3 = null;
          if (r2.matchToken("with")) {
            o3 = r2.requireTokenType("IDENTIFIER", "STYLE_REF").value;
            if (o3.indexOf("*") === 0) {
              o3 = o3.substr(1);
            }
          }
          var s2 = null;
          if (r2.matchOpToken(":")) {
            var u2 = r2.consumeUntilWhitespace();
            r2.matchTokenType("WHITESPACE");
            s2 = u2.map(function(e4) {
              return e4.value;
            }).join("");
          }
          if (r2.matchToken("when")) {
            var l2 = e3.requireElement("expression", r2);
          }
          var c2 = i2(e3, r2, o3);
          return { target: a3, when: l2, args: [a3], op: function(e4, r3) {
            t3.nullCheck(r3, a3);
            t3.implicitLoop(r3, function(r4) {
              if (l2) {
                e4.result = r4;
                let n3 = t3.evaluateNoPromise(l2, e4);
                if (n3) {
                  c2("show", r4, s2);
                } else {
                  c2("hide", r4);
                }
                e4.result = null;
              } else {
                c2("show", r4, s2);
              }
            });
            return t3.findNext(this, e4);
          } };
        }
      });
      e2.addCommand("take", function(e3, t3, r2) {
        if (r2.matchToken("take")) {
          let u2 = null;
          let l2 = [];
          while (u2 = e3.parseElement("classRef", r2)) {
            l2.push(u2);
          }
          var n3 = null;
          var i3 = null;
          let c2 = l2.length > 0;
          if (!c2) {
            n3 = e3.parseElement("attributeRef", r2);
            if (n3 == null) {
              e3.raiseParseError(r2, "Expected either a class reference or attribute expression");
            }
            if (r2.matchToken("with")) {
              i3 = e3.requireElement("expression", r2);
            }
          }
          if (r2.matchToken("from")) {
            var a3 = e3.requireElement("expression", r2);
          }
          if (r2.matchToken("for")) {
            var o3 = e3.requireElement("expression", r2);
          } else {
            var o3 = e3.requireElement("implicitMeTarget", r2);
          }
          if (c2) {
            var s2 = { classRefs: l2, from: a3, forElt: o3, args: [l2, a3, o3], op: function(e4, r3, n4, i4) {
              t3.nullCheck(i4, o3);
              t3.implicitLoop(r3, function(e5) {
                var r4 = e5.className;
                if (n4) {
                  t3.implicitLoop(n4, function(e6) {
                    e6.classList.remove(r4);
                  });
                } else {
                  t3.implicitLoop(e5, function(e6) {
                    e6.classList.remove(r4);
                  });
                }
                t3.implicitLoop(i4, function(e6) {
                  e6.classList.add(r4);
                });
              });
              return t3.findNext(this, e4);
            } };
            return s2;
          } else {
            var s2 = { attributeRef: n3, from: a3, forElt: o3, args: [a3, o3, i3], op: function(e4, r3, i4, s3) {
              t3.nullCheck(r3, a3);
              t3.nullCheck(i4, o3);
              t3.implicitLoop(r3, function(e5) {
                if (!s3) {
                  e5.removeAttribute(n3.name);
                } else {
                  e5.setAttribute(n3.name, s3);
                }
              });
              t3.implicitLoop(i4, function(e5) {
                e5.setAttribute(n3.name, n3.value || "");
              });
              return t3.findNext(this, e4);
            } };
            return s2;
          }
        }
      });
      function a2(t3, r2, n3, i3) {
        if (n3 != null) {
          var a3 = t3.resolveSymbol(n3, r2);
        } else {
          var a3 = r2;
        }
        if (a3 instanceof Element || a3 instanceof HTMLDocument) {
          while (a3.firstChild)
            a3.removeChild(a3.firstChild);
          a3.append(e2.runtime.convertValue(i3, "Fragment"));
          t3.processNode(a3);
        } else {
          if (n3 != null) {
            t3.setSymbol(n3, r2, null, i3);
          } else {
            throw "Don't know how to put a value into " + typeof r2;
          }
        }
      }
      e2.addCommand("put", function(e3, t3, r2) {
        if (r2.matchToken("put")) {
          var n3 = e3.requireElement("expression", r2);
          var i3 = r2.matchAnyToken("into", "before", "after");
          if (i3 == null && r2.matchToken("at")) {
            r2.matchToken("the");
            i3 = r2.matchAnyToken("start", "end");
            r2.requireToken("of");
          }
          if (i3 == null) {
            e3.raiseParseError(r2, "Expected one of 'into', 'before', 'at start of', 'at end of', 'after'");
          }
          var o3 = e3.requireElement("expression", r2);
          var s2 = i3.value;
          var u2 = false;
          var l2 = false;
          var c2 = null;
          var f2 = null;
          if (o3.type === "arrayIndex" && s2 === "into") {
            u2 = true;
            f2 = o3.prop;
            c2 = o3.root;
          } else if (o3.prop && o3.root && s2 === "into") {
            f2 = o3.prop.value;
            c2 = o3.root;
          } else if (o3.type === "symbol" && s2 === "into") {
            l2 = true;
            f2 = o3.name;
          } else if (o3.type === "attributeRef" && s2 === "into") {
            var m2 = true;
            f2 = o3.name;
            c2 = e3.requireElement("implicitMeTarget", r2);
          } else if (o3.type === "styleRef" && s2 === "into") {
            var p2 = true;
            f2 = o3.name;
            c2 = e3.requireElement("implicitMeTarget", r2);
          } else if (o3.attribute && s2 === "into") {
            var m2 = o3.attribute.type === "attributeRef";
            var p2 = o3.attribute.type === "styleRef";
            f2 = o3.attribute.name;
            c2 = o3.root;
          } else {
            c2 = o3;
          }
          var h2 = { target: o3, operation: s2, symbolWrite: l2, value: n3, args: [c2, f2, n3], op: function(e4, r3, n4, i4) {
            if (l2) {
              a2(t3, e4, n4, i4);
            } else {
              t3.nullCheck(r3, c2);
              if (s2 === "into") {
                if (m2) {
                  t3.implicitLoop(r3, function(e5) {
                    e5.setAttribute(n4, i4);
                  });
                } else if (p2) {
                  t3.implicitLoop(r3, function(e5) {
                    e5.style[n4] = i4;
                  });
                } else if (u2) {
                  r3[n4] = i4;
                } else {
                  t3.implicitLoop(r3, function(e5) {
                    a2(t3, e5, n4, i4);
                  });
                }
              } else {
                var o4 = s2 === "before" ? Element.prototype.before : s2 === "after" ? Element.prototype.after : s2 === "start" ? Element.prototype.prepend : s2 === "end" ? Element.prototype.append : Element.prototype.append;
                t3.implicitLoop(r3, function(e5) {
                  o4.call(e5, i4 instanceof Node ? i4 : t3.convertValue(i4, "Fragment"));
                  if (e5.parentElement) {
                    t3.processNode(e5.parentElement);
                  } else {
                    t3.processNode(e5);
                  }
                });
              }
            }
            return t3.findNext(this, e4);
          } };
          return h2;
        }
      });
      function o2(e3, t3, r2) {
        var n3;
        if (r2.matchToken("the") || r2.matchToken("element") || r2.matchToken("elements") || r2.currentToken().type === "CLASS_REF" || r2.currentToken().type === "ID_REF" || r2.currentToken().op && r2.currentToken().value === "<") {
          e3.possessivesDisabled = true;
          try {
            n3 = e3.parseElement("expression", r2);
          } finally {
            delete e3.possessivesDisabled;
          }
          if (r2.matchOpToken("'")) {
            r2.requireToken("s");
          }
        } else if (r2.currentToken().type === "IDENTIFIER" && r2.currentToken().value === "its") {
          var i3 = r2.matchToken("its");
          n3 = { type: "pseudopossessiveIts", token: i3, name: i3.value, evaluate: function(e4) {
            return t3.resolveSymbol("it", e4);
          } };
        } else {
          r2.matchToken("my") || r2.matchToken("me");
          n3 = e3.parseElement("implicitMeTarget", r2);
        }
        return n3;
      }
      e2.addCommand("transition", function(e3, t3, n3) {
        if (n3.matchToken("transition")) {
          var i3 = o2(e3, t3, n3);
          var a3 = [];
          var s2 = [];
          var u2 = [];
          var l2 = n3.currentToken();
          while (!e3.commandBoundary(l2) && l2.value !== "over" && l2.value !== "using") {
            if (n3.currentToken().type === "STYLE_REF") {
              let e4 = n3.consumeToken();
              let t4 = e4.value.substr(1);
              a3.push({ type: "styleRefValue", evaluate: function() {
                return t4;
              } });
            } else {
              a3.push(e3.requireElement("stringLike", n3));
            }
            if (n3.matchToken("from")) {
              s2.push(e3.requireElement("expression", n3));
            } else {
              s2.push(null);
            }
            n3.requireToken("to");
            if (n3.matchToken("initial")) {
              u2.push({ type: "initial_literal", evaluate: function() {
                return "initial";
              } });
            } else {
              u2.push(e3.requireElement("expression", n3));
            }
            l2 = n3.currentToken();
          }
          if (n3.matchToken("over")) {
            var c2 = e3.requireElement("expression", n3);
          } else if (n3.matchToken("using")) {
            var f2 = e3.requireElement("expression", n3);
          }
          var m2 = { to: u2, args: [i3, a3, s2, u2, f2, c2], op: function(e4, n4, a4, o3, s3, u3, l3) {
            t3.nullCheck(n4, i3);
            var c3 = [];
            t3.implicitLoop(n4, function(e5) {
              var n5 = new Promise(function(n6, i4) {
                var c4 = e5.style.transition;
                if (l3) {
                  e5.style.transition = "all " + l3 + "ms ease-in";
                } else if (u3) {
                  e5.style.transition = u3;
                } else {
                  e5.style.transition = r.defaultTransition;
                }
                var f3 = t3.getInternalData(e5);
                var m3 = getComputedStyle(e5);
                var p2 = {};
                for (var h2 = 0;h2 < m3.length; h2++) {
                  var v2 = m3[h2];
                  var d2 = m3[v2];
                  p2[v2] = d2;
                }
                if (!f3.initialStyles) {
                  f3.initialStyles = p2;
                }
                for (var h2 = 0;h2 < a4.length; h2++) {
                  var E2 = a4[h2];
                  var T2 = o3[h2];
                  if (T2 === "computed" || T2 == null) {
                    e5.style[E2] = p2[E2];
                  } else {
                    e5.style[E2] = T2;
                  }
                }
                var y2 = false;
                var k2 = false;
                e5.addEventListener("transitionend", function() {
                  if (!k2) {
                    e5.style.transition = c4;
                    k2 = true;
                    n6();
                  }
                }, { once: true });
                e5.addEventListener("transitionstart", function() {
                  y2 = true;
                }, { once: true });
                setTimeout(function() {
                  if (!k2 && !y2) {
                    e5.style.transition = c4;
                    k2 = true;
                    n6();
                  }
                }, 100);
                setTimeout(function() {
                  var t4 = [];
                  for (var r2 = 0;r2 < a4.length; r2++) {
                    var n7 = a4[r2];
                    var i5 = s3[r2];
                    if (i5 === "initial") {
                      var o4 = f3.initialStyles[n7];
                      e5.style[n7] = o4;
                    } else {
                      e5.style[n7] = i5;
                    }
                  }
                }, 0);
              });
              c3.push(n5);
            });
            return Promise.all(c3).then(function() {
              return t3.findNext(m2, e4);
            });
          } };
          return m2;
        }
      });
      e2.addCommand("measure", function(e3, t3, r2) {
        if (!r2.matchToken("measure"))
          return;
        var n3 = o2(e3, t3, r2);
        var i3 = [];
        if (!e3.commandBoundary(r2.currentToken()))
          do {
            i3.push(r2.matchTokenType("IDENTIFIER").value);
          } while (r2.matchOpToken(","));
        return { properties: i3, args: [n3], op: function(e4, r3) {
          t3.nullCheck(r3, n3);
          if (0 in r3)
            r3 = r3[0];
          var a3 = r3.getBoundingClientRect();
          var o3 = { top: r3.scrollTop, left: r3.scrollLeft, topMax: r3.scrollTopMax, leftMax: r3.scrollLeftMax, height: r3.scrollHeight, width: r3.scrollWidth };
          e4.result = { x: a3.x, y: a3.y, left: a3.left, top: a3.top, right: a3.right, bottom: a3.bottom, width: a3.width, height: a3.height, bounds: a3, scrollLeft: o3.left, scrollTop: o3.top, scrollLeftMax: o3.leftMax, scrollTopMax: o3.topMax, scrollWidth: o3.width, scrollHeight: o3.height, scroll: o3 };
          t3.forEach(i3, function(t4) {
            if (t4 in e4.result)
              e4.locals[t4] = e4.result[t4];
            else
              throw "No such measurement as " + t4;
          });
          return t3.findNext(this, e4);
        } };
      });
      e2.addLeafExpression("closestExpr", function(e3, t3, r2) {
        if (r2.matchToken("closest")) {
          if (r2.matchToken("parent")) {
            var n3 = true;
          }
          var i3 = null;
          if (r2.currentToken().type === "ATTRIBUTE_REF") {
            var a3 = e3.requireElement("attributeRefAccess", r2, null);
            i3 = "[" + a3.attribute.name + "]";
          }
          if (i3 == null) {
            var o3 = e3.requireElement("expression", r2);
            if (o3.css == null) {
              e3.raiseParseError(r2, "Expected a CSS expression");
            } else {
              i3 = o3.css;
            }
          }
          if (r2.matchToken("to")) {
            var s2 = e3.parseElement("expression", r2);
          } else {
            var s2 = e3.parseElement("implicitMeTarget", r2);
          }
          var u2 = { type: "closestExpr", parentSearch: n3, expr: o3, css: i3, to: s2, args: [s2], op: function(e4, r3) {
            if (r3 == null) {
              return null;
            } else {
              let e5 = [];
              t3.implicitLoop(r3, function(t4) {
                if (n3) {
                  e5.push(t4.parentElement ? t4.parentElement.closest(i3) : null);
                } else {
                  e5.push(t4.closest(i3));
                }
              });
              if (t3.shouldAutoIterate(r3)) {
                return e5;
              } else {
                return e5[0];
              }
            }
          }, evaluate: function(e4) {
            return t3.unifiedEval(this, e4);
          } };
          if (a3) {
            a3.root = u2;
            a3.args = [u2];
            return a3;
          } else {
            return u2;
          }
        }
      });
      e2.addCommand("go", function(e3, t3, r2) {
        if (r2.matchToken("go")) {
          if (r2.matchToken("back")) {
            var n3 = true;
          } else {
            r2.matchToken("to");
            if (r2.matchToken("url")) {
              var i3 = e3.requireElement("stringLike", r2);
              var a3 = true;
              if (r2.matchToken("in")) {
                r2.requireToken("new");
                r2.requireToken("window");
                var o3 = true;
              }
            } else {
              r2.matchToken("the");
              var s2 = r2.matchAnyToken("top", "middle", "bottom");
              var u2 = r2.matchAnyToken("left", "center", "right");
              if (s2 || u2) {
                r2.requireToken("of");
              }
              var i3 = e3.requireElement("unaryExpression", r2);
              var l2 = r2.matchAnyOpToken("+", "-");
              if (l2) {
                r2.pushFollow("px");
                try {
                  var c2 = e3.requireElement("expression", r2);
                } finally {
                  r2.popFollow();
                }
              }
              r2.matchToken("px");
              var f2 = r2.matchAnyToken("smoothly", "instantly");
              var m2 = { block: "start", inline: "nearest" };
              if (s2) {
                if (s2.value === "top") {
                  m2.block = "start";
                } else if (s2.value === "bottom") {
                  m2.block = "end";
                } else if (s2.value === "middle") {
                  m2.block = "center";
                }
              }
              if (u2) {
                if (u2.value === "left") {
                  m2.inline = "start";
                } else if (u2.value === "center") {
                  m2.inline = "center";
                } else if (u2.value === "right") {
                  m2.inline = "end";
                }
              }
              if (f2) {
                if (f2.value === "smoothly") {
                  m2.behavior = "smooth";
                } else if (f2.value === "instantly") {
                  m2.behavior = "instant";
                }
              }
            }
          }
          var p2 = { target: i3, args: [i3, c2], op: function(e4, r3, i4) {
            if (n3) {
              window.history.back();
            } else if (a3) {
              if (r3) {
                if (o3) {
                  window.open(r3);
                } else {
                  window.location.href = r3;
                }
              }
            } else {
              t3.implicitLoop(r3, function(e5) {
                if (e5 === window) {
                  e5 = document.body;
                }
                if (l2) {
                  let t4 = e5.getBoundingClientRect();
                  let r4 = document.createElement("div");
                  let n4 = l2.value === "+" ? i4 : i4 * -1;
                  let a4 = m2.inline == "start" || m2.inline == "end" ? n4 : 0;
                  let o4 = m2.block == "start" || m2.block == "end" ? n4 : 0;
                  r4.style.position = "absolute";
                  r4.style.top = t4.top + window.scrollY + o4 + "px";
                  r4.style.left = t4.left + window.scrollX + a4 + "px";
                  r4.style.height = t4.height + "px";
                  r4.style.width = t4.width + "px";
                  r4.style.zIndex = "" + Number.MIN_SAFE_INTEGER;
                  r4.style.opacity = "0";
                  document.body.appendChild(r4);
                  setTimeout(function() {
                    document.body.removeChild(r4);
                  }, 100);
                  e5 = r4;
                }
                e5.scrollIntoView(m2);
              });
            }
            return t3.findNext(p2, e4);
          } };
          return p2;
        }
      });
      r.conversions.dynamicResolvers.push(function(t3, r2) {
        if (!(t3 === "Values" || t3.indexOf("Values:") === 0)) {
          return;
        }
        var n3 = t3.split(":")[1];
        var i3 = {};
        var a3 = e2.runtime.implicitLoop.bind(e2.runtime);
        a3(r2, function(e3) {
          var t4 = s2(e3);
          if (t4 !== undefined) {
            i3[t4.name] = t4.value;
            return;
          }
          if (e3.querySelectorAll != null) {
            var r3 = e3.querySelectorAll("input,select,textarea");
            r3.forEach(o3);
          }
        });
        if (n3) {
          if (n3 === "JSON") {
            return JSON.stringify(i3);
          } else if (n3 === "Form") {
            return new URLSearchParams(i3).toString();
          } else {
            throw "Unknown conversion: " + n3;
          }
        } else {
          return i3;
        }
        function o3(e3) {
          var t4 = s2(e3);
          if (t4 == undefined) {
            return;
          }
          if (i3[t4.name] == undefined) {
            i3[t4.name] = t4.value;
            return;
          }
          if (Array.isArray(i3[t4.name]) && Array.isArray(t4.value)) {
            i3[t4.name] = [].concat(i3[t4.name], t4.value);
            return;
          }
        }
        function s2(e3) {
          try {
            var t4 = { name: e3.name, value: e3.value };
            if (t4.name == undefined || t4.value == undefined) {
              return;
            }
            if (e3.type == "radio" && e3.checked == false) {
              return;
            }
            if (e3.type == "checkbox") {
              if (e3.checked == false) {
                t4.value = undefined;
              } else if (typeof t4.value === "string") {
                t4.value = [t4.value];
              }
            }
            if (e3.type == "select-multiple") {
              var r3 = e3.querySelectorAll("option[selected]");
              t4.value = [];
              for (var n4 = 0;n4 < r3.length; n4++) {
                t4.value.push(r3[n4].value);
              }
            }
            return t4;
          } catch (e4) {
            return;
          }
        }
      });
      r.conversions["HTML"] = function(e3) {
        var t3 = function(e4) {
          if (e4 instanceof Array) {
            return e4.map(function(e5) {
              return t3(e5);
            }).join("");
          }
          if (e4 instanceof HTMLElement) {
            return e4.outerHTML;
          }
          if (e4 instanceof NodeList) {
            var r2 = "";
            for (var n3 = 0;n3 < e4.length; n3++) {
              var i3 = e4[n3];
              if (i3 instanceof HTMLElement) {
                r2 += i3.outerHTML;
              }
            }
            return r2;
          }
          if (e4.toString) {
            return e4.toString();
          }
          return "";
        };
        return t3(e3);
      };
      r.conversions["Fragment"] = function(t3) {
        var r2 = document.createDocumentFragment();
        e2.runtime.implicitLoop(t3, function(e3) {
          if (e3 instanceof Node)
            r2.append(e3);
          else {
            var t4 = document.createElement("template");
            t4.innerHTML = e3;
            r2.append(t4.content);
          }
        });
        return r2;
      };
    }
    const k = new o, x = k.lexer, g = k.parser;
    function b(e2, t2) {
      return k.evaluate(e2, t2);
    }
    function w() {
      var t2 = Array.from(e.document.querySelectorAll("script[type='text/hyperscript'][src]"));
      Promise.all(t2.map(function(e2) {
        return fetch(e2.src).then(function(e3) {
          return e3.text();
        });
      })).then((e2) => e2.forEach((e3) => S(e3))).then(() => n2(function() {
        a2();
        k.processNode(document.documentElement);
        e.document.addEventListener("htmx:load", function(e2) {
          k.processNode(e2.detail.elt);
        });
      }));
      function n2(e2) {
        if (document.readyState !== "loading") {
          setTimeout(e2);
        } else {
          document.addEventListener("DOMContentLoaded", e2);
        }
      }
      function i2() {
        var e2 = document.querySelector('meta[name="htmx-config"]');
        if (e2) {
          return v(e2.content);
        } else {
          return null;
        }
      }
      function a2() {
        var e2 = i2();
        if (e2) {
          Object.assign(r, e2);
        }
      }
    }
    const S = Object.assign(b, { config: r, use(e2) {
      e2(S);
    }, internals: { lexer: x, parser: g, runtime: k, Lexer: n, Tokens: i, Parser: a, Runtime: o }, ElementCollection: m, addFeature: g.addFeature.bind(g), addCommand: g.addCommand.bind(g), addLeafExpression: g.addLeafExpression.bind(g), addIndirectExpression: g.addIndirectExpression.bind(g), evaluate: k.evaluate.bind(k), parse: k.parse.bind(k), processNode: k.processNode.bind(k), version: "0.9.12", browserInit: w });
    return S;
  });
});

// node_modules/alpinejs/dist/module.esm.js
var scheduler = function(callback) {
  queueJob(callback);
};
var queueJob = function(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
};
var dequeueJob = function(job) {
  let index = queue.indexOf(job);
  if (index !== -1 && index > lastFlushedIndex)
    queue.splice(index, 1);
};
var queueFlush = function() {
  if (!flushing && !flushPending) {
    flushPending = true;
    queueMicrotask(flushJobs);
  }
};
var flushJobs = function() {
  flushPending = false;
  flushing = true;
  for (let i = 0;i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
};
var disableEffectScheduling = function(callback) {
  shouldSchedule = false;
  callback();
  shouldSchedule = true;
};
var setReactivityEngine = function(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = (callback) => engine.effect(callback, { scheduler: (task) => {
    if (shouldSchedule) {
      scheduler(task);
    } else {
      task();
    }
  } });
  raw = engine.raw;
};
var overrideEffect = function(override) {
  effect = override;
};
var elementBoundEffect = function(el) {
  let cleanup2 = () => {
  };
  let wrappedEffect = (callback) => {
    let effectReference = effect(callback);
    if (!el._x_effects) {
      el._x_effects = new Set;
      el._x_runEffects = () => {
        el._x_effects.forEach((i) => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup2 = () => {
      if (effectReference === undefined)
        return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup2();
  }];
};
var watch = function(getter, callback) {
  let firstTime = true;
  let oldValue;
  let effectReference = effect(() => {
    let value = getter();
    JSON.stringify(value);
    if (!firstTime) {
      queueMicrotask(() => {
        callback(value, oldValue);
        oldValue = value;
      });
    } else {
      oldValue = value;
    }
    firstTime = false;
  });
  return () => release(effectReference);
};
var onElAdded = function(callback) {
  onElAddeds.push(callback);
};
var onElRemoved = function(el, callback) {
  if (typeof callback === "function") {
    if (!el._x_cleanups)
      el._x_cleanups = [];
    el._x_cleanups.push(callback);
  } else {
    callback = el;
    onElRemoveds.push(callback);
  }
};
var onAttributesAdded = function(callback) {
  onAttributeAddeds.push(callback);
};
var onAttributeRemoved = function(el, name, callback) {
  if (!el._x_attributeCleanups)
    el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name])
    el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback);
};
var cleanupAttributes = function(el, names) {
  if (!el._x_attributeCleanups)
    return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === undefined || names.includes(name)) {
      value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    }
  });
};
var cleanupElement = function(el) {
  if (el._x_cleanups) {
    while (el._x_cleanups.length)
      el._x_cleanups.pop()();
  }
};
var startObservingMutations = function() {
  observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
  currentlyObserving = true;
};
var stopObservingMutations = function() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
};
var flushObserver = function() {
  let records = observer.takeRecords();
  queuedMutations.push(() => records.length > 0 && onMutate(records));
  let queueLengthWhenTriggered = queuedMutations.length;
  queueMicrotask(() => {
    if (queuedMutations.length === queueLengthWhenTriggered) {
      while (queuedMutations.length > 0)
        queuedMutations.shift()();
    }
  });
};
var mutateDom = function(callback) {
  if (!currentlyObserving)
    return callback();
  stopObservingMutations();
  let result = callback();
  startObservingMutations();
  return result;
};
var deferMutations = function() {
  isCollecting = true;
};
var flushAndStopDeferringMutations = function() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
};
var onMutate = function(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = new Set;
  let removedNodes = new Set;
  let addedAttributes = new Map;
  let removedAttributes = new Map;
  for (let i = 0;i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver)
      continue;
    if (mutations[i].type === "childList") {
      mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.add(node));
      mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.add(node));
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add2 = () => {
        if (!addedAttributes.has(el))
          addedAttributes.set(el, []);
        addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
      };
      let remove = () => {
        if (!removedAttributes.has(el))
          removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add2();
      } else if (el.hasAttribute(name)) {
        remove();
        add2();
      } else {
        remove();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach((i) => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.has(node))
      continue;
    onElRemoveds.forEach((i) => i(node));
  }
  addedNodes.forEach((node) => {
    node._x_ignoreSelf = true;
    node._x_ignore = true;
  });
  for (let node of addedNodes) {
    if (removedNodes.has(node))
      continue;
    if (!node.isConnected)
      continue;
    delete node._x_ignoreSelf;
    delete node._x_ignore;
    onElAddeds.forEach((i) => i(node));
    node._x_ignore = true;
    node._x_ignoreSelf = true;
  }
  addedNodes.forEach((node) => {
    delete node._x_ignoreSelf;
    delete node._x_ignore;
  });
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
};
var scope = function(node) {
  return mergeProxies(closestDataStack(node));
};
var addScopeToNode = function(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
  };
};
var closestDataStack = function(node) {
  if (node._x_dataStack)
    return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
};
var mergeProxies = function(objects) {
  return new Proxy({ objects }, mergeProxyTrap);
};
var collapseProxies = function() {
  let keys = Reflect.ownKeys(this);
  return keys.reduce((acc, key) => {
    acc[key] = Reflect.get(this, key);
    return acc;
  }, {});
};
var initInterceptors = function(data2) {
  let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
      if (enumerable === false || value === undefined)
        return;
      if (typeof value === "object" && value !== null && value.__v_skip)
        return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject2(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
};
var interceptor = function(callback, mutateObj = () => {
}) {
  let obj = {
    initialValue: undefined,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return (initialValue) => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
};
var get = function(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
};
var set = function(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");
  if (path.length === 1)
    obj[path[0]] = value;
  else if (path.length === 0)
    throw error;
  else {
    if (obj[path[0]])
      return set(obj[path[0]], path.slice(1), value);
    else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
};
var magic = function(name, callback) {
  magics[name] = callback;
};
var injectMagics = function(obj, el) {
  Object.entries(magics).forEach(([name, callback]) => {
    let memoizedUtilities = null;
    function getUtilities() {
      if (memoizedUtilities) {
        return memoizedUtilities;
      } else {
        let [utilities, cleanup2] = getElementBoundUtilities(el);
        memoizedUtilities = { interceptor, ...utilities };
        onElRemoved(el, cleanup2);
        return memoizedUtilities;
      }
    }
    Object.defineProperty(obj, `\$${name}`, {
      get() {
        return callback(el, getUtilities());
      },
      enumerable: false
    });
  });
  return obj;
};
var tryCatch = function(el, expression, callback, ...args) {
  try {
    return callback(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
};
var handleError = function(error2, el, expression = undefined) {
  error2 = Object.assign(error2 ?? { message: "No error message given." }, { el, expression });
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
};
var dontAutoEvaluateFunctions = function(callback) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  let result = callback();
  shouldAutoEvaluateFunctions = cache;
  return result;
};
var evaluate = function(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)((value) => result = value, extras);
  return result;
};
var evaluateLater = function(...args) {
  return theEvaluatorFunction(...args);
};
var setEvaluator = function(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
};
var normalEvaluator = function(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
};
var generateEvaluatorFromFunction = function(dataStack, func) {
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
};
var generateFunctionFromString = function(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      let func2 = new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
      Object.defineProperty(func2, "name", {
        value: `[Alpine] ${expression}`
      });
      return func2;
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
};
var generateEvaluatorFromString = function(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    func.result = undefined;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = undefined;
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = undefined);
      }
    }
  };
};
var runIfTypeOfFunction = function(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then((i) => receiver(i));
  } else {
    receiver(value);
  }
};
var prefix = function(subject = "") {
  return prefixAsString + subject;
};
var setPrefix = function(newPrefix) {
  prefixAsString = newPrefix;
};
var directive = function(name, callback) {
  directiveHandlers[name] = callback;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
};
var directiveExists = function(name) {
  return Object.keys(directiveHandlers).includes(name);
};
var directives = function(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map((directive2) => {
    return getDirectiveHandler(el, directive2);
  });
};
var attributesOnly = function(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
};
var deferHandlingDirectives = function(callback) {
  isDeferringHandlers = true;
  let key = Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length)
      directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback(flushHandlers);
  stopDeferring();
};
var getElementBoundUtilities = function(el) {
  let cleanups = [];
  let cleanup2 = (callback) => cleanups.push(callback);
  let [effect3, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect3,
    cleanup: cleanup2,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach((i) => i());
  return [utilities, doCleanup];
};
var getDirectiveHandler = function(el, directive2) {
  let noop = () => {
  };
  let handler4 = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup2);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf)
      return;
    handler4.inline && handler4.inline(el, directive2, utilities);
    handler4 = handler4.bind(handler4, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
  };
  fullHandler.runCleanups = cleanup2;
  return fullHandler;
};
var toTransformedAttributes = function(callback = () => {
}) {
  return ({ name, value }) => {
    let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, { name, value });
    if (newName !== name)
      callback(newName, name);
    return { name: newName, value: newValue };
  };
};
var mapAttributes = function(callback) {
  attributeTransformers.push(callback);
};
var outNonAlpineAttributes = function({ name }) {
  return alpineAttributeRegex().test(name);
};
var toParsedDirectives = function(transformedAttributeMap, originalAttributeOverride) {
  return ({ name, value }) => {
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map((i) => i.replace(".", "")),
      expression: value,
      original
    };
  };
};
var byPriority = function(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
};
var dispatch = function(el, name, detail = {}) {
  el.dispatchEvent(new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true,
    cancelable: true
  }));
};
var walk = function(el, callback) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach((el2) => walk(el2, callback));
    return;
  }
  let skip = false;
  callback(el, () => skip = true);
  if (skip)
    return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback, false);
    node = node.nextElementSibling;
  }
};
var warn = function(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
};
var start = function() {
  if (started)
    warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
  started = true;
  if (!document.body)
    warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded((el) => initTree(el, walk));
  onElRemoved((el) => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach((handle) => handle());
  });
  let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
  setTimeout(() => {
    warnAboutMissingPlugins();
  });
};
var rootSelectors = function() {
  return rootSelectorCallbacks.map((fn) => fn());
};
var allSelectors = function() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
};
var addRootSelector = function(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
};
var addInitSelector = function(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
};
var closestRoot = function(el, includeInitSelectors = false) {
  return findClosest(el, (element) => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some((selector) => element.matches(selector)))
      return true;
  });
};
var findClosest = function(el, callback) {
  if (!el)
    return;
  if (callback(el))
    return el;
  if (el._x_teleportBack)
    el = el._x_teleportBack;
  if (!el.parentElement)
    return;
  return findClosest(el.parentElement, callback);
};
var isRoot = function(el) {
  return rootSelectors().some((selector) => el.matches(selector));
};
var interceptInit = function(callback) {
  initInterceptors2.push(callback);
};
var initTree = function(el, walker = walk, intercept = () => {
}) {
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      intercept(el2, skip);
      initInterceptors2.forEach((i) => i(el2, skip));
      directives(el2, el2.attributes).forEach((handle) => handle());
      el2._x_ignore && skip();
    });
  });
};
var destroyTree = function(root, walker = walk) {
  walker(root, (el) => {
    cleanupAttributes(el);
    cleanupElement(el);
  });
};
var warnAboutMissingPlugins = function() {
  let pluginDirectives = [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ];
  pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
    if (directiveExists(directive2))
      return;
    selectors.some((selector) => {
      if (document.querySelector(selector)) {
        warn(`found "${selector}", but missing ${plugin2} plugin`);
        return true;
      }
    });
  });
};
var nextTick = function(callback = () => {
}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise((res) => {
    tickStack.push(() => {
      callback();
      res();
    });
  });
};
var releaseNextTicks = function() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
};
var holdNextTicks = function() {
  isHolding = true;
};
var setClasses = function(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
};
var setClassesFromString = function(el, classString) {
  let split = (classString2) => classString2.split(" ").filter(Boolean);
  let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = (classes) => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
};
var setClassesFromObject = function(el, classObject) {
  let split = (classString) => classString.split(" ").filter(Boolean);
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach((i) => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach((i) => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach((i) => el.classList.add(i));
    added.forEach((i) => el.classList.remove(i));
  };
};
var setStyles = function(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
};
var setStylesFromObject = function(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
};
var setStylesFromString = function(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
};
var kebabCase = function(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
var once = function(callback, fallback = () => {
}) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      callback.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
};
var registerTransitionsFromClassString = function(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    enter: (classes) => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": (classes) => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": (classes) => {
      el._x_transition.enter.end = classes;
    },
    leave: (classes) => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": (classes) => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": (classes) => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
};
var registerTransitionsFromHelper = function(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
  let delay = modifierValue(modifiers, "delay", 0) / 1000;
  let origin = modifierValue(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue(modifiers, "duration", 150) / 1000;
  let durationOut = modifierValue(modifiers, "duration", 75) / 1000;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: `${delay}s`,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: `${delay}s`,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
};
var registerTransitionObject = function(el, setFunction, defaultValue = {}) {
  if (!el._x_transition)
    el._x_transition = {
      enter: { during: defaultValue, start: defaultValue, end: defaultValue },
      leave: { during: defaultValue, start: defaultValue, end: defaultValue },
      in(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, before, after);
      },
      out(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, before, after);
      }
    };
};
var closestHide = function(el) {
  let parent = el.parentNode;
  if (!parent)
    return;
  return parent._x_hidePromise ? parent : closestHide(parent);
};
var transition = function(el, setFunction, { during, start: start2, end } = {}, before = () => {
}, after = () => {
}) {
  if (el._x_transitioning)
    el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
};
var performTransition = function(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore)
        stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected)
        stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback) {
      this.beforeCancels.push(callback);
    },
    cancel: once(function() {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted)
      return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1000;
    let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1000;
    if (duration === 0)
      duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1000;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay);
      reachedEnd = true;
    });
  });
};
var modifierValue = function(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "scale") {
    if (isNaN(rawValue))
      return fallback;
  }
  if (key === "duration" || key === "delay") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
};
var skipDuringClone = function(callback, fallback = () => {
}) {
  return (...args) => isCloning ? fallback(...args) : callback(...args);
};
var onlyDuringClone = function(callback) {
  return (...args) => isCloning && callback(...args);
};
var interceptClone = function(callback) {
  interceptors.push(callback);
};
var cloneNode = function(from, to) {
  interceptors.forEach((i) => i(from, to));
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    initTree(to, (el, callback) => {
      callback(el, () => {
      });
    });
  });
  isCloning = false;
};
var clone = function(oldEl, newEl) {
  if (!newEl._x_dataStack)
    newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  isCloningLegacy = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
  isCloningLegacy = false;
};
var cloneTree = function(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3))
        return skip();
      hasRunThroughFirstEl = true;
      callback(el3, skip);
    });
  };
  initTree(el, shallowWalker);
};
var dontRegisterReactiveSideEffects = function(callback) {
  let cache = effect;
  overrideEffect((callback2, el) => {
    let storedEffect = cache(callback2);
    release(storedEffect);
    return () => {
    };
  });
  callback();
  overrideEffect(cache);
};
var bind = function(el, name, value, modifiers = []) {
  if (!el._x_bindings)
    el._x_bindings = reactive({});
  el._x_bindings[name] = value;
  name = modifiers.includes("camel") ? camelCase(name) : name;
  switch (name) {
    case "value":
      bindInputValue(el, value);
      break;
    case "style":
      bindStyles(el, value);
      break;
    case "class":
      bindClasses(el, value);
      break;
    case "selected":
    case "checked":
      bindAttributeAndProperty(el, name, value);
      break;
    default:
      bindAttribute(el, name, value);
      break;
  }
};
var bindInputValue = function(el, value) {
  if (el.type === "radio") {
    if (el.attributes.value === undefined) {
      el.value = value;
    }
    if (window.fromModel) {
      if (typeof value === "boolean") {
        el.checked = safeParseBoolean(el.value) === value;
      } else {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    }
  } else if (el.type === "checkbox") {
    if (Number.isInteger(value)) {
      el.value = value;
    } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, undefined].includes(value)) {
      el.value = String(value);
    } else {
      if (Array.isArray(value)) {
        el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
      } else {
        el.checked = !!value;
      }
    }
  } else if (el.tagName === "SELECT") {
    updateSelect(el, value);
  } else {
    if (el.value === value)
      return;
    el.value = value === undefined ? "" : value;
  }
};
var bindClasses = function(el, value) {
  if (el._x_undoAddedClasses)
    el._x_undoAddedClasses();
  el._x_undoAddedClasses = setClasses(el, value);
};
var bindStyles = function(el, value) {
  if (el._x_undoAddedStyles)
    el._x_undoAddedStyles();
  el._x_undoAddedStyles = setStyles(el, value);
};
var bindAttributeAndProperty = function(el, name, value) {
  bindAttribute(el, name, value);
  setPropertyIfChanged(el, name, value);
};
var bindAttribute = function(el, name, value) {
  if ([null, undefined, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
    el.removeAttribute(name);
  } else {
    if (isBooleanAttr(name))
      value = name;
    setIfChanged(el, name, value);
  }
};
var setIfChanged = function(el, attrName, value) {
  if (el.getAttribute(attrName) != value) {
    el.setAttribute(attrName, value);
  }
};
var setPropertyIfChanged = function(el, propName, value) {
  if (el[propName] !== value) {
    el[propName] = value;
  }
};
var updateSelect = function(el, value) {
  const arrayWrappedValue = [].concat(value).map((value2) => {
    return value2 + "";
  });
  Array.from(el.options).forEach((option) => {
    option.selected = arrayWrappedValue.includes(option.value);
  });
};
var camelCase = function(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
};
var checkedAttrLooseCompare = function(valueA, valueB) {
  return valueA == valueB;
};
var safeParseBoolean = function(rawValue) {
  if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
    return true;
  }
  if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
    return false;
  }
  return rawValue ? Boolean(rawValue) : null;
};
var isBooleanAttr = function(attrName) {
  const booleanAttributes = [
    "disabled",
    "checked",
    "required",
    "readonly",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ];
  return booleanAttributes.includes(attrName);
};
var attributeShouldntBePreservedIfFalsy = function(name) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
};
var getBinding = function(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== undefined)
    return el._x_bindings[name];
  return getAttributeBinding(el, name, fallback);
};
var extractProp = function(el, name, fallback, extract = true) {
  if (el._x_bindings && el._x_bindings[name] !== undefined)
    return el._x_bindings[name];
  if (el._x_inlineBindings && el._x_inlineBindings[name] !== undefined) {
    let binding = el._x_inlineBindings[name];
    binding.extract = extract;
    return dontAutoEvaluateFunctions(() => {
      return evaluate(el, binding.expression);
    });
  }
  return getAttributeBinding(el, name, fallback);
};
var getAttributeBinding = function(el, name, fallback) {
  let attr = el.getAttribute(name);
  if (attr === null)
    return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "")
    return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
};
var debounce = function(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
var throttle = function(func, limit) {
  let inThrottle;
  return function() {
    let context = this, args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
var entangle = function({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
  let firstRun = true;
  let outerHash;
  let innerHash;
  let reference = effect(() => {
    let outer = outerGet();
    let inner = innerGet();
    if (firstRun) {
      innerSet(cloneIfObject(outer));
      firstRun = false;
    } else {
      let outerHashLatest = JSON.stringify(outer);
      let innerHashLatest = JSON.stringify(inner);
      if (outerHashLatest !== outerHash) {
        innerSet(cloneIfObject(outer));
      } else if (outerHashLatest !== innerHashLatest) {
        outerSet(cloneIfObject(inner));
      } else {
      }
    }
    outerHash = JSON.stringify(outerGet());
    innerHash = JSON.stringify(innerGet());
  });
  return () => {
    release(reference);
  };
};
var cloneIfObject = function(value) {
  return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
};
var plugin = function(callback) {
  let callbacks = Array.isArray(callback) ? callback : [callback];
  callbacks.forEach((i) => i(alpine_default));
};
var store = function(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === undefined) {
    return stores[name];
  }
  stores[name] = value;
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
  initInterceptors(stores[name]);
};
var getStores = function() {
  return stores;
};
var bind2 = function(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    return applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
  return () => {
  };
};
var injectBindingProviders = function(obj) {
  Object.entries(binds).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback(...args);
        };
      }
    });
  });
  return obj;
};
var applyBindingsObject = function(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length)
    cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map((attribute) => {
    if (staticAttributes.find((attr) => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map((handle) => {
    cleanupRunners.push(handle.runCleanups);
    handle();
  });
  return () => {
    while (cleanupRunners.length)
      cleanupRunners.pop()();
  };
};
var data = function(name, callback) {
  datas[name] = callback;
};
var injectDataProviders = function(obj, context) {
  Object.entries(datas).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback.bind(context)(...args);
        };
      },
      enumerable: false
    });
  });
  return obj;
};
var makeMap = function(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0;i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
};
var isEffect = function(fn) {
  return fn && fn._isEffect === true;
};
var effect2 = function(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }
  const effect3 = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect3();
  }
  return effect3;
};
var stop = function(effect3) {
  if (effect3.active) {
    cleanup(effect3);
    if (effect3.options.onStop) {
      effect3.options.onStop();
    }
    effect3.active = false;
  }
};
var createReactiveEffect = function(fn, options) {
  const effect3 = function reactiveEffect() {
    if (!effect3.active) {
      return fn();
    }
    if (!effectStack.includes(effect3)) {
      cleanup(effect3);
      try {
        enableTracking();
        effectStack.push(effect3);
        activeEffect = effect3;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect3.id = uid++;
  effect3.allowRecurse = !!options.allowRecurse;
  effect3._isEffect = true;
  effect3.active = true;
  effect3.raw = fn;
  effect3.deps = [];
  effect3.options = options;
  return effect3;
};
var cleanup = function(effect3) {
  const { deps } = effect3;
  if (deps.length) {
    for (let i = 0;i < deps.length; i++) {
      deps[i].delete(effect3);
    }
    deps.length = 0;
  }
};
var pauseTracking = function() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
};
var enableTracking = function() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
};
var resetTracking = function() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
};
var track = function(target, type, key) {
  if (!shouldTrack || activeEffect === undefined) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = new Set);
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
};
var trigger = function(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = new Set;
  const add2 = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect3) => {
        if (effect3 !== activeEffect || effect3.allowRecurse) {
          effects.add(effect3);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== undefined) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = (effect3) => {
    if (effect3.options.onTrigger) {
      effect3.options.onTrigger({
        effect: effect3,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }
    if (effect3.options.scheduler) {
      effect3.options.scheduler(effect3);
    } else {
      effect3();
    }
  };
  effects.forEach(run);
};
var createArrayInstrumentations = function() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length;i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
};
var createGetter = function(isReadonly = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive2(res);
    }
    return res;
  };
};
var createSetter = function(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
};
var deleteProperty = function(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, undefined, oldValue);
  }
  return result;
};
var has = function(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
};
var ownKeys = function(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
};
var get$1 = function(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get", key);
  }
  !isReadonly && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
};
var has$1 = function(key, isReadonly = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has", key);
  }
  !isReadonly && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
};
var size = function(target, isReadonly = false) {
  target = target["__v_raw"];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
};
var add = function(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
};
var set$1 = function(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
};
var deleteEntry = function(key) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3 ? get3.call(target, key) : undefined;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, undefined, oldValue);
  }
  return result;
};
var clear = function() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", undefined, undefined, oldTarget);
  }
  return result;
};
var createForEach = function(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
};
var createIterableMethod = function(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
};
var createReadonlyMethod = function(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
};
var createInstrumentations = function() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
};
var createInstrumentationGetter = function(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
};
var checkIdentityKeys = function(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
};
var targetTypeMap = function(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
};
var getTargetType = function(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
};
var reactive2 = function(target) {
  if (target && target["__v_isReadonly"]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
};
var readonly = function(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
};
var createReactiveObject = function(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
};
var toRaw = function(observed) {
  return observed && toRaw(observed["__v_raw"]) || observed;
};
var isRef = function(r) {
  return Boolean(r && r.__v_isRef === true);
};
var getArrayOfRefObject = function(el) {
  let refObjects = [];
  findClosest(el, (i) => {
    if (i._x_refs)
      refObjects.push(i._x_refs);
  });
  return refObjects;
};
var findAndIncrementId = function(name) {
  if (!globalIdMemo[name])
    globalIdMemo[name] = 0;
  return ++globalIdMemo[name];
};
var closestIdRoot = function(el, name) {
  return findClosest(el, (element) => {
    if (element._x_ids && element._x_ids[name])
      return true;
  });
};
var setIdRoot = function(el, name) {
  if (!el._x_ids)
    el._x_ids = {};
  if (!el._x_ids[name])
    el._x_ids[name] = findAndIncrementId(name);
};
var cacheIdByNameOnElement = function(el, cacheKey, cleanup2, callback) {
  if (!el._x_id)
    el._x_id = {};
  if (el._x_id[cacheKey])
    return el._x_id[cacheKey];
  let output = callback();
  el._x_id[cacheKey] = output;
  cleanup2(() => {
    delete el._x_id[cacheKey];
  });
  return output;
};
var warnMissingPluginMagic = function(name, magicName, slug) {
  magic(magicName, (el) => warn(`You can't use [\$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
};
var getTarget = function(expression) {
  let target = skipDuringClone(() => {
    return document.querySelector(expression);
  }, () => {
    return teleportContainerDuringClone;
  })();
  if (!target)
    warn(`Cannot find x-teleport element for selector: "${expression}"`);
  return target;
};
var on = function(el, event, modifiers, callback) {
  let listenerTarget = el;
  let handler4 = (e) => callback(e);
  let options = {};
  let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
  if (modifiers.includes("dot"))
    event = dotSyntax(event);
  if (modifiers.includes("camel"))
    event = camelCase2(event);
  if (modifiers.includes("passive"))
    options.passive = true;
  if (modifiers.includes("capture"))
    options.capture = true;
  if (modifiers.includes("window"))
    listenerTarget = window;
  if (modifiers.includes("document"))
    listenerTarget = document;
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = debounce(handler4, wait);
  }
  if (modifiers.includes("throttle")) {
    let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = throttle(handler4, wait);
  }
  if (modifiers.includes("prevent"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.preventDefault();
      next(e);
    });
  if (modifiers.includes("stop"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.stopPropagation();
      next(e);
    });
  if (modifiers.includes("once")) {
    handler4 = wrapHandler(handler4, (next, e) => {
      next(e);
      listenerTarget.removeEventListener(event, handler4, options);
    });
  }
  if (modifiers.includes("away") || modifiers.includes("outside")) {
    listenerTarget = document;
    handler4 = wrapHandler(handler4, (next, e) => {
      if (el.contains(e.target))
        return;
      if (e.target.isConnected === false)
        return;
      if (el.offsetWidth < 1 && el.offsetHeight < 1)
        return;
      if (el._x_isShown === false)
        return;
      next(e);
    });
  }
  if (modifiers.includes("self"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.target === el && next(e);
    });
  if (isKeyEvent(event) || isClickEvent(event)) {
    handler4 = wrapHandler(handler4, (next, e) => {
      if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
        return;
      }
      next(e);
    });
  }
  listenerTarget.addEventListener(event, handler4, options);
  return () => {
    listenerTarget.removeEventListener(event, handler4, options);
  };
};
var dotSyntax = function(subject) {
  return subject.replace(/-/g, ".");
};
var camelCase2 = function(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
};
var isNumeric = function(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
};
var kebabCase2 = function(subject) {
  if ([" ", "_"].includes(subject))
    return subject;
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
};
var isKeyEvent = function(event) {
  return ["keydown", "keyup"].includes(event);
};
var isClickEvent = function(event) {
  return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
};
var isListeningForASpecificKeyThatHasntBeenPressed = function(e, modifiers) {
  let keyModifiers = modifiers.filter((i) => {
    return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
  });
  if (keyModifiers.includes("debounce")) {
    let debounceIndex = keyModifiers.indexOf("debounce");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.includes("throttle")) {
    let debounceIndex = keyModifiers.indexOf("throttle");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.length === 0)
    return false;
  if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
    return false;
  const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
  const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
  keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
  if (selectedSystemKeyModifiers.length > 0) {
    const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
      if (modifier === "cmd" || modifier === "super")
        modifier = "meta";
      return e[`${modifier}Key`];
    });
    if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
      if (isClickEvent(e.type))
        return false;
      if (keyToModifiers(e.key).includes(keyModifiers[0]))
        return false;
    }
  }
  return true;
};
var keyToModifiers = function(key) {
  if (!key)
    return [];
  key = kebabCase2(key);
  let modifierToKeyMap = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    comma: ",",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  modifierToKeyMap[key] = key;
  return Object.keys(modifierToKeyMap).map((modifier) => {
    if (modifierToKeyMap[modifier] === key)
      return modifier;
  }).filter((modifier) => modifier);
};
var getInputValue = function(el, modifiers, event, currentValue) {
  return mutateDom(() => {
    if (event instanceof CustomEvent && event.detail !== undefined)
      return event.detail !== null && event.detail !== undefined ? event.detail : event.target.value;
    else if (el.type === "checkbox") {
      if (Array.isArray(currentValue)) {
        let newValue = null;
        if (modifiers.includes("number")) {
          newValue = safeParseNumber(event.target.value);
        } else if (modifiers.includes("boolean")) {
          newValue = safeParseBoolean(event.target.value);
        } else {
          newValue = event.target.value;
        }
        return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
      } else {
        return event.target.checked;
      }
    } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
      if (modifiers.includes("number")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        });
      } else if (modifiers.includes("boolean")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseBoolean(rawValue);
        });
      }
      return Array.from(event.target.selectedOptions).map((option) => {
        return option.value || option.text;
      });
    } else {
      let newValue;
      if (el.type === "radio") {
        if (event.target.checked) {
          newValue = event.target.value;
        } else {
          newValue = currentValue;
        }
      } else {
        newValue = event.target.value;
      }
      if (modifiers.includes("number")) {
        return safeParseNumber(newValue);
      } else if (modifiers.includes("boolean")) {
        return safeParseBoolean(newValue);
      } else if (modifiers.includes("trim")) {
        return newValue.trim();
      } else {
        return newValue;
      }
    }
  });
};
var safeParseNumber = function(rawValue) {
  let number = rawValue ? parseFloat(rawValue) : null;
  return isNumeric2(number) ? number : rawValue;
};
var checkedAttrLooseCompare2 = function(valueA, valueB) {
  return valueA == valueB;
};
var isNumeric2 = function(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
};
var isGetterSetter = function(value) {
  return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
};
var storeKeyForXFor = function(el, expression) {
  el._x_keyExpression = expression;
};
var shouldSkipRegisteringDataDuringClone = function(el) {
  if (!isCloning)
    return false;
  if (isCloningLegacy)
    return true;
  return el.hasAttribute("data-has-alpine-state");
};
var loop = function(el, iteratorNames, evaluateItems, evaluateKey) {
  let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
  let templateEl = el;
  evaluateItems((items) => {
    if (isNumeric3(items) && items >= 0) {
      items = Array.from(Array(items).keys(), (i) => i + 1);
    }
    if (items === undefined)
      items = [];
    let lookup = el._x_lookup;
    let prevKeys = el._x_prevKeys;
    let scopes = [];
    let keys = [];
    if (isObject2(items)) {
      items = Object.entries(items).map(([key, value]) => {
        let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
        evaluateKey((value2) => {
          if (keys.includes(value2))
            warn("Duplicate key on x-for", el);
          keys.push(value2);
        }, { scope: { index: key, ...scope2 } });
        scopes.push(scope2);
      });
    } else {
      for (let i = 0;i < items.length; i++) {
        let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
        evaluateKey((value) => {
          if (keys.includes(value))
            warn("Duplicate key on x-for", el);
          keys.push(value);
        }, { scope: { index: i, ...scope2 } });
        scopes.push(scope2);
      }
    }
    let adds = [];
    let moves = [];
    let removes = [];
    let sames = [];
    for (let i = 0;i < prevKeys.length; i++) {
      let key = prevKeys[i];
      if (keys.indexOf(key) === -1)
        removes.push(key);
    }
    prevKeys = prevKeys.filter((key) => !removes.includes(key));
    let lastKey = "template";
    for (let i = 0;i < keys.length; i++) {
      let key = keys[i];
      let prevIndex = prevKeys.indexOf(key);
      if (prevIndex === -1) {
        prevKeys.splice(i, 0, key);
        adds.push([lastKey, i]);
      } else if (prevIndex !== i) {
        let keyInSpot = prevKeys.splice(i, 1)[0];
        let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
        prevKeys.splice(i, 0, keyForSpot);
        prevKeys.splice(prevIndex, 0, keyInSpot);
        moves.push([keyInSpot, keyForSpot]);
      } else {
        sames.push(key);
      }
      lastKey = key;
    }
    for (let i = 0;i < removes.length; i++) {
      let key = removes[i];
      if (!!lookup[key]._x_effects) {
        lookup[key]._x_effects.forEach(dequeueJob);
      }
      lookup[key].remove();
      lookup[key] = null;
      delete lookup[key];
    }
    for (let i = 0;i < moves.length; i++) {
      let [keyInSpot, keyForSpot] = moves[i];
      let elInSpot = lookup[keyInSpot];
      let elForSpot = lookup[keyForSpot];
      let marker = document.createElement("div");
      mutateDom(() => {
        if (!elForSpot)
          warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
        elForSpot.after(marker);
        elInSpot.after(elForSpot);
        elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
        marker.before(elInSpot);
        elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
        marker.remove();
      });
      elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
    }
    for (let i = 0;i < adds.length; i++) {
      let [lastKey2, index] = adds[i];
      let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
      if (lastEl._x_currentIfEl)
        lastEl = lastEl._x_currentIfEl;
      let scope2 = scopes[index];
      let key = keys[index];
      let clone2 = document.importNode(templateEl.content, true).firstElementChild;
      let reactiveScope = reactive(scope2);
      addScopeToNode(clone2, reactiveScope, templateEl);
      clone2._x_refreshXForScope = (newScope) => {
        Object.entries(newScope).forEach(([key2, value]) => {
          reactiveScope[key2] = value;
        });
      };
      mutateDom(() => {
        lastEl.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      if (typeof key === "object") {
        warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
      }
      lookup[key] = clone2;
    }
    for (let i = 0;i < sames.length; i++) {
      lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
    }
    templateEl._x_prevKeys = keys;
  });
};
var parseForExpression = function(expression) {
  let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  let stripParensRE = /^\s*\(|\)\s*$/g;
  let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  let inMatch = expression.match(forAliasRE);
  if (!inMatch)
    return;
  let res = {};
  res.items = inMatch[2].trim();
  let item = inMatch[1].replace(stripParensRE, "").trim();
  let iteratorMatch = item.match(forIteratorRE);
  if (iteratorMatch) {
    res.item = item.replace(forIteratorRE, "").trim();
    res.index = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.collection = iteratorMatch[2].trim();
    }
  } else {
    res.item = item;
  }
  return res;
};
var getIterationScopeVariables = function(iteratorNames, item, index, items) {
  let scopeVariables = {};
  if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
    let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
    names.forEach((name, i) => {
      scopeVariables[name] = item[i];
    });
  } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
    let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
    names.forEach((name) => {
      scopeVariables[name] = item[name];
    });
  } else {
    scopeVariables[iteratorNames.item] = item;
  }
  if (iteratorNames.index)
    scopeVariables[iteratorNames.index] = index;
  if (iteratorNames.collection)
    scopeVariables[iteratorNames.collection] = items;
  return scopeVariables;
};
var isNumeric3 = function(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
};
var handler3 = function() {
};
var warnMissingPluginDirective = function(name, directiveName, slug) {
  directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
};
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
var queuedMutations = [];
var isCollecting = false;
var deferredMutations = [];
var mergeProxyTrap = {
  ownKeys({ objects }) {
    return Array.from(new Set(objects.flatMap((i) => Object.keys(i))));
  },
  has({ objects }, name) {
    if (name == Symbol.unscopables)
      return false;
    return objects.some((obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name));
  },
  get({ objects }, name, thisProxy) {
    if (name == "toJSON")
      return collapseProxies;
    return Reflect.get(objects.find((obj) => Reflect.has(obj, name)) || {}, name, thisProxy);
  },
  set({ objects }, name, value, thisProxy) {
    const target = objects.find((obj) => Object.prototype.hasOwnProperty.call(obj, name)) || objects[objects.length - 1];
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor?.set && descriptor?.get)
      return descriptor.set.call(thisProxy, value) || true;
    return Reflect.set(target, name, value);
  }
};
var magics = {};
var shouldAutoEvaluateFunctions = true;
var theEvaluatorFunction = normalEvaluator;
var evaluatorMemo = {};
var prefixAsString = "x-";
var directiveHandlers = {};
var isDeferringHandlers = false;
var directiveHandlerStacks = new Map;
var currentHandlerStackKey = Symbol();
var startingWith = (subject, replacement) => ({ name, value }) => {
  if (name.startsWith(subject))
    name = name.replace(subject, replacement);
  return { name, value };
};
var into = (i) => i;
var attributeTransformers = [];
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
var DEFAULT = "DEFAULT";
var directiveOrder = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
var started = false;
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
var initInterceptors2 = [];
var tickStack = [];
var isHolding = false;
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "function")
    expression = evaluate2(expression);
  if (expression === false)
    return;
  if (!expression || typeof expression === "boolean") {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {
    }, () => resolve(hide));
    el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest = closestHide(el);
    if (closest) {
      if (!closest._x_hideChildren)
        closest._x_hideChildren = [];
      closest._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = (el2) => {
          let carry = Promise.all([
            el2._x_hidePromise,
            ...(el2._x_hideChildren || []).map(hideAfterChildren)
          ]).then(([i]) => i?.());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch((e) => {
          if (!e.isFromCancelledTransition)
            throw e;
        });
      });
    }
  });
};
var isCloning = false;
var interceptors = [];
var isCloningLegacy = false;
var stores = {};
var isReactive = false;
var binds = {};
var datas = {};
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.14.1",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  onAttributeRemoved,
  onAttributesAdded,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  interceptClone,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  extractProp,
  findClosest,
  onElRemoved,
  closestRoot,
  destroyTree,
  interceptor,
  transition,
  setStyles,
  mutateDom,
  directive,
  entangle,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  cloneNode,
  bound: getBinding,
  $data: scope,
  watch,
  walk,
  data,
  bind: bind2
};
var alpine_default = Alpine;
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = Object.freeze([]);
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
var targetMap = new WeakMap;
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol("iterate");
var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
var uid = 0;
var shouldTrack = true;
var trackStack = [];
var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
var get2 = createGetter();
var readonlyGet = createGetter(true);
var arrayInstrumentations = createArrayInstrumentations();
var set2 = createSetter();
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (true) {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    if (true) {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
var toReactive = (value) => isObject(value) ? reactive2(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = createInstrumentations();
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
var reactiveMap = new WeakMap;
var shallowReactiveMap = new WeakMap;
var readonlyMap = new WeakMap;
var shallowReadonlyMap = new WeakMap;
magic("nextTick", () => nextTick);
magic("dispatch", (el) => dispatch.bind(dispatch, el));
magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
  let evaluate2 = evaluateLater2(key);
  let getter = () => {
    let value;
    evaluate2((i) => value = i);
    return value;
  };
  let unwatch = watch(getter, callback);
  cleanup2(unwatch);
});
magic("store", getStores);
magic("data", (el) => scope(el));
magic("root", (el) => closestRoot(el));
magic("refs", (el) => {
  if (el._x_refs_proxy)
    return el._x_refs_proxy;
  el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
  return el._x_refs_proxy;
});
var globalIdMemo = {};
magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
  let cacheKey = `${name}${key ? `-${key}` : ""}`;
  return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
    let root = closestIdRoot(el, name);
    let id = root ? root._x_ids[name] : findAndIncrementId(name);
    return key ? `${name}-${id}-${key}` : `${name}-${id}`;
  });
});
interceptClone((from, to) => {
  if (from._x_id) {
    to._x_id = from._x_id;
  }
});
magic("el", (el) => el);
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
  let func = evaluateLater2(expression);
  let innerGet = () => {
    let result;
    func((i) => result = i);
    return result;
  };
  let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
  let innerSet = (val) => evaluateInnerSet(() => {
  }, { scope: { __placeholder: val } });
  let initialValue = innerGet();
  innerSet(initialValue);
  queueMicrotask(() => {
    if (!el._x_model)
      return;
    el._x_removeModelListeners["default"]();
    let outerGet = el._x_model.get;
    let outerSet = el._x_model.set;
    let releaseEntanglement = entangle({
      get() {
        return outerGet();
      },
      set(value) {
        outerSet(value);
      }
    }, {
      get() {
        return innerGet();
      },
      set(value) {
        innerSet(value);
      }
    });
    cleanup2(releaseEntanglement);
  });
});
directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-teleport can only be used on a <template> tag", el);
  let target = getTarget(expression);
  let clone2 = el.content.cloneNode(true).firstElementChild;
  el._x_teleport = clone2;
  clone2._x_teleportBack = el;
  el.setAttribute("data-teleport-template", true);
  clone2.setAttribute("data-teleport-target", true);
  if (el._x_forwardEvents) {
    el._x_forwardEvents.forEach((eventName) => {
      clone2.addEventListener(eventName, (e) => {
        e.stopPropagation();
        el.dispatchEvent(new e.constructor(e.type, e));
      });
    });
  }
  addScopeToNode(clone2, {}, el);
  let placeInDom = (clone3, target2, modifiers2) => {
    if (modifiers2.includes("prepend")) {
      target2.parentNode.insertBefore(clone3, target2);
    } else if (modifiers2.includes("append")) {
      target2.parentNode.insertBefore(clone3, target2.nextSibling);
    } else {
      target2.appendChild(clone3);
    }
  };
  mutateDom(() => {
    placeInDom(clone2, target, modifiers);
    skipDuringClone(() => {
      initTree(clone2);
      clone2._x_ignore = true;
    })();
  });
  el._x_teleportPutBack = () => {
    let target2 = getTarget(expression);
    mutateDom(() => {
      placeInDom(el._x_teleport, target2, modifiers);
    });
  };
  cleanup2(() => clone2.remove());
});
var teleportContainerDuringClone = document.createElement("div");
var handler = () => {
};
handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
  modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
  cleanup2(() => {
    modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
  });
};
directive("ignore", handler);
directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
  effect3(evaluateLater(el, expression));
}));
directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let scopeTarget = el;
  if (modifiers.includes("parent")) {
    scopeTarget = el.parentNode;
  }
  let evaluateGet = evaluateLater(scopeTarget, expression);
  let evaluateSet;
  if (typeof expression === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
  } else if (typeof expression === "function" && typeof expression() === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
  } else {
    evaluateSet = () => {
    };
  }
  let getValue = () => {
    let result;
    evaluateGet((value) => result = value);
    return isGetterSetter(result) ? result.get() : result;
  };
  let setValue = (value) => {
    let result;
    evaluateGet((value2) => result = value2);
    if (isGetterSetter(result)) {
      result.set(value);
    } else {
      evaluateSet(() => {
      }, {
        scope: { __placeholder: value }
      });
    }
  };
  if (typeof expression === "string" && el.type === "radio") {
    mutateDom(() => {
      if (!el.hasAttribute("name"))
        el.setAttribute("name", expression);
    });
  }
  var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
  let removeListener = isCloning ? () => {
  } : on(el, event, modifiers, (e) => {
    setValue(getInputValue(el, modifiers, e, getValue()));
  });
  if (modifiers.includes("fill")) {
    if ([undefined, null, ""].includes(getValue()) || el.type === "checkbox" && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
      setValue(getInputValue(el, modifiers, { target: el }, getValue()));
    }
  }
  if (!el._x_removeModelListeners)
    el._x_removeModelListeners = {};
  el._x_removeModelListeners["default"] = removeListener;
  cleanup2(() => el._x_removeModelListeners["default"]());
  if (el.form) {
    let removeResetListener = on(el.form, "reset", [], (e) => {
      nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
    });
    cleanup2(() => removeResetListener());
  }
  el._x_model = {
    get() {
      return getValue();
    },
    set(value) {
      setValue(value);
    }
  };
  el._x_forceModelUpdate = (value) => {
    if (value === undefined && typeof expression === "string" && expression.match(/\./))
      value = "";
    window.fromModel = true;
    mutateDom(() => bind(el, "value", value));
    delete window.fromModel;
  };
  effect3(() => {
    let value = getValue();
    if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
      return;
    el._x_forceModelUpdate(value);
  });
});
directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "string") {
    return !!expression.trim() && evaluate2(expression, {}, false);
  }
  return evaluate2(expression, {}, false);
}));
directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.textContent = value;
      });
    });
  });
});
directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.innerHTML = value;
        el._x_ignoreSelf = true;
        initTree(el);
        delete el._x_ignoreSelf;
      });
    });
  });
});
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
  if (!value) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    getBindings((bindings) => {
      applyBindingsObject(el, bindings, original);
    }, { scope: bindingProviders });
    return;
  }
  if (value === "key")
    return storeKeyForXFor(el, expression);
  if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
    return;
  }
  let evaluate2 = evaluateLater(el, expression);
  effect3(() => evaluate2((result) => {
    if (result === undefined && typeof expression === "string" && expression.match(/\./)) {
      result = "";
    }
    mutateDom(() => bind(el, value, result, modifiers));
  }));
  cleanup2(() => {
    el._x_undoAddedClasses && el._x_undoAddedClasses();
    el._x_undoAddedStyles && el._x_undoAddedStyles();
  });
};
handler2.inline = (el, { value, modifiers, expression }) => {
  if (!value)
    return;
  if (!el._x_inlineBindings)
    el._x_inlineBindings = {};
  el._x_inlineBindings[value] = { expression, extract: false };
};
directive("bind", handler2);
addRootSelector(() => `[${prefix("data")}]`);
directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
  if (shouldSkipRegisteringDataDuringClone(el))
    return;
  expression = expression === "" ? "{}" : expression;
  let magicContext = {};
  injectMagics(magicContext, el);
  let dataProviderContext = {};
  injectDataProviders(dataProviderContext, magicContext);
  let data2 = evaluate(el, expression, { scope: dataProviderContext });
  if (data2 === undefined || data2 === true)
    data2 = {};
  injectMagics(data2, el);
  let reactiveData = reactive(data2);
  initInterceptors(reactiveData);
  let undo = addScopeToNode(el, reactiveData);
  reactiveData["init"] && evaluate(el, reactiveData["init"]);
  cleanup2(() => {
    reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    undo();
  });
});
interceptClone((from, to) => {
  if (from._x_dataStack) {
    to._x_dataStack = from._x_dataStack;
    to.setAttribute("data-has-alpine-state", true);
  }
});
directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
  let evaluate2 = evaluateLater(el, expression);
  if (!el._x_doHide)
    el._x_doHide = () => {
      mutateDom(() => {
        el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : undefined);
      });
    };
  if (!el._x_doShow)
    el._x_doShow = () => {
      mutateDom(() => {
        if (el.style.length === 1 && el.style.display === "none") {
          el.removeAttribute("style");
        } else {
          el.style.removeProperty("display");
        }
      });
    };
  let hide = () => {
    el._x_doHide();
    el._x_isShown = false;
  };
  let show = () => {
    el._x_doShow();
    el._x_isShown = true;
  };
  let clickAwayCompatibleShow = () => setTimeout(show);
  let toggle = once((value) => value ? show() : hide(), (value) => {
    if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
      el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
    } else {
      value ? clickAwayCompatibleShow() : hide();
    }
  });
  let oldValue;
  let firstTime = true;
  effect3(() => evaluate2((value) => {
    if (!firstTime && value === oldValue)
      return;
    if (modifiers.includes("immediate"))
      value ? clickAwayCompatibleShow() : hide();
    toggle(value);
    oldValue = value;
    firstTime = false;
  }));
});
directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let iteratorNames = parseForExpression(expression);
  let evaluateItems = evaluateLater(el, iteratorNames.items);
  let evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
  el._x_prevKeys = [];
  el._x_lookup = {};
  effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
  cleanup2(() => {
    Object.values(el._x_lookup).forEach((el2) => el2.remove());
    delete el._x_prevKeys;
    delete el._x_lookup;
  });
});
handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
  let root = closestRoot(el);
  if (!root._x_refs)
    root._x_refs = {};
  root._x_refs[expression] = el;
  cleanup2(() => delete root._x_refs[expression]);
};
directive("ref", handler3);
directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-if can only be used on a <template> tag", el);
  let evaluate2 = evaluateLater(el, expression);
  let show = () => {
    if (el._x_currentIfEl)
      return el._x_currentIfEl;
    let clone2 = el.content.cloneNode(true).firstElementChild;
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      el.after(clone2);
      skipDuringClone(() => initTree(clone2))();
    });
    el._x_currentIfEl = clone2;
    el._x_undoIf = () => {
      walk(clone2, (node) => {
        if (!!node._x_effects) {
          node._x_effects.forEach(dequeueJob);
        }
      });
      clone2.remove();
      delete el._x_currentIfEl;
    };
    return clone2;
  };
  let hide = () => {
    if (!el._x_undoIf)
      return;
    el._x_undoIf();
    delete el._x_undoIf;
  };
  effect3(() => evaluate2((value) => {
    value ? show() : hide();
  }));
  cleanup2(() => el._x_undoIf && el._x_undoIf());
});
directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
  let names = evaluate2(expression);
  names.forEach((name) => setIdRoot(el, name));
});
interceptClone((from, to) => {
  if (from._x_ids) {
    to._x_ids = from._x_ids;
  }
});
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
  let evaluate2 = expression ? evaluateLater(el, expression) : () => {
  };
  if (el.tagName.toLowerCase() === "template") {
    if (!el._x_forwardEvents)
      el._x_forwardEvents = [];
    if (!el._x_forwardEvents.includes(value))
      el._x_forwardEvents.push(value);
  }
  let removeListener = on(el, value, modifiers, (e) => {
    evaluate2(() => {
    }, { scope: { $event: e }, params: [e] });
  });
  cleanup2(() => removeListener());
}));
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
var src_default = alpine_default;
var module_default = src_default;

// frontend/js/index.js
var import_hyperscript = __toESM(require__hyperscript_min(), 1);
var getLastUrlSegment = function(url) {
  return new URL(url).pathname.split("/").filter(Boolean).pop();
};
window.Alpine = module_default;
module_default.start();
import_hyperscript.default.browserInit();
window.initComponents = function() {
};
window.disableScrollWhenHover = function(element) {
  element.onmouseover = () => {
    document.body.classList.add("noYScroll");
  };
  element.onmouseout = () => {
    document.body.classList.remove("noYScroll");
  };
};
window.addEventListener("popstate", (event) => {
  window.location.reload();
});
initComponents();
window.trimInput = function(input) {
  if (input && input.value) {
    input.value = input.value.replace(/^\s+/, "").replace(/\s+$/, "").trim();
  }
};
window.isInputEmpty = function(input) {
  trimInput(input);
  return !input || !input.value || input.value === "";
};
window.getLastUrlSegmentCurrent = function() {
  return getLastUrlSegment(window.location.href) ?? "";
};
window.getQueryParam = function(name) {
  let params = new URL(document.location).searchParams;
  return params.get(name);
};
window.limitInputToMaxLength = function(input) {
  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength);
  }
};
window.getPathName = function() {
  return window.location.pathname;
};
window.redirectTo = function(url) {
  window.location.href = "." + url;
};
window.initNav = function() {
  let pathname = window.location.pathname;
  if (pathname.length === 0) {
    let lastUrlSegmentCurrent = getLastUrlSegmentCurrent();
    if (!lastUrlSegmentCurrent || lastUrlSegmentCurrent === "" || lastUrlSegmentCurrent === "index" || lastUrlSegmentCurrent === "/") {
      let item = localStorage.getItem("current-nav");
      if (item) {
        let elem = document.getElementById(item);
        elem?.dispatchEvent(new CustomEvent("navigate"));
        return;
      }
      let navbar = document.getElementsByClassName("navbar-start");
      if (navbar.length > 0) {
        let nav = navbar[0];
        let anchors = nav.getElementsByTagName("a");
        if (anchors.length > 0) {
          let anchor = anchors[0];
          localStorage.setItem("current-nav", anchor.id);
          anchor.dispatchEvent(new CustomEvent("navigate"));
        }
      }
    }
  } else if (pathname === "/") {
    let lastUrlSegmentCurrent = getLastUrlSegmentCurrent();
    if (!lastUrlSegmentCurrent || lastUrlSegmentCurrent === "" || lastUrlSegmentCurrent === "index" || lastUrlSegmentCurrent === "/") {
      let item = localStorage.getItem("current-nav");
      if (item) {
        let elem = document.getElementById(item);
        elem?.dispatchEvent(new CustomEvent("navigate"));
        return;
      }
      let navbar = document.getElementsByClassName("navbar-start");
      if (navbar.length > 0) {
        let nav = navbar[0];
        let anchors = nav.getElementsByTagName("a");
        if (anchors.length > 0) {
          let anchor = anchors[0];
          localStorage.setItem("current-nav", anchor.id);
          anchor.dispatchEvent(new CustomEvent("navigate"));
        }
      }
    }
  } else {
    let element = document.getElementById("nav-helper");
    if (element) {
      element.dispatchEvent(new CustomEvent("navigate"));
    }
  }
};
window.saveNavState = function(anchor) {
  localStorage.setItem("current-nav", anchor.id);
  modifyUrl(anchor);
};
window.modifyUrl = function(elem) {
  let pathname = elem.getAttribute("hx-get").replaceAll("/stc", "");
  window.history.pushState(window.history.state, document.title, pathname);
};
window.removeStc = function(elem) {
  let href = window.location.href;
  let newHref = href.replaceAll("/stc", "");
  window.history.replaceState(window.history.state, document.title, newHref);
};
window.saveToLocalStorage = function(key, value) {
  localStorage.setItem(key, value);
};
window.getFromLocalStorage = function(key) {
  return localStorage.getItem(key);
};
window.monthsToStr = function(months) {
  let str = "";
  for (let i = 0;i < months.length; i++) {
    let month = months[i];
    str += integerToMonth(month);
    if (i < months.length - 1) {
      str += ", ";
    }
  }
  return str;
};
window.integerToMonth = function(month) {
  if (!month) {
    return "N/A";
  }
  switch (month) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Abril";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Diciembre";
    default:
      return "N/A";
  }
};
window.openTab = function(evt, cityName) {
  let tabcontent = document.getElementsByClassName("tab-cm-content");
  for (let i = 0;i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0;i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" btn-active", "");
  }
  document.getElementById(cityName).style.display = "block";
  if (evt) {
    evt.className += " btn-active";
  }
};
window.slideTo = function(id, direction) {
  let elem = document.getElementById(id);
  if (elem) {
    elem.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth"
    });
  }
};
window.scrollDiv = function(elem) {
  elem.addEventListener("wheel", (event) => {
    elem.scrollBy({
      left: event.deltaY > 0 ? -400 : 400,
      behavior: "smooth"
    });
  }, {
    passive: true
  });
};
window.validateEmail = function(value) {
  if (value) {
    if (value.length > 0) {
      let atIndex = value.indexOf("@");
      let dotIndex = value.indexOf(".");
      if (atIndex > 0 && dotIndex > atIndex && dotIndex < value.length - 1) {
        return true;
      }
    }
  }
  return false;
};
window.sendEvent = function(id, eventName) {
  let elem = document.getElementById(id);
  if (elem) {
    elem.dispatchEvent(new CustomEvent(eventName));
  }
};
window.saveResource = function(key, value) {
  saveToLocalStorage(key, value);
};
window.getResource = function(key, path) {
  let storageValue = getFromLocalStorage(key);
  let segmentValue = getLastUrlSegmentCurrent();
  localStorage.removeItem(key);
  let value = storageValue ?? segmentValue;
  if (storageValue && path) {
    let pathname = window.location.href + path + value;
    window.history.pushState(window.history.state, document.title, pathname);
  }
  return value;
};
