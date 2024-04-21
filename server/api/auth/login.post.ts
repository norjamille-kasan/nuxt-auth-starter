import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { users } from "~/server/database/schemas/user";

export default eventHandler(async (event) => {
    const request = await readBody<{
        email: string;
        password: string;
    }>(event);

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, request.email));
    if (existingUser.length === 0) {
        throw createError({
            message: "Incorrect email or password",
            statusCode: 400,
        });
    }
    const validPassword = await new Argon2id().verify(
        existingUser[0].password!,
        request.password
    );

    if (!validPassword) {
        throw createError({
            message: "Incorrect username or password",
            statusCode: 400,
        });
    }

    const session = await lucia.createSession(existingUser[0].id, {});
    const { name, value } = lucia.createSessionCookie(session.id);
    setCookie(event, name, value);
    return {
        message: "Login successfully",
    };
});
