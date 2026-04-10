# 🛍️ Shopify Smart Bundle Feature

![Shopify](https://img.shields.io/badge/Shopify-2.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E.svg)
![Liquid](https://img.shields.io/badge/Shopify-Liquid-8B4513.svg)

---

## 📖 Overview

A **production-ready Shopify custom page implementation** featuring a dynamic product grid with **smart bundle logic**.

> 🎯 When users select **Color = Black** and **Size = Medium**, an additional product is automatically added to the cart.

Perfect for:

* Upselling 💰
* Cross-selling 🛒
* Gift-with-purchase 🎁

---

## ✨ Key Features

* 🎯 **Smart Bundle Logic** — Conditional auto-add products
* ⚡ **AJAX Cart Integration** — No page reload
* 📱 **Fully Responsive UI** — Mobile-first design
* 🎨 **Pixel-perfect UI** — Based on Figma
* 🚀 **Performance Optimized** — Lazy loading & efficient DOM
* ♿ **Accessibility Ready** — ARIA + keyboard support
* 🔧 **Highly Customizable** — Easy to extend

---

## 🚀 Live Demo

👉 **Store:** [View Live Store](https://tahseen-raza-48-teststore.myshopify.com/pages/test-page?preview_theme_id=153541116044)
👉 **Video:** [Watch Demo Video: ](https://drive.google.com/file/d/1OolcUoNtrXDRWvkrMUoyzR7h_9Mlh6tF/view?usp=sharing)

---

## 🧠 Tech Stack

* Shopify Liquid
* HTML, CSS
* Vanilla JavaScript
* Shopify AJAX API

---

## 🎯 Core Logic (Highlight Feature)

```js
if (selectedColor === 'Black' && selectedSize === 'M') {
  await addToCart(bundleVariantId, 1, 'Bundle Product');
}
```

✔ Adds main product
✔ Checks condition
✔ Adds bundle product dynamically

---

## 📁 Project Structure

```
├── sections/
│   ├── custom-banner.liquid
│   └── product-grid.liquid
├── templates/
│   └── page.test.json
└── assets/
    ├── custom.css
    └── custom.js
```

---

## 🛠️ Setup Instructions

### 1️⃣ Create Sections

* `custom-banner.liquid`
* `product-grid.liquid`

### 2️⃣ Create Template

```json
{
  "name": "Test Page",
  "sections": {
    "custom-banner": {
      "type": "custom-banner"
    },
    "product-grid": {
      "type": "product-grid"
    }
  }
}
```

### 3️⃣ Assign Template

👉 Shopify Admin → Pages → Select `page.test`

---

## 🎯 Bundle Configuration

### Option 1 — Product Handle

```js
const BUNDLE_PRODUCT_HANDLE = 'black-leather-bag';
```

### Option 2 — Variant ID

```js
const MANUAL_BUNDLE_VARIANT_ID = 41234567890123;
```

---

## 🎨 Customization

### Colors

```css
:root {
  --primary-color: #1a1a1a;
  --accent-color: #e63946;
}
```

### Grid Layout

```json
"columns_desktop": "3"
```

---

## 🧪 Testing Checklist

* ✅ Product grid loads
* ✅ Popup opens
* ✅ Variant selection works
* ✅ Add to cart works
* ✅ Bundle triggers (Black + M)
* ✅ Cart updates correctly
* ✅ Responsive on mobile

---

## 🔧 API Used

| Endpoint                | Method | Purpose       |
| ----------------------- | ------ | ------------- |
| `/products/{handle}.js` | GET    | Fetch product |
| `/cart/add.js`          | POST   | Add to cart   |
| `/cart.js`              | GET    | Get cart      |

---

## 📊 Performance

* ⚡ Lighthouse Score: **95+**
* 🚀 Fast load & smooth interaction

---

## 💡 Use Case

This feature helps:

* Increase **Average Order Value (AOV)**
* Improve **conversion rates**
* Enable **dynamic product bundling**

---

## 👨‍💻 Author

**Tahseen Raza**
Full Stack Developer

---

## 📄 License

MIT License — Free to use and modify

---

## ⭐ Final Note

This project demonstrates **real-world Shopify customization**, combining UI/UX with business logic to create a scalable e-commerce feature.

---
