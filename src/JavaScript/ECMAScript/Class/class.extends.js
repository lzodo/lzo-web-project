class Animal {
	classProp = "Animal";
	constructor(name) {
		this.speed = 0;
		this.name = name;
		console.log(this.classProp); //自己和继承自己的类 this.classProp 都是Animal
	}
	run(speed) {
		this.speed = speed;
		console.log(`${this.name} runs with speed ${this.speed}.`);
	}
	stop() {
		this.speed = 0;
		console.log(`${this.name} 父类的 stop.`);
	}
}

let animal = new Animal("My animal");
animal.run(2);

// ========================extends=====================================

class Rabbit extends Animal {
	// 为没有自己的 constructor 的扩展类默认生成的
	// constructor(...args) {
	//   super(...args); //super(...) 来调用一个父类 constructor（只能在我们的 constructor 中）
	// }
	classProp = "Rabbit";
	constructor(name, earLength) {
		super(name); // 继承父级 constructor
		/*必须调用super
      当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
      但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。
      继承的类没有自己的构造器

      如果假假调用super() ,这边this.name = name; 的话，如果父级 this.name = "xx"+name; 字迹调用方法的时候就找不到了
      我们要保持与 父级别 constructor 逻辑相同
    */
		this.earLength = earLength;
	}

	hide() {
		console.log(`${this.name} hides!`);
	}

	stop() {
		//重写stop
		this.speed = 0;
		console.log(`Rabbit 自己的 stop.`);
		super.stop(); //super.method(...)  调用父类方法，这个super 就是 Animal
		setTimeout(() => {
			super.stop();
		}, 1000);
	}
}

let rabbit = new Rabbit("White Rabbit", 10);

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
rabbit.stop(); // Rabbit 自己的stop.
console.log(rabbit.classProp);
console.log(rabbit instanceof Rabbit); //如果rabbit 属于 Rabbit 返回true
console.log(rabbit instanceof Object); //true
