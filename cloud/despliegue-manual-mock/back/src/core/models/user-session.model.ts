import { Role } from "./role.model.js";

export interface UserSession {
    id: String;
    role: Role;
}