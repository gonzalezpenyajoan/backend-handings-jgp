import { ObjectId } from "mongodb";
import { Role } from "#core/models/role.model.js";

export interface User {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: Role;
}