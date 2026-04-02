# 📦 Database Schema Documentation (Supabase)

## 🧩 Overview

This schema supports:

* Product catalog
* Shopping cart system
* Order management (with snapshot strategy)

All IDs use UUID. Relationships are normalized.

---

# 🟢 CATEGORIES

### Table: `categories`

| Column | Type          | Description             |
| ------ | ------------- | ----------------------- |
| id     | uuid (PK)     | Unique identifier       |
| name   | text          | Category name           |
| slug   | text (unique) | URL-friendly identifier |

---

# 🟢 PRODUCTS

### Table: `products`

| Column      | Type      | Description             |
| ----------- | --------- | ----------------------- |
| id          | uuid (PK) | Product ID              |
| name        | text      | Product name            |
| description | text      | Product description     |
| price       | numeric   | Base price              |
| image       | text      | Main image URL          |
| category_id | uuid (FK) | Reference to categories |
| featured    | boolean   | Highlighted product     |
| badge       | text      | Optional label          |
| created_at  | timestamp | Creation timestamp      |

---

# 🟢 EXTRAS

### Table: `extras`

| Column | Type      | Description |
| ------ | --------- | ----------- |
| id     | uuid (PK) | Extra ID    |
| name   | text      | Extra name  |
| price  | numeric   | Extra price |
| image  | text      | Extra image |

---

### Table: `product_extras`

| Column     | Type      | Description |
| ---------- | --------- | ----------- |
| id         | uuid (PK) | Relation ID |
| product_id | uuid (FK) | Product     |
| extra_id   | uuid (FK) | Extra       |

---

# 🟢 REMOVABLES

### Table: `removables`

| Column | Type      | Description     |
| ------ | --------- | --------------- |
| id     | uuid (PK) | Removable ID    |
| name   | text      | Ingredient name |

---

### Table: `product_removables`

| Column       | Type      | Description |
| ------------ | --------- | ----------- |
| id           | uuid (PK) | Relation ID |
| product_id   | uuid (FK) | Product     |
| removable_id | uuid (FK) | Removable   |

---

# 🛒 CART SYSTEM

### Table: `carts`

| Column     | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| id         | uuid (PK) | Cart ID                        |
| user_id    | uuid (FK) | Supabase auth user             |
| status     | text      | active / abandoned / converted |
| created_at | timestamp | Created date                   |
| updated_at | timestamp | Last update (auto-managed)     |

---

### Table: `cart_items`

| Column     | Type      | Description    |
| ---------- | --------- | -------------- |
| id         | uuid (PK) | Cart item ID   |
| cart_id    | uuid (FK) | Cart           |
| product_id | uuid (FK) | Product        |
| quantity   | int       | Quantity       |
| notes      | text      | Optional notes |

---

### Table: `cart_item_extras`

| Column       | Type      | Description |
| ------------ | --------- | ----------- |
| id           | uuid (PK) | Relation ID |
| cart_item_id | uuid (FK) | Cart item   |
| extra_id     | uuid (FK) | Extra       |

---

### Table: `cart_item_removables`

| Column       | Type      | Description |
| ------------ | --------- | ----------- |
| id           | uuid (PK) | Relation ID |
| cart_item_id | uuid (FK) | Cart item   |
| removable_id | uuid (FK) | Removable   |

---

# 🧾 ORDER SYSTEM

## ⚠️ IMPORTANT: Snapshot Strategy

Orders do NOT depend on products after creation.

---

### Table: `orders`

| Column     | Type      | Description                |
| ---------- | --------- | -------------------------- |
| id         | uuid (PK) | Order ID                   |
| user_id    | uuid (FK) | User                       |
| status     | text      | pending / paid / cancelled |
| total      | numeric   | Total price                |
| created_at | timestamp | Creation date              |

---

### Table: `order_items`

| Column        | Type      | Description    |
| ------------- | --------- | -------------- |
| id            | uuid (PK) | Order item ID  |
| order_id      | uuid (FK) | Order          |
| product_name  | text      | Snapshot name  |
| product_price | numeric   | Snapshot price |
| quantity      | int       | Quantity       |
| notes         | text      | Notes          |

---

### Table: `order_item_extras`

| Column        | Type      | Description    |
| ------------- | --------- | -------------- |
| id            | uuid (PK) | Relation ID    |
| order_item_id | uuid (FK) | Order item     |
| extra_name    | text      | Snapshot name  |
| extra_price   | numeric   | Snapshot price |

---

### Table: `order_item_removables`

| Column         | Type      | Description   |
| -------------- | --------- | ------------- |
| id             | uuid (PK) | Relation ID   |
| order_item_id  | uuid (FK) | Order item    |
| removable_name | text      | Snapshot name |

---

# 🔗 RELATIONSHIPS SUMMARY

* products → categories (N:1)
* products ↔ extras (N:N)
* products ↔ removables (N:N)
* carts → users (N:1)
* cart_items → products (N:1)
* orders → users (N:1)
* order_items → orders (N:1)

---

# 🧠 NOTES FOR IMPLEMENTATION

* Always fetch related data using joins (Supabase select with nested relations)
* Do NOT store full product objects in cart or orders
* Use snapshot fields in orders to preserve history
* Use RLS policies: `auth.uid() = user_id`
* Cache cart in frontend if needed, but DB is source of truth

---

# 🚀 TYPICAL QUERIES

### Get products with extras

* products

  * product_extras

    * extras

### Get full cart

* carts

  * cart_items

    * products
    * cart_item_extras → extras
    * cart_item_removables → removables

### Get full order

* orders

  * order_items

    * order_item_extras
    * order_item_removables
