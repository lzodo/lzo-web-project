let str = "ateststrs";
console.log(str.substr(1,2)) // 位置,长度 从下标1截取两个
console.log(str.substring(1,2)) // 位置1,位置2 从下标1到下标2，不包含结束位置
console.log(str.split("")) //以指定字符切割成数组
console.log(str.search("tst")) //查找指定字符串首字符下标
console.log(str.concat('-after')) //字符串连接
console.log(str.charAt(0)) // 查询第0位是什么字符
console.log(str.charCodeAt(0)) // 返回字符串第一个字符的 [0000-FFFF] 范围的 Unicode 编码(十进制值) .toString(16) => 转十六进制
console.log(str.codePointAt(0)) // [0000-FFFF] 和 超出FFFF 的所有Unicode编码
console.log(String.fromCharCode(97)); // 十进制 Unicode 转成字符 \uffff内 的十进制
console.log(JSON.parse('{"char":"\u9fa6"}')); // 字面量 Unicode 转成字符 \uffff内

console.log(str.endsWith("s")) //ates 是否以 s 结尾; 判断字符串是否以指定的子字符串结尾
console.log(str.sub()) //下标
console.log(str.fontcolor("#f00")) //shez颜色
console.log(str.link("www.baidu.com")) //a标签
console.log(new String("abc").valueOf()) // 返回指定对象的原始值 abc ,JavaScript 在后台自动调用，并不显式地出现在代码中。
