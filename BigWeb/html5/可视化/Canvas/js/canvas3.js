(function () {
	//获取canvas容器
	var can = document.getElementById('canvas3');
	can.width = '78';
	can.height = '104';
	//创建一个画布
	var ctx = can.getContext('2d');
	var strokeImg = new Image();
	strokeImg.src = './img/giszc.png';

	var strokeImgCen = new Image();
	strokeImgCen.src = './img/4.jpg';
	strokeImgCen.style.borderRadius = '10px';

	strokeImg.onload = function () {
		ctx.drawImage(strokeImg, 0, 0, 78, 104);
		ctx.drawImage(strokeImgCen, 20, 25, 34, 34);
		can.toBlob(function (blob) {
			// var url = URL.createObjectURL(blob); // 生成blob 类型的图片路径
			var url = can.toDataURL('image/png',.5); // 生成base64 类型的图片路径,toDataURL(类型,质量)
			document.getElementById('warp').innerHTML = '<img src="' + url + '">';
		}, 'image/png');

		// 下载画布图片
		// download("#canvas3")
		// FileSaverDownload("#canvas3")
	}


	/**
	 * 优点：只使用浏览器提供的原生 API 就能实现我们的需求。
	 * 缺点：无法被异步代码包裹，也就是包含 Ajax 请求的情况下代码不生效。
	 * 缺点：对于分辨率过高的 canvas, 我们生成的 dataURL 过长，超过浏览器限制，可能会导致无法顺利下载，如出现此现象请参考下面介绍的方法。
	 * @param {*} selector 画布ID
	 *
	 */
	function download(selector) {
		// 通过 API 获取目标 canvas 元素
		const canvas = document.querySelector(selector);

		// 创建一个 a 标签，并设置 href 和 download 属性
		const el = document.createElement('a');
		// 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
		el.href = canvas.toDataURL();
		el.download = '文件名称';

		// 创建一个点击事件并对 a 标签进行触发
		const event = new MouseEvent('click');
		el.dispatchEvent(event);
	}

	// 插件 FileSaver.min.js 方式下载
	function FileSaverDownload(selector){
		// 通过 API 获取目标 canvas 元素
		const canvas = document.querySelector(selector);
		// 如果 toBlob 方法出现兼容性问题建议引入 https://github.com/eligrey/canvas-toBlob.js
		canvas.toBlob(function(blob) {
		  saveAs(blob, '文件名称')
		});
	}

})()
