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

// node_modules/htmx.org/dist/htmx.min.js
var require_htmx_min = __commonJS((exports, module) => {
  (function(e2, t2) {
    if (typeof define === "function" && define.amd) {
      define([], t2);
    } else if (typeof module === "object" && exports) {
      module.exports = t2();
    } else {
      e2.htmx = e2.htmx || t2();
    }
  })(typeof self !== "undefined" ? self : exports, function() {
    return function() {
      var Q = { onLoad: F, process: zt, on: de, off: ge, trigger: ce, ajax: Nr, find: C, findAll: f, closest: v, values: function(e2, t2) {
        var r2 = dr(e2, t2 || "post");
        return r2.values;
      }, remove: _, addClass: z, removeClass: n, toggleClass: $, takeClass: W, defineExtension: Ur, removeExtension: Br, logAll: V, logNone: j, logger: null, config: { historyEnabled: true, historyCacheSize: 10, refreshOnHistoryMiss: false, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: true, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: true, allowScriptTags: true, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: false, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: false, scrollBehavior: "smooth", defaultFocusScroll: false, getCacheBusterParam: false, globalViewTransitions: false, methodsThatUseUrlParams: ["get"], selfRequestsOnly: false, ignoreTitle: false, scrollIntoViewOnBoost: true, triggerSpecsCache: null }, parseInterval: d, _: t, createEventSource: function(e2) {
        return new EventSource(e2, { withCredentials: true });
      }, createWebSocket: function(e2) {
        var t2 = new WebSocket(e2, []);
        t2.binaryType = Q.config.wsBinaryType;
        return t2;
      }, version: "1.9.10" };
      var r = { addTriggerHandler: Lt, bodyContains: se, canAccessLocalStorage: U, findThisElement: xe, filterValues: yr, hasAttribute: o, getAttributeValue: te, getClosestAttributeValue: ne, getClosestMatch: c, getExpressionVars: Hr, getHeaders: xr, getInputValues: dr, getInternalData: ae, getSwapSpecification: wr, getTriggerSpecs: it, getTarget: ye, makeFragment: l, mergeObjects: le, makeSettleInfo: T, oobSwap: Ee, querySelectorExt: ue, selectAndSwap: je, settleImmediately: nr, shouldCancel: ut, triggerEvent: ce, triggerErrorEvent: fe, withExtensions: R };
      var w = ["get", "post", "put", "delete", "patch"];
      var i = w.map(function(e2) {
        return "[hx-" + e2 + "], [data-hx-" + e2 + "]";
      }).join(", ");
      var S = e("head"), q = e("title"), H = e("svg", true);
      function e(e2, t2 = false) {
        return new RegExp(`<${e2}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${e2}>`, t2 ? "gim" : "im");
      }
      function d(e2) {
        if (e2 == undefined) {
          return;
        }
        let t2 = NaN;
        if (e2.slice(-2) == "ms") {
          t2 = parseFloat(e2.slice(0, -2));
        } else if (e2.slice(-1) == "s") {
          t2 = parseFloat(e2.slice(0, -1)) * 1000;
        } else if (e2.slice(-1) == "m") {
          t2 = parseFloat(e2.slice(0, -1)) * 1000 * 60;
        } else {
          t2 = parseFloat(e2);
        }
        return isNaN(t2) ? undefined : t2;
      }
      function ee(e2, t2) {
        return e2.getAttribute && e2.getAttribute(t2);
      }
      function o(e2, t2) {
        return e2.hasAttribute && (e2.hasAttribute(t2) || e2.hasAttribute("data-" + t2));
      }
      function te(e2, t2) {
        return ee(e2, t2) || ee(e2, "data-" + t2);
      }
      function u(e2) {
        return e2.parentElement;
      }
      function re() {
        return document;
      }
      function c(e2, t2) {
        while (e2 && !t2(e2)) {
          e2 = u(e2);
        }
        return e2 ? e2 : null;
      }
      function L(e2, t2, r2) {
        var n2 = te(t2, r2);
        var i2 = te(t2, "hx-disinherit");
        if (e2 !== t2 && i2 && (i2 === "*" || i2.split(" ").indexOf(r2) >= 0)) {
          return "unset";
        } else {
          return n2;
        }
      }
      function ne(t2, r2) {
        var n2 = null;
        c(t2, function(e2) {
          return n2 = L(t2, e2, r2);
        });
        if (n2 !== "unset") {
          return n2;
        }
      }
      function h(e2, t2) {
        var r2 = e2.matches || e2.matchesSelector || e2.msMatchesSelector || e2.mozMatchesSelector || e2.webkitMatchesSelector || e2.oMatchesSelector;
        return r2 && r2.call(e2, t2);
      }
      function A(e2) {
        var t2 = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var r2 = t2.exec(e2);
        if (r2) {
          return r2[1].toLowerCase();
        } else {
          return "";
        }
      }
      function a(e2, t2) {
        var r2 = new DOMParser;
        var n2 = r2.parseFromString(e2, "text/html");
        var i2 = n2.body;
        while (t2 > 0) {
          t2--;
          i2 = i2.firstChild;
        }
        if (i2 == null) {
          i2 = re().createDocumentFragment();
        }
        return i2;
      }
      function N(e2) {
        return /<body/.test(e2);
      }
      function l(e2) {
        var t2 = !N(e2);
        var r2 = A(e2);
        var n2 = e2;
        if (r2 === "head") {
          n2 = n2.replace(S, "");
        }
        if (Q.config.useTemplateFragments && t2) {
          var i2 = a("<body><template>" + n2 + "</template></body>", 0);
          return i2.querySelector("template").content;
        }
        switch (r2) {
          case "thead":
          case "tbody":
          case "tfoot":
          case "colgroup":
          case "caption":
            return a("<table>" + n2 + "</table>", 1);
          case "col":
            return a("<table><colgroup>" + n2 + "</colgroup></table>", 2);
          case "tr":
            return a("<table><tbody>" + n2 + "</tbody></table>", 2);
          case "td":
          case "th":
            return a("<table><tbody><tr>" + n2 + "</tr></tbody></table>", 3);
          case "script":
          case "style":
            return a("<div>" + n2 + "</div>", 1);
          default:
            return a(n2, 0);
        }
      }
      function ie(e2) {
        if (e2) {
          e2();
        }
      }
      function I(e2, t2) {
        return Object.prototype.toString.call(e2) === "[object " + t2 + "]";
      }
      function k(e2) {
        return I(e2, "Function");
      }
      function P(e2) {
        return I(e2, "Object");
      }
      function ae(e2) {
        var t2 = "htmx-internal-data";
        var r2 = e2[t2];
        if (!r2) {
          r2 = e2[t2] = {};
        }
        return r2;
      }
      function M(e2) {
        var t2 = [];
        if (e2) {
          for (var r2 = 0;r2 < e2.length; r2++) {
            t2.push(e2[r2]);
          }
        }
        return t2;
      }
      function oe(e2, t2) {
        if (e2) {
          for (var r2 = 0;r2 < e2.length; r2++) {
            t2(e2[r2]);
          }
        }
      }
      function X(e2) {
        var t2 = e2.getBoundingClientRect();
        var r2 = t2.top;
        var n2 = t2.bottom;
        return r2 < window.innerHeight && n2 >= 0;
      }
      function se(e2) {
        if (e2.getRootNode && e2.getRootNode() instanceof window.ShadowRoot) {
          return re().body.contains(e2.getRootNode().host);
        } else {
          return re().body.contains(e2);
        }
      }
      function D(e2) {
        return e2.trim().split(/\s+/);
      }
      function le(e2, t2) {
        for (var r2 in t2) {
          if (t2.hasOwnProperty(r2)) {
            e2[r2] = t2[r2];
          }
        }
        return e2;
      }
      function E(e2) {
        try {
          return JSON.parse(e2);
        } catch (e3) {
          b(e3);
          return null;
        }
      }
      function U() {
        var e2 = "htmx:localStorageTest";
        try {
          localStorage.setItem(e2, e2);
          localStorage.removeItem(e2);
          return true;
        } catch (e3) {
          return false;
        }
      }
      function B(t2) {
        try {
          var e2 = new URL(t2);
          if (e2) {
            t2 = e2.pathname + e2.search;
          }
          if (!/^\/$/.test(t2)) {
            t2 = t2.replace(/\/+$/, "");
          }
          return t2;
        } catch (e3) {
          return t2;
        }
      }
      function t(e) {
        return Tr(re().body, function() {
          return eval(e);
        });
      }
      function F(t2) {
        var e2 = Q.on("htmx:load", function(e3) {
          t2(e3.detail.elt);
        });
        return e2;
      }
      function V() {
        Q.logger = function(e2, t2, r2) {
          if (console) {
            console.log(t2, e2, r2);
          }
        };
      }
      function j() {
        Q.logger = null;
      }
      function C(e2, t2) {
        if (t2) {
          return e2.querySelector(t2);
        } else {
          return C(re(), e2);
        }
      }
      function f(e2, t2) {
        if (t2) {
          return e2.querySelectorAll(t2);
        } else {
          return f(re(), e2);
        }
      }
      function _(e2, t2) {
        e2 = g(e2);
        if (t2) {
          setTimeout(function() {
            _(e2);
            e2 = null;
          }, t2);
        } else {
          e2.parentElement.removeChild(e2);
        }
      }
      function z(e2, t2, r2) {
        e2 = g(e2);
        if (r2) {
          setTimeout(function() {
            z(e2, t2);
            e2 = null;
          }, r2);
        } else {
          e2.classList && e2.classList.add(t2);
        }
      }
      function n(e2, t2, r2) {
        e2 = g(e2);
        if (r2) {
          setTimeout(function() {
            n(e2, t2);
            e2 = null;
          }, r2);
        } else {
          if (e2.classList) {
            e2.classList.remove(t2);
            if (e2.classList.length === 0) {
              e2.removeAttribute("class");
            }
          }
        }
      }
      function $(e2, t2) {
        e2 = g(e2);
        e2.classList.toggle(t2);
      }
      function W(e2, t2) {
        e2 = g(e2);
        oe(e2.parentElement.children, function(e3) {
          n(e3, t2);
        });
        z(e2, t2);
      }
      function v(e2, t2) {
        e2 = g(e2);
        if (e2.closest) {
          return e2.closest(t2);
        } else {
          do {
            if (e2 == null || h(e2, t2)) {
              return e2;
            }
          } while (e2 = e2 && u(e2));
          return null;
        }
      }
      function s(e2, t2) {
        return e2.substring(0, t2.length) === t2;
      }
      function G(e2, t2) {
        return e2.substring(e2.length - t2.length) === t2;
      }
      function J(e2) {
        var t2 = e2.trim();
        if (s(t2, "<") && G(t2, "/>")) {
          return t2.substring(1, t2.length - 2);
        } else {
          return t2;
        }
      }
      function Z(e2, t2) {
        if (t2.indexOf("closest ") === 0) {
          return [v(e2, J(t2.substr(8)))];
        } else if (t2.indexOf("find ") === 0) {
          return [C(e2, J(t2.substr(5)))];
        } else if (t2 === "next") {
          return [e2.nextElementSibling];
        } else if (t2.indexOf("next ") === 0) {
          return [K(e2, J(t2.substr(5)))];
        } else if (t2 === "previous") {
          return [e2.previousElementSibling];
        } else if (t2.indexOf("previous ") === 0) {
          return [Y(e2, J(t2.substr(9)))];
        } else if (t2 === "document") {
          return [document];
        } else if (t2 === "window") {
          return [window];
        } else if (t2 === "body") {
          return [document.body];
        } else {
          return re().querySelectorAll(J(t2));
        }
      }
      var K = function(e2, t2) {
        var r2 = re().querySelectorAll(t2);
        for (var n2 = 0;n2 < r2.length; n2++) {
          var i2 = r2[n2];
          if (i2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_PRECEDING) {
            return i2;
          }
        }
      };
      var Y = function(e2, t2) {
        var r2 = re().querySelectorAll(t2);
        for (var n2 = r2.length - 1;n2 >= 0; n2--) {
          var i2 = r2[n2];
          if (i2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_FOLLOWING) {
            return i2;
          }
        }
      };
      function ue(e2, t2) {
        if (t2) {
          return Z(e2, t2)[0];
        } else {
          return Z(re().body, e2)[0];
        }
      }
      function g(e2) {
        if (I(e2, "String")) {
          return C(e2);
        } else {
          return e2;
        }
      }
      function ve(e2, t2, r2) {
        if (k(t2)) {
          return { target: re().body, event: e2, listener: t2 };
        } else {
          return { target: g(e2), event: t2, listener: r2 };
        }
      }
      function de(t2, r2, n2) {
        jr(function() {
          var e3 = ve(t2, r2, n2);
          e3.target.addEventListener(e3.event, e3.listener);
        });
        var e2 = k(r2);
        return e2 ? r2 : n2;
      }
      function ge(t2, r2, n2) {
        jr(function() {
          var e2 = ve(t2, r2, n2);
          e2.target.removeEventListener(e2.event, e2.listener);
        });
        return k(r2) ? r2 : n2;
      }
      var me = re().createElement("output");
      function pe(e2, t2) {
        var r2 = ne(e2, t2);
        if (r2) {
          if (r2 === "this") {
            return [xe(e2, t2)];
          } else {
            var n2 = Z(e2, r2);
            if (n2.length === 0) {
              b('The selector "' + r2 + '" on ' + t2 + " returned no matches!");
              return [me];
            } else {
              return n2;
            }
          }
        }
      }
      function xe(e2, t2) {
        return c(e2, function(e3) {
          return te(e3, t2) != null;
        });
      }
      function ye(e2) {
        var t2 = ne(e2, "hx-target");
        if (t2) {
          if (t2 === "this") {
            return xe(e2, "hx-target");
          } else {
            return ue(e2, t2);
          }
        } else {
          var r2 = ae(e2);
          if (r2.boosted) {
            return re().body;
          } else {
            return e2;
          }
        }
      }
      function be(e2) {
        var t2 = Q.config.attributesToSettle;
        for (var r2 = 0;r2 < t2.length; r2++) {
          if (e2 === t2[r2]) {
            return true;
          }
        }
        return false;
      }
      function we(t2, r2) {
        oe(t2.attributes, function(e2) {
          if (!r2.hasAttribute(e2.name) && be(e2.name)) {
            t2.removeAttribute(e2.name);
          }
        });
        oe(r2.attributes, function(e2) {
          if (be(e2.name)) {
            t2.setAttribute(e2.name, e2.value);
          }
        });
      }
      function Se(e2, t2) {
        var r2 = Fr(t2);
        for (var n2 = 0;n2 < r2.length; n2++) {
          var i2 = r2[n2];
          try {
            if (i2.isInlineSwap(e2)) {
              return true;
            }
          } catch (e3) {
            b(e3);
          }
        }
        return e2 === "outerHTML";
      }
      function Ee(e2, i2, a2) {
        var t2 = "#" + ee(i2, "id");
        var o2 = "outerHTML";
        if (e2 === "true") {
        } else if (e2.indexOf(":") > 0) {
          o2 = e2.substr(0, e2.indexOf(":"));
          t2 = e2.substr(e2.indexOf(":") + 1, e2.length);
        } else {
          o2 = e2;
        }
        var r2 = re().querySelectorAll(t2);
        if (r2) {
          oe(r2, function(e3) {
            var t3;
            var r3 = i2.cloneNode(true);
            t3 = re().createDocumentFragment();
            t3.appendChild(r3);
            if (!Se(o2, e3)) {
              t3 = r3;
            }
            var n2 = { shouldSwap: true, target: e3, fragment: t3 };
            if (!ce(e3, "htmx:oobBeforeSwap", n2))
              return;
            e3 = n2.target;
            if (n2["shouldSwap"]) {
              Fe(o2, e3, e3, t3, a2);
            }
            oe(a2.elts, function(e4) {
              ce(e4, "htmx:oobAfterSwap", n2);
            });
          });
          i2.parentNode.removeChild(i2);
        } else {
          i2.parentNode.removeChild(i2);
          fe(re().body, "htmx:oobErrorNoTarget", { content: i2 });
        }
        return e2;
      }
      function Ce(e2, t2, r2) {
        var n2 = ne(e2, "hx-select-oob");
        if (n2) {
          var i2 = n2.split(",");
          for (var a2 = 0;a2 < i2.length; a2++) {
            var o2 = i2[a2].split(":", 2);
            var s2 = o2[0].trim();
            if (s2.indexOf("#") === 0) {
              s2 = s2.substring(1);
            }
            var l2 = o2[1] || "true";
            var u2 = t2.querySelector("#" + s2);
            if (u2) {
              Ee(l2, u2, r2);
            }
          }
        }
        oe(f(t2, "[hx-swap-oob], [data-hx-swap-oob]"), function(e3) {
          var t3 = te(e3, "hx-swap-oob");
          if (t3 != null) {
            Ee(t3, e3, r2);
          }
        });
      }
      function Re(e2) {
        oe(f(e2, "[hx-preserve], [data-hx-preserve]"), function(e3) {
          var t2 = te(e3, "id");
          var r2 = re().getElementById(t2);
          if (r2 != null) {
            e3.parentNode.replaceChild(r2, e3);
          }
        });
      }
      function Te(o2, e2, s2) {
        oe(e2.querySelectorAll("[id]"), function(e3) {
          var t2 = ee(e3, "id");
          if (t2 && t2.length > 0) {
            var r2 = t2.replace("'", "\\'");
            var n2 = e3.tagName.replace(":", "\\:");
            var i2 = o2.querySelector(n2 + "[id='" + r2 + "']");
            if (i2 && i2 !== o2) {
              var a2 = e3.cloneNode();
              we(e3, i2);
              s2.tasks.push(function() {
                we(e3, a2);
              });
            }
          }
        });
      }
      function Oe(e2) {
        return function() {
          n(e2, Q.config.addedClass);
          zt(e2);
          Nt(e2);
          qe(e2);
          ce(e2, "htmx:load");
        };
      }
      function qe(e2) {
        var t2 = "[autofocus]";
        var r2 = h(e2, t2) ? e2 : e2.querySelector(t2);
        if (r2 != null) {
          r2.focus();
        }
      }
      function m(e2, t2, r2, n2) {
        Te(e2, r2, n2);
        while (r2.childNodes.length > 0) {
          var i2 = r2.firstChild;
          z(i2, Q.config.addedClass);
          e2.insertBefore(i2, t2);
          if (i2.nodeType !== Node.TEXT_NODE && i2.nodeType !== Node.COMMENT_NODE) {
            n2.tasks.push(Oe(i2));
          }
        }
      }
      function He(e2, t2) {
        var r2 = 0;
        while (r2 < e2.length) {
          t2 = (t2 << 5) - t2 + e2.charCodeAt(r2++) | 0;
        }
        return t2;
      }
      function Le(e2) {
        var t2 = 0;
        if (e2.attributes) {
          for (var r2 = 0;r2 < e2.attributes.length; r2++) {
            var n2 = e2.attributes[r2];
            if (n2.value) {
              t2 = He(n2.name, t2);
              t2 = He(n2.value, t2);
            }
          }
        }
        return t2;
      }
      function Ae(e2) {
        var t2 = ae(e2);
        if (t2.onHandlers) {
          for (var r2 = 0;r2 < t2.onHandlers.length; r2++) {
            const n2 = t2.onHandlers[r2];
            e2.removeEventListener(n2.event, n2.listener);
          }
          delete t2.onHandlers;
        }
      }
      function Ne(e2) {
        var t2 = ae(e2);
        if (t2.timeout) {
          clearTimeout(t2.timeout);
        }
        if (t2.webSocket) {
          t2.webSocket.close();
        }
        if (t2.sseEventSource) {
          t2.sseEventSource.close();
        }
        if (t2.listenerInfos) {
          oe(t2.listenerInfos, function(e3) {
            if (e3.on) {
              e3.on.removeEventListener(e3.trigger, e3.listener);
            }
          });
        }
        Ae(e2);
        oe(Object.keys(t2), function(e3) {
          delete t2[e3];
        });
      }
      function p(e2) {
        ce(e2, "htmx:beforeCleanupElement");
        Ne(e2);
        if (e2.children) {
          oe(e2.children, function(e3) {
            p(e3);
          });
        }
      }
      function Ie(t2, e2, r2) {
        if (t2.tagName === "BODY") {
          return Ue(t2, e2, r2);
        } else {
          var n2;
          var i2 = t2.previousSibling;
          m(u(t2), t2, e2, r2);
          if (i2 == null) {
            n2 = u(t2).firstChild;
          } else {
            n2 = i2.nextSibling;
          }
          r2.elts = r2.elts.filter(function(e3) {
            return e3 != t2;
          });
          while (n2 && n2 !== t2) {
            if (n2.nodeType === Node.ELEMENT_NODE) {
              r2.elts.push(n2);
            }
            n2 = n2.nextElementSibling;
          }
          p(t2);
          u(t2).removeChild(t2);
        }
      }
      function ke(e2, t2, r2) {
        return m(e2, e2.firstChild, t2, r2);
      }
      function Pe(e2, t2, r2) {
        return m(u(e2), e2, t2, r2);
      }
      function Me(e2, t2, r2) {
        return m(e2, null, t2, r2);
      }
      function Xe(e2, t2, r2) {
        return m(u(e2), e2.nextSibling, t2, r2);
      }
      function De(e2, t2, r2) {
        p(e2);
        return u(e2).removeChild(e2);
      }
      function Ue(e2, t2, r2) {
        var n2 = e2.firstChild;
        m(e2, n2, t2, r2);
        if (n2) {
          while (n2.nextSibling) {
            p(n2.nextSibling);
            e2.removeChild(n2.nextSibling);
          }
          p(n2);
          e2.removeChild(n2);
        }
      }
      function Be(e2, t2, r2) {
        var n2 = r2 || ne(e2, "hx-select");
        if (n2) {
          var i2 = re().createDocumentFragment();
          oe(t2.querySelectorAll(n2), function(e3) {
            i2.appendChild(e3);
          });
          t2 = i2;
        }
        return t2;
      }
      function Fe(e2, t2, r2, n2, i2) {
        switch (e2) {
          case "none":
            return;
          case "outerHTML":
            Ie(r2, n2, i2);
            return;
          case "afterbegin":
            ke(r2, n2, i2);
            return;
          case "beforebegin":
            Pe(r2, n2, i2);
            return;
          case "beforeend":
            Me(r2, n2, i2);
            return;
          case "afterend":
            Xe(r2, n2, i2);
            return;
          case "delete":
            De(r2, n2, i2);
            return;
          default:
            var a2 = Fr(t2);
            for (var o2 = 0;o2 < a2.length; o2++) {
              var s2 = a2[o2];
              try {
                var l2 = s2.handleSwap(e2, r2, n2, i2);
                if (l2) {
                  if (typeof l2.length !== "undefined") {
                    for (var u2 = 0;u2 < l2.length; u2++) {
                      var f2 = l2[u2];
                      if (f2.nodeType !== Node.TEXT_NODE && f2.nodeType !== Node.COMMENT_NODE) {
                        i2.tasks.push(Oe(f2));
                      }
                    }
                  }
                  return;
                }
              } catch (e3) {
                b(e3);
              }
            }
            if (e2 === "innerHTML") {
              Ue(r2, n2, i2);
            } else {
              Fe(Q.config.defaultSwapStyle, t2, r2, n2, i2);
            }
        }
      }
      function Ve(e2) {
        if (e2.indexOf("<title") > -1) {
          var t2 = e2.replace(H, "");
          var r2 = t2.match(q);
          if (r2) {
            return r2[2];
          }
        }
      }
      function je(e2, t2, r2, n2, i2, a2) {
        i2.title = Ve(n2);
        var o2 = l(n2);
        if (o2) {
          Ce(r2, o2, i2);
          o2 = Be(r2, o2, a2);
          Re(o2);
          return Fe(e2, r2, t2, o2, i2);
        }
      }
      function _e(e2, t2, r2) {
        var n2 = e2.getResponseHeader(t2);
        if (n2.indexOf("{") === 0) {
          var i2 = E(n2);
          for (var a2 in i2) {
            if (i2.hasOwnProperty(a2)) {
              var o2 = i2[a2];
              if (!P(o2)) {
                o2 = { value: o2 };
              }
              ce(r2, a2, o2);
            }
          }
        } else {
          var s2 = n2.split(",");
          for (var l2 = 0;l2 < s2.length; l2++) {
            ce(r2, s2[l2].trim(), []);
          }
        }
      }
      var ze = /\s/;
      var x = /[\s,]/;
      var $e = /[_$a-zA-Z]/;
      var We = /[_$a-zA-Z0-9]/;
      var Ge = ['"', "'", "/"];
      var Je = /[^\s]/;
      var Ze = /[{(]/;
      var Ke = /[})]/;
      function Ye(e2) {
        var t2 = [];
        var r2 = 0;
        while (r2 < e2.length) {
          if ($e.exec(e2.charAt(r2))) {
            var n2 = r2;
            while (We.exec(e2.charAt(r2 + 1))) {
              r2++;
            }
            t2.push(e2.substr(n2, r2 - n2 + 1));
          } else if (Ge.indexOf(e2.charAt(r2)) !== -1) {
            var i2 = e2.charAt(r2);
            var n2 = r2;
            r2++;
            while (r2 < e2.length && e2.charAt(r2) !== i2) {
              if (e2.charAt(r2) === "\\") {
                r2++;
              }
              r2++;
            }
            t2.push(e2.substr(n2, r2 - n2 + 1));
          } else {
            var a2 = e2.charAt(r2);
            t2.push(a2);
          }
          r2++;
        }
        return t2;
      }
      function Qe(e2, t2, r2) {
        return $e.exec(e2.charAt(0)) && e2 !== "true" && e2 !== "false" && e2 !== "this" && e2 !== r2 && t2 !== ".";
      }
      function et(e2, t2, r2) {
        if (t2[0] === "[") {
          t2.shift();
          var n2 = 1;
          var i2 = " return (function(" + r2 + "){ return (";
          var a2 = null;
          while (t2.length > 0) {
            var o2 = t2[0];
            if (o2 === "]") {
              n2--;
              if (n2 === 0) {
                if (a2 === null) {
                  i2 = i2 + "true";
                }
                t2.shift();
                i2 += ")})";
                try {
                  var s2 = Tr(e2, function() {
                    return Function(i2)();
                  }, function() {
                    return true;
                  });
                  s2.source = i2;
                  return s2;
                } catch (e3) {
                  fe(re().body, "htmx:syntax:error", { error: e3, source: i2 });
                  return null;
                }
              }
            } else if (o2 === "[") {
              n2++;
            }
            if (Qe(o2, a2, r2)) {
              i2 += "((" + r2 + "." + o2 + ") ? (" + r2 + "." + o2 + ") : (window." + o2 + "))";
            } else {
              i2 = i2 + o2;
            }
            a2 = t2.shift();
          }
        }
      }
      function y(e2, t2) {
        var r2 = "";
        while (e2.length > 0 && !t2.test(e2[0])) {
          r2 += e2.shift();
        }
        return r2;
      }
      function tt(e2) {
        var t2;
        if (e2.length > 0 && Ze.test(e2[0])) {
          e2.shift();
          t2 = y(e2, Ke).trim();
          e2.shift();
        } else {
          t2 = y(e2, x);
        }
        return t2;
      }
      var rt = "input, textarea, select";
      function nt(e2, t2, r2) {
        var n2 = [];
        var i2 = Ye(t2);
        do {
          y(i2, Je);
          var a2 = i2.length;
          var o2 = y(i2, /[,\[\s]/);
          if (o2 !== "") {
            if (o2 === "every") {
              var s2 = { trigger: "every" };
              y(i2, Je);
              s2.pollInterval = d(y(i2, /[,\[\s]/));
              y(i2, Je);
              var l2 = et(e2, i2, "event");
              if (l2) {
                s2.eventFilter = l2;
              }
              n2.push(s2);
            } else if (o2.indexOf("sse:") === 0) {
              n2.push({ trigger: "sse", sseEvent: o2.substr(4) });
            } else {
              var u2 = { trigger: o2 };
              var l2 = et(e2, i2, "event");
              if (l2) {
                u2.eventFilter = l2;
              }
              while (i2.length > 0 && i2[0] !== ",") {
                y(i2, Je);
                var f2 = i2.shift();
                if (f2 === "changed") {
                  u2.changed = true;
                } else if (f2 === "once") {
                  u2.once = true;
                } else if (f2 === "consume") {
                  u2.consume = true;
                } else if (f2 === "delay" && i2[0] === ":") {
                  i2.shift();
                  u2.delay = d(y(i2, x));
                } else if (f2 === "from" && i2[0] === ":") {
                  i2.shift();
                  if (Ze.test(i2[0])) {
                    var c3 = tt(i2);
                  } else {
                    var c3 = y(i2, x);
                    if (c3 === "closest" || c3 === "find" || c3 === "next" || c3 === "previous") {
                      i2.shift();
                      var h3 = tt(i2);
                      if (h3.length > 0) {
                        c3 += " " + h3;
                      }
                    }
                  }
                  u2.from = c3;
                } else if (f2 === "target" && i2[0] === ":") {
                  i2.shift();
                  u2.target = tt(i2);
                } else if (f2 === "throttle" && i2[0] === ":") {
                  i2.shift();
                  u2.throttle = d(y(i2, x));
                } else if (f2 === "queue" && i2[0] === ":") {
                  i2.shift();
                  u2.queue = y(i2, x);
                } else if (f2 === "root" && i2[0] === ":") {
                  i2.shift();
                  u2[f2] = tt(i2);
                } else if (f2 === "threshold" && i2[0] === ":") {
                  i2.shift();
                  u2[f2] = y(i2, x);
                } else {
                  fe(e2, "htmx:syntax:error", { token: i2.shift() });
                }
              }
              n2.push(u2);
            }
          }
          if (i2.length === a2) {
            fe(e2, "htmx:syntax:error", { token: i2.shift() });
          }
          y(i2, Je);
        } while (i2[0] === "," && i2.shift());
        if (r2) {
          r2[t2] = n2;
        }
        return n2;
      }
      function it(e2) {
        var t2 = te(e2, "hx-trigger");
        var r2 = [];
        if (t2) {
          var n2 = Q.config.triggerSpecsCache;
          r2 = n2 && n2[t2] || nt(e2, t2, n2);
        }
        if (r2.length > 0) {
          return r2;
        } else if (h(e2, "form")) {
          return [{ trigger: "submit" }];
        } else if (h(e2, 'input[type="button"], input[type="submit"]')) {
          return [{ trigger: "click" }];
        } else if (h(e2, rt)) {
          return [{ trigger: "change" }];
        } else {
          return [{ trigger: "click" }];
        }
      }
      function at(e2) {
        ae(e2).cancelled = true;
      }
      function ot(e2, t2, r2) {
        var n2 = ae(e2);
        n2.timeout = setTimeout(function() {
          if (se(e2) && n2.cancelled !== true) {
            if (!ct(r2, e2, Wt("hx:poll:trigger", { triggerSpec: r2, target: e2 }))) {
              t2(e2);
            }
            ot(e2, t2, r2);
          }
        }, r2.pollInterval);
      }
      function st(e2) {
        return location.hostname === e2.hostname && ee(e2, "href") && ee(e2, "href").indexOf("#") !== 0;
      }
      function lt(t2, r2, e2) {
        if (t2.tagName === "A" && st(t2) && (t2.target === "" || t2.target === "_self") || t2.tagName === "FORM") {
          r2.boosted = true;
          var n2, i2;
          if (t2.tagName === "A") {
            n2 = "get";
            i2 = ee(t2, "href");
          } else {
            var a2 = ee(t2, "method");
            n2 = a2 ? a2.toLowerCase() : "get";
            if (n2 === "get") {
            }
            i2 = ee(t2, "action");
          }
          e2.forEach(function(e3) {
            ht(t2, function(e4, t3) {
              if (v(e4, Q.config.disableSelector)) {
                p(e4);
                return;
              }
              he(n2, i2, e4, t3);
            }, r2, e3, true);
          });
        }
      }
      function ut(e2, t2) {
        if (e2.type === "submit" || e2.type === "click") {
          if (t2.tagName === "FORM") {
            return true;
          }
          if (h(t2, 'input[type="submit"], button') && v(t2, "form") !== null) {
            return true;
          }
          if (t2.tagName === "A" && t2.href && (t2.getAttribute("href") === "#" || t2.getAttribute("href").indexOf("#") !== 0)) {
            return true;
          }
        }
        return false;
      }
      function ft(e2, t2) {
        return ae(e2).boosted && e2.tagName === "A" && t2.type === "click" && (t2.ctrlKey || t2.metaKey);
      }
      function ct(e2, t2, r2) {
        var n2 = e2.eventFilter;
        if (n2) {
          try {
            return n2.call(t2, r2) !== true;
          } catch (e3) {
            fe(re().body, "htmx:eventFilter:error", { error: e3, source: n2.source });
            return true;
          }
        }
        return false;
      }
      function ht(a2, o2, e2, s2, l2) {
        var u2 = ae(a2);
        var t2;
        if (s2.from) {
          t2 = Z(a2, s2.from);
        } else {
          t2 = [a2];
        }
        if (s2.changed) {
          t2.forEach(function(e3) {
            var t3 = ae(e3);
            t3.lastValue = e3.value;
          });
        }
        oe(t2, function(n2) {
          var i2 = function(e3) {
            if (!se(a2)) {
              n2.removeEventListener(s2.trigger, i2);
              return;
            }
            if (ft(a2, e3)) {
              return;
            }
            if (l2 || ut(e3, a2)) {
              e3.preventDefault();
            }
            if (ct(s2, a2, e3)) {
              return;
            }
            var t3 = ae(e3);
            t3.triggerSpec = s2;
            if (t3.handledFor == null) {
              t3.handledFor = [];
            }
            if (t3.handledFor.indexOf(a2) < 0) {
              t3.handledFor.push(a2);
              if (s2.consume) {
                e3.stopPropagation();
              }
              if (s2.target && e3.target) {
                if (!h(e3.target, s2.target)) {
                  return;
                }
              }
              if (s2.once) {
                if (u2.triggeredOnce) {
                  return;
                } else {
                  u2.triggeredOnce = true;
                }
              }
              if (s2.changed) {
                var r2 = ae(n2);
                if (r2.lastValue === n2.value) {
                  return;
                }
                r2.lastValue = n2.value;
              }
              if (u2.delayed) {
                clearTimeout(u2.delayed);
              }
              if (u2.throttle) {
                return;
              }
              if (s2.throttle > 0) {
                if (!u2.throttle) {
                  o2(a2, e3);
                  u2.throttle = setTimeout(function() {
                    u2.throttle = null;
                  }, s2.throttle);
                }
              } else if (s2.delay > 0) {
                u2.delayed = setTimeout(function() {
                  o2(a2, e3);
                }, s2.delay);
              } else {
                ce(a2, "htmx:trigger");
                o2(a2, e3);
              }
            }
          };
          if (e2.listenerInfos == null) {
            e2.listenerInfos = [];
          }
          e2.listenerInfos.push({ trigger: s2.trigger, listener: i2, on: n2 });
          n2.addEventListener(s2.trigger, i2);
        });
      }
      var vt = false;
      var dt = null;
      function gt() {
        if (!dt) {
          dt = function() {
            vt = true;
          };
          window.addEventListener("scroll", dt);
          setInterval(function() {
            if (vt) {
              vt = false;
              oe(re().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(e2) {
                mt(e2);
              });
            }
          }, 200);
        }
      }
      function mt(t2) {
        if (!o(t2, "data-hx-revealed") && X(t2)) {
          t2.setAttribute("data-hx-revealed", "true");
          var e2 = ae(t2);
          if (e2.initHash) {
            ce(t2, "revealed");
          } else {
            t2.addEventListener("htmx:afterProcessNode", function(e3) {
              ce(t2, "revealed");
            }, { once: true });
          }
        }
      }
      function pt(e2, t2, r2) {
        var n2 = D(r2);
        for (var i2 = 0;i2 < n2.length; i2++) {
          var a2 = n2[i2].split(/:(.+)/);
          if (a2[0] === "connect") {
            xt(e2, a2[1], 0);
          }
          if (a2[0] === "send") {
            bt(e2);
          }
        }
      }
      function xt(s2, r2, n2) {
        if (!se(s2)) {
          return;
        }
        if (r2.indexOf("/") == 0) {
          var e2 = location.hostname + (location.port ? ":" + location.port : "");
          if (location.protocol == "https:") {
            r2 = "wss://" + e2 + r2;
          } else if (location.protocol == "http:") {
            r2 = "ws://" + e2 + r2;
          }
        }
        var t2 = Q.createWebSocket(r2);
        t2.onerror = function(e3) {
          fe(s2, "htmx:wsError", { error: e3, socket: t2 });
          yt(s2);
        };
        t2.onclose = function(e3) {
          if ([1006, 1012, 1013].indexOf(e3.code) >= 0) {
            var t3 = wt(n2);
            setTimeout(function() {
              xt(s2, r2, n2 + 1);
            }, t3);
          }
        };
        t2.onopen = function(e3) {
          n2 = 0;
        };
        ae(s2).webSocket = t2;
        t2.addEventListener("message", function(e3) {
          if (yt(s2)) {
            return;
          }
          var t3 = e3.data;
          R(s2, function(e4) {
            t3 = e4.transformResponse(t3, null, s2);
          });
          var r3 = T(s2);
          var n3 = l(t3);
          var i2 = M(n3.children);
          for (var a2 = 0;a2 < i2.length; a2++) {
            var o2 = i2[a2];
            Ee(te(o2, "hx-swap-oob") || "true", o2, r3);
          }
          nr(r3.tasks);
        });
      }
      function yt(e2) {
        if (!se(e2)) {
          ae(e2).webSocket.close();
          return true;
        }
      }
      function bt(u2) {
        var f2 = c(u2, function(e2) {
          return ae(e2).webSocket != null;
        });
        if (f2) {
          u2.addEventListener(it(u2)[0].trigger, function(e2) {
            var t2 = ae(f2).webSocket;
            var r2 = xr(u2, f2);
            var n2 = dr(u2, "post");
            var i2 = n2.errors;
            var a2 = n2.values;
            var o2 = Hr(u2);
            var s2 = le(a2, o2);
            var l2 = yr(s2, u2);
            l2["HEADERS"] = r2;
            if (i2 && i2.length > 0) {
              ce(u2, "htmx:validation:halted", i2);
              return;
            }
            t2.send(JSON.stringify(l2));
            if (ut(e2, u2)) {
              e2.preventDefault();
            }
          });
        } else {
          fe(u2, "htmx:noWebSocketSourceError");
        }
      }
      function wt(e2) {
        var t2 = Q.config.wsReconnectDelay;
        if (typeof t2 === "function") {
          return t2(e2);
        }
        if (t2 === "full-jitter") {
          var r2 = Math.min(e2, 6);
          var n2 = 1000 * Math.pow(2, r2);
          return n2 * Math.random();
        }
        b('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
      }
      function St(e2, t2, r2) {
        var n2 = D(r2);
        for (var i2 = 0;i2 < n2.length; i2++) {
          var a2 = n2[i2].split(/:(.+)/);
          if (a2[0] === "connect") {
            Et(e2, a2[1]);
          }
          if (a2[0] === "swap") {
            Ct(e2, a2[1]);
          }
        }
      }
      function Et(t2, e2) {
        var r2 = Q.createEventSource(e2);
        r2.onerror = function(e3) {
          fe(t2, "htmx:sseError", { error: e3, source: r2 });
          Tt(t2);
        };
        ae(t2).sseEventSource = r2;
      }
      function Ct(a2, o2) {
        var s2 = c(a2, Ot);
        if (s2) {
          var l2 = ae(s2).sseEventSource;
          var u2 = function(e2) {
            if (Tt(s2)) {
              return;
            }
            if (!se(a2)) {
              l2.removeEventListener(o2, u2);
              return;
            }
            var t2 = e2.data;
            R(a2, function(e3) {
              t2 = e3.transformResponse(t2, null, a2);
            });
            var r2 = wr(a2);
            var n2 = ye(a2);
            var i2 = T(a2);
            je(r2.swapStyle, n2, a2, t2, i2);
            nr(i2.tasks);
            ce(a2, "htmx:sseMessage", e2);
          };
          ae(a2).sseListener = u2;
          l2.addEventListener(o2, u2);
        } else {
          fe(a2, "htmx:noSSESourceError");
        }
      }
      function Rt(e2, t2, r2) {
        var n2 = c(e2, Ot);
        if (n2) {
          var i2 = ae(n2).sseEventSource;
          var a2 = function() {
            if (!Tt(n2)) {
              if (se(e2)) {
                t2(e2);
              } else {
                i2.removeEventListener(r2, a2);
              }
            }
          };
          ae(e2).sseListener = a2;
          i2.addEventListener(r2, a2);
        } else {
          fe(e2, "htmx:noSSESourceError");
        }
      }
      function Tt(e2) {
        if (!se(e2)) {
          ae(e2).sseEventSource.close();
          return true;
        }
      }
      function Ot(e2) {
        return ae(e2).sseEventSource != null;
      }
      function qt(e2, t2, r2, n2) {
        var i2 = function() {
          if (!r2.loaded) {
            r2.loaded = true;
            t2(e2);
          }
        };
        if (n2 > 0) {
          setTimeout(i2, n2);
        } else {
          i2();
        }
      }
      function Ht(t2, i2, e2) {
        var a2 = false;
        oe(w, function(r2) {
          if (o(t2, "hx-" + r2)) {
            var n2 = te(t2, "hx-" + r2);
            a2 = true;
            i2.path = n2;
            i2.verb = r2;
            e2.forEach(function(e3) {
              Lt(t2, e3, i2, function(e4, t3) {
                if (v(e4, Q.config.disableSelector)) {
                  p(e4);
                  return;
                }
                he(r2, n2, e4, t3);
              });
            });
          }
        });
        return a2;
      }
      function Lt(n2, e2, t2, r2) {
        if (e2.sseEvent) {
          Rt(n2, r2, e2.sseEvent);
        } else if (e2.trigger === "revealed") {
          gt();
          ht(n2, r2, t2, e2);
          mt(n2);
        } else if (e2.trigger === "intersect") {
          var i2 = {};
          if (e2.root) {
            i2.root = ue(n2, e2.root);
          }
          if (e2.threshold) {
            i2.threshold = parseFloat(e2.threshold);
          }
          var a2 = new IntersectionObserver(function(e3) {
            for (var t3 = 0;t3 < e3.length; t3++) {
              var r3 = e3[t3];
              if (r3.isIntersecting) {
                ce(n2, "intersect");
                break;
              }
            }
          }, i2);
          a2.observe(n2);
          ht(n2, r2, t2, e2);
        } else if (e2.trigger === "load") {
          if (!ct(e2, n2, Wt("load", { elt: n2 }))) {
            qt(n2, r2, t2, e2.delay);
          }
        } else if (e2.pollInterval > 0) {
          t2.polling = true;
          ot(n2, r2, e2);
        } else {
          ht(n2, r2, t2, e2);
        }
      }
      function At(e2) {
        if (Q.config.allowScriptTags && (e2.type === "text/javascript" || e2.type === "module" || e2.type === "")) {
          var t2 = re().createElement("script");
          oe(e2.attributes, function(e3) {
            t2.setAttribute(e3.name, e3.value);
          });
          t2.textContent = e2.textContent;
          t2.async = false;
          if (Q.config.inlineScriptNonce) {
            t2.nonce = Q.config.inlineScriptNonce;
          }
          var r2 = e2.parentElement;
          try {
            r2.insertBefore(t2, e2);
          } catch (e3) {
            b(e3);
          } finally {
            if (e2.parentElement) {
              e2.parentElement.removeChild(e2);
            }
          }
        }
      }
      function Nt(e2) {
        if (h(e2, "script")) {
          At(e2);
        }
        oe(f(e2, "script"), function(e3) {
          At(e3);
        });
      }
      function It(e2) {
        var t2 = e2.attributes;
        for (var r2 = 0;r2 < t2.length; r2++) {
          var n2 = t2[r2].name;
          if (s(n2, "hx-on:") || s(n2, "data-hx-on:") || s(n2, "hx-on-") || s(n2, "data-hx-on-")) {
            return true;
          }
        }
        return false;
      }
      function kt(e2) {
        var t2 = null;
        var r2 = [];
        if (It(e2)) {
          r2.push(e2);
        }
        if (document.evaluate) {
          var n2 = document.evaluate('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]', e2);
          while (t2 = n2.iterateNext())
            r2.push(t2);
        } else {
          var i2 = e2.getElementsByTagName("*");
          for (var a2 = 0;a2 < i2.length; a2++) {
            if (It(i2[a2])) {
              r2.push(i2[a2]);
            }
          }
        }
        return r2;
      }
      function Pt(e2) {
        if (e2.querySelectorAll) {
          var t2 = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
          var r2 = e2.querySelectorAll(i + t2 + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
          return r2;
        } else {
          return [];
        }
      }
      function Mt(e2) {
        var t2 = v(e2.target, "button, input[type='submit']");
        var r2 = Dt(e2);
        if (r2) {
          r2.lastButtonClicked = t2;
        }
      }
      function Xt(e2) {
        var t2 = Dt(e2);
        if (t2) {
          t2.lastButtonClicked = null;
        }
      }
      function Dt(e2) {
        var t2 = v(e2.target, "button, input[type='submit']");
        if (!t2) {
          return;
        }
        var r2 = g("#" + ee(t2, "form")) || v(t2, "form");
        if (!r2) {
          return;
        }
        return ae(r2);
      }
      function Ut(e2) {
        e2.addEventListener("click", Mt);
        e2.addEventListener("focusin", Mt);
        e2.addEventListener("focusout", Xt);
      }
      function Bt(e2) {
        var t2 = Ye(e2);
        var r2 = 0;
        for (var n2 = 0;n2 < t2.length; n2++) {
          const i2 = t2[n2];
          if (i2 === "{") {
            r2++;
          } else if (i2 === "}") {
            r2--;
          }
        }
        return r2;
      }
      function Ft(t2, e2, r2) {
        var n2 = ae(t2);
        if (!Array.isArray(n2.onHandlers)) {
          n2.onHandlers = [];
        }
        var i2;
        var a2 = function(e3) {
          return Tr(t2, function() {
            if (!i2) {
              i2 = new Function("event", r2);
            }
            i2.call(t2, e3);
          });
        };
        t2.addEventListener(e2, a2);
        n2.onHandlers.push({ event: e2, listener: a2 });
      }
      function Vt(e2) {
        var t2 = te(e2, "hx-on");
        if (t2) {
          var r2 = {};
          var n2 = t2.split("\n");
          var i2 = null;
          var a2 = 0;
          while (n2.length > 0) {
            var o2 = n2.shift();
            var s2 = o2.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
            if (a2 === 0 && s2) {
              o2.split(":");
              i2 = s2[1].slice(0, -1);
              r2[i2] = s2[2];
            } else {
              r2[i2] += o2;
            }
            a2 += Bt(o2);
          }
          for (var l2 in r2) {
            Ft(e2, l2, r2[l2]);
          }
        }
      }
      function jt(e2) {
        Ae(e2);
        for (var t2 = 0;t2 < e2.attributes.length; t2++) {
          var r2 = e2.attributes[t2].name;
          var n2 = e2.attributes[t2].value;
          if (s(r2, "hx-on") || s(r2, "data-hx-on")) {
            var i2 = r2.indexOf("-on") + 3;
            var a2 = r2.slice(i2, i2 + 1);
            if (a2 === "-" || a2 === ":") {
              var o2 = r2.slice(i2 + 1);
              if (s(o2, ":")) {
                o2 = "htmx" + o2;
              } else if (s(o2, "-")) {
                o2 = "htmx:" + o2.slice(1);
              } else if (s(o2, "htmx-")) {
                o2 = "htmx:" + o2.slice(5);
              }
              Ft(e2, o2, n2);
            }
          }
        }
      }
      function _t(t2) {
        if (v(t2, Q.config.disableSelector)) {
          p(t2);
          return;
        }
        var r2 = ae(t2);
        if (r2.initHash !== Le(t2)) {
          Ne(t2);
          r2.initHash = Le(t2);
          Vt(t2);
          ce(t2, "htmx:beforeProcessNode");
          if (t2.value) {
            r2.lastValue = t2.value;
          }
          var e2 = it(t2);
          var n2 = Ht(t2, r2, e2);
          if (!n2) {
            if (ne(t2, "hx-boost") === "true") {
              lt(t2, r2, e2);
            } else if (o(t2, "hx-trigger")) {
              e2.forEach(function(e3) {
                Lt(t2, e3, r2, function() {
                });
              });
            }
          }
          if (t2.tagName === "FORM" || ee(t2, "type") === "submit" && o(t2, "form")) {
            Ut(t2);
          }
          var i2 = te(t2, "hx-sse");
          if (i2) {
            St(t2, r2, i2);
          }
          var a2 = te(t2, "hx-ws");
          if (a2) {
            pt(t2, r2, a2);
          }
          ce(t2, "htmx:afterProcessNode");
        }
      }
      function zt(e2) {
        e2 = g(e2);
        if (v(e2, Q.config.disableSelector)) {
          p(e2);
          return;
        }
        _t(e2);
        oe(Pt(e2), function(e3) {
          _t(e3);
        });
        oe(kt(e2), jt);
      }
      function $t(e2) {
        return e2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Wt(e2, t2) {
        var r2;
        if (window.CustomEvent && typeof window.CustomEvent === "function") {
          r2 = new CustomEvent(e2, { bubbles: true, cancelable: true, detail: t2 });
        } else {
          r2 = re().createEvent("CustomEvent");
          r2.initCustomEvent(e2, true, true, t2);
        }
        return r2;
      }
      function fe(e2, t2, r2) {
        ce(e2, t2, le({ error: t2 }, r2));
      }
      function Gt(e2) {
        return e2 === "htmx:afterProcessNode";
      }
      function R(e2, t2) {
        oe(Fr(e2), function(e3) {
          try {
            t2(e3);
          } catch (e4) {
            b(e4);
          }
        });
      }
      function b(e2) {
        if (console.error) {
          console.error(e2);
        } else if (console.log) {
          console.log("ERROR: ", e2);
        }
      }
      function ce(e2, t2, r2) {
        e2 = g(e2);
        if (r2 == null) {
          r2 = {};
        }
        r2["elt"] = e2;
        var n2 = Wt(t2, r2);
        if (Q.logger && !Gt(t2)) {
          Q.logger(e2, t2, r2);
        }
        if (r2.error) {
          b(r2.error);
          ce(e2, "htmx:error", { errorInfo: r2 });
        }
        var i2 = e2.dispatchEvent(n2);
        var a2 = $t(t2);
        if (i2 && a2 !== t2) {
          var o2 = Wt(a2, n2.detail);
          i2 = i2 && e2.dispatchEvent(o2);
        }
        R(e2, function(e3) {
          i2 = i2 && (e3.onEvent(t2, n2) !== false && !n2.defaultPrevented);
        });
        return i2;
      }
      var Jt = location.pathname + location.search;
      function Zt() {
        var e2 = re().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return e2 || re().body;
      }
      function Kt(e2, t2, r2, n2) {
        if (!U()) {
          return;
        }
        if (Q.config.historyCacheSize <= 0) {
          localStorage.removeItem("htmx-history-cache");
          return;
        }
        e2 = B(e2);
        var i2 = E(localStorage.getItem("htmx-history-cache")) || [];
        for (var a2 = 0;a2 < i2.length; a2++) {
          if (i2[a2].url === e2) {
            i2.splice(a2, 1);
            break;
          }
        }
        var o2 = { url: e2, content: t2, title: r2, scroll: n2 };
        ce(re().body, "htmx:historyItemCreated", { item: o2, cache: i2 });
        i2.push(o2);
        while (i2.length > Q.config.historyCacheSize) {
          i2.shift();
        }
        while (i2.length > 0) {
          try {
            localStorage.setItem("htmx-history-cache", JSON.stringify(i2));
            break;
          } catch (e3) {
            fe(re().body, "htmx:historyCacheError", { cause: e3, cache: i2 });
            i2.shift();
          }
        }
      }
      function Yt(e2) {
        if (!U()) {
          return null;
        }
        e2 = B(e2);
        var t2 = E(localStorage.getItem("htmx-history-cache")) || [];
        for (var r2 = 0;r2 < t2.length; r2++) {
          if (t2[r2].url === e2) {
            return t2[r2];
          }
        }
        return null;
      }
      function Qt(e2) {
        var t2 = Q.config.requestClass;
        var r2 = e2.cloneNode(true);
        oe(f(r2, "." + t2), function(e3) {
          n(e3, t2);
        });
        return r2.innerHTML;
      }
      function er() {
        var e2 = Zt();
        var t2 = Jt || location.pathname + location.search;
        var r2;
        try {
          r2 = re().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch (e3) {
          r2 = re().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        if (!r2) {
          ce(re().body, "htmx:beforeHistorySave", { path: t2, historyElt: e2 });
          Kt(t2, Qt(e2), re().title, window.scrollY);
        }
        if (Q.config.historyEnabled)
          history.replaceState({ htmx: true }, re().title, window.location.href);
      }
      function tr(e2) {
        if (Q.config.getCacheBusterParam) {
          e2 = e2.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
          if (G(e2, "&") || G(e2, "?")) {
            e2 = e2.slice(0, -1);
          }
        }
        if (Q.config.historyEnabled) {
          history.pushState({ htmx: true }, "", e2);
        }
        Jt = e2;
      }
      function rr(e2) {
        if (Q.config.historyEnabled)
          history.replaceState({ htmx: true }, "", e2);
        Jt = e2;
      }
      function nr(e2) {
        oe(e2, function(e3) {
          e3.call();
        });
      }
      function ir(a2) {
        var e2 = new XMLHttpRequest;
        var o2 = { path: a2, xhr: e2 };
        ce(re().body, "htmx:historyCacheMiss", o2);
        e2.open("GET", a2, true);
        e2.setRequestHeader("HX-Request", "true");
        e2.setRequestHeader("HX-History-Restore-Request", "true");
        e2.setRequestHeader("HX-Current-URL", re().location.href);
        e2.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            ce(re().body, "htmx:historyCacheMissLoad", o2);
            var e3 = l(this.response);
            e3 = e3.querySelector("[hx-history-elt],[data-hx-history-elt]") || e3;
            var t2 = Zt();
            var r2 = T(t2);
            var n2 = Ve(this.response);
            if (n2) {
              var i2 = C("title");
              if (i2) {
                i2.innerHTML = n2;
              } else {
                window.document.title = n2;
              }
            }
            Ue(t2, e3, r2);
            nr(r2.tasks);
            Jt = a2;
            ce(re().body, "htmx:historyRestore", { path: a2, cacheMiss: true, serverResponse: this.response });
          } else {
            fe(re().body, "htmx:historyCacheMissLoadError", o2);
          }
        };
        e2.send();
      }
      function ar(e2) {
        er();
        e2 = e2 || location.pathname + location.search;
        var t2 = Yt(e2);
        if (t2) {
          var r2 = l(t2.content);
          var n2 = Zt();
          var i2 = T(n2);
          Ue(n2, r2, i2);
          nr(i2.tasks);
          document.title = t2.title;
          setTimeout(function() {
            window.scrollTo(0, t2.scroll);
          }, 0);
          Jt = e2;
          ce(re().body, "htmx:historyRestore", { path: e2, item: t2 });
        } else {
          if (Q.config.refreshOnHistoryMiss) {
            window.location.reload(true);
          } else {
            ir(e2);
          }
        }
      }
      function or(e2) {
        var t2 = pe(e2, "hx-indicator");
        if (t2 == null) {
          t2 = [e2];
        }
        oe(t2, function(e3) {
          var t3 = ae(e3);
          t3.requestCount = (t3.requestCount || 0) + 1;
          e3.classList["add"].call(e3.classList, Q.config.requestClass);
        });
        return t2;
      }
      function sr(e2) {
        var t2 = pe(e2, "hx-disabled-elt");
        if (t2 == null) {
          t2 = [];
        }
        oe(t2, function(e3) {
          var t3 = ae(e3);
          t3.requestCount = (t3.requestCount || 0) + 1;
          e3.setAttribute("disabled", "");
        });
        return t2;
      }
      function lr(e2, t2) {
        oe(e2, function(e3) {
          var t3 = ae(e3);
          t3.requestCount = (t3.requestCount || 0) - 1;
          if (t3.requestCount === 0) {
            e3.classList["remove"].call(e3.classList, Q.config.requestClass);
          }
        });
        oe(t2, function(e3) {
          var t3 = ae(e3);
          t3.requestCount = (t3.requestCount || 0) - 1;
          if (t3.requestCount === 0) {
            e3.removeAttribute("disabled");
          }
        });
      }
      function ur(e2, t2) {
        for (var r2 = 0;r2 < e2.length; r2++) {
          var n2 = e2[r2];
          if (n2.isSameNode(t2)) {
            return true;
          }
        }
        return false;
      }
      function fr(e2) {
        if (e2.name === "" || e2.name == null || e2.disabled || v(e2, "fieldset[disabled]")) {
          return false;
        }
        if (e2.type === "button" || e2.type === "submit" || e2.tagName === "image" || e2.tagName === "reset" || e2.tagName === "file") {
          return false;
        }
        if (e2.type === "checkbox" || e2.type === "radio") {
          return e2.checked;
        }
        return true;
      }
      function cr(e2, t2, r2) {
        if (e2 != null && t2 != null) {
          var n2 = r2[e2];
          if (n2 === undefined) {
            r2[e2] = t2;
          } else if (Array.isArray(n2)) {
            if (Array.isArray(t2)) {
              r2[e2] = n2.concat(t2);
            } else {
              n2.push(t2);
            }
          } else {
            if (Array.isArray(t2)) {
              r2[e2] = [n2].concat(t2);
            } else {
              r2[e2] = [n2, t2];
            }
          }
        }
      }
      function hr(t2, r2, n2, e2, i2) {
        if (e2 == null || ur(t2, e2)) {
          return;
        } else {
          t2.push(e2);
        }
        if (fr(e2)) {
          var a2 = ee(e2, "name");
          var o2 = e2.value;
          if (e2.multiple && e2.tagName === "SELECT") {
            o2 = M(e2.querySelectorAll("option:checked")).map(function(e3) {
              return e3.value;
            });
          }
          if (e2.files) {
            o2 = M(e2.files);
          }
          cr(a2, o2, r2);
          if (i2) {
            vr(e2, n2);
          }
        }
        if (h(e2, "form")) {
          var s2 = e2.elements;
          oe(s2, function(e3) {
            hr(t2, r2, n2, e3, i2);
          });
        }
      }
      function vr(e2, t2) {
        if (e2.willValidate) {
          ce(e2, "htmx:validation:validate");
          if (!e2.checkValidity()) {
            t2.push({ elt: e2, message: e2.validationMessage, validity: e2.validity });
            ce(e2, "htmx:validation:failed", { message: e2.validationMessage, validity: e2.validity });
          }
        }
      }
      function dr(e2, t2) {
        var r2 = [];
        var n2 = {};
        var i2 = {};
        var a2 = [];
        var o2 = ae(e2);
        if (o2.lastButtonClicked && !se(o2.lastButtonClicked)) {
          o2.lastButtonClicked = null;
        }
        var s2 = h(e2, "form") && e2.noValidate !== true || te(e2, "hx-validate") === "true";
        if (o2.lastButtonClicked) {
          s2 = s2 && o2.lastButtonClicked.formNoValidate !== true;
        }
        if (t2 !== "get") {
          hr(r2, i2, a2, v(e2, "form"), s2);
        }
        hr(r2, n2, a2, e2, s2);
        if (o2.lastButtonClicked || e2.tagName === "BUTTON" || e2.tagName === "INPUT" && ee(e2, "type") === "submit") {
          var l2 = o2.lastButtonClicked || e2;
          var u2 = ee(l2, "name");
          cr(u2, l2.value, i2);
        }
        var f2 = pe(e2, "hx-include");
        oe(f2, function(e3) {
          hr(r2, n2, a2, e3, s2);
          if (!h(e3, "form")) {
            oe(e3.querySelectorAll(rt), function(e4) {
              hr(r2, n2, a2, e4, s2);
            });
          }
        });
        n2 = le(n2, i2);
        return { errors: a2, values: n2 };
      }
      function gr(e2, t2, r2) {
        if (e2 !== "") {
          e2 += "&";
        }
        if (String(r2) === "[object Object]") {
          r2 = JSON.stringify(r2);
        }
        var n2 = encodeURIComponent(r2);
        e2 += encodeURIComponent(t2) + "=" + n2;
        return e2;
      }
      function mr(e2) {
        var t2 = "";
        for (var r2 in e2) {
          if (e2.hasOwnProperty(r2)) {
            var n2 = e2[r2];
            if (Array.isArray(n2)) {
              oe(n2, function(e3) {
                t2 = gr(t2, r2, e3);
              });
            } else {
              t2 = gr(t2, r2, n2);
            }
          }
        }
        return t2;
      }
      function pr(e2) {
        var t2 = new FormData;
        for (var r2 in e2) {
          if (e2.hasOwnProperty(r2)) {
            var n2 = e2[r2];
            if (Array.isArray(n2)) {
              oe(n2, function(e3) {
                t2.append(r2, e3);
              });
            } else {
              t2.append(r2, n2);
            }
          }
        }
        return t2;
      }
      function xr(e2, t2, r2) {
        var n2 = { "HX-Request": "true", "HX-Trigger": ee(e2, "id"), "HX-Trigger-Name": ee(e2, "name"), "HX-Target": te(t2, "id"), "HX-Current-URL": re().location.href };
        Rr(e2, "hx-headers", false, n2);
        if (r2 !== undefined) {
          n2["HX-Prompt"] = r2;
        }
        if (ae(e2).boosted) {
          n2["HX-Boosted"] = "true";
        }
        return n2;
      }
      function yr(t2, e2) {
        var r2 = ne(e2, "hx-params");
        if (r2) {
          if (r2 === "none") {
            return {};
          } else if (r2 === "*") {
            return t2;
          } else if (r2.indexOf("not ") === 0) {
            oe(r2.substr(4).split(","), function(e3) {
              e3 = e3.trim();
              delete t2[e3];
            });
            return t2;
          } else {
            var n2 = {};
            oe(r2.split(","), function(e3) {
              e3 = e3.trim();
              n2[e3] = t2[e3];
            });
            return n2;
          }
        } else {
          return t2;
        }
      }
      function br(e2) {
        return ee(e2, "href") && ee(e2, "href").indexOf("#") >= 0;
      }
      function wr(e2, t2) {
        var r2 = t2 ? t2 : ne(e2, "hx-swap");
        var n2 = { swapStyle: ae(e2).boosted ? "innerHTML" : Q.config.defaultSwapStyle, swapDelay: Q.config.defaultSwapDelay, settleDelay: Q.config.defaultSettleDelay };
        if (Q.config.scrollIntoViewOnBoost && ae(e2).boosted && !br(e2)) {
          n2["show"] = "top";
        }
        if (r2) {
          var i2 = D(r2);
          if (i2.length > 0) {
            for (var a2 = 0;a2 < i2.length; a2++) {
              var o2 = i2[a2];
              if (o2.indexOf("swap:") === 0) {
                n2["swapDelay"] = d(o2.substr(5));
              } else if (o2.indexOf("settle:") === 0) {
                n2["settleDelay"] = d(o2.substr(7));
              } else if (o2.indexOf("transition:") === 0) {
                n2["transition"] = o2.substr(11) === "true";
              } else if (o2.indexOf("ignoreTitle:") === 0) {
                n2["ignoreTitle"] = o2.substr(12) === "true";
              } else if (o2.indexOf("scroll:") === 0) {
                var s2 = o2.substr(7);
                var l2 = s2.split(":");
                var u2 = l2.pop();
                var f2 = l2.length > 0 ? l2.join(":") : null;
                n2["scroll"] = u2;
                n2["scrollTarget"] = f2;
              } else if (o2.indexOf("show:") === 0) {
                var c3 = o2.substr(5);
                var l2 = c3.split(":");
                var h3 = l2.pop();
                var f2 = l2.length > 0 ? l2.join(":") : null;
                n2["show"] = h3;
                n2["showTarget"] = f2;
              } else if (o2.indexOf("focus-scroll:") === 0) {
                var v2 = o2.substr("focus-scroll:".length);
                n2["focusScroll"] = v2 == "true";
              } else if (a2 == 0) {
                n2["swapStyle"] = o2;
              } else {
                b("Unknown modifier in hx-swap: " + o2);
              }
            }
          }
        }
        return n2;
      }
      function Sr(e2) {
        return ne(e2, "hx-encoding") === "multipart/form-data" || h(e2, "form") && ee(e2, "enctype") === "multipart/form-data";
      }
      function Er(t2, r2, n2) {
        var i2 = null;
        R(r2, function(e2) {
          if (i2 == null) {
            i2 = e2.encodeParameters(t2, n2, r2);
          }
        });
        if (i2 != null) {
          return i2;
        } else {
          if (Sr(r2)) {
            return pr(n2);
          } else {
            return mr(n2);
          }
        }
      }
      function T(e2) {
        return { tasks: [], elts: [e2] };
      }
      function Cr(e2, t2) {
        var r2 = e2[0];
        var n2 = e2[e2.length - 1];
        if (t2.scroll) {
          var i2 = null;
          if (t2.scrollTarget) {
            i2 = ue(r2, t2.scrollTarget);
          }
          if (t2.scroll === "top" && (r2 || i2)) {
            i2 = i2 || r2;
            i2.scrollTop = 0;
          }
          if (t2.scroll === "bottom" && (n2 || i2)) {
            i2 = i2 || n2;
            i2.scrollTop = i2.scrollHeight;
          }
        }
        if (t2.show) {
          var i2 = null;
          if (t2.showTarget) {
            var a2 = t2.showTarget;
            if (t2.showTarget === "window") {
              a2 = "body";
            }
            i2 = ue(r2, a2);
          }
          if (t2.show === "top" && (r2 || i2)) {
            i2 = i2 || r2;
            i2.scrollIntoView({ block: "start", behavior: Q.config.scrollBehavior });
          }
          if (t2.show === "bottom" && (n2 || i2)) {
            i2 = i2 || n2;
            i2.scrollIntoView({ block: "end", behavior: Q.config.scrollBehavior });
          }
        }
      }
      function Rr(e2, t2, r2, n2) {
        if (n2 == null) {
          n2 = {};
        }
        if (e2 == null) {
          return n2;
        }
        var i2 = te(e2, t2);
        if (i2) {
          var a2 = i2.trim();
          var o2 = r2;
          if (a2 === "unset") {
            return null;
          }
          if (a2.indexOf("javascript:") === 0) {
            a2 = a2.substr(11);
            o2 = true;
          } else if (a2.indexOf("js:") === 0) {
            a2 = a2.substr(3);
            o2 = true;
          }
          if (a2.indexOf("{") !== 0) {
            a2 = "{" + a2 + "}";
          }
          var s2;
          if (o2) {
            s2 = Tr(e2, function() {
              return Function("return (" + a2 + ")")();
            }, {});
          } else {
            s2 = E(a2);
          }
          for (var l2 in s2) {
            if (s2.hasOwnProperty(l2)) {
              if (n2[l2] == null) {
                n2[l2] = s2[l2];
              }
            }
          }
        }
        return Rr(u(e2), t2, r2, n2);
      }
      function Tr(e2, t2, r2) {
        if (Q.config.allowEval) {
          return t2();
        } else {
          fe(e2, "htmx:evalDisallowedError");
          return r2;
        }
      }
      function Or(e2, t2) {
        return Rr(e2, "hx-vars", true, t2);
      }
      function qr(e2, t2) {
        return Rr(e2, "hx-vals", false, t2);
      }
      function Hr(e2) {
        return le(Or(e2), qr(e2));
      }
      function Lr(t2, r2, n2) {
        if (n2 !== null) {
          try {
            t2.setRequestHeader(r2, n2);
          } catch (e2) {
            t2.setRequestHeader(r2, encodeURIComponent(n2));
            t2.setRequestHeader(r2 + "-URI-AutoEncoded", "true");
          }
        }
      }
      function Ar(t2) {
        if (t2.responseURL && typeof URL !== "undefined") {
          try {
            var e2 = new URL(t2.responseURL);
            return e2.pathname + e2.search;
          } catch (e3) {
            fe(re().body, "htmx:badResponseUrl", { url: t2.responseURL });
          }
        }
      }
      function O(e2, t2) {
        return t2.test(e2.getAllResponseHeaders());
      }
      function Nr(e2, t2, r2) {
        e2 = e2.toLowerCase();
        if (r2) {
          if (r2 instanceof Element || I(r2, "String")) {
            return he(e2, t2, null, null, { targetOverride: g(r2), returnPromise: true });
          } else {
            return he(e2, t2, g(r2.source), r2.event, { handler: r2.handler, headers: r2.headers, values: r2.values, targetOverride: g(r2.target), swapOverride: r2.swap, select: r2.select, returnPromise: true });
          }
        } else {
          return he(e2, t2, null, null, { returnPromise: true });
        }
      }
      function Ir(e2) {
        var t2 = [];
        while (e2) {
          t2.push(e2);
          e2 = e2.parentElement;
        }
        return t2;
      }
      function kr(e2, t2, r2) {
        var n2;
        var i2;
        if (typeof URL === "function") {
          i2 = new URL(t2, document.location.href);
          var a2 = document.location.origin;
          n2 = a2 === i2.origin;
        } else {
          i2 = t2;
          n2 = s(t2, document.location.origin);
        }
        if (Q.config.selfRequestsOnly) {
          if (!n2) {
            return false;
          }
        }
        return ce(e2, "htmx:validateUrl", le({ url: i2, sameHost: n2 }, r2));
      }
      function he(t2, r2, n2, i2, a2, e2) {
        var o2 = null;
        var s2 = null;
        a2 = a2 != null ? a2 : {};
        if (a2.returnPromise && typeof Promise !== "undefined") {
          var l2 = new Promise(function(e3, t3) {
            o2 = e3;
            s2 = t3;
          });
        }
        if (n2 == null) {
          n2 = re().body;
        }
        var M3 = a2.handler || Mr;
        var X3 = a2.select || null;
        if (!se(n2)) {
          ie(o2);
          return l2;
        }
        var u2 = a2.targetOverride || ye(n2);
        if (u2 == null || u2 == me) {
          fe(n2, "htmx:targetError", { target: te(n2, "hx-target") });
          ie(s2);
          return l2;
        }
        var f2 = ae(n2);
        var c3 = f2.lastButtonClicked;
        if (c3) {
          var h3 = ee(c3, "formaction");
          if (h3 != null) {
            r2 = h3;
          }
          var v2 = ee(c3, "formmethod");
          if (v2 != null) {
            if (v2.toLowerCase() !== "dialog") {
              t2 = v2;
            }
          }
        }
        var d3 = ne(n2, "hx-confirm");
        if (e2 === undefined) {
          var D2 = function(e3) {
            return he(t2, r2, n2, i2, a2, !!e3);
          };
          var U3 = { target: u2, elt: n2, path: r2, verb: t2, triggeringEvent: i2, etc: a2, issueRequest: D2, question: d3 };
          if (ce(n2, "htmx:confirm", U3) === false) {
            ie(o2);
            return l2;
          }
        }
        var g2 = n2;
        var m2 = ne(n2, "hx-sync");
        var p2 = null;
        var x2 = false;
        if (m2) {
          var B3 = m2.split(":");
          var F3 = B3[0].trim();
          if (F3 === "this") {
            g2 = xe(n2, "hx-sync");
          } else {
            g2 = ue(n2, F3);
          }
          m2 = (B3[1] || "drop").trim();
          f2 = ae(g2);
          if (m2 === "drop" && f2.xhr && f2.abortable !== true) {
            ie(o2);
            return l2;
          } else if (m2 === "abort") {
            if (f2.xhr) {
              ie(o2);
              return l2;
            } else {
              x2 = true;
            }
          } else if (m2 === "replace") {
            ce(g2, "htmx:abort");
          } else if (m2.indexOf("queue") === 0) {
            var V3 = m2.split(" ");
            p2 = (V3[1] || "last").trim();
          }
        }
        if (f2.xhr) {
          if (f2.abortable) {
            ce(g2, "htmx:abort");
          } else {
            if (p2 == null) {
              if (i2) {
                var y2 = ae(i2);
                if (y2 && y2.triggerSpec && y2.triggerSpec.queue) {
                  p2 = y2.triggerSpec.queue;
                }
              }
              if (p2 == null) {
                p2 = "last";
              }
            }
            if (f2.queuedRequests == null) {
              f2.queuedRequests = [];
            }
            if (p2 === "first" && f2.queuedRequests.length === 0) {
              f2.queuedRequests.push(function() {
                he(t2, r2, n2, i2, a2);
              });
            } else if (p2 === "all") {
              f2.queuedRequests.push(function() {
                he(t2, r2, n2, i2, a2);
              });
            } else if (p2 === "last") {
              f2.queuedRequests = [];
              f2.queuedRequests.push(function() {
                he(t2, r2, n2, i2, a2);
              });
            }
            ie(o2);
            return l2;
          }
        }
        var b2 = new XMLHttpRequest;
        f2.xhr = b2;
        f2.abortable = x2;
        var w2 = function() {
          f2.xhr = null;
          f2.abortable = false;
          if (f2.queuedRequests != null && f2.queuedRequests.length > 0) {
            var e3 = f2.queuedRequests.shift();
            e3();
          }
        };
        var j3 = ne(n2, "hx-prompt");
        if (j3) {
          var S2 = prompt(j3);
          if (S2 === null || !ce(n2, "htmx:prompt", { prompt: S2, target: u2 })) {
            ie(o2);
            w2();
            return l2;
          }
        }
        if (d3 && !e2) {
          if (!confirm(d3)) {
            ie(o2);
            w2();
            return l2;
          }
        }
        var E2 = xr(n2, u2, S2);
        if (t2 !== "get" && !Sr(n2)) {
          E2["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (a2.headers) {
          E2 = le(E2, a2.headers);
        }
        var _2 = dr(n2, t2);
        var C2 = _2.errors;
        var R3 = _2.values;
        if (a2.values) {
          R3 = le(R3, a2.values);
        }
        var z3 = Hr(n2);
        var $3 = le(R3, z3);
        var T2 = yr($3, n2);
        if (Q.config.getCacheBusterParam && t2 === "get") {
          T2["org.htmx.cache-buster"] = ee(u2, "id") || "true";
        }
        if (r2 == null || r2 === "") {
          r2 = re().location.href;
        }
        var O2 = Rr(n2, "hx-request");
        var W3 = ae(n2).boosted;
        var q3 = Q.config.methodsThatUseUrlParams.indexOf(t2) >= 0;
        var H3 = { boosted: W3, useUrlParams: q3, parameters: T2, unfilteredParameters: $3, headers: E2, target: u2, verb: t2, errors: C2, withCredentials: a2.credentials || O2.credentials || Q.config.withCredentials, timeout: a2.timeout || O2.timeout || Q.config.timeout, path: r2, triggeringEvent: i2 };
        if (!ce(n2, "htmx:configRequest", H3)) {
          ie(o2);
          w2();
          return l2;
        }
        r2 = H3.path;
        t2 = H3.verb;
        E2 = H3.headers;
        T2 = H3.parameters;
        C2 = H3.errors;
        q3 = H3.useUrlParams;
        if (C2 && C2.length > 0) {
          ce(n2, "htmx:validation:halted", H3);
          ie(o2);
          w2();
          return l2;
        }
        var G2 = r2.split("#");
        var J3 = G2[0];
        var L2 = G2[1];
        var A3 = r2;
        if (q3) {
          A3 = J3;
          var Z3 = Object.keys(T2).length !== 0;
          if (Z3) {
            if (A3.indexOf("?") < 0) {
              A3 += "?";
            } else {
              A3 += "&";
            }
            A3 += mr(T2);
            if (L2) {
              A3 += "#" + L2;
            }
          }
        }
        if (!kr(n2, A3, H3)) {
          fe(n2, "htmx:invalidPath", H3);
          ie(s2);
          return l2;
        }
        b2.open(t2.toUpperCase(), A3, true);
        b2.overrideMimeType("text/html");
        b2.withCredentials = H3.withCredentials;
        b2.timeout = H3.timeout;
        if (O2.noHeaders) {
        } else {
          for (var N2 in E2) {
            if (E2.hasOwnProperty(N2)) {
              var K3 = E2[N2];
              Lr(b2, N2, K3);
            }
          }
        }
        var I3 = { xhr: b2, target: u2, requestConfig: H3, etc: a2, boosted: W3, select: X3, pathInfo: { requestPath: r2, finalRequestPath: A3, anchor: L2 } };
        b2.onload = function() {
          try {
            var e3 = Ir(n2);
            I3.pathInfo.responsePath = Ar(b2);
            M3(n2, I3);
            lr(k2, P2);
            ce(n2, "htmx:afterRequest", I3);
            ce(n2, "htmx:afterOnLoad", I3);
            if (!se(n2)) {
              var t3 = null;
              while (e3.length > 0 && t3 == null) {
                var r3 = e3.shift();
                if (se(r3)) {
                  t3 = r3;
                }
              }
              if (t3) {
                ce(t3, "htmx:afterRequest", I3);
                ce(t3, "htmx:afterOnLoad", I3);
              }
            }
            ie(o2);
            w2();
          } catch (e4) {
            fe(n2, "htmx:onLoadError", le({ error: e4 }, I3));
            throw e4;
          }
        };
        b2.onerror = function() {
          lr(k2, P2);
          fe(n2, "htmx:afterRequest", I3);
          fe(n2, "htmx:sendError", I3);
          ie(s2);
          w2();
        };
        b2.onabort = function() {
          lr(k2, P2);
          fe(n2, "htmx:afterRequest", I3);
          fe(n2, "htmx:sendAbort", I3);
          ie(s2);
          w2();
        };
        b2.ontimeout = function() {
          lr(k2, P2);
          fe(n2, "htmx:afterRequest", I3);
          fe(n2, "htmx:timeout", I3);
          ie(s2);
          w2();
        };
        if (!ce(n2, "htmx:beforeRequest", I3)) {
          ie(o2);
          w2();
          return l2;
        }
        var k2 = or(n2);
        var P2 = sr(n2);
        oe(["loadstart", "loadend", "progress", "abort"], function(t3) {
          oe([b2, b2.upload], function(e3) {
            e3.addEventListener(t3, function(e4) {
              ce(n2, "htmx:xhr:" + t3, { lengthComputable: e4.lengthComputable, loaded: e4.loaded, total: e4.total });
            });
          });
        });
        ce(n2, "htmx:beforeSend", I3);
        var Y3 = q3 ? null : Er(b2, n2, T2);
        b2.send(Y3);
        return l2;
      }
      function Pr(e2, t2) {
        var r2 = t2.xhr;
        var n2 = null;
        var i2 = null;
        if (O(r2, /HX-Push:/i)) {
          n2 = r2.getResponseHeader("HX-Push");
          i2 = "push";
        } else if (O(r2, /HX-Push-Url:/i)) {
          n2 = r2.getResponseHeader("HX-Push-Url");
          i2 = "push";
        } else if (O(r2, /HX-Replace-Url:/i)) {
          n2 = r2.getResponseHeader("HX-Replace-Url");
          i2 = "replace";
        }
        if (n2) {
          if (n2 === "false") {
            return {};
          } else {
            return { type: i2, path: n2 };
          }
        }
        var a2 = t2.pathInfo.finalRequestPath;
        var o2 = t2.pathInfo.responsePath;
        var s2 = ne(e2, "hx-push-url");
        var l2 = ne(e2, "hx-replace-url");
        var u2 = ae(e2).boosted;
        var f2 = null;
        var c3 = null;
        if (s2) {
          f2 = "push";
          c3 = s2;
        } else if (l2) {
          f2 = "replace";
          c3 = l2;
        } else if (u2) {
          f2 = "push";
          c3 = o2 || a2;
        }
        if (c3) {
          if (c3 === "false") {
            return {};
          }
          if (c3 === "true") {
            c3 = o2 || a2;
          }
          if (t2.pathInfo.anchor && c3.indexOf("#") === -1) {
            c3 = c3 + "#" + t2.pathInfo.anchor;
          }
          return { type: f2, path: c3 };
        } else {
          return {};
        }
      }
      function Mr(l2, u2) {
        var f2 = u2.xhr;
        var c3 = u2.target;
        var e2 = u2.etc;
        var t2 = u2.requestConfig;
        var h3 = u2.select;
        if (!ce(l2, "htmx:beforeOnLoad", u2))
          return;
        if (O(f2, /HX-Trigger:/i)) {
          _e(f2, "HX-Trigger", l2);
        }
        if (O(f2, /HX-Location:/i)) {
          er();
          var r2 = f2.getResponseHeader("HX-Location");
          var v2;
          if (r2.indexOf("{") === 0) {
            v2 = E(r2);
            r2 = v2["path"];
            delete v2["path"];
          }
          Nr("GET", r2, v2).then(function() {
            tr(r2);
          });
          return;
        }
        var n2 = O(f2, /HX-Refresh:/i) && f2.getResponseHeader("HX-Refresh") === "true";
        if (O(f2, /HX-Redirect:/i)) {
          location.href = f2.getResponseHeader("HX-Redirect");
          n2 && location.reload();
          return;
        }
        if (n2) {
          location.reload();
          return;
        }
        if (O(f2, /HX-Retarget:/i)) {
          if (f2.getResponseHeader("HX-Retarget") === "this") {
            u2.target = l2;
          } else {
            u2.target = ue(l2, f2.getResponseHeader("HX-Retarget"));
          }
        }
        var d3 = Pr(l2, u2);
        var i2 = f2.status >= 200 && f2.status < 400 && f2.status !== 204;
        var g2 = f2.response;
        var a2 = f2.status >= 400;
        var m2 = Q.config.ignoreTitle;
        var o2 = le({ shouldSwap: i2, serverResponse: g2, isError: a2, ignoreTitle: m2 }, u2);
        if (!ce(c3, "htmx:beforeSwap", o2))
          return;
        c3 = o2.target;
        g2 = o2.serverResponse;
        a2 = o2.isError;
        m2 = o2.ignoreTitle;
        u2.target = c3;
        u2.failed = a2;
        u2.successful = !a2;
        if (o2.shouldSwap) {
          if (f2.status === 286) {
            at(l2);
          }
          R(l2, function(e3) {
            g2 = e3.transformResponse(g2, f2, l2);
          });
          if (d3.type) {
            er();
          }
          var s2 = e2.swapOverride;
          if (O(f2, /HX-Reswap:/i)) {
            s2 = f2.getResponseHeader("HX-Reswap");
          }
          var v2 = wr(l2, s2);
          if (v2.hasOwnProperty("ignoreTitle")) {
            m2 = v2.ignoreTitle;
          }
          c3.classList.add(Q.config.swappingClass);
          var p2 = null;
          var x2 = null;
          var y2 = function() {
            try {
              var e3 = document.activeElement;
              var t3 = {};
              try {
                t3 = { elt: e3, start: e3 ? e3.selectionStart : null, end: e3 ? e3.selectionEnd : null };
              } catch (e4) {
              }
              var r3;
              if (h3) {
                r3 = h3;
              }
              if (O(f2, /HX-Reselect:/i)) {
                r3 = f2.getResponseHeader("HX-Reselect");
              }
              if (d3.type) {
                ce(re().body, "htmx:beforeHistoryUpdate", le({ history: d3 }, u2));
                if (d3.type === "push") {
                  tr(d3.path);
                  ce(re().body, "htmx:pushedIntoHistory", { path: d3.path });
                } else {
                  rr(d3.path);
                  ce(re().body, "htmx:replacedInHistory", { path: d3.path });
                }
              }
              var n3 = T(c3);
              je(v2.swapStyle, c3, l2, g2, n3, r3);
              if (t3.elt && !se(t3.elt) && ee(t3.elt, "id")) {
                var i3 = document.getElementById(ee(t3.elt, "id"));
                var a3 = { preventScroll: v2.focusScroll !== undefined ? !v2.focusScroll : !Q.config.defaultFocusScroll };
                if (i3) {
                  if (t3.start && i3.setSelectionRange) {
                    try {
                      i3.setSelectionRange(t3.start, t3.end);
                    } catch (e4) {
                    }
                  }
                  i3.focus(a3);
                }
              }
              c3.classList.remove(Q.config.swappingClass);
              oe(n3.elts, function(e4) {
                if (e4.classList) {
                  e4.classList.add(Q.config.settlingClass);
                }
                ce(e4, "htmx:afterSwap", u2);
              });
              if (O(f2, /HX-Trigger-After-Swap:/i)) {
                var o3 = l2;
                if (!se(l2)) {
                  o3 = re().body;
                }
                _e(f2, "HX-Trigger-After-Swap", o3);
              }
              var s3 = function() {
                oe(n3.tasks, function(e5) {
                  e5.call();
                });
                oe(n3.elts, function(e5) {
                  if (e5.classList) {
                    e5.classList.remove(Q.config.settlingClass);
                  }
                  ce(e5, "htmx:afterSettle", u2);
                });
                if (u2.pathInfo.anchor) {
                  var e4 = re().getElementById(u2.pathInfo.anchor);
                  if (e4) {
                    e4.scrollIntoView({ block: "start", behavior: "auto" });
                  }
                }
                if (n3.title && !m2) {
                  var t4 = C("title");
                  if (t4) {
                    t4.innerHTML = n3.title;
                  } else {
                    window.document.title = n3.title;
                  }
                }
                Cr(n3.elts, v2);
                if (O(f2, /HX-Trigger-After-Settle:/i)) {
                  var r4 = l2;
                  if (!se(l2)) {
                    r4 = re().body;
                  }
                  _e(f2, "HX-Trigger-After-Settle", r4);
                }
                ie(p2);
              };
              if (v2.settleDelay > 0) {
                setTimeout(s3, v2.settleDelay);
              } else {
                s3();
              }
            } catch (e4) {
              fe(l2, "htmx:swapError", u2);
              ie(x2);
              throw e4;
            }
          };
          var b2 = Q.config.globalViewTransitions;
          if (v2.hasOwnProperty("transition")) {
            b2 = v2.transition;
          }
          if (b2 && ce(l2, "htmx:beforeTransition", u2) && typeof Promise !== "undefined" && document.startViewTransition) {
            var w2 = new Promise(function(e3, t3) {
              p2 = e3;
              x2 = t3;
            });
            var S2 = y2;
            y2 = function() {
              document.startViewTransition(function() {
                S2();
                return w2;
              });
            };
          }
          if (v2.swapDelay > 0) {
            setTimeout(y2, v2.swapDelay);
          } else {
            y2();
          }
        }
        if (a2) {
          fe(l2, "htmx:responseError", le({ error: "Response Status Error Code " + f2.status + " from " + u2.pathInfo.requestPath }, u2));
        }
      }
      var Xr = {};
      function Dr() {
        return { init: function(e2) {
          return null;
        }, onEvent: function(e2, t2) {
          return true;
        }, transformResponse: function(e2, t2, r2) {
          return e2;
        }, isInlineSwap: function(e2) {
          return false;
        }, handleSwap: function(e2, t2, r2, n2) {
          return false;
        }, encodeParameters: function(e2, t2, r2) {
          return null;
        } };
      }
      function Ur(e2, t2) {
        if (t2.init) {
          t2.init(r);
        }
        Xr[e2] = le(Dr(), t2);
      }
      function Br(e2) {
        delete Xr[e2];
      }
      function Fr(e2, r2, n2) {
        if (e2 == undefined) {
          return r2;
        }
        if (r2 == undefined) {
          r2 = [];
        }
        if (n2 == undefined) {
          n2 = [];
        }
        var t2 = te(e2, "hx-ext");
        if (t2) {
          oe(t2.split(","), function(e3) {
            e3 = e3.replace(/ /g, "");
            if (e3.slice(0, 7) == "ignore:") {
              n2.push(e3.slice(7));
              return;
            }
            if (n2.indexOf(e3) < 0) {
              var t3 = Xr[e3];
              if (t3 && r2.indexOf(t3) < 0) {
                r2.push(t3);
              }
            }
          });
        }
        return Fr(u(e2), r2, n2);
      }
      var Vr = false;
      re().addEventListener("DOMContentLoaded", function() {
        Vr = true;
      });
      function jr(e2) {
        if (Vr || re().readyState === "complete") {
          e2();
        } else {
          re().addEventListener("DOMContentLoaded", e2);
        }
      }
      function _r() {
        if (Q.config.includeIndicatorStyles !== false) {
          re().head.insertAdjacentHTML("beforeend", "<style>                      ." + Q.config.indicatorClass + "{opacity:0}                      ." + Q.config.requestClass + " ." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + Q.config.requestClass + "." + Q.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
        }
      }
      function zr() {
        var e2 = re().querySelector('meta[name="htmx-config"]');
        if (e2) {
          return E(e2.content);
        } else {
          return null;
        }
      }
      function $r() {
        var e2 = zr();
        if (e2) {
          Q.config = le(Q.config, e2);
        }
      }
      jr(function() {
        $r();
        _r();
        var e2 = re().body;
        zt(e2);
        var t2 = re().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
        e2.addEventListener("htmx:abort", function(e3) {
          var t3 = e3.target;
          var r3 = ae(t3);
          if (r3 && r3.xhr) {
            r3.xhr.abort();
          }
        });
        const r2 = window.onpopstate ? window.onpopstate.bind(window) : null;
        window.onpopstate = function(e3) {
          if (e3.state && e3.state.htmx) {
            ar();
            oe(t2, function(e4) {
              ce(e4, "htmx:restored", { document: re(), triggerEvent: ce });
            });
          } else {
            if (r2) {
              r2(e3);
            }
          }
        };
        setTimeout(function() {
          ce(e2, "htmx:load", {});
          e2 = null;
        }, 0);
      });
      return Q;
    }();
  });
});

// src/main/resources/META-INF/resources/js/loader.js
var require_loader = __commonJS(() => {
  window.htmx = require_htmx_min();
});

// node_modules/hyperscript.org/dist/_hyperscript.min.js
var require__hyperscript_min = __commonJS((exports, module) => {
  (function(e2, t2) {
    const r2 = t2(e2);
    if (typeof exports === "object" && typeof exports.nodeName !== "string") {
      module.exports = r2;
    } else {
      e2["_hyperscript"] = r2;
      if ("document" in e2)
        e2["_hyperscript"].browserInit();
    }
  })(typeof self !== "undefined" ? self : exports, (e2) => {
    const t2 = { dynamicResolvers: [function(e3, t3) {
      if (e3 === "Fixed") {
        return Number(t3).toFixed();
      } else if (e3.indexOf("Fixed:") === 0) {
        let r3 = e3.split(":")[1];
        return Number(t3).toFixed(parseInt(r3));
      }
    }], String: function(e3) {
      if (e3.toString) {
        return e3.toString();
      } else {
        return "" + e3;
      }
    }, Int: function(e3) {
      return parseInt(e3);
    }, Float: function(e3) {
      return parseFloat(e3);
    }, Number: function(e3) {
      return Number(e3);
    }, Date: function(e3) {
      return new Date(e3);
    }, Array: function(e3) {
      return Array.from(e3);
    }, JSON: function(e3) {
      return JSON.stringify(e3);
    }, Object: function(e3) {
      if (e3 instanceof String) {
        e3 = e3.toString();
      }
      if (typeof e3 === "string") {
        return JSON.parse(e3);
      } else {
        return Object.assign({}, e3);
      }
    } };
    const r2 = { attributes: "_, script, data-script", defaultTransition: "all 500ms ease-in", disableSelector: "[disable-scripting], [data-disable-scripting]", hideShowStrategies: {}, conversions: t2 };

    class n2 {
      static OP_TABLE = { "+": "PLUS", "-": "MINUS", "*": "MULTIPLY", "/": "DIVIDE", ".": "PERIOD", "..": "ELLIPSIS", "\\": "BACKSLASH", ":": "COLON", "%": "PERCENT", "|": "PIPE", "!": "EXCLAMATION", "?": "QUESTION", "#": "POUND", "&": "AMPERSAND", $: "DOLLAR", ";": "SEMI", ",": "COMMA", "(": "L_PAREN", ")": "R_PAREN", "<": "L_ANG", ">": "R_ANG", "<=": "LTE_ANG", ">=": "GTE_ANG", "==": "EQ", "===": "EQQ", "!=": "NEQ", "!==": "NEQQ", "{": "L_BRACE", "}": "R_BRACE", "[": "L_BRACKET", "]": "R_BRACKET", "=": "EQUALS" };
      static isValidCSSClassChar(e3) {
        return n2.isAlpha(e3) || n2.isNumeric(e3) || e3 === "-" || e3 === "_" || e3 === ":";
      }
      static isValidCSSIDChar(e3) {
        return n2.isAlpha(e3) || n2.isNumeric(e3) || e3 === "-" || e3 === "_" || e3 === ":";
      }
      static isWhitespace(e3) {
        return e3 === " " || e3 === "\t" || n2.isNewline(e3);
      }
      static positionString(e3) {
        return "[Line: " + e3.line + ", Column: " + e3.column + "]";
      }
      static isNewline(e3) {
        return e3 === "\r" || e3 === "\n";
      }
      static isNumeric(e3) {
        return e3 >= "0" && e3 <= "9";
      }
      static isAlpha(e3) {
        return e3 >= "a" && e3 <= "z" || e3 >= "A" && e3 <= "Z";
      }
      static isIdentifierChar(e3, t3) {
        return e3 === "_" || e3 === "$";
      }
      static isReservedChar(e3) {
        return e3 === "`" || e3 === "^";
      }
      static isValidSingleQuoteStringStart(e3) {
        if (e3.length > 0) {
          var t3 = e3[e3.length - 1];
          if (t3.type === "IDENTIFIER" || t3.type === "CLASS_REF" || t3.type === "ID_REF") {
            return false;
          }
          if (t3.op && (t3.value === ">" || t3.value === ")")) {
            return false;
          }
        }
        return true;
      }
      static tokenize(e3, t3) {
        var r3 = [];
        var a3 = e3;
        var o3 = 0;
        var s3 = 0;
        var u3 = 1;
        var l3 = "<START>";
        var c4 = 0;
        function f3() {
          return t3 && c4 === 0;
        }
        while (o3 < a3.length) {
          if (q3() === "-" && N2() === "-" && (n2.isWhitespace(I3(2)) || I3(2) === "" || I3(2) === "-") || q3() === "/" && N2() === "/" && (n2.isWhitespace(I3(2)) || I3(2) === "" || I3(2) === "/")) {
            h4();
          } else if (q3() === "/" && N2() === "*" && (n2.isWhitespace(I3(2)) || I3(2) === "" || I3(2) === "*")) {
            v3();
          } else {
            if (n2.isWhitespace(q3())) {
              r3.push(A3());
            } else if (!R3() && q3() === "." && (n2.isAlpha(N2()) || N2() === "{" || N2() === "-")) {
              r3.push(d4());
            } else if (!R3() && q3() === "#" && (n2.isAlpha(N2()) || N2() === "{")) {
              r3.push(k3());
            } else if (q3() === "[" && N2() === "@") {
              r3.push(E3());
            } else if (q3() === "@") {
              r3.push(T3());
            } else if (q3() === "*" && n2.isAlpha(N2())) {
              r3.push(y3());
            } else if (n2.isAlpha(q3()) || !f3() && n2.isIdentifierChar(q3())) {
              r3.push(x3());
            } else if (n2.isNumeric(q3())) {
              r3.push(g3());
            } else if (!f3() && (q3() === '"' || q3() === "`")) {
              r3.push(w3());
            } else if (!f3() && q3() === "'") {
              if (n2.isValidSingleQuoteStringStart(r3)) {
                r3.push(w3());
              } else {
                r3.push(b3());
              }
            } else if (n2.OP_TABLE[q3()]) {
              if (l3 === "$" && q3() === "{") {
                c4++;
              }
              if (q3() === "}") {
                c4--;
              }
              r3.push(b3());
            } else if (f3() || n2.isReservedChar(q3())) {
              r3.push(p3("RESERVED", C2()));
            } else {
              if (o3 < a3.length) {
                throw Error("Unknown token: " + q3() + " ");
              }
            }
          }
        }
        return new i2(r3, [], a3);
        function m3(e4, t4) {
          var r4 = p3(e4, t4);
          r4.op = true;
          return r4;
        }
        function p3(e4, t4) {
          return { type: e4, value: t4 || "", start: o3, end: o3 + 1, column: s3, line: u3 };
        }
        function h4() {
          while (q3() && !n2.isNewline(q3())) {
            C2();
          }
          C2();
        }
        function v3() {
          while (q3() && !(q3() === "*" && N2() === "/")) {
            C2();
          }
          C2();
          C2();
        }
        function d4() {
          var e4 = p3("CLASS_REF");
          var t4 = C2();
          if (q3() === "{") {
            e4.template = true;
            t4 += C2();
            while (q3() && q3() !== "}") {
              t4 += C2();
            }
            if (q3() !== "}") {
              throw Error("Unterminated class reference");
            } else {
              t4 += C2();
            }
          } else {
            while (n2.isValidCSSClassChar(q3())) {
              t4 += C2();
            }
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function E3() {
          var e4 = p3("ATTRIBUTE_REF");
          var t4 = C2();
          while (o3 < a3.length && q3() !== "]") {
            t4 += C2();
          }
          if (q3() === "]") {
            t4 += C2();
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function T3() {
          var e4 = p3("ATTRIBUTE_REF");
          var t4 = C2();
          while (n2.isValidCSSIDChar(q3())) {
            t4 += C2();
          }
          if (q3() === "=") {
            t4 += C2();
            if (q3() === '"' || q3() === "'") {
              let e5 = w3();
              t4 += e5.value;
            } else if (n2.isAlpha(q3()) || n2.isNumeric(q3()) || n2.isIdentifierChar(q3())) {
              let e5 = x3();
              t4 += e5.value;
            }
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function y3() {
          var e4 = p3("STYLE_REF");
          var t4 = C2();
          while (n2.isAlpha(q3()) || q3() === "-") {
            t4 += C2();
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function k3() {
          var e4 = p3("ID_REF");
          var t4 = C2();
          if (q3() === "{") {
            e4.template = true;
            t4 += C2();
            while (q3() && q3() !== "}") {
              t4 += C2();
            }
            if (q3() !== "}") {
              throw Error("Unterminated id reference");
            } else {
              C2();
            }
          } else {
            while (n2.isValidCSSIDChar(q3())) {
              t4 += C2();
            }
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function x3() {
          var e4 = p3("IDENTIFIER");
          var t4 = C2();
          while (n2.isAlpha(q3()) || n2.isNumeric(q3()) || n2.isIdentifierChar(q3())) {
            t4 += C2();
          }
          if (q3() === "!" && t4 === "beep") {
            t4 += C2();
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function g3() {
          var e4 = p3("NUMBER");
          var t4 = C2();
          while (n2.isNumeric(q3())) {
            t4 += C2();
          }
          if (q3() === "." && n2.isNumeric(N2())) {
            t4 += C2();
          }
          while (n2.isNumeric(q3())) {
            t4 += C2();
          }
          if (q3() === "e" || q3() === "E") {
            if (n2.isNumeric(N2())) {
              t4 += C2();
            } else if (N2() === "-") {
              t4 += C2();
              t4 += C2();
            }
          }
          while (n2.isNumeric(q3())) {
            t4 += C2();
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function b3() {
          var e4 = m3();
          var t4 = C2();
          while (q3() && n2.OP_TABLE[t4 + q3()]) {
            t4 += C2();
          }
          e4.type = n2.OP_TABLE[t4];
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
        function w3() {
          var e4 = p3("STRING");
          var t4 = C2();
          var r4 = "";
          while (q3() && q3() !== t4) {
            if (q3() === "\\") {
              C2();
              let t5 = C2();
              if (t5 === "b") {
                r4 += "\b";
              } else if (t5 === "f") {
                r4 += "\f";
              } else if (t5 === "n") {
                r4 += "\n";
              } else if (t5 === "r") {
                r4 += "\r";
              } else if (t5 === "t") {
                r4 += "\t";
              } else if (t5 === "v") {
                r4 += "\v";
              } else if (t5 === "x") {
                const t6 = S3();
                if (Number.isNaN(t6)) {
                  throw Error("Invalid hexadecimal escape at " + n2.positionString(e4));
                }
                r4 += String.fromCharCode(t6);
              } else {
                r4 += t5;
              }
            } else {
              r4 += C2();
            }
          }
          if (q3() !== t4) {
            throw Error("Unterminated string at " + n2.positionString(e4));
          } else {
            C2();
          }
          e4.value = r4;
          e4.end = o3;
          e4.template = t4 === "`";
          return e4;
        }
        function S3() {
          const e4 = 16;
          if (!q3()) {
            return NaN;
          }
          let t4 = e4 * Number.parseInt(C2(), e4);
          if (!q3()) {
            return NaN;
          }
          t4 += Number.parseInt(C2(), e4);
          return t4;
        }
        function q3() {
          return a3.charAt(o3);
        }
        function N2() {
          return a3.charAt(o3 + 1);
        }
        function I3(e4 = 1) {
          return a3.charAt(o3 + e4);
        }
        function C2() {
          l3 = q3();
          o3++;
          s3++;
          return l3;
        }
        function R3() {
          return n2.isAlpha(l3) || n2.isNumeric(l3) || l3 === ")" || l3 === '"' || l3 === "'" || l3 === "`" || l3 === "}" || l3 === "]";
        }
        function A3() {
          var e4 = p3("WHITESPACE");
          var t4 = "";
          while (q3() && n2.isWhitespace(q3())) {
            if (n2.isNewline(q3())) {
              s3 = 0;
              u3++;
            }
            t4 += C2();
          }
          e4.value = t4;
          e4.end = o3;
          return e4;
        }
      }
      tokenize(e3, t3) {
        return n2.tokenize(e3, t3);
      }
    }

    class i2 {
      constructor(e3, t3, r3) {
        this.tokens = e3;
        this.consumed = t3;
        this.source = r3;
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
      raiseError(e3, t3) {
        a2.raiseParseError(e3, t3);
      }
      requireOpToken(e3) {
        var t3 = this.matchOpToken(e3);
        if (t3) {
          return t3;
        } else {
          this.raiseError(this, "Expected '" + e3 + "' but found '" + this.currentToken().value + "'");
        }
      }
      matchAnyOpToken(e3, t3, r3) {
        for (var n3 = 0;n3 < arguments.length; n3++) {
          var i3 = arguments[n3];
          var a3 = this.matchOpToken(i3);
          if (a3) {
            return a3;
          }
        }
      }
      matchAnyToken(e3, t3, r3) {
        for (var n3 = 0;n3 < arguments.length; n3++) {
          var i3 = arguments[n3];
          var a3 = this.matchToken(i3);
          if (a3) {
            return a3;
          }
        }
      }
      matchOpToken(e3) {
        if (this.currentToken() && this.currentToken().op && this.currentToken().value === e3) {
          return this.consumeToken();
        }
      }
      requireTokenType(e3, t3, r3, n3) {
        var i3 = this.matchTokenType(e3, t3, r3, n3);
        if (i3) {
          return i3;
        } else {
          this.raiseError(this, "Expected one of " + JSON.stringify([e3, t3, r3]));
        }
      }
      matchTokenType(e3, t3, r3, n3) {
        if (this.currentToken() && this.currentToken().type && [e3, t3, r3, n3].indexOf(this.currentToken().type) >= 0) {
          return this.consumeToken();
        }
      }
      requireToken(e3, t3) {
        var r3 = this.matchToken(e3, t3);
        if (r3) {
          return r3;
        } else {
          this.raiseError(this, "Expected '" + e3 + "' but found '" + this.currentToken().value + "'");
        }
      }
      peekToken(e3, t3, r3) {
        t3 = t3 || 0;
        r3 = r3 || "IDENTIFIER";
        if (this.tokens[t3] && this.tokens[t3].value === e3 && this.tokens[t3].type === r3) {
          return this.tokens[t3];
        }
      }
      matchToken(e3, t3) {
        if (this.follows.indexOf(e3) !== -1) {
          return;
        }
        t3 = t3 || "IDENTIFIER";
        if (this.currentToken() && this.currentToken().value === e3 && this.currentToken().type === t3) {
          return this.consumeToken();
        }
      }
      consumeToken() {
        var e3 = this.tokens.shift();
        this.consumed.push(e3);
        this._lastConsumed = e3;
        this.consumeWhitespace();
        return e3;
      }
      consumeUntil(e3, t3) {
        var r3 = [];
        var n3 = this.token(0, true);
        while ((t3 == null || n3.type !== t3) && (e3 == null || n3.value !== e3) && n3.type !== "EOF") {
          var i3 = this.tokens.shift();
          this.consumed.push(i3);
          r3.push(n3);
          n3 = this.token(0, true);
        }
        this.consumeWhitespace();
        return r3;
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
      token(e3, t3) {
        var r3;
        var n3 = 0;
        do {
          if (!t3) {
            while (this.tokens[n3] && this.tokens[n3].type === "WHITESPACE") {
              n3++;
            }
          }
          r3 = this.tokens[n3];
          e3--;
          n3++;
        } while (e3 > -1);
        if (r3) {
          return r3;
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
      pushFollow(e3) {
        this.follows.push(e3);
      }
      popFollow() {
        this.follows.pop();
      }
      clearFollows() {
        var e3 = this.follows;
        this.follows = [];
        return e3;
      }
      restoreFollows(e3) {
        this.follows = e3;
      }
    }

    class a2 {
      constructor(e3) {
        this.runtime = e3;
        this.possessivesDisabled = false;
        this.addGrammarElement("feature", function(e4, t3, r3) {
          if (r3.matchOpToken("(")) {
            var n3 = e4.requireElement("feature", r3);
            r3.requireOpToken(")");
            return n3;
          }
          var i3 = e4.FEATURES[r3.currentToken().value || ""];
          if (i3) {
            return i3(e4, t3, r3);
          }
        });
        this.addGrammarElement("command", function(e4, t3, r3) {
          if (r3.matchOpToken("(")) {
            const t4 = e4.requireElement("command", r3);
            r3.requireOpToken(")");
            return t4;
          }
          var n3 = e4.COMMANDS[r3.currentToken().value || ""];
          let i3;
          if (n3) {
            i3 = n3(e4, t3, r3);
          } else if (r3.currentToken().type === "IDENTIFIER") {
            i3 = e4.parseElement("pseudoCommand", r3);
          }
          if (i3) {
            return e4.parseElement("indirectStatement", r3, i3);
          }
          return i3;
        });
        this.addGrammarElement("commandList", function(e4, t3, r3) {
          if (r3.hasMore()) {
            var n3 = e4.parseElement("command", r3);
            if (n3) {
              r3.matchToken("then");
              const t4 = e4.parseElement("commandList", r3);
              if (t4)
                n3.next = t4;
              return n3;
            }
          }
          return { type: "emptyCommandListCommand", op: function(e5) {
            return t3.findNext(this, e5);
          }, execute: function(e5) {
            return t3.unifiedExec(this, e5);
          } };
        });
        this.addGrammarElement("leaf", function(e4, t3, r3) {
          var n3 = e4.parseAnyOf(e4.LEAF_EXPRESSIONS, r3);
          if (n3 == null) {
            return e4.parseElement("symbol", r3);
          }
          return n3;
        });
        this.addGrammarElement("indirectExpression", function(e4, t3, r3, n3) {
          for (var i3 = 0;i3 < e4.INDIRECT_EXPRESSIONS.length; i3++) {
            var a3 = e4.INDIRECT_EXPRESSIONS[i3];
            n3.endToken = r3.lastMatch();
            var o3 = e4.parseElement(a3, r3, n3);
            if (o3) {
              return o3;
            }
          }
          return n3;
        });
        this.addGrammarElement("indirectStatement", function(e4, t3, r3, n3) {
          if (r3.matchToken("unless")) {
            n3.endToken = r3.lastMatch();
            var i3 = e4.requireElement("expression", r3);
            var a3 = { type: "unlessStatementModifier", args: [i3], op: function(e5, t4) {
              if (t4) {
                return this.next;
              } else {
                return n3;
              }
            }, execute: function(e5) {
              return t3.unifiedExec(this, e5);
            } };
            n3.parent = a3;
            return a3;
          }
          return n3;
        });
        this.addGrammarElement("primaryExpression", function(e4, t3, r3) {
          var n3 = e4.parseElement("leaf", r3);
          if (n3) {
            return e4.parseElement("indirectExpression", r3, n3);
          }
          e4.raiseParseError(r3, "Unexpected value: " + r3.currentToken().value);
        });
      }
      use(e3) {
        e3(this);
        return this;
      }
      GRAMMAR = {};
      COMMANDS = {};
      FEATURES = {};
      LEAF_EXPRESSIONS = [];
      INDIRECT_EXPRESSIONS = [];
      initElt(e3, t3, r3) {
        e3.startToken = t3;
        e3.sourceFor = i2.sourceFor;
        e3.lineFor = i2.lineFor;
        e3.programSource = r3.source;
      }
      parseElement(e3, t3, r3 = undefined) {
        var n3 = this.GRAMMAR[e3];
        if (n3) {
          var i3 = t3.currentToken();
          var a3 = n3(this, this.runtime, t3, r3);
          if (a3) {
            this.initElt(a3, i3, t3);
            a3.endToken = a3.endToken || t3.lastMatch();
            var r3 = a3.root;
            while (r3 != null) {
              this.initElt(r3, i3, t3);
              r3 = r3.root;
            }
          }
          return a3;
        }
      }
      requireElement(e3, t3, r3, n3) {
        var i3 = this.parseElement(e3, t3, n3);
        if (!i3)
          a2.raiseParseError(t3, r3 || "Expected " + e3);
        return i3;
      }
      parseAnyOf(e3, t3) {
        for (var r3 = 0;r3 < e3.length; r3++) {
          var n3 = e3[r3];
          var i3 = this.parseElement(n3, t3);
          if (i3) {
            return i3;
          }
        }
      }
      addGrammarElement(e3, t3) {
        this.GRAMMAR[e3] = t3;
      }
      addCommand(e3, t3) {
        var r3 = e3 + "Command";
        var n3 = function(e4, n4, i3) {
          const a3 = t3(e4, n4, i3);
          if (a3) {
            a3.type = r3;
            a3.execute = function(e5) {
              e5.meta.command = a3;
              return n4.unifiedExec(this, e5);
            };
            return a3;
          }
        };
        this.GRAMMAR[r3] = n3;
        this.COMMANDS[e3] = n3;
      }
      addFeature(e3, t3) {
        var r3 = e3 + "Feature";
        var n3 = function(n4, i3, a3) {
          var o3 = t3(n4, i3, a3);
          if (o3) {
            o3.isFeature = true;
            o3.keyword = e3;
            o3.type = r3;
            return o3;
          }
        };
        this.GRAMMAR[r3] = n3;
        this.FEATURES[e3] = n3;
      }
      addLeafExpression(e3, t3) {
        this.LEAF_EXPRESSIONS.push(e3);
        this.addGrammarElement(e3, t3);
      }
      addIndirectExpression(e3, t3) {
        this.INDIRECT_EXPRESSIONS.push(e3);
        this.addGrammarElement(e3, t3);
      }
      static createParserContext(e3) {
        var t3 = e3.currentToken();
        var r3 = e3.source;
        var n3 = r3.split("\n");
        var i3 = t3 && t3.line ? t3.line - 1 : n3.length - 1;
        var a3 = n3[i3];
        var o3 = t3 && t3.line ? t3.column : a3.length - 1;
        return a3 + "\n" + " ".repeat(o3) + "^^\n\n";
      }
      static raiseParseError(e3, t3) {
        t3 = (t3 || "Unexpected Token : " + e3.currentToken().value) + "\n\n" + a2.createParserContext(e3);
        var r3 = new Error(t3);
        r3["tokens"] = e3;
        throw r3;
      }
      raiseParseError(e3, t3) {
        a2.raiseParseError(e3, t3);
      }
      parseHyperScript(e3) {
        var t3 = this.parseElement("hyperscript", e3);
        if (e3.hasMore())
          this.raiseParseError(e3);
        if (t3)
          return t3;
      }
      setParent(e3, t3) {
        if (typeof e3 === "object") {
          e3.parent = t3;
          if (typeof t3 === "object") {
            t3.children = t3.children || new Set;
            t3.children.add(e3);
          }
          this.setParent(e3.next, t3);
        }
      }
      commandStart(e3) {
        return this.COMMANDS[e3.value || ""];
      }
      featureStart(e3) {
        return this.FEATURES[e3.value || ""];
      }
      commandBoundary(e3) {
        if (e3.value == "end" || e3.value == "then" || e3.value == "else" || e3.value == "otherwise" || e3.value == ")" || this.commandStart(e3) || this.featureStart(e3) || e3.type == "EOF") {
          return true;
        }
        return false;
      }
      parseStringTemplate(e3) {
        var t3 = [""];
        do {
          t3.push(e3.lastWhitespace());
          if (e3.currentToken().value === "$") {
            e3.consumeToken();
            var r3 = e3.matchOpToken("{");
            t3.push(this.requireElement("expression", e3));
            if (r3) {
              e3.requireOpToken("}");
            }
            t3.push("");
          } else if (e3.currentToken().value === "\\") {
            e3.consumeToken();
            e3.consumeToken();
          } else {
            var n3 = e3.consumeToken();
            t3[t3.length - 1] += n3 ? n3.value : "";
          }
        } while (e3.hasMore());
        t3.push(e3.lastWhitespace());
        return t3;
      }
      ensureTerminated(e3) {
        const t3 = this.runtime;
        var r3 = { type: "implicitReturn", op: function(e4) {
          e4.meta.returned = true;
          if (e4.meta.resolve) {
            e4.meta.resolve();
          }
          return t3.HALT;
        }, execute: function(e4) {
        } };
        var n3 = e3;
        while (n3.next) {
          n3 = n3.next;
        }
        n3.next = r3;
      }
    }

    class o2 {
      constructor(e3, t3) {
        this.lexer = e3 ?? new n2;
        this.parser = t3 ?? new a2(this).use(T2).use(y2);
        this.parser.runtime = this;
      }
      matchesSelector(e3, t3) {
        var r3 = e3.matches || e3.matchesSelector || e3.msMatchesSelector || e3.mozMatchesSelector || e3.webkitMatchesSelector || e3.oMatchesSelector;
        return r3 && r3.call(e3, t3);
      }
      makeEvent(t3, r3) {
        var n3;
        if (e2.Event && typeof e2.Event === "function") {
          n3 = new Event(t3, { bubbles: true, cancelable: true });
          n3["detail"] = r3;
        } else {
          n3 = document.createEvent("CustomEvent");
          n3.initCustomEvent(t3, true, true, r3);
        }
        return n3;
      }
      triggerEvent(e3, t3, r3, n3) {
        r3 = r3 || {};
        r3["sender"] = n3;
        var i3 = this.makeEvent(t3, r3);
        var a3 = e3.dispatchEvent(i3);
        return a3;
      }
      isArrayLike(e3) {
        return Array.isArray(e3) || typeof NodeList !== "undefined" && (e3 instanceof NodeList || e3 instanceof HTMLCollection);
      }
      isIterable(e3) {
        return typeof e3 === "object" && Symbol.iterator in e3 && typeof e3[Symbol.iterator] === "function";
      }
      shouldAutoIterate(e3) {
        return e3 != null && e3[p2] || this.isArrayLike(e3);
      }
      forEach(e3, t3) {
        if (e3 == null) {
        } else if (this.isIterable(e3)) {
          for (const r4 of e3) {
            t3(r4);
          }
        } else if (this.isArrayLike(e3)) {
          for (var r3 = 0;r3 < e3.length; r3++) {
            t3(e3[r3]);
          }
        } else {
          t3(e3);
        }
      }
      implicitLoop(e3, t3) {
        if (this.shouldAutoIterate(e3)) {
          for (const r3 of e3)
            t3(r3);
        } else {
          t3(e3);
        }
      }
      wrapArrays(e3) {
        var t3 = [];
        for (var r3 = 0;r3 < e3.length; r3++) {
          var n3 = e3[r3];
          if (Array.isArray(n3)) {
            t3.push(Promise.all(n3));
          } else {
            t3.push(n3);
          }
        }
        return t3;
      }
      unwrapAsyncs(e3) {
        for (var t3 = 0;t3 < e3.length; t3++) {
          var r3 = e3[t3];
          if (r3.asyncWrapper) {
            e3[t3] = r3.value;
          }
          if (Array.isArray(r3)) {
            for (var n3 = 0;n3 < r3.length; n3++) {
              var i3 = r3[n3];
              if (i3.asyncWrapper) {
                r3[n3] = i3.value;
              }
            }
          }
        }
      }
      static HALT = {};
      HALT = o2.HALT;
      unifiedExec(e3, t3) {
        while (true) {
          try {
            var r3 = this.unifiedEval(e3, t3);
          } catch (n3) {
            if (t3.meta.handlingFinally) {
              console.error(" Exception in finally block: ", n3);
              r3 = o2.HALT;
            } else {
              this.registerHyperTrace(t3, n3);
              if (t3.meta.errorHandler && !t3.meta.handlingError) {
                t3.meta.handlingError = true;
                t3.locals[t3.meta.errorSymbol] = n3;
                e3 = t3.meta.errorHandler;
                continue;
              } else {
                t3.meta.currentException = n3;
                r3 = o2.HALT;
              }
            }
          }
          if (r3 == null) {
            console.error(e3, " did not return a next element to execute! context: ", t3);
            return;
          } else if (r3.then) {
            r3.then((e4) => {
              this.unifiedExec(e4, t3);
            }).catch((e4) => {
              this.unifiedExec({ op: function() {
                throw e4;
              } }, t3);
            });
            return;
          } else if (r3 === o2.HALT) {
            if (t3.meta.finallyHandler && !t3.meta.handlingFinally) {
              t3.meta.handlingFinally = true;
              e3 = t3.meta.finallyHandler;
            } else {
              if (t3.meta.onHalt) {
                t3.meta.onHalt();
              }
              if (t3.meta.currentException) {
                if (t3.meta.reject) {
                  t3.meta.reject(t3.meta.currentException);
                  return;
                } else {
                  throw t3.meta.currentException;
                }
              } else {
                return;
              }
            }
          } else {
            e3 = r3;
          }
        }
      }
      unifiedEval(e3, t3) {
        var r3 = [t3];
        var n3 = false;
        var i3 = false;
        if (e3.args) {
          for (var a3 = 0;a3 < e3.args.length; a3++) {
            var o3 = e3.args[a3];
            if (o3 == null) {
              r3.push(null);
            } else if (Array.isArray(o3)) {
              var s3 = [];
              for (var u3 = 0;u3 < o3.length; u3++) {
                var l3 = o3[u3];
                var c4 = l3 ? l3.evaluate(t3) : null;
                if (c4) {
                  if (c4.then) {
                    n3 = true;
                  } else if (c4.asyncWrapper) {
                    i3 = true;
                  }
                }
                s3.push(c4);
              }
              r3.push(s3);
            } else if (o3.evaluate) {
              var c4 = o3.evaluate(t3);
              if (c4) {
                if (c4.then) {
                  n3 = true;
                } else if (c4.asyncWrapper) {
                  i3 = true;
                }
              }
              r3.push(c4);
            } else {
              r3.push(o3);
            }
          }
        }
        if (n3) {
          return new Promise((t4, n4) => {
            r3 = this.wrapArrays(r3);
            Promise.all(r3).then(function(r4) {
              if (i3) {
                this.unwrapAsyncs(r4);
              }
              try {
                var a4 = e3.op.apply(e3, r4);
                t4(a4);
              } catch (e4) {
                n4(e4);
              }
            }).catch(function(e4) {
              n4(e4);
            });
          });
        } else {
          if (i3) {
            this.unwrapAsyncs(r3);
          }
          return e3.op.apply(e3, r3);
        }
      }
      _scriptAttrs = null;
      getScriptAttributes() {
        if (this._scriptAttrs == null) {
          this._scriptAttrs = r2.attributes.replace(/ /g, "").split(",");
        }
        return this._scriptAttrs;
      }
      getScript(e3) {
        for (var t3 = 0;t3 < this.getScriptAttributes().length; t3++) {
          var r3 = this.getScriptAttributes()[t3];
          if (e3.hasAttribute && e3.hasAttribute(r3)) {
            return e3.getAttribute(r3);
          }
        }
        if (e3 instanceof HTMLScriptElement && e3.type === "text/hyperscript") {
          return e3.innerText;
        }
        return null;
      }
      hyperscriptFeaturesMap = new WeakMap;
      getHyperscriptFeatures(e3) {
        var t3 = this.hyperscriptFeaturesMap.get(e3);
        if (typeof t3 === "undefined") {
          if (e3) {
            this.hyperscriptFeaturesMap.set(e3, t3 = {});
          }
        }
        return t3;
      }
      addFeatures(e3, t3) {
        if (e3) {
          Object.assign(t3.locals, this.getHyperscriptFeatures(e3));
          this.addFeatures(e3.parentElement, t3);
        }
      }
      makeContext(e3, t3, r3, n3) {
        return new f2(e3, t3, r3, n3, this);
      }
      getScriptSelector() {
        return this.getScriptAttributes().map(function(e3) {
          return "[" + e3 + "]";
        }).join(", ");
      }
      convertValue(e3, r3) {
        var n3 = t2.dynamicResolvers;
        for (var i3 = 0;i3 < n3.length; i3++) {
          var a3 = n3[i3];
          var o3 = a3(r3, e3);
          if (o3 !== undefined) {
            return o3;
          }
        }
        if (e3 == null) {
          return null;
        }
        var s3 = t2[r3];
        if (s3) {
          return s3(e3);
        }
        throw "Unknown conversion : " + r3;
      }
      parse(e3) {
        const t3 = this.lexer, r3 = this.parser;
        var n3 = t3.tokenize(e3);
        if (this.parser.commandStart(n3.currentToken())) {
          var i3 = r3.requireElement("commandList", n3);
          if (n3.hasMore())
            r3.raiseParseError(n3);
          r3.ensureTerminated(i3);
          return i3;
        } else if (r3.featureStart(n3.currentToken())) {
          var a3 = r3.requireElement("hyperscript", n3);
          if (n3.hasMore())
            r3.raiseParseError(n3);
          return a3;
        } else {
          var o3 = r3.requireElement("expression", n3);
          if (n3.hasMore())
            r3.raiseParseError(n3);
          return o3;
        }
      }
      evaluateNoPromise(e3, t3) {
        let r3 = e3.evaluate(t3);
        if (r3.next) {
          throw new Error(i2.sourceFor.call(e3) + " returned a Promise in a context that they are not allowed.");
        }
        return r3;
      }
      evaluate(t3, r3, n3) {

        class i3 extends EventTarget {
          constructor(e3) {
            super();
            this.module = e3;
          }
          toString() {
            return this.module.id;
          }
        }
        var a3 = "document" in e2 ? e2.document.body : new i3(n3 && n3.module);
        r3 = Object.assign(this.makeContext(a3, null, a3, null), r3 || {});
        var o3 = this.parse(t3);
        if (o3.execute) {
          o3.execute(r3);
          if (typeof r3.meta.returnValue !== "undefined") {
            return r3.meta.returnValue;
          } else {
            return r3.result;
          }
        } else if (o3.apply) {
          o3.apply(a3, a3, n3);
          return this.getHyperscriptFeatures(a3);
        } else {
          return o3.evaluate(r3);
        }
        function s3() {
          return {};
        }
      }
      processNode(e3) {
        var t3 = this.getScriptSelector();
        if (this.matchesSelector(e3, t3)) {
          this.initElement(e3, e3);
        }
        if (e3 instanceof HTMLScriptElement && e3.type === "text/hyperscript") {
          this.initElement(e3, document.body);
        }
        if (e3.querySelectorAll) {
          this.forEach(e3.querySelectorAll(t3 + ", [type='text/hyperscript']"), (e4) => {
            this.initElement(e4, e4 instanceof HTMLScriptElement && e4.type === "text/hyperscript" ? document.body : e4);
          });
        }
      }
      initElement(e3, t3) {
        if (e3.closest && e3.closest(r2.disableSelector)) {
          return;
        }
        var n3 = this.getInternalData(e3);
        if (!n3.initialized) {
          var i3 = this.getScript(e3);
          if (i3) {
            try {
              n3.initialized = true;
              n3.script = i3;
              const r3 = this.lexer, s3 = this.parser;
              var a3 = r3.tokenize(i3);
              var o3 = s3.parseHyperScript(a3);
              if (!o3)
                return;
              o3.apply(t3 || e3, e3);
              setTimeout(() => {
                this.triggerEvent(t3 || e3, "load", { hyperscript: true });
              }, 1);
            } catch (t4) {
              this.triggerEvent(e3, "exception", { error: t4 });
              console.error("hyperscript errors were found on the following element:", e3, "\n\n", t4.message, t4.stack);
            }
          }
        }
      }
      internalDataMap = new WeakMap;
      getInternalData(e3) {
        var t3 = this.internalDataMap.get(e3);
        if (typeof t3 === "undefined") {
          this.internalDataMap.set(e3, t3 = {});
        }
        return t3;
      }
      typeCheck(e3, t3, r3) {
        if (e3 == null && r3) {
          return true;
        }
        var n3 = Object.prototype.toString.call(e3).slice(8, -1);
        return n3 === t3;
      }
      getElementScope(e3) {
        var t3 = e3.meta && e3.meta.owner;
        if (t3) {
          var r3 = this.getInternalData(t3);
          var n3 = "elementScope";
          if (e3.meta.feature && e3.meta.feature.behavior) {
            n3 = e3.meta.feature.behavior + "Scope";
          }
          var i3 = h3(r3, n3);
          return i3;
        } else {
          return {};
        }
      }
      isReservedWord(e3) {
        return ["meta", "it", "result", "locals", "event", "target", "detail", "sender", "body"].includes(e3);
      }
      isHyperscriptContext(e3) {
        return e3 instanceof f2;
      }
      resolveSymbol(t3, r3, n3) {
        if (t3 === "me" || t3 === "my" || t3 === "I") {
          return r3.me;
        }
        if (t3 === "it" || t3 === "its" || t3 === "result") {
          return r3.result;
        }
        if (t3 === "you" || t3 === "your" || t3 === "yourself") {
          return r3.you;
        } else {
          if (n3 === "global") {
            return e2[t3];
          } else if (n3 === "element") {
            var i3 = this.getElementScope(r3);
            return i3[t3];
          } else if (n3 === "local") {
            return r3.locals[t3];
          } else {
            if (r3.meta && r3.meta.context) {
              var a3 = r3.meta.context[t3];
              if (typeof a3 !== "undefined") {
                return a3;
              }
              if (r3.meta.context.detail) {
                a3 = r3.meta.context.detail[t3];
                if (typeof a3 !== "undefined") {
                  return a3;
                }
              }
            }
            if (this.isHyperscriptContext(r3) && !this.isReservedWord(t3)) {
              var o3 = r3.locals[t3];
            } else {
              var o3 = r3[t3];
            }
            if (typeof o3 !== "undefined") {
              return o3;
            } else {
              var i3 = this.getElementScope(r3);
              o3 = i3[t3];
              if (typeof o3 !== "undefined") {
                return o3;
              } else {
                return e2[t3];
              }
            }
          }
        }
      }
      setSymbol(t3, r3, n3, i3) {
        if (n3 === "global") {
          e2[t3] = i3;
        } else if (n3 === "element") {
          var a3 = this.getElementScope(r3);
          a3[t3] = i3;
        } else if (n3 === "local") {
          r3.locals[t3] = i3;
        } else {
          if (this.isHyperscriptContext(r3) && !this.isReservedWord(t3) && typeof r3.locals[t3] !== "undefined") {
            r3.locals[t3] = i3;
          } else {
            var a3 = this.getElementScope(r3);
            var o3 = a3[t3];
            if (typeof o3 !== "undefined") {
              a3[t3] = i3;
            } else {
              if (this.isHyperscriptContext(r3) && !this.isReservedWord(t3)) {
                r3.locals[t3] = i3;
              } else {
                r3[t3] = i3;
              }
            }
          }
        }
      }
      findNext(e3, t3) {
        if (e3) {
          if (e3.resolveNext) {
            return e3.resolveNext(t3);
          } else if (e3.next) {
            return e3.next;
          } else {
            return this.findNext(e3.parent, t3);
          }
        }
      }
      flatGet(e3, t3, r3) {
        if (e3 != null) {
          var n3 = r3(e3, t3);
          if (typeof n3 !== "undefined") {
            return n3;
          }
          if (this.shouldAutoIterate(e3)) {
            var i3 = [];
            for (var a3 of e3) {
              var o3 = r3(a3, t3);
              i3.push(o3);
            }
            return i3;
          }
        }
      }
      resolveProperty(e3, t3) {
        return this.flatGet(e3, t3, (e4, t4) => e4[t4]);
      }
      resolveAttribute(e3, t3) {
        return this.flatGet(e3, t3, (e4, t4) => e4.getAttribute && e4.getAttribute(t4));
      }
      resolveStyle(e3, t3) {
        return this.flatGet(e3, t3, (e4, t4) => e4.style && e4.style[t4]);
      }
      resolveComputedStyle(e3, t3) {
        return this.flatGet(e3, t3, (e4, t4) => getComputedStyle(e4).getPropertyValue(t4));
      }
      assignToNamespace(t3, r3, n3, i3) {
        let a3;
        if (typeof document !== "undefined" && t3 === document.body) {
          a3 = e2;
        } else {
          a3 = this.getHyperscriptFeatures(t3);
        }
        var o3;
        while ((o3 = r3.shift()) !== undefined) {
          var s3 = a3[o3];
          if (s3 == null) {
            s3 = {};
            a3[o3] = s3;
          }
          a3 = s3;
        }
        a3[n3] = i3;
      }
      getHyperTrace(e3, t3) {
        var r3 = [];
        var n3 = e3;
        while (n3.meta.caller) {
          n3 = n3.meta.caller;
        }
        if (n3.meta.traceMap) {
          return n3.meta.traceMap.get(t3, r3);
        }
      }
      registerHyperTrace(e3, t3) {
        var r3 = [];
        var n3 = null;
        while (e3 != null) {
          r3.push(e3);
          n3 = e3;
          e3 = e3.meta.caller;
        }
        if (n3.meta.traceMap == null) {
          n3.meta.traceMap = new Map;
        }
        if (!n3.meta.traceMap.get(t3)) {
          var i3 = { trace: r3, print: function(e4) {
            e4 = e4 || console.error;
            e4("hypertrace /// ");
            var t4 = 0;
            for (var n4 = 0;n4 < r3.length; n4++) {
              t4 = Math.max(t4, r3[n4].meta.feature.displayName.length);
            }
            for (var n4 = 0;n4 < r3.length; n4++) {
              var i4 = r3[n4];
              e4("  ->", i4.meta.feature.displayName.padEnd(t4 + 2), "-", i4.meta.owner);
            }
          } };
          n3.meta.traceMap.set(t3, i3);
        }
      }
      escapeSelector(e3) {
        return e3.replace(/:/g, function(e4) {
          return "\\" + e4;
        });
      }
      nullCheck(e3, t3) {
        if (e3 == null) {
          throw new Error("'" + t3.sourceFor() + "' is null");
        }
      }
      isEmpty(e3) {
        return e3 == undefined || e3.length === 0;
      }
      doesExist(e3) {
        if (e3 == null) {
          return false;
        }
        if (this.shouldAutoIterate(e3)) {
          for (const t3 of e3) {
            return true;
          }
          return false;
        }
        return true;
      }
      getRootNode(e3) {
        if (e3 && e3 instanceof Node) {
          var t3 = e3.getRootNode();
          if (t3 instanceof Document || t3 instanceof ShadowRoot)
            return t3;
        }
        return document;
      }
      getEventQueueFor(e3, t3) {
        let r3 = this.getInternalData(e3);
        var n3 = r3.eventQueues;
        if (n3 == null) {
          n3 = new Map;
          r3.eventQueues = n3;
        }
        var i3 = n3.get(t3);
        if (i3 == null) {
          i3 = { queue: [], executing: false };
          n3.set(t3, i3);
        }
        return i3;
      }
      beepValueToConsole(e3, t3, r3) {
        if (this.triggerEvent(e3, "hyperscript:beep", { element: e3, expression: t3, value: r3 })) {
          var n3;
          if (r3) {
            if (r3 instanceof m2) {
              n3 = "ElementCollection";
            } else if (r3.constructor) {
              n3 = r3.constructor.name;
            } else {
              n3 = "unknown";
            }
          } else {
            n3 = "object (null)";
          }
          var a3 = r3;
          if (n3 === "String") {
            a3 = '"' + a3 + '"';
          } else if (r3 instanceof m2) {
            a3 = Array.from(r3);
          }
          console.log("///_ BEEP! The expression (" + i2.sourceFor.call(t3).replace("beep! ", "") + ") evaluates to:", a3, "of type " + n3);
        }
      }
      hyperscriptUrl = "document" in e2 && document.currentScript ? document.currentScript.src : null;
    }
    function s2() {
      let e3 = document.cookie.split("; ").map((e4) => {
        let t3 = e4.split("=");
        return { name: t3[0], value: decodeURIComponent(t3[1]) };
      });
      return e3;
    }
    function u2(e3) {
      document.cookie = e3 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    function l2() {
      for (const e3 of s2()) {
        u2(e3.name);
      }
    }
    const c3 = new Proxy({}, { get(e3, t3) {
      if (t3 === "then" || t3 === "asyncWrapper") {
        return null;
      } else if (t3 === "length") {
        return s2().length;
      } else if (t3 === "clear") {
        return u2;
      } else if (t3 === "clearAll") {
        return l2;
      } else if (typeof t3 === "string") {
        if (!isNaN(t3)) {
          return s2()[parseInt(t3)];
        } else {
          let e4 = document.cookie.split("; ").find((e5) => e5.startsWith(t3 + "="))?.split("=")[1];
          if (e4) {
            return decodeURIComponent(e4);
          }
        }
      } else if (t3 === Symbol.iterator) {
        return s2()[t3];
      }
    }, set(e3, t3, r3) {
      var n3 = null;
      if (typeof r3 === "string") {
        n3 = encodeURIComponent(r3);
        n3 += ";samesite=lax";
      } else {
        n3 = encodeURIComponent(r3.value);
        if (r3.expires) {
          n3 += ";expires=" + r3.maxAge;
        }
        if (r3.maxAge) {
          n3 += ";max-age=" + r3.maxAge;
        }
        if (r3.partitioned) {
          n3 += ";partitioned=" + r3.partitioned;
        }
        if (r3.path) {
          n3 += ";path=" + r3.path;
        }
        if (r3.samesite) {
          n3 += ";samesite=" + r3.path;
        }
        if (r3.secure) {
          n3 += ";secure=" + r3.path;
        }
      }
      document.cookie = t3 + "=" + n3;
      return true;
    } });

    class f2 {
      constructor(t3, r3, n3, i3, a3) {
        this.meta = { parser: a3.parser, lexer: a3.lexer, runtime: a3, owner: t3, feature: r3, iterators: {}, ctx: this };
        this.locals = { cookies: c3 };
        this.me = n3, this.you = undefined;
        this.result = undefined;
        this.event = i3;
        this.target = i3 ? i3.target : null;
        this.detail = i3 ? i3.detail : null;
        this.sender = i3 ? i3.detail ? i3.detail.sender : null : null;
        this.body = "document" in e2 ? document.body : null;
        a3.addFeatures(t3, this);
      }
    }

    class m2 {
      constructor(e3, t3, r3) {
        this._css = e3;
        this.relativeToElement = t3;
        this.escape = r3;
        this[p2] = true;
      }
      get css() {
        if (this.escape) {
          return o2.prototype.escapeSelector(this._css);
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
      contains(e3) {
        for (let t3 of this) {
          if (t3.contains(e3)) {
            return true;
          }
        }
        return false;
      }
      get length() {
        return this.selectMatches().length;
      }
      [Symbol.iterator]() {
        let e3 = this.selectMatches();
        return e3[Symbol.iterator]();
      }
      selectMatches() {
        let e3 = o2.prototype.getRootNode(this.relativeToElement).querySelectorAll(this.css);
        return e3;
      }
    }
    const p2 = Symbol();
    function h3(e3, t3) {
      var r3 = e3[t3];
      if (r3) {
        return r3;
      } else {
        var n3 = {};
        e3[t3] = n3;
        return n3;
      }
    }
    function v2(e3) {
      try {
        return JSON.parse(e3);
      } catch (e4) {
        d3(e4);
        return null;
      }
    }
    function d3(e3) {
      if (console.error) {
        console.error(e3);
      } else if (console.log) {
        console.log("ERROR: ", e3);
      }
    }
    function E2(e3, t3) {
      return new (e3.bind.apply(e3, [e3].concat(t3)));
    }
    function T2(t3) {
      t3.addLeafExpression("parenthesized", function(e3, t4, r4) {
        if (r4.matchOpToken("(")) {
          var n3 = r4.clearFollows();
          try {
            var i3 = e3.requireElement("expression", r4);
          } finally {
            r4.restoreFollows(n3);
          }
          r4.requireOpToken(")");
          return i3;
        }
      });
      t3.addLeafExpression("string", function(e3, t4, r4) {
        var i3 = r4.matchTokenType("STRING");
        if (!i3)
          return;
        var a4 = i3.value;
        var o3;
        if (i3.template) {
          var s4 = n2.tokenize(a4, true);
          o3 = e3.parseStringTemplate(s4);
        } else {
          o3 = [];
        }
        return { type: "string", token: i3, args: o3, op: function(e4) {
          var t5 = "";
          for (var r5 = 1;r5 < arguments.length; r5++) {
            var n3 = arguments[r5];
            if (n3 !== undefined) {
              t5 += n3;
            }
          }
          return t5;
        }, evaluate: function(e4) {
          if (o3.length === 0) {
            return a4;
          } else {
            return t4.unifiedEval(this, e4);
          }
        } };
      });
      t3.addGrammarElement("nakedString", function(e3, t4, r4) {
        if (r4.hasMore()) {
          var n3 = r4.consumeUntilWhitespace();
          r4.matchTokenType("WHITESPACE");
          return { type: "nakedString", tokens: n3, evaluate: function(e4) {
            return n3.map(function(e5) {
              return e5.value;
            }).join("");
          } };
        }
      });
      t3.addLeafExpression("number", function(e3, t4, r4) {
        var n3 = r4.matchTokenType("NUMBER");
        if (!n3)
          return;
        var i3 = n3;
        var a4 = parseFloat(n3.value);
        return { type: "number", value: a4, numberToken: i3, evaluate: function() {
          return a4;
        } };
      });
      t3.addLeafExpression("idRef", function(e3, t4, r4) {
        var i3 = r4.matchTokenType("ID_REF");
        if (!i3)
          return;
        if (!i3.value)
          return;
        if (i3.template) {
          var a4 = i3.value.substring(2);
          var o3 = n2.tokenize(a4);
          var s4 = e3.requireElement("expression", o3);
          return { type: "idRefTemplate", args: [s4], op: function(e4, r5) {
            return t4.getRootNode(e4.me).getElementById(r5);
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        } else {
          const e4 = i3.value.substring(1);
          return { type: "idRef", css: i3.value, value: e4, evaluate: function(r5) {
            return t4.getRootNode(r5.me).getElementById(e4);
          } };
        }
      });
      t3.addLeafExpression("classRef", function(e3, t4, r4) {
        var i3 = r4.matchTokenType("CLASS_REF");
        if (!i3)
          return;
        if (!i3.value)
          return;
        if (i3.template) {
          var a4 = i3.value.substring(2);
          var o3 = n2.tokenize(a4);
          var s4 = e3.requireElement("expression", o3);
          return { type: "classRefTemplate", args: [s4], op: function(e4, t5) {
            return new m2("." + t5, e4.me, true);
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        } else {
          const e4 = i3.value;
          return { type: "classRef", css: e4, evaluate: function(t5) {
            return new m2(e4, t5.me, true);
          } };
        }
      });

      class r3 extends m2 {
        constructor(e3, t4, r4) {
          super(e3, t4);
          this.templateParts = r4;
          this.elements = r4.filter((e4) => e4 instanceof Element);
        }
        get css() {
          let e3 = "", t4 = 0;
          for (const r4 of this.templateParts) {
            if (r4 instanceof Element) {
              e3 += "[data-hs-query-id='" + t4++ + "']";
            } else
              e3 += r4;
          }
          return e3;
        }
        [Symbol.iterator]() {
          this.elements.forEach((e4, t4) => e4.dataset.hsQueryId = t4);
          const e3 = super[Symbol.iterator]();
          this.elements.forEach((e4) => e4.removeAttribute("data-hs-query-id"));
          return e3;
        }
      }
      t3.addLeafExpression("queryRef", function(e3, t4, i3) {
        var a4 = i3.matchOpToken("<");
        if (!a4)
          return;
        var o3 = i3.consumeUntil("/");
        i3.requireOpToken("/");
        i3.requireOpToken(">");
        var s4 = o3.map(function(e4) {
          if (e4.type === "STRING") {
            return '"' + e4.value + '"';
          } else {
            return e4.value;
          }
        }).join("");
        var u4, l4, c5;
        if (s4.indexOf("$") >= 0) {
          u4 = true;
          l4 = n2.tokenize(s4, true);
          c5 = e3.parseStringTemplate(l4);
        }
        return { type: "queryRef", css: s4, args: c5, op: function(e4, ...t5) {
          if (u4) {
            return new r3(s4, e4.me, t5);
          } else {
            return new m2(s4, e4.me);
          }
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addLeafExpression("attributeRef", function(e3, t4, r4) {
        var n3 = r4.matchTokenType("ATTRIBUTE_REF");
        if (!n3)
          return;
        if (!n3.value)
          return;
        var i3 = n3.value;
        if (i3.indexOf("[") === 0) {
          var a4 = i3.substring(2, i3.length - 1);
        } else {
          var a4 = i3.substring(1);
        }
        var o3 = "[" + a4 + "]";
        var s4 = a4.split("=");
        var u4 = s4[0];
        var l4 = s4[1];
        if (l4) {
          if (l4.indexOf('"') === 0) {
            l4 = l4.substring(1, l4.length - 1);
          }
        }
        return { type: "attributeRef", name: u4, css: o3, value: l4, op: function(e4) {
          var t5 = e4.you || e4.me;
          if (t5) {
            return t5.getAttribute(u4);
          }
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addLeafExpression("styleRef", function(e3, t4, r4) {
        var n3 = r4.matchTokenType("STYLE_REF");
        if (!n3)
          return;
        if (!n3.value)
          return;
        var i3 = n3.value.substr(1);
        if (i3.startsWith("computed-")) {
          i3 = i3.substr("computed-".length);
          return { type: "computedStyleRef", name: i3, op: function(e4) {
            var r5 = e4.you || e4.me;
            if (r5) {
              return t4.resolveComputedStyle(r5, i3);
            }
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        } else {
          return { type: "styleRef", name: i3, op: function(e4) {
            var r5 = e4.you || e4.me;
            if (r5) {
              return t4.resolveStyle(r5, i3);
            }
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        }
      });
      t3.addGrammarElement("objectKey", function(e3, t4, r4) {
        var n3;
        if (n3 = r4.matchTokenType("STRING")) {
          return { type: "objectKey", key: n3.value, evaluate: function() {
            return n3.value;
          } };
        } else if (r4.matchOpToken("[")) {
          var i3 = e3.parseElement("expression", r4);
          r4.requireOpToken("]");
          return { type: "objectKey", expr: i3, args: [i3], op: function(e4, t5) {
            return t5;
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        } else {
          var a4 = "";
          do {
            n3 = r4.matchTokenType("IDENTIFIER") || r4.matchOpToken("-");
            if (n3)
              a4 += n3.value;
          } while (n3);
          return { type: "objectKey", key: a4, evaluate: function() {
            return a4;
          } };
        }
      });
      t3.addLeafExpression("objectLiteral", function(e3, t4, r4) {
        if (!r4.matchOpToken("{"))
          return;
        var n3 = [];
        var i3 = [];
        if (!r4.matchOpToken("}")) {
          do {
            var a4 = e3.requireElement("objectKey", r4);
            r4.requireOpToken(":");
            var o3 = e3.requireElement("expression", r4);
            i3.push(o3);
            n3.push(a4);
          } while (r4.matchOpToken(","));
          r4.requireOpToken("}");
        }
        return { type: "objectLiteral", args: [n3, i3], op: function(e4, t5, r5) {
          var n4 = {};
          for (var i4 = 0;i4 < t5.length; i4++) {
            n4[t5[i4]] = r5[i4];
          }
          return n4;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("nakedNamedArgumentList", function(e3, t4, r4) {
        var n3 = [];
        var i3 = [];
        if (r4.currentToken().type === "IDENTIFIER") {
          do {
            var a4 = r4.requireTokenType("IDENTIFIER");
            r4.requireOpToken(":");
            var o3 = e3.requireElement("expression", r4);
            i3.push(o3);
            n3.push({ name: a4, value: o3 });
          } while (r4.matchOpToken(","));
        }
        return { type: "namedArgumentList", fields: n3, args: [i3], op: function(e4, t5) {
          var r5 = { _namedArgList_: true };
          for (var i4 = 0;i4 < t5.length; i4++) {
            var a5 = n3[i4];
            r5[a5.name.value] = t5[i4];
          }
          return r5;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("namedArgumentList", function(e3, t4, r4) {
        if (!r4.matchOpToken("("))
          return;
        var n3 = e3.requireElement("nakedNamedArgumentList", r4);
        r4.requireOpToken(")");
        return n3;
      });
      t3.addGrammarElement("symbol", function(e3, t4, r4) {
        var n3 = "default";
        if (r4.matchToken("global")) {
          n3 = "global";
        } else if (r4.matchToken("element") || r4.matchToken("module")) {
          n3 = "element";
          if (r4.matchOpToken("'")) {
            r4.requireToken("s");
          }
        } else if (r4.matchToken("local")) {
          n3 = "local";
        }
        let i3 = r4.matchOpToken(":");
        let a4 = r4.matchTokenType("IDENTIFIER");
        if (a4 && a4.value) {
          var o3 = a4.value;
          if (i3) {
            o3 = ":" + o3;
          }
          if (n3 === "default") {
            if (o3.indexOf("$") === 0) {
              n3 = "global";
            }
            if (o3.indexOf(":") === 0) {
              n3 = "element";
            }
          }
          return { type: "symbol", token: a4, scope: n3, name: o3, evaluate: function(e4) {
            return t4.resolveSymbol(o3, e4, n3);
          } };
        }
      });
      t3.addGrammarElement("implicitMeTarget", function(e3, t4, r4) {
        return { type: "implicitMeTarget", evaluate: function(e4) {
          return e4.you || e4.me;
        } };
      });
      t3.addLeafExpression("boolean", function(e3, t4, r4) {
        var n3 = r4.matchToken("true") || r4.matchToken("false");
        if (!n3)
          return;
        const i3 = n3.value === "true";
        return { type: "boolean", evaluate: function(e4) {
          return i3;
        } };
      });
      t3.addLeafExpression("null", function(e3, t4, r4) {
        if (r4.matchToken("null")) {
          return { type: "null", evaluate: function(e4) {
            return null;
          } };
        }
      });
      t3.addLeafExpression("arrayLiteral", function(e3, t4, r4) {
        if (!r4.matchOpToken("["))
          return;
        var n3 = [];
        if (!r4.matchOpToken("]")) {
          do {
            var i3 = e3.requireElement("expression", r4);
            n3.push(i3);
          } while (r4.matchOpToken(","));
          r4.requireOpToken("]");
        }
        return { type: "arrayLiteral", values: n3, args: [n3], op: function(e4, t5) {
          return t5;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addLeafExpression("blockLiteral", function(e3, t4, r4) {
        if (!r4.matchOpToken("\\"))
          return;
        var n3 = [];
        var i3 = r4.matchTokenType("IDENTIFIER");
        if (i3) {
          n3.push(i3);
          while (r4.matchOpToken(",")) {
            n3.push(r4.requireTokenType("IDENTIFIER"));
          }
        }
        r4.requireOpToken("-");
        r4.requireOpToken(">");
        var a4 = e3.requireElement("expression", r4);
        return { type: "blockLiteral", args: n3, expr: a4, evaluate: function(e4) {
          var t5 = function() {
            for (var t6 = 0;t6 < n3.length; t6++) {
              e4.locals[n3[t6].value] = arguments[t6];
            }
            return a4.evaluate(e4);
          };
          return t5;
        } };
      });
      t3.addIndirectExpression("propertyAccess", function(e3, t4, r4, n3) {
        if (!r4.matchOpToken("."))
          return;
        var i3 = r4.requireTokenType("IDENTIFIER");
        var a4 = { type: "propertyAccess", root: n3, prop: i3, args: [n3], op: function(e4, r5) {
          var n4 = t4.resolveProperty(r5, i3.value);
          return n4;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return e3.parseElement("indirectExpression", r4, a4);
      });
      t3.addIndirectExpression("of", function(e3, t4, r4, n3) {
        if (!r4.matchToken("of"))
          return;
        var i3 = e3.requireElement("unaryExpression", r4);
        var a4 = null;
        var o3 = n3;
        while (o3.root) {
          a4 = o3;
          o3 = o3.root;
        }
        if (o3.type !== "symbol" && o3.type !== "attributeRef" && o3.type !== "styleRef" && o3.type !== "computedStyleRef") {
          e3.raiseParseError(r4, "Cannot take a property of a non-symbol: " + o3.type);
        }
        var s4 = o3.type === "attributeRef";
        var u4 = o3.type === "styleRef" || o3.type === "computedStyleRef";
        if (s4 || u4) {
          var l4 = o3;
        }
        var c5 = o3.name;
        var f4 = { type: "ofExpression", prop: o3.token, root: i3, attribute: l4, expression: n3, args: [i3], op: function(e4, r5) {
          if (s4) {
            return t4.resolveAttribute(r5, c5);
          } else if (u4) {
            if (o3.type === "computedStyleRef") {
              return t4.resolveComputedStyle(r5, c5);
            } else {
              return t4.resolveStyle(r5, c5);
            }
          } else {
            return t4.resolveProperty(r5, c5);
          }
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        if (o3.type === "attributeRef") {
          f4.attribute = o3;
        }
        if (a4) {
          a4.root = f4;
          a4.args = [f4];
        } else {
          n3 = f4;
        }
        return e3.parseElement("indirectExpression", r4, n3);
      });
      t3.addIndirectExpression("possessive", function(e3, t4, r4, n3) {
        if (e3.possessivesDisabled) {
          return;
        }
        var i3 = r4.matchOpToken("'");
        if (i3 || n3.type === "symbol" && (n3.name === "my" || n3.name === "its" || n3.name === "your") && (r4.currentToken().type === "IDENTIFIER" || r4.currentToken().type === "ATTRIBUTE_REF" || r4.currentToken().type === "STYLE_REF")) {
          if (i3) {
            r4.requireToken("s");
          }
          var a4, o3, s4;
          a4 = e3.parseElement("attributeRef", r4);
          if (a4 == null) {
            o3 = e3.parseElement("styleRef", r4);
            if (o3 == null) {
              s4 = r4.requireTokenType("IDENTIFIER");
            }
          }
          var u4 = { type: "possessive", root: n3, attribute: a4 || o3, prop: s4, args: [n3], op: function(e4, r5) {
            if (a4) {
              var n4 = t4.resolveAttribute(r5, a4.name);
            } else if (o3) {
              var n4;
              if (o3.type === "computedStyleRef") {
                n4 = t4.resolveComputedStyle(r5, o3["name"]);
              } else {
                n4 = t4.resolveStyle(r5, o3["name"]);
              }
            } else {
              var n4 = t4.resolveProperty(r5, s4.value);
            }
            return n4;
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
          return e3.parseElement("indirectExpression", r4, u4);
        }
      });
      t3.addIndirectExpression("inExpression", function(e3, t4, r4, n3) {
        if (!r4.matchToken("in"))
          return;
        var i3 = e3.requireElement("unaryExpression", r4);
        var a4 = { type: "inExpression", root: n3, args: [n3, i3], op: function(e4, r5, n4) {
          var i4 = [];
          if (r5.css) {
            t4.implicitLoop(n4, function(e5) {
              var t5 = e5.querySelectorAll(r5.css);
              for (var n5 = 0;n5 < t5.length; n5++) {
                i4.push(t5[n5]);
              }
            });
          } else if (r5 instanceof Element) {
            var a5 = false;
            t4.implicitLoop(n4, function(e5) {
              if (e5.contains(r5)) {
                a5 = true;
              }
            });
            if (a5) {
              return r5;
            }
          } else {
            t4.implicitLoop(r5, function(e5) {
              t4.implicitLoop(n4, function(t5) {
                if (e5 === t5) {
                  i4.push(e5);
                }
              });
            });
          }
          return i4;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return e3.parseElement("indirectExpression", r4, a4);
      });
      t3.addIndirectExpression("asExpression", function(e3, t4, r4, n3) {
        if (!r4.matchToken("as"))
          return;
        r4.matchToken("a") || r4.matchToken("an");
        var i3 = e3.requireElement("dotOrColonPath", r4).evaluate();
        var a4 = { type: "asExpression", root: n3, args: [n3], op: function(e4, r5) {
          return t4.convertValue(r5, i3);
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return e3.parseElement("indirectExpression", r4, a4);
      });
      t3.addIndirectExpression("functionCall", function(e3, t4, r4, n3) {
        if (!r4.matchOpToken("("))
          return;
        var i3 = [];
        if (!r4.matchOpToken(")")) {
          do {
            i3.push(e3.requireElement("expression", r4));
          } while (r4.matchOpToken(","));
          r4.requireOpToken(")");
        }
        if (n3.root) {
          var a4 = { type: "functionCall", root: n3, argExressions: i3, args: [n3.root, i3], op: function(e4, r5, i4) {
            t4.nullCheck(r5, n3.root);
            var a5 = r5[n3.prop.value];
            t4.nullCheck(a5, n3);
            if (a5.hyperfunc) {
              i4.push(e4);
            }
            return a5.apply(r5, i4);
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        } else {
          var a4 = { type: "functionCall", root: n3, argExressions: i3, args: [n3, i3], op: function(e4, r5, i4) {
            t4.nullCheck(r5, n3);
            if (r5.hyperfunc) {
              i4.push(e4);
            }
            var a5 = r5.apply(null, i4);
            return a5;
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        }
        return e3.parseElement("indirectExpression", r4, a4);
      });
      t3.addIndirectExpression("attributeRefAccess", function(e3, t4, r4, n3) {
        var i3 = e3.parseElement("attributeRef", r4);
        if (!i3)
          return;
        var a4 = { type: "attributeRefAccess", root: n3, attribute: i3, args: [n3], op: function(e4, r5) {
          var n4 = t4.resolveAttribute(r5, i3.name);
          return n4;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return a4;
      });
      t3.addIndirectExpression("arrayIndex", function(e3, t4, r4, n3) {
        if (!r4.matchOpToken("["))
          return;
        var i3 = false;
        var a4 = false;
        var o3 = null;
        var s4 = null;
        if (r4.matchOpToken("..")) {
          i3 = true;
          o3 = e3.requireElement("expression", r4);
        } else {
          o3 = e3.requireElement("expression", r4);
          if (r4.matchOpToken("..")) {
            a4 = true;
            var u4 = r4.currentToken();
            if (u4.type !== "R_BRACKET") {
              s4 = e3.parseElement("expression", r4);
            }
          }
        }
        r4.requireOpToken("]");
        var l4 = { type: "arrayIndex", root: n3, prop: o3, firstIndex: o3, secondIndex: s4, args: [n3, o3, s4], op: function(e4, t5, r5, n4) {
          if (t5 == null) {
            return null;
          }
          if (i3) {
            if (r5 < 0) {
              r5 = t5.length + r5;
            }
            return t5.slice(0, r5 + 1);
          } else if (a4) {
            if (n4 != null) {
              if (n4 < 0) {
                n4 = t5.length + n4;
              }
              return t5.slice(r5, n4 + 1);
            } else {
              return t5.slice(r5);
            }
          } else {
            return t5[r5];
          }
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return e3.parseElement("indirectExpression", r4, l4);
      });
      var a3 = ["em", "ex", "cap", "ch", "ic", "rem", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax", "cm", "mm", "Q", "pc", "pt", "px"];
      t3.addGrammarElement("postfixExpression", function(e3, t4, r4) {
        var n3 = e3.parseElement("primaryExpression", r4);
        let i3 = r4.matchAnyToken.apply(r4, a3) || r4.matchOpToken("%");
        if (i3) {
          return { type: "stringPostfix", postfix: i3.value, args: [n3], op: function(e4, t5) {
            return "" + t5 + i3.value;
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        }
        var o3 = null;
        if (r4.matchToken("s") || r4.matchToken("seconds")) {
          o3 = 1000;
        } else if (r4.matchToken("ms") || r4.matchToken("milliseconds")) {
          o3 = 1;
        }
        if (o3) {
          return { type: "timeExpression", time: n3, factor: o3, args: [n3], op: function(e4, t5) {
            return t5 * o3;
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        }
        if (r4.matchOpToken(":")) {
          var s4 = r4.requireTokenType("IDENTIFIER");
          if (!s4.value)
            return;
          var u4 = !r4.matchOpToken("!");
          return { type: "typeCheck", typeName: s4, nullOk: u4, args: [n3], op: function(e4, r5) {
            var n4 = t4.typeCheck(r5, this.typeName.value, u4);
            if (n4) {
              return r5;
            } else {
              throw new Error("Typecheck failed!  Expected: " + s4.value);
            }
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        } else {
          return n3;
        }
      });
      t3.addGrammarElement("logicalNot", function(e3, t4, r4) {
        if (!r4.matchToken("not"))
          return;
        var n3 = e3.requireElement("unaryExpression", r4);
        return { type: "logicalNot", root: n3, args: [n3], op: function(e4, t5) {
          return !t5;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("noExpression", function(e3, t4, r4) {
        if (!r4.matchToken("no"))
          return;
        var n3 = e3.requireElement("unaryExpression", r4);
        return { type: "noExpression", root: n3, args: [n3], op: function(e4, r5) {
          return t4.isEmpty(r5);
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addLeafExpression("some", function(e3, t4, r4) {
        if (!r4.matchToken("some"))
          return;
        var n3 = e3.requireElement("expression", r4);
        return { type: "noExpression", root: n3, args: [n3], op: function(e4, r5) {
          return !t4.isEmpty(r5);
        }, evaluate(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("negativeNumber", function(e3, t4, r4) {
        if (!r4.matchOpToken("-"))
          return;
        var n3 = e3.requireElement("unaryExpression", r4);
        return { type: "negativeNumber", root: n3, args: [n3], op: function(e4, t5) {
          return -1 * t5;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("unaryExpression", function(e3, t4, r4) {
        r4.matchToken("the");
        return e3.parseAnyOf(["beepExpression", "logicalNot", "relativePositionalExpression", "positionalExpression", "noExpression", "negativeNumber", "postfixExpression"], r4);
      });
      t3.addGrammarElement("beepExpression", function(e3, t4, r4) {
        if (!r4.matchToken("beep!"))
          return;
        var n3 = e3.parseElement("unaryExpression", r4);
        if (n3) {
          n3["booped"] = true;
          var i3 = n3.evaluate;
          n3.evaluate = function(e4) {
            let r5 = i3.apply(n3, arguments);
            let a4 = e4.me;
            t4.beepValueToConsole(a4, n3, r5);
            return r5;
          };
          return n3;
        }
      });
      var s3 = function(e3, t4, r4, n3) {
        var i3 = t4.querySelectorAll(r4);
        for (var a4 = 0;a4 < i3.length; a4++) {
          var o3 = i3[a4];
          if (o3.compareDocumentPosition(e3) === Node.DOCUMENT_POSITION_PRECEDING) {
            return o3;
          }
        }
        if (n3) {
          return i3[0];
        }
      };
      var u3 = function(e3, t4, r4, n3) {
        var i3 = t4.querySelectorAll(r4);
        for (var a4 = i3.length - 1;a4 >= 0; a4--) {
          var o3 = i3[a4];
          if (o3.compareDocumentPosition(e3) === Node.DOCUMENT_POSITION_FOLLOWING) {
            return o3;
          }
        }
        if (n3) {
          return i3[i3.length - 1];
        }
      };
      var l3 = function(e3, t4, r4, n3) {
        var i3 = [];
        o2.prototype.forEach(t4, function(t5) {
          if (t5.matches(r4) || t5 === e3) {
            i3.push(t5);
          }
        });
        for (var a4 = 0;a4 < i3.length - 1; a4++) {
          var s4 = i3[a4];
          if (s4 === e3) {
            return i3[a4 + 1];
          }
        }
        if (n3) {
          var u4 = i3[0];
          if (u4 && u4.matches(r4)) {
            return u4;
          }
        }
      };
      var c4 = function(e3, t4, r4, n3) {
        return l3(e3, Array.from(t4).reverse(), r4, n3);
      };
      t3.addGrammarElement("relativePositionalExpression", function(e3, t4, r4) {
        var n3 = r4.matchAnyToken("next", "previous");
        if (!n3)
          return;
        var a4 = n3.value === "next";
        var o3 = e3.parseElement("expression", r4);
        if (r4.matchToken("from")) {
          r4.pushFollow("in");
          try {
            var f4 = e3.requireElement("unaryExpression", r4);
          } finally {
            r4.popFollow();
          }
        } else {
          var f4 = e3.requireElement("implicitMeTarget", r4);
        }
        var m3 = false;
        var p4;
        if (r4.matchToken("in")) {
          m3 = true;
          var h4 = e3.requireElement("unaryExpression", r4);
        } else if (r4.matchToken("within")) {
          p4 = e3.requireElement("unaryExpression", r4);
        } else {
          p4 = document.body;
        }
        var v4 = false;
        if (r4.matchToken("with")) {
          r4.requireToken("wrapping");
          v4 = true;
        }
        return { type: "relativePositionalExpression", from: f4, forwardSearch: a4, inSearch: m3, wrapping: v4, inElt: h4, withinElt: p4, operator: n3.value, args: [o3, f4, h4, p4], op: function(e4, t5, r5, n4, f5) {
          var p5 = t5.css;
          if (p5 == null) {
            throw "Expected a CSS value to be returned by " + i2.sourceFor.apply(o3);
          }
          if (m3) {
            if (n4) {
              if (a4) {
                return l3(r5, n4, p5, v4);
              } else {
                return c4(r5, n4, p5, v4);
              }
            }
          } else {
            if (f5) {
              if (a4) {
                return s3(r5, f5, p5, v4);
              } else {
                return u3(r5, f5, p5, v4);
              }
            }
          }
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("positionalExpression", function(e3, t4, r4) {
        var n3 = r4.matchAnyToken("first", "last", "random");
        if (!n3)
          return;
        r4.matchAnyToken("in", "from", "of");
        var i3 = e3.requireElement("unaryExpression", r4);
        const a4 = n3.value;
        return { type: "positionalExpression", rhs: i3, operator: n3.value, args: [i3], op: function(e4, t5) {
          if (t5 && !Array.isArray(t5)) {
            if (t5.children) {
              t5 = t5.children;
            } else {
              t5 = Array.from(t5);
            }
          }
          if (t5) {
            if (a4 === "first") {
              return t5[0];
            } else if (a4 === "last") {
              return t5[t5.length - 1];
            } else if (a4 === "random") {
              return t5[Math.floor(Math.random() * t5.length)];
            }
          }
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
      });
      t3.addGrammarElement("mathOperator", function(e3, t4, r4) {
        var n3 = e3.parseElement("unaryExpression", r4);
        var i3, a4 = null;
        i3 = r4.matchAnyOpToken("+", "-", "*", "/") || r4.matchToken("mod");
        while (i3) {
          a4 = a4 || i3;
          var o3 = i3.value;
          if (a4.value !== o3) {
            e3.raiseParseError(r4, "You must parenthesize math operations with different operators");
          }
          var s4 = e3.parseElement("unaryExpression", r4);
          n3 = { type: "mathOperator", lhs: n3, rhs: s4, operator: o3, args: [n3, s4], op: function(e4, t5, r5) {
            if (o3 === "+") {
              return t5 + r5;
            } else if (o3 === "-") {
              return t5 - r5;
            } else if (o3 === "*") {
              return t5 * r5;
            } else if (o3 === "/") {
              return t5 / r5;
            } else if (o3 === "mod") {
              return t5 % r5;
            }
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
          i3 = r4.matchAnyOpToken("+", "-", "*", "/") || r4.matchToken("mod");
        }
        return n3;
      });
      t3.addGrammarElement("mathExpression", function(e3, t4, r4) {
        return e3.parseAnyOf(["mathOperator", "unaryExpression"], r4);
      });
      function f3(e3, t4, r4) {
        if (t4["contains"]) {
          return t4.contains(r4);
        } else if (t4["includes"]) {
          return t4.includes(r4);
        } else {
          throw Error("The value of " + e3.sourceFor() + " does not have a contains or includes method on it");
        }
      }
      function p3(e3, t4, r4) {
        if (t4["match"]) {
          return !!t4.match(r4);
        } else if (t4["matches"]) {
          return t4.matches(r4);
        } else {
          throw Error("The value of " + e3.sourceFor() + " does not have a match or matches method on it");
        }
      }
      t3.addGrammarElement("comparisonOperator", function(e3, t4, r4) {
        var n3 = e3.parseElement("mathExpression", r4);
        var i3 = r4.matchAnyOpToken("<", ">", "<=", ">=", "==", "===", "!=", "!==");
        var a4 = i3 ? i3.value : null;
        var o3 = true;
        var s4 = false;
        if (a4 == null) {
          if (r4.matchToken("is") || r4.matchToken("am")) {
            if (r4.matchToken("not")) {
              if (r4.matchToken("in")) {
                a4 = "not in";
              } else if (r4.matchToken("a")) {
                a4 = "not a";
                s4 = true;
              } else if (r4.matchToken("empty")) {
                a4 = "not empty";
                o3 = false;
              } else {
                if (r4.matchToken("really")) {
                  a4 = "!==";
                } else {
                  a4 = "!=";
                }
                if (r4.matchToken("equal")) {
                  r4.matchToken("to");
                }
              }
            } else if (r4.matchToken("in")) {
              a4 = "in";
            } else if (r4.matchToken("a")) {
              a4 = "a";
              s4 = true;
            } else if (r4.matchToken("empty")) {
              a4 = "empty";
              o3 = false;
            } else if (r4.matchToken("less")) {
              r4.requireToken("than");
              if (r4.matchToken("or")) {
                r4.requireToken("equal");
                r4.requireToken("to");
                a4 = "<=";
              } else {
                a4 = "<";
              }
            } else if (r4.matchToken("greater")) {
              r4.requireToken("than");
              if (r4.matchToken("or")) {
                r4.requireToken("equal");
                r4.requireToken("to");
                a4 = ">=";
              } else {
                a4 = ">";
              }
            } else {
              if (r4.matchToken("really")) {
                a4 = "===";
              } else {
                a4 = "==";
              }
              if (r4.matchToken("equal")) {
                r4.matchToken("to");
              }
            }
          } else if (r4.matchToken("equals")) {
            a4 = "==";
          } else if (r4.matchToken("really")) {
            r4.requireToken("equals");
            a4 = "===";
          } else if (r4.matchToken("exist") || r4.matchToken("exists")) {
            a4 = "exist";
            o3 = false;
          } else if (r4.matchToken("matches") || r4.matchToken("match")) {
            a4 = "match";
          } else if (r4.matchToken("contains") || r4.matchToken("contain")) {
            a4 = "contain";
          } else if (r4.matchToken("includes") || r4.matchToken("include")) {
            a4 = "include";
          } else if (r4.matchToken("do") || r4.matchToken("does")) {
            r4.requireToken("not");
            if (r4.matchToken("matches") || r4.matchToken("match")) {
              a4 = "not match";
            } else if (r4.matchToken("contains") || r4.matchToken("contain")) {
              a4 = "not contain";
            } else if (r4.matchToken("exist") || r4.matchToken("exist")) {
              a4 = "not exist";
              o3 = false;
            } else if (r4.matchToken("include")) {
              a4 = "not include";
            } else {
              e3.raiseParseError(r4, "Expected matches or contains");
            }
          }
        }
        if (a4) {
          var u4, l4, c5;
          if (s4) {
            u4 = r4.requireTokenType("IDENTIFIER");
            l4 = !r4.matchOpToken("!");
          } else if (o3) {
            c5 = e3.requireElement("mathExpression", r4);
            if (a4 === "match" || a4 === "not match") {
              c5 = c5.css ? c5.css : c5;
            }
          }
          var m3 = n3;
          n3 = { type: "comparisonOperator", operator: a4, typeName: u4, nullOk: l4, lhs: n3, rhs: c5, args: [n3, c5], op: function(e4, r5, n4) {
            if (a4 === "==") {
              return r5 == n4;
            } else if (a4 === "!=") {
              return r5 != n4;
            }
            if (a4 === "===") {
              return r5 === n4;
            } else if (a4 === "!==") {
              return r5 !== n4;
            }
            if (a4 === "match") {
              return r5 != null && p3(m3, r5, n4);
            }
            if (a4 === "not match") {
              return r5 == null || !p3(m3, r5, n4);
            }
            if (a4 === "in") {
              return n4 != null && f3(c5, n4, r5);
            }
            if (a4 === "not in") {
              return n4 == null || !f3(c5, n4, r5);
            }
            if (a4 === "contain") {
              return r5 != null && f3(m3, r5, n4);
            }
            if (a4 === "not contain") {
              return r5 == null || !f3(m3, r5, n4);
            }
            if (a4 === "include") {
              return r5 != null && f3(m3, r5, n4);
            }
            if (a4 === "not include") {
              return r5 == null || !f3(m3, r5, n4);
            }
            if (a4 === "===") {
              return r5 === n4;
            } else if (a4 === "!==") {
              return r5 !== n4;
            } else if (a4 === "<") {
              return r5 < n4;
            } else if (a4 === ">") {
              return r5 > n4;
            } else if (a4 === "<=") {
              return r5 <= n4;
            } else if (a4 === ">=") {
              return r5 >= n4;
            } else if (a4 === "empty") {
              return t4.isEmpty(r5);
            } else if (a4 === "not empty") {
              return !t4.isEmpty(r5);
            } else if (a4 === "exist") {
              return t4.doesExist(r5);
            } else if (a4 === "not exist") {
              return !t4.doesExist(r5);
            } else if (a4 === "a") {
              return t4.typeCheck(r5, u4.value, l4);
            } else if (a4 === "not a") {
              return !t4.typeCheck(r5, u4.value, l4);
            } else {
              throw "Unknown comparison : " + a4;
            }
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
        }
        return n3;
      });
      t3.addGrammarElement("comparisonExpression", function(e3, t4, r4) {
        return e3.parseAnyOf(["comparisonOperator", "mathExpression"], r4);
      });
      t3.addGrammarElement("logicalOperator", function(e3, t4, r4) {
        var n3 = e3.parseElement("comparisonExpression", r4);
        var i3, a4 = null;
        i3 = r4.matchToken("and") || r4.matchToken("or");
        while (i3) {
          a4 = a4 || i3;
          if (a4.value !== i3.value) {
            e3.raiseParseError(r4, "You must parenthesize logical operations with different operators");
          }
          var o3 = e3.requireElement("comparisonExpression", r4);
          const s4 = i3.value;
          n3 = { type: "logicalOperator", operator: s4, lhs: n3, rhs: o3, args: [n3, o3], op: function(e4, t5, r5) {
            if (s4 === "and") {
              return t5 && r5;
            } else {
              return t5 || r5;
            }
          }, evaluate: function(e4) {
            return t4.unifiedEval(this, e4);
          } };
          i3 = r4.matchToken("and") || r4.matchToken("or");
        }
        return n3;
      });
      t3.addGrammarElement("logicalExpression", function(e3, t4, r4) {
        return e3.parseAnyOf(["logicalOperator", "mathExpression"], r4);
      });
      t3.addGrammarElement("asyncExpression", function(e3, t4, r4) {
        if (r4.matchToken("async")) {
          var n3 = e3.requireElement("logicalExpression", r4);
          var i3 = { type: "asyncExpression", value: n3, evaluate: function(e4) {
            return { asyncWrapper: true, value: this.value.evaluate(e4) };
          } };
          return i3;
        } else {
          return e3.parseElement("logicalExpression", r4);
        }
      });
      t3.addGrammarElement("expression", function(e3, t4, r4) {
        r4.matchToken("the");
        return e3.parseElement("asyncExpression", r4);
      });
      t3.addGrammarElement("assignableExpression", function(e3, t4, r4) {
        r4.matchToken("the");
        var n3 = e3.parseElement("primaryExpression", r4);
        if (n3 && (n3.type === "symbol" || n3.type === "ofExpression" || n3.type === "propertyAccess" || n3.type === "attributeRefAccess" || n3.type === "attributeRef" || n3.type === "styleRef" || n3.type === "arrayIndex" || n3.type === "possessive")) {
          return n3;
        } else {
          e3.raiseParseError(r4, "A target expression must be writable.  The expression type '" + (n3 && n3.type) + "' is not.");
        }
        return n3;
      });
      t3.addGrammarElement("hyperscript", function(e3, t4, r4) {
        var n3 = [];
        if (r4.hasMore()) {
          while (e3.featureStart(r4.currentToken()) || r4.currentToken().value === "(") {
            var i3 = e3.requireElement("feature", r4);
            n3.push(i3);
            r4.matchToken("end");
          }
        }
        return { type: "hyperscript", features: n3, apply: function(e4, t5, r5) {
          for (const i4 of n3) {
            i4.install(e4, t5, r5);
          }
        } };
      });
      var v3 = function(e3) {
        var t4 = [];
        if (e3.token(0).value === "(" && (e3.token(1).value === ")" || e3.token(2).value === "," || e3.token(2).value === ")")) {
          e3.matchOpToken("(");
          do {
            t4.push(e3.requireTokenType("IDENTIFIER"));
          } while (e3.matchOpToken(","));
          e3.requireOpToken(")");
        }
        return t4;
      };
      t3.addFeature("on", function(e3, t4, r4) {
        if (!r4.matchToken("on"))
          return;
        var n3 = false;
        if (r4.matchToken("every")) {
          n3 = true;
        }
        var i3 = [];
        var a4 = null;
        do {
          var o3 = e3.requireElement("eventName", r4, "Expected event name");
          var s4 = o3.evaluate();
          if (a4) {
            a4 = a4 + " or " + s4;
          } else {
            a4 = "on " + s4;
          }
          var u4 = v3(r4);
          var l4 = null;
          if (r4.matchOpToken("[")) {
            l4 = e3.requireElement("expression", r4);
            r4.requireOpToken("]");
          }
          var c5, f4, m3;
          if (r4.currentToken().type === "NUMBER") {
            var p4 = r4.consumeToken();
            if (!p4.value)
              return;
            c5 = parseInt(p4.value);
            if (r4.matchToken("to")) {
              var h4 = r4.consumeToken();
              if (!h4.value)
                return;
              f4 = parseInt(h4.value);
            } else if (r4.matchToken("and")) {
              m3 = true;
              r4.requireToken("on");
            }
          }
          var d5, E3;
          if (s4 === "intersection") {
            d5 = {};
            if (r4.matchToken("with")) {
              d5["with"] = e3.requireElement("expression", r4).evaluate();
            }
            if (r4.matchToken("having")) {
              do {
                if (r4.matchToken("margin")) {
                  d5["rootMargin"] = e3.requireElement("stringLike", r4).evaluate();
                } else if (r4.matchToken("threshold")) {
                  d5["threshold"] = e3.requireElement("expression", r4).evaluate();
                } else {
                  e3.raiseParseError(r4, "Unknown intersection config specification");
                }
              } while (r4.matchToken("and"));
            }
          } else if (s4 === "mutation") {
            E3 = {};
            if (r4.matchToken("of")) {
              do {
                if (r4.matchToken("anything")) {
                  E3["attributes"] = true;
                  E3["subtree"] = true;
                  E3["characterData"] = true;
                  E3["childList"] = true;
                } else if (r4.matchToken("childList")) {
                  E3["childList"] = true;
                } else if (r4.matchToken("attributes")) {
                  E3["attributes"] = true;
                  E3["attributeOldValue"] = true;
                } else if (r4.matchToken("subtree")) {
                  E3["subtree"] = true;
                } else if (r4.matchToken("characterData")) {
                  E3["characterData"] = true;
                  E3["characterDataOldValue"] = true;
                } else if (r4.currentToken().type === "ATTRIBUTE_REF") {
                  var T4 = r4.consumeToken();
                  if (E3["attributeFilter"] == null) {
                    E3["attributeFilter"] = [];
                  }
                  if (T4.value.indexOf("@") == 0) {
                    E3["attributeFilter"].push(T4.value.substring(1));
                  } else {
                    e3.raiseParseError(r4, "Only shorthand attribute references are allowed here");
                  }
                } else {
                  e3.raiseParseError(r4, "Unknown mutation config specification");
                }
              } while (r4.matchToken("or"));
            } else {
              E3["attributes"] = true;
              E3["characterData"] = true;
              E3["childList"] = true;
            }
          }
          var y4 = null;
          var k4 = false;
          if (r4.matchToken("from")) {
            if (r4.matchToken("elsewhere")) {
              k4 = true;
            } else {
              r4.pushFollow("or");
              try {
                y4 = e3.requireElement("expression", r4);
              } finally {
                r4.popFollow();
              }
              if (!y4) {
                e3.raiseParseError(r4, 'Expected either target value or "elsewhere".');
              }
            }
          }
          if (y4 === null && k4 === false && r4.matchToken("elsewhere")) {
            k4 = true;
          }
          if (r4.matchToken("in")) {
            var x4 = e3.parseElement("unaryExpression", r4);
          }
          if (r4.matchToken("debounced")) {
            r4.requireToken("at");
            var g4 = e3.requireElement("unaryExpression", r4);
            var b4 = g4.evaluate({});
          } else if (r4.matchToken("throttled")) {
            r4.requireToken("at");
            var g4 = e3.requireElement("unaryExpression", r4);
            var w4 = g4.evaluate({});
          }
          i3.push({ execCount: 0, every: n3, on: s4, args: u4, filter: l4, from: y4, inExpr: x4, elsewhere: k4, startCount: c5, endCount: f4, unbounded: m3, debounceTime: b4, throttleTime: w4, mutationSpec: E3, intersectionSpec: d5, debounced: undefined, lastExec: undefined });
        } while (r4.matchToken("or"));
        var S4 = true;
        if (!n3) {
          if (r4.matchToken("queue")) {
            if (r4.matchToken("all")) {
              var q3 = true;
              var S4 = false;
            } else if (r4.matchToken("first")) {
              var N2 = true;
            } else if (r4.matchToken("none")) {
              var I3 = true;
            } else {
              r4.requireToken("last");
            }
          }
        }
        var C2 = e3.requireElement("commandList", r4);
        e3.ensureTerminated(C2);
        var R3, A3;
        if (r4.matchToken("catch")) {
          R3 = r4.requireTokenType("IDENTIFIER").value;
          A3 = e3.requireElement("commandList", r4);
          e3.ensureTerminated(A3);
        }
        if (r4.matchToken("finally")) {
          var L2 = e3.requireElement("commandList", r4);
          e3.ensureTerminated(L2);
        }
        var O2 = { displayName: a4, events: i3, start: C2, every: n3, execCount: 0, errorHandler: A3, errorSymbol: R3, execute: function(e4) {
          let r5 = t4.getEventQueueFor(e4.me, O2);
          if (r5.executing && n3 === false) {
            if (I3 || N2 && r5.queue.length > 0) {
              return;
            }
            if (S4) {
              r5.queue.length = 0;
            }
            r5.queue.push(e4);
            return;
          }
          O2.execCount++;
          r5.executing = true;
          e4.meta.onHalt = function() {
            r5.executing = false;
            var e5 = r5.queue.shift();
            if (e5) {
              setTimeout(function() {
                O2.execute(e5);
              }, 1);
            }
          };
          e4.meta.reject = function(r6) {
            console.error(r6.message ? r6.message : r6);
            var n4 = t4.getHyperTrace(e4, r6);
            if (n4) {
              n4.print();
            }
            t4.triggerEvent(e4.me, "exception", { error: r6 });
          };
          C2.execute(e4);
        }, install: function(e4, r5) {
          for (const r6 of O2.events) {
            var n4;
            if (r6.elsewhere) {
              n4 = [document];
            } else if (r6.from) {
              n4 = r6.from.evaluate(t4.makeContext(e4, O2, e4, null));
            } else {
              n4 = [e4];
            }
            t4.implicitLoop(n4, function(n5) {
              var i4 = r6.on;
              if (n5 == null) {
                console.warn("'%s' feature ignored because target does not exists:", a4, e4);
                return;
              }
              if (r6.mutationSpec) {
                i4 = "hyperscript:mutation";
                const e5 = new MutationObserver(function(e6, r7) {
                  if (!O2.executing) {
                    t4.triggerEvent(n5, i4, { mutationList: e6, observer: r7 });
                  }
                });
                e5.observe(n5, r6.mutationSpec);
              }
              if (r6.intersectionSpec) {
                i4 = "hyperscript:intersection";
                const e5 = new IntersectionObserver(function(r7) {
                  for (const o5 of r7) {
                    var a5 = { observer: e5 };
                    a5 = Object.assign(a5, o5);
                    a5["intersecting"] = o5.isIntersecting;
                    t4.triggerEvent(n5, i4, a5);
                  }
                }, r6.intersectionSpec);
                e5.observe(n5);
              }
              var o4 = n5.addEventListener || n5.on;
              o4.call(n5, i4, function a(o5) {
                if (typeof Node !== "undefined" && e4 instanceof Node && n5 !== e4 && !e4.isConnected) {
                  n5.removeEventListener(i4, a);
                  return;
                }
                var s5 = t4.makeContext(e4, O2, e4, o5);
                if (r6.elsewhere && e4.contains(o5.target)) {
                  return;
                }
                if (r6.from) {
                  s5.result = n5;
                }
                for (const e5 of r6.args) {
                  let t5 = s5.event[e5.value];
                  if (t5 !== undefined) {
                    s5.locals[e5.value] = t5;
                  } else if ("detail" in s5.event) {
                    s5.locals[e5.value] = s5.event["detail"][e5.value];
                  }
                }
                s5.meta.errorHandler = A3;
                s5.meta.errorSymbol = R3;
                s5.meta.finallyHandler = L2;
                if (r6.filter) {
                  var u5 = s5.meta.context;
                  s5.meta.context = s5.event;
                  try {
                    var l5 = r6.filter.evaluate(s5);
                    if (l5) {
                    } else {
                      return;
                    }
                  } finally {
                    s5.meta.context = u5;
                  }
                }
                if (r6.inExpr) {
                  var c6 = o5.target;
                  while (true) {
                    if (c6.matches && c6.matches(r6.inExpr.css)) {
                      s5.result = c6;
                      break;
                    } else {
                      c6 = c6.parentElement;
                      if (c6 == null) {
                        return;
                      }
                    }
                  }
                }
                r6.execCount++;
                if (r6.startCount) {
                  if (r6.endCount) {
                    if (r6.execCount < r6.startCount || r6.execCount > r6.endCount) {
                      return;
                    }
                  } else if (r6.unbounded) {
                    if (r6.execCount < r6.startCount) {
                      return;
                    }
                  } else if (r6.execCount !== r6.startCount) {
                    return;
                  }
                }
                if (r6.debounceTime) {
                  if (r6.debounced) {
                    clearTimeout(r6.debounced);
                  }
                  r6.debounced = setTimeout(function() {
                    O2.execute(s5);
                  }, r6.debounceTime);
                  return;
                }
                if (r6.throttleTime) {
                  if (r6.lastExec && Date.now() < r6.lastExec + r6.throttleTime) {
                    return;
                  } else {
                    r6.lastExec = Date.now();
                  }
                }
                O2.execute(s5);
              });
            });
          }
        } };
        e3.setParent(C2, O2);
        return O2;
      });
      t3.addFeature("def", function(e3, t4, r4) {
        if (!r4.matchToken("def"))
          return;
        var n3 = e3.requireElement("dotOrColonPath", r4);
        var i3 = n3.evaluate();
        var a4 = i3.split(".");
        var o3 = a4.pop();
        var s4 = [];
        if (r4.matchOpToken("(")) {
          if (r4.matchOpToken(")")) {
          } else {
            do {
              s4.push(r4.requireTokenType("IDENTIFIER"));
            } while (r4.matchOpToken(","));
            r4.requireOpToken(")");
          }
        }
        var u4 = e3.requireElement("commandList", r4);
        var l4, c5;
        if (r4.matchToken("catch")) {
          l4 = r4.requireTokenType("IDENTIFIER").value;
          c5 = e3.parseElement("commandList", r4);
        }
        if (r4.matchToken("finally")) {
          var f4 = e3.requireElement("commandList", r4);
          e3.ensureTerminated(f4);
        }
        var m3 = { displayName: o3 + "(" + s4.map(function(e4) {
          return e4.value;
        }).join(", ") + ")", name: o3, args: s4, start: u4, errorHandler: c5, errorSymbol: l4, finallyHandler: f4, install: function(e4, r5) {
          var n4 = function() {
            var n5 = t4.makeContext(r5, m3, e4, null);
            n5.meta.errorHandler = c5;
            n5.meta.errorSymbol = l4;
            n5.meta.finallyHandler = f4;
            for (var i4 = 0;i4 < s4.length; i4++) {
              var a5 = s4[i4];
              var o4 = arguments[i4];
              if (a5) {
                n5.locals[a5.value] = o4;
              }
            }
            n5.meta.caller = arguments[s4.length];
            if (n5.meta.caller) {
              n5.meta.callingCommand = n5.meta.caller.meta.command;
            }
            var p4, h4 = null;
            var v4 = new Promise(function(e5, t5) {
              p4 = e5;
              h4 = t5;
            });
            u4.execute(n5);
            if (n5.meta.returned) {
              return n5.meta.returnValue;
            } else {
              n5.meta.resolve = p4;
              n5.meta.reject = h4;
              return v4;
            }
          };
          n4.hyperfunc = true;
          n4.hypername = i3;
          t4.assignToNamespace(e4, a4, o3, n4);
        } };
        e3.ensureTerminated(u4);
        if (c5) {
          e3.ensureTerminated(c5);
        }
        e3.setParent(u4, m3);
        return m3;
      });
      t3.addFeature("set", function(e3, t4, r4) {
        let n3 = e3.parseElement("setCommand", r4);
        if (n3) {
          if (n3.target.scope !== "element") {
            e3.raiseParseError(r4, "variables declared at the feature level must be element scoped.");
          }
          let i3 = { start: n3, install: function(e4, r5) {
            n3 && n3.execute(t4.makeContext(e4, i3, e4, null));
          } };
          e3.ensureTerminated(n3);
          return i3;
        }
      });
      t3.addFeature("init", function(e3, t4, r4) {
        if (!r4.matchToken("init"))
          return;
        var n3 = r4.matchToken("immediately");
        var i3 = e3.requireElement("commandList", r4);
        var a4 = { start: i3, install: function(e4, r5) {
          let o3 = function() {
            i3 && i3.execute(t4.makeContext(e4, a4, e4, null));
          };
          if (n3) {
            o3();
          } else {
            setTimeout(o3, 0);
          }
        } };
        e3.ensureTerminated(i3);
        e3.setParent(i3, a4);
        return a4;
      });
      t3.addFeature("worker", function(e3, t4, r4) {
        if (r4.matchToken("worker")) {
          e3.raiseParseError(r4, "In order to use the 'worker' feature, include the _hyperscript worker plugin. See https://hyperscript.org/features/worker/ for more info.");
          return;
        }
      });
      t3.addFeature("behavior", function(t4, r4, n3) {
        if (!n3.matchToken("behavior"))
          return;
        var i3 = t4.requireElement("dotOrColonPath", n3).evaluate();
        var a4 = i3.split(".");
        var o3 = a4.pop();
        var s4 = [];
        if (n3.matchOpToken("(") && !n3.matchOpToken(")")) {
          do {
            s4.push(n3.requireTokenType("IDENTIFIER").value);
          } while (n3.matchOpToken(","));
          n3.requireOpToken(")");
        }
        var u4 = t4.requireElement("hyperscript", n3);
        for (var l4 = 0;l4 < u4.features.length; l4++) {
          var c5 = u4.features[l4];
          c5.behavior = i3;
        }
        return { install: function(t5, n4) {
          r4.assignToNamespace(e2.document && e2.document.body, a4, o3, function(e3, t6, n5) {
            var a5 = r4.getInternalData(e3);
            var o4 = h3(a5, i3 + "Scope");
            for (var l5 = 0;l5 < s4.length; l5++) {
              o4[s4[l5]] = n5[s4[l5]];
            }
            u4.apply(e3, t6);
          });
        } };
      });
      t3.addFeature("install", function(t4, r4, n3) {
        if (!n3.matchToken("install"))
          return;
        var i3 = t4.requireElement("dotOrColonPath", n3).evaluate();
        var a4 = i3.split(".");
        var o3 = t4.parseElement("namedArgumentList", n3);
        var s4;
        return s4 = { install: function(t5, n4) {
          r4.unifiedEval({ args: [o3], op: function(r5, o4) {
            var s5 = e2;
            for (var u4 = 0;u4 < a4.length; u4++) {
              s5 = s5[a4[u4]];
              if (typeof s5 !== "object" && typeof s5 !== "function")
                throw new Error("No such behavior defined as " + i3);
            }
            if (!(s5 instanceof Function))
              throw new Error(i3 + " is not a behavior");
            s5(t5, n4, o4);
          } }, r4.makeContext(t5, s4, t5, null));
        } };
      });
      t3.addGrammarElement("jsBody", function(e3, t4, r4) {
        var n3 = r4.currentToken().start;
        var i3 = r4.currentToken();
        var a4 = [];
        var o3 = "";
        var s4 = false;
        while (r4.hasMore()) {
          i3 = r4.consumeToken();
          var u4 = r4.token(0, true);
          if (u4.type === "IDENTIFIER" && u4.value === "end") {
            break;
          }
          if (s4) {
            if (i3.type === "IDENTIFIER" || i3.type === "NUMBER") {
              o3 += i3.value;
            } else {
              if (o3 !== "")
                a4.push(o3);
              o3 = "";
              s4 = false;
            }
          } else if (i3.type === "IDENTIFIER" && i3.value === "function") {
            s4 = true;
          }
        }
        var l4 = i3.end + 1;
        return { type: "jsBody", exposedFunctionNames: a4, jsSource: r4.source.substring(n3, l4) };
      });
      t3.addFeature("js", function(t4, r4, n3) {
        if (!n3.matchToken("js"))
          return;
        var i3 = t4.requireElement("jsBody", n3);
        var a4 = i3.jsSource + "\nreturn { " + i3.exposedFunctionNames.map(function(e3) {
          return e3 + ":" + e3;
        }).join(",") + " } ";
        var o3 = new Function(a4);
        return { jsSource: a4, function: o3, exposedFunctionNames: i3.exposedFunctionNames, install: function() {
          Object.assign(e2, o3());
        } };
      });
      t3.addCommand("js", function(t4, r4, n3) {
        if (!n3.matchToken("js"))
          return;
        var i3 = [];
        if (n3.matchOpToken("(")) {
          if (n3.matchOpToken(")")) {
          } else {
            do {
              var a4 = n3.requireTokenType("IDENTIFIER");
              i3.push(a4.value);
            } while (n3.matchOpToken(","));
            n3.requireOpToken(")");
          }
        }
        var o3 = t4.requireElement("jsBody", n3);
        n3.matchToken("end");
        var s4 = E2(Function, i3.concat([o3.jsSource]));
        var u4 = { jsSource: o3.jsSource, function: s4, inputs: i3, op: function(t5) {
          var n4 = [];
          i3.forEach(function(e3) {
            n4.push(r4.resolveSymbol(e3, t5, "default"));
          });
          var a5 = s4.apply(e2, n4);
          if (a5 && typeof a5.then === "function") {
            return new Promise(function(e3) {
              a5.then(function(n5) {
                t5.result = n5;
                e3(r4.findNext(this, t5));
              });
            });
          } else {
            t5.result = a5;
            return r4.findNext(this, t5);
          }
        } };
        return u4;
      });
      t3.addCommand("async", function(e3, t4, r4) {
        if (!r4.matchToken("async"))
          return;
        if (r4.matchToken("do")) {
          var n3 = e3.requireElement("commandList", r4);
          var i3 = n3;
          while (i3.next)
            i3 = i3.next;
          i3.next = t4.HALT;
          r4.requireToken("end");
        } else {
          var n3 = e3.requireElement("command", r4);
        }
        var a4 = { body: n3, op: function(e4) {
          setTimeout(function() {
            n3.execute(e4);
          });
          return t4.findNext(this, e4);
        } };
        e3.setParent(n3, a4);
        return a4;
      });
      t3.addCommand("tell", function(e3, t4, r4) {
        var n3 = r4.currentToken();
        if (!r4.matchToken("tell"))
          return;
        var i3 = e3.requireElement("expression", r4);
        var a4 = e3.requireElement("commandList", r4);
        if (r4.hasMore() && !e3.featureStart(r4.currentToken())) {
          r4.requireToken("end");
        }
        var o3 = "tell_" + n3.start;
        var s4 = { value: i3, body: a4, args: [i3], resolveNext: function(e4) {
          var r5 = e4.meta.iterators[o3];
          if (r5.index < r5.value.length) {
            e4.you = r5.value[r5.index++];
            return a4;
          } else {
            e4.you = r5.originalYou;
            if (this.next) {
              return this.next;
            } else {
              return t4.findNext(this.parent, e4);
            }
          }
        }, op: function(e4, t5) {
          if (t5 == null) {
            t5 = [];
          } else if (!(Array.isArray(t5) || t5 instanceof NodeList)) {
            t5 = [t5];
          }
          e4.meta.iterators[o3] = { originalYou: e4.you, index: 0, value: t5 };
          return this.resolveNext(e4);
        } };
        e3.setParent(a4, s4);
        return s4;
      });
      t3.addCommand("wait", function(e3, t4, r4) {
        if (!r4.matchToken("wait"))
          return;
        var n3;
        if (r4.matchToken("for")) {
          r4.matchToken("a");
          var i3 = [];
          do {
            var a4 = r4.token(0);
            if (a4.type === "NUMBER" || a4.type === "L_PAREN") {
              i3.push({ time: e3.requireElement("expression", r4).evaluate() });
            } else {
              i3.push({ name: e3.requireElement("dotOrColonPath", r4, "Expected event name").evaluate(), args: v3(r4) });
            }
          } while (r4.matchToken("or"));
          if (r4.matchToken("from")) {
            var o3 = e3.requireElement("expression", r4);
          }
          n3 = { event: i3, on: o3, args: [o3], op: function(e4, r5) {
            var n4 = r5 ? r5 : e4.me;
            if (!(n4 instanceof EventTarget))
              throw new Error("Not a valid event target: " + this.on.sourceFor());
            return new Promise((r6) => {
              var a5 = false;
              for (const s5 of i3) {
                var o4 = (n5) => {
                  e4.result = n5;
                  if (s5.args) {
                    for (const t5 of s5.args) {
                      e4.locals[t5.value] = n5[t5.value] || (n5.detail ? n5.detail[t5.value] : null);
                    }
                  }
                  if (!a5) {
                    a5 = true;
                    r6(t4.findNext(this, e4));
                  }
                };
                if (s5.name) {
                  n4.addEventListener(s5.name, o4, { once: true });
                } else if (s5.time != null) {
                  setTimeout(o4, s5.time, s5.time);
                }
              }
            });
          } };
          return n3;
        } else {
          var s4;
          if (r4.matchToken("a")) {
            r4.requireToken("tick");
            s4 = 0;
          } else {
            s4 = e3.requireElement("expression", r4);
          }
          n3 = { type: "waitCmd", time: s4, args: [s4], op: function(e4, r5) {
            return new Promise((n4) => {
              setTimeout(() => {
                n4(t4.findNext(this, e4));
              }, r5);
            });
          }, execute: function(e4) {
            return t4.unifiedExec(this, e4);
          } };
          return n3;
        }
      });
      t3.addGrammarElement("dotOrColonPath", function(e3, t4, r4) {
        var n3 = r4.matchTokenType("IDENTIFIER");
        if (n3) {
          var i3 = [n3.value];
          var a4 = r4.matchOpToken(".") || r4.matchOpToken(":");
          if (a4) {
            do {
              i3.push(r4.requireTokenType("IDENTIFIER", "NUMBER").value);
            } while (r4.matchOpToken(a4.value));
          }
          return { type: "dotOrColonPath", path: i3, evaluate: function() {
            return i3.join(a4 ? a4.value : "");
          } };
        }
      });
      t3.addGrammarElement("eventName", function(e3, t4, r4) {
        var n3;
        if (n3 = r4.matchTokenType("STRING")) {
          return { evaluate: function() {
            return n3.value;
          } };
        }
        return e3.parseElement("dotOrColonPath", r4);
      });
      function d4(e3, t4, r4, n3) {
        var i3 = t4.requireElement("eventName", n3);
        var a4 = t4.parseElement("namedArgumentList", n3);
        if (e3 === "send" && n3.matchToken("to") || e3 === "trigger" && n3.matchToken("on")) {
          var o3 = t4.requireElement("expression", n3);
        } else {
          var o3 = t4.requireElement("implicitMeTarget", n3);
        }
        var s4 = { eventName: i3, details: a4, to: o3, args: [o3, i3, a4], op: function(e4, t5, n4, i4) {
          r4.nullCheck(t5, o3);
          r4.implicitLoop(t5, function(t6) {
            r4.triggerEvent(t6, n4, i4, e4.me);
          });
          return r4.findNext(s4, e4);
        } };
        return s4;
      }
      t3.addCommand("trigger", function(e3, t4, r4) {
        if (r4.matchToken("trigger")) {
          return d4("trigger", e3, t4, r4);
        }
      });
      t3.addCommand("send", function(e3, t4, r4) {
        if (r4.matchToken("send")) {
          return d4("send", e3, t4, r4);
        }
      });
      var T3 = function(e3, t4, r4, n3) {
        if (n3) {
          if (e3.commandBoundary(r4.currentToken())) {
            e3.raiseParseError(r4, "'return' commands must return a value.  If you do not wish to return a value, use 'exit' instead.");
          } else {
            var i3 = e3.requireElement("expression", r4);
          }
        }
        var a4 = { value: i3, args: [i3], op: function(e4, r5) {
          var n4 = e4.meta.resolve;
          e4.meta.returned = true;
          e4.meta.returnValue = r5;
          if (n4) {
            if (r5) {
              n4(r5);
            } else {
              n4();
            }
          }
          return t4.HALT;
        } };
        return a4;
      };
      t3.addCommand("return", function(e3, t4, r4) {
        if (r4.matchToken("return")) {
          return T3(e3, t4, r4, true);
        }
      });
      t3.addCommand("exit", function(e3, t4, r4) {
        if (r4.matchToken("exit")) {
          return T3(e3, t4, r4, false);
        }
      });
      t3.addCommand("halt", function(e3, t4, r4) {
        if (r4.matchToken("halt")) {
          if (r4.matchToken("the")) {
            r4.requireToken("event");
            if (r4.matchOpToken("'")) {
              r4.requireToken("s");
            }
            var n3 = true;
          }
          if (r4.matchToken("bubbling")) {
            var i3 = true;
          } else if (r4.matchToken("default")) {
            var a4 = true;
          }
          var o3 = T3(e3, t4, r4, false);
          var s4 = { keepExecuting: true, bubbling: i3, haltDefault: a4, exit: o3, op: function(e4) {
            if (e4.event) {
              if (i3) {
                e4.event.stopPropagation();
              } else if (a4) {
                e4.event.preventDefault();
              } else {
                e4.event.stopPropagation();
                e4.event.preventDefault();
              }
              if (n3) {
                return t4.findNext(this, e4);
              } else {
                return o3;
              }
            }
          } };
          return s4;
        }
      });
      t3.addCommand("log", function(e3, t4, r4) {
        if (!r4.matchToken("log"))
          return;
        var n3 = [e3.parseElement("expression", r4)];
        while (r4.matchOpToken(",")) {
          n3.push(e3.requireElement("expression", r4));
        }
        if (r4.matchToken("with")) {
          var i3 = e3.requireElement("expression", r4);
        }
        var a4 = { exprs: n3, withExpr: i3, args: [i3, n3], op: function(e4, r5, n4) {
          if (r5) {
            r5.apply(null, n4);
          } else {
            console.log.apply(null, n4);
          }
          return t4.findNext(this, e4);
        } };
        return a4;
      });
      t3.addCommand("beep!", function(e3, t4, r4) {
        if (!r4.matchToken("beep!"))
          return;
        var n3 = [e3.parseElement("expression", r4)];
        while (r4.matchOpToken(",")) {
          n3.push(e3.requireElement("expression", r4));
        }
        var i3 = { exprs: n3, args: [n3], op: function(e4, r5) {
          for (let i4 = 0;i4 < n3.length; i4++) {
            const a4 = n3[i4];
            const o3 = r5[i4];
            t4.beepValueToConsole(e4.me, a4, o3);
          }
          return t4.findNext(this, e4);
        } };
        return i3;
      });
      t3.addCommand("throw", function(e3, t4, r4) {
        if (!r4.matchToken("throw"))
          return;
        var n3 = e3.requireElement("expression", r4);
        var i3 = { expr: n3, args: [n3], op: function(e4, r5) {
          t4.registerHyperTrace(e4, r5);
          throw r5;
        } };
        return i3;
      });
      var y3 = function(e3, t4, r4) {
        var n3 = e3.requireElement("expression", r4);
        var i3 = { expr: n3, args: [n3], op: function(e4, r5) {
          e4.result = r5;
          return t4.findNext(i3, e4);
        } };
        return i3;
      };
      t3.addCommand("call", function(e3, t4, r4) {
        if (!r4.matchToken("call"))
          return;
        var n3 = y3(e3, t4, r4);
        if (n3.expr && n3.expr.type !== "functionCall") {
          e3.raiseParseError(r4, "Must be a function invocation");
        }
        return n3;
      });
      t3.addCommand("get", function(e3, t4, r4) {
        if (r4.matchToken("get")) {
          return y3(e3, t4, r4);
        }
      });
      t3.addCommand("make", function(e3, t4, r4) {
        if (!r4.matchToken("make"))
          return;
        r4.matchToken("a") || r4.matchToken("an");
        var n3 = e3.requireElement("expression", r4);
        var i3 = [];
        if (n3.type !== "queryRef" && r4.matchToken("from")) {
          do {
            i3.push(e3.requireElement("expression", r4));
          } while (r4.matchOpToken(","));
        }
        if (r4.matchToken("called")) {
          var a4 = e3.requireElement("symbol", r4);
        }
        var o3;
        if (n3.type === "queryRef") {
          o3 = { op: function(e4) {
            var r5, i4 = "div", o4, s4 = [];
            var u4 = /(?:(^|#|\.)([^#\. ]+))/g;
            while (r5 = u4.exec(n3.css)) {
              if (r5[1] === "")
                i4 = r5[2].trim();
              else if (r5[1] === "#")
                o4 = r5[2].trim();
              else
                s4.push(r5[2].trim());
            }
            var l4 = document.createElement(i4);
            if (o4 !== undefined)
              l4.id = o4;
            for (var c5 = 0;c5 < s4.length; c5++) {
              var f4 = s4[c5];
              l4.classList.add(f4);
            }
            e4.result = l4;
            if (a4) {
              t4.setSymbol(a4.name, e4, a4.scope, l4);
            }
            return t4.findNext(this, e4);
          } };
          return o3;
        } else {
          o3 = { args: [n3, i3], op: function(e4, r5, n4) {
            e4.result = E2(r5, n4);
            if (a4) {
              t4.setSymbol(a4.name, e4, a4.scope, e4.result);
            }
            return t4.findNext(this, e4);
          } };
          return o3;
        }
      });
      t3.addGrammarElement("pseudoCommand", function(e3, t4, r4) {
        let n3 = r4.token(1);
        if (!(n3 && n3.op && (n3.value === "." || n3.value === "("))) {
          return null;
        }
        var i3 = e3.requireElement("primaryExpression", r4);
        var a4 = i3.root;
        var o3 = i3;
        while (a4.root != null) {
          o3 = o3.root;
          a4 = a4.root;
        }
        if (i3.type !== "functionCall") {
          e3.raiseParseError(r4, "Pseudo-commands must be function calls");
        }
        if (o3.type === "functionCall" && o3.root.root == null) {
          if (r4.matchAnyToken("the", "to", "on", "with", "into", "from", "at")) {
            var s4 = e3.requireElement("expression", r4);
          } else if (r4.matchToken("me")) {
            var s4 = e3.requireElement("implicitMeTarget", r4);
          }
        }
        var u4;
        if (s4) {
          u4 = { type: "pseudoCommand", root: s4, argExressions: o3.argExressions, args: [s4, o3.argExressions], op: function(e4, r5, n4) {
            t4.nullCheck(r5, s4);
            var i4 = r5[o3.root.name];
            t4.nullCheck(i4, o3);
            if (i4.hyperfunc) {
              n4.push(e4);
            }
            e4.result = i4.apply(r5, n4);
            return t4.findNext(u4, e4);
          }, execute: function(e4) {
            return t4.unifiedExec(this, e4);
          } };
        } else {
          u4 = { type: "pseudoCommand", expr: i3, args: [i3], op: function(e4, r5) {
            e4.result = r5;
            return t4.findNext(u4, e4);
          }, execute: function(e4) {
            return t4.unifiedExec(this, e4);
          } };
        }
        return u4;
      });
      var k3 = function(e3, t4, r4, n3, i3) {
        var a4 = n3.type === "symbol";
        var o3 = n3.type === "attributeRef";
        var s4 = n3.type === "styleRef";
        var u4 = n3.type === "arrayIndex";
        if (!(o3 || s4 || a4) && n3.root == null) {
          e3.raiseParseError(r4, "Can only put directly into symbols, not references");
        }
        var l4 = null;
        var c5 = null;
        if (a4) {
        } else if (o3 || s4) {
          l4 = e3.requireElement("implicitMeTarget", r4);
          var f4 = n3;
        } else if (u4) {
          c5 = n3.firstIndex;
          l4 = n3.root;
        } else {
          c5 = n3.prop ? n3.prop.value : null;
          var f4 = n3.attribute;
          l4 = n3.root;
        }
        var m3 = { target: n3, symbolWrite: a4, value: i3, args: [l4, c5, i3], op: function(e4, r5, i4, o4) {
          if (a4) {
            t4.setSymbol(n3.name, e4, n3.scope, o4);
          } else {
            t4.nullCheck(r5, l4);
            if (u4) {
              r5[i4] = o4;
            } else {
              t4.implicitLoop(r5, function(e5) {
                if (f4) {
                  if (f4.type === "attributeRef") {
                    if (o4 == null) {
                      e5.removeAttribute(f4.name);
                    } else {
                      e5.setAttribute(f4.name, o4);
                    }
                  } else {
                    e5.style[f4.name] = o4;
                  }
                } else {
                  e5[i4] = o4;
                }
              });
            }
          }
          return t4.findNext(this, e4);
        } };
        return m3;
      };
      t3.addCommand("default", function(e3, t4, r4) {
        if (!r4.matchToken("default"))
          return;
        var n3 = e3.requireElement("assignableExpression", r4);
        r4.requireToken("to");
        var i3 = e3.requireElement("expression", r4);
        var a4 = k3(e3, t4, r4, n3, i3);
        var o3 = { target: n3, value: i3, setter: a4, args: [n3], op: function(e4, r5) {
          if (r5) {
            return t4.findNext(this, e4);
          } else {
            return a4;
          }
        } };
        a4.parent = o3;
        return o3;
      });
      t3.addCommand("set", function(e3, t4, r4) {
        if (!r4.matchToken("set"))
          return;
        if (r4.currentToken().type === "L_BRACE") {
          var n3 = e3.requireElement("objectLiteral", r4);
          r4.requireToken("on");
          var i3 = e3.requireElement("expression", r4);
          var a4 = { objectLiteral: n3, target: i3, args: [n3, i3], op: function(e4, r5, n4) {
            Object.assign(n4, r5);
            return t4.findNext(this, e4);
          } };
          return a4;
        }
        try {
          r4.pushFollow("to");
          var i3 = e3.requireElement("assignableExpression", r4);
        } finally {
          r4.popFollow();
        }
        r4.requireToken("to");
        var o3 = e3.requireElement("expression", r4);
        return k3(e3, t4, r4, i3, o3);
      });
      t3.addCommand("if", function(e3, t4, r4) {
        if (!r4.matchToken("if"))
          return;
        var n3 = e3.requireElement("expression", r4);
        r4.matchToken("then");
        var i3 = e3.parseElement("commandList", r4);
        var a4 = false;
        let o3 = r4.matchToken("else") || r4.matchToken("otherwise");
        if (o3) {
          let t5 = r4.peekToken("if");
          a4 = t5 != null && t5.line === o3.line;
          if (a4) {
            var s4 = e3.parseElement("command", r4);
          } else {
            var s4 = e3.parseElement("commandList", r4);
          }
        }
        if (r4.hasMore() && !a4) {
          r4.requireToken("end");
        }
        var u4 = { expr: n3, trueBranch: i3, falseBranch: s4, args: [n3], op: function(e4, r5) {
          if (r5) {
            return i3;
          } else if (s4) {
            return s4;
          } else {
            return t4.findNext(this, e4);
          }
        } };
        e3.setParent(i3, u4);
        e3.setParent(s4, u4);
        return u4;
      });
      var x3 = function(e3, t4, r4, n3) {
        var i3 = t4.currentToken();
        var a4;
        if (t4.matchToken("for") || n3) {
          var o3 = t4.requireTokenType("IDENTIFIER");
          a4 = o3.value;
          t4.requireToken("in");
          var s4 = e3.requireElement("expression", t4);
        } else if (t4.matchToken("in")) {
          a4 = "it";
          var s4 = e3.requireElement("expression", t4);
        } else if (t4.matchToken("while")) {
          var u4 = e3.requireElement("expression", t4);
        } else if (t4.matchToken("until")) {
          var l4 = true;
          if (t4.matchToken("event")) {
            var c5 = e3.requireElement("dotOrColonPath", t4, "Expected event name");
            if (t4.matchToken("from")) {
              var f4 = e3.requireElement("expression", t4);
            }
          } else {
            var u4 = e3.requireElement("expression", t4);
          }
        } else {
          if (!e3.commandBoundary(t4.currentToken()) && t4.currentToken().value !== "forever") {
            var m3 = e3.requireElement("expression", t4);
            t4.requireToken("times");
          } else {
            t4.matchToken("forever");
            var p4 = true;
          }
        }
        if (t4.matchToken("index")) {
          var o3 = t4.requireTokenType("IDENTIFIER");
          var h4 = o3.value;
        }
        var v4 = e3.parseElement("commandList", t4);
        if (v4 && c5) {
          var d5 = v4;
          while (d5.next) {
            d5 = d5.next;
          }
          var E3 = { type: "waitATick", op: function() {
            return new Promise(function(e4) {
              setTimeout(function() {
                e4(r4.findNext(E3));
              }, 0);
            });
          } };
          d5.next = E3;
        }
        if (t4.hasMore()) {
          t4.requireToken("end");
        }
        if (a4 == null) {
          a4 = "_implicit_repeat_" + i3.start;
          var T4 = a4;
        } else {
          var T4 = a4 + "_" + i3.start;
        }
        var y4 = { identifier: a4, indexIdentifier: h4, slot: T4, expression: s4, forever: p4, times: m3, until: l4, event: c5, on: f4, whileExpr: u4, resolveNext: function() {
          return this;
        }, loop: v4, args: [u4, m3], op: function(e4, t5, n4) {
          var i4 = e4.meta.iterators[T4];
          var o4 = false;
          var s5 = null;
          if (this.forever) {
            o4 = true;
          } else if (this.until) {
            if (c5) {
              o4 = e4.meta.iterators[T4].eventFired === false;
            } else {
              o4 = t5 !== true;
            }
          } else if (u4) {
            o4 = t5;
          } else if (n4) {
            o4 = i4.index < n4;
          } else {
            var l5 = i4.iterator.next();
            o4 = !l5.done;
            s5 = l5.value;
          }
          if (o4) {
            if (i4.value) {
              e4.result = e4.locals[a4] = s5;
            } else {
              e4.result = i4.index;
            }
            if (h4) {
              e4.locals[h4] = i4.index;
            }
            i4.index++;
            return v4;
          } else {
            e4.meta.iterators[T4] = null;
            return r4.findNext(this.parent, e4);
          }
        } };
        e3.setParent(v4, y4);
        var k4 = { name: "repeatInit", args: [s4, c5, f4], op: function(e4, t5, r5, n4) {
          var i4 = { index: 0, value: t5, eventFired: false };
          e4.meta.iterators[T4] = i4;
          if (t5 && t5[Symbol.iterator]) {
            i4.iterator = t5[Symbol.iterator]();
          }
          if (c5) {
            var a5 = n4 || e4.me;
            a5.addEventListener(r5, function(t6) {
              e4.meta.iterators[T4].eventFired = true;
            }, { once: true });
          }
          return y4;
        }, execute: function(e4) {
          return r4.unifiedExec(this, e4);
        } };
        e3.setParent(y4, k4);
        return k4;
      };
      t3.addCommand("repeat", function(e3, t4, r4) {
        if (r4.matchToken("repeat")) {
          return x3(e3, r4, t4, false);
        }
      });
      t3.addCommand("for", function(e3, t4, r4) {
        if (r4.matchToken("for")) {
          return x3(e3, r4, t4, true);
        }
      });
      t3.addCommand("continue", function(e3, t4, r4) {
        if (!r4.matchToken("continue"))
          return;
        var n3 = { op: function(t5) {
          for (var n4 = this.parent;; n4 = n4.parent) {
            if (n4 == undefined) {
              e3.raiseParseError(r4, "Command `continue` cannot be used outside of a `repeat` loop.");
            }
            if (n4.loop != null) {
              return n4.resolveNext(t5);
            }
          }
        } };
        return n3;
      });
      t3.addCommand("break", function(e3, t4, r4) {
        if (!r4.matchToken("break"))
          return;
        var n3 = { op: function(n4) {
          for (var i3 = this.parent;; i3 = i3.parent) {
            if (i3 == undefined) {
              e3.raiseParseError(r4, "Command `continue` cannot be used outside of a `repeat` loop.");
            }
            if (i3.loop != null) {
              return t4.findNext(i3.parent, n4);
            }
          }
        } };
        return n3;
      });
      t3.addGrammarElement("stringLike", function(e3, t4, r4) {
        return e3.parseAnyOf(["string", "nakedString"], r4);
      });
      t3.addCommand("append", function(e3, t4, r4) {
        if (!r4.matchToken("append"))
          return;
        var n3 = null;
        var i3 = e3.requireElement("expression", r4);
        var a4 = { type: "symbol", evaluate: function(e4) {
          return t4.resolveSymbol("result", e4);
        } };
        if (r4.matchToken("to")) {
          n3 = e3.requireElement("expression", r4);
        } else {
          n3 = a4;
        }
        var o3 = null;
        if (n3.type === "symbol" || n3.type === "attributeRef" || n3.root != null) {
          o3 = k3(e3, t4, r4, n3, a4);
        }
        var s4 = { value: i3, target: n3, args: [n3, i3], op: function(e4, r5, n4) {
          if (Array.isArray(r5)) {
            r5.push(n4);
            return t4.findNext(this, e4);
          } else if (r5 instanceof Element) {
            r5.innerHTML += n4;
            return t4.findNext(this, e4);
          } else if (o3) {
            e4.result = (r5 || "") + n4;
            return o3;
          } else {
            throw Error("Unable to append a value!");
          }
        }, execute: function(e4) {
          return t4.unifiedExec(this, e4);
        } };
        if (o3 != null) {
          o3.parent = s4;
        }
        return s4;
      });
      function g3(e3, t4, r4) {
        r4.matchToken("at") || r4.matchToken("from");
        const n3 = { includeStart: true, includeEnd: false };
        n3.from = r4.matchToken("start") ? 0 : e3.requireElement("expression", r4);
        if (r4.matchToken("to") || r4.matchOpToken("..")) {
          if (r4.matchToken("end")) {
            n3.toEnd = true;
          } else {
            n3.to = e3.requireElement("expression", r4);
          }
        }
        if (r4.matchToken("inclusive"))
          n3.includeEnd = true;
        else if (r4.matchToken("exclusive"))
          n3.includeStart = false;
        return n3;
      }

      class b3 {
        constructor(e3, t4) {
          this.re = e3;
          this.str = t4;
        }
        next() {
          const e3 = this.re.exec(this.str);
          if (e3 === null)
            return { done: true };
          else
            return { value: e3 };
        }
      }

      class w3 {
        constructor(e3, t4, r4) {
          this.re = e3;
          this.flags = t4;
          this.str = r4;
        }
        [Symbol.iterator]() {
          return new b3(new RegExp(this.re, this.flags), this.str);
        }
      }
      t3.addCommand("pick", (e3, t4, r4) => {
        if (!r4.matchToken("pick"))
          return;
        r4.matchToken("the");
        if (r4.matchToken("item") || r4.matchToken("items") || r4.matchToken("character") || r4.matchToken("characters")) {
          const n3 = g3(e3, t4, r4);
          r4.requireToken("from");
          const i3 = e3.requireElement("expression", r4);
          return { args: [i3, n3.from, n3.to], op(e4, r5, i4, a4) {
            if (n3.toEnd)
              a4 = r5.length;
            if (!n3.includeStart)
              i4++;
            if (n3.includeEnd)
              a4++;
            if (a4 == null || a4 == undefined)
              a4 = i4 + 1;
            e4.result = r5.slice(i4, a4);
            return t4.findNext(this, e4);
          } };
        }
        if (r4.matchToken("match")) {
          r4.matchToken("of");
          const n3 = e3.parseElement("expression", r4);
          let i3 = "";
          if (r4.matchOpToken("|")) {
            i3 = r4.requireToken("identifier").value;
          }
          r4.requireToken("from");
          const a4 = e3.parseElement("expression", r4);
          return { args: [a4, n3], op(e4, r5, n4) {
            e4.result = new RegExp(n4, i3).exec(r5);
            return t4.findNext(this, e4);
          } };
        }
        if (r4.matchToken("matches")) {
          r4.matchToken("of");
          const n3 = e3.parseElement("expression", r4);
          let i3 = "gu";
          if (r4.matchOpToken("|")) {
            i3 = "g" + r4.requireToken("identifier").value.replace("g", "");
          }
          console.log("flags", i3);
          r4.requireToken("from");
          const a4 = e3.parseElement("expression", r4);
          return { args: [a4, n3], op(e4, r5, n4) {
            e4.result = new w3(n4, i3, r5);
            return t4.findNext(this, e4);
          } };
        }
      });
      t3.addCommand("increment", function(e3, t4, r4) {
        if (!r4.matchToken("increment"))
          return;
        var n3;
        var i3 = e3.parseElement("assignableExpression", r4);
        if (r4.matchToken("by")) {
          n3 = e3.requireElement("expression", r4);
        }
        var a4 = { type: "implicitIncrementOp", target: i3, args: [i3, n3], op: function(e4, t5, r5) {
          t5 = t5 ? parseFloat(t5) : 0;
          r5 = n3 ? parseFloat(r5) : 1;
          var i4 = t5 + r5;
          e4.result = i4;
          return i4;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return k3(e3, t4, r4, i3, a4);
      });
      t3.addCommand("decrement", function(e3, t4, r4) {
        if (!r4.matchToken("decrement"))
          return;
        var n3;
        var i3 = e3.parseElement("assignableExpression", r4);
        if (r4.matchToken("by")) {
          n3 = e3.requireElement("expression", r4);
        }
        var a4 = { type: "implicitDecrementOp", target: i3, args: [i3, n3], op: function(e4, t5, r5) {
          t5 = t5 ? parseFloat(t5) : 0;
          r5 = n3 ? parseFloat(r5) : 1;
          var i4 = t5 - r5;
          e4.result = i4;
          return i4;
        }, evaluate: function(e4) {
          return t4.unifiedEval(this, e4);
        } };
        return k3(e3, t4, r4, i3, a4);
      });
      function S3(e3, t4) {
        var r4 = "text";
        var n3;
        e3.matchToken("a") || e3.matchToken("an");
        if (e3.matchToken("json") || e3.matchToken("Object")) {
          r4 = "json";
        } else if (e3.matchToken("response")) {
          r4 = "response";
        } else if (e3.matchToken("html")) {
          r4 = "html";
        } else if (e3.matchToken("text")) {
        } else {
          n3 = t4.requireElement("dotOrColonPath", e3).evaluate();
        }
        return { type: r4, conversion: n3 };
      }
      t3.addCommand("fetch", function(e3, t4, r4) {
        if (!r4.matchToken("fetch"))
          return;
        var n3 = e3.requireElement("stringLike", r4);
        if (r4.matchToken("as")) {
          var i3 = S3(r4, e3);
        }
        if (r4.matchToken("with") && r4.currentToken().value !== "{") {
          var a4 = e3.parseElement("nakedNamedArgumentList", r4);
        } else {
          var a4 = e3.parseElement("objectLiteral", r4);
        }
        if (i3 == null && r4.matchToken("as")) {
          i3 = S3(r4, e3);
        }
        var o3 = i3 ? i3.type : "text";
        var s4 = i3 ? i3.conversion : null;
        var u4 = { url: n3, argExpressions: a4, args: [n3, a4], op: function(e4, r5, n4) {
          var i4 = n4 || {};
          i4["sender"] = e4.me;
          i4["headers"] = i4["headers"] || {};
          var a5 = new AbortController;
          let l4 = e4.me.addEventListener("fetch:abort", function() {
            a5.abort();
          }, { once: true });
          i4["signal"] = a5.signal;
          t4.triggerEvent(e4.me, "hyperscript:beforeFetch", i4);
          t4.triggerEvent(e4.me, "fetch:beforeRequest", i4);
          n4 = i4;
          var c5 = false;
          if (n4.timeout) {
            setTimeout(function() {
              if (!c5) {
                a5.abort();
              }
            }, n4.timeout);
          }
          return fetch(r5, n4).then(function(r6) {
            let n5 = { response: r6 };
            t4.triggerEvent(e4.me, "fetch:afterResponse", n5);
            r6 = n5.response;
            if (o3 === "response") {
              e4.result = r6;
              t4.triggerEvent(e4.me, "fetch:afterRequest", { result: r6 });
              c5 = true;
              return t4.findNext(u4, e4);
            }
            if (o3 === "json") {
              return r6.json().then(function(r7) {
                e4.result = r7;
                t4.triggerEvent(e4.me, "fetch:afterRequest", { result: r7 });
                c5 = true;
                return t4.findNext(u4, e4);
              });
            }
            return r6.text().then(function(r7) {
              if (s4)
                r7 = t4.convertValue(r7, s4);
              if (o3 === "html")
                r7 = t4.convertValue(r7, "Fragment");
              e4.result = r7;
              t4.triggerEvent(e4.me, "fetch:afterRequest", { result: r7 });
              c5 = true;
              return t4.findNext(u4, e4);
            });
          }).catch(function(r6) {
            t4.triggerEvent(e4.me, "fetch:error", { reason: r6 });
            throw r6;
          }).finally(function() {
            e4.me.removeEventListener("fetch:abort", l4);
          });
        } };
        return u4;
      });
    }
    function y2(e3) {
      e3.addCommand("settle", function(e4, t4, r3) {
        if (r3.matchToken("settle")) {
          if (!e4.commandBoundary(r3.currentToken())) {
            var n4 = e4.requireElement("expression", r3);
          } else {
            var n4 = e4.requireElement("implicitMeTarget", r3);
          }
          var i4 = { type: "settleCmd", args: [n4], op: function(e5, r4) {
            t4.nullCheck(r4, n4);
            var a4 = null;
            var o4 = false;
            var s3 = false;
            var u3 = new Promise(function(e6) {
              a4 = e6;
            });
            r4.addEventListener("transitionstart", function() {
              s3 = true;
            }, { once: true });
            setTimeout(function() {
              if (!s3 && !o4) {
                a4(t4.findNext(i4, e5));
              }
            }, 500);
            r4.addEventListener("transitionend", function() {
              if (!o4) {
                a4(t4.findNext(i4, e5));
              }
            }, { once: true });
            return u3;
          }, execute: function(e5) {
            return t4.unifiedExec(this, e5);
          } };
          return i4;
        }
      });
      e3.addCommand("add", function(e4, t4, r3) {
        if (r3.matchToken("add")) {
          var n4 = e4.parseElement("classRef", r3);
          var i4 = null;
          var a4 = null;
          if (n4 == null) {
            i4 = e4.parseElement("attributeRef", r3);
            if (i4 == null) {
              a4 = e4.parseElement("styleLiteral", r3);
              if (a4 == null) {
                e4.raiseParseError(r3, "Expected either a class reference or attribute expression");
              }
            }
          } else {
            var o4 = [n4];
            while (n4 = e4.parseElement("classRef", r3)) {
              o4.push(n4);
            }
          }
          if (r3.matchToken("to")) {
            var s3 = e4.requireElement("expression", r3);
          } else {
            var s3 = e4.requireElement("implicitMeTarget", r3);
          }
          if (r3.matchToken("when")) {
            if (a4) {
              e4.raiseParseError(r3, "Only class and properties are supported with a when clause");
            }
            var u3 = e4.requireElement("expression", r3);
          }
          if (o4) {
            return { classRefs: o4, to: s3, args: [s3, o4], op: function(e5, r4, n5) {
              t4.nullCheck(r4, s3);
              t4.forEach(n5, function(n6) {
                t4.implicitLoop(r4, function(r5) {
                  if (u3) {
                    e5.result = r5;
                    let i5 = t4.evaluateNoPromise(u3, e5);
                    if (i5) {
                      if (r5 instanceof Element)
                        r5.classList.add(n6.className);
                    } else {
                      if (r5 instanceof Element)
                        r5.classList.remove(n6.className);
                    }
                    e5.result = null;
                  } else {
                    if (r5 instanceof Element)
                      r5.classList.add(n6.className);
                  }
                });
              });
              return t4.findNext(this, e5);
            } };
          } else if (i4) {
            return { type: "addCmd", attributeRef: i4, to: s3, args: [s3], op: function(e5, r4, n5) {
              t4.nullCheck(r4, s3);
              t4.implicitLoop(r4, function(r5) {
                if (u3) {
                  e5.result = r5;
                  let n6 = t4.evaluateNoPromise(u3, e5);
                  if (n6) {
                    r5.setAttribute(i4.name, i4.value);
                  } else {
                    r5.removeAttribute(i4.name);
                  }
                  e5.result = null;
                } else {
                  r5.setAttribute(i4.name, i4.value);
                }
              });
              return t4.findNext(this, e5);
            }, execute: function(e5) {
              return t4.unifiedExec(this, e5);
            } };
          } else {
            return { type: "addCmd", cssDeclaration: a4, to: s3, args: [s3, a4], op: function(e5, r4, n5) {
              t4.nullCheck(r4, s3);
              t4.implicitLoop(r4, function(e6) {
                e6.style.cssText += n5;
              });
              return t4.findNext(this, e5);
            }, execute: function(e5) {
              return t4.unifiedExec(this, e5);
            } };
          }
        }
      });
      e3.addGrammarElement("styleLiteral", function(e4, t4, r3) {
        if (!r3.matchOpToken("{"))
          return;
        var n4 = [""];
        var i4 = [];
        while (r3.hasMore()) {
          if (r3.matchOpToken("\\")) {
            r3.consumeToken();
          } else if (r3.matchOpToken("}")) {
            break;
          } else if (r3.matchToken("$")) {
            var a4 = r3.matchOpToken("{");
            var o4 = e4.parseElement("expression", r3);
            if (a4)
              r3.requireOpToken("}");
            i4.push(o4);
            n4.push("");
          } else {
            var s3 = r3.consumeToken();
            n4[n4.length - 1] += r3.source.substring(s3.start, s3.end);
          }
          n4[n4.length - 1] += r3.lastWhitespace();
        }
        return { type: "styleLiteral", args: [i4], op: function(e5, t5) {
          var r4 = "";
          n4.forEach(function(e6, n5) {
            r4 += e6;
            if (n5 in t5)
              r4 += t5[n5];
          });
          return r4;
        }, evaluate: function(e5) {
          return t4.unifiedEval(this, e5);
        } };
      });
      e3.addCommand("remove", function(e4, t4, r3) {
        if (r3.matchToken("remove")) {
          var n4 = e4.parseElement("classRef", r3);
          var i4 = null;
          var a4 = null;
          if (n4 == null) {
            i4 = e4.parseElement("attributeRef", r3);
            if (i4 == null) {
              a4 = e4.parseElement("expression", r3);
              if (a4 == null) {
                e4.raiseParseError(r3, "Expected either a class reference, attribute expression or value expression");
              }
            }
          } else {
            var o4 = [n4];
            while (n4 = e4.parseElement("classRef", r3)) {
              o4.push(n4);
            }
          }
          if (r3.matchToken("from")) {
            var s3 = e4.requireElement("expression", r3);
          } else {
            if (a4 == null) {
              var s3 = e4.requireElement("implicitMeTarget", r3);
            }
          }
          if (a4) {
            return { elementExpr: a4, from: s3, args: [a4, s3], op: function(e5, r4, n5) {
              t4.nullCheck(r4, a4);
              t4.implicitLoop(r4, function(e6) {
                if (e6.parentElement && (n5 == null || n5.contains(e6))) {
                  e6.parentElement.removeChild(e6);
                }
              });
              return t4.findNext(this, e5);
            } };
          } else {
            return { classRefs: o4, attributeRef: i4, elementExpr: a4, from: s3, args: [o4, s3], op: function(e5, r4, n5) {
              t4.nullCheck(n5, s3);
              if (r4) {
                t4.forEach(r4, function(e6) {
                  t4.implicitLoop(n5, function(t5) {
                    t5.classList.remove(e6.className);
                  });
                });
              } else {
                t4.implicitLoop(n5, function(e6) {
                  e6.removeAttribute(i4.name);
                });
              }
              return t4.findNext(this, e5);
            } };
          }
        }
      });
      e3.addCommand("toggle", function(e4, t4, r3) {
        if (r3.matchToken("toggle")) {
          r3.matchAnyToken("the", "my");
          if (r3.currentToken().type === "STYLE_REF") {
            let t5 = r3.consumeToken();
            var n4 = t5.value.substr(1);
            var a4 = true;
            var o4 = i3(e4, r3, n4);
            if (r3.matchToken("of")) {
              r3.pushFollow("with");
              try {
                var s3 = e4.requireElement("expression", r3);
              } finally {
                r3.popFollow();
              }
            } else {
              var s3 = e4.requireElement("implicitMeTarget", r3);
            }
          } else if (r3.matchToken("between")) {
            var u3 = true;
            var l3 = e4.parseElement("classRef", r3);
            r3.requireToken("and");
            var c4 = e4.requireElement("classRef", r3);
          } else {
            var l3 = e4.parseElement("classRef", r3);
            var f3 = null;
            if (l3 == null) {
              f3 = e4.parseElement("attributeRef", r3);
              if (f3 == null) {
                e4.raiseParseError(r3, "Expected either a class reference or attribute expression");
              }
            } else {
              var m3 = [l3];
              while (l3 = e4.parseElement("classRef", r3)) {
                m3.push(l3);
              }
            }
          }
          if (a4 !== true) {
            if (r3.matchToken("on")) {
              var s3 = e4.requireElement("expression", r3);
            } else {
              var s3 = e4.requireElement("implicitMeTarget", r3);
            }
          }
          if (r3.matchToken("for")) {
            var p3 = e4.requireElement("expression", r3);
          } else if (r3.matchToken("until")) {
            var h4 = e4.requireElement("dotOrColonPath", r3, "Expected event name");
            if (r3.matchToken("from")) {
              var v3 = e4.requireElement("expression", r3);
            }
          }
          var d4 = { classRef: l3, classRef2: c4, classRefs: m3, attributeRef: f3, on: s3, time: p3, evt: h4, from: v3, toggle: function(e5, r4, n5, i4) {
            t4.nullCheck(e5, s3);
            if (a4) {
              t4.implicitLoop(e5, function(e6) {
                o4("toggle", e6);
              });
            } else if (u3) {
              t4.implicitLoop(e5, function(e6) {
                if (e6.classList.contains(r4.className)) {
                  e6.classList.remove(r4.className);
                  e6.classList.add(n5.className);
                } else {
                  e6.classList.add(r4.className);
                  e6.classList.remove(n5.className);
                }
              });
            } else if (i4) {
              t4.forEach(i4, function(r5) {
                t4.implicitLoop(e5, function(e6) {
                  e6.classList.toggle(r5.className);
                });
              });
            } else {
              t4.forEach(e5, function(e6) {
                if (e6.hasAttribute(f3.name)) {
                  e6.removeAttribute(f3.name);
                } else {
                  e6.setAttribute(f3.name, f3.value);
                }
              });
            }
          }, args: [s3, p3, h4, v3, l3, c4, m3], op: function(e5, r4, n5, i4, a5, o5, s4, u4) {
            if (n5) {
              return new Promise(function(i5) {
                d4.toggle(r4, o5, s4, u4);
                setTimeout(function() {
                  d4.toggle(r4, o5, s4, u4);
                  i5(t4.findNext(d4, e5));
                }, n5);
              });
            } else if (i4) {
              return new Promise(function(n6) {
                var l4 = a5 || e5.me;
                l4.addEventListener(i4, function() {
                  d4.toggle(r4, o5, s4, u4);
                  n6(t4.findNext(d4, e5));
                }, { once: true });
                d4.toggle(r4, o5, s4, u4);
              });
            } else {
              this.toggle(r4, o5, s4, u4);
              return t4.findNext(d4, e5);
            }
          } };
          return d4;
        }
      });
      var t3 = { display: function(r3, n4, i4) {
        if (i4) {
          n4.style.display = i4;
        } else if (r3 === "toggle") {
          if (getComputedStyle(n4).display === "none") {
            t3.display("show", n4, i4);
          } else {
            t3.display("hide", n4, i4);
          }
        } else if (r3 === "hide") {
          const t4 = e3.runtime.getInternalData(n4);
          if (t4.originalDisplay == null) {
            t4.originalDisplay = n4.style.display;
          }
          n4.style.display = "none";
        } else {
          const t4 = e3.runtime.getInternalData(n4);
          if (t4.originalDisplay && t4.originalDisplay !== "none") {
            n4.style.display = t4.originalDisplay;
          } else {
            n4.style.removeProperty("display");
          }
        }
      }, visibility: function(e4, r3, n4) {
        if (n4) {
          r3.style.visibility = n4;
        } else if (e4 === "toggle") {
          if (getComputedStyle(r3).visibility === "hidden") {
            t3.visibility("show", r3, n4);
          } else {
            t3.visibility("hide", r3, n4);
          }
        } else if (e4 === "hide") {
          r3.style.visibility = "hidden";
        } else {
          r3.style.visibility = "visible";
        }
      }, opacity: function(e4, r3, n4) {
        if (n4) {
          r3.style.opacity = n4;
        } else if (e4 === "toggle") {
          if (getComputedStyle(r3).opacity === "0") {
            t3.opacity("show", r3, n4);
          } else {
            t3.opacity("hide", r3, n4);
          }
        } else if (e4 === "hide") {
          r3.style.opacity = "0";
        } else {
          r3.style.opacity = "1";
        }
      } };
      var n3 = function(e4, t4, r3) {
        var n4;
        var i4 = r3.currentToken();
        if (i4.value === "when" || i4.value === "with" || e4.commandBoundary(i4)) {
          n4 = e4.parseElement("implicitMeTarget", r3);
        } else {
          n4 = e4.parseElement("expression", r3);
        }
        return n4;
      };
      var i3 = function(e4, n4, i4) {
        var a4 = r2.defaultHideShowStrategy;
        var o4 = t3;
        if (r2.hideShowStrategies) {
          o4 = Object.assign(o4, r2.hideShowStrategies);
        }
        i4 = i4 || a4 || "display";
        var s3 = o4[i4];
        if (s3 == null) {
          e4.raiseParseError(n4, "Unknown show/hide strategy : " + i4);
        }
        return s3;
      };
      e3.addCommand("hide", function(e4, t4, r3) {
        if (r3.matchToken("hide")) {
          var a4 = n3(e4, t4, r3);
          var o4 = null;
          if (r3.matchToken("with")) {
            o4 = r3.requireTokenType("IDENTIFIER", "STYLE_REF").value;
            if (o4.indexOf("*") === 0) {
              o4 = o4.substr(1);
            }
          }
          var s3 = i3(e4, r3, o4);
          return { target: a4, args: [a4], op: function(e5, r4) {
            t4.nullCheck(r4, a4);
            t4.implicitLoop(r4, function(e6) {
              s3("hide", e6);
            });
            return t4.findNext(this, e5);
          } };
        }
      });
      e3.addCommand("show", function(e4, t4, r3) {
        if (r3.matchToken("show")) {
          var a4 = n3(e4, t4, r3);
          var o4 = null;
          if (r3.matchToken("with")) {
            o4 = r3.requireTokenType("IDENTIFIER", "STYLE_REF").value;
            if (o4.indexOf("*") === 0) {
              o4 = o4.substr(1);
            }
          }
          var s3 = null;
          if (r3.matchOpToken(":")) {
            var u3 = r3.consumeUntilWhitespace();
            r3.matchTokenType("WHITESPACE");
            s3 = u3.map(function(e5) {
              return e5.value;
            }).join("");
          }
          if (r3.matchToken("when")) {
            var l3 = e4.requireElement("expression", r3);
          }
          var c4 = i3(e4, r3, o4);
          return { target: a4, when: l3, args: [a4], op: function(e5, r4) {
            t4.nullCheck(r4, a4);
            t4.implicitLoop(r4, function(r5) {
              if (l3) {
                e5.result = r5;
                let n4 = t4.evaluateNoPromise(l3, e5);
                if (n4) {
                  c4("show", r5, s3);
                } else {
                  c4("hide", r5);
                }
                e5.result = null;
              } else {
                c4("show", r5, s3);
              }
            });
            return t4.findNext(this, e5);
          } };
        }
      });
      e3.addCommand("take", function(e4, t4, r3) {
        if (r3.matchToken("take")) {
          let u3 = null;
          let l3 = [];
          while (u3 = e4.parseElement("classRef", r3)) {
            l3.push(u3);
          }
          var n4 = null;
          var i4 = null;
          let c4 = l3.length > 0;
          if (!c4) {
            n4 = e4.parseElement("attributeRef", r3);
            if (n4 == null) {
              e4.raiseParseError(r3, "Expected either a class reference or attribute expression");
            }
            if (r3.matchToken("with")) {
              i4 = e4.requireElement("expression", r3);
            }
          }
          if (r3.matchToken("from")) {
            var a4 = e4.requireElement("expression", r3);
          }
          if (r3.matchToken("for")) {
            var o4 = e4.requireElement("expression", r3);
          } else {
            var o4 = e4.requireElement("implicitMeTarget", r3);
          }
          if (c4) {
            var s3 = { classRefs: l3, from: a4, forElt: o4, args: [l3, a4, o4], op: function(e5, r4, n5, i5) {
              t4.nullCheck(i5, o4);
              t4.implicitLoop(r4, function(e6) {
                var r5 = e6.className;
                if (n5) {
                  t4.implicitLoop(n5, function(e7) {
                    e7.classList.remove(r5);
                  });
                } else {
                  t4.implicitLoop(e6, function(e7) {
                    e7.classList.remove(r5);
                  });
                }
                t4.implicitLoop(i5, function(e7) {
                  e7.classList.add(r5);
                });
              });
              return t4.findNext(this, e5);
            } };
            return s3;
          } else {
            var s3 = { attributeRef: n4, from: a4, forElt: o4, args: [a4, o4, i4], op: function(e5, r4, i5, s4) {
              t4.nullCheck(r4, a4);
              t4.nullCheck(i5, o4);
              t4.implicitLoop(r4, function(e6) {
                if (!s4) {
                  e6.removeAttribute(n4.name);
                } else {
                  e6.setAttribute(n4.name, s4);
                }
              });
              t4.implicitLoop(i5, function(e6) {
                e6.setAttribute(n4.name, n4.value || "");
              });
              return t4.findNext(this, e5);
            } };
            return s3;
          }
        }
      });
      function a3(t4, r3, n4, i4) {
        if (n4 != null) {
          var a4 = t4.resolveSymbol(n4, r3);
        } else {
          var a4 = r3;
        }
        if (a4 instanceof Element || a4 instanceof HTMLDocument) {
          while (a4.firstChild)
            a4.removeChild(a4.firstChild);
          a4.append(e3.runtime.convertValue(i4, "Fragment"));
          t4.processNode(a4);
        } else {
          if (n4 != null) {
            t4.setSymbol(n4, r3, null, i4);
          } else {
            throw "Don't know how to put a value into " + typeof r3;
          }
        }
      }
      e3.addCommand("put", function(e4, t4, r3) {
        if (r3.matchToken("put")) {
          var n4 = e4.requireElement("expression", r3);
          var i4 = r3.matchAnyToken("into", "before", "after");
          if (i4 == null && r3.matchToken("at")) {
            r3.matchToken("the");
            i4 = r3.matchAnyToken("start", "end");
            r3.requireToken("of");
          }
          if (i4 == null) {
            e4.raiseParseError(r3, "Expected one of 'into', 'before', 'at start of', 'at end of', 'after'");
          }
          var o4 = e4.requireElement("expression", r3);
          var s3 = i4.value;
          var u3 = false;
          var l3 = false;
          var c4 = null;
          var f3 = null;
          if (o4.type === "arrayIndex" && s3 === "into") {
            u3 = true;
            f3 = o4.prop;
            c4 = o4.root;
          } else if (o4.prop && o4.root && s3 === "into") {
            f3 = o4.prop.value;
            c4 = o4.root;
          } else if (o4.type === "symbol" && s3 === "into") {
            l3 = true;
            f3 = o4.name;
          } else if (o4.type === "attributeRef" && s3 === "into") {
            var m3 = true;
            f3 = o4.name;
            c4 = e4.requireElement("implicitMeTarget", r3);
          } else if (o4.type === "styleRef" && s3 === "into") {
            var p3 = true;
            f3 = o4.name;
            c4 = e4.requireElement("implicitMeTarget", r3);
          } else if (o4.attribute && s3 === "into") {
            var m3 = o4.attribute.type === "attributeRef";
            var p3 = o4.attribute.type === "styleRef";
            f3 = o4.attribute.name;
            c4 = o4.root;
          } else {
            c4 = o4;
          }
          var h4 = { target: o4, operation: s3, symbolWrite: l3, value: n4, args: [c4, f3, n4], op: function(e5, r4, n5, i5) {
            if (l3) {
              a3(t4, e5, n5, i5);
            } else {
              t4.nullCheck(r4, c4);
              if (s3 === "into") {
                if (m3) {
                  t4.implicitLoop(r4, function(e6) {
                    e6.setAttribute(n5, i5);
                  });
                } else if (p3) {
                  t4.implicitLoop(r4, function(e6) {
                    e6.style[n5] = i5;
                  });
                } else if (u3) {
                  r4[n5] = i5;
                } else {
                  t4.implicitLoop(r4, function(e6) {
                    a3(t4, e6, n5, i5);
                  });
                }
              } else {
                var o5 = s3 === "before" ? Element.prototype.before : s3 === "after" ? Element.prototype.after : s3 === "start" ? Element.prototype.prepend : s3 === "end" ? Element.prototype.append : Element.prototype.append;
                t4.implicitLoop(r4, function(e6) {
                  o5.call(e6, i5 instanceof Node ? i5 : t4.convertValue(i5, "Fragment"));
                  if (e6.parentElement) {
                    t4.processNode(e6.parentElement);
                  } else {
                    t4.processNode(e6);
                  }
                });
              }
            }
            return t4.findNext(this, e5);
          } };
          return h4;
        }
      });
      function o3(e4, t4, r3) {
        var n4;
        if (r3.matchToken("the") || r3.matchToken("element") || r3.matchToken("elements") || r3.currentToken().type === "CLASS_REF" || r3.currentToken().type === "ID_REF" || r3.currentToken().op && r3.currentToken().value === "<") {
          e4.possessivesDisabled = true;
          try {
            n4 = e4.parseElement("expression", r3);
          } finally {
            delete e4.possessivesDisabled;
          }
          if (r3.matchOpToken("'")) {
            r3.requireToken("s");
          }
        } else if (r3.currentToken().type === "IDENTIFIER" && r3.currentToken().value === "its") {
          var i4 = r3.matchToken("its");
          n4 = { type: "pseudopossessiveIts", token: i4, name: i4.value, evaluate: function(e5) {
            return t4.resolveSymbol("it", e5);
          } };
        } else {
          r3.matchToken("my") || r3.matchToken("me");
          n4 = e4.parseElement("implicitMeTarget", r3);
        }
        return n4;
      }
      e3.addCommand("transition", function(e4, t4, n4) {
        if (n4.matchToken("transition")) {
          var i4 = o3(e4, t4, n4);
          var a4 = [];
          var s3 = [];
          var u3 = [];
          var l3 = n4.currentToken();
          while (!e4.commandBoundary(l3) && l3.value !== "over" && l3.value !== "using") {
            if (n4.currentToken().type === "STYLE_REF") {
              let e5 = n4.consumeToken();
              let t5 = e5.value.substr(1);
              a4.push({ type: "styleRefValue", evaluate: function() {
                return t5;
              } });
            } else {
              a4.push(e4.requireElement("stringLike", n4));
            }
            if (n4.matchToken("from")) {
              s3.push(e4.requireElement("expression", n4));
            } else {
              s3.push(null);
            }
            n4.requireToken("to");
            if (n4.matchToken("initial")) {
              u3.push({ type: "initial_literal", evaluate: function() {
                return "initial";
              } });
            } else {
              u3.push(e4.requireElement("expression", n4));
            }
            l3 = n4.currentToken();
          }
          if (n4.matchToken("over")) {
            var c4 = e4.requireElement("expression", n4);
          } else if (n4.matchToken("using")) {
            var f3 = e4.requireElement("expression", n4);
          }
          var m3 = { to: u3, args: [i4, a4, s3, u3, f3, c4], op: function(e5, n5, a5, o4, s4, u4, l4) {
            t4.nullCheck(n5, i4);
            var c5 = [];
            t4.implicitLoop(n5, function(e6) {
              var n6 = new Promise(function(n7, i5) {
                var c6 = e6.style.transition;
                if (l4) {
                  e6.style.transition = "all " + l4 + "ms ease-in";
                } else if (u4) {
                  e6.style.transition = u4;
                } else {
                  e6.style.transition = r2.defaultTransition;
                }
                var f4 = t4.getInternalData(e6);
                var m4 = getComputedStyle(e6);
                var p3 = {};
                for (var h4 = 0;h4 < m4.length; h4++) {
                  var v3 = m4[h4];
                  var d4 = m4[v3];
                  p3[v3] = d4;
                }
                if (!f4.initialStyles) {
                  f4.initialStyles = p3;
                }
                for (var h4 = 0;h4 < a5.length; h4++) {
                  var E3 = a5[h4];
                  var T3 = o4[h4];
                  if (T3 === "computed" || T3 == null) {
                    e6.style[E3] = p3[E3];
                  } else {
                    e6.style[E3] = T3;
                  }
                }
                var y3 = false;
                var k3 = false;
                e6.addEventListener("transitionend", function() {
                  if (!k3) {
                    e6.style.transition = c6;
                    k3 = true;
                    n7();
                  }
                }, { once: true });
                e6.addEventListener("transitionstart", function() {
                  y3 = true;
                }, { once: true });
                setTimeout(function() {
                  if (!k3 && !y3) {
                    e6.style.transition = c6;
                    k3 = true;
                    n7();
                  }
                }, 100);
                setTimeout(function() {
                  var t5 = [];
                  for (var r3 = 0;r3 < a5.length; r3++) {
                    var n8 = a5[r3];
                    var i6 = s4[r3];
                    if (i6 === "initial") {
                      var o5 = f4.initialStyles[n8];
                      e6.style[n8] = o5;
                    } else {
                      e6.style[n8] = i6;
                    }
                  }
                }, 0);
              });
              c5.push(n6);
            });
            return Promise.all(c5).then(function() {
              return t4.findNext(m3, e5);
            });
          } };
          return m3;
        }
      });
      e3.addCommand("measure", function(e4, t4, r3) {
        if (!r3.matchToken("measure"))
          return;
        var n4 = o3(e4, t4, r3);
        var i4 = [];
        if (!e4.commandBoundary(r3.currentToken()))
          do {
            i4.push(r3.matchTokenType("IDENTIFIER").value);
          } while (r3.matchOpToken(","));
        return { properties: i4, args: [n4], op: function(e5, r4) {
          t4.nullCheck(r4, n4);
          if (0 in r4)
            r4 = r4[0];
          var a4 = r4.getBoundingClientRect();
          var o4 = { top: r4.scrollTop, left: r4.scrollLeft, topMax: r4.scrollTopMax, leftMax: r4.scrollLeftMax, height: r4.scrollHeight, width: r4.scrollWidth };
          e5.result = { x: a4.x, y: a4.y, left: a4.left, top: a4.top, right: a4.right, bottom: a4.bottom, width: a4.width, height: a4.height, bounds: a4, scrollLeft: o4.left, scrollTop: o4.top, scrollLeftMax: o4.leftMax, scrollTopMax: o4.topMax, scrollWidth: o4.width, scrollHeight: o4.height, scroll: o4 };
          t4.forEach(i4, function(t5) {
            if (t5 in e5.result)
              e5.locals[t5] = e5.result[t5];
            else
              throw "No such measurement as " + t5;
          });
          return t4.findNext(this, e5);
        } };
      });
      e3.addLeafExpression("closestExpr", function(e4, t4, r3) {
        if (r3.matchToken("closest")) {
          if (r3.matchToken("parent")) {
            var n4 = true;
          }
          var i4 = null;
          if (r3.currentToken().type === "ATTRIBUTE_REF") {
            var a4 = e4.requireElement("attributeRefAccess", r3, null);
            i4 = "[" + a4.attribute.name + "]";
          }
          if (i4 == null) {
            var o4 = e4.requireElement("expression", r3);
            if (o4.css == null) {
              e4.raiseParseError(r3, "Expected a CSS expression");
            } else {
              i4 = o4.css;
            }
          }
          if (r3.matchToken("to")) {
            var s3 = e4.parseElement("expression", r3);
          } else {
            var s3 = e4.parseElement("implicitMeTarget", r3);
          }
          var u3 = { type: "closestExpr", parentSearch: n4, expr: o4, css: i4, to: s3, args: [s3], op: function(e5, r4) {
            if (r4 == null) {
              return null;
            } else {
              let e6 = [];
              t4.implicitLoop(r4, function(t5) {
                if (n4) {
                  e6.push(t5.parentElement ? t5.parentElement.closest(i4) : null);
                } else {
                  e6.push(t5.closest(i4));
                }
              });
              if (t4.shouldAutoIterate(r4)) {
                return e6;
              } else {
                return e6[0];
              }
            }
          }, evaluate: function(e5) {
            return t4.unifiedEval(this, e5);
          } };
          if (a4) {
            a4.root = u3;
            a4.args = [u3];
            return a4;
          } else {
            return u3;
          }
        }
      });
      e3.addCommand("go", function(e4, t4, r3) {
        if (r3.matchToken("go")) {
          if (r3.matchToken("back")) {
            var n4 = true;
          } else {
            r3.matchToken("to");
            if (r3.matchToken("url")) {
              var i4 = e4.requireElement("stringLike", r3);
              var a4 = true;
              if (r3.matchToken("in")) {
                r3.requireToken("new");
                r3.requireToken("window");
                var o4 = true;
              }
            } else {
              r3.matchToken("the");
              var s3 = r3.matchAnyToken("top", "middle", "bottom");
              var u3 = r3.matchAnyToken("left", "center", "right");
              if (s3 || u3) {
                r3.requireToken("of");
              }
              var i4 = e4.requireElement("unaryExpression", r3);
              var l3 = r3.matchAnyOpToken("+", "-");
              if (l3) {
                r3.pushFollow("px");
                try {
                  var c4 = e4.requireElement("expression", r3);
                } finally {
                  r3.popFollow();
                }
              }
              r3.matchToken("px");
              var f3 = r3.matchAnyToken("smoothly", "instantly");
              var m3 = { block: "start", inline: "nearest" };
              if (s3) {
                if (s3.value === "top") {
                  m3.block = "start";
                } else if (s3.value === "bottom") {
                  m3.block = "end";
                } else if (s3.value === "middle") {
                  m3.block = "center";
                }
              }
              if (u3) {
                if (u3.value === "left") {
                  m3.inline = "start";
                } else if (u3.value === "center") {
                  m3.inline = "center";
                } else if (u3.value === "right") {
                  m3.inline = "end";
                }
              }
              if (f3) {
                if (f3.value === "smoothly") {
                  m3.behavior = "smooth";
                } else if (f3.value === "instantly") {
                  m3.behavior = "instant";
                }
              }
            }
          }
          var p3 = { target: i4, args: [i4, c4], op: function(e5, r4, i5) {
            if (n4) {
              window.history.back();
            } else if (a4) {
              if (r4) {
                if (o4) {
                  window.open(r4);
                } else {
                  window.location.href = r4;
                }
              }
            } else {
              t4.implicitLoop(r4, function(e6) {
                if (e6 === window) {
                  e6 = document.body;
                }
                if (l3) {
                  let t5 = e6.getBoundingClientRect();
                  let r5 = document.createElement("div");
                  let n5 = l3.value === "+" ? i5 : i5 * -1;
                  let a5 = m3.inline == "start" || m3.inline == "end" ? n5 : 0;
                  let o5 = m3.block == "start" || m3.block == "end" ? n5 : 0;
                  r5.style.position = "absolute";
                  r5.style.top = t5.top + window.scrollY + o5 + "px";
                  r5.style.left = t5.left + window.scrollX + a5 + "px";
                  r5.style.height = t5.height + "px";
                  r5.style.width = t5.width + "px";
                  r5.style.zIndex = "" + Number.MIN_SAFE_INTEGER;
                  r5.style.opacity = "0";
                  document.body.appendChild(r5);
                  setTimeout(function() {
                    document.body.removeChild(r5);
                  }, 100);
                  e6 = r5;
                }
                e6.scrollIntoView(m3);
              });
            }
            return t4.findNext(p3, e5);
          } };
          return p3;
        }
      });
      r2.conversions.dynamicResolvers.push(function(t4, r3) {
        if (!(t4 === "Values" || t4.indexOf("Values:") === 0)) {
          return;
        }
        var n4 = t4.split(":")[1];
        var i4 = {};
        var a4 = e3.runtime.implicitLoop.bind(e3.runtime);
        a4(r3, function(e4) {
          var t5 = s3(e4);
          if (t5 !== undefined) {
            i4[t5.name] = t5.value;
            return;
          }
          if (e4.querySelectorAll != null) {
            var r4 = e4.querySelectorAll("input,select,textarea");
            r4.forEach(o4);
          }
        });
        if (n4) {
          if (n4 === "JSON") {
            return JSON.stringify(i4);
          } else if (n4 === "Form") {
            return new URLSearchParams(i4).toString();
          } else {
            throw "Unknown conversion: " + n4;
          }
        } else {
          return i4;
        }
        function o4(e4) {
          var t5 = s3(e4);
          if (t5 == undefined) {
            return;
          }
          if (i4[t5.name] == undefined) {
            i4[t5.name] = t5.value;
            return;
          }
          if (Array.isArray(i4[t5.name]) && Array.isArray(t5.value)) {
            i4[t5.name] = [].concat(i4[t5.name], t5.value);
            return;
          }
        }
        function s3(e4) {
          try {
            var t5 = { name: e4.name, value: e4.value };
            if (t5.name == undefined || t5.value == undefined) {
              return;
            }
            if (e4.type == "radio" && e4.checked == false) {
              return;
            }
            if (e4.type == "checkbox") {
              if (e4.checked == false) {
                t5.value = undefined;
              } else if (typeof t5.value === "string") {
                t5.value = [t5.value];
              }
            }
            if (e4.type == "select-multiple") {
              var r4 = e4.querySelectorAll("option[selected]");
              t5.value = [];
              for (var n5 = 0;n5 < r4.length; n5++) {
                t5.value.push(r4[n5].value);
              }
            }
            return t5;
          } catch (e5) {
            return;
          }
        }
      });
      r2.conversions["HTML"] = function(e4) {
        var t4 = function(e5) {
          if (e5 instanceof Array) {
            return e5.map(function(e6) {
              return t4(e6);
            }).join("");
          }
          if (e5 instanceof HTMLElement) {
            return e5.outerHTML;
          }
          if (e5 instanceof NodeList) {
            var r3 = "";
            for (var n4 = 0;n4 < e5.length; n4++) {
              var i4 = e5[n4];
              if (i4 instanceof HTMLElement) {
                r3 += i4.outerHTML;
              }
            }
            return r3;
          }
          if (e5.toString) {
            return e5.toString();
          }
          return "";
        };
        return t4(e4);
      };
      r2.conversions["Fragment"] = function(t4) {
        var r3 = document.createDocumentFragment();
        e3.runtime.implicitLoop(t4, function(e4) {
          if (e4 instanceof Node)
            r3.append(e4);
          else {
            var t5 = document.createElement("template");
            t5.innerHTML = e4;
            r3.append(t5.content);
          }
        });
        return r3;
      };
    }
    const k2 = new o2, x2 = k2.lexer, g2 = k2.parser;
    function b2(e3, t3) {
      return k2.evaluate(e3, t3);
    }
    function w2() {
      var t3 = Array.from(e2.document.querySelectorAll("script[type='text/hyperscript'][src]"));
      Promise.all(t3.map(function(e3) {
        return fetch(e3.src).then(function(e4) {
          return e4.text();
        });
      })).then((e3) => e3.forEach((e4) => S2(e4))).then(() => n3(function() {
        a3();
        k2.processNode(document.documentElement);
        e2.document.addEventListener("htmx:load", function(e3) {
          k2.processNode(e3.detail.elt);
        });
      }));
      function n3(e3) {
        if (document.readyState !== "loading") {
          setTimeout(e3);
        } else {
          document.addEventListener("DOMContentLoaded", e3);
        }
      }
      function i3() {
        var e3 = document.querySelector('meta[name="htmx-config"]');
        if (e3) {
          return v2(e3.content);
        } else {
          return null;
        }
      }
      function a3() {
        var e3 = i3();
        if (e3) {
          Object.assign(r2, e3);
        }
      }
    }
    const S2 = Object.assign(b2, { config: r2, use(e3) {
      e3(S2);
    }, internals: { lexer: x2, parser: g2, runtime: k2, Lexer: n2, Tokens: i2, Parser: a2, Runtime: o2 }, ElementCollection: m2, addFeature: g2.addFeature.bind(g2), addCommand: g2.addCommand.bind(g2), addLeafExpression: g2.addLeafExpression.bind(g2), addIndirectExpression: g2.addIndirectExpression.bind(g2), evaluate: k2.evaluate.bind(k2), parse: k2.parse.bind(k2), processNode: k2.processNode.bind(k2), version: "0.9.12", browserInit: w2 });
    return S2;
  });
});

// node_modules/tw-elements/dist/js/tw-elements.es.min.js
var Ec = function(s2, t2) {
  return t2 && `${t2}::${Hr2++}` || s2.uidEvent || Hr2++;
};
var Cc = function(s2) {
  const t2 = Ec(s2);
  return s2.uidEvent = t2, $n[t2] = $n[t2] || {}, $n[t2];
};
var Ed = function(s2, t2) {
  return function e(i2) {
    return i2.delegateTarget = s2, e.oneOff && c2.off(s2, i2.type, t2), t2.apply(s2, [i2]);
  };
};
var Cd = function(s2, t2, e2) {
  return function i(n2) {
    const o2 = s2.querySelectorAll(t2);
    for (let { target: r2 } = n2;r2 && r2 !== this; r2 = r2.parentNode)
      for (let a2 = o2.length;a2--; "")
        if (o2[a2] === r2)
          return n2.delegateTarget = r2, i.oneOff && c2.off(s2, n2.type, e2), e2.apply(r2, [n2]);
    return null;
  };
};
var Ac = function(s2, t2, e2 = null) {
  const i2 = Object.keys(s2);
  for (let n2 = 0, o2 = i2.length;n2 < o2; n2++) {
    const r2 = s2[i2[n2]];
    if (r2.originalHandler === t2 && r2.delegationSelector === e2)
      return r2;
  }
  return null;
};
var yc = function(s2, t2, e2) {
  const i2 = typeof t2 == "string", n2 = i2 ? e2 : t2;
  let o2 = wc(s2);
  return Tc.has(o2) || (o2 = s2), [i2, n2, o2];
};
var Vr2 = function(s2, t2, e2, i2, n2) {
  if (typeof t2 != "string" || !s2)
    return;
  if (e2 || (e2 = i2, i2 = null), Td.test(t2)) {
    const g2 = (m2) => function(b2) {
      if (!b2.relatedTarget || b2.relatedTarget !== b2.delegateTarget && !b2.delegateTarget.contains(b2.relatedTarget))
        return m2.call(this, b2);
    };
    i2 ? i2 = g2(i2) : e2 = g2(e2);
  }
  const [o2, r2, a2] = yc(t2, e2, i2), l2 = Cc(s2), p2 = l2[a2] || (l2[a2] = {}), u2 = Ac(p2, r2, o2 ? e2 : null);
  if (u2) {
    u2.oneOff = u2.oneOff && n2;
    return;
  }
  const _2 = Ec(r2, t2.replace(md, "")), f2 = o2 ? Cd(s2, e2, i2) : Ed(s2, e2);
  f2.delegationSelector = o2 ? e2 : null, f2.originalHandler = r2, f2.oneOff = n2, f2.uidEvent = _2, p2[_2] = f2, s2.addEventListener(a2, f2, o2);
};
var Vo = function(s2, t2, e2, i2, n2) {
  const o2 = Ac(t2[e2], i2, n2);
  o2 && (s2.removeEventListener(e2, o2, !!n2), delete t2[e2][o2.uidEvent]);
};
var Ad = function(s2, t2, e2, i2) {
  const n2 = t2[e2] || {};
  Object.keys(n2).forEach((o2) => {
    if (o2.includes(i2)) {
      const r2 = n2[o2];
      Vo(s2, t2, e2, r2.originalHandler, r2.delegationSelector);
    }
  });
};
var wc = function(s2) {
  return s2 = s2.replace(gd, ""), vd[s2] || s2;
};
var Rt2 = function(s2) {
  return s2 ? (s2.nodeName || "").toLowerCase() : null;
};
var _t2 = function(s2) {
  if (s2 == null)
    return window;
  if (s2.toString() !== "[object Window]") {
    var t2 = s2.ownerDocument;
    return t2 && t2.defaultView || window;
  }
  return s2;
};
var ye2 = function(s2) {
  var t2 = _t2(s2).Element;
  return s2 instanceof t2 || s2 instanceof Element;
};
var dt2 = function(s2) {
  var t2 = _t2(s2).HTMLElement;
  return s2 instanceof t2 || s2 instanceof HTMLElement;
};
var dr2 = function(s2) {
  if (typeof ShadowRoot > "u")
    return false;
  var t2 = _t2(s2).ShadowRoot;
  return s2 instanceof t2 || s2 instanceof ShadowRoot;
};
var xd = function(s2) {
  var t2 = s2.state;
  Object.keys(t2.elements).forEach(function(e2) {
    var i2 = t2.styles[e2] || {}, n2 = t2.attributes[e2] || {}, o2 = t2.elements[e2];
    !dt2(o2) || !Rt2(o2) || (Object.assign(o2.style, i2), Object.keys(n2).forEach(function(r2) {
      var a2 = n2[r2];
      a2 === false ? o2.removeAttribute(r2) : o2.setAttribute(r2, a2 === true ? "" : a2);
    }));
  });
};
var Od = function(s2) {
  var t2 = s2.state, e2 = {
    popper: {
      position: t2.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t2.elements.popper.style, e2.popper), t2.styles = e2, t2.elements.arrow && Object.assign(t2.elements.arrow.style, e2.arrow), function() {
    Object.keys(t2.elements).forEach(function(i2) {
      var n2 = t2.elements[i2], o2 = t2.attributes[i2] || {}, r2 = Object.keys(t2.styles.hasOwnProperty(i2) ? t2.styles[i2] : e2[i2]), a2 = r2.reduce(function(l2, p2) {
        return l2[p2] = "", l2;
      }, {});
      !dt2(n2) || !Rt2(n2) || (Object.assign(n2.style, a2), Object.keys(o2).forEach(function(l2) {
        n2.removeAttribute(l2);
      }));
    });
  };
};
var Et2 = function(s2) {
  return s2.split("-")[0];
};
var Fo = function() {
  var s2 = navigator.userAgentData;
  return s2 != null && s2.brands && Array.isArray(s2.brands) ? s2.brands.map(function(t2) {
    return t2.brand + "/" + t2.version;
  }).join(" ") : navigator.userAgent;
};
var Bc = function() {
  return !/^((?!chrome|android).)*safari/i.test(Fo());
};
var Ze2 = function(s2, t2, e2) {
  t2 === undefined && (t2 = false), e2 === undefined && (e2 = false);
  var i2 = s2.getBoundingClientRect(), n2 = 1, o2 = 1;
  t2 && dt2(s2) && (n2 = s2.offsetWidth > 0 && qe2(i2.width) / s2.offsetWidth || 1, o2 = s2.offsetHeight > 0 && qe2(i2.height) / s2.offsetHeight || 1);
  var r2 = ye2(s2) ? _t2(s2) : window, a2 = r2.visualViewport, l2 = !Bc() && e2, p2 = (i2.left + (l2 && a2 ? a2.offsetLeft : 0)) / n2, u2 = (i2.top + (l2 && a2 ? a2.offsetTop : 0)) / o2, _2 = i2.width / n2, f2 = i2.height / o2;
  return {
    width: _2,
    height: f2,
    top: u2,
    right: p2 + _2,
    bottom: u2 + f2,
    left: p2,
    x: p2,
    y: u2
  };
};
var pr2 = function(s2) {
  var t2 = Ze2(s2), e2 = s2.offsetWidth, i2 = s2.offsetHeight;
  return Math.abs(t2.width - e2) <= 1 && (e2 = t2.width), Math.abs(t2.height - i2) <= 1 && (i2 = t2.height), {
    x: s2.offsetLeft,
    y: s2.offsetTop,
    width: e2,
    height: i2
  };
};
var Hc = function(s2, t2) {
  var e2 = t2.getRootNode && t2.getRootNode();
  if (s2.contains(t2))
    return true;
  if (e2 && dr2(e2)) {
    var i2 = t2;
    do {
      if (i2 && s2.isSameNode(i2))
        return true;
      i2 = i2.parentNode || i2.host;
    } while (i2);
  }
  return false;
};
var At2 = function(s2) {
  return _t2(s2).getComputedStyle(s2);
};
var Sd = function(s2) {
  return ["table", "td", "th"].indexOf(Rt2(s2)) >= 0;
};
var ie2 = function(s2) {
  return ((ye2(s2) ? s2.ownerDocument : s2.document) || window.document).documentElement;
};
var mn = function(s2) {
  return Rt2(s2) === "html" ? s2 : s2.assignedSlot || s2.parentNode || (dr2(s2) ? s2.host : null) || ie2(s2);
};
var Wr = function(s2) {
  return !dt2(s2) || At2(s2).position === "fixed" ? null : s2.offsetParent;
};
var Id = function(s2) {
  var t2 = /firefox/i.test(Fo()), e2 = /Trident/i.test(Fo());
  if (e2 && dt2(s2)) {
    var i2 = At2(s2);
    if (i2.position === "fixed")
      return null;
  }
  var n2 = mn(s2);
  for (dr2(n2) && (n2 = n2.host);dt2(n2) && ["html", "body"].indexOf(Rt2(n2)) < 0; ) {
    var o2 = At2(n2);
    if (o2.transform !== "none" || o2.perspective !== "none" || o2.contain === "paint" || ["transform", "perspective"].indexOf(o2.willChange) !== -1 || t2 && o2.willChange === "filter" || t2 && o2.filter && o2.filter !== "none")
      return n2;
    n2 = n2.parentNode;
  }
  return null;
};
var Ki = function(s2) {
  for (var t2 = _t2(s2), e2 = Wr(s2);e2 && Sd(e2) && At2(e2).position === "static"; )
    e2 = Wr(e2);
  return e2 && (Rt2(e2) === "html" || Rt2(e2) === "body" && At2(e2).position === "static") ? t2 : e2 || Id(s2) || t2;
};
var _r2 = function(s2) {
  return ["top", "bottom"].indexOf(s2) >= 0 ? "x" : "y";
};
var Mi = function(s2, t2, e2) {
  return ve2(s2, un(t2, e2));
};
var Dd = function(s2, t2, e2) {
  var i2 = Mi(s2, t2, e2);
  return i2 > e2 ? e2 : i2;
};
var Vc = function() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
};
var Wc = function(s2) {
  return Object.assign({}, Vc(), s2);
};
var Fc = function(s2, t2) {
  return t2.reduce(function(e2, i2) {
    return e2[i2] = s2, e2;
  }, {});
};
var Ld = function(s2) {
  var t2, e2 = s2.state, i2 = s2.name, n2 = s2.options, o2 = e2.elements.arrow, r2 = e2.modifiersData.popperOffsets, a2 = Et2(e2.placement), l2 = _r2(a2), p2 = [nt2, pt2].indexOf(a2) >= 0, u2 = p2 ? "height" : "width";
  if (!(!o2 || !r2)) {
    var _2 = $d(n2.padding, e2), f2 = pr2(o2), g2 = l2 === "y" ? st2 : nt2, m2 = l2 === "y" ? ut2 : pt2, b2 = e2.rects.reference[u2] + e2.rects.reference[l2] - r2[l2] - e2.rects.popper[u2], v2 = r2[l2] - e2.rects.reference[l2], T2 = Ki(o2), y2 = T2 ? l2 === "y" ? T2.clientHeight || 0 : T2.clientWidth || 0 : 0, C2 = b2 / 2 - v2 / 2, E2 = _2[g2], w2 = y2 - f2[u2] - _2[m2], k2 = y2 / 2 - f2[u2] / 2 + C2, D2 = Mi(E2, k2, w2), O2 = l2;
    e2.modifiersData[i2] = (t2 = {}, t2[O2] = D2, t2.centerOffset = D2 - k2, t2);
  }
};
var Nd = function(s2) {
  var { state: t2, options: e2 } = s2, i2 = e2.element, n2 = i2 === undefined ? "[data-popper-arrow]" : i2;
  if (n2 != null && !(typeof n2 == "string" && (n2 = t2.elements.popper.querySelector(n2), !n2))) {
    if ({}.NODE_ENV !== "production" && (dt2(n2) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !Hc(t2.elements.popper, n2)) {
      ({}).NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    t2.elements.arrow = n2;
  }
};
var Qe2 = function(s2) {
  return s2.split("-")[1];
};
var Rd = function(s2, t2) {
  var { x: e2, y: i2 } = s2, n2 = t2.devicePixelRatio || 1;
  return {
    x: qe2(e2 * n2) / n2 || 0,
    y: qe2(i2 * n2) / n2 || 0
  };
};
var Fr2 = function(s2) {
  var t2, e2 = s2.popper, i2 = s2.popperRect, n2 = s2.placement, o2 = s2.variation, r2 = s2.offsets, a2 = s2.position, l2 = s2.gpuAcceleration, p2 = s2.adaptive, u2 = s2.roundOffsets, _2 = s2.isFixed, f2 = r2.x, g2 = f2 === undefined ? 0 : f2, m2 = r2.y, b2 = m2 === undefined ? 0 : m2, v2 = typeof u2 == "function" ? u2({
    x: g2,
    y: b2
  }) : {
    x: g2,
    y: b2
  };
  g2 = v2.x, b2 = v2.y;
  var T2 = r2.hasOwnProperty("x"), y2 = r2.hasOwnProperty("y"), C2 = nt2, E2 = st2, w2 = window;
  if (p2) {
    var k2 = Ki(e2), D2 = "clientHeight", O2 = "clientWidth";
    if (k2 === _t2(e2) && (k2 = ie2(e2), At2(k2).position !== "static" && a2 === "absolute" && (D2 = "scrollHeight", O2 = "scrollWidth")), k2 = k2, n2 === st2 || (n2 === nt2 || n2 === pt2) && o2 === Ge2) {
      E2 = ut2;
      var x2 = _2 && k2 === w2 && w2.visualViewport ? w2.visualViewport.height : k2[D2];
      b2 -= x2 - i2.height, b2 *= l2 ? 1 : -1;
    }
    if (n2 === nt2 || (n2 === st2 || n2 === ut2) && o2 === Ge2) {
      C2 = pt2;
      var L2 = _2 && k2 === w2 && w2.visualViewport ? w2.visualViewport.width : k2[O2];
      g2 -= L2 - i2.width, g2 *= l2 ? 1 : -1;
    }
  }
  var S2 = Object.assign({
    position: a2
  }, p2 && Md), N2 = u2 === true ? Rd({
    x: g2,
    y: b2
  }, _t2(e2)) : {
    x: g2,
    y: b2
  };
  if (g2 = N2.x, b2 = N2.y, l2) {
    var P2;
    return Object.assign({}, S2, (P2 = {}, P2[E2] = y2 ? "0" : "", P2[C2] = T2 ? "0" : "", P2.transform = (w2.devicePixelRatio || 1) <= 1 ? "translate(" + g2 + "px, " + b2 + "px)" : "translate3d(" + g2 + "px, " + b2 + "px, 0)", P2));
  }
  return Object.assign({}, S2, (t2 = {}, t2[E2] = y2 ? b2 + "px" : "", t2[C2] = T2 ? g2 + "px" : "", t2.transform = "", t2));
};
var Pd = function(s2) {
  var { state: t2, options: e2 } = s2, i2 = e2.gpuAcceleration, n2 = i2 === undefined ? true : i2, o2 = e2.adaptive, r2 = o2 === undefined ? true : o2, a2 = e2.roundOffsets, l2 = a2 === undefined ? true : a2;
  if ({}.NODE_ENV !== "production") {
    var p2 = At2(t2.elements.popper).transitionProperty || "";
    r2 && ["transform", "top", "right", "bottom", "left"].some(function(_2) {
      return p2.indexOf(_2) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var u2 = {
    placement: Et2(t2.placement),
    variation: Qe2(t2.placement),
    popper: t2.elements.popper,
    popperRect: t2.rects.popper,
    gpuAcceleration: n2,
    isFixed: t2.options.strategy === "fixed"
  };
  t2.modifiersData.popperOffsets != null && (t2.styles.popper = Object.assign({}, t2.styles.popper, Fr2(Object.assign({}, u2, {
    offsets: t2.modifiersData.popperOffsets,
    position: t2.options.strategy,
    adaptive: r2,
    roundOffsets: l2
  })))), t2.modifiersData.arrow != null && (t2.styles.arrow = Object.assign({}, t2.styles.arrow, Fr2(Object.assign({}, u2, {
    offsets: t2.modifiersData.arrow,
    position: "absolute",
    adaptive: false,
    roundOffsets: l2
  })))), t2.attributes.popper = Object.assign({}, t2.attributes.popper, {
    "data-popper-placement": t2.placement
  });
};
var Bd = function(s2) {
  var { state: t2, instance: e2, options: i2 } = s2, n2 = i2.scroll, o2 = n2 === undefined ? true : n2, r2 = i2.resize, a2 = r2 === undefined ? true : r2, l2 = _t2(t2.elements.popper), p2 = [].concat(t2.scrollParents.reference, t2.scrollParents.popper);
  return o2 && p2.forEach(function(u2) {
    u2.addEventListener("scroll", e2.update, ns);
  }), a2 && l2.addEventListener("resize", e2.update, ns), function() {
    o2 && p2.forEach(function(u2) {
      u2.removeEventListener("scroll", e2.update, ns);
    }), a2 && l2.removeEventListener("resize", e2.update, ns);
  };
};
var Ws = function(s2) {
  return s2.replace(/left|right|bottom|top/g, function(t2) {
    return Hd[t2];
  });
};
var Yr = function(s2) {
  return s2.replace(/start|end/g, function(t2) {
    return Vd[t2];
  });
};
var gr2 = function(s2) {
  var t2 = _t2(s2), e2 = t2.pageXOffset, i2 = t2.pageYOffset;
  return {
    scrollLeft: e2,
    scrollTop: i2
  };
};
var br2 = function(s2) {
  return Ze2(ie2(s2)).left + gr2(s2).scrollLeft;
};
var Wd = function(s2, t2) {
  var e2 = _t2(s2), i2 = ie2(s2), n2 = e2.visualViewport, o2 = i2.clientWidth, r2 = i2.clientHeight, a2 = 0, l2 = 0;
  if (n2) {
    o2 = n2.width, r2 = n2.height;
    var p2 = Bc();
    (p2 || !p2 && t2 === "fixed") && (a2 = n2.offsetLeft, l2 = n2.offsetTop);
  }
  return {
    width: o2,
    height: r2,
    x: a2 + br2(s2),
    y: l2
  };
};
var Fd = function(s2) {
  var t2, e2 = ie2(s2), i2 = gr2(s2), n2 = (t2 = s2.ownerDocument) == null ? undefined : t2.body, o2 = ve2(e2.scrollWidth, e2.clientWidth, n2 ? n2.scrollWidth : 0, n2 ? n2.clientWidth : 0), r2 = ve2(e2.scrollHeight, e2.clientHeight, n2 ? n2.scrollHeight : 0, n2 ? n2.clientHeight : 0), a2 = -i2.scrollLeft + br2(s2), l2 = -i2.scrollTop;
  return At2(n2 || e2).direction === "rtl" && (a2 += ve2(e2.clientWidth, n2 ? n2.clientWidth : 0) - o2), {
    width: o2,
    height: r2,
    x: a2,
    y: l2
  };
};
var vr2 = function(s2) {
  var t2 = At2(s2), e2 = t2.overflow, i2 = t2.overflowX, n2 = t2.overflowY;
  return /auto|scroll|overlay|hidden/.test(e2 + n2 + i2);
};
var jc = function(s2) {
  return ["html", "body", "#document"].indexOf(Rt2(s2)) >= 0 ? s2.ownerDocument.body : dt2(s2) && vr2(s2) ? s2 : jc(mn(s2));
};
var Ri = function(s2, t2) {
  var e2;
  t2 === undefined && (t2 = []);
  var i2 = jc(s2), n2 = i2 === ((e2 = s2.ownerDocument) == null ? undefined : e2.body), o2 = _t2(i2), r2 = n2 ? [o2].concat(o2.visualViewport || [], vr2(i2) ? i2 : []) : i2, a2 = t2.concat(r2);
  return n2 ? a2 : a2.concat(Ri(mn(r2)));
};
var Yo = function(s2) {
  return Object.assign({}, s2, {
    left: s2.x,
    top: s2.y,
    right: s2.x + s2.width,
    bottom: s2.y + s2.height
  });
};
var Yd = function(s2, t2) {
  var e2 = Ze2(s2, false, t2 === "fixed");
  return e2.top = e2.top + s2.clientTop, e2.left = e2.left + s2.clientLeft, e2.bottom = e2.top + s2.clientHeight, e2.right = e2.left + s2.clientWidth, e2.width = s2.clientWidth, e2.height = s2.clientHeight, e2.x = e2.left, e2.y = e2.top, e2;
};
var jr2 = function(s2, t2, e2) {
  return t2 === cr2 ? Yo(Wd(s2, e2)) : ye2(t2) ? Yd(t2, e2) : Yo(Fd(ie2(s2)));
};
var jd = function(s2) {
  var t2 = Ri(mn(s2)), e2 = ["absolute", "fixed"].indexOf(At2(s2).position) >= 0, i2 = e2 && dt2(s2) ? Ki(s2) : s2;
  return ye2(i2) ? t2.filter(function(n2) {
    return ye2(n2) && Hc(n2, i2) && Rt2(n2) !== "body";
  }) : [];
};
var Kd = function(s2, t2, e2, i2) {
  var n2 = t2 === "clippingParents" ? jd(s2) : [].concat(t2), o2 = [].concat(n2, [e2]), r2 = o2[0], a2 = o2.reduce(function(l2, p2) {
    var u2 = jr2(s2, p2, i2);
    return l2.top = ve2(u2.top, l2.top), l2.right = un(u2.right, l2.right), l2.bottom = un(u2.bottom, l2.bottom), l2.left = ve2(u2.left, l2.left), l2;
  }, jr2(s2, r2, i2));
  return a2.width = a2.right - a2.left, a2.height = a2.bottom - a2.top, a2.x = a2.left, a2.y = a2.top, a2;
};
var Kc = function(s2) {
  var { reference: t2, element: e2, placement: i2 } = s2, n2 = i2 ? Et2(i2) : null, o2 = i2 ? Qe2(i2) : null, r2 = t2.x + t2.width / 2 - e2.width / 2, a2 = t2.y + t2.height / 2 - e2.height / 2, l2;
  switch (n2) {
    case st2:
      l2 = {
        x: r2,
        y: t2.y - e2.height
      };
      break;
    case ut2:
      l2 = {
        x: r2,
        y: t2.y + t2.height
      };
      break;
    case pt2:
      l2 = {
        x: t2.x + t2.width,
        y: a2
      };
      break;
    case nt2:
      l2 = {
        x: t2.x - e2.width,
        y: a2
      };
      break;
    default:
      l2 = {
        x: t2.x,
        y: t2.y
      };
  }
  var p2 = n2 ? _r2(n2) : null;
  if (p2 != null) {
    var u2 = p2 === "y" ? "height" : "width";
    switch (o2) {
      case Ae2:
        l2[p2] = l2[p2] - (t2[u2] / 2 - e2[u2] / 2);
        break;
      case Ge2:
        l2[p2] = l2[p2] + (t2[u2] / 2 - e2[u2] / 2);
        break;
    }
  }
  return l2;
};
var Je2 = function(s2, t2) {
  t2 === undefined && (t2 = {});
  var e2 = t2, i2 = e2.placement, n2 = i2 === undefined ? s2.placement : i2, o2 = e2.strategy, r2 = o2 === undefined ? s2.strategy : o2, a2 = e2.boundary, l2 = a2 === undefined ? xc : a2, p2 = e2.rootBoundary, u2 = p2 === undefined ? cr2 : p2, _2 = e2.elementContext, f2 = _2 === undefined ? Be2 : _2, g2 = e2.altBoundary, m2 = g2 === undefined ? false : g2, b2 = e2.padding, v2 = b2 === undefined ? 0 : b2, T2 = Wc(typeof v2 != "number" ? v2 : Fc(v2, ni)), y2 = f2 === Be2 ? Oc : Be2, C2 = s2.rects.popper, E2 = s2.elements[m2 ? y2 : f2], w2 = Kd(ye2(E2) ? E2 : E2.contextElement || ie2(s2.elements.popper), l2, u2, r2), k2 = Ze2(s2.elements.reference), D2 = Kc({
    reference: k2,
    element: C2,
    strategy: "absolute",
    placement: n2
  }), O2 = Yo(Object.assign({}, C2, D2)), x2 = f2 === Be2 ? O2 : k2, L2 = {
    top: w2.top - x2.top + T2.top,
    bottom: x2.bottom - w2.bottom + T2.bottom,
    left: w2.left - x2.left + T2.left,
    right: x2.right - w2.right + T2.right
  }, S2 = s2.modifiersData.offset;
  if (f2 === Be2 && S2) {
    var N2 = S2[n2];
    Object.keys(L2).forEach(function(P2) {
      var ot2 = [pt2, ut2].indexOf(P2) >= 0 ? 1 : -1, rt2 = [st2, ut2].indexOf(P2) >= 0 ? "y" : "x";
      L2[P2] += N2[rt2] * ot2;
    });
  }
  return L2;
};
var zd = function(s2, t2) {
  t2 === undefined && (t2 = {});
  var e2 = t2, i2 = e2.placement, n2 = e2.boundary, o2 = e2.rootBoundary, r2 = e2.padding, a2 = e2.flipVariations, l2 = e2.allowedAutoPlacements, p2 = l2 === undefined ? hr2 : l2, u2 = Qe2(i2), _2 = u2 ? a2 ? Wo : Wo.filter(function(m2) {
    return Qe2(m2) === u2;
  }) : ni, f2 = _2.filter(function(m2) {
    return p2.indexOf(m2) >= 0;
  });
  f2.length === 0 && (f2 = _2, {}.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var g2 = f2.reduce(function(m2, b2) {
    return m2[b2] = Je2(s2, {
      placement: b2,
      boundary: n2,
      rootBoundary: o2,
      padding: r2
    })[Et2(b2)], m2;
  }, {});
  return Object.keys(g2).sort(function(m2, b2) {
    return g2[m2] - g2[b2];
  });
};
var Ud = function(s2) {
  if (Et2(s2) === ji)
    return [];
  var t2 = Ws(s2);
  return [Yr(s2), t2, Yr(t2)];
};
var Xd = function(s2) {
  var { state: t2, options: e2, name: i2 } = s2;
  if (!t2.modifiersData[i2]._skip) {
    for (var n2 = e2.mainAxis, o2 = n2 === undefined ? true : n2, r2 = e2.altAxis, a2 = r2 === undefined ? true : r2, l2 = e2.fallbackPlacements, p2 = e2.padding, u2 = e2.boundary, _2 = e2.rootBoundary, f2 = e2.altBoundary, g2 = e2.flipVariations, m2 = g2 === undefined ? true : g2, b2 = e2.allowedAutoPlacements, v2 = t2.options.placement, T2 = Et2(v2), y2 = T2 === v2, C2 = l2 || (y2 || !m2 ? [Ws(v2)] : Ud(v2)), E2 = [v2].concat(C2).reduce(function(Oe2, Vt2) {
      return Oe2.concat(Et2(Vt2) === ji ? zd(t2, {
        placement: Vt2,
        boundary: u2,
        rootBoundary: _2,
        padding: p2,
        flipVariations: m2,
        allowedAutoPlacements: b2
      }) : Vt2);
    }, []), w2 = t2.rects.reference, k2 = t2.rects.popper, D2 = new Map, O2 = true, x2 = E2[0], L2 = 0;L2 < E2.length; L2++) {
      var S2 = E2[L2], N2 = Et2(S2), P2 = Qe2(S2) === Ae2, ot2 = [st2, ut2].indexOf(N2) >= 0, rt2 = ot2 ? "width" : "height", G2 = Je2(t2, {
        placement: S2,
        boundary: u2,
        rootBoundary: _2,
        altBoundary: f2,
        padding: p2
      }), vt2 = ot2 ? P2 ? pt2 : nt2 : P2 ? ut2 : st2;
      w2[rt2] > k2[rt2] && (vt2 = Ws(vt2));
      var Ji = Ws(vt2), oe2 = [];
      if (o2 && oe2.push(G2[N2] <= 0), a2 && oe2.push(G2[vt2] <= 0, G2[Ji] <= 0), oe2.every(function(Oe2) {
        return Oe2;
      })) {
        x2 = S2, O2 = false;
        break;
      }
      D2.set(S2, oe2);
    }
    if (O2)
      for (var ts = m2 ? 3 : 1, kn = function(Vt2) {
        var di = E2.find(function(is) {
          var re2 = D2.get(is);
          if (re2)
            return re2.slice(0, Vt2).every(function(xn) {
              return xn;
            });
        });
        if (di)
          return x2 = di, "break";
      }, hi = ts;hi > 0; hi--) {
        var es = kn(hi);
        if (es === "break")
          break;
      }
    t2.placement !== x2 && (t2.modifiersData[i2]._skip = true, t2.placement = x2, t2.reset = true);
  }
};
var Kr = function(s2, t2, e2) {
  return e2 === undefined && (e2 = {
    x: 0,
    y: 0
  }), {
    top: s2.top - t2.height - e2.y,
    right: s2.right - t2.width + e2.x,
    bottom: s2.bottom - t2.height + e2.y,
    left: s2.left - t2.width - e2.x
  };
};
var zr2 = function(s2) {
  return [st2, pt2, ut2, nt2].some(function(t2) {
    return s2[t2] >= 0;
  });
};
var Gd = function(s2) {
  var { state: t2, name: e2 } = s2, i2 = t2.rects.reference, n2 = t2.rects.popper, o2 = t2.modifiersData.preventOverflow, r2 = Je2(t2, {
    elementContext: "reference"
  }), a2 = Je2(t2, {
    altBoundary: true
  }), l2 = Kr(r2, i2), p2 = Kr(a2, n2, o2), u2 = zr2(l2), _2 = zr2(p2);
  t2.modifiersData[e2] = {
    referenceClippingOffsets: l2,
    popperEscapeOffsets: p2,
    isReferenceHidden: u2,
    hasPopperEscaped: _2
  }, t2.attributes.popper = Object.assign({}, t2.attributes.popper, {
    "data-popper-reference-hidden": u2,
    "data-popper-escaped": _2
  });
};
var qd = function(s2, t2, e2) {
  var i2 = Et2(s2), n2 = [nt2, st2].indexOf(i2) >= 0 ? -1 : 1, o2 = typeof e2 == "function" ? e2(Object.assign({}, t2, {
    placement: s2
  })) : e2, r2 = o2[0], a2 = o2[1];
  return r2 = r2 || 0, a2 = (a2 || 0) * n2, [nt2, pt2].indexOf(i2) >= 0 ? {
    x: a2,
    y: r2
  } : {
    x: r2,
    y: a2
  };
};
var Zd = function(s2) {
  var { state: t2, options: e2, name: i2 } = s2, n2 = e2.offset, o2 = n2 === undefined ? [0, 0] : n2, r2 = hr2.reduce(function(u2, _2) {
    return u2[_2] = qd(_2, t2.rects, o2), u2;
  }, {}), a2 = r2[t2.placement], l2 = a2.x, p2 = a2.y;
  t2.modifiersData.popperOffsets != null && (t2.modifiersData.popperOffsets.x += l2, t2.modifiersData.popperOffsets.y += p2), t2.modifiersData[i2] = r2;
};
var Qd = function(s2) {
  var { state: t2, name: e2 } = s2;
  t2.modifiersData[e2] = Kc({
    reference: t2.rects.reference,
    element: t2.rects.popper,
    strategy: "absolute",
    placement: t2.placement
  });
};
var Jd = function(s2) {
  return s2 === "x" ? "y" : "x";
};
var tu = function(s2) {
  var { state: t2, options: e2, name: i2 } = s2, n2 = e2.mainAxis, o2 = n2 === undefined ? true : n2, r2 = e2.altAxis, a2 = r2 === undefined ? false : r2, l2 = e2.boundary, p2 = e2.rootBoundary, u2 = e2.altBoundary, _2 = e2.padding, f2 = e2.tether, g2 = f2 === undefined ? true : f2, m2 = e2.tetherOffset, b2 = m2 === undefined ? 0 : m2, v2 = Je2(t2, {
    boundary: l2,
    rootBoundary: p2,
    padding: _2,
    altBoundary: u2
  }), T2 = Et2(t2.placement), y2 = Qe2(t2.placement), C2 = !y2, E2 = _r2(T2), w2 = Jd(E2), k2 = t2.modifiersData.popperOffsets, D2 = t2.rects.reference, O2 = t2.rects.popper, x2 = typeof b2 == "function" ? b2(Object.assign({}, t2.rects, {
    placement: t2.placement
  })) : b2, L2 = typeof x2 == "number" ? {
    mainAxis: x2,
    altAxis: x2
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, x2), S2 = t2.modifiersData.offset ? t2.modifiersData.offset[t2.placement] : null, N2 = {
    x: 0,
    y: 0
  };
  if (k2) {
    if (o2) {
      var P2, ot2 = E2 === "y" ? st2 : nt2, rt2 = E2 === "y" ? ut2 : pt2, G2 = E2 === "y" ? "height" : "width", vt2 = k2[E2], Ji = vt2 + v2[ot2], oe2 = vt2 - v2[rt2], ts = g2 ? -O2[G2] / 2 : 0, kn = y2 === Ae2 ? D2[G2] : O2[G2], hi = y2 === Ae2 ? -O2[G2] : -D2[G2], es = t2.elements.arrow, Oe2 = g2 && es ? pr2(es) : {
        width: 0,
        height: 0
      }, Vt2 = t2.modifiersData["arrow#persistent"] ? t2.modifiersData["arrow#persistent"].padding : Vc(), di = Vt2[ot2], is = Vt2[rt2], re2 = Mi(0, D2[G2], Oe2[G2]), xn = C2 ? D2[G2] / 2 - ts - re2 - di - L2.mainAxis : kn - re2 - di - L2.mainAxis, nd = C2 ? -D2[G2] / 2 + ts + re2 + is + L2.mainAxis : hi + re2 + is + L2.mainAxis, On = t2.elements.arrow && Ki(t2.elements.arrow), od = On ? E2 === "y" ? On.clientTop || 0 : On.clientLeft || 0 : 0, Ir2 = (P2 = S2 == null ? undefined : S2[E2]) != null ? P2 : 0, rd = vt2 + xn - Ir2 - od, ad = vt2 + nd - Ir2, Dr2 = Mi(g2 ? un(Ji, rd) : Ji, vt2, g2 ? ve2(oe2, ad) : oe2);
      k2[E2] = Dr2, N2[E2] = Dr2 - vt2;
    }
    if (a2) {
      var $r2, ld = E2 === "x" ? st2 : nt2, cd = E2 === "x" ? ut2 : pt2, ae2 = k2[w2], ss = w2 === "y" ? "height" : "width", Lr2 = ae2 + v2[ld], Nr2 = ae2 - v2[cd], Sn = [st2, nt2].indexOf(T2) !== -1, Mr2 = ($r2 = S2 == null ? undefined : S2[w2]) != null ? $r2 : 0, Rr2 = Sn ? Lr2 : ae2 - D2[ss] - O2[ss] - Mr2 + L2.altAxis, Pr2 = Sn ? ae2 + D2[ss] + O2[ss] - Mr2 - L2.altAxis : Nr2, Br2 = g2 && Sn ? Dd(Rr2, ae2, Pr2) : Mi(g2 ? Rr2 : Lr2, ae2, g2 ? Pr2 : Nr2);
      k2[w2] = Br2, N2[w2] = Br2 - ae2;
    }
    t2.modifiersData[i2] = N2;
  }
};
var eu = function(s2) {
  return {
    scrollLeft: s2.scrollLeft,
    scrollTop: s2.scrollTop
  };
};
var iu = function(s2) {
  return s2 === _t2(s2) || !dt2(s2) ? gr2(s2) : eu(s2);
};
var su = function(s2) {
  var t2 = s2.getBoundingClientRect(), e2 = qe2(t2.width) / s2.offsetWidth || 1, i2 = qe2(t2.height) / s2.offsetHeight || 1;
  return e2 !== 1 || i2 !== 1;
};
var nu = function(s2, t2, e2) {
  e2 === undefined && (e2 = false);
  var i2 = dt2(t2), n2 = dt2(t2) && su(t2), o2 = ie2(t2), r2 = Ze2(s2, n2, e2), a2 = {
    scrollLeft: 0,
    scrollTop: 0
  }, l2 = {
    x: 0,
    y: 0
  };
  return (i2 || !i2 && !e2) && ((Rt2(t2) !== "body" || vr2(o2)) && (a2 = iu(t2)), dt2(t2) ? (l2 = Ze2(t2, true), l2.x += t2.clientLeft, l2.y += t2.clientTop) : o2 && (l2.x = br2(o2))), {
    x: r2.left + a2.scrollLeft - l2.x,
    y: r2.top + a2.scrollTop - l2.y,
    width: r2.width,
    height: r2.height
  };
};
var ou = function(s2) {
  var t2 = new Map, e2 = new Set, i2 = [];
  s2.forEach(function(o2) {
    t2.set(o2.name, o2);
  });
  function n2(o2) {
    e2.add(o2.name);
    var r2 = [].concat(o2.requires || [], o2.requiresIfExists || []);
    r2.forEach(function(a2) {
      if (!e2.has(a2)) {
        var l2 = t2.get(a2);
        l2 && n2(l2);
      }
    }), i2.push(o2);
  }
  return s2.forEach(function(o2) {
    e2.has(o2.name) || n2(o2);
  }), i2;
};
var ru = function(s2) {
  var t2 = ou(s2);
  return dn.reduce(function(e2, i2) {
    return e2.concat(t2.filter(function(n2) {
      return n2.phase === i2;
    }));
  }, []);
};
var au = function(s2) {
  var t2;
  return function() {
    return t2 || (t2 = new Promise(function(e2) {
      Promise.resolve().then(function() {
        t2 = undefined, e2(s2());
      });
    })), t2;
  };
};
var Wt2 = function(s2) {
  for (var t2 = arguments.length, e2 = new Array(t2 > 1 ? t2 - 1 : 0), i2 = 1;i2 < t2; i2++)
    e2[i2 - 1] = arguments[i2];
  return [].concat(e2).reduce(function(n2, o2) {
    return n2.replace(/%s/, o2);
  }, s2);
};
var cu = function(s2) {
  s2.forEach(function(t2) {
    [].concat(Object.keys(t2), Ur2).filter(function(e2, i2, n2) {
      return n2.indexOf(e2) === i2;
    }).forEach(function(e2) {
      switch (e2) {
        case "name":
          typeof t2.name != "string" && console.error(Wt2(le2, String(t2.name), '"name"', '"string"', '"' + String(t2.name) + '"'));
          break;
        case "enabled":
          typeof t2.enabled != "boolean" && console.error(Wt2(le2, t2.name, '"enabled"', '"boolean"', '"' + String(t2.enabled) + '"'));
          break;
        case "phase":
          dn.indexOf(t2.phase) < 0 && console.error(Wt2(le2, t2.name, '"phase"', "either " + dn.join(", "), '"' + String(t2.phase) + '"'));
          break;
        case "fn":
          typeof t2.fn != "function" && console.error(Wt2(le2, t2.name, '"fn"', '"function"', '"' + String(t2.fn) + '"'));
          break;
        case "effect":
          t2.effect != null && typeof t2.effect != "function" && console.error(Wt2(le2, t2.name, '"effect"', '"function"', '"' + String(t2.fn) + '"'));
          break;
        case "requires":
          t2.requires != null && !Array.isArray(t2.requires) && console.error(Wt2(le2, t2.name, '"requires"', '"array"', '"' + String(t2.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t2.requiresIfExists) || console.error(Wt2(le2, t2.name, '"requiresIfExists"', '"array"', '"' + String(t2.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t2.name + '" modifier, valid properties are ' + Ur2.map(function(i2) {
            return '"' + i2 + '"';
          }).join(", ") + '; but "' + e2 + '" was provided.');
      }
      t2.requires && t2.requires.forEach(function(i2) {
        s2.find(function(n2) {
          return n2.name === i2;
        }) == null && console.error(Wt2(lu, String(t2.name), i2, i2));
      });
    });
  });
};
var hu = function(s2, t2) {
  var e2 = new Set;
  return s2.filter(function(i2) {
    var n2 = t2(i2);
    if (!e2.has(n2))
      return e2.add(n2), true;
  });
};
var du = function(s2) {
  var t2 = s2.reduce(function(e2, i2) {
    var n2 = e2[i2.name];
    return e2[i2.name] = n2 ? Object.assign({}, n2, i2, {
      options: Object.assign({}, n2.options, i2.options),
      data: Object.assign({}, n2.data, i2.data)
    }) : i2, e2;
  }, {});
  return Object.keys(t2).map(function(e2) {
    return t2[e2];
  });
};
var qr2 = function() {
  for (var s2 = arguments.length, t2 = new Array(s2), e2 = 0;e2 < s2; e2++)
    t2[e2] = arguments[e2];
  return !t2.some(function(i2) {
    return !(i2 && typeof i2.getBoundingClientRect == "function");
  });
};
var gn = function(s2) {
  s2 === undefined && (s2 = {});
  var t2 = s2, e2 = t2.defaultModifiers, i2 = e2 === undefined ? [] : e2, n2 = t2.defaultOptions, o2 = n2 === undefined ? Gr : n2;
  return function(a2, l2, p2) {
    p2 === undefined && (p2 = o2);
    var u2 = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Gr, o2),
      modifiersData: {},
      elements: {
        reference: a2,
        popper: l2
      },
      attributes: {},
      styles: {}
    }, _2 = [], f2 = false, g2 = {
      state: u2,
      setOptions: function(T2) {
        var y2 = typeof T2 == "function" ? T2(u2.options) : T2;
        b2(), u2.options = Object.assign({}, o2, u2.options, y2), u2.scrollParents = {
          reference: ye2(a2) ? Ri(a2) : a2.contextElement ? Ri(a2.contextElement) : [],
          popper: Ri(l2)
        };
        var C2 = ru(du([].concat(i2, u2.options.modifiers)));
        if (u2.orderedModifiers = C2.filter(function(S2) {
          return S2.enabled;
        }), {}.NODE_ENV !== "production") {
          var E2 = hu([].concat(C2, u2.options.modifiers), function(S2) {
            var N2 = S2.name;
            return N2;
          });
          if (cu(E2), Et2(u2.options.placement) === ji) {
            var w2 = u2.orderedModifiers.find(function(S2) {
              var N2 = S2.name;
              return N2 === "flip";
            });
            w2 || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var k2 = At2(l2), D2 = k2.marginTop, O2 = k2.marginRight, x2 = k2.marginBottom, L2 = k2.marginLeft;
          [D2, O2, x2, L2].some(function(S2) {
            return parseFloat(S2);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return m2(), g2.update();
      },
      forceUpdate: function() {
        if (!f2) {
          var T2 = u2.elements, y2 = T2.reference, C2 = T2.popper;
          if (!qr2(y2, C2)) {
            ({}).NODE_ENV !== "production" && console.error(Xr2);
            return;
          }
          u2.rects = {
            reference: nu(y2, Ki(C2), u2.options.strategy === "fixed"),
            popper: pr2(C2)
          }, u2.reset = false, u2.placement = u2.options.placement, u2.orderedModifiers.forEach(function(S2) {
            return u2.modifiersData[S2.name] = Object.assign({}, S2.data);
          });
          for (var E2 = 0, w2 = 0;w2 < u2.orderedModifiers.length; w2++) {
            if ({}.NODE_ENV !== "production" && (E2 += 1, E2 > 100)) {
              console.error(uu);
              break;
            }
            if (u2.reset === true) {
              u2.reset = false, w2 = -1;
              continue;
            }
            var k2 = u2.orderedModifiers[w2], D2 = k2.fn, O2 = k2.options, x2 = O2 === undefined ? {} : O2, L2 = k2.name;
            typeof D2 == "function" && (u2 = D2({
              state: u2,
              options: x2,
              name: L2,
              instance: g2
            }) || u2);
          }
        }
      },
      update: au(function() {
        return new Promise(function(v2) {
          g2.forceUpdate(), v2(u2);
        });
      }),
      destroy: function() {
        b2(), f2 = true;
      }
    };
    if (!qr2(a2, l2))
      return {}.NODE_ENV !== "production" && console.error(Xr2), g2;
    g2.setOptions(p2).then(function(v2) {
      !f2 && p2.onFirstUpdate && p2.onFirstUpdate(v2);
    });
    function m2() {
      u2.orderedModifiers.forEach(function(v2) {
        var { name: T2, options: y2 } = v2, C2 = y2 === undefined ? {} : y2, E2 = v2.effect;
        if (typeof E2 == "function") {
          var w2 = E2({
            state: u2,
            name: T2,
            instance: g2,
            options: C2
          }), k2 = function() {
          };
          _2.push(w2 || k2);
        }
      });
    }
    function b2() {
      _2.forEach(function(v2) {
        return v2();
      }), _2 = [];
    }
    return g2;
  };
};
var Ln = function(s2) {
  return s2 === "true" ? true : s2 === "false" ? false : s2 === Number(s2).toString() ? Number(s2) : s2 === "" || s2 === "null" ? null : s2;
};
var Nn = function(s2) {
  return s2.replace(/[A-Z]/g, (t2) => `-${t2.toLowerCase()}`);
};
var Mn = function(s2) {
  return typeof s2 == "string" ? s2.split(" ") : Array.isArray(s2) ? s2 : false;
};
var pn = function(s2, t2, e2) {
  if (!s2.length)
    return s2;
  if (e2 && typeof e2 == "function")
    return e2(s2);
  const n2 = new window.DOMParser().parseFromString(s2, "text/html"), o2 = [].concat(...n2.body.querySelectorAll("*"));
  for (let r2 = 0, a2 = o2.length;r2 < a2; r2++) {
    const l2 = o2[r2], p2 = l2.nodeName.toLowerCase();
    if (!Object.keys(t2).includes(p2)) {
      l2.remove();
      continue;
    }
    const u2 = [].concat(...l2.attributes), _2 = [].concat(t2["*"] || [], t2[p2] || []);
    u2.forEach((f2) => {
      p_(f2, _2) || l2.removeAttribute(f2.nodeName);
    });
  }
  return n2.body.innerHTML;
};
var tt2 = function(s2) {
  return s2.getDate();
};
var zs = function(s2) {
  return s2.getDay();
};
var Y2 = function(s2) {
  return s2.getMonth();
};
var B2 = function(s2) {
  return s2.getFullYear();
};
var Nf = function(s2, t2, e2) {
  const i2 = e2.startDay, n2 = i2 > 0 ? 7 - i2 : 0, r2 = new Date(s2, t2).getDay() + n2;
  return r2 >= 7 ? r2 - 7 : r2;
};
var Go = function(s2) {
  return Mf(s2).getDate();
};
var Mf = function(s2) {
  return Ct2(s2.getFullYear(), s2.getMonth() + 1, 0);
};
var je2 = function() {
  return new Date;
};
var at2 = function(s2, t2) {
  return lt2(s2, t2 * 12);
};
var lt2 = function(s2, t2) {
  const e2 = Ct2(s2.getFullYear(), s2.getMonth() + t2, s2.getDate()), i2 = tt2(s2), n2 = tt2(e2);
  return i2 !== n2 && e2.setDate(0), e2;
};
var $e2 = function(s2, t2) {
  return Ct2(s2.getFullYear(), s2.getMonth(), s2.getDate() + t2);
};
var Ct2 = function(s2, t2, e2) {
  const i2 = new Date(s2, t2, e2);
  return s2 >= 0 && s2 < 100 && i2.setFullYear(i2.getFullYear() - 1900), i2;
};
var Va = function(s2) {
  const t2 = s2.split("-"), e2 = t2[0], i2 = t2[1], n2 = t2[2];
  return Ct2(e2, i2, n2);
};
var Rf = function(s2) {
  return !Number.isNaN(s2.getTime());
};
var Fe2 = function(s2, t2) {
  return B2(s2) - B2(t2) || Y2(s2) - Y2(t2) || tt2(s2) - tt2(t2);
};
var me2 = function(s2, t2) {
  return s2.setHours(0, 0, 0, 0), t2.setHours(0, 0, 0, 0), s2.getTime() === t2.getTime();
};
var Us = function(s2, t2) {
  const i2 = B2(s2) - Bf();
  return Pf(i2, t2);
};
var Pf = function(s2, t2) {
  return (s2 % t2 + t2) % t2;
};
var Bf = function(s2, t2, e2) {
  let i2 = 0;
  return e2 ? i2 = B2(e2) - s2 + 1 : t2 && (i2 = B2(t2)), i2;
};
var _n = function(s2, t2, e2, i2, n2, o2) {
  const r2 = new Date;
  r2.setHours(0, 0, 0, 0);
  const a2 = t2 && Fe2(s2, t2) <= -1, l2 = e2 && Fe2(s2, e2) >= 1, p2 = n2 && Fe2(s2, r2) <= -1, u2 = o2 && Fe2(s2, r2) >= 1, _2 = i2 && i2(s2) === false;
  return a2 || l2 || _2 || p2 || u2;
};
var _h = function(s2, t2, e2, i2, n2, o2) {
  const r2 = new Date, a2 = i2 && B2(i2), l2 = i2 && Y2(i2), p2 = e2 && B2(e2), u2 = e2 && Y2(e2), _2 = B2(r2), f2 = Y2(r2), g2 = l2 && a2 && (t2 > a2 || t2 === a2 && s2 > l2), m2 = u2 && p2 && (t2 < p2 || t2 === p2 && s2 < u2), b2 = n2 && (t2 < _2 || t2 === _2 && s2 < f2), v2 = o2 && (t2 > _2 || t2 === _2 && s2 > f2);
  return g2 || m2 || b2 || v2;
};
var qo = function(s2, t2, e2, i2, n2) {
  const o2 = t2 && B2(t2), r2 = e2 && B2(e2), a2 = B2(new Date), l2 = r2 && s2 > r2, p2 = o2 && s2 < o2, u2 = i2 && s2 < a2, _2 = n2 && s2 > a2;
  return l2 || p2 || u2 || _2;
};
var Hf = function(s2, t2, e2, i2, n2, o2, r2, a2) {
  const l2 = new Date;
  return l2.setHours(0, 0, 0, 0), (s2 && o2 && Fe2(o2, l2) < 0 || s2) && (o2 = l2), o2 && Pi(t2, o2, e2, i2, n2, o2, r2, a2);
};
var Vf = function(s2, t2, e2, i2, n2, o2, r2, a2) {
  const l2 = new Date;
  return l2.setHours(0, 0, 0, 0), (s2 && n2 && Fe2(n2, l2) < 0 || s2) && (n2 = l2), n2 && Pi(t2, n2, e2, i2, n2, o2, r2, a2);
};
var Pi = function(s2, t2, e2, i2, n2, o2, r2, a2) {
  return e2 === "days" ? B2(s2) === B2(t2) && Y2(s2) === Y2(t2) : e2 === "months" ? B2(s2) === B2(t2) : e2 === "years" ? B2(t2) >= a2 && B2(t2) <= r2 : false;
};
var Zf = function(s2, t2, e2, i2, n2, o2, r2, a2, l2, p2) {
  const u2 = Y2(s2), _2 = B2(s2), f2 = tt2(s2), g2 = zs(s2), m2 = $2("div"), b2 = `
        ${Fa(s2, u2, _2, t2, e2, i2, n2, o2, r2, a2, p2)}
    `, v2 = `
      ${Jf(f2, g2, u2, n2, p2)}
      ${Fa(s2, u2, _2, t2, e2, i2, n2, o2, r2, a2, p2)}
    `;
  return n2.inline ? (h2.addClass(m2, p2.datepickerDropdownContainer), m2.setAttribute(Ff, l2), m2.innerHTML = b2) : (h2.addClass(m2, p2.modalContainer), m2.setAttribute(Wf, l2), m2.innerHTML = v2), m2;
};
var Qf = function(s2) {
  const t2 = $2("div");
  return h2.addClass(t2, s2), t2.setAttribute(Yf, ""), t2;
};
var Jf = function(s2, t2, e2, i2, n2) {
  return `
      <div class="${n2.datepickerHeader}" data-te-datepicker-header>
        <div class="${n2.datepickerTitle}">
          <span class="${n2.datepickerTitleText}">${i2.title}</span>
        </div>
        <div class="${n2.datepickerDate}">
          <span class="${n2.datepickerDateText}" ${jf} >${i2.weekdaysShort[t2]}, ${i2.monthsShort[e2]} ${s2}</span>
        </div>
      </div>
    `;
};
var Fa = function(s2, t2, e2, i2, n2, o2, r2, a2, l2, p2, u2) {
  let _2;
  return r2.inline ? _2 = `
    <div class="${u2.datepickerMain}">
      ${ja(t2, e2, r2, u2)}
      <div class="${u2.datepickerView}" ${Wa} tabindex="0">
        ${Ya(s2, e2, i2, n2, o2, r2, a2, l2, p2, u2)}
      </div>
    </div>
  ` : _2 = `
    <div class="${u2.datepickerMain}">
      ${ja(t2, e2, r2, u2)}
      <div class="${u2.datepickerView}" ${Wa} tabindex="0">
        ${Ya(s2, e2, i2, n2, o2, r2, a2, l2, p2, u2)}
      </div>
      ${tm(r2, u2)}
    </div>
  `, _2;
};
var Ya = function(s2, t2, e2, i2, n2, o2, r2, a2, l2, p2) {
  let u2;
  return o2.view === "days" ? u2 = Xs(s2, e2, o2, p2) : o2.view === "months" ? u2 = Gs(t2, i2, n2, o2, r2, p2) : u2 = qs(s2, i2, o2, a2, l2, p2), u2;
};
var ja = function(s2, t2, e2, i2) {
  return `
    <div class="${i2.datepickerDateControls}">
      <button class="${i2.datepickerViewChangeButton}" aria-label="${e2.switchToMultiYearViewLabel}" ${qf}>
        ${e2.monthsFull[s2]} ${t2} ${Lt2(e2, i2)}
      </button>
      <div class="${i2.datepickerArrowControls}">
        <button class="${i2.datepickerPreviousButton}" aria-label="${e2.prevMonthLabel}" ${Kf}>${e2.changeMonthIconTemplate}</button>
        <button class="${i2.datepickerNextButton}" aria-label="${e2.nextMonthLabel}" ${zf}>${e2.changeMonthIconTemplate}</button>
      </div>
    </div>
    `;
};
var Lt2 = function(s2, t2) {
  return `
  <span class="${t2.datepickerViewChangeIcon}">
  ${s2.viewChangeIconTemplate}
  </span>
  `;
};
var tm = function(s2, t2) {
  const e2 = `<button class="${t2.datepickerFooterBtn}" aria-label="${s2.okBtnLabel}" ${Uf}>${s2.okBtnText}</button>`, i2 = `<button class="${t2.datepickerFooterBtn}" aria-label="${s2.cancelBtnLabel}" ${Xf}>${s2.cancelBtnText}</button>`, n2 = `<button class="${t2.datepickerFooterBtn} ${t2.datepickerClearBtn}" aria-label="${s2.clearBtnLabel}" ${Gf}>${s2.clearBtnText}</button>`;
  return `
        <div class="${t2.datepickerFooter}">
          
        ${s2.removeClearBtn ? "" : n2}
        ${s2.removeCancelBtn ? "" : i2}
        ${s2.removeOkBtn ? "" : e2}
        </div>
      `;
};
var Xs = function(s2, t2, e2, i2) {
  const n2 = em(s2, t2, e2), r2 = `
      <tr>
        ${e2.weekdaysNarrow.map((l2, p2) => `<th class="${i2.datepickerDayHeading}" scope="col" aria-label="${e2.weekdaysFull[p2]}">${l2}</th>`).join("")}
      </tr>
    `, a2 = n2.map((l2) => `
        <tr>
          ${l2.map((p2) => `
              <td
              class="${i2.datepickerCell} ${i2.datepickerCellSmall}"
              data-te-date="${B2(p2.date)}-${Y2(p2.date)}-${tt2(p2.date)}"
              aria-label="${p2.date}"
              aria-selected="${p2.isSelected}"
              ${p2.isSelected ? "data-te-datepicker-cell-selected" : ""}
              ${!p2.currentMonth || p2.disabled ? "data-te-datepicker-cell-disabled" : ""}
              ${p2.isToday ? "data-te-datepicker-cell-current" : ""}
              >
                <div
                  class="${i2.datepickerCellContent} ${i2.datepickerCellContentSmall}"
                  style="${p2.currentMonth ? "display: block" : "display: none"}"
                  >
                  ${p2.dayNumber}
                  </div>
              </td>
            `).join("")}
        </tr>
      `).join("");
  return `
      <table class="${i2.datepickerTable}">
        <thead>
          ${r2}
        </thead>
        <tbody>
         ${a2}
        </tbody>
      </table>
    `;
};
var em = function(s2, t2, e2) {
  const i2 = [], n2 = Y2(s2), o2 = Y2(lt2(s2, -1)), r2 = Y2(lt2(s2, 1)), a2 = B2(s2), l2 = Nf(a2, n2, e2), p2 = Go(s2), u2 = Go(lt2(s2, -1)), _2 = 7;
  let f2 = 1, g2 = false;
  for (let m2 = 1;m2 < _2; m2++) {
    const b2 = [];
    if (m2 === 1) {
      const v2 = u2 - l2 + 1;
      for (let y2 = v2;y2 <= u2; y2++) {
        const C2 = Ct2(a2, o2, y2);
        b2.push({
          date: C2,
          currentMonth: g2,
          isSelected: t2 && me2(C2, t2),
          isToday: me2(C2, je2()),
          dayNumber: tt2(C2)
        });
      }
      g2 = true;
      const T2 = _2 - b2.length;
      for (let y2 = 0;y2 < T2; y2++) {
        const C2 = Ct2(a2, n2, f2);
        b2.push({
          date: C2,
          currentMonth: g2,
          isSelected: t2 && me2(C2, t2),
          isToday: me2(C2, je2()),
          dayNumber: tt2(C2),
          disabled: _n(C2, e2.min, e2.max, e2.filter, e2.disablePast, e2.disableFuture)
        }), f2++;
      }
    } else
      for (let v2 = 1;v2 < 8; v2++) {
        f2 > p2 && (f2 = 1, g2 = false);
        const T2 = Ct2(a2, g2 ? n2 : r2, f2);
        b2.push({
          date: T2,
          currentMonth: g2,
          isSelected: t2 && me2(T2, t2),
          isToday: me2(T2, je2()),
          dayNumber: tt2(T2),
          disabled: _n(T2, e2.min, e2.max, e2.filter, e2.disablePast, e2.disableFuture)
        }), f2++;
      }
    i2.push(b2);
  }
  return i2;
};
var Gs = function(s2, t2, e2, i2, n2, o2) {
  const r2 = im(i2, n2), a2 = Y2(je2()), l2 = B2(je2()), p2 = `
      ${r2.map((u2) => `
          <tr>
            ${u2.map((_2) => {
    const f2 = i2.monthsShort.indexOf(_2);
    return `
                <td class="${o2.datepickerCell} ${o2.datepickerCellLarge}"
                ${_h(f2, s2, i2.min, i2.max, i2.disablePast, i2.disableFuture) ? "data-te-datepicker-cell-disabled" : ""}
                
                data-te-month="${f2}" data-te-year="${s2}" aria-label="${_2}, ${s2}"
                ${f2 === e2 && s2 === t2 ? "data-te-datepicker-cell-selected" : ""}
                ${f2 === a2 && s2 === l2 ? "data-te-datepicker-cell-current" : ""}" data-te-month="${f2}" data-te-year="${s2}" aria-label="${_2}, ${s2}">
                  <div class="${o2.datepickerCellContent} ${o2.datepickerCellContentLarge}">${_2}</div>
                </td>
              `;
  }).join("")}
          </tr>
        `).join("")}
    `;
  return `
      <table class="${o2.datepickerTable}">
        <tbody>
         ${p2}
        </tbody>
      </table>
    `;
};
var im = function(s2, t2) {
  const e2 = [];
  let i2 = [];
  for (let n2 = 0;n2 < s2.monthsShort.length; n2++)
    if (i2.push(s2.monthsShort[n2]), i2.length === t2) {
      const o2 = i2;
      e2.push(o2), i2 = [];
    }
  return e2;
};
var qs = function(s2, t2, e2, i2, n2, o2) {
  const r2 = sm(s2, i2, n2), a2 = B2(je2()), l2 = `
    ${r2.map((p2) => `
        <tr>
          ${p2.map((u2) => `
              <td class="${o2.datepickerCell} ${o2.datepickerCellLarge}"  aria-label="${u2}" data-te-year="${u2}"
              ${qo(u2, e2.min, e2.max, e2.disablePast, e2.disableFuture) ? "data-te-datepicker-cell-disabled" : ""}
              ${u2 === t2 ? "data-te-datepicker-cell-selected" : ""}
              ${u2 === a2 ? "data-te-datepicker-cell-current" : ""}
              >
                <div class="${o2.datepickerCellContent} ${o2.datepickerCellContentLarge}">${u2}</div>
              </td>
            `).join("")}
        </tr>
      `).join("")}
  `;
  return `
      <table class="${o2.datepickerTable}">
        <tbody>
        ${l2}
        </tbody>
      </table>
    `;
};
var sm = function(s2, t2, e2) {
  const i2 = [], n2 = B2(s2), o2 = Us(s2, t2), r2 = n2 - o2;
  let a2 = [];
  for (let l2 = 0;l2 < t2; l2++)
    if (a2.push(r2 + l2), a2.length === e2) {
      const p2 = a2;
      i2.push(p2), a2 = [];
    }
  return i2;
};
var nm = function(s2, t2) {
  return `
    <button id="${s2}" type="button" class="${t2}" data-te-datepicker-toggle-button-ref data-te-datepicker-toggle-ref>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
      </svg>  
    </button>
  `;
};
var Qo = function(s2) {
  return s2.filter((t2) => !t2.disabled).every((t2) => t2.selected);
};
var Os = function(s2, t2, e2, i2, n2) {
  t2.selectSize === "default" && h2.addClass(s2, e2), t2.selectSize === "sm" && h2.addClass(s2, i2), t2.selectSize === "lg" && h2.addClass(s2, n2);
};
var hb = function(s2, t2, e2, i2, n2) {
  const o2 = document.createElement("div");
  o2.setAttribute("id", s2), o2.setAttribute(Gg, "");
  const r2 = $2("div");
  r2.setAttribute(Xg, ""), h2.addClass(r2, i2.formOutline);
  const a2 = $2("input"), l2 = t2.selectFilter ? "combobox" : "listbox", p2 = t2.multiple ? "true" : "false", u2 = t2.disabled ? "true" : "false";
  a2.setAttribute(qg, ""), h2.addClass(a2, i2.selectInput), Os(a2, t2, i2.selectInputSizeDefault, i2.selectInputSizeSm, i2.selectInputSizeLg), t2.selectFormWhite && h2.addClass(a2, i2.selectInputWhite), a2.setAttribute("type", "text"), a2.setAttribute("role", l2), a2.setAttribute("aria-multiselectable", p2), a2.setAttribute("aria-disabled", u2), a2.setAttribute("aria-haspopup", "true"), a2.setAttribute("aria-expanded", false), t2.tabIndex && a2.setAttribute("tabIndex", t2.tabIndex), t2.disabled && a2.setAttribute("disabled", ""), t2.selectPlaceholder !== "" && a2.setAttribute("placeholder", t2.selectPlaceholder), t2.selectValidation ? (h2.addStyle(a2, {
    "pointer-events": "none",
    "caret-color": "transparent"
  }), h2.addStyle(r2, { cursor: "pointer" })) : a2.setAttribute("readonly", "true"), t2.selectValidation && (a2.setAttribute("required", "true"), a2.setAttribute("aria-required", "true"), a2.addEventListener("keydown", cb));
  const _2 = $2("div");
  h2.addClass(_2, i2.selectValidationValid);
  const f2 = document.createTextNode(`${t2.selectValidFeedback}`);
  _2.appendChild(f2);
  const g2 = $2("div");
  h2.addClass(g2, i2.selectValidationInvalid);
  const m2 = document.createTextNode(`${t2.selectInvalidFeedback}`);
  g2.appendChild(m2);
  const b2 = $2("span");
  b2.setAttribute(Zg, ""), h2.addClass(b2, i2.selectClearBtn), Os(b2, t2, i2.selectClearBtnDefault, i2.selectClearBtnSm, i2.selectClearBtnLg), t2.selectFormWhite && h2.addClass(b2, i2.selectClearBtnWhite);
  const v2 = document.createTextNode("\u2715");
  b2.appendChild(v2), b2.setAttribute("tabindex", "0");
  const T2 = $2("span");
  return h2.addClass(T2, i2.selectArrow), Os(T2, t2, i2.selectArrowDefault, i2.selectArrowSm, i2.selectArrowLg), t2.selectFormWhite && h2.addClass(T2, i2.selectArrowWhite), T2.innerHTML = n2 || lb, r2.appendChild(a2), e2 && (h2.addClass(e2, i2.selectLabel), Os(e2, t2, i2.selectLabelSizeDefault, i2.selectLabelSizeSm, i2.selectLabelSizeLg), t2.selectFormWhite && h2.addClass(e2, i2.selectLabelWhite), r2.appendChild(e2)), t2.selectValidation && (r2.appendChild(_2), r2.appendChild(g2)), t2.selectClearButton && r2.appendChild(b2), r2.appendChild(T2), o2.appendChild(r2), o2;
};
var vl = function(s2, t2, e2, i2, n2, o2, r2, a2) {
  const l2 = document.createElement("div");
  l2.setAttribute(Qg, ""), h2.addClass(l2, a2.selectDropdownContainer), l2.setAttribute("id", `${s2}`), l2.style.width = `${e2}px`;
  const p2 = document.createElement("div");
  p2.setAttribute("tabindex", 0), p2.setAttribute(Jg, ""), h2.addClass(p2, a2.dropdown);
  const u2 = $2("div");
  u2.setAttribute(tb, ""), h2.addClass(u2, a2.optionsWrapper), h2.addClass(u2, a2.optionsWrapperScrollbar), u2.style.maxHeight = `${i2}px`;
  const _2 = Ah(o2, n2, t2, a2);
  return u2.appendChild(_2), t2.selectFilter && p2.appendChild(db(t2.selectSearchPlaceholder, a2)), p2.appendChild(u2), r2 && p2.appendChild(r2), l2.appendChild(p2), l2;
};
var Ah = function(s2, t2, e2, i2) {
  const n2 = $2("div");
  n2.setAttribute(eb, ""), h2.addClass(n2, i2.optionsList);
  let o2;
  return e2.multiple ? o2 = pb(s2, t2, e2, i2) : o2 = ub(s2, e2, i2), o2.forEach((r2) => {
    n2.appendChild(r2);
  }), n2;
};
var db = function(s2, t2) {
  const e2 = $2("div");
  h2.addClass(e2, t2.inputGroup);
  const i2 = $2("input");
  return i2.setAttribute(ib, ""), h2.addClass(i2, t2.selectFilterInput), i2.placeholder = s2, i2.setAttribute("role", "searchbox"), i2.setAttribute("type", "text"), e2.appendChild(i2), e2;
};
var ub = function(s2, t2, e2) {
  return yh(s2, t2, e2);
};
var pb = function(s2, t2, e2, i2) {
  let n2 = null;
  e2.selectAll && (n2 = _b(t2, s2, e2, i2));
  const o2 = yh(s2, e2, i2);
  return n2 ? [n2, ...o2] : o2;
};
var yh = function(s2, t2, e2) {
  const i2 = [];
  return s2.forEach((n2) => {
    if (Object.prototype.hasOwnProperty.call(n2, "options")) {
      const r2 = bb(n2, t2, e2);
      i2.push(r2);
    } else
      i2.push(wh(n2, t2, e2));
  }), i2;
};
var _b = function(s2, t2, e2, i2) {
  const n2 = Qo(t2), o2 = $2("div");
  o2.setAttribute(Eh, "");
  const r2 = i2.selectAllOption || i2.selectOption;
  return h2.addClass(o2, r2), o2.setAttribute(sb, ""), h2.addStyle(o2, {
    height: `${e2.selectOptionHeight}px`
  }), o2.setAttribute("role", "option"), o2.setAttribute("aria-selected", n2), n2 && o2.setAttribute(Ch, ""), o2.appendChild(kh(s2, e2, i2)), s2.setNode(o2), o2;
};
var wh = function(s2, t2, e2) {
  if (s2.node)
    return s2.node;
  const i2 = $2("div");
  return i2.setAttribute(Eh, ""), h2.addClass(i2, e2.selectOption), h2.addStyle(i2, {
    height: `${t2.selectOptionHeight}px`
  }), h2.setDataAttribute(i2, "id", s2.id), i2.setAttribute("role", "option"), i2.setAttribute("aria-selected", s2.selected), i2.setAttribute("aria-disabled", s2.disabled), s2.selected && i2.setAttribute(Ch, ""), s2.disabled && i2.setAttribute("data-te-select-option-disabled", true), s2.hidden && h2.addClass(i2, "hidden"), i2.appendChild(kh(s2, t2, e2)), s2.icon && i2.appendChild(gb(s2, e2)), s2.setNode(i2), i2;
};
var kh = function(s2, t2, e2) {
  const i2 = $2("span");
  i2.setAttribute(nb, ""), h2.addClass(i2, e2.selectOptionText);
  const n2 = document.createTextNode(s2.label);
  return t2.multiple && i2.appendChild(mb(s2, e2)), i2.appendChild(n2), (s2.secondaryText || typeof s2.secondaryText == "number") && i2.appendChild(fb(s2.secondaryText, e2)), i2;
};
var fb = function(s2, t2) {
  const e2 = $2("span");
  h2.addClass(e2, t2.selectOptionSecondaryText);
  const i2 = document.createTextNode(s2);
  return e2.appendChild(i2), e2;
};
var mb = function(s2, t2) {
  const e2 = $2("input");
  e2.setAttribute("type", "checkbox"), h2.addClass(e2, t2.formCheckInput), e2.setAttribute(ob, "");
  const i2 = $2("label");
  return s2.selected && e2.setAttribute("checked", true), s2.disabled && e2.setAttribute("disabled", true), e2.appendChild(i2), e2;
};
var gb = function(s2, t2) {
  const e2 = $2("span"), i2 = $2("img");
  return h2.addClass(i2, t2.selectOptionIcon), i2.src = s2.icon, e2.appendChild(i2), e2;
};
var bb = function(s2, t2, e2) {
  const i2 = $2("div");
  i2.setAttribute(rb, ""), h2.addClass(i2, e2.selectOptionGroup), i2.setAttribute("role", "group"), i2.setAttribute("id", s2.id), s2.hidden && h2.addClass(i2, "hidden");
  const n2 = $2("label");
  return n2.setAttribute(ab, ""), h2.addClass(n2, e2.selectOptionGroupLabel), h2.addStyle(n2, { height: `${t2.selectOptionHeight}px` }), n2.setAttribute("for", s2.id), n2.textContent = s2.label, i2.appendChild(n2), s2.options.forEach((o2) => {
    i2.appendChild(wh(o2, t2, e2));
  }), i2;
};
var vb = function(s2, t2) {
  const e2 = $2("div");
  return e2.textContent = s2, h2.addClass(e2, t2.selectLabel), h2.addClass(e2, t2.selectFakeValue), e2;
};
var mv = function(s2) {
  return !!s2 && typeof s2 == "object";
};
var gv = function(s2) {
  var t2 = Object.prototype.toString.call(s2);
  return t2 === "[object RegExp]" || t2 === "[object Date]" || Tv(s2);
};
var Tv = function(s2) {
  return s2.$$typeof === vv;
};
var Ev = function(s2) {
  return Array.isArray(s2) ? [] : {};
};
var Yi = function(s2, t2) {
  return t2.clone !== false && t2.isMergeableObject(s2) ? ii(Ev(s2), s2, t2) : s2;
};
var Cv = function(s2, t2, e2) {
  return s2.concat(t2).map(function(i2) {
    return Yi(i2, e2);
  });
};
var Av = function(s2, t2) {
  if (!t2.customMerge)
    return ii;
  var e2 = t2.customMerge(s2);
  return typeof e2 == "function" ? e2 : ii;
};
var yv = function(s2) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(s2).filter(function(t2) {
    return Object.propertyIsEnumerable.call(s2, t2);
  }) : [];
};
var Dl = function(s2) {
  return Object.keys(s2).concat(yv(s2));
};
var $h = function(s2, t2) {
  try {
    return t2 in s2;
  } catch {
    return false;
  }
};
var wv = function(s2, t2) {
  return $h(s2, t2) && !(Object.hasOwnProperty.call(s2, t2) && Object.propertyIsEnumerable.call(s2, t2));
};
var kv = function(s2, t2, e2) {
  var i2 = {};
  return e2.isMergeableObject(s2) && Dl(s2).forEach(function(n2) {
    i2[n2] = Yi(s2[n2], e2);
  }), Dl(t2).forEach(function(n2) {
    wv(s2, n2) || ($h(s2, n2) && e2.isMergeableObject(t2[n2]) ? i2[n2] = Av(n2, e2)(s2[n2], t2[n2], e2) : i2[n2] = Yi(t2[n2], e2));
  }), i2;
};
var ii = function(s2, t2, e2) {
  e2 = e2 || {}, e2.arrayMerge = e2.arrayMerge || Cv, e2.isMergeableObject = e2.isMergeableObject || fv, e2.cloneUnlessOtherwiseSpecified = Yi;
  var i2 = Array.isArray(t2), n2 = Array.isArray(s2), o2 = i2 === n2;
  return o2 ? i2 ? e2.arrayMerge(s2, t2, e2) : kv(s2, t2, e2) : Yi(t2, e2);
};
var Nt2 = function(s2) {
  return getComputedStyle(s2);
};
var ct2 = function(s2, t2) {
  for (var e2 in t2) {
    var i2 = t2[e2];
    typeof i2 == "number" && (i2 = i2 + "px"), s2.style[e2] = i2;
  }
  return s2;
};
var Is = function(s2) {
  var t2 = document.createElement("div");
  return t2.className = s2, t2;
};
var Jt2 = function(s2, t2) {
  if (!Ll)
    throw new Error("No element matching method supported");
  return Ll.call(s2, t2);
};
var Ye2 = function(s2) {
  s2.remove ? s2.remove() : s2.parentNode && s2.parentNode.removeChild(s2);
};
var Nl = function(s2, t2) {
  return Array.prototype.filter.call(s2.children, function(e2) {
    return Jt2(e2, t2);
  });
};
var Mh = function(s2, t2) {
  var e2 = s2.element.classList, i2 = j2.state.scrolling(t2);
  e2.contains(i2) ? clearTimeout(Nh[t2]) : e2.add(i2);
};
var Rh = function(s2, t2) {
  Nh[t2] = setTimeout(function() {
    return s2.isAlive && s2.element.classList.remove(j2.state.scrolling(t2));
  }, s2.settings.scrollingThreshold);
};
var Dv = function(s2, t2) {
  Mh(s2, t2), Rh(s2, t2);
};
var Ds = function(s2) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(s2);
  var t2 = document.createEvent("CustomEvent");
  return t2.initCustomEvent(s2, false, false, undefined), t2;
};
var fn = function(s2, t2, e2, i2, n2) {
  i2 === undefined && (i2 = true), n2 === undefined && (n2 = false);
  var o2;
  if (t2 === "top")
    o2 = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down"
    ];
  else if (t2 === "left")
    o2 = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right"
    ];
  else
    throw new Error("A proper axis should be provided");
  $v(s2, e2, o2, i2, n2);
};
var $v = function(s2, t2, e2, i2, n2) {
  var o2 = e2[0], r2 = e2[1], a2 = e2[2], l2 = e2[3], p2 = e2[4], u2 = e2[5];
  i2 === undefined && (i2 = true), n2 === undefined && (n2 = false);
  var _2 = s2.element;
  s2.reach[l2] = null, _2[a2] < 1 && (s2.reach[l2] = "start"), _2[a2] > s2[o2] - s2[r2] - 1 && (s2.reach[l2] = "end"), t2 && (_2.dispatchEvent(Ds("ps-scroll-" + l2)), t2 < 0 ? _2.dispatchEvent(Ds("ps-scroll-" + p2)) : t2 > 0 && _2.dispatchEvent(Ds("ps-scroll-" + u2)), i2 && Dv(s2, l2)), s2.reach[l2] && (t2 || n2) && _2.dispatchEvent(Ds("ps-" + l2 + "-reach-" + s2.reach[l2]));
};
var F2 = function(s2) {
  return parseInt(s2, 10) || 0;
};
var Lv = function(s2) {
  return Jt2(s2, "input,[contenteditable]") || Jt2(s2, "select,[contenteditable]") || Jt2(s2, "textarea,[contenteditable]") || Jt2(s2, "button,[contenteditable]");
};
var Nv = function(s2) {
  var t2 = Nt2(s2);
  return F2(t2.width) + F2(t2.paddingLeft) + F2(t2.paddingRight) + F2(t2.borderLeftWidth) + F2(t2.borderRightWidth);
};
var Ht2 = function(s2) {
  var t2 = s2.element, e2 = Math.floor(t2.scrollTop), i2 = t2.getBoundingClientRect();
  s2.containerWidth = Math.round(i2.width), s2.containerHeight = Math.round(i2.height), s2.contentWidth = t2.scrollWidth, s2.contentHeight = t2.scrollHeight, t2.contains(s2.scrollbarXRail) || (Nl(t2, j2.element.rail("x")).forEach(function(n2) {
    return Ye2(n2);
  }), t2.appendChild(s2.scrollbarXRail)), t2.contains(s2.scrollbarYRail) || (Nl(t2, j2.element.rail("y")).forEach(function(n2) {
    return Ye2(n2);
  }), t2.appendChild(s2.scrollbarYRail)), !s2.settings.suppressScrollX && s2.containerWidth + s2.settings.scrollXMarginOffset < s2.contentWidth ? (s2.scrollbarXActive = true, s2.railXWidth = s2.containerWidth - s2.railXMarginWidth, s2.railXRatio = s2.containerWidth / s2.railXWidth, s2.scrollbarXWidth = Ml(s2, F2(s2.railXWidth * s2.containerWidth / s2.contentWidth)), s2.scrollbarXLeft = F2((s2.negativeScrollAdjustment + t2.scrollLeft) * (s2.railXWidth - s2.scrollbarXWidth) / (s2.contentWidth - s2.containerWidth))) : s2.scrollbarXActive = false, !s2.settings.suppressScrollY && s2.containerHeight + s2.settings.scrollYMarginOffset < s2.contentHeight ? (s2.scrollbarYActive = true, s2.railYHeight = s2.containerHeight - s2.railYMarginHeight, s2.railYRatio = s2.containerHeight / s2.railYHeight, s2.scrollbarYHeight = Ml(s2, F2(s2.railYHeight * s2.containerHeight / s2.contentHeight)), s2.scrollbarYTop = F2(e2 * (s2.railYHeight - s2.scrollbarYHeight) / (s2.contentHeight - s2.containerHeight))) : s2.scrollbarYActive = false, s2.scrollbarXLeft >= s2.railXWidth - s2.scrollbarXWidth && (s2.scrollbarXLeft = s2.railXWidth - s2.scrollbarXWidth), s2.scrollbarYTop >= s2.railYHeight - s2.scrollbarYHeight && (s2.scrollbarYTop = s2.railYHeight - s2.scrollbarYHeight), Mv(t2, s2), s2.scrollbarXActive ? t2.classList.add(j2.state.active("x")) : (t2.classList.remove(j2.state.active("x")), s2.scrollbarXWidth = 0, s2.scrollbarXLeft = 0, t2.scrollLeft = s2.isRtl === true ? s2.contentWidth : 0), s2.scrollbarYActive ? t2.classList.add(j2.state.active("y")) : (t2.classList.remove(j2.state.active("y")), s2.scrollbarYHeight = 0, s2.scrollbarYTop = 0, t2.scrollTop = 0);
};
var Ml = function(s2, t2) {
  return s2.settings.minScrollbarLength && (t2 = Math.max(t2, s2.settings.minScrollbarLength)), s2.settings.maxScrollbarLength && (t2 = Math.min(t2, s2.settings.maxScrollbarLength)), t2;
};
var Mv = function(s2, t2) {
  var e2 = { width: t2.railXWidth }, i2 = Math.floor(s2.scrollTop);
  t2.isRtl ? e2.left = t2.negativeScrollAdjustment + s2.scrollLeft + t2.containerWidth - t2.contentWidth : e2.left = s2.scrollLeft, t2.isScrollbarXUsingBottom ? e2.bottom = t2.scrollbarXBottom - i2 : e2.top = t2.scrollbarXTop + i2, ct2(t2.scrollbarXRail, e2);
  var n2 = { top: i2, height: t2.railYHeight };
  t2.isScrollbarYUsingRight ? t2.isRtl ? n2.right = t2.contentWidth - (t2.negativeScrollAdjustment + s2.scrollLeft) - t2.scrollbarYRight - t2.scrollbarYOuterWidth - 9 : n2.right = t2.scrollbarYRight - s2.scrollLeft : t2.isRtl ? n2.left = t2.negativeScrollAdjustment + s2.scrollLeft + t2.containerWidth * 2 - t2.contentWidth - t2.scrollbarYLeft - t2.scrollbarYOuterWidth : n2.left = t2.scrollbarYLeft + s2.scrollLeft, ct2(t2.scrollbarYRail, n2), ct2(t2.scrollbarX, {
    left: t2.scrollbarXLeft,
    width: t2.scrollbarXWidth - t2.railBorderXWidth
  }), ct2(t2.scrollbarY, {
    top: t2.scrollbarYTop,
    height: t2.scrollbarYHeight - t2.railBorderYWidth
  });
};
var Rv = function(s2) {
  s2.element, s2.event.bind(s2.scrollbarY, "mousedown", function(t2) {
    return t2.stopPropagation();
  }), s2.event.bind(s2.scrollbarYRail, "mousedown", function(t2) {
    var e2 = t2.pageY - window.pageYOffset - s2.scrollbarYRail.getBoundingClientRect().top, i2 = e2 > s2.scrollbarYTop ? 1 : -1;
    s2.element.scrollTop += i2 * s2.containerHeight, Ht2(s2), t2.stopPropagation();
  }), s2.event.bind(s2.scrollbarX, "mousedown", function(t2) {
    return t2.stopPropagation();
  }), s2.event.bind(s2.scrollbarXRail, "mousedown", function(t2) {
    var e2 = t2.pageX - window.pageXOffset - s2.scrollbarXRail.getBoundingClientRect().left, i2 = e2 > s2.scrollbarXLeft ? 1 : -1;
    s2.element.scrollLeft += i2 * s2.containerWidth, Ht2(s2), t2.stopPropagation();
  });
};
var Pv = function(s2) {
  Rl(s2, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), Rl(s2, [
    "containerHeight",
    "contentHeight",
    "pageY",
    "railYHeight",
    "scrollbarY",
    "scrollbarYHeight",
    "scrollTop",
    "y",
    "scrollbarYRail"
  ]);
};
var Rl = function(s2, t2) {
  var e2 = t2[0], i2 = t2[1], n2 = t2[2], o2 = t2[3], r2 = t2[4], a2 = t2[5], l2 = t2[6], p2 = t2[7], u2 = t2[8], _2 = s2.element, f2 = null, g2 = null, m2 = null;
  function b2(y2) {
    y2.touches && y2.touches[0] && (y2[n2] = y2.touches[0].pageY), _2[l2] = f2 + m2 * (y2[n2] - g2), Mh(s2, p2), Ht2(s2), y2.stopPropagation(), y2.type.startsWith("touch") && y2.changedTouches.length > 1 && y2.preventDefault();
  }
  function v2() {
    Rh(s2, p2), s2[u2].classList.remove(j2.state.clicking), s2.event.unbind(s2.ownerDocument, "mousemove", b2);
  }
  function T2(y2, C2) {
    f2 = _2[l2], C2 && y2.touches && (y2[n2] = y2.touches[0].pageY), g2 = y2[n2], m2 = (s2[i2] - s2[e2]) / (s2[o2] - s2[a2]), C2 ? s2.event.bind(s2.ownerDocument, "touchmove", b2) : (s2.event.bind(s2.ownerDocument, "mousemove", b2), s2.event.once(s2.ownerDocument, "mouseup", v2), y2.preventDefault()), s2[u2].classList.add(j2.state.clicking), y2.stopPropagation();
  }
  s2.event.bind(s2[r2], "mousedown", function(y2) {
    T2(y2);
  }), s2.event.bind(s2[r2], "touchstart", function(y2) {
    T2(y2, true);
  });
};
var Bv = function(s2) {
  var t2 = s2.element, e2 = function() {
    return Jt2(t2, ":hover");
  }, i2 = function() {
    return Jt2(s2.scrollbarX, ":focus") || Jt2(s2.scrollbarY, ":focus");
  };
  function n2(o2, r2) {
    var a2 = Math.floor(t2.scrollTop);
    if (o2 === 0) {
      if (!s2.scrollbarYActive)
        return false;
      if (a2 === 0 && r2 > 0 || a2 >= s2.contentHeight - s2.containerHeight && r2 < 0)
        return !s2.settings.wheelPropagation;
    }
    var l2 = t2.scrollLeft;
    if (r2 === 0) {
      if (!s2.scrollbarXActive)
        return false;
      if (l2 === 0 && o2 < 0 || l2 >= s2.contentWidth - s2.containerWidth && o2 > 0)
        return !s2.settings.wheelPropagation;
    }
    return true;
  }
  s2.event.bind(s2.ownerDocument, "keydown", function(o2) {
    if (!(o2.isDefaultPrevented && o2.isDefaultPrevented() || o2.defaultPrevented) && !(!e2() && !i2())) {
      var r2 = document.activeElement ? document.activeElement : s2.ownerDocument.activeElement;
      if (r2) {
        if (r2.tagName === "IFRAME")
          r2 = r2.contentDocument.activeElement;
        else
          for (;r2.shadowRoot; )
            r2 = r2.shadowRoot.activeElement;
        if (Lv(r2))
          return;
      }
      var a2 = 0, l2 = 0;
      switch (o2.which) {
        case 37:
          o2.metaKey ? a2 = -s2.contentWidth : o2.altKey ? a2 = -s2.containerWidth : a2 = -30;
          break;
        case 38:
          o2.metaKey ? l2 = s2.contentHeight : o2.altKey ? l2 = s2.containerHeight : l2 = 30;
          break;
        case 39:
          o2.metaKey ? a2 = s2.contentWidth : o2.altKey ? a2 = s2.containerWidth : a2 = 30;
          break;
        case 40:
          o2.metaKey ? l2 = -s2.contentHeight : o2.altKey ? l2 = -s2.containerHeight : l2 = -30;
          break;
        case 32:
          o2.shiftKey ? l2 = s2.containerHeight : l2 = -s2.containerHeight;
          break;
        case 33:
          l2 = s2.containerHeight;
          break;
        case 34:
          l2 = -s2.containerHeight;
          break;
        case 36:
          l2 = s2.contentHeight;
          break;
        case 35:
          l2 = -s2.contentHeight;
          break;
        default:
          return;
      }
      s2.settings.suppressScrollX && a2 !== 0 || s2.settings.suppressScrollY && l2 !== 0 || (t2.scrollTop -= l2, t2.scrollLeft += a2, Ht2(s2), n2(a2, l2) && o2.preventDefault());
    }
  });
};
var Hv = function(s2) {
  var t2 = s2.element;
  function e2(r2, a2) {
    var l2 = Math.floor(t2.scrollTop), p2 = t2.scrollTop === 0, u2 = l2 + t2.offsetHeight === t2.scrollHeight, _2 = t2.scrollLeft === 0, f2 = t2.scrollLeft + t2.offsetWidth === t2.scrollWidth, g2;
    return Math.abs(a2) > Math.abs(r2) ? g2 = p2 || u2 : g2 = _2 || f2, g2 ? !s2.settings.wheelPropagation : true;
  }
  function i2(r2) {
    var a2 = r2.deltaX, l2 = -1 * r2.deltaY;
    return (typeof a2 > "u" || typeof l2 > "u") && (a2 = -1 * r2.wheelDeltaX / 6, l2 = r2.wheelDeltaY / 6), r2.deltaMode && r2.deltaMode === 1 && (a2 *= 10, l2 *= 10), a2 !== a2 && l2 !== l2 && (a2 = 0, l2 = r2.wheelDelta), r2.shiftKey ? [-l2, -a2] : [a2, l2];
  }
  function n2(r2, a2, l2) {
    if (!Ve2.isWebKit && t2.querySelector("select:focus"))
      return true;
    if (!t2.contains(r2))
      return false;
    for (var p2 = r2;p2 && p2 !== t2; ) {
      if (p2.classList.contains(j2.element.consuming))
        return true;
      var u2 = Nt2(p2);
      if (l2 && u2.overflowY.match(/(scroll|auto)/)) {
        var _2 = p2.scrollHeight - p2.clientHeight;
        if (_2 > 0 && (p2.scrollTop > 0 && l2 < 0 || p2.scrollTop < _2 && l2 > 0))
          return true;
      }
      if (a2 && u2.overflowX.match(/(scroll|auto)/)) {
        var f2 = p2.scrollWidth - p2.clientWidth;
        if (f2 > 0 && (p2.scrollLeft > 0 && a2 < 0 || p2.scrollLeft < f2 && a2 > 0))
          return true;
      }
      p2 = p2.parentNode;
    }
    return false;
  }
  function o2(r2) {
    var a2 = i2(r2), l2 = a2[0], p2 = a2[1];
    if (!n2(r2.target, l2, p2)) {
      var u2 = false;
      s2.settings.useBothWheelAxes ? s2.scrollbarYActive && !s2.scrollbarXActive ? (p2 ? t2.scrollTop -= p2 * s2.settings.wheelSpeed : t2.scrollTop += l2 * s2.settings.wheelSpeed, u2 = true) : s2.scrollbarXActive && !s2.scrollbarYActive && (l2 ? t2.scrollLeft += l2 * s2.settings.wheelSpeed : t2.scrollLeft -= p2 * s2.settings.wheelSpeed, u2 = true) : (t2.scrollTop -= p2 * s2.settings.wheelSpeed, t2.scrollLeft += l2 * s2.settings.wheelSpeed), Ht2(s2), u2 = u2 || e2(l2, p2), u2 && !r2.ctrlKey && (r2.stopPropagation(), r2.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? s2.event.bind(t2, "wheel", o2) : typeof window.onmousewheel < "u" && s2.event.bind(t2, "mousewheel", o2);
};
var Vv = function(s2) {
  if (!Ve2.supportsTouch && !Ve2.supportsIePointer)
    return;
  var t2 = s2.element;
  function e2(m2, b2) {
    var v2 = Math.floor(t2.scrollTop), T2 = t2.scrollLeft, y2 = Math.abs(m2), C2 = Math.abs(b2);
    if (C2 > y2) {
      if (b2 < 0 && v2 === s2.contentHeight - s2.containerHeight || b2 > 0 && v2 === 0)
        return window.scrollY === 0 && b2 > 0 && Ve2.isChrome;
    } else if (y2 > C2 && (m2 < 0 && T2 === s2.contentWidth - s2.containerWidth || m2 > 0 && T2 === 0))
      return true;
    return true;
  }
  function i2(m2, b2) {
    t2.scrollTop -= b2, t2.scrollLeft -= m2, Ht2(s2);
  }
  var n2 = {}, o2 = 0, r2 = {}, a2 = null;
  function l2(m2) {
    return m2.targetTouches ? m2.targetTouches[0] : m2;
  }
  function p2(m2) {
    return m2.pointerType && m2.pointerType === "pen" && m2.buttons === 0 ? false : !!(m2.targetTouches && m2.targetTouches.length === 1 || m2.pointerType && m2.pointerType !== "mouse" && m2.pointerType !== m2.MSPOINTER_TYPE_MOUSE);
  }
  function u2(m2) {
    if (p2(m2)) {
      var b2 = l2(m2);
      n2.pageX = b2.pageX, n2.pageY = b2.pageY, o2 = (new Date()).getTime(), a2 !== null && clearInterval(a2);
    }
  }
  function _2(m2, b2, v2) {
    if (!t2.contains(m2))
      return false;
    for (var T2 = m2;T2 && T2 !== t2; ) {
      if (T2.classList.contains(j2.element.consuming))
        return true;
      var y2 = Nt2(T2);
      if (v2 && y2.overflowY.match(/(scroll|auto)/)) {
        var C2 = T2.scrollHeight - T2.clientHeight;
        if (C2 > 0 && (T2.scrollTop > 0 && v2 < 0 || T2.scrollTop < C2 && v2 > 0))
          return true;
      }
      if (b2 && y2.overflowX.match(/(scroll|auto)/)) {
        var E2 = T2.scrollWidth - T2.clientWidth;
        if (E2 > 0 && (T2.scrollLeft > 0 && b2 < 0 || T2.scrollLeft < E2 && b2 > 0))
          return true;
      }
      T2 = T2.parentNode;
    }
    return false;
  }
  function f2(m2) {
    if (p2(m2)) {
      var b2 = l2(m2), v2 = { pageX: b2.pageX, pageY: b2.pageY }, T2 = v2.pageX - n2.pageX, y2 = v2.pageY - n2.pageY;
      if (_2(m2.target, T2, y2))
        return;
      i2(T2, y2), n2 = v2;
      var C2 = (new Date()).getTime(), E2 = C2 - o2;
      E2 > 0 && (r2.x = T2 / E2, r2.y = y2 / E2, o2 = C2), e2(T2, y2) && m2.preventDefault();
    }
  }
  function g2() {
    s2.settings.swipeEasing && (clearInterval(a2), a2 = setInterval(function() {
      if (s2.isInitialized) {
        clearInterval(a2);
        return;
      }
      if (!r2.x && !r2.y) {
        clearInterval(a2);
        return;
      }
      if (Math.abs(r2.x) < 0.01 && Math.abs(r2.y) < 0.01) {
        clearInterval(a2);
        return;
      }
      if (!s2.element) {
        clearInterval(a2);
        return;
      }
      i2(r2.x * 30, r2.y * 30), r2.x *= 0.8, r2.y *= 0.8;
    }, 10));
  }
  Ve2.supportsTouch ? (s2.event.bind(t2, "touchstart", u2), s2.event.bind(t2, "touchmove", f2), s2.event.bind(t2, "touchend", g2)) : Ve2.supportsIePointer && (window.PointerEvent ? (s2.event.bind(t2, "pointerdown", u2), s2.event.bind(t2, "pointermove", f2), s2.event.bind(t2, "pointerup", g2)) : window.MSPointerEvent && (s2.event.bind(t2, "MSPointerDown", u2), s2.event.bind(t2, "MSPointerMove", f2), s2.event.bind(t2, "MSPointerUp", g2)));
};
/*!
* TW Elements 1.1.0
* 
* TW Elements is an open-source UI kit of advanced components for TailwindCSS.
* Copyright © 2023 MDBootstrap.com
* 
* Unless a custom, individually assigned license has been granted, this program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
* In addition, a custom license may be available upon request, subject to the terms and conditions of that license. Please contact tailwind@mdbootstrap.com for more information on obtaining a custom license.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
* 
* If you would like to purchase a COMMERCIAL, non-AGPL license for TWE, please check out our pricing: https://tw-elements.com/pro/
*/
var hd = Object.defineProperty;
var dd = (s2, t2, e2) => (t2 in s2) ? hd(s2, t2, { enumerable: true, configurable: true, writable: true, value: e2 }) : s2[t2] = e2;
var wt2 = (s2, t2, e2) => (dd(s2, typeof t2 != "symbol" ? t2 + "" : t2, e2), e2);
var In = (() => {
  const s2 = {};
  let t2 = 1;
  return {
    set(e2, i2, n2) {
      typeof e2[i2] > "u" && (e2[i2] = {
        key: i2,
        id: t2
      }, t2++), s2[e2[i2].id] = n2;
    },
    get(e2, i2) {
      if (!e2 || typeof e2[i2] > "u")
        return null;
      const n2 = e2[i2];
      return n2.key === i2 ? s2[n2.id] : null;
    },
    delete(e2, i2) {
      if (typeof e2[i2] > "u")
        return;
      const n2 = e2[i2];
      n2.key === i2 && (delete s2[n2.id], delete e2[i2]);
    }
  };
})();
var A2 = {
  setData(s2, t2, e2) {
    In.set(s2, t2, e2);
  },
  getData(s2, t2) {
    return In.get(s2, t2);
  },
  removeData(s2, t2) {
    In.delete(s2, t2);
  }
};
var ud = 1e6;
var pd = 1000;
var Ho = "transitionend";
var _d = (s2) => s2 == null ? `${s2}` : {}.toString.call(s2).match(/\s([a-z]+)/i)[1].toLowerCase();
var et2 = (s2) => {
  do
    s2 += Math.floor(Math.random() * ud);
  while (document.getElementById(s2));
  return s2;
};
var pc = (s2) => {
  let t2 = s2.getAttribute("data-te-target");
  if (!t2 || t2 === "#") {
    let e2 = s2.getAttribute("href");
    if (!e2 || !e2.includes("#") && !e2.startsWith("."))
      return null;
    e2.includes("#") && !e2.startsWith("#") && (e2 = `#${e2.split("#")[1]}`), t2 = e2 && e2 !== "#" ? e2.trim() : null;
  }
  return t2;
};
var lr2 = (s2) => {
  const t2 = pc(s2);
  return t2 && document.querySelector(t2) ? t2 : null;
};
var te2 = (s2) => {
  const t2 = pc(s2);
  return t2 ? document.querySelector(t2) : null;
};
var cn = (s2) => {
  if (!s2)
    return 0;
  let { transitionDuration: t2, transitionDelay: e2 } = window.getComputedStyle(s2);
  const i2 = Number.parseFloat(t2), n2 = Number.parseFloat(e2);
  return !i2 && !n2 ? 0 : (t2 = t2.split(",")[0], e2 = e2.split(",")[0], (Number.parseFloat(t2) + Number.parseFloat(e2)) * pd);
};
var _c = (s2) => {
  s2.dispatchEvent(new Event(Ho));
};
var Xe2 = (s2) => !s2 || typeof s2 != "object" ? false : (typeof s2.jquery < "u" && (s2 = s2[0]), typeof s2.nodeType < "u");
var ee2 = (s2) => Xe2(s2) ? s2.jquery ? s2[0] : s2 : typeof s2 == "string" && s2.length > 0 ? document.querySelector(s2) : null;
var I2 = (s2, t2, e2) => {
  Object.keys(e2).forEach((i2) => {
    const n2 = e2[i2], o2 = t2[i2], r2 = o2 && Xe2(o2) ? "element" : _d(o2);
    if (!new RegExp(n2).test(r2))
      throw new Error(`${s2.toUpperCase()}: Option "${i2}" provided type "${r2}" but expected type "${n2}".`);
  });
};
var Mt2 = (s2) => {
  if (!s2 || s2.getClientRects().length === 0)
    return false;
  if (s2.style && s2.parentNode && s2.parentNode.style) {
    const t2 = getComputedStyle(s2), e2 = getComputedStyle(s2.parentNode);
    return getComputedStyle(s2).getPropertyValue("visibility") === "visible" || t2.display !== "none" && e2.display !== "none" && t2.visibility !== "hidden";
  }
  return false;
};
var be2 = (s2) => !s2 || s2.nodeType !== Node.ELEMENT_NODE || s2.classList.contains("disabled") ? true : typeof s2.disabled < "u" ? s2.disabled : s2.hasAttribute("disabled") && s2.getAttribute("disabled") !== "false";
var fc = (s2) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s2.getRootNode == "function") {
    const t2 = s2.getRootNode();
    return t2 instanceof ShadowRoot ? t2 : null;
  }
  return s2 instanceof ShadowRoot ? s2 : s2.parentNode ? fc(s2.parentNode) : null;
};
var hn = () => function() {
};
var si = (s2) => {
  s2.offsetHeight;
};
var mc = () => {
  const { jQuery: s2 } = window;
  return s2 && !document.body.hasAttribute("data-te-no-jquery") ? s2 : null;
};
var Dn = [];
var gc = (s2) => {
  document.readyState === "loading" ? (Dn.length || document.addEventListener("DOMContentLoaded", () => {
    Dn.forEach((t2) => t2());
  }), Dn.push(s2)) : s2();
};
var W2 = () => document.documentElement.dir === "rtl";
var fd = (s2) => Array.from(s2);
var $2 = (s2) => document.createElement(s2);
var ge2 = (s2) => {
  typeof s2 == "function" && s2();
};
var bc = (s2, t2, e2 = true) => {
  if (!e2) {
    ge2(s2);
    return;
  }
  const i2 = 5, n2 = cn(t2) + i2;
  let o2 = false;
  const r2 = ({ target: a2 }) => {
    a2 === t2 && (o2 = true, t2.removeEventListener(Ho, r2), ge2(s2));
  };
  t2.addEventListener(Ho, r2), setTimeout(() => {
    o2 || _c(t2);
  }, n2);
};
var vc = (s2, t2, e2, i2) => {
  let n2 = s2.indexOf(t2);
  if (n2 === -1)
    return s2[!e2 && i2 ? s2.length - 1 : 0];
  const o2 = s2.length;
  return n2 += e2 ? 1 : -1, i2 && (n2 = (n2 + o2) % o2), s2[Math.max(0, Math.min(n2, o2 - 1))];
};
var md = /[^.]*(?=\..*)\.|.*/;
var gd = /\..*/;
var bd = /::\d+$/;
var $n = {};
var Hr2 = 1;
var vd = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
var Td = /^(mouseenter|mouseleave)/i;
var Tc = new Set([
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll"
]);
var c2 = {
  on(s2, t2, e2, i2) {
    Vr2(s2, t2, e2, i2, false);
  },
  one(s2, t2, e2, i2) {
    Vr2(s2, t2, e2, i2, true);
  },
  off(s2, t2, e2, i2) {
    if (typeof t2 != "string" || !s2)
      return;
    const [n2, o2, r2] = yc(t2, e2, i2), a2 = r2 !== t2, l2 = Cc(s2), p2 = t2.startsWith(".");
    if (typeof o2 < "u") {
      if (!l2 || !l2[r2])
        return;
      Vo(s2, l2, r2, o2, n2 ? e2 : null);
      return;
    }
    p2 && Object.keys(l2).forEach((_2) => {
      Ad(s2, l2, _2, t2.slice(1));
    });
    const u2 = l2[r2] || {};
    Object.keys(u2).forEach((_2) => {
      const f2 = _2.replace(bd, "");
      if (!a2 || t2.includes(f2)) {
        const g2 = u2[_2];
        Vo(s2, l2, r2, g2.originalHandler, g2.delegationSelector);
      }
    });
  },
  trigger(s2, t2, e2) {
    if (typeof t2 != "string" || !s2)
      return null;
    const i2 = mc(), n2 = wc(t2), o2 = t2 !== n2, r2 = Tc.has(n2);
    let a2, l2 = true, p2 = true, u2 = false, _2 = null;
    return o2 && i2 && (a2 = i2.Event(t2, e2), i2(s2).trigger(a2), l2 = !a2.isPropagationStopped(), p2 = !a2.isImmediatePropagationStopped(), u2 = a2.isDefaultPrevented()), r2 ? (_2 = document.createEvent("HTMLEvents"), _2.initEvent(n2, l2, true)) : _2 = new CustomEvent(t2, {
      bubbles: l2,
      cancelable: true
    }), typeof e2 < "u" && Object.keys(e2).forEach((f2) => {
      Object.defineProperty(_2, f2, {
        get() {
          return e2[f2];
        }
      });
    }), u2 && _2.preventDefault(), p2 && s2.dispatchEvent(_2), _2.defaultPrevented && typeof a2 < "u" && a2.preventDefault(), _2;
  }
};
var K2 = {
  on(s2, t2, e2, i2) {
    const n2 = t2.split(" ");
    for (let o2 = 0;o2 < n2.length; o2++)
      c2.on(s2, n2[o2], e2, i2);
  },
  off(s2, t2, e2, i2) {
    const n2 = t2.split(" ");
    for (let o2 = 0;o2 < n2.length; o2++)
      c2.off(s2, n2[o2], e2, i2);
  }
};
var yd = "5.1.3";

class ft2 {
  constructor(t2) {
    t2 = ee2(t2), t2 && (this._element = t2, A2.setData(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    A2.removeData(this._element, this.constructor.DATA_KEY), c2.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach((t2) => {
      this[t2] = null;
    });
  }
  _queueCallback(t2, e2, i2 = true) {
    bc(t2, e2, i2);
  }
  static getInstance(t2) {
    return A2.getData(ee2(t2), this.DATA_KEY);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
  static get VERSION() {
    return yd;
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  static get DATA_KEY() {
    return `te.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
}
var st2 = "top";
var ut2 = "bottom";
var pt2 = "right";
var nt2 = "left";
var ji = "auto";
var ni = [st2, ut2, pt2, nt2];
var Ae2 = "start";
var Ge2 = "end";
var xc = "clippingParents";
var cr2 = "viewport";
var Be2 = "popper";
var Oc = "reference";
var Wo = ni.reduce(function(s2, t2) {
  return s2.concat([t2 + "-" + Ae2, t2 + "-" + Ge2]);
}, []);
var hr2 = [].concat(ni, [ji]).reduce(function(s2, t2) {
  return s2.concat([t2, t2 + "-" + Ae2, t2 + "-" + Ge2]);
}, []);
var Sc = "beforeRead";
var Ic = "read";
var Dc = "afterRead";
var $c = "beforeMain";
var Lc = "main";
var Nc = "afterMain";
var Mc = "beforeWrite";
var Rc = "write";
var Pc = "afterWrite";
var dn = [Sc, Ic, Dc, $c, Lc, Nc, Mc, Rc, Pc];
var ur2 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: xd,
  effect: Od,
  requires: ["computeStyles"]
};
var ve2 = Math.max;
var un = Math.min;
var qe2 = Math.round;
var $d = function(t2, e2) {
  return t2 = typeof t2 == "function" ? t2(Object.assign({}, e2.rects, {
    placement: e2.placement
  })) : t2, Wc(typeof t2 != "number" ? t2 : Fc(t2, ni));
};
var Yc = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: Ld,
  effect: Nd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
var Md = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
var fr2 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: Pd,
  data: {}
};
var ns = {
  passive: true
};
var mr2 = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function() {
  },
  effect: Bd,
  data: {}
};
var Hd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var Vd = {
  start: "end",
  end: "start"
};
var zc = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: Xd,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
var Uc = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Gd
};
var Xc = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Zd
};
var Tr2 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: Qd,
  data: {}
};
var Gc = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: tu,
  requiresIfExists: ["offset"]
};
var le2 = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var lu = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var Ur2 = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
var Xr2 = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var uu = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var Gr = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
var pu = gn();
var _u = [mr2, Tr2, fr2, ur2];
var fu = gn({
  defaultModifiers: _u
});
var mu = [mr2, Tr2, fr2, ur2, Xc, zc, Gc, Yc, Uc];
var se2 = gn({
  defaultModifiers: mu
});
var qc = Object.freeze(Object.defineProperty({
  __proto__: null,
  afterMain: Nc,
  afterRead: Dc,
  afterWrite: Pc,
  applyStyles: ur2,
  arrow: Yc,
  auto: ji,
  basePlacements: ni,
  beforeMain: $c,
  beforeRead: Sc,
  beforeWrite: Mc,
  bottom: ut2,
  clippingParents: xc,
  computeStyles: fr2,
  createPopper: se2,
  createPopperBase: pu,
  createPopperLite: fu,
  detectOverflow: Je2,
  end: Ge2,
  eventListeners: mr2,
  flip: zc,
  hide: Uc,
  left: nt2,
  main: Lc,
  modifierPhases: dn,
  offset: Xc,
  placements: hr2,
  popper: Be2,
  popperGenerator: gn,
  popperOffsets: Tr2,
  preventOverflow: Gc,
  read: Ic,
  reference: Oc,
  right: pt2,
  start: Ae2,
  top: st2,
  variationPlacements: Wo,
  viewport: cr2,
  write: Rc
}, Symbol.toStringTag, { value: "Module" }));
var h2 = {
  setDataAttribute(s2, t2, e2) {
    s2.setAttribute(`data-te-${Nn(t2)}`, e2);
  },
  removeDataAttribute(s2, t2) {
    s2.removeAttribute(`data-te-${Nn(t2)}`);
  },
  getDataAttributes(s2) {
    if (!s2)
      return {};
    const t2 = {};
    return Object.keys(s2.dataset).filter((e2) => e2.startsWith("te")).forEach((e2) => {
      if (e2.startsWith("teClass"))
        return;
      let i2 = e2.replace(/^te/, "");
      i2 = i2.charAt(0).toLowerCase() + i2.slice(1, i2.length), t2[i2] = Ln(s2.dataset[e2]);
    }), t2;
  },
  getDataClassAttributes(s2) {
    if (!s2)
      return {};
    const t2 = {
      ...s2.dataset
    };
    return Object.keys(t2).filter((e2) => e2.startsWith("teClass")).forEach((e2) => {
      let i2 = e2.replace(/^teClass/, "");
      i2 = i2.charAt(0).toLowerCase() + i2.slice(1, i2.length), t2[i2] = Ln(t2[e2]);
    }), t2;
  },
  getDataAttribute(s2, t2) {
    return Ln(s2.getAttribute(`data-te-${Nn(t2)}`));
  },
  offset(s2) {
    const t2 = s2.getBoundingClientRect();
    return {
      top: t2.top + document.body.scrollTop,
      left: t2.left + document.body.scrollLeft
    };
  },
  position(s2) {
    return {
      top: s2.offsetTop,
      left: s2.offsetLeft
    };
  },
  style(s2, t2) {
    Object.assign(s2.style, t2);
  },
  toggleClass(s2, t2) {
    s2 && Mn(t2).forEach((e2) => {
      s2.classList.contains(e2) ? s2.classList.remove(e2) : s2.classList.add(e2);
    });
  },
  addClass(s2, t2) {
    Mn(t2).forEach((e2) => !s2.classList.contains(e2) && s2.classList.add(e2));
  },
  addStyle(s2, t2) {
    Object.keys(t2).forEach((e2) => {
      s2.style[e2] = t2[e2];
    });
  },
  removeClass(s2, t2) {
    Mn(t2).forEach((e2) => s2.classList.contains(e2) && s2.classList.remove(e2));
  },
  hasClass(s2, t2) {
    return s2.classList.contains(t2);
  },
  maxOffset(s2) {
    const t2 = s2.getBoundingClientRect();
    return {
      top: t2.top + Math.max(document.body.scrollTop, document.documentElement.scrollTop, window.scrollY),
      left: t2.left + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft, window.scrollX)
    };
  }
};
var gu = 3;
var d2 = {
  closest(s2, t2) {
    return s2.closest(t2);
  },
  matches(s2, t2) {
    return s2.matches(t2);
  },
  find(s2, t2 = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t2, s2));
  },
  findOne(s2, t2 = document.documentElement) {
    return Element.prototype.querySelector.call(t2, s2);
  },
  children(s2, t2) {
    return [].concat(...s2.children).filter((i2) => i2.matches(t2));
  },
  parents(s2, t2) {
    const e2 = [];
    let i2 = s2.parentNode;
    for (;i2 && i2.nodeType === Node.ELEMENT_NODE && i2.nodeType !== gu; )
      this.matches(i2, t2) && e2.push(i2), i2 = i2.parentNode;
    return e2;
  },
  prev(s2, t2) {
    let e2 = s2.previousElementSibling;
    for (;e2; ) {
      if (e2.matches(t2))
        return [e2];
      e2 = e2.previousElementSibling;
    }
    return [];
  },
  next(s2, t2) {
    let e2 = s2.nextElementSibling;
    for (;e2; ) {
      if (this.matches(e2, t2))
        return [e2];
      e2 = e2.nextElementSibling;
    }
    return [];
  },
  focusableChildren(s2) {
    const t2 = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]'
    ].map((e2) => `${e2}:not([tabindex^="-"])`).join(", ");
    return this.find(t2, s2).filter((e2) => !be2(e2) && Mt2(e2));
  }
};
var bu = "te.dropdown";
var xe2 = `.${bu}`;
var Er2 = ".data-api";
var Fs = "Escape";
var jo = "ArrowUp";
var Ys = "ArrowDown";
var Tu = new RegExp(`${jo}|${Ys}|${Fs}`);
var Eu = `hide${xe2}`;
var Cu = `hidden${xe2}`;
var Au = `show${xe2}`;
var yu = `shown${xe2}`;
var wu = `click${xe2}${Er2}`;
var Jr = `keydown${xe2}${Er2}`;
var ku = `keyup${xe2}${Er2}`;
var Lu = W2() ? "top-end" : "top-start";
var Nu = W2() ? "top-start" : "top-end";
var Mu = W2() ? "bottom-end" : "bottom-start";
var Ru = W2() ? "bottom-start" : "bottom-end";
var Pu = W2() ? "left-start" : "right-start";
var Bu = W2() ? "right-start" : "left-start";
var Bn = "collapse";
var Zc = "te.collapse";
var bn = `.${Zc}`;
var ea = {
  toggle: true,
  parent: null
};
var Yu = {
  toggle: "boolean",
  parent: "(null|element)"
};
var ju = `show${bn}`;
var Ku = `shown${bn}`;
var zu = `hide${bn}`;
var Uu = `hidden${bn}`;
var Hn = "data-te-collapse-show";
var ia = "data-te-collapse-collapsed";
var rs = "data-te-collapse-collapsing";
var Xu = "data-te-collapse-horizontal";
var We2 = "data-te-collapse-item";
var sa = `:scope [${We2}] [${We2}]`;
var Gu = "width";
var qu = "height";
var Zu = "[data-te-collapse-item][data-te-collapse-show], [data-te-collapse-item][data-te-collapse-collapsing]";
var na = "[data-te-collapse-init]";
var Qu = {
  visible: "!visible",
  hidden: "hidden",
  baseTransition: "overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
  collapsing: "h-0 transition-[height] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
  collapsingHorizontal: "w-0 h-auto transition-[width] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
};
var Ju = {
  visible: "string",
  hidden: "string",
  baseTransition: "string",
  collapsing: "string",
  collapsingHorizontal: "string"
};

class Qt2 extends ft2 {
  constructor(t2, e2, i2) {
    super(t2), this._isTransitioning = false, this._config = this._getConfig(e2), this._classes = this._getClasses(i2), this._triggerArray = [];
    const n2 = d2.find(na);
    for (let o2 = 0, r2 = n2.length;o2 < r2; o2++) {
      const a2 = n2[o2], l2 = lr2(a2), p2 = d2.find(l2).filter((u2) => u2 === this._element);
      l2 !== null && p2.length && (this._selector = l2, this._triggerArray.push(a2));
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  static get Default() {
    return ea;
  }
  static get NAME() {
    return Bn;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t2 = [], e2;
    if (this._config.parent) {
      const u2 = d2.find(sa, this._config.parent);
      t2 = d2.find(Zu, this._config.parent).filter((_2) => !u2.includes(_2));
    }
    const i2 = d2.findOne(this._selector);
    if (t2.length) {
      const u2 = t2.find((_2) => i2 !== _2);
      if (e2 = u2 ? Qt2.getInstance(u2) : null, e2 && e2._isTransitioning)
        return;
    }
    if (c2.trigger(this._element, ju).defaultPrevented)
      return;
    t2.forEach((u2) => {
      i2 !== u2 && Qt2.getOrCreateInstance(u2, { toggle: false }).hide(), e2 || A2.setData(u2, Zc, null);
    });
    const o2 = this._getDimension(), r2 = o2 === "height" ? this._classes.collapsing : this._classes.collapsingHorizontal;
    h2.removeClass(this._element, this._classes.visible), h2.removeClass(this._element, this._classes.hidden), h2.addClass(this._element, r2), this._element.removeAttribute(We2), this._element.setAttribute(rs, ""), this._element.style[o2] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
    const a2 = () => {
      this._isTransitioning = false, h2.removeClass(this._element, this._classes.hidden), h2.removeClass(this._element, r2), h2.addClass(this._element, this._classes.visible), this._element.removeAttribute(rs), this._element.setAttribute(We2, ""), this._element.setAttribute(Hn, ""), this._element.style[o2] = "", c2.trigger(this._element, Ku);
    }, p2 = `scroll${o2[0].toUpperCase() + o2.slice(1)}`;
    this._queueCallback(a2, this._element, true), this._element.style[o2] = `${this._element[p2]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || c2.trigger(this._element, zu).defaultPrevented)
      return;
    const e2 = this._getDimension(), i2 = e2 === "height" ? this._classes.collapsing : this._classes.collapsingHorizontal;
    this._element.style[e2] = `${this._element.getBoundingClientRect()[e2]}px`, si(this._element), h2.addClass(this._element, i2), h2.removeClass(this._element, this._classes.visible), h2.removeClass(this._element, this._classes.hidden), this._element.setAttribute(rs, ""), this._element.removeAttribute(We2), this._element.removeAttribute(Hn);
    const n2 = this._triggerArray.length;
    for (let r2 = 0;r2 < n2; r2++) {
      const a2 = this._triggerArray[r2], l2 = te2(a2);
      l2 && !this._isShown(l2) && this._addAriaAndCollapsedClass([a2], false);
    }
    this._isTransitioning = true;
    const o2 = () => {
      this._isTransitioning = false, h2.removeClass(this._element, i2), h2.addClass(this._element, this._classes.visible), h2.addClass(this._element, this._classes.hidden), this._element.removeAttribute(rs), this._element.setAttribute(We2, ""), c2.trigger(this._element, Uu);
    };
    this._element.style[e2] = "", this._queueCallback(o2, this._element, true);
  }
  _isShown(t2 = this._element) {
    return t2.hasAttribute(Hn);
  }
  _getConfig(t2) {
    return t2 = {
      ...ea,
      ...h2.getDataAttributes(this._element),
      ...t2
    }, t2.toggle = !!t2.toggle, t2.parent = ee2(t2.parent), I2(Bn, t2, Yu), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...Qu,
      ...e2,
      ...t2
    }, I2(Bn, t2, Ju), t2;
  }
  _getDimension() {
    return this._element.hasAttribute(Xu) ? Gu : qu;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t2 = d2.find(sa, this._config.parent);
    d2.find(na, this._config.parent).filter((e2) => !t2.includes(e2)).forEach((e2) => {
      const i2 = te2(e2);
      i2 && this._addAriaAndCollapsedClass([e2], this._isShown(i2));
    });
  }
  _addAriaAndCollapsedClass(t2, e2) {
    t2.length && t2.forEach((i2) => {
      e2 ? i2.removeAttribute(ia) : i2.setAttribute(`${ia}`, ""), i2.setAttribute("aria-expanded", e2);
    });
  }
  static jQueryInterface(t2) {
    return this.each(function() {
      const e2 = {};
      typeof t2 == "string" && /show|hide/.test(t2) && (e2.toggle = false);
      const i2 = Qt2.getOrCreateInstance(this, e2);
      if (typeof t2 == "string") {
        if (typeof i2[t2] > "u")
          throw new TypeError(`No method named "${t2}"`);
        i2[t2]();
      }
    });
  }
}
var oa = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
var ra = ".sticky-top";

class ti {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t2 = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t2);
  }
  hide() {
    const t2 = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", (e2) => e2 + t2), this._setElementAttributes(oa, "paddingRight", (e2) => e2 + t2), this._setElementAttributes(ra, "marginRight", (e2) => e2 - t2);
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t2, e2, i2) {
    const n2 = this.getWidth(), o2 = (r2) => {
      if (r2 !== this._element && window.innerWidth > r2.clientWidth + n2)
        return;
      this._saveInitialAttribute(r2, e2);
      const a2 = window.getComputedStyle(r2)[e2];
      r2.style[e2] = `${i2(Number.parseFloat(a2))}px`;
    };
    this._applyManipulationCallback(t2, o2);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(oa, "paddingRight"), this._resetElementAttributes(ra, "marginRight");
  }
  _saveInitialAttribute(t2, e2) {
    const i2 = t2.style[e2];
    i2 && h2.setDataAttribute(t2, e2, i2);
  }
  _resetElementAttributes(t2, e2) {
    const i2 = (n2) => {
      const o2 = h2.getDataAttribute(n2, e2);
      typeof o2 > "u" ? n2.style.removeProperty(e2) : (h2.removeDataAttribute(n2, e2), n2.style[e2] = o2);
    };
    this._applyManipulationCallback(t2, i2);
  }
  _applyManipulationCallback(t2, e2) {
    Xe2(t2) ? e2(t2) : d2.find(t2, this._element).forEach(e2);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
}
var tp = {
  isVisible: true,
  isAnimated: false,
  rootElement: "body",
  clickCallback: null,
  backdropClasses: null
};
var ep = {
  isVisible: "boolean",
  isAnimated: "boolean",
  rootElement: "(element|string)",
  clickCallback: "(function|null)",
  backdropClasses: "(array|string|null)"
};
var Qc = "backdrop";
var aa = `mousedown.te.${Qc}`;

class Cr2 {
  constructor(t2) {
    this._config = this._getConfig(t2), this._isAppended = false, this._element = null;
  }
  show(t2) {
    if (!this._config.isVisible) {
      ge2(t2);
      return;
    }
    this._append(), this._config.isAnimated && si(this._getElement());
    const e2 = this._config.backdropClasses || [
      "opacity-50",
      "transition-all",
      "duration-300",
      "ease-in-out",
      "fixed",
      "top-0",
      "left-0",
      "z-[1040]",
      "bg-black",
      "w-screen",
      "h-screen"
    ];
    h2.removeClass(this._getElement(), "opacity-0"), h2.addClass(this._getElement(), e2), this._element.setAttribute("data-te-backdrop-show", ""), this._emulateAnimation(() => {
      ge2(t2);
    });
  }
  hide(t2) {
    if (!this._config.isVisible) {
      ge2(t2);
      return;
    }
    this._element.removeAttribute("data-te-backdrop-show"), this._getElement().classList.add("opacity-0"), this._getElement().classList.remove("opacity-50"), this._emulateAnimation(() => {
      this.dispose(), ge2(t2);
    });
  }
  _getElement() {
    if (!this._element) {
      const t2 = document.createElement("div");
      t2.className = this._config.className, this._config.isAnimated && t2.classList.add("opacity-50"), this._element = t2;
    }
    return this._element;
  }
  _getConfig(t2) {
    return t2 = {
      ...tp,
      ...typeof t2 == "object" ? t2 : {}
    }, t2.rootElement = ee2(t2.rootElement), I2(Qc, t2, ep), t2;
  }
  _append() {
    this._isAppended || (this._config.rootElement.append(this._getElement()), c2.on(this._getElement(), aa, () => {
      ge2(this._config.clickCallback);
    }), this._isAppended = true);
  }
  dispose() {
    this._isAppended && (c2.off(this._element, aa), this._element.remove(), this._isAppended = false);
  }
  _emulateAnimation(t2) {
    bc(t2, this._getElement(), this._config.isAnimated);
  }
}

class zi {
  constructor(t2, e2 = {}, i2) {
    this._element = t2, this._toggler = i2, this._event = e2.event || "blur", this._condition = e2.condition || (() => true), this._selector = e2.selector || 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])', this._onlyVisible = e2.onlyVisible || false, this._focusableElements = [], this._firstElement = null, this._lastElement = null, this.handler = (n2) => {
      this._condition(n2) && !n2.shiftKey && n2.target === this._lastElement ? (n2.preventDefault(), this._firstElement.focus()) : this._condition(n2) && n2.shiftKey && n2.target === this._firstElement && (n2.preventDefault(), this._lastElement.focus());
    };
  }
  trap() {
    this._setElements(), this._init(), this._setFocusTrap();
  }
  disable() {
    this._focusableElements.forEach((t2) => {
      t2.removeEventListener(this._event, this.handler);
    }), this._toggler && this._toggler.focus();
  }
  update() {
    this._setElements(), this._setFocusTrap();
  }
  _init() {
    const t2 = (e2) => {
      !this._firstElement || e2.key !== "Tab" || this._focusableElements.includes(e2.target) || (e2.preventDefault(), this._firstElement.focus(), window.removeEventListener("keydown", t2));
    };
    window.addEventListener("keydown", t2);
  }
  _filterVisible(t2) {
    return t2.filter((e2) => {
      if (!Mt2(e2))
        return false;
      const i2 = d2.parents(e2, "*");
      for (let n2 = 0;n2 < i2.length; n2++) {
        const o2 = window.getComputedStyle(i2[n2]);
        if (o2 && (o2.display === "none" || o2.visibility === "hidden"))
          return false;
      }
      return true;
    });
  }
  _setElements() {
    this._focusableElements = d2.focusableChildren(this._element), this._onlyVisible && (this._focusableElements = this._filterVisible(this._focusableElements)), this._firstElement = this._focusableElements[0], this._lastElement = this._focusableElements[this._focusableElements.length - 1];
  }
  _setFocusTrap() {
    this._focusableElements.forEach((t2, e2) => {
      e2 === this._focusableElements.length - 1 || e2 === 0 ? t2.addEventListener(this._event, this.handler) : t2.removeEventListener(this._event, this.handler);
    });
  }
}
var ip = "te.offcanvas";
var oi = `.${ip}`;
var sp = ".data-api";
var np = `load${oi}${sp}`;
var lp = `show${oi}`;
var cp = `shown${oi}`;
var hp = `hide${oi}`;
var dp = `hidden${oi}`;
var up = `keydown.dismiss${oi}`;
var pp = "te.alert";
var Jc = `.${pp}`;
var _p = `close${Jc}`;
var fp = `closed${Jc}`;
var Wn = "carousel";
var vp = "te.carousel";
var mt2 = `.${vp}`;
var th = ".data-api";
var Tp = "ArrowLeft";
var Ep = "ArrowRight";
var Cp = 500;
var Ap = 40;
var pa = {
  interval: 5000,
  keyboard: true,
  ride: false,
  pause: "hover",
  wrap: true,
  touch: true
};
var yp = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  ride: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean"
};
var wp = {
  pointer: "touch-pan-y",
  block: "!block",
  visible: "data-[te-carousel-fade]:opacity-100 data-[te-carousel-fade]:z-[1]",
  invisible: "data-[te-carousel-fade]:z-0 data-[te-carousel-fade]:opacity-0 data-[te-carousel-fade]:duration-[600ms] data-[te-carousel-fade]:delay-600",
  slideRight: "translate-x-full",
  slideLeft: "-translate-x-full"
};
var kp = {
  pointer: "string",
  block: "string",
  visible: "string",
  invisible: "string",
  slideRight: "string",
  slideLeft: "string"
};
var ce2 = "next";
var he2 = "prev";
var fe2 = "left";
var Ei = "right";
var xp = {
  [Tp]: Ei,
  [Ep]: fe2
};
var Op = `slide${mt2}`;
var Fn = `slid${mt2}`;
var Sp = `keydown${mt2}`;
var Ip = `mouseenter${mt2}`;
var Dp = `mouseleave${mt2}`;
var $p = `touchstart${mt2}`;
var Lp = `touchmove${mt2}`;
var Np = `touchend${mt2}`;
var Mp = `pointerdown${mt2}`;
var Rp = `pointerup${mt2}`;
var Pp = `dragstart${mt2}`;
var Bp = `load${mt2}${th}`;
var Hp = `click${mt2}${th}`;
var _a = "data-te-carousel-init";
var de2 = "data-te-carousel-active";
var Vp = "data-te-carousel-item-end";
var Yn = "data-te-carousel-item-start";
var Wp = "data-te-carousel-item-next";
var Fp = "data-te-carousel-item-prev";
var Yp = "data-te-carousel-pointer-event";
var jp = "[data-te-carousel-init]";
var eh = "[data-te-carousel-active]";
var Ar2 = "[data-te-carousel-item]";
var Se2 = `${eh}${Ar2}`;
var Kp = `${Ar2} img`;
var zp = "[data-te-carousel-item-next], [data-te-carousel-item-prev]";
var Up = "[data-te-carousel-indicators]";
var Xp = "[data-te-target]";
var Gp = "[data-te-slide], [data-te-slide-to]";
var qp = "touch";
var Zp = "pen";

class Xt2 extends ft2 {
  constructor(t2, e2, i2) {
    super(t2), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = false, this._isSliding = false, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e2), this._classes = this._getClasses(i2), this._indicatorsElement = d2.findOne(Up, this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = !!window.PointerEvent, this._setActiveElementClass(), this._addEventListeners(), this._didInit = false, this._init(), this._config.ride === "carousel" && this.cycle();
  }
  static get Default() {
    return pa;
  }
  static get NAME() {
    return Wn;
  }
  next() {
    this._slide(ce2);
  }
  nextWhenVisible() {
    !document.hidden && Mt2(this._element) && this.next();
  }
  prev() {
    this._slide(he2);
  }
  pause(t2) {
    t2 || (this._isPaused = true), d2.findOne(zp, this._element) && (_c(this._element), this.cycle(true)), clearInterval(this._interval), this._interval = null;
  }
  cycle(t2) {
    t2 || (this._isPaused = false), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
  }
  to(t2) {
    this._activeElement = d2.findOne(Se2, this._element);
    const e2 = this._getItemIndex(this._activeElement);
    if (t2 > this._items.length - 1 || t2 < 0)
      return;
    if (this._isSliding) {
      c2.one(this._element, Fn, () => this.to(t2));
      return;
    }
    if (e2 === t2) {
      this.pause(), this.cycle();
      return;
    }
    const i2 = t2 > e2 ? ce2 : he2;
    this._slide(i2, this._items[t2]);
  }
  _init() {
    this._didInit || (c2.on(document, Hp, Gp, Xt2.dataApiClickHandler), c2.on(window, Bp, () => {
      const t2 = d2.find(jp);
      for (let e2 = 0, i2 = t2.length;e2 < i2; e2++)
        Xt2.carouselInterface(t2[e2], Xt2.getInstance(t2[e2]));
    }), this._didInit = true);
  }
  _getConfig(t2) {
    return t2 = {
      ...pa,
      ...h2.getDataAttributes(this._element),
      ...typeof t2 == "object" ? t2 : {}
    }, I2(Wn, t2, yp), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...wp,
      ...e2,
      ...t2
    }, I2(Wn, t2, kp), t2;
  }
  _enableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        c2.one(this._element, Fn, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  _applyInitialClasses() {
    const t2 = d2.findOne(Se2, this._element);
    t2.classList.add(this._classes.block, ...this._classes.visible.split(" ")), this._setActiveIndicatorElement(t2);
  }
  _handleSwipe() {
    const t2 = Math.abs(this.touchDeltaX);
    if (t2 <= Ap)
      return;
    const e2 = t2 / this.touchDeltaX;
    this.touchDeltaX = 0, e2 && this._slide(e2 > 0 ? Ei : fe2);
  }
  _setActiveElementClass() {
    this._activeElement = d2.findOne(Se2, this._element), h2.addClass(this._activeElement, "hidden");
  }
  _addEventListeners() {
    this._config.keyboard && c2.on(this._element, Sp, (t2) => this._keydown(t2)), this._config.pause === "hover" && (c2.on(this._element, Ip, (t2) => this.pause(t2)), c2.on(this._element, Dp, (t2) => this._enableCycle(t2))), this._config.touch && this._touchSupported && this._addTouchEventListeners(), this._applyInitialClasses();
  }
  _addTouchEventListeners() {
    const t2 = (o2) => this._pointerEvent && (o2.pointerType === Zp || o2.pointerType === qp), e2 = (o2) => {
      t2(o2) ? this.touchStartX = o2.clientX : this._pointerEvent || (this.touchStartX = o2.touches[0].clientX);
    }, i2 = (o2) => {
      this.touchDeltaX = o2.touches && o2.touches.length > 1 ? 0 : o2.touches[0].clientX - this.touchStartX;
    }, n2 = (o2) => {
      t2(o2) && (this.touchDeltaX = o2.clientX - this.touchStartX), this._handleSwipe(), this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((r2) => this._enableCycle(r2), Cp + this._config.interval));
    };
    d2.find(Kp, this._element).forEach((o2) => {
      c2.on(o2, Pp, (r2) => r2.preventDefault());
    }), this._pointerEvent ? (c2.on(this._element, Mp, (o2) => e2(o2)), c2.on(this._element, Rp, (o2) => n2(o2)), this._element.classList.add(this._classes.pointer), this._element.setAttribute(`${Yp}`, "")) : (c2.on(this._element, $p, (o2) => e2(o2)), c2.on(this._element, Lp, (o2) => i2(o2)), c2.on(this._element, Np, (o2) => n2(o2)));
  }
  _keydown(t2) {
    if (/input|textarea/i.test(t2.target.tagName))
      return;
    const e2 = xp[t2.key];
    e2 && (t2.preventDefault(), this._slide(e2));
  }
  _getItemIndex(t2) {
    return this._items = t2 && t2.parentNode ? d2.find(Ar2, t2.parentNode) : [], this._items.indexOf(t2);
  }
  _getItemByOrder(t2, e2) {
    const i2 = t2 === ce2;
    return vc(this._items, e2, i2, this._config.wrap);
  }
  _triggerSlideEvent(t2, e2) {
    const i2 = this._getItemIndex(t2), n2 = this._getItemIndex(d2.findOne(Se2, this._element));
    return c2.trigger(this._element, Op, {
      relatedTarget: t2,
      direction: e2,
      from: n2,
      to: i2
    });
  }
  _setActiveIndicatorElement(t2) {
    if (this._indicatorsElement) {
      const e2 = d2.findOne(eh, this._indicatorsElement);
      e2.removeAttribute(de2), e2.removeAttribute("aria-current"), e2.classList.remove("!opacity-100");
      const i2 = d2.find(Xp, this._indicatorsElement);
      for (let n2 = 0;n2 < i2.length; n2++)
        if (Number.parseInt(i2[n2].getAttribute("data-te-slide-to"), 10) === this._getItemIndex(t2)) {
          i2[n2].setAttribute(`${de2}`, ""), i2[n2].setAttribute("aria-current", "true"), i2[n2].classList.add("!opacity-100");
          break;
        }
    }
  }
  _updateInterval() {
    const t2 = this._activeElement || d2.findOne(Se2, this._element);
    if (!t2)
      return;
    const e2 = Number.parseInt(t2.getAttribute("data-te-interval"), 10);
    e2 ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e2) : this._config.interval = this._config.defaultInterval || this._config.interval;
  }
  _slide(t2, e2) {
    const i2 = this._directionToOrder(t2), n2 = d2.findOne(Se2, this._element), o2 = this._getItemIndex(n2), r2 = e2 || this._getItemByOrder(i2, n2), a2 = this._getItemIndex(r2), l2 = !!this._interval, p2 = i2 === ce2, u2 = p2 ? Yn : Vp, _2 = p2 ? Wp : Fp, f2 = this._orderToDirection(i2), g2 = u2 === Yn ? this._classes.slideLeft : this._classes.slideRight, m2 = u2 !== Yn ? this._classes.slideLeft : this._classes.slideRight;
    if (r2 && r2.hasAttribute(de2)) {
      this._isSliding = false;
      return;
    }
    if (this._isSliding || this._triggerSlideEvent(r2, f2).defaultPrevented || !n2 || !r2)
      return;
    this._isSliding = true, l2 && this.pause(), this._setActiveIndicatorElement(r2), this._activeElement = r2;
    const v2 = () => {
      c2.trigger(this._element, Fn, {
        relatedTarget: r2,
        direction: f2,
        from: o2,
        to: a2
      });
    };
    if (this._element.hasAttribute(_a)) {
      r2.setAttribute(`${_2}`, ""), r2.classList.add(this._classes.block, m2), si(r2), n2.setAttribute(`${u2}`, ""), n2.classList.add(g2, ...this._classes.invisible.split(" ")), n2.classList.remove(...this._classes.visible.split(" ")), r2.setAttribute(`${u2}`, ""), r2.classList.add(...this._classes.visible.split(" ")), r2.classList.remove(this._classes.slideRight, this._classes.slideLeft);
      const T2 = () => {
        r2.removeAttribute(u2), r2.removeAttribute(_2), r2.setAttribute(`${de2}`, ""), n2.removeAttribute(de2), n2.classList.remove(g2, ...this._classes.invisible.split(" "), this._classes.block), n2.removeAttribute(_2), n2.removeAttribute(u2), this._isSliding = false, setTimeout(v2, 0);
      };
      this._queueCallback(T2, n2, true);
    } else
      n2.removeAttribute(de2), n2.classList.remove(this._classes.block), r2.setAttribute(`${de2}`, ""), r2.classList.add(this._classes.block), this._isSliding = false, v2();
    l2 && this.cycle();
  }
  _directionToOrder(t2) {
    return [Ei, fe2].includes(t2) ? W2() ? t2 === fe2 ? he2 : ce2 : t2 === fe2 ? ce2 : he2 : t2;
  }
  _orderToDirection(t2) {
    return [ce2, he2].includes(t2) ? W2() ? t2 === he2 ? fe2 : Ei : t2 === he2 ? Ei : fe2 : t2;
  }
  static carouselInterface(t2, e2) {
    const i2 = Xt2.getOrCreateInstance(t2, e2);
    let { _config: n2 } = i2;
    typeof e2 == "object" && (n2 = {
      ...n2,
      ...e2
    });
    const o2 = typeof e2 == "string" ? e2 : e2.slide;
    if (typeof e2 == "number") {
      i2.to(e2);
      return;
    }
    if (typeof o2 == "string") {
      if (typeof i2[o2] > "u")
        throw new TypeError(`No method named "${o2}"`);
      i2[o2]();
    } else
      n2.interval && n2.ride === true && i2.pause();
  }
  static jQueryInterface(t2) {
    return this.each(function() {
      Xt2.carouselInterface(this, t2);
    });
  }
  static dataApiClickHandler(t2) {
    const e2 = te2(this);
    if (!e2 || !e2.hasAttribute(_a))
      return;
    const i2 = {
      ...h2.getDataAttributes(e2),
      ...h2.getDataAttributes(this)
    }, n2 = this.getAttribute("data-te-slide-to");
    n2 && (i2.interval = false), Xt2.carouselInterface(e2, i2), n2 && Xt2.getInstance(e2).to(n2), t2.preventDefault();
  }
}
var Qp = "te.modal";
var yt2 = `.${Qp}`;
var i_ = `hide${yt2}`;
var s_ = `hidePrevented${yt2}`;
var n_ = `hidden${yt2}`;
var o_ = `show${yt2}`;
var r_ = `shown${yt2}`;
var ga = `resize${yt2}`;
var ba = `click.dismiss${yt2}`;
var va = `keydown.dismiss${yt2}`;
var a_ = `mouseup.dismiss${yt2}`;
var Ta = `mousedown.dismiss${yt2}`;
var c_ = new Set([
  "background",
  "cite",
  "href",
  "itemtype",
  "longdesc",
  "poster",
  "src",
  "xlink:href"
]);
var ih = /^aria-[\w-]*$/i;
var d_ = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
var u_ = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
var p_ = (s2, t2) => {
  const e2 = s2.nodeName.toLowerCase();
  if (t2.includes(e2))
    return c_.has(e2) ? !!(d_.test(s2.nodeValue) || u_.test(s2.nodeValue)) : true;
  const i2 = t2.filter((n2) => n2 instanceof RegExp);
  for (let n2 = 0, o2 = i2.length;n2 < o2; n2++)
    if (i2[n2].test(e2))
      return true;
  return false;
};
var __ = {
  "*": ["class", "dir", "id", "lang", "role", ih],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
var Aa = "tooltip";
var f_ = "te.tooltip";
var kt2 = `.${f_}`;
var m_ = "te-tooltip";
var g_ = new Set(["sanitize", "allowList", "sanitizeFn"]);
var b_ = {
  animation: "boolean",
  template: "string",
  title: "(string|element|function)",
  trigger: "string",
  delay: "(number|object)",
  html: "boolean",
  selector: "(string|boolean)",
  placement: "(string|function)",
  offset: "(array|string|function)",
  container: "(string|element|boolean)",
  fallbackPlacements: "array",
  boundary: "(string|element)",
  customClass: "(string|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  allowList: "object",
  popperConfig: "(null|object|function)"
};
var v_ = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: W2() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: W2() ? "right" : "left"
};
var T_ = {
  animation: true,
  template: '<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip"><div data-te-tooltip-inner-ref class="tooltip-inner max-w-[200px] text-sm py-1.5 px-4 text-white text-center bg-[#6d6d6d] rounded"></div></div>',
  trigger: "hover focus",
  title: "",
  delay: 0,
  html: false,
  selector: false,
  placement: "top",
  offset: [0, 0],
  container: false,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  boundary: "clippingParents",
  customClass: "",
  sanitize: true,
  sanitizeFn: null,
  allowList: __,
  popperConfig: { hide: true }
};
var E_ = {
  HIDE: `hide${kt2}`,
  HIDDEN: `hidden${kt2}`,
  SHOW: `show${kt2}`,
  SHOWN: `shown${kt2}`,
  INSERTED: `inserted${kt2}`,
  CLICK: `click${kt2}`,
  FOCUSIN: `focusin${kt2}`,
  FOCUSOUT: `focusout${kt2}`,
  MOUSEENTER: `mouseenter${kt2}`,
  MOUSELEAVE: `mouseleave${kt2}`
};
var C_ = "fade";
var A_ = "modal";
var Kn = "show";
var _i = "show";
var zn = "out";
var ya = ".tooltip-inner";
var wa = `.${A_}`;
var ka = "hide.te.modal";
var fi = "hover";
var Un = "focus";
var y_ = "click";
var w_ = "manual";

class ri extends ft2 {
  constructor(t2, e2) {
    if (typeof qc > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t2), this._isEnabled = true, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(e2), this.tip = null, this._setListeners();
  }
  static get Default() {
    return T_;
  }
  static get NAME() {
    return Aa;
  }
  static get Event() {
    return E_;
  }
  static get DefaultType() {
    return b_;
  }
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle(t2) {
    if (this._isEnabled)
      if (t2) {
        const e2 = this._initializeOnDelegatedTarget(t2);
        e2._activeTrigger.click = !e2._activeTrigger.click, e2._isWithActiveTrigger() ? e2._enter(null, e2) : e2._leave(null, e2);
      } else {
        if (this.getTipElement().classList.contains(Kn)) {
          this._leave(null, this);
          return;
        }
        this._enter(null, this);
      }
  }
  dispose() {
    clearTimeout(this._timeout), c2.off(this._element.closest(wa), ka, this._hideModalHandler), this.tip && this.tip.remove(), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this.isWithContent() && this._isEnabled))
      return;
    const t2 = c2.trigger(this._element, this.constructor.Event.SHOW), e2 = fc(this._element), i2 = e2 === null ? this._element.ownerDocument.documentElement.contains(this._element) : e2.contains(this._element);
    if (t2.defaultPrevented || !i2)
      return;
    this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(ya).innerHTML && (this._disposePopper(), this.tip.remove(), this.tip = null);
    const n2 = this.getTipElement(), o2 = et2(this.constructor.NAME);
    n2.setAttribute("id", o2), this._element.setAttribute("aria-describedby", o2), this._config.animation && setTimeout(() => {
      this.tip.classList.add("opacity-100"), this.tip.classList.remove("opacity-0");
    }, 100);
    const r2 = typeof this._config.placement == "function" ? this._config.placement.call(this, n2, this._element) : this._config.placement, a2 = this._getAttachment(r2);
    this._addAttachmentClass(a2);
    const { container: l2 } = this._config;
    if (A2.setData(n2, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (l2.append(n2), c2.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = se2(this._element, n2, this._getPopperConfig(a2)), n2.getAttribute("id").includes("tooltip"))
      switch (r2) {
        case "bottom":
          n2.classList.add("py-[0.4rem]");
          break;
        case "left":
          n2.classList.add("px-[0.4rem]");
          break;
        case "right":
          n2.classList.add("px-[0.4rem]");
          break;
        default:
          n2.classList.add("py-[0.4rem]");
          break;
      }
    const u2 = this._resolvePossibleFunction(this._config.customClass);
    u2 && n2.classList.add(...u2.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((g2) => {
      c2.on(g2, "mouseover", hn);
    });
    const _2 = () => {
      const g2 = this._hoverState;
      this._hoverState = null, c2.trigger(this._element, this.constructor.Event.SHOWN), g2 === zn && this._leave(null, this);
    }, f2 = this.tip.classList.contains("transition-opacity");
    this._queueCallback(_2, this.tip, f2);
  }
  hide() {
    if (!this._popper)
      return;
    const t2 = this.getTipElement(), e2 = () => {
      this._isWithActiveTrigger() || (this._hoverState !== _i && t2.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), c2.trigger(this._element, this.constructor.Event.HIDDEN), this._disposePopper());
    };
    if (c2.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented)
      return;
    t2.classList.add("opacity-0"), t2.classList.remove("opacity-100"), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((o2) => c2.off(o2, "mouseover", hn)), this._activeTrigger[y_] = false, this._activeTrigger[Un] = false, this._activeTrigger[fi] = false;
    const n2 = this.tip.classList.contains("opacity-0");
    this._queueCallback(e2, this.tip, n2), this._hoverState = "";
  }
  update() {
    this._popper !== null && this._popper.update();
  }
  isWithContent() {
    return !!this.getTitle();
  }
  getTipElement() {
    if (this.tip)
      return this.tip;
    const t2 = document.createElement("div");
    t2.innerHTML = this._config.template;
    const e2 = t2.children[0];
    return this.setContent(e2), e2.classList.remove(C_, Kn), this.tip = e2, this.tip;
  }
  setContent(t2) {
    this._sanitizeAndSetContent(t2, this.getTitle(), ya);
  }
  _sanitizeAndSetContent(t2, e2, i2) {
    const n2 = d2.findOne(i2, t2);
    if (!e2 && n2) {
      n2.remove();
      return;
    }
    this.setElementContent(n2, e2);
  }
  setElementContent(t2, e2) {
    if (t2 !== null) {
      if (Xe2(e2)) {
        e2 = ee2(e2), this._config.html ? e2.parentNode !== t2 && (t2.innerHTML = "", t2.append(e2)) : t2.textContent = e2.textContent;
        return;
      }
      this._config.html ? (this._config.sanitize && (e2 = pn(e2, this._config.allowList, this._config.sanitizeFn)), t2.innerHTML = e2) : t2.textContent = e2;
    }
  }
  getTitle() {
    const t2 = this._element.getAttribute("data-te-original-title") || this._config.title;
    return this._resolvePossibleFunction(t2);
  }
  updateAttachment(t2) {
    return t2 === "right" ? "end" : t2 === "left" ? "start" : t2;
  }
  _initializeOnDelegatedTarget(t2, e2) {
    return e2 || this.constructor.getOrCreateInstance(t2.delegateTarget, this._getDelegateConfig());
  }
  _getOffset() {
    const { offset: t2 } = this._config;
    return typeof t2 == "string" ? t2.split(",").map((e2) => Number.parseInt(e2, 10)) : typeof t2 == "function" ? (e2) => t2(e2, this._element) : t2;
  }
  _resolvePossibleFunction(t2) {
    return typeof t2 == "function" ? t2.call(this._element) : t2;
  }
  _getPopperConfig(t2) {
    const e2 = {
      placement: t2,
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        },
        {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        },
        {
          name: "onChange",
          enabled: true,
          phase: "afterWrite",
          fn: (i2) => this._handlePopperPlacementChange(i2)
        }
      ],
      onFirstUpdate: (i2) => {
        i2.options.placement !== i2.placement && this._handlePopperPlacementChange(i2);
      }
    };
    return {
      ...e2,
      ...typeof this._config.popperConfig == "function" ? this._config.popperConfig(e2) : this._config.popperConfig
    };
  }
  _addAttachmentClass(t2) {
    this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t2)}`);
  }
  _getAttachment(t2) {
    return v_[t2.toUpperCase()];
  }
  _setListeners() {
    this._config.trigger.split(" ").forEach((e2) => {
      if (e2 === "click")
        c2.on(this._element, this.constructor.Event.CLICK, this._config.selector, (i2) => this.toggle(i2));
      else if (e2 !== w_) {
        const i2 = e2 === fi ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN, n2 = e2 === fi ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        c2.on(this._element, i2, this._config.selector, (o2) => this._enter(o2)), c2.on(this._element, n2, this._config.selector, (o2) => this._leave(o2));
      }
    }), this._hideModalHandler = () => {
      this._element && this.hide();
    }, c2.on(this._element.closest(wa), ka, this._hideModalHandler), this._config.selector ? this._config = {
      ...this._config,
      trigger: "manual",
      selector: ""
    } : this._fixTitle();
  }
  _fixTitle() {
    const t2 = this._element.getAttribute("title"), e2 = typeof this._element.getAttribute("data-te-original-title");
    (t2 || e2 !== "string") && (this._element.setAttribute("data-te-original-title", t2 || ""), t2 && !this._element.getAttribute("aria-label") && !this._element.textContent && this._element.setAttribute("aria-label", t2), this._element.setAttribute("title", ""));
  }
  _enter(t2, e2) {
    if (e2 = this._initializeOnDelegatedTarget(t2, e2), t2 && (e2._activeTrigger[t2.type === "focusin" ? Un : fi] = true), e2.getTipElement().classList.contains(Kn) || e2._hoverState === _i) {
      e2._hoverState = _i;
      return;
    }
    if (clearTimeout(e2._timeout), e2._hoverState = _i, !e2._config.delay || !e2._config.delay.show) {
      e2.show();
      return;
    }
    e2._timeout = setTimeout(() => {
      e2._hoverState === _i && e2.show();
    }, e2._config.delay.show);
  }
  _leave(t2, e2) {
    if (e2 = this._initializeOnDelegatedTarget(t2, e2), t2 && (e2._activeTrigger[t2.type === "focusout" ? Un : fi] = e2._element.contains(t2.relatedTarget)), !e2._isWithActiveTrigger()) {
      if (clearTimeout(e2._timeout), e2._hoverState = zn, !e2._config.delay || !e2._config.delay.hide) {
        e2.hide();
        return;
      }
      e2._timeout = setTimeout(() => {
        e2._hoverState === zn && e2.hide();
      }, e2._config.delay.hide);
    }
  }
  _isWithActiveTrigger() {
    for (const t2 in this._activeTrigger)
      if (this._activeTrigger[t2])
        return true;
    return false;
  }
  _getConfig(t2) {
    const e2 = h2.getDataAttributes(this._element);
    return Object.keys(e2).forEach((i2) => {
      g_.has(i2) && delete e2[i2];
    }), t2 = {
      ...this.constructor.Default,
      ...e2,
      ...typeof t2 == "object" && t2 ? t2 : {}
    }, t2.container = t2.container === false ? document.body : ee2(t2.container), typeof t2.delay == "number" && (t2.delay = {
      show: t2.delay,
      hide: t2.delay
    }), typeof t2.title == "number" && (t2.title = t2.title.toString()), typeof t2.content == "number" && (t2.content = t2.content.toString()), I2(Aa, t2, this.constructor.DefaultType), t2.sanitize && (t2.template = pn(t2.template, t2.allowList, t2.sanitizeFn)), t2;
  }
  _getDelegateConfig() {
    const t2 = {};
    for (const e2 in this._config)
      this.constructor.Default[e2] !== this._config[e2] && (t2[e2] = this._config[e2]);
    return t2;
  }
  _cleanTipClass() {
    const t2 = this.getTipElement(), e2 = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g"), i2 = t2.getAttribute("class").match(e2);
    i2 !== null && i2.length > 0 && i2.map((n2) => n2.trim()).forEach((n2) => t2.classList.remove(n2));
  }
  _getBasicClassPrefix() {
    return m_;
  }
  _handlePopperPlacementChange(t2) {
    const { state: e2 } = t2;
    e2 && (this.tip = e2.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e2.placement)));
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null);
  }
  static jQueryInterface(t2) {
    return this.each(function() {
      const e2 = ri.getOrCreateInstance(this, t2);
      if (typeof t2 == "string") {
        if (typeof e2[t2] > "u")
          throw new TypeError(`No method named "${t2}"`);
        e2[t2]();
      }
    });
  }
}
var x_ = "te.popover";
var xt2 = `.${x_}`;
var S_ = {
  ...ri.Default,
  placement: "right",
  offset: [0, 8],
  trigger: "click",
  content: "",
  template: '<div class="opacity-0 transition-opacity duration-150 ease-in-out absolute top-0 left-0 z-[1070] block max-w-[267px] break-words bg-white bg-clip-padding border border-neutral-100 rounded-lg shadow-[0_0px_3px_0_rgba(0,0,0,0.07),0_2px_2px_0_rgba(0,0,0,0.04)] text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal dark:bg-neutral-700 dark:border-0 dark:text-white data-[popper-reference-hidden]:hidden" role="tooltip"><h3 class="popover-header py-2 px-4 mb-0 border-b-2 border-neutral-100 rounded-t-lg font-medium empty:hidden dark:border-neutral-500"></h3><div class="popover-body p-4 text-[#212529] dark:text-white"></div></div>'
};
var I_ = {
  ...ri.DefaultType,
  content: "(string|element|function)"
};
var D_ = {
  HIDE: `hide${xt2}`,
  HIDDEN: `hidden${xt2}`,
  SHOW: `show${xt2}`,
  SHOWN: `shown${xt2}`,
  INSERTED: `inserted${xt2}`,
  CLICK: `click${xt2}`,
  FOCUSIN: `focusin${xt2}`,
  FOCUSOUT: `focusout${xt2}`,
  MOUSEENTER: `mouseenter${xt2}`,
  MOUSELEAVE: `mouseleave${xt2}`
};
var N_ = "te.scrollspy";
var yr2 = `.${N_}`;
var B_ = `activate${yr2}`;
var H_ = `scroll${yr2}`;
var oh = "[data-te-dropdown-item-ref]";
var Uo = "[data-te-nav-link-ref]";
var rh = "[data-te-list-group-item-ref]";
var qn = `${Uo}, ${rh}, ${oh}`;
var K_ = "te.tab";
var Tn = `.${K_}`;
var z_ = `hide${Tn}`;
var U_ = `hidden${Tn}`;
var X_ = `show${Tn}`;
var G_ = `shown${Tn}`;
var He2 = "data-te-tab-active";
var Ks = "data-te-nav-active";
var Ia = `[${He2}]`;
var J_ = `[${Ks}]`;
var of = "te.toast";
var ne2 = `.${of}`;
var rf = `mouseover${ne2}`;
var af = `mouseout${ne2}`;
var lf = `focusin${ne2}`;
var cf = `focusout${ne2}`;
var hf = `hide${ne2}`;
var df = `hidden${ne2}`;
var uf = `show${ne2}`;
var pf = `shown${ne2}`;
(() => {
  var s2 = { 454: (i2, n2, o2) => {
    o2.d(n2, { Z: () => l2 });
    var r2 = o2(645), a2 = o2.n(r2)()(function(p2) {
      return p2[1];
    });
    a2.push([i2.id, "INPUT:-webkit-autofill,SELECT:-webkit-autofill,TEXTAREA:-webkit-autofill{animation-name:onautofillstart}INPUT:not(:-webkit-autofill),SELECT:not(:-webkit-autofill),TEXTAREA:not(:-webkit-autofill){animation-name:onautofillcancel}@keyframes onautofillstart{}@keyframes onautofillcancel{}", ""]);
    const l2 = a2;
  }, 645: (i2) => {
    i2.exports = function(n2) {
      var o2 = [];
      return o2.toString = function() {
        return this.map(function(r2) {
          var a2 = n2(r2);
          return r2[2] ? "@media ".concat(r2[2], " {").concat(a2, "}") : a2;
        }).join("");
      }, o2.i = function(r2, a2, l2) {
        typeof r2 == "string" && (r2 = [[null, r2, ""]]);
        var p2 = {};
        if (l2)
          for (var u2 = 0;u2 < this.length; u2++) {
            var _2 = this[u2][0];
            _2 != null && (p2[_2] = true);
          }
        for (var f2 = 0;f2 < r2.length; f2++) {
          var g2 = [].concat(r2[f2]);
          l2 && p2[g2[0]] || (a2 && (g2[2] ? g2[2] = "".concat(a2, " and ").concat(g2[2]) : g2[2] = a2), o2.push(g2));
        }
      }, o2;
    };
  }, 810: () => {
    (function() {
      if (typeof window < "u")
        try {
          var i2 = new window.CustomEvent("test", { cancelable: true });
          if (i2.preventDefault(), i2.defaultPrevented !== true)
            throw new Error("Could not prevent default");
        } catch {
          var n2 = function(r2, a2) {
            var l2, p2;
            return (a2 = a2 || {}).bubbles = !!a2.bubbles, a2.cancelable = !!a2.cancelable, (l2 = document.createEvent("CustomEvent")).initCustomEvent(r2, a2.bubbles, a2.cancelable, a2.detail), p2 = l2.preventDefault, l2.preventDefault = function() {
              p2.call(this);
              try {
                Object.defineProperty(this, "defaultPrevented", { get: function() {
                  return true;
                } });
              } catch {
                this.defaultPrevented = true;
              }
            }, l2;
          };
          n2.prototype = window.Event.prototype, window.CustomEvent = n2;
        }
    })();
  }, 379: (i2, n2, o2) => {
    var r2, a2 = function() {
      var C2 = {};
      return function(E2) {
        if (C2[E2] === undefined) {
          var w2 = document.querySelector(E2);
          if (window.HTMLIFrameElement && w2 instanceof window.HTMLIFrameElement)
            try {
              w2 = w2.contentDocument.head;
            } catch {
              w2 = null;
            }
          C2[E2] = w2;
        }
        return C2[E2];
      };
    }(), l2 = [];
    function p2(C2) {
      for (var E2 = -1, w2 = 0;w2 < l2.length; w2++)
        if (l2[w2].identifier === C2) {
          E2 = w2;
          break;
        }
      return E2;
    }
    function u2(C2, E2) {
      for (var w2 = {}, k2 = [], D2 = 0;D2 < C2.length; D2++) {
        var O2 = C2[D2], x2 = E2.base ? O2[0] + E2.base : O2[0], L2 = w2[x2] || 0, S2 = "".concat(x2, " ").concat(L2);
        w2[x2] = L2 + 1;
        var N2 = p2(S2), P2 = { css: O2[1], media: O2[2], sourceMap: O2[3] };
        N2 !== -1 ? (l2[N2].references++, l2[N2].updater(P2)) : l2.push({ identifier: S2, updater: y2(P2, E2), references: 1 }), k2.push(S2);
      }
      return k2;
    }
    function _2(C2) {
      var E2 = document.createElement("style"), w2 = C2.attributes || {};
      if (w2.nonce === undefined) {
        var k2 = o2.nc;
        k2 && (w2.nonce = k2);
      }
      if (Object.keys(w2).forEach(function(O2) {
        E2.setAttribute(O2, w2[O2]);
      }), typeof C2.insert == "function")
        C2.insert(E2);
      else {
        var D2 = a2(C2.insert || "head");
        if (!D2)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        D2.appendChild(E2);
      }
      return E2;
    }
    var f2, g2 = (f2 = [], function(C2, E2) {
      return f2[C2] = E2, f2.filter(Boolean).join(`
`);
    });
    function m2(C2, E2, w2, k2) {
      var D2 = w2 ? "" : k2.media ? "@media ".concat(k2.media, " {").concat(k2.css, "}") : k2.css;
      if (C2.styleSheet)
        C2.styleSheet.cssText = g2(E2, D2);
      else {
        var O2 = document.createTextNode(D2), x2 = C2.childNodes;
        x2[E2] && C2.removeChild(x2[E2]), x2.length ? C2.insertBefore(O2, x2[E2]) : C2.appendChild(O2);
      }
    }
    function b2(C2, E2, w2) {
      var { css: k2, media: D2, sourceMap: O2 } = w2;
      if (D2 ? C2.setAttribute("media", D2) : C2.removeAttribute("media"), O2 && typeof btoa < "u" && (k2 += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(O2)))), " */")), C2.styleSheet)
        C2.styleSheet.cssText = k2;
      else {
        for (;C2.firstChild; )
          C2.removeChild(C2.firstChild);
        C2.appendChild(document.createTextNode(k2));
      }
    }
    var v2 = null, T2 = 0;
    function y2(C2, E2) {
      var w2, k2, D2;
      if (E2.singleton) {
        var O2 = T2++;
        w2 = v2 || (v2 = _2(E2)), k2 = m2.bind(null, w2, O2, false), D2 = m2.bind(null, w2, O2, true);
      } else
        w2 = _2(E2), k2 = b2.bind(null, w2, E2), D2 = function() {
          (function(x2) {
            if (x2.parentNode === null)
              return false;
            x2.parentNode.removeChild(x2);
          })(w2);
        };
      return k2(C2), function(x2) {
        if (x2) {
          if (x2.css === C2.css && x2.media === C2.media && x2.sourceMap === C2.sourceMap)
            return;
          k2(C2 = x2);
        } else
          D2();
      };
    }
    i2.exports = function(C2, E2) {
      (E2 = E2 || {}).singleton || typeof E2.singleton == "boolean" || (E2.singleton = (r2 === undefined && (r2 = !!(window && document && document.all && !window.atob)), r2));
      var w2 = u2(C2 = C2 || [], E2);
      return function(k2) {
        if (k2 = k2 || [], Object.prototype.toString.call(k2) === "[object Array]") {
          for (var D2 = 0;D2 < w2.length; D2++) {
            var O2 = p2(w2[D2]);
            l2[O2].references--;
          }
          for (var x2 = u2(k2, E2), L2 = 0;L2 < w2.length; L2++) {
            var S2 = p2(w2[L2]);
            l2[S2].references === 0 && (l2[S2].updater(), l2.splice(S2, 1));
          }
          w2 = x2;
        }
      };
    };
  } }, t2 = {};
  function e2(i2) {
    var n2 = t2[i2];
    if (n2 !== undefined)
      return n2.exports;
    var o2 = t2[i2] = { id: i2, exports: {} };
    return s2[i2](o2, o2.exports, e2), o2.exports;
  }
  e2.n = (i2) => {
    var n2 = i2 && i2.__esModule ? () => i2.default : () => i2;
    return e2.d(n2, { a: n2 }), n2;
  }, e2.d = (i2, n2) => {
    for (var o2 in n2)
      e2.o(n2, o2) && !e2.o(i2, o2) && Object.defineProperty(i2, o2, { enumerable: true, get: n2[o2] });
  }, e2.o = (i2, n2) => Object.prototype.hasOwnProperty.call(i2, n2), (() => {
    var i2 = e2(379), n2 = e2.n(i2), o2 = e2(454);
    function r2(l2) {
      if (!l2.hasAttribute("autocompleted")) {
        l2.setAttribute("autocompleted", "");
        var p2 = new window.CustomEvent("onautocomplete", { bubbles: true, cancelable: true, detail: null });
        l2.dispatchEvent(p2) || (l2.value = "");
      }
    }
    function a2(l2) {
      l2.hasAttribute("autocompleted") && (l2.removeAttribute("autocompleted"), l2.dispatchEvent(new window.CustomEvent("onautocomplete", { bubbles: true, cancelable: false, detail: null })));
    }
    n2()(o2.Z, { insert: "head", singleton: false }), o2.Z.locals, e2(810), document.addEventListener("animationstart", function(l2) {
      l2.animationName === "onautofillstart" ? r2(l2.target) : a2(l2.target);
    }, true), document.addEventListener("input", function(l2) {
      l2.inputType !== "insertReplacementText" && "data" in l2 ? a2(l2.target) : r2(l2.target);
    }, true);
  })();
})();
var Jn = "input";
var ls = "te.input";
var ch = "data-te-input-wrapper-init";
var hh = "data-te-input-notch-ref";
var dh = "data-te-input-notch-leading-ref";
var uh = "data-te-input-notch-middle-ref";
var gf = "data-te-input-notch-trailing-ref";
var bf = "data-te-input-helper-ref";
var vf = "data-te-input-placeholder-active";
var Yt2 = "data-te-input-state-active";
var Na = "data-te-input-focused";
var Ma = "data-te-input-form-counter";
var cs = `[${ch}] input`;
var hs = `[${ch}] textarea`;
var Ie2 = `[${hh}]`;
var Ra = `[${dh}]`;
var Pa = `[${uh}]`;
var Tf = `[${bf}]`;
var Ef = {
  inputFormWhite: false
};
var Cf = {
  inputFormWhite: "(boolean)"
};
var ph = {
  notch: "group flex absolute left-0 top-0 w-full max-w-full h-full text-left pointer-events-none",
  notchLeading: "pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none left-0 top-0 h-full w-2 border-r-0 rounded-l-[0.25rem] group-data-[te-input-focused]:border-r-0 group-data-[te-input-state-active]:border-r-0",
  notchLeadingNormal: "border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary",
  notchLeadingWhite: "border-neutral-200 group-data-[te-input-focused]:shadow-[-1px_0_0_#ffffff,_0_1px_0_0_#ffffff,_0_-1px_0_0_#ffffff] group-data-[te-input-focused]:border-white",
  notchMiddle: "pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow-0 shrink-0 basis-auto w-auto max-w-[calc(100%-1rem)] h-full border-r-0 border-l-0 group-data-[te-input-focused]:border-x-0 group-data-[te-input-state-active]:border-x-0 group-data-[te-input-focused]:border-t group-data-[te-input-state-active]:border-t group-data-[te-input-focused]:border-solid group-data-[te-input-state-active]:border-solid group-data-[te-input-focused]:border-t-transparent group-data-[te-input-state-active]:border-t-transparent",
  notchMiddleNormal: "border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary",
  notchMiddleWhite: "border-neutral-200 group-data-[te-input-focused]:shadow-[0_1px_0_0_#ffffff] group-data-[te-input-focused]:border-white",
  notchTrailing: "pointer-events-none border border-solid box-border bg-transparent transition-all duration-200 ease-linear motion-reduce:transition-none grow h-full border-l-0 rounded-r-[0.25rem] group-data-[te-input-focused]:border-l-0 group-data-[te-input-state-active]:border-l-0",
  notchTrailingNormal: "border-neutral-300 dark:border-neutral-600 group-data-[te-input-focused]:shadow-[1px_0_0_#3b71ca,_0_-1px_0_0_#3b71ca,_0_1px_0_0_#3b71ca] group-data-[te-input-focused]:border-primary",
  notchTrailingWhite: "border-neutral-200 group-data-[te-input-focused]:shadow-[1px_0_0_#ffffff,_0_-1px_0_0_#ffffff,_0_1px_0_0_#ffffff] group-data-[te-input-focused]:border-white",
  counter: "text-right leading-[1.6]"
};
var Af = {
  notch: "string",
  notchLeading: "string",
  notchLeadingNormal: "string",
  notchLeadingWhite: "string",
  notchMiddle: "string",
  notchMiddleNormal: "string",
  notchMiddleWhite: "string",
  notchTrailing: "string",
  notchTrailingNormal: "string",
  notchTrailingWhite: "string",
  counter: "string"
};

class V2 {
  constructor(t2, e2, i2) {
    this._config = this._getConfig(e2, t2), this._element = t2, this._classes = this._getClasses(i2), this._label = null, this._labelWidth = 0, this._labelMarginLeft = 0, this._notchLeading = null, this._notchMiddle = null, this._notchTrailing = null, this._initiated = false, this._helper = null, this._counter = false, this._counterElement = null, this._maxLength = 0, this._leadingIcon = null, this._element && (A2.setData(t2, ls, this), this.init());
  }
  static get NAME() {
    return Jn;
  }
  get input() {
    return d2.findOne("input", this._element) || d2.findOne("textarea", this._element);
  }
  init() {
    this._initiated || (this._getLabelData(), this._applyDivs(), this._applyNotch(), this._activate(), this._getHelper(), this._getCounter(), this._getEvents(), this._initiated = true);
  }
  update() {
    this._getLabelData(), this._getNotchData(), this._applyNotch(), this._activate(), this._getHelper(), this._getCounter();
  }
  forceActive() {
    this.input.setAttribute(Yt2, ""), d2.findOne(Ie2, this.input.parentNode).setAttribute(Yt2, "");
  }
  forceInactive() {
    this.input.removeAttribute(Yt2), d2.findOne(Ie2, this.input.parentNode).removeAttribute(Yt2);
  }
  dispose() {
    this._removeBorder(), A2.removeData(this._element, ls), this._element = null;
  }
  _getConfig(t2, e2) {
    return t2 = {
      ...Ef,
      ...h2.getDataAttributes(e2),
      ...typeof t2 == "object" ? t2 : {}
    }, I2(Jn, t2, Cf), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...ph,
      ...e2,
      ...t2
    }, I2(Jn, t2, Af), t2;
  }
  _getLabelData() {
    this._label = d2.findOne("label", this._element), this._label === null ? this._showPlaceholder() : (this._getLabelWidth(), this._getLabelPositionInInputGroup(), this._toggleDefaultDatePlaceholder());
  }
  _getHelper() {
    this._helper = d2.findOne(Tf, this._element);
  }
  _getCounter() {
    this._counter = h2.getDataAttribute(this.input, "inputShowcounter"), this._counter && (this._maxLength = this.input.maxLength, this._showCounter());
  }
  _getEvents() {
    c2.on(this._element, "focus", "input", V2.activate(new V2)), c2.on(this._element, "input", "input", V2.activate(new V2)), c2.on(this._element, "blur", "input", V2.deactivate(new V2)), c2.on(this._element, "focus", "textarea", V2.activate(new V2)), c2.on(this._element, "input", "textarea", V2.activate(new V2)), c2.on(this._element, "blur", "textarea", V2.deactivate(new V2)), c2.on(window, "shown.te.modal", (t2) => {
      d2.find(cs, t2.target).forEach((e2) => {
        const i2 = V2.getInstance(e2.parentNode);
        i2 && i2.update();
      }), d2.find(hs, t2.target).forEach((e2) => {
        const i2 = V2.getInstance(e2.parentNode);
        i2 && i2.update();
      });
    }), c2.on(window, "shown.te.dropdown", (t2) => {
      const e2 = t2.target.parentNode.querySelector("[data-te-dropdown-menu-ref]");
      e2 && (d2.find(cs, e2).forEach((i2) => {
        const n2 = V2.getInstance(i2.parentNode);
        n2 && n2.update();
      }), d2.find(hs, e2).forEach((i2) => {
        const n2 = V2.getInstance(i2.parentNode);
        n2 && n2.update();
      }));
    }), c2.on(window, "shown.te.tab", (t2) => {
      let e2;
      t2.target.href ? e2 = t2.target.href.split("#")[1] : e2 = h2.getDataAttribute(t2.target, "target").split("#")[1];
      const i2 = d2.findOne(`#${e2}`);
      d2.find(cs, i2).forEach((n2) => {
        const o2 = V2.getInstance(n2.parentNode);
        o2 && o2.update();
      }), d2.find(hs, i2).forEach((n2) => {
        const o2 = V2.getInstance(n2.parentNode);
        o2 && o2.update();
      });
    }), c2.on(window, "reset", (t2) => {
      d2.find(cs, t2.target).forEach((e2) => {
        const i2 = V2.getInstance(e2.parentNode);
        i2 && i2.forceInactive();
      }), d2.find(hs, t2.target).forEach((e2) => {
        const i2 = V2.getInstance(e2.parentNode);
        i2 && i2.forceInactive();
      });
    }), c2.on(window, "onautocomplete", (t2) => {
      const e2 = V2.getInstance(t2.target.parentNode);
      !e2 || !t2.cancelable || e2.forceActive();
    });
  }
  _showCounter() {
    if (d2.find(`[${Ma}]`, this._element).length > 0)
      return;
    this._counterElement = document.createElement("div"), h2.addClass(this._counterElement, this._classes.counter), this._counterElement.setAttribute(Ma, "");
    const e2 = this.input.value.length;
    this._counterElement.innerHTML = `${e2} / ${this._maxLength}`, this._helper.appendChild(this._counterElement), this._bindCounter();
  }
  _bindCounter() {
    c2.on(this.input, "input", () => {
      const t2 = this.input.value.length;
      this._counterElement.innerHTML = `${t2} / ${this._maxLength}`;
    });
  }
  _toggleDefaultDatePlaceholder(t2 = this.input) {
    if (!(t2.getAttribute("type") === "date"))
      return;
    !(document.activeElement === t2) && !t2.value ? t2.style.opacity = 0 : t2.style.opacity = 1;
  }
  _showPlaceholder() {
    this.input.setAttribute(vf, "");
  }
  _getNotchData() {
    this._notchMiddle = d2.findOne(Pa, this._element), this._notchLeading = d2.findOne(Ra, this._element);
  }
  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }
  _getLabelPositionInInputGroup() {
    if (this._labelMarginLeft = 0, !this._element.hasAttribute("data-te-input-group-ref"))
      return;
    const t2 = this.input, e2 = d2.prev(t2, "[data-te-input-group-text-ref]")[0];
    e2 === undefined ? this._labelMarginLeft = 0 : this._labelMarginLeft = e2.offsetWidth - 1;
  }
  _applyDivs() {
    const t2 = this._config.inputFormWhite ? this._classes.notchLeadingWhite : this._classes.notchLeadingNormal, e2 = this._config.inputFormWhite ? this._classes.notchMiddleWhite : this._classes.notchMiddleNormal, i2 = this._config.inputFormWhite ? this._classes.notchTrailingWhite : this._classes.notchTrailingNormal, n2 = d2.find(Ie2, this._element), o2 = $2("div");
    h2.addClass(o2, this._classes.notch), o2.setAttribute(hh, ""), this._notchLeading = $2("div"), h2.addClass(this._notchLeading, `${this._classes.notchLeading} ${t2}`), this._notchLeading.setAttribute(dh, ""), this._notchMiddle = $2("div"), h2.addClass(this._notchMiddle, `${this._classes.notchMiddle} ${e2}`), this._notchMiddle.setAttribute(uh, ""), this._notchTrailing = $2("div"), h2.addClass(this._notchTrailing, `${this._classes.notchTrailing} ${i2}`), this._notchTrailing.setAttribute(gf, ""), !(n2.length >= 1) && (o2.append(this._notchLeading), o2.append(this._notchMiddle), o2.append(this._notchTrailing), this._element.append(o2));
  }
  _applyNotch() {
    this._notchMiddle.style.width = `${this._labelWidth}px`, this._notchLeading.style.width = `${this._labelMarginLeft + 9}px`, this._label !== null && (this._label.style.marginLeft = `${this._labelMarginLeft}px`);
  }
  _removeBorder() {
    const t2 = d2.findOne(Ie2, this._element);
    t2 && t2.remove();
  }
  _activate(t2) {
    gc(() => {
      this._getElements(t2);
      const e2 = t2 ? t2.target : this.input, i2 = d2.findOne(Ie2, this._element);
      t2 && t2.type === "focus" && i2 && i2.setAttribute(Na, ""), e2.value !== "" && (e2.setAttribute(Yt2, ""), i2 && i2.setAttribute(Yt2, "")), this._toggleDefaultDatePlaceholder(e2);
    });
  }
  _getElements(t2) {
    if (t2 && (this._element = t2.target.parentNode, this._label = d2.findOne("label", this._element)), t2 && this._label) {
      const e2 = this._labelWidth;
      this._getLabelData(), e2 !== this._labelWidth && (this._notchMiddle = d2.findOne(Pa, t2.target.parentNode), this._notchLeading = d2.findOne(Ra, t2.target.parentNode), this._applyNotch());
    }
  }
  _deactivate(t2) {
    const e2 = t2 ? t2.target : this.input, i2 = d2.findOne(Ie2, e2.parentNode);
    i2.removeAttribute(Na), e2.value === "" && (e2.removeAttribute(Yt2), i2.removeAttribute(Yt2)), this._toggleDefaultDatePlaceholder(e2);
  }
  static activate(t2) {
    return function(e2) {
      t2._activate(e2);
    };
  }
  static deactivate(t2) {
    return function(e2) {
      t2._deactivate(e2);
    };
  }
  static jQueryInterface(t2, e2) {
    return this.each(function() {
      let i2 = A2.getData(this, ls);
      const n2 = typeof t2 == "object" && t2;
      if (!(!i2 && /dispose/.test(t2)) && (i2 || (i2 = new V2(this, n2)), typeof t2 == "string")) {
        if (typeof i2[t2] > "u")
          throw new TypeError(`No method named "${t2}"`);
        i2[t2](e2);
      }
    });
  }
  static getInstance(t2) {
    return A2.getData(t2, ls);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var kf = {
  property: "color",
  defaultValue: null,
  inherit: true
};
var De2 = (s2, t2) => {
  const { property: e2, defaultValue: i2, inherit: n2 } = { ...kf, ...t2 }, o2 = document.createElement("div");
  o2.classList.add(s2), document.body.appendChild(o2);
  const a2 = window.getComputedStyle(o2)[e2] || i2, p2 = window.getComputedStyle(o2.parentElement)[e2];
  return document.body.removeChild(o2), !n2 && p2 && a2 === p2 ? i2 : a2 || i2;
};
var eo = "ripple";
var ds = "te.ripple";
var xf = "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%";
var Of = ["[data-te-ripple-init]"];
var us = [0, 0, 0];
var Sf = [
  {
    name: "primary",
    gradientColor: De2("text-primary", { defaultValue: "#3B71CA", inherit: false })
  },
  {
    name: "secondary",
    gradientColor: De2("text-secondary", { defaultValue: "#9FA6B2", inherit: false })
  },
  {
    name: "success",
    gradientColor: De2("text-success", { defaultValue: "#14A44D", inherit: false })
  },
  {
    name: "danger",
    gradientColor: De2("text-danger", { defaultValue: "#DC4C64", inherit: false })
  },
  {
    name: "warning",
    gradientColor: De2("text-warning", { defaultValue: "#E4A11B", inherit: false })
  },
  {
    name: "info",
    gradientColor: De2("text-info", { defaultValue: "#54B4D3", inherit: false })
  },
  {
    name: "light",
    gradientColor: "#fbfbfb"
  },
  {
    name: "dark",
    gradientColor: "#262626"
  }
];
var Ha = 0.5;
var If = {
  rippleCentered: false,
  rippleColor: "",
  rippleColorDark: "",
  rippleDuration: "500ms",
  rippleRadius: 0,
  rippleUnbound: false
};
var Df = {
  rippleCentered: "boolean",
  rippleColor: "string",
  rippleColorDark: "string",
  rippleDuration: "string",
  rippleRadius: "number",
  rippleUnbound: "boolean"
};
var $f = {
  ripple: "relative overflow-hidden inline-block align-bottom",
  rippleWave: "rounded-[50%] opacity-50 pointer-events-none absolute touch-none scale-0 transition-[transform,_opacity] ease-[cubic-bezier(0,0,0.15,1),_cubic-bezier(0,0,0.15,1)] z-[999]",
  unbound: "overflow-visible"
};
var Lf = {
  ripple: "string",
  rippleWave: "string",
  unbound: "string"
};

class ei {
  constructor(t2, e2, i2) {
    this._element = t2, this._options = this._getConfig(e2), this._classes = this._getClasses(i2), this._element && (A2.setData(t2, ds, this), h2.addClass(this._element, this._classes.ripple)), this._clickHandler = this._createRipple.bind(this), this._rippleTimer = null, this._isMinWidthSet = false, this._initialClasses = null, this.init();
  }
  static get NAME() {
    return eo;
  }
  init() {
    this._addClickEvent(this._element);
  }
  dispose() {
    A2.removeData(this._element, ds), c2.off(this._element, "click", this._clickHandler), this._element = null, this._options = null;
  }
  _autoInit(t2) {
    Of.forEach((e2) => {
      d2.closest(t2.target, e2) && (this._element = d2.closest(t2.target, e2));
    }), this._element.style.minWidth || (h2.style(this._element, {
      "min-width": getComputedStyle(this._element).width
    }), this._isMinWidthSet = true), this._options = this._getConfig(), this._classes = this._getClasses(), this._initialClasses = [...this._element.classList], h2.addClass(this._element, this._classes.ripple), this._createRipple(t2);
  }
  _addClickEvent(t2) {
    c2.on(t2, "mousedown", this._clickHandler);
  }
  _createRipple(t2) {
    this._element.className.indexOf(this._classes.ripple) < 0 && h2.addClass(this._element, this._classes.ripple);
    const { layerX: e2, layerY: i2 } = t2, n2 = t2.offsetX || e2, o2 = t2.offsetY || i2, r2 = this._element.offsetHeight, a2 = this._element.offsetWidth, l2 = this._durationToMsNumber(this._options.rippleDuration), p2 = {
      offsetX: this._options.rippleCentered ? r2 / 2 : n2,
      offsetY: this._options.rippleCentered ? a2 / 2 : o2,
      height: r2,
      width: a2
    }, u2 = this._getDiameter(p2), _2 = this._options.rippleRadius || u2 / 2, f2 = {
      delay: l2 * Ha,
      duration: l2 - l2 * Ha
    }, g2 = {
      left: this._options.rippleCentered ? `${a2 / 2 - _2}px` : `${n2 - _2}px`,
      top: this._options.rippleCentered ? `${r2 / 2 - _2}px` : `${o2 - _2}px`,
      height: `${this._options.rippleRadius * 2 || u2}px`,
      width: `${this._options.rippleRadius * 2 || u2}px`,
      transitionDelay: `0s, ${f2.delay}ms`,
      transitionDuration: `${l2}ms, ${f2.duration}ms`
    }, m2 = $2("div");
    this._createHTMLRipple({
      wrapper: this._element,
      ripple: m2,
      styles: g2
    }), this._removeHTMLRipple({ ripple: m2, duration: l2 });
  }
  _createHTMLRipple({ wrapper: t2, ripple: e2, styles: i2 }) {
    Object.keys(i2).forEach((n2) => e2.style[n2] = i2[n2]), h2.addClass(e2, this._classes.rippleWave), e2.setAttribute("data-te-ripple-ref", ""), this._addColor(e2, t2), this._toggleUnbound(t2), this._appendRipple(e2, t2);
  }
  _removeHTMLRipple({ ripple: t2, duration: e2 }) {
    this._rippleTimer && (clearTimeout(this._rippleTimer), this._rippleTimer = null), t2 && setTimeout(() => {
      t2.classList.add("!opacity-0");
    }, 10), this._rippleTimer = setTimeout(() => {
      if (t2 && (t2.remove(), this._element)) {
        d2.find("[data-te-ripple-ref]", this._element).forEach((n2) => {
          n2.remove();
        }), this._isMinWidthSet && (h2.style(this._element, { "min-width": "" }), this._isMinWidthSet = false);
        const i2 = this._initialClasses ? this._addedNewRippleClasses(this._classes.ripple, this._initialClasses) : this._classes.ripple.split(" ");
        h2.removeClass(this._element, i2);
      }
    }, e2);
  }
  _addedNewRippleClasses(t2, e2) {
    return t2.split(" ").filter((i2) => e2.findIndex((n2) => i2 === n2) === -1);
  }
  _durationToMsNumber(t2) {
    return Number(t2.replace("ms", "").replace("s", "000"));
  }
  _getConfig(t2 = {}) {
    const e2 = h2.getDataAttributes(this._element);
    return t2 = {
      ...If,
      ...e2,
      ...t2
    }, I2(eo, t2, Df), t2;
  }
  _getClasses(t2 = {}) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...$f,
      ...e2,
      ...t2
    }, I2(eo, t2, Lf), t2;
  }
  _getDiameter({ offsetX: t2, offsetY: e2, height: i2, width: n2 }) {
    const o2 = e2 <= i2 / 2, r2 = t2 <= n2 / 2, a2 = (f2, g2) => Math.sqrt(f2 ** 2 + g2 ** 2), l2 = e2 === i2 / 2 && t2 === n2 / 2, p2 = {
      first: o2 === true && r2 === false,
      second: o2 === true && r2 === true,
      third: o2 === false && r2 === true,
      fourth: o2 === false && r2 === false
    }, u2 = {
      topLeft: a2(t2, e2),
      topRight: a2(n2 - t2, e2),
      bottomLeft: a2(t2, i2 - e2),
      bottomRight: a2(n2 - t2, i2 - e2)
    };
    let _2 = 0;
    return l2 || p2.fourth ? _2 = u2.topLeft : p2.third ? _2 = u2.topRight : p2.second ? _2 = u2.bottomRight : p2.first && (_2 = u2.bottomLeft), _2 * 2;
  }
  _appendRipple(t2, e2) {
    e2.appendChild(t2), setTimeout(() => {
      h2.addClass(t2, "opacity-0 scale-100");
    }, 50);
  }
  _toggleUnbound(t2) {
    this._options.rippleUnbound === true ? h2.addClass(t2, this._classes.unbound) : h2.removeClass(t2, this._classes.unbound);
  }
  _addColor(t2) {
    let e2 = this._options.rippleColor || "rgb(0,0,0)";
    (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) && (e2 = this._options.rippleColorDark || this._options.rippleColor);
    const i2 = Sf.find((r2) => r2.name === e2.toLowerCase()), n2 = i2 ? this._colorToRGB(i2.gradientColor).join(",") : this._colorToRGB(e2).join(","), o2 = xf.split("{{color}}").join(`${n2}`);
    t2.style.backgroundImage = `radial-gradient(circle, ${o2})`;
  }
  _colorToRGB(t2) {
    function e2(o2) {
      return o2.length < 7 && (o2 = `#${o2[1]}${o2[1]}${o2[2]}${o2[2]}${o2[3]}${o2[3]}`), [
        parseInt(o2.substr(1, 2), 16),
        parseInt(o2.substr(3, 2), 16),
        parseInt(o2.substr(5, 2), 16)
      ];
    }
    function i2(o2) {
      const r2 = document.body.appendChild(document.createElement("fictum")), a2 = "rgb(1, 2, 3)";
      return r2.style.color = a2, r2.style.color !== a2 || (r2.style.color = o2, r2.style.color === a2 || r2.style.color === "") ? us : (o2 = getComputedStyle(r2).color, document.body.removeChild(r2), o2);
    }
    function n2(o2) {
      return o2 = o2.match(/[.\d]+/g).map((r2) => +Number(r2)), o2.length = 3, o2;
    }
    return t2.toLowerCase() === "transparent" ? us : t2[0] === "#" ? e2(t2) : (t2.indexOf("rgb") === -1 && (t2 = i2(t2)), t2.indexOf("rgb") === 0 ? n2(t2) : us);
  }
  static autoInitial(t2) {
    return function(e2) {
      t2._autoInit(e2);
    };
  }
  static jQueryInterface(t2) {
    return this.each(function() {
      return A2.getData(this, ds) ? null : new ei(this, t2);
    });
  }
  static getInstance(t2) {
    return A2.getData(t2, ds);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var Wf = "data-te-datepicker-modal-container-ref";
var Ff = "data-te-datepicker-dropdown-container-ref";
var Yf = "data-te-dropdown-backdrop-ref";
var jf = "data-te-datepicker-date-text-ref";
var Wa = "data-te-datepicker-view-ref";
var Kf = "data-te-datepicker-previous-button-ref";
var zf = "data-te-datepicker-next-button-ref";
var Uf = "data-te-datepicker-ok-button-ref";
var Xf = "data-te-datepicker-cancel-button-ref";
var Gf = "data-te-datepicker-clear-button-ref";
var qf = "data-te-datepicker-view-change-button-ref";
var Ke2 = 37;
var U2 = 38;
var ze2 = 39;
var z2 = 40;
var Te2 = 36;
var Ee2 = 35;
var io = 33;
var so = 34;
var it2 = 13;
var Zs = 32;
var we2 = 27;
var ke2 = 9;
var Tt2 = 24;
var ps = 4;
var _s = 4;
var no = "datepicker";
var Qs = "te.datepicker";
var En = `.${Qs}`;
var am = ".data-api";
var lm = `close${En}`;
var cm = `open${En}`;
var hm = `dateChange${En}`;
var fs = `click${En}${am}`;
var fh = "data-te-datepicker-modal-container-ref";
var mh = "data-te-datepicker-dropdown-container-ref";
var ms = "[data-te-datepicker-toggle-ref]";
var dm = `[${fh}]`;
var um = `[${mh}]`;
var pm = "[data-te-datepicker-view-change-button-ref]";
var _m = "[data-te-datepicker-previous-button-ref]";
var fm = "[data-te-datepicker-next-button-ref]";
var mm = "[data-te-datepicker-ok-button-ref]";
var gm = "[data-te-datepicker-cancel-button-ref]";
var bm = "[data-te-datepicker-clear-button-ref]";
var vm = "[data-te-datepicker-view-ref]";
var Tm = "[data-te-datepicker-toggle-button-ref]";
var Em = "[data-te-datepicker-date-text-ref]";
var Cm = "[data-te-dropdown-backdrop-ref]";
var Am = "animate-[fade-in_0.3s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var ym = "animate-[fade-out_0.3s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var wm = "animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var km = "animate-[fade-out_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var xm = "flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[328px] h-[512px] bg-white rounded-[0.6rem] shadow-lg z-[1066] xs:max-md:landscape:w-[475px] xs:max-md:landscape:h-[360px] xs:max-md:landscape:flex-row dark:bg-zinc-700";
var Om = "w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-[1065]";
var Sm = "relative h-full";
var Im = "xs:max-md:landscape:h-full h-[120px] px-6 bg-primary flex flex-col rounded-t-lg dark:bg-zinc-800";
var Dm = "h-8 flex flex-col justify-end";
var $m = "text-[10px] font-normal uppercase tracking-[1.7px] text-white";
var Lm = "xs:max-md:landscape:mt-24 h-[72px] flex flex-col justify-end";
var Nm = "text-[34px] font-normal text-white";
var Mm = "outline-none px-3";
var Rm = "px-3 pt-2.5 pb-0 flex justify-between text-black/[64]";
var Pm = "flex items-center outline-none p-2.5 text-neutral-500 font-medium text-[0.9rem] rounded-xl shadow-none bg-transparent m-0 border-none hover:bg-neutral-200 focus:bg-neutral-200  dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10";
var Bm = "mt-2.5";
var Hm = "p-0 w-10 h-10 leading-10 border-none outline-none m-0 text-gray-600 bg-transparent mr-6 hover:bg-neutral-200 hover:rounded-[50%] focus:bg-neutral-200 focus:rounded-[50%] dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:mx-auto";
var Vm = "p-0 w-10 h-10 leading-10 border-none outline-none m-0 text-gray-600 bg-transparent hover:bg-neutral-200 hover:rounded-[50%] focus:bg-neutral-200 focus:rounded-[50%] dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:rotate-180 [&>svg]:mx-auto";
var Wm = "h-14 flex absolute w-full bottom-0 justify-end items-center px-3";
var Fm = "outline-none bg-white text-primary border-none cursor-pointer py-0 px-2.5 uppercase text-[0.8rem] leading-10 font-medium h-10 tracking-[.1rem] rounded-[10px] mb-2.5 hover:bg-neutral-200 focus:bg-neutral-200 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10";
var Ym = "mr-auto";
var jm = "w-10 h-10 text-center text-[12px] font-normal dark:text-white";
var Km = "text-center data-[te-datepicker-cell-disabled]:text-neutral-300 data-[te-datepicker-cell-disabled]:cursor-default data-[te-datepicker-cell-disabled]:pointer-events-none data-[te-datepicker-cell-disabled]:hover:cursor-default hover:cursor-pointer group";
var zm = "w-10 h-10 xs:max-md:landscape:w-8 xs:max-md:landscape:h-8";
var Um = "w-[76px] h-[42px]";
var Xm = "mx-auto group-[:not([data-te-datepicker-cell-disabled]):not([data-te-datepicker-cell-selected]):hover]:bg-neutral-300 group-[[data-te-datepicker-cell-selected]]:bg-primary group-[[data-te-datepicker-cell-selected]]:text-white group-[:not([data-te-datepicker-cell-selected])[data-te-datepicker-cell-focused]]:bg-neutral-100 group-[[data-te-datepicker-cell-focused]]:data-[te-datepicker-cell-selected]:bg-primary group-[[data-te-datepicker-cell-current]]:border-solid group-[[data-te-datepicker-cell-current]]:border-black group-[[data-te-datepicker-cell-current]]:border dark:group-[:not([data-te-datepicker-cell-disabled]):not([data-te-datepicker-cell-selected]):hover]:bg-white/10 dark:group-[[data-te-datepicker-cell-current]]:border-white dark:text-white dark:group-[:not([data-te-datepicker-cell-selected])[data-te-datepicker-cell-focused]]:bg-white/10 dark:group-[[data-te-datepicker-cell-disabled]]:text-neutral-500";
var Gm = "w-9 h-9 leading-9 rounded-[50%] text-[13px]";
var qm = "w-[72px] h-10 leading-10 py-[1px] px-0.5 rounded-[999px]";
var Zm = "mx-auto w-[304px]";
var Qm = "flex items-center justify-content-center [&>svg]:w-5 [&>svg]:h-5 absolute outline-none border-none bg-transparent right-0.5 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:text-primary focus:text-primary dark:hover:text-primary-400 dark:focus:text-primary-400 dark:text-neutral-200";
var Jm = "inline-block pointer-events-none ml-[3px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:fill-neutral-500 dark:[&>svg]:fill-white";
var tg = "w-[328px] h-[380px] bg-white rounded-lg shadow-[0px_2px_15px_-3px_rgba(0,0,0,.07),_0px_10px_20px_-2px_rgba(0,0,0,.04)] z-[1066] dark:bg-zinc-700";
var eg = {
  title: "Select date",
  container: "body",
  disablePast: false,
  disableFuture: false,
  monthsFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  weekdaysFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysNarrow: ["S", "M", "T", "W", "T", "F", "S"],
  okBtnText: "Ok",
  clearBtnText: "Clear",
  cancelBtnText: "Cancel",
  okBtnLabel: "Confirm selection",
  clearBtnLabel: "Clear selection",
  cancelBtnLabel: "Cancel selection",
  nextMonthLabel: "Next month",
  prevMonthLabel: "Previous month",
  nextYearLabel: "Next year",
  prevYearLabel: "Previous year",
  changeMonthIconTemplate: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
  `,
  nextMultiYearLabel: "Next 24 years",
  prevMultiYearLabel: "Previous 24 years",
  switchToMultiYearViewLabel: "Choose year and month",
  switchToMonthViewLabel: "Choose date",
  switchToDayViewLabel: "Choose date",
  startDate: null,
  startDay: 0,
  format: "dd/mm/yyyy",
  view: "days",
  viewChangeIconTemplate: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
  `,
  min: null,
  max: null,
  filter: null,
  inline: false,
  toggleButton: true,
  disableToggleButton: false,
  disableInput: false,
  animations: true,
  confirmDateOnSelect: false,
  removeOkBtn: false,
  removeCancelBtn: false,
  removeClearBtn: false
};
var ig = {
  title: "string",
  container: "string",
  disablePast: "boolean",
  disableFuture: "boolean",
  monthsFull: "array",
  monthsShort: "array",
  weekdaysFull: "array",
  weekdaysShort: "array",
  weekdaysNarrow: "array",
  okBtnText: "string",
  clearBtnText: "string",
  cancelBtnText: "string",
  okBtnLabel: "string",
  clearBtnLabel: "string",
  cancelBtnLabel: "string",
  nextMonthLabel: "string",
  prevMonthLabel: "string",
  nextYearLabel: "string",
  prevYearLabel: "string",
  nextMultiYearLabel: "string",
  prevMultiYearLabel: "string",
  changeMonthIconTemplate: "string",
  switchToMultiYearViewLabel: "string",
  switchToMonthViewLabel: "string",
  switchToDayViewLabel: "string",
  startDate: "(null|string|date)",
  startDay: "number",
  format: "string",
  view: "string",
  viewChangeIconTemplate: "string",
  min: "(null|string|date)",
  max: "(null|string|date)",
  filter: "(null|function)",
  inline: "boolean",
  toggleButton: "boolean",
  disableToggleButton: "boolean",
  disableInput: "boolean",
  animations: "boolean",
  confirmDateOnSelect: "boolean",
  removeOkBtn: "boolean",
  removeCancelBtn: "boolean",
  removeClearBtn: "boolean"
};
var sg = {
  fadeIn: Am,
  fadeOut: ym,
  fadeInShort: wm,
  fadeOutShort: km,
  modalContainer: xm,
  datepickerBackdrop: Om,
  datepickerMain: Sm,
  datepickerHeader: Im,
  datepickerTitle: Dm,
  datepickerTitleText: $m,
  datepickerDate: Lm,
  datepickerDateText: Nm,
  datepickerView: Mm,
  datepickerDateControls: Rm,
  datepickerViewChangeButton: Pm,
  datepickerViewChangeIcon: Jm,
  datepickerArrowControls: Bm,
  datepickerPreviousButton: Hm,
  datepickerNextButton: Vm,
  datepickerFooter: Wm,
  datepickerFooterBtn: Fm,
  datepickerClearBtn: Ym,
  datepickerDayHeading: jm,
  datepickerCell: Km,
  datepickerCellSmall: zm,
  datepickerCellLarge: Um,
  datepickerCellContent: Xm,
  datepickerCellContentSmall: Gm,
  datepickerCellContentLarge: qm,
  datepickerTable: Zm,
  datepickerToggleButton: Qm,
  datepickerDropdownContainer: tg
};
var ng = {
  fadeIn: "string",
  fadeOut: "string",
  fadeInShort: "string",
  fadeOutShort: "string",
  modalContainer: "string",
  datepickerBackdrop: "string",
  datepickerMain: "string",
  datepickerHeader: "string",
  datepickerTitle: "string",
  datepickerTitleText: "string",
  datepickerDate: "string",
  datepickerDateText: "string",
  datepickerView: "string",
  datepickerDateControls: "string",
  datepickerViewChangeButton: "string",
  datepickerArrowControls: "string",
  datepickerPreviousButton: "string",
  datepickerNextButton: "string",
  datepickerFooter: "string",
  datepickerFooterBtn: "string",
  datepickerClearBtn: "string",
  datepickerDayHeading: "string",
  datepickerCell: "string",
  datepickerCellSmall: "string",
  datepickerCellLarge: "string",
  datepickerCellContent: "string",
  datepickerCellContentSmall: "string",
  datepickerCellContentLarge: "string",
  datepickerTable: "string",
  datepickerToggleButton: "string",
  datepickerDropdownContainer: "string"
};

class og {
  constructor(t2, e2, i2) {
    this._element = t2, this._input = d2.findOne("input", this._element), this._options = this._getConfig(e2), this._classes = this._getClasses(i2), this._activeDate = new Date, this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this._headerDate = null, this._headerYear = null, this._headerMonth = null, this._view = this._options.view, this._popper = null, this._focusTrap = null, this._isOpen = false, this._toggleButtonId = et2("datepicker-toggle-"), this._animations = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && this._options.animations, this._scrollBar = new ti, this._element && A2.setData(t2, Qs, this), this._init(), this.toggleButton && this._options.disableToggle && (this.toggleButton.disabled = "true"), this._options.disableInput && (this._input.disabled = "true");
  }
  static get NAME() {
    return no;
  }
  get container() {
    return d2.findOne(`[${fh}='${this._toggleButtonId}']`) || d2.findOne(`[${mh}='${this._toggleButtonId}']`);
  }
  get options() {
    return this._options;
  }
  get activeCell() {
    let t2;
    return this._view === "days" && (t2 = this._getActiveDayCell()), this._view === "months" && (t2 = this._getActiveMonthCell()), this._view === "years" && (t2 = this._getActiveYearCell()), t2;
  }
  get activeDay() {
    return tt2(this._activeDate);
  }
  get activeMonth() {
    return Y2(this._activeDate);
  }
  get activeYear() {
    return B2(this._activeDate);
  }
  get firstYearInView() {
    return this.activeYear - Us(this._activeDate, Tt2);
  }
  get lastYearInView() {
    return this.firstYearInView + Tt2 - 1;
  }
  get viewChangeButton() {
    return d2.findOne(pm, this.container);
  }
  get previousButton() {
    return d2.findOne(_m, this.container);
  }
  get nextButton() {
    return d2.findOne(fm, this.container);
  }
  get okButton() {
    return d2.findOne(mm, this.container);
  }
  get cancelButton() {
    return d2.findOne(gm, this.container);
  }
  get clearButton() {
    return d2.findOne(bm, this.container);
  }
  get datesContainer() {
    return d2.findOne(vm, this.container);
  }
  get toggleButton() {
    return d2.findOne(Tm, this._element);
  }
  update(t2 = {}) {
    this._options = this._getConfig({ ...this._options, ...t2 });
  }
  _getConfig(t2) {
    const e2 = h2.getDataAttributes(this._element);
    if (t2 = {
      ...eg,
      ...e2,
      ...t2
    }, I2(no, t2, ig), t2.max && typeof t2.max == "string" && (t2.max = new Date(t2.max)), t2.min && typeof t2.min == "string" && (t2.min = new Date(t2.min)), t2.startDay && t2.startDay !== 0) {
      const i2 = this._getNewDaysOrderArray(t2);
      t2.weekdaysNarrow = i2;
    }
    return t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...sg,
      ...e2,
      ...t2
    }, I2(no, t2, ng), t2;
  }
  _getContainer() {
    return d2.findOne(this._options.container);
  }
  _getNewDaysOrderArray(t2) {
    const { startDay: e2, weekdaysNarrow: i2 } = t2;
    return i2.slice(e2).concat(i2.slice(0, e2));
  }
  _init() {
    !this.toggleButton && this._options.toggleButton && (this._appendToggleButton(), (this._input.readOnly || this._input.disabled) && (this.toggleButton.style.pointerEvents = "none")), this._listenToUserInput(), this._listenToToggleClick(), this._listenToToggleKeydown();
  }
  _appendToggleButton() {
    const t2 = nm(this._toggleButtonId, this._classes.datepickerToggleButton);
    this._element.insertAdjacentHTML("beforeend", t2);
  }
  open() {
    if (this._input.readOnly || this._input.disabled)
      return;
    const t2 = c2.trigger(this._element, cm);
    if (this._isOpen || t2.defaultPrevented)
      return;
    this._setInitialDate();
    const e2 = Qf(this._classes.datepickerBackdrop), i2 = Zf(this._activeDate, this._selectedDate, this._selectedYear, this._selectedMonth, this._options, _s, Tt2, ps, this._toggleButtonId, this._classes);
    this._options.inline ? this._openDropdown(i2) : (this._openModal(e2, i2), this._scrollBar.hide()), this._animations && (h2.addClass(this.container, this._classes.fadeIn), h2.addClass(e2, this._classes.fadeInShort)), this._setFocusTrap(this.container), this._listenToDateSelection(), this._addControlsListeners(), this._updateControlsDisabledState(), this._listenToEscapeClick(), this._listenToKeyboardNavigation(), this._listenToDatesContainerFocus(), this._listenToDatesContainerBlur(), this._asyncFocusDatesContainer(), this._updateViewControlsAndAttributes(this._view), this._isOpen = true, setTimeout(() => {
      this._listenToOutsideClick();
    }, 0);
  }
  _openDropdown(t2) {
    this._popper = se2(this._input, t2, {
      placement: "bottom-start"
    }), this._getContainer().appendChild(t2);
  }
  _openModal(t2, e2) {
    const i2 = this._getContainer();
    i2.appendChild(t2), i2.appendChild(e2);
  }
  _setFocusTrap(t2) {
    this._focusTrap = new zi(t2, {
      event: "keydown",
      condition: (e2) => e2.key === "Tab"
    }), this._focusTrap.trap();
  }
  _listenToUserInput() {
    c2.on(this._input, "input", (t2) => {
      this._handleUserInput(t2.target.value);
    });
  }
  _listenToToggleClick() {
    c2.on(this._element, fs, ms, (t2) => {
      t2.preventDefault(), this.open();
    });
  }
  _listenToToggleKeydown() {
    c2.on(this._element, "keydown", ms, (t2) => {
      t2.keyCode === it2 && !this._isOpen && this.open();
    });
  }
  _listenToDateSelection() {
    c2.on(this.datesContainer, "click", (t2) => {
      this._handleDateSelection(t2);
    });
  }
  _handleDateSelection(t2) {
    const e2 = t2.target.nodeName === "DIV" ? t2.target.parentNode.dataset : t2.target.dataset, i2 = t2.target.nodeName === "DIV" ? t2.target.parentNode : t2.target;
    if (e2.teDate && this._pickDay(e2.teDate, i2), e2.teMonth && e2.teYear) {
      const n2 = parseInt(e2.teMonth, 10), o2 = parseInt(e2.teYear, 10);
      this._pickMonth(n2, o2);
    }
    if (e2.teYear && !e2.teMonth) {
      const n2 = parseInt(e2.teYear, 10);
      this._pickYear(n2);
    }
    this._options.inline || this._updateHeaderDate(this._activeDate, this._options.monthsShort, this._options.weekdaysShort);
  }
  _updateHeaderDate(t2, e2, i2) {
    const n2 = d2.findOne(Em, this.container), o2 = Y2(t2), r2 = tt2(t2), a2 = zs(t2);
    n2.innerHTML = `${i2[a2]}, ${e2[o2]} ${r2}`;
  }
  _addControlsListeners() {
    c2.on(this.nextButton, "click", () => {
      this._view === "days" ? this.nextMonth() : this._view === "years" ? this.nextYears() : this.nextYear(), this._updateControlsDisabledState();
    }), c2.on(this.previousButton, "click", () => {
      this._view === "days" ? this.previousMonth() : this._view === "years" ? this.previousYears() : this.previousYear(), this._updateControlsDisabledState();
    }), c2.on(this.viewChangeButton, "click", () => {
      this._view === "days" ? this._changeView("years") : (this._view === "years" || this._view === "months") && this._changeView("days");
    }), this._options.inline || this._listenToFooterButtonsClick();
  }
  _listenToFooterButtonsClick() {
    c2.on(this.okButton, "click", () => this.handleOk()), c2.on(this.cancelButton, "click", () => this.handleCancel()), c2.on(this.clearButton, "click", () => this.handleClear());
  }
  _listenToOutsideClick() {
    c2.on(document, fs, (t2) => {
      const e2 = t2.target === this.container, i2 = this.container && this.container.contains(t2.target);
      !e2 && !i2 && this.close();
    });
  }
  _listenToEscapeClick() {
    c2.on(document, "keydown", (t2) => {
      t2.keyCode === we2 && this._isOpen && this.close();
    });
  }
  _listenToKeyboardNavigation() {
    c2.on(this.datesContainer, "keydown", (t2) => {
      this._handleKeydown(t2);
    });
  }
  _listenToDatesContainerFocus() {
    c2.on(this.datesContainer, "focus", () => {
      this._focusActiveCell(this.activeCell);
    });
  }
  _listenToDatesContainerBlur() {
    c2.on(this.datesContainer, "blur", () => {
      this._removeCurrentFocusStyles();
    });
  }
  _handleKeydown(t2) {
    this._view === "days" && this._handleDaysViewKeydown(t2), this._view === "months" && this._handleMonthsViewKeydown(t2), this._view === "years" && this._handleYearsViewKeydown(t2);
  }
  _handleDaysViewKeydown(t2) {
    const e2 = this._activeDate, i2 = this.activeCell;
    switch (t2.keyCode) {
      case Ke2:
        this._activeDate = $e2(this._activeDate, W2() ? 1 : -1);
        break;
      case ze2:
        this._activeDate = $e2(this._activeDate, W2() ? -1 : 1);
        break;
      case U2:
        this._activeDate = $e2(this._activeDate, -7);
        break;
      case z2:
        this._activeDate = $e2(this._activeDate, 7);
        break;
      case Te2:
        this._activeDate = $e2(this._activeDate, 1 - tt2(this._activeDate));
        break;
      case Ee2:
        this._activeDate = $e2(this._activeDate, Go(this._activeDate) - tt2(this._activeDate));
        break;
      case io:
        this._activeDate = lt2(this._activeDate, -1);
        break;
      case so:
        this._activeDate = lt2(this._activeDate, 1);
        break;
      case it2:
      case Zs:
        this._selectDate(this._activeDate), this._handleDateSelection(t2), t2.preventDefault();
        return;
      default:
        return;
    }
    Pi(e2, this._activeDate, this._view, Tt2, this._options.min, this._options.max) || this._changeView("days"), this._removeHighlightFromCell(i2), this._focusActiveCell(this.activeCell), t2.preventDefault();
  }
  _asyncFocusDatesContainer() {
    setTimeout(() => {
      this.datesContainer.focus();
    }, 0);
  }
  _focusActiveCell(t2) {
    t2 && t2.setAttribute("data-te-datepicker-cell-focused", "");
  }
  _removeHighlightFromCell(t2) {
    t2 && t2.removeAttribute("data-te-datepicker-cell-focused");
  }
  _getActiveDayCell() {
    const t2 = d2.find("td", this.datesContainer);
    return Array.from(t2).find((i2) => {
      const n2 = Va(i2.dataset.teDate);
      return me2(n2, this._activeDate);
    });
  }
  _handleMonthsViewKeydown(t2) {
    const e2 = this._activeDate, i2 = this.activeCell;
    switch (t2.keyCode) {
      case Ke2:
        this._activeDate = lt2(this._activeDate, W2() ? 1 : -1);
        break;
      case ze2:
        this._activeDate = lt2(this._activeDate, W2() ? -1 : 1);
        break;
      case U2:
        this._activeDate = lt2(this._activeDate, -4);
        break;
      case z2:
        this._activeDate = lt2(this._activeDate, 4);
        break;
      case Te2:
        this._activeDate = lt2(this._activeDate, -this.activeMonth);
        break;
      case Ee2:
        this._activeDate = lt2(this._activeDate, 11 - this.activeMonth);
        break;
      case io:
        this._activeDate = at2(this._activeDate, -1);
        break;
      case so:
        this._activeDate = at2(this._activeDate, 1);
        break;
      case it2:
      case Zs:
        this._selectMonth(this.activeMonth);
        return;
      default:
        return;
    }
    Pi(e2, this._activeDate, this._view, Tt2, this._options.min, this._options.max) || this._changeView("months"), this._removeHighlightFromCell(i2), this._focusActiveCell(this.activeCell), t2.preventDefault();
  }
  _getActiveMonthCell() {
    const t2 = d2.find("td", this.datesContainer);
    return Array.from(t2).find((i2) => {
      const n2 = parseInt(i2.dataset.teYear, 10), o2 = parseInt(i2.dataset.teMonth, 10);
      return n2 === this.activeYear && o2 === this.activeMonth;
    });
  }
  _handleYearsViewKeydown(t2) {
    const e2 = this._activeDate, i2 = this.activeCell, n2 = 4, o2 = 24;
    switch (t2.keyCode) {
      case Ke2:
        this._activeDate = at2(this._activeDate, W2() ? 1 : -1);
        break;
      case ze2:
        this._activeDate = at2(this._activeDate, W2() ? -1 : 1);
        break;
      case U2:
        this._activeDate = at2(this._activeDate, -n2);
        break;
      case z2:
        this._activeDate = at2(this._activeDate, n2);
        break;
      case Te2:
        this._activeDate = at2(this._activeDate, -Us(this._activeDate, o2));
        break;
      case Ee2:
        this._activeDate = at2(this._activeDate, o2 - Us(this._activeDate, o2) - 1);
        break;
      case io:
        this._activeDate = at2(this._activeDate, -o2);
        break;
      case so:
        this._activeDate = at2(this._activeDate, o2);
        break;
      case it2:
      case Zs:
        this._selectYear(this.activeYear);
        return;
      default:
        return;
    }
    Pi(e2, this._activeDate, this._view, Tt2, this._options.min, this._options.max) || this._changeView("years"), this._removeHighlightFromCell(i2), this._focusActiveCell(this.activeCell), t2.preventDefault();
  }
  _getActiveYearCell() {
    const t2 = d2.find("td", this.datesContainer);
    return Array.from(t2).find((i2) => parseInt(i2.dataset.teYear, 10) === this.activeYear);
  }
  _setInitialDate() {
    this._input.value ? this._handleUserInput(this._input.value) : this._options.startDate ? this._activeDate = new Date(this._options.startDate) : this._activeDate = new Date;
  }
  close() {
    const t2 = c2.trigger(this._element, lm);
    !this._isOpen || t2.defaultPrevented || (this._removeDatepickerListeners(), this._animations && h2.addClass(this.container, this._classes.fadeOut), this._options.inline ? this._closeDropdown() : this._closeModal(), this._isOpen = false, this._view = this._options.view, this.toggleButton ? this.toggleButton.focus() : this._input.focus());
  }
  _closeDropdown() {
    const t2 = d2.findOne(um), e2 = this._getContainer();
    window.matchMedia("(prefers-reduced-motion: reduce)").matches && (t2 && e2.removeChild(t2), this._popper && this._popper.destroy()), t2.addEventListener("animationend", () => {
      t2 && e2.removeChild(t2), this._popper && this._popper.destroy();
    }), this._removeFocusTrap();
  }
  _closeModal() {
    const t2 = d2.findOne(Cm), e2 = d2.findOne(dm);
    !e2 || !t2 || (this._animations ? (h2.addClass(t2, this._classes.fadeOutShort), t2.addEventListener("animationend", () => {
      this._removePicker(t2, e2), this._scrollBar.reset();
    })) : (this._removePicker(t2, e2), this._scrollBar.reset()));
  }
  _removePicker(t2, e2) {
    const i2 = this._getContainer();
    i2.removeChild(t2), i2.removeChild(e2);
  }
  _removeFocusTrap() {
    this._focusTrap && (this._focusTrap.disable(), this._focusTrap = null);
  }
  _removeDatepickerListeners() {
    c2.off(this.nextButton, "click"), c2.off(this.previousButton, "click"), c2.off(this.viewChangeButton, "click"), c2.off(this.okButton, "click"), c2.off(this.cancelButton, "click"), c2.off(this.clearButton, "click"), c2.off(this.datesContainer, "click"), c2.off(this.datesContainer, "keydown"), c2.off(this.datesContainer, "focus"), c2.off(this.datesContainer, "blur"), c2.off(document, fs);
  }
  dispose() {
    this._isOpen && this.close(), this._removeInputAndToggleListeners();
    const t2 = d2.findOne(`#${this._toggleButtonId}`);
    t2 && this._element.removeChild(t2), A2.removeData(this._element, Qs), this._element = null, this._input = null, this._options = null, this._activeDate = null, this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this._headerDate = null, this._headerYear = null, this._headerMonth = null, this._view = null, this._popper = null, this._focusTrap = null;
  }
  _removeInputAndToggleListeners() {
    c2.off(this._input, "input"), c2.off(this._element, fs, ms), c2.off(this._element, "keydown", ms);
  }
  handleOk() {
    this._confirmSelection(this._headerDate), this.close();
  }
  _selectDate(t2, e2 = this.activeCell) {
    const { min: i2, max: n2, filter: o2, disablePast: r2, disableFuture: a2 } = this._options;
    _n(t2, i2, n2, o2, r2, a2) || (this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e2), this._selectedDate = t2, this._selectedYear = B2(t2), this._selectedMonth = Y2(t2), this._headerDate = t2, (this._options.inline || this.options.confirmDateOnSelect) && (this._confirmSelection(t2), this.close()));
  }
  _selectYear(t2, e2 = this.activeCell) {
    this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e2), this._headerYear = t2, this._asyncChangeView("months");
  }
  _selectMonth(t2, e2 = this.activeCell) {
    this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e2), this._headerMonth = t2, this._asyncChangeView("days");
  }
  _removeSelectedStyles(t2) {
    t2 && t2.removeAttribute("data-te-datepicker-cell-selected");
  }
  _addSelectedStyles(t2) {
    t2 && t2.setAttribute("data-te-datepicker-cell-selected", "");
  }
  _confirmSelection(t2) {
    if (t2) {
      const e2 = this.formatDate(t2);
      this._input.value = e2, c2.trigger(this._element, hm, { date: t2 }), c2.trigger(this._input, "input");
    }
  }
  handleCancel() {
    this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this.close();
  }
  handleClear() {
    this._selectedDate = null, this._selectedMonth = null, this._selectedYear = null, this._headerDate = null, this._headerMonth = null, this._headerYear = null, this._removeCurrentSelectionStyles(), this._input.value = "", this._setInitialDate(), this._changeView("days"), this._updateHeaderDate(this._activeDate, this._options.monthsShort, this._options.weekdaysShort);
  }
  _removeCurrentSelectionStyles() {
    const t2 = d2.findOne("[data-te-datepicker-cell-selected]", this.container);
    t2 && t2.removeAttribute("data-te-datepicker-cell-selected");
  }
  _removeCurrentFocusStyles() {
    const t2 = d2.findOne("[data-te-datepicker-cell-focused]", this.container);
    t2 && t2.removeAttribute("data-te-datepicker-cell-focused");
  }
  formatDate(t2) {
    const e2 = tt2(t2), i2 = this._addLeadingZero(tt2(t2)), n2 = this._options.weekdaysShort[zs(t2)], o2 = this._options.weekdaysFull[zs(t2)], r2 = Y2(t2) + 1, a2 = this._addLeadingZero(Y2(t2) + 1), l2 = this._options.monthsShort[Y2(t2)], p2 = this._options.monthsFull[Y2(t2)], u2 = B2(t2).toString().length === 2 ? B2(t2) : B2(t2).toString().slice(2, 4), _2 = B2(t2), f2 = this._options.format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
    let g2 = "";
    return f2.forEach((m2) => {
      switch (m2) {
        case "dddd":
          m2 = m2.replace(m2, o2);
          break;
        case "ddd":
          m2 = m2.replace(m2, n2);
          break;
        case "dd":
          m2 = m2.replace(m2, i2);
          break;
        case "d":
          m2 = m2.replace(m2, e2);
          break;
        case "mmmm":
          m2 = m2.replace(m2, p2);
          break;
        case "mmm":
          m2 = m2.replace(m2, l2);
          break;
        case "mm":
          m2 = m2.replace(m2, a2);
          break;
        case "m":
          m2 = m2.replace(m2, r2);
          break;
        case "yyyy":
          m2 = m2.replace(m2, _2);
          break;
        case "yy":
          m2 = m2.replace(m2, u2);
          break;
      }
      g2 += m2;
    }), g2;
  }
  _addLeadingZero(t2) {
    return parseInt(t2, 10) < 10 ? `0${t2}` : t2;
  }
  _pickDay(t2, e2) {
    const i2 = Va(t2), { min: n2, max: o2, filter: r2, disablePast: a2, disableFuture: l2 } = this._options;
    _n(i2, n2, o2, r2, a2, l2) || (this._activeDate = i2, this._selectDate(i2, e2));
  }
  _pickYear(t2) {
    const { min: e2, max: i2, disablePast: n2, disableFuture: o2 } = this._options;
    if (qo(t2, e2, i2, n2, o2))
      return;
    const r2 = Ct2(t2, this.activeMonth, this.activeDay);
    this._activeDate = r2, this._selectedDate = r2, this._selectYear(t2);
  }
  _pickMonth(t2, e2) {
    const { min: i2, max: n2, disablePast: o2, disableFuture: r2 } = this._options;
    if (_h(t2, e2, i2, n2, o2, r2) || qo(e2, i2, n2, o2, r2))
      return;
    const a2 = Ct2(e2, t2, this.activeDay);
    this._activeDate = a2, this._selectMonth(t2);
  }
  nextMonth() {
    const t2 = lt2(this._activeDate, 1), e2 = Xs(t2, this._headerDate, this._options, this._classes);
    this._activeDate = t2, this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.datesContainer.innerHTML = e2;
  }
  previousMonth() {
    const t2 = lt2(this._activeDate, -1);
    this._activeDate = t2;
    const e2 = Xs(t2, this._headerDate, this._options, this._classes);
    this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.datesContainer.innerHTML = e2;
  }
  nextYear() {
    const t2 = at2(this._activeDate, 1);
    this._activeDate = t2, this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes);
    const e2 = Gs(this.activeYear, this._selectedYear, this._selectedMonth, this._options, _s, this._classes);
    this.datesContainer.innerHTML = e2;
  }
  previousYear() {
    const t2 = at2(this._activeDate, -1);
    this._activeDate = t2, this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes);
    const e2 = Gs(this.activeYear, this._selectedYear, this._selectedMonth, this._options, _s, this._classes);
    this.datesContainer.innerHTML = e2;
  }
  nextYears() {
    const t2 = at2(this._activeDate, 24);
    this._activeDate = t2;
    const e2 = qs(t2, this._selectedYear, this._options, Tt2, ps, this._classes);
    this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.datesContainer.innerHTML = e2;
  }
  previousYears() {
    const t2 = at2(this._activeDate, -24);
    this._activeDate = t2;
    const e2 = qs(t2, this._selectedYear, this._options, Tt2, ps, this._classes);
    this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.datesContainer.innerHTML = e2;
  }
  _asyncChangeView(t2) {
    setTimeout(() => {
      this._changeView(t2);
    }, 0);
  }
  _changeView(t2) {
    this._view = t2, this.datesContainer.blur(), t2 === "days" && (this.datesContainer.innerHTML = Xs(this._activeDate, this._headerDate, this._options, this._classes)), t2 === "months" && (this.datesContainer.innerHTML = Gs(this.activeYear, this._selectedYear, this._selectedMonth, this._options, _s, this._classes)), t2 === "years" && (this.datesContainer.innerHTML = qs(this._activeDate, this._selectedYear, this._options, Tt2, ps, this._classes)), this.datesContainer.focus(), this._updateViewControlsAndAttributes(t2), this._updateControlsDisabledState();
  }
  _updateViewControlsAndAttributes(t2) {
    t2 === "days" && (this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToMultiYearViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevMonthLabel), this.nextButton.setAttribute("aria-label", this._options.nextMonthLabel)), t2 === "months" && (this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToDayViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevYearLabel), this.nextButton.setAttribute("aria-label", this._options.nextYearLabel)), t2 === "years" && (this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += Lt2(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToMonthViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevMultiYearLabel), this.nextButton.setAttribute("aria-label", this._options.nextMultiYearLabel));
  }
  _updateControlsDisabledState() {
    Hf(this._options.disableFuture, this._activeDate, this._view, Tt2, this._options.min, this._options.max, this.lastYearInView, this.firstYearInView) ? this.nextButton.disabled = true : this.nextButton.disabled = false, Vf(this._options.disablePast, this._activeDate, this._view, Tt2, this._options.min, this._options.max, this.lastYearInView, this.firstYearInView) ? this.previousButton.disabled = true : this.previousButton.disabled = false;
  }
  _handleUserInput(t2) {
    const e2 = this._getDelimeters(this._options.format), i2 = this._parseDate(t2, this._options.format, e2);
    Rf(i2) ? (this._activeDate = i2, this._selectedDate = i2, this._selectedYear = B2(i2), this._selectedMonth = Y2(i2), this._headerDate = i2) : (this._activeDate = new Date, this._selectedDate = null, this._selectedMonth = null, this._selectedYear = null, this._headerDate = null, this._headerMonth = null, this._headerYear = null);
  }
  _getDelimeters(t2) {
    return t2.match(/[^(dmy)]{1,}/g);
  }
  _parseDate(t2, e2, i2) {
    let n2;
    i2[0] !== i2[1] ? n2 = i2[0] + i2[1] : n2 = i2[0];
    const o2 = new RegExp(`[${n2}]`), r2 = t2.split(o2), a2 = e2.split(o2), l2 = e2.indexOf("mmm") !== -1, p2 = [];
    for (let b2 = 0;b2 < a2.length; b2++)
      a2[b2].indexOf("yy") !== -1 && (p2[0] = { value: r2[b2], format: a2[b2] }), a2[b2].indexOf("m") !== -1 && (p2[1] = { value: r2[b2], format: a2[b2] }), a2[b2].indexOf("d") !== -1 && a2[b2].length <= 2 && (p2[2] = { value: r2[b2], format: a2[b2] });
    let u2;
    e2.indexOf("mmmm") !== -1 ? u2 = this._options.monthsFull : u2 = this._options.monthsShort;
    const _2 = Number(p2[0].value), f2 = l2 ? this.getMonthNumberByMonthName(p2[1].value, u2) : Number(p2[1].value) - 1, g2 = Number(p2[2].value);
    return Ct2(_2, f2, g2);
  }
  getMonthNumberByMonthName(t2, e2) {
    return e2.findIndex((i2) => i2 === t2);
  }
  static getInstance(t2) {
    return A2.getData(t2, Qs);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var rg = ({
  format24: s2,
  okLabel: t2,
  cancelLabel: e2,
  headID: i2,
  footerID: n2,
  bodyID: o2,
  pickerID: r2,
  clearLabel: a2,
  inline: l2,
  showClearBtn: p2,
  amLabel: u2,
  pmLabel: _2
}, f2) => {
  const g2 = `<div id='${r2}' class='${f2.timepickerWrapper}' data-te-timepicker-wrapper>
      <div class="${f2.timepickerContainer}">
        <div class="${f2.timepickerElements}" data-te-timepicker-elements-wrapper>
        <div id='${i2}' class='${f2.timepickerHead}' style='padding-right:${s2 ? 50 : 10}px'>
        <div class='${f2.timepickerHeadContent}'>
            <div class="${f2.timepickerCurrentWrapper}">
              <span class="${f2.timepickerCurrentButtonWrapper}">
                <button type='button' class='${f2.timepickerCurrentButton}' tabindex="0" data-te-timepicker-active data-te-timepicker-current data-te-timepicker-hour data-te-ripple-init>21</button>
              </span>
              <button type='button' class='${f2.timepickerDot}' disabled>:</button>
            <span class="${f2.timepickerCurrentButtonWrapper}">
              <button type='button' class='${f2.timepickerCurrentButton}' tabindex="0" data-te-timepicker-current data-te-timepicker-minute data-te-ripple-init>21</button>
            </span>
            </div>
            ${s2 ? "" : `<div class="${f2.timepickerModeWrapper}">
                  <button type='button' class="${f2.timepickerModeAm}" tabindex="0" data-te-timepicker-am data-te-timepicker-hour-mode data-te-ripple-init>${u2}</button>
                  <button class="${f2.timepickerModePm}" tabindex="0" data-te-timepicker-pm data-te-timepicker-hour-mode data-te-ripple-init>${_2}</button>
                </div>`}
        </div>
      </div>
      ${l2 ? "" : `<div id='${o2}' class='${f2.timepickerClockWrapper}' data-te-timepicker-clock-wrapper>
            <div class='${f2.timepickerClock}' data-te-timepicker-clock>
              <span class='${f2.timepickerMiddleDot}' data-te-timepicker-middle-dot></span>
              <div class='${f2.timepickerHandPointer}' data-te-timepicker-hand-pointer>
                <div class='${f2.timepickerPointerCircle}' data-te-timepicker-circle></div>
              </div>
              ${s2 ? '<div class="' + f2.timepickerClockInner + '" data-te-timepicker-clock-inner></div>' : ""}
            </div>
          </div>`}
    </div>
    <div id='${n2}' class='${f2.timepickerFooterWrapper}'>
      <div class="${f2.timepickerFooter}">
        ${p2 ? `<button type='button' class='${f2.timepickerFooterButton}' data-te-timepicker-clear tabindex="0" data-te-ripple-init>${a2}</button>` : ""}
        <button type='button' class='${f2.timepickerFooterButton}' data-te-timepicker-cancel tabindex="0" data-te-ripple-init>${e2}</button>
        <button type='button' class='${f2.timepickerFooterButton}' data-te-timepicker-submit tabindex="0" data-te-ripple-init>${t2}</button>
      </div>
    </div>
  </div>
</div>`, m2 = `<div id='${r2}' class='${f2.timepickerInlineWrapper}' data-te-timepicker-wrapper>
        <div class="${f2.timepickerInlineContainer}">
          <div class="${f2.timepickerInlineElements}" data-te-timepicker-elements-wrapper>
          <div id='${i2}' class='${f2.timepickerInlineHead}'
          style='padding-right:10px'>
          <div class='${f2.timepickerInlineHeadContent}'>
              <div class="${f2.timepickerCurrentWrapper}">
                <span class="${f2.timepickerInlineHourWrapper}" data-te-timepicker-inline-hour-icons>
                  <span class="${f2.timepickerInlineIconUp}" data-te-timepicker-icon-up data-te-timepicker-icon-inline-hour>
                    <span class="${f2.timepickerInlineIconSvg}">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>   
                    </span>
                  </span>
                  <button type='button' class='${f2.timepickerInlineCurrentButton}' data-te-timepicker-hour data-te-timepicker-current data-te-timepicker-current-inline tabindex="0" data-te-ripple-init>21</button>
                  <span class="${f2.timepickerInlineIconDown}" data-te-timepicker-icon-inline-hour data-te-timepicker-icon-down>
                    <span class="${f2.timepickerInlineIconSvg}">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>  
                    </span>
                  </span>
                </span>
                <button type='button' class='${f2.timepickerInlineDot}' data-te-timepicker-current-inline disabled>:</button>
              <span class="${f2.timepickerCurrentMinuteWrapper}">
                <span class="${f2.timepickerInlineIconUp}" data-te-timepicker-icon-up data-te-timepicker-icon-inline-minute>
                  <span class="${f2.timepickerInlineIconSvg}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </span>
                </span>
                <button type='button' class='${f2.timepickerInlineCurrentButton}' data-te-timepicker-minute data-te-timepicker-current data-te-timepicker-current-inline tabindex="0" data-te-ripple-init>21</button>
                <span class="${f2.timepickerInlineIconDown}" data-te-timepicker-icon-inline-minute data-te-timepicker-icon-down>
                  <span class="${f2.timepickerInlineIconSvg}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg> 
                  </span>
                </span>
              </span>
              </div>
              ${s2 ? "" : `<div class="${f2.timepickerInlineModeWrapper}">
                      <button type='button' class="${f2.timepickerInlineModeAm}" data-te-timepicker-am data-te-timepicker-hour-mode tabindex="0" data-te-ripple-init>${u2}</button>
                      <button class="${f2.timepickerInlineModePm}" data-te-timepicker-hour-mode data-te-timepicker-pm tabindex="0" data-te-ripple-init>${_2}</button>
                      <button type='button' class='${f2.timepickerInlineSubmitButton}' data-te-timepicker-submit tabindex="0" data-te-ripple-init>${t2}</button>
                    </div>`}
              ${s2 ? `<button class='${f2.timepickerInlineSubmitButton}' data-te-timepicker-submit tabindex="0" data-te-ripple-init>${t2}</button>` : ""}
          </div>
        </div>
      </div>
    </div>
</div>`;
  return l2 ? m2 : g2;
};
var ag = (s2, t2, e2) => {
  const { iconSVG: i2 } = s2;
  return `
  <button id="${t2}" tabindex="0" type="button" class="${e2.timepickerToggleButton}" data-te-toggle="timepicker" data-te-timepicker-toggle-button data-te-timepicker-icon>
    ${i2}
  </button>
`;
};
var Cn = "data-te-timepicker-disabled";
var gs = "data-te-timepicker-active";
var Ce2 = (s2) => {
  if (s2 === "")
    return;
  let t2, e2, i2, n2;
  return gh(s2) ? (t2 = s2.getHours(), n2 = t2, e2 = s2.getMinutes(), t2 %= 12, n2 === 0 && t2 === 0 && (i2 = "AM"), t2 = t2 || 12, i2 === undefined && (i2 = Number(n2) >= 12 ? "PM" : "AM"), e2 = e2 < 10 ? `0${e2}` : e2) : ([t2, e2, i2] = R2(s2, false), n2 = t2, t2 %= 12, n2 === 0 && t2 === 0 && (i2 = "AM"), t2 = t2 || 12, i2 === undefined && (i2 = Number(n2) >= 12 ? "PM" : "AM")), {
    hours: t2,
    minutes: e2,
    amOrPm: i2
  };
};
var gh = (s2) => s2 && Object.prototype.toString.call(s2) === "[object Date]" && !Number.isNaN(s2);
var Ka = (s2) => {
  if (s2 === "")
    return;
  let t2, e2;
  return gh(s2) ? (t2 = s2.getHours(), e2 = s2.getMinutes()) : [t2, e2] = R2(s2, false), e2 = Number(e2) < 10 ? `0${Number(e2)}` : e2, {
    hours: t2,
    minutes: e2
  };
};
var lg = (s2, t2, e2) => c2.on(document, s2, t2, ({ target: i2 }) => {
  if (i2.hasAttribute(gs))
    return;
  document.querySelectorAll(t2).forEach((o2) => {
    o2.hasAttribute(gs) && (h2.removeClass(o2, e2.opacity), o2.removeAttribute(gs));
  }), h2.addClass(i2, e2.opacity), i2.setAttribute(gs, "");
});
var za = ({ clientX: s2, clientY: t2, touches: e2 }, i2, n2 = false) => {
  const { left: o2, top: r2 } = i2.getBoundingClientRect();
  let a2 = {};
  return !n2 || !e2 ? a2 = {
    x: s2 - o2,
    y: t2 - r2
  } : n2 && Object.keys(e2).length > 0 && (a2 = {
    x: e2[0].clientX - o2,
    y: e2[0].clientY - r2
  }), a2;
};
var bs = () => navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var R2 = (s2, t2 = true) => t2 ? s2.value.replace(/:/gi, " ").split(" ") : s2.replace(/:/gi, " ").split(" ");
var bh = (s2, t2) => {
  const [e2, i2, n2] = R2(s2, false), [o2, r2, a2] = R2(t2, false);
  return n2 === "PM" && a2 === "AM" || n2 === a2 && e2 > o2 || i2 > r2;
};
var vh = () => {
  const s2 = new Date, t2 = s2.getHours(), e2 = s2.getMinutes();
  return `${t2}:${e2 < 10 ? `0${e2}` : e2}`;
};
var Gt2 = (s2, t2, e2) => {
  if (!t2)
    return s2;
  let i2 = vh();
  return e2 && (i2 = `${Ce2(i2).hours}:${Ce2(i2).minutes} ${Ce2(i2).amOrPm}`), (s2 !== "" && bh(i2, s2) || s2 === "") && (s2 = i2), s2;
};
var qt2 = (s2, t2, e2) => {
  if (!t2)
    return s2;
  let i2 = vh();
  return e2 && (i2 = `${Ce2(i2).hours}:${Ce2(i2).minutes} ${Ce2(i2).amOrPm}`), (s2 !== "" && !bh(i2, s2) || s2 === "") && (s2 = i2), s2;
};
var cg = ({ format12: s2, maxTime: t2, minTime: e2, disablePast: i2, disableFuture: n2 }, o2, r2) => {
  const a2 = R2(o2)[1];
  e2 = Gt2(e2, i2, s2), t2 = qt2(t2, n2, s2);
  const [l2, p2, u2] = R2(t2, false), [_2, f2, g2] = R2(e2, false);
  if (u2 !== undefined || g2 !== undefined)
    return [r2, a2];
  if (!(l2 !== "" && _2 === "" && Number(r2) > Number(l2)) && !(l2 === "" && _2 !== "" && p2 === undefined && f2 !== "" && Number(r2) < Number(_2)))
    return [r2, a2];
};
var Ua = (s2, t2, e2, i2) => {
  s2.forEach((n2) => {
    t2 = t2 === "12" && i2 ? "0" : t2, (n2.textContent === "00" || Number(n2.textContent === "12" && i2 ? "0" : n2.textContent) > t2) && (h2.addClass(n2, e2.tipsDisabled), n2.setAttribute(Cn, ""));
  });
};
var Xa = (s2, t2, e2, i2) => {
  s2.forEach((n2) => {
    t2 = t2 === "12" && i2 ? "0" : t2, n2.textContent !== "00" && Number(n2.textContent === "12" && i2 ? "0" : n2.textContent) < Number(t2) && (h2.addClass(n2, e2.tipsDisabled), n2.setAttribute(Cn, ""));
  });
};
var Th = (s2, t2, e2, i2) => {
  if (t2 === "12" || t2 === "24")
    return;
  const n2 = e2 ? 12 : 24;
  return i2 === "max" ? (Number(s2) === n2 ? 0 : Number(s2)) > Number(t2) : (Number(s2) === n2 ? 0 : Number(s2)) < Number(t2);
};
var hg = (s2, t2, e2, i2, n2, o2) => {
  s2.forEach((r2) => {
    (Th(i2, e2, o2, "max") || Number(r2.textContent) > t2 && Number(i2) === Number(e2)) && (h2.addClass(r2, n2.tipsDisabled), r2.setAttribute(Cn, ""));
  });
};
var dg = (s2, t2, e2, i2, n2, o2) => {
  s2.forEach((r2) => {
    (Th(i2, e2, o2, "min") || Number(r2.textContent) < t2 && Number(i2) === Number(e2)) && (h2.addClass(r2, n2.tipsDisabled), r2.setAttribute(Cn, ""));
  });
};
var ug = (s2) => s2.startsWith("0") ? Number(s2.slice(1)) : Number(s2);
var Bi = "timepicker";
var M2 = `data-te-${Bi}`;
var Ga = "[data-te-toggle]";
var Js = `te.${Bi}`;
var Pt2 = `.${Js}`;
var Bt2 = ".data-api";
var qa = `click${Pt2}${Bt2}`;
var vs = `keydown${Pt2}${Bt2}`;
var Za = `mousedown${Pt2}${Bt2}`;
var Qa = `mouseup${Pt2}${Bt2}`;
var Ja = `mousemove${Pt2}${Bt2}`;
var tl = `mouseleave${Pt2}${Bt2}`;
var el = `mouseover${Pt2}${Bt2}`;
var il = `touchmove${Pt2}${Bt2}`;
var sl = `touchend${Pt2}${Bt2}`;
var nl = `touchstart${Pt2}${Bt2}`;
var pg = `[${M2}-am]`;
var _g = `[${M2}-pm]`;
var fg = `[${M2}-format24]`;
var Ts = `[${M2}-current]`;
var Es = `[${M2}-hour-mode]`;
var mg = `[${M2}-toggle-button]`;
var oo = `${M2}-cancel`;
var ol = `${M2}-clear`;
var ro = `${M2}-submit`;
var gg = `${M2}-icon`;
var ao = `${M2}-icon-up`;
var lo = `${M2}-icon-down`;
var bg = `${M2}-icon-inline-hour`;
var vg = `${M2}-icon-inline-minute`;
var rl = `${M2}-inline-hour-icons`;
var Tg = `${M2}-current-inline`;
var Eg = "readonly";
var Cg = `${M2}-invalid-feedback`;
var co = `${M2}-is-invalid`;
var jt2 = `${M2}-disabled`;
var H2 = `${M2}-active`;
var Ag = `${M2}-input`;
var ue2 = `${M2}-clock`;
var mi = `${M2}-clock-inner`;
var ho = `${M2}-wrapper`;
var al = `${M2}-clock-wrapper`;
var Cs = `${M2}-hour`;
var uo = `${M2}-minute`;
var As = `${M2}-tips-element`;
var X2 = `${M2}-tips-hours`;
var q2 = `${M2}-tips-minutes`;
var ht2 = `${M2}-tips-inner`;
var ys = `${M2}-tips-inner-element`;
var ll = `${M2}-middle-dot`;
var po = `${M2}-hand-pointer`;
var _o = `${M2}-circle`;
var cl = `${M2}-modal`;
var yg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;
var wg = {
  appendValidationInfo: true,
  bodyID: "",
  cancelLabel: "Cancel",
  clearLabel: "Clear",
  closeModalOnBackdropClick: true,
  closeModalOnMinutesClick: false,
  container: "body",
  defaultTime: "",
  disabled: false,
  disablePast: false,
  disableFuture: false,
  enableValidation: true,
  focusInputAfterApprove: false,
  footerID: "",
  format12: true,
  format24: false,
  headID: "",
  increment: false,
  inline: false,
  invalidLabel: "Invalid Time Format",
  maxTime: "",
  minTime: "",
  modalID: "",
  okLabel: "Ok",
  overflowHidden: true,
  pickerID: "",
  readOnly: false,
  showClearBtn: true,
  switchHoursToMinutesOnClick: true,
  iconSVG: yg,
  withIcon: true,
  pmLabel: "PM",
  amLabel: "AM",
  animations: true
};
var kg = {
  appendValidationInfo: "boolean",
  bodyID: "string",
  cancelLabel: "string",
  clearLabel: "string",
  closeModalOnBackdropClick: "boolean",
  closeModalOnMinutesClick: "boolean",
  container: "string",
  disabled: "boolean",
  disablePast: "boolean",
  disableFuture: "boolean",
  enableValidation: "boolean",
  footerID: "string",
  format12: "boolean",
  format24: "boolean",
  headID: "string",
  increment: "boolean",
  inline: "boolean",
  invalidLabel: "string",
  modalID: "string",
  okLabel: "string",
  overflowHidden: "boolean",
  pickerID: "string",
  readOnly: "boolean",
  showClearBtn: "boolean",
  switchHoursToMinutesOnClick: "boolean",
  defaultTime: "(string|date|number)",
  iconSVG: "string",
  withIcon: "boolean",
  pmLabel: "string",
  amLabel: "string",
  animations: "boolean"
};
var xg = {
  tips: "absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] rounded-[100%] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent",
  tipsActive: "text-white bg-[#3b71ca] font-normal",
  tipsDisabled: "text-[#b3afaf] pointer-events-none bg-transparent",
  transform: "transition-[transform,height] ease-in-out duration-[400ms]",
  modal: "z-[1065]",
  clockAnimation: "animate-[show-up-clock_350ms_linear]",
  opacity: "!opacity-100",
  timepickerWrapper: "touch-none opacity-100 z-[1065] inset-0 bg-[#00000066] h-full flex items-center justify-center flex-col fixed",
  timepickerContainer: "flex items-center justify-center flex-col max-h-[calc(100%-64px)] overflow-y-auto shadow-[0_10px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] min-[320px]:max-[825px]:landscape:rounded-lg",
  timepickerElements: "flex flex-col min-w-[310px] min-h-[325px] bg-white rounded-t-[0.6rem] min-[320px]:max-[825px]:landscape:!flex-row min-[320px]:max-[825px]:landscape:min-w-[auto] min-[320px]:max-[825px]:landscape:min-h-[auto] min-[320px]:max-[825px]:landscape:overflow-y-auto justify-around",
  timepickerHead: "bg-[#3b71ca] dark:bg-zinc-700 h-[100px] rounded-t-lg pr-[24px] pl-[50px] py-[10px] min-[320px]:max-[825px]:landscape:rounded-tr-none min-[320px]:max-[825px]:landscape:rounded-bl-none min-[320px]:max-[825px]:landscape:p-[10px] min-[320px]:max-[825px]:landscape:pr-[10px] min-[320px]:max-[825px]:landscape:h-auto min-[320px]:max-[825px]:landscape:min-h-[305px] flex flex-row items-center justify-center",
  timepickerHeadContent: "min-[320px]:max-[825px]:landscape:flex-col flex w-full justify-evenly",
  timepickerCurrentWrapper: "[direction:ltr] rtl:[direction:rtl]",
  timepickerCurrentButtonWrapper: "relative h-full",
  timepickerCurrentButton: "text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em] text-white opacity-[.54] border-none bg-transparent p-0 min-[320px]:max-[825px]:landscape:text-5xl min-[320px]:max-[825px]:landscape:font-normal cursor-pointer hover:bg-[#00000026] hover:outline-none focus:bg-[#00000026] focus:outline-none ",
  timepickerDot: "font-light leading-[1.2] tracking-[-0.00833em] text-[3.75rem] opacity-[.54] border-none bg-transparent p-0 text-white min-[320px]:max-[825px]:landscape:text-[3rem] min-[320px]:max-[825px]:landscape:font-normal",
  timepickerModeWrapper: "flex flex-col justify-center text-[18px] text-[#ffffff8a] min-[320px]:max-[825px]:landscape:!justify-around min-[320px]:max-[825px]:landscape:!flex-row",
  timepickerModeAm: "p-0 bg-transparent border-none text-white opacity-[.54] cursor-pointer hover:bg-[#00000026] hover:outline-none focus:bg-[#00000026] focus:outline-none",
  timepickerModePm: "p-0 bg-transparent border-none text-white opacity-[.54] cursor-pointer hover:bg-[#00000026] hover:outline-none focus:bg-[#00000026] focus:outline-none",
  timepickerClockWrapper: "min-w-[310px] max-w-[325px] min-h-[305px] overflow-x-hidden h-full flex justify-center flex-col items-center dark:bg-zinc-500",
  timepickerClock: "relative rounded-[100%] w-[260px] h-[260px] cursor-default my-0 mx-auto bg-[#00000012] dark:bg-zinc-600/50",
  timepickerMiddleDot: "top-1/2 left-1/2 w-[6px] h-[6px] -translate-y-1/2 -translate-x-1/2 rounded-[50%] bg-[#3b71ca] absolute",
  timepickerHandPointer: "bg-[#3b71ca] bottom-1/2 h-2/5 left-[calc(50%-1px)] rtl:!left-auto origin-[center_bottom_0] rtl:!origin-[50%_50%_0] w-[2px] absolute",
  timepickerPointerCircle: "-top-[21px] -left-[15px] w-[4px] border-[14px] border-solid border-[#3b71ca] h-[4px] box-content rounded-[100%] absolute",
  timepickerClockInner: "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-[100%]",
  timepickerFooterWrapper: "rounded-b-lg flex justify-between items-center w-full h-[56px] px-[12px] bg-white dark:bg-zinc-500",
  timepickerFooter: "w-full flex justify-between",
  timepickerFooterButton: "text-[0.8rem] min-w-[64px] box-border font-medium leading-[40px] rounded-[10px] tracking-[0.1rem] uppercase text-[#3b71ca] dark:text-white border-none bg-transparent transition-[background-color,box-shadow,border] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-[0ms] outline-none py-0 px-[10px] h-[40px] mb-[10px] hover:bg-[#00000014] focus:bg-[#00000014] focus:outline-none",
  timepickerInlineWrapper: "touch-none opacity-100 z-[1065] inset-0 bg-[#00000066] h-full flex items-center justify-center flex-col rounded-lg",
  timepickerInlineContainer: "flex items-center justify-center flex-col max-h-[calc(100%-64px)] overflow-y-auto shadow-[0_10px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
  timepickerInlineElements: "flex flex-col min-h-[auto] min-w-[310px] bg-white rounded-[0.6rem] min-[320px]:max-[825px]:landscape:!flex-row min-[320px]:max-[825px]:landscape:rounded-bl-lg min-[320px]:max-[825px]:landscape:min-w-[auto] min-[320px]:max-[825px]:landscape::min-h-[auto] min-[320px]:max-[825px]:landscape:overflow-y-auto justify-around",
  timepickerInlineHead: "bg-[#3b71ca] dark:bg-zinc-700 h-[100px] rounded-t-lg min-[320px]:max-[825px]:landscape:rounded-tr-none min-[320px]:max-[825px]:landscape:rounded-bl-none min-[320px]:max-[825px]:landscape:p-[10px] min-[320px]:max-[825px]:landscape:pr-[10px] min-[320px]:max-[825px]:landscape:h-auto min-[320px]:max-[825px]:landscape:min-h-[305px] flex flex-row items-center justify-center p-0 rounded-b-lg",
  timepickerInlineHeadContent: "min-[320px]:max-[825px]:landscape:flex-col flex w-full justify-evenly items-center",
  timepickerInlineHourWrapper: "relative h-full !opacity-100",
  timepickerCurrentMinuteWrapper: "relative h-full",
  timepickerInlineIconUp: "absolute text-white -top-[35px] opacity-0 hover:opacity-100 transition-all duration-200 ease-[ease] cursor-pointer -translate-x-1/2 -translate-y-1/2 left-1/2 w-[30px] h-[30px] flex justify-center items-center",
  timepickerInlineIconSvg: "h-4 w-4",
  timepickerInlineCurrentButton: "font-light leading-[1.2] tracking-[-0.00833em] text-white border-none bg-transparent p-0 min-[320px]:max-[825px]:landscape:text-5xl min-[320px]:max-[825px]:landscape:font-normal !opacity-100 cursor-pointer focus:bg-[#00000026] hover:outline-none focus:outline-none text-[2.5rem] hover:bg-[unset]",
  timepickerInlineIconDown: "absolute text-white -bottom-[47px] opacity-0 hover:opacity-100 transition-all duration-200 ease-[ease] cursor-pointer -translate-x-1/2 -translate-y-1/2 left-1/2 w-[30px] h-[30px] flex justify-center items-center",
  timepickerInlineDot: "font-light leading-[1.2] tracking-[-0.00833em] opacity-[.54] border-none bg-transparent p-0 text-white min-[320px]:max-[825px]:landscape:text-[3rem] min-[320px]:max-[825px]:landscape:font-normal text-[2.5rem]",
  timepickerInlineModeWrapper: "flex justify-center text-[18px] text-[#ffffff8a] min-[320px]:max-[825px]:landscape:!justify-around min-[320px]:max-[825px]:landscape:!flex-row",
  timepickerInlineModeAm: "hover:bg-[#00000026] hover:outline-none focus:bg-[#00000026] focus:outline-none p-0 bg-transparent border-none text-white opacity-[.54] cursor-pointer mr-2 ml-6",
  timepickerInlineModePm: "hover:bg-[#00000026] hover:outline-none focus:bg-[#00000026] focus:outline-none p-0 bg-transparent border-none text-white opacity-[.54] cursor-pointer",
  timepickerInlineSubmitButton: "hover:bg-[#00000014] focus:bg-[#00000014] focus:outline-none text-[0.8rem] box-border font-medium leading-[40px] tracking-[.1rem] uppercase border-none bg-transparent [transition:background-color_250ms_cubic-bezier(0.4,0,0.2,1)_0ms,box-shadow_250ms_cubic-bezier(0.4,0,0.2,1)_0ms,border_250ms_cubic-bezier(0.4,0,0.2,1)_0ms] outline-none rounded-[100%] h-[48px] min-w-[48px] inline-block ml-[30px] text-white py-1 px-2 mb-0",
  timepickerToggleButton: "h-4 w-4 ml-auto absolute outline-none border-none bg-transparent right-1.5 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer hover:text-[#3b71ca] focus:text-[#3b71ca] dark:hover:text-[#3b71ca] dark:focus:text-[#3b71ca] dark:text-white"
};
var Og = {
  tips: "string",
  tipsActive: "string",
  tipsDisabled: "string",
  transform: "string",
  modal: "string",
  clockAnimation: "string",
  opacity: "string",
  timepickerWrapper: "string",
  timepickerContainer: "string",
  timepickerElements: "string",
  timepickerHead: "string",
  timepickerHeadContent: "string",
  timepickerCurrentWrapper: "string",
  timepickerCurrentButtonWrapper: "string",
  timepickerCurrentButton: "string",
  timepickerDot: "string",
  timepickerModeWrapper: "string",
  timepickerModeAm: "string",
  timepickerModePm: "string",
  timepickerClockWrapper: "string",
  timepickerClock: "string",
  timepickerMiddleDot: "string",
  timepickerHandPointer: "string",
  timepickerPointerCircle: "string",
  timepickerClockInner: "string",
  timepickerFooterWrapper: "string",
  timepickerFooterButton: "string",
  timepickerInlineWrapper: "string",
  timepickerInlineContainer: "string",
  timepickerInlineElements: "string",
  timepickerInlineHead: "string",
  timepickerInlineHeadContent: "string",
  timepickerInlineHourWrapper: "string",
  timepickerCurrentMinuteWrapper: "string",
  timepickerInlineIconUp: "string",
  timepickerInlineIconSvg: "string",
  timepickerInlineCurrentButton: "string",
  timepickerInlineIconDown: "string",
  timepickerInlineDot: "string",
  timepickerInlineModeWrapper: "string",
  timepickerInlineModeAm: "string",
  timepickerInlineModePm: "string",
  timepickerInlineSubmitButton: "string",
  timepickerToggleButton: "string"
};

class Sg {
  constructor(t2, e2 = {}, i2) {
    wt2(this, "_toggleAmPm", (t3) => {
      t3 === "PM" ? (this._isPmEnabled = true, this._isAmEnabled = false) : t3 === "AM" && (this._isPmEnabled = false, this._isAmEnabled = true);
    });
    wt2(this, "_toggleBackgroundColorCircle", (t3) => {
      if (this._modal.querySelector(`${t3}[${H2}]`) !== null) {
        h2.addStyle(this._circle, {
          backgroundColor: "#1976d2"
        });
        return;
      }
      h2.addStyle(this._circle, {
        backgroundColor: "transparent"
      });
    });
    wt2(this, "_toggleClassActive", (t3, { textContent: e3 }, i3) => {
      const n2 = [...t3].find((o2) => Number(o2) === Number(e3));
      return i3.forEach((o2) => {
        if (!o2.hasAttribute(jt2)) {
          if (o2.textContent === n2) {
            h2.addClass(o2, this._classes.tipsActive), o2.setAttribute(H2, "");
            return;
          }
          h2.removeClass(o2, this._classes.tipsActive), o2.removeAttribute(H2);
        }
      });
    });
    wt2(this, "_makeMinutesDegrees", (t3, e3) => {
      const { increment: i3 } = this._options;
      return t3 < 0 ? (e3 = Math.round(360 + t3 / 6) % 60, t3 = 360 + Math.round(t3 / 6) * 6) : (e3 = Math.round(t3 / 6) % 60, t3 = Math.round(t3 / 6) * 6), i3 && (t3 = Math.round(t3 / 30) * 30, e3 = Math.round(t3 / 6) * 6 / 6, e3 === 60 && (e3 = "00")), t3 >= 360 && (t3 = 0), {
        degrees: t3,
        minute: e3,
        addDegrees: i3 ? 30 : 6
      };
    });
    wt2(this, "_makeHourDegrees", (t3, e3, i3) => {
      if (t3)
        return this._hasTargetInnerClass(t3) ? e3 < 0 ? (i3 = Math.round(360 + e3 / 30) % 24, e3 = 360 + e3) : (i3 = Math.round(e3 / 30) + 12, i3 === 12 && (i3 = "00")) : e3 < 0 ? (i3 = Math.round(360 + e3 / 30) % 12, e3 = 360 + e3) : (i3 = Math.round(e3 / 30) % 12, (i3 === 0 || i3 > 12) && (i3 = 12)), e3 >= 360 && (e3 = 0), {
          degrees: e3,
          hour: i3,
          addDegrees: 30
        };
    });
    wt2(this, "_makeInnerHoursDegrees", (t3, e3) => (t3 < 0 ? (e3 = Math.round(360 + t3 / 30) % 24, t3 = 360 + t3) : (e3 = Math.round(t3 / 30) + 12, e3 === 12 && (e3 = "00")), {
      degrees: t3,
      hour: e3,
      addDegrees: 30
    }));
    wt2(this, "_getAppendClock", (t3 = [], e3 = `[${ue2}]`, i3) => {
      let { minTime: n2, maxTime: o2 } = this._options;
      const { inline: r2, format12: a2, disablePast: l2, disableFuture: p2 } = this._options;
      n2 = Gt2(n2, l2, a2), o2 = qt2(o2, p2, a2);
      const [u2, _2, f2] = R2(o2, false), [g2, m2, b2] = R2(n2, false);
      !r2 && a2 && this._isInvalidTimeFormat && !this._AM.hasAttribute(H2) && (h2.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H2, ""));
      const v2 = d2.findOne(e3), T2 = 360 / t3.length;
      function y2(k2) {
        return k2 * (Math.PI / 180);
      }
      if (v2 === null)
        return;
      const C2 = (v2.offsetWidth - 32) / 2, E2 = (v2.offsetHeight - 32) / 2, w2 = C2 - 4;
      setTimeout(() => {
        let k2;
        a2 && (k2 = d2.findOne(`${Es}[${H2}]`).textContent), this._handleDisablingTipsMinTime(k2, b2, m2, g2), this._handleDisablingTipsMaxTime(k2, f2, _2, u2);
      }, 0), [...t3].forEach((k2, D2) => {
        const O2 = y2(D2 * T2), x2 = $2("span"), L2 = $2("span");
        L2.innerHTML = k2, h2.addClass(x2, this._classes.tips), x2.setAttribute(i3, "");
        const { offsetWidth: S2, offsetHeight: N2 } = x2;
        return h2.addStyle(x2, {
          left: `${C2 + Math.sin(O2) * w2 - S2}px`,
          bottom: `${E2 + Math.cos(O2) * w2 - N2}px`
        }), t3.includes("05") && x2.setAttribute(q2, ""), t3.includes("13") ? L2.setAttribute(ys, "") : L2.setAttribute(As, ""), x2.appendChild(L2), v2.appendChild(x2);
      });
    });
    this._element = t2, this._element && A2.setData(t2, Js, this), this._document = document, this._options = this._getConfig(e2), this._classes = this._getClasses(i2), this._currentTime = null, this._toggleButtonId = et2("timepicker-toggle-"), this.hoursArray = [
      "12",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ], this.innerHours = [
      "00",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23"
    ], this.minutesArray = [
      "00",
      "05",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55"
    ], this.input = d2.findOne("input", this._element), this.dataWithIcon = t2.dataset.withIcon, this.dataToggle = t2.dataset.toggle, this.customIcon = d2.findOne(mg, this._element), this._checkToggleButton(), this.inputFormatShow = d2.findOne(fg, this._element), this.inputFormat = this.inputFormatShow === null ? "" : Object.values(this.inputFormatShow.dataset)[0], this.elementToggle = d2.findOne(Ga, this._element), this.toggleElement = Object.values(t2.querySelector(Ga).dataset)[0], this._hour = null, this._minutes = null, this._AM = null, this._PM = null, this._wrapper = null, this._modal = null, this._hand = null, this._circle = null, this._focusTrap = null, this._popper = null, this._interval = null, this._timeoutInterval = null, this._inputValue = this._options.defaultTime !== "" ? this._options.defaultTime : this.input.value, this._options.format24 && (this._options.format12 = false, this._currentTime = Ka(this._inputValue)), this._options.format12 && (this._options.format24 = false, this._currentTime = Ce2(this._inputValue)), this._options.readOnly && this.input.setAttribute(Eg, true), this.inputFormat === "true" && this.inputFormat !== "" && (this._options.format12 = false, this._options.format24 = true, this._currentTime = Ka(this._inputValue)), this._animations = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && this._options.animations, this.init(), this._isHours = true, this._isMinutes = false, this._isInvalidTimeFormat = false, this._isMouseMove = false, this._isInner = false, this._isAmEnabled = false, this._isPmEnabled = false, this._options.format12 && !this._options.defaultTime && (this._isPmEnabled = true), this._objWithDataOnChange = { degrees: null }, this._scrollBar = new ti;
  }
  static get NAME() {
    return Bi;
  }
  init() {
    const { format12: t2, format24: e2, enableValidation: i2 } = this._options;
    let n2, o2, r2;
    if (this.input.setAttribute(Ag, ""), this._currentTime !== undefined) {
      const { hours: a2, minutes: l2, amOrPm: p2 } = this._currentTime;
      n2 = Number(a2) < 10 ? 0 : "", o2 = `${n2}${Number(a2)}:${l2}`, r2 = p2, t2 ? this.input.value = `${o2} ${r2}` : e2 && (this.input.value = `${o2}`);
    } else
      n2 = "", o2 = "", r2 = "", this.input.value = "";
    this.input.value.length > 0 && this.input.value !== "" && (this.input.setAttribute(H2, ""), c2.trigger(this.input, "input")), !(this._options === null && this._element === null) && (i2 && this._getValidate("keydown change blur focus"), this._handleOpen(), this._listenToToggleKeydown());
  }
  dispose() {
    this._removeModal(), this._element !== null && A2.removeData(this._element, Js), setTimeout(() => {
      this._element = null, this._options = null, this.input = null, this._focusTrap = null;
    }, 350), c2.off(this._element, "click", `[data-te-toggle='${this.toggleElement}']`), c2.off(this._element, "keydown", `[data-te-toggle='${this.toggleElement}']`);
  }
  update(t2 = {}) {
    this._options = this._getConfig({ ...this._options, ...t2 });
  }
  _checkToggleButton() {
    this.customIcon === null && (this.dataWithIcon !== undefined && (this._options.withIcon = null, this.dataWithIcon === "true" && this._appendToggleButton(this._options)), this._options.withIcon && this._appendToggleButton(this._options));
  }
  _appendToggleButton() {
    const t2 = ag(this._options, this._toggleButtonId, this._classes);
    this.input.insertAdjacentHTML("afterend", t2);
  }
  _getDomElements() {
    this._hour = d2.findOne(`[${Cs}]`), this._minutes = d2.findOne(`[${uo}]`), this._AM = d2.findOne(pg), this._PM = d2.findOne(_g), this._wrapper = d2.findOne(`[${ho}]`), this._modal = d2.findOne(`[${cl}]`), this._hand = d2.findOne(`[${po}]`), this._circle = d2.findOne(`[${_o}]`), this._clock = d2.findOne(`[${ue2}]`), this._clockInner = d2.findOne(`[${mi}]`);
  }
  _handlerMaxMinHoursOptions(t2, e2, i2, n2, o2, r2) {
    if (!e2 && !i2)
      return true;
    const { format24: a2, format12: l2, disablePast: p2, disableFuture: u2 } = this._options, { _isAmEnabled: _2, _isPmEnabled: f2 } = this, g2 = r2.keyCode, m2 = r2.target.hasAttribute(mi) || r2.target.hasAttribute(ht2) || r2.target.hasAttribute(ys);
    i2 = Gt2(i2, p2, l2), e2 = qt2(e2, u2, l2), typeof e2 != "number" && (e2 = R2(e2, false)[0]);
    const b2 = e2 !== "" ? e2 * 30 : "", v2 = i2 !== "" ? i2 * 30 : "";
    t2 < 0 && (t2 = 360 + t2), t2 = t2 === 360 ? 0 : t2;
    const T2 = () => {
      const D2 = document.querySelectorAll(`[${As}]`), O2 = document.querySelectorAll(`[${ys}]`), x2 = ug(this._hour.innerText);
      let L2, S2, N2;
      return g2 === U2 ? S2 = 1 : g2 === z2 && (S2 = -1), x2 === 12 && g2 === U2 ? N2 = 1 : x2 === 0 && g2 === U2 ? N2 = 13 : x2 === 0 && g2 === z2 ? N2 = 23 : x2 === 13 && g2 === z2 ? N2 = 0 : x2 === 1 && g2 === z2 ? N2 = 12 : N2 = x2 + S2, D2.forEach((P2) => {
        Number(P2.textContent) === N2 && (L2 = P2);
      }), O2.forEach((P2) => {
        Number(P2.textContent) === N2 && (L2 = P2);
      }), !L2.parentElement.hasAttribute(jt2);
    }, y2 = () => {
      const D2 = i2 !== "" && i2 > 12 ? (i2 - 12) * 30 : "", O2 = e2 !== "" && e2 > 12 ? (e2 - 12) * 30 : "";
      if (!(D2 && t2 < D2 || O2 && t2 > O2 || e2 && e2 < 12))
        return true;
    };
    if (a2 && r2.type !== "keydown" && m2)
      return y2();
    if (r2.type === "keydown")
      return T2();
    const C2 = !o2 || o2 === "PM" && f2 || i2 !== "" && o2 === "AM" && _2, E2 = !n2 || n2 === "PM" && f2 || e2 !== "" && n2 === "AM" && _2, w2 = () => {
      const D2 = v2 === 360 && l2 ? 0 : v2;
      if (i2) {
        if (o2 === "PM" && _2 || C2 && t2 < D2)
          return;
      } else
        return true;
      return true;
    }, k2 = () => {
      const D2 = b2 === 360 && l2 ? 0 : b2;
      if (e2) {
        if (n2 === "AM" && f2 || E2 && t2 > D2)
          return;
      } else
        return true;
      return true;
    };
    return w2() && k2();
  }
  _handleKeyboard() {
    c2.on(this._document, vs, "", (t2) => {
      let e2, i2, n2;
      const {
        increment: o2,
        maxTime: r2,
        minTime: a2,
        format12: l2,
        disablePast: p2,
        disableFuture: u2
      } = this._options;
      let _2 = R2(a2, false)[0], f2 = R2(r2, false)[0];
      const g2 = R2(a2, false)[2], m2 = R2(r2, false)[2];
      _2 = Gt2(_2, p2, l2), f2 = qt2(f2, u2, l2), typeof f2 != "number" && (f2 = R2(f2, false)[0]);
      const b2 = d2.findOne(`[${q2}]`) === null, v2 = d2.findOne(`[${ht2}]`) !== null, T2 = Number(this._hand.style.transform.replace(/[^\d-]/g, "")), y2 = d2.find(`[${q2}]`, this._modal), C2 = d2.find(`[${X2}]`, this._modal), E2 = d2.find(`[${ht2}]`, this._modal);
      let w2 = this._makeHourDegrees(t2.target, T2, e2).hour;
      const { degrees: k2, addDegrees: D2 } = this._makeHourDegrees(t2.target, T2, e2);
      let { minute: O2, degrees: x2 } = this._makeMinutesDegrees(T2, i2);
      const L2 = this._makeMinutesDegrees(T2, i2).addDegrees;
      let { hour: S2 } = this._makeInnerHoursDegrees(T2, n2);
      if (t2.keyCode === we2) {
        const N2 = d2.findOne(`[${oo}]`, this._modal);
        c2.trigger(N2, "click");
      } else if (b2) {
        if (v2 && (t2.keyCode === ze2 && (this._isInner = false, h2.addStyle(this._hand, {
          height: "calc(40% + 1px)"
        }), this._hour.textContent = this._setHourOrMinute(w2 > 12 ? 1 : w2), this._toggleClassActive(this.hoursArray, this._hour, C2), this._toggleClassActive(this.innerHours, this._hour, E2)), t2.keyCode === Ke2 && (this._isInner = true, h2.addStyle(this._hand, {
          height: "21.5%"
        }), this._hour.textContent = this._setHourOrMinute(S2 >= 24 || S2 === "00" ? 0 : S2), this._toggleClassActive(this.innerHours, this._hour, E2), this._toggleClassActive(this.hoursArray, this._hour - 1, C2))), t2.keyCode === U2) {
          if (!this._handlerMaxMinHoursOptions(k2 + 30, f2, _2, m2, g2, t2))
            return;
          h2.addStyle(this._hand, {
            transform: `rotateZ(${k2 + D2}deg)`
          }), this._isInner ? (S2 += 1, S2 === 24 ? S2 = 0 : (S2 === 25 || S2 === "001") && (S2 = 13), this._hour.textContent = this._setHourOrMinute(S2), this._toggleClassActive(this.innerHours, this._hour, E2)) : (w2 += 1, this._hour.textContent = this._setHourOrMinute(w2 > 12 ? 1 : w2), this._toggleClassActive(this.hoursArray, this._hour, C2));
        }
        if (t2.keyCode === z2) {
          if (!this._handlerMaxMinHoursOptions(k2 - 30, f2, _2, m2, g2, t2))
            return;
          h2.addStyle(this._hand, {
            transform: `rotateZ(${k2 - D2}deg)`
          }), this._isInner ? (S2 -= 1, S2 === 12 ? S2 = 0 : S2 === -1 && (S2 = 23), this._hour.textContent = this._setHourOrMinute(S2), this._toggleClassActive(this.innerHours, this._hour, E2)) : (w2 -= 1, this._hour.textContent = this._setHourOrMinute(w2 === 0 ? 12 : w2), this._toggleClassActive(this.hoursArray, this._hour, C2));
        }
      } else
        t2.keyCode === U2 && (x2 += L2, h2.addStyle(this._hand, {
          transform: `rotateZ(${x2}deg)`
        }), O2 += 1, o2 && (O2 += 4, O2 === "0014" && (O2 = 5)), this._minutes.textContent = this._setHourOrMinute(O2 > 59 ? 0 : O2), this._toggleClassActive(this.minutesArray, this._minutes, y2), this._toggleBackgroundColorCircle(`[${q2}]`)), t2.keyCode === z2 && (x2 -= L2, h2.addStyle(this._hand, {
          transform: `rotateZ(${x2}deg)`
        }), o2 ? O2 -= 5 : O2 -= 1, O2 === -1 ? O2 = 59 : O2 === -5 && (O2 = 55), this._minutes.textContent = this._setHourOrMinute(O2), this._toggleClassActive(this.minutesArray, this._minutes, y2), this._toggleBackgroundColorCircle(`[${q2}]`));
    });
  }
  _setActiveClassToTipsOnOpen(t2, ...e2) {
    if (!this._isInvalidTimeFormat)
      if (this._options.format24) {
        const i2 = d2.find(`[${X2}]`, this._modal), n2 = d2.find(`[${ht2}]`, this._modal);
        this._addActiveClassToTip(i2, t2), this._addActiveClassToTip(n2, t2);
      } else {
        [...e2].filter((n2) => (n2.toLowerCase() === "pm" ? (h2.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H2, "")) : n2.toLowerCase() === "am" ? (h2.addClass(this._AM, this._classes.opacity), this._AM.setAttribute(H2, "")) : (h2.removeClass(this._AM, this._classes.opacity), h2.removeClass(this._PM, this._classes.opacity), this._AM.removeAttribute(H2), this._PM.removeAttribute(H2)), n2));
        const i2 = d2.find(`[${X2}]`, this._modal);
        this._addActiveClassToTip(i2, t2);
      }
  }
  _setTipsAndTimesDependOnInputValue(t2, e2) {
    const { inline: i2, format12: n2 } = this._options;
    if (this._isInvalidTimeFormat)
      this._hour.textContent = "12", this._minutes.textContent = "00", i2 || h2.addStyle(this._hand, {
        transform: "rotateZ(0deg)"
      }), n2 && (h2.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H2, ""));
    else {
      const o2 = t2 > 12 ? t2 * 30 - 360 : t2 * 30;
      this._hour.textContent = t2, this._minutes.textContent = e2, i2 || (h2.addStyle(this._hand, {
        transform: `rotateZ(${o2}deg)`
      }), h2.addStyle(this._circle, {
        backgroundColor: "#1976d2"
      }), (Number(t2) > 12 || t2 === "00") && h2.addStyle(this._hand, {
        height: "21.5%"
      }));
    }
  }
  _listenToToggleKeydown() {
    c2.on(this._element, "keydown", `[data-te-toggle='${this.toggleElement}']`, (t2) => {
      t2.keyCode === it2 && (t2.preventDefault(), c2.trigger(this.elementToggle, "click"));
    });
  }
  _handleOpen() {
    const t2 = this._getContainer();
    K2.on(this._element, "click", `[data-te-toggle='${this.toggleElement}']`, (e2) => {
      if (this._options === null)
        return;
      const i2 = h2.getDataAttribute(this.input, "toggle") !== null ? 200 : 0;
      setTimeout(() => {
        h2.addStyle(this.elementToggle, {
          pointerEvents: "none"
        }), this.elementToggle.blur();
        let n2;
        R2(this.input)[0] === "" ? n2 = ["12", "00", "PM"] : n2 = R2(this.input);
        const { modalID: o2, inline: r2, format12: a2 } = this._options, [l2, p2, u2] = n2, _2 = $2("div");
        if ((Number(l2) > 12 || l2 === "00") && (this._isInner = true), this.input.blur(), e2.target.blur(), _2.innerHTML = rg(this._options, this._classes), h2.addClass(_2, this._classes.modal), _2.setAttribute(cl, ""), _2.setAttribute("role", "dialog"), _2.setAttribute("tabIndex", "-1"), _2.setAttribute("id", o2), r2 ? (this._popper = se2(this.input, _2, {
          placement: "bottom-start"
        }), t2.appendChild(_2)) : (t2.appendChild(_2), this._scrollBar.hide()), this._getDomElements(), this._animations ? this._toggleBackdropAnimation() : h2.addClass(this._wrapper, this._classes.opacity), this._setActiveClassToTipsOnOpen(l2, p2, u2), this._appendTimes(), this._setActiveClassToTipsOnOpen(l2, p2, u2), this._setTipsAndTimesDependOnInputValue(l2, p2), this.input.value === "") {
          const f2 = d2.find(`[${X2}]`, this._modal);
          a2 && (h2.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H2, "")), this._hour.textContent = "12", this._minutes.textContent = "00", this._addActiveClassToTip(f2, Number(this._hour.textContent));
        }
        if (this._handleSwitchTimeMode(), this._handleOkButton(), this._handleClose(), r2)
          this._handleHoverInlineBtn(), this._handleDocumentClickInline(), this._handleInlineClicks();
        else {
          this._handleSwitchHourMinute(), this._handleClockClick(), this._handleKeyboard();
          const f2 = document.querySelector(`${Ts}[${H2}]`);
          h2.addClass(f2, this._classes.opacity), h2.addStyle(this._hour, {
            pointerEvents: "none"
          }), h2.addStyle(this._minutes, {
            pointerEvents: ""
          });
        }
        this._focusTrap = new zi(this._wrapper, {
          event: "keydown",
          condition: ({ key: f2 }) => f2 === "Tab"
        }), this._focusTrap.trap();
      }, i2);
    });
  }
  _handleInlineClicks() {
    let t2, e2;
    const i2 = (g2) => {
      let m2 = g2;
      return m2 > 59 ? m2 = 0 : m2 < 0 && (m2 = 59), m2;
    }, n2 = (g2) => {
      let m2 = g2;
      return this._options.format24 ? (m2 > 24 ? m2 = 1 : m2 < 0 && (m2 = 23), m2 > 23 && (m2 = 0)) : (m2 > 12 ? m2 = 1 : m2 < 1 && (m2 = 12), m2 > 12 && (m2 = 1)), m2;
    }, o2 = (g2) => {
      const m2 = n2(g2);
      this._hour.textContent = this._setHourOrMinute(m2);
    }, r2 = (g2) => {
      const m2 = i2(g2);
      this._minutes.textContent = this._setHourOrMinute(m2);
    }, a2 = () => {
      t2 = n2(t2) + 1, o2(t2);
    }, l2 = () => {
      e2 = i2(e2) + 1, r2(e2);
    }, p2 = () => {
      t2 = n2(t2) - 1, o2(t2);
    }, u2 = () => {
      e2 = i2(e2) - 1, r2(e2);
    }, _2 = () => {
      clearInterval(this._interval), clearTimeout(this._timeoutInterval);
    }, f2 = (g2) => {
      _2(), this._timeoutInterval = setTimeout(() => {
        this._interval = setInterval(g2, 100);
      }, 500);
    };
    K2.on(this._modal, "click mousedown mouseup touchstart touchend contextmenu", `[${ao}], [${lo}]`, (g2) => {
      t2 = Number(this._hour.textContent), e2 = Number(this._minutes.textContent);
      const { target: m2, type: b2 } = g2, v2 = b2 === "mousedown" || b2 === "touchstart";
      m2.closest(`[${ao}]`) ? m2.closest(`[${ao}]`).parentNode.hasAttribute(rl) ? v2 ? f2(a2) : b2 === "mouseup" || b2 === "touchend" || b2 === "contextmenu" ? _2() : a2() : v2 ? f2(l2) : b2 === "mouseup" || b2 === "touchend" || b2 === "contextmenu" ? _2() : l2() : m2.closest(`[${lo}]`) && (m2.closest(`[${lo}]`).parentNode.hasAttribute(rl) ? v2 ? f2(p2) : b2 === "mouseup" || b2 === "touchend" ? _2() : p2() : v2 ? f2(u2) : b2 === "mouseup" || b2 === "touchend" ? _2() : u2());
    }), c2.on(window, vs, (g2) => {
      const m2 = g2.code, b2 = document.activeElement.hasAttribute(Cs), v2 = document.activeElement.hasAttribute(uo), T2 = document.activeElement === document.body;
      switch (t2 = Number(this._hour.textContent), e2 = Number(this._minutes.textContent), m2) {
        case "ArrowUp":
          g2.preventDefault(), T2 || b2 ? (this._hour.focus(), a2()) : v2 && l2();
          break;
        case "ArrowDown":
          g2.preventDefault(), T2 || b2 ? (this._hour.focus(), p2()) : v2 && u2();
          break;
      }
    });
  }
  _handleClose() {
    c2.on(this._modal, "click", `[${ho}], [${oo}], [${ol}]`, ({ target: t2 }) => {
      const { closeModalOnBackdropClick: e2 } = this._options, i2 = () => {
        var n2;
        h2.addStyle(this.elementToggle, {
          pointerEvents: "auto"
        }), this._animations && this._toggleBackdropAnimation(true), this._removeModal(), (n2 = this._focusTrap) == null || n2.disable(), this._focusTrap = null, this.elementToggle ? this.elementToggle.focus() : this.input && this.input.focus();
      };
      if (t2.hasAttribute(ol)) {
        this._toggleAmPm("PM"), this.input.value = "", this.input.removeAttribute(H2);
        let n2;
        R2(this.input)[0] === "" ? n2 = ["12", "00", "PM"] : n2 = R2(this.input);
        const [o2, r2, a2] = n2;
        this._setTipsAndTimesDependOnInputValue("12", "00"), this._setActiveClassToTipsOnOpen(o2, r2, a2), this._hour.click();
      } else
        (t2.hasAttribute(oo) || t2.hasAttribute(ro) || t2.hasAttribute(ho) && e2) && i2();
    });
  }
  showValueInput() {
    return this.input.value;
  }
  _handleOkButton() {
    K2.on(this._modal, "click", `[${ro}]`, () => {
      let { maxTime: t2, minTime: e2 } = this._options;
      const {
        format12: i2,
        format24: n2,
        readOnly: o2,
        focusInputAfterApprove: r2,
        disablePast: a2,
        disableFuture: l2
      } = this._options, p2 = this._document.querySelector(`${Es}[${H2}]`), u2 = `${this._hour.textContent}:${this._minutes.textContent}`, _2 = Number(this._hour.textContent), f2 = _2 === 12 && i2 ? 0 : _2, g2 = Number(this._minutes.textContent);
      e2 = Gt2(e2, a2, i2), t2 = qt2(t2, l2, i2);
      let [m2, b2, v2] = R2(t2, false), [T2, y2, C2] = R2(e2, false);
      T2 = T2 === "12" && i2 ? "00" : T2, m2 = m2 === "12" && i2 ? "00" : m2;
      const E2 = f2 < Number(T2), w2 = f2 > Number(m2);
      let k2 = true;
      p2 && (k2 = v2 === p2.textContent);
      let D2 = true;
      p2 && (D2 = C2 === p2.textContent);
      const O2 = g2 > b2 && f2 === Number(m2), x2 = g2 < y2 && f2 === Number(T2);
      if (this.input.setAttribute(H2, ""), h2.addStyle(this.elementToggle, {
        pointerEvents: "auto"
      }), t2 !== "") {
        if (k2 && (w2 || O2))
          return;
        if (v2 === "AM" && p2.textContent === "PM")
          return;
      }
      e2 !== "" && (D2 && (E2 || x2) || C2 === "PM" && p2.textContent === "AM") || cg(this._options, this.input, this._hour.textContent) !== undefined && (this._isInvalidTimeFormat && this.input.removeAttribute(co), !o2 && r2 && this.input.focus(), h2.addStyle(this.elementToggle, {
        pointerEvents: "auto"
      }), n2 ? this.input.value = u2 : p2 === null ? this.input.value = `${u2} PM` : this.input.value = `${u2} ${p2.textContent}`, this._animations && this._toggleBackdropAnimation(true), this._removeModal(), c2.trigger(this.input, "input.te.timepicker"), c2.trigger(this.input, "input"));
    });
  }
  _handleHoverInlineBtn() {
    K2.on(this._modal, "mouseover mouseleave", `[${Tg}]`, ({ type: t2, target: e2 }) => {
      const i2 = d2.find(`[${bg}]`, this._modal), n2 = d2.find(`[${vg}]`, this._modal), o2 = (l2, p2) => l2.forEach((u2) => {
        if (p2) {
          h2.addClass(u2, this._classes.opacity), u2.setAttribute(H2, "");
          return;
        }
        h2.removeClass(u2, this._classes.opacity), u2.removeAttribute(H2);
      }), a2 = e2.hasAttribute(Cs) ? i2 : n2;
      o2(a2, t2 === "mouseover");
    });
  }
  _handleDocumentClickInline() {
    c2.on(document, qa, ({ target: t2 }) => {
      if (this._modal && !this._modal.contains(t2) && !t2.hasAttribute(gg)) {
        if (clearInterval(this._interval), h2.addStyle(this.elementToggle, {
          pointerEvents: "auto"
        }), this._removeModal(), !this._animations)
          return;
        this._toggleBackdropAnimation(true);
      }
    });
  }
  _handleSwitchHourMinute() {
    lg("click", Ts, this._classes), c2.on(this._modal, "click", Ts, () => {
      const { format24: t2 } = this._options, e2 = d2.find(Ts, this._modal), i2 = d2.find(`[${q2}]`, this._modal), n2 = d2.find(`[${X2}]`, this._modal), o2 = d2.find(`[${ht2}]`, this._modal), r2 = Number(this._hour.textContent), a2 = Number(this._minutes.textContent), l2 = (p2, u2) => {
        n2.forEach((f2) => f2.remove()), i2.forEach((f2) => f2.remove()), h2.addClass(this._hand, this._classes.transform), setTimeout(() => {
          h2.removeClass(this._hand, this._classes.transform);
        }, 401), this._getAppendClock(p2, `[${ue2}]`, u2);
        const _2 = () => {
          const f2 = d2.find(`[${X2}]`, this._modal), g2 = d2.find(`[${q2}]`, this._modal);
          this._addActiveClassToTip(f2, r2), this._addActiveClassToTip(g2, a2);
        };
        if (!t2)
          setTimeout(() => {
            _2();
          }, 401);
        else {
          const f2 = d2.find(`[${ht2}]`, this._modal);
          setTimeout(() => {
            this._addActiveClassToTip(f2, r2), _2();
          }, 401);
        }
      };
      e2.forEach((p2) => {
        p2.hasAttribute(H2) && (p2.hasAttribute(uo) ? (h2.addClass(this._hand, this._classes.transform), h2.addStyle(this._hand, {
          transform: `rotateZ(${this._minutes.textContent * 6}deg)`,
          height: "calc(40% + 1px)"
        }), t2 && o2.length > 0 && o2.forEach((u2) => u2.remove()), l2(this.minutesArray, q2), this._hour.style.pointerEvents = "", this._minutes.style.pointerEvents = "none") : p2.hasAttribute(Cs) && (h2.addStyle(this._hand, {
          transform: `rotateZ(${this._hour.textContent * 30}deg)`
        }), Number(this._hour.textContent) > 12 ? (h2.addStyle(this._hand, {
          transform: `rotateZ(${this._hour.textContent * 30 - 360}deg)`,
          height: "21.5%"
        }), Number(this._hour.textContent) > 12 && h2.addStyle(this._hand, {
          height: "21.5%"
        })) : h2.addStyle(this._hand, {
          height: "calc(40% + 1px)"
        }), t2 && this._getAppendClock(this.innerHours, `[${mi}]`, ht2), o2.length > 0 && o2.forEach((u2) => u2.remove()), l2(this.hoursArray, X2), h2.addStyle(this._hour, {
          pointerEvents: "none"
        }), h2.addStyle(this._minutes, {
          pointerEvents: ""
        })));
      });
    });
  }
  _handleDisablingTipsMaxTime(t2, e2, i2, n2) {
    if (!this._options.maxTime && !this._options.disableFuture)
      return;
    const o2 = d2.find(`[${X2}]`), r2 = d2.find(`[${ht2}]`), a2 = d2.find(`[${q2}]`);
    if (!e2 || e2 === t2) {
      Ua(r2, n2, this._classes, this._options.format12), Ua(o2, n2, this._classes, this._options.format12), hg(a2, i2, n2, this._hour.textContent, this._classes, this._options.format12);
      return;
    }
    e2 === "AM" && t2 === "PM" && (o2.forEach((l2) => {
      h2.addClass(l2, this._classes.tipsDisabled), l2.setAttribute(jt2, "");
    }), a2.forEach((l2) => {
      h2.addClass(l2, this._classes.tipsDisabled), l2.setAttribute(jt2, "");
    }));
  }
  _handleDisablingTipsMinTime(t2, e2, i2, n2) {
    if (!this._options.minTime && !this._options.disablePast)
      return;
    const o2 = d2.find(`[${X2}]`), r2 = d2.find(`[${ht2}]`), a2 = d2.find(`[${q2}]`);
    !e2 || e2 === t2 ? (Xa(o2, n2, this._classes, this._options.format12), Xa(r2, n2, this._classes, this._options.format12), dg(a2, i2, n2, this._hour.textContent, this._classes, this._options.format12)) : e2 === "PM" && t2 === "AM" && (o2.forEach((l2) => {
      h2.addClass(l2, this._classes.tipsDisabled), l2.setAttribute(jt2, "");
    }), a2.forEach((l2) => {
      h2.addClass(l2, this._classes.tipsDisabled), l2.setAttribute(jt2, "");
    }));
  }
  _handleSwitchTimeMode() {
    c2.on(document, "click", Es, ({ target: t2 }) => {
      let { maxTime: e2, minTime: i2 } = this._options;
      const { disablePast: n2, disableFuture: o2, format12: r2 } = this._options;
      i2 = Gt2(i2, n2, r2), e2 = qt2(e2, o2, r2);
      const [a2, l2, p2] = R2(e2, false), [u2, _2, f2] = R2(i2, false), g2 = d2.find(`[${X2}]`), m2 = d2.find(`[${q2}]`);
      (() => {
        g2.forEach((v2) => {
          h2.removeClass(v2, this._classes.tipsDisabled), v2.removeAttribute(jt2);
        }), m2.forEach((v2) => {
          h2.removeClass(v2, this._classes.tipsDisabled), v2.removeAttribute(jt2);
        });
      })(), this._handleDisablingTipsMinTime(t2.textContent, f2, _2, u2), this._handleDisablingTipsMaxTime(t2.textContent, p2, l2, a2), this._toggleAmPm(t2.textContent), t2.hasAttribute(H2) || (d2.find(Es).forEach((T2) => {
        T2.hasAttribute(H2) && (h2.removeClass(T2, this._classes.opacity), T2.removeAttribute(H2));
      }), h2.addClass(t2, this._classes.opacity), t2.setAttribute(H2, ""));
    });
  }
  _handleClockClick() {
    let { maxTime: t2, minTime: e2 } = this._options;
    const { disablePast: i2, disableFuture: n2, format12: o2 } = this._options;
    e2 = Gt2(e2, i2, o2), t2 = qt2(t2, n2, o2);
    const r2 = R2(t2, false)[2], a2 = R2(e2, false)[2], l2 = R2(t2, false)[0], p2 = R2(e2, false)[0], u2 = d2.findOne(`[${al}]`);
    K2.on(document, `${Za} ${Qa} ${Ja} ${tl} ${el} ${nl} ${il} ${sl}`, "", (_2) => {
      bs() || _2.preventDefault();
      const { type: f2, target: g2 } = _2, { closeModalOnMinutesClick: m2, switchHoursToMinutesOnClick: b2 } = this._options, v2 = d2.findOne(`[${q2}]`, this._modal) !== null, T2 = d2.findOne(`[${X2}]`, this._modal) !== null, y2 = d2.findOne(`[${ht2}]`, this._modal) !== null, C2 = d2.find(`[${q2}]`, this._modal), E2 = za(_2, u2), w2 = u2.offsetWidth / 2;
      let k2 = Math.atan2(E2.y - w2, E2.x - w2);
      if (bs()) {
        const L2 = za(_2, u2, true);
        k2 = Math.atan2(L2.y - w2, L2.x - w2);
      }
      let D2 = null, O2 = null, x2 = null;
      if (f2 === "mousedown" || f2 === "mousemove" || f2 === "touchmove" || f2 === "touchstart")
        (f2 === "mousedown" || f2 === "touchstart" || f2 === "touchmove") && (this._hasTargetInnerClass(g2) || g2.hasAttribute(al) || g2.hasAttribute(ue2) || g2.hasAttribute(q2) || g2.hasAttribute(X2) || g2.hasAttribute(_o) || g2.hasAttribute(po) || g2.hasAttribute(ll) || g2.hasAttribute(As)) && (this._isMouseMove = true, bs() && _2.touches && (D2 = _2.touches[0].clientX, O2 = _2.touches[0].clientY, x2 = document.elementFromPoint(D2, O2)));
      else if (f2 === "mouseup" || f2 === "touchend") {
        if (this._isMouseMove = false, this._hasTargetInnerClass(g2) || g2.hasAttribute(ue2) || g2.hasAttribute(X2) || g2.hasAttribute(_o) || g2.hasAttribute(po) || g2.hasAttribute(ll) || g2.hasAttribute(As)) {
          if ((T2 || y2) && b2) {
            const L2 = Number(this._hour.textContent) > l2 || Number(this._hour.textContent) < p2;
            if (this._options.format24 && l2 !== "" && p2 !== "" && L2)
              return;
            if (this._options.format24 && p2 !== "" && Number(this._hour.textContent) < p2)
              return;
          }
          c2.trigger(this._minutes, "click");
        }
        if (v2 && m2) {
          const L2 = d2.findOne(`[${ro}]`, this._modal);
          c2.trigger(L2, "click");
        }
      }
      if (v2) {
        let L2;
        const S2 = Math.trunc(k2 * 180 / Math.PI) + 90, { degrees: N2, minute: P2 } = this._makeMinutesDegrees(S2, L2);
        if (this._handlerMaxMinMinutesOptions(N2, P2) === undefined)
          return;
        const { degrees: ot2, minute: rt2 } = this._handlerMaxMinMinutesOptions(N2, P2);
        if (this._isMouseMove) {
          if (h2.addStyle(this._hand, {
            transform: `rotateZ(${ot2}deg)`
          }), rt2 === undefined)
            return;
          const G2 = () => rt2 >= 10 || rt2 === "00" ? rt2 : `0${rt2}`;
          this._minutes.textContent = G2(), this._toggleClassActive(this.minutesArray, this._minutes, C2), this._toggleBackgroundColorCircle(`[${q2}]`), this._objWithDataOnChange.degreesMinutes = ot2, this._objWithDataOnChange.minutes = rt2;
        }
      }
      if (T2 || y2) {
        let L2, S2 = Math.trunc(k2 * 180 / Math.PI) + 90;
        if (S2 = Math.round(S2 / 30) * 30, h2.addStyle(this._circle, {
          backgroundColor: "#1976d2"
        }), this._makeHourDegrees(g2, S2, L2) === undefined)
          return;
        const N2 = () => {
          if (bs() && S2 && x2) {
            const { degrees: P2, hour: ot2 } = this._makeHourDegrees(x2, S2, L2);
            return this._handleMoveHand(x2, ot2, P2);
          } else {
            const { degrees: P2, hour: ot2 } = this._makeHourDegrees(g2, S2, L2);
            return this._handleMoveHand(g2, ot2, P2);
          }
        };
        this._objWithDataOnChange.degreesHours = S2, this._handlerMaxMinHoursOptions(S2, l2, p2, r2, a2, _2) && N2();
      }
      _2.stopPropagation();
    });
  }
  _hasTargetInnerClass(t2) {
    return t2.hasAttribute(mi) || t2.hasAttribute(ht2) || t2.hasAttribute(ys);
  }
  _handleMoveHand(t2, e2, i2) {
    const n2 = d2.find(`[${X2}]`, this._modal), o2 = d2.find(`[${ht2}]`, this._modal);
    this._isMouseMove && (this._hasTargetInnerClass(t2) ? h2.addStyle(this._hand, {
      height: "21.5%"
    }) : h2.addStyle(this._hand, {
      height: "calc(40% + 1px)"
    }), h2.addStyle(this._hand, {
      transform: `rotateZ(${i2}deg)`
    }), this._hour.textContent = e2 >= 10 || e2 === "00" ? e2 : `0${e2}`, this._toggleClassActive(this.hoursArray, this._hour, n2), this._toggleClassActive(this.innerHours, this._hour, o2), this._objWithDataOnChange.hour = e2 >= 10 || e2 === "00" ? e2 : `0${e2}`);
  }
  _handlerMaxMinMinutesOptions(t2, e2) {
    let { maxTime: i2, minTime: n2 } = this._options;
    const { format12: o2, increment: r2, disablePast: a2, disableFuture: l2 } = this._options;
    n2 = Gt2(n2, a2, o2), i2 = qt2(i2, l2, o2);
    const p2 = R2(i2, false)[1], u2 = R2(n2, false)[1], _2 = R2(i2, false)[0], f2 = R2(n2, false)[0], g2 = f2 === "12" && o2 ? "0" : f2, m2 = _2 === "12" && o2 ? "0" : _2, b2 = R2(i2, false)[2], v2 = R2(n2, false)[2], T2 = p2 !== "" ? p2 * 6 : "", y2 = u2 !== "" ? u2 * 6 : "", C2 = Number(this._hour.textContent), E2 = C2 === 12 && o2 ? 0 : C2;
    if (!b2 && !v2) {
      if (i2 !== "" && n2 !== "") {
        if (Number(m2) === E2 && t2 > T2 || Number(g2) === E2 && t2 < y2)
          return t2;
      } else if (n2 !== "" && E2 <= Number(g2)) {
        if (t2 <= y2 - 6)
          return t2;
      } else if (i2 !== "" && E2 >= Number(m2) && t2 >= T2 + 6)
        return t2;
    } else {
      if (n2 !== "") {
        if (v2 === "PM" && this._isAmEnabled)
          return;
        if (v2 === "PM" && this._isPmEnabled) {
          if (E2 < Number(g2))
            return;
          if (E2 <= Number(g2) && t2 <= y2 - 6)
            return t2;
        } else if (v2 === "AM" && this._isAmEnabled) {
          if (E2 < Number(g2))
            return;
          if (E2 <= Number(g2) && t2 <= y2 - 6)
            return t2;
        }
      }
      if (i2 !== "") {
        if (b2 === "AM" && this._isPmEnabled)
          return;
        if (b2 === "PM" && this._isPmEnabled) {
          if (E2 >= Number(m2) && t2 >= T2 + 6)
            return t2;
        } else if (b2 === "AM" && this._isAmEnabled && E2 >= Number(m2) && t2 >= T2 + 6)
          return t2;
      }
    }
    return r2 && (t2 = Math.round(t2 / 30) * 30), t2 < 0 ? t2 = 360 + t2 : t2 >= 360 && (t2 = 0), {
      degrees: t2,
      minute: e2
    };
  }
  _removeModal() {
    this._animations ? setTimeout(() => {
      this._removeModalElements(), this._scrollBar.reset();
    }, 300) : (this._removeModalElements(), this._scrollBar.reset()), K2.off(this._document, `${qa} ${vs} ${Za} ${Qa} ${Ja} ${tl} ${el} ${nl} ${il} ${sl}`), c2.off(window, vs);
  }
  _removeModalElements() {
    this._modal && this._modal.remove();
  }
  _toggleBackdropAnimation(t2 = false) {
    t2 ? this._wrapper.classList.add("animate-[fade-out_350ms_ease-in-out]") : (this._wrapper.classList.add("animate-[fade-in_350ms_ease-in-out]"), this._options.inline || h2.addClass(this._clock, this._classes.clockAnimation)), setTimeout(() => {
      this._wrapper.classList.remove("animate-[fade-out_350ms_ease-in-out]", "animate-[fade-in_350ms_ease-in-out]");
    }, 351);
  }
  _addActiveClassToTip(t2, e2) {
    t2.forEach((i2) => {
      Number(i2.textContent) === Number(e2) && (h2.addClass(i2, this._classes.tipsActive), i2.setAttribute(H2, ""));
    });
  }
  _setHourOrMinute(t2) {
    return t2 < 10 ? `0${t2}` : t2;
  }
  _appendTimes() {
    const { format24: t2 } = this._options;
    if (t2) {
      this._getAppendClock(this.hoursArray, `[${ue2}]`, X2), this._getAppendClock(this.innerHours, `[${mi}]`, ht2);
      return;
    }
    this._getAppendClock(this.hoursArray, `[${ue2}]`, X2);
  }
  _getConfig(t2) {
    const e2 = h2.getDataAttributes(this._element);
    return t2 = {
      ...wg,
      ...e2,
      ...t2
    }, I2(Bi, t2, kg), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...xg,
      ...e2,
      ...t2
    }, I2(Bi, t2, Og), t2;
  }
  _getContainer() {
    return d2.findOne(this._options.container);
  }
  _getValidate(t2) {
    const { format24: e2, format12: i2, appendValidationInfo: n2 } = this._options;
    K2.on(this.input, t2, ({ target: o2 }) => {
      if (this._options === null || this.input.value === "")
        return;
      const r2 = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/, a2 = /^([01]\d|2[0-3])(:[0-5]\d)$/, l2 = r2.test(o2.value);
      if (a2.test(o2.value) !== true && e2 || l2 !== true && i2) {
        n2 && this.input.setAttribute(co, ""), h2.addStyle(o2, { marginBottom: 0 }), this._isInvalidTimeFormat = true;
        return;
      }
      this.input.removeAttribute(co), this._isInvalidTimeFormat = false;
      const u2 = d2.findOne(`[${Cg}]`);
      u2 !== null && u2.remove();
    });
  }
  static getInstance(t2) {
    return A2.getData(t2, Js);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var Ig = {
  threshold: 10,
  direction: "all"
};
var Dg = class {
  constructor(t2, e2) {
    this._element = t2, this._startPosition = null, this._options = {
      ...Ig,
      ...e2
    };
  }
  handleTouchStart(t2) {
    this._startPosition = this._getCoordinates(t2);
  }
  handleTouchMove(t2) {
    if (!this._startPosition)
      return;
    const e2 = this._getCoordinates(t2), i2 = {
      x: e2.x - this._startPosition.x,
      y: e2.y - this._startPosition.y
    }, n2 = this._getDirection(i2);
    if (this._options.direction === "all") {
      if (n2.y.value < this._options.threshold && n2.x.value < this._options.threshold)
        return;
      const r2 = n2.y.value > n2.x.value ? n2.y.direction : n2.x.direction;
      c2.trigger(this._element, `swipe${r2}`), c2.trigger(this._element, "swipe", { direction: r2 }), this._startPosition = null;
      return;
    }
    const o2 = this._options.direction === "left" || this._options === "right" ? "x" : "y";
    n2[o2].direction === this._options.direction && n2[o2].value > this._options.threshold && (c2.trigger(this._element, `swipe${n2[o2].direction}`), this._startPosition = null);
  }
  handleTouchEnd() {
    this._startPosition = null;
  }
  _getCoordinates(t2) {
    const [e2] = t2.touches;
    return {
      x: e2.clientX,
      y: e2.clientY
    };
  }
  _getDirection(t2) {
    return {
      x: {
        direction: t2.x < 0 ? "left" : "right",
        value: Math.abs(t2.x)
      },
      y: {
        direction: t2.y < 0 ? "up" : "down",
        value: Math.abs(t2.y)
      }
    };
  }
};
var $g = class {
  constructor(t2, e2 = "swipe", i2 = {}) {
    this._element = t2, this._event = e2, this.swipe = new Dg(t2, i2), this._touchStartHandler = this._handleTouchStart.bind(this), this._touchMoveHandler = this._handleTouchMove.bind(this), this._touchEndHandler = this._handleTouchEnd.bind(this);
  }
  dispose() {
    this._element.removeEventListener("touchstart", this._touchStartHandler), this._element.removeEventListener("touchmove", this._touchMoveHandler), window.removeEventListener("touchend", this._touchEndHandler);
  }
  init() {
    this._element.addEventListener("touchstart", (t2) => this._handleTouchStart(t2)), this._element.addEventListener("touchmove", (t2) => this._handleTouchMove(t2)), window.addEventListener("touchend", (t2) => this._handleTouchEnd(t2));
  }
  _handleTouchStart(t2) {
    this[this._event].handleTouchStart(t2);
  }
  _handleTouchMove(t2) {
    this[this._event].handleTouchMove(t2);
  }
  _handleTouchEnd(t2) {
    this[this._event].handleTouchEnd(t2);
  }
};
var hl = "sidenav";
var ws = "te.sidenav";
var Lg = "data-te-sidenav-rotate-icon-ref";
var fo = "[data-te-sidenav-toggle-ref]";
var Ng = "[data-te-collapse-init]";
var Mg = '[data-te-sidenav-slim="true"]';
var Rg = '[data-te-sidenav-slim="false"]';
var Pg = "[data-te-sidenav-menu-ref]";
var Le2 = "[data-te-sidenav-collapse-ref]";
var gi = "[data-te-sidenav-link-ref]";
var Bg = W2() ? 100 : -100;
var Hg = W2() ? -100 : 100;
var Vg = {
  sidenavAccordion: "(boolean)",
  sidenavBackdrop: "(boolean)",
  sidenavBackdropClass: "(null|string)",
  sidenavCloseOnEsc: "(boolean)",
  sidenavColor: "(string)",
  sidenavContent: "(null|string)",
  sidenavExpandable: "(boolean)",
  sidenavExpandOnHover: "(boolean)",
  sidenavFocusTrap: "(boolean)",
  sidenavHidden: "(boolean)",
  sidenavMode: "(string)",
  sidenavModeBreakpointOver: "(null|string|number)",
  sidenavModeBreakpointSide: "(null|string|number)",
  sidenavModeBreakpointPush: "(null|string|number)",
  sidenavBreakpointSm: "(number)",
  sidenavBreakpointMd: "(number)",
  sidenavBreakpointLg: "(number)",
  sidenavBreakpointXl: "(number)",
  sidenavBreakpoint2xl: "(number)",
  sidenavScrollContainer: "(null|string)",
  sidenavSlim: "(boolean)",
  sidenavSlimCollapsed: "(boolean)",
  sidenavSlimWidth: "(number)",
  sidenavPosition: "(string)",
  sidenavRight: "(boolean)",
  sidenavTransitionDuration: "(number)",
  sidenavWidth: "(number)"
};
var Wg = {
  sidenavAccordion: false,
  sidenavBackdrop: true,
  sidenavBackdropClass: null,
  sidenavCloseOnEsc: true,
  sidenavColor: "primary",
  sidenavContent: null,
  sidenavExpandable: true,
  sidenavExpandOnHover: false,
  sidenavFocusTrap: true,
  sidenavHidden: true,
  sidenavMode: "over",
  sidenavModeBreakpointOver: null,
  sidenavModeBreakpointSide: null,
  sidenavModeBreakpointPush: null,
  sidenavBreakpointSm: 640,
  sidenavBreakpointMd: 768,
  sidenavBreakpointLg: 1024,
  sidenavBreakpointXl: 1280,
  sidenavBreakpoint2xl: 1536,
  sidenavScrollContainer: null,
  sidenavSlim: false,
  sidenavSlimCollapsed: false,
  sidenavSlimWidth: 77,
  sidenavPosition: "fixed",
  sidenavRight: false,
  sidenavTransitionDuration: 300,
  sidenavWidth: 240
};

class Ci {
  constructor(t2, e2 = {}) {
    wt2(this, "_addBackdropOnInit", () => {
      this._options.sidenavHidden || (this._backdrop.show(), c2.off(this._element, "transitionend", this._addBackdropOnInit));
    });
    this._element = t2, this._options = e2, this._ID = et2(""), this._content = null, this._initialContentStyle = null, this._slimCollapsed = false, this._activeNode = null, this._tempSlim = false, this._backdrop = this._initializeBackDrop(), this._focusTrap = null, this._perfectScrollbar = null, this._touch = null, this._setModeFromBreakpoints(), this.escHandler = (i2) => {
      i2.keyCode === we2 && this.toggler && Mt2(this.toggler) && (this._update(false), c2.off(window, "keydown", this.escHandler));
    }, this.hashHandler = () => {
      this._setActiveElements();
    }, t2 && (A2.setData(t2, ws, this), this._setup()), this.options.sidenavBackdrop && !this.options.sidenavHidden && this.options.sidenavMode === "over" && c2.on(this._element, "transitionend", this._addBackdropOnInit), this._didInit = false, this._init();
  }
  static get NAME() {
    return hl;
  }
  get container() {
    if (this.options.sidenavPosition === "fixed")
      return d2.findOne("body");
    const t2 = (e2) => !e2.parentNode || e2.parentNode === document ? e2 : e2.parentNode.style.position === "relative" || e2.parentNode.classList.contains("relative") ? e2.parentNode : t2(e2.parentNode);
    return t2(this._element);
  }
  get isVisible() {
    let t2 = 0, e2 = window.innerWidth;
    if (this.options.sidenavPosition !== "fixed") {
      const n2 = this.container.getBoundingClientRect();
      t2 = n2.x, e2 = n2.x + n2.width;
    }
    const { x: i2 } = this._element.getBoundingClientRect();
    if (this.options.sidenavRight && !W2() || !this.options.sidenavRight && W2()) {
      let n2 = 0;
      if (this.container.scrollHeight > this.container.clientHeight && (n2 = this.container.offsetWidth - this.container.clientWidth), this.container.tagName === "BODY") {
        const o2 = document.documentElement.clientWidth;
        n2 = Math.abs(window.innerWidth - o2);
      }
      return Math.abs(i2 + n2 - e2) > 10;
    }
    return Math.abs(i2 - t2) < 10;
  }
  get links() {
    return d2.find(gi, this._element);
  }
  get navigation() {
    return d2.find(Pg, this._element);
  }
  get options() {
    const t2 = {
      ...Wg,
      ...h2.getDataAttributes(this._element),
      ...this._options
    };
    return I2(hl, t2, Vg), t2;
  }
  get sidenavStyle() {
    return {
      width: `${this.width}px`,
      height: this.options.sidenavPosition === "fixed" ? "100vh" : "100%",
      position: this.options.sidenavPosition,
      transition: `all ${this.transitionDuration} linear`
    };
  }
  get toggler() {
    return d2.find(fo).find((e2) => {
      const i2 = h2.getDataAttribute(e2, "target");
      return d2.findOne(i2) === this._element;
    });
  }
  get transitionDuration() {
    return `${this.options.sidenavTransitionDuration / 1000}s`;
  }
  get translation() {
    return this.options.sidenavRight ? Hg : Bg;
  }
  get width() {
    return this._slimCollapsed ? this.options.sidenavSlimWidth : this.options.sidenavWidth;
  }
  get isBackdropVisible() {
    return !!this._backdrop._element;
  }
  changeMode(t2) {
    this._setMode(t2);
  }
  dispose() {
    c2.off(window, "keydown", this.escHandler), this.options.sidenavBackdrop && this._backdrop.dispose(), c2.off(window, "hashchange", this.hashHandler), this._touch.dispose(), A2.removeData(this._element, ws), this._element = null;
  }
  hide() {
    this._emitEvents(false), this._update(false), this._options.sidenavBackdrop && this.isBackdropVisible && this._backdrop.hide();
  }
  show() {
    this._emitEvents(true), this._update(true), this._options.sidenavBackdrop && this._options.sidenavMode === "over" && this._backdrop.show();
  }
  toggle() {
    this._emitEvents(!this.isVisible), this._update(!this.isVisible);
  }
  toggleSlim() {
    this._setSlim(!this._slimCollapsed);
  }
  update(t2) {
    this._options = t2, this._setup();
  }
  getBreakpoint(t2) {
    return this._transformBreakpointValuesToObject()[t2];
  }
  _init() {
    this._didInit || (c2.on(document, "click", fo, Ci.toggleSidenav()), this._didInit = true);
  }
  _transformBreakpointValuesToObject() {
    return {
      sm: this.options.sidenavBreakpointSm,
      md: this.options.sidenavBreakpointMd,
      lg: this.options.sidenavBreakpointLg,
      xl: this.options.sidenavBreakpointXl,
      "2xl": this.options.sidenavBreakpoint2xl
    };
  }
  _setModeFromBreakpoints() {
    const t2 = window.innerWidth, e2 = this._transformBreakpointValuesToObject();
    if (t2 === undefined || !e2)
      return;
    const i2 = typeof this.options.sidenavModeBreakpointOver == "number" ? t2 - this.options.sidenavModeBreakpointOver : t2 - e2[this.options.sidenavModeBreakpointOver], n2 = typeof this.options.sidenavModeBreakpointSide == "number" ? t2 - this.options.sidenavModeBreakpointSide : t2 - e2[this.options.sidenavModeBreakpointSide], o2 = typeof this.options.sidenavModeBreakpointPush == "number" ? t2 - this.options.sidenavModeBreakpointPush : t2 - e2[this.options.sidenavModeBreakpointPush], r2 = (l2, p2) => l2 - p2 < 0 ? -1 : p2 - l2 < 0 ? 1 : 0, a2 = [i2, n2, o2].filter((l2) => l2 != null && l2 >= 0).sort(r2)[0];
    i2 > 0 && i2 === a2 ? (this._options.sidenavMode = "over", this._options.sidenavHidden = true) : n2 > 0 && n2 === a2 ? this._options.sidenavMode = "side" : o2 > 0 && o2 === a2 && (this._options.sidenavMode = "push");
  }
  _collapseItems() {
    this.navigation.forEach((t2) => {
      d2.find(Le2, t2).forEach((i2) => {
        Qt2.getInstance(i2).hide();
      });
    });
  }
  _getOffsetValue(t2, { index: e2, property: i2, offsets: n2 }) {
    const o2 = this._getPxValue(this._initialContentStyle[e2][n2[i2].property]), r2 = t2 ? n2[i2].value : 0;
    return o2 + r2;
  }
  _getProperty(...t2) {
    return t2.map((e2, i2) => i2 === 0 ? e2 : e2[0].toUpperCase().concat(e2.slice(1))).join("");
  }
  _getPxValue(t2) {
    return t2 ? parseFloat(t2) : 0;
  }
  _handleSwipe(t2, e2) {
    e2 && this._slimCollapsed && this.options.sidenavSlim && this.options.sidenavExpandable ? this.toggleSlim() : e2 || (this._slimCollapsed || !this.options.sidenavSlim || !this.options.sidenavExpandable ? this.toggler && Mt2(this.toggler) && this.toggle() : this.toggleSlim());
  }
  _isActive(t2, e2) {
    return e2 ? e2 === t2 : t2.attributes.href ? new URL(t2, window.location.href).href === window.location.href : false;
  }
  _isAllToBeCollapsed() {
    return d2.find(Ng, this._element).filter((i2) => i2.getAttribute("aria-expanded") === "true").length === 0;
  }
  _isAllCollapsed() {
    return d2.find(Le2, this._element).filter((t2) => Mt2(t2)).length === 0;
  }
  _initializeBackDrop() {
    if (!this.options.sidenavBackdrop)
      return;
    const t2 = this.options.sidenavBackdropClass ? this.options.sidenavBackdropClass.split(" ") : this.options.sidenavPosition ? [
      "opacity-50",
      "transition-all",
      "duration-300",
      "ease-in-out",
      this.options.sidenavPosition,
      "top-0",
      "left-0",
      "z-50",
      "bg-black/10",
      "dark:bg-black-60",
      "w-full",
      "h-full",
      this._element.id
    ] : null;
    return new Cr2({
      isVisible: this.options.sidenavBackdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      backdropClasses: t2,
      clickCallback: () => this.hide()
    });
  }
  _updateBackdrop(t2) {
    if (this.options.sidenavMode === "over") {
      t2 ? this._backdrop.show() : this.isBackdropVisible && this._backdrop.hide();
      return;
    }
    this.isBackdropVisible && this._backdrop.hide();
  }
  _setup() {
    this._setupTouch(), this.options.sidenavFocusTrap && this._setupFocusTrap(), this._setupCollapse(), this.options.sidenavSlim && this._setupSlim(), this._setupInitialStyling(), this._setupScrolling(), this.options.sidenavContent && this._setupContent(), this._setupActiveState(), this._setupRippleEffect(), this.options.sidenavHidden || this._updateOffsets(true, true), this.options.sidenavMode === "over" && this._setTabindex(true);
  }
  _setupActiveState() {
    this._setActiveElements(), this.links.forEach((t2) => {
      c2.on(t2, "click", () => this._setActiveElements(t2)), c2.on(t2, "keydown", (e2) => {
        e2.keyCode === it2 && this._setActiveElements(t2);
      });
    }), c2.on(window, "hashchange", this.hashHandler);
  }
  _setupCollapse() {
    this.navigation.forEach((t2, e2) => {
      d2.find(Le2, t2).forEach((n2, o2) => this._setupCollapseList({ list: n2, index: o2, menu: t2, menuIndex: e2 }));
    });
  }
  _generateCollpaseID(t2, e2) {
    return `sidenav-collapse-${this._ID}-${e2}-${t2}`;
  }
  _setupCollapseList({ list: t2, index: e2, menu: i2, menuIndex: n2 }) {
    const o2 = this._generateCollpaseID(e2, n2);
    t2.setAttribute("id", o2), t2.setAttribute("data-te-collapse-item", "");
    const [r2] = d2.prev(t2, gi);
    h2.setDataAttribute(r2, "collapse-init", ""), r2.setAttribute("href", `#${o2}`), r2.setAttribute("role", "button");
    const a2 = Qt2.getInstance(t2) || new Qt2(t2, {
      toggle: false,
      parent: this.options.sidenavAccordion ? i2 : t2
    });
    (t2.dataset.teSidenavStateShow === "" || t2.dataset.teCollapseShow === "") && this._rotateArrow(r2, false), c2.on(r2, "click", (l2) => {
      this._toggleCategory(l2, a2, t2), this._tempSlim && this._isAllToBeCollapsed() && (this._setSlim(true), this._tempSlim = false), this.options.sidenavMode === "over" && this._focusTrap && this._focusTrap.update();
    }), c2.on(t2, "show.te.collapse", () => this._rotateArrow(r2, false)), c2.on(t2, "hide.te.collapse", () => this._rotateArrow(r2, true)), c2.on(t2, "shown.te.collapse", () => {
      this.options.sidenavMode === "over" && this._focusTrap && this._focusTrap.update();
    }), c2.on(t2, "hidden.te.collapse", () => {
      this._tempSlim && this._isAllCollapsed() && (this._setSlim(true), this._tempSlim = false), this.options.sidenavMode === "over" && this._focusTrap && this._focusTrap.update();
    });
  }
  _setupContent() {
    this._content = d2.find(this.options.sidenavContent), this._content.forEach((t2) => {
      const e2 = [
        "!p",
        "!m",
        "!px",
        "!pl",
        "!pr",
        "!mx",
        "!ml",
        "!mr",
        "!-p",
        "!-m",
        "!-px",
        "!-pl",
        "!-pr",
        "!-mx",
        "!-ml",
        "!-mr"
      ];
      [...t2.classList].filter((n2) => e2.findIndex((o2) => n2.includes(o2)) >= 0).forEach((n2) => t2.classList.remove(n2));
    }), this._initialContentStyle = this._content.map((t2) => {
      const { paddingLeft: e2, paddingRight: i2, marginLeft: n2, marginRight: o2, transition: r2 } = window.getComputedStyle(t2);
      return { paddingLeft: e2, paddingRight: i2, marginLeft: n2, marginRight: o2, transition: r2 };
    });
  }
  _setupFocusTrap() {
    this._focusTrap = new zi(this._element, {
      event: "keydown",
      condition: (t2) => t2.keyCode === ke2,
      onlyVisible: true
    }, this.toggler);
  }
  _setupInitialStyling() {
    this._setColor(), h2.style(this._element, this.sidenavStyle);
  }
  _setupScrolling() {
    let t2 = this._element;
    if (this.options.sidenavScrollContainer) {
      t2 = d2.findOne(this.options.sidenavScrollContainer, this._element);
      const i2 = fd(t2.parentNode.children).filter((n2) => n2 !== t2).reduce((n2, o2) => n2 + o2.clientHeight, 0);
      h2.style(t2, {
        maxHeight: `calc(100% - ${i2}px)`,
        position: "relative"
      });
    }
    this._perfectScrollbar = new Bh(t2, {
      suppressScrollX: true,
      handlers: ["click-rail", "drag-thumb", "wheel", "touch"]
    });
  }
  _setupSlim() {
    this._slimCollapsed = this.options.sidenavSlimCollapsed, this._toggleSlimDisplay(this._slimCollapsed), this.options.sidenavExpandOnHover && (this._element.addEventListener("mouseenter", () => {
      this._slimCollapsed && this._setSlim(false);
    }), this._element.addEventListener("mouseleave", () => {
      this._slimCollapsed || this._setSlim(true);
    }));
  }
  _setupRippleEffect() {
    this.links.forEach((t2) => {
      let e2 = ei.getInstance(t2), i2 = this.options.sidenavColor;
      if (e2 && e2._options.sidenavColor !== this.options.sidenavColor)
        e2.dispose();
      else if (e2)
        return;
      (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) && (i2 = "white"), e2 = new ei(t2, { rippleColor: i2 });
    });
  }
  _setupTouch() {
    this._touch = new $g(this._element, "swipe", { threshold: 20 }), this._touch.init(), c2.on(this._element, "swipeleft", (t2) => this._handleSwipe(t2, this.options.sidenavRight)), c2.on(this._element, "swiperight", (t2) => this._handleSwipe(t2, !this.options.sidenavRight));
  }
  _setActive(t2, e2) {
    t2.setAttribute("data-te-sidebar-state-active", ""), this._activeNode && t2.removeAttribute("data-te-sidebar-state-active"), this._activeNode = t2;
    const [i2] = d2.parents(this._activeNode, Le2);
    if (!i2) {
      this._setActiveCategory();
      return;
    }
    const [n2] = d2.prev(i2, gi);
    this._setActiveCategory(n2), !e2 && !this._slimCollapsed && Qt2.getInstance(i2).show();
  }
  _setActiveCategory(t2) {
    this.navigation.forEach((e2) => {
      d2.find(Le2, e2).forEach((n2) => {
        const [o2] = d2.prev(n2, gi);
        o2 !== t2 ? o2.removeAttribute("data-te-sidenav-state-active") : o2.setAttribute("data-te-sidenav-state-active", "");
      });
    });
  }
  _setActiveElements(t2) {
    this.navigation.forEach((e2) => {
      d2.find(gi, e2).filter((n2) => d2.next(n2, Le2).length === 0).forEach((n2) => {
        this._isActive(n2, t2) && n2 !== this._activeNode && this._setActive(n2, t2);
      });
    }), t2 && this._updateFocus(this.isVisible);
  }
  _setColor() {
    const t2 = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark"
    ], { sidenavColor: e2 } = this.options, i2 = t2.includes(e2) ? e2 : "primary";
    t2.forEach((n2) => {
      this._element.classList.remove(`sidenav-${n2}`);
    }), h2.addClass(this._element, `sidenav-${i2}`);
  }
  _setContentOffsets(t2, e2, i2) {
    this._content.forEach((n2, o2) => {
      const r2 = this._getOffsetValue(t2, {
        index: o2,
        property: "padding",
        offsets: e2
      }), a2 = this._getOffsetValue(t2, {
        index: o2,
        property: "margin",
        offsets: e2
      }), l2 = {};
      if (i2 || (l2.transition = `all ${this.transitionDuration} linear`), l2[e2.padding.property] = `${r2}px`, l2[e2.margin.property] = `${a2}px`, h2.style(n2, l2), !!t2) {
        if (i2) {
          h2.style(n2, {
            transition: this._initialContentStyle[o2].transition
          });
          return;
        }
        c2.on(n2, "transitionend", () => {
          h2.style(n2, {
            transition: this._initialContentStyle[o2].transition
          });
        });
      }
    });
  }
  _setMode(t2) {
    this.options.sidenavMode !== t2 && (this._options.sidenavMode = t2, this._update(this.isVisible));
  }
  _setSlim(t2) {
    const e2 = t2 ? ["collapse", "collapsed"] : ["expand", "expanded"];
    this._triggerEvents(...e2), t2 && this._collapseItems(), this._slimCollapsed = t2, this._toggleSlimDisplay(t2), h2.style(this._element, { width: `${this.width}px` }), this._updateOffsets(this.isVisible);
  }
  _setTabindex(t2) {
    this.links.forEach((e2) => {
      e2.tabIndex = t2 ? 0 : -1;
    });
  }
  _emitEvents(t2) {
    const e2 = t2 ? ["show", "shown"] : ["hide", "hidden"];
    this._triggerEvents(...e2);
  }
  _rotateArrow(t2, e2) {
    const [i2] = d2.children(t2, `[${Lg}]`);
    i2 && (e2 ? h2.removeClass(i2, "rotate-180") : h2.addClass(i2, "rotate-180"));
  }
  _toggleCategory(t2, e2) {
    t2.preventDefault(), e2.toggle(), this._slimCollapsed && this.options.sidenavExpandable && (this._tempSlim = true, this._setSlim(false));
  }
  _toggleSlimDisplay(t2) {
    const e2 = d2.find(Mg, this._element), i2 = d2.find(Rg, this._element), n2 = () => {
      e2.forEach((o2) => {
        h2.style(o2, {
          display: this._slimCollapsed ? "unset" : "none"
        });
      }), i2.forEach((o2) => {
        h2.style(o2, {
          display: this._slimCollapsed ? "none" : "unset"
        });
      });
    };
    t2 ? setTimeout(() => n2(), this.options.sidenavTransitionDuration) : n2();
  }
  async _triggerEvents(t2, e2) {
    c2.trigger(this._element, `${t2}.te.sidenav`), e2 && await setTimeout(() => {
      c2.trigger(this._element, `${e2}.te.sidenav`);
    }, this.options.sidenavTransitionDuration + 5);
  }
  _isiPhone() {
    return /iPhone|iPod/i.test(navigator.userAgent);
  }
  _update(t2) {
    t2 && this._isiPhone() && h2.addClass(this._element, "ps--scrolling-y"), this.toggler && this._updateTogglerAria(t2), this._updateDisplay(t2), this.options.sidenavBackdrop && this._updateBackdrop(t2), this._updateOffsets(t2), t2 && this.options.sidenavCloseOnEsc && this.options.sidenavMode !== "side" && c2.on(window, "keydown", this.escHandler), this.options.sidenavFocusTrap && this._updateFocus(t2);
  }
  _updateDisplay(t2) {
    const e2 = t2 ? 0 : this.translation;
    h2.style(this._element, {
      transform: `translateX(${e2}%)`
    });
  }
  _updateFocus(t2) {
    if (this._setTabindex(t2), this.options.sidenavMode === "over" && this.options.sidenavFocusTrap) {
      if (t2) {
        this._focusTrap.trap();
        return;
      }
      this._focusTrap.disable();
    }
    this._focusTrap.disable();
  }
  _updateOffsets(t2, e2 = false) {
    const [i2, n2] = this.options.sidenavRight ? ["right", "left"] : ["left", "right"], o2 = {
      property: this._getProperty("padding", i2),
      value: this.options.sidenavMode === "over" ? 0 : this.width
    }, r2 = {
      property: this._getProperty("margin", n2),
      value: this.options.sidenavMode === "push" ? -1 * this.width : 0
    };
    c2.trigger(this._element, "update.te.sidenav", {
      margin: r2,
      padding: o2
    }), this._content && (this._content.className = "", this._setContentOffsets(t2, { padding: o2, margin: r2 }, e2));
  }
  _updateTogglerAria(t2) {
    this.toggler.setAttribute("aria-expanded", t2);
  }
  static toggleSidenav() {
    return function(t2) {
      const e2 = d2.closest(t2.target, fo), i2 = h2.getDataAttributes(e2).target;
      d2.find(i2).forEach((n2) => {
        (Ci.getInstance(n2) || new Ci(n2)).toggle();
      });
    };
  }
  static jQueryInterface(t2, e2) {
    return this.each(function() {
      let i2 = A2.getData(this, ws);
      const n2 = typeof t2 == "object" && t2;
      if (!(!i2 && /dispose/.test(t2)) && (i2 || (i2 = new Ci(this, n2)), typeof t2 == "string")) {
        if (typeof i2[t2] > "u")
          throw new TypeError(`No method named "${t2}"`);
        i2[t2](e2);
      }
    });
  }
  static getInstance(t2) {
    return A2.getData(t2, ws);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var Zo = "stepper";
var tn = "te.stepper";
var ai = `.${tn}`;
var Ui = `data-te-${Zo}`;
var Fg = `onChangeStep${ai}`;
var Yg = `onChangedStep${ai}`;
var dl = `mousedown${ai}`;
var ul = `keydown${ai}`;
var zg = `keyup${ai}`;
var pl = `resize${ai}`;
var Kt2 = `[${Ui}-step-ref]`;
var Z2 = `[${Ui}-head-ref]`;
var _l = `[${Ui}-head-text-ref]`;
var ks = `[${Ui}-head-icon-ref]`;
var Q2 = `[${Ui}-content-ref]`;
var fl = "data-te-input-state-active";
var xs = "data-te-input-selected";
var ml = "data-te-input-multiple-active";
var gl = "[data-te-form-check-input]";

class bl {
  constructor(t2, e2, i2, n2, o2, r2, a2, l2, p2, u2, _2) {
    this.id = t2, this.nativeOption = e2, this.multiple = i2, this.value = n2, this.label = o2, this.selected = r2, this.disabled = a2, this.hidden = l2, this.secondaryText = p2, this.groupId = u2, this.icon = _2, this.node = null, this.active = false;
  }
  select() {
    this.multiple ? this._selectMultiple() : this._selectSingle();
  }
  _selectSingle() {
    this.selected || (this.node.setAttribute(xs, ""), this.node.setAttribute("aria-selected", true), this.selected = true, this.nativeOption && (this.nativeOption.selected = true));
  }
  _selectMultiple() {
    if (!this.selected) {
      const t2 = d2.findOne(gl, this.node);
      t2.checked = true, this.node.setAttribute(xs, ""), this.node.setAttribute("aria-selected", true), this.selected = true, this.nativeOption && (this.nativeOption.selected = true);
    }
  }
  deselect() {
    this.multiple ? this._deselectMultiple() : this._deselectSingle();
  }
  _deselectSingle() {
    this.selected && (this.node.removeAttribute(xs), this.node.setAttribute("aria-selected", false), this.selected = false, this.nativeOption && (this.nativeOption.selected = false));
  }
  _deselectMultiple() {
    if (this.selected) {
      const t2 = d2.findOne(gl, this.node);
      t2.checked = false, this.node.removeAttribute(xs), this.node.setAttribute("aria-selected", false), this.selected = false, this.nativeOption && (this.nativeOption.selected = false);
    }
  }
  setNode(t2) {
    this.node = t2;
  }
  setActiveStyles() {
    if (!this.active) {
      if (this.multiple) {
        this.node.setAttribute(ml, "");
        return;
      }
      this.active = true, this.node.setAttribute(fl, "");
    }
  }
  removeActiveStyles() {
    this.active && (this.active = false, this.node.removeAttribute(fl)), this.multiple && this.node.removeAttribute(ml);
  }
}

class Ug {
  constructor(t2 = false) {
    this._multiple = t2, this._selections = [];
  }
  select(t2) {
    this._multiple ? this._selections.push(t2) : this._selections = [t2];
  }
  deselect(t2) {
    if (this._multiple) {
      const e2 = this._selections.findIndex((i2) => t2 === i2);
      this._selections.splice(e2, 1);
    } else
      this._selections = [];
  }
  clear() {
    this._selections = [];
  }
  get selection() {
    return this._selections[0];
  }
  get selections() {
    return this._selections;
  }
  get label() {
    return this._selections[0] && this.selection.label;
  }
  get labels() {
    return this._selections.map((t2) => t2.label).join(", ");
  }
  get value() {
    return this.selections[0] && this.selection.value;
  }
  get values() {
    return this._selections.map((t2) => t2.value);
  }
}
var Xg = "data-te-select-form-outline-ref";
var Gg = "data-te-select-wrapper-ref";
var qg = "data-te-select-input-ref";
var Zg = "data-te-select-clear-btn-ref";
var Qg = "data-te-select-dropdown-container-ref";
var Jg = "data-te-select-dropdown-ref";
var tb = "data-te-select-options-wrapper-ref";
var eb = "data-te-select-options-list-ref";
var ib = "data-te-select-input-filter-ref";
var Eh = "data-te-select-option-ref";
var sb = "data-te-select-option-all-ref";
var nb = "data-te-select-option-text-ref";
var ob = "data-te-form-check-input";
var rb = "data-te-select-option-group-ref";
var ab = "data-te-select-option-group-label-ref";
var Ch = "data-te-select-selected";
var lb = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
`;
var cb = (s2) => {
  s2.code === "Tab" || s2.code === "Esc" || s2.preventDefault();
};
var mo = "select";
var yi = "te.select";
var Xi = `.${yi}`;
var Tb = `close${Xi}`;
var Eb = `open${Xi}`;
var Tl = `optionSelect${Xi}`;
var El = `optionDeselect${Xi}`;
var Cb = `valueChange${Xi}`;
var Ab = "change";
var Cl = "data-te-select-init";
var xh = "data-te-select-no-results-ref";
var Al = "data-te-select-open";
var J2 = "data-te-input-state-active";
var zt2 = "data-te-input-focused";
var go = "data-te-input-disabled";
var yb = "data-te-select-option-group-label-ref";
var wb = "data-te-select-option-all-ref";
var bi = "data-te-select-selected";
var kb = "[data-te-select-label-ref]";
var yl = "[data-te-select-input-ref]";
var xb = "[data-te-select-input-filter-ref]";
var Ob = "[data-te-select-dropdown-ref]";
var Sb = "[data-te-select-options-wrapper-ref]";
var wl = "[data-te-select-options-list-ref]";
var Ib = "[data-te-select-option-ref]";
var Db = "[data-te-select-clear-btn-ref]";
var $b = "[data-te-select-custom-content-ref]";
var Lb = `[${xh}]`;
var kl = "[data-te-select-form-outline-ref]";
var Nb = "[data-te-select-toggle]";
var bo = "[data-te-input-notch-ref]";
var Mb = {
  selectAutoSelect: false,
  selectContainer: "body",
  selectClearButton: false,
  disabled: false,
  selectDisplayedLabels: 5,
  selectFormWhite: false,
  multiple: false,
  selectOptionsSelectedLabel: "options selected",
  selectOptionHeight: 38,
  selectAll: true,
  selectAllLabel: "Select all",
  selectSearchPlaceholder: "Search...",
  selectSize: "default",
  selectVisibleOptions: 5,
  selectFilter: false,
  selectFilterDebounce: 300,
  selectNoResultText: "No results",
  selectValidation: false,
  selectValidFeedback: "Valid",
  selectInvalidFeedback: "Invalid",
  selectPlaceholder: ""
};
var Rb = {
  selectAutoSelect: "boolean",
  selectContainer: "string",
  selectClearButton: "boolean",
  disabled: "boolean",
  selectDisplayedLabels: "number",
  selectFormWhite: "boolean",
  multiple: "boolean",
  selectOptionsSelectedLabel: "string",
  selectOptionHeight: "number",
  selectAll: "boolean",
  selectAllLabel: "string",
  selectSearchPlaceholder: "string",
  selectSize: "string",
  selectVisibleOptions: "number",
  selectFilter: "boolean",
  selectFilterDebounce: "number",
  selectNoResultText: "string",
  selectValidation: "boolean",
  selectValidFeedback: "string",
  selectInvalidFeedback: "string",
  selectPlaceholder: "string"
};
var Pb = {
  dropdown: "relative outline-none min-w-[100px] m-0 scale-y-[0.8] opacity-0 bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.16),_0_2px_10px_0_rgba(0,0,0,0.12)] transition duration-200 motion-reduce:transition-none data-[te-select-open]:scale-100 data-[te-select-open]:opacity-100 dark:bg-zinc-700",
  formCheckInput: "relative float-left mt-[0.15rem] mr-[8px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent",
  formOutline: "relative",
  initialized: "hidden",
  inputGroup: "flex items-center whitespace-nowrap p-2.5 text-center text-base font-normal leading-[1.6] text-gray-700 dark:bg-zinc-800 dark:text-gray-200 dark:placeholder:text-gray-200",
  noResult: "flex items-center px-4",
  optionsList: "list-none m-0 p-0",
  optionsWrapper: "overflow-y-auto",
  optionsWrapperScrollbar: "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-button]:block [&::-webkit-scrollbar-button]:h-0 [&::-webkit-scrollbar-button]:bg-transparent [&::-webkit-scrollbar-track-piece]:bg-transparent [&::-webkit-scrollbar-track-piece]:rounded-none [&::-webkit-scrollbar-track-piece]: [&::-webkit-scrollbar-track-piece]:rounded-l [&::-webkit-scrollbar-thumb]:h-[50px] [&::-webkit-scrollbar-thumb]:bg-[#999] [&::-webkit-scrollbar-thumb]:rounded",
  selectArrow: "absolute right-3 text-[0.8rem] cursor-pointer peer-focus:text-primary peer-data-[te-input-focused]:text-primary group-data-[te-was-validated]/validation:peer-valid:text-green-600 group-data-[te-was-validated]/validation:peer-invalid:text-[rgb(220,76,100)] w-5 h-5",
  selectArrowWhite: "text-gray-50 peer-focus:!text-white peer-data-[te-input-focused]:!text-white",
  selectArrowDefault: "top-2",
  selectArrowLg: "top-[13px]",
  selectArrowSm: "top-1",
  selectClearBtn: "absolute top-2 right-9 text-black cursor-pointer focus:text-primary outline-none dark:text-gray-200",
  selectClearBtnWhite: "!text-gray-50",
  selectClearBtnDefault: "top-2 text-base",
  selectClearBtnLg: "top-[11px] text-base",
  selectClearBtnSm: "top-1 text-[0.8rem]",
  selectDropdownContainer: "z-[1070]",
  selectFakeValue: "transform-none hidden data-[te-input-state-active]:block",
  selectFilterInput: "relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition duration-300 ease-in-out motion-reduce:transition-none focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-200",
  selectInput: "peer block min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-gray-200 dark:placeholder:text-gray-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 cursor-pointer data-[te-input-disabled]:bg-[#e9ecef] data-[te-input-disabled]:cursor-default group-data-[te-was-validated]/validation:mb-4 dark:data-[te-input-disabled]:bg-zinc-600",
  selectInputWhite: "!text-gray-50",
  selectInputSizeDefault: "py-[0.32rem] px-3 leading-[1.6]",
  selectInputSizeLg: "py-[0.32rem] px-3 leading-[2.15]",
  selectInputSizeSm: "py-[0.33rem] px-3 text-xs leading-[1.5]",
  selectLabel: "pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate text-gray-500 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200 data-[te-input-state-active]:scale-[0.8] dark:peer-focus:text-primary",
  selectLabelWhite: "!text-gray-50",
  selectLabelSizeDefault: "pt-[0.37rem] leading-[1.6] peer-focus:-translate-y-[0.9rem] peer-data-[te-input-state-active]:-translate-y-[0.9rem] data-[te-input-state-active]:-translate-y-[0.9rem]",
  selectLabelSizeLg: "pt-[0.37rem] leading-[2.15] peer-focus:-translate-y-[1.15rem] peer-data-[te-input-state-active]:-translate-y-[1.15rem] data-[te-input-state-active]:-translate-y-[1.15rem]",
  selectLabelSizeSm: "pt-[0.37rem] text-xs leading-[1.5] peer-focus:-translate-y-[0.75rem] peer-data-[te-input-state-active]:-translate-y-[0.75rem] data-[te-input-state-active]:-translate-y-[0.75rem]",
  selectOption: "flex flex-row items-center justify-between w-full px-4 truncate text-gray-700 bg-transparent select-none cursor-pointer data-[te-input-multiple-active]:bg-black/5 hover:[&:not([data-te-select-option-disabled])]:bg-black/5 data-[te-input-state-active]:bg-black/5 data-[te-select-option-selected]:data-[te-input-state-active]:bg-black/5 data-[te-select-selected]:data-[te-select-option-disabled]:cursor-default data-[te-select-selected]:data-[te-select-option-disabled]:text-gray-400 data-[te-select-selected]:data-[te-select-option-disabled]:bg-transparent data-[te-select-option-selected]:bg-black/[0.02] data-[te-select-option-disabled]:text-gray-400 data-[te-select-option-disabled]:cursor-default group-data-[te-select-option-group-ref]/opt:pl-7 dark:text-gray-200 dark:hover:[&:not([data-te-select-option-disabled])]:bg-white/30 dark:data-[te-input-state-active]:bg-white/30 dark:data-[te-select-option-selected]:data-[te-input-state-active]:bg-white/30 dark:data-[te-select-option-disabled]:text-gray-400 dark:data-[te-input-multiple-active]:bg-white/30",
  selectAllOption: "",
  selectOptionGroup: "group/opt",
  selectOptionGroupLabel: "flex flex-row items-center w-full px-4 truncate bg-transparent text-black/50 select-none dark:text-gray-300",
  selectOptionIcon: "w-7 h-7 rounded-full",
  selectOptionSecondaryText: "block text-[0.8rem] text-gray-500 dark:text-gray-300",
  selectOptionText: "group",
  selectValidationValid: "hidden absolute -mt-3 w-auto text-sm text-green-600 cursor-pointer group-data-[te-was-validated]/validation:peer-valid:block",
  selectValidationInvalid: "hidden absolute -mt-3 w-auto text-sm text-[rgb(220,76,100)] cursor-pointer group-data-[te-was-validated]/validation:peer-invalid:block"
};
var Bb = {
  dropdown: "string",
  formCheckInput: "string",
  formOutline: "string",
  initialized: "string",
  inputGroup: "string",
  noResult: "string",
  optionsList: "string",
  optionsWrapper: "string",
  optionsWrapperScrollbar: "string",
  selectArrow: "string",
  selectArrowDefault: "string",
  selectArrowLg: "string",
  selectArrowSm: "string",
  selectClearBtn: "string",
  selectClearBtnDefault: "string",
  selectClearBtnLg: "string",
  selectClearBtnSm: "string",
  selectDropdownContainer: "string",
  selectFakeValue: "string",
  selectFilterInput: "string",
  selectInput: "string",
  selectInputSizeDefault: "string",
  selectInputSizeLg: "string",
  selectInputSizeSm: "string",
  selectLabel: "string",
  selectLabelSizeDefault: "string",
  selectLabelSizeLg: "string",
  selectLabelSizeSm: "string",
  selectOption: "string",
  selectAllOption: "string",
  selectOptionGroup: "string",
  selectOptionGroupLabel: "string",
  selectOptionIcon: "string",
  selectOptionSecondaryText: "string",
  selectOptionText: "string"
};

class kr2 {
  constructor(t2, e2, i2) {
    this._element = t2, this._config = this._getConfig(e2), this._classes = this._getClasses(i2), this._config.selectPlaceholder && !this._config.multiple && this._addPlaceholderOption(), this._optionsToRender = this._getOptionsToRender(t2), this._plainOptions = this._getPlainOptions(this._optionsToRender), this._filteredOptionsList = null, this._selectionModel = new Ug(this.multiple), this._activeOptionIndex = -1, this._activeOption = null, this._wrapperId = et2("select-wrapper-"), this._dropdownContainerId = et2("select-dropdown-container-"), this._selectAllId = et2("select-all-"), this._debounceTimeoutId = null, this._dropdownHeight = this._config.selectOptionHeight * this._config.selectVisibleOptions, this._popper = null, this._input = null, this._label = d2.next(this._element, kb)[0], this._notch = null, this._fakeValue = null, this._isFakeValueActive = false, this._customContent = d2.next(t2, $b)[0], this._toggleButton = null, this._elementToggle = null, this._wrapper = null, this._inputEl = null, this._dropdownContainer = null, this._container = null, this._selectAllOption = null, this._init(), this._mutationObserver = null, this._isOpen = false, this._addMutationObserver(), this._element && A2.setData(t2, yi, this);
  }
  static get NAME() {
    return mo;
  }
  get filterInput() {
    return d2.findOne(xb, this._dropdownContainer);
  }
  get dropdown() {
    return d2.findOne(Ob, this._dropdownContainer);
  }
  get optionsList() {
    return d2.findOne(wl, this._dropdownContainer);
  }
  get optionsWrapper() {
    return d2.findOne(Sb, this._dropdownContainer);
  }
  get clearButton() {
    return d2.findOne(Db, this._wrapper);
  }
  get options() {
    return this._filteredOptionsList ? this._filteredOptionsList : this._plainOptions;
  }
  get value() {
    return this.multiple ? this._selectionModel.values : this._selectionModel.value;
  }
  get multiple() {
    return this._config.multiple;
  }
  get hasSelectAll() {
    return this.multiple && this._config.selectAll;
  }
  get hasSelection() {
    return this._selectionModel.selection || this._selectionModel.selections.length > 0;
  }
  _getConfig(t2) {
    const e2 = h2.getDataAttributes(this._element);
    return t2 = {
      ...Mb,
      ...e2,
      ...t2
    }, this._element.hasAttribute("multiple") && (t2.multiple = true), this._element.hasAttribute("disabled") && (t2.disabled = true), this._element.tabIndex && (t2.tabIndex = this._element.getAttribute("tabIndex")), I2(mo, t2, Rb), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...Pb,
      ...e2,
      ...t2
    }, I2(mo, t2, Bb), t2;
  }
  _addPlaceholderOption() {
    const t2 = new Option("", "", true, true);
    t2.hidden = true, t2.selected = true, this._element.prepend(t2);
  }
  _getOptionsToRender(t2) {
    const e2 = [];
    return t2.childNodes.forEach((n2) => {
      if (n2.nodeName === "OPTGROUP") {
        const o2 = {
          id: et2("group-"),
          label: n2.label,
          disabled: n2.hasAttribute("disabled"),
          hidden: n2.hasAttribute("hidden"),
          options: []
        };
        n2.childNodes.forEach((a2) => {
          a2.nodeName === "OPTION" && o2.options.push(this._createOptionObject(a2, o2));
        }), e2.push(o2);
      } else
        n2.nodeName === "OPTION" && e2.push(this._createOptionObject(n2));
    }), e2;
  }
  _getPlainOptions(t2) {
    if (!d2.findOne("optgroup", this._element))
      return t2;
    const i2 = [];
    return t2.forEach((n2) => {
      Object.prototype.hasOwnProperty.call(n2, "options") ? n2.options.forEach((r2) => {
        i2.push(r2);
      }) : i2.push(n2);
    }), i2;
  }
  _createOptionObject(t2, e2 = {}) {
    const i2 = et2("option-"), n2 = e2.id ? e2.id : null, o2 = e2.disabled ? e2.disabled : false, r2 = t2.selected || t2.hasAttribute(bi), a2 = t2.hasAttribute("disabled") || o2, l2 = t2.hasAttribute("hidden") || e2 && e2.hidden, p2 = this.multiple, u2 = t2.value, _2 = t2.label, f2 = h2.getDataAttribute(t2, "selectSecondaryText"), g2 = h2.getDataAttribute(t2, "select-icon");
    return new bl(i2, t2, p2, u2, _2, r2, a2, l2, f2, n2, g2);
  }
  _getNavigationOptions() {
    const t2 = this.options.filter((e2) => !e2.hidden);
    return this.hasSelectAll ? [this._selectAllOption, ...t2] : t2;
  }
  _init() {
    this._renderMaterialWrapper(), this._wrapper = d2.findOne(`#${this._wrapperId}`), this._input = d2.findOne(yl, this._wrapper), this._config.disabled && this._input.setAttribute(go, "");
    const t2 = this._config.selectContainer;
    t2 === "body" ? this._container = document.body : this._container = d2.findOne(t2), this._initOutlineInput(), this._setDefaultSelections(), this._updateInputValue(), this._appendFakeValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._bindComponentEvents(), this.hasSelectAll && (this._selectAllOption = this._createSelectAllOption()), this._dropdownContainer = vl(this._dropdownContainerId, this._config, this._input.offsetWidth, this._dropdownHeight, this._selectAllOption, this._optionsToRender, this._customContent, this._classes), this._setFirstActiveOption(), this._listenToFocusChange();
  }
  _renderMaterialWrapper() {
    const t2 = hb(this._wrapperId, this._config, this._label, this._classes, this._config.customArrow);
    this._element.parentNode.insertBefore(t2, this._element), h2.addClass(this._element, this._classes.initialized), t2.appendChild(this._element);
  }
  _initOutlineInput() {
    const t2 = d2.findOne(kl, this._wrapper);
    new V2(t2, {
      inputFormWhite: this._config.selectFormWhite
    }, this._classes).init(), this._notch = d2.findOne(bo, this._wrapper);
  }
  _bindComponentEvents() {
    this._listenToComponentKeydown(), this._listenToWrapperClick(), this._listenToClearBtnClick(), this._listenToClearBtnKeydown();
  }
  _setDefaultSelections() {
    this.options.forEach((t2) => {
      t2.selected && this._selectionModel.select(t2);
    });
  }
  _listenToComponentKeydown() {
    c2.on(this._wrapper, "keydown", this._handleKeydown.bind(this));
  }
  _handleKeydown(t2) {
    this._isOpen && !this._config.selectFilter ? this._handleOpenKeydown(t2) : this._handleClosedKeydown(t2);
  }
  _handleOpenKeydown(t2) {
    const e2 = t2.keyCode, i2 = e2 === we2 || e2 === U2 && t2.altKey || e2 === ke2;
    if (e2 === ke2 && this._config.selectAutoSelect && !this.multiple && this._handleAutoSelection(this._activeOption), i2) {
      this.close(), this._input.focus();
      return;
    }
    switch (e2) {
      case z2:
        this._setNextOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case U2:
        this._setPreviousOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case Te2:
        this._setFirstOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case Ee2:
        this._setLastOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case it2:
        t2.preventDefault(), this._activeOption && (this.hasSelectAll && this._activeOptionIndex === 0 ? this._handleSelectAll() : this._handleSelection(this._activeOption));
        return;
      default:
        return;
    }
    t2.preventDefault();
  }
  _handleClosedKeydown(t2) {
    const e2 = t2.keyCode;
    if (e2 === it2 && t2.preventDefault(), (e2 === it2 || e2 === z2 && t2.altKey || e2 === z2 && this.multiple) && this.open(), this.multiple)
      switch (e2) {
        case z2:
          this.open();
          break;
        case U2:
          this.open();
          break;
        default:
          return;
      }
    else
      switch (e2) {
        case z2:
          this._setNextOptionActive(), this._handleSelection(this._activeOption);
          break;
        case U2:
          this._setPreviousOptionActive(), this._handleSelection(this._activeOption);
          break;
        case Te2:
          this._setFirstOptionActive(), this._handleSelection(this._activeOption);
          break;
        case Ee2:
          this._setLastOptionActive(), this._handleSelection(this._activeOption);
          break;
        default:
          return;
      }
    t2.preventDefault();
  }
  _scrollToOption(t2) {
    if (!t2)
      return;
    let e2;
    const i2 = this.options.filter((u2) => !u2.hidden);
    this.hasSelectAll ? e2 = i2.indexOf(t2) + 1 : e2 = i2.indexOf(t2);
    const n2 = this._getNumberOfGroupsBeforeOption(e2), o2 = e2 + n2, r2 = this.optionsWrapper, a2 = r2.offsetHeight, l2 = this._config.selectOptionHeight, p2 = r2.scrollTop;
    if (e2 > -1) {
      const u2 = o2 * l2, _2 = u2 + l2 > p2 + a2;
      u2 < p2 ? r2.scrollTop = u2 : _2 ? r2.scrollTop = u2 - a2 + l2 : r2.scrollTop = p2;
    }
  }
  _getNumberOfGroupsBeforeOption(t2) {
    const e2 = this.options.filter((r2) => !r2.hidden), i2 = this._optionsToRender.filter((r2) => !r2.hidden), n2 = this.hasSelectAll ? t2 - 1 : t2;
    let o2 = 0;
    for (let r2 = 0;r2 <= n2; r2++)
      e2[r2].groupId && i2[o2] && i2[o2].id && e2[r2].groupId === i2[o2].id && o2++;
    return o2;
  }
  _setNextOptionActive() {
    let t2 = this._activeOptionIndex + 1;
    const e2 = this._getNavigationOptions();
    if (e2[t2]) {
      for (;e2[t2].disabled; )
        if (t2 += 1, !e2[t2])
          return;
      this._updateActiveOption(e2[t2], t2);
    }
  }
  _setPreviousOptionActive() {
    let t2 = this._activeOptionIndex - 1;
    const e2 = this._getNavigationOptions();
    if (e2[t2]) {
      for (;e2[t2].disabled; )
        if (t2 -= 1, !e2[t2])
          return;
      this._updateActiveOption(e2[t2], t2);
    }
  }
  _setFirstOptionActive() {
    const e2 = this._getNavigationOptions();
    this._updateActiveOption(e2[0], 0);
  }
  _setLastOptionActive() {
    const t2 = this._getNavigationOptions(), e2 = t2.length - 1;
    this._updateActiveOption(t2[e2], e2);
  }
  _updateActiveOption(t2, e2) {
    const i2 = this._activeOption;
    i2 && i2.removeActiveStyles(), t2.setActiveStyles(), this._activeOptionIndex = e2, this._activeOption = t2;
  }
  _listenToWrapperClick() {
    c2.on(this._wrapper, "click", () => {
      this.toggle();
    });
  }
  _listenToClearBtnClick() {
    c2.on(this.clearButton, "click", (t2) => {
      t2.preventDefault(), t2.stopPropagation(), this._handleClear();
    });
  }
  _listenToClearBtnKeydown() {
    c2.on(this.clearButton, "keydown", (t2) => {
      t2.keyCode === it2 && (this._handleClear(), t2.preventDefault(), t2.stopPropagation());
    });
  }
  _handleClear() {
    if (this.multiple)
      this._selectionModel.clear(), this._deselectAllOptions(this.options), this.hasSelectAll && this._updateSelectAllState();
    else {
      const t2 = this._selectionModel.selection;
      this._selectionModel.clear(), t2.deselect();
    }
    this._fakeValue.textContent = "", this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._emitValueChangeEvent(null), this._emitNativeChangeEvent();
  }
  _listenToOptionsClick() {
    c2.on(this.optionsWrapper, "click", (t2) => {
      if (t2.target.hasAttribute(yb))
        return;
      const i2 = t2.target.nodeName === "DIV" ? t2.target : d2.closest(t2.target, Ib);
      if (i2.hasAttribute(wb)) {
        this._handleSelectAll();
        return;
      }
      const o2 = i2.dataset.teId, r2 = this.options.find((a2) => a2.id === o2);
      r2 && !r2.disabled && this._handleSelection(r2);
    });
  }
  _handleSelectAll() {
    this._selectAllOption.selected ? (this._deselectAllOptions(this.options), this._selectAllOption.deselect()) : (this._selectAllOptions(this.options), this._selectAllOption.select()), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent();
  }
  _selectAllOptions(t2) {
    t2.forEach((e2) => {
      !e2.selected && !e2.disabled && (this._selectionModel.select(e2), e2.select());
    });
  }
  _deselectAllOptions(t2) {
    t2.forEach((e2) => {
      e2.selected && !e2.disabled && (this._selectionModel.deselect(e2), e2.deselect());
    });
  }
  _handleSelection(t2) {
    this.multiple ? (this._handleMultiSelection(t2), this.hasSelectAll && this._updateSelectAllState()) : this._handleSingleSelection(t2), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility();
  }
  _handleAutoSelection(t2) {
    this._singleOptionSelect(t2), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility();
  }
  _handleSingleSelection(t2) {
    this._singleOptionSelect(t2), this.close(), this._input.focus();
  }
  _singleOptionSelect(t2) {
    const e2 = this._selectionModel.selections[0];
    e2 && e2 !== t2 && (this._selectionModel.deselect(e2), e2.deselect(), e2.node.setAttribute(bi, false), c2.trigger(this._element, El, {
      value: e2.value
    })), (!e2 || e2 && t2 !== e2) && (this._selectionModel.select(t2), t2.select(), t2.node.setAttribute(bi, true), c2.trigger(this._element, Tl, {
      value: t2.value
    }), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent());
  }
  _handleMultiSelection(t2) {
    t2.selected ? (this._selectionModel.deselect(t2), t2.deselect(), t2.node.setAttribute(bi, false), c2.trigger(this._element, El, {
      value: t2.value
    })) : (this._selectionModel.select(t2), t2.select(), t2.node.setAttribute(bi, true), c2.trigger(this._element, Tl, {
      value: t2.value
    })), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent();
  }
  _emitValueChangeEvent(t2) {
    c2.trigger(this._element, Cb, { value: t2 });
  }
  _emitNativeChangeEvent() {
    c2.trigger(this._element, Ab);
  }
  _updateInputValue() {
    const t2 = this.multiple ? this._selectionModel.labels : this._selectionModel.label;
    let e2;
    this.multiple && this._config.selectDisplayedLabels !== -1 && this._selectionModel.selections.length > this._config.selectDisplayedLabels ? e2 = `${this._selectionModel.selections.length} ${this._config.selectOptionsSelectedLabel}` : e2 = t2, !this.multiple && !this._isSelectionValid(this._selectionModel.selection) ? this._input.value = "" : this._isLabelEmpty(this._selectionModel.selection) ? this._input.value = " " : e2 ? this._input.value = e2 : this.multiple || !this._optionsToRender[0] ? this._input.value = "" : this._input.value = this._optionsToRender[0].label;
  }
  _isSelectionValid(t2) {
    return !(t2 && (t2.disabled || t2.value === ""));
  }
  _isLabelEmpty(t2) {
    return !!(t2 && t2.label === "");
  }
  _appendFakeValue() {
    if (!this._selectionModel.selection || this._selectionModel._multiple)
      return;
    const t2 = this._selectionModel.selection.label;
    this._fakeValue = vb(t2, this._classes), d2.findOne(kl, this._wrapper).appendChild(this._fakeValue);
  }
  _updateLabelPosition() {
    const t2 = this._element.hasAttribute(Cl), e2 = this._input.value !== "";
    this._label && (t2 && (e2 || this._isOpen || this._isFakeValueActive) ? (this._label.setAttribute(J2, ""), this._notch.setAttribute(J2, "")) : (this._label.removeAttribute(J2), this._notch.removeAttribute(J2, "")));
  }
  _updateLabelPositionWhileClosing() {
    this._label && (this._input.value !== "" || this._isFakeValueActive ? (this._label.setAttribute(J2, ""), this._notch.setAttribute(J2, "")) : (this._label.removeAttribute(J2), this._notch.removeAttribute(J2)));
  }
  _updateFakeLabelPosition() {
    this._fakeValue && (this._input.value === "" && this._fakeValue.innerHTML !== "" && !this._config.selectPlaceholder ? (this._isFakeValueActive = true, this._fakeValue.setAttribute(J2, "")) : (this._isFakeValueActive = false, this._fakeValue.removeAttribute(J2)));
  }
  _updateClearButtonVisibility() {
    if (!this.clearButton)
      return;
    this._selectionModel.selection || this._selectionModel.selections.length > 0 ? h2.addStyle(this.clearButton, { display: "block" }) : h2.addStyle(this.clearButton, { display: "none" });
  }
  _updateSelectAllState() {
    const t2 = this._selectAllOption.selected, e2 = Qo(this.options);
    !e2 && t2 ? this._selectAllOption.deselect() : e2 && !t2 && this._selectAllOption.select();
  }
  toggle() {
    this._isOpen ? this.close() : this.open();
  }
  open() {
    const t2 = this._config.disabled, e2 = c2.trigger(this._element, Eb);
    this._isOpen || t2 || e2.defaultPrevented || (this._openDropdown(), this._updateDropdownWidth(), this._setFirstActiveOption(), this._scrollToOption(this._activeOption), this._config.selectFilter && (setTimeout(() => {
      this.filterInput.focus();
    }, 0), this._listenToSelectSearch(), this._listenToDropdownKeydown()), this._listenToOptionsClick(), this._listenToOutsideClick(), this._listenToWindowResize(), this._isOpen = true, this._updateLabelPosition(), this._setInputActiveStyles());
  }
  _openDropdown() {
    this._popper = se2(this._input, this._dropdownContainer, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 1]
          }
        }
      ]
    }), this._container.appendChild(this._dropdownContainer), setTimeout(() => {
      this.dropdown.setAttribute(Al, "");
    }, 0);
  }
  _updateDropdownWidth() {
    const t2 = this._input.offsetWidth;
    h2.addStyle(this._dropdownContainer, { width: `${t2}px` });
  }
  _setFirstActiveOption() {
    const t2 = this._getNavigationOptions(), e2 = this._activeOption;
    e2 && e2.removeActiveStyles();
    const i2 = this.multiple ? this._selectionModel.selections[0] : this._selectionModel.selection;
    i2 ? (this._activeOption = i2, i2.setActiveStyles(), this._activeOptionIndex = t2.findIndex((n2) => n2 === i2)) : (this._activeOption = null, this._activeOptionIndex = -1);
  }
  _setInputActiveStyles() {
    this._input.setAttribute(zt2, ""), d2.findOne(bo, this._wrapper).setAttribute(zt2, "");
  }
  _listenToWindowResize() {
    c2.on(window, "resize", this._handleWindowResize.bind(this));
  }
  _handleWindowResize() {
    this._dropdownContainer && this._updateDropdownWidth();
  }
  _listenToSelectSearch() {
    this.filterInput.addEventListener("input", (t2) => {
      const e2 = t2.target.value, i2 = this._config.selectFilterDebounce;
      this._debounceFilter(e2, i2);
    });
  }
  _debounceFilter(t2, e2) {
    this._debounceTimeoutId && clearTimeout(this._debounceTimeoutId), this._debounceTimeoutId = setTimeout(() => {
      this._filterOptions(t2);
    }, e2);
  }
  _filterOptions(t2) {
    const e2 = [];
    this._optionsToRender.forEach((o2) => {
      const r2 = Object.prototype.hasOwnProperty.call(o2, "options"), a2 = !r2 && o2.label.toLowerCase().includes(t2.toLowerCase()), l2 = {};
      r2 && (l2.label = o2.label, l2.options = this._filter(t2, o2.options), l2.options.length > 0 && e2.push(l2)), a2 && e2.push(o2);
    });
    const i2 = this._config.selectNoResultText !== "", n2 = e2.length !== 0;
    if (n2)
      this._updateOptionsListTemplate(e2), this._popper.forceUpdate(), this._filteredOptionsList = this._getPlainOptions(e2), this.hasSelectAll && this._updateSelectAllState(), this._setFirstActiveOption();
    else if (!n2 && i2) {
      const o2 = this._getNoResultTemplate();
      this.optionsWrapper.innerHTML = o2;
    }
  }
  _updateOptionsListTemplate(t2) {
    const e2 = d2.findOne(wl, this._dropdownContainer) || d2.findOne(Lb, this._dropdownContainer), i2 = Ah(t2, this._selectAllOption, this._config, this._classes);
    this.optionsWrapper.removeChild(e2), this.optionsWrapper.appendChild(i2);
  }
  _getNoResultTemplate() {
    return `<div class="${this._classes.noResult}" ${xh} style="height: ${this._config.selectOptionHeight}px">${this._config.selectNoResultText}</div>`;
  }
  _filter(t2, e2) {
    const i2 = t2.toLowerCase();
    return e2.filter((n2) => n2.label.toLowerCase().includes(i2));
  }
  _listenToDropdownKeydown() {
    c2.on(this.dropdown, "keydown", this._handleOpenKeydown.bind(this));
  }
  _listenToOutsideClick() {
    this._outsideClick = this._handleOutSideClick.bind(this), c2.on(document, "click", this._outsideClick);
  }
  _listenToFocusChange(t2 = true) {
    if (t2 === false) {
      c2.off(this._input, "focus", () => this._notch.setAttribute(zt2, "")), c2.off(this._input, "blur", () => this._notch.removeAttribute(zt2));
      return;
    }
    c2.on(this._input, "focus", () => this._notch.setAttribute(zt2, "")), c2.on(this._input, "blur", () => this._notch.removeAttribute(zt2));
  }
  _handleOutSideClick(t2) {
    const e2 = this._wrapper && this._wrapper.contains(t2.target), i2 = t2.target === this._dropdownContainer, n2 = this._dropdownContainer && this._dropdownContainer.contains(t2.target);
    let o2;
    this._toggleButton || (this._elementToggle = d2.find(Nb)), this._elementToggle && this._elementToggle.forEach((r2) => {
      const a2 = h2.getDataAttribute(r2, "select-toggle");
      (a2 === this._element.id || this._element.classList.contains(a2)) && (this._toggleButton = r2, o2 = this._toggleButton.contains(t2.target));
    }), !e2 && !i2 && !n2 && !o2 && this.close();
  }
  close() {
    const t2 = c2.trigger(this._element, Tb), e2 = cn(this._dropdownContainer.children[0]);
    !this._isOpen || t2.defaultPrevented || (this._config.selectFilter && this.hasSelectAll && (this._resetFilterState(), this._updateOptionsListTemplate(this._optionsToRender), this._config.multiple && this._updateSelectAllState()), this._removeDropdownEvents(), this.dropdown.removeAttribute(Al), setTimeout(() => {
      this._input.removeAttribute(zt2), this._input.blur(), d2.findOne(bo, this._wrapper).removeAttribute(zt2), this._label && !this.hasSelection && (this._label.removeAttribute(J2), this._notch.setAttribute(J2, ""), this._input.removeAttribute(J2), this._notch.removeAttribute(J2)), this._updateLabelPositionWhileClosing();
    }, 0), setTimeout(() => {
      this._container && this._dropdownContainer.parentNode === this._container && this._container.removeChild(this._dropdownContainer), this._popper.destroy(), this._isOpen = false, c2.off(this.dropdown, "transitionend");
    }, e2));
  }
  _resetFilterState() {
    this.filterInput.value = "", this._filteredOptionsList = null;
  }
  _removeDropdownEvents() {
    c2.off(document, "click", this._outsideClick), this._config.selectFilter && c2.off(this.dropdown, "keydown"), c2.off(this.optionsWrapper, "click");
  }
  _addMutationObserver() {
    this._mutationObserver = new MutationObserver(() => {
      this._wrapper && (this._updateSelections(), this._updateDisabledState());
    }), this._observeMutationObserver();
  }
  _updateSelections() {
    this._optionsToRender = this._getOptionsToRender(this._element), this._plainOptions = this._getPlainOptions(this._optionsToRender), this._selectionModel.clear(), this._setDefaultSelections(), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this.hasSelectAll && this._updateSelectAllState();
    const t2 = this._config.filter && this.filterInput && this.filterInput.value;
    this._isOpen && !t2 ? (this._updateOptionsListTemplate(this._optionsToRender), this._setFirstActiveOption()) : this._isOpen && t2 ? (this._filterOptions(this.filterInput.value), this._setFirstActiveOption()) : this._dropdownContainer = vl(this._dropdownContainerId, this._config, this._input.offsetWidth, this._dropdownHeight, this._selectAllOption, this._optionsToRender, this._customContent, this._classes);
  }
  _updateDisabledState() {
    const t2 = d2.findOne(yl, this._wrapper);
    this._element.hasAttribute("disabled") ? (this._config.disabled = true, t2.setAttribute("disabled", ""), t2.setAttribute(go, "")) : (this._config.disabled = false, t2.removeAttribute("disabled"), t2.removeAttribute(go));
  }
  _observeMutationObserver() {
    this._mutationObserver && this._mutationObserver.observe(this._element, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  }
  _disconnectMutationObserver() {
    this.mutationObserver && (this._mutationObserver.disconnect(), this._mutationObserver = null);
  }
  _createSelectAllOption() {
    const t2 = this._selectAllId, e2 = null, i2 = true, n2 = "select-all", o2 = this._config.selectAllLabel, r2 = Qo(this.options), a2 = false, l2 = false, p2 = null, u2 = null, _2 = null;
    return new bl(t2, e2, i2, n2, o2, r2, a2, l2, p2, u2, _2);
  }
  dispose() {
    this._removeComponentEvents(), this._destroyMaterialSelect(), this._listenToFocusChange(false), A2.removeData(this._element, yi);
  }
  _removeComponentEvents() {
    c2.off(this.input, "click"), c2.off(this.wrapper, this._handleKeydown.bind(this)), c2.off(this.clearButton, "click"), c2.off(this.clearButton, "keydown"), c2.off(window, "resize", this._handleWindowResize.bind(this));
  }
  _destroyMaterialSelect() {
    this._isOpen && this.close(), this._destroyMaterialTemplate();
  }
  _destroyMaterialTemplate() {
    const t2 = this._wrapper.parentNode, e2 = d2.find("label", this._wrapper);
    t2.appendChild(this._element), e2.forEach((i2) => {
      t2.appendChild(i2);
    }), e2.forEach((i2) => {
      i2.removeAttribute(J2);
    }), h2.removeClass(this._element, this._classes.initialized), this._element.removeAttribute(Cl), t2.removeChild(this._wrapper);
  }
  setValue(t2) {
    this.options.filter((i2) => i2.selected).forEach((i2) => i2.nativeOption.selected = false), Array.isArray(t2) ? t2.forEach((i2) => {
      this._selectByValue(i2);
    }) : this._selectByValue(t2), this._updateSelections(), this._emitValueChangeEvent(this.value);
  }
  _selectByValue(t2) {
    const e2 = this.options.find((i2) => i2.value === t2);
    return e2 ? (e2.nativeOption.selected = true, true) : false;
  }
  static jQueryInterface(t2, e2) {
    return this.each(function() {
      let i2 = A2.getData(this, yi);
      const n2 = typeof t2 == "object" && t2;
      if (!(!i2 && /dispose/.test(t2)) && (i2 || (i2 = new kr2(this, n2)), typeof t2 == "string")) {
        if (typeof i2[t2] > "u")
          throw new TypeError(`No method named "${t2}"`);
        i2[t2](e2);
      }
    });
  }
  static getInstance(t2) {
    return A2.getData(t2, yi);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var en = "chip";
var Wb = `te.${en}`;
var Oh = "data-te-chip-close";
var vo = `[${Oh}]`;
var Hi = "chips";
var Gi = `data-te-${Hi}`;
var xl = `te.${Hi}`;
var Gb = `${Gi}-input-init`;
var bt2 = `${Gi}-active`;
var Ol = `${Gi}-initial`;
var Sh = `${Gi}-placeholder`;
var qb = `${Gi}-input-wrapper`;
var Jo = "data-te-chip-init";
var Ih = "data-te-chip-close";
var Dh = "data-te-chip-text";
var Zb = `[${bt2}]`;
var tr2 = `[${Jo}]`;
var Qb = `${tr2}${Zb}`;
var To = `[${Ih}]`;
var Jb = `[${qb}]`;
var tv = `[${Dh}]`;
var ev = `[${Sh}]`;
var iv = "data-te-input-notch-leading-ref";
var sv = "data-te-input-notch-middle-ref";
var nv = `[${iv}]`;
var ov = `[${sv}]`;
var uv = {
  inputID: et2("chips-input-"),
  parentSelector: "",
  initialValues: [{ tag: "init1" }, { tag: "init2" }],
  editable: false,
  labelText: "Example label",
  inputClasses: {},
  inputOptions: {}
};
var Ut2 = {
  plugins: {
    legend: {
      labels: {
        color: "rgb(102,102,102)"
      }
    }
  }
};
var wi = {
  line: {
    options: {
      ...Ut2,
      elements: {
        line: {
          backgroundColor: "rgba(59, 112, 202, 0.0)",
          borderColor: "rgb(59, 112, 202)",
          borderWidth: 2,
          tension: 0
        },
        point: {
          borderColor: "rgb(59, 112, 202)",
          backgroundColor: "rgb(59, 112, 202)"
        }
      },
      responsive: true,
      legend: {
        display: true
      },
      tooltips: {
        intersect: false,
        mode: "index"
      },
      datasets: {
        borderColor: "red"
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        },
        y: {
          stacked: false,
          grid: {
            borderDash: [2],
            drawBorder: false,
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        }
      }
    }
  },
  bar: {
    options: {
      ...Ut2,
      backgroundColor: "rgb(59, 112, 202)",
      borderWidth: 0,
      responsive: true,
      legend: {
        display: true
      },
      tooltips: {
        intersect: false,
        mode: "index"
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        },
        y: {
          stacked: true,
          grid: {
            borderDash: [2],
            drawBorder: false,
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        }
      }
    }
  },
  pie: {
    options: {
      ...Ut2,
      elements: {
        arc: { backgroundColor: "rgb(59, 112, 202)" }
      },
      responsive: true,
      legend: {
        display: true
      }
    }
  },
  doughnut: {
    options: {
      ...Ut2,
      elements: {
        arc: { backgroundColor: "rgb(59, 112, 202)" }
      },
      responsive: true,
      legend: {
        display: true
      }
    }
  },
  polarArea: {
    options: {
      ...Ut2,
      elements: {
        arc: { backgroundColor: "rgba(59, 112, 202, 0.5)" }
      },
      responsive: true,
      legend: {
        display: true
      }
    }
  },
  radar: {
    options: {
      ...Ut2,
      elements: {
        line: {
          backgroundColor: "rgba(59, 112, 202, 0.5)",
          borderColor: "rgb(59, 112, 202)",
          borderWidth: 2
        },
        point: {
          borderColor: "rgb(59, 112, 202)",
          backgroundColor: "rgb(59, 112, 202)"
        }
      },
      responsive: true,
      legend: {
        display: true
      }
    }
  },
  scatter: {
    options: {
      ...Ut2,
      elements: {
        line: {
          backgroundColor: "rgba(59, 112, 202, 0.5)",
          borderColor: "rgb(59, 112, 202)",
          borderWidth: 2,
          tension: 0
        },
        point: {
          borderColor: "rgb(59, 112, 202)",
          backgroundColor: "rgba(59, 112, 202, 0.5)"
        }
      },
      responsive: true,
      legend: {
        display: true
      },
      tooltips: {
        intersect: false,
        mode: "index"
      },
      datasets: {
        borderColor: "red"
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        },
        y: {
          stacked: false,
          grid: {
            borderDash: [2],
            drawBorder: false,
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        }
      }
    }
  },
  bubble: {
    options: {
      ...Ut2,
      elements: {
        point: {
          borderColor: "rgb(59, 112, 202)",
          backgroundColor: "rgba(59, 112, 202, 0.5)"
        }
      },
      responsive: true,
      legend: {
        display: true
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        },
        y: {
          grid: {
            borderDash: [2],
            drawBorder: false,
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
          },
          ticks: {
            fontColor: "rgba(0,0,0, 0.5)"
          }
        }
      }
    }
  }
};
var fv = function(t2) {
  return mv(t2) && !gv(t2);
};
var bv = typeof Symbol == "function" && Symbol.for;
var vv = bv ? Symbol.for("react.element") : 60103;
ii.all = function(t2, e2) {
  if (!Array.isArray(t2))
    throw new Error("first argument should be an array");
  return t2.reduce(function(i2, n2) {
    return ii(i2, n2, e2);
  }, {});
};
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
var Ll = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
var j2 = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: function(s2) {
      return "ps__thumb-" + s2;
    },
    rail: function(s2) {
      return "ps__rail-" + s2;
    },
    consuming: "ps__child--consume"
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: function(s2) {
      return "ps--active-" + s2;
    },
    scrolling: function(s2) {
      return "ps--scrolling-" + s2;
    }
  }
};
var Nh = { x: null, y: null };
var qi = function(t2) {
  this.element = t2, this.handlers = {};
};
var Ph = { isEmpty: { configurable: true } };
qi.prototype.bind = function(t2, e2) {
  typeof this.handlers[t2] > "u" && (this.handlers[t2] = []), this.handlers[t2].push(e2), this.element.addEventListener(t2, e2, false);
};
qi.prototype.unbind = function(t2, e2) {
  var i2 = this;
  this.handlers[t2] = this.handlers[t2].filter(function(n2) {
    return e2 && n2 !== e2 ? true : (i2.element.removeEventListener(t2, n2, false), false);
  });
};
qi.prototype.unbindAll = function() {
  for (var t2 in this.handlers)
    this.unbind(t2);
};
Ph.isEmpty.get = function() {
  var s2 = this;
  return Object.keys(this.handlers).every(function(t2) {
    return s2.handlers[t2].length === 0;
  });
};
Object.defineProperties(qi.prototype, Ph);
var li = function() {
  this.eventElements = [];
};
li.prototype.eventElement = function(t2) {
  var e2 = this.eventElements.filter(function(i2) {
    return i2.element === t2;
  })[0];
  return e2 || (e2 = new qi(t2), this.eventElements.push(e2)), e2;
};
li.prototype.bind = function(t2, e2, i2) {
  this.eventElement(t2).bind(e2, i2);
};
li.prototype.unbind = function(t2, e2, i2) {
  var n2 = this.eventElement(t2);
  n2.unbind(e2, i2), n2.isEmpty && this.eventElements.splice(this.eventElements.indexOf(n2), 1);
};
li.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t2) {
    return t2.unbindAll();
  }), this.eventElements = [];
};
li.prototype.once = function(t2, e2, i2) {
  var n2 = this.eventElement(t2), o2 = function(r2) {
    n2.unbind(e2, o2), i2(r2);
  };
  n2.bind(e2, o2);
};
var Ve2 = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && (("ontouchstart" in window) || ("maxTouchPoints" in window.navigator) && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
var Wv = function() {
  return {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1000,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: true,
    wheelSpeed: 1
  };
};
var Fv = {
  "click-rail": Rv,
  "drag-thumb": Pv,
  keyboard: Bv,
  wheel: Hv,
  touch: Vv
};
var Zi = function(t2, e2) {
  var i2 = this;
  if (e2 === undefined && (e2 = {}), typeof t2 == "string" && (t2 = document.querySelector(t2)), !t2 || !t2.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t2, t2.classList.add(j2.main), this.settings = Wv();
  for (var n2 in e2)
    this.settings[n2] = e2[n2];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var o2 = function() {
    return t2.classList.add(j2.state.focus);
  }, r2 = function() {
    return t2.classList.remove(j2.state.focus);
  };
  this.isRtl = Nt2(t2).direction === "rtl", this.isRtl === true && t2.classList.add(j2.rtl), this.isNegativeScroll = function() {
    var p2 = t2.scrollLeft, u2 = null;
    return t2.scrollLeft = -1, u2 = t2.scrollLeft < 0, t2.scrollLeft = p2, u2;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t2.scrollWidth - t2.clientWidth : 0, this.event = new li, this.ownerDocument = t2.ownerDocument || document, this.scrollbarXRail = Is(j2.element.rail("x")), t2.appendChild(this.scrollbarXRail), this.scrollbarX = Is(j2.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", o2), this.event.bind(this.scrollbarX, "blur", r2), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var a2 = Nt2(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(a2.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = false, this.scrollbarXTop = F2(a2.top)) : this.isScrollbarXUsingBottom = true, this.railBorderXWidth = F2(a2.borderLeftWidth) + F2(a2.borderRightWidth), ct2(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = F2(a2.marginLeft) + F2(a2.marginRight), ct2(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = Is(j2.element.rail("y")), t2.appendChild(this.scrollbarYRail), this.scrollbarY = Is(j2.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", o2), this.event.bind(this.scrollbarY, "blur", r2), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var l2 = Nt2(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(l2.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = false, this.scrollbarYLeft = F2(l2.left)) : this.isScrollbarYUsingRight = true, this.scrollbarYOuterWidth = this.isRtl ? Nv(this.scrollbarY) : null, this.railBorderYWidth = F2(l2.borderTopWidth) + F2(l2.borderBottomWidth), ct2(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = F2(l2.marginTop) + F2(l2.marginBottom), ct2(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t2.scrollLeft <= 0 ? "start" : t2.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t2.scrollTop <= 0 ? "start" : t2.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = true, this.settings.handlers.forEach(function(p2) {
    return Fv[p2](i2);
  }), this.lastScrollTop = Math.floor(t2.scrollTop), this.lastScrollLeft = t2.scrollLeft, this.event.bind(this.element, "scroll", function(p2) {
    return i2.onScroll(p2);
  }), Ht2(this);
};
Zi.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, ct2(this.scrollbarXRail, { display: "block" }), ct2(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = F2(Nt2(this.scrollbarXRail).marginLeft) + F2(Nt2(this.scrollbarXRail).marginRight), this.railYMarginHeight = F2(Nt2(this.scrollbarYRail).marginTop) + F2(Nt2(this.scrollbarYRail).marginBottom), ct2(this.scrollbarXRail, { display: "none" }), ct2(this.scrollbarYRail, { display: "none" }), Ht2(this), fn(this, "top", 0, false, true), fn(this, "left", 0, false, true), ct2(this.scrollbarXRail, { display: "" }), ct2(this.scrollbarYRail, { display: "" }));
};
Zi.prototype.onScroll = function(t2) {
  this.isAlive && (Ht2(this), fn(this, "top", this.element.scrollTop - this.lastScrollTop), fn(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
Zi.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Ye2(this.scrollbarX), Ye2(this.scrollbarY), Ye2(this.scrollbarXRail), Ye2(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = false);
};
Zi.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t2) {
    return !t2.match(/^ps([-_].+|)$/);
  }).join(" ");
};
var Ao = "perfectScrollbar";
var Yv = "perfect-scrollbar";
var $s = "te.perfectScrollbar";
var St2 = "te";
var It2 = "ps";
var yo = [
  { te: `scrollX.${St2}.${It2}`, ps: "ps-scroll-x" },
  { te: `scrollY.${St2}.${It2}`, ps: "ps-scroll-y" },
  { te: `scrollUp.${St2}.${It2}`, ps: "ps-scroll-up" },
  { te: `scrollDown.${St2}.${It2}`, ps: "ps-scroll-down" },
  { te: `scrollLeft.${St2}.${It2}`, ps: "ps-scroll-left" },
  { te: `scrollRight.${St2}.${It2}`, ps: "ps-scroll-right" },
  { te: `scrollXEnd.${St2}.${It2}`, ps: "ps-x-reach-end" },
  { te: `scrollYEnd.${St2}.${It2}`, ps: "ps-y-reach-end" },
  { te: `scrollXStart.${St2}.${It2}`, ps: "ps-x-reach-start" },
  { te: `scrollYStart.${St2}.${It2}`, ps: "ps-y-reach-start" }
];
var jv = {
  handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
  wheelSpeed: 1,
  wheelPropagation: true,
  swipeEasing: true,
  minScrollbarLength: null,
  maxScrollbarLength: null,
  scrollingThreshold: 1000,
  useBothWheelAxes: false,
  suppressScrollX: false,
  suppressScrollY: false,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  positionRight: true
};
var Kv = {
  handlers: "(string|array)",
  wheelSpeed: "number",
  wheelPropagation: "boolean",
  swipeEasing: "boolean",
  minScrollbarLength: "(number|null)",
  maxScrollbarLength: "(number|null)",
  scrollingThreshold: "number",
  useBothWheelAxes: "boolean",
  suppressScrollX: "boolean",
  suppressScrollY: "boolean",
  scrollXMarginOffset: "number",
  scrollYMarginOffset: "number",
  positionRight: "boolean"
};
var zv = {
  ps: "group/ps overflow-hidden [overflow-anchor:none] touch-none",
  railX: "group/x absolute bottom-0 h-[0.9375rem] hidden opacity-0 transition-[background-color,_opacity] duration-200 ease-linear motion-reduce:transition-none z-[1035] group-[&.ps--active-x]/ps:block group-hover/ps:opacity-60 group-focus/ps:opacity-60 group-[&.ps--scrolling-x]/ps:opacity-60 hover:!opacity-90 focus:!opacity-90 [&.ps--clicking]:!opacity-90 outline-none",
  railXColors: "group-[&.ps--active-x]/ps:bg-transparent hover:!bg-[#eee] focus:!bg-[#eee] [&.ps--clicking]:!bg-[#eee] dark:hover:!bg-[#555] dark:focus:!bg-[#555] dark:[&.ps--clicking]:!bg-[#555]",
  railXThumb: "absolute bottom-0.5 rounded-md h-1.5 group-focus/ps:opacity-100 group-active/ps:opacity-100 [transition:background-color_.2s_linear,_height_.2s_ease-in-out] group-hover/x:h-[11px] group-focus/x:h-[0.6875rem] group-[&.ps--clicking]/x:bg-[#999] group-[&.ps--clicking]/x:h-[11px] outline-none",
  railXThumbColors: "bg-[#aaa] group-hover/x:bg-[#999] group-focus/x:bg-[#999]",
  railY: "group/y absolute right-0 w-[0.9375rem] hidden opacity-0 transition-[background-color,_opacity] duration-200 ease-linear motion-reduce:transition-none z-[1035] group-[&.ps--active-y]/ps:block group-hover/ps:opacity-60 group-focus/ps:opacity-60 group-[&.ps--scrolling-y]/ps:opacity-60 hover:!opacity-90 focus:!opacity-90 [&.ps--clicking]:!opacity-90 outline-none",
  railYColors: "group-[&.ps--active-y]/ps:bg-transparent hover:!bg-[#eee] focus:!bg-[#eee] [&.ps--clicking]:!bg-[#eee] dark:hover:!bg-[#555] dark:focus:!bg-[#555] dark:[&.ps--clicking]:!bg-[#555]",
  railYThumb: "absolute right-0.5 rounded-md w-1.5 group-focus/ps:opacity-100 group-active/ps:opacity-100 [transition:background-color_.2s_linear,_width_.2s_ease-in-out,_opacity] group-hover/y:w-[11px] group-focus/y:w-[0.6875rem] group-[&.ps--clicking]/y:w-[11px] outline-none",
  railYThumbColors: "bg-[#aaa] group-hover/y:bg-[#999] group-focus/y:bg-[#999] group-[&.ps--clicking]/y:bg-[#999]"
};
var Uv = {
  ps: "string",
  railX: "string",
  railXColors: "string",
  railXThumb: "string",
  railXThumbColors: "string",
  railY: "string",
  railYColors: "string",
  railYThumb: "string",
  railYThumbColors: "string"
};

class xr2 {
  constructor(t2, e2 = {}, i2 = {}) {
    this._element = t2, this._options = this._getConfig(e2), this._classes = this._getClasses(i2), this.perfectScrollbar = null, this._observer = null, this._psClasses = [
      {
        ps: "ps__rail-x",
        te: this._classes.railX,
        teColor: this._classes.railXColors
      },
      {
        ps: "ps__rail-y",
        te: this._classes.railY,
        teColor: this._classes.railYColors
      },
      {
        ps: "ps__thumb-x",
        te: this._classes.railXThumb,
        teColor: this._classes.railXThumbColors
      },
      {
        ps: "ps__thumb-y",
        te: this._classes.railYThumb,
        teColor: this._classes.railYThumbColors
      }
    ], this._element && (A2.setData(t2, $s, this), h2.addClass(this._element, Yv)), this.init();
  }
  static get NAME() {
    return Ao;
  }
  get railX() {
    return d2.findOne(".ps__rail-x", this._element);
  }
  get railY() {
    return d2.findOne(".ps__rail-y", this._element);
  }
  _getConfig(t2) {
    const e2 = h2.getDataAttributes(this._element);
    return e2.handlers !== undefined && (e2.handlers = e2.handlers.split(" ")), t2 = {
      ...jv,
      ...e2,
      ...t2
    }, I2(Ao, t2, Kv), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...zv,
      ...e2,
      ...t2
    }, I2(Ao, t2, Uv), t2;
  }
  dispose() {
    this._options.positionRight && this._observer.disconnect(), A2.removeData(this._element, $s), this._element = null, this._dataAttrOptions = null, this._options = null, this.perfectScrollbar.destroy(), this.removeEvent(yo), this.perfectScrollbar = null;
  }
  init() {
    if (this.perfectScrollbar = new Zi(this._element, this._options), this._addPerfectScrollbarStyles(), this._updateScrollPosition(), this.perfectScrollbar.update(), this._initEvents(yo), this._options.positionRight) {
      this._observer = new ResizeObserver(() => {
        setTimeout(() => {
          this._updateScrollPosition();
        }, 100);
      });
      const t2 = {
        attributes: true,
        attributeFilter: ["class", "className"]
      };
      this._observer.observe(this._element, t2);
    }
  }
  _updateScrollPosition() {
    const t2 = getComputedStyle(this._element).getPropertyValue("height"), e2 = getComputedStyle(this._element).getPropertyValue("width");
    this.railX && (this.railX.style.transform = `translateY(calc(-100% + ${this._canTransform(t2) ? t2 : "0px"}))`), this.railY && (this.railY.style.transform = `translateX(calc(-100% + ${this._canTransform(e2) ? e2 : "0px"}))`);
  }
  _canTransform(t2) {
    return t2 && t2.includes("px");
  }
  update() {
    return this.perfectScrollbar.update();
  }
  _initEvents(t2 = []) {
    t2.forEach(({ ps: e2, te: i2 }) => c2.on(this._element, e2, (n2) => c2.trigger(this._element, i2, { e: n2 })));
  }
  _addPerfectScrollbarStyles() {
    this._psClasses.forEach((t2) => {
      const e2 = d2.findOne(`.${t2.ps}`, this._element);
      h2.addClass(e2, t2.te), h2.addClass(e2, t2.teColor);
    }), h2.addClass(this._element, this._classes.ps), h2.removeClass(this._element, "ps");
  }
  removeEvent(t2) {
    let e2 = [];
    typeof t2 == "string" && (e2 = yo.filter(({ te: i2 }) => i2 === t2)), e2.forEach(({ ps: i2, te: n2 }) => {
      c2.off(this._element, i2), c2.off(this._element, n2);
    });
  }
  static jQueryInterface(t2) {
    return this.each(function() {
      let e2 = A2.getData(this, $s);
      const i2 = typeof t2 == "object" && t2;
      if (!(!e2 && /dispose|hide/.test(t2)) && (e2 || (e2 = new xr2(this, i2)), typeof t2 == "string")) {
        if (typeof e2[t2] > "u")
          throw new TypeError(`No method named "${t2}"`);
        e2[t2]();
      }
    });
  }
  static getInstance(t2) {
    return A2.getData(t2, $s);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
}
var Bh = xr2;
var Vi = "datatable";
var gt2 = `data-te-${Vi}`;
var ki = `te.${Vi}`;
var An = `.${ki}`;
var uT = `[${gt2}-inner-ref]`;
var wo = `[${gt2}-cell-ref]`;
var pT = `[${gt2}-header-ref]`;
var _T = `[${gt2}-header-checkbox-ref]`;
var fT = `[${gt2}-pagination-right-ref]`;
var mT = `[${gt2}-pagination-left-ref]`;
var gT = `[${gt2}-pagination-start-ref]`;
var bT = `[${gt2}-pagination-end-ref]`;
var vT = `[${gt2}-pagination-nav-ref]`;
var TT = `[${gt2}-select-ref]`;
var ko = `[${gt2}-sort-icon-ref]`;
var Ti = `[${gt2}-row-ref]`;
var xo = `[${gt2}-row-checkbox-ref]`;
var ET = `selectRows${An}`;
var Hl = `render${An}`;
var CT = `rowClick${An}`;
var AT = `update${An}`;
var sn = "te.rating";
var ci = `.${sn}`;
var Wl = `onSelect${ci}`;
var $E = `onHover${ci}`;
var Fl = `keyup${ci}`;
var Yl = `focusout${ci}`;
var jl = `keydown${ci}`;
var Kl = `mousedown${ci}`;
var xi = "te.popconfirm";
var Vh = `.${xi}`;
var LE = `cancel${Vh}`;
var NE = `confirm${Vh}`;
var Oi = "te.lightbox";
var WE = `.${Oi}`;
var FE = ".data-api";
var Me2 = `click${WE}${FE}`;
var Fh = "[data-te-lightbox-init]";
var YE = `${Fh} img:not([data-te-lightbox-disabled])`;
var i0 = {
  isRequired: "This is required",
  isEmail: "Please enter a valid email address",
  isLongerThan: "This field must be longer than {length} characters",
  isShorterThan: "This field must be shorter than {length} characters",
  isChecked: "This is required",
  isPhone: "Please enter a valid phone number",
  isNumber: "Expected value with type Number",
  isString: "Expected value with type String",
  isBoolean: "Expected value with type Boolean",
  isDate: "Please enter a valid date",
  is12hFormat: "Please enter a valid time in 12h format",
  is24hFormat: "Please enter a valid time in 24h format"
};
var s0 = {
  isRequired: (s2, t2) => (s2 == null ? undefined : s2.trim()) ? true : t2,
  isEmail: (s2, t2) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s2) ? true : t2,
  isLongerThan: (s2, t2, e2) => s2.length > e2 ? true : t2.replace("{length}", e2),
  isShorterThan: (s2, t2, e2) => s2.length < e2 ? true : t2.replace("{length}", e2),
  isChecked: (s2) => s2 ? true : "This is required",
  isPhone: (s2, t2) => s2.length === 9 ? true : t2,
  isNumber: (s2, t2) => s2 && !isNaN(Number(s2)) ? true : t2,
  isString: (s2, t2) => typeof s2 == "string" ? true : t2,
  isBoolean: (s2, t2) => typeof s2 == "boolean" ? true : t2,
  isDate: (s2, t2) => {
    const e2 = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
    return s2.match(e2) ? true : t2;
  },
  is12hFormat: (s2, t2) => {
    const e2 = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;
    return s2.match(e2) ? true : t2;
  },
  is24hFormat: (s2, t2) => {
    const e2 = /^(?:[01]\d|2[0-3]):[0-5][0-9]$/;
    return s2.match(e2) ? true : t2;
  }
};
var Do = "validation";
var ir2 = "te.validation";
var yn = `.${ir2}`;
var Yh = "data-te-validate";
var Ls = "data-te-validated";
var Ns = "data-te-validation-state";
var Ms = "data-te-validation-feedback";
var $o = "data-te-valid-feedback";
var Rs = "data-te-invalid-feedback";
var Xl = "data-te-validation-ruleset";
var n0 = "data-te-submit-btn-ref";
var o0 = `[${Yh}]`;
var r0 = "[data-te-input-notch-ref] div";
var a0 = `[${n0}]`;
var l0 = `validated${yn}`;
var c0 = `valid${yn}`;
var h0 = `invalid${yn}`;
var d0 = `changed${yn}`;
var u0 = {
  validFeedback: "string",
  invalidFeedback: "string",
  disableFeedback: "boolean",
  customRules: "object",
  customErrorMessages: "object",
  activeValidation: "boolean",
  submitCallback: "(function|null)"
};
var Gl = {
  validFeedback: "Looks good!",
  invalidFeedback: "Something is wrong!",
  disableFeedback: false,
  customRules: {},
  customErrorMessages: {},
  activeValidation: false,
  submitCallback: null
};
var p0 = {
  notchLeadingValid: "border-[#14a44d] dark:border-[#14a44d] group-data-[te-input-focused]:shadow-[-1px_0_0_#14a44d,_0_1px_0_0_#14a44d,_0_-1px_0_0_#14a44d] group-data-[te-input-focused]:border-[#14a44d]",
  notchMiddleValid: "border-[#14a44d] dark:border-[#14a44d] group-data-[te-input-focused]:shadow-[0_1px_0_0_#14a44d] group-data-[te-input-focused]:border-[#14a44d]",
  notchTrailingValid: "border-[#14a44d] dark:border-[#14a44d] group-data-[te-input-focused]:shadow-[1px_0_0_#14a44d,_0_-1px_0_0_#14a44d,_0_1px_0_0_#14a44d] group-data-[te-input-focused]:border-[#14a44d]",
  notchLeadingInvalid: "border-[#dc4c64] dark:border-[#dc4c64] group-data-[te-input-focused]:shadow-[-1px_0_0_#dc4c64,_0_1px_0_0_#dc4c64,_0_-1px_0_0_#dc4c64] group-data-[te-input-focused]:border-[#dc4c64]",
  notchMiddleInvalid: "border-[#dc4c64] dark:border-[#dc4c64] group-data-[te-input-focused]:shadow-[0_1px_0_0_#dc4c64] group-data-[te-input-focused]:border-[#dc4c64]",
  notchTrailingInvalid: "border-[#dc4c64] dark:border-[#dc4c64] group-data-[te-input-focused]:shadow-[1px_0_0_#dc4c64,_0_-1px_0_0_#dc4c64,_0_1px_0_0_#dc4c64] group-data-[te-input-focused]:border-[#dc4c64]",
  basicInputValid: "!border-[#14a44d] focus:!border-[#14a44d] focus:!shadow-[inset_0_0_0_1px_#14a44d]",
  basicInputInvalid: "!border-[#dc4c64] focus:!border-[#dc4c64] focus:!shadow-[inset_0_0_0_1px_#dc4c64]",
  checkboxValid: "checked:!border-[#14a44d] checked:!bg-[#14a44d] checked:after:!bg-[#14a44d]",
  checkboxInvalid: "checked:!border-[#dc4c64] checked:!bg-[#dc4c64] checked:after:!bg-[#dc4c64]",
  radioValid: "checked:!border-[#14a44d] checked:after:!bg-[#14a44d]",
  radioInvalid: "checked:!border-[#dc4c64] checked:after:!bg-[#dc4c64]",
  labelValid: "!text-[#14a44d]",
  labelInvalid: "!text-[#dc4c64]",
  validFeedback: "absolute top-full left-0 m-1 w-auto text-sm text-[#14a44d] animate-[fade-in_0.3s_both]",
  invalidFeedback: "absolute top-full left-0 m-1 w-auto text-sm text-[#dc4c64] animate-[fade-in_0.3s_both]",
  elementValidated: "mb-8"
};
var _0 = {
  notchLeadingValid: "string",
  notchMiddleValid: "string",
  notchTrailingValid: "string",
  notchLeadingInvalid: "string",
  notchMiddleInvalid: "string",
  notchTrailingInvalid: "string",
  basicInputValid: "string",
  basicInputInvalid: "string",
  checkboxValid: "string",
  checkboxInvalid: "string",
  radioValid: "string",
  radioInvalid: "string",
  labelValid: "string",
  labelInvalid: "string",
  validFeedback: "string",
  invalidFeedback: "string",
  elementValidated: "string"
};

class jh extends ft2 {
  constructor(t2, e2, i2) {
    super(t2), this._element = t2, this._element && A2.setData(t2, ir2, this), this._config = this._getConfig(e2), this._classes = this._getClasses(i2), this._isValid = true, this._shouldApplyInputEvents = true, this._submitCallback = null, this._errorMessages = {
      ...i0,
      ...this._config.customErrorMessages
    }, this._validationElements = this._getValidationElements(), this._validationElements.forEach(({ element: n2, input: o2 }) => {
      this._createFeedbackWrapper(n2, o2);
    }), this._validationObserver = this._watchForValidationChanges(), this._validationObserver.observe(this._element, { attributes: true }), this._submitButton = null, this._handleSubmitButton(), this._validationResult = [];
  }
  static get DefaultType() {
    return u0;
  }
  static get Default() {
    return Gl;
  }
  static get NAME() {
    return Do;
  }
  dispose() {
    var t2;
    (t2 = this._validationObserver) == null || t2.disconnect(), this._validationObserver = null, this._submitCallback = null, this._element.removeAttribute(Ls), this._removeInputEvents(), this._removeValidationTraces(), this._validationResult = [], this._submitButton && c2.off(this._submitButton, "click"), this._config.activeValidation && (this._validationElements.forEach((e2) => {
      const { input: i2 } = e2;
      c2.off(i2, "input");
    }), this._shouldApplyInputEvents = true);
  }
  _removeValidationTraces() {
    this._removeFeedbackWrapper(), this._validationElements.forEach(({ element: t2, classes: e2, initialHTML: i2 }) => {
      t2.className = e2, t2.innerHTML = i2, t2.removeAttribute(Ns), t2.removeAttribute(Rs), t2.removeAttribute($o);
    }), this._validationElements = [];
  }
  _getValidationElements() {
    return d2.find(o0, this._element).map((e2) => {
      const i2 = d2.findOne("input", e2) || d2.findOne("textarea", e2), n2 = d2.findOne("select", e2);
      return {
        id: i2.name || i2.id || (n2 == null ? undefined : n2.name) || et2("validation-"),
        element: e2,
        type: e2.getAttribute(Yh),
        input: i2,
        validFeedback: e2.getAttribute($o),
        invalidFeedback: e2.getAttribute(Rs),
        classes: e2.className,
        initialHTML: e2.innerHTML,
        ruleset: e2.getAttribute(Xl)
      };
    });
  }
  _createFeedbackWrapper(t2, e2) {
    if (t2.querySelectorAll(`[${Ms}]`).length > 0)
      return;
    const i2 = document.createElement("span");
    i2.setAttribute(Ms, ""), e2.parentNode.appendChild(i2);
  }
  _removeFeedbackWrapper() {
    d2.find(`[${Ms}]`, this._element).forEach((e2) => {
      e2.remove();
    });
  }
  _watchForValidationChanges() {
    return new MutationObserver((e2) => {
      e2.forEach((i2) => {
        const { attributeName: n2 } = i2;
        n2 === Ls && (this._handleValidation(), this._config.activeValidation && this._shouldApplyInputEvents && this._applyInputEvents());
      });
    });
  }
  _handleValidation() {
    this._element.getAttribute(Ls) && (this._validationResult = [], this._isValid = true, this._validationElements.forEach((t2) => this._validateSingleElement(t2)), this._emitEvents(this._isValid), this._submitCallback && this._submitCallback(this._isValid));
  }
  _validateSingleElement(t2) {
    var p2;
    const { element: e2, type: i2, input: n2, ruleset: o2, id: r2 } = t2;
    o2 && this._validateByRuleset(t2);
    const a2 = e2.getAttribute(Ns);
    if (a2 !== "valid" && a2 !== "invalid")
      return;
    const l2 = a2.replace(a2.charAt(0), a2.charAt(0).toUpperCase());
    i2 === "input" && this._restyleNotches(e2, l2), i2 === "basic" && this._restyleBasicInputs(n2, l2), (i2 === "checkbox" || i2 === "radio") && this._restyleCheckboxes(n2, l2, i2), this._restyleLabels(e2, l2), a2 === "invalid" && (this._isValid = false), this._config.disableFeedback || this._applyFeedback(e2, a2), c2.trigger(this._element, d0, {
      value: {
        name: r2,
        result: a2,
        validation: (p2 = this._validationResult[r2]) == null ? undefined : p2.validation
      }
    });
  }
  _validateByRuleset({ element: t2, type: e2, invalidFeedback: i2, input: n2, id: o2 }) {
    const r2 = this._getRuleset(t2);
    if (!r2.length)
      return;
    const a2 = e2 === "checkbox" || e2 === "radio" ? n2.checked : n2.value;
    let l2 = "", p2 = [];
    for (const u2 of r2) {
      const _2 = u2.callback(a2, this._errorMessages[u2.name] || this._config.invalidFeedback, u2.parameter);
      p2.push({
        result: _2 === true,
        name: u2.name,
        fullName: u2.fullName
      }), typeof _2 == "string" && !l2 && (l2 = _2);
    }
    if (this._validationResult[o2] = { element: t2, validation: p2 }, !l2) {
      t2.setAttribute(Ns, "valid");
      return;
    }
    t2.setAttribute(Ns, "invalid"), i2 || t2.setAttribute(Rs, l2);
  }
  _handleInputChange(t2) {
    this._validateSingleElement(t2);
  }
  _getRuleset(t2) {
    const i2 = t2.getAttribute(Xl).split("|");
    let n2 = [];
    const o2 = {
      ...s0,
      ...this._config.customRules
    };
    return i2.forEach((r2) => {
      const a2 = this._getRuleData(r2, o2);
      a2.callback ? n2.push(a2) : console.warn(`Rule ${r2} does not exist`);
    }), n2;
  }
  _getRuleData(t2, e2) {
    const i2 = t2.split("(");
    return {
      callback: e2[i2[0]],
      parameter: i2[1] ? i2[1].split(")")[0] : null,
      name: i2[0],
      fullName: t2
    };
  }
  _applyFeedback(t2, e2) {
    const i2 = d2.findOne(`[${Ms}]`, t2), n2 = t2.getAttribute($o) || this._config.validFeedback, o2 = t2.getAttribute(Rs) || this._config.invalidFeedback;
    h2.addClass(t2, this._classes.elementValidated), i2.textContent = e2 === "valid" ? n2 : o2, i2.className = this._classes[e2 === "valid" ? "validFeedback" : "invalidFeedback"];
  }
  _restyleCheckboxes(t2, e2, i2) {
    h2.removeClass(t2, this._classes.checkboxValid), h2.removeClass(t2, this._classes.checkboxInvalid), h2.addClass(t2, this._classes[`${i2}${e2}`]);
  }
  _restyleBasicInputs(t2, e2) {
    h2.removeClass(t2, this._classes.basicInputValid), h2.removeClass(t2, this._classes.basicInputInvalid), h2.addClass(t2, this._classes[`basicInput${e2}`]);
  }
  _restyleNotches(t2, e2) {
    d2.find(r0, t2).forEach((n2, o2) => {
      let r2 = o2 === 0 ? "notchLeading" : o2 === 1 ? "notchMiddle" : "notchTrailing";
      n2.className = "", h2.addClass(n2, ph[r2]), r2 += e2, h2.addClass(n2, this._classes[r2]);
    });
  }
  _restyleLabels(t2, e2) {
    const i2 = d2.find("label", t2);
    i2.length && i2.forEach((n2) => {
      h2.removeClass(n2, this._classes.labelValid), h2.removeClass(n2, this._classes.labelInvalid), h2.addClass(n2, this._classes[`label${e2}`]);
    });
  }
  _emitEvents(t2) {
    if (c2.trigger(this._element, l0), t2) {
      c2.trigger(this._element, c0, {
        value: this._validationResult
      });
      return;
    }
    c2.trigger(this._element, h0, {
      value: this._validationResult
    });
  }
  _applyInputEvents() {
    this._validationElements.forEach((t2) => {
      const { input: e2, element: i2 } = t2;
      c2.on(e2, "input", () => this._handleInputChange(t2)), c2.on(i2, "valueChange.te.select", () => this._delayedInputChange(t2)), c2.on(i2, "itemSelect.te.autocomplete", () => this._delayedInputChange(t2));
    }), this._shouldApplyInputEvents = false;
  }
  _removeInputEvents() {
    this._validationElements.forEach((t2) => {
      const { input: e2, element: i2 } = t2;
      c2.off(e2, "input", () => this._handleInputChange(t2)), c2.off(i2, "valueChange.te.select", () => this._delayedInputChange(t2)), c2.off(i2, "itemSelect.te.autocomplete", () => this._delayedInputChange(t2));
    });
  }
  _delayedInputChange(t2) {
    setTimeout(() => {
      this._handleInputChange(t2);
    }, 10);
  }
  _handleSubmitButton() {
    this._submitButton = d2.findOne(a0, this._element), this._submitButton && c2.on(this._submitButton, "click", (t2) => this._handleSubmitButtonClick(t2));
  }
  _handleSubmitButtonClick(t2) {
    if (this._element.setAttribute(Ls, true), this._config.submitCallback) {
      this._submitCallback = (e2) => this._config.submitCallback(t2, e2);
      return;
    }
  }
  _getConfig(t2) {
    return t2 = {
      ...Gl,
      ...h2.getDataAttributes(this._element),
      ...typeof t2 == "object" && t2 ? t2 : {}
    }, I2(Do, t2, this.constructor.DefaultType), t2;
  }
  _getClasses(t2) {
    const e2 = h2.getDataClassAttributes(this._element);
    return t2 = {
      ...p0,
      ...e2,
      ...t2
    }, I2(Do, t2, _0), t2;
  }
  static getInstance(t2) {
    return A2.getData(t2, ir2);
  }
  static getOrCreateInstance(t2, e2 = {}) {
    return this.getInstance(t2) || new this(t2, typeof e2 == "object" ? e2 : null);
  }
  static jQueryInterface(t2) {
    return this.each(function() {
      const e2 = jh.getOrCreateInstance(this);
      if (typeof t2 == "string") {
        if (e2[t2] === undefined || t2.startsWith("_") || t2 === "constructor")
          throw new TypeError(`No method named "${t2}"`);
        e2[t2](this);
      }
    });
  }
}
var Zt2 = "pan";
var A0 = `${Zt2}start`;
var y0 = `${Zt2}end`;
var w0 = `${Zt2}move`;
var Ue2 = "pinch";
var D0 = `${Ue2}end`;
var $0 = `${Ue2}start`;
var L0 = `${Ue2}move`;
var Wi = "rotate";
var V0 = `${Wi}end`;
var W0 = `${Wi}start`;
var sr2 = "touch";
var Mo = `te.${sr2}`;
var nr2 = "smoothScroll";
var Si = `te.${nr2}`;
var Or2 = `.${Si}`;
var G0 = `scrollStart${Or2}`;
var q0 = `scrollEnd${Or2}`;
var Z0 = `scrollCancel${Or2}`;
var Ii = "te.clipboard";
var sC = `.${Ii}`;
var rC = `copy${sC}`;
var rr2 = "infiniteScroll";
var Bs = `te.${rr2}`;
var Fi = "loadingManagement";
var Hs = `te.${Fi}`;
var uC = `show.te.${Fi}`;
var on = "datetimepicker";
var Di = `te.${on}`;
var Sr2 = `.${Di}`;
var qh = "data-te-datepicker-init";
var Zh = "data-te-timepicker-init";
var DC = "data-te-date-timepicker-toggle-ref";
var LC = "data-te-timepicker-toggle-button-ref";
var NC = `[${Zh}]`;
var MC = `[${qh}]`;
var RC = `[${DC}]`;
var PC = `[${LC}]`;
var FC = `open${Sr2}`;
var YC = `close${Sr2}`;
var jC = `datetimeChange${Sr2}`;
var Re2 = $2("div");
var rn = "sticky";
var $i = `te.${rn}`;
var Jh = `.${$i}`;
var XC = `active${Jh}`;
var GC = `inactive${Jh}`;
var Li = "te.autocomplete";
var aA = "data-te-autocomplete-custom-content-ref";
var hA = `[${aA}]`;
var wn = `.${Li}`;
var uA = `close${wn}`;
var pA = `open${wn}`;
var lc = `itemSelect${wn}`;
var _A = `update${wn}`;
var an = "multiRangeSlider";
var ln = `te.${an}`;
var CA = `.${ln}`;
var cc = `valueChanged${CA}`;
var xA = (s2) => {
  gc(() => {
    const t2 = mc();
    if (t2) {
      const e2 = s2.NAME, i2 = t2.fn[e2];
      t2.fn[e2] = s2.jQueryInterface, t2.fn[e2].Constructor = s2, t2.fn[e2].noConflict = () => (t2.fn[e2] = i2, s2.jQueryInterface);
    }
  });
};
var OA = (s2, t2) => {
  c2.on(document, `click.te.${s2.NAME}`, t2, function(e2) {
    e2.preventDefault(), s2.getOrCreateInstance(this).toggle();
  });
};
var SA = (s2, t2) => {
  c2.on(document, `click.te.${s2.NAME}.data-api`, t2, function(e2) {
    if (["A", "AREA"].includes(this.tagName) && e2.preventDefault(), be2(this))
      return;
    s2.getOrCreateInstance(this).show();
  });
};
var IA = (s2, t2) => {
  c2.on(document, `click.te.${s2.NAME}.data-api`, t2, function(e2) {
    const i2 = te2(this);
    if (["A", "AREA"].includes(this.tagName) && e2.preventDefault(), be2(this))
      return;
    c2.one(i2, s2.EVENT_HIDDEN, () => {
      Mt2(this) && this.focus();
    });
    const n2 = d2.findOne(s2.OPEN_SELECTOR);
    n2 && n2 !== i2 && s2.getInstance(n2).hide(), s2.getOrCreateInstance(i2).toggle(this);
  });
};
var DA = (s2, t2) => {
  c2.on(document, `click.te.${s2.NAME}`, t2, (e2) => {
    e2.preventDefault();
    const i2 = e2.target.closest(t2);
    s2.getOrCreateInstance(i2).toggle();
  });
};
var $A = (s2, t2) => {
  c2.on(document, `click.te.${s2.NAME}`, t2, function(e2) {
    const i2 = te2(this);
    ["A", "AREA"].includes(this.tagName) && e2.preventDefault(), c2.one(i2, s2.EVENT_SHOW, (r2) => {
      r2.defaultPrevented || c2.one(i2, s2.EVENT_HIDDEN, () => {
        Mt2(this) && this.focus();
      });
    });
    const n2 = d2.findOne(`[${s2.OPEN_SELECTOR}="true"]`);
    n2 && s2.getInstance(n2).hide(), s2.getOrCreateInstance(i2).toggle(this);
  });
};
var LA = (s2, t2) => {
  c2.one(document, "mousedown", t2, s2.autoInitial(new s2));
};
var NA = (s2, t2) => {
  c2.on(document, `click.te.${s2.NAME}.data-api`, t2, function(e2) {
    (e2.target.tagName === "A" || e2.delegateTarget && e2.delegateTarget.tagName === "A") && e2.preventDefault();
    const i2 = lr2(this);
    d2.find(i2).forEach((o2) => {
      s2.getOrCreateInstance(o2, { toggle: false }).toggle();
    });
  });
};
var MA = (s2, t2) => {
  [].slice.call(document.querySelectorAll(t2)).map(function(i2) {
    return new s2(i2);
  });
};
var RA = (s2, t2) => {
  [].slice.call(document.querySelectorAll(t2)).map(function(i2) {
    return new s2(i2);
  });
};
var PA = (s2, t2) => {
  d2.find(t2).forEach((e2) => {
    new s2(e2);
  }), c2.on(document, `click.te.${s2.NAME}.data-api`, `${t2} img:not([data-te-lightbox-disabled])`, s2.toggle());
};
var BA = (s2, t2) => {
  const e2 = (o2) => o2[0] === "{" && o2[o2.length - 1] === "}" || o2[0] === "[" && o2[o2.length - 1] === "]", i2 = (o2) => typeof o2 != "string" ? o2 : e2(o2) ? JSON.parse(o2.replace(/'/g, '"')) : o2, n2 = (o2) => {
    const r2 = {};
    return Object.keys(o2).forEach((a2) => {
      if (a2.match(/dataset.*/)) {
        const l2 = a2.slice(7, 8).toLowerCase().concat(a2.slice(8));
        r2[l2] = i2(o2[a2]);
      }
    }), r2;
  };
  d2.find(t2).forEach((o2) => {
    if (h2.getDataAttribute(o2, "chart") !== "bubble" && h2.getDataAttribute(o2, "chart") !== "scatter") {
      const r2 = h2.getDataAttributes(o2), a2 = {
        data: {
          datasets: [n2(r2)]
        }
      };
      return r2.chart && (a2.type = r2.chart), r2.labels && (a2.data.labels = JSON.parse(r2.labels.replace(/'/g, '"'))), new s2(o2, {
        ...a2,
        ...wi[a2.type]
      });
    }
    return null;
  });
};

class HA {
  constructor() {
    this.inits = [];
  }
  get initialized() {
    return this.inits;
  }
  isInited(t2) {
    return this.inits.includes(t2);
  }
  add(t2) {
    this.isInited(t2) || this.inits.push(t2);
  }
}
var ar2 = new HA;
var Ni = {
  alert: {
    name: "Alert",
    selector: "[data-te-alert-init]",
    isToggler: false
  },
  animation: {
    name: "Animate",
    selector: "[data-te-animation-init]",
    isToggler: false
  },
  carousel: {
    name: "Carousel",
    selector: "[data-te-carousel-init]",
    isToggler: false
  },
  chips: {
    name: "ChipsInput",
    selector: "[data-te-chips-input-init]",
    isToggler: false
  },
  chip: {
    name: "Chip",
    selector: "[data-te-chip-init]",
    isToggler: false,
    onInit: "init"
  },
  datepicker: {
    name: "Datepicker",
    selector: "[data-te-datepicker-init]",
    isToggler: false
  },
  datetimepicker: {
    name: "Datetimepicker",
    selector: "[data-te-date-timepicker-init]",
    isToggler: false
  },
  input: {
    name: "Input",
    selector: "[data-te-input-wrapper-init]",
    isToggler: false
  },
  perfectScrollbar: {
    name: "PerfectScrollbar",
    selector: "[data-te-perfect-scrollbar-init]",
    isToggler: false
  },
  rating: {
    name: "Rating",
    selector: "[data-te-rating-init]",
    isToggler: false
  },
  scrollspy: {
    name: "ScrollSpy",
    selector: "[data-te-spy='scroll']",
    isToggler: false
  },
  select: {
    name: "Select",
    selector: "[data-te-select-init]",
    isToggler: false
  },
  sidenav: {
    name: "Sidenav",
    selector: "[data-te-sidenav-init]",
    isToggler: false
  },
  stepper: {
    name: "Stepper",
    selector: "[data-te-stepper-init]",
    isToggler: false
  },
  timepicker: {
    name: "Timepicker",
    selector: "[data-te-timepicker-init]",
    isToggler: false
  },
  toast: {
    name: "Toast",
    selector: "[data-te-toast-init]",
    isToggler: false
  },
  datatable: {
    name: "Datatable",
    selector: "[data-te-datatable-init]"
  },
  popconfirm: {
    name: "Popconfirm",
    selector: "[data-te-toggle='popconfirm']"
  },
  validation: {
    name: "Validation",
    selector: "[data-te-validation-init]"
  },
  smoothScroll: {
    name: "SmoothScroll",
    selector: "a[data-te-smooth-scroll-init]"
  },
  lazyLoad: {
    name: "LazyLoad",
    selector: "[data-te-lazy-load-init]"
  },
  clipboard: {
    name: "Clipboard",
    selector: "[data-te-clipboard-init]"
  },
  infiniteScroll: {
    name: "InfiniteScroll",
    selector: "[data-te-infinite-scroll-init]"
  },
  loadingManagement: {
    name: "LoadingManagement",
    selector: "[data-te-loading-management-init]"
  },
  sticky: {
    name: "Sticky",
    selector: "[data-te-sticky-init]"
  },
  multiRangeSlider: {
    name: "MultiRangeSlider",
    selector: "[data-te-multi-range-slider-init]"
  },
  chart: {
    name: "Chart",
    selector: "[data-te-chart]",
    isToggler: false,
    advanced: BA
  },
  button: {
    name: "Button",
    selector: "[data-te-toggle='button']",
    isToggler: true,
    callback: DA
  },
  collapse: {
    name: "Collapse",
    selector: "[data-te-collapse-init]",
    isToggler: true,
    callback: NA
  },
  dropdown: {
    name: "Dropdown",
    selector: "[data-te-dropdown-toggle-ref]",
    isToggler: true,
    callback: OA
  },
  modal: {
    name: "Modal",
    selector: "[data-te-toggle='modal']",
    isToggler: true,
    callback: $A
  },
  ripple: {
    name: "Ripple",
    selector: "[data-te-ripple-init]",
    isToggler: true,
    callback: LA
  },
  offcanvas: {
    name: "Offcanvas",
    selector: "[data-te-offcanvas-toggle]",
    isToggler: true,
    callback: IA
  },
  tab: {
    name: "Tab",
    selector: "[data-te-toggle='tab'], [data-te-toggle='pill'], [data-te-toggle='list']",
    isToggler: true,
    callback: SA
  },
  tooltip: {
    name: "Tooltip",
    selector: "[data-te-toggle='tooltip']",
    isToggler: false,
    callback: MA
  },
  popover: {
    name: "Popover",
    selector: "[data-te-toggle='popover']",
    isToggler: true,
    callback: RA
  },
  lightbox: {
    name: "Lightbox",
    selector: "[data-te-lightbox-init]",
    isToggler: true,
    callback: PA
  },
  touch: {
    name: "Touch",
    selector: "[data-te-touch-init]"
  }
};
var VA = (s2) => Ni[s2.NAME] || null;
var WA = (s2, t2) => {
  if (!s2 || !t2.allowReinits && ar2.isInited(s2.NAME))
    return;
  ar2.add(s2.NAME);
  const e2 = VA(s2), i2 = (e2 == null ? undefined : e2.isToggler) || false;
  if (xA(s2), e2 != null && e2.advanced) {
    e2 == null || e2.advanced(s2, e2 == null ? undefined : e2.selector);
    return;
  }
  if (i2) {
    e2 == null || e2.callback(s2, e2 == null ? undefined : e2.selector);
    return;
  }
  d2.find(e2 == null ? undefined : e2.selector).forEach((n2) => {
    let o2 = s2.getInstance(n2);
    o2 || (o2 = new s2(n2), e2 != null && e2.onInit && o2[e2.onInit]());
  });
};
var FA = (s2, t2) => {
  s2.forEach((e2) => WA(e2, t2));
};
var YA = {
  allowReinits: false,
  checkOtherImports: false
};
var qA = (s2, t2 = {}) => {
  t2 = { ...YA, ...t2 };
  const e2 = Object.keys(Ni).map((i2) => {
    if (!!document.querySelector(Ni[i2].selector)) {
      const o2 = s2[Ni[i2].name];
      return !o2 && !ar2.isInited(i2) && t2.checkOtherImports && console.warn(`Please import ${Ni[i2].name} from "tw-elements" package and add it to a object parameter inside "initTE" function`), o2;
    }
  });
  FA(e2, t2);
};

// src/main/resources/META-INF/resources/js/index.js
var loader = __toESM(require_loader(), 1);

// src/main/resources/META-INF/resources/js/sse.js
(function() {
  var api;
  htmx.defineExtension("sse", {
    init: function(apiRef) {
      api = apiRef;
      if (htmx.createEventSource == undefined) {
        htmx.createEventSource = createEventSource;
      }
    },
    onEvent: function(name, evt) {
      switch (name) {
        case "htmx:beforeCleanupElement":
          var internalData = api.getInternalData(evt.target);
          if (internalData.sseEventSource) {
            internalData.sseEventSource.close();
          }
          return;
        case "htmx:afterProcessNode":
          createEventSourceOnElement(evt.target);
      }
    }
  });
  function createEventSource(url) {
    return new EventSource(url, { withCredentials: true });
  }
  function splitOnWhitespace(trigger) {
    return trigger.trim().split(/\s+/);
  }
  function getLegacySSEURL(elt) {
    var legacySSEValue = api.getAttributeValue(elt, "hx-sse");
    if (legacySSEValue) {
      var values = splitOnWhitespace(legacySSEValue);
      for (var i2 = 0;i2 < values.length; i2++) {
        var value = values[i2].split(/:(.+)/);
        if (value[0] === "connect") {
          return value[1];
        }
      }
    }
  }
  function getLegacySSESwaps(elt) {
    var legacySSEValue = api.getAttributeValue(elt, "hx-sse");
    var returnArr = [];
    if (legacySSEValue) {
      var values = splitOnWhitespace(legacySSEValue);
      for (var i2 = 0;i2 < values.length; i2++) {
        var value = values[i2].split(/:(.+)/);
        if (value[0] === "swap") {
          returnArr.push(value[1]);
        }
      }
    }
    return returnArr;
  }
  function createEventSourceOnElement(elt, retryCount) {
    if (elt == null) {
      return null;
    }
    var internalData = api.getInternalData(elt);
    var sseURL = api.getAttributeValue(elt, "sse-connect");
    if (sseURL == undefined) {
      var legacyURL = getLegacySSEURL(elt);
      if (legacyURL) {
        sseURL = legacyURL;
      } else {
        return null;
      }
    }
    var source = htmx.createEventSource(sseURL);
    internalData.sseEventSource = source;
    source.onerror = function(err) {
      api.triggerErrorEvent(elt, "htmx:sseError", { error: err, source });
      if (maybeCloseSSESource(elt)) {
        return;
      }
      if (source.readyState === EventSource.CLOSED) {
        retryCount = retryCount || 0;
        var timeout = Math.random() * (2 ^ retryCount) * 500;
        window.setTimeout(function() {
          createEventSourceOnElement(elt, Math.min(7, retryCount + 1));
        }, timeout);
      }
    };
    source.onopen = function(evt) {
      api.triggerEvent(elt, "htmx:sseOpen", { source });
    };
    queryAttributeOnThisOrChildren(elt, "sse-swap").forEach(function(child) {
      var sseSwapAttr = api.getAttributeValue(child, "sse-swap");
      if (sseSwapAttr) {
        var sseEventNames = sseSwapAttr.split(",");
      } else {
        var sseEventNames = getLegacySSESwaps(child);
      }
      for (var i2 = 0;i2 < sseEventNames.length; i2++) {
        var sseEventName = sseEventNames[i2].trim();
        var listener = function(event) {
          if (maybeCloseSSESource(elt)) {
            source.removeEventListener(sseEventName, listener);
            return;
          }
          swap(child, event.data);
          api.triggerEvent(elt, "htmx:sseMessage", event);
        };
        api.getInternalData(elt).sseEventListener = listener;
        source.addEventListener(sseEventName, listener);
      }
    });
    queryAttributeOnThisOrChildren(elt, "hx-trigger").forEach(function(child) {
      var sseEventName = api.getAttributeValue(child, "hx-trigger");
      if (sseEventName == null) {
        return;
      }
      if (sseEventName.slice(0, 4) != "sse:") {
        return;
      }
      var listener = function(event) {
        if (maybeCloseSSESource(elt)) {
          source.removeEventListener(sseEventName, listener);
          return;
        }
        htmx.trigger(child, sseEventName, event);
        htmx.trigger(child, "htmx:sseMessage", event);
      };
      api.getInternalData(elt).sseEventListener = listener;
      source.addEventListener(sseEventName.slice(4), listener);
    });
  }
  function maybeCloseSSESource(elt) {
    if (!api.bodyContains(elt)) {
      var source = api.getInternalData(elt).sseEventSource;
      if (source != null) {
        source.close();
        return true;
      }
    }
    return false;
  }
  function queryAttributeOnThisOrChildren(elt, attributeName) {
    var result = [];
    if (api.hasAttribute(elt, attributeName) || api.hasAttribute(elt, "hx-sse")) {
      result.push(elt);
    }
    elt.querySelectorAll("[" + attributeName + "], [data-" + attributeName + "], [hx-sse], [data-hx-sse]").forEach(function(node) {
      result.push(node);
    });
    return result;
  }
  function swap(elt, content) {
    api.withExtensions(elt, function(extension) {
      content = extension.transformResponse(content, null, elt);
    });
    var swapSpec = api.getSwapSpecification(elt);
    var target = api.getTarget(elt);
    var settleInfo = api.makeSettleInfo(elt);
    api.selectAndSwap(swapSpec.swapStyle, target, elt, content, settleInfo);
    settleInfo.elts.forEach(function(elt2) {
      if (elt2.classList) {
        elt2.classList.add(htmx.config.settlingClass);
      }
      api.triggerEvent(elt2, "htmx:beforeSettle");
    });
    if (swapSpec.settleDelay > 0) {
      setTimeout(doSettle(settleInfo), swapSpec.settleDelay);
    } else {
      doSettle(settleInfo)();
    }
  }
  function doSettle(settleInfo) {
    return function() {
      settleInfo.tasks.forEach(function(task) {
        task.call();
      });
      settleInfo.elts.forEach(function(elt) {
        if (elt.classList) {
          elt.classList.remove(htmx.config.settlingClass);
        }
        api.triggerEvent(elt, "htmx:afterSettle");
      });
    };
  }
})();

// src/main/resources/META-INF/resources/js/index.js
var import_hyperscript = __toESM(require__hyperscript_min(), 1);

// src/main/resources/META-INF/resources/js/elements.js
var makeid = function(length) {
  let result = "";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var charactersLength = characters.length;
var inputClasses = "peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-150 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0";
var labelClasses = "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-150 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary";

class FormInput extends HTMLElement {
  constructor() {
    super();
    let id = this.id ?? makeid(8);
    let placeholder = this.getAttribute("placeholder");
    const div = document.createElement("div");
    div.classList.add("relative");
    div.classList.add("mb-3");
    const input = document.createElement("input");
    input.id = id + "-input";
    input.type = this.getAttribute("type") ?? "text";
    input.placeholder = placeholder;
    input.name = this.getAttribute("name");
    input.value = this.getAttribute("value");
    input.maxLength = Number(this.getAttribute("maxlength"));
    input.min = this.getAttribute("min");
    input.step = this.getAttribute("step");
    if (input.maxLength) {
      input.oninput = limitInputToMaxLength(input);
    }
    inputClasses.split(" ").forEach((element) => input.classList.add(element));
    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerText = placeholder;
    labelClasses.split(" ").forEach((element) => label.classList.add(element));
    div.appendChild(input);
    div.appendChild(label);
    this.appendChild(div);
    div.setAttribute("data-te-input-wrapper-init", "");
    div.setAttribute("data-te-validate", "input");
    let inputError = this.getAttribute("input-error")?.trim();
    if (inputError && inputError.length > 0) {
      div.setAttribute("data-te-invalid-feedback", inputError);
      div.setAttribute("data-te-validation-state", "invalid");
      this.removeAttribute("input-error");
    }
  }
}
customElements.define("cm-form-input", FormInput);

// src/main/resources/META-INF/resources/js/index.js
var disableButton = function(button) {
  if (!button) {
    throw new Error("form without button");
  }
  disableOnHtmxEvents(button, button);
};
var disableOnHtmxEvents = function(eventElement, btn) {
  btn.removeAttribute("disabled");
  eventElement.addEventListener("htmx:beforeRequest", function() {
    btn.toggleAttribute("disabled", true);
  });
  eventElement.addEventListener("htmx:afterRequest", function() {
    btn.toggleAttribute("disabled", false);
  });
  eventElement.addEventListener("htmx:beforeSwap", function() {
    btn.toggleAttribute("disabled", true);
  });
};
var getLastUrlSegment = function(url) {
  return new URL(url).pathname.split("/").filter(Boolean).pop();
};
import_hyperscript.default.browserInit();
window.initComponents = function() {
  console.log("INIT TW-ELEMENTS");
  qA({
    Carousel: Xt2,
    Datepicker: og,
    Input: V2,
    Ripple: ei,
    Select: kr2,
    Sidenav: Ci,
    Timepicker: Sg,
    Validation: jh
  }, { allowReinits: true }, true);
};
initComponents();
htmx.config.useTemplateFragments = true;
window.onload = function() {
  const inputs = document.getElementsByTagName("input");
  for (let i2 = 0;i2 < inputs.length; i2++) {
    if (inputs[i2].type === "search") {
      inputs[i2].onchange = function() {
        let value = this.value;
        this.value = this.value.replace(/^\s+/, "").replace(/\s+$/, "").trim();
        let val2 = this.value;
      };
    }
  }
  addDisableEventToButtons();
};
window.addDisableEventToButtons = function() {
  const buttons = document.getElementsByTagName("button");
  for (let i2 = 0;i2 < buttons.length; i2++) {
    disableButton(buttons[i2]);
  }
};
window.disableBtnInsideForm = function() {
  const forms = document.getElementsByTagName("form");
  for (let i2 = 0;i2 < forms.length; i2++) {
    const form = forms[i2];
    const buttons = form.getElementsByTagName("button");
    for (let j3 = 0;j3 < buttons.length; j3++) {
      const button = buttons[j3];
      disableOnHtmxEvents(form, button);
    }
  }
};
window.getLastUrlSegmentCurrent = function() {
  return getLastUrlSegment(window.location.href);
};
window.getQueryParam = function(name) {
  let params = new URL(document.location).searchParams;
  return params.get(name);
};
window.limitInputToMaxLength = function(input) {
  input.value = input.value.trim();
  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength);
  }
};
window.redirectTo = function(url) {
  window.location.href = "." + url;
};
window.initNav = function() {
  let lastUrlSegmentCurrent = getLastUrlSegmentCurrent();
  if (!lastUrlSegmentCurrent || lastUrlSegmentCurrent === "" || lastUrlSegmentCurrent === "index.html" || lastUrlSegmentCurrent === "index" || lastUrlSegmentCurrent === "/") {
    let item = localStorage.getItem("current-nav");
    if (item) {
      let elem = document.getElementById(item);
      elem?.dispatchEvent(new Event("navigate"));
      return;
    }
    let navbar = document.getElementsByClassName("navbar-start");
    if (navbar.length > 0) {
      let nav = navbar[0];
      let anchors = nav.getElementsByTagName("a");
      if (anchors.length > 0) {
        let anchor = anchors[0];
        localStorage.setItem("current-nav", anchor.id);
        anchor.dispatchEvent(new Event("navigate"));
      }
    }
  }
};
window.saveNavState = function(anchor) {
  console.log("saving nav state {}", anchor.id);
  localStorage.setItem("current-nav", anchor.id);
};
window.saveToLocalStorage = function(key, value) {
  localStorage.setItem(key, value);
};
window.getFromLocalStorage = function(key) {
  return localStorage.getItem(key);
};
var datePicker = document.querySelector("#datepicker-translated");
if (datePicker) {
  const datepickerTranslated = new og(datePicker, {
    title: "Seleccione una fecha",
    monthsFull: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    monthsShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    weekdaysFull: [
      "Domingo",
      "Lunes",
      "Martes",
      "Mi\xE9rcoles",
      "Jueves",
      "Viernes",
      "S\xE1bado"
    ],
    weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    weekdaysNarrow: ["D", "L", "M", "M", "J", "V", "S"],
    okBtnText: "Ok",
    clearBtnText: "Borrar",
    cancelBtnText: "Cancelar"
  });
}
document.getElementById("slim-toggler")?.addEventListener("click", () => {
  const instance = Ci.getInstance(document.getElementById("sidenav-4"));
  instance.toggleSlim();
});
var sidenav2 = document.getElementById("sidenav-1");
if (sidenav2) {
  const sidenavInstance2 = Ci.getInstance(sidenav2);
  let innerWidth2 = null;
  const setMode2 = (e2) => {
    if (window.innerWidth === innerWidth2) {
      return;
    }
    innerWidth2 = window.innerWidth;
    if (window.innerWidth < sidenavInstance2.getBreakpoint("xl")) {
      sidenavInstance2.changeMode("over");
      sidenavInstance2.hide();
    } else {
      sidenavInstance2.changeMode("side");
      sidenavInstance2.show();
    }
  };
  if (window.innerWidth < sidenavInstance2.getBreakpoint("sm")) {
    setMode2();
  }
  window.addEventListener("resize", setMode2);
}
