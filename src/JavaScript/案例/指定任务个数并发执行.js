function execTasks(tasks, limit) {
  return new Promise((resolev, reject) => {
    let nextIndex = 0 // 下一次任务的索引
    let finistCount = 0 //已完成数量
    let resList = []
    function _run() {
      // 运行任务
      let task = tasks[nextIndex]
      nextIndex++

      // 如果是await 调接口，这边可以用trycatch 在finally中调用下一个_run
      task().then((res) => {
        finistCount++
        resList[res[1]] = res[0] // 不直接用push，保证顺序
        // 判断还有没有下一个任务
        if (nextIndex < tasks.length) {
          _run()
        } else {
          // 判断已完成数量是否等于任务总数
          if (finistCount == tasks.length) {
            console.log('全部执行完成,结果是' + resList)
            resolev('全部执行完成,结果是' + resList)
          }
        }
      })
    }

    // 2、同时执行的任务个数
    for (let i = 0; i < limit && i < tasks.length; i++) {
      _run()
    }
  })
}

// 1、创建1000个异步任务
execTasks(
  new Array(20).fill().map(
    (item, index) =>
      function () {
        return new Promise((resolev, reject) => {
          console.time(`time_${index}`)
          console.log(`开始执行时间：${new Date().getMinutes()}分${new Date().getSeconds()}秒`)

          setTimeout(() => {
            console.timeEnd(`time_${index}`)
            resolev(['success ' + index, index])
          }, Math.floor(Math.random() * 1000)) // 异步任务执行时间
        })
      },
  ),
  3,
)

// =============================================================以前实现方案
// function limitRequest(urls = [], limit = 3) {
//     return new Promise((resolve, reject) => {
//         const len = urls.length;
//         let count = 0;

//         // 同时启动limit个任务
//         while (limit > 0) {
//             start();
//             limit -= 1;
//         }

//         function start() {
//             const url = urls.shift(); // 从数组中拿取第一个任务
//             if (url) {
//                 console.log(url);
//                 setTimeout(() => {
//                     if (count == len - 1) {
//                         // 最后一个任务完成
//                         resolve();
//                     } else {
//                         // 完成之后，启动下一个任务
//                         count++;
//                         start();
//                     }
//                 }, 2000);
//             }
//         }
//     });
// }

// // 测试
// limitRequest([
//     "http://xxa",
//     "http://xxb",
//     "http://xxc",
//     "http://xxd",
//     "http://xxe",
//     "http://xxf",
// ]).then(() => {
//     console.log("已经全部完成");
// });
