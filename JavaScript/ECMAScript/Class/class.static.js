/*
 * 把一个方法赋值给类的函数本身，而不是赋给它的 "prototype",以关键字static开头
 * 静态方法 this 的值是类构造器 myStatic 自身
 * 静态属性和方法可以被继承与重写
 */
class myStatic {
    static stname = "myStaticName"
    static staticMethod() {
        console.log(this === myStatic);
    }
}

myStatic.staticMethod2 = function(){
	console.log('from staticMethod2')
}

class extStat extends myStatic{
	static stname = "extStatName"
}

myStatic.staticMethod();
myStatic.staticMethod2();
// Object.key()   //Object的静态方法
console.log(myStatic.stname)
console.log(extStat.stname)