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
  (function(e, t) {
    if (typeof define === "function" && define.amd) {
      define([], t);
    } else if (typeof module === "object" && exports) {
      module.exports = t();
    } else {
      e.htmx = e.htmx || t();
    }
  })(typeof self !== "undefined" ? self : exports, function() {
    return function() {
      var Q2 = { onLoad: t, process: Bt2, on: Z2, off: K2, trigger: ce2, ajax: Or2, find: C, findAll: f, closest: v, values: function(e2, t2) {
        var r2 = ur2(e2, t2 || "post");
        return r2.values;
      }, remove: B2, addClass: F2, removeClass: n, toggleClass: V2, takeClass: j2, defineExtension: kr, removeExtension: Pr2, logAll: X2, logNone: U, logger: null, config: { historyEnabled: true, historyCacheSize: 10, refreshOnHistoryMiss: false, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: true, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: true, allowScriptTags: true, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: false, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: false, scrollBehavior: "smooth", defaultFocusScroll: false, getCacheBusterParam: false, globalViewTransitions: false, methodsThatUseUrlParams: ["get"], selfRequestsOnly: false, ignoreTitle: false, scrollIntoViewOnBoost: true }, parseInterval: d2, _: e, createEventSource: function(e2) {
        return new EventSource(e2, { withCredentials: true });
      }, createWebSocket: function(e2) {
        var t2 = new WebSocket(e2, []);
        t2.binaryType = Q2.config.wsBinaryType;
        return t2;
      }, version: "1.9.9" };
      var r = { addTriggerHandler: Tt2, bodyContains: se, canAccessLocalStorage: M2, findThisElement: de2, filterValues: dr2, hasAttribute: o, getAttributeValue: te2, getClosestAttributeValue: ne, getClosestMatch: c2, getExpressionVars: Cr, getHeaders: vr, getInputValues: ur2, getInternalData: ae2, getSwapSpecification: mr2, getTriggerSpecs: Qe2, getTarget: ge2, makeFragment: l, mergeObjects: le2, makeSettleInfo: R2, oobSwap: xe2, querySelectorExt: ue2, selectAndSwap: Ue2, settleImmediately: Yt2, shouldCancel: it2, triggerEvent: ce2, triggerErrorEvent: fe2, withExtensions: T };
      var b = ["get", "post", "put", "delete", "patch"];
      var w = b.map(function(e2) {
        return "[hx-" + e2 + "], [data-hx-" + e2 + "]";
      }).join(", ");
      function d2(e2) {
        if (e2 == undefined) {
          return;
        }
        if (e2.slice(-2) == "ms") {
          return parseFloat(e2.slice(0, -2)) || undefined;
        }
        if (e2.slice(-1) == "s") {
          return parseFloat(e2.slice(0, -1)) * 1000 || undefined;
        }
        if (e2.slice(-1) == "m") {
          return parseFloat(e2.slice(0, -1)) * 1000 * 60 || undefined;
        }
        return parseFloat(e2) || undefined;
      }
      function ee2(e2, t2) {
        return e2.getAttribute && e2.getAttribute(t2);
      }
      function o(e2, t2) {
        return e2.hasAttribute && (e2.hasAttribute(t2) || e2.hasAttribute("data-" + t2));
      }
      function te2(e2, t2) {
        return ee2(e2, t2) || ee2(e2, "data-" + t2);
      }
      function u(e2) {
        return e2.parentElement;
      }
      function re2() {
        return document;
      }
      function c2(e2, t2) {
        while (e2 && !t2(e2)) {
          e2 = u(e2);
        }
        return e2 ? e2 : null;
      }
      function S(e2, t2, r2) {
        var n2 = te2(t2, r2);
        var i2 = te2(t2, "hx-disinherit");
        if (e2 !== t2 && i2 && (i2 === "*" || i2.split(" ").indexOf(r2) >= 0)) {
          return "unset";
        } else {
          return n2;
        }
      }
      function ne(t2, r2) {
        var n2 = null;
        c2(t2, function(e2) {
          return n2 = S(t2, e2, r2);
        });
        if (n2 !== "unset") {
          return n2;
        }
      }
      function h2(e2, t2) {
        var r2 = e2.matches || e2.matchesSelector || e2.msMatchesSelector || e2.mozMatchesSelector || e2.webkitMatchesSelector || e2.oMatchesSelector;
        return r2 && r2.call(e2, t2);
      }
      function q2(e2) {
        var t2 = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var r2 = t2.exec(e2);
        if (r2) {
          return r2[1].toLowerCase();
        } else {
          return "";
        }
      }
      function i(e2, t2) {
        var r2 = new DOMParser;
        var n2 = r2.parseFromString(e2, "text/html");
        var i2 = n2.body;
        while (t2 > 0) {
          t2--;
          i2 = i2.firstChild;
        }
        if (i2 == null) {
          i2 = re2().createDocumentFragment();
        }
        return i2;
      }
      function H2(e2) {
        return e2.match(/<body/);
      }
      function l(e2) {
        var t2 = !H2(e2);
        if (Q2.config.useTemplateFragments && t2) {
          var r2 = i("<body><template>" + e2 + "</template></body>", 0);
          return r2.querySelector("template").content;
        } else {
          var n2 = q2(e2);
          switch (n2) {
            case "thead":
            case "tbody":
            case "tfoot":
            case "colgroup":
            case "caption":
              return i("<table>" + e2 + "</table>", 1);
            case "col":
              return i("<table><colgroup>" + e2 + "</colgroup></table>", 2);
            case "tr":
              return i("<table><tbody>" + e2 + "</tbody></table>", 2);
            case "td":
            case "th":
              return i("<table><tbody><tr>" + e2 + "</tr></tbody></table>", 3);
            case "script":
            case "style":
              return i("<div>" + e2 + "</div>", 1);
            default:
              return i(e2, 0);
          }
        }
      }
      function ie2(e2) {
        if (e2) {
          e2();
        }
      }
      function L(e2, t2) {
        return Object.prototype.toString.call(e2) === "[object " + t2 + "]";
      }
      function A(e2) {
        return L(e2, "Function");
      }
      function N(e2) {
        return L(e2, "Object");
      }
      function ae2(e2) {
        var t2 = "htmx-internal-data";
        var r2 = e2[t2];
        if (!r2) {
          r2 = e2[t2] = {};
        }
        return r2;
      }
      function I(e2) {
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
      function k(e2) {
        var t2 = e2.getBoundingClientRect();
        var r2 = t2.top;
        var n2 = t2.bottom;
        return r2 < window.innerHeight && n2 >= 0;
      }
      function se(e2) {
        if (e2.getRootNode && e2.getRootNode() instanceof window.ShadowRoot) {
          return re2().body.contains(e2.getRootNode().host);
        } else {
          return re2().body.contains(e2);
        }
      }
      function P(e2) {
        return e2.trim().split(/\s+/);
      }
      function le2(e2, t2) {
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
          x(e3);
          return null;
        }
      }
      function M2() {
        var e2 = "htmx:localStorageTest";
        try {
          localStorage.setItem(e2, e2);
          localStorage.removeItem(e2);
          return true;
        } catch (e3) {
          return false;
        }
      }
      function D2(t2) {
        try {
          var e2 = new URL(t2);
          if (e2) {
            t2 = e2.pathname + e2.search;
          }
          if (!t2.match("^/$")) {
            t2 = t2.replace(/\/+$/, "");
          }
          return t2;
        } catch (e3) {
          return t2;
        }
      }
      function e(e2) {
        return wr(re2().body, function() {
          return (0, eval)(e2);
        });
      }
      function t(t2) {
        var e2 = Q2.on("htmx:load", function(e3) {
          t2(e3.detail.elt);
        });
        return e2;
      }
      function X2() {
        Q2.logger = function(e2, t2, r2) {
          if (console) {
            console.log(t2, e2, r2);
          }
        };
      }
      function U() {
        Q2.logger = null;
      }
      function C(e2, t2) {
        if (t2) {
          return e2.querySelector(t2);
        } else {
          return C(re2(), e2);
        }
      }
      function f(e2, t2) {
        if (t2) {
          return e2.querySelectorAll(t2);
        } else {
          return f(re2(), e2);
        }
      }
      function B2(e2, t2) {
        e2 = s(e2);
        if (t2) {
          setTimeout(function() {
            B2(e2);
            e2 = null;
          }, t2);
        } else {
          e2.parentElement.removeChild(e2);
        }
      }
      function F2(e2, t2, r2) {
        e2 = s(e2);
        if (r2) {
          setTimeout(function() {
            F2(e2, t2);
            e2 = null;
          }, r2);
        } else {
          e2.classList && e2.classList.add(t2);
        }
      }
      function n(e2, t2, r2) {
        e2 = s(e2);
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
      function V2(e2, t2) {
        e2 = s(e2);
        e2.classList.toggle(t2);
      }
      function j2(e2, t2) {
        e2 = s(e2);
        oe(e2.parentElement.children, function(e3) {
          n(e3, t2);
        });
        F2(e2, t2);
      }
      function v(e2, t2) {
        e2 = s(e2);
        if (e2.closest) {
          return e2.closest(t2);
        } else {
          do {
            if (e2 == null || h2(e2, t2)) {
              return e2;
            }
          } while (e2 = e2 && u(e2));
          return null;
        }
      }
      function g(e2, t2) {
        return e2.substring(0, t2.length) === t2;
      }
      function _(e2, t2) {
        return e2.substring(e2.length - t2.length) === t2;
      }
      function z2(e2) {
        var t2 = e2.trim();
        if (g(t2, "<") && _(t2, "/>")) {
          return t2.substring(1, t2.length - 2);
        } else {
          return t2;
        }
      }
      function W2(e2, t2) {
        if (t2.indexOf("closest ") === 0) {
          return [v(e2, z2(t2.substr(8)))];
        } else if (t2.indexOf("find ") === 0) {
          return [C(e2, z2(t2.substr(5)))];
        } else if (t2 === "next") {
          return [e2.nextElementSibling];
        } else if (t2.indexOf("next ") === 0) {
          return [$2(e2, z2(t2.substr(5)))];
        } else if (t2 === "previous") {
          return [e2.previousElementSibling];
        } else if (t2.indexOf("previous ") === 0) {
          return [G2(e2, z2(t2.substr(9)))];
        } else if (t2 === "document") {
          return [document];
        } else if (t2 === "window") {
          return [window];
        } else if (t2 === "body") {
          return [document.body];
        } else {
          return re2().querySelectorAll(z2(t2));
        }
      }
      var $2 = function(e2, t2) {
        var r2 = re2().querySelectorAll(t2);
        for (var n2 = 0;n2 < r2.length; n2++) {
          var i2 = r2[n2];
          if (i2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_PRECEDING) {
            return i2;
          }
        }
      };
      var G2 = function(e2, t2) {
        var r2 = re2().querySelectorAll(t2);
        for (var n2 = r2.length - 1;n2 >= 0; n2--) {
          var i2 = r2[n2];
          if (i2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_FOLLOWING) {
            return i2;
          }
        }
      };
      function ue2(e2, t2) {
        if (t2) {
          return W2(e2, t2)[0];
        } else {
          return W2(re2().body, e2)[0];
        }
      }
      function s(e2) {
        if (L(e2, "String")) {
          return C(e2);
        } else {
          return e2;
        }
      }
      function J2(e2, t2, r2) {
        if (A(t2)) {
          return { target: re2().body, event: e2, listener: t2 };
        } else {
          return { target: s(e2), event: t2, listener: r2 };
        }
      }
      function Z2(t2, r2, n2) {
        Dr2(function() {
          var e3 = J2(t2, r2, n2);
          e3.target.addEventListener(e3.event, e3.listener);
        });
        var e2 = A(r2);
        return e2 ? r2 : n2;
      }
      function K2(t2, r2, n2) {
        Dr2(function() {
          var e2 = J2(t2, r2, n2);
          e2.target.removeEventListener(e2.event, e2.listener);
        });
        return A(r2) ? r2 : n2;
      }
      var ve2 = re2().createElement("output");
      function Y2(e2, t2) {
        var r2 = ne(e2, t2);
        if (r2) {
          if (r2 === "this") {
            return [de2(e2, t2)];
          } else {
            var n2 = W2(e2, r2);
            if (n2.length === 0) {
              x('The selector "' + r2 + '" on ' + t2 + " returned no matches!");
              return [ve2];
            } else {
              return n2;
            }
          }
        }
      }
      function de2(e2, t2) {
        return c2(e2, function(e3) {
          return te2(e3, t2) != null;
        });
      }
      function ge2(e2) {
        var t2 = ne(e2, "hx-target");
        if (t2) {
          if (t2 === "this") {
            return de2(e2, "hx-target");
          } else {
            return ue2(e2, t2);
          }
        } else {
          var r2 = ae2(e2);
          if (r2.boosted) {
            return re2().body;
          } else {
            return e2;
          }
        }
      }
      function me2(e2) {
        var t2 = Q2.config.attributesToSettle;
        for (var r2 = 0;r2 < t2.length; r2++) {
          if (e2 === t2[r2]) {
            return true;
          }
        }
        return false;
      }
      function pe2(t2, r2) {
        oe(t2.attributes, function(e2) {
          if (!r2.hasAttribute(e2.name) && me2(e2.name)) {
            t2.removeAttribute(e2.name);
          }
        });
        oe(r2.attributes, function(e2) {
          if (me2(e2.name)) {
            t2.setAttribute(e2.name, e2.value);
          }
        });
      }
      function ye(e2, t2) {
        var r2 = Mr2(t2);
        for (var n2 = 0;n2 < r2.length; n2++) {
          var i2 = r2[n2];
          try {
            if (i2.isInlineSwap(e2)) {
              return true;
            }
          } catch (e3) {
            x(e3);
          }
        }
        return e2 === "outerHTML";
      }
      function xe2(e2, i2, a2) {
        var t2 = "#" + ee2(i2, "id");
        var o2 = "outerHTML";
        if (e2 === "true") {
        } else if (e2.indexOf(":") > 0) {
          o2 = e2.substr(0, e2.indexOf(":"));
          t2 = e2.substr(e2.indexOf(":") + 1, e2.length);
        } else {
          o2 = e2;
        }
        var r2 = re2().querySelectorAll(t2);
        if (r2) {
          oe(r2, function(e3) {
            var t3;
            var r3 = i2.cloneNode(true);
            t3 = re2().createDocumentFragment();
            t3.appendChild(r3);
            if (!ye(o2, e3)) {
              t3 = r3;
            }
            var n2 = { shouldSwap: true, target: e3, fragment: t3 };
            if (!ce2(e3, "htmx:oobBeforeSwap", n2))
              return;
            e3 = n2.target;
            if (n2["shouldSwap"]) {
              De2(o2, e3, e3, t3, a2);
            }
            oe(a2.elts, function(e4) {
              ce2(e4, "htmx:oobAfterSwap", n2);
            });
          });
          i2.parentNode.removeChild(i2);
        } else {
          i2.parentNode.removeChild(i2);
          fe2(re2().body, "htmx:oobErrorNoTarget", { content: i2 });
        }
        return e2;
      }
      function be2(e2, t2, r2) {
        var n2 = ne(e2, "hx-select-oob");
        if (n2) {
          var i2 = n2.split(",");
          for (let e3 = 0;e3 < i2.length; e3++) {
            var a2 = i2[e3].split(":", 2);
            var o2 = a2[0].trim();
            if (o2.indexOf("#") === 0) {
              o2 = o2.substring(1);
            }
            var s2 = a2[1] || "true";
            var l2 = t2.querySelector("#" + o2);
            if (l2) {
              xe2(s2, l2, r2);
            }
          }
        }
        oe(f(t2, "[hx-swap-oob], [data-hx-swap-oob]"), function(e3) {
          var t3 = te2(e3, "hx-swap-oob");
          if (t3 != null) {
            xe2(t3, e3, r2);
          }
        });
      }
      function we2(e2) {
        oe(f(e2, "[hx-preserve], [data-hx-preserve]"), function(e3) {
          var t2 = te2(e3, "id");
          var r2 = re2().getElementById(t2);
          if (r2 != null) {
            e3.parentNode.replaceChild(r2, e3);
          }
        });
      }
      function Se(o2, e2, s2) {
        oe(e2.querySelectorAll("[id]"), function(e3) {
          var t2 = ee2(e3, "id");
          if (t2 && t2.length > 0) {
            var r2 = t2.replace("'", "\\'");
            var n2 = e3.tagName.replace(":", "\\:");
            var i2 = o2.querySelector(n2 + "[id='" + r2 + "']");
            if (i2 && i2 !== o2) {
              var a2 = e3.cloneNode();
              pe2(e3, i2);
              s2.tasks.push(function() {
                pe2(e3, a2);
              });
            }
          }
        });
      }
      function Ee2(e2) {
        return function() {
          n(e2, Q2.config.addedClass);
          Bt2(e2);
          Ot2(e2);
          Ce2(e2);
          ce2(e2, "htmx:load");
        };
      }
      function Ce2(e2) {
        var t2 = "[autofocus]";
        var r2 = h2(e2, t2) ? e2 : e2.querySelector(t2);
        if (r2 != null) {
          r2.focus();
        }
      }
      function a(e2, t2, r2, n2) {
        Se(e2, r2, n2);
        while (r2.childNodes.length > 0) {
          var i2 = r2.firstChild;
          F2(i2, Q2.config.addedClass);
          e2.insertBefore(i2, t2);
          if (i2.nodeType !== Node.TEXT_NODE && i2.nodeType !== Node.COMMENT_NODE) {
            n2.tasks.push(Ee2(i2));
          }
        }
      }
      function Te2(e2, t2) {
        var r2 = 0;
        while (r2 < e2.length) {
          t2 = (t2 << 5) - t2 + e2.charCodeAt(r2++) | 0;
        }
        return t2;
      }
      function Re2(e2) {
        var t2 = 0;
        if (e2.attributes) {
          for (var r2 = 0;r2 < e2.attributes.length; r2++) {
            var n2 = e2.attributes[r2];
            if (n2.value) {
              t2 = Te2(n2.name, t2);
              t2 = Te2(n2.value, t2);
            }
          }
        }
        return t2;
      }
      function Oe2(t2) {
        var r2 = ae2(t2);
        if (r2.onHandlers) {
          for (let e2 = 0;e2 < r2.onHandlers.length; e2++) {
            const n2 = r2.onHandlers[e2];
            t2.removeEventListener(n2.event, n2.listener);
          }
          delete r2.onHandlers;
        }
      }
      function qe2(e2) {
        var t2 = ae2(e2);
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
        if (t2.initHash) {
          t2.initHash = null;
        }
        Oe2(e2);
      }
      function m(e2) {
        ce2(e2, "htmx:beforeCleanupElement");
        qe2(e2);
        if (e2.children) {
          oe(e2.children, function(e3) {
            m(e3);
          });
        }
      }
      function He2(t2, e2, r2) {
        if (t2.tagName === "BODY") {
          return Pe2(t2, e2, r2);
        } else {
          var n2;
          var i2 = t2.previousSibling;
          a(u(t2), t2, e2, r2);
          if (i2 == null) {
            n2 = u(t2).firstChild;
          } else {
            n2 = i2.nextSibling;
          }
          ae2(t2).replacedWith = n2;
          r2.elts = r2.elts.filter(function(e3) {
            return e3 != t2;
          });
          while (n2 && n2 !== t2) {
            if (n2.nodeType === Node.ELEMENT_NODE) {
              r2.elts.push(n2);
            }
            n2 = n2.nextElementSibling;
          }
          m(t2);
          u(t2).removeChild(t2);
        }
      }
      function Le2(e2, t2, r2) {
        return a(e2, e2.firstChild, t2, r2);
      }
      function Ae2(e2, t2, r2) {
        return a(u(e2), e2, t2, r2);
      }
      function Ne2(e2, t2, r2) {
        return a(e2, null, t2, r2);
      }
      function Ie2(e2, t2, r2) {
        return a(u(e2), e2.nextSibling, t2, r2);
      }
      function ke2(e2, t2, r2) {
        m(e2);
        return u(e2).removeChild(e2);
      }
      function Pe2(e2, t2, r2) {
        var n2 = e2.firstChild;
        a(e2, n2, t2, r2);
        if (n2) {
          while (n2.nextSibling) {
            m(n2.nextSibling);
            e2.removeChild(n2.nextSibling);
          }
          m(n2);
          e2.removeChild(n2);
        }
      }
      function Me2(e2, t2, r2) {
        var n2 = r2 || ne(e2, "hx-select");
        if (n2) {
          var i2 = re2().createDocumentFragment();
          oe(t2.querySelectorAll(n2), function(e3) {
            i2.appendChild(e3);
          });
          t2 = i2;
        }
        return t2;
      }
      function De2(e2, t2, r2, n2, i2) {
        switch (e2) {
          case "none":
            return;
          case "outerHTML":
            He2(r2, n2, i2);
            return;
          case "afterbegin":
            Le2(r2, n2, i2);
            return;
          case "beforebegin":
            Ae2(r2, n2, i2);
            return;
          case "beforeend":
            Ne2(r2, n2, i2);
            return;
          case "afterend":
            Ie2(r2, n2, i2);
            return;
          case "delete":
            ke2(r2, n2, i2);
            return;
          default:
            var a2 = Mr2(t2);
            for (var o2 = 0;o2 < a2.length; o2++) {
              var s2 = a2[o2];
              try {
                var l2 = s2.handleSwap(e2, r2, n2, i2);
                if (l2) {
                  if (typeof l2.length !== "undefined") {
                    for (var u2 = 0;u2 < l2.length; u2++) {
                      var f2 = l2[u2];
                      if (f2.nodeType !== Node.TEXT_NODE && f2.nodeType !== Node.COMMENT_NODE) {
                        i2.tasks.push(Ee2(f2));
                      }
                    }
                  }
                  return;
                }
              } catch (e3) {
                x(e3);
              }
            }
            if (e2 === "innerHTML") {
              Pe2(r2, n2, i2);
            } else {
              De2(Q2.config.defaultSwapStyle, t2, r2, n2, i2);
            }
        }
      }
      function Xe2(e2) {
        if (e2.indexOf("<title") > -1) {
          var t2 = e2.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
          var r2 = t2.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);
          if (r2) {
            return r2[2];
          }
        }
      }
      function Ue2(e2, t2, r2, n2, i2, a2) {
        i2.title = Xe2(n2);
        var o2 = l(n2);
        if (o2) {
          be2(r2, o2, i2);
          o2 = Me2(r2, o2, a2);
          we2(o2);
          return De2(e2, r2, t2, o2, i2);
        }
      }
      function Be2(e2, t2, r2) {
        var n2 = e2.getResponseHeader(t2);
        if (n2.indexOf("{") === 0) {
          var i2 = E(n2);
          for (var a2 in i2) {
            if (i2.hasOwnProperty(a2)) {
              var o2 = i2[a2];
              if (!N(o2)) {
                o2 = { value: o2 };
              }
              ce2(r2, a2, o2);
            }
          }
        } else {
          var s2 = n2.split(",");
          for (var l2 = 0;l2 < s2.length; l2++) {
            ce2(r2, s2[l2].trim(), []);
          }
        }
      }
      var Fe2 = /\s/;
      var p = /[\s,]/;
      var Ve2 = /[_$a-zA-Z]/;
      var je2 = /[_$a-zA-Z0-9]/;
      var _e2 = ['"', "'", "/"];
      var ze2 = /[^\s]/;
      var We2 = /[{(]/;
      var $e2 = /[})]/;
      function Ge2(e2) {
        var t2 = [];
        var r2 = 0;
        while (r2 < e2.length) {
          if (Ve2.exec(e2.charAt(r2))) {
            var n2 = r2;
            while (je2.exec(e2.charAt(r2 + 1))) {
              r2++;
            }
            t2.push(e2.substr(n2, r2 - n2 + 1));
          } else if (_e2.indexOf(e2.charAt(r2)) !== -1) {
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
      function Je2(e2, t2, r2) {
        return Ve2.exec(e2.charAt(0)) && e2 !== "true" && e2 !== "false" && e2 !== "this" && e2 !== r2 && t2 !== ".";
      }
      function Ze2(e2, t2, r2) {
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
                  var s2 = wr(e2, function() {
                    return Function(i2)();
                  }, function() {
                    return true;
                  });
                  s2.source = i2;
                  return s2;
                } catch (e3) {
                  fe2(re2().body, "htmx:syntax:error", { error: e3, source: i2 });
                  return null;
                }
              }
            } else if (o2 === "[") {
              n2++;
            }
            if (Je2(o2, a2, r2)) {
              i2 += "((" + r2 + "." + o2 + ") ? (" + r2 + "." + o2 + ") : (window." + o2 + "))";
            } else {
              i2 = i2 + o2;
            }
            a2 = t2.shift();
          }
        }
      }
      function y2(e2, t2) {
        var r2 = "";
        while (e2.length > 0 && !e2[0].match(t2)) {
          r2 += e2.shift();
        }
        return r2;
      }
      function Ke2(e2) {
        var t2;
        if (e2.length > 0 && We2.test(e2[0])) {
          e2.shift();
          t2 = y2(e2, $e2).trim();
          e2.shift();
        } else {
          t2 = y2(e2, p);
        }
        return t2;
      }
      var Ye2 = "input, textarea, select";
      function Qe2(e2) {
        var t2 = te2(e2, "hx-trigger");
        var r2 = [];
        if (t2) {
          var n2 = Ge2(t2);
          do {
            y2(n2, ze2);
            var i2 = n2.length;
            var a2 = y2(n2, /[,\[\s]/);
            if (a2 !== "") {
              if (a2 === "every") {
                var o2 = { trigger: "every" };
                y2(n2, ze2);
                o2.pollInterval = d2(y2(n2, /[,\[\s]/));
                y2(n2, ze2);
                var s2 = Ze2(e2, n2, "event");
                if (s2) {
                  o2.eventFilter = s2;
                }
                r2.push(o2);
              } else if (a2.indexOf("sse:") === 0) {
                r2.push({ trigger: "sse", sseEvent: a2.substr(4) });
              } else {
                var l2 = { trigger: a2 };
                var s2 = Ze2(e2, n2, "event");
                if (s2) {
                  l2.eventFilter = s2;
                }
                while (n2.length > 0 && n2[0] !== ",") {
                  y2(n2, ze2);
                  var u2 = n2.shift();
                  if (u2 === "changed") {
                    l2.changed = true;
                  } else if (u2 === "once") {
                    l2.once = true;
                  } else if (u2 === "consume") {
                    l2.consume = true;
                  } else if (u2 === "delay" && n2[0] === ":") {
                    n2.shift();
                    l2.delay = d2(y2(n2, p));
                  } else if (u2 === "from" && n2[0] === ":") {
                    n2.shift();
                    if (We2.test(n2[0])) {
                      var f2 = Ke2(n2);
                    } else {
                      var f2 = y2(n2, p);
                      if (f2 === "closest" || f2 === "find" || f2 === "next" || f2 === "previous") {
                        n2.shift();
                        var c3 = Ke2(n2);
                        if (c3.length > 0) {
                          f2 += " " + c3;
                        }
                      }
                    }
                    l2.from = f2;
                  } else if (u2 === "target" && n2[0] === ":") {
                    n2.shift();
                    l2.target = Ke2(n2);
                  } else if (u2 === "throttle" && n2[0] === ":") {
                    n2.shift();
                    l2.throttle = d2(y2(n2, p));
                  } else if (u2 === "queue" && n2[0] === ":") {
                    n2.shift();
                    l2.queue = y2(n2, p);
                  } else if (u2 === "root" && n2[0] === ":") {
                    n2.shift();
                    l2[u2] = Ke2(n2);
                  } else if (u2 === "threshold" && n2[0] === ":") {
                    n2.shift();
                    l2[u2] = y2(n2, p);
                  } else {
                    fe2(e2, "htmx:syntax:error", { token: n2.shift() });
                  }
                }
                r2.push(l2);
              }
            }
            if (n2.length === i2) {
              fe2(e2, "htmx:syntax:error", { token: n2.shift() });
            }
            y2(n2, ze2);
          } while (n2[0] === "," && n2.shift());
        }
        if (r2.length > 0) {
          return r2;
        } else if (h2(e2, "form")) {
          return [{ trigger: "submit" }];
        } else if (h2(e2, 'input[type="button"], input[type="submit"]')) {
          return [{ trigger: "click" }];
        } else if (h2(e2, Ye2)) {
          return [{ trigger: "change" }];
        } else {
          return [{ trigger: "click" }];
        }
      }
      function et(e2) {
        ae2(e2).cancelled = true;
      }
      function tt(e2, t2, r2) {
        var n2 = ae2(e2);
        n2.timeout = setTimeout(function() {
          if (se(e2) && n2.cancelled !== true) {
            if (!ot2(r2, e2, Vt2("hx:poll:trigger", { triggerSpec: r2, target: e2 }))) {
              t2(e2);
            }
            tt(e2, t2, r2);
          }
        }, r2.pollInterval);
      }
      function rt2(e2) {
        return location.hostname === e2.hostname && ee2(e2, "href") && ee2(e2, "href").indexOf("#") !== 0;
      }
      function nt2(t2, r2, e2) {
        if (t2.tagName === "A" && rt2(t2) && (t2.target === "" || t2.target === "_self") || t2.tagName === "FORM") {
          r2.boosted = true;
          var n2, i2;
          if (t2.tagName === "A") {
            n2 = "get";
            i2 = ee2(t2, "href");
          } else {
            var a2 = ee2(t2, "method");
            n2 = a2 ? a2.toLowerCase() : "get";
            if (n2 === "get") {
            }
            i2 = ee2(t2, "action");
          }
          e2.forEach(function(e3) {
            st2(t2, function(e4, t3) {
              if (v(e4, Q2.config.disableSelector)) {
                m(e4);
                return;
              }
              he2(n2, i2, e4, t3);
            }, r2, e3, true);
          });
        }
      }
      function it2(e2, t2) {
        if (e2.type === "submit" || e2.type === "click") {
          if (t2.tagName === "FORM") {
            return true;
          }
          if (h2(t2, 'input[type="submit"], button') && v(t2, "form") !== null) {
            return true;
          }
          if (t2.tagName === "A" && t2.href && (t2.getAttribute("href") === "#" || t2.getAttribute("href").indexOf("#") !== 0)) {
            return true;
          }
        }
        return false;
      }
      function at2(e2, t2) {
        return ae2(e2).boosted && e2.tagName === "A" && t2.type === "click" && (t2.ctrlKey || t2.metaKey);
      }
      function ot2(e2, t2, r2) {
        var n2 = e2.eventFilter;
        if (n2) {
          try {
            return n2.call(t2, r2) !== true;
          } catch (e3) {
            fe2(re2().body, "htmx:eventFilter:error", { error: e3, source: n2.source });
            return true;
          }
        }
        return false;
      }
      function st2(a2, o2, e2, s2, l2) {
        var u2 = ae2(a2);
        var t2;
        if (s2.from) {
          t2 = W2(a2, s2.from);
        } else {
          t2 = [a2];
        }
        if (s2.changed) {
          t2.forEach(function(e3) {
            var t3 = ae2(e3);
            t3.lastValue = e3.value;
          });
        }
        oe(t2, function(n2) {
          var i2 = function(e3) {
            if (!se(a2)) {
              n2.removeEventListener(s2.trigger, i2);
              return;
            }
            if (at2(a2, e3)) {
              return;
            }
            if (l2 || it2(e3, a2)) {
              e3.preventDefault();
            }
            if (ot2(s2, a2, e3)) {
              return;
            }
            var t3 = ae2(e3);
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
                if (!h2(e3.target, s2.target)) {
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
                var r2 = ae2(n2);
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
              if (s2.throttle) {
                if (!u2.throttle) {
                  o2(a2, e3);
                  u2.throttle = setTimeout(function() {
                    u2.throttle = null;
                  }, s2.throttle);
                }
              } else if (s2.delay) {
                u2.delayed = setTimeout(function() {
                  o2(a2, e3);
                }, s2.delay);
              } else {
                ce2(a2, "htmx:trigger");
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
      var lt2 = false;
      var ut2 = null;
      function ft2() {
        if (!ut2) {
          ut2 = function() {
            lt2 = true;
          };
          window.addEventListener("scroll", ut2);
          setInterval(function() {
            if (lt2) {
              lt2 = false;
              oe(re2().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(e2) {
                ct2(e2);
              });
            }
          }, 200);
        }
      }
      function ct2(t2) {
        if (!o(t2, "data-hx-revealed") && k(t2)) {
          t2.setAttribute("data-hx-revealed", "true");
          var e2 = ae2(t2);
          if (e2.initHash) {
            ce2(t2, "revealed");
          } else {
            t2.addEventListener("htmx:afterProcessNode", function(e3) {
              ce2(t2, "revealed");
            }, { once: true });
          }
        }
      }
      function ht2(e2, t2, r2) {
        var n2 = P(r2);
        for (var i2 = 0;i2 < n2.length; i2++) {
          var a2 = n2[i2].split(/:(.+)/);
          if (a2[0] === "connect") {
            vt2(e2, a2[1], 0);
          }
          if (a2[0] === "send") {
            gt2(e2);
          }
        }
      }
      function vt2(s2, r2, n2) {
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
        var t2 = Q2.createWebSocket(r2);
        t2.onerror = function(e3) {
          fe2(s2, "htmx:wsError", { error: e3, socket: t2 });
          dt2(s2);
        };
        t2.onclose = function(e3) {
          if ([1006, 1012, 1013].indexOf(e3.code) >= 0) {
            var t3 = mt2(n2);
            setTimeout(function() {
              vt2(s2, r2, n2 + 1);
            }, t3);
          }
        };
        t2.onopen = function(e3) {
          n2 = 0;
        };
        ae2(s2).webSocket = t2;
        t2.addEventListener("message", function(e3) {
          if (dt2(s2)) {
            return;
          }
          var t3 = e3.data;
          T(s2, function(e4) {
            t3 = e4.transformResponse(t3, null, s2);
          });
          var r3 = R2(s2);
          var n3 = l(t3);
          var i2 = I(n3.children);
          for (var a2 = 0;a2 < i2.length; a2++) {
            var o2 = i2[a2];
            xe2(te2(o2, "hx-swap-oob") || "true", o2, r3);
          }
          Yt2(r3.tasks);
        });
      }
      function dt2(e2) {
        if (!se(e2)) {
          ae2(e2).webSocket.close();
          return true;
        }
      }
      function gt2(u2) {
        var f2 = c2(u2, function(e2) {
          return ae2(e2).webSocket != null;
        });
        if (f2) {
          u2.addEventListener(Qe2(u2)[0].trigger, function(e2) {
            var t2 = ae2(f2).webSocket;
            var r2 = vr(u2, f2);
            var n2 = ur2(u2, "post");
            var i2 = n2.errors;
            var a2 = n2.values;
            var o2 = Cr(u2);
            var s2 = le2(a2, o2);
            var l2 = dr2(s2, u2);
            l2["HEADERS"] = r2;
            if (i2 && i2.length > 0) {
              ce2(u2, "htmx:validation:halted", i2);
              return;
            }
            t2.send(JSON.stringify(l2));
            if (it2(e2, u2)) {
              e2.preventDefault();
            }
          });
        } else {
          fe2(u2, "htmx:noWebSocketSourceError");
        }
      }
      function mt2(e2) {
        var t2 = Q2.config.wsReconnectDelay;
        if (typeof t2 === "function") {
          return t2(e2);
        }
        if (t2 === "full-jitter") {
          var r2 = Math.min(e2, 6);
          var n2 = 1000 * Math.pow(2, r2);
          return n2 * Math.random();
        }
        x('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
      }
      function pt2(e2, t2, r2) {
        var n2 = P(r2);
        for (var i2 = 0;i2 < n2.length; i2++) {
          var a2 = n2[i2].split(/:(.+)/);
          if (a2[0] === "connect") {
            yt2(e2, a2[1]);
          }
          if (a2[0] === "swap") {
            xt(e2, a2[1]);
          }
        }
      }
      function yt2(t2, e2) {
        var r2 = Q2.createEventSource(e2);
        r2.onerror = function(e3) {
          fe2(t2, "htmx:sseError", { error: e3, source: r2 });
          wt2(t2);
        };
        ae2(t2).sseEventSource = r2;
      }
      function xt(a2, o2) {
        var s2 = c2(a2, St2);
        if (s2) {
          var l2 = ae2(s2).sseEventSource;
          var u2 = function(e2) {
            if (wt2(s2)) {
              return;
            }
            if (!se(a2)) {
              l2.removeEventListener(o2, u2);
              return;
            }
            var t2 = e2.data;
            T(a2, function(e3) {
              t2 = e3.transformResponse(t2, null, a2);
            });
            var r2 = mr2(a2);
            var n2 = ge2(a2);
            var i2 = R2(a2);
            Ue2(r2.swapStyle, n2, a2, t2, i2);
            Yt2(i2.tasks);
            ce2(a2, "htmx:sseMessage", e2);
          };
          ae2(a2).sseListener = u2;
          l2.addEventListener(o2, u2);
        } else {
          fe2(a2, "htmx:noSSESourceError");
        }
      }
      function bt(e2, t2, r2) {
        var n2 = c2(e2, St2);
        if (n2) {
          var i2 = ae2(n2).sseEventSource;
          var a2 = function() {
            if (!wt2(n2)) {
              if (se(e2)) {
                t2(e2);
              } else {
                i2.removeEventListener(r2, a2);
              }
            }
          };
          ae2(e2).sseListener = a2;
          i2.addEventListener(r2, a2);
        } else {
          fe2(e2, "htmx:noSSESourceError");
        }
      }
      function wt2(e2) {
        if (!se(e2)) {
          ae2(e2).sseEventSource.close();
          return true;
        }
      }
      function St2(e2) {
        return ae2(e2).sseEventSource != null;
      }
      function Et2(e2, t2, r2, n2) {
        var i2 = function() {
          if (!r2.loaded) {
            r2.loaded = true;
            t2(e2);
          }
        };
        if (n2) {
          setTimeout(i2, n2);
        } else {
          i2();
        }
      }
      function Ct2(t2, i2, e2) {
        var a2 = false;
        oe(b, function(r2) {
          if (o(t2, "hx-" + r2)) {
            var n2 = te2(t2, "hx-" + r2);
            a2 = true;
            i2.path = n2;
            i2.verb = r2;
            e2.forEach(function(e3) {
              Tt2(t2, e3, i2, function(e4, t3) {
                if (v(e4, Q2.config.disableSelector)) {
                  m(e4);
                  return;
                }
                he2(r2, n2, e4, t3);
              });
            });
          }
        });
        return a2;
      }
      function Tt2(n2, e2, t2, r2) {
        if (e2.sseEvent) {
          bt(n2, r2, e2.sseEvent);
        } else if (e2.trigger === "revealed") {
          ft2();
          st2(n2, r2, t2, e2);
          ct2(n2);
        } else if (e2.trigger === "intersect") {
          var i2 = {};
          if (e2.root) {
            i2.root = ue2(n2, e2.root);
          }
          if (e2.threshold) {
            i2.threshold = parseFloat(e2.threshold);
          }
          var a2 = new IntersectionObserver(function(e3) {
            for (var t3 = 0;t3 < e3.length; t3++) {
              var r3 = e3[t3];
              if (r3.isIntersecting) {
                ce2(n2, "intersect");
                break;
              }
            }
          }, i2);
          a2.observe(n2);
          st2(n2, r2, t2, e2);
        } else if (e2.trigger === "load") {
          if (!ot2(e2, n2, Vt2("load", { elt: n2 }))) {
            Et2(n2, r2, t2, e2.delay);
          }
        } else if (e2.pollInterval) {
          t2.polling = true;
          tt(n2, r2, e2);
        } else {
          st2(n2, r2, t2, e2);
        }
      }
      function Rt2(e2) {
        if (Q2.config.allowScriptTags && (e2.type === "text/javascript" || e2.type === "module" || e2.type === "")) {
          var t2 = re2().createElement("script");
          oe(e2.attributes, function(e3) {
            t2.setAttribute(e3.name, e3.value);
          });
          t2.textContent = e2.textContent;
          t2.async = false;
          if (Q2.config.inlineScriptNonce) {
            t2.nonce = Q2.config.inlineScriptNonce;
          }
          var r2 = e2.parentElement;
          try {
            r2.insertBefore(t2, e2);
          } catch (e3) {
            x(e3);
          } finally {
            if (e2.parentElement) {
              e2.parentElement.removeChild(e2);
            }
          }
        }
      }
      function Ot2(e2) {
        if (h2(e2, "script")) {
          Rt2(e2);
        }
        oe(f(e2, "script"), function(e3) {
          Rt2(e3);
        });
      }
      function qt2() {
        return document.querySelector("[hx-boost], [data-hx-boost]");
      }
      function Ht(e2) {
        var t2 = null;
        var r2 = [];
        if (document.evaluate) {
          var n2 = document.evaluate('//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") ]]', e2);
          while (t2 = n2.iterateNext())
            r2.push(t2);
        } else {
          var i2 = document.getElementsByTagName("*");
          for (var a2 = 0;a2 < i2.length; a2++) {
            var o2 = i2[a2].attributes;
            for (var s2 = 0;s2 < o2.length; s2++) {
              var l2 = o2[s2].name;
              if (g(l2, "hx-on:") || g(l2, "data-hx-on:")) {
                r2.push(i2[a2]);
              }
            }
          }
        }
        return r2;
      }
      function Lt2(e2) {
        if (e2.querySelectorAll) {
          var t2 = qt2() ? ", a" : "";
          var r2 = e2.querySelectorAll(w + t2 + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
          return r2;
        } else {
          return [];
        }
      }
      function At2(e2) {
        var t2 = v(e2.target, "button, input[type='submit']");
        var r2 = It(e2);
        if (r2) {
          r2.lastButtonClicked = t2;
        }
      }
      function Nt2(e2) {
        var t2 = It(e2);
        if (t2) {
          t2.lastButtonClicked = null;
        }
      }
      function It(e2) {
        var t2 = v(e2.target, "button, input[type='submit']");
        if (!t2) {
          return;
        }
        var r2 = s("#" + ee2(t2, "form")) || v(t2, "form");
        if (!r2) {
          return;
        }
        return ae2(r2);
      }
      function kt2(e2) {
        e2.addEventListener("click", At2);
        e2.addEventListener("focusin", At2);
        e2.addEventListener("focusout", Nt2);
      }
      function Pt2(e2) {
        var t2 = Ge2(e2);
        var r2 = 0;
        for (let e3 = 0;e3 < t2.length; e3++) {
          const n2 = t2[e3];
          if (n2 === "{") {
            r2++;
          } else if (n2 === "}") {
            r2--;
          }
        }
        return r2;
      }
      function Mt2(t2, e2, r2) {
        var n2 = ae2(t2);
        if (!Array.isArray(n2.onHandlers)) {
          n2.onHandlers = [];
        }
        var i2;
        var a2 = function(e3) {
          return wr(t2, function() {
            if (!i2) {
              i2 = new Function("event", r2);
            }
            i2.call(t2, e3);
          });
        };
        t2.addEventListener(e2, a2);
        n2.onHandlers.push({ event: e2, listener: a2 });
      }
      function Dt(e2) {
        var t2 = te2(e2, "hx-on");
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
            a2 += Pt2(o2);
          }
          for (var l2 in r2) {
            Mt2(e2, l2, r2[l2]);
          }
        }
      }
      function Xt2(t2) {
        Oe2(t2);
        for (var e2 = 0;e2 < t2.attributes.length; e2++) {
          var r2 = t2.attributes[e2].name;
          var n2 = t2.attributes[e2].value;
          if (g(r2, "hx-on:") || g(r2, "data-hx-on:")) {
            let e3 = r2.slice(r2.indexOf(":") + 1);
            if (g(e3, ":"))
              e3 = "htmx" + e3;
            Mt2(t2, e3, n2);
          }
        }
      }
      function Ut2(t2) {
        if (v(t2, Q2.config.disableSelector)) {
          m(t2);
          return;
        }
        var r2 = ae2(t2);
        if (r2.initHash !== Re2(t2)) {
          qe2(t2);
          r2.initHash = Re2(t2);
          Dt(t2);
          ce2(t2, "htmx:beforeProcessNode");
          if (t2.value) {
            r2.lastValue = t2.value;
          }
          var e2 = Qe2(t2);
          var n2 = Ct2(t2, r2, e2);
          if (!n2) {
            if (ne(t2, "hx-boost") === "true") {
              nt2(t2, r2, e2);
            } else if (o(t2, "hx-trigger")) {
              e2.forEach(function(e3) {
                Tt2(t2, e3, r2, function() {
                });
              });
            }
          }
          if (t2.tagName === "FORM" || ee2(t2, "type") === "submit" && o(t2, "form")) {
            kt2(t2);
          }
          var i2 = te2(t2, "hx-sse");
          if (i2) {
            pt2(t2, r2, i2);
          }
          var a2 = te2(t2, "hx-ws");
          if (a2) {
            ht2(t2, r2, a2);
          }
          ce2(t2, "htmx:afterProcessNode");
        }
      }
      function Bt2(e2) {
        e2 = s(e2);
        if (v(e2, Q2.config.disableSelector)) {
          m(e2);
          return;
        }
        Ut2(e2);
        oe(Lt2(e2), function(e3) {
          Ut2(e3);
        });
        oe(Ht(e2), Xt2);
      }
      function Ft2(e2) {
        return e2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Vt2(e2, t2) {
        var r2;
        if (window.CustomEvent && typeof window.CustomEvent === "function") {
          r2 = new CustomEvent(e2, { bubbles: true, cancelable: true, detail: t2 });
        } else {
          r2 = re2().createEvent("CustomEvent");
          r2.initCustomEvent(e2, true, true, t2);
        }
        return r2;
      }
      function fe2(e2, t2, r2) {
        ce2(e2, t2, le2({ error: t2 }, r2));
      }
      function jt2(e2) {
        return e2 === "htmx:afterProcessNode";
      }
      function T(e2, t2) {
        oe(Mr2(e2), function(e3) {
          try {
            t2(e3);
          } catch (e4) {
            x(e4);
          }
        });
      }
      function x(e2) {
        if (console.error) {
          console.error(e2);
        } else if (console.log) {
          console.log("ERROR: ", e2);
        }
      }
      function ce2(e2, t2, r2) {
        e2 = s(e2);
        if (r2 == null) {
          r2 = {};
        }
        r2["elt"] = e2;
        var n2 = Vt2(t2, r2);
        if (Q2.logger && !jt2(t2)) {
          Q2.logger(e2, t2, r2);
        }
        if (r2.error) {
          x(r2.error);
          ce2(e2, "htmx:error", { errorInfo: r2 });
        }
        var i2 = e2.dispatchEvent(n2);
        var a2 = Ft2(t2);
        if (i2 && a2 !== t2) {
          var o2 = Vt2(a2, n2.detail);
          i2 = i2 && e2.dispatchEvent(o2);
        }
        T(e2, function(e3) {
          i2 = i2 && (e3.onEvent(t2, n2) !== false && !n2.defaultPrevented);
        });
        return i2;
      }
      var _t2 = location.pathname + location.search;
      function zt2() {
        var e2 = re2().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return e2 || re2().body;
      }
      function Wt(e2, t2, r2, n2) {
        if (!M2()) {
          return;
        }
        if (Q2.config.historyCacheSize <= 0) {
          localStorage.removeItem("htmx-history-cache");
          return;
        }
        e2 = D2(e2);
        var i2 = E(localStorage.getItem("htmx-history-cache")) || [];
        for (var a2 = 0;a2 < i2.length; a2++) {
          if (i2[a2].url === e2) {
            i2.splice(a2, 1);
            break;
          }
        }
        var o2 = { url: e2, content: t2, title: r2, scroll: n2 };
        ce2(re2().body, "htmx:historyItemCreated", { item: o2, cache: i2 });
        i2.push(o2);
        while (i2.length > Q2.config.historyCacheSize) {
          i2.shift();
        }
        while (i2.length > 0) {
          try {
            localStorage.setItem("htmx-history-cache", JSON.stringify(i2));
            break;
          } catch (e3) {
            fe2(re2().body, "htmx:historyCacheError", { cause: e3, cache: i2 });
            i2.shift();
          }
        }
      }
      function $t2(e2) {
        if (!M2()) {
          return null;
        }
        e2 = D2(e2);
        var t2 = E(localStorage.getItem("htmx-history-cache")) || [];
        for (var r2 = 0;r2 < t2.length; r2++) {
          if (t2[r2].url === e2) {
            return t2[r2];
          }
        }
        return null;
      }
      function Gt2(e2) {
        var t2 = Q2.config.requestClass;
        var r2 = e2.cloneNode(true);
        oe(f(r2, "." + t2), function(e3) {
          n(e3, t2);
        });
        return r2.innerHTML;
      }
      function Jt2() {
        var e2 = zt2();
        var t2 = _t2 || location.pathname + location.search;
        var r2;
        try {
          r2 = re2().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch (e3) {
          r2 = re2().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        if (!r2) {
          ce2(re2().body, "htmx:beforeHistorySave", { path: t2, historyElt: e2 });
          Wt(t2, Gt2(e2), re2().title, window.scrollY);
        }
        if (Q2.config.historyEnabled)
          history.replaceState({ htmx: true }, re2().title, window.location.href);
      }
      function Zt2(e2) {
        if (Q2.config.getCacheBusterParam) {
          e2 = e2.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
          if (_(e2, "&") || _(e2, "?")) {
            e2 = e2.slice(0, -1);
          }
        }
        if (Q2.config.historyEnabled) {
          history.pushState({ htmx: true }, "", e2);
        }
        _t2 = e2;
      }
      function Kt2(e2) {
        if (Q2.config.historyEnabled)
          history.replaceState({ htmx: true }, "", e2);
        _t2 = e2;
      }
      function Yt2(e2) {
        oe(e2, function(e3) {
          e3.call();
        });
      }
      function Qt2(a2) {
        var e2 = new XMLHttpRequest;
        var o2 = { path: a2, xhr: e2 };
        ce2(re2().body, "htmx:historyCacheMiss", o2);
        e2.open("GET", a2, true);
        e2.setRequestHeader("HX-History-Restore-Request", "true");
        e2.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            ce2(re2().body, "htmx:historyCacheMissLoad", o2);
            var e3 = l(this.response);
            e3 = e3.querySelector("[hx-history-elt],[data-hx-history-elt]") || e3;
            var t2 = zt2();
            var r2 = R2(t2);
            var n2 = Xe2(this.response);
            if (n2) {
              var i2 = C("title");
              if (i2) {
                i2.innerHTML = n2;
              } else {
                window.document.title = n2;
              }
            }
            Pe2(t2, e3, r2);
            Yt2(r2.tasks);
            _t2 = a2;
            ce2(re2().body, "htmx:historyRestore", { path: a2, cacheMiss: true, serverResponse: this.response });
          } else {
            fe2(re2().body, "htmx:historyCacheMissLoadError", o2);
          }
        };
        e2.send();
      }
      function er2(e2) {
        Jt2();
        e2 = e2 || location.pathname + location.search;
        var t2 = $t2(e2);
        if (t2) {
          var r2 = l(t2.content);
          var n2 = zt2();
          var i2 = R2(n2);
          Pe2(n2, r2, i2);
          Yt2(i2.tasks);
          document.title = t2.title;
          setTimeout(function() {
            window.scrollTo(0, t2.scroll);
          }, 0);
          _t2 = e2;
          ce2(re2().body, "htmx:historyRestore", { path: e2, item: t2 });
        } else {
          if (Q2.config.refreshOnHistoryMiss) {
            window.location.reload(true);
          } else {
            Qt2(e2);
          }
        }
      }
      function tr2(e2) {
        var t2 = Y2(e2, "hx-indicator");
        if (t2 == null) {
          t2 = [e2];
        }
        oe(t2, function(e3) {
          var t3 = ae2(e3);
          t3.requestCount = (t3.requestCount || 0) + 1;
          e3.classList["add"].call(e3.classList, Q2.config.requestClass);
        });
        return t2;
      }
      function rr2(e2) {
        var t2 = Y2(e2, "hx-disabled-elt");
        if (t2 == null) {
          t2 = [];
        }
        oe(t2, function(e3) {
          var t3 = ae2(e3);
          t3.requestCount = (t3.requestCount || 0) + 1;
          e3.setAttribute("disabled", "");
        });
        return t2;
      }
      function nr2(e2, t2) {
        oe(e2, function(e3) {
          var t3 = ae2(e3);
          t3.requestCount = (t3.requestCount || 0) - 1;
          if (t3.requestCount === 0) {
            e3.classList["remove"].call(e3.classList, Q2.config.requestClass);
          }
        });
        oe(t2, function(e3) {
          var t3 = ae2(e3);
          t3.requestCount = (t3.requestCount || 0) - 1;
          if (t3.requestCount === 0) {
            e3.removeAttribute("disabled");
          }
        });
      }
      function ir2(e2, t2) {
        for (var r2 = 0;r2 < e2.length; r2++) {
          var n2 = e2[r2];
          if (n2.isSameNode(t2)) {
            return true;
          }
        }
        return false;
      }
      function ar2(e2) {
        if (e2.name === "" || e2.name == null || e2.disabled) {
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
      function or2(e2, t2, r2) {
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
      function sr2(t2, r2, n2, e2, i2) {
        if (e2 == null || ir2(t2, e2)) {
          return;
        } else {
          t2.push(e2);
        }
        if (ar2(e2)) {
          var a2 = ee2(e2, "name");
          var o2 = e2.value;
          if (e2.multiple && e2.tagName === "SELECT") {
            o2 = I(e2.querySelectorAll("option:checked")).map(function(e3) {
              return e3.value;
            });
          }
          if (e2.files) {
            o2 = I(e2.files);
          }
          or2(a2, o2, r2);
          if (i2) {
            lr2(e2, n2);
          }
        }
        if (h2(e2, "form")) {
          var s2 = e2.elements;
          oe(s2, function(e3) {
            sr2(t2, r2, n2, e3, i2);
          });
        }
      }
      function lr2(e2, t2) {
        if (e2.willValidate) {
          ce2(e2, "htmx:validation:validate");
          if (!e2.checkValidity()) {
            t2.push({ elt: e2, message: e2.validationMessage, validity: e2.validity });
            ce2(e2, "htmx:validation:failed", { message: e2.validationMessage, validity: e2.validity });
          }
        }
      }
      function ur2(e2, t2) {
        var r2 = [];
        var n2 = {};
        var i2 = {};
        var a2 = [];
        var o2 = ae2(e2);
        if (o2.lastButtonClicked && !se(o2.lastButtonClicked)) {
          o2.lastButtonClicked = null;
        }
        var s2 = h2(e2, "form") && e2.noValidate !== true || te2(e2, "hx-validate") === "true";
        if (o2.lastButtonClicked) {
          s2 = s2 && o2.lastButtonClicked.formNoValidate !== true;
        }
        if (t2 !== "get") {
          sr2(r2, i2, a2, v(e2, "form"), s2);
        }
        sr2(r2, n2, a2, e2, s2);
        if (o2.lastButtonClicked || e2.tagName === "BUTTON" || e2.tagName === "INPUT" && ee2(e2, "type") === "submit") {
          var l2 = o2.lastButtonClicked || e2;
          var u2 = ee2(l2, "name");
          or2(u2, l2.value, i2);
        }
        var f2 = Y2(e2, "hx-include");
        oe(f2, function(e3) {
          sr2(r2, n2, a2, e3, s2);
          if (!h2(e3, "form")) {
            oe(e3.querySelectorAll(Ye2), function(e4) {
              sr2(r2, n2, a2, e4, s2);
            });
          }
        });
        n2 = le2(n2, i2);
        return { errors: a2, values: n2 };
      }
      function fr2(e2, t2, r2) {
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
      function cr2(e2) {
        var t2 = "";
        for (var r2 in e2) {
          if (e2.hasOwnProperty(r2)) {
            var n2 = e2[r2];
            if (Array.isArray(n2)) {
              oe(n2, function(e3) {
                t2 = fr2(t2, r2, e3);
              });
            } else {
              t2 = fr2(t2, r2, n2);
            }
          }
        }
        return t2;
      }
      function hr2(e2) {
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
      function vr(e2, t2, r2) {
        var n2 = { "HX-Request": "true", "HX-Trigger": ee2(e2, "id"), "HX-Trigger-Name": ee2(e2, "name"), "HX-Target": te2(t2, "id"), "HX-Current-URL": re2().location.href };
        br(e2, "hx-headers", false, n2);
        if (r2 !== undefined) {
          n2["HX-Prompt"] = r2;
        }
        if (ae2(e2).boosted) {
          n2["HX-Boosted"] = "true";
        }
        return n2;
      }
      function dr2(t2, e2) {
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
      function gr2(e2) {
        return ee2(e2, "href") && ee2(e2, "href").indexOf("#") >= 0;
      }
      function mr2(e2, t2) {
        var r2 = t2 ? t2 : ne(e2, "hx-swap");
        var n2 = { swapStyle: ae2(e2).boosted ? "innerHTML" : Q2.config.defaultSwapStyle, swapDelay: Q2.config.defaultSwapDelay, settleDelay: Q2.config.defaultSettleDelay };
        if (Q2.config.scrollIntoViewOnBoost && ae2(e2).boosted && !gr2(e2)) {
          n2["show"] = "top";
        }
        if (r2) {
          var i2 = P(r2);
          if (i2.length > 0) {
            for (var a2 = 0;a2 < i2.length; a2++) {
              var o2 = i2[a2];
              if (o2.indexOf("swap:") === 0) {
                n2["swapDelay"] = d2(o2.substr(5));
              } else if (o2.indexOf("settle:") === 0) {
                n2["settleDelay"] = d2(o2.substr(7));
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
                x("Unknown modifier in hx-swap: " + o2);
              }
            }
          }
        }
        return n2;
      }
      function pr(e2) {
        return ne(e2, "hx-encoding") === "multipart/form-data" || h2(e2, "form") && ee2(e2, "enctype") === "multipart/form-data";
      }
      function yr(t2, r2, n2) {
        var i2 = null;
        T(r2, function(e2) {
          if (i2 == null) {
            i2 = e2.encodeParameters(t2, n2, r2);
          }
        });
        if (i2 != null) {
          return i2;
        } else {
          if (pr(r2)) {
            return hr2(n2);
          } else {
            return cr2(n2);
          }
        }
      }
      function R2(e2) {
        return { tasks: [], elts: [e2] };
      }
      function xr2(e2, t2) {
        var r2 = e2[0];
        var n2 = e2[e2.length - 1];
        if (t2.scroll) {
          var i2 = null;
          if (t2.scrollTarget) {
            i2 = ue2(r2, t2.scrollTarget);
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
            i2 = ue2(r2, a2);
          }
          if (t2.show === "top" && (r2 || i2)) {
            i2 = i2 || r2;
            i2.scrollIntoView({ block: "start", behavior: Q2.config.scrollBehavior });
          }
          if (t2.show === "bottom" && (n2 || i2)) {
            i2 = i2 || n2;
            i2.scrollIntoView({ block: "end", behavior: Q2.config.scrollBehavior });
          }
        }
      }
      function br(e2, t2, r2, n2) {
        if (n2 == null) {
          n2 = {};
        }
        if (e2 == null) {
          return n2;
        }
        var i2 = te2(e2, t2);
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
            s2 = wr(e2, function() {
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
        return br(u(e2), t2, r2, n2);
      }
      function wr(e2, t2, r2) {
        if (Q2.config.allowEval) {
          return t2();
        } else {
          fe2(e2, "htmx:evalDisallowedError");
          return r2;
        }
      }
      function Sr2(e2, t2) {
        return br(e2, "hx-vars", true, t2);
      }
      function Er(e2, t2) {
        return br(e2, "hx-vals", false, t2);
      }
      function Cr(e2) {
        return le2(Sr2(e2), Er(e2));
      }
      function Tr(t2, r2, n2) {
        if (n2 !== null) {
          try {
            t2.setRequestHeader(r2, n2);
          } catch (e2) {
            t2.setRequestHeader(r2, encodeURIComponent(n2));
            t2.setRequestHeader(r2 + "-URI-AutoEncoded", "true");
          }
        }
      }
      function Rr2(t2) {
        if (t2.responseURL && typeof URL !== "undefined") {
          try {
            var e2 = new URL(t2.responseURL);
            return e2.pathname + e2.search;
          } catch (e3) {
            fe2(re2().body, "htmx:badResponseUrl", { url: t2.responseURL });
          }
        }
      }
      function O(e2, t2) {
        return e2.getAllResponseHeaders().match(t2);
      }
      function Or2(e2, t2, r2) {
        e2 = e2.toLowerCase();
        if (r2) {
          if (r2 instanceof Element || L(r2, "String")) {
            return he2(e2, t2, null, null, { targetOverride: s(r2), returnPromise: true });
          } else {
            return he2(e2, t2, s(r2.source), r2.event, { handler: r2.handler, headers: r2.headers, values: r2.values, targetOverride: s(r2.target), swapOverride: r2.swap, select: r2.select, returnPromise: true });
          }
        } else {
          return he2(e2, t2, null, null, { returnPromise: true });
        }
      }
      function qr(e2) {
        var t2 = [];
        while (e2) {
          t2.push(e2);
          e2 = e2.parentElement;
        }
        return t2;
      }
      function Hr(e2, t2, r2) {
        var n2;
        var i2;
        if (typeof URL === "function") {
          i2 = new URL(t2, document.location.href);
          var a2 = document.location.origin;
          n2 = a2 === i2.origin;
        } else {
          i2 = t2;
          n2 = g(t2, document.location.origin);
        }
        if (Q2.config.selfRequestsOnly) {
          if (!n2) {
            return false;
          }
        }
        return ce2(e2, "htmx:validateUrl", le2({ url: i2, sameHost: n2 }, r2));
      }
      function he2(t2, r2, n2, i2, a2, e2) {
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
          n2 = re2().body;
        }
        var M3 = a2.handler || Ar;
        var D3 = a2.select || null;
        if (!se(n2)) {
          ie2(o2);
          return l2;
        }
        var u2 = a2.targetOverride || ge2(n2);
        if (u2 == null || u2 == ve2) {
          fe2(n2, "htmx:targetError", { target: te2(n2, "hx-target") });
          ie2(s2);
          return l2;
        }
        var f2 = ae2(n2);
        var c3 = f2.lastButtonClicked;
        if (c3) {
          var h3 = ee2(c3, "formaction");
          if (h3 != null) {
            r2 = h3;
          }
          var v2 = ee2(c3, "formmethod");
          if (v2 != null) {
            if (v2.toLowerCase() !== "dialog") {
              t2 = v2;
            }
          }
        }
        var d3 = ne(n2, "hx-confirm");
        if (e2 === undefined) {
          var X3 = function(e3) {
            return he2(t2, r2, n2, i2, a2, !!e3);
          };
          var U2 = { target: u2, elt: n2, path: r2, verb: t2, triggeringEvent: i2, etc: a2, issueRequest: X3, question: d3 };
          if (ce2(n2, "htmx:confirm", U2) === false) {
            ie2(o2);
            return l2;
          }
        }
        var g2 = n2;
        var m2 = ne(n2, "hx-sync");
        var p2 = null;
        var y3 = false;
        if (m2) {
          var B3 = m2.split(":");
          var F3 = B3[0].trim();
          if (F3 === "this") {
            g2 = de2(n2, "hx-sync");
          } else {
            g2 = ue2(n2, F3);
          }
          m2 = (B3[1] || "drop").trim();
          f2 = ae2(g2);
          if (m2 === "drop" && f2.xhr && f2.abortable !== true) {
            ie2(o2);
            return l2;
          } else if (m2 === "abort") {
            if (f2.xhr) {
              ie2(o2);
              return l2;
            } else {
              y3 = true;
            }
          } else if (m2 === "replace") {
            ce2(g2, "htmx:abort");
          } else if (m2.indexOf("queue") === 0) {
            var V3 = m2.split(" ");
            p2 = (V3[1] || "last").trim();
          }
        }
        if (f2.xhr) {
          if (f2.abortable) {
            ce2(g2, "htmx:abort");
          } else {
            if (p2 == null) {
              if (i2) {
                var x2 = ae2(i2);
                if (x2 && x2.triggerSpec && x2.triggerSpec.queue) {
                  p2 = x2.triggerSpec.queue;
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
                he2(t2, r2, n2, i2, a2);
              });
            } else if (p2 === "all") {
              f2.queuedRequests.push(function() {
                he2(t2, r2, n2, i2, a2);
              });
            } else if (p2 === "last") {
              f2.queuedRequests = [];
              f2.queuedRequests.push(function() {
                he2(t2, r2, n2, i2, a2);
              });
            }
            ie2(o2);
            return l2;
          }
        }
        var b2 = new XMLHttpRequest;
        f2.xhr = b2;
        f2.abortable = y3;
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
          if (S2 === null || !ce2(n2, "htmx:prompt", { prompt: S2, target: u2 })) {
            ie2(o2);
            w2();
            return l2;
          }
        }
        if (d3 && !e2) {
          if (!confirm(d3)) {
            ie2(o2);
            w2();
            return l2;
          }
        }
        var E2 = vr(n2, u2, S2);
        if (t2 !== "get" && !pr(n2)) {
          E2["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (a2.headers) {
          E2 = le2(E2, a2.headers);
        }
        var _2 = ur2(n2, t2);
        var C2 = _2.errors;
        var T2 = _2.values;
        if (a2.values) {
          T2 = le2(T2, a2.values);
        }
        var z3 = Cr(n2);
        var W3 = le2(T2, z3);
        var R3 = dr2(W3, n2);
        if (Q2.config.getCacheBusterParam && t2 === "get") {
          R3["org.htmx.cache-buster"] = ee2(u2, "id") || "true";
        }
        if (r2 == null || r2 === "") {
          r2 = re2().location.href;
        }
        var O2 = br(n2, "hx-request");
        var $3 = ae2(n2).boosted;
        var q3 = Q2.config.methodsThatUseUrlParams.indexOf(t2) >= 0;
        var H3 = { boosted: $3, useUrlParams: q3, parameters: R3, unfilteredParameters: W3, headers: E2, target: u2, verb: t2, errors: C2, withCredentials: a2.credentials || O2.credentials || Q2.config.withCredentials, timeout: a2.timeout || O2.timeout || Q2.config.timeout, path: r2, triggeringEvent: i2 };
        if (!ce2(n2, "htmx:configRequest", H3)) {
          ie2(o2);
          w2();
          return l2;
        }
        r2 = H3.path;
        t2 = H3.verb;
        E2 = H3.headers;
        R3 = H3.parameters;
        C2 = H3.errors;
        q3 = H3.useUrlParams;
        if (C2 && C2.length > 0) {
          ce2(n2, "htmx:validation:halted", H3);
          ie2(o2);
          w2();
          return l2;
        }
        var G3 = r2.split("#");
        var J3 = G3[0];
        var L2 = G3[1];
        var A2 = r2;
        if (q3) {
          A2 = J3;
          var Z3 = Object.keys(R3).length !== 0;
          if (Z3) {
            if (A2.indexOf("?") < 0) {
              A2 += "?";
            } else {
              A2 += "&";
            }
            A2 += cr2(R3);
            if (L2) {
              A2 += "#" + L2;
            }
          }
        }
        if (!Hr(n2, A2, H3)) {
          fe2(n2, "htmx:invalidPath", H3);
          ie2(s2);
          return l2;
        }
        b2.open(t2.toUpperCase(), A2, true);
        b2.overrideMimeType("text/html");
        b2.withCredentials = H3.withCredentials;
        b2.timeout = H3.timeout;
        if (O2.noHeaders) {
        } else {
          for (var N2 in E2) {
            if (E2.hasOwnProperty(N2)) {
              var K3 = E2[N2];
              Tr(b2, N2, K3);
            }
          }
        }
        var I2 = { xhr: b2, target: u2, requestConfig: H3, etc: a2, boosted: $3, select: D3, pathInfo: { requestPath: r2, finalRequestPath: A2, anchor: L2 } };
        b2.onload = function() {
          try {
            var e3 = qr(n2);
            I2.pathInfo.responsePath = Rr2(b2);
            M3(n2, I2);
            nr2(k2, P2);
            ce2(n2, "htmx:afterRequest", I2);
            ce2(n2, "htmx:afterOnLoad", I2);
            if (!se(n2)) {
              var t3 = null;
              while (e3.length > 0 && t3 == null) {
                var r3 = e3.shift();
                if (se(r3)) {
                  t3 = r3;
                }
              }
              if (t3) {
                ce2(t3, "htmx:afterRequest", I2);
                ce2(t3, "htmx:afterOnLoad", I2);
              }
            }
            ie2(o2);
            w2();
          } catch (e4) {
            fe2(n2, "htmx:onLoadError", le2({ error: e4 }, I2));
            throw e4;
          }
        };
        b2.onerror = function() {
          nr2(k2, P2);
          fe2(n2, "htmx:afterRequest", I2);
          fe2(n2, "htmx:sendError", I2);
          ie2(s2);
          w2();
        };
        b2.onabort = function() {
          nr2(k2, P2);
          fe2(n2, "htmx:afterRequest", I2);
          fe2(n2, "htmx:sendAbort", I2);
          ie2(s2);
          w2();
        };
        b2.ontimeout = function() {
          nr2(k2, P2);
          fe2(n2, "htmx:afterRequest", I2);
          fe2(n2, "htmx:timeout", I2);
          ie2(s2);
          w2();
        };
        if (!ce2(n2, "htmx:beforeRequest", I2)) {
          ie2(o2);
          w2();
          return l2;
        }
        var k2 = tr2(n2);
        var P2 = rr2(n2);
        oe(["loadstart", "loadend", "progress", "abort"], function(t3) {
          oe([b2, b2.upload], function(e3) {
            e3.addEventListener(t3, function(e4) {
              ce2(n2, "htmx:xhr:" + t3, { lengthComputable: e4.lengthComputable, loaded: e4.loaded, total: e4.total });
            });
          });
        });
        ce2(n2, "htmx:beforeSend", I2);
        var Y3 = q3 ? null : yr(b2, n2, R3);
        b2.send(Y3);
        return l2;
      }
      function Lr2(e2, t2) {
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
        var u2 = ae2(e2).boosted;
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
      function Ar(l2, u2) {
        var f2 = u2.xhr;
        var c3 = u2.target;
        var e2 = u2.etc;
        var t2 = u2.requestConfig;
        var h3 = u2.select;
        if (!ce2(l2, "htmx:beforeOnLoad", u2))
          return;
        if (O(f2, /HX-Trigger:/i)) {
          Be2(f2, "HX-Trigger", l2);
        }
        if (O(f2, /HX-Location:/i)) {
          Jt2();
          var r2 = f2.getResponseHeader("HX-Location");
          var v2;
          if (r2.indexOf("{") === 0) {
            v2 = E(r2);
            r2 = v2["path"];
            delete v2["path"];
          }
          Or2("GET", r2, v2).then(function() {
            Zt2(r2);
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
          u2.target = re2().querySelector(f2.getResponseHeader("HX-Retarget"));
        }
        var d3 = Lr2(l2, u2);
        var i2 = f2.status >= 200 && f2.status < 400 && f2.status !== 204;
        var g2 = f2.response;
        var a2 = f2.status >= 400;
        var m2 = Q2.config.ignoreTitle;
        var o2 = le2({ shouldSwap: i2, serverResponse: g2, isError: a2, ignoreTitle: m2 }, u2);
        if (!ce2(c3, "htmx:beforeSwap", o2))
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
            et(l2);
          }
          T(l2, function(e3) {
            g2 = e3.transformResponse(g2, f2, l2);
          });
          if (d3.type) {
            Jt2();
          }
          var s2 = e2.swapOverride;
          if (O(f2, /HX-Reswap:/i)) {
            s2 = f2.getResponseHeader("HX-Reswap");
          }
          var v2 = mr2(l2, s2);
          if (v2.hasOwnProperty("ignoreTitle")) {
            m2 = v2.ignoreTitle;
          }
          c3.classList.add(Q2.config.swappingClass);
          var p2 = null;
          var y3 = null;
          var x2 = function() {
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
                ce2(re2().body, "htmx:beforeHistoryUpdate", le2({ history: d3 }, u2));
                if (d3.type === "push") {
                  Zt2(d3.path);
                  ce2(re2().body, "htmx:pushedIntoHistory", { path: d3.path });
                } else {
                  Kt2(d3.path);
                  ce2(re2().body, "htmx:replacedInHistory", { path: d3.path });
                }
              }
              var n3 = R2(c3);
              Ue2(v2.swapStyle, c3, l2, g2, n3, r3);
              if (t3.elt && !se(t3.elt) && ee2(t3.elt, "id")) {
                var i3 = document.getElementById(ee2(t3.elt, "id"));
                var a3 = { preventScroll: v2.focusScroll !== undefined ? !v2.focusScroll : !Q2.config.defaultFocusScroll };
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
              c3.classList.remove(Q2.config.swappingClass);
              oe(n3.elts, function(e4) {
                if (e4.classList) {
                  e4.classList.add(Q2.config.settlingClass);
                }
                ce2(e4, "htmx:afterSwap", u2);
              });
              if (O(f2, /HX-Trigger-After-Swap:/i)) {
                var o3 = l2;
                if (!se(l2)) {
                  o3 = re2().body;
                }
                Be2(f2, "HX-Trigger-After-Swap", o3);
              }
              var s3 = function() {
                oe(n3.tasks, function(e5) {
                  e5.call();
                });
                oe(n3.elts, function(e5) {
                  if (e5.classList) {
                    e5.classList.remove(Q2.config.settlingClass);
                  }
                  ce2(e5, "htmx:afterSettle", u2);
                });
                if (u2.pathInfo.anchor) {
                  var e4 = re2().getElementById(u2.pathInfo.anchor);
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
                xr2(n3.elts, v2);
                if (O(f2, /HX-Trigger-After-Settle:/i)) {
                  var r4 = l2;
                  if (!se(l2)) {
                    r4 = re2().body;
                  }
                  Be2(f2, "HX-Trigger-After-Settle", r4);
                }
                ie2(p2);
              };
              if (v2.settleDelay > 0) {
                setTimeout(s3, v2.settleDelay);
              } else {
                s3();
              }
            } catch (e4) {
              fe2(l2, "htmx:swapError", u2);
              ie2(y3);
              throw e4;
            }
          };
          var b2 = Q2.config.globalViewTransitions;
          if (v2.hasOwnProperty("transition")) {
            b2 = v2.transition;
          }
          if (b2 && ce2(l2, "htmx:beforeTransition", u2) && typeof Promise !== "undefined" && document.startViewTransition) {
            var w2 = new Promise(function(e3, t3) {
              p2 = e3;
              y3 = t3;
            });
            var S2 = x2;
            x2 = function() {
              document.startViewTransition(function() {
                S2();
                return w2;
              });
            };
          }
          if (v2.swapDelay > 0) {
            setTimeout(x2, v2.swapDelay);
          } else {
            x2();
          }
        }
        if (a2) {
          fe2(l2, "htmx:responseError", le2({ error: "Response Status Error Code " + f2.status + " from " + u2.pathInfo.requestPath }, u2));
        }
      }
      var Nr2 = {};
      function Ir2() {
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
      function kr(e2, t2) {
        if (t2.init) {
          t2.init(r);
        }
        Nr2[e2] = le2(Ir2(), t2);
      }
      function Pr2(e2) {
        delete Nr2[e2];
      }
      function Mr2(e2, r2, n2) {
        if (e2 == undefined) {
          return r2;
        }
        if (r2 == undefined) {
          r2 = [];
        }
        if (n2 == undefined) {
          n2 = [];
        }
        var t2 = te2(e2, "hx-ext");
        if (t2) {
          oe(t2.split(","), function(e3) {
            e3 = e3.replace(/ /g, "");
            if (e3.slice(0, 7) == "ignore:") {
              n2.push(e3.slice(7));
              return;
            }
            if (n2.indexOf(e3) < 0) {
              var t3 = Nr2[e3];
              if (t3 && r2.indexOf(t3) < 0) {
                r2.push(t3);
              }
            }
          });
        }
        return Mr2(u(e2), r2, n2);
      }
      function Dr2(e2) {
        var t2 = function() {
          if (!e2)
            return;
          e2();
          e2 = null;
        };
        if (re2().readyState === "complete") {
          t2();
        } else {
          re2().addEventListener("DOMContentLoaded", function() {
            t2();
          });
          re2().addEventListener("readystatechange", function() {
            if (re2().readyState !== "complete")
              return;
            t2();
          });
        }
      }
      function Xr2() {
        if (Q2.config.includeIndicatorStyles !== false) {
          re2().head.insertAdjacentHTML("beforeend", "<style>                      ." + Q2.config.indicatorClass + "{opacity:0}                      ." + Q2.config.requestClass + " ." + Q2.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + Q2.config.requestClass + "." + Q2.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
        }
      }
      function Ur2() {
        var e2 = re2().querySelector('meta[name="htmx-config"]');
        if (e2) {
          return E(e2.content);
        } else {
          return null;
        }
      }
      function Br2() {
        var e2 = Ur2();
        if (e2) {
          Q2.config = le2(Q2.config, e2);
        }
      }
      Dr2(function() {
        Br2();
        Xr2();
        var e2 = re2().body;
        Bt2(e2);
        var t2 = re2().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
        e2.addEventListener("htmx:abort", function(e3) {
          var t3 = e3.target;
          var r3 = ae2(t3);
          if (r3 && r3.xhr) {
            r3.xhr.abort();
          }
        });
        var r2 = window.onpopstate;
        window.onpopstate = function(e3) {
          if (e3.state && e3.state.htmx) {
            er2();
            oe(t2, function(e4) {
              ce2(e4, "htmx:restored", { document: re2(), triggerEvent: ce2 });
            });
          } else {
            if (r2) {
              r2(e3);
            }
          }
        };
        setTimeout(function() {
          ce2(e2, "htmx:load", {});
          e2 = null;
        }, 0);
      });
      return Q2;
    }();
  });
});

// src/main/resources/META-INF/resources/js/loader.js
var require_loader = __commonJS(() => {
  window.htmx = require_htmx_min();
});

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
        var c3 = 0;
        function f2() {
          return t2 && c3 === 0;
        }
        while (o2 < a2.length) {
          if (q2() === "-" && N() === "-" && (n.isWhitespace(I(2)) || I(2) === "" || I(2) === "-") || q2() === "/" && N() === "/" && (n.isWhitespace(I(2)) || I(2) === "" || I(2) === "/")) {
            h3();
          } else if (q2() === "/" && N() === "*" && (n.isWhitespace(I(2)) || I(2) === "" || I(2) === "*")) {
            v2();
          } else {
            if (n.isWhitespace(q2())) {
              r2.push(A());
            } else if (!R2() && q2() === "." && (n.isAlpha(N()) || N() === "{" || N() === "-")) {
              r2.push(d3());
            } else if (!R2() && q2() === "#" && (n.isAlpha(N()) || N() === "{")) {
              r2.push(k2());
            } else if (q2() === "[" && N() === "@") {
              r2.push(E2());
            } else if (q2() === "@") {
              r2.push(T2());
            } else if (q2() === "*" && n.isAlpha(N())) {
              r2.push(y3());
            } else if (n.isAlpha(q2()) || !f2() && n.isIdentifierChar(q2())) {
              r2.push(x2());
            } else if (n.isNumeric(q2())) {
              r2.push(g2());
            } else if (!f2() && (q2() === '"' || q2() === "`")) {
              r2.push(w2());
            } else if (!f2() && q2() === "'") {
              if (n.isValidSingleQuoteStringStart(r2)) {
                r2.push(w2());
              } else {
                r2.push(b2());
              }
            } else if (n.OP_TABLE[q2()]) {
              if (l2 === "$" && q2() === "{") {
                c3++;
              }
              if (q2() === "}") {
                c3--;
              }
              r2.push(b2());
            } else if (f2() || n.isReservedChar(q2())) {
              r2.push(p2("RESERVED", C()));
            } else {
              if (o2 < a2.length) {
                throw Error("Unknown token: " + q2() + " ");
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
        function h3() {
          while (q2() && !n.isNewline(q2())) {
            C();
          }
          C();
        }
        function v2() {
          while (q2() && !(q2() === "*" && N() === "/")) {
            C();
          }
          C();
          C();
        }
        function d3() {
          var e3 = p2("CLASS_REF");
          var t3 = C();
          if (q2() === "{") {
            e3.template = true;
            t3 += C();
            while (q2() && q2() !== "}") {
              t3 += C();
            }
            if (q2() !== "}") {
              throw Error("Unterminated class reference");
            } else {
              t3 += C();
            }
          } else {
            while (n.isValidCSSClassChar(q2())) {
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
          while (o2 < a2.length && q2() !== "]") {
            t3 += C();
          }
          if (q2() === "]") {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function T2() {
          var e3 = p2("ATTRIBUTE_REF");
          var t3 = C();
          while (n.isValidCSSIDChar(q2())) {
            t3 += C();
          }
          if (q2() === "=") {
            t3 += C();
            if (q2() === '"' || q2() === "'") {
              let e4 = w2();
              t3 += e4.value;
            } else if (n.isAlpha(q2()) || n.isNumeric(q2()) || n.isIdentifierChar(q2())) {
              let e4 = x2();
              t3 += e4.value;
            }
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function y3() {
          var e3 = p2("STYLE_REF");
          var t3 = C();
          while (n.isAlpha(q2()) || q2() === "-") {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function k2() {
          var e3 = p2("ID_REF");
          var t3 = C();
          if (q2() === "{") {
            e3.template = true;
            t3 += C();
            while (q2() && q2() !== "}") {
              t3 += C();
            }
            if (q2() !== "}") {
              throw Error("Unterminated id reference");
            } else {
              C();
            }
          } else {
            while (n.isValidCSSIDChar(q2())) {
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
          while (n.isAlpha(q2()) || n.isNumeric(q2()) || n.isIdentifierChar(q2())) {
            t3 += C();
          }
          if (q2() === "!" && t3 === "beep") {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function g2() {
          var e3 = p2("NUMBER");
          var t3 = C();
          while (n.isNumeric(q2())) {
            t3 += C();
          }
          if (q2() === "." && n.isNumeric(N())) {
            t3 += C();
          }
          while (n.isNumeric(q2())) {
            t3 += C();
          }
          if (q2() === "e" || q2() === "E") {
            if (n.isNumeric(N())) {
              t3 += C();
            } else if (N() === "-") {
              t3 += C();
              t3 += C();
            }
          }
          while (n.isNumeric(q2())) {
            t3 += C();
          }
          e3.value = t3;
          e3.end = o2;
          return e3;
        }
        function b2() {
          var e3 = m2();
          var t3 = C();
          while (q2() && n.OP_TABLE[t3 + q2()]) {
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
          while (q2() && q2() !== t3) {
            if (q2() === "\\") {
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
          if (q2() !== t3) {
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
          if (!q2()) {
            return NaN;
          }
          let t3 = e3 * Number.parseInt(C(), e3);
          if (!q2()) {
            return NaN;
          }
          t3 += Number.parseInt(C(), e3);
          return t3;
        }
        function q2() {
          return a2.charAt(o2);
        }
        function N() {
          return a2.charAt(o2 + 1);
        }
        function I(e3 = 1) {
          return a2.charAt(o2 + e3);
        }
        function C() {
          l2 = q2();
          o2++;
          s2++;
          return l2;
        }
        function R2() {
          return n.isAlpha(l2) || n.isNumeric(l2) || l2 === ")" || l2 === '"' || l2 === "'" || l2 === "`" || l2 === "}" || l2 === "]";
        }
        function A() {
          var e3 = p2("WHITESPACE");
          var t3 = "";
          while (q2() && n.isWhitespace(q2())) {
            if (n.isNewline(q2())) {
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
        this.parser = t2 ?? new a(this).use(T).use(y2);
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
        return typeof e2 === "object" && (Symbol.iterator in e2) && typeof e2[Symbol.iterator] === "function";
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
                var c3 = l2 ? l2.evaluate(t2) : null;
                if (c3) {
                  if (c3.then) {
                    n2 = true;
                  } else if (c3.asyncWrapper) {
                    i2 = true;
                  }
                }
                s2.push(c3);
              }
              r2.push(s2);
            } else if (o2.evaluate) {
              var c3 = o2.evaluate(t2);
              if (c3) {
                if (c3.then) {
                  n2 = true;
                } else if (c3.asyncWrapper) {
                  i2 = true;
                }
              }
              r2.push(c3);
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
          var i2 = h2(r2, n2);
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
      hyperscriptUrl = ("document" in e) && document.currentScript ? document.currentScript.src : null;
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
    const c2 = new Proxy({}, { get(e2, t2) {
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
        this.locals = { cookies: c2 };
        this.me = n2, this.you = undefined;
        this.result = undefined;
        this.event = i2;
        this.target = i2 ? i2.target : null;
        this.detail = i2 ? i2.detail : null;
        this.sender = i2 ? i2.detail ? i2.detail.sender : null : null;
        this.body = ("document" in e) ? document.body : null;
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
    function h2(e2, t2) {
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
        d2(e3);
        return null;
      }
    }
    function d2(e2) {
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
        var u3, l3, c4;
        if (s3.indexOf("$") >= 0) {
          u3 = true;
          l3 = n.tokenize(s3, true);
          c4 = e2.parseStringTemplate(l3);
        }
        return { type: "queryRef", css: s3, args: c4, op: function(e3, ...t4) {
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
        var c4 = o2.name;
        var f3 = { type: "ofExpression", prop: o2.token, root: i2, attribute: l3, expression: n2, args: [i2], op: function(e3, r4) {
          if (s3) {
            return t3.resolveAttribute(r4, c4);
          } else if (u3) {
            if (o2.type === "computedStyleRef") {
              return t3.resolveComputedStyle(r4, c4);
            } else {
              return t3.resolveStyle(r4, c4);
            }
          } else {
            return t3.resolveProperty(r4, c4);
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
      var c3 = function(e2, t3, r3, n2) {
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
          var h3 = e2.requireElement("unaryExpression", r3);
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
        return { type: "relativePositionalExpression", from: f3, forwardSearch: a3, inSearch: m2, wrapping: v3, inElt: h3, withinElt: p3, operator: n2.value, args: [o2, f3, h3, p3], op: function(e3, t4, r4, n3, f4) {
          var p4 = t4.css;
          if (p4 == null) {
            throw "Expected a CSS value to be returned by " + i.sourceFor.apply(o2);
          }
          if (m2) {
            if (n3) {
              if (a3) {
                return l2(r4, n3, p4, v3);
              } else {
                return c3(r4, n3, p4, v3);
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
          var u3, l3, c4;
          if (s3) {
            u3 = r3.requireTokenType("IDENTIFIER");
            l3 = !r3.matchOpToken("!");
          } else if (o2) {
            c4 = e2.requireElement("mathExpression", r3);
            if (a3 === "match" || a3 === "not match") {
              c4 = c4.css ? c4.css : c4;
            }
          }
          var m2 = n2;
          n2 = { type: "comparisonOperator", operator: a3, typeName: u3, nullOk: l3, lhs: n2, rhs: c4, args: [n2, c4], op: function(e3, r4, n3) {
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
              return n3 != null && f2(c4, n3, r4);
            }
            if (a3 === "not in") {
              return n3 == null || !f2(c4, n3, r4);
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
          var c4, f3, m2;
          if (r3.currentToken().type === "NUMBER") {
            var p3 = r3.consumeToken();
            if (!p3.value)
              return;
            c4 = parseInt(p3.value);
            if (r3.matchToken("to")) {
              var h3 = r3.consumeToken();
              if (!h3.value)
                return;
              f3 = parseInt(h3.value);
            } else if (r3.matchToken("and")) {
              m2 = true;
              r3.requireToken("on");
            }
          }
          var d4, E2;
          if (s3 === "intersection") {
            d4 = {};
            if (r3.matchToken("with")) {
              d4["with"] = e2.requireElement("expression", r3).evaluate();
            }
            if (r3.matchToken("having")) {
              do {
                if (r3.matchToken("margin")) {
                  d4["rootMargin"] = e2.requireElement("stringLike", r3).evaluate();
                } else if (r3.matchToken("threshold")) {
                  d4["threshold"] = e2.requireElement("expression", r3).evaluate();
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
          var y4 = null;
          var k3 = false;
          if (r3.matchToken("from")) {
            if (r3.matchToken("elsewhere")) {
              k3 = true;
            } else {
              r3.pushFollow("or");
              try {
                y4 = e2.requireElement("expression", r3);
              } finally {
                r3.popFollow();
              }
              if (!y4) {
                e2.raiseParseError(r3, 'Expected either target value or "elsewhere".');
              }
            }
          }
          if (y4 === null && k3 === false && r3.matchToken("elsewhere")) {
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
          i2.push({ execCount: 0, every: n2, on: s3, args: u3, filter: l3, from: y4, inExpr: x3, elsewhere: k3, startCount: c4, endCount: f3, unbounded: m2, debounceTime: b3, throttleTime: w3, mutationSpec: E2, intersectionSpec: d4, debounced: undefined, lastExec: undefined });
        } while (r3.matchToken("or"));
        var S3 = true;
        if (!n2) {
          if (r3.matchToken("queue")) {
            if (r3.matchToken("all")) {
              var q2 = true;
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
        var R2, A;
        if (r3.matchToken("catch")) {
          R2 = r3.requireTokenType("IDENTIFIER").value;
          A = e2.requireElement("commandList", r3);
          e2.ensureTerminated(A);
        }
        if (r3.matchToken("finally")) {
          var L = e2.requireElement("commandList", r3);
          e2.ensureTerminated(L);
        }
        var O = { displayName: a3, events: i2, start: C, every: n2, execCount: 0, errorHandler: A, errorSymbol: R2, execute: function(e3) {
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
                s4.meta.errorSymbol = R2;
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
                  var c5 = o4.target;
                  while (true) {
                    if (c5.matches && c5.matches(r5.inExpr.css)) {
                      s4.result = c5;
                      break;
                    } else {
                      c5 = c5.parentElement;
                      if (c5 == null) {
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
        var l3, c4;
        if (r3.matchToken("catch")) {
          l3 = r3.requireTokenType("IDENTIFIER").value;
          c4 = e2.parseElement("commandList", r3);
        }
        if (r3.matchToken("finally")) {
          var f3 = e2.requireElement("commandList", r3);
          e2.ensureTerminated(f3);
        }
        var m2 = { displayName: o2 + "(" + s3.map(function(e3) {
          return e3.value;
        }).join(", ") + ")", name: o2, args: s3, start: u3, errorHandler: c4, errorSymbol: l3, finallyHandler: f3, install: function(e3, r4) {
          var n3 = function() {
            var n4 = t3.makeContext(r4, m2, e3, null);
            n4.meta.errorHandler = c4;
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
            var p3, h3 = null;
            var v3 = new Promise(function(e4, t4) {
              p3 = e4;
              h3 = t4;
            });
            u3.execute(n4);
            if (n4.meta.returned) {
              return n4.meta.returnValue;
            } else {
              n4.meta.resolve = p3;
              n4.meta.reject = h3;
              return v3;
            }
          };
          n3.hyperfunc = true;
          n3.hypername = i2;
          t3.assignToNamespace(e3, a3, o2, n3);
        } };
        e2.ensureTerminated(u3);
        if (c4) {
          e2.ensureTerminated(c4);
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
          e2.raiseParseError(r3, "In order to use the 'worker' feature, include the _hyperscript worker plugin. See https://hyperscript.org/features/worker/ for more info.");
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
          var c4 = u3.features[l3];
          c4.behavior = i2;
        }
        return { install: function(t4, n3) {
          r3.assignToNamespace(e.document && e.document.body, a3, o2, function(e2, t5, n4) {
            var a4 = r3.getInternalData(e2);
            var o3 = h2(a4, i2 + "Scope");
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
      function d3(e2, t3, r3, n2) {
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
          return d3("trigger", e2, t3, r3);
        }
      });
      t2.addCommand("send", function(e2, t3, r3) {
        if (r3.matchToken("send")) {
          return d3("send", e2, t3, r3);
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
      var y3 = function(e2, t3, r3) {
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
        var n2 = y3(e2, t3, r3);
        if (n2.expr && n2.expr.type !== "functionCall") {
          e2.raiseParseError(r3, "Must be a function invocation");
        }
        return n2;
      });
      t2.addCommand("get", function(e2, t3, r3) {
        if (r3.matchToken("get")) {
          return y3(e2, t3, r3);
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
            for (var c4 = 0;c4 < s3.length; c4++) {
              var f3 = s3[c4];
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
        var c4 = null;
        if (a3) {
        } else if (o2 || s3) {
          l3 = e2.requireElement("implicitMeTarget", r3);
          var f3 = n2;
        } else if (u3) {
          c4 = n2.firstIndex;
          l3 = n2.root;
        } else {
          c4 = n2.prop ? n2.prop.value : null;
          var f3 = n2.attribute;
          l3 = n2.root;
        }
        var m2 = { target: n2, symbolWrite: a3, value: i2, args: [l3, c4, i2], op: function(e3, r4, i3, o3) {
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
            var c4 = e2.requireElement("dotOrColonPath", t3, "Expected event name");
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
          var h3 = o2.value;
        }
        var v3 = e2.parseElement("commandList", t3);
        if (v3 && c4) {
          var d4 = v3;
          while (d4.next) {
            d4 = d4.next;
          }
          var E2 = { type: "waitATick", op: function() {
            return new Promise(function(e3) {
              setTimeout(function() {
                e3(r3.findNext(E2));
              }, 0);
            });
          } };
          d4.next = E2;
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
        var y4 = { identifier: a3, indexIdentifier: h3, slot: T3, expression: s3, forever: p3, times: m2, until: l3, event: c4, on: f3, whileExpr: u3, resolveNext: function() {
          return this;
        }, loop: v3, args: [u3, m2], op: function(e3, t4, n3) {
          var i3 = e3.meta.iterators[T3];
          var o3 = false;
          var s4 = null;
          if (this.forever) {
            o3 = true;
          } else if (this.until) {
            if (c4) {
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
            if (h3) {
              e3.locals[h3] = i3.index;
            }
            i3.index++;
            return v3;
          } else {
            e3.meta.iterators[T3] = null;
            return r3.findNext(this.parent, e3);
          }
        } };
        e2.setParent(v3, y4);
        var k3 = { name: "repeatInit", args: [s3, c4, f3], op: function(e3, t4, r4, n3) {
          var i3 = { index: 0, value: t4, eventFired: false };
          e3.meta.iterators[T3] = i3;
          if (t4 && t4[Symbol.iterator]) {
            i3.iterator = t4[Symbol.iterator]();
          }
          if (c4) {
            var a4 = n3 || e3.me;
            a4.addEventListener(r4, function(t5) {
              e3.meta.iterators[T3].eventFired = true;
            }, { once: true });
          }
          return y4;
        }, execute: function(e3) {
          return r3.unifiedExec(this, e3);
        } };
        e2.setParent(y4, k3);
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
          var c4 = false;
          if (n3.timeout) {
            setTimeout(function() {
              if (!c4) {
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
              c4 = true;
              return t3.findNext(u3, e3);
            }
            if (o2 === "json") {
              return r5.json().then(function(r6) {
                e3.result = r6;
                t3.triggerEvent(e3.me, "fetch:afterRequest", { result: r6 });
                c4 = true;
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
              c4 = true;
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
    function y2(e2) {
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
            var c3 = e3.requireElement("classRef", r2);
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
            var h3 = e3.requireElement("dotOrColonPath", r2, "Expected event name");
            if (r2.matchToken("from")) {
              var v2 = e3.requireElement("expression", r2);
            }
          }
          var d3 = { classRef: l2, classRef2: c3, classRefs: m2, attributeRef: f2, on: s2, time: p2, evt: h3, from: v2, toggle: function(e4, r3, n4, i3) {
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
          }, args: [s2, p2, h3, v2, l2, c3, m2], op: function(e4, r3, n4, i3, a4, o4, s3, u3) {
            if (n4) {
              return new Promise(function(i4) {
                d3.toggle(r3, o4, s3, u3);
                setTimeout(function() {
                  d3.toggle(r3, o4, s3, u3);
                  i4(t3.findNext(d3, e4));
                }, n4);
              });
            } else if (i3) {
              return new Promise(function(n5) {
                var l3 = a4 || e4.me;
                l3.addEventListener(i3, function() {
                  d3.toggle(r3, o4, s3, u3);
                  n5(t3.findNext(d3, e4));
                }, { once: true });
                d3.toggle(r3, o4, s3, u3);
              });
            } else {
              this.toggle(r3, o4, s3, u3);
              return t3.findNext(d3, e4);
            }
          } };
          return d3;
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
          var c3 = i2(e3, r2, o3);
          return { target: a3, when: l2, args: [a3], op: function(e4, r3) {
            t3.nullCheck(r3, a3);
            t3.implicitLoop(r3, function(r4) {
              if (l2) {
                e4.result = r4;
                let n3 = t3.evaluateNoPromise(l2, e4);
                if (n3) {
                  c3("show", r4, s2);
                } else {
                  c3("hide", r4);
                }
                e4.result = null;
              } else {
                c3("show", r4, s2);
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
          let c3 = l2.length > 0;
          if (!c3) {
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
          if (c3) {
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
          var c3 = null;
          var f2 = null;
          if (o3.type === "arrayIndex" && s2 === "into") {
            u2 = true;
            f2 = o3.prop;
            c3 = o3.root;
          } else if (o3.prop && o3.root && s2 === "into") {
            f2 = o3.prop.value;
            c3 = o3.root;
          } else if (o3.type === "symbol" && s2 === "into") {
            l2 = true;
            f2 = o3.name;
          } else if (o3.type === "attributeRef" && s2 === "into") {
            var m2 = true;
            f2 = o3.name;
            c3 = e3.requireElement("implicitMeTarget", r2);
          } else if (o3.type === "styleRef" && s2 === "into") {
            var p2 = true;
            f2 = o3.name;
            c3 = e3.requireElement("implicitMeTarget", r2);
          } else if (o3.attribute && s2 === "into") {
            var m2 = o3.attribute.type === "attributeRef";
            var p2 = o3.attribute.type === "styleRef";
            f2 = o3.attribute.name;
            c3 = o3.root;
          } else {
            c3 = o3;
          }
          var h3 = { target: o3, operation: s2, symbolWrite: l2, value: n3, args: [c3, f2, n3], op: function(e4, r3, n4, i4) {
            if (l2) {
              a2(t3, e4, n4, i4);
            } else {
              t3.nullCheck(r3, c3);
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
          return h3;
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
            var c3 = e3.requireElement("expression", n3);
          } else if (n3.matchToken("using")) {
            var f2 = e3.requireElement("expression", n3);
          }
          var m2 = { to: u2, args: [i3, a3, s2, u2, f2, c3], op: function(e4, n4, a4, o3, s3, u3, l3) {
            t3.nullCheck(n4, i3);
            var c4 = [];
            t3.implicitLoop(n4, function(e5) {
              var n5 = new Promise(function(n6, i4) {
                var c5 = e5.style.transition;
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
                for (var h3 = 0;h3 < m3.length; h3++) {
                  var v2 = m3[h3];
                  var d3 = m3[v2];
                  p2[v2] = d3;
                }
                if (!f3.initialStyles) {
                  f3.initialStyles = p2;
                }
                for (var h3 = 0;h3 < a4.length; h3++) {
                  var E2 = a4[h3];
                  var T2 = o3[h3];
                  if (T2 === "computed" || T2 == null) {
                    e5.style[E2] = p2[E2];
                  } else {
                    e5.style[E2] = T2;
                  }
                }
                var y3 = false;
                var k2 = false;
                e5.addEventListener("transitionend", function() {
                  if (!k2) {
                    e5.style.transition = c5;
                    k2 = true;
                    n6();
                  }
                }, { once: true });
                e5.addEventListener("transitionstart", function() {
                  y3 = true;
                }, { once: true });
                setTimeout(function() {
                  if (!k2 && !y3) {
                    e5.style.transition = c5;
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
              c4.push(n5);
            });
            return Promise.all(c4).then(function() {
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
                  var c3 = e3.requireElement("expression", r2);
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
          var p2 = { target: i3, args: [i3, c3], op: function(e4, r3, i4) {
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

// node_modules/tw-elements/dist/js/tw-elements.es.min.js
var ec = function(s, t) {
  return t && `${t}::${xr++}` || s.uidEvent || xr++;
};
var ic = function(s) {
  const t = ec(s);
  return s.uidEvent = t, Cn[t] = Cn[t] || {}, Cn[t];
};
var Zh = function(s, t) {
  return function e(i) {
    return i.delegateTarget = s, e.oneOff && c.off(s, i.type, t), t.apply(s, [i]);
  };
};
var Qh = function(s, t, e) {
  return function i(n) {
    const o = s.querySelectorAll(t);
    for (let { target: r } = n;r && r !== this; r = r.parentNode)
      for (let a = o.length;a--; "")
        if (o[a] === r)
          return n.delegateTarget = r, i.oneOff && c.off(s, n.type, e), e.apply(r, [n]);
    return null;
  };
};
var sc = function(s, t, e = null) {
  const i = Object.keys(s);
  for (let n = 0, o = i.length;n < o; n++) {
    const r = s[i[n]];
    if (r.originalHandler === t && r.delegationSelector === e)
      return r;
  }
  return null;
};
var nc = function(s, t, e) {
  const i = typeof t == "string", n = i ? e : t;
  let o = oc(s);
  return tc.has(o) || (o = s), [i, n, o];
};
var Or = function(s, t, e, i, n) {
  if (typeof t != "string" || !s)
    return;
  if (e || (e = i, i = null), qh.test(t)) {
    const g = (m) => function(b) {
      if (!b.relatedTarget || b.relatedTarget !== b.delegateTarget && !b.delegateTarget.contains(b.relatedTarget))
        return m.call(this, b);
    };
    i ? i = g(i) : e = g(e);
  }
  const [o, r, a] = nc(t, e, i), l = ic(s), p = l[a] || (l[a] = {}), u = sc(p, r, o ? e : null);
  if (u) {
    u.oneOff = u.oneOff && n;
    return;
  }
  const _ = ec(r, t.replace(zh, "")), f = o ? Qh(s, e, i) : Zh(s, e);
  f.delegationSelector = o ? e : null, f.originalHandler = r, f.oneOff = n, f.uidEvent = _, p[_] = f, s.addEventListener(a, f, o);
};
var Oo = function(s, t, e, i, n) {
  const o = sc(t[e], i, n);
  o && (s.removeEventListener(e, o, !!n), delete t[e][o.uidEvent]);
};
var Jh = function(s, t, e, i) {
  const n = t[e] || {};
  Object.keys(n).forEach((o) => {
    if (o.includes(i)) {
      const r = n[o];
      Oo(s, t, e, r.originalHandler, r.delegationSelector);
    }
  });
};
var oc = function(s) {
  return s = s.replace(Uh, ""), Gh[s] || s;
};
var Mt = function(s) {
  return s ? (s.nodeName || "").toLowerCase() : null;
};
var pt = function(s) {
  if (s == null)
    return window;
  if (s.toString() !== "[object Window]") {
    var t = s.ownerDocument;
    return t && t.defaultView || window;
  }
  return s;
};
var Ee = function(s) {
  var t = pt(s).Element;
  return s instanceof t || s instanceof Element;
};
var ht = function(s) {
  var t = pt(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
};
var Jo = function(s) {
  if (typeof ShadowRoot > "u")
    return false;
  var t = pt(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
};
var sd = function(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var i = t.styles[e] || {}, n = t.attributes[e] || {}, o = t.elements[e];
    !ht(o) || !Mt(o) || (Object.assign(o.style, i), Object.keys(n).forEach(function(r) {
      var a = n[r];
      a === false ? o.removeAttribute(r) : o.setAttribute(r, a === true ? "" : a);
    }));
  });
};
var nd = function(s) {
  var t = s.state, e = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(i) {
      var n = t.elements[i], o = t.attributes[i] || {}, r = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : e[i]), a = r.reduce(function(l, p) {
        return l[p] = "", l;
      }, {});
      !ht(n) || !Mt(n) || (Object.assign(n.style, a), Object.keys(o).forEach(function(l) {
        n.removeAttribute(l);
      }));
    });
  };
};
var Tt = function(s) {
  return s.split("-")[0];
};
var Io = function() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
};
var bc = function() {
  return !/^((?!chrome|android).)*safari/i.test(Io());
};
var Ue = function(s, t, e) {
  t === undefined && (t = false), e === undefined && (e = false);
  var i = s.getBoundingClientRect(), n = 1, o = 1;
  t && ht(s) && (n = s.offsetWidth > 0 && ze(i.width) / s.offsetWidth || 1, o = s.offsetHeight > 0 && ze(i.height) / s.offsetHeight || 1);
  var r = Ee(s) ? pt(s) : window, a = r.visualViewport, l = !bc() && e, p = (i.left + (l && a ? a.offsetLeft : 0)) / n, u = (i.top + (l && a ? a.offsetTop : 0)) / o, _ = i.width / n, f = i.height / o;
  return {
    width: _,
    height: f,
    top: u,
    right: p + _,
    bottom: u + f,
    left: p,
    x: p,
    y: u
  };
};
var er = function(s) {
  var t = Ue(s), e = s.offsetWidth, i = s.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: s.offsetLeft,
    y: s.offsetTop,
    width: e,
    height: i
  };
};
var vc = function(s, t) {
  var e = t.getRootNode && t.getRootNode();
  if (s.contains(t))
    return true;
  if (e && Jo(e)) {
    var i = t;
    do {
      if (i && s.isSameNode(i))
        return true;
      i = i.parentNode || i.host;
    } while (i);
  }
  return false;
};
var Ct = function(s) {
  return pt(s).getComputedStyle(s);
};
var od = function(s) {
  return ["table", "td", "th"].indexOf(Mt(s)) >= 0;
};
var ee = function(s) {
  return ((Ee(s) ? s.ownerDocument : s.document) || window.document).documentElement;
};
var rn = function(s) {
  return Mt(s) === "html" ? s : s.assignedSlot || s.parentNode || (Jo(s) ? s.host : null) || ee(s);
};
var Sr = function(s) {
  return !ht(s) || Ct(s).position === "fixed" ? null : s.offsetParent;
};
var rd = function(s) {
  var t = /firefox/i.test(Io()), e = /Trident/i.test(Io());
  if (e && ht(s)) {
    var i = Ct(s);
    if (i.position === "fixed")
      return null;
  }
  var n = rn(s);
  for (Jo(n) && (n = n.host);ht(n) && ["html", "body"].indexOf(Mt(n)) < 0; ) {
    var o = Ct(n);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
};
var Vi = function(s) {
  for (var t = pt(s), e = Sr(s);e && od(e) && Ct(e).position === "static"; )
    e = Sr(e);
  return e && (Mt(e) === "html" || Mt(e) === "body" && Ct(e).position === "static") ? t : e || rd(s) || t;
};
var ir = function(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
};
var Si = function(s, t, e) {
  return be(s, sn(t, e));
};
var ad = function(s, t, e) {
  var i = Si(s, t, e);
  return i > e ? e : i;
};
var Tc = function() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
};
var Ec = function(s) {
  return Object.assign({}, Tc(), s);
};
var Cc = function(s, t) {
  return t.reduce(function(e, i) {
    return e[i] = s, e;
  }, {});
};
var cd = function(s) {
  var t, e = s.state, i = s.name, n = s.options, o = e.elements.arrow, r = e.modifiersData.popperOffsets, a = Tt(e.placement), l = ir(a), p = [J, ut].indexOf(a) >= 0, u = p ? "height" : "width";
  if (!(!o || !r)) {
    var _ = ld(n.padding, e), f = er(o), g = l === "y" ? Q : J, m = l === "y" ? dt : ut, b = e.rects.reference[u] + e.rects.reference[l] - r[l] - e.rects.popper[u], v = r[l] - e.rects.reference[l], C = Vi(o), w = C ? l === "y" ? C.clientHeight || 0 : C.clientWidth || 0 : 0, E = b / 2 - v / 2, T = _[g], A = w - f[u] - _[m], k = w / 2 - f[u] / 2 + E, I = Si(T, k, A), O = l;
    e.modifiersData[i] = (t = {}, t[O] = I, t.centerOffset = I - k, t);
  }
};
var hd = function(s) {
  var { state: t, options: e } = s, i = e.element, n = i === undefined ? "[data-popper-arrow]" : i;
  if (n != null && !(typeof n == "string" && (n = t.elements.popper.querySelector(n), !n))) {
    if ({}.NODE_ENV !== "production" && (ht(n) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !vc(t.elements.popper, n)) {
      ({}).NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    t.elements.arrow = n;
  }
};
var Xe = function(s) {
  return s.split("-")[1];
};
var ud = function(s, t) {
  var { x: e, y: i } = s, n = t.devicePixelRatio || 1;
  return {
    x: ze(e * n) / n || 0,
    y: ze(i * n) / n || 0
  };
};
var Ir = function(s) {
  var t, e = s.popper, i = s.popperRect, n = s.placement, o = s.variation, r = s.offsets, a = s.position, l = s.gpuAcceleration, p = s.adaptive, u = s.roundOffsets, _ = s.isFixed, f = r.x, g = f === undefined ? 0 : f, m = r.y, b = m === undefined ? 0 : m, v = typeof u == "function" ? u({
    x: g,
    y: b
  }) : {
    x: g,
    y: b
  };
  g = v.x, b = v.y;
  var C = r.hasOwnProperty("x"), w = r.hasOwnProperty("y"), E = J, T = Q, A = window;
  if (p) {
    var k = Vi(e), I = "clientHeight", O = "clientWidth";
    if (k === pt(e) && (k = ee(e), Ct(k).position !== "static" && a === "absolute" && (I = "scrollHeight", O = "scrollWidth")), k = k, n === Q || (n === J || n === ut) && o === Ke) {
      T = dt;
      var x = _ && k === A && A.visualViewport ? A.visualViewport.height : k[I];
      b -= x - i.height, b *= l ? 1 : -1;
    }
    if (n === J || (n === Q || n === dt) && o === Ke) {
      E = ut;
      var L = _ && k === A && A.visualViewport ? A.visualViewport.width : k[O];
      g -= L - i.width, g *= l ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: a
  }, p && dd), N = u === true ? ud({
    x: g,
    y: b
  }, pt(e)) : {
    x: g,
    y: b
  };
  if (g = N.x, b = N.y, l) {
    var P;
    return Object.assign({}, S, (P = {}, P[T] = w ? "0" : "", P[E] = C ? "0" : "", P.transform = (A.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + b + "px)" : "translate3d(" + g + "px, " + b + "px, 0)", P));
  }
  return Object.assign({}, S, (t = {}, t[T] = w ? b + "px" : "", t[E] = C ? g + "px" : "", t.transform = "", t));
};
var pd = function(s) {
  var { state: t, options: e } = s, i = e.gpuAcceleration, n = i === undefined ? true : i, o = e.adaptive, r = o === undefined ? true : o, a = e.roundOffsets, l = a === undefined ? true : a;
  if ({}.NODE_ENV !== "production") {
    var p = Ct(t.elements.popper).transitionProperty || "";
    r && ["transform", "top", "right", "bottom", "left"].some(function(_) {
      return p.indexOf(_) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var u = {
    placement: Tt(t.placement),
    variation: Xe(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ir(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: r,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ir(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: false,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
};
var _d = function(s) {
  var { state: t, instance: e, options: i } = s, n = i.scroll, o = n === undefined ? true : n, r = i.resize, a = r === undefined ? true : r, l = pt(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && p.forEach(function(u) {
    u.addEventListener("scroll", e.update, ts);
  }), a && l.addEventListener("resize", e.update, ts), function() {
    o && p.forEach(function(u) {
      u.removeEventListener("scroll", e.update, ts);
    }), a && l.removeEventListener("resize", e.update, ts);
  };
};
var Ms = function(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return fd[t];
  });
};
var Dr = function(s) {
  return s.replace(/start|end/g, function(t) {
    return md[t];
  });
};
var or = function(s) {
  var t = pt(s), e = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: i
  };
};
var rr = function(s) {
  return Ue(ee(s)).left + or(s).scrollLeft;
};
var gd = function(s, t) {
  var e = pt(s), i = ee(s), n = e.visualViewport, o = i.clientWidth, r = i.clientHeight, a = 0, l = 0;
  if (n) {
    o = n.width, r = n.height;
    var p = bc();
    (p || !p && t === "fixed") && (a = n.offsetLeft, l = n.offsetTop);
  }
  return {
    width: o,
    height: r,
    x: a + rr(s),
    y: l
  };
};
var bd = function(s) {
  var t, e = ee(s), i = or(s), n = (t = s.ownerDocument) == null ? undefined : t.body, o = be(e.scrollWidth, e.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), r = be(e.scrollHeight, e.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), a = -i.scrollLeft + rr(s), l = -i.scrollTop;
  return Ct(n || e).direction === "rtl" && (a += be(e.clientWidth, n ? n.clientWidth : 0) - o), {
    width: o,
    height: r,
    x: a,
    y: l
  };
};
var ar = function(s) {
  var t = Ct(s), e = t.overflow, i = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + n + i);
};
var yc = function(s) {
  return ["html", "body", "#document"].indexOf(Mt(s)) >= 0 ? s.ownerDocument.body : ht(s) && ar(s) ? s : yc(rn(s));
};
var Ii = function(s, t) {
  var e;
  t === undefined && (t = []);
  var i = yc(s), n = i === ((e = s.ownerDocument) == null ? undefined : e.body), o = pt(i), r = n ? [o].concat(o.visualViewport || [], ar(i) ? i : []) : i, a = t.concat(r);
  return n ? a : a.concat(Ii(rn(r)));
};
var Do = function(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
};
var vd = function(s, t) {
  var e = Ue(s, false, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
};
var $r = function(s, t, e) {
  return t === Zo ? Do(gd(s, e)) : Ee(t) ? vd(t, e) : Do(bd(ee(s)));
};
var Td = function(s) {
  var t = Ii(rn(s)), e = ["absolute", "fixed"].indexOf(Ct(s).position) >= 0, i = e && ht(s) ? Vi(s) : s;
  return Ee(i) ? t.filter(function(n) {
    return Ee(n) && vc(n, i) && Mt(n) !== "body";
  }) : [];
};
var Ed = function(s, t, e, i) {
  var n = t === "clippingParents" ? Td(s) : [].concat(t), o = [].concat(n, [e]), r = o[0], a = o.reduce(function(l, p) {
    var u = $r(s, p, i);
    return l.top = be(u.top, l.top), l.right = sn(u.right, l.right), l.bottom = sn(u.bottom, l.bottom), l.left = be(u.left, l.left), l;
  }, $r(s, r, i));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
};
var wc = function(s) {
  var { reference: t, element: e, placement: i } = s, n = i ? Tt(i) : null, o = i ? Xe(i) : null, r = t.x + t.width / 2 - e.width / 2, a = t.y + t.height / 2 - e.height / 2, l;
  switch (n) {
    case Q:
      l = {
        x: r,
        y: t.y - e.height
      };
      break;
    case dt:
      l = {
        x: r,
        y: t.y + t.height
      };
      break;
    case ut:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case J:
      l = {
        x: t.x - e.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var p = n ? ir(n) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (o) {
      case Te:
        l[p] = l[p] - (t[u] / 2 - e[u] / 2);
        break;
      case Ke:
        l[p] = l[p] + (t[u] / 2 - e[u] / 2);
        break;
    }
  }
  return l;
};
var Ge = function(s, t) {
  t === undefined && (t = {});
  var e = t, i = e.placement, n = i === undefined ? s.placement : i, o = e.strategy, r = o === undefined ? s.strategy : o, a = e.boundary, l = a === undefined ? ac : a, p = e.rootBoundary, u = p === undefined ? Zo : p, _ = e.elementContext, f = _ === undefined ? $e : _, g = e.altBoundary, m = g === undefined ? false : g, b = e.padding, v = b === undefined ? 0 : b, C = Ec(typeof v != "number" ? v : Cc(v, ti)), w = f === $e ? lc : $e, E = s.rects.popper, T = s.elements[m ? w : f], A = Ed(Ee(T) ? T : T.contextElement || ee(s.elements.popper), l, u, r), k = Ue(s.elements.reference), I = wc({
    reference: k,
    element: E,
    strategy: "absolute",
    placement: n
  }), O = Do(Object.assign({}, E, I)), x = f === $e ? O : k, L = {
    top: A.top - x.top + C.top,
    bottom: x.bottom - A.bottom + C.bottom,
    left: A.left - x.left + C.left,
    right: x.right - A.right + C.right
  }, S = s.modifiersData.offset;
  if (f === $e && S) {
    var N = S[n];
    Object.keys(L).forEach(function(P) {
      var tt = [ut, dt].indexOf(P) >= 0 ? 1 : -1, et = [Q, dt].indexOf(P) >= 0 ? "y" : "x";
      L[P] += N[et] * tt;
    });
  }
  return L;
};
var Cd = function(s, t) {
  t === undefined && (t = {});
  var e = t, i = e.placement, n = e.boundary, o = e.rootBoundary, r = e.padding, a = e.flipVariations, l = e.allowedAutoPlacements, p = l === undefined ? Qo : l, u = Xe(i), _ = u ? a ? So : So.filter(function(m) {
    return Xe(m) === u;
  }) : ti, f = _.filter(function(m) {
    return p.indexOf(m) >= 0;
  });
  f.length === 0 && (f = _, {}.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var g = f.reduce(function(m, b) {
    return m[b] = Ge(s, {
      placement: b,
      boundary: n,
      rootBoundary: o,
      padding: r
    })[Tt(b)], m;
  }, {});
  return Object.keys(g).sort(function(m, b) {
    return g[m] - g[b];
  });
};
var Ad = function(s) {
  if (Tt(s) === Hi)
    return [];
  var t = Ms(s);
  return [Dr(s), t, Dr(t)];
};
var yd = function(s) {
  var { state: t, options: e, name: i } = s;
  if (!t.modifiersData[i]._skip) {
    for (var n = e.mainAxis, o = n === undefined ? true : n, r = e.altAxis, a = r === undefined ? true : r, l = e.fallbackPlacements, p = e.padding, u = e.boundary, _ = e.rootBoundary, f = e.altBoundary, g = e.flipVariations, m = g === undefined ? true : g, b = e.allowedAutoPlacements, v = t.options.placement, C = Tt(v), w = C === v, E = l || (w || !m ? [Ms(v)] : Ad(v)), T = [v].concat(E).reduce(function(ye, Ht) {
      return ye.concat(Tt(Ht) === Hi ? Cd(t, {
        placement: Ht,
        boundary: u,
        rootBoundary: _,
        padding: p,
        flipVariations: m,
        allowedAutoPlacements: b
      }) : Ht);
    }, []), A = t.rects.reference, k = t.rects.popper, I = new Map, O = true, x = T[0], L = 0;L < T.length; L++) {
      var S = T[L], N = Tt(S), P = Xe(S) === Te, tt = [Q, dt].indexOf(N) >= 0, et = tt ? "width" : "height", U = Ge(t, {
        placement: S,
        boundary: u,
        rootBoundary: _,
        altBoundary: f,
        padding: p
      }), bt = tt ? P ? ut : J : P ? dt : Q;
      A[et] > k[et] && (bt = Ms(bt));
      var Gi = Ms(bt), se = [];
      if (o && se.push(U[N] <= 0), a && se.push(U[bt] <= 0, U[Gi] <= 0), se.every(function(ye) {
        return ye;
      })) {
        x = S, O = false;
        break;
      }
      I.set(S, se);
    }
    if (O)
      for (var qi = m ? 3 : 1, mn = function(Ht) {
        var ri = T.find(function(Qi) {
          var ne = I.get(Qi);
          if (ne)
            return ne.slice(0, Ht).every(function(gn) {
              return gn;
            });
        });
        if (ri)
          return x = ri, "break";
      }, oi = qi;oi > 0; oi--) {
        var Zi = mn(oi);
        if (Zi === "break")
          break;
      }
    t.placement !== x && (t.modifiersData[i]._skip = true, t.placement = x, t.reset = true);
  }
};
var Lr = function(s, t, e) {
  return e === undefined && (e = {
    x: 0,
    y: 0
  }), {
    top: s.top - t.height - e.y,
    right: s.right - t.width + e.x,
    bottom: s.bottom - t.height + e.y,
    left: s.left - t.width - e.x
  };
};
var Nr = function(s) {
  return [Q, ut, dt, J].some(function(t) {
    return s[t] >= 0;
  });
};
var wd = function(s) {
  var { state: t, name: e } = s, i = t.rects.reference, n = t.rects.popper, o = t.modifiersData.preventOverflow, r = Ge(t, {
    elementContext: "reference"
  }), a = Ge(t, {
    altBoundary: true
  }), l = Lr(r, i), p = Lr(a, n, o), u = Nr(l), _ = Nr(p);
  t.modifiersData[e] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: p,
    isReferenceHidden: u,
    hasPopperEscaped: _
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": _
  });
};
var kd = function(s, t, e) {
  var i = Tt(s), n = [J, Q].indexOf(i) >= 0 ? -1 : 1, o = typeof e == "function" ? e(Object.assign({}, t, {
    placement: s
  })) : e, r = o[0], a = o[1];
  return r = r || 0, a = (a || 0) * n, [J, ut].indexOf(i) >= 0 ? {
    x: a,
    y: r
  } : {
    x: r,
    y: a
  };
};
var xd = function(s) {
  var { state: t, options: e, name: i } = s, n = e.offset, o = n === undefined ? [0, 0] : n, r = Qo.reduce(function(u, _) {
    return u[_] = kd(_, t.rects, o), u;
  }, {}), a = r[t.placement], l = a.x, p = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += p), t.modifiersData[i] = r;
};
var Od = function(s) {
  var { state: t, name: e } = s;
  t.modifiersData[e] = wc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
};
var Sd = function(s) {
  return s === "x" ? "y" : "x";
};
var Id = function(s) {
  var { state: t, options: e, name: i } = s, n = e.mainAxis, o = n === undefined ? true : n, r = e.altAxis, a = r === undefined ? false : r, l = e.boundary, p = e.rootBoundary, u = e.altBoundary, _ = e.padding, f = e.tether, g = f === undefined ? true : f, m = e.tetherOffset, b = m === undefined ? 0 : m, v = Ge(t, {
    boundary: l,
    rootBoundary: p,
    padding: _,
    altBoundary: u
  }), C = Tt(t.placement), w = Xe(t.placement), E = !w, T = ir(C), A = Sd(T), k = t.modifiersData.popperOffsets, I = t.rects.reference, O = t.rects.popper, x = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, L = typeof x == "number" ? {
    mainAxis: x,
    altAxis: x
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, x), S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, N = {
    x: 0,
    y: 0
  };
  if (k) {
    if (o) {
      var P, tt = T === "y" ? Q : J, et = T === "y" ? dt : ut, U = T === "y" ? "height" : "width", bt = k[T], Gi = bt + v[tt], se = bt - v[et], qi = g ? -O[U] / 2 : 0, mn = w === Te ? I[U] : O[U], oi = w === Te ? -O[U] : -I[U], Zi = t.elements.arrow, ye = g && Zi ? er(Zi) : {
        width: 0,
        height: 0
      }, Ht = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Tc(), ri = Ht[tt], Qi = Ht[et], ne = Si(0, I[U], ye[U]), gn = E ? I[U] / 2 - qi - ne - ri - L.mainAxis : mn - ne - ri - L.mainAxis, Lh = E ? -I[U] / 2 + qi + ne + Qi + L.mainAxis : oi + ne + Qi + L.mainAxis, bn = t.elements.arrow && Vi(t.elements.arrow), Nh = bn ? T === "y" ? bn.clientTop || 0 : bn.clientLeft || 0 : 0, br = (P = S == null ? undefined : S[T]) != null ? P : 0, Mh = bt + gn - br - Nh, Rh = bt + Lh - br, vr = Si(g ? sn(Gi, Mh) : Gi, bt, g ? be(se, Rh) : se);
      k[T] = vr, N[T] = vr - bt;
    }
    if (a) {
      var Tr, Ph = T === "x" ? Q : J, Bh = T === "x" ? dt : ut, oe = k[A], Ji = A === "y" ? "height" : "width", Er = oe + v[Ph], Cr = oe - v[Bh], vn = [Q, J].indexOf(C) !== -1, Ar = (Tr = S == null ? undefined : S[A]) != null ? Tr : 0, yr = vn ? Er : oe - I[Ji] - O[Ji] - Ar + L.altAxis, wr = vn ? oe + I[Ji] + O[Ji] - Ar - L.altAxis : Cr, kr = g && vn ? ad(yr, oe, wr) : Si(g ? yr : Er, oe, g ? wr : Cr);
      k[A] = kr, N[A] = kr - oe;
    }
    t.modifiersData[i] = N;
  }
};
var Dd = function(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
};
var $d = function(s) {
  return s === pt(s) || !ht(s) ? or(s) : Dd(s);
};
var Ld = function(s) {
  var t = s.getBoundingClientRect(), e = ze(t.width) / s.offsetWidth || 1, i = ze(t.height) / s.offsetHeight || 1;
  return e !== 1 || i !== 1;
};
var Nd = function(s, t, e) {
  e === undefined && (e = false);
  var i = ht(t), n = ht(t) && Ld(t), o = ee(t), r = Ue(s, n, e), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (i || !i && !e) && ((Mt(t) !== "body" || ar(o)) && (a = $d(t)), ht(t) ? (l = Ue(t, true), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = rr(o))), {
    x: r.left + a.scrollLeft - l.x,
    y: r.top + a.scrollTop - l.y,
    width: r.width,
    height: r.height
  };
};
var Md = function(s) {
  var t = new Map, e = new Set, i = [];
  s.forEach(function(o) {
    t.set(o.name, o);
  });
  function n(o) {
    e.add(o.name);
    var r = [].concat(o.requires || [], o.requiresIfExists || []);
    r.forEach(function(a) {
      if (!e.has(a)) {
        var l = t.get(a);
        l && n(l);
      }
    }), i.push(o);
  }
  return s.forEach(function(o) {
    e.has(o.name) || n(o);
  }), i;
};
var Rd = function(s) {
  var t = Md(s);
  return en.reduce(function(e, i) {
    return e.concat(t.filter(function(n) {
      return n.phase === i;
    }));
  }, []);
};
var Pd = function(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = undefined, e(s());
      });
    })), t;
  };
};
var Vt = function(s) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), i = 1;i < t; i++)
    e[i - 1] = arguments[i];
  return [].concat(e).reduce(function(n, o) {
    return n.replace(/%s/, o);
  }, s);
};
var Hd = function(s) {
  s.forEach(function(t) {
    [].concat(Object.keys(t), Mr).filter(function(e, i, n) {
      return n.indexOf(e) === i;
    }).forEach(function(e) {
      switch (e) {
        case "name":
          typeof t.name != "string" && console.error(Vt(ae, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
          break;
        case "enabled":
          typeof t.enabled != "boolean" && console.error(Vt(ae, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
          break;
        case "phase":
          en.indexOf(t.phase) < 0 && console.error(Vt(ae, t.name, '"phase"', "either " + en.join(", "), '"' + String(t.phase) + '"'));
          break;
        case "fn":
          typeof t.fn != "function" && console.error(Vt(ae, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "effect":
          t.effect != null && typeof t.effect != "function" && console.error(Vt(ae, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "requires":
          t.requires != null && !Array.isArray(t.requires) && console.error(Vt(ae, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t.requiresIfExists) || console.error(Vt(ae, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + Mr.map(function(i) {
            return '"' + i + '"';
          }).join(", ") + '; but "' + e + '" was provided.');
      }
      t.requires && t.requires.forEach(function(i) {
        s.find(function(n) {
          return n.name === i;
        }) == null && console.error(Vt(Bd, String(t.name), i, i));
      });
    });
  });
};
var Vd = function(s, t) {
  var e = new Set;
  return s.filter(function(i) {
    var n = t(i);
    if (!e.has(n))
      return e.add(n), true;
  });
};
var Wd = function(s) {
  var t = s.reduce(function(e, i) {
    var n = e[i.name];
    return e[i.name] = n ? Object.assign({}, n, i, {
      options: Object.assign({}, n.options, i.options),
      data: Object.assign({}, n.data, i.data)
    }) : i, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
};
var Br = function() {
  for (var s = arguments.length, t = new Array(s), e = 0;e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
};
var an = function(s) {
  s === undefined && (s = {});
  var t = s, e = t.defaultModifiers, i = e === undefined ? [] : e, n = t.defaultOptions, o = n === undefined ? Pr : n;
  return function(a, l, p) {
    p === undefined && (p = o);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Pr, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, _ = [], f = false, g = {
      state: u,
      setOptions: function(C) {
        var w = typeof C == "function" ? C(u.options) : C;
        b(), u.options = Object.assign({}, o, u.options, w), u.scrollParents = {
          reference: Ee(a) ? Ii(a) : a.contextElement ? Ii(a.contextElement) : [],
          popper: Ii(l)
        };
        var E = Rd(Wd([].concat(i, u.options.modifiers)));
        if (u.orderedModifiers = E.filter(function(S) {
          return S.enabled;
        }), {}.NODE_ENV !== "production") {
          var T = Vd([].concat(E, u.options.modifiers), function(S) {
            var N = S.name;
            return N;
          });
          if (Hd(T), Tt(u.options.placement) === Hi) {
            var A = u.orderedModifiers.find(function(S) {
              var N = S.name;
              return N === "flip";
            });
            A || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var k = Ct(l), I = k.marginTop, O = k.marginRight, x = k.marginBottom, L = k.marginLeft;
          [I, O, x, L].some(function(S) {
            return parseFloat(S);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return m(), g.update();
      },
      forceUpdate: function() {
        if (!f) {
          var C = u.elements, w = C.reference, E = C.popper;
          if (!Br(w, E)) {
            ({}).NODE_ENV !== "production" && console.error(Rr);
            return;
          }
          u.rects = {
            reference: Nd(w, Vi(E), u.options.strategy === "fixed"),
            popper: er(E)
          }, u.reset = false, u.placement = u.options.placement, u.orderedModifiers.forEach(function(S) {
            return u.modifiersData[S.name] = Object.assign({}, S.data);
          });
          for (var T = 0, A = 0;A < u.orderedModifiers.length; A++) {
            if ({}.NODE_ENV !== "production" && (T += 1, T > 100)) {
              console.error(Fd);
              break;
            }
            if (u.reset === true) {
              u.reset = false, A = -1;
              continue;
            }
            var k = u.orderedModifiers[A], I = k.fn, O = k.options, x = O === undefined ? {} : O, L = k.name;
            typeof I == "function" && (u = I({
              state: u,
              options: x,
              name: L,
              instance: g
            }) || u);
          }
        }
      },
      update: Pd(function() {
        return new Promise(function(v) {
          g.forceUpdate(), v(u);
        });
      }),
      destroy: function() {
        b(), f = true;
      }
    };
    if (!Br(a, l))
      return {}.NODE_ENV !== "production" && console.error(Rr), g;
    g.setOptions(p).then(function(v) {
      !f && p.onFirstUpdate && p.onFirstUpdate(v);
    });
    function m() {
      u.orderedModifiers.forEach(function(v) {
        var { name: C, options: w } = v, E = w === undefined ? {} : w, T = v.effect;
        if (typeof T == "function") {
          var A = T({
            state: u,
            name: C,
            instance: g,
            options: E
          }), k = function() {
          };
          _.push(A || k);
        }
      });
    }
    function b() {
      _.forEach(function(v) {
        return v();
      }), _ = [];
    }
    return g;
  };
};
var An = function(s) {
  return s === "true" ? true : s === "false" ? false : s === Number(s).toString() ? Number(s) : s === "" || s === "null" ? null : s;
};
var yn = function(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
};
var wn = function(s) {
  return typeof s == "string" ? s.split(" ") : Array.isArray(s) ? s : false;
};
var ha = function(s, t, e) {
  if (!s.length)
    return s;
  if (e && typeof e == "function")
    return e(s);
  const n = new window.DOMParser().parseFromString(s, "text/html"), o = [].concat(...n.body.querySelectorAll("*"));
  for (let r = 0, a = o.length;r < a; r++) {
    const l = o[r], p = l.nodeName.toLowerCase();
    if (!Object.keys(t).includes(p)) {
      l.remove();
      continue;
    }
    const u = [].concat(...l.attributes), _ = [].concat(t["*"] || [], t[p] || []);
    u.forEach((f) => {
      Yp(f, _) || l.removeAttribute(f.nodeName);
    });
  }
  return n.body.innerHTML;
};
var Z = function(s) {
  return s.getDate();
};
var Vs = function(s) {
  return s.getDay();
};
var Y = function(s) {
  return s.getMonth();
};
var B = function(s) {
  return s.getFullYear();
};
var cf = function(s, t, e) {
  const i = e.startDay, n = i > 0 ? 7 - i : 0, r = new Date(s, t).getDay() + n;
  return r >= 7 ? r - 7 : r;
};
var Po = function(s) {
  return hf(s).getDate();
};
var hf = function(s) {
  return Et(s.getFullYear(), s.getMonth() + 1, 0);
};
var Be = function() {
  return new Date;
};
var it = function(s, t) {
  return nt(s, t * 12);
};
var nt = function(s, t) {
  const e = Et(s.getFullYear(), s.getMonth() + t, s.getDate()), i = Z(s), n = Z(e);
  return i !== n && e.setDate(0), e;
};
var xe = function(s, t) {
  return Et(s.getFullYear(), s.getMonth(), s.getDate() + t);
};
var Et = function(s, t, e) {
  const i = new Date(s, t, e);
  return s >= 0 && s < 100 && i.setFullYear(i.getFullYear() - 1900), i;
};
var Oa = function(s) {
  const t = s.split("-"), e = t[0], i = t[1], n = t[2];
  return Et(e, i, n);
};
var df = function(s) {
  return !Number.isNaN(s.getTime());
};
var Re = function(s, t) {
  return B(s) - B(t) || Y(s) - Y(t) || Z(s) - Z(t);
};
var fe = function(s, t) {
  return s.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), s.getTime() === t.getTime();
};
var Ws = function(s, t) {
  const i = B(s) - pf();
  return uf(i, t);
};
var uf = function(s, t) {
  return (s % t + t) % t;
};
var pf = function(s, t, e) {
  let i = 0;
  return e ? i = B(e) - s + 1 : t && (i = B(t)), i;
};
var nn = function(s, t, e, i, n, o) {
  const r = new Date;
  r.setHours(0, 0, 0, 0);
  const a = t && Re(s, t) <= -1, l = e && Re(s, e) >= 1, p = n && Re(s, r) <= -1, u = o && Re(s, r) >= 1, _ = i && i(s) === false;
  return a || l || _ || p || u;
};
var zc = function(s, t, e, i, n, o) {
  const r = new Date, a = i && B(i), l = i && Y(i), p = e && B(e), u = e && Y(e), _ = B(r), f = Y(r), g = l && a && (t > a || t === a && s > l), m = u && p && (t < p || t === p && s < u), b = n && (t < _ || t === _ && s < f), v = o && (t > _ || t === _ && s > f);
  return g || m || b || v;
};
var Bo = function(s, t, e, i, n) {
  const o = t && B(t), r = e && B(e), a = B(new Date), l = r && s > r, p = o && s < o, u = i && s < a, _ = n && s > a;
  return l || p || u || _;
};
var _f = function(s, t, e, i, n, o, r, a) {
  const l = new Date;
  return l.setHours(0, 0, 0, 0), (s && o && Re(o, l) < 0 || s) && (o = l), o && Di(t, o, e, i, n, o, r, a);
};
var ff = function(s, t, e, i, n, o, r, a) {
  const l = new Date;
  return l.setHours(0, 0, 0, 0), (s && n && Re(n, l) < 0 || s) && (n = l), n && Di(t, n, e, i, n, o, r, a);
};
var Di = function(s, t, e, i, n, o, r, a) {
  return e === "days" ? B(s) === B(t) && Y(s) === Y(t) : e === "months" ? B(s) === B(t) : e === "years" ? B(t) >= a && B(t) <= r : false;
};
var kf = function(s, t, e, i, n, o, r, a, l, p) {
  const u = Y(s), _ = B(s), f = Z(s), g = Vs(s), m = $("div"), b = `
        ${Ia(s, u, _, t, e, i, n, o, r, a, p)}
    `, v = `
      ${Of(f, g, u, n, p)}
      ${Ia(s, u, _, t, e, i, n, o, r, a, p)}
    `;
  return n.inline ? (h.addClass(m, p.datepickerDropdownContainer), m.setAttribute(gf, l), m.innerHTML = b) : (h.addClass(m, p.modalContainer), m.setAttribute(mf, l), m.innerHTML = v), m;
};
var xf = function(s) {
  const t = $("div");
  return h.addClass(t, s), t.setAttribute(bf, ""), t;
};
var Of = function(s, t, e, i, n) {
  return `
      <div class="${n.datepickerHeader}" data-te-datepicker-header>
        <div class="${n.datepickerTitle}">
          <span class="${n.datepickerTitleText}">${i.title}</span>
        </div>
        <div class="${n.datepickerDate}">
          <span class="${n.datepickerDateText}" ${vf} >${i.weekdaysShort[t]}, ${i.monthsShort[e]} ${s}</span>
        </div>
      </div>
    `;
};
var Ia = function(s, t, e, i, n, o, r, a, l, p, u) {
  let _;
  return r.inline ? _ = `
    <div class="${u.datepickerMain}">
      ${$a(t, e, r, u)}
      <div class="${u.datepickerView}" ${Sa} tabindex="0">
        ${Da(s, e, i, n, o, r, a, l, p, u)}
      </div>
    </div>
  ` : _ = `
    <div class="${u.datepickerMain}">
      ${$a(t, e, r, u)}
      <div class="${u.datepickerView}" ${Sa} tabindex="0">
        ${Da(s, e, i, n, o, r, a, l, p, u)}
      </div>
      ${Sf(r, u)}
    </div>
  `, _;
};
var Da = function(s, t, e, i, n, o, r, a, l, p) {
  let u;
  return o.view === "days" ? u = Fs(s, e, o, p) : o.view === "months" ? u = Ys(t, i, n, o, r, p) : u = js(s, i, o, a, l, p), u;
};
var $a = function(s, t, e, i) {
  return `
    <div class="${i.datepickerDateControls}">
      <button class="${i.datepickerViewChangeButton}" aria-label="${e.switchToMultiYearViewLabel}" ${wf}>
        ${e.monthsFull[s]} ${t} ${$t(e, i)}
      </button>
      <div class="${i.datepickerArrowControls}">
        <button class="${i.datepickerPreviousButton}" aria-label="${e.prevMonthLabel}" ${Tf}>${e.changeMonthIconTemplate}</button>
        <button class="${i.datepickerNextButton}" aria-label="${e.nextMonthLabel}" ${Ef}>${e.changeMonthIconTemplate}</button>
      </div>
    </div>
    `;
};
var $t = function(s, t) {
  return `
  <span class="${t.datepickerViewChangeIcon}">
  ${s.viewChangeIconTemplate}
  </span>
  `;
};
var Sf = function(s, t) {
  const e = `<button class="${t.datepickerFooterBtn}" aria-label="${s.okBtnLabel}" ${Cf}>${s.okBtnText}</button>`, i = `<button class="${t.datepickerFooterBtn}" aria-label="${s.cancelBtnLabel}" ${Af}>${s.cancelBtnText}</button>`, n = `<button class="${t.datepickerFooterBtn} ${t.datepickerClearBtn}" aria-label="${s.clearBtnLabel}" ${yf}>${s.clearBtnText}</button>`;
  return `
        <div class="${t.datepickerFooter}">
          
        ${s.removeClearBtn ? "" : n}
        ${s.removeCancelBtn ? "" : i}
        ${s.removeOkBtn ? "" : e}
        </div>
      `;
};
var Fs = function(s, t, e, i) {
  const n = If(s, t, e), r = `
      <tr>
        ${e.weekdaysNarrow.map((l, p) => `<th class="${i.datepickerDayHeading}" scope="col" aria-label="${e.weekdaysFull[p]}">${l}</th>`).join("")}
      </tr>
    `, a = n.map((l) => `
        <tr>
          ${l.map((p) => `
              <td
              class="${i.datepickerCell} ${i.datepickerCellSmall}"
              data-te-date="${B(p.date)}-${Y(p.date)}-${Z(p.date)}"
              aria-label="${p.date}"
              aria-selected="${p.isSelected}"
              ${p.isSelected ? "data-te-datepicker-cell-selected" : ""}
              ${!p.currentMonth || p.disabled ? "data-te-datepicker-cell-disabled" : ""}
              ${p.isToday ? "data-te-datepicker-cell-current" : ""}
              >
                <div
                  class="${i.datepickerCellContent} ${i.datepickerCellContentSmall}"
                  style="${p.currentMonth ? "display: block" : "display: none"}"
                  >
                  ${p.dayNumber}
                  </div>
              </td>
            `).join("")}
        </tr>
      `).join("");
  return `
      <table class="${i.datepickerTable}">
        <thead>
          ${r}
        </thead>
        <tbody>
         ${a}
        </tbody>
      </table>
    `;
};
var If = function(s, t, e) {
  const i = [], n = Y(s), o = Y(nt(s, -1)), r = Y(nt(s, 1)), a = B(s), l = cf(a, n, e), p = Po(s), u = Po(nt(s, -1)), _ = 7;
  let f = 1, g = false;
  for (let m = 1;m < _; m++) {
    const b = [];
    if (m === 1) {
      const v = u - l + 1;
      for (let w = v;w <= u; w++) {
        const E = Et(a, o, w);
        b.push({
          date: E,
          currentMonth: g,
          isSelected: t && fe(E, t),
          isToday: fe(E, Be()),
          dayNumber: Z(E)
        });
      }
      g = true;
      const C = _ - b.length;
      for (let w = 0;w < C; w++) {
        const E = Et(a, n, f);
        b.push({
          date: E,
          currentMonth: g,
          isSelected: t && fe(E, t),
          isToday: fe(E, Be()),
          dayNumber: Z(E),
          disabled: nn(E, e.min, e.max, e.filter, e.disablePast, e.disableFuture)
        }), f++;
      }
    } else
      for (let v = 1;v < 8; v++) {
        f > p && (f = 1, g = false);
        const C = Et(a, g ? n : r, f);
        b.push({
          date: C,
          currentMonth: g,
          isSelected: t && fe(C, t),
          isToday: fe(C, Be()),
          dayNumber: Z(C),
          disabled: nn(C, e.min, e.max, e.filter, e.disablePast, e.disableFuture)
        }), f++;
      }
    i.push(b);
  }
  return i;
};
var Ys = function(s, t, e, i, n, o) {
  const r = Df(i, n), a = Y(Be()), l = B(Be()), p = `
      ${r.map((u) => `
          <tr>
            ${u.map((_) => {
    const f = i.monthsShort.indexOf(_);
    return `
                <td class="${o.datepickerCell} ${o.datepickerCellLarge}"
                ${zc(f, s, i.min, i.max, i.disablePast, i.disableFuture) ? "data-te-datepicker-cell-disabled" : ""}
                
                data-te-month="${f}" data-te-year="${s}" aria-label="${_}, ${s}"
                ${f === e && s === t ? "data-te-datepicker-cell-selected" : ""}
                ${f === a && s === l ? "data-te-datepicker-cell-current" : ""}" data-te-month="${f}" data-te-year="${s}" aria-label="${_}, ${s}">
                  <div class="${o.datepickerCellContent} ${o.datepickerCellContentLarge}">${_}</div>
                </td>
              `;
  }).join("")}
          </tr>
        `).join("")}
    `;
  return `
      <table class="${o.datepickerTable}">
        <tbody>
         ${p}
        </tbody>
      </table>
    `;
};
var Df = function(s, t) {
  const e = [];
  let i = [];
  for (let n = 0;n < s.monthsShort.length; n++)
    if (i.push(s.monthsShort[n]), i.length === t) {
      const o = i;
      e.push(o), i = [];
    }
  return e;
};
var js = function(s, t, e, i, n, o) {
  const r = $f(s, i, n), a = B(Be()), l = `
    ${r.map((p) => `
        <tr>
          ${p.map((u) => `
              <td class="${o.datepickerCell} ${o.datepickerCellLarge}"  aria-label="${u}" data-te-year="${u}"
              ${Bo(u, e.min, e.max, e.disablePast, e.disableFuture) ? "data-te-datepicker-cell-disabled" : ""}
              ${u === t ? "data-te-datepicker-cell-selected" : ""}
              ${u === a ? "data-te-datepicker-cell-current" : ""}
              >
                <div class="${o.datepickerCellContent} ${o.datepickerCellContentLarge}">${u}</div>
              </td>
            `).join("")}
        </tr>
      `).join("")}
  `;
  return `
      <table class="${o.datepickerTable}">
        <tbody>
        ${l}
        </tbody>
      </table>
    `;
};
var $f = function(s, t, e) {
  const i = [], n = B(s), o = Ws(s, t), r = n - o;
  let a = [];
  for (let l = 0;l < t; l++)
    if (a.push(r + l), a.length === e) {
      const p = a;
      i.push(p), a = [];
    }
  return i;
};
var Lf = function(s, t) {
  return `
    <button id="${s}" type="button" class="${t}" data-te-datepicker-toggle-button-ref data-te-datepicker-toggle-ref>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
      </svg>  
    </button>
  `;
};
var Vo = function(s) {
  return s.filter((t) => !t.disabled).every((t) => t.selected);
};
var As = function(s, t, e, i, n) {
  t.selectSize === "default" && h.addClass(s, e), t.selectSize === "sm" && h.addClass(s, i), t.selectSize === "lg" && h.addClass(s, n);
};
var Pg = function(s, t, e, i, n) {
  const o = document.createElement("div");
  o.setAttribute("id", s), o.setAttribute(Cg, "");
  const r = $("div");
  r.setAttribute(Eg, ""), h.addClass(r, i.formOutline);
  const a = $("input"), l = t.selectFilter ? "combobox" : "listbox", p = t.multiple ? "true" : "false", u = t.disabled ? "true" : "false";
  a.setAttribute(Ag, ""), h.addClass(a, i.selectInput), As(a, t, i.selectInputSizeDefault, i.selectInputSizeSm, i.selectInputSizeLg), t.selectFormWhite && h.addClass(a, i.selectInputWhite), a.setAttribute("type", "text"), a.setAttribute("role", l), a.setAttribute("aria-multiselectable", p), a.setAttribute("aria-disabled", u), a.setAttribute("aria-haspopup", "true"), a.setAttribute("aria-expanded", false), a.name = n, t.tabIndex && a.setAttribute("tabIndex", t.tabIndex), t.disabled && a.setAttribute("disabled", ""), t.selectPlaceholder !== "" && a.setAttribute("placeholder", t.selectPlaceholder), t.selectValidation ? (h.addStyle(a, {
    "pointer-events": "none",
    "caret-color": "transparent"
  }), h.addStyle(r, { cursor: "pointer" })) : a.setAttribute("readonly", "true"), t.selectValidation && (a.setAttribute("required", "true"), a.setAttribute("aria-required", "true"), a.addEventListener("keydown", Rg));
  const _ = $("div");
  h.addClass(_, i.selectValidationValid);
  const f = document.createTextNode(`${t.selectValidFeedback}`);
  _.appendChild(f);
  const g = $("div");
  h.addClass(g, i.selectValidationInvalid);
  const m = document.createTextNode(`${t.selectInvalidFeedback}`);
  g.appendChild(m);
  const b = $("span");
  b.setAttribute(yg, ""), h.addClass(b, i.selectClearBtn), As(b, t, i.selectClearBtnDefault, i.selectClearBtnSm, i.selectClearBtnLg), t.selectFormWhite && h.addClass(b, i.selectClearBtnWhite);
  const v = document.createTextNode("\u2715");
  b.appendChild(v), b.setAttribute("tabindex", "0");
  const C = $("span");
  return h.addClass(C, i.selectArrow), As(C, t, i.selectArrowDefault, i.selectArrowSm, i.selectArrowLg), t.selectFormWhite && h.addClass(C, i.selectArrowWhite), C.innerHTML = Mg, r.appendChild(a), e && (h.addClass(e, i.selectLabel), As(e, t, i.selectLabelSizeDefault, i.selectLabelSizeSm, i.selectLabelSizeLg), t.selectFormWhite && h.addClass(e, i.selectLabelWhite), r.appendChild(e)), t.selectValidation && (r.appendChild(_), r.appendChild(g)), t.selectClearButton && r.appendChild(b), r.appendChild(C), o.appendChild(r), o;
};
var al = function(s, t, e, i, n, o, r, a) {
  const l = document.createElement("div");
  l.setAttribute(wg, ""), h.addClass(l, a.selectDropdownContainer), l.setAttribute("id", `${s}`), l.style.width = `${e}px`;
  const p = document.createElement("div");
  p.setAttribute("tabindex", 0), p.setAttribute(kg, ""), h.addClass(p, a.dropdown);
  const u = $("div");
  u.setAttribute(xg, ""), h.addClass(u, a.optionsWrapper), h.addClass(u, a.optionsWrapperScrollbar), u.style.maxHeight = `${i}px`;
  const _ = eh(o, n, t, a);
  return u.appendChild(_), t.selectFilter && p.appendChild(Bg(t.selectSearchPlaceholder, a)), p.appendChild(u), r && p.appendChild(r), l.appendChild(p), l;
};
var eh = function(s, t, e, i) {
  const n = $("div");
  n.setAttribute(Og, ""), h.addClass(n, i.optionsList);
  let o;
  return e.multiple ? o = Vg(s, t, e, i) : o = Hg(s, e, i), o.forEach((r) => {
    n.appendChild(r);
  }), n;
};
var Bg = function(s, t) {
  const e = $("div");
  h.addClass(e, t.inputGroup);
  const i = $("input");
  return i.setAttribute(Sg, ""), h.addClass(i, t.selectFilterInput), i.placeholder = s, i.setAttribute("role", "searchbox"), i.setAttribute("type", "text"), e.appendChild(i), e;
};
var Hg = function(s, t, e) {
  return ih(s, t, e);
};
var Vg = function(s, t, e, i) {
  let n = null;
  e.selectAll && (n = Wg(t, s, e, i));
  const o = ih(s, e, i);
  return n ? [n, ...o] : o;
};
var ih = function(s, t, e) {
  const i = [];
  return s.forEach((n) => {
    if (Object.prototype.hasOwnProperty.call(n, "options")) {
      const r = Kg(n, t, e);
      i.push(r);
    } else
      i.push(sh(n, t, e));
  }), i;
};
var Wg = function(s, t, e, i) {
  const n = Vo(t), o = $("div");
  return o.setAttribute(Jc, ""), h.addClass(o, i.selectOption), o.setAttribute(Ig, ""), h.addStyle(o, {
    height: `${e.selectOptionHeight}px`
  }), o.setAttribute("role", "option"), o.setAttribute("aria-selected", n), n && o.setAttribute(th, ""), o.appendChild(nh(s, e, i)), s.setNode(o), o;
};
var sh = function(s, t, e) {
  if (s.node)
    return s.node;
  const i = $("div");
  return i.setAttribute(Jc, ""), h.addClass(i, e.selectOption), h.addStyle(i, {
    height: `${t.selectOptionHeight}px`
  }), h.setDataAttribute(i, "id", s.id), i.setAttribute("role", "option"), i.setAttribute("aria-selected", s.selected), i.setAttribute("aria-disabled", s.disabled), s.selected && i.setAttribute(th, ""), s.disabled && i.setAttribute("data-te-select-option-disabled", true), s.hidden && h.addClass(i, "hidden"), i.appendChild(nh(s, t, e)), s.icon && i.appendChild(jg(s, e)), s.setNode(i), i;
};
var nh = function(s, t, e) {
  const i = $("span");
  i.setAttribute(Dg, ""), h.addClass(i, e.selectOptionText);
  const n = document.createTextNode(s.label);
  return t.multiple && i.appendChild(Yg(s, e)), i.appendChild(n), (s.secondaryText || typeof s.secondaryText == "number") && i.appendChild(Fg(s.secondaryText, e)), i;
};
var Fg = function(s, t) {
  const e = $("span");
  h.addClass(e, t.selectOptionSecondaryText);
  const i = document.createTextNode(s);
  return e.appendChild(i), e;
};
var Yg = function(s, t) {
  const e = $("input");
  e.setAttribute("type", "checkbox"), h.addClass(e, t.formCheckInput), e.setAttribute($g, "");
  const i = $("label");
  return s.selected && e.setAttribute("checked", true), s.disabled && e.setAttribute("disabled", true), e.appendChild(i), e;
};
var jg = function(s, t) {
  const e = $("span"), i = $("img");
  return h.addClass(i, t.selectOptionIcon), i.src = s.icon, e.appendChild(i), e;
};
var Kg = function(s, t, e) {
  const i = $("div");
  i.setAttribute(Lg, ""), h.addClass(i, e.selectOptionGroup), i.setAttribute("role", "group"), i.setAttribute("id", s.id), s.hidden && h.addClass(i, "hidden");
  const n = $("label");
  return n.setAttribute(Ng, ""), h.addClass(n, e.selectOptionGroupLabel), h.addStyle(n, { height: `${t.selectOptionHeight}px` }), n.setAttribute("for", s.id), n.textContent = s.label, i.appendChild(n), s.options.forEach((o) => {
    i.appendChild(sh(o, t, e));
  }), i;
};
var zg = function(s, t) {
  const e = $("div");
  return e.innerHTML = s, h.addClass(e, t.selectLabel), h.addClass(e, t.selectFakeValue), e;
};
var jb = function(s) {
  return !!s && typeof s == "object";
};
var Kb = function(s) {
  var t = Object.prototype.toString.call(s);
  return t === "[object RegExp]" || t === "[object Date]" || Xb(s);
};
var Xb = function(s) {
  return s.$$typeof === Ub;
};
var Gb = function(s) {
  return Array.isArray(s) ? [] : {};
};
var Bi = function(s, t) {
  return t.clone !== false && t.isMergeableObject(s) ? Qe(Gb(s), s, t) : s;
};
var qb = function(s, t, e) {
  return s.concat(t).map(function(i) {
    return Bi(i, e);
  });
};
var Zb = function(s, t) {
  if (!t.customMerge)
    return Qe;
  var e = t.customMerge(s);
  return typeof e == "function" ? e : Qe;
};
var Qb = function(s) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(s).filter(function(t) {
    return Object.propertyIsEnumerable.call(s, t);
  }) : [];
};
var vl = function(s) {
  return Object.keys(s).concat(Qb(s));
};
var hh = function(s, t) {
  try {
    return t in s;
  } catch {
    return false;
  }
};
var Jb = function(s, t) {
  return hh(s, t) && !(Object.hasOwnProperty.call(s, t) && Object.propertyIsEnumerable.call(s, t));
};
var tv = function(s, t, e) {
  var i = {};
  return e.isMergeableObject(s) && vl(s).forEach(function(n) {
    i[n] = Bi(s[n], e);
  }), vl(t).forEach(function(n) {
    Jb(s, n) || (hh(s, n) && e.isMergeableObject(t[n]) ? i[n] = Zb(n, e)(s[n], t[n], e) : i[n] = Bi(t[n], e));
  }), i;
};
var Qe = function(s, t, e) {
  e = e || {}, e.arrayMerge = e.arrayMerge || qb, e.isMergeableObject = e.isMergeableObject || Yb, e.cloneUnlessOtherwiseSpecified = Bi;
  var i = Array.isArray(t), n = Array.isArray(s), o = i === n;
  return o ? i ? e.arrayMerge(s, t, e) : tv(s, t, e) : Bi(t, e);
};
var Lt = function(s) {
  return getComputedStyle(s);
};
var ot = function(s, t) {
  for (var e in t) {
    var i = t[e];
    typeof i == "number" && (i = i + "px"), s.style[e] = i;
  }
  return s;
};
var ws = function(s) {
  var t = document.createElement("div");
  return t.className = s, t;
};
var Qt = function(s, t) {
  if (!El)
    throw new Error("No element matching method supported");
  return El.call(s, t);
};
var Pe = function(s) {
  s.remove ? s.remove() : s.parentNode && s.parentNode.removeChild(s);
};
var Cl = function(s, t) {
  return Array.prototype.filter.call(s.children, function(e) {
    return Qt(e, t);
  });
};
var ph = function(s, t) {
  var e = s.element.classList, i = j.state.scrolling(t);
  e.contains(i) ? clearTimeout(uh[t]) : e.add(i);
};
var _h = function(s, t) {
  uh[t] = setTimeout(function() {
    return s.isAlive && s.element.classList.remove(j.state.scrolling(t));
  }, s.settings.scrollingThreshold);
};
var ov = function(s, t) {
  ph(s, t), _h(s, t);
};
var ks = function(s) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(s);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(s, false, false, undefined), t;
};
var on = function(s, t, e, i, n) {
  i === undefined && (i = true), n === undefined && (n = false);
  var o;
  if (t === "top")
    o = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down"
    ];
  else if (t === "left")
    o = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right"
    ];
  else
    throw new Error("A proper axis should be provided");
  rv(s, e, o, i, n);
};
var rv = function(s, t, e, i, n) {
  var o = e[0], r = e[1], a = e[2], l = e[3], p = e[4], u = e[5];
  i === undefined && (i = true), n === undefined && (n = false);
  var _ = s.element;
  s.reach[l] = null, _[a] < 1 && (s.reach[l] = "start"), _[a] > s[o] - s[r] - 1 && (s.reach[l] = "end"), t && (_.dispatchEvent(ks("ps-scroll-" + l)), t < 0 ? _.dispatchEvent(ks("ps-scroll-" + p)) : t > 0 && _.dispatchEvent(ks("ps-scroll-" + u)), i && ov(s, l)), s.reach[l] && (t || n) && _.dispatchEvent(ks("ps-" + l + "-reach-" + s.reach[l]));
};
var W = function(s) {
  return parseInt(s, 10) || 0;
};
var av = function(s) {
  return Qt(s, "input,[contenteditable]") || Qt(s, "select,[contenteditable]") || Qt(s, "textarea,[contenteditable]") || Qt(s, "button,[contenteditable]");
};
var lv = function(s) {
  var t = Lt(s);
  return W(t.width) + W(t.paddingLeft) + W(t.paddingRight) + W(t.borderLeftWidth) + W(t.borderRightWidth);
};
var Bt = function(s) {
  var t = s.element, e = Math.floor(t.scrollTop), i = t.getBoundingClientRect();
  s.containerWidth = Math.round(i.width), s.containerHeight = Math.round(i.height), s.contentWidth = t.scrollWidth, s.contentHeight = t.scrollHeight, t.contains(s.scrollbarXRail) || (Cl(t, j.element.rail("x")).forEach(function(n) {
    return Pe(n);
  }), t.appendChild(s.scrollbarXRail)), t.contains(s.scrollbarYRail) || (Cl(t, j.element.rail("y")).forEach(function(n) {
    return Pe(n);
  }), t.appendChild(s.scrollbarYRail)), !s.settings.suppressScrollX && s.containerWidth + s.settings.scrollXMarginOffset < s.contentWidth ? (s.scrollbarXActive = true, s.railXWidth = s.containerWidth - s.railXMarginWidth, s.railXRatio = s.containerWidth / s.railXWidth, s.scrollbarXWidth = Al(s, W(s.railXWidth * s.containerWidth / s.contentWidth)), s.scrollbarXLeft = W((s.negativeScrollAdjustment + t.scrollLeft) * (s.railXWidth - s.scrollbarXWidth) / (s.contentWidth - s.containerWidth))) : s.scrollbarXActive = false, !s.settings.suppressScrollY && s.containerHeight + s.settings.scrollYMarginOffset < s.contentHeight ? (s.scrollbarYActive = true, s.railYHeight = s.containerHeight - s.railYMarginHeight, s.railYRatio = s.containerHeight / s.railYHeight, s.scrollbarYHeight = Al(s, W(s.railYHeight * s.containerHeight / s.contentHeight)), s.scrollbarYTop = W(e * (s.railYHeight - s.scrollbarYHeight) / (s.contentHeight - s.containerHeight))) : s.scrollbarYActive = false, s.scrollbarXLeft >= s.railXWidth - s.scrollbarXWidth && (s.scrollbarXLeft = s.railXWidth - s.scrollbarXWidth), s.scrollbarYTop >= s.railYHeight - s.scrollbarYHeight && (s.scrollbarYTop = s.railYHeight - s.scrollbarYHeight), cv(t, s), s.scrollbarXActive ? t.classList.add(j.state.active("x")) : (t.classList.remove(j.state.active("x")), s.scrollbarXWidth = 0, s.scrollbarXLeft = 0, t.scrollLeft = s.isRtl === true ? s.contentWidth : 0), s.scrollbarYActive ? t.classList.add(j.state.active("y")) : (t.classList.remove(j.state.active("y")), s.scrollbarYHeight = 0, s.scrollbarYTop = 0, t.scrollTop = 0);
};
var Al = function(s, t) {
  return s.settings.minScrollbarLength && (t = Math.max(t, s.settings.minScrollbarLength)), s.settings.maxScrollbarLength && (t = Math.min(t, s.settings.maxScrollbarLength)), t;
};
var cv = function(s, t) {
  var e = { width: t.railXWidth }, i = Math.floor(s.scrollTop);
  t.isRtl ? e.left = t.negativeScrollAdjustment + s.scrollLeft + t.containerWidth - t.contentWidth : e.left = s.scrollLeft, t.isScrollbarXUsingBottom ? e.bottom = t.scrollbarXBottom - i : e.top = t.scrollbarXTop + i, ot(t.scrollbarXRail, e);
  var n = { top: i, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? n.right = t.contentWidth - (t.negativeScrollAdjustment + s.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : n.right = t.scrollbarYRight - s.scrollLeft : t.isRtl ? n.left = t.negativeScrollAdjustment + s.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : n.left = t.scrollbarYLeft + s.scrollLeft, ot(t.scrollbarYRail, n), ot(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), ot(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
};
var hv = function(s) {
  s.element, s.event.bind(s.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), s.event.bind(s.scrollbarYRail, "mousedown", function(t) {
    var e = t.pageY - window.pageYOffset - s.scrollbarYRail.getBoundingClientRect().top, i = e > s.scrollbarYTop ? 1 : -1;
    s.element.scrollTop += i * s.containerHeight, Bt(s), t.stopPropagation();
  }), s.event.bind(s.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), s.event.bind(s.scrollbarXRail, "mousedown", function(t) {
    var e = t.pageX - window.pageXOffset - s.scrollbarXRail.getBoundingClientRect().left, i = e > s.scrollbarXLeft ? 1 : -1;
    s.element.scrollLeft += i * s.containerWidth, Bt(s), t.stopPropagation();
  });
};
var dv = function(s) {
  yl(s, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), yl(s, [
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
var yl = function(s, t) {
  var e = t[0], i = t[1], n = t[2], o = t[3], r = t[4], a = t[5], l = t[6], p = t[7], u = t[8], _ = s.element, f = null, g = null, m = null;
  function b(w) {
    w.touches && w.touches[0] && (w[n] = w.touches[0].pageY), _[l] = f + m * (w[n] - g), ph(s, p), Bt(s), w.stopPropagation(), w.type.startsWith("touch") && w.changedTouches.length > 1 && w.preventDefault();
  }
  function v() {
    _h(s, p), s[u].classList.remove(j.state.clicking), s.event.unbind(s.ownerDocument, "mousemove", b);
  }
  function C(w, E) {
    f = _[l], E && w.touches && (w[n] = w.touches[0].pageY), g = w[n], m = (s[i] - s[e]) / (s[o] - s[a]), E ? s.event.bind(s.ownerDocument, "touchmove", b) : (s.event.bind(s.ownerDocument, "mousemove", b), s.event.once(s.ownerDocument, "mouseup", v), w.preventDefault()), s[u].classList.add(j.state.clicking), w.stopPropagation();
  }
  s.event.bind(s[r], "mousedown", function(w) {
    C(w);
  }), s.event.bind(s[r], "touchstart", function(w) {
    C(w, true);
  });
};
var uv = function(s) {
  var t = s.element, e = function() {
    return Qt(t, ":hover");
  }, i = function() {
    return Qt(s.scrollbarX, ":focus") || Qt(s.scrollbarY, ":focus");
  };
  function n(o, r) {
    var a = Math.floor(t.scrollTop);
    if (o === 0) {
      if (!s.scrollbarYActive)
        return false;
      if (a === 0 && r > 0 || a >= s.contentHeight - s.containerHeight && r < 0)
        return !s.settings.wheelPropagation;
    }
    var l = t.scrollLeft;
    if (r === 0) {
      if (!s.scrollbarXActive)
        return false;
      if (l === 0 && o < 0 || l >= s.contentWidth - s.containerWidth && o > 0)
        return !s.settings.wheelPropagation;
    }
    return true;
  }
  s.event.bind(s.ownerDocument, "keydown", function(o) {
    if (!(o.isDefaultPrevented && o.isDefaultPrevented() || o.defaultPrevented) && !(!e() && !i())) {
      var r = document.activeElement ? document.activeElement : s.ownerDocument.activeElement;
      if (r) {
        if (r.tagName === "IFRAME")
          r = r.contentDocument.activeElement;
        else
          for (;r.shadowRoot; )
            r = r.shadowRoot.activeElement;
        if (av(r))
          return;
      }
      var a = 0, l = 0;
      switch (o.which) {
        case 37:
          o.metaKey ? a = -s.contentWidth : o.altKey ? a = -s.containerWidth : a = -30;
          break;
        case 38:
          o.metaKey ? l = s.contentHeight : o.altKey ? l = s.containerHeight : l = 30;
          break;
        case 39:
          o.metaKey ? a = s.contentWidth : o.altKey ? a = s.containerWidth : a = 30;
          break;
        case 40:
          o.metaKey ? l = -s.contentHeight : o.altKey ? l = -s.containerHeight : l = -30;
          break;
        case 32:
          o.shiftKey ? l = s.containerHeight : l = -s.containerHeight;
          break;
        case 33:
          l = s.containerHeight;
          break;
        case 34:
          l = -s.containerHeight;
          break;
        case 36:
          l = s.contentHeight;
          break;
        case 35:
          l = -s.contentHeight;
          break;
        default:
          return;
      }
      s.settings.suppressScrollX && a !== 0 || s.settings.suppressScrollY && l !== 0 || (t.scrollTop -= l, t.scrollLeft += a, Bt(s), n(a, l) && o.preventDefault());
    }
  });
};
var pv = function(s) {
  var t = s.element;
  function e(r, a) {
    var l = Math.floor(t.scrollTop), p = t.scrollTop === 0, u = l + t.offsetHeight === t.scrollHeight, _ = t.scrollLeft === 0, f = t.scrollLeft + t.offsetWidth === t.scrollWidth, g;
    return Math.abs(a) > Math.abs(r) ? g = p || u : g = _ || f, g ? !s.settings.wheelPropagation : true;
  }
  function i(r) {
    var a = r.deltaX, l = -1 * r.deltaY;
    return (typeof a > "u" || typeof l > "u") && (a = -1 * r.wheelDeltaX / 6, l = r.wheelDeltaY / 6), r.deltaMode && r.deltaMode === 1 && (a *= 10, l *= 10), a !== a && l !== l && (a = 0, l = r.wheelDelta), r.shiftKey ? [-l, -a] : [a, l];
  }
  function n(r, a, l) {
    if (!Ne.isWebKit && t.querySelector("select:focus"))
      return true;
    if (!t.contains(r))
      return false;
    for (var p = r;p && p !== t; ) {
      if (p.classList.contains(j.element.consuming))
        return true;
      var u = Lt(p);
      if (l && u.overflowY.match(/(scroll|auto)/)) {
        var _ = p.scrollHeight - p.clientHeight;
        if (_ > 0 && (p.scrollTop > 0 && l < 0 || p.scrollTop < _ && l > 0))
          return true;
      }
      if (a && u.overflowX.match(/(scroll|auto)/)) {
        var f = p.scrollWidth - p.clientWidth;
        if (f > 0 && (p.scrollLeft > 0 && a < 0 || p.scrollLeft < f && a > 0))
          return true;
      }
      p = p.parentNode;
    }
    return false;
  }
  function o(r) {
    var a = i(r), l = a[0], p = a[1];
    if (!n(r.target, l, p)) {
      var u = false;
      s.settings.useBothWheelAxes ? s.scrollbarYActive && !s.scrollbarXActive ? (p ? t.scrollTop -= p * s.settings.wheelSpeed : t.scrollTop += l * s.settings.wheelSpeed, u = true) : s.scrollbarXActive && !s.scrollbarYActive && (l ? t.scrollLeft += l * s.settings.wheelSpeed : t.scrollLeft -= p * s.settings.wheelSpeed, u = true) : (t.scrollTop -= p * s.settings.wheelSpeed, t.scrollLeft += l * s.settings.wheelSpeed), Bt(s), u = u || e(l, p), u && !r.ctrlKey && (r.stopPropagation(), r.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? s.event.bind(t, "wheel", o) : typeof window.onmousewheel < "u" && s.event.bind(t, "mousewheel", o);
};
var _v = function(s) {
  if (!Ne.supportsTouch && !Ne.supportsIePointer)
    return;
  var t = s.element;
  function e(m, b) {
    var v = Math.floor(t.scrollTop), C = t.scrollLeft, w = Math.abs(m), E = Math.abs(b);
    if (E > w) {
      if (b < 0 && v === s.contentHeight - s.containerHeight || b > 0 && v === 0)
        return window.scrollY === 0 && b > 0 && Ne.isChrome;
    } else if (w > E && (m < 0 && C === s.contentWidth - s.containerWidth || m > 0 && C === 0))
      return true;
    return true;
  }
  function i(m, b) {
    t.scrollTop -= b, t.scrollLeft -= m, Bt(s);
  }
  var n = {}, o = 0, r = {}, a = null;
  function l(m) {
    return m.targetTouches ? m.targetTouches[0] : m;
  }
  function p(m) {
    return m.pointerType && m.pointerType === "pen" && m.buttons === 0 ? false : !!(m.targetTouches && m.targetTouches.length === 1 || m.pointerType && m.pointerType !== "mouse" && m.pointerType !== m.MSPOINTER_TYPE_MOUSE);
  }
  function u(m) {
    if (p(m)) {
      var b = l(m);
      n.pageX = b.pageX, n.pageY = b.pageY, o = (new Date()).getTime(), a !== null && clearInterval(a);
    }
  }
  function _(m, b, v) {
    if (!t.contains(m))
      return false;
    for (var C = m;C && C !== t; ) {
      if (C.classList.contains(j.element.consuming))
        return true;
      var w = Lt(C);
      if (v && w.overflowY.match(/(scroll|auto)/)) {
        var E = C.scrollHeight - C.clientHeight;
        if (E > 0 && (C.scrollTop > 0 && v < 0 || C.scrollTop < E && v > 0))
          return true;
      }
      if (b && w.overflowX.match(/(scroll|auto)/)) {
        var T = C.scrollWidth - C.clientWidth;
        if (T > 0 && (C.scrollLeft > 0 && b < 0 || C.scrollLeft < T && b > 0))
          return true;
      }
      C = C.parentNode;
    }
    return false;
  }
  function f(m) {
    if (p(m)) {
      var b = l(m), v = { pageX: b.pageX, pageY: b.pageY }, C = v.pageX - n.pageX, w = v.pageY - n.pageY;
      if (_(m.target, C, w))
        return;
      i(C, w), n = v;
      var E = (new Date()).getTime(), T = E - o;
      T > 0 && (r.x = C / T, r.y = w / T, o = E), e(C, w) && m.preventDefault();
    }
  }
  function g() {
    s.settings.swipeEasing && (clearInterval(a), a = setInterval(function() {
      if (s.isInitialized) {
        clearInterval(a);
        return;
      }
      if (!r.x && !r.y) {
        clearInterval(a);
        return;
      }
      if (Math.abs(r.x) < 0.01 && Math.abs(r.y) < 0.01) {
        clearInterval(a);
        return;
      }
      if (!s.element) {
        clearInterval(a);
        return;
      }
      i(r.x * 30, r.y * 30), r.x *= 0.8, r.y *= 0.8;
    }, 10));
  }
  Ne.supportsTouch ? (s.event.bind(t, "touchstart", u), s.event.bind(t, "touchmove", f), s.event.bind(t, "touchend", g)) : Ne.supportsIePointer && (window.PointerEvent ? (s.event.bind(t, "pointerdown", u), s.event.bind(t, "pointermove", f), s.event.bind(t, "pointerup", g)) : window.MSPointerEvent && (s.event.bind(t, "MSPointerDown", u), s.event.bind(t, "MSPointerMove", f), s.event.bind(t, "MSPointerUp", g)));
};
/*!
* Tailwind Elements 1.0.0
* 
* Tailwind Elements is an open-source UI kit of advanced components for TailwindCSS.
* Copyright © 2023 MDBootstrap.com
* 
* Unless a custom, individually assigned license has been granted, this program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
* In addition, a custom license may be available upon request, subject to the terms and conditions of that license. Please contact tailwind@mdbootstrap.com for more information on obtaining a custom license.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
* 
*/
var Hh = Object.defineProperty;
var Vh = (s, t, e) => (t in s) ? Hh(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e;
var yt = (s, t, e) => (Vh(s, typeof t != "symbol" ? t + "" : t, e), e);
var Tn = (() => {
  const s = {};
  let t = 1;
  return {
    set(e, i, n) {
      typeof e[i] > "u" && (e[i] = {
        key: i,
        id: t
      }, t++), s[e[i].id] = n;
    },
    get(e, i) {
      if (!e || typeof e[i] > "u")
        return null;
      const n = e[i];
      return n.key === i ? s[n.id] : null;
    },
    delete(e, i) {
      if (typeof e[i] > "u")
        return;
      const n = e[i];
      n.key === i && (delete s[n.id], delete e[i]);
    }
  };
})();
var y = {
  setData(s, t, e) {
    Tn.set(s, t, e);
  },
  getData(s, t) {
    return Tn.get(s, t);
  },
  removeData(s, t) {
    Tn.delete(s, t);
  }
};
var Wh = 1e6;
var Fh = 1000;
var xo = "transitionend";
var Yh = (s) => s == null ? `${s}` : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
var rt = (s) => {
  do
    s += Math.floor(Math.random() * Wh);
  while (document.getElementById(s));
  return s;
};
var Ul = (s) => {
  let t = s.getAttribute("data-te-target");
  if (!t || t === "#") {
    let e = s.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t;
};
var qo = (s) => {
  const t = Ul(s);
  return t && document.querySelector(t) ? t : null;
};
var Jt = (s) => {
  const t = Ul(s);
  return t ? document.querySelector(t) : null;
};
var jh = (s) => {
  if (!s)
    return 0;
  let { transitionDuration: t, transitionDelay: e } = window.getComputedStyle(s);
  const i = Number.parseFloat(t), n = Number.parseFloat(e);
  return !i && !n ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * Fh);
};
var Xl = (s) => {
  s.dispatchEvent(new Event(xo));
};
var je = (s) => !s || typeof s != "object" ? false : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u");
var te = (s) => je(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(s) : null;
var D = (s, t, e) => {
  Object.keys(e).forEach((i) => {
    const n = e[i], o = t[i], r = o && je(o) ? "element" : Yh(o);
    if (!new RegExp(n).test(r))
      throw new Error(`${s.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`);
  });
};
var Nt = (s) => {
  if (!s || s.getClientRects().length === 0)
    return false;
  if (s.style && s.parentNode && s.parentNode.style) {
    const t = getComputedStyle(s), e = getComputedStyle(s.parentNode);
    return getComputedStyle(s).getPropertyValue("visibility") === "visible" || t.display !== "none" && e.display !== "none" && t.visibility !== "hidden";
  }
  return false;
};
var ge = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? true : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false";
var Gl = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? Gl(s.parentNode) : null;
};
var tn = () => function() {
};
var Je = (s) => {
  s.offsetHeight;
};
var ql = () => {
  const { jQuery: s } = window;
  return s && !document.body.hasAttribute("data-te-no-jquery") ? s : null;
};
var En = [];
var Zl = (s) => {
  document.readyState === "loading" ? (En.length || document.addEventListener("DOMContentLoaded", () => {
    En.forEach((t) => t());
  }), En.push(s)) : s();
};
var F = () => document.documentElement.dir === "rtl";
var Kh = (s) => Array.from(s);
var $ = (s) => document.createElement(s);
var me = (s) => {
  typeof s == "function" && s();
};
var Ql = (s, t, e = true) => {
  if (!e) {
    me(s);
    return;
  }
  const i = 5, n = jh(t) + i;
  let o = false;
  const r = ({ target: a }) => {
    a === t && (o = true, t.removeEventListener(xo, r), me(s));
  };
  t.addEventListener(xo, r), setTimeout(() => {
    o || Xl(t);
  }, n);
};
var Jl = (s, t, e, i) => {
  let n = s.indexOf(t);
  if (n === -1)
    return s[!e && i ? s.length - 1 : 0];
  const o = s.length;
  return n += e ? 1 : -1, i && (n = (n + o) % o), s[Math.max(0, Math.min(n, o - 1))];
};
var zh = /[^.]*(?=\..*)\.|.*/;
var Uh = /\..*/;
var Xh = /::\d+$/;
var Cn = {};
var xr = 1;
var Gh = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
var qh = /^(mouseenter|mouseleave)/i;
var tc = new Set([
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
var c = {
  on(s, t, e, i) {
    Or(s, t, e, i, false);
  },
  one(s, t, e, i) {
    Or(s, t, e, i, true);
  },
  off(s, t, e, i) {
    if (typeof t != "string" || !s)
      return;
    const [n, o, r] = nc(t, e, i), a = r !== t, l = ic(s), p = t.startsWith(".");
    if (typeof o < "u") {
      if (!l || !l[r])
        return;
      Oo(s, l, r, o, n ? e : null);
      return;
    }
    p && Object.keys(l).forEach((_) => {
      Jh(s, l, _, t.slice(1));
    });
    const u = l[r] || {};
    Object.keys(u).forEach((_) => {
      const f = _.replace(Xh, "");
      if (!a || t.includes(f)) {
        const g = u[_];
        Oo(s, l, r, g.originalHandler, g.delegationSelector);
      }
    });
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const i = ql(), n = oc(t), o = t !== n, r = tc.has(n);
    let a, l = true, p = true, u = false, _ = null;
    return o && i && (a = i.Event(t, e), i(s).trigger(a), l = !a.isPropagationStopped(), p = !a.isImmediatePropagationStopped(), u = a.isDefaultPrevented()), r ? (_ = document.createEvent("HTMLEvents"), _.initEvent(n, l, true)) : _ = new CustomEvent(t, {
      bubbles: l,
      cancelable: true
    }), typeof e < "u" && Object.keys(e).forEach((f) => {
      Object.defineProperty(_, f, {
        get() {
          return e[f];
        }
      });
    }), u && _.preventDefault(), p && s.dispatchEvent(_), _.defaultPrevented && typeof a < "u" && a.preventDefault(), _;
  }
};
var re = {
  on(s, t, e, i) {
    const n = t.split(" ");
    for (let o = 0;o < n.length; o++)
      c.on(s, n[o], e, i);
  },
  off(s, t, e, i) {
    const n = t.split(" ");
    for (let o = 0;o < n.length; o++)
      c.off(s, n[o], e, i);
  }
};
var td = "5.1.3";

class gt {
  constructor(t) {
    t = te(t), t && (this._element = t, y.setData(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    y.removeData(this._element, this.constructor.DATA_KEY), c.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach((t) => {
      this[t] = null;
    });
  }
  _queueCallback(t, e, i = true) {
    Ql(t, e, i);
  }
  static getInstance(t) {
    return y.getData(te(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return td;
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
var Q = "top";
var dt = "bottom";
var ut = "right";
var J = "left";
var Hi = "auto";
var ti = [Q, dt, ut, J];
var Te = "start";
var Ke = "end";
var ac = "clippingParents";
var Zo = "viewport";
var $e = "popper";
var lc = "reference";
var So = ti.reduce(function(s, t) {
  return s.concat([t + "-" + Te, t + "-" + Ke]);
}, []);
var Qo = [].concat(ti, [Hi]).reduce(function(s, t) {
  return s.concat([t, t + "-" + Te, t + "-" + Ke]);
}, []);
var cc = "beforeRead";
var hc = "read";
var dc = "afterRead";
var uc = "beforeMain";
var pc = "main";
var _c = "afterMain";
var fc = "beforeWrite";
var mc = "write";
var gc = "afterWrite";
var en = [cc, hc, dc, uc, pc, _c, fc, mc, gc];
var tr = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: sd,
  effect: nd,
  requires: ["computeStyles"]
};
var be = Math.max;
var sn = Math.min;
var ze = Math.round;
var ld = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Ec(typeof t != "number" ? t : Cc(t, ti));
};
var Ac = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: cd,
  effect: hd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
var dd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
var sr = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: pd,
  data: {}
};
var ts = {
  passive: true
};
var nr = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function() {
  },
  effect: _d,
  data: {}
};
var fd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var md = {
  start: "end",
  end: "start"
};
var kc = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: yd,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
var xc = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: wd
};
var Oc = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: xd
};
var lr = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: Od,
  data: {}
};
var Sc = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: Id,
  requiresIfExists: ["offset"]
};
var ae = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var Bd = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var Mr = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
var Rr = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var Fd = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var Pr = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
var Yd = an();
var jd = [nr, lr, sr, tr];
var Kd = an({
  defaultModifiers: jd
});
var zd = [nr, lr, sr, tr, Oc, kc, Sc, Ac, xc];
var Ce = an({
  defaultModifiers: zd
});
var Ic = Object.freeze(Object.defineProperty({
  __proto__: null,
  afterMain: _c,
  afterRead: dc,
  afterWrite: gc,
  applyStyles: tr,
  arrow: Ac,
  auto: Hi,
  basePlacements: ti,
  beforeMain: uc,
  beforeRead: cc,
  beforeWrite: fc,
  bottom: dt,
  clippingParents: ac,
  computeStyles: sr,
  createPopper: Ce,
  createPopperBase: Yd,
  createPopperLite: Kd,
  detectOverflow: Ge,
  end: Ke,
  eventListeners: nr,
  flip: kc,
  hide: xc,
  left: J,
  main: pc,
  modifierPhases: en,
  offset: Oc,
  placements: Qo,
  popper: $e,
  popperGenerator: an,
  popperOffsets: lr,
  preventOverflow: Sc,
  read: hc,
  reference: lc,
  right: ut,
  start: Te,
  top: Q,
  variationPlacements: So,
  viewport: Zo,
  write: mc
}, Symbol.toStringTag, { value: "Module" }));
var h = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-te-${yn(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-te-${yn(t)}`);
  },
  getDataAttributes(s) {
    if (!s)
      return {};
    const t = {};
    return Object.keys(s.dataset).filter((e) => e.startsWith("te")).forEach((e) => {
      if (e.startsWith("teClass"))
        return;
      let i = e.replace(/^te/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = An(s.dataset[e]);
    }), t;
  },
  getDataClassAttributes(s) {
    if (!s)
      return {};
    const t = {
      ...s.dataset
    };
    return Object.keys(t).filter((e) => e.startsWith("teClass")).forEach((e) => {
      let i = e.replace(/^teClass/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = An(t[e]);
    }), t;
  },
  getDataAttribute(s, t) {
    return An(s.getAttribute(`data-te-${yn(t)}`));
  },
  offset(s) {
    const t = s.getBoundingClientRect();
    return {
      top: t.top + document.body.scrollTop,
      left: t.left + document.body.scrollLeft
    };
  },
  position(s) {
    return {
      top: s.offsetTop,
      left: s.offsetLeft
    };
  },
  style(s, t) {
    Object.assign(s.style, t);
  },
  toggleClass(s, t) {
    s && wn(t).forEach((e) => {
      s.classList.contains(e) ? s.classList.remove(e) : s.classList.add(e);
    });
  },
  addClass(s, t) {
    wn(t).forEach((e) => !s.classList.contains(e) && s.classList.add(e));
  },
  addStyle(s, t) {
    Object.keys(t).forEach((e) => {
      s.style[e] = t[e];
    });
  },
  removeClass(s, t) {
    wn(t).forEach((e) => s.classList.contains(e) && s.classList.remove(e));
  },
  hasClass(s, t) {
    return s.classList.contains(t);
  },
  maxOffset(s) {
    const t = s.getBoundingClientRect();
    return {
      top: t.top + Math.max(document.body.scrollTop, document.documentElement.scrollTop, window.scrollY),
      left: t.left + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft, window.scrollX)
    };
  }
};
var Ud = 3;
var d = {
  closest(s, t) {
    return s.closest(t);
  },
  matches(s, t) {
    return s.matches(t);
  },
  find(s, t = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t, s));
  },
  findOne(s, t = document.documentElement) {
    return Element.prototype.querySelector.call(t, s);
  },
  children(s, t) {
    return [].concat(...s.children).filter((i) => i.matches(t));
  },
  parents(s, t) {
    const e = [];
    let i = s.parentNode;
    for (;i && i.nodeType === Node.ELEMENT_NODE && i.nodeType !== Ud; )
      this.matches(i, t) && e.push(i), i = i.parentNode;
    return e;
  },
  prev(s, t) {
    let e = s.previousElementSibling;
    for (;e; ) {
      if (e.matches(t))
        return [e];
      e = e.previousElementSibling;
    }
    return [];
  },
  next(s, t) {
    let e = s.nextElementSibling;
    for (;e; ) {
      if (this.matches(e, t))
        return [e];
      e = e.nextElementSibling;
    }
    return [];
  },
  focusableChildren(s) {
    const t = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]'
    ].map((e) => `${e}:not([tabindex^="-"])`).join(", ");
    return this.find(t, s).filter((e) => !ge(e) && Nt(e));
  }
};
var Xd = "te.dropdown";
var Ae = `.${Xd}`;
var cr = ".data-api";
var Rs = "Escape";
var $o = "ArrowUp";
var Ps = "ArrowDown";
var qd = new RegExp(`${$o}|${Ps}|${Rs}`);
var Zd = `hide${Ae}`;
var Qd = `hidden${Ae}`;
var Jd = `show${Ae}`;
var tu = `shown${Ae}`;
var eu = `click${Ae}${cr}`;
var Wr = `keydown${Ae}${cr}`;
var iu = `keyup${Ae}${cr}`;
var cu = F() ? "top-end" : "top-start";
var hu = F() ? "top-start" : "top-end";
var du = F() ? "bottom-end" : "bottom-start";
var uu = F() ? "bottom-start" : "bottom-end";
var pu = F() ? "left-start" : "right-start";
var _u = F() ? "right-start" : "left-start";
var On = "collapse";
var Dc = "te.collapse";
var ln = `.${Dc}`;
var Fr = {
  toggle: true,
  parent: null
};
var vu = {
  toggle: "boolean",
  parent: "(null|element)"
};
var Tu = `show${ln}`;
var Eu = `shown${ln}`;
var Cu = `hide${ln}`;
var Au = `hidden${ln}`;
var Sn = "data-te-collapse-show";
var Yr = "data-te-collapse-collapsed";
var ss = "data-te-collapse-collapsing";
var yu = "data-te-collapse-horizontal";
var Me = "data-te-collapse-item";
var jr = `:scope [${Me}] [${Me}]`;
var wu = "width";
var ku = "height";
var xu = "[data-te-collapse-item][data-te-collapse-show], [data-te-collapse-item][data-te-collapse-collapsing]";
var Kr = "[data-te-collapse-init]";
var Ou = {
  visible: "!visible",
  hidden: "hidden",
  baseTransition: "overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
  collapsing: "h-0 transition-[height] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
  collapsingHorizontal: "w-0 h-auto transition-[width] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
};
var Su = {
  visible: "string",
  hidden: "string",
  baseTransition: "string",
  collapsing: "string",
  collapsingHorizontal: "string"
};

class Zt extends gt {
  constructor(t, e, i) {
    super(t), this._isTransitioning = false, this._config = this._getConfig(e), this._classes = this._getClasses(i), this._triggerArray = [];
    const n = d.find(Kr);
    for (let o = 0, r = n.length;o < r; o++) {
      const a = n[o], l = qo(a), p = d.find(l).filter((u) => u === this._element);
      l !== null && p.length && (this._selector = l, this._triggerArray.push(a));
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  static get Default() {
    return Fr;
  }
  static get NAME() {
    return On;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [], e;
    if (this._config.parent) {
      const u = d.find(jr, this._config.parent);
      t = d.find(xu, this._config.parent).filter((_) => !u.includes(_));
    }
    const i = d.findOne(this._selector);
    if (t.length) {
      const u = t.find((_) => i !== _);
      if (e = u ? Zt.getInstance(u) : null, e && e._isTransitioning)
        return;
    }
    if (c.trigger(this._element, Tu).defaultPrevented)
      return;
    t.forEach((u) => {
      i !== u && Zt.getOrCreateInstance(u, { toggle: false }).hide(), e || y.setData(u, Dc, null);
    });
    const o = this._getDimension(), r = o === "height" ? this._classes.collapsing : this._classes.collapsingHorizontal;
    h.removeClass(this._element, this._classes.visible), h.removeClass(this._element, this._classes.hidden), h.addClass(this._element, r), this._element.removeAttribute(Me), this._element.setAttribute(ss, ""), this._element.style[o] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
    const a = () => {
      this._isTransitioning = false, h.removeClass(this._element, this._classes.hidden), h.removeClass(this._element, r), h.addClass(this._element, this._classes.visible), this._element.removeAttribute(ss), this._element.setAttribute(Me, ""), this._element.setAttribute(Sn, ""), this._element.style[o] = "", c.trigger(this._element, Eu);
    }, p = `scroll${o[0].toUpperCase() + o.slice(1)}`;
    this._queueCallback(a, this._element, true), this._element.style[o] = `${this._element[p]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || c.trigger(this._element, Cu).defaultPrevented)
      return;
    const e = this._getDimension(), i = e === "height" ? this._classes.collapsing : this._classes.collapsingHorizontal;
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Je(this._element), h.addClass(this._element, i), h.removeClass(this._element, this._classes.visible), h.removeClass(this._element, this._classes.hidden), this._element.setAttribute(ss, ""), this._element.removeAttribute(Me), this._element.removeAttribute(Sn);
    const n = this._triggerArray.length;
    for (let r = 0;r < n; r++) {
      const a = this._triggerArray[r], l = Jt(a);
      l && !this._isShown(l) && this._addAriaAndCollapsedClass([a], false);
    }
    this._isTransitioning = true;
    const o = () => {
      this._isTransitioning = false, h.removeClass(this._element, i), h.addClass(this._element, this._classes.visible), h.addClass(this._element, this._classes.hidden), this._element.removeAttribute(ss), this._element.setAttribute(Me, ""), c.trigger(this._element, Au);
    };
    this._element.style[e] = "", this._queueCallback(o, this._element, true);
  }
  _isShown(t = this._element) {
    return t.hasAttribute(Sn);
  }
  _getConfig(t) {
    return t = {
      ...Fr,
      ...h.getDataAttributes(this._element),
      ...t
    }, t.toggle = !!t.toggle, t.parent = te(t.parent), D(On, t, vu), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...Ou,
      ...e,
      ...t
    }, D(On, t, Su), t;
  }
  _getDimension() {
    return this._element.hasAttribute(yu) ? wu : ku;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = d.find(jr, this._config.parent);
    d.find(Kr, this._config.parent).filter((e) => !t.includes(e)).forEach((e) => {
      const i = Jt(e);
      i && this._addAriaAndCollapsedClass([e], this._isShown(i));
    });
  }
  _addAriaAndCollapsedClass(t, e) {
    t.length && t.forEach((i) => {
      e ? i.removeAttribute(Yr) : i.setAttribute(`${Yr}`, ""), i.setAttribute("aria-expanded", e);
    });
  }
  static jQueryInterface(t) {
    return this.each(function() {
      const e = {};
      typeof t == "string" && /show|hide/.test(t) && (e.toggle = false);
      const i = Zt.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t]();
      }
    });
  }
}
var zr = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
var Ur = ".sticky-top";

class qe {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", (e) => e + t), this._setElementAttributes(zr, "paddingRight", (e) => e + t), this._setElementAttributes(Ur, "marginRight", (e) => e - t);
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t, e, i) {
    const n = this.getWidth(), o = (r) => {
      if (r !== this._element && window.innerWidth > r.clientWidth + n)
        return;
      this._saveInitialAttribute(r, e);
      const a = window.getComputedStyle(r)[e];
      r.style[e] = `${i(Number.parseFloat(a))}px`;
    };
    this._applyManipulationCallback(t, o);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(zr, "paddingRight"), this._resetElementAttributes(Ur, "marginRight");
  }
  _saveInitialAttribute(t, e) {
    const i = t.style[e];
    i && h.setDataAttribute(t, e, i);
  }
  _resetElementAttributes(t, e) {
    const i = (n) => {
      const o = h.getDataAttribute(n, e);
      typeof o > "u" ? n.style.removeProperty(e) : (h.removeDataAttribute(n, e), n.style[e] = o);
    };
    this._applyManipulationCallback(t, i);
  }
  _applyManipulationCallback(t, e) {
    je(t) ? e(t) : d.find(t, this._element).forEach(e);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
}
var Iu = {
  isVisible: true,
  isAnimated: false,
  rootElement: "body",
  clickCallback: null,
  backdropClasses: null
};
var Du = {
  isVisible: "boolean",
  isAnimated: "boolean",
  rootElement: "(element|string)",
  clickCallback: "(function|null)",
  backdropClasses: "(array|null)"
};
var $c = "backdrop";
var Xr = `mousedown.te.${$c}`;

class hr {
  constructor(t) {
    this._config = this._getConfig(t), this._isAppended = false, this._element = null;
  }
  show(t) {
    if (!this._config.isVisible) {
      me(t);
      return;
    }
    this._append(), this._config.isAnimated && Je(this._getElement());
    const e = this._config.backdropClasses || [
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
    h.removeClass(this._getElement(), "opacity-0"), h.addClass(this._getElement(), e), this._element.setAttribute("data-te-backdrop-show", ""), this._emulateAnimation(() => {
      me(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      me(t);
      return;
    }
    this._element.removeAttribute("data-te-backdrop-show"), this._getElement().classList.add("opacity-0"), this._getElement().classList.remove("opacity-50"), this._emulateAnimation(() => {
      this.dispose(), me(t);
    });
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add("opacity-50"), this._element = t;
    }
    return this._element;
  }
  _getConfig(t) {
    return t = {
      ...Iu,
      ...typeof t == "object" ? t : {}
    }, t.rootElement = te(t.rootElement), D($c, t, Du), t;
  }
  _append() {
    this._isAppended || (this._config.rootElement.append(this._getElement()), c.on(this._getElement(), Xr, () => {
      me(this._config.clickCallback);
    }), this._isAppended = true);
  }
  dispose() {
    this._isAppended && (c.off(this._element, Xr), this._element.remove(), this._isAppended = false);
  }
  _emulateAnimation(t) {
    Ql(t, this._getElement(), this._config.isAnimated);
  }
}

class Wi {
  constructor(t, e = {}, i) {
    this._element = t, this._toggler = i, this._event = e.event || "blur", this._condition = e.condition || (() => true), this._selector = e.selector || 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])', this._onlyVisible = e.onlyVisible || false, this._focusableElements = [], this._firstElement = null, this._lastElement = null, this.handler = (n) => {
      this._condition(n) && !n.shiftKey && n.target === this._lastElement ? (n.preventDefault(), this._firstElement.focus()) : this._condition(n) && n.shiftKey && n.target === this._firstElement && (n.preventDefault(), this._lastElement.focus());
    };
  }
  trap() {
    this._setElements(), this._init(), this._setFocusTrap();
  }
  disable() {
    this._focusableElements.forEach((t) => {
      t.removeEventListener(this._event, this.handler);
    }), this._toggler && this._toggler.focus();
  }
  update() {
    this._setElements(), this._setFocusTrap();
  }
  _init() {
    const t = (e) => {
      !this._firstElement || e.key !== "Tab" || this._focusableElements.includes(e.target) || (e.preventDefault(), this._firstElement.focus(), window.removeEventListener("keydown", t));
    };
    window.addEventListener("keydown", t);
  }
  _filterVisible(t) {
    return t.filter((e) => {
      if (!Nt(e))
        return false;
      const i = d.parents(e, "*");
      for (let n = 0;n < i.length; n++) {
        const o = window.getComputedStyle(i[n]);
        if (o && (o.display === "none" || o.visibility === "hidden"))
          return false;
      }
      return true;
    });
  }
  _setElements() {
    this._focusableElements = d.focusableChildren(this._element), this._onlyVisible && (this._focusableElements = this._filterVisible(this._focusableElements)), this._firstElement = this._focusableElements[0], this._lastElement = this._focusableElements[this._focusableElements.length - 1];
  }
  _setFocusTrap() {
    this._focusableElements.forEach((t, e) => {
      e === this._focusableElements.length - 1 || e === 0 ? t.addEventListener(this._event, this.handler) : t.removeEventListener(this._event, this.handler);
    });
  }
}
var $u = "te.offcanvas";
var ei = `.${$u}`;
var Lu = ".data-api";
var Nu = `load${ei}${Lu}`;
var Bu = `show${ei}`;
var Hu = `shown${ei}`;
var Vu = `hide${ei}`;
var Wu = `hidden${ei}`;
var Fu = `keydown.dismiss${ei}`;
var Yu = "te.alert";
var Lc = `.${Yu}`;
var ju = `close${Lc}`;
var Ku = `closed${Lc}`;
var Dn = "carousel";
var Gu = "te.carousel";
var _t = `.${Gu}`;
var Nc = ".data-api";
var qu = "ArrowLeft";
var Zu = "ArrowRight";
var Qu = 500;
var Ju = 40;
var ta = {
  interval: 5000,
  keyboard: true,
  ride: false,
  pause: "hover",
  wrap: true,
  touch: true
};
var tp = {
  interval: "(number|boolean)",
  keyboard: "boolean",
  ride: "(boolean|string)",
  pause: "(string|boolean)",
  wrap: "boolean",
  touch: "boolean"
};
var ep = {
  pointer: "touch-pan-y",
  block: "!block",
  visible: "data-[te-carousel-fade]:opacity-100 data-[te-carousel-fade]:z-[1]",
  invisible: "data-[te-carousel-fade]:z-0 data-[te-carousel-fade]:opacity-0 data-[te-carousel-fade]:duration-[600ms] data-[te-carousel-fade]:delay-600",
  slideRight: "translate-x-full",
  slideLeft: "-translate-x-full"
};
var ip = {
  pointer: "string",
  block: "string",
  visible: "string",
  invisible: "string",
  slideRight: "string",
  slideLeft: "string"
};
var le = "next";
var ce = "prev";
var _e = "left";
var mi = "right";
var sp = {
  [qu]: mi,
  [Zu]: _e
};
var np = `slide${_t}`;
var $n = `slid${_t}`;
var op = `keydown${_t}`;
var rp = `mouseenter${_t}`;
var ap = `mouseleave${_t}`;
var lp = `touchstart${_t}`;
var cp = `touchmove${_t}`;
var hp = `touchend${_t}`;
var dp = `pointerdown${_t}`;
var up = `pointerup${_t}`;
var pp = `dragstart${_t}`;
var _p = `load${_t}${Nc}`;
var fp = `click${_t}${Nc}`;
var ea = "data-te-carousel-init";
var he = "data-te-carousel-active";
var mp = "data-te-carousel-item-end";
var Ln = "data-te-carousel-item-start";
var gp = "data-te-carousel-item-next";
var bp = "data-te-carousel-item-prev";
var vp = "data-te-carousel-pointer-event";
var Tp = "[data-te-carousel-init]";
var Mc = "[data-te-carousel-active]";
var dr = "[data-te-carousel-item]";
var we = `${Mc}${dr}`;
var Ep = `${dr} img`;
var Cp = "[data-te-carousel-item-next], [data-te-carousel-item-prev]";
var Ap = "[data-te-carousel-indicators]";
var yp = "[data-te-target]";
var wp = "[data-te-slide], [data-te-slide-to]";
var kp = "touch";
var xp = "pen";

class Ut extends gt {
  constructor(t, e, i) {
    super(t), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = false, this._isSliding = false, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._classes = this._getClasses(i), this._indicatorsElement = d.findOne(Ap, this._element), this._touchSupported = ("ontouchstart" in document.documentElement) || navigator.maxTouchPoints > 0, this._pointerEvent = !!window.PointerEvent, this._setActiveElementClass(), this._addEventListeners(), this._didInit = false, this._init(), this._config.ride === "carousel" && this.cycle();
  }
  static get Default() {
    return ta;
  }
  static get NAME() {
    return Dn;
  }
  next() {
    this._slide(le);
  }
  nextWhenVisible() {
    !document.hidden && Nt(this._element) && this.next();
  }
  prev() {
    this._slide(ce);
  }
  pause(t) {
    t || (this._isPaused = true), d.findOne(Cp, this._element) && (Xl(this._element), this.cycle(true)), clearInterval(this._interval), this._interval = null;
  }
  cycle(t) {
    t || (this._isPaused = false), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
  }
  to(t) {
    this._activeElement = d.findOne(we, this._element);
    const e = this._getItemIndex(this._activeElement);
    if (t > this._items.length - 1 || t < 0)
      return;
    if (this._isSliding) {
      c.one(this._element, $n, () => this.to(t));
      return;
    }
    if (e === t) {
      this.pause(), this.cycle();
      return;
    }
    const i = t > e ? le : ce;
    this._slide(i, this._items[t]);
  }
  _init() {
    this._didInit || (c.on(document, fp, wp, Ut.dataApiClickHandler), c.on(window, _p, () => {
      const t = d.find(Tp);
      for (let e = 0, i = t.length;e < i; e++)
        Ut.carouselInterface(t[e], Ut.getInstance(t[e]));
    }), this._didInit = true);
  }
  _getConfig(t) {
    return t = {
      ...ta,
      ...h.getDataAttributes(this._element),
      ...typeof t == "object" ? t : {}
    }, D(Dn, t, tp), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...ep,
      ...e,
      ...t
    }, D(Dn, t, ip), t;
  }
  _enableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        c.one(this._element, $n, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  _applyInitialClasses() {
    const t = d.findOne(we, this._element);
    t.classList.add(this._classes.block, ...this._classes.visible.split(" ")), this._setActiveIndicatorElement(t);
  }
  _handleSwipe() {
    const t = Math.abs(this.touchDeltaX);
    if (t <= Ju)
      return;
    const e = t / this.touchDeltaX;
    this.touchDeltaX = 0, e && this._slide(e > 0 ? mi : _e);
  }
  _setActiveElementClass() {
    this._activeElement = d.findOne(we, this._element), h.addClass(this._activeElement, "hidden");
  }
  _addEventListeners() {
    this._config.keyboard && c.on(this._element, op, (t) => this._keydown(t)), this._config.pause === "hover" && (c.on(this._element, rp, (t) => this.pause(t)), c.on(this._element, ap, (t) => this._enableCycle(t))), this._config.touch && this._touchSupported && this._addTouchEventListeners(), this._applyInitialClasses();
  }
  _addTouchEventListeners() {
    const t = (o) => this._pointerEvent && (o.pointerType === xp || o.pointerType === kp), e = (o) => {
      t(o) ? this.touchStartX = o.clientX : this._pointerEvent || (this.touchStartX = o.touches[0].clientX);
    }, i = (o) => {
      this.touchDeltaX = o.touches && o.touches.length > 1 ? 0 : o.touches[0].clientX - this.touchStartX;
    }, n = (o) => {
      t(o) && (this.touchDeltaX = o.clientX - this.touchStartX), this._handleSwipe(), this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((r) => this._enableCycle(r), Qu + this._config.interval));
    };
    d.find(Ep, this._element).forEach((o) => {
      c.on(o, pp, (r) => r.preventDefault());
    }), this._pointerEvent ? (c.on(this._element, dp, (o) => e(o)), c.on(this._element, up, (o) => n(o)), this._element.classList.add(this._classes.pointer), this._element.setAttribute(`${vp}`, "")) : (c.on(this._element, lp, (o) => e(o)), c.on(this._element, cp, (o) => i(o)), c.on(this._element, hp, (o) => n(o)));
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = sp[t.key];
    e && (t.preventDefault(), this._slide(e));
  }
  _getItemIndex(t) {
    return this._items = t && t.parentNode ? d.find(dr, t.parentNode) : [], this._items.indexOf(t);
  }
  _getItemByOrder(t, e) {
    const i = t === le;
    return Jl(this._items, e, i, this._config.wrap);
  }
  _triggerSlideEvent(t, e) {
    const i = this._getItemIndex(t), n = this._getItemIndex(d.findOne(we, this._element));
    return c.trigger(this._element, np, {
      relatedTarget: t,
      direction: e,
      from: n,
      to: i
    });
  }
  _setActiveIndicatorElement(t) {
    if (this._indicatorsElement) {
      const e = d.findOne(Mc, this._indicatorsElement);
      e.removeAttribute(he), e.removeAttribute("aria-current"), e.classList.remove("!opacity-100");
      const i = d.find(yp, this._indicatorsElement);
      for (let n = 0;n < i.length; n++)
        if (Number.parseInt(i[n].getAttribute("data-te-slide-to"), 10) === this._getItemIndex(t)) {
          i[n].setAttribute(`${he}`, ""), i[n].setAttribute("aria-current", "true"), i[n].classList.add("!opacity-100");
          break;
        }
    }
  }
  _updateInterval() {
    const t = this._activeElement || d.findOne(we, this._element);
    if (!t)
      return;
    const e = Number.parseInt(t.getAttribute("data-te-interval"), 10);
    e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval;
  }
  _slide(t, e) {
    const i = this._directionToOrder(t), n = d.findOne(we, this._element), o = this._getItemIndex(n), r = e || this._getItemByOrder(i, n), a = this._getItemIndex(r), l = !!this._interval, p = i === le, u = p ? Ln : mp, _ = p ? gp : bp, f = this._orderToDirection(i), g = u === Ln ? this._classes.slideLeft : this._classes.slideRight, m = u !== Ln ? this._classes.slideLeft : this._classes.slideRight;
    if (r && r.hasAttribute(he)) {
      this._isSliding = false;
      return;
    }
    if (this._isSliding || this._triggerSlideEvent(r, f).defaultPrevented || !n || !r)
      return;
    this._isSliding = true, l && this.pause(), this._setActiveIndicatorElement(r), this._activeElement = r;
    const v = () => {
      c.trigger(this._element, $n, {
        relatedTarget: r,
        direction: f,
        from: o,
        to: a
      });
    };
    if (this._element.hasAttribute(ea)) {
      r.setAttribute(`${_}`, ""), r.classList.add(this._classes.block, m), Je(r), n.setAttribute(`${u}`, ""), n.classList.add(g, ...this._classes.invisible.split(" ")), n.classList.remove(...this._classes.visible.split(" ")), r.setAttribute(`${u}`, ""), r.classList.add(...this._classes.visible.split(" ")), r.classList.remove(this._classes.slideRight, this._classes.slideLeft);
      const C = () => {
        r.removeAttribute(u), r.removeAttribute(_), r.setAttribute(`${he}`, ""), n.removeAttribute(he), n.classList.remove(g, ...this._classes.invisible.split(" "), this._classes.block), n.removeAttribute(_), n.removeAttribute(u), this._isSliding = false, setTimeout(v, 0);
      };
      this._queueCallback(C, n, true);
    } else
      n.removeAttribute(he), n.classList.remove(this._classes.block), r.setAttribute(`${he}`, ""), r.classList.add(this._classes.block), this._isSliding = false, v();
    l && this.cycle();
  }
  _directionToOrder(t) {
    return [mi, _e].includes(t) ? F() ? t === _e ? ce : le : t === _e ? le : ce : t;
  }
  _orderToDirection(t) {
    return [le, ce].includes(t) ? F() ? t === ce ? _e : mi : t === ce ? mi : _e : t;
  }
  static carouselInterface(t, e) {
    const i = Ut.getOrCreateInstance(t, e);
    let { _config: n } = i;
    typeof e == "object" && (n = {
      ...n,
      ...e
    });
    const o = typeof e == "string" ? e : e.slide;
    if (typeof e == "number") {
      i.to(e);
      return;
    }
    if (typeof o == "string") {
      if (typeof i[o] > "u")
        throw new TypeError(`No method named "${o}"`);
      i[o]();
    } else
      n.interval && n.ride === true && i.pause();
  }
  static jQueryInterface(t) {
    return this.each(function() {
      Ut.carouselInterface(this, t);
    });
  }
  static dataApiClickHandler(t) {
    const e = Jt(this);
    if (!e || !e.hasAttribute(ea))
      return;
    const i = {
      ...h.getDataAttributes(e),
      ...h.getDataAttributes(this)
    }, n = this.getAttribute("data-te-slide-to");
    n && (i.interval = false), Ut.carouselInterface(e, i), n && Ut.getInstance(e).to(n), t.preventDefault();
  }
}
var Op = "te.modal";
var At = `.${Op}`;
var $p = `hide${At}`;
var Lp = `hidePrevented${At}`;
var Np = `hidden${At}`;
var Mp = `show${At}`;
var Rp = `shown${At}`;
var na = `resize${At}`;
var oa = `click.dismiss${At}`;
var ra = `keydown.dismiss${At}`;
var Pp = `mouseup.dismiss${At}`;
var aa = `mousedown.dismiss${At}`;
var Hp = new Set([
  "background",
  "cite",
  "href",
  "itemtype",
  "longdesc",
  "poster",
  "src",
  "xlink:href"
]);
var Vp = /^aria-[\w-]*$/i;
var Wp = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
var Fp = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
var Yp = (s, t) => {
  const e = s.nodeName.toLowerCase();
  if (t.includes(e))
    return Hp.has(e) ? !!(Wp.test(s.nodeValue) || Fp.test(s.nodeValue)) : true;
  const i = t.filter((n) => n instanceof RegExp);
  for (let n = 0, o = i.length;n < o; n++)
    if (i[n].test(e))
      return true;
  return false;
};
var jp = {
  "*": ["class", "dir", "id", "lang", "role", Vp],
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
var da = "tooltip";
var Kp = "te.tooltip";
var wt = `.${Kp}`;
var zp = "te-tooltip";
var Up = new Set(["sanitize", "allowList", "sanitizeFn"]);
var Xp = {
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
var Gp = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: F() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: F() ? "right" : "left"
};
var qp = {
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
  allowList: jp,
  popperConfig: { hide: true }
};
var Zp = {
  HIDE: `hide${wt}`,
  HIDDEN: `hidden${wt}`,
  SHOW: `show${wt}`,
  SHOWN: `shown${wt}`,
  INSERTED: `inserted${wt}`,
  CLICK: `click${wt}`,
  FOCUSIN: `focusin${wt}`,
  FOCUSOUT: `focusout${wt}`,
  MOUSEENTER: `mouseenter${wt}`,
  MOUSELEAVE: `mouseleave${wt}`
};
var Qp = "fade";
var Jp = "modal";
var Mn = "show";
var ci = "show";
var Rn = "out";
var ua = ".tooltip-inner";
var pa = `.${Jp}`;
var _a = "hide.te.modal";
var hi = "hover";
var Pn = "focus";
var t_ = "click";
var e_ = "manual";

class ii extends gt {
  constructor(t, e) {
    if (typeof Ic > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t), this._isEnabled = true, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(e), this.tip = null, this._setListeners();
  }
  static get Default() {
    return qp;
  }
  static get NAME() {
    return da;
  }
  static get Event() {
    return Zp;
  }
  static get DefaultType() {
    return Xp;
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
  toggle(t) {
    if (this._isEnabled)
      if (t) {
        const e = this._initializeOnDelegatedTarget(t);
        e._activeTrigger.click = !e._activeTrigger.click, e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
      } else {
        if (this.getTipElement().classList.contains(Mn)) {
          this._leave(null, this);
          return;
        }
        this._enter(null, this);
      }
  }
  dispose() {
    clearTimeout(this._timeout), c.off(this._element.closest(pa), _a, this._hideModalHandler), this.tip && this.tip.remove(), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this.isWithContent() && this._isEnabled))
      return;
    const t = c.trigger(this._element, this.constructor.Event.SHOW), e = Gl(this._element), i = e === null ? this._element.ownerDocument.documentElement.contains(this._element) : e.contains(this._element);
    if (t.defaultPrevented || !i)
      return;
    this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(ua).innerHTML && (this._disposePopper(), this.tip.remove(), this.tip = null);
    const n = this.getTipElement(), o = rt(this.constructor.NAME);
    n.setAttribute("id", o), this._element.setAttribute("aria-describedby", o), this._config.animation && setTimeout(() => {
      this.tip.classList.add("opacity-100"), this.tip.classList.remove("opacity-0");
    }, 100);
    const r = typeof this._config.placement == "function" ? this._config.placement.call(this, n, this._element) : this._config.placement, a = this._getAttachment(r);
    this._addAttachmentClass(a);
    const { container: l } = this._config;
    if (y.setData(n, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (l.append(n), c.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = Ce(this._element, n, this._getPopperConfig(a)), n.getAttribute("id").includes("tooltip"))
      switch (r) {
        case "bottom":
          n.classList.add("py-[0.4rem]");
          break;
        case "left":
          n.classList.add("px-[0.4rem]");
          break;
        case "right":
          n.classList.add("px-[0.4rem]");
          break;
        default:
          n.classList.add("py-[0.4rem]");
          break;
      }
    const u = this._resolvePossibleFunction(this._config.customClass);
    u && n.classList.add(...u.split(" ")), ("ontouchstart" in document.documentElement) && [].concat(...document.body.children).forEach((g) => {
      c.on(g, "mouseover", tn);
    });
    const _ = () => {
      const g = this._hoverState;
      this._hoverState = null, c.trigger(this._element, this.constructor.Event.SHOWN), g === Rn && this._leave(null, this);
    }, f = this.tip.classList.contains("transition-opacity");
    this._queueCallback(_, this.tip, f);
  }
  hide() {
    if (!this._popper)
      return;
    const t = this.getTipElement(), e = () => {
      this._isWithActiveTrigger() || (this._hoverState !== ci && t.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), c.trigger(this._element, this.constructor.Event.HIDDEN), this._disposePopper());
    };
    if (c.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented)
      return;
    t.classList.add("opacity-0"), t.classList.remove("opacity-100"), ("ontouchstart" in document.documentElement) && [].concat(...document.body.children).forEach((o) => c.off(o, "mouseover", tn)), this._activeTrigger[t_] = false, this._activeTrigger[Pn] = false, this._activeTrigger[hi] = false;
    const n = this.tip.classList.contains("opacity-0");
    this._queueCallback(e, this.tip, n), this._hoverState = "";
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
    const t = document.createElement("div");
    t.innerHTML = this._config.template;
    const e = t.children[0];
    return this.setContent(e), e.classList.remove(Qp, Mn), this.tip = e, this.tip;
  }
  setContent(t) {
    this._sanitizeAndSetContent(t, this.getTitle(), ua);
  }
  _sanitizeAndSetContent(t, e, i) {
    const n = d.findOne(i, t);
    if (!e && n) {
      n.remove();
      return;
    }
    this.setElementContent(n, e);
  }
  setElementContent(t, e) {
    if (t !== null) {
      if (je(e)) {
        e = te(e), this._config.html ? e.parentNode !== t && (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent;
        return;
      }
      this._config.html ? (this._config.sanitize && (e = ha(e, this._config.allowList, this._config.sanitizeFn)), t.innerHTML = e) : t.textContent = e;
    }
  }
  getTitle() {
    const t = this._element.getAttribute("data-te-original-title") || this._config.title;
    return this._resolvePossibleFunction(t);
  }
  updateAttachment(t) {
    return t === "right" ? "end" : t === "left" ? "start" : t;
  }
  _initializeOnDelegatedTarget(t, e) {
    return e || this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string" ? t.split(",").map((e) => Number.parseInt(e, 10)) : typeof t == "function" ? (e) => t(e, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return typeof t == "function" ? t.call(this._element) : t;
  }
  _getPopperConfig(t) {
    const e = {
      placement: t,
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
          fn: (i) => this._handlePopperPlacementChange(i)
        }
      ],
      onFirstUpdate: (i) => {
        i.options.placement !== i.placement && this._handlePopperPlacementChange(i);
      }
    };
    return {
      ...e,
      ...typeof this._config.popperConfig == "function" ? this._config.popperConfig(e) : this._config.popperConfig
    };
  }
  _addAttachmentClass(t) {
    this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t)}`);
  }
  _getAttachment(t) {
    return Gp[t.toUpperCase()];
  }
  _setListeners() {
    this._config.trigger.split(" ").forEach((e) => {
      if (e === "click")
        c.on(this._element, this.constructor.Event.CLICK, this._config.selector, (i) => this.toggle(i));
      else if (e !== e_) {
        const i = e === hi ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN, n = e === hi ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        c.on(this._element, i, this._config.selector, (o) => this._enter(o)), c.on(this._element, n, this._config.selector, (o) => this._leave(o));
      }
    }), this._hideModalHandler = () => {
      this._element && this.hide();
    }, c.on(this._element.closest(pa), _a, this._hideModalHandler), this._config.selector ? this._config = {
      ...this._config,
      trigger: "manual",
      selector: ""
    } : this._fixTitle();
  }
  _fixTitle() {
    const t = this._element.getAttribute("title"), e = typeof this._element.getAttribute("data-te-original-title");
    (t || e !== "string") && (this._element.setAttribute("data-te-original-title", t || ""), t && !this._element.getAttribute("aria-label") && !this._element.textContent && this._element.setAttribute("aria-label", t), this._element.setAttribute("title", ""));
  }
  _enter(t, e) {
    if (e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger[t.type === "focusin" ? Pn : hi] = true), e.getTipElement().classList.contains(Mn) || e._hoverState === ci) {
      e._hoverState = ci;
      return;
    }
    if (clearTimeout(e._timeout), e._hoverState = ci, !e._config.delay || !e._config.delay.show) {
      e.show();
      return;
    }
    e._timeout = setTimeout(() => {
      e._hoverState === ci && e.show();
    }, e._config.delay.show);
  }
  _leave(t, e) {
    if (e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger[t.type === "focusout" ? Pn : hi] = e._element.contains(t.relatedTarget)), !e._isWithActiveTrigger()) {
      if (clearTimeout(e._timeout), e._hoverState = Rn, !e._config.delay || !e._config.delay.hide) {
        e.hide();
        return;
      }
      e._timeout = setTimeout(() => {
        e._hoverState === Rn && e.hide();
      }, e._config.delay.hide);
    }
  }
  _isWithActiveTrigger() {
    for (const t in this._activeTrigger)
      if (this._activeTrigger[t])
        return true;
    return false;
  }
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    return Object.keys(e).forEach((i) => {
      Up.has(i) && delete e[i];
    }), t = {
      ...this.constructor.Default,
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t.container = t.container === false ? document.body : te(t.container), typeof t.delay == "number" && (t.delay = {
      show: t.delay,
      hide: t.delay
    }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), D(da, t, this.constructor.DefaultType), t.sanitize && (t.template = ha(t.template, t.allowList, t.sanitizeFn)), t;
  }
  _getDelegateConfig() {
    const t = {};
    for (const e in this._config)
      this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
    return t;
  }
  _cleanTipClass() {
    const t = this.getTipElement(), e = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g"), i = t.getAttribute("class").match(e);
    i !== null && i.length > 0 && i.map((n) => n.trim()).forEach((n) => t.classList.remove(n));
  }
  _getBasicClassPrefix() {
    return zp;
  }
  _handlePopperPlacementChange(t) {
    const { state: e } = t;
    e && (this.tip = e.elements.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)));
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null);
  }
  static jQueryInterface(t) {
    return this.each(function() {
      const e = ii.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
var s_ = "te.popover";
var kt = `.${s_}`;
var o_ = {
  ...ii.Default,
  placement: "right",
  offset: [0, 8],
  trigger: "click",
  content: "",
  template: '<div class="opacity-0 transition-opacity duration-150 ease-in-out absolute top-0 left-0 z-[1070] block max-w-[267px] break-words bg-white bg-clip-padding border border-neutral-100 rounded-lg shadow-[0_0px_3px_0_rgba(0,0,0,0.07),0_2px_2px_0_rgba(0,0,0,0.04)] text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal dark:bg-neutral-700 dark:border-0 dark:text-white data-[popper-reference-hidden]:hidden" role="tooltip"><h3 class="popover-header py-2 px-4 mb-0 border-b-2 border-neutral-100 rounded-t-lg font-medium empty:hidden dark:border-neutral-500"></h3><div class="popover-body p-4 text-[#212529] dark:text-white"></div></div>'
};
var r_ = {
  ...ii.DefaultType,
  content: "(string|element|function)"
};
var a_ = {
  HIDE: `hide${kt}`,
  HIDDEN: `hidden${kt}`,
  SHOW: `show${kt}`,
  SHOWN: `shown${kt}`,
  INSERTED: `inserted${kt}`,
  CLICK: `click${kt}`,
  FOCUSIN: `focusin${kt}`,
  FOCUSOUT: `focusout${kt}`,
  MOUSEENTER: `mouseenter${kt}`,
  MOUSELEAVE: `mouseleave${kt}`
};
var h_ = "te.scrollspy";
var ur = `.${h_}`;
var __ = `activate${ur}`;
var f_ = `scroll${ur}`;
var Pc = "[data-te-dropdown-item-ref]";
var Mo = "[data-te-nav-link-ref]";
var Bc = "[data-te-list-group-item-ref]";
var Vn = `${Mo}, ${Bc}, ${Pc}`;
var E_ = "te.tab";
var hn = `.${E_}`;
var C_ = `hide${hn}`;
var A_ = `hidden${hn}`;
var y_ = `show${hn}`;
var w_ = `shown${hn}`;
var Le = "data-te-tab-active";
var Hs = "data-te-nav-active";
var ba = `[${Le}]`;
var S_ = `[${Hs}]`;
var N_ = "te.toast";
var ie = `.${N_}`;
var M_ = `mouseover${ie}`;
var R_ = `mouseout${ie}`;
var P_ = `focusin${ie}`;
var B_ = `focusout${ie}`;
var H_ = `hide${ie}`;
var V_ = `hidden${ie}`;
var W_ = `show${ie}`;
var F_ = `shown${ie}`;
(() => {
  var s = { 454: (i, n, o) => {
    o.d(n, { Z: () => l });
    var r = o(645), a = o.n(r)()(function(p) {
      return p[1];
    });
    a.push([i.id, "INPUT:-webkit-autofill,SELECT:-webkit-autofill,TEXTAREA:-webkit-autofill{animation-name:onautofillstart}INPUT:not(:-webkit-autofill),SELECT:not(:-webkit-autofill),TEXTAREA:not(:-webkit-autofill){animation-name:onautofillcancel}@keyframes onautofillstart{}@keyframes onautofillcancel{}", ""]);
    const l = a;
  }, 645: (i) => {
    i.exports = function(n) {
      var o = [];
      return o.toString = function() {
        return this.map(function(r) {
          var a = n(r);
          return r[2] ? "@media ".concat(r[2], " {").concat(a, "}") : a;
        }).join("");
      }, o.i = function(r, a, l) {
        typeof r == "string" && (r = [[null, r, ""]]);
        var p = {};
        if (l)
          for (var u = 0;u < this.length; u++) {
            var _ = this[u][0];
            _ != null && (p[_] = true);
          }
        for (var f = 0;f < r.length; f++) {
          var g = [].concat(r[f]);
          l && p[g[0]] || (a && (g[2] ? g[2] = "".concat(a, " and ").concat(g[2]) : g[2] = a), o.push(g));
        }
      }, o;
    };
  }, 810: () => {
    (function() {
      if (typeof window < "u")
        try {
          var i = new window.CustomEvent("test", { cancelable: true });
          if (i.preventDefault(), i.defaultPrevented !== true)
            throw new Error("Could not prevent default");
        } catch {
          var n = function(r, a) {
            var l, p;
            return (a = a || {}).bubbles = !!a.bubbles, a.cancelable = !!a.cancelable, (l = document.createEvent("CustomEvent")).initCustomEvent(r, a.bubbles, a.cancelable, a.detail), p = l.preventDefault, l.preventDefault = function() {
              p.call(this);
              try {
                Object.defineProperty(this, "defaultPrevented", { get: function() {
                  return true;
                } });
              } catch {
                this.defaultPrevented = true;
              }
            }, l;
          };
          n.prototype = window.Event.prototype, window.CustomEvent = n;
        }
    })();
  }, 379: (i, n, o) => {
    var r, a = function() {
      var E = {};
      return function(T) {
        if (E[T] === undefined) {
          var A = document.querySelector(T);
          if (window.HTMLIFrameElement && A instanceof window.HTMLIFrameElement)
            try {
              A = A.contentDocument.head;
            } catch {
              A = null;
            }
          E[T] = A;
        }
        return E[T];
      };
    }(), l = [];
    function p(E) {
      for (var T = -1, A = 0;A < l.length; A++)
        if (l[A].identifier === E) {
          T = A;
          break;
        }
      return T;
    }
    function u(E, T) {
      for (var A = {}, k = [], I = 0;I < E.length; I++) {
        var O = E[I], x = T.base ? O[0] + T.base : O[0], L = A[x] || 0, S = "".concat(x, " ").concat(L);
        A[x] = L + 1;
        var N = p(S), P = { css: O[1], media: O[2], sourceMap: O[3] };
        N !== -1 ? (l[N].references++, l[N].updater(P)) : l.push({ identifier: S, updater: w(P, T), references: 1 }), k.push(S);
      }
      return k;
    }
    function _(E) {
      var T = document.createElement("style"), A = E.attributes || {};
      if (A.nonce === undefined) {
        var k = o.nc;
        k && (A.nonce = k);
      }
      if (Object.keys(A).forEach(function(O) {
        T.setAttribute(O, A[O]);
      }), typeof E.insert == "function")
        E.insert(T);
      else {
        var I = a(E.insert || "head");
        if (!I)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        I.appendChild(T);
      }
      return T;
    }
    var f, g = (f = [], function(E, T) {
      return f[E] = T, f.filter(Boolean).join(`
`);
    });
    function m(E, T, A, k) {
      var I = A ? "" : k.media ? "@media ".concat(k.media, " {").concat(k.css, "}") : k.css;
      if (E.styleSheet)
        E.styleSheet.cssText = g(T, I);
      else {
        var O = document.createTextNode(I), x = E.childNodes;
        x[T] && E.removeChild(x[T]), x.length ? E.insertBefore(O, x[T]) : E.appendChild(O);
      }
    }
    function b(E, T, A) {
      var { css: k, media: I, sourceMap: O } = A;
      if (I ? E.setAttribute("media", I) : E.removeAttribute("media"), O && typeof btoa < "u" && (k += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(O)))), " */")), E.styleSheet)
        E.styleSheet.cssText = k;
      else {
        for (;E.firstChild; )
          E.removeChild(E.firstChild);
        E.appendChild(document.createTextNode(k));
      }
    }
    var v = null, C = 0;
    function w(E, T) {
      var A, k, I;
      if (T.singleton) {
        var O = C++;
        A = v || (v = _(T)), k = m.bind(null, A, O, false), I = m.bind(null, A, O, true);
      } else
        A = _(T), k = b.bind(null, A, T), I = function() {
          (function(x) {
            if (x.parentNode === null)
              return false;
            x.parentNode.removeChild(x);
          })(A);
        };
      return k(E), function(x) {
        if (x) {
          if (x.css === E.css && x.media === E.media && x.sourceMap === E.sourceMap)
            return;
          k(E = x);
        } else
          I();
      };
    }
    i.exports = function(E, T) {
      (T = T || {}).singleton || typeof T.singleton == "boolean" || (T.singleton = (r === undefined && (r = !!(window && document && document.all && !window.atob)), r));
      var A = u(E = E || [], T);
      return function(k) {
        if (k = k || [], Object.prototype.toString.call(k) === "[object Array]") {
          for (var I = 0;I < A.length; I++) {
            var O = p(A[I]);
            l[O].references--;
          }
          for (var x = u(k, T), L = 0;L < A.length; L++) {
            var S = p(A[L]);
            l[S].references === 0 && (l[S].updater(), l.splice(S, 1));
          }
          A = x;
        }
      };
    };
  } }, t = {};
  function e(i) {
    var n = t[i];
    if (n !== undefined)
      return n.exports;
    var o = t[i] = { id: i, exports: {} };
    return s[i](o, o.exports, e), o.exports;
  }
  e.n = (i) => {
    var n = i && i.__esModule ? () => i.default : () => i;
    return e.d(n, { a: n }), n;
  }, e.d = (i, n) => {
    for (var o in n)
      e.o(n, o) && !e.o(i, o) && Object.defineProperty(i, o, { enumerable: true, get: n[o] });
  }, e.o = (i, n) => Object.prototype.hasOwnProperty.call(i, n), (() => {
    var i = e(379), n = e.n(i), o = e(454);
    function r(l) {
      if (!l.hasAttribute("autocompleted")) {
        l.setAttribute("autocompleted", "");
        var p = new window.CustomEvent("onautocomplete", { bubbles: true, cancelable: true, detail: null });
        l.dispatchEvent(p) || (l.value = "");
      }
    }
    function a(l) {
      l.hasAttribute("autocompleted") && (l.removeAttribute("autocompleted"), l.dispatchEvent(new window.CustomEvent("onautocomplete", { bubbles: true, cancelable: false, detail: null })));
    }
    n()(o.Z, { insert: "head", singleton: false }), o.Z.locals, e(810), document.addEventListener("animationstart", function(l) {
      l.animationName === "onautofillstart" ? r(l.target) : a(l.target);
    }, true), document.addEventListener("input", function(l) {
      l.inputType !== "insertReplacementText" && ("data" in l) ? a(l.target) : r(l.target);
    }, true);
  })();
})();
var Yn = "input";
var os = "te.input";
var Wc = "data-te-input-wrapper-init";
var Fc = "data-te-input-notch-ref";
var Yc = "data-te-input-notch-leading-ref";
var jc = "data-te-input-notch-middle-ref";
var z_ = "data-te-input-notch-trailing-ref";
var U_ = "data-te-input-helper-ref";
var X_ = "data-te-input-placeholder-active";
var Ft = "data-te-input-state-active";
var Ca = "data-te-input-focused";
var Aa = "data-te-input-form-counter";
var de = `[${Wc}] input`;
var ue = `[${Wc}] textarea`;
var ke = `[${Fc}]`;
var ya = `[${Yc}]`;
var wa = `[${jc}]`;
var G_ = `[${U_}]`;
var q_ = {
  inputFormWhite: false
};
var Z_ = {
  inputFormWhite: "(boolean)"
};
var Kc = {
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
var Q_ = {
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

class V {
  constructor(t, e, i) {
    this._config = this._getConfig(e, t), this._element = t, this._classes = this._getClasses(i), this._label = null, this._labelWidth = 0, this._labelMarginLeft = 0, this._notchLeading = null, this._notchMiddle = null, this._notchTrailing = null, this._initiated = false, this._helper = null, this._counter = false, this._counterElement = null, this._maxLength = 0, this._leadingIcon = null, this._element && (y.setData(t, os, this), this.init());
  }
  static get NAME() {
    return Yn;
  }
  get input() {
    return d.findOne("input", this._element) || d.findOne("textarea", this._element);
  }
  init() {
    this._initiated || (this._getLabelData(), this._applyDivs(), this._applyNotch(), this._activate(), this._getHelper(), this._getCounter(), this._getEvents(), this._initiated = true);
  }
  update() {
    this._getLabelData(), this._getNotchData(), this._applyNotch(), this._activate(), this._getHelper(), this._getCounter();
  }
  forceActive() {
    this.input.setAttribute(Ft, ""), d.findOne(ke, this.input.parentNode).setAttribute(Ft, "");
  }
  forceInactive() {
    this.input.removeAttribute(Ft), d.findOne(ke, this.input.parentNode).removeAttribute(Ft);
  }
  dispose() {
    this._removeBorder(), y.removeData(this._element, os), this._element = null;
  }
  _getConfig(t, e) {
    return t = {
      ...q_,
      ...h.getDataAttributes(e),
      ...typeof t == "object" ? t : {}
    }, D(Yn, t, Z_), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...Kc,
      ...e,
      ...t
    }, D(Yn, t, Q_), t;
  }
  _getLabelData() {
    this._label = d.findOne("label", this._element), this._label === null ? this._showPlaceholder() : (this._getLabelWidth(), this._getLabelPositionInInputGroup(), this._toggleDefaultDatePlaceholder());
  }
  _getHelper() {
    this._helper = d.findOne(G_, this._element);
  }
  _getCounter() {
    this._counter = h.getDataAttribute(this.input, "inputShowcounter"), this._counter && (this._maxLength = this.input.maxLength, this._showCounter());
  }
  _getEvents() {
    c.on(document, "focus", de, V.activate(new V)), c.on(document, "input", de, V.activate(new V)), c.on(document, "blur", de, V.deactivate(new V)), c.on(document, "focus", ue, V.activate(new V)), c.on(document, "input", ue, V.activate(new V)), c.on(document, "blur", ue, V.deactivate(new V)), c.on(window, "shown.te.modal", (t) => {
      d.find(de, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.update();
      }), d.find(ue, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.update();
      });
    }), c.on(window, "shown.te.dropdown", (t) => {
      const e = t.target.parentNode.querySelector("[data-te-dropdown-menu-ref]");
      e && (d.find(de, e).forEach((i) => {
        const n = V.getInstance(i.parentNode);
        n && n.update();
      }), d.find(ue, e).forEach((i) => {
        const n = V.getInstance(i.parentNode);
        n && n.update();
      }));
    }), c.on(window, "shown.te.tab", (t) => {
      let e;
      t.target.href ? e = t.target.href.split("#")[1] : e = h.getDataAttribute(t.target, "target").split("#")[1];
      const i = d.findOne(`#${e}`);
      d.find(de, i).forEach((n) => {
        const o = V.getInstance(n.parentNode);
        o && o.update();
      }), d.find(ue, i).forEach((n) => {
        const o = V.getInstance(n.parentNode);
        o && o.update();
      });
    }), c.on(window, "reset", (t) => {
      d.find(de, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.forceInactive();
      }), d.find(ue, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.forceInactive();
      });
    }), c.on(window, "onautocomplete", (t) => {
      const e = V.getInstance(t.target.parentNode);
      !e || !t.cancelable || e.forceActive();
    });
  }
  _showCounter() {
    if (d.find(`[${Aa}]`, this._element).length > 0)
      return;
    this._counterElement = document.createElement("div"), h.addClass(this._counterElement, this._classes.counter), this._counterElement.setAttribute(Aa, "");
    const e = this.input.value.length;
    this._counterElement.innerHTML = `${e} / ${this._maxLength}`, this._helper.appendChild(this._counterElement), this._bindCounter();
  }
  _bindCounter() {
    c.on(this.input, "input", () => {
      const t = this.input.value.length;
      this._counterElement.innerHTML = `${t} / ${this._maxLength}`;
    });
  }
  _toggleDefaultDatePlaceholder(t = this.input) {
    if (!(t.getAttribute("type") === "date"))
      return;
    !(document.activeElement === t) && !t.value ? t.style.opacity = 0 : t.style.opacity = 1;
  }
  _showPlaceholder() {
    this.input.setAttribute(X_, "");
  }
  _getNotchData() {
    this._notchMiddle = d.findOne(wa, this._element), this._notchLeading = d.findOne(ya, this._element);
  }
  _getLabelWidth() {
    this._labelWidth = this._label.clientWidth * 0.8 + 8;
  }
  _getLabelPositionInInputGroup() {
    if (this._labelMarginLeft = 0, !this._element.hasAttribute("data-te-input-group-ref"))
      return;
    const t = this.input, e = d.prev(t, "[data-te-input-group-text-ref]")[0];
    e === undefined ? this._labelMarginLeft = 0 : this._labelMarginLeft = e.offsetWidth - 1;
  }
  _applyDivs() {
    const t = this._config.inputFormWhite ? this._classes.notchLeadingWhite : this._classes.notchLeadingNormal, e = this._config.inputFormWhite ? this._classes.notchMiddleWhite : this._classes.notchMiddleNormal, i = this._config.inputFormWhite ? this._classes.notchTrailingWhite : this._classes.notchTrailingNormal, n = d.find(ke, this._element), o = $("div");
    h.addClass(o, this._classes.notch), o.setAttribute(Fc, ""), this._notchLeading = $("div"), h.addClass(this._notchLeading, `${this._classes.notchLeading} ${t}`), this._notchLeading.setAttribute(Yc, ""), this._notchMiddle = $("div"), h.addClass(this._notchMiddle, `${this._classes.notchMiddle} ${e}`), this._notchMiddle.setAttribute(jc, ""), this._notchTrailing = $("div"), h.addClass(this._notchTrailing, `${this._classes.notchTrailing} ${i}`), this._notchTrailing.setAttribute(z_, ""), !(n.length >= 1) && (o.append(this._notchLeading), o.append(this._notchMiddle), o.append(this._notchTrailing), this._element.append(o));
  }
  _applyNotch() {
    this._notchMiddle.style.width = `${this._labelWidth}px`, this._notchLeading.style.width = `${this._labelMarginLeft + 9}px`, this._label !== null && (this._label.style.marginLeft = `${this._labelMarginLeft}px`);
  }
  _removeBorder() {
    const t = d.findOne(ke, this._element);
    t && t.remove();
  }
  _activate(t) {
    Zl(() => {
      this._getElements(t);
      const e = t ? t.target : this.input, i = d.findOne(ke, this._element);
      t && t.type === "focus" && i && i.setAttribute(Ca, ""), e.value !== "" && (e.setAttribute(Ft, ""), i && i.setAttribute(Ft, "")), this._toggleDefaultDatePlaceholder(e);
    });
  }
  _getElements(t) {
    if (t && (this._element = t.target.parentNode, this._label = d.findOne("label", this._element)), t && this._label) {
      const e = this._labelWidth;
      this._getLabelData(), e !== this._labelWidth && (this._notchMiddle = d.findOne(wa, t.target.parentNode), this._notchLeading = d.findOne(ya, t.target.parentNode), this._applyNotch());
    }
  }
  _deactivate(t) {
    const e = t ? t.target : this.input, i = d.findOne(ke, e.parentNode);
    i.removeAttribute(Ca), e.value === "" && (e.removeAttribute(Ft), i.removeAttribute(Ft)), this._toggleDefaultDatePlaceholder(e);
  }
  static activate(t) {
    return function(e) {
      t._activate(e);
    };
  }
  static deactivate(t) {
    return function(e) {
      t._deactivate(e);
    };
  }
  static jQueryInterface(t, e) {
    return this.each(function() {
      let i = y.getData(this, os);
      const n = typeof t == "object" && t;
      if (!(!i && /dispose/.test(t)) && (i || (i = new V(this, n)), typeof t == "string")) {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
  static getInstance(t) {
    return y.getData(t, os);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var Kn = "ripple";
var rs = "te.ripple";
var ef = "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%";
var sf = ["[data-te-ripple-init]"];
var as = [0, 0, 0];
var nf = [
  { name: "primary", gradientColor: "#3B71CA" },
  { name: "secondary", gradientColor: "#9FA6B2" },
  { name: "success", gradientColor: "#14A44D" },
  { name: "danger", gradientColor: "#DC4C64" },
  { name: "warning", gradientColor: "#E4A11B" },
  { name: "info", gradientColor: "#54B4D3" },
  { name: "light", gradientColor: "#fbfbfb" },
  { name: "dark", gradientColor: "#262626" }
];
var xa = 0.5;
var of = {
  rippleCentered: false,
  rippleColor: "",
  rippleColorDark: "",
  rippleDuration: "500ms",
  rippleRadius: 0,
  rippleUnbound: false
};
var rf = {
  rippleCentered: "boolean",
  rippleColor: "string",
  rippleColorDark: "string",
  rippleDuration: "string",
  rippleRadius: "number",
  rippleUnbound: "boolean"
};
var af = {
  ripple: "relative overflow-hidden inline-block align-bottom",
  rippleWave: "rounded-[50%] opacity-50 pointer-events-none absolute touch-none scale-0 transition-[transform,_opacity] ease-[cubic-bezier(0,0,0.15,1),_cubic-bezier(0,0,0.15,1)] z-[999]",
  unbound: "overflow-visible"
};
var lf = {
  ripple: "string",
  rippleWave: "string",
  unbound: "string"
};

class Ze {
  constructor(t, e, i) {
    this._element = t, this._options = this._getConfig(e), this._classes = this._getClasses(i), this._element && (y.setData(t, rs, this), h.addClass(this._element, this._classes.ripple)), this._clickHandler = this._createRipple.bind(this), this._rippleTimer = null, this._isMinWidthSet = false, this._initialClasses = null, this.init();
  }
  static get NAME() {
    return Kn;
  }
  init() {
    this._addClickEvent(this._element);
  }
  dispose() {
    y.removeData(this._element, rs), c.off(this._element, "click", this._clickHandler), this._element = null, this._options = null;
  }
  _autoInit(t) {
    sf.forEach((e) => {
      d.closest(t.target, e) && (this._element = d.closest(t.target, e));
    }), this._element.style.minWidth || (h.style(this._element, {
      "min-width": getComputedStyle(this._element).width
    }), this._isMinWidthSet = true), this._options = this._getConfig(), this._classes = this._getClasses(), this._initialClasses = [...this._element.classList], h.addClass(this._element, this._classes.ripple), this._createRipple(t);
  }
  _addClickEvent(t) {
    c.on(t, "mousedown", this._clickHandler);
  }
  _createRipple(t) {
    this._element.className.indexOf(this._classes.ripple) < 0 && h.addClass(this._element, this._classes.ripple);
    const { layerX: e, layerY: i } = t, n = t.offsetX || e, o = t.offsetY || i, r = this._element.offsetHeight, a = this._element.offsetWidth, l = this._durationToMsNumber(this._options.rippleDuration), p = {
      offsetX: this._options.rippleCentered ? r / 2 : n,
      offsetY: this._options.rippleCentered ? a / 2 : o,
      height: r,
      width: a
    }, u = this._getDiameter(p), _ = this._options.rippleRadius || u / 2, f = {
      delay: l * xa,
      duration: l - l * xa
    }, g = {
      left: this._options.rippleCentered ? `${a / 2 - _}px` : `${n - _}px`,
      top: this._options.rippleCentered ? `${r / 2 - _}px` : `${o - _}px`,
      height: `${this._options.rippleRadius * 2 || u}px`,
      width: `${this._options.rippleRadius * 2 || u}px`,
      transitionDelay: `0s, ${f.delay}ms`,
      transitionDuration: `${l}ms, ${f.duration}ms`
    }, m = $("div");
    this._createHTMLRipple({
      wrapper: this._element,
      ripple: m,
      styles: g
    }), this._removeHTMLRipple({ ripple: m, duration: l });
  }
  _createHTMLRipple({ wrapper: t, ripple: e, styles: i }) {
    Object.keys(i).forEach((n) => e.style[n] = i[n]), h.addClass(e, this._classes.rippleWave), e.setAttribute("data-te-ripple-ref", ""), this._addColor(e, t), this._toggleUnbound(t), this._appendRipple(e, t);
  }
  _removeHTMLRipple({ ripple: t, duration: e }) {
    this._rippleTimer && (clearTimeout(this._rippleTimer), this._rippleTimer = null), t && setTimeout(() => {
      t.classList.add("!opacity-0");
    }, 10), this._rippleTimer = setTimeout(() => {
      if (t && (t.remove(), this._element)) {
        d.find("[data-te-ripple-ref]", this._element).forEach((n) => {
          n.remove();
        }), this._isMinWidthSet && (h.style(this._element, { "min-width": "" }), this._isMinWidthSet = false);
        const i = this._initialClasses ? this._addedNewRippleClasses(this._classes.ripple, this._initialClasses) : this._classes.ripple.split(" ");
        h.removeClass(this._element, i);
      }
    }, e);
  }
  _addedNewRippleClasses(t, e) {
    return t.split(" ").filter((i) => e.findIndex((n) => i === n) === -1);
  }
  _durationToMsNumber(t) {
    return Number(t.replace("ms", "").replace("s", "000"));
  }
  _getConfig(t = {}) {
    const e = h.getDataAttributes(this._element);
    return t = {
      ...of,
      ...e,
      ...t
    }, D(Kn, t, rf), t;
  }
  _getClasses(t = {}) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...af,
      ...e,
      ...t
    }, D(Kn, t, lf), t;
  }
  _getDiameter({ offsetX: t, offsetY: e, height: i, width: n }) {
    const o = e <= i / 2, r = t <= n / 2, a = (f, g) => Math.sqrt(f ** 2 + g ** 2), l = e === i / 2 && t === n / 2, p = {
      first: o === true && r === false,
      second: o === true && r === true,
      third: o === false && r === true,
      fourth: o === false && r === false
    }, u = {
      topLeft: a(t, e),
      topRight: a(n - t, e),
      bottomLeft: a(t, i - e),
      bottomRight: a(n - t, i - e)
    };
    let _ = 0;
    return l || p.fourth ? _ = u.topLeft : p.third ? _ = u.topRight : p.second ? _ = u.bottomRight : p.first && (_ = u.bottomLeft), _ * 2;
  }
  _appendRipple(t, e) {
    e.appendChild(t), setTimeout(() => {
      h.addClass(t, "opacity-0 scale-100");
    }, 50);
  }
  _toggleUnbound(t) {
    this._options.rippleUnbound === true ? h.addClass(t, this._classes.unbound) : h.removeClass(t, this._classes.unbound);
  }
  _addColor(t) {
    let e = this._options.rippleColor || "rgb(0,0,0)";
    (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) && (e = this._options.rippleColorDark || this._options.rippleColor);
    const i = nf.find((r) => r.name === e.toLowerCase()), n = i ? this._colorToRGB(i.gradientColor).join(",") : this._colorToRGB(e).join(","), o = ef.split("{{color}}").join(`${n}`);
    t.style.backgroundImage = `radial-gradient(circle, ${o})`;
  }
  _colorToRGB(t) {
    function e(o) {
      return o.length < 7 && (o = `#${o[1]}${o[1]}${o[2]}${o[2]}${o[3]}${o[3]}`), [
        parseInt(o.substr(1, 2), 16),
        parseInt(o.substr(3, 2), 16),
        parseInt(o.substr(5, 2), 16)
      ];
    }
    function i(o) {
      const r = document.body.appendChild(document.createElement("fictum")), a = "rgb(1, 2, 3)";
      return r.style.color = a, r.style.color !== a || (r.style.color = o, r.style.color === a || r.style.color === "") ? as : (o = getComputedStyle(r).color, document.body.removeChild(r), o);
    }
    function n(o) {
      return o = o.match(/[.\d]+/g).map((r) => +Number(r)), o.length = 3, o;
    }
    return t.toLowerCase() === "transparent" ? as : t[0] === "#" ? e(t) : (t.indexOf("rgb") === -1 && (t = i(t)), t.indexOf("rgb") === 0 ? n(t) : as);
  }
  static autoInitial(t) {
    return function(e) {
      t._autoInit(e);
    };
  }
  static jQueryInterface(t) {
    return this.each(function() {
      return y.getData(this, rs) ? null : new Ze(this, t);
    });
  }
  static getInstance(t) {
    return y.getData(t, rs);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var mf = "data-te-datepicker-modal-container-ref";
var gf = "data-te-datepicker-dropdown-container-ref";
var bf = "data-te-dropdown-backdrop-ref";
var vf = "data-te-datepicker-date-text-ref";
var Sa = "data-te-datepicker-view-ref";
var Tf = "data-te-datepicker-previous-button-ref";
var Ef = "data-te-datepicker-next-button-ref";
var Cf = "data-te-datepicker-ok-button-ref";
var Af = "data-te-datepicker-cancel-button-ref";
var yf = "data-te-datepicker-clear-button-ref";
var wf = "data-te-datepicker-view-change-button-ref";
var He = 37;
var at = 38;
var Ve = 39;
var z = 40;
var We = 36;
var Fe = 35;
var zn = 33;
var Un = 34;
var ct = 13;
var Ks = 32;
var Fi = 27;
var Pi = 9;
var vt = 24;
var ls = 4;
var cs = 4;
var Xn = "datepicker";
var zs = "te.datepicker";
var dn = `.${zs}`;
var Rf = ".data-api";
var Pf = `close${dn}`;
var Bf = `open${dn}`;
var Hf = `dateChange${dn}`;
var hs = `click${dn}${Rf}`;
var Uc = "data-te-datepicker-modal-container-ref";
var Xc = "data-te-datepicker-dropdown-container-ref";
var ds = "[data-te-datepicker-toggle-ref]";
var Vf = `[${Uc}]`;
var Wf = `[${Xc}]`;
var Ff = "[data-te-datepicker-view-change-button-ref]";
var Yf = "[data-te-datepicker-previous-button-ref]";
var jf = "[data-te-datepicker-next-button-ref]";
var Kf = "[data-te-datepicker-ok-button-ref]";
var zf = "[data-te-datepicker-cancel-button-ref]";
var Uf = "[data-te-datepicker-clear-button-ref]";
var Xf = "[data-te-datepicker-view-ref]";
var Gf = "[data-te-datepicker-toggle-button-ref]";
var qf = "[data-te-datepicker-date-text-ref]";
var Zf = "[data-te-dropdown-backdrop-ref]";
var Qf = "animate-[fade-in_0.3s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var Jf = "animate-[fade-out_0.3s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var tm = "animate-[fade-in_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var em = "animate-[fade-out_0.15s_both] px-[auto] motion-reduce:transition-none motion-reduce:animate-none";
var im = "flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[328px] h-[512px] bg-white rounded-[0.6rem] shadow-lg z-[1066] xs:max-md:landscape:w-[475px] xs:max-md:landscape:h-[360px] xs:max-md:landscape:flex-row dark:bg-zinc-700";
var sm = "w-full h-full fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-[1065]";
var nm = "relative h-full";
var om = "xs:max-md:landscape:h-full h-[120px] px-6 bg-primary flex flex-col rounded-t-lg dark:bg-zinc-800";
var rm = "h-8 flex flex-col justify-end";
var am = "text-[10px] font-normal uppercase tracking-[1.7px] text-white";
var lm = "xs:max-md:landscape:mt-24 h-[72px] flex flex-col justify-end";
var cm = "text-[34px] font-normal text-white";
var hm = "outline-none px-3";
var dm = "px-3 pt-2.5 pb-0 flex justify-between text-black/[64]";
var um = "flex items-center outline-none p-2.5 text-neutral-500 font-medium text-[0.9rem] rounded-xl shadow-none bg-transparent m-0 border-none hover:bg-neutral-200 focus:bg-neutral-200  dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10";
var pm = "mt-2.5";
var _m = "p-0 w-10 h-10 leading-10 border-none outline-none m-0 text-gray-600 bg-transparent mr-6 hover:bg-neutral-200 hover:rounded-[50%] focus:bg-neutral-200 focus:rounded-[50%] dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:mx-auto";
var fm = "p-0 w-10 h-10 leading-10 border-none outline-none m-0 text-gray-600 bg-transparent hover:bg-neutral-200 hover:rounded-[50%] focus:bg-neutral-200 focus:rounded-[50%] dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:rotate-180 [&>svg]:mx-auto";
var mm = "h-14 flex absolute w-full bottom-0 justify-end items-center px-3";
var gm = "outline-none bg-white text-primary border-none cursor-pointer py-0 px-2.5 uppercase text-[0.8rem] leading-10 font-medium h-10 tracking-[.1rem] rounded-[10px] mb-2.5 hover:bg-neutral-200 focus:bg-neutral-200 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10";
var bm = "mr-auto";
var vm = "w-10 h-10 text-center text-[12px] font-normal dark:text-white";
var Tm = "text-center data-[te-datepicker-cell-disabled]:text-neutral-300 data-[te-datepicker-cell-disabled]:cursor-default data-[te-datepicker-cell-disabled]:pointer-events-none data-[te-datepicker-cell-disabled]:hover:cursor-default hover:cursor-pointer group";
var Em = "w-10 h-10 xs:max-md:landscape:w-8 xs:max-md:landscape:h-8";
var Cm = "w-[76px] h-[42px]";
var Am = "mx-auto group-[:not([data-te-datepicker-cell-disabled]):not([data-te-datepicker-cell-selected]):hover]:bg-neutral-300 group-[[data-te-datepicker-cell-selected]]:bg-primary group-[[data-te-datepicker-cell-selected]]:text-white group-[:not([data-te-datepicker-cell-selected])[data-te-datepicker-cell-focused]]:bg-neutral-100 group-[[data-te-datepicker-cell-focused]]:data-[te-datepicker-cell-selected]:bg-primary group-[[data-te-datepicker-cell-current]]:border-solid group-[[data-te-datepicker-cell-current]]:border-black group-[[data-te-datepicker-cell-current]]:border dark:group-[:not([data-te-datepicker-cell-disabled]):not([data-te-datepicker-cell-selected]):hover]:bg-white/10 dark:group-[[data-te-datepicker-cell-current]]:border-white dark:text-white dark:group-[:not([data-te-datepicker-cell-selected])[data-te-datepicker-cell-focused]]:bg-white/10 dark:group-[[data-te-datepicker-cell-disabled]]:text-neutral-500";
var ym = "w-9 h-9 leading-9 rounded-[50%] text-[13px]";
var wm = "w-[72px] h-10 leading-10 py-[1px] px-0.5 rounded-[999px]";
var km = "mx-auto w-[304px]";
var xm = "flex items-center justify-content-center [&>svg]:w-5 [&>svg]:h-5 absolute outline-none border-none bg-transparent right-0.5 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:text-primary focus:text-primary dark:hover:text-primary-400 dark:focus:text-primary-400 dark:text-neutral-200";
var Om = "inline-block pointer-events-none ml-[3px] [&>svg]:w-4 [&>svg]:h-4 [&>svg]:fill-neutral-500 dark:[&>svg]:fill-white";
var Sm = "w-[328px] h-[380px] bg-white rounded-lg shadow-[0px_2px_15px_-3px_rgba(0,0,0,.07),_0px_10px_20px_-2px_rgba(0,0,0,.04)] z-[1066] dark:bg-zinc-700";
var Im = {
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
var Dm = {
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
var $m = {
  fadeIn: Qf,
  fadeOut: Jf,
  fadeInShort: tm,
  fadeOutShort: em,
  modalContainer: im,
  datepickerBackdrop: sm,
  datepickerMain: nm,
  datepickerHeader: om,
  datepickerTitle: rm,
  datepickerTitleText: am,
  datepickerDate: lm,
  datepickerDateText: cm,
  datepickerView: hm,
  datepickerDateControls: dm,
  datepickerViewChangeButton: um,
  datepickerViewChangeIcon: Om,
  datepickerArrowControls: pm,
  datepickerPreviousButton: _m,
  datepickerNextButton: fm,
  datepickerFooter: mm,
  datepickerFooterBtn: gm,
  datepickerClearBtn: bm,
  datepickerDayHeading: vm,
  datepickerCell: Tm,
  datepickerCellSmall: Em,
  datepickerCellLarge: Cm,
  datepickerCellContent: Am,
  datepickerCellContentSmall: ym,
  datepickerCellContentLarge: wm,
  datepickerTable: km,
  datepickerToggleButton: xm,
  datepickerDropdownContainer: Sm
};
var Lm = {
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

class Nm {
  constructor(t, e, i) {
    this._element = t, this._input = d.findOne("input", this._element), this._options = this._getConfig(e), this._classes = this._getClasses(i), this._activeDate = new Date, this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this._headerDate = null, this._headerYear = null, this._headerMonth = null, this._view = this._options.view, this._popper = null, this._focusTrap = null, this._isOpen = false, this._toggleButtonId = rt("datepicker-toggle-"), this._animations = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && this._options.animations, this._scrollBar = new qe, this._element && y.setData(t, zs, this), this._init(), this.toggleButton && this._options.disableToggle && (this.toggleButton.disabled = "true"), this._options.disableInput && (this._input.disabled = "true");
  }
  static get NAME() {
    return Xn;
  }
  get container() {
    return d.findOne(`[${Uc}='${this._toggleButtonId}']`) || d.findOne(`[${Xc}='${this._toggleButtonId}']`);
  }
  get options() {
    return this._options;
  }
  get activeCell() {
    let t;
    return this._view === "days" && (t = this._getActiveDayCell()), this._view === "months" && (t = this._getActiveMonthCell()), this._view === "years" && (t = this._getActiveYearCell()), t;
  }
  get activeDay() {
    return Z(this._activeDate);
  }
  get activeMonth() {
    return Y(this._activeDate);
  }
  get activeYear() {
    return B(this._activeDate);
  }
  get firstYearInView() {
    return this.activeYear - Ws(this._activeDate, vt);
  }
  get lastYearInView() {
    return this.firstYearInView + vt - 1;
  }
  get viewChangeButton() {
    return d.findOne(Ff, this.container);
  }
  get previousButton() {
    return d.findOne(Yf, this.container);
  }
  get nextButton() {
    return d.findOne(jf, this.container);
  }
  get okButton() {
    return d.findOne(Kf, this.container);
  }
  get cancelButton() {
    return d.findOne(zf, this.container);
  }
  get clearButton() {
    return d.findOne(Uf, this.container);
  }
  get datesContainer() {
    return d.findOne(Xf, this.container);
  }
  get toggleButton() {
    return d.findOne(Gf, this._element);
  }
  update(t = {}) {
    this._options = this._getConfig({ ...this._options, ...t });
  }
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    if (t = {
      ...Im,
      ...e,
      ...t
    }, D(Xn, t, Dm), t.max && typeof t.max == "string" && (t.max = new Date(t.max)), t.min && typeof t.min == "string" && (t.min = new Date(t.min)), t.startDay && t.startDay !== 0) {
      const i = this._getNewDaysOrderArray(t);
      t.weekdaysNarrow = i;
    }
    return t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...$m,
      ...e,
      ...t
    }, D(Xn, t, Lm), t;
  }
  _getContainer() {
    return d.findOne(this._options.container);
  }
  _getNewDaysOrderArray(t) {
    const { startDay: e, weekdaysNarrow: i } = t;
    return i.slice(e).concat(i.slice(0, e));
  }
  _init() {
    !this.toggleButton && this._options.toggleButton && (this._appendToggleButton(), (this._input.readOnly || this._input.disabled) && (this.toggleButton.style.pointerEvents = "none")), this._listenToUserInput(), this._listenToToggleClick(), this._listenToToggleKeydown();
  }
  _appendToggleButton() {
    const t = Lf(this._toggleButtonId, this._classes.datepickerToggleButton);
    this._element.insertAdjacentHTML("beforeend", t);
  }
  open() {
    if (this._input.readOnly || this._input.disabled)
      return;
    const t = c.trigger(this._element, Bf);
    if (this._isOpen || t.defaultPrevented)
      return;
    this._setInitialDate();
    const e = xf(this._classes.datepickerBackdrop), i = kf(this._activeDate, this._selectedDate, this._selectedYear, this._selectedMonth, this._options, cs, vt, ls, this._toggleButtonId, this._classes);
    this._options.inline ? this._openDropdown(i) : (this._openModal(e, i), this._scrollBar.hide()), this._animations && (h.addClass(this.container, this._classes.fadeIn), h.addClass(e, this._classes.fadeInShort)), this._setFocusTrap(this.container), this._listenToDateSelection(), this._addControlsListeners(), this._updateControlsDisabledState(), this._listenToEscapeClick(), this._listenToKeyboardNavigation(), this._listenToDatesContainerFocus(), this._listenToDatesContainerBlur(), this._asyncFocusDatesContainer(), this._updateViewControlsAndAttributes(this._view), this._isOpen = true, setTimeout(() => {
      this._listenToOutsideClick();
    }, 0);
  }
  _openDropdown(t) {
    this._popper = Ce(this._input, t, {
      placement: "bottom-start"
    }), this._getContainer().appendChild(t);
  }
  _openModal(t, e) {
    const i = this._getContainer();
    i.appendChild(t), i.appendChild(e);
  }
  _setFocusTrap(t) {
    this._focusTrap = new Wi(t, {
      event: "keydown",
      condition: (e) => e.key === "Tab"
    }), this._focusTrap.trap();
  }
  _listenToUserInput() {
    c.on(this._input, "input", (t) => {
      this._handleUserInput(t.target.value);
    });
  }
  _listenToToggleClick() {
    c.on(this._element, hs, ds, (t) => {
      t.preventDefault(), this.open();
    });
  }
  _listenToToggleKeydown() {
    c.on(this._element, "keydown", ds, (t) => {
      t.keyCode === ct && !this._isOpen && this.open();
    });
  }
  _listenToDateSelection() {
    c.on(this.datesContainer, "click", (t) => {
      this._handleDateSelection(t);
    });
  }
  _handleDateSelection(t) {
    const e = t.target.nodeName === "DIV" ? t.target.parentNode.dataset : t.target.dataset, i = t.target.nodeName === "DIV" ? t.target.parentNode : t.target;
    if (e.teDate && this._pickDay(e.teDate, i), e.teMonth && e.teYear) {
      const n = parseInt(e.teMonth, 10), o = parseInt(e.teYear, 10);
      this._pickMonth(n, o);
    }
    if (e.teYear && !e.teMonth) {
      const n = parseInt(e.teYear, 10);
      this._pickYear(n);
    }
    this._options.inline || this._updateHeaderDate(this._activeDate, this._options.monthsShort, this._options.weekdaysShort);
  }
  _updateHeaderDate(t, e, i) {
    const n = d.findOne(qf, this.container), o = Y(t), r = Z(t), a = Vs(t);
    n.innerHTML = `${i[a]}, ${e[o]} ${r}`;
  }
  _addControlsListeners() {
    c.on(this.nextButton, "click", () => {
      this._view === "days" ? this.nextMonth() : this._view === "years" ? this.nextYears() : this.nextYear(), this._updateControlsDisabledState();
    }), c.on(this.previousButton, "click", () => {
      this._view === "days" ? this.previousMonth() : this._view === "years" ? this.previousYears() : this.previousYear(), this._updateControlsDisabledState();
    }), c.on(this.viewChangeButton, "click", () => {
      this._view === "days" ? this._changeView("years") : (this._view === "years" || this._view === "months") && this._changeView("days");
    }), this._options.inline || this._listenToFooterButtonsClick();
  }
  _listenToFooterButtonsClick() {
    c.on(this.okButton, "click", () => this.handleOk()), c.on(this.cancelButton, "click", () => this.handleCancel()), c.on(this.clearButton, "click", () => this.handleClear());
  }
  _listenToOutsideClick() {
    c.on(document, hs, (t) => {
      const e = t.target === this.container, i = this.container && this.container.contains(t.target);
      !e && !i && this.close();
    });
  }
  _listenToEscapeClick() {
    c.on(document, "keydown", (t) => {
      t.keyCode === Fi && this._isOpen && this.close();
    });
  }
  _listenToKeyboardNavigation() {
    c.on(this.datesContainer, "keydown", (t) => {
      this._handleKeydown(t);
    });
  }
  _listenToDatesContainerFocus() {
    c.on(this.datesContainer, "focus", () => {
      this._focusActiveCell(this.activeCell);
    });
  }
  _listenToDatesContainerBlur() {
    c.on(this.datesContainer, "blur", () => {
      this._removeCurrentFocusStyles();
    });
  }
  _handleKeydown(t) {
    this._view === "days" && this._handleDaysViewKeydown(t), this._view === "months" && this._handleMonthsViewKeydown(t), this._view === "years" && this._handleYearsViewKeydown(t);
  }
  _handleDaysViewKeydown(t) {
    const e = this._activeDate, i = this.activeCell;
    switch (t.keyCode) {
      case He:
        this._activeDate = xe(this._activeDate, F() ? 1 : -1);
        break;
      case Ve:
        this._activeDate = xe(this._activeDate, F() ? -1 : 1);
        break;
      case at:
        this._activeDate = xe(this._activeDate, -7);
        break;
      case z:
        this._activeDate = xe(this._activeDate, 7);
        break;
      case We:
        this._activeDate = xe(this._activeDate, 1 - Z(this._activeDate));
        break;
      case Fe:
        this._activeDate = xe(this._activeDate, Po(this._activeDate) - Z(this._activeDate));
        break;
      case zn:
        this._activeDate = nt(this._activeDate, -1);
        break;
      case Un:
        this._activeDate = nt(this._activeDate, 1);
        break;
      case ct:
      case Ks:
        this._selectDate(this._activeDate), this._handleDateSelection(t), t.preventDefault();
        return;
      default:
        return;
    }
    Di(e, this._activeDate, this._view, vt, this._options.min, this._options.max) || this._changeView("days"), this._removeHighlightFromCell(i), this._focusActiveCell(this.activeCell), t.preventDefault();
  }
  _asyncFocusDatesContainer() {
    setTimeout(() => {
      this.datesContainer.focus();
    }, 0);
  }
  _focusActiveCell(t) {
    t && t.setAttribute("data-te-datepicker-cell-focused", "");
  }
  _removeHighlightFromCell(t) {
    t && t.removeAttribute("data-te-datepicker-cell-focused");
  }
  _getActiveDayCell() {
    const t = d.find("td", this.datesContainer);
    return Array.from(t).find((i) => {
      const n = Oa(i.dataset.teDate);
      return fe(n, this._activeDate);
    });
  }
  _handleMonthsViewKeydown(t) {
    const e = this._activeDate, i = this.activeCell;
    switch (t.keyCode) {
      case He:
        this._activeDate = nt(this._activeDate, F() ? 1 : -1);
        break;
      case Ve:
        this._activeDate = nt(this._activeDate, F() ? -1 : 1);
        break;
      case at:
        this._activeDate = nt(this._activeDate, -4);
        break;
      case z:
        this._activeDate = nt(this._activeDate, 4);
        break;
      case We:
        this._activeDate = nt(this._activeDate, -this.activeMonth);
        break;
      case Fe:
        this._activeDate = nt(this._activeDate, 11 - this.activeMonth);
        break;
      case zn:
        this._activeDate = it(this._activeDate, -1);
        break;
      case Un:
        this._activeDate = it(this._activeDate, 1);
        break;
      case ct:
      case Ks:
        this._selectMonth(this.activeMonth);
        return;
      default:
        return;
    }
    Di(e, this._activeDate, this._view, vt, this._options.min, this._options.max) || this._changeView("months"), this._removeHighlightFromCell(i), this._focusActiveCell(this.activeCell), t.preventDefault();
  }
  _getActiveMonthCell() {
    const t = d.find("td", this.datesContainer);
    return Array.from(t).find((i) => {
      const n = parseInt(i.dataset.teYear, 10), o = parseInt(i.dataset.teMonth, 10);
      return n === this.activeYear && o === this.activeMonth;
    });
  }
  _handleYearsViewKeydown(t) {
    const e = this._activeDate, i = this.activeCell, n = 4, o = 24;
    switch (t.keyCode) {
      case He:
        this._activeDate = it(this._activeDate, F() ? 1 : -1);
        break;
      case Ve:
        this._activeDate = it(this._activeDate, F() ? -1 : 1);
        break;
      case at:
        this._activeDate = it(this._activeDate, -n);
        break;
      case z:
        this._activeDate = it(this._activeDate, n);
        break;
      case We:
        this._activeDate = it(this._activeDate, -Ws(this._activeDate, o));
        break;
      case Fe:
        this._activeDate = it(this._activeDate, o - Ws(this._activeDate, o) - 1);
        break;
      case zn:
        this._activeDate = it(this._activeDate, -o);
        break;
      case Un:
        this._activeDate = it(this._activeDate, o);
        break;
      case ct:
      case Ks:
        this._selectYear(this.activeYear);
        return;
      default:
        return;
    }
    Di(e, this._activeDate, this._view, vt, this._options.min, this._options.max) || this._changeView("years"), this._removeHighlightFromCell(i), this._focusActiveCell(this.activeCell), t.preventDefault();
  }
  _getActiveYearCell() {
    const t = d.find("td", this.datesContainer);
    return Array.from(t).find((i) => parseInt(i.dataset.teYear, 10) === this.activeYear);
  }
  _setInitialDate() {
    this._input.value ? this._handleUserInput(this._input.value) : this._options.startDate ? this._activeDate = new Date(this._options.startDate) : this._activeDate = new Date;
  }
  close() {
    const t = c.trigger(this._element, Pf);
    !this._isOpen || t.defaultPrevented || (this._removeDatepickerListeners(), this._animations && h.addClass(this.container, this._classes.fadeOut), this._options.inline ? this._closeDropdown() : this._closeModal(), this._isOpen = false, this._view = this._options.view, this.toggleButton ? this.toggleButton.focus() : this._input.focus());
  }
  _closeDropdown() {
    const t = d.findOne(Wf), e = this._getContainer();
    window.matchMedia("(prefers-reduced-motion: reduce)").matches && (t && e.removeChild(t), this._popper && this._popper.destroy()), t.addEventListener("animationend", () => {
      t && e.removeChild(t), this._popper && this._popper.destroy();
    }), this._removeFocusTrap();
  }
  _closeModal() {
    const t = d.findOne(Zf), e = d.findOne(Vf);
    !e || !t || (this._animations ? (h.addClass(t, this._classes.fadeOutShort), t.addEventListener("animationend", () => {
      this._removePicker(t, e), this._scrollBar.reset();
    })) : (this._removePicker(t, e), this._scrollBar.reset()));
  }
  _removePicker(t, e) {
    const i = this._getContainer();
    i.removeChild(t), i.removeChild(e);
  }
  _removeFocusTrap() {
    this._focusTrap && (this._focusTrap.disable(), this._focusTrap = null);
  }
  _removeDatepickerListeners() {
    c.off(this.nextButton, "click"), c.off(this.previousButton, "click"), c.off(this.viewChangeButton, "click"), c.off(this.okButton, "click"), c.off(this.cancelButton, "click"), c.off(this.clearButton, "click"), c.off(this.datesContainer, "click"), c.off(this.datesContainer, "keydown"), c.off(this.datesContainer, "focus"), c.off(this.datesContainer, "blur"), c.off(document, hs);
  }
  dispose() {
    this._isOpen && this.close(), this._removeInputAndToggleListeners();
    const t = d.findOne(`#${this._toggleButtonId}`);
    t && this._element.removeChild(t), y.removeData(this._element, zs), this._element = null, this._input = null, this._options = null, this._activeDate = null, this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this._headerDate = null, this._headerYear = null, this._headerMonth = null, this._view = null, this._popper = null, this._focusTrap = null;
  }
  _removeInputAndToggleListeners() {
    c.off(this._input, "input"), c.off(this._element, hs, ds), c.off(this._element, "keydown", ds);
  }
  handleOk() {
    this._confirmSelection(this._headerDate), this.close();
  }
  _selectDate(t, e = this.activeCell) {
    const { min: i, max: n, filter: o, disablePast: r, disableFuture: a } = this._options;
    nn(t, i, n, o, r, a) || (this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e), this._selectedDate = t, this._selectedYear = B(t), this._selectedMonth = Y(t), this._headerDate = t, (this._options.inline || this.options.confirmDateOnSelect) && (this._confirmSelection(t), this.close()));
  }
  _selectYear(t, e = this.activeCell) {
    this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e), this._headerYear = t, this._asyncChangeView("months");
  }
  _selectMonth(t, e = this.activeCell) {
    this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e), this._headerMonth = t, this._asyncChangeView("days");
  }
  _removeSelectedStyles(t) {
    t && t.removeAttribute("data-te-datepicker-cell-selected");
  }
  _addSelectedStyles(t) {
    t && t.setAttribute("data-te-datepicker-cell-selected", "");
  }
  _confirmSelection(t) {
    if (t) {
      const e = this.formatDate(t);
      this._input.value = e, c.trigger(this._element, Hf, { date: t }), c.trigger(this._input, "input");
    }
  }
  handleCancel() {
    this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this.close();
  }
  handleClear() {
    this._selectedDate = null, this._selectedMonth = null, this._selectedYear = null, this._headerDate = null, this._headerMonth = null, this._headerYear = null, this._removeCurrentSelectionStyles(), this._input.value = "", this._setInitialDate(), this._changeView("days"), this._updateHeaderDate(this._activeDate, this._options.monthsShort, this._options.weekdaysShort);
  }
  _removeCurrentSelectionStyles() {
    const t = d.findOne("[data-te-datepicker-cell-selected]", this.container);
    t && t.removeAttribute("data-te-datepicker-cell-selected");
  }
  _removeCurrentFocusStyles() {
    const t = d.findOne("[data-te-datepicker-cell-focused]", this.container);
    t && t.removeAttribute("data-te-datepicker-cell-focused");
  }
  formatDate(t) {
    const e = Z(t), i = this._addLeadingZero(Z(t)), n = this._options.weekdaysShort[Vs(t)], o = this._options.weekdaysFull[Vs(t)], r = Y(t) + 1, a = this._addLeadingZero(Y(t) + 1), l = this._options.monthsShort[Y(t)], p = this._options.monthsFull[Y(t)], u = B(t).toString().length === 2 ? B(t) : B(t).toString().slice(2, 4), _ = B(t), f = this._options.format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
    let g = "";
    return f.forEach((m) => {
      switch (m) {
        case "dddd":
          m = m.replace(m, o);
          break;
        case "ddd":
          m = m.replace(m, n);
          break;
        case "dd":
          m = m.replace(m, i);
          break;
        case "d":
          m = m.replace(m, e);
          break;
        case "mmmm":
          m = m.replace(m, p);
          break;
        case "mmm":
          m = m.replace(m, l);
          break;
        case "mm":
          m = m.replace(m, a);
          break;
        case "m":
          m = m.replace(m, r);
          break;
        case "yyyy":
          m = m.replace(m, _);
          break;
        case "yy":
          m = m.replace(m, u);
          break;
      }
      g += m;
    }), g;
  }
  _addLeadingZero(t) {
    return parseInt(t, 10) < 10 ? `0${t}` : t;
  }
  _pickDay(t, e) {
    const i = Oa(t), { min: n, max: o, filter: r, disablePast: a, disableFuture: l } = this._options;
    nn(i, n, o, r, a, l) || (this._activeDate = i, this._selectDate(i, e));
  }
  _pickYear(t) {
    const { min: e, max: i, disablePast: n, disableFuture: o } = this._options;
    if (Bo(t, e, i, n, o))
      return;
    const r = Et(t, this.activeMonth, this.activeDay);
    this._activeDate = r, this._selectedDate = r, this._selectYear(t);
  }
  _pickMonth(t, e) {
    const { min: i, max: n, disablePast: o, disableFuture: r } = this._options;
    if (zc(t, e, i, n, o, r) || Bo(e, i, n, o, r))
      return;
    const a = Et(e, t, this.activeDay);
    this._activeDate = a, this._selectMonth(t);
  }
  nextMonth() {
    const t = nt(this._activeDate, 1), e = Fs(t, this._headerDate, this._options, this._classes);
    this._activeDate = t, this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  previousMonth() {
    const t = nt(this._activeDate, -1);
    this._activeDate = t;
    const e = Fs(t, this._headerDate, this._options, this._classes);
    this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  nextYear() {
    const t = it(this._activeDate, 1);
    this._activeDate = t, this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes);
    const e = Ys(this.activeYear, this._selectedYear, this._selectedMonth, this._options, cs, this._classes);
    this.datesContainer.innerHTML = e;
  }
  previousYear() {
    const t = it(this._activeDate, -1);
    this._activeDate = t, this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes);
    const e = Ys(this.activeYear, this._selectedYear, this._selectedMonth, this._options, cs, this._classes);
    this.datesContainer.innerHTML = e;
  }
  nextYears() {
    const t = it(this._activeDate, 24);
    this._activeDate = t;
    const e = js(t, this._selectedYear, this._options, vt, ls, this._classes);
    this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  previousYears() {
    const t = it(this._activeDate, -24);
    this._activeDate = t;
    const e = js(t, this._selectedYear, this._options, vt, ls, this._classes);
    this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  _asyncChangeView(t) {
    setTimeout(() => {
      this._changeView(t);
    }, 0);
  }
  _changeView(t) {
    this._view = t, this.datesContainer.blur(), t === "days" && (this.datesContainer.innerHTML = Fs(this._activeDate, this._headerDate, this._options, this._classes)), t === "months" && (this.datesContainer.innerHTML = Ys(this.activeYear, this._selectedYear, this._selectedMonth, this._options, cs, this._classes)), t === "years" && (this.datesContainer.innerHTML = js(this._activeDate, this._selectedYear, this._options, vt, ls, this._classes)), this.datesContainer.focus(), this._updateViewControlsAndAttributes(t), this._updateControlsDisabledState();
  }
  _updateViewControlsAndAttributes(t) {
    t === "days" && (this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToMultiYearViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevMonthLabel), this.nextButton.setAttribute("aria-label", this._options.nextMonthLabel)), t === "months" && (this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToDayViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevYearLabel), this.nextButton.setAttribute("aria-label", this._options.nextYearLabel)), t === "years" && (this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += $t(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToMonthViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevMultiYearLabel), this.nextButton.setAttribute("aria-label", this._options.nextMultiYearLabel));
  }
  _updateControlsDisabledState() {
    _f(this._options.disableFuture, this._activeDate, this._view, vt, this._options.min, this._options.max, this.lastYearInView, this.firstYearInView) ? this.nextButton.disabled = true : this.nextButton.disabled = false, ff(this._options.disablePast, this._activeDate, this._view, vt, this._options.min, this._options.max, this.lastYearInView, this.firstYearInView) ? this.previousButton.disabled = true : this.previousButton.disabled = false;
  }
  _handleUserInput(t) {
    const e = this._getDelimeters(this._options.format), i = this._parseDate(t, this._options.format, e);
    df(i) ? (this._activeDate = i, this._selectedDate = i, this._selectedYear = B(i), this._selectedMonth = Y(i), this._headerDate = i) : (this._activeDate = new Date, this._selectedDate = null, this._selectedMonth = null, this._selectedYear = null, this._headerDate = null, this._headerMonth = null, this._headerYear = null);
  }
  _getDelimeters(t) {
    return t.match(/[^(dmy)]{1,}/g);
  }
  _parseDate(t, e, i) {
    let n;
    i[0] !== i[1] ? n = i[0] + i[1] : n = i[0];
    const o = new RegExp(`[${n}]`), r = t.split(o), a = e.split(o), l = e.indexOf("mmm") !== -1, p = [];
    for (let b = 0;b < a.length; b++)
      a[b].indexOf("yy") !== -1 && (p[0] = { value: r[b], format: a[b] }), a[b].indexOf("m") !== -1 && (p[1] = { value: r[b], format: a[b] }), a[b].indexOf("d") !== -1 && a[b].length <= 2 && (p[2] = { value: r[b], format: a[b] });
    let u;
    e.indexOf("mmmm") !== -1 ? u = this._options.monthsFull : u = this._options.monthsShort;
    const _ = Number(p[0].value), f = l ? this.getMonthNumberByMonthName(p[1].value, u) : Number(p[1].value) - 1, g = Number(p[2].value);
    return Et(_, f, g);
  }
  getMonthNumberByMonthName(t, e) {
    return e.findIndex((i) => i === t);
  }
  static getInstance(t) {
    return y.getData(t, zs);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var Mm = ({
  format24: s,
  okLabel: t,
  cancelLabel: e,
  headID: i,
  footerID: n,
  bodyID: o,
  pickerID: r,
  clearLabel: a,
  inline: l,
  showClearBtn: p,
  amLabel: u,
  pmLabel: _
}, f) => {
  const g = `<div id='${r}' class='${f.timepickerWrapper}' data-te-timepicker-wrapper>
      <div class="${f.timepickerContainer}">
        <div class="${f.timepickerElements}" data-te-timepicker-elements-wrapper>
        <div id='${i}' class='${f.timepickerHead}' style='padding-right:${s ? 50 : 10}px'>
        <div class='${f.timepickerHeadContent}'>
            <div class="${f.timepickerCurrentWrapper}">
              <span class="${f.timepickerCurrentButtonWrapper}">
                <button type='button' class='${f.timepickerCurrentButton}' tabindex="0" data-te-timepicker-active data-te-timepicker-current data-te-timepicker-hour data-te-ripple-init>21</button>
              </span>
              <button type='button' class='${f.timepickerDot}' disabled>:</button>
            <span class="${f.timepickerCurrentButtonWrapper}">
              <button type='button' class='${f.timepickerCurrentButton}' tabindex="0" data-te-timepicker-current data-te-timepicker-minute data-te-ripple-init>21</button>
            </span>
            </div>
            ${s ? "" : `<div class="${f.timepickerModeWrapper}">
                  <button type='button' class="${f.timepickerModeAm}" tabindex="0" data-te-timepicker-am data-te-timepicker-hour-mode data-te-ripple-init>${u}</button>
                  <button class="${f.timepickerModePm}" tabindex="0" data-te-timepicker-pm data-te-timepicker-hour-mode data-te-ripple-init>${_}</button>
                </div>`}
        </div>
      </div>
      ${l ? "" : `<div id='${o}' class='${f.timepickerClockWrapper}' data-te-timepicker-clock-wrapper>
            <div class='${f.timepickerClock}' data-te-timepicker-clock>
              <span class='${f.timepickerMiddleDot}' data-te-timepicker-middle-dot></span>
              <div class='${f.timepickerHandPointer}' data-te-timepicker-hand-pointer>
                <div class='${f.timepickerPointerCircle}' data-te-timepicker-circle></div>
              </div>
              ${s ? '<div class="' + f.timepickerClockInner + '" data-te-timepicker-clock-inner></div>' : ""}
            </div>
          </div>`}
    </div>
    <div id='${n}' class='${f.timepickerFooterWrapper}'>
      <div class="${f.timepickerFooter}">
        ${p ? `<button type='button' class='${f.timepickerFooterButton}' data-te-timepicker-clear tabindex="0" data-te-ripple-init>${a}</button>` : ""}
        <button type='button' class='${f.timepickerFooterButton}' data-te-timepicker-cancel tabindex="0" data-te-ripple-init>${e}</button>
        <button type='button' class='${f.timepickerFooterButton}' data-te-timepicker-submit tabindex="0" data-te-ripple-init>${t}</button>
      </div>
    </div>
  </div>
</div>`, m = `<div id='${r}' class='${f.timepickerInlineWrapper}' data-te-timepicker-wrapper>
        <div class="${f.timepickerInlineContainer}">
          <div class="${f.timepickerInlineElements}" data-te-timepicker-elements-wrapper>
          <div id='${i}' class='${f.timepickerInlineHead}'
          style='padding-right:10px'>
          <div class='${f.timepickerInlineHeadContent}'>
              <div class="${f.timepickerCurrentWrapper}">
                <span class="${f.timepickerInlineHourWrapper}" data-te-timepicker-inline-hour-icons>
                  <span class="${f.timepickerInlineIconUp}" data-te-timepicker-icon-up data-te-timepicker-icon-inline-hour>
                    <span class="${f.timepickerInlineIconSvg}">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>   
                    </span>
                  </span>
                  <button type='button' class='${f.timepickerInlineCurrentButton}' data-te-timepicker-hour data-te-timepicker-current data-te-timepicker-current-inline tabindex="0" data-te-ripple-init>21</button>
                  <span class="${f.timepickerInlineIconDown}" data-te-timepicker-icon-inline-hour data-te-timepicker-icon-down>
                    <span class="${f.timepickerInlineIconSvg}">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>  
                    </span>
                  </span>
                </span>
                <button type='button' class='${f.timepickerInlineDot}' data-te-timepicker-current-inline disabled>:</button>
              <span class="${f.timepickerCurrentMinuteWrapper}">
                <span class="${f.timepickerInlineIconUp}" data-te-timepicker-icon-up data-te-timepicker-icon-inline-minute>
                  <span class="${f.timepickerInlineIconSvg}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </span>
                </span>
                <button type='button' class='${f.timepickerInlineCurrentButton}' data-te-timepicker-minute data-te-timepicker-current data-te-timepicker-current-inline tabindex="0" data-te-ripple-init>21</button>
                <span class="${f.timepickerInlineIconDown}" data-te-timepicker-icon-inline-minute data-te-timepicker-icon-down>
                  <span class="${f.timepickerInlineIconSvg}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg> 
                  </span>
                </span>
              </span>
              </div>
              ${s ? "" : `<div class="${f.timepickerInlineModeWrapper}">
                      <button type='button' class="${f.timepickerInlineModeAm}" data-te-timepicker-am data-te-timepicker-hour-mode tabindex="0" data-te-ripple-init>${u}</button>
                      <button class="${f.timepickerInlineModePm}" data-te-timepicker-hour-mode data-te-timepicker-pm tabindex="0" data-te-ripple-init>${_}</button>
                      <button type='button' class='${f.timepickerInlineSubmitButton}' data-te-timepicker-submit tabindex="0" data-te-ripple-init>${t}</button>
                    </div>`}
              ${s ? `<button class='${f.timepickerInlineSubmitButton}' data-te-timepicker-submit tabindex="0" data-te-ripple-init>${t}</button>` : ""}
          </div>
        </div>
      </div>
    </div>
</div>`;
  return l ? m : g;
};
var Rm = (s, t, e) => {
  const { iconSVG: i } = s;
  return `
  <button id="${t}" tabindex="0" type="button" class="${e.timepickerToggleButton}" data-te-toggle="timepicker" data-te-timepicker-toggle-button data-te-timepicker-icon>
    ${i}
  </button>
`;
};
var un = "data-te-timepicker-disabled";
var us = "data-te-timepicker-active";
var ve = (s) => {
  if (s === "")
    return;
  let t, e, i, n;
  return Gc(s) ? (t = s.getHours(), n = t, e = s.getMinutes(), t %= 12, n === 0 && t === 0 && (i = "AM"), t = t || 12, i === undefined && (i = Number(n) >= 12 ? "PM" : "AM"), e = e < 10 ? `0${e}` : e) : ([t, e, i] = R(s, false), n = t, t %= 12, n === 0 && t === 0 && (i = "AM"), t = t || 12, i === undefined && (i = Number(n) >= 12 ? "PM" : "AM")), {
    hours: t,
    minutes: e,
    amOrPm: i
  };
};
var Gc = (s) => s && Object.prototype.toString.call(s) === "[object Date]" && !Number.isNaN(s);
var La = (s) => {
  if (s === "")
    return;
  let t, e;
  return Gc(s) ? (t = s.getHours(), e = s.getMinutes()) : [t, e] = R(s, false), e = Number(e) < 10 ? `0${Number(e)}` : e, {
    hours: t,
    minutes: e
  };
};
var Pm = (s, t, e) => c.on(document, s, t, ({ target: i }) => {
  if (i.hasAttribute(us))
    return;
  document.querySelectorAll(t).forEach((o) => {
    o.hasAttribute(us) && (h.removeClass(o, e.opacity), o.removeAttribute(us));
  }), h.addClass(i, e.opacity), i.setAttribute(us, "");
});
var Na = ({ clientX: s, clientY: t, touches: e }, i, n = false) => {
  const { left: o, top: r } = i.getBoundingClientRect();
  let a = {};
  return !n || !e ? a = {
    x: s - o,
    y: t - r
  } : n && Object.keys(e).length > 0 && (a = {
    x: e[0].clientX - o,
    y: e[0].clientY - r
  }), a;
};
var ps = () => navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var R = (s, t = true) => t ? s.value.replace(/:/gi, " ").split(" ") : s.replace(/:/gi, " ").split(" ");
var qc = (s, t) => {
  const [e, i, n] = R(s, false), [o, r, a] = R(t, false);
  return n === "PM" && a === "AM" || n === a && e > o || i > r;
};
var Zc = () => {
  const s = new Date, t = s.getHours(), e = s.getMinutes();
  return `${t}:${e < 10 ? `0${e}` : e}`;
};
var Xt = (s, t, e) => {
  if (!t)
    return s;
  let i = Zc();
  return e && (i = `${ve(i).hours}:${ve(i).minutes} ${ve(i).amOrPm}`), (s !== "" && qc(i, s) || s === "") && (s = i), s;
};
var Gt = (s, t, e) => {
  if (!t)
    return s;
  let i = Zc();
  return e && (i = `${ve(i).hours}:${ve(i).minutes} ${ve(i).amOrPm}`), (s !== "" && !qc(i, s) || s === "") && (s = i), s;
};
var Bm = ({ format12: s, maxTime: t, minTime: e, disablePast: i, disableFuture: n }, o, r) => {
  const a = R(o)[1];
  e = Xt(e, i, s), t = Gt(t, n, s);
  const [l, p, u] = R(t, false), [_, f, g] = R(e, false);
  if (u !== undefined || g !== undefined)
    return [r, a];
  if (!(l !== "" && _ === "" && Number(r) > Number(l)) && !(l === "" && _ !== "" && p === undefined && f !== "" && Number(r) < Number(_)))
    return [r, a];
};
var Ma = (s, t, e, i) => {
  s.forEach((n) => {
    t = t === "12" && i ? "0" : t, (n.textContent === "00" || Number(n.textContent === "12" && i ? "0" : n.textContent) > t) && (h.addClass(n, e.tipsDisabled), n.setAttribute(un, ""));
  });
};
var Ra = (s, t, e, i) => {
  s.forEach((n) => {
    t = t === "12" && i ? "0" : t, n.textContent !== "00" && Number(n.textContent === "12" && i ? "0" : n.textContent) < Number(t) && (h.addClass(n, e.tipsDisabled), n.setAttribute(un, ""));
  });
};
var Qc = (s, t, e, i) => {
  if (t === "12" || t === "24")
    return;
  const n = e ? 12 : 24;
  return i === "max" ? (Number(s) === n ? 0 : Number(s)) > Number(t) : (Number(s) === n ? 0 : Number(s)) < Number(t);
};
var Hm = (s, t, e, i, n, o) => {
  s.forEach((r) => {
    (Qc(i, e, o, "max") || Number(r.textContent) > t && Number(i) === Number(e)) && (h.addClass(r, n.tipsDisabled), r.setAttribute(un, ""));
  });
};
var Vm = (s, t, e, i, n, o) => {
  s.forEach((r) => {
    (Qc(i, e, o, "min") || Number(r.textContent) < t && Number(i) === Number(e)) && (h.addClass(r, n.tipsDisabled), r.setAttribute(un, ""));
  });
};
var Wm = (s) => s.startsWith("0") ? Number(s.slice(1)) : Number(s);
var $i = "timepicker";
var M = `data-te-${$i}`;
var Pa = "[data-te-toggle]";
var Us = `te.${$i}`;
var Rt = `.${Us}`;
var Pt = ".data-api";
var Ba = `click${Rt}${Pt}`;
var _s = `keydown${Rt}${Pt}`;
var Ha = `mousedown${Rt}${Pt}`;
var Va = `mouseup${Rt}${Pt}`;
var Wa = `mousemove${Rt}${Pt}`;
var Fa = `mouseleave${Rt}${Pt}`;
var Ya = `mouseover${Rt}${Pt}`;
var ja = `touchmove${Rt}${Pt}`;
var Ka = `touchend${Rt}${Pt}`;
var za = `touchstart${Rt}${Pt}`;
var Fm = `[${M}-am]`;
var Ym = `[${M}-pm]`;
var jm = `[${M}-format24]`;
var fs = `[${M}-current]`;
var ms = `[${M}-hour-mode]`;
var Km = `[${M}-toggle-button]`;
var Gn = `${M}-cancel`;
var Ua = `${M}-clear`;
var qn = `${M}-submit`;
var zm = `${M}-icon`;
var Zn = `${M}-icon-up`;
var Qn = `${M}-icon-down`;
var Um = `${M}-icon-inline-hour`;
var Xm = `${M}-icon-inline-minute`;
var Xa = `${M}-inline-hour-icons`;
var Gm = `${M}-current-inline`;
var qm = "readonly";
var Zm = `${M}-invalid-feedback`;
var Jn = `${M}-is-invalid`;
var Yt = `${M}-disabled`;
var H = `${M}-active`;
var Qm = `${M}-input`;
var pe = `${M}-clock`;
var di = `${M}-clock-inner`;
var to = `${M}-wrapper`;
var Ga = `${M}-clock-wrapper`;
var gs = `${M}-hour`;
var eo = `${M}-minute`;
var bs = `${M}-tips-element`;
var K = `${M}-tips-hours`;
var X = `${M}-tips-minutes`;
var lt = `${M}-tips-inner`;
var vs = `${M}-tips-inner-element`;
var qa = `${M}-middle-dot`;
var io = `${M}-hand-pointer`;
var so = `${M}-circle`;
var Za = `${M}-modal`;
var Jm = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;
var tg = {
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
  iconSVG: Jm,
  withIcon: true,
  pmLabel: "PM",
  amLabel: "AM",
  animations: true
};
var eg = {
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
var ig = {
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
var sg = {
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

class ng {
  constructor(t, e = {}, i) {
    yt(this, "_toggleAmPm", (t2) => {
      t2 === "PM" ? (this._isPmEnabled = true, this._isAmEnabled = false) : t2 === "AM" && (this._isPmEnabled = false, this._isAmEnabled = true);
    });
    yt(this, "_toggleBackgroundColorCircle", (t2) => {
      if (this._modal.querySelector(`${t2}[${H}]`) !== null) {
        h.addStyle(this._circle, {
          backgroundColor: "#1976d2"
        });
        return;
      }
      h.addStyle(this._circle, {
        backgroundColor: "transparent"
      });
    });
    yt(this, "_toggleClassActive", (t2, { textContent: e2 }, i2) => {
      const n = [...t2].find((o) => Number(o) === Number(e2));
      return i2.forEach((o) => {
        if (!o.hasAttribute(Yt)) {
          if (o.textContent === n) {
            h.addClass(o, this._classes.tipsActive), o.setAttribute(H, "");
            return;
          }
          h.removeClass(o, this._classes.tipsActive), o.removeAttribute(H);
        }
      });
    });
    yt(this, "_makeMinutesDegrees", (t2, e2) => {
      const { increment: i2 } = this._options;
      return t2 < 0 ? (e2 = Math.round(360 + t2 / 6) % 60, t2 = 360 + Math.round(t2 / 6) * 6) : (e2 = Math.round(t2 / 6) % 60, t2 = Math.round(t2 / 6) * 6), i2 && (t2 = Math.round(t2 / 30) * 30, e2 = Math.round(t2 / 6) * 6 / 6, e2 === 60 && (e2 = "00")), t2 >= 360 && (t2 = 0), {
        degrees: t2,
        minute: e2,
        addDegrees: i2 ? 30 : 6
      };
    });
    yt(this, "_makeHourDegrees", (t2, e2, i2) => {
      if (t2)
        return this._hasTargetInnerClass(t2) ? e2 < 0 ? (i2 = Math.round(360 + e2 / 30) % 24, e2 = 360 + e2) : (i2 = Math.round(e2 / 30) + 12, i2 === 12 && (i2 = "00")) : e2 < 0 ? (i2 = Math.round(360 + e2 / 30) % 12, e2 = 360 + e2) : (i2 = Math.round(e2 / 30) % 12, (i2 === 0 || i2 > 12) && (i2 = 12)), e2 >= 360 && (e2 = 0), {
          degrees: e2,
          hour: i2,
          addDegrees: 30
        };
    });
    yt(this, "_makeInnerHoursDegrees", (t2, e2) => (t2 < 0 ? (e2 = Math.round(360 + t2 / 30) % 24, t2 = 360 + t2) : (e2 = Math.round(t2 / 30) + 12, e2 === 12 && (e2 = "00")), {
      degrees: t2,
      hour: e2,
      addDegrees: 30
    }));
    yt(this, "_getAppendClock", (t2 = [], e2 = `[${pe}]`, i2) => {
      let { minTime: n, maxTime: o } = this._options;
      const { inline: r, format12: a, disablePast: l, disableFuture: p } = this._options;
      n = Xt(n, l, a), o = Gt(o, p, a);
      const [u, _, f] = R(o, false), [g, m, b] = R(n, false);
      !r && a && this._isInvalidTimeFormat && !this._AM.hasAttribute(H) && (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, ""));
      const v = d.findOne(e2), C = 360 / t2.length;
      function w(k) {
        return k * (Math.PI / 180);
      }
      if (v === null)
        return;
      const E = (v.offsetWidth - 32) / 2, T = (v.offsetHeight - 32) / 2, A = E - 4;
      setTimeout(() => {
        let k;
        a && (k = d.findOne(`${ms}[${H}]`).textContent), this._handleDisablingTipsMinTime(k, b, m, g), this._handleDisablingTipsMaxTime(k, f, _, u);
      }, 0), [...t2].forEach((k, I) => {
        const O = w(I * C), x = $("span"), L = $("span");
        L.innerHTML = k, h.addClass(x, this._classes.tips), x.setAttribute(i2, "");
        const { offsetWidth: S, offsetHeight: N } = x;
        return h.addStyle(x, {
          left: `${E + Math.sin(O) * A - S}px`,
          bottom: `${T + Math.cos(O) * A - N}px`
        }), t2.includes("05") && x.setAttribute(X, ""), t2.includes("13") ? L.setAttribute(vs, "") : L.setAttribute(bs, ""), x.appendChild(L), v.appendChild(x);
      });
    });
    this._element = t, this._element && y.setData(t, Us, this), this._document = document, this._options = this._getConfig(e), this._classes = this._getClasses(i), this._currentTime = null, this._toggleButtonId = rt("timepicker-toggle-"), this.hoursArray = [
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
    ], this.input = d.findOne("input", this._element), this.dataWithIcon = t.dataset.withIcon, this.dataToggle = t.dataset.toggle, this.customIcon = d.findOne(Km, this._element), this._checkToggleButton(), this.inputFormatShow = d.findOne(jm, this._element), this.inputFormat = this.inputFormatShow === null ? "" : Object.values(this.inputFormatShow.dataset)[0], this.elementToggle = d.findOne(Pa, this._element), this.toggleElement = Object.values(t.querySelector(Pa).dataset)[0], this._hour = null, this._minutes = null, this._AM = null, this._PM = null, this._wrapper = null, this._modal = null, this._hand = null, this._circle = null, this._focusTrap = null, this._popper = null, this._interval = null, this._timeoutInterval = null, this._inputValue = this._options.defaultTime !== "" ? this._options.defaultTime : this.input.value, this._options.format24 && (this._options.format12 = false, this._currentTime = La(this._inputValue)), this._options.format12 && (this._options.format24 = false, this._currentTime = ve(this._inputValue)), this._options.readOnly && this.input.setAttribute(qm, true), this.inputFormat === "true" && this.inputFormat !== "" && (this._options.format12 = false, this._options.format24 = true, this._currentTime = La(this._inputValue)), this._animations = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && this._options.animations, this.init(), this._isHours = true, this._isMinutes = false, this._isInvalidTimeFormat = false, this._isMouseMove = false, this._isInner = false, this._isAmEnabled = false, this._isPmEnabled = false, this._options.format12 && !this._options.defaultTime && (this._isPmEnabled = true), this._objWithDataOnChange = { degrees: null }, this._scrollBar = new qe;
  }
  static get NAME() {
    return $i;
  }
  init() {
    const { format12: t, format24: e, enableValidation: i } = this._options;
    let n, o, r;
    if (this.input.setAttribute(Qm, ""), this._currentTime !== undefined) {
      const { hours: a, minutes: l, amOrPm: p } = this._currentTime;
      n = Number(a) < 10 ? 0 : "", o = `${n}${Number(a)}:${l}`, r = p, t ? this.input.value = `${o} ${r}` : e && (this.input.value = `${o}`);
    } else
      n = "", o = "", r = "", this.input.value = "";
    this.input.value.length > 0 && this.input.value !== "" && (this.input.setAttribute(H, ""), c.trigger(this.input, "input")), !(this._options === null && this._element === null) && (i && this._getValidate("keydown change blur focus"), this._handleOpen(), this._listenToToggleKeydown());
  }
  dispose() {
    this._removeModal(), this._element !== null && y.removeData(this._element, Us), setTimeout(() => {
      this._element = null, this._options = null, this.input = null, this._focusTrap = null;
    }, 350), c.off(this._document, "click", `[data-te-toggle='${this.toggleElement}']`), c.off(this._element, "keydown", `[data-te-toggle='${this.toggleElement}']`);
  }
  update(t = {}) {
    this._options = this._getConfig({ ...this._options, ...t });
  }
  _checkToggleButton() {
    this.customIcon === null && (this.dataWithIcon !== undefined && (this._options.withIcon = null, this.dataWithIcon === "true" && this._appendToggleButton(this._options)), this._options.withIcon && this._appendToggleButton(this._options));
  }
  _appendToggleButton() {
    const t = Rm(this._options, this._toggleButtonId, this._classes);
    this.input.insertAdjacentHTML("afterend", t);
  }
  _getDomElements() {
    this._hour = d.findOne(`[${gs}]`), this._minutes = d.findOne(`[${eo}]`), this._AM = d.findOne(Fm), this._PM = d.findOne(Ym), this._wrapper = d.findOne(`[${to}]`), this._modal = d.findOne(`[${Za}]`), this._hand = d.findOne(`[${io}]`), this._circle = d.findOne(`[${so}]`), this._clock = d.findOne(`[${pe}]`), this._clockInner = d.findOne(`[${di}]`);
  }
  _handlerMaxMinHoursOptions(t, e, i, n, o, r) {
    if (!e && !i)
      return true;
    const { format24: a, format12: l, disablePast: p, disableFuture: u } = this._options, { _isAmEnabled: _, _isPmEnabled: f } = this, g = r.keyCode, m = r.target.hasAttribute(di) || r.target.hasAttribute(lt) || r.target.hasAttribute(vs);
    i = Xt(i, p, l), e = Gt(e, u, l), typeof e != "number" && (e = R(e, false)[0]);
    const b = e !== "" ? e * 30 : "", v = i !== "" ? i * 30 : "";
    t < 0 && (t = 360 + t), t = t === 360 ? 0 : t;
    const C = () => {
      const I = document.querySelectorAll(`[${bs}]`), O = document.querySelectorAll(`[${vs}]`), x = Wm(this._hour.innerText);
      let L, S, N;
      return g === at ? S = 1 : g === z && (S = -1), x === 12 && g === at ? N = 1 : x === 0 && g === at ? N = 13 : x === 0 && g === z ? N = 23 : x === 13 && g === z ? N = 0 : x === 1 && g === z ? N = 12 : N = x + S, I.forEach((P) => {
        Number(P.textContent) === N && (L = P);
      }), O.forEach((P) => {
        Number(P.textContent) === N && (L = P);
      }), !L.parentElement.hasAttribute(Yt);
    }, w = () => {
      const I = i !== "" && i > 12 ? (i - 12) * 30 : "", O = e !== "" && e > 12 ? (e - 12) * 30 : "";
      if (!(I && t < I || O && t > O || e && e < 12))
        return true;
    };
    if (a && r.type !== "keydown" && m)
      return w();
    if (r.type === "keydown")
      return C();
    const E = !o || o === "PM" && f || i !== "" && o === "AM" && _, T = !n || n === "PM" && f || e !== "" && n === "AM" && _, A = () => {
      const I = v === 360 && l ? 0 : v;
      if (i) {
        if (o === "PM" && _ || E && t < I)
          return;
      } else
        return true;
      return true;
    }, k = () => {
      const I = b === 360 && l ? 0 : b;
      if (e) {
        if (n === "AM" && f || T && t > I)
          return;
      } else
        return true;
      return true;
    };
    return A() && k();
  }
  _handleKeyboard() {
    c.on(this._document, _s, "", (t) => {
      let e, i, n;
      const {
        increment: o,
        maxTime: r,
        minTime: a,
        format12: l,
        disablePast: p,
        disableFuture: u
      } = this._options;
      let _ = R(a, false)[0], f = R(r, false)[0];
      const g = R(a, false)[2], m = R(r, false)[2];
      _ = Xt(_, p, l), f = Gt(f, u, l), typeof f != "number" && (f = R(f, false)[0]);
      const b = d.findOne(`[${X}]`) === null, v = d.findOne(`[${lt}]`) !== null, C = Number(this._hand.style.transform.replace(/[^\d-]/g, "")), w = d.find(`[${X}]`, this._modal), E = d.find(`[${K}]`, this._modal), T = d.find(`[${lt}]`, this._modal);
      let A = this._makeHourDegrees(t.target, C, e).hour;
      const { degrees: k, addDegrees: I } = this._makeHourDegrees(t.target, C, e);
      let { minute: O, degrees: x } = this._makeMinutesDegrees(C, i);
      const L = this._makeMinutesDegrees(C, i).addDegrees;
      let { hour: S } = this._makeInnerHoursDegrees(C, n);
      if (t.keyCode === Fi) {
        const N = d.findOne(`[${Gn}]`, this._modal);
        c.trigger(N, "click");
      } else if (b) {
        if (v && (t.keyCode === Ve && (this._isInner = false, h.addStyle(this._hand, {
          height: "calc(40% + 1px)"
        }), this._hour.textContent = this._setHourOrMinute(A > 12 ? 1 : A), this._toggleClassActive(this.hoursArray, this._hour, E), this._toggleClassActive(this.innerHours, this._hour, T)), t.keyCode === He && (this._isInner = true, h.addStyle(this._hand, {
          height: "21.5%"
        }), this._hour.textContent = this._setHourOrMinute(S >= 24 || S === "00" ? 0 : S), this._toggleClassActive(this.innerHours, this._hour, T), this._toggleClassActive(this.hoursArray, this._hour - 1, E))), t.keyCode === at) {
          if (!this._handlerMaxMinHoursOptions(k + 30, f, _, m, g, t))
            return;
          h.addStyle(this._hand, {
            transform: `rotateZ(${k + I}deg)`
          }), this._isInner ? (S += 1, S === 24 ? S = 0 : (S === 25 || S === "001") && (S = 13), this._hour.textContent = this._setHourOrMinute(S), this._toggleClassActive(this.innerHours, this._hour, T)) : (A += 1, this._hour.textContent = this._setHourOrMinute(A > 12 ? 1 : A), this._toggleClassActive(this.hoursArray, this._hour, E));
        }
        if (t.keyCode === z) {
          if (!this._handlerMaxMinHoursOptions(k - 30, f, _, m, g, t))
            return;
          h.addStyle(this._hand, {
            transform: `rotateZ(${k - I}deg)`
          }), this._isInner ? (S -= 1, S === 12 ? S = 0 : S === -1 && (S = 23), this._hour.textContent = this._setHourOrMinute(S), this._toggleClassActive(this.innerHours, this._hour, T)) : (A -= 1, this._hour.textContent = this._setHourOrMinute(A === 0 ? 12 : A), this._toggleClassActive(this.hoursArray, this._hour, E));
        }
      } else
        t.keyCode === at && (x += L, h.addStyle(this._hand, {
          transform: `rotateZ(${x}deg)`
        }), O += 1, o && (O += 4, O === "0014" && (O = 5)), this._minutes.textContent = this._setHourOrMinute(O > 59 ? 0 : O), this._toggleClassActive(this.minutesArray, this._minutes, w), this._toggleBackgroundColorCircle(`[${X}]`)), t.keyCode === z && (x -= L, h.addStyle(this._hand, {
          transform: `rotateZ(${x}deg)`
        }), o ? O -= 5 : O -= 1, O === -1 ? O = 59 : O === -5 && (O = 55), this._minutes.textContent = this._setHourOrMinute(O), this._toggleClassActive(this.minutesArray, this._minutes, w), this._toggleBackgroundColorCircle(`[${X}]`));
    });
  }
  _setActiveClassToTipsOnOpen(t, ...e) {
    if (!this._isInvalidTimeFormat)
      if (this._options.format24) {
        const i = d.find(`[${K}]`, this._modal), n = d.find(`[${lt}]`, this._modal);
        this._addActiveClassToTip(i, t), this._addActiveClassToTip(n, t);
      } else {
        [...e].filter((n) => (n === "PM" ? (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, "")) : n === "AM" ? (h.addClass(this._AM, this._classes.opacity), this._AM.setAttribute(H, "")) : (h.removeClass(this._AM, this._classes.opacity), h.removeClass(this._PM, this._classes.opacity), this._AM.removeAttribute(H), this._PM.removeAttribute(H)), n));
        const i = d.find(`[${K}]`, this._modal);
        this._addActiveClassToTip(i, t);
      }
  }
  _setTipsAndTimesDependOnInputValue(t, e) {
    const { inline: i, format12: n } = this._options;
    if (this._isInvalidTimeFormat)
      this._hour.textContent = "12", this._minutes.textContent = "00", i || h.addStyle(this._hand, {
        transform: "rotateZ(0deg)"
      }), n && (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, ""));
    else {
      const o = t > 12 ? t * 30 - 360 : t * 30;
      this._hour.textContent = t, this._minutes.textContent = e, i || (h.addStyle(this._hand, {
        transform: `rotateZ(${o}deg)`
      }), h.addStyle(this._circle, {
        backgroundColor: "#1976d2"
      }), (Number(t) > 12 || t === "00") && h.addStyle(this._hand, {
        height: "21.5%"
      }));
    }
  }
  _listenToToggleKeydown() {
    c.on(this._element, "keydown", `[data-te-toggle='${this.toggleElement}']`, (t) => {
      t.keyCode === ct && (t.preventDefault(), c.trigger(this.elementToggle, "click"));
    });
  }
  _handleOpen() {
    const t = this._getContainer();
    re.on(this._element, "click", `[data-te-toggle='${this.toggleElement}']`, (e) => {
      if (this._options === null)
        return;
      const i = h.getDataAttribute(this.input, "toggle") !== null ? 200 : 0;
      setTimeout(() => {
        h.addStyle(this.elementToggle, {
          pointerEvents: "none"
        }), this.elementToggle.blur();
        let n;
        R(this.input)[0] === "" ? n = ["12", "00", "PM"] : n = R(this.input);
        const { modalID: o, inline: r, format12: a } = this._options, [l, p, u] = n, _ = $("div");
        if ((Number(l) > 12 || l === "00") && (this._isInner = true), this.input.blur(), e.target.blur(), _.innerHTML = Mm(this._options, this._classes), h.addClass(_, this._classes.modal), _.setAttribute(Za, ""), _.setAttribute("role", "dialog"), _.setAttribute("tabIndex", "-1"), _.setAttribute("id", o), r ? (this._popper = Ce(this.input, _, {
          placement: "bottom-start"
        }), t.appendChild(_)) : (t.appendChild(_), this._scrollBar.hide()), this._getDomElements(), this._animations ? this._toggleBackdropAnimation() : h.addClass(this._wrapper, this._classes.opacity), this._setActiveClassToTipsOnOpen(l, p, u), this._appendTimes(), this._setActiveClassToTipsOnOpen(l, p, u), this._setTipsAndTimesDependOnInputValue(l, p), this.input.value === "") {
          const f = d.find(`[${K}]`, this._modal);
          a && (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, "")), this._hour.textContent = "12", this._minutes.textContent = "00", this._addActiveClassToTip(f, Number(this._hour.textContent));
        }
        if (this._handleSwitchTimeMode(), this._handleOkButton(), this._handleClose(), r)
          this._handleHoverInlineBtn(), this._handleDocumentClickInline(), this._handleInlineClicks();
        else {
          this._handleSwitchHourMinute(), this._handleClockClick(), this._handleKeyboard();
          const f = document.querySelector(`${fs}[${H}]`);
          h.addClass(f, this._classes.opacity), h.addStyle(this._hour, {
            pointerEvents: "none"
          }), h.addStyle(this._minutes, {
            pointerEvents: ""
          });
        }
        this._focusTrap = new Wi(this._wrapper, {
          event: "keydown",
          condition: ({ key: f }) => f === "Tab"
        }), this._focusTrap.trap();
      }, i);
    });
  }
  _handleInlineClicks() {
    let t, e;
    const i = (g) => {
      let m = g;
      return m > 59 ? m = 0 : m < 0 && (m = 59), m;
    }, n = (g) => {
      let m = g;
      return this._options.format24 ? (m > 24 ? m = 1 : m < 0 && (m = 23), m > 23 && (m = 0)) : (m > 12 ? m = 1 : m < 1 && (m = 12), m > 12 && (m = 1)), m;
    }, o = (g) => {
      const m = n(g);
      this._hour.textContent = this._setHourOrMinute(m);
    }, r = (g) => {
      const m = i(g);
      this._minutes.textContent = this._setHourOrMinute(m);
    }, a = () => {
      t = n(t) + 1, o(t);
    }, l = () => {
      e = i(e) + 1, r(e);
    }, p = () => {
      t = n(t) - 1, o(t);
    }, u = () => {
      e = i(e) - 1, r(e);
    }, _ = () => {
      clearInterval(this._interval), clearTimeout(this._timeoutInterval);
    }, f = (g) => {
      _(), this._timeoutInterval = setTimeout(() => {
        this._interval = setInterval(g, 100);
      }, 500);
    };
    re.on(this._modal, "click mousedown mouseup touchstart touchend contextmenu", `[${Zn}], [${Qn}]`, (g) => {
      t = Number(this._hour.textContent), e = Number(this._minutes.textContent);
      const { target: m, type: b } = g, v = b === "mousedown" || b === "touchstart";
      m.closest(`[${Zn}]`) ? m.closest(`[${Zn}]`).parentNode.hasAttribute(Xa) ? v ? f(a) : b === "mouseup" || b === "touchend" || b === "contextmenu" ? _() : a() : v ? f(l) : b === "mouseup" || b === "touchend" || b === "contextmenu" ? _() : l() : m.closest(`[${Qn}]`) && (m.closest(`[${Qn}]`).parentNode.hasAttribute(Xa) ? v ? f(p) : b === "mouseup" || b === "touchend" ? _() : p() : v ? f(u) : b === "mouseup" || b === "touchend" ? _() : u());
    }), c.on(window, _s, (g) => {
      const m = g.code, b = document.activeElement.hasAttribute(gs), v = document.activeElement.hasAttribute(eo), C = document.activeElement === document.body;
      switch (t = Number(this._hour.textContent), e = Number(this._minutes.textContent), m) {
        case "ArrowUp":
          g.preventDefault(), C || b ? (this._hour.focus(), a()) : v && l();
          break;
        case "ArrowDown":
          g.preventDefault(), C || b ? (this._hour.focus(), p()) : v && u();
          break;
      }
    });
  }
  _handleClose() {
    c.on(this._modal, "click", `[${to}], [${Gn}], [${Ua}]`, ({ target: t }) => {
      const { closeModalOnBackdropClick: e } = this._options, i = () => {
        var n;
        h.addStyle(this.elementToggle, {
          pointerEvents: "auto"
        }), this._animations && this._toggleBackdropAnimation(true), this._removeModal(), (n = this._focusTrap) == null || n.disable(), this._focusTrap = null, this.elementToggle ? this.elementToggle.focus() : this.input && this.input.focus();
      };
      if (t.hasAttribute(Ua)) {
        this._toggleAmPm("PM"), this.input.value = "", this.input.removeAttribute(H);
        let n;
        R(this.input)[0] === "" ? n = ["12", "00", "PM"] : n = R(this.input);
        const [o, r, a] = n;
        this._setTipsAndTimesDependOnInputValue("12", "00"), this._setActiveClassToTipsOnOpen(o, r, a), this._hour.click();
      } else
        (t.hasAttribute(Gn) || t.hasAttribute(qn) || t.hasAttribute(to) && e) && i();
    });
  }
  showValueInput() {
    return this.input.value;
  }
  _handleOkButton() {
    re.on(this._modal, "click", `[${qn}]`, () => {
      let { maxTime: t, minTime: e } = this._options;
      const {
        format12: i,
        format24: n,
        readOnly: o,
        focusInputAfterApprove: r,
        disablePast: a,
        disableFuture: l
      } = this._options, p = this._document.querySelector(`${ms}[${H}]`), u = `${this._hour.textContent}:${this._minutes.textContent}`, _ = Number(this._hour.textContent), f = _ === 12 && i ? 0 : _, g = Number(this._minutes.textContent);
      e = Xt(e, a, i), t = Gt(t, l, i);
      let [m, b, v] = R(t, false), [C, w, E] = R(e, false);
      C = C === "12" && i ? "00" : C, m = m === "12" && i ? "00" : m;
      const T = f < Number(C), A = f > Number(m);
      let k = true;
      p && (k = v === p.textContent);
      let I = true;
      p && (I = E === p.textContent);
      const O = g > b && f === Number(m), x = g < w && f === Number(C);
      if (this.input.setAttribute(H, ""), h.addStyle(this.elementToggle, {
        pointerEvents: "auto"
      }), t !== "") {
        if (k && (A || O))
          return;
        if (v === "AM" && p.textContent === "PM")
          return;
      }
      e !== "" && (I && (T || x) || E === "PM" && p.textContent === "AM") || Bm(this._options, this.input, this._hour.textContent) !== undefined && (this._isInvalidTimeFormat && this.input.removeAttribute(Jn), !o && r && this.input.focus(), h.addStyle(this.elementToggle, {
        pointerEvents: "auto"
      }), n ? this.input.value = u : p === null ? this.input.value = `${u} PM` : this.input.value = `${u} ${p.textContent}`, this._animations && this._toggleBackdropAnimation(true), this._removeModal(), c.trigger(this.input, "input.te.timepicker"), c.trigger(this.input, "input"));
    });
  }
  _handleHoverInlineBtn() {
    re.on(this._modal, "mouseover mouseleave", `[${Gm}]`, ({ type: t, target: e }) => {
      const i = d.find(`[${Um}]`, this._modal), n = d.find(`[${Xm}]`, this._modal), o = (l, p) => l.forEach((u) => {
        if (p) {
          h.addClass(u, this._classes.opacity), u.setAttribute(H, "");
          return;
        }
        h.removeClass(u, this._classes.opacity), u.removeAttribute(H);
      }), a = e.hasAttribute(gs) ? i : n;
      o(a, t === "mouseover");
    });
  }
  _handleDocumentClickInline() {
    c.on(document, Ba, ({ target: t }) => {
      if (this._modal && !this._modal.contains(t) && !t.hasAttribute(zm)) {
        if (clearInterval(this._interval), h.addStyle(this.elementToggle, {
          pointerEvents: "auto"
        }), this._removeModal(), !this._animations)
          return;
        this._toggleBackdropAnimation(true);
      }
    });
  }
  _handleSwitchHourMinute() {
    Pm("click", fs, this._classes), c.on(this._modal, "click", fs, () => {
      const { format24: t } = this._options, e = d.find(fs, this._modal), i = d.find(`[${X}]`, this._modal), n = d.find(`[${K}]`, this._modal), o = d.find(`[${lt}]`, this._modal), r = Number(this._hour.textContent), a = Number(this._minutes.textContent), l = (p, u) => {
        n.forEach((f) => f.remove()), i.forEach((f) => f.remove()), h.addClass(this._hand, this._classes.transform), setTimeout(() => {
          h.removeClass(this._hand, this._classes.transform);
        }, 401), this._getAppendClock(p, `[${pe}]`, u);
        const _ = () => {
          const f = d.find(`[${K}]`, this._modal), g = d.find(`[${X}]`, this._modal);
          this._addActiveClassToTip(f, r), this._addActiveClassToTip(g, a);
        };
        if (!t)
          setTimeout(() => {
            _();
          }, 401);
        else {
          const f = d.find(`[${lt}]`, this._modal);
          setTimeout(() => {
            this._addActiveClassToTip(f, r), _();
          }, 401);
        }
      };
      e.forEach((p) => {
        p.hasAttribute(H) && (p.hasAttribute(eo) ? (h.addClass(this._hand, this._classes.transform), h.addStyle(this._hand, {
          transform: `rotateZ(${this._minutes.textContent * 6}deg)`,
          height: "calc(40% + 1px)"
        }), t && o.length > 0 && o.forEach((u) => u.remove()), l(this.minutesArray, X), this._hour.style.pointerEvents = "", this._minutes.style.pointerEvents = "none") : p.hasAttribute(gs) && (h.addStyle(this._hand, {
          transform: `rotateZ(${this._hour.textContent * 30}deg)`
        }), Number(this._hour.textContent) > 12 ? (h.addStyle(this._hand, {
          transform: `rotateZ(${this._hour.textContent * 30 - 360}deg)`,
          height: "21.5%"
        }), Number(this._hour.textContent) > 12 && h.addStyle(this._hand, {
          height: "21.5%"
        })) : h.addStyle(this._hand, {
          height: "calc(40% + 1px)"
        }), t && this._getAppendClock(this.innerHours, `[${di}]`, lt), o.length > 0 && o.forEach((u) => u.remove()), l(this.hoursArray, K), h.addStyle(this._hour, {
          pointerEvents: "none"
        }), h.addStyle(this._minutes, {
          pointerEvents: ""
        })));
      });
    });
  }
  _handleDisablingTipsMaxTime(t, e, i, n) {
    if (!this._options.maxTime && !this._options.disableFuture)
      return;
    const o = d.find(`[${K}]`), r = d.find(`[${lt}]`), a = d.find(`[${X}]`);
    if (!e || e === t) {
      Ma(r, n, this._classes, this._options.format12), Ma(o, n, this._classes, this._options.format12), Hm(a, i, n, this._hour.textContent, this._classes, this._options.format12);
      return;
    }
    e === "AM" && t === "PM" && (o.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(Yt, "");
    }), a.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(Yt, "");
    }));
  }
  _handleDisablingTipsMinTime(t, e, i, n) {
    if (!this._options.minTime && !this._options.disablePast)
      return;
    const o = d.find(`[${K}]`), r = d.find(`[${lt}]`), a = d.find(`[${X}]`);
    !e || e === t ? (Ra(o, n, this._classes, this._options.format12), Ra(r, n, this._classes, this._options.format12), Vm(a, i, n, this._hour.textContent, this._classes, this._options.format12)) : e === "PM" && t === "AM" && (o.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(Yt, "");
    }), a.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(Yt, "");
    }));
  }
  _handleSwitchTimeMode() {
    c.on(document, "click", ms, ({ target: t }) => {
      let { maxTime: e, minTime: i } = this._options;
      const { disablePast: n, disableFuture: o, format12: r } = this._options;
      i = Xt(i, n, r), e = Gt(e, o, r);
      const [a, l, p] = R(e, false), [u, _, f] = R(i, false), g = d.find(`[${K}]`), m = d.find(`[${X}]`);
      (() => {
        g.forEach((v) => {
          h.removeClass(v, this._classes.tipsDisabled), v.removeAttribute(Yt);
        }), m.forEach((v) => {
          h.removeClass(v, this._classes.tipsDisabled), v.removeAttribute(Yt);
        });
      })(), this._handleDisablingTipsMinTime(t.textContent, f, _, u), this._handleDisablingTipsMaxTime(t.textContent, p, l, a), this._toggleAmPm(t.textContent), t.hasAttribute(H) || (d.find(ms).forEach((C) => {
        C.hasAttribute(H) && (h.removeClass(C, this._classes.opacity), C.removeAttribute(H));
      }), h.addClass(t, this._classes.opacity), t.setAttribute(H, ""));
    });
  }
  _handleClockClick() {
    let { maxTime: t, minTime: e } = this._options;
    const { disablePast: i, disableFuture: n, format12: o } = this._options;
    e = Xt(e, i, o), t = Gt(t, n, o);
    const r = R(t, false)[2], a = R(e, false)[2], l = R(t, false)[0], p = R(e, false)[0], u = d.findOne(`[${Ga}]`);
    re.on(document, `${Ha} ${Va} ${Wa} ${Fa} ${Ya} ${za} ${ja} ${Ka}`, "", (_) => {
      ps() || _.preventDefault();
      const { type: f, target: g } = _, { closeModalOnMinutesClick: m, switchHoursToMinutesOnClick: b } = this._options, v = d.findOne(`[${X}]`, this._modal) !== null, C = d.findOne(`[${K}]`, this._modal) !== null, w = d.findOne(`[${lt}]`, this._modal) !== null, E = d.find(`[${X}]`, this._modal), T = Na(_, u), A = u.offsetWidth / 2;
      let k = Math.atan2(T.y - A, T.x - A);
      if (ps()) {
        const L = Na(_, u, true);
        k = Math.atan2(L.y - A, L.x - A);
      }
      let I = null, O = null, x = null;
      if (f === "mousedown" || f === "mousemove" || f === "touchmove" || f === "touchstart")
        (f === "mousedown" || f === "touchstart" || f === "touchmove") && (this._hasTargetInnerClass(g) || g.hasAttribute(Ga) || g.hasAttribute(pe) || g.hasAttribute(X) || g.hasAttribute(K) || g.hasAttribute(so) || g.hasAttribute(io) || g.hasAttribute(qa) || g.hasAttribute(bs)) && (this._isMouseMove = true, ps() && _.touches && (I = _.touches[0].clientX, O = _.touches[0].clientY, x = document.elementFromPoint(I, O)));
      else if (f === "mouseup" || f === "touchend") {
        if (this._isMouseMove = false, this._hasTargetInnerClass(g) || g.hasAttribute(pe) || g.hasAttribute(K) || g.hasAttribute(so) || g.hasAttribute(io) || g.hasAttribute(qa) || g.hasAttribute(bs)) {
          if ((C || w) && b) {
            const L = Number(this._hour.textContent) > l || Number(this._hour.textContent) < p;
            if (this._options.format24 && l !== "" && p !== "" && L)
              return;
            if (this._options.format24 && p !== "" && Number(this._hour.textContent) < p)
              return;
          }
          c.trigger(this._minutes, "click");
        }
        if (v && m) {
          const L = d.findOne(`[${qn}]`, this._modal);
          c.trigger(L, "click");
        }
      }
      if (v) {
        let L;
        const S = Math.trunc(k * 180 / Math.PI) + 90, { degrees: N, minute: P } = this._makeMinutesDegrees(S, L);
        if (this._handlerMaxMinMinutesOptions(N, P) === undefined)
          return;
        const { degrees: tt, minute: et } = this._handlerMaxMinMinutesOptions(N, P);
        if (this._isMouseMove) {
          if (h.addStyle(this._hand, {
            transform: `rotateZ(${tt}deg)`
          }), et === undefined)
            return;
          const U = () => et >= 10 || et === "00" ? et : `0${et}`;
          this._minutes.textContent = U(), this._toggleClassActive(this.minutesArray, this._minutes, E), this._toggleBackgroundColorCircle(`[${X}]`), this._objWithDataOnChange.degreesMinutes = tt, this._objWithDataOnChange.minutes = et;
        }
      }
      if (C || w) {
        let L, S = Math.trunc(k * 180 / Math.PI) + 90;
        if (S = Math.round(S / 30) * 30, h.addStyle(this._circle, {
          backgroundColor: "#1976d2"
        }), this._makeHourDegrees(g, S, L) === undefined)
          return;
        const N = () => {
          if (ps() && S && x) {
            const { degrees: P, hour: tt } = this._makeHourDegrees(x, S, L);
            return this._handleMoveHand(x, tt, P);
          } else {
            const { degrees: P, hour: tt } = this._makeHourDegrees(g, S, L);
            return this._handleMoveHand(g, tt, P);
          }
        };
        this._objWithDataOnChange.degreesHours = S, this._handlerMaxMinHoursOptions(S, l, p, r, a, _) && N();
      }
      _.stopPropagation();
    });
  }
  _hasTargetInnerClass(t) {
    return t.hasAttribute(di) || t.hasAttribute(lt) || t.hasAttribute(vs);
  }
  _handleMoveHand(t, e, i) {
    const n = d.find(`[${K}]`, this._modal), o = d.find(`[${lt}]`, this._modal);
    this._isMouseMove && (this._hasTargetInnerClass(t) ? h.addStyle(this._hand, {
      height: "21.5%"
    }) : h.addStyle(this._hand, {
      height: "calc(40% + 1px)"
    }), h.addStyle(this._hand, {
      transform: `rotateZ(${i}deg)`
    }), this._hour.textContent = e >= 10 || e === "00" ? e : `0${e}`, this._toggleClassActive(this.hoursArray, this._hour, n), this._toggleClassActive(this.innerHours, this._hour, o), this._objWithDataOnChange.hour = e >= 10 || e === "00" ? e : `0${e}`);
  }
  _handlerMaxMinMinutesOptions(t, e) {
    let { maxTime: i, minTime: n } = this._options;
    const { format12: o, increment: r, disablePast: a, disableFuture: l } = this._options;
    n = Xt(n, a, o), i = Gt(i, l, o);
    const p = R(i, false)[1], u = R(n, false)[1], _ = R(i, false)[0], f = R(n, false)[0], g = f === "12" && o ? "0" : f, m = _ === "12" && o ? "0" : _, b = R(i, false)[2], v = R(n, false)[2], C = p !== "" ? p * 6 : "", w = u !== "" ? u * 6 : "", E = Number(this._hour.textContent), T = E === 12 && o ? 0 : E;
    if (!b && !v) {
      if (i !== "" && n !== "") {
        if (Number(m) === T && t > C || Number(g) === T && t < w)
          return t;
      } else if (n !== "" && T <= Number(g)) {
        if (t <= w - 6)
          return t;
      } else if (i !== "" && T >= Number(m) && t >= C + 6)
        return t;
    } else {
      if (n !== "") {
        if (v === "PM" && this._isAmEnabled)
          return;
        if (v === "PM" && this._isPmEnabled) {
          if (T < Number(g))
            return;
          if (T <= Number(g) && t <= w - 6)
            return t;
        } else if (v === "AM" && this._isAmEnabled) {
          if (T < Number(g))
            return;
          if (T <= Number(g) && t <= w - 6)
            return t;
        }
      }
      if (i !== "") {
        if (b === "AM" && this._isPmEnabled)
          return;
        if (b === "PM" && this._isPmEnabled) {
          if (T >= Number(m) && t >= C + 6)
            return t;
        } else if (b === "AM" && this._isAmEnabled && T >= Number(m) && t >= C + 6)
          return t;
      }
    }
    return r && (t = Math.round(t / 30) * 30), t < 0 ? t = 360 + t : t >= 360 && (t = 0), {
      degrees: t,
      minute: e
    };
  }
  _removeModal() {
    this._animations ? setTimeout(() => {
      this._removeModalElements(), this._scrollBar.reset();
    }, 300) : (this._removeModalElements(), this._scrollBar.reset()), re.off(this._document, `${Ba} ${_s} ${Ha} ${Va} ${Wa} ${Fa} ${Ya} ${za} ${ja} ${Ka}`), c.off(window, _s);
  }
  _removeModalElements() {
    this._modal && this._modal.remove();
  }
  _toggleBackdropAnimation(t = false) {
    t ? this._wrapper.classList.add("animate-[fade-out_350ms_ease-in-out]") : (this._wrapper.classList.add("animate-[fade-in_350ms_ease-in-out]"), this._options.inline || h.addClass(this._clock, this._classes.clockAnimation)), setTimeout(() => {
      this._wrapper.classList.remove("animate-[fade-out_350ms_ease-in-out]", "animate-[fade-in_350ms_ease-in-out]");
    }, 351);
  }
  _addActiveClassToTip(t, e) {
    t.forEach((i) => {
      Number(i.textContent) === Number(e) && (h.addClass(i, this._classes.tipsActive), i.setAttribute(H, ""));
    });
  }
  _setHourOrMinute(t) {
    return t < 10 ? `0${t}` : t;
  }
  _appendTimes() {
    const { format24: t } = this._options;
    if (t) {
      this._getAppendClock(this.hoursArray, `[${pe}]`, K), this._getAppendClock(this.innerHours, `[${di}]`, lt);
      return;
    }
    this._getAppendClock(this.hoursArray, `[${pe}]`, K);
  }
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    return t = {
      ...tg,
      ...e,
      ...t
    }, D($i, t, eg), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...ig,
      ...e,
      ...t
    }, D($i, t, sg), t;
  }
  _getContainer() {
    return d.findOne(this._options.container);
  }
  _getValidate(t) {
    const { format24: e, format12: i, appendValidationInfo: n } = this._options;
    re.on(this.input, t, ({ target: o }) => {
      if (this._options === null || this.input.value === "")
        return;
      const r = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/, a = /^([01]\d|2[0-3])(:[0-5]\d)$/, l = r.test(o.value);
      if (a.test(o.value) !== true && e || l !== true && i) {
        n && this.input.setAttribute(Jn, ""), h.addStyle(o, { marginBottom: 0 }), this._isInvalidTimeFormat = true;
        return;
      }
      this.input.removeAttribute(Jn), this._isInvalidTimeFormat = false;
      const u = d.findOne(`[${Zm}]`);
      u !== null && u.remove();
    });
  }
  static getInstance(t) {
    return y.getData(t, Us);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var og = {
  threshold: 10,
  direction: "all"
};
var rg = class {
  constructor(t, e) {
    this._element = t, this._startPosition = null, this._options = {
      ...og,
      ...e
    };
  }
  handleTouchStart(t) {
    this._startPosition = this._getCoordinates(t);
  }
  handleTouchMove(t) {
    if (!this._startPosition)
      return;
    const e = this._getCoordinates(t), i = {
      x: e.x - this._startPosition.x,
      y: e.y - this._startPosition.y
    }, n = this._getDirection(i);
    if (this._options.direction === "all") {
      if (n.y.value < this._options.threshold && n.x.value < this._options.threshold)
        return;
      const r = n.y.value > n.x.value ? n.y.direction : n.x.direction;
      c.trigger(this._element, `swipe${r}`), c.trigger(this._element, "swipe", { direction: r }), this._startPosition = null;
      return;
    }
    const o = this._options.direction === "left" || this._options === "right" ? "x" : "y";
    n[o].direction === this._options.direction && n[o].value > this._options.threshold && (c.trigger(this._element, `swipe${n[o].direction}`), this._startPosition = null);
  }
  handleTouchEnd() {
    this._startPosition = null;
  }
  _getCoordinates(t) {
    const [e] = t.touches;
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
  _getDirection(t) {
    return {
      x: {
        direction: t.x < 0 ? "left" : "right",
        value: Math.abs(t.x)
      },
      y: {
        direction: t.y < 0 ? "up" : "down",
        value: Math.abs(t.y)
      }
    };
  }
};
var ag = class {
  constructor(t, e = "swipe", i = {}) {
    this._element = t, this._event = e, this.swipe = new rg(t, i), this._touchStartHandler = this._handleTouchStart.bind(this), this._touchMoveHandler = this._handleTouchMove.bind(this), this._touchEndHandler = this._handleTouchEnd.bind(this);
  }
  dispose() {
    this._element.removeEventListener("touchstart", this._touchStartHandler), this._element.removeEventListener("touchmove", this._touchMoveHandler), window.removeEventListener("touchend", this._touchEndHandler);
  }
  init() {
    this._element.addEventListener("touchstart", (t) => this._handleTouchStart(t)), this._element.addEventListener("touchmove", (t) => this._handleTouchMove(t)), window.addEventListener("touchend", (t) => this._handleTouchEnd(t));
  }
  _handleTouchStart(t) {
    this[this._event].handleTouchStart(t);
  }
  _handleTouchMove(t) {
    this[this._event].handleTouchMove(t);
  }
  _handleTouchEnd(t) {
    this[this._event].handleTouchEnd(t);
  }
};
var Qa = "sidenav";
var Ts = "te.sidenav";
var lg = "data-te-sidenav-rotate-icon-ref";
var no = "[data-te-sidenav-toggle-ref]";
var cg = "[data-te-collapse-init]";
var hg = '[data-te-sidenav-slim="true"]';
var dg = '[data-te-sidenav-slim="false"]';
var ug = "[data-te-sidenav-menu-ref]";
var Oe = "[data-te-sidenav-collapse-ref]";
var ui = "[data-te-sidenav-link-ref]";
var pg = F() ? 100 : -100;
var _g = F() ? -100 : 100;
var fg = {
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
var mg = {
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

class gi {
  constructor(t, e = {}) {
    yt(this, "_addBackdropOnInit", () => {
      this._options.sidenavHidden || (this._backdrop.show(), c.off(this._element, "transitionend", this._addBackdropOnInit));
    });
    this._element = t, this._options = e, this._ID = rt(""), this._content = null, this._initialContentStyle = null, this._slimCollapsed = false, this._activeNode = null, this._tempSlim = false, this._backdrop = this._initializeBackDrop(), this._focusTrap = null, this._perfectScrollbar = null, this._touch = null, this._setModeFromBreakpoints(), this.escHandler = (i) => {
      i.keyCode === Fi && this.toggler && Nt(this.toggler) && (this._update(false), c.off(window, "keydown", this.escHandler));
    }, this.hashHandler = () => {
      this._setActiveElements();
    }, t && (y.setData(t, Ts, this), this._setup()), this.options.sidenavBackdrop && !this.options.sidenavHidden && this.options.sidenavMode === "over" && c.on(this._element, "transitionend", this._addBackdropOnInit), this._didInit = false, this._init();
  }
  static get NAME() {
    return Qa;
  }
  get container() {
    if (this.options.sidenavPosition === "fixed")
      return d.findOne("body");
    const t = (e) => !e.parentNode || e.parentNode === document ? e : e.parentNode.style.position === "relative" || e.parentNode.classList.contains("relative") ? e.parentNode : t(e.parentNode);
    return t(this._element);
  }
  get isVisible() {
    let t = 0, e = window.innerWidth;
    if (this.options.sidenavPosition !== "fixed") {
      const n = this.container.getBoundingClientRect();
      t = n.x, e = n.x + n.width;
    }
    const { x: i } = this._element.getBoundingClientRect();
    return this.options.sidenavRight ? Math.abs(i - e) > 10 : Math.abs(i - t) < 10;
  }
  get links() {
    return d.find(ui, this._element);
  }
  get navigation() {
    return d.find(ug, this._element);
  }
  get options() {
    const t = {
      ...mg,
      ...h.getDataAttributes(this._element),
      ...this._options
    };
    return D(Qa, t, fg), t;
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
    return d.find(no).find((e) => {
      const i = h.getDataAttribute(e, "target");
      return d.findOne(i) === this._element;
    });
  }
  get transitionDuration() {
    return `${this.options.sidenavTransitionDuration / 1000}s`;
  }
  get translation() {
    return this.options.sidenavRight ? _g : pg;
  }
  get width() {
    return this._slimCollapsed ? this.options.sidenavSlimWidth : this.options.sidenavWidth;
  }
  get isBackdropVisible() {
    return !!this._backdrop._element;
  }
  changeMode(t) {
    this._setMode(t);
  }
  dispose() {
    c.off(window, "keydown", this.escHandler), this.options.sidenavBackdrop && this._backdrop.dispose(), c.off(window, "hashchange", this.hashHandler), this._touch.dispose(), y.removeData(this._element, Ts), this._element = null;
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
  update(t) {
    this._options = t, this._setup();
  }
  getBreakpoint(t) {
    return this._transformBreakpointValuesToObject()[t];
  }
  _init() {
    this._didInit || (c.on(document, "click", no, gi.toggleSidenav()), this._didInit = true);
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
    const t = window.innerWidth, e = this._transformBreakpointValuesToObject();
    if (t === undefined || !e)
      return;
    const i = typeof this.options.sidenavModeBreakpointOver == "number" ? t - this.options.sidenavModeBreakpointOver : t - e[this.options.sidenavModeBreakpointOver], n = typeof this.options.sidenavModeBreakpointSide == "number" ? t - this.options.sidenavModeBreakpointSide : t - e[this.options.sidenavModeBreakpointSide], o = typeof this.options.sidenavModeBreakpointPush == "number" ? t - this.options.sidenavModeBreakpointPush : t - e[this.options.sidenavModeBreakpointPush], r = (l, p) => l - p < 0 ? -1 : p - l < 0 ? 1 : 0, a = [i, n, o].filter((l) => l != null && l >= 0).sort(r)[0];
    i > 0 && i === a ? (this._options.sidenavMode = "over", this._options.sidenavHidden = true) : n > 0 && n === a ? this._options.sidenavMode = "side" : o > 0 && o === a && (this._options.sidenavMode = "push");
  }
  _collapseItems() {
    this.navigation.forEach((t) => {
      d.find(Oe, t).forEach((i) => {
        Zt.getInstance(i).hide();
      });
    });
  }
  _getOffsetValue(t, { index: e, property: i, offsets: n }) {
    const o = this._getPxValue(this._initialContentStyle[e][n[i].property]), r = t ? n[i].value : 0;
    return o + r;
  }
  _getProperty(...t) {
    return t.map((e, i) => i === 0 ? e : e[0].toUpperCase().concat(e.slice(1))).join("");
  }
  _getPxValue(t) {
    return t ? parseFloat(t) : 0;
  }
  _handleSwipe(t, e) {
    e && this._slimCollapsed && this.options.sidenavSlim && this.options.sidenavExpandable ? this.toggleSlim() : e || (this._slimCollapsed || !this.options.sidenavSlim || !this.options.sidenavExpandable ? this.toggler && Nt(this.toggler) && this.toggle() : this.toggleSlim());
  }
  _isActive(t, e) {
    return e ? e === t : t.attributes.href ? new URL(t, window.location.href).href === window.location.href : false;
  }
  _isAllToBeCollapsed() {
    return d.find(cg, this._element).filter((i) => i.getAttribute("aria-expanded") === "true").length === 0;
  }
  _isAllCollapsed() {
    return d.find(Oe, this._element).filter((t) => Nt(t)).length === 0;
  }
  _initializeBackDrop() {
    if (!this.options.sidenavBackdrop)
      return;
    const t = this.options.sidenavBackdropClass ? this.options.sidenavBackdropClass.split(" ") : this.options.sidenavPosition ? [
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
    return new hr({
      isVisible: this.options.sidenavBackdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      backdropClasses: t,
      clickCallback: () => this.hide()
    });
  }
  _updateBackdrop(t) {
    if (this.options.sidenavMode === "over") {
      t ? this._backdrop.show() : this.isBackdropVisible && this._backdrop.hide();
      return;
    }
    this.isBackdropVisible && this._backdrop.hide();
  }
  _setup() {
    this._setupTouch(), this.options.sidenavFocusTrap && this._setupFocusTrap(), this._setupCollapse(), this.options.sidenavSlim && this._setupSlim(), this._setupInitialStyling(), this._setupScrolling(), this.options.sidenavContent && this._setupContent(), this._setupActiveState(), this._setupRippleEffect(), this.options.sidenavHidden || this._updateOffsets(true, true), this.options.sidenavMode === "over" && this._setTabindex(true);
  }
  _setupActiveState() {
    this._setActiveElements(), this.links.forEach((t) => {
      c.on(t, "click", () => this._setActiveElements(t)), c.on(t, "keydown", (e) => {
        e.keyCode === ct && this._setActiveElements(t);
      });
    }), c.on(window, "hashchange", this.hashHandler);
  }
  _setupCollapse() {
    this.navigation.forEach((t, e) => {
      d.find(Oe, t).forEach((n, o) => this._setupCollapseList({ list: n, index: o, menu: t, menuIndex: e }));
    });
  }
  _generateCollpaseID(t, e) {
    return `sidenav-collapse-${this._ID}-${e}-${t}`;
  }
  _setupCollapseList({ list: t, index: e, menu: i, menuIndex: n }) {
    const o = this._generateCollpaseID(e, n);
    t.setAttribute("id", o), t.setAttribute("data-te-collapse-item", "");
    const [r] = d.prev(t, ui);
    h.setDataAttribute(r, "collapse-init", ""), r.setAttribute("href", `#${o}`), r.setAttribute("role", "button");
    const a = Zt.getInstance(t) || new Zt(t, {
      toggle: false,
      parent: this.options.sidenavAccordion ? i : t
    });
    (t.dataset.teSidenavStateShow === "" || t.dataset.teCollapseShow === "") && this._rotateArrow(r, false), c.on(r, "click", (l) => {
      this._toggleCategory(l, a, t), this._tempSlim && this._isAllToBeCollapsed() && (this._setSlim(true), this._tempSlim = false), this.options.sidenavMode === "over" && this._focusTrap && this._focusTrap.update();
    }), c.on(t, "show.te.collapse", () => this._rotateArrow(r, false)), c.on(t, "hide.te.collapse", () => this._rotateArrow(r, true)), c.on(t, "shown.te.collapse", () => {
      this.options.sidenavMode === "over" && this._focusTrap && this._focusTrap.update();
    }), c.on(t, "hidden.te.collapse", () => {
      this._tempSlim && this._isAllCollapsed() && (this._setSlim(true), this._tempSlim = false), this.options.sidenavMode === "over" && this._focusTrap && this._focusTrap.update();
    });
  }
  _setupContent() {
    this._content = d.find(this.options.sidenavContent), this._content.forEach((t) => {
      const e = [
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
      [...t.classList].filter((n) => e.findIndex((o) => n.includes(o)) >= 0).forEach((n) => t.classList.remove(n));
    }), this._initialContentStyle = this._content.map((t) => {
      const { paddingLeft: e, paddingRight: i, marginLeft: n, marginRight: o, transition: r } = window.getComputedStyle(t);
      return { paddingLeft: e, paddingRight: i, marginLeft: n, marginRight: o, transition: r };
    });
  }
  _setupFocusTrap() {
    this._focusTrap = new Wi(this._element, {
      event: "keydown",
      condition: (t) => t.keyCode === Pi,
      onlyVisible: true
    }, this.toggler);
  }
  _setupInitialStyling() {
    this._setColor(), h.style(this._element, this.sidenavStyle);
  }
  _setupScrolling() {
    let t = this._element;
    if (this.options.sidenavScrollContainer) {
      t = d.findOne(this.options.sidenavScrollContainer, this._element);
      const i = Kh(t.parentNode.children).filter((n) => n !== t).reduce((n, o) => n + o.clientHeight, 0);
      h.style(t, {
        maxHeight: `calc(100% - ${i}px)`,
        position: "relative"
      });
    }
    this._perfectScrollbar = new mh(t, {
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
    this.links.forEach((t) => {
      let e = Ze.getInstance(t), i = this.options.sidenavColor;
      if (e && e._options.sidenavColor !== this.options.sidenavColor)
        e.dispose();
      else if (e)
        return;
      (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) && (i = "white"), e = new Ze(t, { rippleColor: i });
    });
  }
  _setupTouch() {
    this._touch = new ag(this._element, "swipe", { threshold: 20 }), this._touch.init(), c.on(this._element, "swipeleft", (t) => this._handleSwipe(t, this.options.sidenavRight)), c.on(this._element, "swiperight", (t) => this._handleSwipe(t, !this.options.sidenavRight));
  }
  _setActive(t, e) {
    t.setAttribute("data-te-sidebar-state-active", ""), this._activeNode && t.removeAttribute("data-te-sidebar-state-active"), this._activeNode = t;
    const [i] = d.parents(this._activeNode, Oe);
    if (!i) {
      this._setActiveCategory();
      return;
    }
    const [n] = d.prev(i, ui);
    this._setActiveCategory(n), !e && !this._slimCollapsed && Zt.getInstance(i).show();
  }
  _setActiveCategory(t) {
    this.navigation.forEach((e) => {
      d.find(Oe, e).forEach((n) => {
        const [o] = d.prev(n, ui);
        o !== t ? o.removeAttribute("data-te-sidenav-state-active") : o.setAttribute("data-te-sidenav-state-active", "");
      });
    });
  }
  _setActiveElements(t) {
    this.navigation.forEach((e) => {
      d.find(ui, e).filter((n) => d.next(n, Oe).length === 0).forEach((n) => {
        this._isActive(n, t) && n !== this._activeNode && this._setActive(n, t);
      });
    }), t && this._updateFocus(this.isVisible);
  }
  _setColor() {
    const t = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark"
    ], { sidenavColor: e } = this.options, i = t.includes(e) ? e : "primary";
    t.forEach((n) => {
      this._element.classList.remove(`sidenav-${n}`);
    }), h.addClass(this._element, `sidenav-${i}`);
  }
  _setContentOffsets(t, e, i) {
    this._content.forEach((n, o) => {
      const r = this._getOffsetValue(t, {
        index: o,
        property: "padding",
        offsets: e
      }), a = this._getOffsetValue(t, {
        index: o,
        property: "margin",
        offsets: e
      }), l = {};
      if (i || (l.transition = `all ${this.transitionDuration} linear`), l[e.padding.property] = `${r}px`, l[e.margin.property] = `${a}px`, h.style(n, l), !!t) {
        if (i) {
          h.style(n, {
            transition: this._initialContentStyle[o].transition
          });
          return;
        }
        c.on(n, "transitionend", () => {
          h.style(n, {
            transition: this._initialContentStyle[o].transition
          });
        });
      }
    });
  }
  _setMode(t) {
    this.options.sidenavMode !== t && (this._options.sidenavMode = t, this._update(this.isVisible));
  }
  _setSlim(t) {
    const e = t ? ["collapse", "collapsed"] : ["expand", "expanded"];
    this._triggerEvents(...e), t && this._collapseItems(), this._slimCollapsed = t, this._toggleSlimDisplay(t), h.style(this._element, { width: `${this.width}px` }), this._updateOffsets(this.isVisible);
  }
  _setTabindex(t) {
    this.links.forEach((e) => {
      e.tabIndex = t ? 0 : -1;
    });
  }
  _emitEvents(t) {
    const e = t ? ["show", "shown"] : ["hide", "hidden"];
    this._triggerEvents(...e);
  }
  _rotateArrow(t, e) {
    const [i] = d.children(t, `[${lg}]`);
    i && (e ? h.removeClass(i, "rotate-180") : h.addClass(i, "rotate-180"));
  }
  _toggleCategory(t, e) {
    t.preventDefault(), e.toggle(), this._slimCollapsed && this.options.sidenavExpandable && (this._tempSlim = true, this._setSlim(false));
  }
  _toggleSlimDisplay(t) {
    const e = d.find(hg, this._element), i = d.find(dg, this._element), n = () => {
      e.forEach((o) => {
        h.style(o, {
          display: this._slimCollapsed ? "unset" : "none"
        });
      }), i.forEach((o) => {
        h.style(o, {
          display: this._slimCollapsed ? "none" : "unset"
        });
      });
    };
    t ? setTimeout(() => n(), this.options.sidenavTransitionDuration) : n();
  }
  async _triggerEvents(t, e) {
    c.trigger(this._element, `${t}.te.sidenav`), e && await setTimeout(() => {
      c.trigger(this._element, `${e}.te.sidenav`);
    }, this.options.sidenavTransitionDuration + 5);
  }
  _isiPhone() {
    return /iPhone|iPod/i.test(navigator.userAgent);
  }
  _update(t) {
    t && this._isiPhone() && h.addClass(this._element, "ps--scrolling-y"), this.toggler && this._updateTogglerAria(t), this._updateDisplay(t), this.options.sidenavBackdrop && this._updateBackdrop(t), this._updateOffsets(t), t && this.options.sidenavCloseOnEsc && this.options.sidenavMode !== "side" && c.on(window, "keydown", this.escHandler), this.options.sidenavFocusTrap && this._updateFocus(t);
  }
  _updateDisplay(t) {
    const e = t ? 0 : this.translation;
    h.style(this._element, {
      transform: `translateX(${e}%)`
    });
  }
  _updateFocus(t) {
    if (this._setTabindex(t), this.options.sidenavMode === "over" && this.options.sidenavFocusTrap) {
      if (t) {
        this._focusTrap.trap();
        return;
      }
      this._focusTrap.disable();
    }
    this._focusTrap.disable();
  }
  _updateOffsets(t, e = false) {
    const [i, n] = this.options.sidenavRight ? ["right", "left"] : ["left", "right"], o = {
      property: this._getProperty("padding", i),
      value: this.options.sidenavMode === "over" ? 0 : this.width
    }, r = {
      property: this._getProperty("margin", n),
      value: this.options.sidenavMode === "push" ? -1 * this.width : 0
    };
    c.trigger(this._element, "update.te.sidenav", {
      margin: r,
      padding: o
    }), this._content && (this._content.className = "", this._setContentOffsets(t, { padding: o, margin: r }, e));
  }
  _updateTogglerAria(t) {
    this.toggler.setAttribute("aria-expanded", t);
  }
  static toggleSidenav() {
    return function(t) {
      const e = d.closest(t.target, no), i = h.getDataAttributes(e).target;
      d.find(i).forEach((n) => {
        (gi.getInstance(n) || new gi(n)).toggle();
      });
    };
  }
  static jQueryInterface(t, e) {
    return this.each(function() {
      let i = y.getData(this, Ts);
      const n = typeof t == "object" && t;
      if (!(!i && /dispose/.test(t)) && (i || (i = new gi(this, n)), typeof t == "string")) {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
  static getInstance(t) {
    return y.getData(t, Ts);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var Ho = "stepper";
var Xs = "te.stepper";
var pn = `.${Xs}`;
var Yi = `data-te-${Ho}`;
var Ja = `mousedown${pn}`;
var tl = `keydown${pn}`;
var vg = `keyup${pn}`;
var el = `resize${pn}`;
var jt = `[${Yi}-step-ref]`;
var G = `[${Yi}-head-ref]`;
var il = `[${Yi}-head-text-ref]`;
var Es = `[${Yi}-head-icon-ref]`;
var st = `[${Yi}-content-ref]`;
var sl = "data-te-input-state-active";
var Cs = "data-te-input-selected";
var nl = "data-te-input-multiple-active";
var ol = "[data-te-form-check-input]";

class rl {
  constructor(t, e, i, n, o, r, a, l, p, u, _) {
    this.id = t, this.nativeOption = e, this.multiple = i, this.value = n, this.label = o, this.selected = r, this.disabled = a, this.hidden = l, this.secondaryText = p, this.groupId = u, this.icon = _, this.node = null, this.active = false;
  }
  select() {
    this.multiple ? this._selectMultiple() : this._selectSingle();
  }
  _selectSingle() {
    this.selected || (this.node.setAttribute(Cs, ""), this.node.setAttribute("aria-selected", true), this.selected = true, this.nativeOption && (this.nativeOption.selected = true));
  }
  _selectMultiple() {
    if (!this.selected) {
      const t = d.findOne(ol, this.node);
      t.checked = true, this.node.setAttribute(Cs, ""), this.node.setAttribute("aria-selected", true), this.selected = true, this.nativeOption && (this.nativeOption.selected = true);
    }
  }
  deselect() {
    this.multiple ? this._deselectMultiple() : this._deselectSingle();
  }
  _deselectSingle() {
    this.selected && (this.node.removeAttribute(Cs), this.node.setAttribute("aria-selected", false), this.selected = false, this.nativeOption && (this.nativeOption.selected = false));
  }
  _deselectMultiple() {
    if (this.selected) {
      const t = d.findOne(ol, this.node);
      t.checked = false, this.node.removeAttribute(Cs), this.node.setAttribute("aria-selected", false), this.selected = false, this.nativeOption && (this.nativeOption.selected = false);
    }
  }
  setNode(t) {
    this.node = t;
  }
  setActiveStyles() {
    if (!this.active) {
      if (this.multiple) {
        this.node.setAttribute(nl, "");
        return;
      }
      this.active = true, this.node.setAttribute(sl, "");
    }
  }
  removeActiveStyles() {
    this.active && (this.active = false, this.node.removeAttribute(sl)), this.multiple && this.node.removeAttribute(nl);
  }
}

class Tg {
  constructor(t = false) {
    this._multiple = t, this._selections = [];
  }
  select(t) {
    this._multiple ? this._selections.push(t) : this._selections = [t];
  }
  deselect(t) {
    if (this._multiple) {
      const e = this._selections.findIndex((i) => t === i);
      this._selections.splice(e, 1);
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
    return this._selections.map((t) => t.label).join(", ");
  }
  get value() {
    return this.selections[0] && this.selection.value;
  }
  get values() {
    return this._selections.map((t) => t.value);
  }
}
var Eg = "data-te-select-form-outline-ref";
var Cg = "data-te-select-wrapper-ref";
var Ag = "data-te-select-input-ref";
var yg = "data-te-select-clear-btn-ref";
var wg = "data-te-select-dropdown-container-ref";
var kg = "data-te-select-dropdown-ref";
var xg = "data-te-select-options-wrapper-ref";
var Og = "data-te-select-options-list-ref";
var Sg = "data-te-select-input-filter-ref";
var Jc = "data-te-select-option-ref";
var Ig = "data-te-select-option-all-ref";
var Dg = "data-te-select-option-text-ref";
var $g = "data-te-form-check-input";
var Lg = "data-te-select-option-group-ref";
var Ng = "data-te-select-option-group-label-ref";
var th = "data-te-select-selected";
var Mg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
`;
var Rg = (s) => {
  s.code === "Tab" || s.code === "Esc" || s.preventDefault();
};
var oo = "select";
var vi = "te.select";
var ji = `.${vi}`;
var Ug = `close${ji}`;
var Xg = `open${ji}`;
var ll = `optionSelect${ji}`;
var cl = `optionDeselect${ji}`;
var Gg = `valueChange${ji}`;
var qg = "change";
var hl = "data-te-select-init";
var oh = "data-te-select-no-results-ref";
var dl = "data-te-select-open";
var q = "data-te-input-state-active";
var Kt = "data-te-input-focused";
var ro = "data-te-input-disabled";
var Zg = "data-te-select-option-group-label-ref";
var Qg = "data-te-select-option-all-ref";
var pi = "data-te-select-selected";
var Jg = "[data-te-select-label-ref]";
var ul = "[data-te-select-input-ref]";
var tb = "[data-te-select-input-filter-ref]";
var eb = "[data-te-select-dropdown-ref]";
var ib = "[data-te-select-options-wrapper-ref]";
var pl = "[data-te-select-options-list-ref]";
var sb = "[data-te-select-option-ref]";
var nb = "[data-te-select-clear-btn-ref]";
var ob = "[data-te-select-custom-content-ref]";
var rb = `[${oh}]`;
var _l = "[data-te-select-form-outline-ref]";
var ab = "[data-te-select-toggle]";
var ao = "[data-te-input-notch-ref]";
var lb = 200;
var cb = {
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
var hb = {
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
var db = {
  dropdown: "relative outline-none min-w-[100px] m-0 scale-[0.8] opacity-0 bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.16),_0_2px_10px_0_rgba(0,0,0,0.12)] transition duration-200 motion-reduce:transition-none data-[te-select-open]:scale-100 data-[te-select-open]:opacity-100 dark:bg-zinc-700",
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
  selectOptionGroup: "group/opt",
  selectOptionGroupLabel: "flex flex-row items-center w-full px-4 truncate bg-transparent text-black/50 select-none dark:text-gray-300",
  selectOptionIcon: "w-7 h-7 rounded-full",
  selectOptionSecondaryText: "block text-[0.8rem] text-gray-500 dark:text-gray-300",
  selectOptionText: "group",
  selectValidationValid: "hidden absolute -mt-3 w-auto text-sm text-green-600 cursor-pointer group-data-[te-was-validated]/validation:peer-valid:block",
  selectValidationInvalid: "hidden absolute -mt-3 w-auto text-sm text-[rgb(220,76,100)] cursor-pointer group-data-[te-was-validated]/validation:peer-invalid:block"
};
var ub = {
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
  selectOptionGroup: "string",
  selectOptionGroupLabel: "string",
  selectOptionIcon: "string",
  selectOptionSecondaryText: "string",
  selectOptionText: "string"
};

class _r {
  constructor(t, e, i) {
    this._element = t, this._config = this._getConfig(e), this._classes = this._getClasses(i), this._config.selectPlaceholder && !this._config.multiple && this._addPlaceholderOption(), this._optionsToRender = this._getOptionsToRender(t), this._plainOptions = this._getPlainOptions(this._optionsToRender), this._filteredOptionsList = null, this._selectionModel = new Tg(this.multiple), this._activeOptionIndex = -1, this._activeOption = null, this._wrapperId = rt("select-wrapper-"), this._dropdownContainerId = rt("select-dropdown-container-"), this._selectAllId = rt("select-all-"), this._debounceTimeoutId = null, this._dropdownHeight = this._config.selectOptionHeight * this._config.selectVisibleOptions, this._popper = null, this._input = null, this._label = d.next(this._element, Jg)[0], this._notch = null, this._fakeValue = null, this._isFakeValueActive = false, this._customContent = d.next(t, ob)[0], this._toggleButton = null, this._elementToggle = null, this._wrapper = null, this._inputEl = null, this._dropdownContainer = null, this._container = null, this._selectAllOption = null, this._init(), this._mutationObserver = null, this._isOpen = false, this._addMutationObserver(), this._element && y.setData(t, vi, this);
  }
  static get NAME() {
    return oo;
  }
  get filterInput() {
    return d.findOne(tb, this._dropdownContainer);
  }
  get dropdown() {
    return d.findOne(eb, this._dropdownContainer);
  }
  get optionsList() {
    return d.findOne(pl, this._dropdownContainer);
  }
  get optionsWrapper() {
    return d.findOne(ib, this._dropdownContainer);
  }
  get clearButton() {
    return d.findOne(nb, this._wrapper);
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
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    return t = {
      ...cb,
      ...e,
      ...t
    }, this._element.hasAttribute("multiple") && (t.multiple = true), this._element.hasAttribute("disabled") && (t.disabled = true), this._element.tabIndex && (t.tabIndex = this._element.getAttribute("tabIndex")), D(oo, t, hb), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...db,
      ...e,
      ...t
    }, D(oo, t, ub), t;
  }
  _addPlaceholderOption() {
    const t = new Option("", "", true, true);
    t.hidden = true, t.selected = true, this._element.prepend(t);
  }
  _getOptionsToRender(t) {
    const e = [];
    return t.childNodes.forEach((n) => {
      if (n.nodeName === "OPTGROUP") {
        const o = {
          id: rt("group-"),
          label: n.label,
          disabled: n.hasAttribute("disabled"),
          hidden: n.hasAttribute("hidden"),
          options: []
        };
        n.childNodes.forEach((a) => {
          a.nodeName === "OPTION" && o.options.push(this._createOptionObject(a, o));
        }), e.push(o);
      } else
        n.nodeName === "OPTION" && e.push(this._createOptionObject(n));
    }), e;
  }
  _getPlainOptions(t) {
    if (!d.findOne("optgroup", this._element))
      return t;
    const i = [];
    return t.forEach((n) => {
      Object.prototype.hasOwnProperty.call(n, "options") ? n.options.forEach((r) => {
        i.push(r);
      }) : i.push(n);
    }), i;
  }
  _createOptionObject(t, e = {}) {
    const i = rt("option-"), n = e.id ? e.id : null, o = e.disabled ? e.disabled : false, r = t.selected || t.hasAttribute(pi), a = t.hasAttribute("disabled") || o, l = t.hasAttribute("hidden") || e && e.hidden, p = this.multiple, u = t.value, _ = t.label, f = h.getDataAttribute(t, "selectSecondaryText"), g = h.getDataAttribute(t, "select-icon");
    return new rl(i, t, p, u, _, r, a, l, f, n, g);
  }
  _getNavigationOptions() {
    const t = this.options.filter((e) => !e.hidden);
    return this.hasSelectAll ? [this._selectAllOption, ...t] : t;
  }
  _init() {
    this._renderMaterialWrapper(), this._wrapper = d.findOne(`#${this._wrapperId}`), this._input = d.findOne(ul, this._wrapper), this._config.disabled && this._input.setAttribute(ro, "");
    const t = this._config.selectContainer;
    t === "body" ? this._container = document.body : this._container = d.findOne(t), this._initOutlineInput(), this._setDefaultSelections(), this._updateInputValue(), this._appendFakeValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._bindComponentEvents(), this.hasSelectAll && (this._selectAllOption = this._createSelectAllOption()), this._dropdownContainer = al(this._dropdownContainerId, this._config, this._input.offsetWidth, this._dropdownHeight, this._selectAllOption, this._optionsToRender, this._customContent, this._classes), this._setFirstActiveOption(), this._listenToFocusChange();
  }
  _renderMaterialWrapper() {
    const t = Pg(this._wrapperId, this._config, this._label, this._classes, this._element.name);
    this._element.parentNode.insertBefore(t, this._element), h.addClass(this._element, this._classes.initialized), t.appendChild(this._element);
  }
  _initOutlineInput() {
    const t = d.findOne(_l, this._wrapper);
    new V(t, {
      inputFormWhite: this._config.selectFormWhite
    }, this._classes).init(), this._notch = d.findOne(ao, this._wrapper);
  }
  _bindComponentEvents() {
    this._listenToComponentKeydown(), this._listenToWrapperClick(), this._listenToClearBtnClick(), this._listenToClearBtnKeydown();
  }
  _setDefaultSelections() {
    this.options.forEach((t) => {
      t.selected && this._selectionModel.select(t);
    });
  }
  _listenToComponentKeydown() {
    c.on(this._wrapper, "keydown", this._handleKeydown.bind(this));
  }
  _handleKeydown(t) {
    this._isOpen && !this._config.selectFilter ? this._handleOpenKeydown(t) : this._handleClosedKeydown(t);
  }
  _handleOpenKeydown(t) {
    const e = t.keyCode, i = e === Fi || e === at && t.altKey || e === Pi;
    if (e === Pi && this._config.selectAutoSelect && !this.multiple && this._handleAutoSelection(this._activeOption), i) {
      this.close(), this._input.focus();
      return;
    }
    switch (e) {
      case z:
        this._setNextOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case at:
        this._setPreviousOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case We:
        this._setFirstOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case Fe:
        this._setLastOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case ct:
        t.preventDefault(), this._activeOption && (this.hasSelectAll && this._activeOptionIndex === 0 ? this._handleSelectAll() : this._handleSelection(this._activeOption));
        return;
      default:
        return;
    }
    t.preventDefault();
  }
  _handleClosedKeydown(t) {
    const e = t.keyCode;
    if (e === ct && t.preventDefault(), (e === ct || e === z && t.altKey || e === z && this.multiple) && this.open(), this.multiple)
      switch (e) {
        case z:
          this.open();
          break;
        case at:
          this.open();
          break;
        default:
          return;
      }
    else
      switch (e) {
        case z:
          this._setNextOptionActive(), this._handleSelection(this._activeOption);
          break;
        case at:
          this._setPreviousOptionActive(), this._handleSelection(this._activeOption);
          break;
        case We:
          this._setFirstOptionActive(), this._handleSelection(this._activeOption);
          break;
        case Fe:
          this._setLastOptionActive(), this._handleSelection(this._activeOption);
          break;
        default:
          return;
      }
    t.preventDefault();
  }
  _scrollToOption(t) {
    if (!t)
      return;
    let e;
    const i = this.options.filter((u) => !u.hidden);
    this.hasSelectAll ? e = i.indexOf(t) + 1 : e = i.indexOf(t);
    const n = this._getNumberOfGroupsBeforeOption(e), o = e + n, r = this.optionsWrapper, a = r.offsetHeight, l = this._config.selectOptionHeight, p = r.scrollTop;
    if (e > -1) {
      const u = o * l, _ = u + l > p + a;
      u < p ? r.scrollTop = u : _ ? r.scrollTop = u - a + l : r.scrollTop = p;
    }
  }
  _getNumberOfGroupsBeforeOption(t) {
    const e = this.options.filter((r) => !r.hidden), i = this._optionsToRender.filter((r) => !r.hidden), n = this.hasSelectAll ? t - 1 : t;
    let o = 0;
    for (let r = 0;r <= n; r++)
      e[r].groupId && i[o] && i[o].id && e[r].groupId === i[o].id && o++;
    return o;
  }
  _setNextOptionActive() {
    let t = this._activeOptionIndex + 1;
    const e = this._getNavigationOptions();
    if (e[t]) {
      for (;e[t].disabled; )
        if (t += 1, !e[t])
          return;
      this._updateActiveOption(e[t], t);
    }
  }
  _setPreviousOptionActive() {
    let t = this._activeOptionIndex - 1;
    const e = this._getNavigationOptions();
    if (e[t]) {
      for (;e[t].disabled; )
        if (t -= 1, !e[t])
          return;
      this._updateActiveOption(e[t], t);
    }
  }
  _setFirstOptionActive() {
    const e = this._getNavigationOptions();
    this._updateActiveOption(e[0], 0);
  }
  _setLastOptionActive() {
    const t = this._getNavigationOptions(), e = t.length - 1;
    this._updateActiveOption(t[e], e);
  }
  _updateActiveOption(t, e) {
    const i = this._activeOption;
    i && i.removeActiveStyles(), t.setActiveStyles(), this._activeOptionIndex = e, this._activeOption = t;
  }
  _listenToWrapperClick() {
    c.on(this._wrapper, "click", () => {
      this.toggle();
    });
  }
  _listenToClearBtnClick() {
    c.on(this.clearButton, "click", (t) => {
      t.preventDefault(), t.stopPropagation(), this._handleClear();
    });
  }
  _listenToClearBtnKeydown() {
    c.on(this.clearButton, "keydown", (t) => {
      t.keyCode === ct && (this._handleClear(), t.preventDefault(), t.stopPropagation());
    });
  }
  _handleClear() {
    if (this.multiple)
      this._selectionModel.clear(), this._deselectAllOptions(this.options), this.hasSelectAll && this._updateSelectAllState();
    else {
      const t = this._selectionModel.selection;
      this._selectionModel.clear(), t.deselect();
    }
    this._fakeValue.innerHTML = "", this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._emitValueChangeEvent(null), this._emitNativeChangeEvent();
  }
  _listenToOptionsClick() {
    c.on(this.optionsWrapper, "click", (t) => {
      if (t.target.hasAttribute(Zg))
        return;
      const i = t.target.nodeName === "DIV" ? t.target : d.closest(t.target, sb);
      if (i.hasAttribute(Qg)) {
        this._handleSelectAll();
        return;
      }
      const o = i.dataset.teId, r = this.options.find((a) => a.id === o);
      r && !r.disabled && this._handleSelection(r);
    });
  }
  _handleSelectAll() {
    this._selectAllOption.selected ? (this._deselectAllOptions(this.options), this._selectAllOption.deselect()) : (this._selectAllOptions(this.options), this._selectAllOption.select()), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent();
  }
  _selectAllOptions(t) {
    t.forEach((e) => {
      !e.selected && !e.disabled && (this._selectionModel.select(e), e.select());
    });
  }
  _deselectAllOptions(t) {
    t.forEach((e) => {
      e.selected && !e.disabled && (this._selectionModel.deselect(e), e.deselect());
    });
  }
  _handleSelection(t) {
    this.multiple ? (this._handleMultiSelection(t), this.hasSelectAll && this._updateSelectAllState()) : this._handleSingleSelection(t), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility();
  }
  _handleAutoSelection(t) {
    this._singleOptionSelect(t), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility();
  }
  _handleSingleSelection(t) {
    this._singleOptionSelect(t), this.close(), this._input.focus();
  }
  _singleOptionSelect(t) {
    const e = this._selectionModel.selections[0];
    e && e !== t && (this._selectionModel.deselect(e), e.deselect(), e.node.setAttribute(pi, false), c.trigger(this._element, cl, {
      value: e.value
    })), (!e || e && t !== e) && (this._selectionModel.select(t), t.select(), t.node.setAttribute(pi, true), c.trigger(this._element, ll, {
      value: t.value
    }), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent());
  }
  _handleMultiSelection(t) {
    t.selected ? (this._selectionModel.deselect(t), t.deselect(), t.node.setAttribute(pi, false), c.trigger(this._element, cl, {
      value: t.value
    })) : (this._selectionModel.select(t), t.select(), t.node.setAttribute(pi, true), c.trigger(this._element, ll, {
      value: t.value
    })), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent();
  }
  _emitValueChangeEvent(t) {
    c.trigger(this._element, Gg, { value: t });
  }
  _emitNativeChangeEvent() {
    c.trigger(this._element, qg);
  }
  _updateInputValue() {
    const t = this.multiple ? this._selectionModel.labels : this._selectionModel.label;
    let e;
    this.multiple && this._config.selectDisplayedLabels !== -1 && this._selectionModel.selections.length > this._config.selectDisplayedLabels ? e = `${this._selectionModel.selections.length} ${this._config.selectOptionsSelectedLabel}` : e = t, !this.multiple && !this._isSelectionValid(this._selectionModel.selection) ? this._input.value = "" : this._isLabelEmpty(this._selectionModel.selection) ? this._input.value = " " : e ? this._input.value = e : this.multiple || !this._optionsToRender[0] ? this._input.value = "" : this._input.value = this._optionsToRender[0].label;
  }
  _isSelectionValid(t) {
    return !(t && (t.disabled || t.value === ""));
  }
  _isLabelEmpty(t) {
    return !!(t && t.label === "");
  }
  _appendFakeValue() {
    if (!this._selectionModel.selection || this._selectionModel._multiple)
      return;
    const t = this._selectionModel.selection.label;
    this._fakeValue = zg(t, this._classes), d.findOne(_l, this._wrapper).appendChild(this._fakeValue);
  }
  _updateLabelPosition() {
    const t = this._element.hasAttribute(hl), e = this._input.value !== "";
    this._label && (t && (e || this._isOpen || this._isFakeValueActive) ? (this._label.setAttribute(q, ""), this._notch.setAttribute(q, "")) : (this._label.removeAttribute(q), this._notch.removeAttribute(q, "")));
  }
  _updateLabelPositionWhileClosing() {
    this._label && (this._input.value !== "" || this._isFakeValueActive ? (this._label.setAttribute(q, ""), this._notch.setAttribute(q, "")) : (this._label.removeAttribute(q), this._notch.removeAttribute(q)));
  }
  _updateFakeLabelPosition() {
    this._fakeValue && (this._input.value === "" && this._fakeValue.innerHTML !== "" && !this._config.selectPlaceholder ? (this._isFakeValueActive = true, this._fakeValue.setAttribute(q, "")) : (this._isFakeValueActive = false, this._fakeValue.removeAttribute(q)));
  }
  _updateClearButtonVisibility() {
    if (!this.clearButton)
      return;
    this._selectionModel.selection || this._selectionModel.selections.length > 0 ? h.addStyle(this.clearButton, { display: "block" }) : h.addStyle(this.clearButton, { display: "none" });
  }
  _updateSelectAllState() {
    const t = this._selectAllOption.selected, e = Vo(this.options);
    !e && t ? this._selectAllOption.deselect() : e && !t && this._selectAllOption.select();
  }
  toggle() {
    this._isOpen ? this.close() : this.open();
  }
  open() {
    const t = this._config.disabled, e = c.trigger(this._element, Xg);
    this._isOpen || t || e.defaultPrevented || (this._openDropdown(), this._updateDropdownWidth(), this._setFirstActiveOption(), this._scrollToOption(this._activeOption), this._config.selectFilter && (setTimeout(() => {
      this.filterInput.focus();
    }, 0), this._listenToSelectSearch(), this._listenToDropdownKeydown()), this._listenToOptionsClick(), this._listenToOutsideClick(), this._listenToWindowResize(), this._isOpen = true, this._updateLabelPosition(), this._setInputActiveStyles());
  }
  _openDropdown() {
    this._popper = Ce(this._input, this._dropdownContainer, {
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
      this.dropdown.setAttribute(dl, "");
    }, 0);
  }
  _updateDropdownWidth() {
    const t = this._input.offsetWidth;
    h.addStyle(this._dropdownContainer, { width: `${t}px` });
  }
  _setFirstActiveOption() {
    const t = this._getNavigationOptions(), e = this._activeOption;
    e && e.removeActiveStyles();
    const i = this.multiple ? this._selectionModel.selections[0] : this._selectionModel.selection;
    i ? (this._activeOption = i, i.setActiveStyles(), this._activeOptionIndex = t.findIndex((n) => n === i)) : (this._activeOption = null, this._activeOptionIndex = -1);
  }
  _setInputActiveStyles() {
    this._input.setAttribute(Kt, ""), d.findOne(ao, this._wrapper).setAttribute(Kt, "");
  }
  _listenToWindowResize() {
    c.on(window, "resize", this._handleWindowResize.bind(this));
  }
  _handleWindowResize() {
    this._dropdownContainer && this._updateDropdownWidth();
  }
  _listenToSelectSearch() {
    this.filterInput.addEventListener("input", (t) => {
      const e = t.target.value, i = this._config.selectFilterDebounce;
      this._debounceFilter(e, i);
    });
  }
  _debounceFilter(t, e) {
    this._debounceTimeoutId && clearTimeout(this._debounceTimeoutId), this._debounceTimeoutId = setTimeout(() => {
      this._filterOptions(t);
    }, e);
  }
  _filterOptions(t) {
    const e = [];
    this._optionsToRender.forEach((o) => {
      const r = Object.prototype.hasOwnProperty.call(o, "options"), a = !r && o.label.toLowerCase().includes(t.toLowerCase()), l = {};
      r && (l.label = o.label, l.options = this._filter(t, o.options), l.options.length > 0 && e.push(l)), a && e.push(o);
    });
    const i = this._config.selectNoResultText !== "", n = e.length !== 0;
    if (n)
      this._updateOptionsListTemplate(e), this._popper.forceUpdate(), this._filteredOptionsList = this._getPlainOptions(e), this.hasSelectAll && this._updateSelectAllState(), this._setFirstActiveOption();
    else if (!n && i) {
      const o = this._getNoResultTemplate();
      this.optionsWrapper.innerHTML = o;
    }
  }
  _updateOptionsListTemplate(t) {
    const e = d.findOne(pl, this._dropdownContainer) || d.findOne(rb, this._dropdownContainer), i = eh(t, this._selectAllOption, this._config, this._classes);
    this.optionsWrapper.removeChild(e), this.optionsWrapper.appendChild(i);
  }
  _getNoResultTemplate() {
    return `<div class="${this._classes.noResult}" ${oh} style="height: ${this._config.selectOptionHeight}px">${this._config.selectNoResultText}</div>`;
  }
  _filter(t, e) {
    const i = t.toLowerCase();
    return e.filter((n) => n.label.toLowerCase().includes(i));
  }
  _listenToDropdownKeydown() {
    c.on(this.dropdown, "keydown", this._handleOpenKeydown.bind(this));
  }
  _listenToOutsideClick() {
    this._outsideClick = this._handleOutSideClick.bind(this), c.on(document, "click", this._outsideClick);
  }
  _listenToFocusChange(t = true) {
    if (t === false) {
      c.off(this._input, "focus", () => this._notch.setAttribute(Kt, "")), c.off(this._input, "blur", () => this._notch.removeAttribute(Kt));
      return;
    }
    c.on(this._input, "focus", () => this._notch.setAttribute(Kt, "")), c.on(this._input, "blur", () => this._notch.removeAttribute(Kt));
  }
  _handleOutSideClick(t) {
    const e = this._wrapper && this._wrapper.contains(t.target), i = t.target === this._dropdownContainer, n = this._dropdownContainer && this._dropdownContainer.contains(t.target);
    let o;
    this._toggleButton || (this._elementToggle = d.find(ab)), this._elementToggle && this._elementToggle.forEach((r) => {
      const a = h.getDataAttribute(r, "select-toggle");
      (a === this._element.id || this._element.classList.contains(a)) && (this._toggleButton = r, o = this._toggleButton.contains(t.target));
    }), !e && !i && !n && !o && this.close();
  }
  close() {
    const t = c.trigger(this._element, Ug);
    !this._isOpen || t.defaultPrevented || (this._config.selectFilter && this.hasSelectAll && (this._resetFilterState(), this._updateOptionsListTemplate(this._optionsToRender), this._config.multiple && this._updateSelectAllState()), this._removeDropdownEvents(), this.dropdown.removeAttribute(dl), setTimeout(() => {
      this._input.removeAttribute(Kt), this._input.blur(), d.findOne(ao, this._wrapper).removeAttribute(Kt), this._label && !this.hasSelection && (this._label.removeAttribute(q), this._notch.setAttribute(q, ""), this._input.removeAttribute(q), this._notch.removeAttribute(q)), this._updateLabelPositionWhileClosing();
    }, 0), setTimeout(() => {
      this._container && this._dropdownContainer.parentNode === this._container && this._container.removeChild(this._dropdownContainer), this._popper.destroy(), this._isOpen = false, c.off(this.dropdown, "transitionend");
    }, lb));
  }
  _resetFilterState() {
    this.filterInput.value = "", this._filteredOptionsList = null;
  }
  _removeDropdownEvents() {
    c.off(document, "click", this._outsideClick), this._config.selectFilter && c.off(this.dropdown, "keydown"), c.off(this.optionsWrapper, "click");
  }
  _addMutationObserver() {
    this._mutationObserver = new MutationObserver(() => {
      this._wrapper && (this._updateSelections(), this._updateDisabledState());
    }), this._observeMutationObserver();
  }
  _updateSelections() {
    this._optionsToRender = this._getOptionsToRender(this._element), this._plainOptions = this._getPlainOptions(this._optionsToRender), this._selectionModel.clear(), this._setDefaultSelections(), this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this.hasSelectAll && this._updateSelectAllState();
    const t = this._config.filter && this.filterInput && this.filterInput.value;
    this._isOpen && !t ? (this._updateOptionsListTemplate(this._optionsToRender), this._setFirstActiveOption()) : this._isOpen && t ? (this._filterOptions(this.filterInput.value), this._setFirstActiveOption()) : this._dropdownContainer = al(this._dropdownContainerId, this._config, this._input.offsetWidth, this._dropdownHeight, this._selectAllOption, this._optionsToRender, this._customContent, this._classes);
  }
  _updateDisabledState() {
    const t = d.findOne(ul, this._wrapper);
    this._element.hasAttribute("disabled") ? (this._config.disabled = true, t.setAttribute("disabled", ""), t.setAttribute(ro, "")) : (this._config.disabled = false, t.removeAttribute("disabled"), t.removeAttribute(ro));
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
    const t = this._selectAllId, e = null, i = true, n = "select-all", o = this._config.selectAllLabel, r = Vo(this.options), a = false, l = false, p = null, u = null, _ = null;
    return new rl(t, e, i, n, o, r, a, l, p, u, _);
  }
  dispose() {
    this._removeComponentEvents(), this._destroyMaterialSelect(), this._listenToFocusChange(false), y.removeData(this._element, vi);
  }
  _removeComponentEvents() {
    c.off(this.input, "click"), c.off(this.wrapper, this._handleKeydown.bind(this)), c.off(this.clearButton, "click"), c.off(this.clearButton, "keydown"), c.off(window, "resize", this._handleWindowResize.bind(this));
  }
  _destroyMaterialSelect() {
    this._isOpen && this.close(), this._destroyMaterialTemplate();
  }
  _destroyMaterialTemplate() {
    const t = this._wrapper.parentNode, e = d.find("label", this._wrapper);
    t.appendChild(this._element), e.forEach((i) => {
      t.appendChild(i);
    }), e.forEach((i) => {
      i.removeAttribute(q);
    }), h.removeClass(this._element, this._classes.initialized), this._element.removeAttribute(hl), t.removeChild(this._wrapper);
  }
  setValue(t) {
    this.options.filter((i) => i.selected).forEach((i) => i.nativeOption.selected = false), Array.isArray(t) ? t.forEach((i) => {
      this._selectByValue(i);
    }) : this._selectByValue(t), this._updateSelections();
  }
  _selectByValue(t) {
    const e = this.options.find((i) => i.value === t);
    return e ? (e.nativeOption.selected = true, true) : false;
  }
  static jQueryInterface(t, e) {
    return this.each(function() {
      let i = y.getData(this, vi);
      const n = typeof t == "object" && t;
      if (!(!i && /dispose/.test(t)) && (i || (i = new _r(this, n)), typeof t == "string")) {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
  static getInstance(t) {
    return y.getData(t, vi);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var Gs = "chip";
var fb = `te.${Gs}`;
var rh = "data-te-chip-close";
var lo = `[${rh}]`;
var Li = "chips";
var Ki = `data-te-${Li}`;
var fl = `te.${Li}`;
var Ab = `${Ki}-input-init`;
var mt = `${Ki}-active`;
var ml = `${Ki}-initial`;
var ah = `${Ki}-placeholder`;
var yb = `${Ki}-input-wrapper`;
var Wo = "data-te-chip-init";
var lh = "data-te-chip-close";
var ch = "data-te-chip-text";
var wb = `[${mt}]`;
var Fo = `[${Wo}]`;
var kb = `${Fo}${wb}`;
var co = `[${lh}]`;
var xb = `[${yb}]`;
var Ob = `[${ch}]`;
var Sb = `[${ah}]`;
var Ib = "data-te-input-notch-leading-ref";
var Db = "data-te-input-notch-middle-ref";
var $b = `[${Ib}]`;
var Lb = `[${Db}]`;
var Vb = {
  inputID: rt("chips-input-"),
  parentSelector: "",
  initialValues: [{ tag: "init1" }, { tag: "init2" }],
  editable: false,
  labelText: "Example label",
  inputClasses: {},
  inputOptions: {}
};
var zt = {
  plugins: {
    legend: {
      labels: {
        color: "rgb(102,102,102)"
      }
    }
  }
};
var Ti = {
  line: {
    options: {
      ...zt,
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
      ...zt,
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
      ...zt,
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
      ...zt,
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
      ...zt,
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
      ...zt,
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
      ...zt,
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
      ...zt,
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
var Yb = function(t) {
  return jb(t) && !Kb(t);
};
var zb = typeof Symbol == "function" && Symbol.for;
var Ub = zb ? Symbol.for("react.element") : 60103;
Qe.all = function(t, e) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(i, n) {
    return Qe(i, n, e);
  }, {});
};
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
var El = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
var j = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: function(s) {
      return "ps__thumb-" + s;
    },
    rail: function(s) {
      return "ps__rail-" + s;
    },
    consuming: "ps__child--consume"
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: function(s) {
      return "ps--active-" + s;
    },
    scrolling: function(s) {
      return "ps--scrolling-" + s;
    }
  }
};
var uh = { x: null, y: null };
var zi = function(t) {
  this.element = t, this.handlers = {};
};
var fh = { isEmpty: { configurable: true } };
zi.prototype.bind = function(t, e) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, false);
};
zi.prototype.unbind = function(t, e) {
  var i = this;
  this.handlers[t] = this.handlers[t].filter(function(n) {
    return e && n !== e ? true : (i.element.removeEventListener(t, n, false), false);
  });
};
zi.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
fh.isEmpty.get = function() {
  var s = this;
  return Object.keys(this.handlers).every(function(t) {
    return s.handlers[t].length === 0;
  });
};
Object.defineProperties(zi.prototype, fh);
var si = function() {
  this.eventElements = [];
};
si.prototype.eventElement = function(t) {
  var e = this.eventElements.filter(function(i) {
    return i.element === t;
  })[0];
  return e || (e = new zi(t), this.eventElements.push(e)), e;
};
si.prototype.bind = function(t, e, i) {
  this.eventElement(t).bind(e, i);
};
si.prototype.unbind = function(t, e, i) {
  var n = this.eventElement(t);
  n.unbind(e, i), n.isEmpty && this.eventElements.splice(this.eventElements.indexOf(n), 1);
};
si.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
si.prototype.once = function(t, e, i) {
  var n = this.eventElement(t), o = function(r) {
    n.unbind(e, o), i(r);
  };
  n.bind(e, o);
};
var Ne = {
  isWebKit: typeof document < "u" && ("WebkitAppearance" in document.documentElement.style),
  supportsTouch: typeof window < "u" && (("ontouchstart" in window) || ("maxTouchPoints" in window.navigator) && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
var fv = function() {
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
var mv = {
  "click-rail": hv,
  "drag-thumb": dv,
  keyboard: uv,
  wheel: pv,
  touch: _v
};
var Ui = function(t, e) {
  var i = this;
  if (e === undefined && (e = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(j.main), this.settings = fv();
  for (var n in e)
    this.settings[n] = e[n];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var o = function() {
    return t.classList.add(j.state.focus);
  }, r = function() {
    return t.classList.remove(j.state.focus);
  };
  this.isRtl = Lt(t).direction === "rtl", this.isRtl === true && t.classList.add(j.rtl), this.isNegativeScroll = function() {
    var p = t.scrollLeft, u = null;
    return t.scrollLeft = -1, u = t.scrollLeft < 0, t.scrollLeft = p, u;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new si, this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = ws(j.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = ws(j.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", o), this.event.bind(this.scrollbarX, "blur", r), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var a = Lt(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(a.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = false, this.scrollbarXTop = W(a.top)) : this.isScrollbarXUsingBottom = true, this.railBorderXWidth = W(a.borderLeftWidth) + W(a.borderRightWidth), ot(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = W(a.marginLeft) + W(a.marginRight), ot(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = ws(j.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = ws(j.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", o), this.event.bind(this.scrollbarY, "blur", r), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var l = Lt(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(l.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = false, this.scrollbarYLeft = W(l.left)) : this.isScrollbarYUsingRight = true, this.scrollbarYOuterWidth = this.isRtl ? lv(this.scrollbarY) : null, this.railBorderYWidth = W(l.borderTopWidth) + W(l.borderBottomWidth), ot(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = W(l.marginTop) + W(l.marginBottom), ot(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = true, this.settings.handlers.forEach(function(p) {
    return mv[p](i);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(p) {
    return i.onScroll(p);
  }), Bt(this);
};
Ui.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, ot(this.scrollbarXRail, { display: "block" }), ot(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = W(Lt(this.scrollbarXRail).marginLeft) + W(Lt(this.scrollbarXRail).marginRight), this.railYMarginHeight = W(Lt(this.scrollbarYRail).marginTop) + W(Lt(this.scrollbarYRail).marginBottom), ot(this.scrollbarXRail, { display: "none" }), ot(this.scrollbarYRail, { display: "none" }), Bt(this), on(this, "top", 0, false, true), on(this, "left", 0, false, true), ot(this.scrollbarXRail, { display: "" }), ot(this.scrollbarYRail, { display: "" }));
};
Ui.prototype.onScroll = function(t) {
  this.isAlive && (Bt(this), on(this, "top", this.element.scrollTop - this.lastScrollTop), on(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
Ui.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Pe(this.scrollbarX), Pe(this.scrollbarY), Pe(this.scrollbarXRail), Pe(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = false);
};
Ui.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
var po = "perfectScrollbar";
var gv = "perfect-scrollbar";
var xs = "te.perfectScrollbar";
var Ot = "te";
var St = "ps";
var _o = [
  { te: `scrollX.${Ot}.${St}`, ps: "ps-scroll-x" },
  { te: `scrollY.${Ot}.${St}`, ps: "ps-scroll-y" },
  { te: `scrollUp.${Ot}.${St}`, ps: "ps-scroll-up" },
  { te: `scrollDown.${Ot}.${St}`, ps: "ps-scroll-down" },
  { te: `scrollLeft.${Ot}.${St}`, ps: "ps-scroll-left" },
  { te: `scrollRight.${Ot}.${St}`, ps: "ps-scroll-right" },
  { te: `scrollXEnd.${Ot}.${St}`, ps: "ps-x-reach-end" },
  { te: `scrollYEnd.${Ot}.${St}`, ps: "ps-y-reach-end" },
  { te: `scrollXStart.${Ot}.${St}`, ps: "ps-x-reach-start" },
  { te: `scrollYStart.${Ot}.${St}`, ps: "ps-y-reach-start" }
];
var bv = {
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
var vv = {
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
var Tv = {
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
var Ev = {
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

class fr {
  constructor(t, e = {}, i = {}) {
    this._element = t, this._options = this._getConfig(e), this._classes = this._getClasses(i), this.perfectScrollbar = null, this._observer = null, this._psClasses = [
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
    ], this._element && (y.setData(t, xs, this), h.addClass(this._element, gv)), this.init();
  }
  static get NAME() {
    return po;
  }
  get railX() {
    return d.findOne(".ps__rail-x", this._element);
  }
  get railY() {
    return d.findOne(".ps__rail-y", this._element);
  }
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    return e.handlers !== undefined && (e.handlers = e.handlers.split(" ")), t = {
      ...bv,
      ...e,
      ...t
    }, D(po, t, vv), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...Tv,
      ...e,
      ...t
    }, D(po, t, Ev), t;
  }
  dispose() {
    this._options.positionRight && this._observer.disconnect(), y.removeData(this._element, xs), this._element = null, this._dataAttrOptions = null, this._options = null, this.perfectScrollbar.destroy(), this.removeEvent(_o), this.perfectScrollbar = null;
  }
  init() {
    if (this.perfectScrollbar = new Ui(this._element, this._options), this._addPerfectScrollbarStyles(), this._updateScrollPosition(), this.perfectScrollbar.update(), this._initEvents(_o), this._options.positionRight) {
      this._observer = new ResizeObserver(() => {
        setTimeout(() => {
          this._updateScrollPosition();
        }, 100);
      });
      const t = {
        attributes: true,
        attributeFilter: ["class", "className"]
      };
      this._observer.observe(this._element, t);
    }
  }
  _updateScrollPosition() {
    const t = getComputedStyle(this._element).getPropertyValue("height"), e = getComputedStyle(this._element).getPropertyValue("width");
    this.railX && (this.railX.style.transform = `translateY(calc(-100% + ${this._canTransform(t) ? t : "0px"}))`), this.railY && (this.railY.style.transform = `translateX(calc(-100% + ${this._canTransform(e) ? e : "0px"}))`);
  }
  _canTransform(t) {
    return t && t.includes("px");
  }
  update() {
    return this.perfectScrollbar.update();
  }
  _initEvents(t = []) {
    t.forEach(({ ps: e, te: i }) => c.on(this._element, e, (n) => c.trigger(this._element, i, { e: n })));
  }
  _addPerfectScrollbarStyles() {
    this._psClasses.forEach((t) => {
      const e = d.findOne(`.${t.ps}`, this._element);
      h.addClass(e, t.te), h.addClass(e, t.teColor);
    }), h.addClass(this._element, this._classes.ps), h.removeClass(this._element, "ps");
  }
  removeEvent(t) {
    let e = [];
    typeof t == "string" && (e = _o.filter(({ te: i }) => i === t)), e.forEach(({ ps: i, te: n }) => {
      c.off(this._element, i), c.off(this._element, n);
    });
  }
  static jQueryInterface(t) {
    return this.each(function() {
      let e = y.getData(this, xs);
      const i = typeof t == "object" && t;
      if (!(!e && /dispose|hide/.test(t)) && (e || (e = new fr(this, i)), typeof t == "string")) {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static getInstance(t) {
    return y.getData(t, xs);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var mh = fr;
var Ni = "datatable";
var ft = `data-te-${Ni}`;
var Ei = `te.${Ni}`;
var _n = `.${Ei}`;
var Vv = `[${ft}-inner-ref]`;
var fo = `[${ft}-cell-ref]`;
var Wv = `[${ft}-header-ref]`;
var Fv = `[${ft}-header-checkbox-ref]`;
var Yv = `[${ft}-pagination-right-ref]`;
var jv = `[${ft}-pagination-left-ref]`;
var Kv = `[${ft}-pagination-start-ref]`;
var zv = `[${ft}-pagination-end-ref]`;
var Uv = `[${ft}-pagination-nav-ref]`;
var Xv = `[${ft}-select-ref]`;
var mo = `[${ft}-sort-icon-ref]`;
var fi = `[${ft}-row-ref]`;
var go = `[${ft}-row-checkbox-ref]`;
var Gv = `selectRows${_n}`;
var xl = `render${_n}`;
var qv = `rowClick${_n}`;
var Zv = `update${_n}`;
var qs = "te.rating";
var ni = `.${qs}`;
var Sl = `onSelect${ni}`;
var rE = `onHover${ni}`;
var Il = `keyup${ni}`;
var Dl = `focusout${ni}`;
var $l = `keydown${ni}`;
var Ll = `mousedown${ni}`;
var Ci = "te.popconfirm";
var bh = `.${Ci}`;
var aE = `cancel${bh}`;
var lE = `confirm${bh}`;
var Ai = "te.lightbox";
var fE = `.${Ai}`;
var mE = ".data-api";
var Ie = `click${fE}${mE}`;
var Th = "[data-te-lightbox-init]";
var gE = `${Th} img:not([data-te-lightbox-disabled])`;
var jo = "te.validation";
var fn = `.${jo}`;
var Eh = "data-te-validate";
var $E = "data-te-submit-btn-ref";
var LE = `[${Eh}]`;
var ME = `[${$E}]`;
var RE = `validated${fn}`;
var PE = `valid${fn}`;
var BE = `invalid${fn}`;
var HE = `changed${fn}`;
var qt = "pan";
var ZE = `${qt}start`;
var QE = `${qt}end`;
var JE = `${qt}move`;
var Ye = "pinch";
var o0 = `${Ye}end`;
var r0 = `${Ye}start`;
var a0 = `${Ye}move`;
var Mi = "rotate";
var _0 = `${Mi}end`;
var f0 = `${Mi}start`;
var Ko = "touch";
var wo = `te.${Ko}`;
var zo = "smoothScroll";
var yi = `te.${zo}`;
var mr = `.${yi}`;
var A0 = `scrollStart${mr}`;
var y0 = `scrollEnd${mr}`;
var w0 = `scrollCancel${mr}`;
var wi = "te.clipboard";
var D0 = `.${wi}`;
var N0 = `copy${D0}`;
var Xo = "infiniteScroll";
var Ls = `te.${Xo}`;
var Ri = "loadingManagement";
var Ns = `te.${Ri}`;
var V0 = `show.te.${Ri}`;
var Qs = "datetimepicker";
var ki = `te.${Qs}`;
var gr = `.${ki}`;
var Oh = "data-te-datepicker-init";
var Sh = "data-te-timepicker-init";
var oC = "data-te-date-timepicker-toggle-ref";
var aC = "data-te-timepicker-toggle-button-ref";
var lC = `[${Sh}]`;
var cC = `[${Oh}]`;
var hC = `[${oC}]`;
var dC = `[${aC}]`;
var mC = `open${gr}`;
var gC = `close${gr}`;
var bC = `datetimeChange${gr}`;
var De = $("div");
var Js = "sticky";
var xi = `te.${Js}`;
var Dh = `.${xi}`;
var CC = `active${Dh}`;
var AC = `inactive${Dh}`;
var OC = (s) => {
  Zl(() => {
    const t = ql();
    if (t) {
      const e = s.NAME, i = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = i, s.jQueryInterface);
    }
  });
};
var SC = (s, t) => {
  c.on(document, `click.te.${s.NAME}`, t, function(e) {
    e.preventDefault(), s.getOrCreateInstance(this).toggle();
  });
};
var IC = (s, t) => {
  c.on(document, `click.te.${s.NAME}.data-api`, t, function(e) {
    if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), ge(this))
      return;
    s.getOrCreateInstance(this).show();
  });
};
var DC = (s, t) => {
  c.on(document, `click.te.${s.NAME}.data-api`, t, function(e) {
    const i = Jt(this);
    if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), ge(this))
      return;
    c.one(i, s.EVENT_HIDDEN, () => {
      Nt(this) && this.focus();
    });
    const n = d.findOne(s.OPEN_SELECTOR);
    n && n !== i && s.getInstance(n).hide(), s.getOrCreateInstance(i).toggle(this);
  });
};
var $C = (s, t) => {
  c.on(document, `click.te.${s.NAME}`, t, (e) => {
    e.preventDefault();
    const i = e.target.closest(t);
    s.getOrCreateInstance(i).toggle();
  });
};
var LC = (s, t) => {
  c.on(document, `click.te.${s.NAME}`, t, function(e) {
    const i = Jt(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), c.one(i, s.EVENT_SHOW, (r) => {
      r.defaultPrevented || c.one(i, s.EVENT_HIDDEN, () => {
        Nt(this) && this.focus();
      });
    });
    const n = d.findOne(`[${s.OPEN_SELECTOR}="true"]`);
    n && s.getInstance(n).hide(), s.getOrCreateInstance(i).toggle(this);
  });
};
var NC = (s, t) => {
  c.one(document, "mousedown", t, s.autoInitial(new s));
};
var MC = (s, t) => {
  c.on(document, `click.te.${s.NAME}.data-api`, t, function(e) {
    (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
    const i = qo(this);
    d.find(i).forEach((o) => {
      s.getOrCreateInstance(o, { toggle: false }).toggle();
    });
  });
};
var RC = (s, t) => {
  [].slice.call(document.querySelectorAll(t)).map(function(i) {
    return new s(i);
  });
};
var PC = (s, t) => {
  [].slice.call(document.querySelectorAll(t)).map(function(i) {
    return new s(i);
  });
};
var BC = (s, t) => {
  d.find(t).forEach((e) => {
    new s(e);
  }), c.on(document, `click.te.${s.NAME}.data-api`, `${t} img:not([data-te-lightbox-disabled])`, s.toggle());
};
var HC = (s, t) => {
  const e = (o) => o[0] === "{" && o[o.length - 1] === "}" || o[0] === "[" && o[o.length - 1] === "]", i = (o) => typeof o != "string" ? o : e(o) ? JSON.parse(o.replace(/'/g, '"')) : o, n = (o) => {
    const r = {};
    return Object.keys(o).forEach((a) => {
      if (a.match(/dataset.*/)) {
        const l = a.slice(7, 8).toLowerCase().concat(a.slice(8));
        r[l] = i(o[a]);
      }
    }), r;
  };
  d.find(t).forEach((o) => {
    if (h.getDataAttribute(o, "chart") !== "bubble" && h.getDataAttribute(o, "chart") !== "scatter") {
      const r = h.getDataAttributes(o), a = {
        data: {
          datasets: [n(r)]
        }
      };
      return r.chart && (a.type = r.chart), r.labels && (a.data.labels = JSON.parse(r.labels.replace(/'/g, '"'))), new s(o, {
        ...a,
        ...Ti[a.type]
      });
    }
    return null;
  });
};

class VC {
  constructor() {
    this.inits = [];
  }
  get initialized() {
    return this.inits;
  }
  isInited(t) {
    return this.inits.includes(t);
  }
  add(t) {
    this.isInited(t) || this.inits.push(t);
  }
}
var Go = new VC;
var Oi = {
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
  chart: {
    name: "Chart",
    selector: "[data-te-chart]",
    isToggler: false,
    advanced: HC
  },
  button: {
    name: "Button",
    selector: "[data-te-toggle='button']",
    isToggler: true,
    callback: $C
  },
  collapse: {
    name: "Collapse",
    selector: "[data-te-collapse-init]",
    isToggler: true,
    callback: MC
  },
  dropdown: {
    name: "Dropdown",
    selector: "[data-te-dropdown-toggle-ref]",
    isToggler: true,
    callback: SC
  },
  modal: {
    name: "Modal",
    selector: "[data-te-toggle='modal']",
    isToggler: true,
    callback: LC
  },
  ripple: {
    name: "Ripple",
    selector: "[data-te-ripple-init]",
    isToggler: true,
    callback: NC
  },
  offcanvas: {
    name: "Offcanvas",
    selector: "[data-te-offcanvas-toggle]",
    isToggler: true,
    callback: DC
  },
  tab: {
    name: "Tab",
    selector: "[data-te-toggle='tab'], [data-te-toggle='pill'], [data-te-toggle='list']",
    isToggler: true,
    callback: IC
  },
  tooltip: {
    name: "Tooltip",
    selector: "[data-te-toggle='tooltip']",
    isToggler: false,
    callback: RC
  },
  popover: {
    name: "Popover",
    selector: "[data-te-toggle='popover']",
    isToggler: true,
    callback: PC
  },
  lightbox: {
    name: "Lightbox",
    selector: "[data-te-lightbox-init]",
    isToggler: true,
    callback: BC
  },
  touch: {
    name: "Touch",
    selector: "[data-te-touch-init]"
  }
};
var WC = (s) => Oi[s.NAME] || null;
var FC = (s, t) => {
  if (!s || !t.allowReinits && Go.isInited(s.NAME))
    return;
  Go.add(s.NAME);
  const e = WC(s), i = (e == null ? undefined : e.isToggler) || false;
  if (OC(s), e != null && e.advanced) {
    e == null || e.advanced(s, e == null ? undefined : e.selector);
    return;
  }
  if (i) {
    e == null || e.callback(s, e == null ? undefined : e.selector);
    return;
  }
  d.find(e == null ? undefined : e.selector).forEach((n) => {
    let o = s.getInstance(n);
    o || (o = new s(n), e != null && e.onInit && o[e.onInit]());
  });
};
var YC = (s, t) => {
  s.forEach((e) => FC(e, t));
};
var jC = {
  allowReinits: false,
  checkOtherImports: false
};
var ZC = (s, t = {}) => {
  t = { ...jC, ...t };
  const e = Object.keys(Oi).map((i) => {
    if (!!document.querySelector(Oi[i].selector)) {
      const o = s[Oi[i].name];
      return !o && !Go.isInited(i) && t.checkOtherImports && console.warn(`Please import ${Oi[i].name} from "tw-elements" package and add it to a object parameter inside "initTE" function`), o;
    }
  });
  YC(e, t);
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
      for (var i = 0;i < values.length; i++) {
        var value = values[i].split(/:(.+)/);
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
      for (var i = 0;i < values.length; i++) {
        var value = values[i].split(/:(.+)/);
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
      for (var i = 0;i < sseEventNames.length; i++) {
        var sseEventName = sseEventNames[i].trim();
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
ZC({ Carousel: Ut, Datepicker: Nm, Select: _r, Timepicker: ng, Input: V, Sidenav: gi }, { allowReinits: true }, false);
htmx.config.useTemplateFragments = true;
window.onload = function() {
  const inputs = document.getElementsByTagName("input");
  for (let i = 0;i < inputs.length; i++) {
    if (inputs[i].type === "search") {
      inputs[i].onchange = function() {
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
  for (let i = 0;i < buttons.length; i++) {
    disableButton(buttons[i]);
  }
};
window.initSelect = function() {
  ZC({ Select: _r }, { allowReinits: true }, false);
};
window.disableBtnInsideForm = function() {
  const forms = document.getElementsByTagName("form");
  for (let i = 0;i < forms.length; i++) {
    const form = forms[i];
    const buttons = form.getElementsByTagName("button");
    for (let j2 = 0;j2 < buttons.length; j2++) {
      const button = buttons[j2];
      disableOnHtmxEvents(form, button);
    }
  }
};
window.getLastUrlSegmentCurrent = function() {
  return getLastUrlSegment(window.location.href);
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
var datePicker = document.querySelector("#datepicker-translated");
if (datePicker) {
  const datepickerTranslated = new Nm(datePicker, {
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
  const instance = gi.getInstance(document.getElementById("sidenav-4"));
  instance.toggleSlim();
});
var sidenav2 = document.getElementById("sidenav-1");
if (sidenav2) {
  const sidenavInstance2 = gi.getInstance(sidenav2);
  let innerWidth2 = null;
  const setMode2 = (e) => {
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
