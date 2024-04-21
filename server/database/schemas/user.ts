import {
    datetime,
    mysqlTable,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: varchar("id", {
        length: 255,
    }).primaryKey(),
    username: varchar("username", {
        length: 255,
    }),
    email: varchar("email", {
        length: 255,
    }),
    password: varchar("password", {
        length: 255,
    }),
    provider: varchar("provider", {
        length: 255,
    }),
    provderId: varchar("provder_id", {
        length: 255,
    }),
    createAt: timestamp("create_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const sessions = mysqlTable("sessions", {
    id: varchar("id", {
        length: 255,
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 255,
    })
        .notNull()
        .references(() => users.id),
    expiresAt: datetime("expires_at").notNull(),
});
