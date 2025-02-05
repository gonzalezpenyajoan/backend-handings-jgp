import { UserRepository } from "./user.repository.js";
import { db } from "#dals/mock-data.js";

export const mockRepository: UserRepository = {
    getUser: async (email: string, password: string) =>
        db.users.find((u) => u.email === email && u.password === password)
};