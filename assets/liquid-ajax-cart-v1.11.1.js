var t = {
    d: (e, r) => {
      for (var o in r)
        t.o(r, o) &&
          !t.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: r[o] })
    },
    o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  },
  e = {}
t.d(e, {
  x$: () => vt,
  nd: () => wt,
  yF: () => St,
  fi: () => At,
  Be: () => Ct,
  ih: () => qt,
  KJ: () => jt,
  Q4: () => $t,
  WP: () => Lt,
  w0: () => xt,
})
const r = 'add',
  o = 'change',
  n = 'update',
  i = 'clear',
  s = 'get',
  a = [],
  u = [],
  c = []
function l(t) {
  var e
  ;(null === (e = t.options) || void 0 === e ? void 0 : e.newQueue) ||
  0 === c.length
    ? 1 === c.push([t]) && (f(!0), d())
    : c[0].push(t)
}
function d() {
  if (0 === c.length) return void f(!1)
  if (0 === c[0].length) return c.shift(), void d()
  const { requestType: t, body: e, options: o } = c[0][0]
  !(function (t, e, o, n = undefined) {
    const i = v(t)
    let u
    t !== s && (u = e || {})
    const c = t === s ? 'GET' : 'POST',
      l = o.info || {},
      d = 'firstComplete' in o ? [o.firstComplete] : [],
      f = { requestType: t, endpoint: i, requestBody: u, info: l },
      y = []
    if (
      (a.forEach((e) => {
        try {
          e({ requestType: t, endpoint: i, info: l, requestBody: u }, (t) => {
            d.push(t)
          })
        } catch (t) {
          console.error(
            'Liquid Ajax Cart: Error during Ajax request subscriber callback in ajax-api'
          ),
            console.error(t)
        }
      }),
      'lastComplete' in o && d.push(o.lastComplete),
      l.cancel)
    )
      return void p(d, n, f)
    if (void 0 !== u) {
      let e
      if (
        (u instanceof FormData || u instanceof URLSearchParams
          ? u.has('sections') && (e = u.get('sections').toString())
          : (e = u.sections),
        'string' == typeof e || e instanceof String || Array.isArray(e))
      ) {
        const o = []
        if (
          (Array.isArray(e) ? o.push(...e) : o.push(...e.split(',')),
          r === t && y.push(...o.slice(0, 5)),
          o.length > 5)
        ) {
          y.push(...o.slice(5))
          const t = o.slice(0, 5).join(',')
          u instanceof FormData || u instanceof URLSearchParams
            ? u.set('sections', t)
            : (u.sections = t)
        }
      } else
        null != e &&
          console.error(
            `Liquid Ajax Cart: "sections" parameter in a Cart Ajax API request must be a string or an array. Now it is ${e}`
          )
    }
    const b = { method: c }
    t !== s &&
      (u instanceof FormData || u instanceof URLSearchParams
        ? ((b.body = u), (b.headers = { 'x-requested-with': 'XMLHttpRequest' }))
        : ((b.body = JSON.stringify(u)),
          (b.headers = { 'Content-Type': 'application/json' }))),
      fetch(i, b)
        .then((t) =>
          t.json().then((e) => ({ ok: t.ok, status: t.status, body: e }))
        )
        .then(
          (e) => (
            (f.responseData = e),
            (r !== t && 0 === y.length) || !f.responseData.ok
              ? f
              : m(y).then((t) => ((f.extraResponseData = t), f))
          )
        )
        .catch((t) => {
          console.error(
            'Liquid Ajax Cart: Error while performing cart Ajax request'
          ),
            console.error(t),
            (f.fetchError = t)
        })
        .finally(() => {
          p(d, n, f)
        })
  })(t, e, o, () => {
    c[0].shift(), d()
  })
}
function f(t) {
  u.forEach((e) => {
    try {
      e(t)
    } catch (t) {
      console.error(
        'Liquid Ajax Cart: Error during queues subscriber callback in ajax-api'
      ),
        console.error(t)
    }
  })
}
function p(t, e, r) {
  if (
    (t.forEach((t) => {
      try {
        t(r)
      } catch (t) {
        console.error(
          'Liquid Ajax Cart: Error during Ajax request result callback in ajax-api'
        ),
          console.error(t)
      }
    }),
    e)
  )
    try {
      e()
    } catch (t) {
      console.error(
        'Liquid Ajax Cart: Error during Ajax request final internal callback in ajax-api'
      ),
        console.error(t)
    }
}
function m(t = []) {
  const e = {}
  return (
    t.length > 0 && (e.sections = t.slice(0, 5).join(',')),
    fetch(v(n), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(e),
    }).then((e) =>
      e.json().then((r) => {
        const o = { ok: e.ok, status: e.status, body: r }
        return t.length < 6
          ? o
          : m(t.slice(5)).then((t) => {
              var e
              return (
                t.ok &&
                  (null === (e = t.body) || void 0 === e
                    ? void 0
                    : e.sections) &&
                  'object' == typeof t.body.sections &&
                  ('sections' in o.body || (o.body.sections = {}),
                  (o.body.sections = Object.assign(
                    Object.assign({}, o.body.sections),
                    t.body.sections
                  ))),
                o
              )
            })
      })
    )
  )
}
function y(t = {}) {
  l({ requestType: s, body: void 0, options: t })
}
function b(t = {}, e = {}) {
  l({ requestType: r, body: t, options: e })
}
function h(t = {}, e = {}) {
  l({ requestType: o, body: t, options: e })
}
function g(t = {}, e = {}) {
  l({ requestType: n, body: t, options: e })
}
function q(t = {}, e = {}) {
  l({ requestType: i, body: t, options: e })
}
function A(t) {
  a.push(t)
}
function v(t) {
  var e, a, u, c, l, d, f, p, m, y
  switch (t) {
    case r:
      return `${
        (null ===
          (a =
            null === (e = window.Shopify) || void 0 === e
              ? void 0
              : e.routes) || void 0 === a
          ? void 0
          : a.root) || '/'
      }cart/add.js`
    case o:
      return `${
        (null ===
          (c =
            null === (u = window.Shopify) || void 0 === u
              ? void 0
              : u.routes) || void 0 === c
          ? void 0
          : c.root) || '/'
      }cart/change.js`
    case s:
      return `${
        (null ===
          (d =
            null === (l = window.Shopify) || void 0 === l
              ? void 0
              : l.routes) || void 0 === d
          ? void 0
          : d.root) || '/'
      }cart.js`
    case i:
      return `${
        (null ===
          (p =
            null === (f = window.Shopify) || void 0 === f
              ? void 0
              : f.routes) || void 0 === p
          ? void 0
          : p.root) || '/'
      }cart/clear.js`
    case n:
      return `${
        (null ===
          (y =
            null === (m = window.Shopify) || void 0 === m
              ? void 0
              : m.routes) || void 0 === y
          ? void 0
          : y.root) || '/'
      }cart/update.js`
    default:
      return
  }
}
const w = []
let C,
  S = null,
  $ = { requestInProgress: !1, cartStateSet: !1 }
function j(t) {
  const { attributes: e, items: r, item_count: o } = t
  if (null == e || 'object' != typeof e) return null
  if ('number' != typeof o && !(o instanceof Number)) return null
  if (!Array.isArray(r)) return null
  const n = []
  for (let t = 0; t < r.length; t++) {
    const e = r[t]
    if ('number' != typeof e.id && !(e.id instanceof Number)) return null
    if ('string' != typeof e.key && !(e.key instanceof String)) return null
    if ('number' != typeof e.quantity && !(e.quantity instanceof Number))
      return null
    if (!('properties' in e)) return null
    n.push(
      Object.assign(Object.assign({}, e), {
        id: e.id,
        key: e.key,
        quantity: e.quantity,
        properties: e.properties,
      })
    )
  }
  return Object.assign(Object.assign({}, t), {
    attributes: e,
    items: n,
    item_count: o,
  })
}
function x(t) {
  w.push(t)
}
function L() {
  return { cart: S, status: $, previousCart: C }
}
const E = (t) => {
  w.forEach((e) => {
    try {
      e(L(), t)
    } catch (t) {
      console.error(
        'Liquid Ajax Cart: Error during a call of a cart state update subscriber'
      ),
        console.error(t)
    }
  })
}
function T(t) {
  const { binderAttribute: e } = F.computed
  t.status.cartStateSet &&
    document.querySelectorAll(`[${e}]`).forEach((t) => {
      const r = t.getAttribute(e)
      t.textContent = (function (t) {
        const { stateBinderFormatters: e } = F,
          { binderAttribute: r } = F.computed,
          [o, ...n] = t.split('|')
        let i = k(o, L())
        return (
          n.forEach((t) => {
            const r = t.trim()
            '' !== r &&
              ('object' == typeof e && r in e
                ? (i = e[r](i))
                : r in R
                ? (i = R[r](i))
                : console.warn(
                    `Liquid Ajax Cart: the "${r}" formatter is not found`
                  ))
          }),
          'string' == typeof i ||
          i instanceof String ||
          'number' == typeof i ||
          i instanceof Number
            ? i.toString()
            : (console.error(
                `Liquid Ajax Cart: the calculated value for the ${r}="${t}" element must be string or number. But the value is`,
                i
              ),
              '')
        )
      })(r)
    })
}
function k(t, e) {
  const r = t.split('.'),
    o = r.shift().trim()
  return '' !== o && o in e && r.length > 0 ? k(r.join('.'), e[o]) : e[o]
}
const R = {
    money_with_currency: (t) => {
      var e
      const r = L()
      if ('number' != typeof t && !(t instanceof Number))
        return (
          console.error(
            "Liquid Ajax Cart: the 'money_with_currency' formatter is not applied because the value is not a number. The value is ",
            t
          ),
          t
        )
      const o = t / 100
      return 'Intl' in window &&
        (null === (e = window.Shopify) || void 0 === e ? void 0 : e.locale)
        ? Intl.NumberFormat(window.Shopify.locale, {
            style: 'currency',
            currency: r.cart.currency,
          }).format(o)
        : `${o.toFixed(2)} ${r.cart.currency}`
    },
  },
  B = 'js-ajax-cart',
  D = 'data-ajax-cart',
  F = {
    productFormsFilter: (t) => !0,
    messageBuilder: (t) => {
      let e = ''
      return (
        t.forEach((t) => {
          e += `<div class="${B}-message ${B}-message--${t.type}">${t.text}</div>`
        }),
        e
      )
    },
    stateBinderFormatters: {},
    addToCartCssClass: '',
    requestErrorText:
      'There was an error while updating your cart. Please try again.',
    updateOnWindowFocus: !0,
    computed: {
      productFormsErrorsAttribute: `${D}-form-error`,
      sectionsAttribute: `${D}-section`,
      staticElementAttribute: `${D}-static-element`,
      binderAttribute: `${D}-bind-state`,
      requestButtonAttribute: `${D}-request-button`,
      toggleClassButtonAttribute: `${D}-toggle-class-button`,
      initialStateAttribute: `${D}-initial-state`,
      sectionScrollAreaAttribute: `${D}-section-scroll`,
      quantityInputAttribute: `${D}-quantity-input`,
      propertyInputAttribute: `${D}-property-input`,
      messagesAttribute: `${D}-messages`,
      configurationAttribute: `${D}-configuration`,
      cartStateSetBodyClass: `${B}-set`,
      requestInProgressBodyClass: `${B}-request-in-progress`,
      emptyCartBodyClass: `${B}-empty`,
      notEmptyCartBodyClass: `${B}-not-empty`,
      productFormsProcessingClass: `${B}-form-in-progress`,
    },
  }
function I(t, e) {
  t in F && 'computed' !== t
    ? ((F[t] = e), 'stateBinderFormatters' === t && T(L()))
    : console.error(`Liquid Ajax Cart: unknown configuration parameter "${t}"`)
}
const N = 'shopify-section-',
  P = []
var O, U, M, H, _, Q, J, W
const G = `${
    (null ===
      (U = null === (O = window.Shopify) || void 0 === O ? void 0 : O.routes) ||
    void 0 === U
      ? void 0
      : U.root) || '/'
  }cart/change`,
  V = `${
    (null ===
      (H = null === (M = window.Shopify) || void 0 === M ? void 0 : M.routes) ||
    void 0 === H
      ? void 0
      : H.root) || '/'
  }cart/add`,
  K = `${
    (null ===
      (Q = null === (_ = window.Shopify) || void 0 === _ ? void 0 : _.routes) ||
    void 0 === Q
      ? void 0
      : Q.root) || '/'
  }cart/clear`,
  z = `${
    (null ===
      (W = null === (J = window.Shopify) || void 0 === J ? void 0 : J.routes) ||
    void 0 === W
      ? void 0
      : W.root) || '/'
  }cart/update`
function X(t, e) {
  const { requestButtonAttribute: r } = F.computed
  let o
  const n = [G, V, K, z]
  if (!t.hasAttribute(r)) return
  const i = t.getAttribute(r)
  if (i) {
    let t
    try {
      if (((t = new URL(i, window.location.origin)), !n.includes(t.pathname)))
        throw `URL should be one of the following: ${G}, ${V}, ${z}, ${K}`
      o = t
    } catch (t) {
      console.error(
        `Liquid Ajax Cart: ${r} contains an invalid URL as a parameter.`,
        t
      )
    }
  } else if (t instanceof HTMLAnchorElement && t.hasAttribute('href')) {
    const e = new URL(t.href)
    n.includes(e.pathname)
      ? (o = e)
      : t.hasAttribute(r) &&
        console.error(
          `Liquid Ajax Cart: a link with the ${r} contains an invalid href URL.`,
          `URL should be one of the following: ${G}, ${V}, ${z}, ${K}`
        )
  }
  if (void 0 === o)
    return void console.error(
      `Liquid Ajax Cart: a ${r} element doesn't have a valid URL`
    )
  if ((e && e.preventDefault(), L().status.requestInProgress)) return
  const s = new FormData()
  switch (
    (o.searchParams.forEach((t, e) => {
      s.append(e, t)
    }),
    o.pathname)
  ) {
    case V:
      b(s, { newQueue: !0, info: { initiator: t } })
      break
    case G:
      h(s, { newQueue: !0, info: { initiator: t } })
      break
    case z:
      g(s, { newQueue: !0, info: { initiator: t } })
      break
    case K:
      q({}, { newQueue: !0, info: { initiator: t } })
  }
}
function Y(t, e) {
  let r, o
  return (
    e.status.cartStateSet &&
      (t.length > 3
        ? ((r = e.cart.items.find((e) => e.key === t)), (o = 'id'))
        : ((r = e.cart.items[Number(t) - 1]), (o = 'line')),
      void 0 === r &&
        ((r = null),
        console.error(
          `Liquid Ajax Cart: line item with ${o}="${t}" not found`
        ))),
    [r, o]
  )
}
function Z(t) {
  const { quantityInputAttribute: e } = F.computed
  return (
    !!t.hasAttribute(e) &&
    ((t instanceof HTMLInputElement &&
      ('text' === t.type || 'number' === t.type)) ||
      (console.error(
        `Liquid Ajax Cart: the ${e} attribute supports "input" elements only with the "text" and the "number" types`
      ),
      !1))
  )
}
function tt(t) {
  const { quantityInputAttribute: e } = F.computed
  t.status.requestInProgress
    ? document.querySelectorAll(`input[${e}]`).forEach((t) => {
        Z(t) && (t.disabled = !0)
      })
    : document.querySelectorAll(`input[${e}]`).forEach((r) => {
        if (!Z(r)) return
        const o = r.getAttribute(e).trim(),
          [n] = Y(o, t)
        n ? (r.value = n.quantity.toString()) : null === n && (r.value = '0'),
          (r.disabled = !1)
      })
}
function et(t, e) {
  const { quantityInputAttribute: r } = F.computed
  if (!Z(t)) return
  if ((e && e.preventDefault(), L().status.requestInProgress)) return
  let o = Number(t.value.trim())
  const n = t.getAttribute(r).trim()
  if (isNaN(o))
    return void console.error(
      'Liquid Ajax Cart: input value of a data-ajax-cart-quantity-input must be an Integer number'
    )
  if ((o < 1 && (o = 0), !n))
    return void console.error(
      'Liquid Ajax Cart: attribute value of a data-ajax-cart-quantity-input must be an item key or an item index'
    )
  const i = n.length > 3 ? 'id' : 'line',
    s = new FormData()
  s.set(i, n),
    s.set('quantity', o.toString()),
    h(s, { newQueue: !0, info: { initiator: t } }),
    t.blur()
}
function rt(t) {
  const { propertyInputAttribute: e } = F.computed,
    r = t.getAttribute(e),
    o = t.getAttribute('name')
  console.error(
    `Liquid Ajax Cart: the element [${e}="${r}"]${
      o ? `[name="${o}"]` : ''
    } has wrong attributes.`
  )
}
function ot(t) {
  const { propertyInputAttribute: e } = F.computed
  return (
    !!t.hasAttribute(e) &&
    ((t instanceof HTMLInputElement && 'hidden' !== t.type) ||
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLSelectElement)
  )
}
function nt(t) {
  const { propertyInputAttribute: e } = F.computed,
    r = { objectCode: void 0, propertyName: void 0, attributeValue: void 0 }
  if (!t.hasAttribute(e)) return r
  let o = t.getAttribute(e).trim()
  if (!o) {
    const e = t.getAttribute('name').trim()
    e && (o = e)
  }
  if (!o) return rt(t), r
  if (((r.attributeValue = o), 'note' === o)) return (r.objectCode = 'note'), r
  let [n, ...i] = o.trim().split('[')
  return !i ||
    1 !== i.length ||
    i[0].length < 2 ||
    i[0].indexOf(']') !== i[0].length - 1
    ? (rt(t), r)
    : ((r.objectCode = n), (r.propertyName = i[0].replace(']', '')), r)
}
function it(t) {
  const { propertyInputAttribute: e } = F.computed
  t.status.requestInProgress
    ? document.querySelectorAll(`[${e}]`).forEach((t) => {
        ot(t) && (t.disabled = !0)
      })
    : document.querySelectorAll(`[${e}]`).forEach((r) => {
        if (!ot(r)) return
        const { objectCode: o, propertyName: n, attributeValue: i } = nt(r)
        if (!o) return
        if (!t.status.cartStateSet) return
        let s,
          a = !1
        if ('note' === o) s = t.cart.note
        else if ('attributes' === o) s = t.cart.attributes[n]
        else {
          const [r, u] = Y(o, t)
          r && (s = r.properties[n]),
            null === r &&
              (console.error(
                `Liquid Ajax Cart: line item with ${u}="${o}" was not found when the [${e}] element with "${i}" value tried to get updated from the State`
              ),
              (a = !0))
        }
        r instanceof HTMLInputElement &&
        ('checkbox' === r.type || 'radio' === r.type)
          ? r.value === s
            ? (r.checked = !0)
            : (r.checked = !1)
          : ('string' == typeof s ||
              s instanceof String ||
              'number' == typeof s ||
              s instanceof Number ||
              (Array.isArray(s) || s instanceof Object
                ? ((s = JSON.stringify(s)),
                  console.warn(
                    `Liquid Ajax Cart: the ${e} with the "${i}" value is bound to the ${n} ${
                      'attributes' === o ? 'attribute' : 'property'
                    } that is not string or number: ${s}`
                  ))
                : (s = '')),
            (r.value = s)),
          a || (r.disabled = !1)
      })
}
function st(t, e) {
  const { propertyInputAttribute: r } = F.computed
  if (!ot(t)) return
  e && e.preventDefault(), t.blur()
  const o = L()
  if (!o.status.cartStateSet) return
  if (o.status.requestInProgress) return
  const { objectCode: n, propertyName: i, attributeValue: s } = nt(t)
  if (!n) return
  let a = t.value
  if (t instanceof HTMLInputElement && 'checkbox' === t.type && !t.checked) {
    let t = document.querySelector(`input[type="hidden"][${r}="${s}"]`)
    t ||
      ('note' !== n && 'attributes' !== n) ||
      (t = document.querySelector(`input[type="hidden"][${r}][name="${s}"]`)),
      (a = t ? t.value : '')
  }
  if ('note' === n) {
    const e = new FormData()
    e.set('note', a), g(e, { newQueue: !0, info: { initiator: t } })
  } else if ('attributes' === n) {
    const e = new FormData()
    e.set(`attributes[${i}]`, a), g(e, { newQueue: !0, info: { initiator: t } })
  } else {
    const [e, u] = Y(n, o)
    if (
      (null === e &&
        console.error(
          `Liquid Ajax Cart: line item with ${u}="${n}" was not found when the [${r}] element with "${s}" value tried to update the cart`
        ),
      !e)
    )
      return
    const c = Object.assign({}, e.properties)
    c[i] = a
    const l = new FormData()
    let d = l
    l.set(u, n), l.set('quantity', e.quantity.toString())
    for (let t in c) {
      const r = c[t]
      'string' == typeof r || r instanceof String
        ? l.set(`properties[${t}]`, c[t])
        : (d = { [u]: n, quantity: e.quantity, properties: c })
    }
    h(d, { newQueue: !0, info: { initiator: t } })
  }
}
const at = 'toggle',
  ut = 'remove'
function ct(t, e) {
  const { toggleClassButtonAttribute: r } = F.computed
  if (!t.hasAttribute(r)) return
  e && e.preventDefault()
  const o = t.getAttribute(r).split('|')
  if (!o)
    return void console.error(
      'Liquid Ajax Cart: Error while toggling body class'
    )
  const n = o[0].trim()
  let i = o[1] ? o[1].trim() : at
  if (('add' !== i && i !== ut && (i = at), n))
    try {
      'add' === i
        ? document.body.classList.add(n)
        : i === ut
        ? document.body.classList.remove(n)
        : document.body.classList.toggle(n)
    } catch (e) {
      console.error('Liquid Ajax Cart: Error while toggling body class:', n),
        console.error(e)
    }
}
const lt = new WeakMap(),
  dt = new WeakMap()
function ft() {
  document.querySelectorAll('form[action*="/cart/add"]').forEach((t) => {
    dt.get(t) || (t.addEventListener('submit', pt), dt.set(t, !0))
  })
}
function pt(t) {
  var e, r
  const o = t.target
  let n
  if (
    new URL(o.action).pathname !==
    `${
      (null ===
        (r =
          null === (e = window.Shopify) || void 0 === e ? void 0 : e.routes) ||
      void 0 === r
        ? void 0
        : r.root) || '/'
    }cart/add`
  )
    return
  if ('productFormsFilter' in F && !F.productFormsFilter(o)) return
  if ((t.preventDefault(), (n = lt.get(o)), n > 0 || (n = 0), n > 0)) return
  const i = new FormData(o)
  lt.set(o, n + 1),
    mt(o),
    b(i, {
      lastComplete: () => {
        const t = lt.get(o)
        t > 0 && lt.set(o, t - 1), mt(o)
      },
      newQueue: !0,
      info: { initiator: o },
    })
}
function mt(t) {
  const e = lt.get(t)
  F.computed.productFormsProcessingClass &&
    (e > 0
      ? t.classList.add(F.computed.productFormsProcessingClass)
      : t.classList.remove(F.computed.productFormsProcessingClass))
}
const yt = 'error',
  bt = 'shopify_error'
function ht(t) {
  const {
    cartStateSetBodyClass: e,
    requestInProgressBodyClass: r,
    emptyCartBodyClass: o,
    notEmptyCartBodyClass: n,
  } = F.computed
  e &&
    (t.status.cartStateSet
      ? document.body.classList.add(e)
      : document.body.classList.remove(e)),
    r &&
      (t.status.requestInProgress
        ? document.body.classList.add(r)
        : document.body.classList.remove(r)),
    o &&
      (t.status.cartStateSet && 0 === t.cart.item_count
        ? document.body.classList.add(o)
        : document.body.classList.remove(o)),
    n &&
      (t.status.cartStateSet && 0 === t.cart.item_count
        ? document.body.classList.remove(n)
        : document.body.classList.add(n))
}
let gt
if (!('liquidAjaxCart' in window))
  if (
    (function () {
      try {
        if (!('fetch' in window)) return !1
        if (!('Promise' in window)) return !1
        if (!('FormData' in window)) return !1
        if (!('WeakMap' in window)) return !1
        if (!('DOMParser' in window)) return !1
        if (!('CustomEvent' in window)) return !1
        const t = { foo: 'barbar' }
        let { foo: e } = t
        if ('barbar' !== e) return !1
        const r = new WeakMap()
        if ((r.set(t, 'foo'), (e = r.get(t)), !e)) return !1
        const o = new FormData()
        return o.set('foo', 'bar'), (e = o.get('foo').toString()), !!e
      } catch (t) {
        return console.error(t), !1
      }
    })()
  ) {
    !(function () {
      const t = document.querySelector(`[${F.computed.configurationAttribute}]`)
      if (t)
        try {
          const e = JSON.parse(t.textContent),
            r = ['productFormsFilter', 'messageBuilder']
          for (let t in e)
            r.includes(t)
              ? console.error(
                  `Liquid Ajax Cart: the "${t}" parameter is not supported inside the "${F.computed.configurationAttribute}" script — use the "configureCart" function for it`
                )
              : I(t, e[t])
        } catch (t) {
          console.error(
            `Liquid Ajax Cart: can't parse configuration JSON from the "${F.computed.configurationAttribute}" script`
          ),
            console.error(t)
        }
    })(),
      new MutationObserver(() => {
        ft()
      }).observe(document.body, { subtree: !0, childList: !0 }),
      ft(),
      A((t, e) => {
        const {
          sectionsAttribute: o,
          staticElementAttribute: n,
          sectionScrollAreaAttribute: i,
        } = F.computed
        if (void 0 !== t.requestBody) {
          const e = []
          if (
            (document.querySelectorAll(`[${o}]`).forEach((t) => {
              const r = t.closest(`[id^="${N}"]`)
              if (r) {
                const t = r.id.replace(N, '')
                ;-1 === e.indexOf(t) && e.push(t)
              } else
                console.error(
                  `Liquid Ajax Cart: there is a ${o} element that is not inside a Shopify section. All the ${o} elements must be inside Shopify sections.`
                )
            }),
            e.length)
          ) {
            let r,
              o = e.join(',')
            t.requestBody instanceof FormData ||
            t.requestBody instanceof URLSearchParams
              ? t.requestBody.has('sections') &&
                (r = t.requestBody.get('sections').toString())
              : (r = t.requestBody.sections),
              ((('string' == typeof r || r instanceof String) && '' !== r) ||
                (Array.isArray(r) && r.length > 0)) &&
                (o = `${r.toString()},${o}`),
              t.requestBody instanceof FormData ||
              t.requestBody instanceof URLSearchParams
                ? t.requestBody.set('sections', o)
                : (t.requestBody.sections = o)
          }
        }
        e((t) => {
          var e, o, i
          const { sectionsAttribute: s, sectionScrollAreaAttribute: a } =
              F.computed,
            u = new DOMParser(),
            c = []
          if (
            (null === (e = t.responseData) || void 0 === e ? void 0 : e.ok) &&
            'sections' in t.responseData.body
          ) {
            let e = t.responseData.body.sections
            ;(null ===
              (i =
                null === (o = t.extraResponseData) || void 0 === o
                  ? void 0
                  : o.body) || void 0 === i
              ? void 0
              : i.sections) &&
              (e = Object.assign(
                Object.assign({}, e),
                t.extraResponseData.body.sections
              ))
            for (let o in e)
              e[o]
                ? document
                    .querySelectorAll(`#shopify-section-${o}`)
                    .forEach((i) => {
                      let l = []
                      const d = '__noId__',
                        f = {}
                      i.querySelectorAll(` [${a}] `).forEach((t) => {
                        let e = t.getAttribute(a).toString().trim()
                        '' === e && (e = d),
                          e in f || (f[e] = []),
                          f[e].push({
                            scroll: t.scrollTop,
                            height: t.scrollHeight,
                          })
                      })
                      const p = {},
                        m = i.querySelectorAll(`[${n}]`)
                      m &&
                        m.forEach((t) => {
                          let e = t.getAttribute(n).toString().trim()
                          '' === e && (e = d),
                            e in p || (p[e] = []),
                            p[e].push(t)
                        })
                      const y = i.querySelectorAll(`[${s}]`)
                      if (y) {
                        const t = u.parseFromString(e[o], 'text/html')
                        for (let e in p)
                          t.querySelectorAll(
                            ` [${n}="${e.replace(d, '')}"] `
                          ).forEach((t, r) => {
                            r + 1 <= p[e].length &&
                              (t.before(p[e][r]),
                              t.parentElement.removeChild(t))
                          })
                        const r = t.querySelectorAll(`[${s}]`)
                        if (y.length !== r.length) {
                          console.error(
                            `Liquid Ajax Cart: the received HTML for the "${o}" section has a different quantity of the "${s}" containers. The section will be updated completely.`
                          )
                          const e = t.querySelector(`#${N}${o}`)
                          if (e) {
                            for (i.innerHTML = ''; e.childNodes.length; )
                              i.appendChild(e.firstChild)
                            l.push(i)
                          }
                        } else
                          y.forEach((t, e) => {
                            t.before(r[e]),
                              t.parentElement.removeChild(t),
                              l.push(r[e])
                          })
                      }
                      for (let e in f)
                        i.querySelectorAll(
                          ` [${a}="${e.replace(d, '')}"] `
                        ).forEach((o, n) => {
                          n + 1 <= f[e].length &&
                            (t.requestType !== r ||
                              f[e][n].height >= o.scrollHeight) &&
                            (o.scrollTop = f[e][n].scroll)
                        })
                      l.length > 0 && c.push({ id: o, elements: l })
                    })
                : console.error(
                    `Liquid Ajax Cart: the HTML for the "${o}" section was requested but the response is ${e[o]}`
                  )
          }
          c.length > 0 &&
            P.length > 0 &&
            P.forEach((t) => {
              try {
                t(c)
              } catch (t) {
                console.error(
                  'Liquid Ajax Cart: Error during a call of a sections update subscriber'
                ),
                  console.error(t)
              }
            })
        })
      }),
      (function () {
        var t
        ;(t = (t) => {
          ;($.requestInProgress = t), E(!1)
        }),
          u.push(t),
          A((t, e) => {
            e((t) => {
              var e, o
              let n
              ;(null === (e = t.extraResponseData) || void 0 === e
                ? void 0
                : e.ok) && (n = j(t.extraResponseData.body)),
                !n &&
                  (null === (o = t.responseData) || void 0 === o
                    ? void 0
                    : o.ok) &&
                  (t.requestType === r ? g() : (n = j(t.responseData.body))),
                n
                  ? ((C = S), (S = n), ($.cartStateSet = !0), E(!0))
                  : null === n &&
                    console.error(
                      'Liquid Ajax Cart: expected to receive the updated cart state but the object is not recognized. The request state:',
                      t
                    )
            })
          })
        const e = document.querySelector(
          `[${F.computed.initialStateAttribute}]`
        )
        if (e)
          try {
            const t = JSON.parse(e.textContent)
            if (((S = j(t)), null === S))
              throw `JSON from ${F.computed.initialStateAttribute} script is not correct cart object`
            ;($.cartStateSet = !0), E(!0)
          } catch (t) {
            console.error(
              `Liquid Ajax Cart: can't parse cart JSON from the "${F.computed.initialStateAttribute}" script. A /cart.js request will be performed to receive the cart state`
            ),
              console.error(t),
              y()
          }
        else y()
      })(),
      x(T),
      T(L()),
      document.addEventListener(
        'click',
        function (t) {
          for (
            let e = t.target;
            e && e != document.documentElement;
            e = e.parentElement
          )
            X(e, t)
        },
        !1
      ),
      document.addEventListener(
        'change',
        function (t) {
          st(t.target, t)
        },
        !1
      ),
      document.addEventListener(
        'keydown',
        function (t) {
          const e = t.target
          'Enter' === t.key &&
            ((e instanceof HTMLTextAreaElement && !t.ctrlKey) || st(e, t)),
            'Escape' === t.key &&
              (function (t) {
                if (!ot(t)) return
                if (
                  !(
                    t instanceof HTMLInputElement ||
                    t instanceof HTMLTextAreaElement
                  )
                )
                  return
                if (
                  t instanceof HTMLInputElement &&
                  ('checkbox' === t.type || 'radio' === t.type)
                )
                  return
                const e = L()
                if (!e.status.cartStateSet) return void t.blur()
                const { objectCode: r, propertyName: o } = nt(t)
                if (!r) return
                let n
                if ('note' === r) n = e.cart.note
                else if ('attributes' === r) n = e.cart.attributes[o]
                else {
                  const [t] = Y(r, e)
                  t && (n = t.properties[o])
                }
                void 0 !== n &&
                  (n || 'string' == typeof n || n instanceof String || (n = ''),
                  (t.value = String(n))),
                  t.blur()
              })(e)
        },
        !1
      ),
      x(it),
      it(L()),
      document.addEventListener(
        'change',
        function (t) {
          et(t.target, t)
        },
        !1
      ),
      document.addEventListener(
        'keydown',
        function (t) {
          'Enter' === t.key && et(t.target, t),
            'Escape' === t.key &&
              (function (t) {
                const { quantityInputAttribute: e } = F.computed
                if (!Z(t)) return
                const r = t.getAttribute(e).trim()
                let o
                const n = L()
                if (n.status.cartStateSet) {
                  if (r.length > 3) o = n.cart.items.find((t) => t.key === r)
                  else {
                    const t = Number(r) - 1
                    o = n.cart.items[t]
                  }
                  o && (t.value = o.quantity.toString())
                }
                t.blur()
              })(t.target)
        },
        !1
      ),
      x(tt),
      tt(L()),
      document.addEventListener(
        'click',
        function (t) {
          for (
            let e = t.target;
            e && e != document.documentElement;
            e = e.parentElement
          )
            ct(e, t)
        },
        !1
      ),
      x(ht),
      ht(L()),
      A((t, e) => {
        'add' === t.requestType &&
          e((t) => {
            var e
            if (null === (e = t.responseData) || void 0 === e ? void 0 : e.ok) {
              const { addToCartCssClass: t } = F
              let e = '',
                r = 0
              if (
                ('string' == typeof t || t instanceof String
                  ? (e = t)
                  : Array.isArray(t) &&
                    2 === t.length &&
                    ('string' == typeof t[0] || t[0] instanceof String) &&
                    ('number' == typeof t[1] || t[1] instanceof Number)
                  ? ((e = t[0]),
                    t[1] > 0
                      ? (r = t[1])
                      : console.error(
                          `Liquid Ajax Cart: the addToCartCssClass[1] value must be a positive integer. Now it is ${t[1]}`
                        ))
                  : console.error(
                      'Liquid Ajax Cart: the "addToCartCssClass" configuration parameter must be a string or a [string, number] array'
                    ),
                '' !== e)
              ) {
                try {
                  document.body.classList.add(e)
                } catch (t) {
                  console.error(
                    `Liquid Ajax Cart: error while adding the "${e}" CSS class from the addToCartCssClass parameter to the body tag`
                  ),
                    console.error(t)
                }
                r > 0 &&
                  (void 0 !== gt && clearTimeout(gt),
                  (gt = setTimeout(() => {
                    document.body.classList.remove(e)
                  }, r)))
              }
            }
          })
      }),
      A((t, e) => {
        let n
        t.requestType === r
          ? (n = ((t) => {
              var e
              let r
              const o =
                null === (e = t.info) || void 0 === e ? void 0 : e.initiator
              return (
                o instanceof HTMLFormElement &&
                  (r = o.querySelectorAll(
                    `[${F.computed.messagesAttribute}="form"]`
                  )),
                r
              )
            })(t))
          : t.requestType === o &&
            (n = ((t) => {
              var e
              let r
              const { messagesAttribute: o } = F.computed,
                n = L()
              let i, s
              if (
                (t.requestBody instanceof FormData ||
                t.requestBody instanceof URLSearchParams
                  ? (t.requestBody.has('line') &&
                      (s = t.requestBody.get('line').toString()),
                    t.requestBody.has('id') &&
                      (i = t.requestBody.get('id').toString()))
                  : ('line' in t.requestBody &&
                      (s = String(t.requestBody.line)),
                    'id' in t.requestBody && (i = String(t.requestBody.id))),
                s)
              ) {
                const t = Number(s)
                if (t > 0 && n.status.cartStateSet) {
                  const r = t - 1
                  i =
                    null === (e = n.cart.items[r]) || void 0 === e
                      ? void 0
                      : e.key
                }
              }
              return (
                i &&
                  (i.indexOf(':') > -1
                    ? (r = document.querySelectorAll(`[${o}="${i}"]`))
                    : n.status.cartStateSet &&
                      (r = document.querySelectorAll(
                        n.cart.items
                          .reduce(
                            (t, e) => (
                              (e.key !== i && e.id !== Number(i)) ||
                                t.push(`[${o}="${e.key}"]`),
                              t
                            ),
                            []
                          )
                          .join(',')
                      ))),
                r
              )
            })(t)),
          n &&
            n.length > 0 &&
            (n.forEach((t) => {
              t.innerHTML = ''
            }),
            e((t) => {
              if (t.info.cancel) return
              const { messageBuilder: e } = F,
                r = (function (t) {
                  var e
                  const { requestErrorText: r } = F
                  if (
                    !(null === (e = t.responseData) || void 0 === e
                      ? void 0
                      : e.ok)
                  ) {
                    if ('responseData' in t) {
                      if (
                        'description' in t.responseData.body &&
                        t.responseData.body.description
                      )
                        return {
                          type: yt,
                          text: t.responseData.body.description,
                          code: bt,
                          requestState: t,
                        }
                      if (
                        'message' in t.responseData.body &&
                        t.responseData.body.message
                      )
                        return {
                          type: yt,
                          text: t.responseData.body.message,
                          code: bt,
                          requestState: t,
                        }
                    }
                    return {
                      type: yt,
                      text: r,
                      code: 'request_error',
                      requestState: t,
                    }
                  }
                })(t)
              r &&
                n.forEach((t) => {
                  t.innerHTML = e([r])
                })
            }))
      }),
      (window.liquidAjaxCart = {
        configureCart: I,
        cartRequestGet: y,
        cartRequestAdd: b,
        cartRequestChange: h,
        cartRequestUpdate: g,
        cartRequestClear: q,
        subscribeToCartAjaxRequests: A,
        getCartState: L,
        subscribeToCartStateUpdate: x,
        subscribeToCartSectionsUpdate: function (t) {
          P.push(t)
        },
      })
    const t = new CustomEvent('liquidAjaxCartInit')
    document.body.dispatchEvent(t),
      window.addEventListener('focus', () => {
        F.updateOnWindowFocus && g({}, {})
      })
  } else
    console.warn('Liquid Ajax Cart is not supported by this browser'),
      (document.body.className += ' js-ajax-cart-not-compatible'),
      (window.liquidAjaxCart = {
        configureCart: function () {},
        cartRequestGet: function () {},
        cartRequestAdd: function () {},
        cartRequestChange: function () {},
        cartRequestUpdate: function () {},
        cartRequestClear: function () {},
        subscribeToCartAjaxRequests: function () {},
        getCartState: L,
        subscribeToCartStateUpdate: function () {},
        subscribeToCartSectionsUpdate: function () {},
      })
const qt = window.liquidAjaxCart.configureCart,
  At = window.liquidAjaxCart.cartRequestGet,
  vt = window.liquidAjaxCart.cartRequestAdd,
  wt = window.liquidAjaxCart.cartRequestChange,
  Ct = window.liquidAjaxCart.cartRequestUpdate,
  St = window.liquidAjaxCart.cartRequestClear,
  $t = window.liquidAjaxCart.subscribeToCartAjaxRequests,
  jt = window.liquidAjaxCart.getCartState,
  xt = window.liquidAjaxCart.subscribeToCartStateUpdate,
  Lt = window.liquidAjaxCart.subscribeToCartSectionsUpdate
var Et = e.x$,
  Tt = e.nd,
  kt = e.yF,
  Rt = e.fi,
  Bt = e.Be,
  Dt = e.ih,
  Ft = e.KJ,
  It = e.Q4,
  Nt = e.WP,
  Pt = e.w0
export {
  Et as cartRequestAdd,
  Tt as cartRequestChange,
  kt as cartRequestClear,
  Rt as cartRequestGet,
  Bt as cartRequestUpdate,
  Dt as configureCart,
  Ft as getCartState,
  It as subscribeToCartAjaxRequests,
  Nt as subscribeToCartSectionsUpdate,
  Pt as subscribeToCartStateUpdate,
}
