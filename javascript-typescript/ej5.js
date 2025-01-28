const compact = (arg) => {
    if (!arg) {
        return null
    } else if (Array.isArray(arg)) {
        const newArray = []
        arg.forEach(element => {
            const parsed = compact(element);
            if (parsed) newArray.push(parsed);
        })
        return newArray;
    } else if (typeof arg === "object") {
        const newObject = {};
        Object.keys(arg).forEach(key => {
            const parsed = compact(arg[key]);
            if (parsed) newObject[key] = parsed;
        })
        return newObject;
    }
    return arg;
}

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}