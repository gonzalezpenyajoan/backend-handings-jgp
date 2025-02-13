declare namespace Express {
    export type Role = 'admin' | 'standard-user';
    export interface UserSession {
        id: String;
        role: Role;
    }

    export interface Request {
        userSession?: UserSession;
    }
}