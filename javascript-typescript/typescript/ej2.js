"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users = [
    {
        name: "Luke Patterson",
        age: 32,
        occupation: "Internal auditor",
    },
    {
        name: "Jane Doe",
        age: 41,
        subject: "English",
    },
    {
        name: "Alexandra Morton",
        age: 35,
        occupation: "Conservation worker",
    },
    {
        name: "Bruce Willis",
        age: 39,
        subject: "Biology",
    },
];
var logUser = function (_a) {
    var name = _a.name, age = _a.age;
    console.log("  - ".concat(name, ", ").concat(age));
};
users.forEach(logUser);
