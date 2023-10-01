function execTasks(tasks, limit) {
	return new Promise((resolev, reject) => {
		let nextIndex = 0; // 下一次任务的索引
		let finistCount = 0; //已完成数量

		function _run() {
			// 运行任务
			let task = tasks[nextIndex];
			nextIndex++;

			task().then(() => {
				finistCount++;
				// 判断还有没有下一个任务
				if (nextIndex < tasks.length) {
					_run();
				} else {
					// 判断已完成数量是否等于任务总数
					if (finistCount == tasks.length) {
						console.log("全部执行完成");
						resolev("全部执行完成");
					}
				}
			});
		}

		// 2、同时执行的任务个数
		for (let i = 0; i < limit && i < tasks.length; i++) {
			_run();
		}
	});
}

// 1、创建1000个异步任务
execTasks(
	new Array(20).fill().map(
		(item, index) =>
			function () {
				return new Promise((resolev, reject) => {
					console.time(`time_${index}`);
					console.log(
						`开始执行时间：${new Date().getMinutes()}分${new Date().getSeconds()}秒`
					);

					setTimeout(() => {
						console.timeEnd(`time_${index}`);
						resolev();
					}, Math.floor(Math.random() * 1000)); // 异步任务执行时间
				});
			}
	),
	3
);
