// video Lzo-Data-Storage\Video-Big\渡一大师课

//获取canvas容器
var audioEle = document.querySelector("audio");
var cvs = document.querySelector("canvas");

//创建一个画布
var ctx = cvs.getContext("2d");

// 初始化canvas
let width = window.innerWidth * devicePixelRatio;
let height = (window.innerHeight / 2) * devicePixelRatio;
function initCvs() {
	cvs.width = width;
	cvs.height = height;
}
initCvs();

// 初始化音频
let isInit = false;
let dataArray, analyser, animationId;
audioEle.onplay = function () {
	if (isInit) {
		return;
	}
	// 初始化操作
	// 一般流程：音频源==> 调音 ==> 混响 ==> 一系列七七八八操作 ==> 经过一个个节点输出新音频
	// 这次模板：音频源==> 节点分析器 ==> 输出新音频
	//                   节点分析器 ==> 频谱分析 ==> 得到音频波形数据写入canvas

	const audCtx = new AudioContext(); // 创建音频上下文
	const source = audCtx.createMediaElementSource(audioEle); // 创建音频源节点（音频数据来源）

	// 创建分析器
	analyser = audCtx.createAnalyser();
	analyser.fftSize = 512; // 设置频谱分析窗口大小，窗口越大分析结果越细腻（2的n次幂），默认2048
	// analyser.frequencyBinCount 得到 fftSize/2 的值，波形是对称的，保存一半就够
	dataArray = new Uint8Array(analyser.frequencyBinCount); // 创建数组保存分析数据，每个项都是一个无符号8位整数
	// 连接
	source.connect(analyser); // 音频源连接分析器
	analyser.connect(audCtx.destination); // 分析器连接到输出设备

	isInit = true;
};

// 把分析出的波形绘制到canvas
function draw() {
	animationId = requestAnimationFrame(draw); // 随着屏幕刷新不断执行

	// 绘制
	ctx.clearRect(0, 0, width, height);
	if (!isInit) {
		return;
	}
	// 让单前分析得到的部分数据羞辱数组中
	analyser.getByteFrequencyData(dataArray);

	// 将得到的数据绘制到画布上
	let len = dataArray.length;
	let barWidth = width / len / 2; // 加个对称的腾一般宽度
	ctx.fillStyle = "#00AEF0";
	for (let i = 0; i < dataArray.length; i++) {
		const data = dataArray[i];
		const barHeight = (data / 255) * height; // 8位整数，一定小于256
		const x1 = width / 2 - i * barWidth;
		const x2 = i * barWidth + width / 2;
		const y = height - barHeight;

		ctx.fillRect(x1, y, barWidth, barHeight);
		ctx.fillRect(x2, y, barWidth, barHeight);
	}
}
draw();

// cancelAnimationFrame(animationId) // 停止requestAnimationFrame
