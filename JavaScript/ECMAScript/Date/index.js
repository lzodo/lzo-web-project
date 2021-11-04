//===========================基本操作======================================
/**
 * GMT（格林尼治标准时间）是一些欧洲和非洲国家正式使用的时间，
 * UTC（是国际标准）这两个时间一般情况是相等的
 *
 * Thu Nov 04 2021 08:00:00 GMT+0800 (中国标准时间) 指 中国标准时间是格林尼治标准时间 + 8小时
 * UTC或GMT 时间00:00:00的时候，我们的时间是08:00:00
 * IOS上执行new Date('1990-01-04')会得到invilaid date。处理方法是对1990-01-04转换成1990/01/04的格式
 * Thu Nov 04 2021 10:10:10 GMT+0800 (中国标准时间) 等同于UTC时间 2021-11-04T02:10:10.000Z (T指UTC时间)
 */

let NewDate = new Date("2021-11-04");
//浏览器运行结果
console.log(new Date("2021-11-04")) //Thu Nov 04 2021 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date()) //Thu Nov 04 2021 16:05:58 GMT+0800 (中国标准时间)
console.log(new Date(1636013291302)) //Thu Nov 04 2021 16:08:11 GMT+0800 (中国标准时间)
console.log(new Date('Thu Nov 04 2021 16:08:11 GMT+0800')) //Thu Nov 04 2021 16:08:11 GMT+0800 (中国标准时间)
console.log(new Date("2021-11-04T10:10:10")) //Thu Nov 04 2021 10:10:10 GMT+0800 (中国标准时间)
//node运行
console.log(new Date("2021-11-04T10:10:10")) //2021-11-04T02:10:10.000Z


//获取当前时间(从格林威治1970.1.1 00:00:00 [国内 1970.1.1 08:00:00] 开始的毫秒数)
console.log(new Date().getTime());
//获取当前毫秒数(0-999)
console.log(new Date().getMilliseconds());
//获取一分钟后的毫秒数目
console.log(new Date(new Date() + 60000).getTime());



//==========================moment插件====================================
// console.log(moment(1597809182).format());

//====================通过Date方法过去日期时间格式===========================

/*
 * 功能:返回时间
 * 描述:date.toTimeString         // 11:19:44 GMT+0800 (中国标准时间,24小时制)
 *	console.log(new Date(1597894083000).toLocaleString())      // 2020/8/20 上午11:26:29
 *	console.log(new Date().toLocaleTimeString()) //下午3:23:14
 *	console.log(new Date(1597894083000).toLocaleDateString())  // 2020/8/20
 */
const getTimeFromDate = (date) => date.toTimeString().slice(0, 8);
let time1 = getTimeFromDate(new Date()); // 09:46:08
// console.log(new Date().toTimeString())
// console.log(new Date().toLocaleString())
// console.log(new Date().toLocaleTimeString())
// console.log(new Date().toLocaleDateString())

//====================自定义方法时间戳转日期时间格式====================
dateFormat(1597809182);

function dateFormat(val, state) {
	let type = state || 0;
	let value = new Date(val);
	let year = value.getFullYear();
	let month = padDate(value.getMonth() + 1);
	let day = padDate(value.getDate());
	let hour = padDate(value.getHours());
	let minutes = padDate(value.getMinutes());
	let seconds = padDate(value.getSeconds());
	if (type == 0) {
		return (
			year +
			"-" +
			month +
			"-" +
			day +
			" " +
			hour +
			":" +
			minutes +
			":" +
			seconds
		);
	} else if (type == 1) {
		return [
			year + "-" + month + "-" + day,
			hour + ":" + minutes + ":" + seconds,
		];
	}
}
function padDate(val) {
	val = val < 10 ? "0" + val : val;
	return val;
}
