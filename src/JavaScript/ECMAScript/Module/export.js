import * as StandardModule from './resetExport.js';

window.user = 'us';

export let obj = {'name':'默认名字'}

export function sayHi(user) {
    console.log(`Hello, ${user}!`);
}

export default function defaultSayHi(user) {
    console.log(`Hello default, ${user}!`);
}

// export default class User {
//   constructor(name) {
//     this.name = name;
//     console.log(this.name)
//   }
// }


export {rsname} from './resetExport.js'; // 重新导出命名的导出
// export {default as rsage} from './resetExport.js'; // 重新导出默认的导出