class More {

    constructor(name, age) {
        // 调用 setter
        this.name = name;
        this.age = age;
    }

    name2 = '内置名称'; //类字段 在每个独立对象中被设好，而不是设在 User.prototype


    get name() {
        console.log('用户获取名称属性')
        return this._name;
    }

    set name(value) {
        console.log('用户设置名称属性')
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }

    get age() {
        console.log('用户获取年龄属性')
        return this._age;
    }

    set age(value) {
        console.log('用户设置年龄属性')
        if (value < 10) {
            console.log("小孩子");
            return;
        }
        this._age = value;
    }

}

let more = new More("John", 3);
console.log(more.name); // John
console.log(more.name2);
console.log(more.age);
console.log(More.prototype.name2);


// more = new More(""); // Name is too short.
