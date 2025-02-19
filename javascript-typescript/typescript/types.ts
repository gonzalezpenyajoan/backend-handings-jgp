export interface Student {
    name: string;
    age: number;
    occupation: string;
}

export function isStudent(user: User): user is Student {
    return (user as Student).occupation !== undefined;
}

export interface Teacher {
    name: string;
    age: number;
    subject: string;
}

export function isTeacher(user: User): user is Teacher {
    return (user as Teacher).subject !== undefined;
}

export type User = Student | Teacher;