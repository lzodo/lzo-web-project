let str = "ateststrs";
console.log(str.substr(1,2)) // 位置,长度 从下标1截取两个
console.log(str.substring(1,2)) // 位置1,位置2 从下标1到下标2，不包含结束位置
console.log(str.split("")) //以指定字符切割成数组
console.log(str.search("tst 可正则")) //查找指定字符串首字符下标
console.log(str.concat('-after')) //字符串连接
console.log(str.charAt(0)) // 查询第0位是什么字符
console.log(str.charCodeAt(0)) // 返回字符串第一个字符的 [0000-FFFF] 范围的 Unicode 编码(十进制值) .toString(16) => 转十六进制
console.log(str.codePointAt(0)) // [0000-FFFF] 和 超出FFFF 的所有Unicode编码
console.log(String.fromCharCode(97)); // 十进制 Unicode 转成字符 \uffff内 的十进制
console.log(JSON.parse('{"char":"\u9fa6"}')); // 字面量 Unicode 转成字符 \uffff内
console.log(escape("一")) //得到Unicode编码
console.log(str.endsWith("s")) //ates 是否以 s 结尾; 判断字符串是否以指定的子字符串结尾
console.log(str.sub()) //下标
console.log(str.fontcolor("#f00")) //shez颜色
console.log(str.link("www.baidu.com")) //a标签
console.log(new String("abc").valueOf()) // 返回指定对象的原始值 abc ,JavaScript 在后台自动调用，并不显式地出现在代码中。



// 编码
//不会对ASCII 字母、数字、点、基础标点符号(:=?# 等)进行编码
escape("一") // '%u4E00' 得到Unicode编码  (0-255 是普通十六进制 如：ÿ -> %FF)
unescape("%u4e00") //解 escape 的编码

//不会对ASCII 字母、数字、点、基础标点符号(:=?# 等)进行编码
encodeURI("一") //'%E4%B8%80' 得到utf-8编码,通过%隔开
decodeURI('%E4%B8%80|%u4e00') //解encodeURI的编码，和 escape 的编码

//不会对ASCII 字母、数字、点 进行编码
encodeURIComponent("一");
decodeURIComponent('%E4%B8%80') //解encodeURI的编码

//差别encodeURI 和 encodeURIComponent
//encodeURIComponent 转意了用于分割URI各个部分的标点符号
encodeURI("http://www.baidu.com?a=一#cc");
'http://www.baidu.com?a=%E4%B8%80#cc'

encodeURIComponent("http://www.baidu.com?a=一#cc");
'http%3A%2F%2Fwww.baidu.com%3Fa%3D%E4%B8%80%23cc'
