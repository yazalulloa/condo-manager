var U = Object.defineProperty;
var D = (e, t, n) => t in e ? U(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var d = (e, t, n) => (D(e, typeof t != "symbol" ? t + "" : t, n), n);
function b() {
}
function q(e) {
  return e();
}
function I() {
  return /* @__PURE__ */ Object.create(null);
}
function x(e) {
  e.forEach(q);
}
function z(e) {
  return typeof e == "function";
}
function H(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function F(e) {
  return Object.keys(e).length === 0;
}
function G(e, ...t) {
  if (e == null) {
    for (const i of t)
      i(void 0);
    return b;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function K(e, t, n) {
  e.$$.on_destroy.push(G(t, n));
}
function h(e, t) {
  e.appendChild(t);
}
function J(e, t, n) {
  e.insertBefore(t, n || null);
}
function P(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function g(e) {
  return document.createElement(e);
}
function N(e) {
  return document.createTextNode(e);
}
function C() {
  return N(" ");
}
function A(e, t, n, i) {
  return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
}
function O(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function Q(e) {
  return Array.from(e.childNodes);
}
function W(e, t) {
  t = "" + t, e.data !== t && (e.data = /** @type {string} */
  t);
}
function X(e) {
  const t = {};
  return e.childNodes.forEach(
    /** @param {Element} node */
    (n) => {
      t[n.slot || "default"] = !0;
    }
  ), t;
}
let B;
function E(e) {
  B = e;
}
const y = [], R = [];
let w = [];
const T = [], Y = /* @__PURE__ */ Promise.resolve();
let S = !1;
function Z() {
  S || (S = !0, Y.then(M));
}
function V(e) {
  w.push(e);
}
const L = /* @__PURE__ */ new Set();
let p = 0;
function M() {
  if (p !== 0)
    return;
  const e = B;
  do {
    try {
      for (; p < y.length; ) {
        const t = y[p];
        p++, E(t), tt(t.$$);
      }
    } catch (t) {
      throw y.length = 0, p = 0, t;
    }
    for (E(null), y.length = 0, p = 0; R.length; )
      R.pop()();
    for (let t = 0; t < w.length; t += 1) {
      const n = w[t];
      L.has(n) || (L.add(n), n());
    }
    w.length = 0;
  } while (y.length);
  for (; T.length; )
    T.pop()();
  S = !1, L.clear(), E(e);
}
function tt(e) {
  if (e.fragment !== null) {
    e.update(), x(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(V);
  }
}
function et(e) {
  const t = [], n = [];
  w.forEach((i) => e.indexOf(i) === -1 ? t.push(i) : n.push(i)), n.forEach((i) => i()), w = t;
}
const nt = /* @__PURE__ */ new Set();
function st(e, t) {
  e && e.i && (nt.delete(e), e.i(t));
}
function it(e, t, n) {
  const { fragment: i, after_update: c } = e.$$;
  i && i.m(t, n), V(() => {
    const s = e.$$.on_mount.map(q).filter(z);
    e.$$.on_destroy ? e.$$.on_destroy.push(...s) : x(s), e.$$.on_mount = [];
  }), c.forEach(V);
}
function rt(e, t) {
  const n = e.$$;
  n.fragment !== null && (et(n.after_update), x(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function ct(e, t) {
  e.$$.dirty[0] === -1 && (y.push(e), Z(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function ot(e, t, n, i, c, s, o = null, u = [-1]) {
  const $ = B;
  E(e);
  const r = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: s,
    update: b,
    not_equal: c,
    bound: I(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || ($ ? $.$$.context : [])),
    // everything else
    callbacks: I(),
    dirty: u,
    skip_bound: !1,
    root: t.target || $.$$.root
  };
  o && o(r.root);
  let l = !1;
  if (r.ctx = n ? n(e, t.props || {}, (f, k, ...a) => {
    const _ = a.length ? a[0] : k;
    return r.ctx && c(r.ctx[f], r.ctx[f] = _) && (!r.skip_bound && r.bound[f] && r.bound[f](_), l && ct(e, f)), k;
  }) : [], r.update(), l = !0, x(r.before_update), r.fragment = i ? i(r.ctx) : !1, t.target) {
    if (t.hydrate) {
      const f = Q(t.target);
      r.fragment && r.fragment.l(f), f.forEach(P);
    } else
      r.fragment && r.fragment.c();
    t.intro && st(e.$$.fragment), it(e, t.target, t.anchor), M();
  }
  E($);
}
let v;
typeof HTMLElement == "function" && (v = class extends HTMLElement {
  constructor(t, n, i) {
    super();
    /** The Svelte component constructor */
    d(this, "$$ctor");
    /** Slots */
    d(this, "$$s");
    /** The Svelte component instance */
    d(this, "$$c");
    /** Whether or not the custom element is connected */
    d(this, "$$cn", !1);
    /** Component props data */
    d(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    d(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    d(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    d(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    d(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = t, this.$$s = n, i && this.attachShadow({ mode: "open" });
  }
  addEventListener(t, n, i) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(n), this.$$c) {
      const c = this.$$c.$on(t, n);
      this.$$l_u.set(n, c);
    }
    super.addEventListener(t, n, i);
  }
  removeEventListener(t, n, i) {
    if (super.removeEventListener(t, n, i), this.$$c) {
      const c = this.$$l_u.get(n);
      c && (c(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let t = function(s) {
        return () => {
          let o;
          return {
            c: function() {
              o = g("slot"), s !== "default" && O(o, "name", s);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(r, l) {
              J(r, o, l);
            },
            d: function(r) {
              r && P(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, i = X(this);
      for (const s of this.$$s)
        s in i && (n[s] = [t(s)]);
      for (const s of this.attributes) {
        const o = this.$$g_p(s.name);
        o in this.$$d || (this.$$d[o] = j(o, s.value, this.$$p_d, "toProp"));
      }
      for (const s in this.$$p_d)
        !(s in this.$$d) && this[s] !== void 0 && (this.$$d[s] = this[s], delete this[s]);
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: n,
          $$scope: {
            ctx: []
          }
        }
      });
      const c = () => {
        this.$$r = !0;
        for (const s in this.$$p_d)
          if (this.$$d[s] = this.$$c.$$.ctx[this.$$c.$$.props[s]], this.$$p_d[s].reflect) {
            const o = j(
              s,
              this.$$d[s],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[s].attribute || s) : this.setAttribute(this.$$p_d[s].attribute || s, o);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(c), c();
      for (const s in this.$$l)
        for (const o of this.$$l[s]) {
          const u = this.$$c.$on(s, o);
          this.$$l_u.set(o, u);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(t, n, i) {
    var c;
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = j(t, i, this.$$p_d, "toProp"), (c = this.$$c) == null || c.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      this.$$cn || (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(t) {
    return Object.keys(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === t || !this.$$p_d[n].attribute && n.toLowerCase() === t
    ) || t;
  }
});
function j(e, t, n, i) {
  var s;
  const c = (s = n[e]) == null ? void 0 : s.type;
  if (t = c === "Boolean" && typeof t != "boolean" ? t != null : t, !i || !n[e])
    return t;
  if (i === "toAttribute")
    switch (c) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (c) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function ut(e, t, n, i, c, s) {
  let o = class extends v {
    constructor() {
      super(e, n, c), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Object.keys(t).map(
        (u) => (t[u].attribute || u).toLowerCase()
      );
    }
  };
  return Object.keys(t).forEach((u) => {
    Object.defineProperty(o.prototype, u, {
      get() {
        return this.$$c && u in this.$$c ? this.$$c[u] : this.$$d[u];
      },
      set($) {
        var r;
        $ = j(u, $, t), this.$$d[u] = $, (r = this.$$c) == null || r.$set({ [u]: $ });
      }
    });
  }), i.forEach((u) => {
    Object.defineProperty(o.prototype, u, {
      get() {
        var $;
        return ($ = this.$$c) == null ? void 0 : $[u];
      }
    });
  }), s && (o = s(o)), e.element = /** @type {any} */
  o, o;
}
class $t {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    d(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    d(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    rt(this, 1), this.$destroy = b;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!z(n))
      return b;
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return i.push(n), () => {
      const c = i.indexOf(n);
      c !== -1 && i.splice(c, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !F(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const lt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(lt);
const m = [];
function ft(e, t = b) {
  let n;
  const i = /* @__PURE__ */ new Set();
  function c(u) {
    if (H(e, u) && (e = u, n)) {
      const $ = !m.length;
      for (const r of i)
        r[1](), m.push(r, e);
      if ($) {
        for (let r = 0; r < m.length; r += 2)
          m[r][0](m[r + 1]);
        m.length = 0;
      }
    }
  }
  function s(u) {
    c(u(e));
  }
  function o(u, $ = b) {
    const r = [u, $];
    return i.add(r), i.size === 1 && (n = t(c, s) || b), u(e), () => {
      i.delete(r), i.size === 0 && n && (n(), n = null);
    };
  }
  return { set: c, update: s, subscribe: o };
}
function dt(e) {
  let t, n, i, c, s, o, u, $, r, l, f, k;
  return {
    c() {
      t = g("div"), n = g("span"), i = N(
        /*$count*/
        e[0]
      ), c = C(), s = g("button"), s.textContent = "-", o = C(), u = g("button"), u.textContent = "+", $ = C(), r = g("button"), l = N("Reset"), O(s, "type", "button"), O(u, "type", "button"), O(r, "type", "button"), r.disabled = /*isInitialValue*/
      e[1];
    },
    m(a, _) {
      J(a, t, _), h(t, n), h(n, i), h(t, c), h(t, s), h(t, o), h(t, u), h(t, $), h(t, r), h(r, l), f || (k = [
        A(
          s,
          "click",
          /*decrement*/
          e[4]
        ),
        A(
          u,
          "click",
          /*increment*/
          e[3]
        ),
        A(
          r,
          "click",
          /*reset*/
          e[5]
        )
      ], f = !0);
    },
    p(a, [_]) {
      _ & /*$count*/
      1 && W(
        i,
        /*$count*/
        a[0]
      ), _ & /*isInitialValue*/
      2 && (r.disabled = /*isInitialValue*/
      a[1]);
    },
    i: b,
    o: b,
    d(a) {
      a && P(t), f = !1, x(k);
    }
  };
}
function at(e, t, n) {
  let i, c, { initialValue: s = 0 } = t, o = ft(s);
  K(e, o, (l) => n(0, c = l));
  const u = () => o.update((l) => l += 1), $ = () => o.update((l) => l -= 1), r = () => o.set(s);
  return e.$$set = (l) => {
    "initialValue" in l && n(6, s = l.initialValue);
  }, e.$$.update = () => {
    e.$$.dirty & /*$count, initialValue*/
    65 && n(1, i = c === s);
  }, [c, i, o, u, $, r, s];
}
class ht extends $t {
  constructor(t) {
    super(), ot(this, t, at, dt, H, { initialValue: 6 });
  }
  get initialValue() {
    return this.$$.ctx[6];
  }
  set initialValue(t) {
    this.$$set({ initialValue: t }), M();
  }
}
customElements.define("svelte-counter", ut(ht, { initialValue: {} }, [], [], !0));
export {
  ht as Counter
};
//# sourceMappingURL=components.js.map
