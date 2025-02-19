"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var students = [
    {
        name: "Luke Patterson",
        age: 32,
        occupation: "Internal auditor",
    },
    {
        name: "Emily Coleman",
        age: 25,
        occupation: "English",
    },
    {
        name: "Alexandra Morton",
        age: 35,
        occupation: "Conservation worker",
    },
    {
        name: "Bruce Willis",
        age: 39,
        occupation: "Placement officer",
    },
];
var filterStudentsBy = function (students, criteria) {
    return students.filter(function (student) {
        var criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every(function (fieldName) {
            return criteria[fieldName] === student[fieldName];
        });
    });
};
var logStudent = function (_a) {
    var name = _a.name, occupation = _a.occupation;
    console.log("  - ".concat(name, ", ").concat(occupation));
};
console.log("Students of age 35:");
filterStudentsBy(students, { age: 35 }).forEach(logStudent);
