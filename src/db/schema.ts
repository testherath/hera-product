import { pgTable, serial, text, timestamp, boolean, integer, doublePrecision } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'kitchen' | 'home-decor' | 'custom'
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  discount: integer('discount'),
  image: text('image').notNull(),
  alt: text('alt').notNull(),
  images: text('images').notNull(), // JSON string of Array<{ url: string; alt: string }>
  woodType: text('wood_type').notNull(),
  artisan: text('artisan').notNull(),
  rating: doublePrecision('rating').notNull(),
  reviews: integer('reviews').notNull(),
  customizable: boolean('customizable').notNull().default(false),
  inStock: boolean('in_stock').notNull().default(true),
  featured: boolean('featured').notNull().default(false),
  description: text('description').notNull(),
  dimensions: text('dimensions'),
  tags: text('tags').notNull(), // JSON string array
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  shippingAddress: text('shipping_address').notNull(), // JSON string for full address
  totalAmount: integer('total_amount').notNull(),
  status: text('status').notNull().default('pending'), // pending, processing, shipped, delivered, cancelled
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id),
  productId: text('product_id').notNull(), // String lookup to products table (since we used string IDs elsewhere or int? let's check products table)
  // Wait, products table uses serial aka integer id. Frontend uses string '1', '2'. 
  // We should be consistent. Frontend strings will be parsed to ints for DB lookup.
  // Storing simple product name/details here directly is safer for history if product changes.
  productName: text('product_name').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

