import {sayHi,obj} from './export.js';
sayHi('myfromjsFile')
obj.name = 'export.js中修改'
console.log(obj.name)


setTimeout(()=>{
	console.log(obj.name);
},3000)