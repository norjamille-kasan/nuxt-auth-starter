import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessions, users } from "../database/schemas/user";
import { Lucia } from "lucia";
// adapter
export const adapter = new DrizzleMySQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            email: attributes.email,
            id: attributes.id,
        };
    },
    sessionCookie: {
        // IMPORTANT!
        attributes: {
            // set to `true` when using HTTPS
            secure: !process.dev,
        },
    },
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
    email: string;
    id: string;
}
