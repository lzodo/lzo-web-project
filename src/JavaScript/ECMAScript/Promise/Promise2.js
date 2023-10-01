/*
    异步代码处理方式
    1、回调函数
    2、以Promise为主的链式回调
    3、使用Generators
    4、async/await(Generators 优化封装好的语法糖)
*/

// ==========Promise 比回调函数更优雅的异步编程解决方案========
// promise 有 3 种状态：pending(默认)、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected
// new Promise(
//     function (resolve, reject) {
//         // 一段耗时的异步操作(只会走一个resolve或reject)
//         // 这里是同步的，resolve或reject里才是一般的
//         //resolve('成功') // 数据处理完成
//         reject('失败') // 数据处理出错

//     }
// ).then(
//     (res) => { console.log(res + 'res') },  // 成功
//     (err) => { console.log(err + 'err1') } // 第一个then有第二个失败函数,走这里,如何没有就会走catch
// ).catch(
//     (err) => { console.log(err + 'err2') } // 失败
// )

/**
 * Generator 方式
 * 一是在 function 后面，函数名之前有个 *
 * 其中 * 用来表示函数为 Generator 函数，yield 用来定义函数内部的状态
 */
function *fetchUserByGenerator() {
    const user = yield new Promise((resolve, reject) => {
       setTimeout(()=>{
           resolve('2000毫秒后1');
        },2000)
    });
    const user2 = yield new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('user2 3000毫秒后1');
         },3000)
     });
    // return user;
}

const g = fetchUserByGenerator();
const result = g.next().value;  //是一个Promise
const result2 = g.next().value;
// g.next(); 如果有 { value: Promise, done: false }
// g.next(); 没有了返回 { value: undefined, done: true }
result.then((v) => {
    console.log(v);
}, (error) => {
    console.log(error);
})

result2.then((v) => {
    console.log(v);
}, (error) => {
    console.log(error);
})

//======================================================

function* func() {
	console.log("one");
	yield "1";
	console.log("two");
	yield "2";
	console.log("three");
	return "3";
}

const f = func();
console.log(f.next()) //普通 yield return { value:"",done:false }
console.log(f.next()) //普通 yield return { value:"",done:false }
console.log(f.next()) //最后 yield return { value:"",done:true }
console.log(f.next()) //没有 yield return { value:undefined,done:true }
//第一次调用 next 方法时，从 Generator 函数的头部开始执行
//每次next()跳转下一个yield
//done 表示变量是否结束
