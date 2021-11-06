/**
 * 表示集合的数据结构
 * Array、Object、Map、Set
 * es6提供一种统一的接口机制，来处理所有不同的数据结构（Iterator）
 * 任何数据结构只要部署Iterator接口，就可以完成遍历操作
 * 作用:
 *     各种数据结构，提供一个统一的、简便的访问接口
 * 	   使得数据结构的成员能够按某种次序排列
 *     创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费
 * 过程:
 *     创建一个指针对象，指向当前数据结构的起始位置
 *     第一次调用指针对象的next方法,指向第一个成员，第二次第二个成员，直到最后一个成员
 *     每一次调用next方法 返回value和done对象
 */
// var it = makeIterator(["a", "b"]);

// console.log(it.next()); // { value: "a", done: false }
// console.log(it.next()); // { value: "b", done: false }
// console.log(it.next()); // { value: undefined, done: true }

// function makeIterator(array) {
// 	var nextIndex = 0;
// 	return {
// 		next: function () {
// 			return nextIndex < array.length
// 				? { value: array[nextIndex++], done: false }
// 				: { value: undefined, done: true };
// 		},
// 	};
// }
let iterable = {
	a: "a",
	b: "b",
	1:1,
	c: "c",
};

for (var key of Object.keys(iterable)) {
	console.log(key + ": " + iterable[key]);
}
