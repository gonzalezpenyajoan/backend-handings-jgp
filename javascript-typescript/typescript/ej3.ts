import { User, isStudent, isTeacher } from './types';

const users: User[] = [
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

const logUser = (user: User) => {
    let extraInfo: string;
    if (isStudent(user)) {
      extraInfo = user.occupation;
    } else if (isTeacher(user)) {
      extraInfo = user.subject;
    } else {
        extraInfo = '';
    }
    console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

users.forEach(logUser);