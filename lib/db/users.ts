/**
 * In-memory user store — simulated DB
 * Replace this with a real database adapter (Prisma, Drizzle, etc.) when ready.
 */

export interface StoredUser {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    role: "user" | "admin";
    createdAt: Date;
}

// Module-level store (persists across requests in the same server process)
const users = new Map<string, StoredUser>();


export function findUserByEmail(email: string): StoredUser | undefined {
    return Array.from(users.values()).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    );
}

export function findUserById(id: string): StoredUser | undefined {
    return users.get(id);
}

export function createUser(
    data: Omit<StoredUser, "id" | "createdAt">
): StoredUser {
    const id = crypto.randomUUID();
    const user: StoredUser = { ...data, id, createdAt: new Date() };
    users.set(id, user);
    return user;
}
