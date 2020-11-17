(function() {
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
	    ctx.drawImage(strokeImg, 0, 0, 78,104);
		ctx.drawImage(strokeImgCen, 20, 25, 34,34);
		can.toBlob(function(blob) {
			var url = URL.createObjectURL(blob);
		    document.getElementById('warp').innerHTML = '<img src="'+ url +'">';
		}, 'image/png');
	}

	// function base64Img2Blob(code) {
	// 	var parts = code.split(';base64,');
	// 	var contentType = parts[0].split(':')[1];
	// 	var raw = window.atob(parts[1]);
	// 	var rawLength = raw.length;

	// 	var uInt8Array = new Uint8Array(rawLength);

	// 	for (var i = 0; i < rawLength; ++i) {
	// 		uInt8Array[i] = raw.charCodeAt(i);
	// 	}

	// 	return new Blob([uInt8Array], {
	// 		type: contentType
	// 	});
	// }

	// function downloadFile(fileName, content) {

	// 	var aLink = document.createElement('a');
	// 	var blob = base64Img2Blob(content); //new Blob([content]);

	// 	var evt = document.createEvent("HTMLEvents");
	// 	evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
	// 	aLink.download = fileName;
	// 	aLink.href = URL.createObjectURL(blob);

	// 	aLink.dispatchEvent(evt);
	// }
	// downloadFile('ship.png', can.toDataURL("image/png"));



})()
