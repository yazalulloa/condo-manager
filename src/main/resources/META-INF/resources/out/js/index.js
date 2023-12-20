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
      }, remove: B2, addClass: F2, removeClass: n, toggleClass: V2, takeClass: j2, defineExtension: kr2, removeExtension: Pr, logAll: X2, logNone: U2, logger: null, config: { historyEnabled: true, historyCacheSize: 10, refreshOnHistoryMiss: false, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: true, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: true, allowScriptTags: true, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: false, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: false, scrollBehavior: "smooth", defaultFocusScroll: false, getCacheBusterParam: false, globalViewTransitions: false, methodsThatUseUrlParams: ["get"], selfRequestsOnly: false, ignoreTitle: false, scrollIntoViewOnBoost: true }, parseInterval: d2, _: e, createEventSource: function(e2) {
        return new EventSource(e2, { withCredentials: true });
      }, createWebSocket: function(e2) {
        var t2 = new WebSocket(e2, []);
        t2.binaryType = Q2.config.wsBinaryType;
        return t2;
      }, version: "1.9.9" };
      var r = { addTriggerHandler: Tt2, bodyContains: se2, canAccessLocalStorage: M2, findThisElement: de2, filterValues: dr2, hasAttribute: o, getAttributeValue: te2, getClosestAttributeValue: ne2, getClosestMatch: c2, getExpressionVars: Cr2, getHeaders: vr2, getInputValues: ur2, getInternalData: ae, getSwapSpecification: mr2, getTriggerSpecs: Qe2, getTarget: ge2, makeFragment: l, mergeObjects: le2, makeSettleInfo: R2, oobSwap: xe2, querySelectorExt: ue2, selectAndSwap: Ue2, settleImmediately: Yt2, shouldCancel: it2, triggerEvent: ce2, triggerErrorEvent: fe2, withExtensions: T };
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
      function re() {
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
      function ne2(t2, r2) {
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
          i2 = re().createDocumentFragment();
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
      function A2(e2) {
        return L(e2, "Function");
      }
      function N(e2) {
        return L(e2, "Object");
      }
      function ae(e2) {
        var t2 = "htmx-internal-data";
        var r2 = e2[t2];
        if (!r2) {
          r2 = e2[t2] = {};
        }
        return r2;
      }
      function I2(e2) {
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
      function se2(e2) {
        if (e2.getRootNode && e2.getRootNode() instanceof window.ShadowRoot) {
          return re().body.contains(e2.getRootNode().host);
        } else {
          return re().body.contains(e2);
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
      function D(t2) {
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
        return wr(re().body, function() {
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
      function U2() {
        Q2.logger = null;
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
          return [G(e2, z2(t2.substr(9)))];
        } else if (t2 === "document") {
          return [document];
        } else if (t2 === "window") {
          return [window];
        } else if (t2 === "body") {
          return [document.body];
        } else {
          return re().querySelectorAll(z2(t2));
        }
      }
      var $2 = function(e2, t2) {
        var r2 = re().querySelectorAll(t2);
        for (var n2 = 0;n2 < r2.length; n2++) {
          var i2 = r2[n2];
          if (i2.compareDocumentPosition(e2) === Node.DOCUMENT_POSITION_PRECEDING) {
            return i2;
          }
        }
      };
      var G = function(e2, t2) {
        var r2 = re().querySelectorAll(t2);
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
          return W2(re().body, e2)[0];
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
        if (A2(t2)) {
          return { target: re().body, event: e2, listener: t2 };
        } else {
          return { target: s(e2), event: t2, listener: r2 };
        }
      }
      function Z2(t2, r2, n2) {
        Dr(function() {
          var e3 = J2(t2, r2, n2);
          e3.target.addEventListener(e3.event, e3.listener);
        });
        var e2 = A2(r2);
        return e2 ? r2 : n2;
      }
      function K2(t2, r2, n2) {
        Dr(function() {
          var e2 = J2(t2, r2, n2);
          e2.target.removeEventListener(e2.event, e2.listener);
        });
        return A2(r2) ? r2 : n2;
      }
      var ve2 = re().createElement("output");
      function Y2(e2, t2) {
        var r2 = ne2(e2, t2);
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
        var t2 = ne2(e2, "hx-target");
        if (t2) {
          if (t2 === "this") {
            return de2(e2, "hx-target");
          } else {
            return ue2(e2, t2);
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
      function me2(e2) {
        var t2 = Q2.config.attributesToSettle;
        for (var r2 = 0;r2 < t2.length; r2++) {
          if (e2 === t2[r2]) {
            return true;
          }
        }
        return false;
      }
      function pe(t2, r2) {
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
      function ye2(e2, t2) {
        var r2 = Mr(t2);
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
        var r2 = re().querySelectorAll(t2);
        if (r2) {
          oe(r2, function(e3) {
            var t3;
            var r3 = i2.cloneNode(true);
            t3 = re().createDocumentFragment();
            t3.appendChild(r3);
            if (!ye2(o2, e3)) {
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
          fe2(re().body, "htmx:oobErrorNoTarget", { content: i2 });
        }
        return e2;
      }
      function be2(e2, t2, r2) {
        var n2 = ne2(e2, "hx-select-oob");
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
          var r2 = re().getElementById(t2);
          if (r2 != null) {
            e3.parentNode.replaceChild(r2, e3);
          }
        });
      }
      function Se2(o2, e2, s2) {
        oe(e2.querySelectorAll("[id]"), function(e3) {
          var t2 = ee2(e3, "id");
          if (t2 && t2.length > 0) {
            var r2 = t2.replace("'", "\\'");
            var n2 = e3.tagName.replace(":", "\\:");
            var i2 = o2.querySelector(n2 + "[id='" + r2 + "']");
            if (i2 && i2 !== o2) {
              var a2 = e3.cloneNode();
              pe(e3, i2);
              s2.tasks.push(function() {
                pe(e3, a2);
              });
            }
          }
        });
      }
      function Ee2(e2) {
        return function() {
          n(e2, Q2.config.addedClass);
          Bt2(e2);
          Ot(e2);
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
        Se2(e2, r2, n2);
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
      function Oe(t2) {
        var r2 = ae(t2);
        if (r2.onHandlers) {
          for (let e2 = 0;e2 < r2.onHandlers.length; e2++) {
            const n2 = r2.onHandlers[e2];
            t2.removeEventListener(n2.event, n2.listener);
          }
          delete r2.onHandlers;
        }
      }
      function qe2(e2) {
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
        if (t2.initHash) {
          t2.initHash = null;
        }
        Oe(e2);
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
          return Pe(t2, e2, r2);
        } else {
          var n2;
          var i2 = t2.previousSibling;
          a(u(t2), t2, e2, r2);
          if (i2 == null) {
            n2 = u(t2).firstChild;
          } else {
            n2 = i2.nextSibling;
          }
          ae(t2).replacedWith = n2;
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
      function Ne(e2, t2, r2) {
        return a(e2, null, t2, r2);
      }
      function Ie2(e2, t2, r2) {
        return a(u(e2), e2.nextSibling, t2, r2);
      }
      function ke2(e2, t2, r2) {
        m(e2);
        return u(e2).removeChild(e2);
      }
      function Pe(e2, t2, r2) {
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
        var n2 = r2 || ne2(e2, "hx-select");
        if (n2) {
          var i2 = re().createDocumentFragment();
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
            Ne(r2, n2, i2);
            return;
          case "afterend":
            Ie2(r2, n2, i2);
            return;
          case "delete":
            ke2(r2, n2, i2);
            return;
          default:
            var a2 = Mr(t2);
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
              Pe(r2, n2, i2);
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
      var _e = ['"', "'", "/"];
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
          } else if (_e.indexOf(e2.charAt(r2)) !== -1) {
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
                  fe2(re().body, "htmx:syntax:error", { error: e3, source: i2 });
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
      function y(e2, t2) {
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
          t2 = y(e2, $e2).trim();
          e2.shift();
        } else {
          t2 = y(e2, p);
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
            y(n2, ze2);
            var i2 = n2.length;
            var a2 = y(n2, /[,\[\s]/);
            if (a2 !== "") {
              if (a2 === "every") {
                var o2 = { trigger: "every" };
                y(n2, ze2);
                o2.pollInterval = d2(y(n2, /[,\[\s]/));
                y(n2, ze2);
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
                  y(n2, ze2);
                  var u2 = n2.shift();
                  if (u2 === "changed") {
                    l2.changed = true;
                  } else if (u2 === "once") {
                    l2.once = true;
                  } else if (u2 === "consume") {
                    l2.consume = true;
                  } else if (u2 === "delay" && n2[0] === ":") {
                    n2.shift();
                    l2.delay = d2(y(n2, p));
                  } else if (u2 === "from" && n2[0] === ":") {
                    n2.shift();
                    if (We2.test(n2[0])) {
                      var f2 = Ke2(n2);
                    } else {
                      var f2 = y(n2, p);
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
                    l2.throttle = d2(y(n2, p));
                  } else if (u2 === "queue" && n2[0] === ":") {
                    n2.shift();
                    l2.queue = y(n2, p);
                  } else if (u2 === "root" && n2[0] === ":") {
                    n2.shift();
                    l2[u2] = Ke2(n2);
                  } else if (u2 === "threshold" && n2[0] === ":") {
                    n2.shift();
                    l2[u2] = y(n2, p);
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
            y(n2, ze2);
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
      function et2(e2) {
        ae(e2).cancelled = true;
      }
      function tt2(e2, t2, r2) {
        var n2 = ae(e2);
        n2.timeout = setTimeout(function() {
          if (se2(e2) && n2.cancelled !== true) {
            if (!ot(r2, e2, Vt("hx:poll:trigger", { triggerSpec: r2, target: e2 }))) {
              t2(e2);
            }
            tt2(e2, t2, r2);
          }
        }, r2.pollInterval);
      }
      function rt(e2) {
        return location.hostname === e2.hostname && ee2(e2, "href") && ee2(e2, "href").indexOf("#") !== 0;
      }
      function nt2(t2, r2, e2) {
        if (t2.tagName === "A" && rt(t2) && (t2.target === "" || t2.target === "_self") || t2.tagName === "FORM") {
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
        return ae(e2).boosted && e2.tagName === "A" && t2.type === "click" && (t2.ctrlKey || t2.metaKey);
      }
      function ot(e2, t2, r2) {
        var n2 = e2.eventFilter;
        if (n2) {
          try {
            return n2.call(t2, r2) !== true;
          } catch (e3) {
            fe2(re().body, "htmx:eventFilter:error", { error: e3, source: n2.source });
            return true;
          }
        }
        return false;
      }
      function st2(a2, o2, e2, s2, l2) {
        var u2 = ae(a2);
        var t2;
        if (s2.from) {
          t2 = W2(a2, s2.from);
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
            if (!se2(a2)) {
              n2.removeEventListener(s2.trigger, i2);
              return;
            }
            if (at2(a2, e3)) {
              return;
            }
            if (l2 || it2(e3, a2)) {
              e3.preventDefault();
            }
            if (ot(s2, a2, e3)) {
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
              oe(re().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(e2) {
                ct2(e2);
              });
            }
          }, 200);
        }
      }
      function ct2(t2) {
        if (!o(t2, "data-hx-revealed") && k(t2)) {
          t2.setAttribute("data-hx-revealed", "true");
          var e2 = ae(t2);
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
            vt(e2, a2[1], 0);
          }
          if (a2[0] === "send") {
            gt2(e2);
          }
        }
      }
      function vt(s2, r2, n2) {
        if (!se2(s2)) {
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
              vt(s2, r2, n2 + 1);
            }, t3);
          }
        };
        t2.onopen = function(e3) {
          n2 = 0;
        };
        ae(s2).webSocket = t2;
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
          var i2 = I2(n3.children);
          for (var a2 = 0;a2 < i2.length; a2++) {
            var o2 = i2[a2];
            xe2(te2(o2, "hx-swap-oob") || "true", o2, r3);
          }
          Yt2(r3.tasks);
        });
      }
      function dt2(e2) {
        if (!se2(e2)) {
          ae(e2).webSocket.close();
          return true;
        }
      }
      function gt2(u2) {
        var f2 = c2(u2, function(e2) {
          return ae(e2).webSocket != null;
        });
        if (f2) {
          u2.addEventListener(Qe2(u2)[0].trigger, function(e2) {
            var t2 = ae(f2).webSocket;
            var r2 = vr2(u2, f2);
            var n2 = ur2(u2, "post");
            var i2 = n2.errors;
            var a2 = n2.values;
            var o2 = Cr2(u2);
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
            xt2(e2, a2[1]);
          }
        }
      }
      function yt2(t2, e2) {
        var r2 = Q2.createEventSource(e2);
        r2.onerror = function(e3) {
          fe2(t2, "htmx:sseError", { error: e3, source: r2 });
          wt2(t2);
        };
        ae(t2).sseEventSource = r2;
      }
      function xt2(a2, o2) {
        var s2 = c2(a2, St2);
        if (s2) {
          var l2 = ae(s2).sseEventSource;
          var u2 = function(e2) {
            if (wt2(s2)) {
              return;
            }
            if (!se2(a2)) {
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
          ae(a2).sseListener = u2;
          l2.addEventListener(o2, u2);
        } else {
          fe2(a2, "htmx:noSSESourceError");
        }
      }
      function bt2(e2, t2, r2) {
        var n2 = c2(e2, St2);
        if (n2) {
          var i2 = ae(n2).sseEventSource;
          var a2 = function() {
            if (!wt2(n2)) {
              if (se2(e2)) {
                t2(e2);
              } else {
                i2.removeEventListener(r2, a2);
              }
            }
          };
          ae(e2).sseListener = a2;
          i2.addEventListener(r2, a2);
        } else {
          fe2(e2, "htmx:noSSESourceError");
        }
      }
      function wt2(e2) {
        if (!se2(e2)) {
          ae(e2).sseEventSource.close();
          return true;
        }
      }
      function St2(e2) {
        return ae(e2).sseEventSource != null;
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
          bt2(n2, r2, e2.sseEvent);
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
          if (!ot(e2, n2, Vt("load", { elt: n2 }))) {
            Et2(n2, r2, t2, e2.delay);
          }
        } else if (e2.pollInterval) {
          t2.polling = true;
          tt2(n2, r2, e2);
        } else {
          st2(n2, r2, t2, e2);
        }
      }
      function Rt2(e2) {
        if (Q2.config.allowScriptTags && (e2.type === "text/javascript" || e2.type === "module" || e2.type === "")) {
          var t2 = re().createElement("script");
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
      function Ot(e2) {
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
      function Ht2(e2) {
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
        var r2 = It2(e2);
        if (r2) {
          r2.lastButtonClicked = t2;
        }
      }
      function Nt2(e2) {
        var t2 = It2(e2);
        if (t2) {
          t2.lastButtonClicked = null;
        }
      }
      function It2(e2) {
        var t2 = v(e2.target, "button, input[type='submit']");
        if (!t2) {
          return;
        }
        var r2 = s("#" + ee2(t2, "form")) || v(t2, "form");
        if (!r2) {
          return;
        }
        return ae(r2);
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
        var n2 = ae(t2);
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
        Oe(t2);
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
        var r2 = ae(t2);
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
            if (ne2(t2, "hx-boost") === "true") {
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
        oe(Ht2(e2), Xt2);
      }
      function Ft(e2) {
        return e2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Vt(e2, t2) {
        var r2;
        if (window.CustomEvent && typeof window.CustomEvent === "function") {
          r2 = new CustomEvent(e2, { bubbles: true, cancelable: true, detail: t2 });
        } else {
          r2 = re().createEvent("CustomEvent");
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
        oe(Mr(e2), function(e3) {
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
        var n2 = Vt(t2, r2);
        if (Q2.logger && !jt2(t2)) {
          Q2.logger(e2, t2, r2);
        }
        if (r2.error) {
          x(r2.error);
          ce2(e2, "htmx:error", { errorInfo: r2 });
        }
        var i2 = e2.dispatchEvent(n2);
        var a2 = Ft(t2);
        if (i2 && a2 !== t2) {
          var o2 = Vt(a2, n2.detail);
          i2 = i2 && e2.dispatchEvent(o2);
        }
        T(e2, function(e3) {
          i2 = i2 && (e3.onEvent(t2, n2) !== false && !n2.defaultPrevented);
        });
        return i2;
      }
      var _t2 = location.pathname + location.search;
      function zt2() {
        var e2 = re().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return e2 || re().body;
      }
      function Wt2(e2, t2, r2, n2) {
        if (!M2()) {
          return;
        }
        if (Q2.config.historyCacheSize <= 0) {
          localStorage.removeItem("htmx-history-cache");
          return;
        }
        e2 = D(e2);
        var i2 = E(localStorage.getItem("htmx-history-cache")) || [];
        for (var a2 = 0;a2 < i2.length; a2++) {
          if (i2[a2].url === e2) {
            i2.splice(a2, 1);
            break;
          }
        }
        var o2 = { url: e2, content: t2, title: r2, scroll: n2 };
        ce2(re().body, "htmx:historyItemCreated", { item: o2, cache: i2 });
        i2.push(o2);
        while (i2.length > Q2.config.historyCacheSize) {
          i2.shift();
        }
        while (i2.length > 0) {
          try {
            localStorage.setItem("htmx-history-cache", JSON.stringify(i2));
            break;
          } catch (e3) {
            fe2(re().body, "htmx:historyCacheError", { cause: e3, cache: i2 });
            i2.shift();
          }
        }
      }
      function $t(e2) {
        if (!M2()) {
          return null;
        }
        e2 = D(e2);
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
          r2 = re().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch (e3) {
          r2 = re().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        if (!r2) {
          ce2(re().body, "htmx:beforeHistorySave", { path: t2, historyElt: e2 });
          Wt2(t2, Gt2(e2), re().title, window.scrollY);
        }
        if (Q2.config.historyEnabled)
          history.replaceState({ htmx: true }, re().title, window.location.href);
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
        ce2(re().body, "htmx:historyCacheMiss", o2);
        e2.open("GET", a2, true);
        e2.setRequestHeader("HX-History-Restore-Request", "true");
        e2.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            ce2(re().body, "htmx:historyCacheMissLoad", o2);
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
            Pe(t2, e3, r2);
            Yt2(r2.tasks);
            _t2 = a2;
            ce2(re().body, "htmx:historyRestore", { path: a2, cacheMiss: true, serverResponse: this.response });
          } else {
            fe2(re().body, "htmx:historyCacheMissLoadError", o2);
          }
        };
        e2.send();
      }
      function er(e2) {
        Jt2();
        e2 = e2 || location.pathname + location.search;
        var t2 = $t(e2);
        if (t2) {
          var r2 = l(t2.content);
          var n2 = zt2();
          var i2 = R2(n2);
          Pe(n2, r2, i2);
          Yt2(i2.tasks);
          document.title = t2.title;
          setTimeout(function() {
            window.scrollTo(0, t2.scroll);
          }, 0);
          _t2 = e2;
          ce2(re().body, "htmx:historyRestore", { path: e2, item: t2 });
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
          var t3 = ae(e3);
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
          var t3 = ae(e3);
          t3.requestCount = (t3.requestCount || 0) + 1;
          e3.setAttribute("disabled", "");
        });
        return t2;
      }
      function nr2(e2, t2) {
        oe(e2, function(e3) {
          var t3 = ae(e3);
          t3.requestCount = (t3.requestCount || 0) - 1;
          if (t3.requestCount === 0) {
            e3.classList["remove"].call(e3.classList, Q2.config.requestClass);
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
      function or(e2, t2, r2) {
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
            o2 = I2(e2.querySelectorAll("option:checked")).map(function(e3) {
              return e3.value;
            });
          }
          if (e2.files) {
            o2 = I2(e2.files);
          }
          or(a2, o2, r2);
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
        var o2 = ae(e2);
        if (o2.lastButtonClicked && !se2(o2.lastButtonClicked)) {
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
          or(u2, l2.value, i2);
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
      function vr2(e2, t2, r2) {
        var n2 = { "HX-Request": "true", "HX-Trigger": ee2(e2, "id"), "HX-Trigger-Name": ee2(e2, "name"), "HX-Target": te2(t2, "id"), "HX-Current-URL": re().location.href };
        br2(e2, "hx-headers", false, n2);
        if (r2 !== undefined) {
          n2["HX-Prompt"] = r2;
        }
        if (ae(e2).boosted) {
          n2["HX-Boosted"] = "true";
        }
        return n2;
      }
      function dr2(t2, e2) {
        var r2 = ne2(e2, "hx-params");
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
        var r2 = t2 ? t2 : ne2(e2, "hx-swap");
        var n2 = { swapStyle: ae(e2).boosted ? "innerHTML" : Q2.config.defaultSwapStyle, swapDelay: Q2.config.defaultSwapDelay, settleDelay: Q2.config.defaultSettleDelay };
        if (Q2.config.scrollIntoViewOnBoost && ae(e2).boosted && !gr2(e2)) {
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
      function pr2(e2) {
        return ne2(e2, "hx-encoding") === "multipart/form-data" || h2(e2, "form") && ee2(e2, "enctype") === "multipart/form-data";
      }
      function yr2(t2, r2, n2) {
        var i2 = null;
        T(r2, function(e2) {
          if (i2 == null) {
            i2 = e2.encodeParameters(t2, n2, r2);
          }
        });
        if (i2 != null) {
          return i2;
        } else {
          if (pr2(r2)) {
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
      function br2(e2, t2, r2, n2) {
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
        return br2(u(e2), t2, r2, n2);
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
        return br2(e2, "hx-vars", true, t2);
      }
      function Er2(e2, t2) {
        return br2(e2, "hx-vals", false, t2);
      }
      function Cr2(e2) {
        return le2(Sr2(e2), Er2(e2));
      }
      function Tr2(t2, r2, n2) {
        if (n2 !== null) {
          try {
            t2.setRequestHeader(r2, n2);
          } catch (e2) {
            t2.setRequestHeader(r2, encodeURIComponent(n2));
            t2.setRequestHeader(r2 + "-URI-AutoEncoded", "true");
          }
        }
      }
      function Rr(t2) {
        if (t2.responseURL && typeof URL !== "undefined") {
          try {
            var e2 = new URL(t2.responseURL);
            return e2.pathname + e2.search;
          } catch (e3) {
            fe2(re().body, "htmx:badResponseUrl", { url: t2.responseURL });
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
      function qr2(e2) {
        var t2 = [];
        while (e2) {
          t2.push(e2);
          e2 = e2.parentElement;
        }
        return t2;
      }
      function Hr2(e2, t2, r2) {
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
          n2 = re().body;
        }
        var M3 = a2.handler || Ar2;
        var D2 = a2.select || null;
        if (!se2(n2)) {
          ie2(o2);
          return l2;
        }
        var u2 = a2.targetOverride || ge2(n2);
        if (u2 == null || u2 == ve2) {
          fe2(n2, "htmx:targetError", { target: te2(n2, "hx-target") });
          ie2(s2);
          return l2;
        }
        var f2 = ae(n2);
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
        var d3 = ne2(n2, "hx-confirm");
        if (e2 === undefined) {
          var X3 = function(e3) {
            return he2(t2, r2, n2, i2, a2, !!e3);
          };
          var U3 = { target: u2, elt: n2, path: r2, verb: t2, triggeringEvent: i2, etc: a2, issueRequest: X3, question: d3 };
          if (ce2(n2, "htmx:confirm", U3) === false) {
            ie2(o2);
            return l2;
          }
        }
        var g2 = n2;
        var m2 = ne2(n2, "hx-sync");
        var p2 = null;
        var y2 = false;
        if (m2) {
          var B3 = m2.split(":");
          var F3 = B3[0].trim();
          if (F3 === "this") {
            g2 = de2(n2, "hx-sync");
          } else {
            g2 = ue2(n2, F3);
          }
          m2 = (B3[1] || "drop").trim();
          f2 = ae(g2);
          if (m2 === "drop" && f2.xhr && f2.abortable !== true) {
            ie2(o2);
            return l2;
          } else if (m2 === "abort") {
            if (f2.xhr) {
              ie2(o2);
              return l2;
            } else {
              y2 = true;
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
                var x2 = ae(i2);
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
        f2.abortable = y2;
        var w2 = function() {
          f2.xhr = null;
          f2.abortable = false;
          if (f2.queuedRequests != null && f2.queuedRequests.length > 0) {
            var e3 = f2.queuedRequests.shift();
            e3();
          }
        };
        var j3 = ne2(n2, "hx-prompt");
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
        var E2 = vr2(n2, u2, S2);
        if (t2 !== "get" && !pr2(n2)) {
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
        var z3 = Cr2(n2);
        var W3 = le2(T2, z3);
        var R3 = dr2(W3, n2);
        if (Q2.config.getCacheBusterParam && t2 === "get") {
          R3["org.htmx.cache-buster"] = ee2(u2, "id") || "true";
        }
        if (r2 == null || r2 === "") {
          r2 = re().location.href;
        }
        var O2 = br2(n2, "hx-request");
        var $3 = ae(n2).boosted;
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
        var G2 = r2.split("#");
        var J3 = G2[0];
        var L2 = G2[1];
        var A3 = r2;
        if (q3) {
          A3 = J3;
          var Z3 = Object.keys(R3).length !== 0;
          if (Z3) {
            if (A3.indexOf("?") < 0) {
              A3 += "?";
            } else {
              A3 += "&";
            }
            A3 += cr2(R3);
            if (L2) {
              A3 += "#" + L2;
            }
          }
        }
        if (!Hr2(n2, A3, H3)) {
          fe2(n2, "htmx:invalidPath", H3);
          ie2(s2);
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
              Tr2(b2, N2, K3);
            }
          }
        }
        var I3 = { xhr: b2, target: u2, requestConfig: H3, etc: a2, boosted: $3, select: D2, pathInfo: { requestPath: r2, finalRequestPath: A3, anchor: L2 } };
        b2.onload = function() {
          try {
            var e3 = qr2(n2);
            I3.pathInfo.responsePath = Rr(b2);
            M3(n2, I3);
            nr2(k2, P2);
            ce2(n2, "htmx:afterRequest", I3);
            ce2(n2, "htmx:afterOnLoad", I3);
            if (!se2(n2)) {
              var t3 = null;
              while (e3.length > 0 && t3 == null) {
                var r3 = e3.shift();
                if (se2(r3)) {
                  t3 = r3;
                }
              }
              if (t3) {
                ce2(t3, "htmx:afterRequest", I3);
                ce2(t3, "htmx:afterOnLoad", I3);
              }
            }
            ie2(o2);
            w2();
          } catch (e4) {
            fe2(n2, "htmx:onLoadError", le2({ error: e4 }, I3));
            throw e4;
          }
        };
        b2.onerror = function() {
          nr2(k2, P2);
          fe2(n2, "htmx:afterRequest", I3);
          fe2(n2, "htmx:sendError", I3);
          ie2(s2);
          w2();
        };
        b2.onabort = function() {
          nr2(k2, P2);
          fe2(n2, "htmx:afterRequest", I3);
          fe2(n2, "htmx:sendAbort", I3);
          ie2(s2);
          w2();
        };
        b2.ontimeout = function() {
          nr2(k2, P2);
          fe2(n2, "htmx:afterRequest", I3);
          fe2(n2, "htmx:timeout", I3);
          ie2(s2);
          w2();
        };
        if (!ce2(n2, "htmx:beforeRequest", I3)) {
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
        ce2(n2, "htmx:beforeSend", I3);
        var Y3 = q3 ? null : yr2(b2, n2, R3);
        b2.send(Y3);
        return l2;
      }
      function Lr(e2, t2) {
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
        var s2 = ne2(e2, "hx-push-url");
        var l2 = ne2(e2, "hx-replace-url");
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
      function Ar2(l2, u2) {
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
          u2.target = re().querySelector(f2.getResponseHeader("HX-Retarget"));
        }
        var d3 = Lr(l2, u2);
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
            et2(l2);
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
          var y2 = null;
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
                ce2(re().body, "htmx:beforeHistoryUpdate", le2({ history: d3 }, u2));
                if (d3.type === "push") {
                  Zt2(d3.path);
                  ce2(re().body, "htmx:pushedIntoHistory", { path: d3.path });
                } else {
                  Kt2(d3.path);
                  ce2(re().body, "htmx:replacedInHistory", { path: d3.path });
                }
              }
              var n3 = R2(c3);
              Ue2(v2.swapStyle, c3, l2, g2, n3, r3);
              if (t3.elt && !se2(t3.elt) && ee2(t3.elt, "id")) {
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
                if (!se2(l2)) {
                  o3 = re().body;
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
                xr2(n3.elts, v2);
                if (O(f2, /HX-Trigger-After-Settle:/i)) {
                  var r4 = l2;
                  if (!se2(l2)) {
                    r4 = re().body;
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
              ie2(y2);
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
              y2 = t3;
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
      var Nr = {};
      function Ir() {
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
      function kr2(e2, t2) {
        if (t2.init) {
          t2.init(r);
        }
        Nr[e2] = le2(Ir(), t2);
      }
      function Pr(e2) {
        delete Nr[e2];
      }
      function Mr(e2, r2, n2) {
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
              var t3 = Nr[e3];
              if (t3 && r2.indexOf(t3) < 0) {
                r2.push(t3);
              }
            }
          });
        }
        return Mr(u(e2), r2, n2);
      }
      function Dr(e2) {
        var t2 = function() {
          if (!e2)
            return;
          e2();
          e2 = null;
        };
        if (re().readyState === "complete") {
          t2();
        } else {
          re().addEventListener("DOMContentLoaded", function() {
            t2();
          });
          re().addEventListener("readystatechange", function() {
            if (re().readyState !== "complete")
              return;
            t2();
          });
        }
      }
      function Xr2() {
        if (Q2.config.includeIndicatorStyles !== false) {
          re().head.insertAdjacentHTML("beforeend", "<style>                      ." + Q2.config.indicatorClass + "{opacity:0}                      ." + Q2.config.requestClass + " ." + Q2.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + Q2.config.requestClass + "." + Q2.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
        }
      }
      function Ur2() {
        var e2 = re().querySelector('meta[name="htmx-config"]');
        if (e2) {
          return E(e2.content);
        } else {
          return null;
        }
      }
      function Br() {
        var e2 = Ur2();
        if (e2) {
          Q2.config = le2(Q2.config, e2);
        }
      }
      Dr(function() {
        Br();
        Xr2();
        var e2 = re().body;
        Bt2(e2);
        var t2 = re().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
        e2.addEventListener("htmx:abort", function(e3) {
          var t3 = e3.target;
          var r3 = ae(t3);
          if (r3 && r3.xhr) {
            r3.xhr.abort();
          }
        });
        var r2 = window.onpopstate;
        window.onpopstate = function(e3) {
          if (e3.state && e3.state.htmx) {
            er();
            oe(t2, function(e4) {
              ce2(e4, "htmx:restored", { document: re(), triggerEvent: ce2 });
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
          if (q2() === "-" && N() === "-" && (n.isWhitespace(I2(2)) || I2(2) === "" || I2(2) === "-") || q2() === "/" && N() === "/" && (n.isWhitespace(I2(2)) || I2(2) === "" || I2(2) === "/")) {
            h3();
          } else if (q2() === "/" && N() === "*" && (n.isWhitespace(I2(2)) || I2(2) === "" || I2(2) === "*")) {
            v2();
          } else {
            if (n.isWhitespace(q2())) {
              r2.push(A2());
            } else if (!R2() && q2() === "." && (n.isAlpha(N()) || N() === "{" || N() === "-")) {
              r2.push(d3());
            } else if (!R2() && q2() === "#" && (n.isAlpha(N()) || N() === "{")) {
              r2.push(k2());
            } else if (q2() === "[" && N() === "@") {
              r2.push(E2());
            } else if (q2() === "@") {
              r2.push(T2());
            } else if (q2() === "*" && n.isAlpha(N())) {
              r2.push(y2());
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
        function y2() {
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
        function I2(e3 = 1) {
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
        function A2() {
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
          i2.push({ execCount: 0, every: n2, on: s3, args: u3, filter: l3, from: y3, inExpr: x3, elsewhere: k3, startCount: c4, endCount: f3, unbounded: m2, debounceTime: b3, throttleTime: w3, mutationSpec: E2, intersectionSpec: d4, debounced: undefined, lastExec: undefined });
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
              var I2 = true;
            } else {
              r3.requireToken("last");
            }
          }
        }
        var C = e2.requireElement("commandList", r3);
        e2.ensureTerminated(C);
        var R2, A2;
        if (r3.matchToken("catch")) {
          R2 = r3.requireTokenType("IDENTIFIER").value;
          A2 = e2.requireElement("commandList", r3);
          e2.ensureTerminated(A2);
        }
        if (r3.matchToken("finally")) {
          var L = e2.requireElement("commandList", r3);
          e2.ensureTerminated(L);
        }
        var O = { displayName: a3, events: i2, start: C, every: n2, execCount: 0, errorHandler: A2, errorSymbol: R2, execute: function(e3) {
          let r4 = t3.getEventQueueFor(e3.me, O);
          if (r4.executing && n2 === false) {
            if (I2 || N && r4.queue.length > 0) {
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
                s4.meta.errorHandler = A2;
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
        var y3 = { identifier: a3, indexIdentifier: h3, slot: T3, expression: s3, forever: p3, times: m2, until: l3, event: c4, on: f3, whileExpr: u3, resolveNext: function() {
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
        e2.setParent(v3, y3);
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
                var y2 = false;
                var k2 = false;
                e5.addEventListener("transitionend", function() {
                  if (!k2) {
                    e5.style.transition = c5;
                    k2 = true;
                    n6();
                  }
                }, { once: true });
                e5.addEventListener("transitionstart", function() {
                  y2 = true;
                }, { once: true });
                setTimeout(function() {
                  if (!k2 && !y2) {
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
var Ec = function(s, t) {
  return t && `${t}::${Hr++}` || s.uidEvent || Hr++;
};
var Cc = function(s) {
  const t = Ec(s);
  return s.uidEvent = t, $n[t] = $n[t] || {}, $n[t];
};
var Ed = function(s, t) {
  return function e(i) {
    return i.delegateTarget = s, e.oneOff && c.off(s, i.type, t), t.apply(s, [i]);
  };
};
var Cd = function(s, t, e) {
  return function i(n) {
    const o = s.querySelectorAll(t);
    for (let { target: r } = n;r && r !== this; r = r.parentNode)
      for (let a = o.length;a--; "")
        if (o[a] === r)
          return n.delegateTarget = r, i.oneOff && c.off(s, n.type, e), e.apply(r, [n]);
    return null;
  };
};
var Ac = function(s, t, e = null) {
  const i = Object.keys(s);
  for (let n = 0, o = i.length;n < o; n++) {
    const r = s[i[n]];
    if (r.originalHandler === t && r.delegationSelector === e)
      return r;
  }
  return null;
};
var yc = function(s, t, e) {
  const i = typeof t == "string", n = i ? e : t;
  let o = wc(s);
  return Tc.has(o) || (o = s), [i, n, o];
};
var Vr = function(s, t, e, i, n) {
  if (typeof t != "string" || !s)
    return;
  if (e || (e = i, i = null), Td.test(t)) {
    const g = (m) => function(b) {
      if (!b.relatedTarget || b.relatedTarget !== b.delegateTarget && !b.delegateTarget.contains(b.relatedTarget))
        return m.call(this, b);
    };
    i ? i = g(i) : e = g(e);
  }
  const [o, r, a] = yc(t, e, i), l = Cc(s), p = l[a] || (l[a] = {}), u = Ac(p, r, o ? e : null);
  if (u) {
    u.oneOff = u.oneOff && n;
    return;
  }
  const _ = Ec(r, t.replace(md, "")), f = o ? Cd(s, e, i) : Ed(s, e);
  f.delegationSelector = o ? e : null, f.originalHandler = r, f.oneOff = n, f.uidEvent = _, p[_] = f, s.addEventListener(a, f, o);
};
var Vo = function(s, t, e, i, n) {
  const o = Ac(t[e], i, n);
  o && (s.removeEventListener(e, o, !!n), delete t[e][o.uidEvent]);
};
var Ad = function(s, t, e, i) {
  const n = t[e] || {};
  Object.keys(n).forEach((o) => {
    if (o.includes(i)) {
      const r = n[o];
      Vo(s, t, e, r.originalHandler, r.delegationSelector);
    }
  });
};
var wc = function(s) {
  return s = s.replace(gd, ""), vd[s] || s;
};
var Rt = function(s) {
  return s ? (s.nodeName || "").toLowerCase() : null;
};
var _t = function(s) {
  if (s == null)
    return window;
  if (s.toString() !== "[object Window]") {
    var t = s.ownerDocument;
    return t && t.defaultView || window;
  }
  return s;
};
var ye = function(s) {
  var t = _t(s).Element;
  return s instanceof t || s instanceof Element;
};
var dt = function(s) {
  var t = _t(s).HTMLElement;
  return s instanceof t || s instanceof HTMLElement;
};
var dr = function(s) {
  if (typeof ShadowRoot > "u")
    return false;
  var t = _t(s).ShadowRoot;
  return s instanceof t || s instanceof ShadowRoot;
};
var xd = function(s) {
  var t = s.state;
  Object.keys(t.elements).forEach(function(e) {
    var i = t.styles[e] || {}, n = t.attributes[e] || {}, o = t.elements[e];
    !dt(o) || !Rt(o) || (Object.assign(o.style, i), Object.keys(n).forEach(function(r) {
      var a = n[r];
      a === false ? o.removeAttribute(r) : o.setAttribute(r, a === true ? "" : a);
    }));
  });
};
var Od = function(s) {
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
      !dt(n) || !Rt(n) || (Object.assign(n.style, a), Object.keys(o).forEach(function(l) {
        n.removeAttribute(l);
      }));
    });
  };
};
var Et = function(s) {
  return s.split("-")[0];
};
var Fo = function() {
  var s = navigator.userAgentData;
  return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
};
var Bc = function() {
  return !/^((?!chrome|android).)*safari/i.test(Fo());
};
var Ze = function(s, t, e) {
  t === undefined && (t = false), e === undefined && (e = false);
  var i = s.getBoundingClientRect(), n = 1, o = 1;
  t && dt(s) && (n = s.offsetWidth > 0 && qe(i.width) / s.offsetWidth || 1, o = s.offsetHeight > 0 && qe(i.height) / s.offsetHeight || 1);
  var r = ye(s) ? _t(s) : window, a = r.visualViewport, l = !Bc() && e, p = (i.left + (l && a ? a.offsetLeft : 0)) / n, u = (i.top + (l && a ? a.offsetTop : 0)) / o, _ = i.width / n, f = i.height / o;
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
var pr = function(s) {
  var t = Ze(s), e = s.offsetWidth, i = s.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: s.offsetLeft,
    y: s.offsetTop,
    width: e,
    height: i
  };
};
var Hc = function(s, t) {
  var e = t.getRootNode && t.getRootNode();
  if (s.contains(t))
    return true;
  if (e && dr(e)) {
    var i = t;
    do {
      if (i && s.isSameNode(i))
        return true;
      i = i.parentNode || i.host;
    } while (i);
  }
  return false;
};
var At = function(s) {
  return _t(s).getComputedStyle(s);
};
var Sd = function(s) {
  return ["table", "td", "th"].indexOf(Rt(s)) >= 0;
};
var ie = function(s) {
  return ((ye(s) ? s.ownerDocument : s.document) || window.document).documentElement;
};
var mn = function(s) {
  return Rt(s) === "html" ? s : s.assignedSlot || s.parentNode || (dr(s) ? s.host : null) || ie(s);
};
var Wr = function(s) {
  return !dt(s) || At(s).position === "fixed" ? null : s.offsetParent;
};
var Id = function(s) {
  var t = /firefox/i.test(Fo()), e = /Trident/i.test(Fo());
  if (e && dt(s)) {
    var i = At(s);
    if (i.position === "fixed")
      return null;
  }
  var n = mn(s);
  for (dr(n) && (n = n.host);dt(n) && ["html", "body"].indexOf(Rt(n)) < 0; ) {
    var o = At(n);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
};
var Ki = function(s) {
  for (var t = _t(s), e = Wr(s);e && Sd(e) && At(e).position === "static"; )
    e = Wr(e);
  return e && (Rt(e) === "html" || Rt(e) === "body" && At(e).position === "static") ? t : e || Id(s) || t;
};
var _r = function(s) {
  return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y";
};
var Mi = function(s, t, e) {
  return ve(s, un(t, e));
};
var Dd = function(s, t, e) {
  var i = Mi(s, t, e);
  return i > e ? e : i;
};
var Vc = function() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
};
var Wc = function(s) {
  return Object.assign({}, Vc(), s);
};
var Fc = function(s, t) {
  return t.reduce(function(e, i) {
    return e[i] = s, e;
  }, {});
};
var Ld = function(s) {
  var t, e = s.state, i = s.name, n = s.options, o = e.elements.arrow, r = e.modifiersData.popperOffsets, a = Et(e.placement), l = _r(a), p = [nt, pt].indexOf(a) >= 0, u = p ? "height" : "width";
  if (!(!o || !r)) {
    var _ = $d(n.padding, e), f = pr(o), g = l === "y" ? st : nt, m = l === "y" ? ut : pt, b = e.rects.reference[u] + e.rects.reference[l] - r[l] - e.rects.popper[u], v = r[l] - e.rects.reference[l], T = Ki(o), y = T ? l === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, C = b / 2 - v / 2, E = _[g], w = y - f[u] - _[m], k = y / 2 - f[u] / 2 + C, D = Mi(E, k, w), O = l;
    e.modifiersData[i] = (t = {}, t[O] = D, t.centerOffset = D - k, t);
  }
};
var Nd = function(s) {
  var { state: t, options: e } = s, i = e.element, n = i === undefined ? "[data-popper-arrow]" : i;
  if (n != null && !(typeof n == "string" && (n = t.elements.popper.querySelector(n), !n))) {
    if ({}.NODE_ENV !== "production" && (dt(n) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !Hc(t.elements.popper, n)) {
      ({}).NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    t.elements.arrow = n;
  }
};
var Qe = function(s) {
  return s.split("-")[1];
};
var Rd = function(s, t) {
  var { x: e, y: i } = s, n = t.devicePixelRatio || 1;
  return {
    x: qe(e * n) / n || 0,
    y: qe(i * n) / n || 0
  };
};
var Fr = function(s) {
  var t, e = s.popper, i = s.popperRect, n = s.placement, o = s.variation, r = s.offsets, a = s.position, l = s.gpuAcceleration, p = s.adaptive, u = s.roundOffsets, _ = s.isFixed, f = r.x, g = f === undefined ? 0 : f, m = r.y, b = m === undefined ? 0 : m, v = typeof u == "function" ? u({
    x: g,
    y: b
  }) : {
    x: g,
    y: b
  };
  g = v.x, b = v.y;
  var T = r.hasOwnProperty("x"), y = r.hasOwnProperty("y"), C = nt, E = st, w = window;
  if (p) {
    var k = Ki(e), D = "clientHeight", O = "clientWidth";
    if (k === _t(e) && (k = ie(e), At(k).position !== "static" && a === "absolute" && (D = "scrollHeight", O = "scrollWidth")), k = k, n === st || (n === nt || n === pt) && o === Ge) {
      E = ut;
      var x = _ && k === w && w.visualViewport ? w.visualViewport.height : k[D];
      b -= x - i.height, b *= l ? 1 : -1;
    }
    if (n === nt || (n === st || n === ut) && o === Ge) {
      C = pt;
      var L = _ && k === w && w.visualViewport ? w.visualViewport.width : k[O];
      g -= L - i.width, g *= l ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: a
  }, p && Md), N = u === true ? Rd({
    x: g,
    y: b
  }, _t(e)) : {
    x: g,
    y: b
  };
  if (g = N.x, b = N.y, l) {
    var P;
    return Object.assign({}, S, (P = {}, P[E] = y ? "0" : "", P[C] = T ? "0" : "", P.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + b + "px)" : "translate3d(" + g + "px, " + b + "px, 0)", P));
  }
  return Object.assign({}, S, (t = {}, t[E] = y ? b + "px" : "", t[C] = T ? g + "px" : "", t.transform = "", t));
};
var Pd = function(s) {
  var { state: t, options: e } = s, i = e.gpuAcceleration, n = i === undefined ? true : i, o = e.adaptive, r = o === undefined ? true : o, a = e.roundOffsets, l = a === undefined ? true : a;
  if ({}.NODE_ENV !== "production") {
    var p = At(t.elements.popper).transitionProperty || "";
    r && ["transform", "top", "right", "bottom", "left"].some(function(_) {
      return p.indexOf(_) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var u = {
    placement: Et(t.placement),
    variation: Qe(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Fr(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: r,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Fr(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: false,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
};
var Bd = function(s) {
  var { state: t, instance: e, options: i } = s, n = i.scroll, o = n === undefined ? true : n, r = i.resize, a = r === undefined ? true : r, l = _t(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && p.forEach(function(u) {
    u.addEventListener("scroll", e.update, ns);
  }), a && l.addEventListener("resize", e.update, ns), function() {
    o && p.forEach(function(u) {
      u.removeEventListener("scroll", e.update, ns);
    }), a && l.removeEventListener("resize", e.update, ns);
  };
};
var Ws = function(s) {
  return s.replace(/left|right|bottom|top/g, function(t) {
    return Hd[t];
  });
};
var Yr = function(s) {
  return s.replace(/start|end/g, function(t) {
    return Vd[t];
  });
};
var gr = function(s) {
  var t = _t(s), e = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: i
  };
};
var br = function(s) {
  return Ze(ie(s)).left + gr(s).scrollLeft;
};
var Wd = function(s, t) {
  var e = _t(s), i = ie(s), n = e.visualViewport, o = i.clientWidth, r = i.clientHeight, a = 0, l = 0;
  if (n) {
    o = n.width, r = n.height;
    var p = Bc();
    (p || !p && t === "fixed") && (a = n.offsetLeft, l = n.offsetTop);
  }
  return {
    width: o,
    height: r,
    x: a + br(s),
    y: l
  };
};
var Fd = function(s) {
  var t, e = ie(s), i = gr(s), n = (t = s.ownerDocument) == null ? undefined : t.body, o = ve(e.scrollWidth, e.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), r = ve(e.scrollHeight, e.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), a = -i.scrollLeft + br(s), l = -i.scrollTop;
  return At(n || e).direction === "rtl" && (a += ve(e.clientWidth, n ? n.clientWidth : 0) - o), {
    width: o,
    height: r,
    x: a,
    y: l
  };
};
var vr = function(s) {
  var t = At(s), e = t.overflow, i = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + n + i);
};
var jc = function(s) {
  return ["html", "body", "#document"].indexOf(Rt(s)) >= 0 ? s.ownerDocument.body : dt(s) && vr(s) ? s : jc(mn(s));
};
var Ri = function(s, t) {
  var e;
  t === undefined && (t = []);
  var i = jc(s), n = i === ((e = s.ownerDocument) == null ? undefined : e.body), o = _t(i), r = n ? [o].concat(o.visualViewport || [], vr(i) ? i : []) : i, a = t.concat(r);
  return n ? a : a.concat(Ri(mn(r)));
};
var Yo = function(s) {
  return Object.assign({}, s, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  });
};
var Yd = function(s, t) {
  var e = Ze(s, false, t === "fixed");
  return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e;
};
var jr = function(s, t, e) {
  return t === cr ? Yo(Wd(s, e)) : ye(t) ? Yd(t, e) : Yo(Fd(ie(s)));
};
var jd = function(s) {
  var t = Ri(mn(s)), e = ["absolute", "fixed"].indexOf(At(s).position) >= 0, i = e && dt(s) ? Ki(s) : s;
  return ye(i) ? t.filter(function(n) {
    return ye(n) && Hc(n, i) && Rt(n) !== "body";
  }) : [];
};
var Kd = function(s, t, e, i) {
  var n = t === "clippingParents" ? jd(s) : [].concat(t), o = [].concat(n, [e]), r = o[0], a = o.reduce(function(l, p) {
    var u = jr(s, p, i);
    return l.top = ve(u.top, l.top), l.right = un(u.right, l.right), l.bottom = un(u.bottom, l.bottom), l.left = ve(u.left, l.left), l;
  }, jr(s, r, i));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
};
var Kc = function(s) {
  var { reference: t, element: e, placement: i } = s, n = i ? Et(i) : null, o = i ? Qe(i) : null, r = t.x + t.width / 2 - e.width / 2, a = t.y + t.height / 2 - e.height / 2, l;
  switch (n) {
    case st:
      l = {
        x: r,
        y: t.y - e.height
      };
      break;
    case ut:
      l = {
        x: r,
        y: t.y + t.height
      };
      break;
    case pt:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case nt:
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
  var p = n ? _r(n) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (o) {
      case Ae:
        l[p] = l[p] - (t[u] / 2 - e[u] / 2);
        break;
      case Ge:
        l[p] = l[p] + (t[u] / 2 - e[u] / 2);
        break;
    }
  }
  return l;
};
var Je = function(s, t) {
  t === undefined && (t = {});
  var e = t, i = e.placement, n = i === undefined ? s.placement : i, o = e.strategy, r = o === undefined ? s.strategy : o, a = e.boundary, l = a === undefined ? xc : a, p = e.rootBoundary, u = p === undefined ? cr : p, _ = e.elementContext, f = _ === undefined ? Be : _, g = e.altBoundary, m = g === undefined ? false : g, b = e.padding, v = b === undefined ? 0 : b, T = Wc(typeof v != "number" ? v : Fc(v, ni)), y = f === Be ? Oc : Be, C = s.rects.popper, E = s.elements[m ? y : f], w = Kd(ye(E) ? E : E.contextElement || ie(s.elements.popper), l, u, r), k = Ze(s.elements.reference), D = Kc({
    reference: k,
    element: C,
    strategy: "absolute",
    placement: n
  }), O = Yo(Object.assign({}, C, D)), x = f === Be ? O : k, L = {
    top: w.top - x.top + T.top,
    bottom: x.bottom - w.bottom + T.bottom,
    left: w.left - x.left + T.left,
    right: x.right - w.right + T.right
  }, S = s.modifiersData.offset;
  if (f === Be && S) {
    var N = S[n];
    Object.keys(L).forEach(function(P) {
      var ot = [pt, ut].indexOf(P) >= 0 ? 1 : -1, rt = [st, ut].indexOf(P) >= 0 ? "y" : "x";
      L[P] += N[rt] * ot;
    });
  }
  return L;
};
var zd = function(s, t) {
  t === undefined && (t = {});
  var e = t, i = e.placement, n = e.boundary, o = e.rootBoundary, r = e.padding, a = e.flipVariations, l = e.allowedAutoPlacements, p = l === undefined ? hr : l, u = Qe(i), _ = u ? a ? Wo : Wo.filter(function(m) {
    return Qe(m) === u;
  }) : ni, f = _.filter(function(m) {
    return p.indexOf(m) >= 0;
  });
  f.length === 0 && (f = _, {}.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var g = f.reduce(function(m, b) {
    return m[b] = Je(s, {
      placement: b,
      boundary: n,
      rootBoundary: o,
      padding: r
    })[Et(b)], m;
  }, {});
  return Object.keys(g).sort(function(m, b) {
    return g[m] - g[b];
  });
};
var Ud = function(s) {
  if (Et(s) === ji)
    return [];
  var t = Ws(s);
  return [Yr(s), t, Yr(t)];
};
var Xd = function(s) {
  var { state: t, options: e, name: i } = s;
  if (!t.modifiersData[i]._skip) {
    for (var n = e.mainAxis, o = n === undefined ? true : n, r = e.altAxis, a = r === undefined ? true : r, l = e.fallbackPlacements, p = e.padding, u = e.boundary, _ = e.rootBoundary, f = e.altBoundary, g = e.flipVariations, m = g === undefined ? true : g, b = e.allowedAutoPlacements, v = t.options.placement, T = Et(v), y = T === v, C = l || (y || !m ? [Ws(v)] : Ud(v)), E = [v].concat(C).reduce(function(Oe, Vt) {
      return Oe.concat(Et(Vt) === ji ? zd(t, {
        placement: Vt,
        boundary: u,
        rootBoundary: _,
        padding: p,
        flipVariations: m,
        allowedAutoPlacements: b
      }) : Vt);
    }, []), w = t.rects.reference, k = t.rects.popper, D = new Map, O = true, x = E[0], L = 0;L < E.length; L++) {
      var S = E[L], N = Et(S), P = Qe(S) === Ae, ot = [st, ut].indexOf(N) >= 0, rt = ot ? "width" : "height", G = Je(t, {
        placement: S,
        boundary: u,
        rootBoundary: _,
        altBoundary: f,
        padding: p
      }), vt = ot ? P ? pt : nt : P ? ut : st;
      w[rt] > k[rt] && (vt = Ws(vt));
      var Ji = Ws(vt), oe = [];
      if (o && oe.push(G[N] <= 0), a && oe.push(G[vt] <= 0, G[Ji] <= 0), oe.every(function(Oe) {
        return Oe;
      })) {
        x = S, O = false;
        break;
      }
      D.set(S, oe);
    }
    if (O)
      for (var ts = m ? 3 : 1, kn = function(Vt) {
        var di = E.find(function(is) {
          var re = D.get(is);
          if (re)
            return re.slice(0, Vt).every(function(xn) {
              return xn;
            });
        });
        if (di)
          return x = di, "break";
      }, hi = ts;hi > 0; hi--) {
        var es = kn(hi);
        if (es === "break")
          break;
      }
    t.placement !== x && (t.modifiersData[i]._skip = true, t.placement = x, t.reset = true);
  }
};
var Kr = function(s, t, e) {
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
var zr = function(s) {
  return [st, pt, ut, nt].some(function(t) {
    return s[t] >= 0;
  });
};
var Gd = function(s) {
  var { state: t, name: e } = s, i = t.rects.reference, n = t.rects.popper, o = t.modifiersData.preventOverflow, r = Je(t, {
    elementContext: "reference"
  }), a = Je(t, {
    altBoundary: true
  }), l = Kr(r, i), p = Kr(a, n, o), u = zr(l), _ = zr(p);
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
var qd = function(s, t, e) {
  var i = Et(s), n = [nt, st].indexOf(i) >= 0 ? -1 : 1, o = typeof e == "function" ? e(Object.assign({}, t, {
    placement: s
  })) : e, r = o[0], a = o[1];
  return r = r || 0, a = (a || 0) * n, [nt, pt].indexOf(i) >= 0 ? {
    x: a,
    y: r
  } : {
    x: r,
    y: a
  };
};
var Zd = function(s) {
  var { state: t, options: e, name: i } = s, n = e.offset, o = n === undefined ? [0, 0] : n, r = hr.reduce(function(u, _) {
    return u[_] = qd(_, t.rects, o), u;
  }, {}), a = r[t.placement], l = a.x, p = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += p), t.modifiersData[i] = r;
};
var Qd = function(s) {
  var { state: t, name: e } = s;
  t.modifiersData[e] = Kc({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
};
var Jd = function(s) {
  return s === "x" ? "y" : "x";
};
var tu = function(s) {
  var { state: t, options: e, name: i } = s, n = e.mainAxis, o = n === undefined ? true : n, r = e.altAxis, a = r === undefined ? false : r, l = e.boundary, p = e.rootBoundary, u = e.altBoundary, _ = e.padding, f = e.tether, g = f === undefined ? true : f, m = e.tetherOffset, b = m === undefined ? 0 : m, v = Je(t, {
    boundary: l,
    rootBoundary: p,
    padding: _,
    altBoundary: u
  }), T = Et(t.placement), y = Qe(t.placement), C = !y, E = _r(T), w = Jd(E), k = t.modifiersData.popperOffsets, D = t.rects.reference, O = t.rects.popper, x = typeof b == "function" ? b(Object.assign({}, t.rects, {
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
      var P, ot = E === "y" ? st : nt, rt = E === "y" ? ut : pt, G = E === "y" ? "height" : "width", vt = k[E], Ji = vt + v[ot], oe = vt - v[rt], ts = g ? -O[G] / 2 : 0, kn = y === Ae ? D[G] : O[G], hi = y === Ae ? -O[G] : -D[G], es = t.elements.arrow, Oe = g && es ? pr(es) : {
        width: 0,
        height: 0
      }, Vt = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Vc(), di = Vt[ot], is = Vt[rt], re = Mi(0, D[G], Oe[G]), xn = C ? D[G] / 2 - ts - re - di - L.mainAxis : kn - re - di - L.mainAxis, nd = C ? -D[G] / 2 + ts + re + is + L.mainAxis : hi + re + is + L.mainAxis, On = t.elements.arrow && Ki(t.elements.arrow), od = On ? E === "y" ? On.clientTop || 0 : On.clientLeft || 0 : 0, Ir = (P = S == null ? undefined : S[E]) != null ? P : 0, rd = vt + xn - Ir - od, ad = vt + nd - Ir, Dr = Mi(g ? un(Ji, rd) : Ji, vt, g ? ve(oe, ad) : oe);
      k[E] = Dr, N[E] = Dr - vt;
    }
    if (a) {
      var $r, ld = E === "x" ? st : nt, cd = E === "x" ? ut : pt, ae = k[w], ss = w === "y" ? "height" : "width", Lr = ae + v[ld], Nr = ae - v[cd], Sn = [st, nt].indexOf(T) !== -1, Mr = ($r = S == null ? undefined : S[w]) != null ? $r : 0, Rr = Sn ? Lr : ae - D[ss] - O[ss] - Mr + L.altAxis, Pr = Sn ? ae + D[ss] + O[ss] - Mr - L.altAxis : Nr, Br = g && Sn ? Dd(Rr, ae, Pr) : Mi(g ? Rr : Lr, ae, g ? Pr : Nr);
      k[w] = Br, N[w] = Br - ae;
    }
    t.modifiersData[i] = N;
  }
};
var eu = function(s) {
  return {
    scrollLeft: s.scrollLeft,
    scrollTop: s.scrollTop
  };
};
var iu = function(s) {
  return s === _t(s) || !dt(s) ? gr(s) : eu(s);
};
var su = function(s) {
  var t = s.getBoundingClientRect(), e = qe(t.width) / s.offsetWidth || 1, i = qe(t.height) / s.offsetHeight || 1;
  return e !== 1 || i !== 1;
};
var nu = function(s, t, e) {
  e === undefined && (e = false);
  var i = dt(t), n = dt(t) && su(t), o = ie(t), r = Ze(s, n, e), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (i || !i && !e) && ((Rt(t) !== "body" || vr(o)) && (a = iu(t)), dt(t) ? (l = Ze(t, true), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = br(o))), {
    x: r.left + a.scrollLeft - l.x,
    y: r.top + a.scrollTop - l.y,
    width: r.width,
    height: r.height
  };
};
var ou = function(s) {
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
var ru = function(s) {
  var t = ou(s);
  return dn.reduce(function(e, i) {
    return e.concat(t.filter(function(n) {
      return n.phase === i;
    }));
  }, []);
};
var au = function(s) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = undefined, e(s());
      });
    })), t;
  };
};
var Wt = function(s) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), i = 1;i < t; i++)
    e[i - 1] = arguments[i];
  return [].concat(e).reduce(function(n, o) {
    return n.replace(/%s/, o);
  }, s);
};
var cu = function(s) {
  s.forEach(function(t) {
    [].concat(Object.keys(t), Ur).filter(function(e, i, n) {
      return n.indexOf(e) === i;
    }).forEach(function(e) {
      switch (e) {
        case "name":
          typeof t.name != "string" && console.error(Wt(le, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
          break;
        case "enabled":
          typeof t.enabled != "boolean" && console.error(Wt(le, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
          break;
        case "phase":
          dn.indexOf(t.phase) < 0 && console.error(Wt(le, t.name, '"phase"', "either " + dn.join(", "), '"' + String(t.phase) + '"'));
          break;
        case "fn":
          typeof t.fn != "function" && console.error(Wt(le, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "effect":
          t.effect != null && typeof t.effect != "function" && console.error(Wt(le, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "requires":
          t.requires != null && !Array.isArray(t.requires) && console.error(Wt(le, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t.requiresIfExists) || console.error(Wt(le, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + Ur.map(function(i) {
            return '"' + i + '"';
          }).join(", ") + '; but "' + e + '" was provided.');
      }
      t.requires && t.requires.forEach(function(i) {
        s.find(function(n) {
          return n.name === i;
        }) == null && console.error(Wt(lu, String(t.name), i, i));
      });
    });
  });
};
var hu = function(s, t) {
  var e = new Set;
  return s.filter(function(i) {
    var n = t(i);
    if (!e.has(n))
      return e.add(n), true;
  });
};
var du = function(s) {
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
var qr = function() {
  for (var s = arguments.length, t = new Array(s), e = 0;e < s; e++)
    t[e] = arguments[e];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
};
var gn = function(s) {
  s === undefined && (s = {});
  var t = s, e = t.defaultModifiers, i = e === undefined ? [] : e, n = t.defaultOptions, o = n === undefined ? Gr : n;
  return function(a, l, p) {
    p === undefined && (p = o);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Gr, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, _ = [], f = false, g = {
      state: u,
      setOptions: function(T) {
        var y = typeof T == "function" ? T(u.options) : T;
        b(), u.options = Object.assign({}, o, u.options, y), u.scrollParents = {
          reference: ye(a) ? Ri(a) : a.contextElement ? Ri(a.contextElement) : [],
          popper: Ri(l)
        };
        var C = ru(du([].concat(i, u.options.modifiers)));
        if (u.orderedModifiers = C.filter(function(S) {
          return S.enabled;
        }), {}.NODE_ENV !== "production") {
          var E = hu([].concat(C, u.options.modifiers), function(S) {
            var N = S.name;
            return N;
          });
          if (cu(E), Et(u.options.placement) === ji) {
            var w = u.orderedModifiers.find(function(S) {
              var N = S.name;
              return N === "flip";
            });
            w || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var k = At(l), D = k.marginTop, O = k.marginRight, x = k.marginBottom, L = k.marginLeft;
          [D, O, x, L].some(function(S) {
            return parseFloat(S);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return m(), g.update();
      },
      forceUpdate: function() {
        if (!f) {
          var T = u.elements, y = T.reference, C = T.popper;
          if (!qr(y, C)) {
            ({}).NODE_ENV !== "production" && console.error(Xr);
            return;
          }
          u.rects = {
            reference: nu(y, Ki(C), u.options.strategy === "fixed"),
            popper: pr(C)
          }, u.reset = false, u.placement = u.options.placement, u.orderedModifiers.forEach(function(S) {
            return u.modifiersData[S.name] = Object.assign({}, S.data);
          });
          for (var E = 0, w = 0;w < u.orderedModifiers.length; w++) {
            if ({}.NODE_ENV !== "production" && (E += 1, E > 100)) {
              console.error(uu);
              break;
            }
            if (u.reset === true) {
              u.reset = false, w = -1;
              continue;
            }
            var k = u.orderedModifiers[w], D = k.fn, O = k.options, x = O === undefined ? {} : O, L = k.name;
            typeof D == "function" && (u = D({
              state: u,
              options: x,
              name: L,
              instance: g
            }) || u);
          }
        }
      },
      update: au(function() {
        return new Promise(function(v) {
          g.forceUpdate(), v(u);
        });
      }),
      destroy: function() {
        b(), f = true;
      }
    };
    if (!qr(a, l))
      return {}.NODE_ENV !== "production" && console.error(Xr), g;
    g.setOptions(p).then(function(v) {
      !f && p.onFirstUpdate && p.onFirstUpdate(v);
    });
    function m() {
      u.orderedModifiers.forEach(function(v) {
        var { name: T, options: y } = v, C = y === undefined ? {} : y, E = v.effect;
        if (typeof E == "function") {
          var w = E({
            state: u,
            name: T,
            instance: g,
            options: C
          }), k = function() {
          };
          _.push(w || k);
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
var Ln = function(s) {
  return s === "true" ? true : s === "false" ? false : s === Number(s).toString() ? Number(s) : s === "" || s === "null" ? null : s;
};
var Nn = function(s) {
  return s.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
};
var Mn = function(s) {
  return typeof s == "string" ? s.split(" ") : Array.isArray(s) ? s : false;
};
var pn = function(s, t, e) {
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
      p_(f, _) || l.removeAttribute(f.nodeName);
    });
  }
  return n.body.innerHTML;
};
var tt = function(s) {
  return s.getDate();
};
var zs = function(s) {
  return s.getDay();
};
var Y = function(s) {
  return s.getMonth();
};
var B = function(s) {
  return s.getFullYear();
};
var Nf = function(s, t, e) {
  const i = e.startDay, n = i > 0 ? 7 - i : 0, r = new Date(s, t).getDay() + n;
  return r >= 7 ? r - 7 : r;
};
var Go = function(s) {
  return Mf(s).getDate();
};
var Mf = function(s) {
  return Ct(s.getFullYear(), s.getMonth() + 1, 0);
};
var je = function() {
  return new Date;
};
var at = function(s, t) {
  return lt(s, t * 12);
};
var lt = function(s, t) {
  const e = Ct(s.getFullYear(), s.getMonth() + t, s.getDate()), i = tt(s), n = tt(e);
  return i !== n && e.setDate(0), e;
};
var $e = function(s, t) {
  return Ct(s.getFullYear(), s.getMonth(), s.getDate() + t);
};
var Ct = function(s, t, e) {
  const i = new Date(s, t, e);
  return s >= 0 && s < 100 && i.setFullYear(i.getFullYear() - 1900), i;
};
var Va = function(s) {
  const t = s.split("-"), e = t[0], i = t[1], n = t[2];
  return Ct(e, i, n);
};
var Rf = function(s) {
  return !Number.isNaN(s.getTime());
};
var Fe = function(s, t) {
  return B(s) - B(t) || Y(s) - Y(t) || tt(s) - tt(t);
};
var me = function(s, t) {
  return s.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), s.getTime() === t.getTime();
};
var Us = function(s, t) {
  const i = B(s) - Bf();
  return Pf(i, t);
};
var Pf = function(s, t) {
  return (s % t + t) % t;
};
var Bf = function(s, t, e) {
  let i = 0;
  return e ? i = B(e) - s + 1 : t && (i = B(t)), i;
};
var _n = function(s, t, e, i, n, o) {
  const r = new Date;
  r.setHours(0, 0, 0, 0);
  const a = t && Fe(s, t) <= -1, l = e && Fe(s, e) >= 1, p = n && Fe(s, r) <= -1, u = o && Fe(s, r) >= 1, _ = i && i(s) === false;
  return a || l || _ || p || u;
};
var _h = function(s, t, e, i, n, o) {
  const r = new Date, a = i && B(i), l = i && Y(i), p = e && B(e), u = e && Y(e), _ = B(r), f = Y(r), g = l && a && (t > a || t === a && s > l), m = u && p && (t < p || t === p && s < u), b = n && (t < _ || t === _ && s < f), v = o && (t > _ || t === _ && s > f);
  return g || m || b || v;
};
var qo = function(s, t, e, i, n) {
  const o = t && B(t), r = e && B(e), a = B(new Date), l = r && s > r, p = o && s < o, u = i && s < a, _ = n && s > a;
  return l || p || u || _;
};
var Hf = function(s, t, e, i, n, o, r, a) {
  const l = new Date;
  return l.setHours(0, 0, 0, 0), (s && o && Fe(o, l) < 0 || s) && (o = l), o && Pi(t, o, e, i, n, o, r, a);
};
var Vf = function(s, t, e, i, n, o, r, a) {
  const l = new Date;
  return l.setHours(0, 0, 0, 0), (s && n && Fe(n, l) < 0 || s) && (n = l), n && Pi(t, n, e, i, n, o, r, a);
};
var Pi = function(s, t, e, i, n, o, r, a) {
  return e === "days" ? B(s) === B(t) && Y(s) === Y(t) : e === "months" ? B(s) === B(t) : e === "years" ? B(t) >= a && B(t) <= r : false;
};
var Zf = function(s, t, e, i, n, o, r, a, l, p) {
  const u = Y(s), _ = B(s), f = tt(s), g = zs(s), m = $("div"), b = `
        ${Fa(s, u, _, t, e, i, n, o, r, a, p)}
    `, v = `
      ${Jf(f, g, u, n, p)}
      ${Fa(s, u, _, t, e, i, n, o, r, a, p)}
    `;
  return n.inline ? (h.addClass(m, p.datepickerDropdownContainer), m.setAttribute(Ff, l), m.innerHTML = b) : (h.addClass(m, p.modalContainer), m.setAttribute(Wf, l), m.innerHTML = v), m;
};
var Qf = function(s) {
  const t = $("div");
  return h.addClass(t, s), t.setAttribute(Yf, ""), t;
};
var Jf = function(s, t, e, i, n) {
  return `
      <div class="${n.datepickerHeader}" data-te-datepicker-header>
        <div class="${n.datepickerTitle}">
          <span class="${n.datepickerTitleText}">${i.title}</span>
        </div>
        <div class="${n.datepickerDate}">
          <span class="${n.datepickerDateText}" ${jf} >${i.weekdaysShort[t]}, ${i.monthsShort[e]} ${s}</span>
        </div>
      </div>
    `;
};
var Fa = function(s, t, e, i, n, o, r, a, l, p, u) {
  let _;
  return r.inline ? _ = `
    <div class="${u.datepickerMain}">
      ${ja(t, e, r, u)}
      <div class="${u.datepickerView}" ${Wa} tabindex="0">
        ${Ya(s, e, i, n, o, r, a, l, p, u)}
      </div>
    </div>
  ` : _ = `
    <div class="${u.datepickerMain}">
      ${ja(t, e, r, u)}
      <div class="${u.datepickerView}" ${Wa} tabindex="0">
        ${Ya(s, e, i, n, o, r, a, l, p, u)}
      </div>
      ${tm(r, u)}
    </div>
  `, _;
};
var Ya = function(s, t, e, i, n, o, r, a, l, p) {
  let u;
  return o.view === "days" ? u = Xs(s, e, o, p) : o.view === "months" ? u = Gs(t, i, n, o, r, p) : u = qs(s, i, o, a, l, p), u;
};
var ja = function(s, t, e, i) {
  return `
    <div class="${i.datepickerDateControls}">
      <button class="${i.datepickerViewChangeButton}" aria-label="${e.switchToMultiYearViewLabel}" ${qf}>
        ${e.monthsFull[s]} ${t} ${Lt(e, i)}
      </button>
      <div class="${i.datepickerArrowControls}">
        <button class="${i.datepickerPreviousButton}" aria-label="${e.prevMonthLabel}" ${Kf}>${e.changeMonthIconTemplate}</button>
        <button class="${i.datepickerNextButton}" aria-label="${e.nextMonthLabel}" ${zf}>${e.changeMonthIconTemplate}</button>
      </div>
    </div>
    `;
};
var Lt = function(s, t) {
  return `
  <span class="${t.datepickerViewChangeIcon}">
  ${s.viewChangeIconTemplate}
  </span>
  `;
};
var tm = function(s, t) {
  const e = `<button class="${t.datepickerFooterBtn}" aria-label="${s.okBtnLabel}" ${Uf}>${s.okBtnText}</button>`, i = `<button class="${t.datepickerFooterBtn}" aria-label="${s.cancelBtnLabel}" ${Xf}>${s.cancelBtnText}</button>`, n = `<button class="${t.datepickerFooterBtn} ${t.datepickerClearBtn}" aria-label="${s.clearBtnLabel}" ${Gf}>${s.clearBtnText}</button>`;
  return `
        <div class="${t.datepickerFooter}">
          
        ${s.removeClearBtn ? "" : n}
        ${s.removeCancelBtn ? "" : i}
        ${s.removeOkBtn ? "" : e}
        </div>
      `;
};
var Xs = function(s, t, e, i) {
  const n = em(s, t, e), r = `
      <tr>
        ${e.weekdaysNarrow.map((l, p) => `<th class="${i.datepickerDayHeading}" scope="col" aria-label="${e.weekdaysFull[p]}">${l}</th>`).join("")}
      </tr>
    `, a = n.map((l) => `
        <tr>
          ${l.map((p) => `
              <td
              class="${i.datepickerCell} ${i.datepickerCellSmall}"
              data-te-date="${B(p.date)}-${Y(p.date)}-${tt(p.date)}"
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
var em = function(s, t, e) {
  const i = [], n = Y(s), o = Y(lt(s, -1)), r = Y(lt(s, 1)), a = B(s), l = Nf(a, n, e), p = Go(s), u = Go(lt(s, -1)), _ = 7;
  let f = 1, g = false;
  for (let m = 1;m < _; m++) {
    const b = [];
    if (m === 1) {
      const v = u - l + 1;
      for (let y = v;y <= u; y++) {
        const C = Ct(a, o, y);
        b.push({
          date: C,
          currentMonth: g,
          isSelected: t && me(C, t),
          isToday: me(C, je()),
          dayNumber: tt(C)
        });
      }
      g = true;
      const T = _ - b.length;
      for (let y = 0;y < T; y++) {
        const C = Ct(a, n, f);
        b.push({
          date: C,
          currentMonth: g,
          isSelected: t && me(C, t),
          isToday: me(C, je()),
          dayNumber: tt(C),
          disabled: _n(C, e.min, e.max, e.filter, e.disablePast, e.disableFuture)
        }), f++;
      }
    } else
      for (let v = 1;v < 8; v++) {
        f > p && (f = 1, g = false);
        const T = Ct(a, g ? n : r, f);
        b.push({
          date: T,
          currentMonth: g,
          isSelected: t && me(T, t),
          isToday: me(T, je()),
          dayNumber: tt(T),
          disabled: _n(T, e.min, e.max, e.filter, e.disablePast, e.disableFuture)
        }), f++;
      }
    i.push(b);
  }
  return i;
};
var Gs = function(s, t, e, i, n, o) {
  const r = im(i, n), a = Y(je()), l = B(je()), p = `
      ${r.map((u) => `
          <tr>
            ${u.map((_) => {
    const f = i.monthsShort.indexOf(_);
    return `
                <td class="${o.datepickerCell} ${o.datepickerCellLarge}"
                ${_h(f, s, i.min, i.max, i.disablePast, i.disableFuture) ? "data-te-datepicker-cell-disabled" : ""}
                
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
var im = function(s, t) {
  const e = [];
  let i = [];
  for (let n = 0;n < s.monthsShort.length; n++)
    if (i.push(s.monthsShort[n]), i.length === t) {
      const o = i;
      e.push(o), i = [];
    }
  return e;
};
var qs = function(s, t, e, i, n, o) {
  const r = sm(s, i, n), a = B(je()), l = `
    ${r.map((p) => `
        <tr>
          ${p.map((u) => `
              <td class="${o.datepickerCell} ${o.datepickerCellLarge}"  aria-label="${u}" data-te-year="${u}"
              ${qo(u, e.min, e.max, e.disablePast, e.disableFuture) ? "data-te-datepicker-cell-disabled" : ""}
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
var sm = function(s, t, e) {
  const i = [], n = B(s), o = Us(s, t), r = n - o;
  let a = [];
  for (let l = 0;l < t; l++)
    if (a.push(r + l), a.length === e) {
      const p = a;
      i.push(p), a = [];
    }
  return i;
};
var nm = function(s, t) {
  return `
    <button id="${s}" type="button" class="${t}" data-te-datepicker-toggle-button-ref data-te-datepicker-toggle-ref>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
      </svg>  
    </button>
  `;
};
var Qo = function(s) {
  return s.filter((t) => !t.disabled).every((t) => t.selected);
};
var Os = function(s, t, e, i, n) {
  t.selectSize === "default" && h.addClass(s, e), t.selectSize === "sm" && h.addClass(s, i), t.selectSize === "lg" && h.addClass(s, n);
};
var hb = function(s, t, e, i, n) {
  const o = document.createElement("div");
  o.setAttribute("id", s), o.setAttribute(Gg, "");
  const r = $("div");
  r.setAttribute(Xg, ""), h.addClass(r, i.formOutline);
  const a = $("input"), l = t.selectFilter ? "combobox" : "listbox", p = t.multiple ? "true" : "false", u = t.disabled ? "true" : "false";
  a.setAttribute(qg, ""), h.addClass(a, i.selectInput), Os(a, t, i.selectInputSizeDefault, i.selectInputSizeSm, i.selectInputSizeLg), t.selectFormWhite && h.addClass(a, i.selectInputWhite), a.setAttribute("type", "text"), a.setAttribute("role", l), a.setAttribute("aria-multiselectable", p), a.setAttribute("aria-disabled", u), a.setAttribute("aria-haspopup", "true"), a.setAttribute("aria-expanded", false), t.tabIndex && a.setAttribute("tabIndex", t.tabIndex), t.disabled && a.setAttribute("disabled", ""), t.selectPlaceholder !== "" && a.setAttribute("placeholder", t.selectPlaceholder), t.selectValidation ? (h.addStyle(a, {
    "pointer-events": "none",
    "caret-color": "transparent"
  }), h.addStyle(r, { cursor: "pointer" })) : a.setAttribute("readonly", "true"), t.selectValidation && (a.setAttribute("required", "true"), a.setAttribute("aria-required", "true"), a.addEventListener("keydown", cb));
  const _ = $("div");
  h.addClass(_, i.selectValidationValid);
  const f = document.createTextNode(`${t.selectValidFeedback}`);
  _.appendChild(f);
  const g = $("div");
  h.addClass(g, i.selectValidationInvalid);
  const m = document.createTextNode(`${t.selectInvalidFeedback}`);
  g.appendChild(m);
  const b = $("span");
  b.setAttribute(Zg, ""), h.addClass(b, i.selectClearBtn), Os(b, t, i.selectClearBtnDefault, i.selectClearBtnSm, i.selectClearBtnLg), t.selectFormWhite && h.addClass(b, i.selectClearBtnWhite);
  const v = document.createTextNode("\u2715");
  b.appendChild(v), b.setAttribute("tabindex", "0");
  const T = $("span");
  return h.addClass(T, i.selectArrow), Os(T, t, i.selectArrowDefault, i.selectArrowSm, i.selectArrowLg), t.selectFormWhite && h.addClass(T, i.selectArrowWhite), T.innerHTML = n || lb, r.appendChild(a), e && (h.addClass(e, i.selectLabel), Os(e, t, i.selectLabelSizeDefault, i.selectLabelSizeSm, i.selectLabelSizeLg), t.selectFormWhite && h.addClass(e, i.selectLabelWhite), r.appendChild(e)), t.selectValidation && (r.appendChild(_), r.appendChild(g)), t.selectClearButton && r.appendChild(b), r.appendChild(T), o.appendChild(r), o;
};
var vl = function(s, t, e, i, n, o, r, a) {
  const l = document.createElement("div");
  l.setAttribute(Qg, ""), h.addClass(l, a.selectDropdownContainer), l.setAttribute("id", `${s}`), l.style.width = `${e}px`;
  const p = document.createElement("div");
  p.setAttribute("tabindex", 0), p.setAttribute(Jg, ""), h.addClass(p, a.dropdown);
  const u = $("div");
  u.setAttribute(tb, ""), h.addClass(u, a.optionsWrapper), h.addClass(u, a.optionsWrapperScrollbar), u.style.maxHeight = `${i}px`;
  const _ = Ah(o, n, t, a);
  return u.appendChild(_), t.selectFilter && p.appendChild(db(t.selectSearchPlaceholder, a)), p.appendChild(u), r && p.appendChild(r), l.appendChild(p), l;
};
var Ah = function(s, t, e, i) {
  const n = $("div");
  n.setAttribute(eb, ""), h.addClass(n, i.optionsList);
  let o;
  return e.multiple ? o = pb(s, t, e, i) : o = ub(s, e, i), o.forEach((r) => {
    n.appendChild(r);
  }), n;
};
var db = function(s, t) {
  const e = $("div");
  h.addClass(e, t.inputGroup);
  const i = $("input");
  return i.setAttribute(ib, ""), h.addClass(i, t.selectFilterInput), i.placeholder = s, i.setAttribute("role", "searchbox"), i.setAttribute("type", "text"), e.appendChild(i), e;
};
var ub = function(s, t, e) {
  return yh(s, t, e);
};
var pb = function(s, t, e, i) {
  let n = null;
  e.selectAll && (n = _b(t, s, e, i));
  const o = yh(s, e, i);
  return n ? [n, ...o] : o;
};
var yh = function(s, t, e) {
  const i = [];
  return s.forEach((n) => {
    if (Object.prototype.hasOwnProperty.call(n, "options")) {
      const r = bb(n, t, e);
      i.push(r);
    } else
      i.push(wh(n, t, e));
  }), i;
};
var _b = function(s, t, e, i) {
  const n = Qo(t), o = $("div");
  o.setAttribute(Eh, "");
  const r = i.selectAllOption || i.selectOption;
  return h.addClass(o, r), o.setAttribute(sb, ""), h.addStyle(o, {
    height: `${e.selectOptionHeight}px`
  }), o.setAttribute("role", "option"), o.setAttribute("aria-selected", n), n && o.setAttribute(Ch, ""), o.appendChild(kh(s, e, i)), s.setNode(o), o;
};
var wh = function(s, t, e) {
  if (s.node)
    return s.node;
  const i = $("div");
  return i.setAttribute(Eh, ""), h.addClass(i, e.selectOption), h.addStyle(i, {
    height: `${t.selectOptionHeight}px`
  }), h.setDataAttribute(i, "id", s.id), i.setAttribute("role", "option"), i.setAttribute("aria-selected", s.selected), i.setAttribute("aria-disabled", s.disabled), s.selected && i.setAttribute(Ch, ""), s.disabled && i.setAttribute("data-te-select-option-disabled", true), s.hidden && h.addClass(i, "hidden"), i.appendChild(kh(s, t, e)), s.icon && i.appendChild(gb(s, e)), s.setNode(i), i;
};
var kh = function(s, t, e) {
  const i = $("span");
  i.setAttribute(nb, ""), h.addClass(i, e.selectOptionText);
  const n = document.createTextNode(s.label);
  return t.multiple && i.appendChild(mb(s, e)), i.appendChild(n), (s.secondaryText || typeof s.secondaryText == "number") && i.appendChild(fb(s.secondaryText, e)), i;
};
var fb = function(s, t) {
  const e = $("span");
  h.addClass(e, t.selectOptionSecondaryText);
  const i = document.createTextNode(s);
  return e.appendChild(i), e;
};
var mb = function(s, t) {
  const e = $("input");
  e.setAttribute("type", "checkbox"), h.addClass(e, t.formCheckInput), e.setAttribute(ob, "");
  const i = $("label");
  return s.selected && e.setAttribute("checked", true), s.disabled && e.setAttribute("disabled", true), e.appendChild(i), e;
};
var gb = function(s, t) {
  const e = $("span"), i = $("img");
  return h.addClass(i, t.selectOptionIcon), i.src = s.icon, e.appendChild(i), e;
};
var bb = function(s, t, e) {
  const i = $("div");
  i.setAttribute(rb, ""), h.addClass(i, e.selectOptionGroup), i.setAttribute("role", "group"), i.setAttribute("id", s.id), s.hidden && h.addClass(i, "hidden");
  const n = $("label");
  return n.setAttribute(ab, ""), h.addClass(n, e.selectOptionGroupLabel), h.addStyle(n, { height: `${t.selectOptionHeight}px` }), n.setAttribute("for", s.id), n.textContent = s.label, i.appendChild(n), s.options.forEach((o) => {
    i.appendChild(wh(o, t, e));
  }), i;
};
var vb = function(s, t) {
  const e = $("div");
  return e.textContent = s, h.addClass(e, t.selectLabel), h.addClass(e, t.selectFakeValue), e;
};
var mv = function(s) {
  return !!s && typeof s == "object";
};
var gv = function(s) {
  var t = Object.prototype.toString.call(s);
  return t === "[object RegExp]" || t === "[object Date]" || Tv(s);
};
var Tv = function(s) {
  return s.$$typeof === vv;
};
var Ev = function(s) {
  return Array.isArray(s) ? [] : {};
};
var Yi = function(s, t) {
  return t.clone !== false && t.isMergeableObject(s) ? ii(Ev(s), s, t) : s;
};
var Cv = function(s, t, e) {
  return s.concat(t).map(function(i) {
    return Yi(i, e);
  });
};
var Av = function(s, t) {
  if (!t.customMerge)
    return ii;
  var e = t.customMerge(s);
  return typeof e == "function" ? e : ii;
};
var yv = function(s) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(s).filter(function(t) {
    return Object.propertyIsEnumerable.call(s, t);
  }) : [];
};
var Dl = function(s) {
  return Object.keys(s).concat(yv(s));
};
var $h = function(s, t) {
  try {
    return t in s;
  } catch {
    return false;
  }
};
var wv = function(s, t) {
  return $h(s, t) && !(Object.hasOwnProperty.call(s, t) && Object.propertyIsEnumerable.call(s, t));
};
var kv = function(s, t, e) {
  var i = {};
  return e.isMergeableObject(s) && Dl(s).forEach(function(n) {
    i[n] = Yi(s[n], e);
  }), Dl(t).forEach(function(n) {
    wv(s, n) || ($h(s, n) && e.isMergeableObject(t[n]) ? i[n] = Av(n, e)(s[n], t[n], e) : i[n] = Yi(t[n], e));
  }), i;
};
var ii = function(s, t, e) {
  e = e || {}, e.arrayMerge = e.arrayMerge || Cv, e.isMergeableObject = e.isMergeableObject || fv, e.cloneUnlessOtherwiseSpecified = Yi;
  var i = Array.isArray(t), n = Array.isArray(s), o = i === n;
  return o ? i ? e.arrayMerge(s, t, e) : kv(s, t, e) : Yi(t, e);
};
var Nt = function(s) {
  return getComputedStyle(s);
};
var ct = function(s, t) {
  for (var e in t) {
    var i = t[e];
    typeof i == "number" && (i = i + "px"), s.style[e] = i;
  }
  return s;
};
var Is = function(s) {
  var t = document.createElement("div");
  return t.className = s, t;
};
var Jt = function(s, t) {
  if (!Ll)
    throw new Error("No element matching method supported");
  return Ll.call(s, t);
};
var Ye = function(s) {
  s.remove ? s.remove() : s.parentNode && s.parentNode.removeChild(s);
};
var Nl = function(s, t) {
  return Array.prototype.filter.call(s.children, function(e) {
    return Jt(e, t);
  });
};
var Mh = function(s, t) {
  var e = s.element.classList, i = j.state.scrolling(t);
  e.contains(i) ? clearTimeout(Nh[t]) : e.add(i);
};
var Rh = function(s, t) {
  Nh[t] = setTimeout(function() {
    return s.isAlive && s.element.classList.remove(j.state.scrolling(t));
  }, s.settings.scrollingThreshold);
};
var Dv = function(s, t) {
  Mh(s, t), Rh(s, t);
};
var Ds = function(s) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(s);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(s, false, false, undefined), t;
};
var fn = function(s, t, e, i, n) {
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
  $v(s, e, o, i, n);
};
var $v = function(s, t, e, i, n) {
  var o = e[0], r = e[1], a = e[2], l = e[3], p = e[4], u = e[5];
  i === undefined && (i = true), n === undefined && (n = false);
  var _ = s.element;
  s.reach[l] = null, _[a] < 1 && (s.reach[l] = "start"), _[a] > s[o] - s[r] - 1 && (s.reach[l] = "end"), t && (_.dispatchEvent(Ds("ps-scroll-" + l)), t < 0 ? _.dispatchEvent(Ds("ps-scroll-" + p)) : t > 0 && _.dispatchEvent(Ds("ps-scroll-" + u)), i && Dv(s, l)), s.reach[l] && (t || n) && _.dispatchEvent(Ds("ps-" + l + "-reach-" + s.reach[l]));
};
var F = function(s) {
  return parseInt(s, 10) || 0;
};
var Lv = function(s) {
  return Jt(s, "input,[contenteditable]") || Jt(s, "select,[contenteditable]") || Jt(s, "textarea,[contenteditable]") || Jt(s, "button,[contenteditable]");
};
var Nv = function(s) {
  var t = Nt(s);
  return F(t.width) + F(t.paddingLeft) + F(t.paddingRight) + F(t.borderLeftWidth) + F(t.borderRightWidth);
};
var Ht = function(s) {
  var t = s.element, e = Math.floor(t.scrollTop), i = t.getBoundingClientRect();
  s.containerWidth = Math.round(i.width), s.containerHeight = Math.round(i.height), s.contentWidth = t.scrollWidth, s.contentHeight = t.scrollHeight, t.contains(s.scrollbarXRail) || (Nl(t, j.element.rail("x")).forEach(function(n) {
    return Ye(n);
  }), t.appendChild(s.scrollbarXRail)), t.contains(s.scrollbarYRail) || (Nl(t, j.element.rail("y")).forEach(function(n) {
    return Ye(n);
  }), t.appendChild(s.scrollbarYRail)), !s.settings.suppressScrollX && s.containerWidth + s.settings.scrollXMarginOffset < s.contentWidth ? (s.scrollbarXActive = true, s.railXWidth = s.containerWidth - s.railXMarginWidth, s.railXRatio = s.containerWidth / s.railXWidth, s.scrollbarXWidth = Ml(s, F(s.railXWidth * s.containerWidth / s.contentWidth)), s.scrollbarXLeft = F((s.negativeScrollAdjustment + t.scrollLeft) * (s.railXWidth - s.scrollbarXWidth) / (s.contentWidth - s.containerWidth))) : s.scrollbarXActive = false, !s.settings.suppressScrollY && s.containerHeight + s.settings.scrollYMarginOffset < s.contentHeight ? (s.scrollbarYActive = true, s.railYHeight = s.containerHeight - s.railYMarginHeight, s.railYRatio = s.containerHeight / s.railYHeight, s.scrollbarYHeight = Ml(s, F(s.railYHeight * s.containerHeight / s.contentHeight)), s.scrollbarYTop = F(e * (s.railYHeight - s.scrollbarYHeight) / (s.contentHeight - s.containerHeight))) : s.scrollbarYActive = false, s.scrollbarXLeft >= s.railXWidth - s.scrollbarXWidth && (s.scrollbarXLeft = s.railXWidth - s.scrollbarXWidth), s.scrollbarYTop >= s.railYHeight - s.scrollbarYHeight && (s.scrollbarYTop = s.railYHeight - s.scrollbarYHeight), Mv(t, s), s.scrollbarXActive ? t.classList.add(j.state.active("x")) : (t.classList.remove(j.state.active("x")), s.scrollbarXWidth = 0, s.scrollbarXLeft = 0, t.scrollLeft = s.isRtl === true ? s.contentWidth : 0), s.scrollbarYActive ? t.classList.add(j.state.active("y")) : (t.classList.remove(j.state.active("y")), s.scrollbarYHeight = 0, s.scrollbarYTop = 0, t.scrollTop = 0);
};
var Ml = function(s, t) {
  return s.settings.minScrollbarLength && (t = Math.max(t, s.settings.minScrollbarLength)), s.settings.maxScrollbarLength && (t = Math.min(t, s.settings.maxScrollbarLength)), t;
};
var Mv = function(s, t) {
  var e = { width: t.railXWidth }, i = Math.floor(s.scrollTop);
  t.isRtl ? e.left = t.negativeScrollAdjustment + s.scrollLeft + t.containerWidth - t.contentWidth : e.left = s.scrollLeft, t.isScrollbarXUsingBottom ? e.bottom = t.scrollbarXBottom - i : e.top = t.scrollbarXTop + i, ct(t.scrollbarXRail, e);
  var n = { top: i, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? n.right = t.contentWidth - (t.negativeScrollAdjustment + s.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : n.right = t.scrollbarYRight - s.scrollLeft : t.isRtl ? n.left = t.negativeScrollAdjustment + s.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : n.left = t.scrollbarYLeft + s.scrollLeft, ct(t.scrollbarYRail, n), ct(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), ct(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
};
var Rv = function(s) {
  s.element, s.event.bind(s.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), s.event.bind(s.scrollbarYRail, "mousedown", function(t) {
    var e = t.pageY - window.pageYOffset - s.scrollbarYRail.getBoundingClientRect().top, i = e > s.scrollbarYTop ? 1 : -1;
    s.element.scrollTop += i * s.containerHeight, Ht(s), t.stopPropagation();
  }), s.event.bind(s.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), s.event.bind(s.scrollbarXRail, "mousedown", function(t) {
    var e = t.pageX - window.pageXOffset - s.scrollbarXRail.getBoundingClientRect().left, i = e > s.scrollbarXLeft ? 1 : -1;
    s.element.scrollLeft += i * s.containerWidth, Ht(s), t.stopPropagation();
  });
};
var Pv = function(s) {
  Rl(s, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), Rl(s, [
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
var Rl = function(s, t) {
  var e = t[0], i = t[1], n = t[2], o = t[3], r = t[4], a = t[5], l = t[6], p = t[7], u = t[8], _ = s.element, f = null, g = null, m = null;
  function b(y) {
    y.touches && y.touches[0] && (y[n] = y.touches[0].pageY), _[l] = f + m * (y[n] - g), Mh(s, p), Ht(s), y.stopPropagation(), y.type.startsWith("touch") && y.changedTouches.length > 1 && y.preventDefault();
  }
  function v() {
    Rh(s, p), s[u].classList.remove(j.state.clicking), s.event.unbind(s.ownerDocument, "mousemove", b);
  }
  function T(y, C) {
    f = _[l], C && y.touches && (y[n] = y.touches[0].pageY), g = y[n], m = (s[i] - s[e]) / (s[o] - s[a]), C ? s.event.bind(s.ownerDocument, "touchmove", b) : (s.event.bind(s.ownerDocument, "mousemove", b), s.event.once(s.ownerDocument, "mouseup", v), y.preventDefault()), s[u].classList.add(j.state.clicking), y.stopPropagation();
  }
  s.event.bind(s[r], "mousedown", function(y) {
    T(y);
  }), s.event.bind(s[r], "touchstart", function(y) {
    T(y, true);
  });
};
var Bv = function(s) {
  var t = s.element, e = function() {
    return Jt(t, ":hover");
  }, i = function() {
    return Jt(s.scrollbarX, ":focus") || Jt(s.scrollbarY, ":focus");
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
        if (Lv(r))
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
      s.settings.suppressScrollX && a !== 0 || s.settings.suppressScrollY && l !== 0 || (t.scrollTop -= l, t.scrollLeft += a, Ht(s), n(a, l) && o.preventDefault());
    }
  });
};
var Hv = function(s) {
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
    if (!Ve.isWebKit && t.querySelector("select:focus"))
      return true;
    if (!t.contains(r))
      return false;
    for (var p = r;p && p !== t; ) {
      if (p.classList.contains(j.element.consuming))
        return true;
      var u = Nt(p);
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
      s.settings.useBothWheelAxes ? s.scrollbarYActive && !s.scrollbarXActive ? (p ? t.scrollTop -= p * s.settings.wheelSpeed : t.scrollTop += l * s.settings.wheelSpeed, u = true) : s.scrollbarXActive && !s.scrollbarYActive && (l ? t.scrollLeft += l * s.settings.wheelSpeed : t.scrollLeft -= p * s.settings.wheelSpeed, u = true) : (t.scrollTop -= p * s.settings.wheelSpeed, t.scrollLeft += l * s.settings.wheelSpeed), Ht(s), u = u || e(l, p), u && !r.ctrlKey && (r.stopPropagation(), r.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? s.event.bind(t, "wheel", o) : typeof window.onmousewheel < "u" && s.event.bind(t, "mousewheel", o);
};
var Vv = function(s) {
  if (!Ve.supportsTouch && !Ve.supportsIePointer)
    return;
  var t = s.element;
  function e(m, b) {
    var v = Math.floor(t.scrollTop), T = t.scrollLeft, y = Math.abs(m), C = Math.abs(b);
    if (C > y) {
      if (b < 0 && v === s.contentHeight - s.containerHeight || b > 0 && v === 0)
        return window.scrollY === 0 && b > 0 && Ve.isChrome;
    } else if (y > C && (m < 0 && T === s.contentWidth - s.containerWidth || m > 0 && T === 0))
      return true;
    return true;
  }
  function i(m, b) {
    t.scrollTop -= b, t.scrollLeft -= m, Ht(s);
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
    for (var T = m;T && T !== t; ) {
      if (T.classList.contains(j.element.consuming))
        return true;
      var y = Nt(T);
      if (v && y.overflowY.match(/(scroll|auto)/)) {
        var C = T.scrollHeight - T.clientHeight;
        if (C > 0 && (T.scrollTop > 0 && v < 0 || T.scrollTop < C && v > 0))
          return true;
      }
      if (b && y.overflowX.match(/(scroll|auto)/)) {
        var E = T.scrollWidth - T.clientWidth;
        if (E > 0 && (T.scrollLeft > 0 && b < 0 || T.scrollLeft < E && b > 0))
          return true;
      }
      T = T.parentNode;
    }
    return false;
  }
  function f(m) {
    if (p(m)) {
      var b = l(m), v = { pageX: b.pageX, pageY: b.pageY }, T = v.pageX - n.pageX, y = v.pageY - n.pageY;
      if (_(m.target, T, y))
        return;
      i(T, y), n = v;
      var C = (new Date()).getTime(), E = C - o;
      E > 0 && (r.x = T / E, r.y = y / E, o = C), e(T, y) && m.preventDefault();
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
  Ve.supportsTouch ? (s.event.bind(t, "touchstart", u), s.event.bind(t, "touchmove", f), s.event.bind(t, "touchend", g)) : Ve.supportsIePointer && (window.PointerEvent ? (s.event.bind(t, "pointerdown", u), s.event.bind(t, "pointermove", f), s.event.bind(t, "pointerup", g)) : window.MSPointerEvent && (s.event.bind(t, "MSPointerDown", u), s.event.bind(t, "MSPointerMove", f), s.event.bind(t, "MSPointerUp", g)));
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
var dd = (s, t, e) => (t in s) ? hd(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e;
var wt = (s, t, e) => (dd(s, typeof t != "symbol" ? t + "" : t, e), e);
var In = (() => {
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
var A = {
  setData(s, t, e) {
    In.set(s, t, e);
  },
  getData(s, t) {
    return In.get(s, t);
  },
  removeData(s, t) {
    In.delete(s, t);
  }
};
var ud = 1e6;
var pd = 1000;
var Ho = "transitionend";
var _d = (s) => s == null ? `${s}` : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
var et = (s) => {
  do
    s += Math.floor(Math.random() * ud);
  while (document.getElementById(s));
  return s;
};
var pc = (s) => {
  let t = s.getAttribute("data-te-target");
  if (!t || t === "#") {
    let e = s.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t;
};
var lr = (s) => {
  const t = pc(s);
  return t && document.querySelector(t) ? t : null;
};
var te = (s) => {
  const t = pc(s);
  return t ? document.querySelector(t) : null;
};
var cn = (s) => {
  if (!s)
    return 0;
  let { transitionDuration: t, transitionDelay: e } = window.getComputedStyle(s);
  const i = Number.parseFloat(t), n = Number.parseFloat(e);
  return !i && !n ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * pd);
};
var _c = (s) => {
  s.dispatchEvent(new Event(Ho));
};
var Xe = (s) => !s || typeof s != "object" ? false : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u");
var ee = (s) => Xe(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector(s) : null;
var I = (s, t, e) => {
  Object.keys(e).forEach((i) => {
    const n = e[i], o = t[i], r = o && Xe(o) ? "element" : _d(o);
    if (!new RegExp(n).test(r))
      throw new Error(`${s.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`);
  });
};
var Mt = (s) => {
  if (!s || s.getClientRects().length === 0)
    return false;
  if (s.style && s.parentNode && s.parentNode.style) {
    const t = getComputedStyle(s), e = getComputedStyle(s.parentNode);
    return getComputedStyle(s).getPropertyValue("visibility") === "visible" || t.display !== "none" && e.display !== "none" && t.visibility !== "hidden";
  }
  return false;
};
var be = (s) => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? true : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false";
var fc = (s) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof s.getRootNode == "function") {
    const t = s.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return s instanceof ShadowRoot ? s : s.parentNode ? fc(s.parentNode) : null;
};
var hn = () => function() {
};
var si = (s) => {
  s.offsetHeight;
};
var mc = () => {
  const { jQuery: s } = window;
  return s && !document.body.hasAttribute("data-te-no-jquery") ? s : null;
};
var Dn = [];
var gc = (s) => {
  document.readyState === "loading" ? (Dn.length || document.addEventListener("DOMContentLoaded", () => {
    Dn.forEach((t) => t());
  }), Dn.push(s)) : s();
};
var W = () => document.documentElement.dir === "rtl";
var fd = (s) => Array.from(s);
var $ = (s) => document.createElement(s);
var ge = (s) => {
  typeof s == "function" && s();
};
var bc = (s, t, e = true) => {
  if (!e) {
    ge(s);
    return;
  }
  const i = 5, n = cn(t) + i;
  let o = false;
  const r = ({ target: a }) => {
    a === t && (o = true, t.removeEventListener(Ho, r), ge(s));
  };
  t.addEventListener(Ho, r), setTimeout(() => {
    o || _c(t);
  }, n);
};
var vc = (s, t, e, i) => {
  let n = s.indexOf(t);
  if (n === -1)
    return s[!e && i ? s.length - 1 : 0];
  const o = s.length;
  return n += e ? 1 : -1, i && (n = (n + o) % o), s[Math.max(0, Math.min(n, o - 1))];
};
var md = /[^.]*(?=\..*)\.|.*/;
var gd = /\..*/;
var bd = /::\d+$/;
var $n = {};
var Hr = 1;
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
var c = {
  on(s, t, e, i) {
    Vr(s, t, e, i, false);
  },
  one(s, t, e, i) {
    Vr(s, t, e, i, true);
  },
  off(s, t, e, i) {
    if (typeof t != "string" || !s)
      return;
    const [n, o, r] = yc(t, e, i), a = r !== t, l = Cc(s), p = t.startsWith(".");
    if (typeof o < "u") {
      if (!l || !l[r])
        return;
      Vo(s, l, r, o, n ? e : null);
      return;
    }
    p && Object.keys(l).forEach((_) => {
      Ad(s, l, _, t.slice(1));
    });
    const u = l[r] || {};
    Object.keys(u).forEach((_) => {
      const f = _.replace(bd, "");
      if (!a || t.includes(f)) {
        const g = u[_];
        Vo(s, l, r, g.originalHandler, g.delegationSelector);
      }
    });
  },
  trigger(s, t, e) {
    if (typeof t != "string" || !s)
      return null;
    const i = mc(), n = wc(t), o = t !== n, r = Tc.has(n);
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
var K = {
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
var yd = "5.1.3";

class ft {
  constructor(t) {
    t = ee(t), t && (this._element = t, A.setData(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    A.removeData(this._element, this.constructor.DATA_KEY), c.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this).forEach((t) => {
      this[t] = null;
    });
  }
  _queueCallback(t, e, i = true) {
    bc(t, e, i);
  }
  static getInstance(t) {
    return A.getData(ee(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
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
var st = "top";
var ut = "bottom";
var pt = "right";
var nt = "left";
var ji = "auto";
var ni = [st, ut, pt, nt];
var Ae = "start";
var Ge = "end";
var xc = "clippingParents";
var cr = "viewport";
var Be = "popper";
var Oc = "reference";
var Wo = ni.reduce(function(s, t) {
  return s.concat([t + "-" + Ae, t + "-" + Ge]);
}, []);
var hr = [].concat(ni, [ji]).reduce(function(s, t) {
  return s.concat([t, t + "-" + Ae, t + "-" + Ge]);
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
var ur = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: xd,
  effect: Od,
  requires: ["computeStyles"]
};
var ve = Math.max;
var un = Math.min;
var qe = Math.round;
var $d = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Wc(typeof t != "number" ? t : Fc(t, ni));
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
var fr = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: Pd,
  data: {}
};
var ns = {
  passive: true
};
var mr = {
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
var Tr = {
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
var le = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var lu = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var Ur = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
var Xr = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var uu = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var Gr = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
var pu = gn();
var _u = [mr, Tr, fr, ur];
var fu = gn({
  defaultModifiers: _u
});
var mu = [mr, Tr, fr, ur, Xc, zc, Gc, Yc, Uc];
var se = gn({
  defaultModifiers: mu
});
var qc = Object.freeze(Object.defineProperty({
  __proto__: null,
  afterMain: Nc,
  afterRead: Dc,
  afterWrite: Pc,
  applyStyles: ur,
  arrow: Yc,
  auto: ji,
  basePlacements: ni,
  beforeMain: $c,
  beforeRead: Sc,
  beforeWrite: Mc,
  bottom: ut,
  clippingParents: xc,
  computeStyles: fr,
  createPopper: se,
  createPopperBase: pu,
  createPopperLite: fu,
  detectOverflow: Je,
  end: Ge,
  eventListeners: mr,
  flip: zc,
  hide: Uc,
  left: nt,
  main: Lc,
  modifierPhases: dn,
  offset: Xc,
  placements: hr,
  popper: Be,
  popperGenerator: gn,
  popperOffsets: Tr,
  preventOverflow: Gc,
  read: Ic,
  reference: Oc,
  right: pt,
  start: Ae,
  top: st,
  variationPlacements: Wo,
  viewport: cr,
  write: Rc
}, Symbol.toStringTag, { value: "Module" }));
var h = {
  setDataAttribute(s, t, e) {
    s.setAttribute(`data-te-${Nn(t)}`, e);
  },
  removeDataAttribute(s, t) {
    s.removeAttribute(`data-te-${Nn(t)}`);
  },
  getDataAttributes(s) {
    if (!s)
      return {};
    const t = {};
    return Object.keys(s.dataset).filter((e) => e.startsWith("te")).forEach((e) => {
      if (e.startsWith("teClass"))
        return;
      let i = e.replace(/^te/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Ln(s.dataset[e]);
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
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Ln(t[e]);
    }), t;
  },
  getDataAttribute(s, t) {
    return Ln(s.getAttribute(`data-te-${Nn(t)}`));
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
    s && Mn(t).forEach((e) => {
      s.classList.contains(e) ? s.classList.remove(e) : s.classList.add(e);
    });
  },
  addClass(s, t) {
    Mn(t).forEach((e) => !s.classList.contains(e) && s.classList.add(e));
  },
  addStyle(s, t) {
    Object.keys(t).forEach((e) => {
      s.style[e] = t[e];
    });
  },
  removeClass(s, t) {
    Mn(t).forEach((e) => s.classList.contains(e) && s.classList.remove(e));
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
var gu = 3;
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
    for (;i && i.nodeType === Node.ELEMENT_NODE && i.nodeType !== gu; )
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
    return this.find(t, s).filter((e) => !be(e) && Mt(e));
  }
};
var bu = "te.dropdown";
var xe = `.${bu}`;
var Er = ".data-api";
var Fs = "Escape";
var jo = "ArrowUp";
var Ys = "ArrowDown";
var Tu = new RegExp(`${jo}|${Ys}|${Fs}`);
var Eu = `hide${xe}`;
var Cu = `hidden${xe}`;
var Au = `show${xe}`;
var yu = `shown${xe}`;
var wu = `click${xe}${Er}`;
var Jr = `keydown${xe}${Er}`;
var ku = `keyup${xe}${Er}`;
var Lu = W() ? "top-end" : "top-start";
var Nu = W() ? "top-start" : "top-end";
var Mu = W() ? "bottom-end" : "bottom-start";
var Ru = W() ? "bottom-start" : "bottom-end";
var Pu = W() ? "left-start" : "right-start";
var Bu = W() ? "right-start" : "left-start";
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
var We = "data-te-collapse-item";
var sa = `:scope [${We}] [${We}]`;
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

class Qt extends ft {
  constructor(t, e, i) {
    super(t), this._isTransitioning = false, this._config = this._getConfig(e), this._classes = this._getClasses(i), this._triggerArray = [];
    const n = d.find(na);
    for (let o = 0, r = n.length;o < r; o++) {
      const a = n[o], l = lr(a), p = d.find(l).filter((u) => u === this._element);
      l !== null && p.length && (this._selector = l, this._triggerArray.push(a));
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
    let t = [], e;
    if (this._config.parent) {
      const u = d.find(sa, this._config.parent);
      t = d.find(Zu, this._config.parent).filter((_) => !u.includes(_));
    }
    const i = d.findOne(this._selector);
    if (t.length) {
      const u = t.find((_) => i !== _);
      if (e = u ? Qt.getInstance(u) : null, e && e._isTransitioning)
        return;
    }
    if (c.trigger(this._element, ju).defaultPrevented)
      return;
    t.forEach((u) => {
      i !== u && Qt.getOrCreateInstance(u, { toggle: false }).hide(), e || A.setData(u, Zc, null);
    });
    const o = this._getDimension(), r = o === "height" ? this._classes.collapsing : this._classes.collapsingHorizontal;
    h.removeClass(this._element, this._classes.visible), h.removeClass(this._element, this._classes.hidden), h.addClass(this._element, r), this._element.removeAttribute(We), this._element.setAttribute(rs, ""), this._element.style[o] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
    const a = () => {
      this._isTransitioning = false, h.removeClass(this._element, this._classes.hidden), h.removeClass(this._element, r), h.addClass(this._element, this._classes.visible), this._element.removeAttribute(rs), this._element.setAttribute(We, ""), this._element.setAttribute(Hn, ""), this._element.style[o] = "", c.trigger(this._element, Ku);
    }, p = `scroll${o[0].toUpperCase() + o.slice(1)}`;
    this._queueCallback(a, this._element, true), this._element.style[o] = `${this._element[p]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || c.trigger(this._element, zu).defaultPrevented)
      return;
    const e = this._getDimension(), i = e === "height" ? this._classes.collapsing : this._classes.collapsingHorizontal;
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, si(this._element), h.addClass(this._element, i), h.removeClass(this._element, this._classes.visible), h.removeClass(this._element, this._classes.hidden), this._element.setAttribute(rs, ""), this._element.removeAttribute(We), this._element.removeAttribute(Hn);
    const n = this._triggerArray.length;
    for (let r = 0;r < n; r++) {
      const a = this._triggerArray[r], l = te(a);
      l && !this._isShown(l) && this._addAriaAndCollapsedClass([a], false);
    }
    this._isTransitioning = true;
    const o = () => {
      this._isTransitioning = false, h.removeClass(this._element, i), h.addClass(this._element, this._classes.visible), h.addClass(this._element, this._classes.hidden), this._element.removeAttribute(rs), this._element.setAttribute(We, ""), c.trigger(this._element, Uu);
    };
    this._element.style[e] = "", this._queueCallback(o, this._element, true);
  }
  _isShown(t = this._element) {
    return t.hasAttribute(Hn);
  }
  _getConfig(t) {
    return t = {
      ...ea,
      ...h.getDataAttributes(this._element),
      ...t
    }, t.toggle = !!t.toggle, t.parent = ee(t.parent), I(Bn, t, Yu), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...Qu,
      ...e,
      ...t
    }, I(Bn, t, Ju), t;
  }
  _getDimension() {
    return this._element.hasAttribute(Xu) ? Gu : qu;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = d.find(sa, this._config.parent);
    d.find(na, this._config.parent).filter((e) => !t.includes(e)).forEach((e) => {
      const i = te(e);
      i && this._addAriaAndCollapsedClass([e], this._isShown(i));
    });
  }
  _addAriaAndCollapsedClass(t, e) {
    t.length && t.forEach((i) => {
      e ? i.removeAttribute(ia) : i.setAttribute(`${ia}`, ""), i.setAttribute("aria-expanded", e);
    });
  }
  static jQueryInterface(t) {
    return this.each(function() {
      const e = {};
      typeof t == "string" && /show|hide/.test(t) && (e.toggle = false);
      const i = Qt.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t]();
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
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", (e) => e + t), this._setElementAttributes(oa, "paddingRight", (e) => e + t), this._setElementAttributes(ra, "marginRight", (e) => e - t);
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
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(oa, "paddingRight"), this._resetElementAttributes(ra, "marginRight");
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
    Xe(t) ? e(t) : d.find(t, this._element).forEach(e);
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

class Cr {
  constructor(t) {
    this._config = this._getConfig(t), this._isAppended = false, this._element = null;
  }
  show(t) {
    if (!this._config.isVisible) {
      ge(t);
      return;
    }
    this._append(), this._config.isAnimated && si(this._getElement());
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
      ge(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      ge(t);
      return;
    }
    this._element.removeAttribute("data-te-backdrop-show"), this._getElement().classList.add("opacity-0"), this._getElement().classList.remove("opacity-50"), this._emulateAnimation(() => {
      this.dispose(), ge(t);
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
      ...tp,
      ...typeof t == "object" ? t : {}
    }, t.rootElement = ee(t.rootElement), I(Qc, t, ep), t;
  }
  _append() {
    this._isAppended || (this._config.rootElement.append(this._getElement()), c.on(this._getElement(), aa, () => {
      ge(this._config.clickCallback);
    }), this._isAppended = true);
  }
  dispose() {
    this._isAppended && (c.off(this._element, aa), this._element.remove(), this._isAppended = false);
  }
  _emulateAnimation(t) {
    bc(t, this._getElement(), this._config.isAnimated);
  }
}

class zi {
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
      if (!Mt(e))
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
var mt = `.${vp}`;
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
var ce = "next";
var he = "prev";
var fe = "left";
var Ei = "right";
var xp = {
  [Tp]: Ei,
  [Ep]: fe
};
var Op = `slide${mt}`;
var Fn = `slid${mt}`;
var Sp = `keydown${mt}`;
var Ip = `mouseenter${mt}`;
var Dp = `mouseleave${mt}`;
var $p = `touchstart${mt}`;
var Lp = `touchmove${mt}`;
var Np = `touchend${mt}`;
var Mp = `pointerdown${mt}`;
var Rp = `pointerup${mt}`;
var Pp = `dragstart${mt}`;
var Bp = `load${mt}${th}`;
var Hp = `click${mt}${th}`;
var _a = "data-te-carousel-init";
var de = "data-te-carousel-active";
var Vp = "data-te-carousel-item-end";
var Yn = "data-te-carousel-item-start";
var Wp = "data-te-carousel-item-next";
var Fp = "data-te-carousel-item-prev";
var Yp = "data-te-carousel-pointer-event";
var jp = "[data-te-carousel-init]";
var eh = "[data-te-carousel-active]";
var Ar = "[data-te-carousel-item]";
var Se = `${eh}${Ar}`;
var Kp = `${Ar} img`;
var zp = "[data-te-carousel-item-next], [data-te-carousel-item-prev]";
var Up = "[data-te-carousel-indicators]";
var Xp = "[data-te-target]";
var Gp = "[data-te-slide], [data-te-slide-to]";
var qp = "touch";
var Zp = "pen";

class Xt extends ft {
  constructor(t, e, i) {
    super(t), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = false, this._isSliding = false, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._classes = this._getClasses(i), this._indicatorsElement = d.findOne(Up, this._element), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = !!window.PointerEvent, this._setActiveElementClass(), this._addEventListeners(), this._didInit = false, this._init(), this._config.ride === "carousel" && this.cycle();
  }
  static get Default() {
    return pa;
  }
  static get NAME() {
    return Wn;
  }
  next() {
    this._slide(ce);
  }
  nextWhenVisible() {
    !document.hidden && Mt(this._element) && this.next();
  }
  prev() {
    this._slide(he);
  }
  pause(t) {
    t || (this._isPaused = true), d.findOne(zp, this._element) && (_c(this._element), this.cycle(true)), clearInterval(this._interval), this._interval = null;
  }
  cycle(t) {
    t || (this._isPaused = false), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
  }
  to(t) {
    this._activeElement = d.findOne(Se, this._element);
    const e = this._getItemIndex(this._activeElement);
    if (t > this._items.length - 1 || t < 0)
      return;
    if (this._isSliding) {
      c.one(this._element, Fn, () => this.to(t));
      return;
    }
    if (e === t) {
      this.pause(), this.cycle();
      return;
    }
    const i = t > e ? ce : he;
    this._slide(i, this._items[t]);
  }
  _init() {
    this._didInit || (c.on(document, Hp, Gp, Xt.dataApiClickHandler), c.on(window, Bp, () => {
      const t = d.find(jp);
      for (let e = 0, i = t.length;e < i; e++)
        Xt.carouselInterface(t[e], Xt.getInstance(t[e]));
    }), this._didInit = true);
  }
  _getConfig(t) {
    return t = {
      ...pa,
      ...h.getDataAttributes(this._element),
      ...typeof t == "object" ? t : {}
    }, I(Wn, t, yp), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...wp,
      ...e,
      ...t
    }, I(Wn, t, kp), t;
  }
  _enableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        c.one(this._element, Fn, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  _applyInitialClasses() {
    const t = d.findOne(Se, this._element);
    t.classList.add(this._classes.block, ...this._classes.visible.split(" ")), this._setActiveIndicatorElement(t);
  }
  _handleSwipe() {
    const t = Math.abs(this.touchDeltaX);
    if (t <= Ap)
      return;
    const e = t / this.touchDeltaX;
    this.touchDeltaX = 0, e && this._slide(e > 0 ? Ei : fe);
  }
  _setActiveElementClass() {
    this._activeElement = d.findOne(Se, this._element), h.addClass(this._activeElement, "hidden");
  }
  _addEventListeners() {
    this._config.keyboard && c.on(this._element, Sp, (t) => this._keydown(t)), this._config.pause === "hover" && (c.on(this._element, Ip, (t) => this.pause(t)), c.on(this._element, Dp, (t) => this._enableCycle(t))), this._config.touch && this._touchSupported && this._addTouchEventListeners(), this._applyInitialClasses();
  }
  _addTouchEventListeners() {
    const t = (o) => this._pointerEvent && (o.pointerType === Zp || o.pointerType === qp), e = (o) => {
      t(o) ? this.touchStartX = o.clientX : this._pointerEvent || (this.touchStartX = o.touches[0].clientX);
    }, i = (o) => {
      this.touchDeltaX = o.touches && o.touches.length > 1 ? 0 : o.touches[0].clientX - this.touchStartX;
    }, n = (o) => {
      t(o) && (this.touchDeltaX = o.clientX - this.touchStartX), this._handleSwipe(), this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((r) => this._enableCycle(r), Cp + this._config.interval));
    };
    d.find(Kp, this._element).forEach((o) => {
      c.on(o, Pp, (r) => r.preventDefault());
    }), this._pointerEvent ? (c.on(this._element, Mp, (o) => e(o)), c.on(this._element, Rp, (o) => n(o)), this._element.classList.add(this._classes.pointer), this._element.setAttribute(`${Yp}`, "")) : (c.on(this._element, $p, (o) => e(o)), c.on(this._element, Lp, (o) => i(o)), c.on(this._element, Np, (o) => n(o)));
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = xp[t.key];
    e && (t.preventDefault(), this._slide(e));
  }
  _getItemIndex(t) {
    return this._items = t && t.parentNode ? d.find(Ar, t.parentNode) : [], this._items.indexOf(t);
  }
  _getItemByOrder(t, e) {
    const i = t === ce;
    return vc(this._items, e, i, this._config.wrap);
  }
  _triggerSlideEvent(t, e) {
    const i = this._getItemIndex(t), n = this._getItemIndex(d.findOne(Se, this._element));
    return c.trigger(this._element, Op, {
      relatedTarget: t,
      direction: e,
      from: n,
      to: i
    });
  }
  _setActiveIndicatorElement(t) {
    if (this._indicatorsElement) {
      const e = d.findOne(eh, this._indicatorsElement);
      e.removeAttribute(de), e.removeAttribute("aria-current"), e.classList.remove("!opacity-100");
      const i = d.find(Xp, this._indicatorsElement);
      for (let n = 0;n < i.length; n++)
        if (Number.parseInt(i[n].getAttribute("data-te-slide-to"), 10) === this._getItemIndex(t)) {
          i[n].setAttribute(`${de}`, ""), i[n].setAttribute("aria-current", "true"), i[n].classList.add("!opacity-100");
          break;
        }
    }
  }
  _updateInterval() {
    const t = this._activeElement || d.findOne(Se, this._element);
    if (!t)
      return;
    const e = Number.parseInt(t.getAttribute("data-te-interval"), 10);
    e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval;
  }
  _slide(t, e) {
    const i = this._directionToOrder(t), n = d.findOne(Se, this._element), o = this._getItemIndex(n), r = e || this._getItemByOrder(i, n), a = this._getItemIndex(r), l = !!this._interval, p = i === ce, u = p ? Yn : Vp, _ = p ? Wp : Fp, f = this._orderToDirection(i), g = u === Yn ? this._classes.slideLeft : this._classes.slideRight, m = u !== Yn ? this._classes.slideLeft : this._classes.slideRight;
    if (r && r.hasAttribute(de)) {
      this._isSliding = false;
      return;
    }
    if (this._isSliding || this._triggerSlideEvent(r, f).defaultPrevented || !n || !r)
      return;
    this._isSliding = true, l && this.pause(), this._setActiveIndicatorElement(r), this._activeElement = r;
    const v = () => {
      c.trigger(this._element, Fn, {
        relatedTarget: r,
        direction: f,
        from: o,
        to: a
      });
    };
    if (this._element.hasAttribute(_a)) {
      r.setAttribute(`${_}`, ""), r.classList.add(this._classes.block, m), si(r), n.setAttribute(`${u}`, ""), n.classList.add(g, ...this._classes.invisible.split(" ")), n.classList.remove(...this._classes.visible.split(" ")), r.setAttribute(`${u}`, ""), r.classList.add(...this._classes.visible.split(" ")), r.classList.remove(this._classes.slideRight, this._classes.slideLeft);
      const T = () => {
        r.removeAttribute(u), r.removeAttribute(_), r.setAttribute(`${de}`, ""), n.removeAttribute(de), n.classList.remove(g, ...this._classes.invisible.split(" "), this._classes.block), n.removeAttribute(_), n.removeAttribute(u), this._isSliding = false, setTimeout(v, 0);
      };
      this._queueCallback(T, n, true);
    } else
      n.removeAttribute(de), n.classList.remove(this._classes.block), r.setAttribute(`${de}`, ""), r.classList.add(this._classes.block), this._isSliding = false, v();
    l && this.cycle();
  }
  _directionToOrder(t) {
    return [Ei, fe].includes(t) ? W() ? t === fe ? he : ce : t === fe ? ce : he : t;
  }
  _orderToDirection(t) {
    return [ce, he].includes(t) ? W() ? t === he ? fe : Ei : t === he ? Ei : fe : t;
  }
  static carouselInterface(t, e) {
    const i = Xt.getOrCreateInstance(t, e);
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
      Xt.carouselInterface(this, t);
    });
  }
  static dataApiClickHandler(t) {
    const e = te(this);
    if (!e || !e.hasAttribute(_a))
      return;
    const i = {
      ...h.getDataAttributes(e),
      ...h.getDataAttributes(this)
    }, n = this.getAttribute("data-te-slide-to");
    n && (i.interval = false), Xt.carouselInterface(e, i), n && Xt.getInstance(e).to(n), t.preventDefault();
  }
}
var Qp = "te.modal";
var yt = `.${Qp}`;
var i_ = `hide${yt}`;
var s_ = `hidePrevented${yt}`;
var n_ = `hidden${yt}`;
var o_ = `show${yt}`;
var r_ = `shown${yt}`;
var ga = `resize${yt}`;
var ba = `click.dismiss${yt}`;
var va = `keydown.dismiss${yt}`;
var a_ = `mouseup.dismiss${yt}`;
var Ta = `mousedown.dismiss${yt}`;
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
var p_ = (s, t) => {
  const e = s.nodeName.toLowerCase();
  if (t.includes(e))
    return c_.has(e) ? !!(d_.test(s.nodeValue) || u_.test(s.nodeValue)) : true;
  const i = t.filter((n) => n instanceof RegExp);
  for (let n = 0, o = i.length;n < o; n++)
    if (i[n].test(e))
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
var kt = `.${f_}`;
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
  RIGHT: W() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: W() ? "right" : "left"
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

class ri extends ft {
  constructor(t, e) {
    if (typeof qc > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t), this._isEnabled = true, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this._config = this._getConfig(e), this.tip = null, this._setListeners();
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
  toggle(t) {
    if (this._isEnabled)
      if (t) {
        const e = this._initializeOnDelegatedTarget(t);
        e._activeTrigger.click = !e._activeTrigger.click, e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
      } else {
        if (this.getTipElement().classList.contains(Kn)) {
          this._leave(null, this);
          return;
        }
        this._enter(null, this);
      }
  }
  dispose() {
    clearTimeout(this._timeout), c.off(this._element.closest(wa), ka, this._hideModalHandler), this.tip && this.tip.remove(), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this.isWithContent() && this._isEnabled))
      return;
    const t = c.trigger(this._element, this.constructor.Event.SHOW), e = fc(this._element), i = e === null ? this._element.ownerDocument.documentElement.contains(this._element) : e.contains(this._element);
    if (t.defaultPrevented || !i)
      return;
    this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(ya).innerHTML && (this._disposePopper(), this.tip.remove(), this.tip = null);
    const n = this.getTipElement(), o = et(this.constructor.NAME);
    n.setAttribute("id", o), this._element.setAttribute("aria-describedby", o), this._config.animation && setTimeout(() => {
      this.tip.classList.add("opacity-100"), this.tip.classList.remove("opacity-0");
    }, 100);
    const r = typeof this._config.placement == "function" ? this._config.placement.call(this, n, this._element) : this._config.placement, a = this._getAttachment(r);
    this._addAttachmentClass(a);
    const { container: l } = this._config;
    if (A.setData(n, this.constructor.DATA_KEY, this), this._element.ownerDocument.documentElement.contains(this.tip) || (l.append(n), c.trigger(this._element, this.constructor.Event.INSERTED)), this._popper ? this._popper.update() : this._popper = se(this._element, n, this._getPopperConfig(a)), n.getAttribute("id").includes("tooltip"))
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
    u && n.classList.add(...u.split(" ")), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((g) => {
      c.on(g, "mouseover", hn);
    });
    const _ = () => {
      const g = this._hoverState;
      this._hoverState = null, c.trigger(this._element, this.constructor.Event.SHOWN), g === zn && this._leave(null, this);
    }, f = this.tip.classList.contains("transition-opacity");
    this._queueCallback(_, this.tip, f);
  }
  hide() {
    if (!this._popper)
      return;
    const t = this.getTipElement(), e = () => {
      this._isWithActiveTrigger() || (this._hoverState !== _i && t.remove(), this._cleanTipClass(), this._element.removeAttribute("aria-describedby"), c.trigger(this._element, this.constructor.Event.HIDDEN), this._disposePopper());
    };
    if (c.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented)
      return;
    t.classList.add("opacity-0"), t.classList.remove("opacity-100"), "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((o) => c.off(o, "mouseover", hn)), this._activeTrigger[y_] = false, this._activeTrigger[Un] = false, this._activeTrigger[fi] = false;
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
    return this.setContent(e), e.classList.remove(C_, Kn), this.tip = e, this.tip;
  }
  setContent(t) {
    this._sanitizeAndSetContent(t, this.getTitle(), ya);
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
      if (Xe(e)) {
        e = ee(e), this._config.html ? e.parentNode !== t && (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent;
        return;
      }
      this._config.html ? (this._config.sanitize && (e = pn(e, this._config.allowList, this._config.sanitizeFn)), t.innerHTML = e) : t.textContent = e;
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
    return v_[t.toUpperCase()];
  }
  _setListeners() {
    this._config.trigger.split(" ").forEach((e) => {
      if (e === "click")
        c.on(this._element, this.constructor.Event.CLICK, this._config.selector, (i) => this.toggle(i));
      else if (e !== w_) {
        const i = e === fi ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN, n = e === fi ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        c.on(this._element, i, this._config.selector, (o) => this._enter(o)), c.on(this._element, n, this._config.selector, (o) => this._leave(o));
      }
    }), this._hideModalHandler = () => {
      this._element && this.hide();
    }, c.on(this._element.closest(wa), ka, this._hideModalHandler), this._config.selector ? this._config = {
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
    if (e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger[t.type === "focusin" ? Un : fi] = true), e.getTipElement().classList.contains(Kn) || e._hoverState === _i) {
      e._hoverState = _i;
      return;
    }
    if (clearTimeout(e._timeout), e._hoverState = _i, !e._config.delay || !e._config.delay.show) {
      e.show();
      return;
    }
    e._timeout = setTimeout(() => {
      e._hoverState === _i && e.show();
    }, e._config.delay.show);
  }
  _leave(t, e) {
    if (e = this._initializeOnDelegatedTarget(t, e), t && (e._activeTrigger[t.type === "focusout" ? Un : fi] = e._element.contains(t.relatedTarget)), !e._isWithActiveTrigger()) {
      if (clearTimeout(e._timeout), e._hoverState = zn, !e._config.delay || !e._config.delay.hide) {
        e.hide();
        return;
      }
      e._timeout = setTimeout(() => {
        e._hoverState === zn && e.hide();
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
      g_.has(i) && delete e[i];
    }), t = {
      ...this.constructor.Default,
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t.container = t.container === false ? document.body : ee(t.container), typeof t.delay == "number" && (t.delay = {
      show: t.delay,
      hide: t.delay
    }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), I(Aa, t, this.constructor.DefaultType), t.sanitize && (t.template = pn(t.template, t.allowList, t.sanitizeFn)), t;
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
    return m_;
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
      const e = ri.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
var x_ = "te.popover";
var xt = `.${x_}`;
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
  HIDE: `hide${xt}`,
  HIDDEN: `hidden${xt}`,
  SHOW: `show${xt}`,
  SHOWN: `shown${xt}`,
  INSERTED: `inserted${xt}`,
  CLICK: `click${xt}`,
  FOCUSIN: `focusin${xt}`,
  FOCUSOUT: `focusout${xt}`,
  MOUSEENTER: `mouseenter${xt}`,
  MOUSELEAVE: `mouseleave${xt}`
};
var N_ = "te.scrollspy";
var yr = `.${N_}`;
var B_ = `activate${yr}`;
var H_ = `scroll${yr}`;
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
var He = "data-te-tab-active";
var Ks = "data-te-nav-active";
var Ia = `[${He}]`;
var J_ = `[${Ks}]`;
var of = "te.toast";
var ne = `.${of}`;
var rf = `mouseover${ne}`;
var af = `mouseout${ne}`;
var lf = `focusin${ne}`;
var cf = `focusout${ne}`;
var hf = `hide${ne}`;
var df = `hidden${ne}`;
var uf = `show${ne}`;
var pf = `shown${ne}`;
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
      var C = {};
      return function(E) {
        if (C[E] === undefined) {
          var w = document.querySelector(E);
          if (window.HTMLIFrameElement && w instanceof window.HTMLIFrameElement)
            try {
              w = w.contentDocument.head;
            } catch {
              w = null;
            }
          C[E] = w;
        }
        return C[E];
      };
    }(), l = [];
    function p(C) {
      for (var E = -1, w = 0;w < l.length; w++)
        if (l[w].identifier === C) {
          E = w;
          break;
        }
      return E;
    }
    function u(C, E) {
      for (var w = {}, k = [], D = 0;D < C.length; D++) {
        var O = C[D], x = E.base ? O[0] + E.base : O[0], L = w[x] || 0, S = "".concat(x, " ").concat(L);
        w[x] = L + 1;
        var N = p(S), P = { css: O[1], media: O[2], sourceMap: O[3] };
        N !== -1 ? (l[N].references++, l[N].updater(P)) : l.push({ identifier: S, updater: y(P, E), references: 1 }), k.push(S);
      }
      return k;
    }
    function _(C) {
      var E = document.createElement("style"), w = C.attributes || {};
      if (w.nonce === undefined) {
        var k = o.nc;
        k && (w.nonce = k);
      }
      if (Object.keys(w).forEach(function(O) {
        E.setAttribute(O, w[O]);
      }), typeof C.insert == "function")
        C.insert(E);
      else {
        var D = a(C.insert || "head");
        if (!D)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        D.appendChild(E);
      }
      return E;
    }
    var f, g = (f = [], function(C, E) {
      return f[C] = E, f.filter(Boolean).join(`
`);
    });
    function m(C, E, w, k) {
      var D = w ? "" : k.media ? "@media ".concat(k.media, " {").concat(k.css, "}") : k.css;
      if (C.styleSheet)
        C.styleSheet.cssText = g(E, D);
      else {
        var O = document.createTextNode(D), x = C.childNodes;
        x[E] && C.removeChild(x[E]), x.length ? C.insertBefore(O, x[E]) : C.appendChild(O);
      }
    }
    function b(C, E, w) {
      var { css: k, media: D, sourceMap: O } = w;
      if (D ? C.setAttribute("media", D) : C.removeAttribute("media"), O && typeof btoa < "u" && (k += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(O)))), " */")), C.styleSheet)
        C.styleSheet.cssText = k;
      else {
        for (;C.firstChild; )
          C.removeChild(C.firstChild);
        C.appendChild(document.createTextNode(k));
      }
    }
    var v = null, T = 0;
    function y(C, E) {
      var w, k, D;
      if (E.singleton) {
        var O = T++;
        w = v || (v = _(E)), k = m.bind(null, w, O, false), D = m.bind(null, w, O, true);
      } else
        w = _(E), k = b.bind(null, w, E), D = function() {
          (function(x) {
            if (x.parentNode === null)
              return false;
            x.parentNode.removeChild(x);
          })(w);
        };
      return k(C), function(x) {
        if (x) {
          if (x.css === C.css && x.media === C.media && x.sourceMap === C.sourceMap)
            return;
          k(C = x);
        } else
          D();
      };
    }
    i.exports = function(C, E) {
      (E = E || {}).singleton || typeof E.singleton == "boolean" || (E.singleton = (r === undefined && (r = !!(window && document && document.all && !window.atob)), r));
      var w = u(C = C || [], E);
      return function(k) {
        if (k = k || [], Object.prototype.toString.call(k) === "[object Array]") {
          for (var D = 0;D < w.length; D++) {
            var O = p(w[D]);
            l[O].references--;
          }
          for (var x = u(k, E), L = 0;L < w.length; L++) {
            var S = p(w[L]);
            l[S].references === 0 && (l[S].updater(), l.splice(S, 1));
          }
          w = x;
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
      l.inputType !== "insertReplacementText" && "data" in l ? a(l.target) : r(l.target);
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
var Yt = "data-te-input-state-active";
var Na = "data-te-input-focused";
var Ma = "data-te-input-form-counter";
var cs = `[${ch}] input`;
var hs = `[${ch}] textarea`;
var Ie = `[${hh}]`;
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

class V {
  constructor(t, e, i) {
    this._config = this._getConfig(e, t), this._element = t, this._classes = this._getClasses(i), this._label = null, this._labelWidth = 0, this._labelMarginLeft = 0, this._notchLeading = null, this._notchMiddle = null, this._notchTrailing = null, this._initiated = false, this._helper = null, this._counter = false, this._counterElement = null, this._maxLength = 0, this._leadingIcon = null, this._element && (A.setData(t, ls, this), this.init());
  }
  static get NAME() {
    return Jn;
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
    this.input.setAttribute(Yt, ""), d.findOne(Ie, this.input.parentNode).setAttribute(Yt, "");
  }
  forceInactive() {
    this.input.removeAttribute(Yt), d.findOne(Ie, this.input.parentNode).removeAttribute(Yt);
  }
  dispose() {
    this._removeBorder(), A.removeData(this._element, ls), this._element = null;
  }
  _getConfig(t, e) {
    return t = {
      ...Ef,
      ...h.getDataAttributes(e),
      ...typeof t == "object" ? t : {}
    }, I(Jn, t, Cf), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...ph,
      ...e,
      ...t
    }, I(Jn, t, Af), t;
  }
  _getLabelData() {
    this._label = d.findOne("label", this._element), this._label === null ? this._showPlaceholder() : (this._getLabelWidth(), this._getLabelPositionInInputGroup(), this._toggleDefaultDatePlaceholder());
  }
  _getHelper() {
    this._helper = d.findOne(Tf, this._element);
  }
  _getCounter() {
    this._counter = h.getDataAttribute(this.input, "inputShowcounter"), this._counter && (this._maxLength = this.input.maxLength, this._showCounter());
  }
  _getEvents() {
    c.on(this._element, "focus", "input", V.activate(new V)), c.on(this._element, "input", "input", V.activate(new V)), c.on(this._element, "blur", "input", V.deactivate(new V)), c.on(this._element, "focus", "textarea", V.activate(new V)), c.on(this._element, "input", "textarea", V.activate(new V)), c.on(this._element, "blur", "textarea", V.deactivate(new V)), c.on(window, "shown.te.modal", (t) => {
      d.find(cs, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.update();
      }), d.find(hs, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.update();
      });
    }), c.on(window, "shown.te.dropdown", (t) => {
      const e = t.target.parentNode.querySelector("[data-te-dropdown-menu-ref]");
      e && (d.find(cs, e).forEach((i) => {
        const n = V.getInstance(i.parentNode);
        n && n.update();
      }), d.find(hs, e).forEach((i) => {
        const n = V.getInstance(i.parentNode);
        n && n.update();
      }));
    }), c.on(window, "shown.te.tab", (t) => {
      let e;
      t.target.href ? e = t.target.href.split("#")[1] : e = h.getDataAttribute(t.target, "target").split("#")[1];
      const i = d.findOne(`#${e}`);
      d.find(cs, i).forEach((n) => {
        const o = V.getInstance(n.parentNode);
        o && o.update();
      }), d.find(hs, i).forEach((n) => {
        const o = V.getInstance(n.parentNode);
        o && o.update();
      });
    }), c.on(window, "reset", (t) => {
      d.find(cs, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.forceInactive();
      }), d.find(hs, t.target).forEach((e) => {
        const i = V.getInstance(e.parentNode);
        i && i.forceInactive();
      });
    }), c.on(window, "onautocomplete", (t) => {
      const e = V.getInstance(t.target.parentNode);
      !e || !t.cancelable || e.forceActive();
    });
  }
  _showCounter() {
    if (d.find(`[${Ma}]`, this._element).length > 0)
      return;
    this._counterElement = document.createElement("div"), h.addClass(this._counterElement, this._classes.counter), this._counterElement.setAttribute(Ma, "");
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
    this.input.setAttribute(vf, "");
  }
  _getNotchData() {
    this._notchMiddle = d.findOne(Pa, this._element), this._notchLeading = d.findOne(Ra, this._element);
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
    const t = this._config.inputFormWhite ? this._classes.notchLeadingWhite : this._classes.notchLeadingNormal, e = this._config.inputFormWhite ? this._classes.notchMiddleWhite : this._classes.notchMiddleNormal, i = this._config.inputFormWhite ? this._classes.notchTrailingWhite : this._classes.notchTrailingNormal, n = d.find(Ie, this._element), o = $("div");
    h.addClass(o, this._classes.notch), o.setAttribute(hh, ""), this._notchLeading = $("div"), h.addClass(this._notchLeading, `${this._classes.notchLeading} ${t}`), this._notchLeading.setAttribute(dh, ""), this._notchMiddle = $("div"), h.addClass(this._notchMiddle, `${this._classes.notchMiddle} ${e}`), this._notchMiddle.setAttribute(uh, ""), this._notchTrailing = $("div"), h.addClass(this._notchTrailing, `${this._classes.notchTrailing} ${i}`), this._notchTrailing.setAttribute(gf, ""), !(n.length >= 1) && (o.append(this._notchLeading), o.append(this._notchMiddle), o.append(this._notchTrailing), this._element.append(o));
  }
  _applyNotch() {
    this._notchMiddle.style.width = `${this._labelWidth}px`, this._notchLeading.style.width = `${this._labelMarginLeft + 9}px`, this._label !== null && (this._label.style.marginLeft = `${this._labelMarginLeft}px`);
  }
  _removeBorder() {
    const t = d.findOne(Ie, this._element);
    t && t.remove();
  }
  _activate(t) {
    gc(() => {
      this._getElements(t);
      const e = t ? t.target : this.input, i = d.findOne(Ie, this._element);
      t && t.type === "focus" && i && i.setAttribute(Na, ""), e.value !== "" && (e.setAttribute(Yt, ""), i && i.setAttribute(Yt, "")), this._toggleDefaultDatePlaceholder(e);
    });
  }
  _getElements(t) {
    if (t && (this._element = t.target.parentNode, this._label = d.findOne("label", this._element)), t && this._label) {
      const e = this._labelWidth;
      this._getLabelData(), e !== this._labelWidth && (this._notchMiddle = d.findOne(Pa, t.target.parentNode), this._notchLeading = d.findOne(Ra, t.target.parentNode), this._applyNotch());
    }
  }
  _deactivate(t) {
    const e = t ? t.target : this.input, i = d.findOne(Ie, e.parentNode);
    i.removeAttribute(Na), e.value === "" && (e.removeAttribute(Yt), i.removeAttribute(Yt)), this._toggleDefaultDatePlaceholder(e);
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
      let i = A.getData(this, ls);
      const n = typeof t == "object" && t;
      if (!(!i && /dispose/.test(t)) && (i || (i = new V(this, n)), typeof t == "string")) {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
  static getInstance(t) {
    return A.getData(t, ls);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var kf = {
  property: "color",
  defaultValue: null,
  inherit: true
};
var De = (s, t) => {
  const { property: e, defaultValue: i, inherit: n } = { ...kf, ...t }, o = document.createElement("div");
  o.classList.add(s), document.body.appendChild(o);
  const a = window.getComputedStyle(o)[e] || i, p = window.getComputedStyle(o.parentElement)[e];
  return document.body.removeChild(o), !n && p && a === p ? i : a || i;
};
var eo = "ripple";
var ds = "te.ripple";
var xf = "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%";
var Of = ["[data-te-ripple-init]"];
var us = [0, 0, 0];
var Sf = [
  {
    name: "primary",
    gradientColor: De("text-primary", { defaultValue: "#3B71CA", inherit: false })
  },
  {
    name: "secondary",
    gradientColor: De("text-secondary", { defaultValue: "#9FA6B2", inherit: false })
  },
  {
    name: "success",
    gradientColor: De("text-success", { defaultValue: "#14A44D", inherit: false })
  },
  {
    name: "danger",
    gradientColor: De("text-danger", { defaultValue: "#DC4C64", inherit: false })
  },
  {
    name: "warning",
    gradientColor: De("text-warning", { defaultValue: "#E4A11B", inherit: false })
  },
  {
    name: "info",
    gradientColor: De("text-info", { defaultValue: "#54B4D3", inherit: false })
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
  constructor(t, e, i) {
    this._element = t, this._options = this._getConfig(e), this._classes = this._getClasses(i), this._element && (A.setData(t, ds, this), h.addClass(this._element, this._classes.ripple)), this._clickHandler = this._createRipple.bind(this), this._rippleTimer = null, this._isMinWidthSet = false, this._initialClasses = null, this.init();
  }
  static get NAME() {
    return eo;
  }
  init() {
    this._addClickEvent(this._element);
  }
  dispose() {
    A.removeData(this._element, ds), c.off(this._element, "click", this._clickHandler), this._element = null, this._options = null;
  }
  _autoInit(t) {
    Of.forEach((e) => {
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
      delay: l * Ha,
      duration: l - l * Ha
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
      ...If,
      ...e,
      ...t
    }, I(eo, t, Df), t;
  }
  _getClasses(t = {}) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...$f,
      ...e,
      ...t
    }, I(eo, t, Lf), t;
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
    const i = Sf.find((r) => r.name === e.toLowerCase()), n = i ? this._colorToRGB(i.gradientColor).join(",") : this._colorToRGB(e).join(","), o = xf.split("{{color}}").join(`${n}`);
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
      return r.style.color = a, r.style.color !== a || (r.style.color = o, r.style.color === a || r.style.color === "") ? us : (o = getComputedStyle(r).color, document.body.removeChild(r), o);
    }
    function n(o) {
      return o = o.match(/[.\d]+/g).map((r) => +Number(r)), o.length = 3, o;
    }
    return t.toLowerCase() === "transparent" ? us : t[0] === "#" ? e(t) : (t.indexOf("rgb") === -1 && (t = i(t)), t.indexOf("rgb") === 0 ? n(t) : us);
  }
  static autoInitial(t) {
    return function(e) {
      t._autoInit(e);
    };
  }
  static jQueryInterface(t) {
    return this.each(function() {
      return A.getData(this, ds) ? null : new ei(this, t);
    });
  }
  static getInstance(t) {
    return A.getData(t, ds);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
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
var Ke = 37;
var U = 38;
var ze = 39;
var z = 40;
var Te = 36;
var Ee = 35;
var io = 33;
var so = 34;
var it = 13;
var Zs = 32;
var we = 27;
var ke = 9;
var Tt = 24;
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
  constructor(t, e, i) {
    this._element = t, this._input = d.findOne("input", this._element), this._options = this._getConfig(e), this._classes = this._getClasses(i), this._activeDate = new Date, this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this._headerDate = null, this._headerYear = null, this._headerMonth = null, this._view = this._options.view, this._popper = null, this._focusTrap = null, this._isOpen = false, this._toggleButtonId = et("datepicker-toggle-"), this._animations = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && this._options.animations, this._scrollBar = new ti, this._element && A.setData(t, Qs, this), this._init(), this.toggleButton && this._options.disableToggle && (this.toggleButton.disabled = "true"), this._options.disableInput && (this._input.disabled = "true");
  }
  static get NAME() {
    return no;
  }
  get container() {
    return d.findOne(`[${fh}='${this._toggleButtonId}']`) || d.findOne(`[${mh}='${this._toggleButtonId}']`);
  }
  get options() {
    return this._options;
  }
  get activeCell() {
    let t;
    return this._view === "days" && (t = this._getActiveDayCell()), this._view === "months" && (t = this._getActiveMonthCell()), this._view === "years" && (t = this._getActiveYearCell()), t;
  }
  get activeDay() {
    return tt(this._activeDate);
  }
  get activeMonth() {
    return Y(this._activeDate);
  }
  get activeYear() {
    return B(this._activeDate);
  }
  get firstYearInView() {
    return this.activeYear - Us(this._activeDate, Tt);
  }
  get lastYearInView() {
    return this.firstYearInView + Tt - 1;
  }
  get viewChangeButton() {
    return d.findOne(pm, this.container);
  }
  get previousButton() {
    return d.findOne(_m, this.container);
  }
  get nextButton() {
    return d.findOne(fm, this.container);
  }
  get okButton() {
    return d.findOne(mm, this.container);
  }
  get cancelButton() {
    return d.findOne(gm, this.container);
  }
  get clearButton() {
    return d.findOne(bm, this.container);
  }
  get datesContainer() {
    return d.findOne(vm, this.container);
  }
  get toggleButton() {
    return d.findOne(Tm, this._element);
  }
  update(t = {}) {
    this._options = this._getConfig({ ...this._options, ...t });
  }
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    if (t = {
      ...eg,
      ...e,
      ...t
    }, I(no, t, ig), t.max && typeof t.max == "string" && (t.max = new Date(t.max)), t.min && typeof t.min == "string" && (t.min = new Date(t.min)), t.startDay && t.startDay !== 0) {
      const i = this._getNewDaysOrderArray(t);
      t.weekdaysNarrow = i;
    }
    return t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...sg,
      ...e,
      ...t
    }, I(no, t, ng), t;
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
    const t = nm(this._toggleButtonId, this._classes.datepickerToggleButton);
    this._element.insertAdjacentHTML("beforeend", t);
  }
  open() {
    if (this._input.readOnly || this._input.disabled)
      return;
    const t = c.trigger(this._element, cm);
    if (this._isOpen || t.defaultPrevented)
      return;
    this._setInitialDate();
    const e = Qf(this._classes.datepickerBackdrop), i = Zf(this._activeDate, this._selectedDate, this._selectedYear, this._selectedMonth, this._options, _s, Tt, ps, this._toggleButtonId, this._classes);
    this._options.inline ? this._openDropdown(i) : (this._openModal(e, i), this._scrollBar.hide()), this._animations && (h.addClass(this.container, this._classes.fadeIn), h.addClass(e, this._classes.fadeInShort)), this._setFocusTrap(this.container), this._listenToDateSelection(), this._addControlsListeners(), this._updateControlsDisabledState(), this._listenToEscapeClick(), this._listenToKeyboardNavigation(), this._listenToDatesContainerFocus(), this._listenToDatesContainerBlur(), this._asyncFocusDatesContainer(), this._updateViewControlsAndAttributes(this._view), this._isOpen = true, setTimeout(() => {
      this._listenToOutsideClick();
    }, 0);
  }
  _openDropdown(t) {
    this._popper = se(this._input, t, {
      placement: "bottom-start"
    }), this._getContainer().appendChild(t);
  }
  _openModal(t, e) {
    const i = this._getContainer();
    i.appendChild(t), i.appendChild(e);
  }
  _setFocusTrap(t) {
    this._focusTrap = new zi(t, {
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
    c.on(this._element, fs, ms, (t) => {
      t.preventDefault(), this.open();
    });
  }
  _listenToToggleKeydown() {
    c.on(this._element, "keydown", ms, (t) => {
      t.keyCode === it && !this._isOpen && this.open();
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
    const n = d.findOne(Em, this.container), o = Y(t), r = tt(t), a = zs(t);
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
    c.on(document, fs, (t) => {
      const e = t.target === this.container, i = this.container && this.container.contains(t.target);
      !e && !i && this.close();
    });
  }
  _listenToEscapeClick() {
    c.on(document, "keydown", (t) => {
      t.keyCode === we && this._isOpen && this.close();
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
      case Ke:
        this._activeDate = $e(this._activeDate, W() ? 1 : -1);
        break;
      case ze:
        this._activeDate = $e(this._activeDate, W() ? -1 : 1);
        break;
      case U:
        this._activeDate = $e(this._activeDate, -7);
        break;
      case z:
        this._activeDate = $e(this._activeDate, 7);
        break;
      case Te:
        this._activeDate = $e(this._activeDate, 1 - tt(this._activeDate));
        break;
      case Ee:
        this._activeDate = $e(this._activeDate, Go(this._activeDate) - tt(this._activeDate));
        break;
      case io:
        this._activeDate = lt(this._activeDate, -1);
        break;
      case so:
        this._activeDate = lt(this._activeDate, 1);
        break;
      case it:
      case Zs:
        this._selectDate(this._activeDate), this._handleDateSelection(t), t.preventDefault();
        return;
      default:
        return;
    }
    Pi(e, this._activeDate, this._view, Tt, this._options.min, this._options.max) || this._changeView("days"), this._removeHighlightFromCell(i), this._focusActiveCell(this.activeCell), t.preventDefault();
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
      const n = Va(i.dataset.teDate);
      return me(n, this._activeDate);
    });
  }
  _handleMonthsViewKeydown(t) {
    const e = this._activeDate, i = this.activeCell;
    switch (t.keyCode) {
      case Ke:
        this._activeDate = lt(this._activeDate, W() ? 1 : -1);
        break;
      case ze:
        this._activeDate = lt(this._activeDate, W() ? -1 : 1);
        break;
      case U:
        this._activeDate = lt(this._activeDate, -4);
        break;
      case z:
        this._activeDate = lt(this._activeDate, 4);
        break;
      case Te:
        this._activeDate = lt(this._activeDate, -this.activeMonth);
        break;
      case Ee:
        this._activeDate = lt(this._activeDate, 11 - this.activeMonth);
        break;
      case io:
        this._activeDate = at(this._activeDate, -1);
        break;
      case so:
        this._activeDate = at(this._activeDate, 1);
        break;
      case it:
      case Zs:
        this._selectMonth(this.activeMonth);
        return;
      default:
        return;
    }
    Pi(e, this._activeDate, this._view, Tt, this._options.min, this._options.max) || this._changeView("months"), this._removeHighlightFromCell(i), this._focusActiveCell(this.activeCell), t.preventDefault();
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
      case Ke:
        this._activeDate = at(this._activeDate, W() ? 1 : -1);
        break;
      case ze:
        this._activeDate = at(this._activeDate, W() ? -1 : 1);
        break;
      case U:
        this._activeDate = at(this._activeDate, -n);
        break;
      case z:
        this._activeDate = at(this._activeDate, n);
        break;
      case Te:
        this._activeDate = at(this._activeDate, -Us(this._activeDate, o));
        break;
      case Ee:
        this._activeDate = at(this._activeDate, o - Us(this._activeDate, o) - 1);
        break;
      case io:
        this._activeDate = at(this._activeDate, -o);
        break;
      case so:
        this._activeDate = at(this._activeDate, o);
        break;
      case it:
      case Zs:
        this._selectYear(this.activeYear);
        return;
      default:
        return;
    }
    Pi(e, this._activeDate, this._view, Tt, this._options.min, this._options.max) || this._changeView("years"), this._removeHighlightFromCell(i), this._focusActiveCell(this.activeCell), t.preventDefault();
  }
  _getActiveYearCell() {
    const t = d.find("td", this.datesContainer);
    return Array.from(t).find((i) => parseInt(i.dataset.teYear, 10) === this.activeYear);
  }
  _setInitialDate() {
    this._input.value ? this._handleUserInput(this._input.value) : this._options.startDate ? this._activeDate = new Date(this._options.startDate) : this._activeDate = new Date;
  }
  close() {
    const t = c.trigger(this._element, lm);
    !this._isOpen || t.defaultPrevented || (this._removeDatepickerListeners(), this._animations && h.addClass(this.container, this._classes.fadeOut), this._options.inline ? this._closeDropdown() : this._closeModal(), this._isOpen = false, this._view = this._options.view, this.toggleButton ? this.toggleButton.focus() : this._input.focus());
  }
  _closeDropdown() {
    const t = d.findOne(um), e = this._getContainer();
    window.matchMedia("(prefers-reduced-motion: reduce)").matches && (t && e.removeChild(t), this._popper && this._popper.destroy()), t.addEventListener("animationend", () => {
      t && e.removeChild(t), this._popper && this._popper.destroy();
    }), this._removeFocusTrap();
  }
  _closeModal() {
    const t = d.findOne(Cm), e = d.findOne(dm);
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
    c.off(this.nextButton, "click"), c.off(this.previousButton, "click"), c.off(this.viewChangeButton, "click"), c.off(this.okButton, "click"), c.off(this.cancelButton, "click"), c.off(this.clearButton, "click"), c.off(this.datesContainer, "click"), c.off(this.datesContainer, "keydown"), c.off(this.datesContainer, "focus"), c.off(this.datesContainer, "blur"), c.off(document, fs);
  }
  dispose() {
    this._isOpen && this.close(), this._removeInputAndToggleListeners();
    const t = d.findOne(`#${this._toggleButtonId}`);
    t && this._element.removeChild(t), A.removeData(this._element, Qs), this._element = null, this._input = null, this._options = null, this._activeDate = null, this._selectedDate = null, this._selectedYear = null, this._selectedMonth = null, this._headerDate = null, this._headerYear = null, this._headerMonth = null, this._view = null, this._popper = null, this._focusTrap = null;
  }
  _removeInputAndToggleListeners() {
    c.off(this._input, "input"), c.off(this._element, fs, ms), c.off(this._element, "keydown", ms);
  }
  handleOk() {
    this._confirmSelection(this._headerDate), this.close();
  }
  _selectDate(t, e = this.activeCell) {
    const { min: i, max: n, filter: o, disablePast: r, disableFuture: a } = this._options;
    _n(t, i, n, o, r, a) || (this._removeCurrentSelectionStyles(), this._removeCurrentFocusStyles(), this._addSelectedStyles(e), this._selectedDate = t, this._selectedYear = B(t), this._selectedMonth = Y(t), this._headerDate = t, (this._options.inline || this.options.confirmDateOnSelect) && (this._confirmSelection(t), this.close()));
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
      this._input.value = e, c.trigger(this._element, hm, { date: t }), c.trigger(this._input, "input");
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
    const e = tt(t), i = this._addLeadingZero(tt(t)), n = this._options.weekdaysShort[zs(t)], o = this._options.weekdaysFull[zs(t)], r = Y(t) + 1, a = this._addLeadingZero(Y(t) + 1), l = this._options.monthsShort[Y(t)], p = this._options.monthsFull[Y(t)], u = B(t).toString().length === 2 ? B(t) : B(t).toString().slice(2, 4), _ = B(t), f = this._options.format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
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
    const i = Va(t), { min: n, max: o, filter: r, disablePast: a, disableFuture: l } = this._options;
    _n(i, n, o, r, a, l) || (this._activeDate = i, this._selectDate(i, e));
  }
  _pickYear(t) {
    const { min: e, max: i, disablePast: n, disableFuture: o } = this._options;
    if (qo(t, e, i, n, o))
      return;
    const r = Ct(t, this.activeMonth, this.activeDay);
    this._activeDate = r, this._selectedDate = r, this._selectYear(t);
  }
  _pickMonth(t, e) {
    const { min: i, max: n, disablePast: o, disableFuture: r } = this._options;
    if (_h(t, e, i, n, o, r) || qo(e, i, n, o, r))
      return;
    const a = Ct(e, t, this.activeDay);
    this._activeDate = a, this._selectMonth(t);
  }
  nextMonth() {
    const t = lt(this._activeDate, 1), e = Xs(t, this._headerDate, this._options, this._classes);
    this._activeDate = t, this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  previousMonth() {
    const t = lt(this._activeDate, -1);
    this._activeDate = t;
    const e = Xs(t, this._headerDate, this._options, this._classes);
    this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  nextYear() {
    const t = at(this._activeDate, 1);
    this._activeDate = t, this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes);
    const e = Gs(this.activeYear, this._selectedYear, this._selectedMonth, this._options, _s, this._classes);
    this.datesContainer.innerHTML = e;
  }
  previousYear() {
    const t = at(this._activeDate, -1);
    this._activeDate = t, this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes);
    const e = Gs(this.activeYear, this._selectedYear, this._selectedMonth, this._options, _s, this._classes);
    this.datesContainer.innerHTML = e;
  }
  nextYears() {
    const t = at(this._activeDate, 24);
    this._activeDate = t;
    const e = qs(t, this._selectedYear, this._options, Tt, ps, this._classes);
    this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  previousYears() {
    const t = at(this._activeDate, -24);
    this._activeDate = t;
    const e = qs(t, this._selectedYear, this._options, Tt, ps, this._classes);
    this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.datesContainer.innerHTML = e;
  }
  _asyncChangeView(t) {
    setTimeout(() => {
      this._changeView(t);
    }, 0);
  }
  _changeView(t) {
    this._view = t, this.datesContainer.blur(), t === "days" && (this.datesContainer.innerHTML = Xs(this._activeDate, this._headerDate, this._options, this._classes)), t === "months" && (this.datesContainer.innerHTML = Gs(this.activeYear, this._selectedYear, this._selectedMonth, this._options, _s, this._classes)), t === "years" && (this.datesContainer.innerHTML = qs(this._activeDate, this._selectedYear, this._options, Tt, ps, this._classes)), this.datesContainer.focus(), this._updateViewControlsAndAttributes(t), this._updateControlsDisabledState();
  }
  _updateViewControlsAndAttributes(t) {
    t === "days" && (this.viewChangeButton.textContent = `${this._options.monthsFull[this.activeMonth]} ${this.activeYear}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToMultiYearViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevMonthLabel), this.nextButton.setAttribute("aria-label", this._options.nextMonthLabel)), t === "months" && (this.viewChangeButton.textContent = `${this.activeYear}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToDayViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevYearLabel), this.nextButton.setAttribute("aria-label", this._options.nextYearLabel)), t === "years" && (this.viewChangeButton.textContent = `${this.firstYearInView} - ${this.lastYearInView}`, this.viewChangeButton.innerHTML += Lt(this._options, this._classes), this.viewChangeButton.setAttribute("aria-label", this._options.switchToMonthViewLabel), this.previousButton.setAttribute("aria-label", this._options.prevMultiYearLabel), this.nextButton.setAttribute("aria-label", this._options.nextMultiYearLabel));
  }
  _updateControlsDisabledState() {
    Hf(this._options.disableFuture, this._activeDate, this._view, Tt, this._options.min, this._options.max, this.lastYearInView, this.firstYearInView) ? this.nextButton.disabled = true : this.nextButton.disabled = false, Vf(this._options.disablePast, this._activeDate, this._view, Tt, this._options.min, this._options.max, this.lastYearInView, this.firstYearInView) ? this.previousButton.disabled = true : this.previousButton.disabled = false;
  }
  _handleUserInput(t) {
    const e = this._getDelimeters(this._options.format), i = this._parseDate(t, this._options.format, e);
    Rf(i) ? (this._activeDate = i, this._selectedDate = i, this._selectedYear = B(i), this._selectedMonth = Y(i), this._headerDate = i) : (this._activeDate = new Date, this._selectedDate = null, this._selectedMonth = null, this._selectedYear = null, this._headerDate = null, this._headerMonth = null, this._headerYear = null);
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
    return Ct(_, f, g);
  }
  getMonthNumberByMonthName(t, e) {
    return e.findIndex((i) => i === t);
  }
  static getInstance(t) {
    return A.getData(t, Qs);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var rg = ({
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
var ag = (s, t, e) => {
  const { iconSVG: i } = s;
  return `
  <button id="${t}" tabindex="0" type="button" class="${e.timepickerToggleButton}" data-te-toggle="timepicker" data-te-timepicker-toggle-button data-te-timepicker-icon>
    ${i}
  </button>
`;
};
var Cn = "data-te-timepicker-disabled";
var gs = "data-te-timepicker-active";
var Ce = (s) => {
  if (s === "")
    return;
  let t, e, i, n;
  return gh(s) ? (t = s.getHours(), n = t, e = s.getMinutes(), t %= 12, n === 0 && t === 0 && (i = "AM"), t = t || 12, i === undefined && (i = Number(n) >= 12 ? "PM" : "AM"), e = e < 10 ? `0${e}` : e) : ([t, e, i] = R(s, false), n = t, t %= 12, n === 0 && t === 0 && (i = "AM"), t = t || 12, i === undefined && (i = Number(n) >= 12 ? "PM" : "AM")), {
    hours: t,
    minutes: e,
    amOrPm: i
  };
};
var gh = (s) => s && Object.prototype.toString.call(s) === "[object Date]" && !Number.isNaN(s);
var Ka = (s) => {
  if (s === "")
    return;
  let t, e;
  return gh(s) ? (t = s.getHours(), e = s.getMinutes()) : [t, e] = R(s, false), e = Number(e) < 10 ? `0${Number(e)}` : e, {
    hours: t,
    minutes: e
  };
};
var lg = (s, t, e) => c.on(document, s, t, ({ target: i }) => {
  if (i.hasAttribute(gs))
    return;
  document.querySelectorAll(t).forEach((o) => {
    o.hasAttribute(gs) && (h.removeClass(o, e.opacity), o.removeAttribute(gs));
  }), h.addClass(i, e.opacity), i.setAttribute(gs, "");
});
var za = ({ clientX: s, clientY: t, touches: e }, i, n = false) => {
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
var bs = () => navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var R = (s, t = true) => t ? s.value.replace(/:/gi, " ").split(" ") : s.replace(/:/gi, " ").split(" ");
var bh = (s, t) => {
  const [e, i, n] = R(s, false), [o, r, a] = R(t, false);
  return n === "PM" && a === "AM" || n === a && e > o || i > r;
};
var vh = () => {
  const s = new Date, t = s.getHours(), e = s.getMinutes();
  return `${t}:${e < 10 ? `0${e}` : e}`;
};
var Gt = (s, t, e) => {
  if (!t)
    return s;
  let i = vh();
  return e && (i = `${Ce(i).hours}:${Ce(i).minutes} ${Ce(i).amOrPm}`), (s !== "" && bh(i, s) || s === "") && (s = i), s;
};
var qt = (s, t, e) => {
  if (!t)
    return s;
  let i = vh();
  return e && (i = `${Ce(i).hours}:${Ce(i).minutes} ${Ce(i).amOrPm}`), (s !== "" && !bh(i, s) || s === "") && (s = i), s;
};
var cg = ({ format12: s, maxTime: t, minTime: e, disablePast: i, disableFuture: n }, o, r) => {
  const a = R(o)[1];
  e = Gt(e, i, s), t = qt(t, n, s);
  const [l, p, u] = R(t, false), [_, f, g] = R(e, false);
  if (u !== undefined || g !== undefined)
    return [r, a];
  if (!(l !== "" && _ === "" && Number(r) > Number(l)) && !(l === "" && _ !== "" && p === undefined && f !== "" && Number(r) < Number(_)))
    return [r, a];
};
var Ua = (s, t, e, i) => {
  s.forEach((n) => {
    t = t === "12" && i ? "0" : t, (n.textContent === "00" || Number(n.textContent === "12" && i ? "0" : n.textContent) > t) && (h.addClass(n, e.tipsDisabled), n.setAttribute(Cn, ""));
  });
};
var Xa = (s, t, e, i) => {
  s.forEach((n) => {
    t = t === "12" && i ? "0" : t, n.textContent !== "00" && Number(n.textContent === "12" && i ? "0" : n.textContent) < Number(t) && (h.addClass(n, e.tipsDisabled), n.setAttribute(Cn, ""));
  });
};
var Th = (s, t, e, i) => {
  if (t === "12" || t === "24")
    return;
  const n = e ? 12 : 24;
  return i === "max" ? (Number(s) === n ? 0 : Number(s)) > Number(t) : (Number(s) === n ? 0 : Number(s)) < Number(t);
};
var hg = (s, t, e, i, n, o) => {
  s.forEach((r) => {
    (Th(i, e, o, "max") || Number(r.textContent) > t && Number(i) === Number(e)) && (h.addClass(r, n.tipsDisabled), r.setAttribute(Cn, ""));
  });
};
var dg = (s, t, e, i, n, o) => {
  s.forEach((r) => {
    (Th(i, e, o, "min") || Number(r.textContent) < t && Number(i) === Number(e)) && (h.addClass(r, n.tipsDisabled), r.setAttribute(Cn, ""));
  });
};
var ug = (s) => s.startsWith("0") ? Number(s.slice(1)) : Number(s);
var Bi = "timepicker";
var M = `data-te-${Bi}`;
var Ga = "[data-te-toggle]";
var Js = `te.${Bi}`;
var Pt = `.${Js}`;
var Bt = ".data-api";
var qa = `click${Pt}${Bt}`;
var vs = `keydown${Pt}${Bt}`;
var Za = `mousedown${Pt}${Bt}`;
var Qa = `mouseup${Pt}${Bt}`;
var Ja = `mousemove${Pt}${Bt}`;
var tl = `mouseleave${Pt}${Bt}`;
var el = `mouseover${Pt}${Bt}`;
var il = `touchmove${Pt}${Bt}`;
var sl = `touchend${Pt}${Bt}`;
var nl = `touchstart${Pt}${Bt}`;
var pg = `[${M}-am]`;
var _g = `[${M}-pm]`;
var fg = `[${M}-format24]`;
var Ts = `[${M}-current]`;
var Es = `[${M}-hour-mode]`;
var mg = `[${M}-toggle-button]`;
var oo = `${M}-cancel`;
var ol = `${M}-clear`;
var ro = `${M}-submit`;
var gg = `${M}-icon`;
var ao = `${M}-icon-up`;
var lo = `${M}-icon-down`;
var bg = `${M}-icon-inline-hour`;
var vg = `${M}-icon-inline-minute`;
var rl = `${M}-inline-hour-icons`;
var Tg = `${M}-current-inline`;
var Eg = "readonly";
var Cg = `${M}-invalid-feedback`;
var co = `${M}-is-invalid`;
var jt = `${M}-disabled`;
var H = `${M}-active`;
var Ag = `${M}-input`;
var ue = `${M}-clock`;
var mi = `${M}-clock-inner`;
var ho = `${M}-wrapper`;
var al = `${M}-clock-wrapper`;
var Cs = `${M}-hour`;
var uo = `${M}-minute`;
var As = `${M}-tips-element`;
var X = `${M}-tips-hours`;
var q = `${M}-tips-minutes`;
var ht = `${M}-tips-inner`;
var ys = `${M}-tips-inner-element`;
var ll = `${M}-middle-dot`;
var po = `${M}-hand-pointer`;
var _o = `${M}-circle`;
var cl = `${M}-modal`;
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
  constructor(t, e = {}, i) {
    wt(this, "_toggleAmPm", (t2) => {
      t2 === "PM" ? (this._isPmEnabled = true, this._isAmEnabled = false) : t2 === "AM" && (this._isPmEnabled = false, this._isAmEnabled = true);
    });
    wt(this, "_toggleBackgroundColorCircle", (t2) => {
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
    wt(this, "_toggleClassActive", (t2, { textContent: e2 }, i2) => {
      const n = [...t2].find((o) => Number(o) === Number(e2));
      return i2.forEach((o) => {
        if (!o.hasAttribute(jt)) {
          if (o.textContent === n) {
            h.addClass(o, this._classes.tipsActive), o.setAttribute(H, "");
            return;
          }
          h.removeClass(o, this._classes.tipsActive), o.removeAttribute(H);
        }
      });
    });
    wt(this, "_makeMinutesDegrees", (t2, e2) => {
      const { increment: i2 } = this._options;
      return t2 < 0 ? (e2 = Math.round(360 + t2 / 6) % 60, t2 = 360 + Math.round(t2 / 6) * 6) : (e2 = Math.round(t2 / 6) % 60, t2 = Math.round(t2 / 6) * 6), i2 && (t2 = Math.round(t2 / 30) * 30, e2 = Math.round(t2 / 6) * 6 / 6, e2 === 60 && (e2 = "00")), t2 >= 360 && (t2 = 0), {
        degrees: t2,
        minute: e2,
        addDegrees: i2 ? 30 : 6
      };
    });
    wt(this, "_makeHourDegrees", (t2, e2, i2) => {
      if (t2)
        return this._hasTargetInnerClass(t2) ? e2 < 0 ? (i2 = Math.round(360 + e2 / 30) % 24, e2 = 360 + e2) : (i2 = Math.round(e2 / 30) + 12, i2 === 12 && (i2 = "00")) : e2 < 0 ? (i2 = Math.round(360 + e2 / 30) % 12, e2 = 360 + e2) : (i2 = Math.round(e2 / 30) % 12, (i2 === 0 || i2 > 12) && (i2 = 12)), e2 >= 360 && (e2 = 0), {
          degrees: e2,
          hour: i2,
          addDegrees: 30
        };
    });
    wt(this, "_makeInnerHoursDegrees", (t2, e2) => (t2 < 0 ? (e2 = Math.round(360 + t2 / 30) % 24, t2 = 360 + t2) : (e2 = Math.round(t2 / 30) + 12, e2 === 12 && (e2 = "00")), {
      degrees: t2,
      hour: e2,
      addDegrees: 30
    }));
    wt(this, "_getAppendClock", (t2 = [], e2 = `[${ue}]`, i2) => {
      let { minTime: n, maxTime: o } = this._options;
      const { inline: r, format12: a, disablePast: l, disableFuture: p } = this._options;
      n = Gt(n, l, a), o = qt(o, p, a);
      const [u, _, f] = R(o, false), [g, m, b] = R(n, false);
      !r && a && this._isInvalidTimeFormat && !this._AM.hasAttribute(H) && (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, ""));
      const v = d.findOne(e2), T = 360 / t2.length;
      function y(k) {
        return k * (Math.PI / 180);
      }
      if (v === null)
        return;
      const C = (v.offsetWidth - 32) / 2, E = (v.offsetHeight - 32) / 2, w = C - 4;
      setTimeout(() => {
        let k;
        a && (k = d.findOne(`${Es}[${H}]`).textContent), this._handleDisablingTipsMinTime(k, b, m, g), this._handleDisablingTipsMaxTime(k, f, _, u);
      }, 0), [...t2].forEach((k, D) => {
        const O = y(D * T), x = $("span"), L = $("span");
        L.innerHTML = k, h.addClass(x, this._classes.tips), x.setAttribute(i2, "");
        const { offsetWidth: S, offsetHeight: N } = x;
        return h.addStyle(x, {
          left: `${C + Math.sin(O) * w - S}px`,
          bottom: `${E + Math.cos(O) * w - N}px`
        }), t2.includes("05") && x.setAttribute(q, ""), t2.includes("13") ? L.setAttribute(ys, "") : L.setAttribute(As, ""), x.appendChild(L), v.appendChild(x);
      });
    });
    this._element = t, this._element && A.setData(t, Js, this), this._document = document, this._options = this._getConfig(e), this._classes = this._getClasses(i), this._currentTime = null, this._toggleButtonId = et("timepicker-toggle-"), this.hoursArray = [
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
    ], this.input = d.findOne("input", this._element), this.dataWithIcon = t.dataset.withIcon, this.dataToggle = t.dataset.toggle, this.customIcon = d.findOne(mg, this._element), this._checkToggleButton(), this.inputFormatShow = d.findOne(fg, this._element), this.inputFormat = this.inputFormatShow === null ? "" : Object.values(this.inputFormatShow.dataset)[0], this.elementToggle = d.findOne(Ga, this._element), this.toggleElement = Object.values(t.querySelector(Ga).dataset)[0], this._hour = null, this._minutes = null, this._AM = null, this._PM = null, this._wrapper = null, this._modal = null, this._hand = null, this._circle = null, this._focusTrap = null, this._popper = null, this._interval = null, this._timeoutInterval = null, this._inputValue = this._options.defaultTime !== "" ? this._options.defaultTime : this.input.value, this._options.format24 && (this._options.format12 = false, this._currentTime = Ka(this._inputValue)), this._options.format12 && (this._options.format24 = false, this._currentTime = Ce(this._inputValue)), this._options.readOnly && this.input.setAttribute(Eg, true), this.inputFormat === "true" && this.inputFormat !== "" && (this._options.format12 = false, this._options.format24 = true, this._currentTime = Ka(this._inputValue)), this._animations = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && this._options.animations, this.init(), this._isHours = true, this._isMinutes = false, this._isInvalidTimeFormat = false, this._isMouseMove = false, this._isInner = false, this._isAmEnabled = false, this._isPmEnabled = false, this._options.format12 && !this._options.defaultTime && (this._isPmEnabled = true), this._objWithDataOnChange = { degrees: null }, this._scrollBar = new ti;
  }
  static get NAME() {
    return Bi;
  }
  init() {
    const { format12: t, format24: e, enableValidation: i } = this._options;
    let n, o, r;
    if (this.input.setAttribute(Ag, ""), this._currentTime !== undefined) {
      const { hours: a, minutes: l, amOrPm: p } = this._currentTime;
      n = Number(a) < 10 ? 0 : "", o = `${n}${Number(a)}:${l}`, r = p, t ? this.input.value = `${o} ${r}` : e && (this.input.value = `${o}`);
    } else
      n = "", o = "", r = "", this.input.value = "";
    this.input.value.length > 0 && this.input.value !== "" && (this.input.setAttribute(H, ""), c.trigger(this.input, "input")), !(this._options === null && this._element === null) && (i && this._getValidate("keydown change blur focus"), this._handleOpen(), this._listenToToggleKeydown());
  }
  dispose() {
    this._removeModal(), this._element !== null && A.removeData(this._element, Js), setTimeout(() => {
      this._element = null, this._options = null, this.input = null, this._focusTrap = null;
    }, 350), c.off(this._element, "click", `[data-te-toggle='${this.toggleElement}']`), c.off(this._element, "keydown", `[data-te-toggle='${this.toggleElement}']`);
  }
  update(t = {}) {
    this._options = this._getConfig({ ...this._options, ...t });
  }
  _checkToggleButton() {
    this.customIcon === null && (this.dataWithIcon !== undefined && (this._options.withIcon = null, this.dataWithIcon === "true" && this._appendToggleButton(this._options)), this._options.withIcon && this._appendToggleButton(this._options));
  }
  _appendToggleButton() {
    const t = ag(this._options, this._toggleButtonId, this._classes);
    this.input.insertAdjacentHTML("afterend", t);
  }
  _getDomElements() {
    this._hour = d.findOne(`[${Cs}]`), this._minutes = d.findOne(`[${uo}]`), this._AM = d.findOne(pg), this._PM = d.findOne(_g), this._wrapper = d.findOne(`[${ho}]`), this._modal = d.findOne(`[${cl}]`), this._hand = d.findOne(`[${po}]`), this._circle = d.findOne(`[${_o}]`), this._clock = d.findOne(`[${ue}]`), this._clockInner = d.findOne(`[${mi}]`);
  }
  _handlerMaxMinHoursOptions(t, e, i, n, o, r) {
    if (!e && !i)
      return true;
    const { format24: a, format12: l, disablePast: p, disableFuture: u } = this._options, { _isAmEnabled: _, _isPmEnabled: f } = this, g = r.keyCode, m = r.target.hasAttribute(mi) || r.target.hasAttribute(ht) || r.target.hasAttribute(ys);
    i = Gt(i, p, l), e = qt(e, u, l), typeof e != "number" && (e = R(e, false)[0]);
    const b = e !== "" ? e * 30 : "", v = i !== "" ? i * 30 : "";
    t < 0 && (t = 360 + t), t = t === 360 ? 0 : t;
    const T = () => {
      const D = document.querySelectorAll(`[${As}]`), O = document.querySelectorAll(`[${ys}]`), x = ug(this._hour.innerText);
      let L, S, N;
      return g === U ? S = 1 : g === z && (S = -1), x === 12 && g === U ? N = 1 : x === 0 && g === U ? N = 13 : x === 0 && g === z ? N = 23 : x === 13 && g === z ? N = 0 : x === 1 && g === z ? N = 12 : N = x + S, D.forEach((P) => {
        Number(P.textContent) === N && (L = P);
      }), O.forEach((P) => {
        Number(P.textContent) === N && (L = P);
      }), !L.parentElement.hasAttribute(jt);
    }, y = () => {
      const D = i !== "" && i > 12 ? (i - 12) * 30 : "", O = e !== "" && e > 12 ? (e - 12) * 30 : "";
      if (!(D && t < D || O && t > O || e && e < 12))
        return true;
    };
    if (a && r.type !== "keydown" && m)
      return y();
    if (r.type === "keydown")
      return T();
    const C = !o || o === "PM" && f || i !== "" && o === "AM" && _, E = !n || n === "PM" && f || e !== "" && n === "AM" && _, w = () => {
      const D = v === 360 && l ? 0 : v;
      if (i) {
        if (o === "PM" && _ || C && t < D)
          return;
      } else
        return true;
      return true;
    }, k = () => {
      const D = b === 360 && l ? 0 : b;
      if (e) {
        if (n === "AM" && f || E && t > D)
          return;
      } else
        return true;
      return true;
    };
    return w() && k();
  }
  _handleKeyboard() {
    c.on(this._document, vs, "", (t) => {
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
      _ = Gt(_, p, l), f = qt(f, u, l), typeof f != "number" && (f = R(f, false)[0]);
      const b = d.findOne(`[${q}]`) === null, v = d.findOne(`[${ht}]`) !== null, T = Number(this._hand.style.transform.replace(/[^\d-]/g, "")), y = d.find(`[${q}]`, this._modal), C = d.find(`[${X}]`, this._modal), E = d.find(`[${ht}]`, this._modal);
      let w = this._makeHourDegrees(t.target, T, e).hour;
      const { degrees: k, addDegrees: D } = this._makeHourDegrees(t.target, T, e);
      let { minute: O, degrees: x } = this._makeMinutesDegrees(T, i);
      const L = this._makeMinutesDegrees(T, i).addDegrees;
      let { hour: S } = this._makeInnerHoursDegrees(T, n);
      if (t.keyCode === we) {
        const N = d.findOne(`[${oo}]`, this._modal);
        c.trigger(N, "click");
      } else if (b) {
        if (v && (t.keyCode === ze && (this._isInner = false, h.addStyle(this._hand, {
          height: "calc(40% + 1px)"
        }), this._hour.textContent = this._setHourOrMinute(w > 12 ? 1 : w), this._toggleClassActive(this.hoursArray, this._hour, C), this._toggleClassActive(this.innerHours, this._hour, E)), t.keyCode === Ke && (this._isInner = true, h.addStyle(this._hand, {
          height: "21.5%"
        }), this._hour.textContent = this._setHourOrMinute(S >= 24 || S === "00" ? 0 : S), this._toggleClassActive(this.innerHours, this._hour, E), this._toggleClassActive(this.hoursArray, this._hour - 1, C))), t.keyCode === U) {
          if (!this._handlerMaxMinHoursOptions(k + 30, f, _, m, g, t))
            return;
          h.addStyle(this._hand, {
            transform: `rotateZ(${k + D}deg)`
          }), this._isInner ? (S += 1, S === 24 ? S = 0 : (S === 25 || S === "001") && (S = 13), this._hour.textContent = this._setHourOrMinute(S), this._toggleClassActive(this.innerHours, this._hour, E)) : (w += 1, this._hour.textContent = this._setHourOrMinute(w > 12 ? 1 : w), this._toggleClassActive(this.hoursArray, this._hour, C));
        }
        if (t.keyCode === z) {
          if (!this._handlerMaxMinHoursOptions(k - 30, f, _, m, g, t))
            return;
          h.addStyle(this._hand, {
            transform: `rotateZ(${k - D}deg)`
          }), this._isInner ? (S -= 1, S === 12 ? S = 0 : S === -1 && (S = 23), this._hour.textContent = this._setHourOrMinute(S), this._toggleClassActive(this.innerHours, this._hour, E)) : (w -= 1, this._hour.textContent = this._setHourOrMinute(w === 0 ? 12 : w), this._toggleClassActive(this.hoursArray, this._hour, C));
        }
      } else
        t.keyCode === U && (x += L, h.addStyle(this._hand, {
          transform: `rotateZ(${x}deg)`
        }), O += 1, o && (O += 4, O === "0014" && (O = 5)), this._minutes.textContent = this._setHourOrMinute(O > 59 ? 0 : O), this._toggleClassActive(this.minutesArray, this._minutes, y), this._toggleBackgroundColorCircle(`[${q}]`)), t.keyCode === z && (x -= L, h.addStyle(this._hand, {
          transform: `rotateZ(${x}deg)`
        }), o ? O -= 5 : O -= 1, O === -1 ? O = 59 : O === -5 && (O = 55), this._minutes.textContent = this._setHourOrMinute(O), this._toggleClassActive(this.minutesArray, this._minutes, y), this._toggleBackgroundColorCircle(`[${q}]`));
    });
  }
  _setActiveClassToTipsOnOpen(t, ...e) {
    if (!this._isInvalidTimeFormat)
      if (this._options.format24) {
        const i = d.find(`[${X}]`, this._modal), n = d.find(`[${ht}]`, this._modal);
        this._addActiveClassToTip(i, t), this._addActiveClassToTip(n, t);
      } else {
        [...e].filter((n) => (n.toLowerCase() === "pm" ? (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, "")) : n.toLowerCase() === "am" ? (h.addClass(this._AM, this._classes.opacity), this._AM.setAttribute(H, "")) : (h.removeClass(this._AM, this._classes.opacity), h.removeClass(this._PM, this._classes.opacity), this._AM.removeAttribute(H), this._PM.removeAttribute(H)), n));
        const i = d.find(`[${X}]`, this._modal);
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
      t.keyCode === it && (t.preventDefault(), c.trigger(this.elementToggle, "click"));
    });
  }
  _handleOpen() {
    const t = this._getContainer();
    K.on(this._element, "click", `[data-te-toggle='${this.toggleElement}']`, (e) => {
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
        if ((Number(l) > 12 || l === "00") && (this._isInner = true), this.input.blur(), e.target.blur(), _.innerHTML = rg(this._options, this._classes), h.addClass(_, this._classes.modal), _.setAttribute(cl, ""), _.setAttribute("role", "dialog"), _.setAttribute("tabIndex", "-1"), _.setAttribute("id", o), r ? (this._popper = se(this.input, _, {
          placement: "bottom-start"
        }), t.appendChild(_)) : (t.appendChild(_), this._scrollBar.hide()), this._getDomElements(), this._animations ? this._toggleBackdropAnimation() : h.addClass(this._wrapper, this._classes.opacity), this._setActiveClassToTipsOnOpen(l, p, u), this._appendTimes(), this._setActiveClassToTipsOnOpen(l, p, u), this._setTipsAndTimesDependOnInputValue(l, p), this.input.value === "") {
          const f = d.find(`[${X}]`, this._modal);
          a && (h.addClass(this._PM, this._classes.opacity), this._PM.setAttribute(H, "")), this._hour.textContent = "12", this._minutes.textContent = "00", this._addActiveClassToTip(f, Number(this._hour.textContent));
        }
        if (this._handleSwitchTimeMode(), this._handleOkButton(), this._handleClose(), r)
          this._handleHoverInlineBtn(), this._handleDocumentClickInline(), this._handleInlineClicks();
        else {
          this._handleSwitchHourMinute(), this._handleClockClick(), this._handleKeyboard();
          const f = document.querySelector(`${Ts}[${H}]`);
          h.addClass(f, this._classes.opacity), h.addStyle(this._hour, {
            pointerEvents: "none"
          }), h.addStyle(this._minutes, {
            pointerEvents: ""
          });
        }
        this._focusTrap = new zi(this._wrapper, {
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
    K.on(this._modal, "click mousedown mouseup touchstart touchend contextmenu", `[${ao}], [${lo}]`, (g) => {
      t = Number(this._hour.textContent), e = Number(this._minutes.textContent);
      const { target: m, type: b } = g, v = b === "mousedown" || b === "touchstart";
      m.closest(`[${ao}]`) ? m.closest(`[${ao}]`).parentNode.hasAttribute(rl) ? v ? f(a) : b === "mouseup" || b === "touchend" || b === "contextmenu" ? _() : a() : v ? f(l) : b === "mouseup" || b === "touchend" || b === "contextmenu" ? _() : l() : m.closest(`[${lo}]`) && (m.closest(`[${lo}]`).parentNode.hasAttribute(rl) ? v ? f(p) : b === "mouseup" || b === "touchend" ? _() : p() : v ? f(u) : b === "mouseup" || b === "touchend" ? _() : u());
    }), c.on(window, vs, (g) => {
      const m = g.code, b = document.activeElement.hasAttribute(Cs), v = document.activeElement.hasAttribute(uo), T = document.activeElement === document.body;
      switch (t = Number(this._hour.textContent), e = Number(this._minutes.textContent), m) {
        case "ArrowUp":
          g.preventDefault(), T || b ? (this._hour.focus(), a()) : v && l();
          break;
        case "ArrowDown":
          g.preventDefault(), T || b ? (this._hour.focus(), p()) : v && u();
          break;
      }
    });
  }
  _handleClose() {
    c.on(this._modal, "click", `[${ho}], [${oo}], [${ol}]`, ({ target: t }) => {
      const { closeModalOnBackdropClick: e } = this._options, i = () => {
        var n;
        h.addStyle(this.elementToggle, {
          pointerEvents: "auto"
        }), this._animations && this._toggleBackdropAnimation(true), this._removeModal(), (n = this._focusTrap) == null || n.disable(), this._focusTrap = null, this.elementToggle ? this.elementToggle.focus() : this.input && this.input.focus();
      };
      if (t.hasAttribute(ol)) {
        this._toggleAmPm("PM"), this.input.value = "", this.input.removeAttribute(H);
        let n;
        R(this.input)[0] === "" ? n = ["12", "00", "PM"] : n = R(this.input);
        const [o, r, a] = n;
        this._setTipsAndTimesDependOnInputValue("12", "00"), this._setActiveClassToTipsOnOpen(o, r, a), this._hour.click();
      } else
        (t.hasAttribute(oo) || t.hasAttribute(ro) || t.hasAttribute(ho) && e) && i();
    });
  }
  showValueInput() {
    return this.input.value;
  }
  _handleOkButton() {
    K.on(this._modal, "click", `[${ro}]`, () => {
      let { maxTime: t, minTime: e } = this._options;
      const {
        format12: i,
        format24: n,
        readOnly: o,
        focusInputAfterApprove: r,
        disablePast: a,
        disableFuture: l
      } = this._options, p = this._document.querySelector(`${Es}[${H}]`), u = `${this._hour.textContent}:${this._minutes.textContent}`, _ = Number(this._hour.textContent), f = _ === 12 && i ? 0 : _, g = Number(this._minutes.textContent);
      e = Gt(e, a, i), t = qt(t, l, i);
      let [m, b, v] = R(t, false), [T, y, C] = R(e, false);
      T = T === "12" && i ? "00" : T, m = m === "12" && i ? "00" : m;
      const E = f < Number(T), w = f > Number(m);
      let k = true;
      p && (k = v === p.textContent);
      let D = true;
      p && (D = C === p.textContent);
      const O = g > b && f === Number(m), x = g < y && f === Number(T);
      if (this.input.setAttribute(H, ""), h.addStyle(this.elementToggle, {
        pointerEvents: "auto"
      }), t !== "") {
        if (k && (w || O))
          return;
        if (v === "AM" && p.textContent === "PM")
          return;
      }
      e !== "" && (D && (E || x) || C === "PM" && p.textContent === "AM") || cg(this._options, this.input, this._hour.textContent) !== undefined && (this._isInvalidTimeFormat && this.input.removeAttribute(co), !o && r && this.input.focus(), h.addStyle(this.elementToggle, {
        pointerEvents: "auto"
      }), n ? this.input.value = u : p === null ? this.input.value = `${u} PM` : this.input.value = `${u} ${p.textContent}`, this._animations && this._toggleBackdropAnimation(true), this._removeModal(), c.trigger(this.input, "input.te.timepicker"), c.trigger(this.input, "input"));
    });
  }
  _handleHoverInlineBtn() {
    K.on(this._modal, "mouseover mouseleave", `[${Tg}]`, ({ type: t, target: e }) => {
      const i = d.find(`[${bg}]`, this._modal), n = d.find(`[${vg}]`, this._modal), o = (l, p) => l.forEach((u) => {
        if (p) {
          h.addClass(u, this._classes.opacity), u.setAttribute(H, "");
          return;
        }
        h.removeClass(u, this._classes.opacity), u.removeAttribute(H);
      }), a = e.hasAttribute(Cs) ? i : n;
      o(a, t === "mouseover");
    });
  }
  _handleDocumentClickInline() {
    c.on(document, qa, ({ target: t }) => {
      if (this._modal && !this._modal.contains(t) && !t.hasAttribute(gg)) {
        if (clearInterval(this._interval), h.addStyle(this.elementToggle, {
          pointerEvents: "auto"
        }), this._removeModal(), !this._animations)
          return;
        this._toggleBackdropAnimation(true);
      }
    });
  }
  _handleSwitchHourMinute() {
    lg("click", Ts, this._classes), c.on(this._modal, "click", Ts, () => {
      const { format24: t } = this._options, e = d.find(Ts, this._modal), i = d.find(`[${q}]`, this._modal), n = d.find(`[${X}]`, this._modal), o = d.find(`[${ht}]`, this._modal), r = Number(this._hour.textContent), a = Number(this._minutes.textContent), l = (p, u) => {
        n.forEach((f) => f.remove()), i.forEach((f) => f.remove()), h.addClass(this._hand, this._classes.transform), setTimeout(() => {
          h.removeClass(this._hand, this._classes.transform);
        }, 401), this._getAppendClock(p, `[${ue}]`, u);
        const _ = () => {
          const f = d.find(`[${X}]`, this._modal), g = d.find(`[${q}]`, this._modal);
          this._addActiveClassToTip(f, r), this._addActiveClassToTip(g, a);
        };
        if (!t)
          setTimeout(() => {
            _();
          }, 401);
        else {
          const f = d.find(`[${ht}]`, this._modal);
          setTimeout(() => {
            this._addActiveClassToTip(f, r), _();
          }, 401);
        }
      };
      e.forEach((p) => {
        p.hasAttribute(H) && (p.hasAttribute(uo) ? (h.addClass(this._hand, this._classes.transform), h.addStyle(this._hand, {
          transform: `rotateZ(${this._minutes.textContent * 6}deg)`,
          height: "calc(40% + 1px)"
        }), t && o.length > 0 && o.forEach((u) => u.remove()), l(this.minutesArray, q), this._hour.style.pointerEvents = "", this._minutes.style.pointerEvents = "none") : p.hasAttribute(Cs) && (h.addStyle(this._hand, {
          transform: `rotateZ(${this._hour.textContent * 30}deg)`
        }), Number(this._hour.textContent) > 12 ? (h.addStyle(this._hand, {
          transform: `rotateZ(${this._hour.textContent * 30 - 360}deg)`,
          height: "21.5%"
        }), Number(this._hour.textContent) > 12 && h.addStyle(this._hand, {
          height: "21.5%"
        })) : h.addStyle(this._hand, {
          height: "calc(40% + 1px)"
        }), t && this._getAppendClock(this.innerHours, `[${mi}]`, ht), o.length > 0 && o.forEach((u) => u.remove()), l(this.hoursArray, X), h.addStyle(this._hour, {
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
    const o = d.find(`[${X}]`), r = d.find(`[${ht}]`), a = d.find(`[${q}]`);
    if (!e || e === t) {
      Ua(r, n, this._classes, this._options.format12), Ua(o, n, this._classes, this._options.format12), hg(a, i, n, this._hour.textContent, this._classes, this._options.format12);
      return;
    }
    e === "AM" && t === "PM" && (o.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(jt, "");
    }), a.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(jt, "");
    }));
  }
  _handleDisablingTipsMinTime(t, e, i, n) {
    if (!this._options.minTime && !this._options.disablePast)
      return;
    const o = d.find(`[${X}]`), r = d.find(`[${ht}]`), a = d.find(`[${q}]`);
    !e || e === t ? (Xa(o, n, this._classes, this._options.format12), Xa(r, n, this._classes, this._options.format12), dg(a, i, n, this._hour.textContent, this._classes, this._options.format12)) : e === "PM" && t === "AM" && (o.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(jt, "");
    }), a.forEach((l) => {
      h.addClass(l, this._classes.tipsDisabled), l.setAttribute(jt, "");
    }));
  }
  _handleSwitchTimeMode() {
    c.on(document, "click", Es, ({ target: t }) => {
      let { maxTime: e, minTime: i } = this._options;
      const { disablePast: n, disableFuture: o, format12: r } = this._options;
      i = Gt(i, n, r), e = qt(e, o, r);
      const [a, l, p] = R(e, false), [u, _, f] = R(i, false), g = d.find(`[${X}]`), m = d.find(`[${q}]`);
      (() => {
        g.forEach((v) => {
          h.removeClass(v, this._classes.tipsDisabled), v.removeAttribute(jt);
        }), m.forEach((v) => {
          h.removeClass(v, this._classes.tipsDisabled), v.removeAttribute(jt);
        });
      })(), this._handleDisablingTipsMinTime(t.textContent, f, _, u), this._handleDisablingTipsMaxTime(t.textContent, p, l, a), this._toggleAmPm(t.textContent), t.hasAttribute(H) || (d.find(Es).forEach((T) => {
        T.hasAttribute(H) && (h.removeClass(T, this._classes.opacity), T.removeAttribute(H));
      }), h.addClass(t, this._classes.opacity), t.setAttribute(H, ""));
    });
  }
  _handleClockClick() {
    let { maxTime: t, minTime: e } = this._options;
    const { disablePast: i, disableFuture: n, format12: o } = this._options;
    e = Gt(e, i, o), t = qt(t, n, o);
    const r = R(t, false)[2], a = R(e, false)[2], l = R(t, false)[0], p = R(e, false)[0], u = d.findOne(`[${al}]`);
    K.on(document, `${Za} ${Qa} ${Ja} ${tl} ${el} ${nl} ${il} ${sl}`, "", (_) => {
      bs() || _.preventDefault();
      const { type: f, target: g } = _, { closeModalOnMinutesClick: m, switchHoursToMinutesOnClick: b } = this._options, v = d.findOne(`[${q}]`, this._modal) !== null, T = d.findOne(`[${X}]`, this._modal) !== null, y = d.findOne(`[${ht}]`, this._modal) !== null, C = d.find(`[${q}]`, this._modal), E = za(_, u), w = u.offsetWidth / 2;
      let k = Math.atan2(E.y - w, E.x - w);
      if (bs()) {
        const L = za(_, u, true);
        k = Math.atan2(L.y - w, L.x - w);
      }
      let D = null, O = null, x = null;
      if (f === "mousedown" || f === "mousemove" || f === "touchmove" || f === "touchstart")
        (f === "mousedown" || f === "touchstart" || f === "touchmove") && (this._hasTargetInnerClass(g) || g.hasAttribute(al) || g.hasAttribute(ue) || g.hasAttribute(q) || g.hasAttribute(X) || g.hasAttribute(_o) || g.hasAttribute(po) || g.hasAttribute(ll) || g.hasAttribute(As)) && (this._isMouseMove = true, bs() && _.touches && (D = _.touches[0].clientX, O = _.touches[0].clientY, x = document.elementFromPoint(D, O)));
      else if (f === "mouseup" || f === "touchend") {
        if (this._isMouseMove = false, this._hasTargetInnerClass(g) || g.hasAttribute(ue) || g.hasAttribute(X) || g.hasAttribute(_o) || g.hasAttribute(po) || g.hasAttribute(ll) || g.hasAttribute(As)) {
          if ((T || y) && b) {
            const L = Number(this._hour.textContent) > l || Number(this._hour.textContent) < p;
            if (this._options.format24 && l !== "" && p !== "" && L)
              return;
            if (this._options.format24 && p !== "" && Number(this._hour.textContent) < p)
              return;
          }
          c.trigger(this._minutes, "click");
        }
        if (v && m) {
          const L = d.findOne(`[${ro}]`, this._modal);
          c.trigger(L, "click");
        }
      }
      if (v) {
        let L;
        const S = Math.trunc(k * 180 / Math.PI) + 90, { degrees: N, minute: P } = this._makeMinutesDegrees(S, L);
        if (this._handlerMaxMinMinutesOptions(N, P) === undefined)
          return;
        const { degrees: ot, minute: rt } = this._handlerMaxMinMinutesOptions(N, P);
        if (this._isMouseMove) {
          if (h.addStyle(this._hand, {
            transform: `rotateZ(${ot}deg)`
          }), rt === undefined)
            return;
          const G = () => rt >= 10 || rt === "00" ? rt : `0${rt}`;
          this._minutes.textContent = G(), this._toggleClassActive(this.minutesArray, this._minutes, C), this._toggleBackgroundColorCircle(`[${q}]`), this._objWithDataOnChange.degreesMinutes = ot, this._objWithDataOnChange.minutes = rt;
        }
      }
      if (T || y) {
        let L, S = Math.trunc(k * 180 / Math.PI) + 90;
        if (S = Math.round(S / 30) * 30, h.addStyle(this._circle, {
          backgroundColor: "#1976d2"
        }), this._makeHourDegrees(g, S, L) === undefined)
          return;
        const N = () => {
          if (bs() && S && x) {
            const { degrees: P, hour: ot } = this._makeHourDegrees(x, S, L);
            return this._handleMoveHand(x, ot, P);
          } else {
            const { degrees: P, hour: ot } = this._makeHourDegrees(g, S, L);
            return this._handleMoveHand(g, ot, P);
          }
        };
        this._objWithDataOnChange.degreesHours = S, this._handlerMaxMinHoursOptions(S, l, p, r, a, _) && N();
      }
      _.stopPropagation();
    });
  }
  _hasTargetInnerClass(t) {
    return t.hasAttribute(mi) || t.hasAttribute(ht) || t.hasAttribute(ys);
  }
  _handleMoveHand(t, e, i) {
    const n = d.find(`[${X}]`, this._modal), o = d.find(`[${ht}]`, this._modal);
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
    n = Gt(n, a, o), i = qt(i, l, o);
    const p = R(i, false)[1], u = R(n, false)[1], _ = R(i, false)[0], f = R(n, false)[0], g = f === "12" && o ? "0" : f, m = _ === "12" && o ? "0" : _, b = R(i, false)[2], v = R(n, false)[2], T = p !== "" ? p * 6 : "", y = u !== "" ? u * 6 : "", C = Number(this._hour.textContent), E = C === 12 && o ? 0 : C;
    if (!b && !v) {
      if (i !== "" && n !== "") {
        if (Number(m) === E && t > T || Number(g) === E && t < y)
          return t;
      } else if (n !== "" && E <= Number(g)) {
        if (t <= y - 6)
          return t;
      } else if (i !== "" && E >= Number(m) && t >= T + 6)
        return t;
    } else {
      if (n !== "") {
        if (v === "PM" && this._isAmEnabled)
          return;
        if (v === "PM" && this._isPmEnabled) {
          if (E < Number(g))
            return;
          if (E <= Number(g) && t <= y - 6)
            return t;
        } else if (v === "AM" && this._isAmEnabled) {
          if (E < Number(g))
            return;
          if (E <= Number(g) && t <= y - 6)
            return t;
        }
      }
      if (i !== "") {
        if (b === "AM" && this._isPmEnabled)
          return;
        if (b === "PM" && this._isPmEnabled) {
          if (E >= Number(m) && t >= T + 6)
            return t;
        } else if (b === "AM" && this._isAmEnabled && E >= Number(m) && t >= T + 6)
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
    }, 300) : (this._removeModalElements(), this._scrollBar.reset()), K.off(this._document, `${qa} ${vs} ${Za} ${Qa} ${Ja} ${tl} ${el} ${nl} ${il} ${sl}`), c.off(window, vs);
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
      this._getAppendClock(this.hoursArray, `[${ue}]`, X), this._getAppendClock(this.innerHours, `[${mi}]`, ht);
      return;
    }
    this._getAppendClock(this.hoursArray, `[${ue}]`, X);
  }
  _getConfig(t) {
    const e = h.getDataAttributes(this._element);
    return t = {
      ...wg,
      ...e,
      ...t
    }, I(Bi, t, kg), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...xg,
      ...e,
      ...t
    }, I(Bi, t, Og), t;
  }
  _getContainer() {
    return d.findOne(this._options.container);
  }
  _getValidate(t) {
    const { format24: e, format12: i, appendValidationInfo: n } = this._options;
    K.on(this.input, t, ({ target: o }) => {
      if (this._options === null || this.input.value === "")
        return;
      const r = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/, a = /^([01]\d|2[0-3])(:[0-5]\d)$/, l = r.test(o.value);
      if (a.test(o.value) !== true && e || l !== true && i) {
        n && this.input.setAttribute(co, ""), h.addStyle(o, { marginBottom: 0 }), this._isInvalidTimeFormat = true;
        return;
      }
      this.input.removeAttribute(co), this._isInvalidTimeFormat = false;
      const u = d.findOne(`[${Cg}]`);
      u !== null && u.remove();
    });
  }
  static getInstance(t) {
    return A.getData(t, Js);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var Ig = {
  threshold: 10,
  direction: "all"
};
var Dg = class {
  constructor(t, e) {
    this._element = t, this._startPosition = null, this._options = {
      ...Ig,
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
var $g = class {
  constructor(t, e = "swipe", i = {}) {
    this._element = t, this._event = e, this.swipe = new Dg(t, i), this._touchStartHandler = this._handleTouchStart.bind(this), this._touchMoveHandler = this._handleTouchMove.bind(this), this._touchEndHandler = this._handleTouchEnd.bind(this);
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
var hl = "sidenav";
var ws = "te.sidenav";
var Lg = "data-te-sidenav-rotate-icon-ref";
var fo = "[data-te-sidenav-toggle-ref]";
var Ng = "[data-te-collapse-init]";
var Mg = '[data-te-sidenav-slim="true"]';
var Rg = '[data-te-sidenav-slim="false"]';
var Pg = "[data-te-sidenav-menu-ref]";
var Le = "[data-te-sidenav-collapse-ref]";
var gi = "[data-te-sidenav-link-ref]";
var Bg = W() ? 100 : -100;
var Hg = W() ? -100 : 100;
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
  constructor(t, e = {}) {
    wt(this, "_addBackdropOnInit", () => {
      this._options.sidenavHidden || (this._backdrop.show(), c.off(this._element, "transitionend", this._addBackdropOnInit));
    });
    this._element = t, this._options = e, this._ID = et(""), this._content = null, this._initialContentStyle = null, this._slimCollapsed = false, this._activeNode = null, this._tempSlim = false, this._backdrop = this._initializeBackDrop(), this._focusTrap = null, this._perfectScrollbar = null, this._touch = null, this._setModeFromBreakpoints(), this.escHandler = (i) => {
      i.keyCode === we && this.toggler && Mt(this.toggler) && (this._update(false), c.off(window, "keydown", this.escHandler));
    }, this.hashHandler = () => {
      this._setActiveElements();
    }, t && (A.setData(t, ws, this), this._setup()), this.options.sidenavBackdrop && !this.options.sidenavHidden && this.options.sidenavMode === "over" && c.on(this._element, "transitionend", this._addBackdropOnInit), this._didInit = false, this._init();
  }
  static get NAME() {
    return hl;
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
    if (this.options.sidenavRight && !W() || !this.options.sidenavRight && W()) {
      let n = 0;
      if (this.container.scrollHeight > this.container.clientHeight && (n = this.container.offsetWidth - this.container.clientWidth), this.container.tagName === "BODY") {
        const o = document.documentElement.clientWidth;
        n = Math.abs(window.innerWidth - o);
      }
      return Math.abs(i + n - e) > 10;
    }
    return Math.abs(i - t) < 10;
  }
  get links() {
    return d.find(gi, this._element);
  }
  get navigation() {
    return d.find(Pg, this._element);
  }
  get options() {
    const t = {
      ...Wg,
      ...h.getDataAttributes(this._element),
      ...this._options
    };
    return I(hl, t, Vg), t;
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
    return d.find(fo).find((e) => {
      const i = h.getDataAttribute(e, "target");
      return d.findOne(i) === this._element;
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
  changeMode(t) {
    this._setMode(t);
  }
  dispose() {
    c.off(window, "keydown", this.escHandler), this.options.sidenavBackdrop && this._backdrop.dispose(), c.off(window, "hashchange", this.hashHandler), this._touch.dispose(), A.removeData(this._element, ws), this._element = null;
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
    this._didInit || (c.on(document, "click", fo, Ci.toggleSidenav()), this._didInit = true);
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
      d.find(Le, t).forEach((i) => {
        Qt.getInstance(i).hide();
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
    e && this._slimCollapsed && this.options.sidenavSlim && this.options.sidenavExpandable ? this.toggleSlim() : e || (this._slimCollapsed || !this.options.sidenavSlim || !this.options.sidenavExpandable ? this.toggler && Mt(this.toggler) && this.toggle() : this.toggleSlim());
  }
  _isActive(t, e) {
    return e ? e === t : t.attributes.href ? new URL(t, window.location.href).href === window.location.href : false;
  }
  _isAllToBeCollapsed() {
    return d.find(Ng, this._element).filter((i) => i.getAttribute("aria-expanded") === "true").length === 0;
  }
  _isAllCollapsed() {
    return d.find(Le, this._element).filter((t) => Mt(t)).length === 0;
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
    return new Cr({
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
        e.keyCode === it && this._setActiveElements(t);
      });
    }), c.on(window, "hashchange", this.hashHandler);
  }
  _setupCollapse() {
    this.navigation.forEach((t, e) => {
      d.find(Le, t).forEach((n, o) => this._setupCollapseList({ list: n, index: o, menu: t, menuIndex: e }));
    });
  }
  _generateCollpaseID(t, e) {
    return `sidenav-collapse-${this._ID}-${e}-${t}`;
  }
  _setupCollapseList({ list: t, index: e, menu: i, menuIndex: n }) {
    const o = this._generateCollpaseID(e, n);
    t.setAttribute("id", o), t.setAttribute("data-te-collapse-item", "");
    const [r] = d.prev(t, gi);
    h.setDataAttribute(r, "collapse-init", ""), r.setAttribute("href", `#${o}`), r.setAttribute("role", "button");
    const a = Qt.getInstance(t) || new Qt(t, {
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
    this._focusTrap = new zi(this._element, {
      event: "keydown",
      condition: (t) => t.keyCode === ke,
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
      const i = fd(t.parentNode.children).filter((n) => n !== t).reduce((n, o) => n + o.clientHeight, 0);
      h.style(t, {
        maxHeight: `calc(100% - ${i}px)`,
        position: "relative"
      });
    }
    this._perfectScrollbar = new Bh(t, {
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
      let e = ei.getInstance(t), i = this.options.sidenavColor;
      if (e && e._options.sidenavColor !== this.options.sidenavColor)
        e.dispose();
      else if (e)
        return;
      (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) && (i = "white"), e = new ei(t, { rippleColor: i });
    });
  }
  _setupTouch() {
    this._touch = new $g(this._element, "swipe", { threshold: 20 }), this._touch.init(), c.on(this._element, "swipeleft", (t) => this._handleSwipe(t, this.options.sidenavRight)), c.on(this._element, "swiperight", (t) => this._handleSwipe(t, !this.options.sidenavRight));
  }
  _setActive(t, e) {
    t.setAttribute("data-te-sidebar-state-active", ""), this._activeNode && t.removeAttribute("data-te-sidebar-state-active"), this._activeNode = t;
    const [i] = d.parents(this._activeNode, Le);
    if (!i) {
      this._setActiveCategory();
      return;
    }
    const [n] = d.prev(i, gi);
    this._setActiveCategory(n), !e && !this._slimCollapsed && Qt.getInstance(i).show();
  }
  _setActiveCategory(t) {
    this.navigation.forEach((e) => {
      d.find(Le, e).forEach((n) => {
        const [o] = d.prev(n, gi);
        o !== t ? o.removeAttribute("data-te-sidenav-state-active") : o.setAttribute("data-te-sidenav-state-active", "");
      });
    });
  }
  _setActiveElements(t) {
    this.navigation.forEach((e) => {
      d.find(gi, e).filter((n) => d.next(n, Le).length === 0).forEach((n) => {
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
    const [i] = d.children(t, `[${Lg}]`);
    i && (e ? h.removeClass(i, "rotate-180") : h.addClass(i, "rotate-180"));
  }
  _toggleCategory(t, e) {
    t.preventDefault(), e.toggle(), this._slimCollapsed && this.options.sidenavExpandable && (this._tempSlim = true, this._setSlim(false));
  }
  _toggleSlimDisplay(t) {
    const e = d.find(Mg, this._element), i = d.find(Rg, this._element), n = () => {
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
      const e = d.closest(t.target, fo), i = h.getDataAttributes(e).target;
      d.find(i).forEach((n) => {
        (Ci.getInstance(n) || new Ci(n)).toggle();
      });
    };
  }
  static jQueryInterface(t, e) {
    return this.each(function() {
      let i = A.getData(this, ws);
      const n = typeof t == "object" && t;
      if (!(!i && /dispose/.test(t)) && (i || (i = new Ci(this, n)), typeof t == "string")) {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
  static getInstance(t) {
    return A.getData(t, ws);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
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
var Kt = `[${Ui}-step-ref]`;
var Z = `[${Ui}-head-ref]`;
var _l = `[${Ui}-head-text-ref]`;
var ks = `[${Ui}-head-icon-ref]`;
var Q = `[${Ui}-content-ref]`;
var fl = "data-te-input-state-active";
var xs = "data-te-input-selected";
var ml = "data-te-input-multiple-active";
var gl = "[data-te-form-check-input]";

class bl {
  constructor(t, e, i, n, o, r, a, l, p, u, _) {
    this.id = t, this.nativeOption = e, this.multiple = i, this.value = n, this.label = o, this.selected = r, this.disabled = a, this.hidden = l, this.secondaryText = p, this.groupId = u, this.icon = _, this.node = null, this.active = false;
  }
  select() {
    this.multiple ? this._selectMultiple() : this._selectSingle();
  }
  _selectSingle() {
    this.selected || (this.node.setAttribute(xs, ""), this.node.setAttribute("aria-selected", true), this.selected = true, this.nativeOption && (this.nativeOption.selected = true));
  }
  _selectMultiple() {
    if (!this.selected) {
      const t = d.findOne(gl, this.node);
      t.checked = true, this.node.setAttribute(xs, ""), this.node.setAttribute("aria-selected", true), this.selected = true, this.nativeOption && (this.nativeOption.selected = true);
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
      const t = d.findOne(gl, this.node);
      t.checked = false, this.node.removeAttribute(xs), this.node.setAttribute("aria-selected", false), this.selected = false, this.nativeOption && (this.nativeOption.selected = false);
    }
  }
  setNode(t) {
    this.node = t;
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
var cb = (s) => {
  s.code === "Tab" || s.code === "Esc" || s.preventDefault();
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
var J = "data-te-input-state-active";
var zt = "data-te-input-focused";
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

class kr {
  constructor(t, e, i) {
    this._element = t, this._config = this._getConfig(e), this._classes = this._getClasses(i), this._config.selectPlaceholder && !this._config.multiple && this._addPlaceholderOption(), this._optionsToRender = this._getOptionsToRender(t), this._plainOptions = this._getPlainOptions(this._optionsToRender), this._filteredOptionsList = null, this._selectionModel = new Ug(this.multiple), this._activeOptionIndex = -1, this._activeOption = null, this._wrapperId = et("select-wrapper-"), this._dropdownContainerId = et("select-dropdown-container-"), this._selectAllId = et("select-all-"), this._debounceTimeoutId = null, this._dropdownHeight = this._config.selectOptionHeight * this._config.selectVisibleOptions, this._popper = null, this._input = null, this._label = d.next(this._element, kb)[0], this._notch = null, this._fakeValue = null, this._isFakeValueActive = false, this._customContent = d.next(t, $b)[0], this._toggleButton = null, this._elementToggle = null, this._wrapper = null, this._inputEl = null, this._dropdownContainer = null, this._container = null, this._selectAllOption = null, this._init(), this._mutationObserver = null, this._isOpen = false, this._addMutationObserver(), this._element && A.setData(t, yi, this);
  }
  static get NAME() {
    return mo;
  }
  get filterInput() {
    return d.findOne(xb, this._dropdownContainer);
  }
  get dropdown() {
    return d.findOne(Ob, this._dropdownContainer);
  }
  get optionsList() {
    return d.findOne(wl, this._dropdownContainer);
  }
  get optionsWrapper() {
    return d.findOne(Sb, this._dropdownContainer);
  }
  get clearButton() {
    return d.findOne(Db, this._wrapper);
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
      ...Mb,
      ...e,
      ...t
    }, this._element.hasAttribute("multiple") && (t.multiple = true), this._element.hasAttribute("disabled") && (t.disabled = true), this._element.tabIndex && (t.tabIndex = this._element.getAttribute("tabIndex")), I(mo, t, Rb), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...Pb,
      ...e,
      ...t
    }, I(mo, t, Bb), t;
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
          id: et("group-"),
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
    const i = et("option-"), n = e.id ? e.id : null, o = e.disabled ? e.disabled : false, r = t.selected || t.hasAttribute(bi), a = t.hasAttribute("disabled") || o, l = t.hasAttribute("hidden") || e && e.hidden, p = this.multiple, u = t.value, _ = t.label, f = h.getDataAttribute(t, "selectSecondaryText"), g = h.getDataAttribute(t, "select-icon");
    return new bl(i, t, p, u, _, r, a, l, f, n, g);
  }
  _getNavigationOptions() {
    const t = this.options.filter((e) => !e.hidden);
    return this.hasSelectAll ? [this._selectAllOption, ...t] : t;
  }
  _init() {
    this._renderMaterialWrapper(), this._wrapper = d.findOne(`#${this._wrapperId}`), this._input = d.findOne(yl, this._wrapper), this._config.disabled && this._input.setAttribute(go, "");
    const t = this._config.selectContainer;
    t === "body" ? this._container = document.body : this._container = d.findOne(t), this._initOutlineInput(), this._setDefaultSelections(), this._updateInputValue(), this._appendFakeValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._bindComponentEvents(), this.hasSelectAll && (this._selectAllOption = this._createSelectAllOption()), this._dropdownContainer = vl(this._dropdownContainerId, this._config, this._input.offsetWidth, this._dropdownHeight, this._selectAllOption, this._optionsToRender, this._customContent, this._classes), this._setFirstActiveOption(), this._listenToFocusChange();
  }
  _renderMaterialWrapper() {
    const t = hb(this._wrapperId, this._config, this._label, this._classes, this._config.customArrow);
    this._element.parentNode.insertBefore(t, this._element), h.addClass(this._element, this._classes.initialized), t.appendChild(this._element);
  }
  _initOutlineInput() {
    const t = d.findOne(kl, this._wrapper);
    new V(t, {
      inputFormWhite: this._config.selectFormWhite
    }, this._classes).init(), this._notch = d.findOne(bo, this._wrapper);
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
    const e = t.keyCode, i = e === we || e === U && t.altKey || e === ke;
    if (e === ke && this._config.selectAutoSelect && !this.multiple && this._handleAutoSelection(this._activeOption), i) {
      this.close(), this._input.focus();
      return;
    }
    switch (e) {
      case z:
        this._setNextOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case U:
        this._setPreviousOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case Te:
        this._setFirstOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case Ee:
        this._setLastOptionActive(), this._scrollToOption(this._activeOption);
        break;
      case it:
        t.preventDefault(), this._activeOption && (this.hasSelectAll && this._activeOptionIndex === 0 ? this._handleSelectAll() : this._handleSelection(this._activeOption));
        return;
      default:
        return;
    }
    t.preventDefault();
  }
  _handleClosedKeydown(t) {
    const e = t.keyCode;
    if (e === it && t.preventDefault(), (e === it || e === z && t.altKey || e === z && this.multiple) && this.open(), this.multiple)
      switch (e) {
        case z:
          this.open();
          break;
        case U:
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
        case U:
          this._setPreviousOptionActive(), this._handleSelection(this._activeOption);
          break;
        case Te:
          this._setFirstOptionActive(), this._handleSelection(this._activeOption);
          break;
        case Ee:
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
      t.keyCode === it && (this._handleClear(), t.preventDefault(), t.stopPropagation());
    });
  }
  _handleClear() {
    if (this.multiple)
      this._selectionModel.clear(), this._deselectAllOptions(this.options), this.hasSelectAll && this._updateSelectAllState();
    else {
      const t = this._selectionModel.selection;
      this._selectionModel.clear(), t.deselect();
    }
    this._fakeValue.textContent = "", this._updateInputValue(), this._updateFakeLabelPosition(), this._updateLabelPosition(), this._updateClearButtonVisibility(), this._emitValueChangeEvent(null), this._emitNativeChangeEvent();
  }
  _listenToOptionsClick() {
    c.on(this.optionsWrapper, "click", (t) => {
      if (t.target.hasAttribute(yb))
        return;
      const i = t.target.nodeName === "DIV" ? t.target : d.closest(t.target, Ib);
      if (i.hasAttribute(wb)) {
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
    e && e !== t && (this._selectionModel.deselect(e), e.deselect(), e.node.setAttribute(bi, false), c.trigger(this._element, El, {
      value: e.value
    })), (!e || e && t !== e) && (this._selectionModel.select(t), t.select(), t.node.setAttribute(bi, true), c.trigger(this._element, Tl, {
      value: t.value
    }), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent());
  }
  _handleMultiSelection(t) {
    t.selected ? (this._selectionModel.deselect(t), t.deselect(), t.node.setAttribute(bi, false), c.trigger(this._element, El, {
      value: t.value
    })) : (this._selectionModel.select(t), t.select(), t.node.setAttribute(bi, true), c.trigger(this._element, Tl, {
      value: t.value
    })), this._emitValueChangeEvent(this.value), this._emitNativeChangeEvent();
  }
  _emitValueChangeEvent(t) {
    c.trigger(this._element, Cb, { value: t });
  }
  _emitNativeChangeEvent() {
    c.trigger(this._element, Ab);
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
    this._fakeValue = vb(t, this._classes), d.findOne(kl, this._wrapper).appendChild(this._fakeValue);
  }
  _updateLabelPosition() {
    const t = this._element.hasAttribute(Cl), e = this._input.value !== "";
    this._label && (t && (e || this._isOpen || this._isFakeValueActive) ? (this._label.setAttribute(J, ""), this._notch.setAttribute(J, "")) : (this._label.removeAttribute(J), this._notch.removeAttribute(J, "")));
  }
  _updateLabelPositionWhileClosing() {
    this._label && (this._input.value !== "" || this._isFakeValueActive ? (this._label.setAttribute(J, ""), this._notch.setAttribute(J, "")) : (this._label.removeAttribute(J), this._notch.removeAttribute(J)));
  }
  _updateFakeLabelPosition() {
    this._fakeValue && (this._input.value === "" && this._fakeValue.innerHTML !== "" && !this._config.selectPlaceholder ? (this._isFakeValueActive = true, this._fakeValue.setAttribute(J, "")) : (this._isFakeValueActive = false, this._fakeValue.removeAttribute(J)));
  }
  _updateClearButtonVisibility() {
    if (!this.clearButton)
      return;
    this._selectionModel.selection || this._selectionModel.selections.length > 0 ? h.addStyle(this.clearButton, { display: "block" }) : h.addStyle(this.clearButton, { display: "none" });
  }
  _updateSelectAllState() {
    const t = this._selectAllOption.selected, e = Qo(this.options);
    !e && t ? this._selectAllOption.deselect() : e && !t && this._selectAllOption.select();
  }
  toggle() {
    this._isOpen ? this.close() : this.open();
  }
  open() {
    const t = this._config.disabled, e = c.trigger(this._element, Eb);
    this._isOpen || t || e.defaultPrevented || (this._openDropdown(), this._updateDropdownWidth(), this._setFirstActiveOption(), this._scrollToOption(this._activeOption), this._config.selectFilter && (setTimeout(() => {
      this.filterInput.focus();
    }, 0), this._listenToSelectSearch(), this._listenToDropdownKeydown()), this._listenToOptionsClick(), this._listenToOutsideClick(), this._listenToWindowResize(), this._isOpen = true, this._updateLabelPosition(), this._setInputActiveStyles());
  }
  _openDropdown() {
    this._popper = se(this._input, this._dropdownContainer, {
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
    this._input.setAttribute(zt, ""), d.findOne(bo, this._wrapper).setAttribute(zt, "");
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
    const e = d.findOne(wl, this._dropdownContainer) || d.findOne(Lb, this._dropdownContainer), i = Ah(t, this._selectAllOption, this._config, this._classes);
    this.optionsWrapper.removeChild(e), this.optionsWrapper.appendChild(i);
  }
  _getNoResultTemplate() {
    return `<div class="${this._classes.noResult}" ${xh} style="height: ${this._config.selectOptionHeight}px">${this._config.selectNoResultText}</div>`;
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
      c.off(this._input, "focus", () => this._notch.setAttribute(zt, "")), c.off(this._input, "blur", () => this._notch.removeAttribute(zt));
      return;
    }
    c.on(this._input, "focus", () => this._notch.setAttribute(zt, "")), c.on(this._input, "blur", () => this._notch.removeAttribute(zt));
  }
  _handleOutSideClick(t) {
    const e = this._wrapper && this._wrapper.contains(t.target), i = t.target === this._dropdownContainer, n = this._dropdownContainer && this._dropdownContainer.contains(t.target);
    let o;
    this._toggleButton || (this._elementToggle = d.find(Nb)), this._elementToggle && this._elementToggle.forEach((r) => {
      const a = h.getDataAttribute(r, "select-toggle");
      (a === this._element.id || this._element.classList.contains(a)) && (this._toggleButton = r, o = this._toggleButton.contains(t.target));
    }), !e && !i && !n && !o && this.close();
  }
  close() {
    const t = c.trigger(this._element, Tb), e = cn(this._dropdownContainer.children[0]);
    !this._isOpen || t.defaultPrevented || (this._config.selectFilter && this.hasSelectAll && (this._resetFilterState(), this._updateOptionsListTemplate(this._optionsToRender), this._config.multiple && this._updateSelectAllState()), this._removeDropdownEvents(), this.dropdown.removeAttribute(Al), setTimeout(() => {
      this._input.removeAttribute(zt), this._input.blur(), d.findOne(bo, this._wrapper).removeAttribute(zt), this._label && !this.hasSelection && (this._label.removeAttribute(J), this._notch.setAttribute(J, ""), this._input.removeAttribute(J), this._notch.removeAttribute(J)), this._updateLabelPositionWhileClosing();
    }, 0), setTimeout(() => {
      this._container && this._dropdownContainer.parentNode === this._container && this._container.removeChild(this._dropdownContainer), this._popper.destroy(), this._isOpen = false, c.off(this.dropdown, "transitionend");
    }, e));
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
    this._isOpen && !t ? (this._updateOptionsListTemplate(this._optionsToRender), this._setFirstActiveOption()) : this._isOpen && t ? (this._filterOptions(this.filterInput.value), this._setFirstActiveOption()) : this._dropdownContainer = vl(this._dropdownContainerId, this._config, this._input.offsetWidth, this._dropdownHeight, this._selectAllOption, this._optionsToRender, this._customContent, this._classes);
  }
  _updateDisabledState() {
    const t = d.findOne(yl, this._wrapper);
    this._element.hasAttribute("disabled") ? (this._config.disabled = true, t.setAttribute("disabled", ""), t.setAttribute(go, "")) : (this._config.disabled = false, t.removeAttribute("disabled"), t.removeAttribute(go));
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
    const t = this._selectAllId, e = null, i = true, n = "select-all", o = this._config.selectAllLabel, r = Qo(this.options), a = false, l = false, p = null, u = null, _ = null;
    return new bl(t, e, i, n, o, r, a, l, p, u, _);
  }
  dispose() {
    this._removeComponentEvents(), this._destroyMaterialSelect(), this._listenToFocusChange(false), A.removeData(this._element, yi);
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
      i.removeAttribute(J);
    }), h.removeClass(this._element, this._classes.initialized), this._element.removeAttribute(Cl), t.removeChild(this._wrapper);
  }
  setValue(t) {
    this.options.filter((i) => i.selected).forEach((i) => i.nativeOption.selected = false), Array.isArray(t) ? t.forEach((i) => {
      this._selectByValue(i);
    }) : this._selectByValue(t), this._updateSelections(), this._emitValueChangeEvent(this.value);
  }
  _selectByValue(t) {
    const e = this.options.find((i) => i.value === t);
    return e ? (e.nativeOption.selected = true, true) : false;
  }
  static jQueryInterface(t, e) {
    return this.each(function() {
      let i = A.getData(this, yi);
      const n = typeof t == "object" && t;
      if (!(!i && /dispose/.test(t)) && (i || (i = new kr(this, n)), typeof t == "string")) {
        if (typeof i[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        i[t](e);
      }
    });
  }
  static getInstance(t) {
    return A.getData(t, yi);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
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
var bt = `${Gi}-active`;
var Ol = `${Gi}-initial`;
var Sh = `${Gi}-placeholder`;
var qb = `${Gi}-input-wrapper`;
var Jo = "data-te-chip-init";
var Ih = "data-te-chip-close";
var Dh = "data-te-chip-text";
var Zb = `[${bt}]`;
var tr = `[${Jo}]`;
var Qb = `${tr}${Zb}`;
var To = `[${Ih}]`;
var Jb = `[${qb}]`;
var tv = `[${Dh}]`;
var ev = `[${Sh}]`;
var iv = "data-te-input-notch-leading-ref";
var sv = "data-te-input-notch-middle-ref";
var nv = `[${iv}]`;
var ov = `[${sv}]`;
var uv = {
  inputID: et("chips-input-"),
  parentSelector: "",
  initialValues: [{ tag: "init1" }, { tag: "init2" }],
  editable: false,
  labelText: "Example label",
  inputClasses: {},
  inputOptions: {}
};
var Ut = {
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
      ...Ut,
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
      ...Ut,
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
      ...Ut,
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
      ...Ut,
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
      ...Ut,
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
      ...Ut,
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
      ...Ut,
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
      ...Ut,
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
var fv = function(t) {
  return mv(t) && !gv(t);
};
var bv = typeof Symbol == "function" && Symbol.for;
var vv = bv ? Symbol.for("react.element") : 60103;
ii.all = function(t, e) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(i, n) {
    return ii(i, n, e);
  }, {});
};
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
var Ll = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
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
var Nh = { x: null, y: null };
var qi = function(t) {
  this.element = t, this.handlers = {};
};
var Ph = { isEmpty: { configurable: true } };
qi.prototype.bind = function(t, e) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, false);
};
qi.prototype.unbind = function(t, e) {
  var i = this;
  this.handlers[t] = this.handlers[t].filter(function(n) {
    return e && n !== e ? true : (i.element.removeEventListener(t, n, false), false);
  });
};
qi.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
Ph.isEmpty.get = function() {
  var s = this;
  return Object.keys(this.handlers).every(function(t) {
    return s.handlers[t].length === 0;
  });
};
Object.defineProperties(qi.prototype, Ph);
var li = function() {
  this.eventElements = [];
};
li.prototype.eventElement = function(t) {
  var e = this.eventElements.filter(function(i) {
    return i.element === t;
  })[0];
  return e || (e = new qi(t), this.eventElements.push(e)), e;
};
li.prototype.bind = function(t, e, i) {
  this.eventElement(t).bind(e, i);
};
li.prototype.unbind = function(t, e, i) {
  var n = this.eventElement(t);
  n.unbind(e, i), n.isEmpty && this.eventElements.splice(this.eventElements.indexOf(n), 1);
};
li.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
li.prototype.once = function(t, e, i) {
  var n = this.eventElement(t), o = function(r) {
    n.unbind(e, o), i(r);
  };
  n.bind(e, o);
};
var Ve = {
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
var Zi = function(t, e) {
  var i = this;
  if (e === undefined && (e = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(j.main), this.settings = Wv();
  for (var n in e)
    this.settings[n] = e[n];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var o = function() {
    return t.classList.add(j.state.focus);
  }, r = function() {
    return t.classList.remove(j.state.focus);
  };
  this.isRtl = Nt(t).direction === "rtl", this.isRtl === true && t.classList.add(j.rtl), this.isNegativeScroll = function() {
    var p = t.scrollLeft, u = null;
    return t.scrollLeft = -1, u = t.scrollLeft < 0, t.scrollLeft = p, u;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new li, this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = Is(j.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = Is(j.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", o), this.event.bind(this.scrollbarX, "blur", r), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var a = Nt(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(a.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = false, this.scrollbarXTop = F(a.top)) : this.isScrollbarXUsingBottom = true, this.railBorderXWidth = F(a.borderLeftWidth) + F(a.borderRightWidth), ct(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = F(a.marginLeft) + F(a.marginRight), ct(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = Is(j.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = Is(j.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", o), this.event.bind(this.scrollbarY, "blur", r), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var l = Nt(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(l.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = false, this.scrollbarYLeft = F(l.left)) : this.isScrollbarYUsingRight = true, this.scrollbarYOuterWidth = this.isRtl ? Nv(this.scrollbarY) : null, this.railBorderYWidth = F(l.borderTopWidth) + F(l.borderBottomWidth), ct(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = F(l.marginTop) + F(l.marginBottom), ct(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = true, this.settings.handlers.forEach(function(p) {
    return Fv[p](i);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(p) {
    return i.onScroll(p);
  }), Ht(this);
};
Zi.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, ct(this.scrollbarXRail, { display: "block" }), ct(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = F(Nt(this.scrollbarXRail).marginLeft) + F(Nt(this.scrollbarXRail).marginRight), this.railYMarginHeight = F(Nt(this.scrollbarYRail).marginTop) + F(Nt(this.scrollbarYRail).marginBottom), ct(this.scrollbarXRail, { display: "none" }), ct(this.scrollbarYRail, { display: "none" }), Ht(this), fn(this, "top", 0, false, true), fn(this, "left", 0, false, true), ct(this.scrollbarXRail, { display: "" }), ct(this.scrollbarYRail, { display: "" }));
};
Zi.prototype.onScroll = function(t) {
  this.isAlive && (Ht(this), fn(this, "top", this.element.scrollTop - this.lastScrollTop), fn(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
Zi.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Ye(this.scrollbarX), Ye(this.scrollbarY), Ye(this.scrollbarXRail), Ye(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = false);
};
Zi.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
var Ao = "perfectScrollbar";
var Yv = "perfect-scrollbar";
var $s = "te.perfectScrollbar";
var St = "te";
var It = "ps";
var yo = [
  { te: `scrollX.${St}.${It}`, ps: "ps-scroll-x" },
  { te: `scrollY.${St}.${It}`, ps: "ps-scroll-y" },
  { te: `scrollUp.${St}.${It}`, ps: "ps-scroll-up" },
  { te: `scrollDown.${St}.${It}`, ps: "ps-scroll-down" },
  { te: `scrollLeft.${St}.${It}`, ps: "ps-scroll-left" },
  { te: `scrollRight.${St}.${It}`, ps: "ps-scroll-right" },
  { te: `scrollXEnd.${St}.${It}`, ps: "ps-x-reach-end" },
  { te: `scrollYEnd.${St}.${It}`, ps: "ps-y-reach-end" },
  { te: `scrollXStart.${St}.${It}`, ps: "ps-x-reach-start" },
  { te: `scrollYStart.${St}.${It}`, ps: "ps-y-reach-start" }
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

class xr {
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
    ], this._element && (A.setData(t, $s, this), h.addClass(this._element, Yv)), this.init();
  }
  static get NAME() {
    return Ao;
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
      ...jv,
      ...e,
      ...t
    }, I(Ao, t, Kv), t;
  }
  _getClasses(t) {
    const e = h.getDataClassAttributes(this._element);
    return t = {
      ...zv,
      ...e,
      ...t
    }, I(Ao, t, Uv), t;
  }
  dispose() {
    this._options.positionRight && this._observer.disconnect(), A.removeData(this._element, $s), this._element = null, this._dataAttrOptions = null, this._options = null, this.perfectScrollbar.destroy(), this.removeEvent(yo), this.perfectScrollbar = null;
  }
  init() {
    if (this.perfectScrollbar = new Zi(this._element, this._options), this._addPerfectScrollbarStyles(), this._updateScrollPosition(), this.perfectScrollbar.update(), this._initEvents(yo), this._options.positionRight) {
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
    typeof t == "string" && (e = yo.filter(({ te: i }) => i === t)), e.forEach(({ ps: i, te: n }) => {
      c.off(this._element, i), c.off(this._element, n);
    });
  }
  static jQueryInterface(t) {
    return this.each(function() {
      let e = A.getData(this, $s);
      const i = typeof t == "object" && t;
      if (!(!e && /dispose|hide/.test(t)) && (e || (e = new xr(this, i)), typeof t == "string")) {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static getInstance(t) {
    return A.getData(t, $s);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
}
var Bh = xr;
var Vi = "datatable";
var gt = `data-te-${Vi}`;
var ki = `te.${Vi}`;
var An = `.${ki}`;
var uT = `[${gt}-inner-ref]`;
var wo = `[${gt}-cell-ref]`;
var pT = `[${gt}-header-ref]`;
var _T = `[${gt}-header-checkbox-ref]`;
var fT = `[${gt}-pagination-right-ref]`;
var mT = `[${gt}-pagination-left-ref]`;
var gT = `[${gt}-pagination-start-ref]`;
var bT = `[${gt}-pagination-end-ref]`;
var vT = `[${gt}-pagination-nav-ref]`;
var TT = `[${gt}-select-ref]`;
var ko = `[${gt}-sort-icon-ref]`;
var Ti = `[${gt}-row-ref]`;
var xo = `[${gt}-row-checkbox-ref]`;
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
var Me = `click${WE}${FE}`;
var Fh = "[data-te-lightbox-init]";
var YE = `${Fh} img:not([data-te-lightbox-disabled])`;
var ir = "te.validation";
var yn = `.${ir}`;
var Yh = "data-te-validate";
var n0 = "data-te-submit-btn-ref";
var o0 = `[${Yh}]`;
var a0 = `[${n0}]`;
var l0 = `validated${yn}`;
var c0 = `valid${yn}`;
var h0 = `invalid${yn}`;
var d0 = `changed${yn}`;
var Zt = "pan";
var A0 = `${Zt}start`;
var y0 = `${Zt}end`;
var w0 = `${Zt}move`;
var Ue = "pinch";
var D0 = `${Ue}end`;
var $0 = `${Ue}start`;
var L0 = `${Ue}move`;
var Wi = "rotate";
var V0 = `${Wi}end`;
var W0 = `${Wi}start`;
var sr = "touch";
var Mo = `te.${sr}`;
var nr = "smoothScroll";
var Si = `te.${nr}`;
var Or = `.${Si}`;
var G0 = `scrollStart${Or}`;
var q0 = `scrollEnd${Or}`;
var Z0 = `scrollCancel${Or}`;
var Ii = "te.clipboard";
var sC = `.${Ii}`;
var rC = `copy${sC}`;
var rr = "infiniteScroll";
var Bs = `te.${rr}`;
var Fi = "loadingManagement";
var Hs = `te.${Fi}`;
var uC = `show.te.${Fi}`;
var on = "datetimepicker";
var Di = `te.${on}`;
var Sr = `.${Di}`;
var qh = "data-te-datepicker-init";
var Zh = "data-te-timepicker-init";
var DC = "data-te-date-timepicker-toggle-ref";
var LC = "data-te-timepicker-toggle-button-ref";
var NC = `[${Zh}]`;
var MC = `[${qh}]`;
var RC = `[${DC}]`;
var PC = `[${LC}]`;
var FC = `open${Sr}`;
var YC = `close${Sr}`;
var jC = `datetimeChange${Sr}`;
var Re = $("div");
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
var xA = (s) => {
  gc(() => {
    const t = mc();
    if (t) {
      const e = s.NAME, i = t.fn[e];
      t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = i, s.jQueryInterface);
    }
  });
};
var OA = (s, t) => {
  c.on(document, `click.te.${s.NAME}`, t, function(e) {
    e.preventDefault(), s.getOrCreateInstance(this).toggle();
  });
};
var SA = (s, t) => {
  c.on(document, `click.te.${s.NAME}.data-api`, t, function(e) {
    if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), be(this))
      return;
    s.getOrCreateInstance(this).show();
  });
};
var IA = (s, t) => {
  c.on(document, `click.te.${s.NAME}.data-api`, t, function(e) {
    const i = te(this);
    if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), be(this))
      return;
    c.one(i, s.EVENT_HIDDEN, () => {
      Mt(this) && this.focus();
    });
    const n = d.findOne(s.OPEN_SELECTOR);
    n && n !== i && s.getInstance(n).hide(), s.getOrCreateInstance(i).toggle(this);
  });
};
var DA = (s, t) => {
  c.on(document, `click.te.${s.NAME}`, t, (e) => {
    e.preventDefault();
    const i = e.target.closest(t);
    s.getOrCreateInstance(i).toggle();
  });
};
var $A = (s, t) => {
  c.on(document, `click.te.${s.NAME}`, t, function(e) {
    const i = te(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), c.one(i, s.EVENT_SHOW, (r) => {
      r.defaultPrevented || c.one(i, s.EVENT_HIDDEN, () => {
        Mt(this) && this.focus();
      });
    });
    const n = d.findOne(`[${s.OPEN_SELECTOR}="true"]`);
    n && s.getInstance(n).hide(), s.getOrCreateInstance(i).toggle(this);
  });
};
var LA = (s, t) => {
  c.one(document, "mousedown", t, s.autoInitial(new s));
};
var NA = (s, t) => {
  c.on(document, `click.te.${s.NAME}.data-api`, t, function(e) {
    (e.target.tagName === "A" || e.delegateTarget && e.delegateTarget.tagName === "A") && e.preventDefault();
    const i = lr(this);
    d.find(i).forEach((o) => {
      s.getOrCreateInstance(o, { toggle: false }).toggle();
    });
  });
};
var MA = (s, t) => {
  [].slice.call(document.querySelectorAll(t)).map(function(i) {
    return new s(i);
  });
};
var RA = (s, t) => {
  [].slice.call(document.querySelectorAll(t)).map(function(i) {
    return new s(i);
  });
};
var PA = (s, t) => {
  d.find(t).forEach((e) => {
    new s(e);
  }), c.on(document, `click.te.${s.NAME}.data-api`, `${t} img:not([data-te-lightbox-disabled])`, s.toggle());
};
var BA = (s, t) => {
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
        ...wi[a.type]
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
  isInited(t) {
    return this.inits.includes(t);
  }
  add(t) {
    this.isInited(t) || this.inits.push(t);
  }
}
var ar = new HA;
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
var VA = (s) => Ni[s.NAME] || null;
var WA = (s, t) => {
  if (!s || !t.allowReinits && ar.isInited(s.NAME))
    return;
  ar.add(s.NAME);
  const e = VA(s), i = (e == null ? undefined : e.isToggler) || false;
  if (xA(s), e != null && e.advanced) {
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
var FA = (s, t) => {
  s.forEach((e) => WA(e, t));
};
var YA = {
  allowReinits: false,
  checkOtherImports: false
};
var qA = (s, t = {}) => {
  t = { ...YA, ...t };
  const e = Object.keys(Ni).map((i) => {
    if (!!document.querySelector(Ni[i].selector)) {
      const o = s[Ni[i].name];
      return !o && !ar.isInited(i) && t.checkOtherImports && console.warn(`Please import ${Ni[i].name} from "tw-elements" package and add it to a object parameter inside "initTE" function`), o;
    }
  });
  FA(e, t);
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
qA({ Carousel: Xt, Datepicker: og, Select: kr, Timepicker: Sg, Input: V, Sidenav: Ci }, { allowReinits: true }, false);
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
  qA({ Select: kr }, { allowReinits: true }, false);
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
