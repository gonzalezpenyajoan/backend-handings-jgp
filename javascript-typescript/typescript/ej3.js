"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
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
var logUser = function (user) {
    var extraInfo;
    if ((0, types_1.isStudent)(user)) {
        extraInfo = user.occupation;
    }
    else if ((0, types_1.isTeacher)(user)) {
        extraInfo = user.subject;
    }
    else {
        extraInfo = '';
    }
    console.log("  - ".concat(user.name, ", ").concat(user.age, ", ").concat(extraInfo));
};
users.forEach(logUser);
