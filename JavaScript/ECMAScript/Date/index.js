//===========================基本操作======================================
/**
 * ISO 8601 国际标准化组织的国际标准ISO 8601是日期和时间的表示方法（1998、2000、2004等版本）
 * GMT（格林尼治标准时间）是一些欧洲和非洲国家正式使用的时间，
 * UTC（是国际标准）这两个时间一般情况是相等的
 *
 * Thu Nov 04 2021 08:00:00 GMT+0800 (中国标准时间) 指 中国标准时间是格林尼治标准时间 + 8小时(偏移量)
 * UTC或GMT 时间00:00:00的时候，我们的时间是08:00:00
 * IOS上执行new Date('1990-01-04')会得到invilaid date。处理方法是对1990-01-04转换成1990/01/04的格式
 * Thu Nov 04 2021 10:10:10 GMT+0800 (中国标准时间) 等同于UTC时间 2021-11-04T02:10:10.000Z (T指UTC时间)
 */

//new Date 里的参数默认中国标准时间
let NewDate = new Date("2021-11-04");
console.log('===============日期基础===================')
//浏览器运行结果
console.log(new Date("2021-11-04")) //Thu Nov 04 2021 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date()) //Thu Nov 04 2021 16:05:58 GMT+0800 (中国标准时间)
console.log(new Date(1636013291302)) //Thu Nov 04 2021 16:08:11 GMT+0800 (中国标准时间)
console.log(new Date('Thu Nov 04 2021 16:08:11 GMT+0800')) //Thu Nov 04 2021 16:08:11 GMT+0800 (中国标准时间)
console.log(new Date("2021-11-04T10:10:10")) //Thu Nov 04 2021 10:10:10 GMT+0800 (中国标准时间)
//node运行 (ISO 8601)
console.log(new Date("2021-11-04T10:10:10")) //2021-11-04T02:10:10.000Z


//获取当前时间(从格林威治1970.1.1 00:00:00 [国内 1970.1.1 08:00:00] 开始的毫秒数)
console.log(new Date().getTime());
//获取当前毫秒数(0-999)
console.log(new Date().getMilliseconds());
//获取一分钟后的毫秒数目
console.log(new Date(new Date() + 60000).getTime());
//获取星期
console.log(new Date().getDay());

//方法返回指定日期在月中的第几天（从 1 到 31）。
console.log(new Date().getDate(),'getDate');
console.log(new Date('2021-11-05 07:59:59').getUTCDate(),'getUTCDate'); //中国标准上午八点之前，获取到的是前一天

//getUTCHours 与 getHours
console.log(new Date('2021-11-05 08:00:00').getHours(),'getHours'); //8
console.log(new Date('2021-11-05 08:00:00').getUTCHours(),'getUTCDate'); //0


console.log('===============end===================')

//====================通过Date方法过去日期时间格式===========================

/*
 * 功能:返回时间
 * 描述:date.toTimeString         // 11:19:44 GMT+0800 (中国标准时间,24小时制)
 *	console.log(new Date(1597894083000).toLocaleString())      // 2020/8/20 上午11:26:29
 *	console.log(new Date().toLocaleTimeString()) //下午3:23:14
 *	console.log(new Date(1597894083000).toLocaleDateString())  // 2020/8/20
 */

 //获取24制小时
 const getTimeFromDate = (date) => date.toTimeString().slice(0, 8);
 let time1 = getTimeFromDate(new Date()); // 09:46:08


 console.log('========转换输出格式=============')
 console.log(new Date().toLocaleString()) //2021/11/5 上午11:50:41
 console.log(new Date().toLocaleTimeString()) //上午11:50:41
 console.log(new Date().toLocaleDateString()) //2021/11/5

  console.log(new Date().toISOString()); //转ISO标准，日期格式 2021-11-05T03:47:35.756Z
  console.log(new Date().toUTCString()); //Fri, 05 Nov 2021 03:45:22 GMT (推荐)
  console.log(new Date().toGMTString()); //Fri, 05 Nov 2021 03:45:22 GMT (不推荐)

  console.log(new Date().toString()); //中国标准时间(默认)
  console.log(new Date().toTimeString()); //中国标准时间后半部分
  console.log(new Date().toDateString()); //中国标准时间日期部分
  console.log('========end=============')

//==========================ISO 8601============================================
console.log('===============ISO 8601 操作===================')
// 	日期表示方法 2004-05-03 或 20040503 或 2004-125 或 2004125(平年365天，闰年366天)
console.log(moment('20040503').format());
console.log(moment('2021-001').format()); //直接用天表示

//星期表示
console.log(moment("2021-W46-7").format()); //2021年 第46个 星期天

//时分秒
/**
 * UTC时间下午2点30分5秒
 * 		表示为14:30:05Z或143005Z (UTC时间最后加一个大写字母Z)
 * 		北京时间表示为22:30:05+08:00或223005+0800 (223005+08,223005中国标准是UTC时间+8后的结果)
 *		可以认为Z(偏移0标准时间) -> UTC；+0800(偏移8小时0分) -> 中国标准
 */

 //毫秒
 //14:30:05.123

//日期和时间的组合表示法
/**
 * 用空格或 T 分割日期与时间
 * 如要表示北京时间2004年5月3日下午5点30分8秒，可以写成2004-05-03T17:30:08+08:00或20040503T173008+08。
 * 20040503T173008,123
 * 20040503T173008.123
 *
 */

// js new Date() 转ISO标准，日期格式字符串
console.log(new Date().toISOString());
console.log('===============end===================')

//==========================RFC 2822 日期时间格式=============================



//==========================moment插件====================================
//moment() 支持 ISO 8601 格式字符串
console.log('================moment插件==================');
//操作本地时间
moment().format()
//操作utc时间
moment.utc().format()

//时间戳转日期时间，转换成UTC时间 + 8时的中国标准时间
console.log(moment(1636076224000).format()); //2021-11-05T09:37:04+08:00 => UTC时间+8时得到 2021-11-05T09:37:04

//将当前时间转日期时间
console.log(moment(new Date()).format());
console.log(moment().format());

//将UTC时间转本地标准时间
console.log(moment("2010-10-20T4:30:00Z", "YYYY-MM-DD HH:mm Z").format()); // 解析为 UTC 时间 4:30
console.log(moment("2010-10-20T4:30:00Z", "YYYY-MM-DD HH:mm").format());   // 解析为当地时间 4:30。

//自定义格式输出日期时间
console.log(moment("2010-01-01T05:06:07").format('YYYY/MM/DD HH:mm:ss.SSS'));
console.log(moment(new Date()).format('YYYY/MM/DD HH@mm@ss-SSS'));

//毫秒与秒转日期时间
console.log(moment(1318781876406).format()); //毫秒转日期时间
console.log(moment.unix(1318781876).format()); //秒转日期时间

//日期时间转时间戳
console.log(moment("2021-11-05T09:37:04+08:00").valueOf());


console.log('=============end=====================');

//====================自定义方法时间戳转日期时间格式====================
dateFormat(1597809182);
new Date().to
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
