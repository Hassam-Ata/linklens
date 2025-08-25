import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  originalUrl: varchar("original_url", { length: 2000 }).notNull(),
  shortCode: varchar("short_code", { length: 20 }).notNull().unique(),
  createdAt: timestamp("created-at").notNull().defaultNow(),
  updatedAt: timestamp("updated-at").notNull().defaultNow(),
  clicks: integer("clicks").default(0).notNull(),
});
