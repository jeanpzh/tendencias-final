import {
  pgTable,
  text,
  timestamp,
  jsonb,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";

export const chats = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  demoId: varchar("demo_id", { length: 255 }).notNull(),
  title: text("title").default("New Chat"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatId: uuid("chat_id")
    .references(() => chats.id, { onDelete: "cascade" })
    .notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  content: text("content"),
  toolInvocations: jsonb("tool_invocations"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
