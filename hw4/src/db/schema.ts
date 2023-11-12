import { relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToChatroomsTable: many(usersToChatroomsTable),
  usersToMessagesTable: many(usersToMessagesTable),
}));

export const chatroomsTable = pgTable(
  "chatrooms",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const chatroomsRelations = relations(chatroomsTable, ({ many }) => ({
  usersToChatroomsTable: many(usersToChatroomsTable),
  chatroomsToMessagesTable: many(chatroomsToMessagesTable),
}));

export const messagesTable = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    content: text("content").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const messagesRelations = relations(messagesTable, ({ many }) => ({
  usersToMessagesTable: many(usersToMessagesTable),
  chatroomToMessagesTable: many(chatroomsToMessagesTable),
}));

export const usersToChatroomsTable = pgTable(
  "users_to_chatrooms",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chatroomId: uuid("chatroom_id")
      .notNull()
      .references(() => chatroomsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndChatroomIndex: index("user_and_chatroom_index").on(
      table.userId,
      table.chatroomId,
    ),
    // This is a unique constraint on the combination of userId and chatroomId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.chatroomId, table.userId),
  }),
);

export const usersToChatroomsRelations = relations(
  usersToChatroomsTable,
  ({ one }) => ({
    chatroom: one(chatroomsTable, {
      fields: [usersToChatroomsTable.chatroomId],
      references: [chatroomsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToChatroomsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const usersToMessagesTable = pgTable(
  "users_to_messages",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    messageId: uuid("message_id")
      .notNull()
      .references(() => messagesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndMessageIndex: index("user_and_message_index").on(
      table.userId,
      table.messageId,
    ),
    // This is a unique constraint on the combination of userId and messageId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.messageId, table.userId),
  }),
);

export const usersToMessagesRelations = relations(
  usersToMessagesTable,
  ({ one }) => ({
    message: one(messagesTable, {
      fields: [usersToMessagesTable.messageId],
      references: [messagesTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToMessagesTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const chatroomsToMessagesTable = pgTable(
  "chatrooms_to_messages",
  {
    id: serial("id").primaryKey(),
    chatroomId: uuid("user_id")
      .notNull()
      .references(() => chatroomsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    messageId: uuid("message_id")
      .notNull()
      .references(() => messagesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndMessageIndex: index("user_and_message_index").on(
      table.chatroomId,
      table.messageId,
    ),
    // This is a unique constraint on the combination of userId and messageId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.messageId, table.chatroomId),
  }),
);

export const chatroomsToMessagesRelations = relations(
  chatroomsToMessagesTable,
  ({ one }) => ({
    message: one(messagesTable, {
      fields: [chatroomsToMessagesTable.messageId],
      references: [messagesTable.displayId],
    }),
    chatroom: one(chatroomsTable, {
      fields: [chatroomsToMessagesTable.chatroomId],
      references: [chatroomsTable.displayId],
    }),
  }),
);
