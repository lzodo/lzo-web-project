class A {
	private age: number;
	name: string;
	constructor(age: number, name: string) {
		this.age = age;
		this.name = name;
	}
	getAge() {
		console.log(this.age);
	}
}
let a = new A(18, "lzo");
a.getAge();
console.log(a.name, "name");
// console.log(a.age, "age");
