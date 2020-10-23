/*
 *  它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)
 *  柯里化不会调用函数。它只是对函数进行转换
 */


function errcurry(f) { // curry(f) 执行柯里化转换
    return function(a) {
        return function(b) {
            return f(a, b);
        };
    };
}

// 用法
function sum(a, b) {
    return a + b;
}
let curriedSum = errcurry(sum);
console.log(curriedSum(1)(2)); // 3

//====================================================


function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) { //如果调用的参数个数和 >= 原函数sum2的
            return func.apply(this, args); //直接执行返回结果
        } else {
            return function(...args2) { //如果调用的参数个数和 <= 原函数sum2的 继续向下叠加
                //将已有的参数 加上下一次()调用的参数
                //如果参数不够就停了,则只能返回这个函数体了
                return curried.apply(this, args.concat(args2));  
            }
        }
    };
}


// 用法
function sum2(a, b,c) {
    return a + b +c;
}
let curriedSum2 = curry(sum2);
console.log(curriedSum2(1)(2)(6)); // 3


// lodash方法
let curriedSum3 = _.curry(sum2);
console.log(curriedSum3(1)(2)); // 3

