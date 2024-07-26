var A = /** @class */ (function () {
    function A(age, name) {
        this.age = age;
        this.name = name;
    }
    A.prototype.getAge = function () {
        console.log(this.age);
    };
    return A;
}());
var a = new A(18, "lzo");
a.getAge();
console.log(a.name, "name");
// console.log(a.age, "age");
