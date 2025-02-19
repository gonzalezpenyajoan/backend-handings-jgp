const elements = ["lorem", "ipsum", "dolor", "sit", "amet"];
const index = 2;
const newValue = "furor";

const replaceAt = (arr, index, newElement) => {
    if (index < 0 || index > arr.length ){
        return arr;
    }
    const arrCopy = [...arr];
    arrCopy[index] = newElement;
    return arrCopy;
};

const result = replaceAt(elements, index, newValue);
console.log(result === elements); // false
console.log(result); // ['lorem', 'ipsum', 'furor', 'sit', 'amet'];