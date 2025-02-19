"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStudent = isStudent;
exports.isTeacher = isTeacher;
function isStudent(user) {
    return user.occupation !== undefined;
}
function isTeacher(user) {
    return user.subject !== undefined;
}
