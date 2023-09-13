let array = new Array(10000000).fill(0);
// let array = 10000000000;
let a = "";

console.time("every");
array.every(i => {
    a = i > 10000000 ? "1" : "2";
});
console.timeEnd("every");

console.time("filter");
array.filter(i => {
    a = i > 10000000 ? "1" : "2";
});
console.timeEnd("filter");

console.time("some");
array.some(i => {
    a = i > 10000000 ? "1" : "2";
});
console.timeEnd("some");

console.time("for ForEach");
array.forEach(i => {
    a = i > 10000000 ? "1" : "2";
});
console.timeEnd("for ForEach");

console.time("for of");
for (let i of array) {
    a = i > 10000000 ? "1" : "2";
}
console.timeEnd("for of");

console.time("map");
array.map(i => {
    a = i > 10000000 ? "1" : "2";
});
console.timeEnd("map");

console.time("for");  //可通过break; 跳出
for (let i = 0; i < array; i++) {
    a = i > 10000000 ? "1" : "2";
}
console.timeEnd("for");

console.time("for in");  // 遍历原型链枚举对象属性
for (let i in array) {
    a = i > 10000000 ? "1" : "2";
}
console.timeEnd("for in");
