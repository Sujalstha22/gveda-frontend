# GVEDA Frontend — Backend Requests

Frontend integrated against `https://api.gveda.com/v1/` using the 6 documented endpoints.
Below is what the frontend still needs. Ordered by priority.

---

## 1. New endpoints needed

### 1.1 FAQ  — **required**
Homepage FAQ section is hardcoded. No endpoint, no field anywhere.

```
GET /other/faq/p
→ { message, results: [ { _id, question, answer, sn } ] }
```

### 1.2 Contact form submit — **required**
`/contact` form has nowhere to POST. Currently non-functional.

```
POST /other/contact
body: { name, email, phone, subject, message }
→ { message }
```

### 1.3 Newsletter subscribe — **required**
Footer newsletter input has no endpoint.

```
POST /other/newsletter
body: { email }
→ { message }
```

### 1.4 About page content — **needed**
Entire `/about` page is static. Need editable content (intro, values, "why us", ingredients blurb).

```
GET /pages/p/about        (if it can just be a normal page slug, that works too)
→ { message, results: { title, content (HTML), ...sections } }
```

If the existing `pages` system can hold an `about` slug with structured/HTML content, we
don't need a new endpoint — just tell us the slug.

---

## 2. Fields missing on existing endpoints

### 2.1 `GET /product/p` — list items need `category`
List item has no category field, so we cannot filter the grid client-side —
every category filter click fires a separate `/product/p/category/{slug}` request.

Add to each list item:
```
category: { name, slug }
```

### 2.2 `GET /blogs/p` — list/detail need real metadata
Blog objects only have `title, slug, content (HTML), createdAt`.
Frontend currently fakes the category label and strips HTML for the card excerpt.

Add:
```
category: { name, slug }     // or just a string
excerpt: string              // short plain-text summary for cards
```

### 2.3 `GET /other/home/p/new` — confirm `popularProducts` is stable
Homepage "Bestsellers" now renders **only** `popularProducts`.
Confirm this array is always populated and admin-controlled (not random).

---

## 3. `_id` vs `id` — **yes, this matters**

### Gallery
- `GET /other/gallery/p` returns **both** `_id` (Mongo) and `id` (numeric).
- `GET /other/gallery/p/{id}` **only accepts the numeric `id`**.
  Passing `_id` returns:
  `Cast to Number failed for value "..." (type string) at path "id" for model "Gallery"`

**Ask:** make the detail endpoint accept **either** `_id` or `id`, OR drop the
numeric `id` everywhere and use `_id` consistently like every other resource
(`product`, `blog` use slug; nothing else uses a numeric id).

Right now gallery is the only resource with two identifiers and a detail route
that rejects the primary one. Pick one.

### Everything else
`product` and `blog` detail use **slug** — consistent, fine. No change needed.

---

## 4. Error response shape — confirm it's consistent

Observed:
- Success: `{ "message": "...", "results": ... }`  (sometimes `"Success."`, `"success"`, `"Success"` — casing varies, not blocking)
- Not found: `{ "message": "Blog not found." }` with HTTP 404
- Bad id: `{ "message": "Cast to Number failed..." }` with HTTP **200 or 500?** — please make all errors non-2xx.

**Ask:** every error → non-2xx status + `{ message }`. No error bodies on 200.

---

## 5. E-commerce + account — NOT in docs at all

The live site (`gveda.com`) has these; our docs cover none of it. We need
**full documentation** for every endpoint below before we can build these flows.

### 5.1 Cart
```
GET    /cart                       → current cart
POST   /cart/items                 body: { productSlug, qty, variationId? }
PATCH  /cart/items/{id}            body: { qty }
DELETE /cart/items/{id}
```
Need: guest cart (cookie/session token) vs logged-in cart, how they merge on login.

### 5.2 Checkout + Orders
```
POST   /checkout                   body: { cart, shipping, billing, paymentMethod }
GET    /orders                     → user order history
GET    /orders/{id}                → single order + status
```
Need: payment gateway (eSewa / Khalti / card?), shipping rate rules, order status enum.

### 5.3 Auth / Account
```
POST   /auth/register             body: { name, email, phone, password }
POST   /auth/login                → token
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/me                    → profile
PATCH  /auth/me                    → update profile / addresses
```
Need: token type (JWT / session cookie), refresh strategy, which endpoints require auth.

### 5.4 Downloads
Live site has a "Downloads" nav item (catalogs / price lists / brochures).
```
GET /other/downloads/p
→ { message, results: [ { _id, title, category, file (filename), size, sn } ] }
```
File URL prefix — confirm (`/static/` like images, or a separate `/downloads/` path).

### 5.5 Product data gaps for commerce
Once cart exists, `GET /product/p/{slug}` must also return:
- `variations` populated (size / shade) with per-variation `price`, `stock`, `sku`
- `stock` semantics — is negative stock (`-826` seen on Niacinamide Face Wash) a real
  value we should treat as out-of-stock, or a bug?
- `comparePrice` — confirm `0` and `null` both mean "no discount"

---

---

## 5A. Protected / authenticated routes — need FULL documentation

Per scope agreement: we need **every authenticated endpoint documented** — path,
method, request body, response shape, required role, and error cases. Not just
the public ones. List below is what the frontend account area expects. If the
real API differs, send the actual spec.

> **Current state:** the Swagger docs (`gva-docs-2708`) expose **only `Public`
> tagged endpoints — zero authenticated routes**. Nothing for login, account,
> orders, or cart is documented. We cannot build the logged-in experience until
> this section is delivered.

### Auth mechanics (document these first)
- Auth scheme: JWT bearer? session cookie? — exact header / cookie name
- Token lifetime + refresh flow (`POST /auth/refresh`?)
- How the client detects an expired session (status code + body)
- Logout: server-side invalidation or client-only?
- Email/phone verification required before login? OTP flow?
- Password rules (min length, etc.) so client validation matches

### Account endpoints (all require auth)
```
GET    /auth/me                     → { id, name, email, phone, verified, createdAt }
PATCH  /auth/me                     → update name / phone
POST   /auth/change-password        body: { currentPassword, newPassword }

GET    /account/addresses           → [ { id, label, line1, city, ... , isDefault } ]
POST   /account/addresses
PATCH  /account/addresses/{id}
DELETE /account/addresses/{id}

GET    /account/orders              → order history (paginated)
GET    /account/orders/{id}         → single order + line items + status timeline

GET    /account/wishlist            → (if wishlist is in scope — confirm)
POST   /account/wishlist            body: { productSlug }
DELETE /account/wishlist/{productSlug}
```

### Cart / checkout auth rules
- Which cart/checkout endpoints work for guests vs require login
- On login, does the guest cart merge into the user cart automatically, or does
  the client send the guest cart to a merge endpoint?
- Does `POST /checkout` require auth, or allow guest checkout with email only?

### Every protected endpoint must document
1. Exact auth requirement (logged-in / verified / specific role)
2. `401` shape when token missing/expired
3. `403` shape when authenticated but not allowed
4. Rate limits, if any (login attempts, OTP resend)

---

## 6. Out of scope for now (confirming with client, no docs needed yet)

Listed so backend knows we are **intentionally** skipping them in this build:
- Associate / distributor registration (MLM program)
- Multi-brand storefront (FH, Mr. Marqman, etc.) — GVEDA-only redesign
- Wishlist / favourites
