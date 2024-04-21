import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { users } from "~/server/database/schemas/user";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
    const request = await readBody<{
        username: string;
        email: string;
        password: string;
    }>(event);

    const hashedPassword = await new Argon2id().hash(request.password);
    const userId = generateId(15);

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, request.email));

    if (existingUser.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email already exist",
        });
    }

    await db.insert(users).values({
        id: userId,
        username: request.username,
        email: request.email,
        password: hashedPassword,
    });
    const session = await lucia.createSession(userId, {});
    const { name, value } = lucia.createSessionCookie(session.id);
    setCookie(event, name, value);
    return {
        message: "User has been registered",
    };
});
