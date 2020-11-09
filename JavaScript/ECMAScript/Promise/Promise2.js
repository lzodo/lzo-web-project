/*
    异步代码处理方式
    1、回调函数
    2、以Promise为主的链式回调
    3、使用Generators
    4、async/await(Generators 优化封装好的语法糖)
*/

// ==========Promise 比回调函数更优雅的异步编程解决方案========
// promise 有 3 种状态：pending(默认)、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected
new Promise(
    function (resolve, reject) {
        // 一段耗时的异步操作(只会走一个resolve或reject)
        // 这里是同步的，resolve或reject里才是一般的
        //resolve('成功') // 数据处理完成
        reject('失败') // 数据处理出错

    }
).then(
    (res) => { console.log(res + 'res') },  // 成功
    (err) => { console.log(err + 'err1') } // 第一个then有第二个失败函数,走这里,如何没有就会走catch
).catch(
    (err) => { console.log(err + 'err2') } // 失败
)

/**
 * Generator 方式
 */
function* fetchUserByGenerator() {
    const user = yield new Promise((resolve, reject) => {
       setTimeout(()=>{
           resolve('2000毫秒后');
        },2000)
    });
    const user2 = yield new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('user2 3000毫秒后');
         },3000)
     });
    // return user;
}

const g = fetchUserByGenerator();
const result = g.next().value;
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



