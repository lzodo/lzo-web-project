window.addEventListener("load",(e)=>{
	document.addEventListener("click",(e)=>{
		console.log(e)
		console.log(e.target)
		console.log(`clientX ${e.clientX} - ${e.clientY}`)
		console.log(`pageX ${e.pageX} - ${e.pageY}`)
		console.log(`screenX ${e.screenX} - ${e.screenY}`)
		console.log(`offsetX ${e.offsetX} - ${e.offsetY}`) // 点击位置相对于当前点击的DOM元素左上角的位置
		console.log(`layerX ${e.layerX} - ${e.layerY}`) // 点击位置，冒泡方向，有position定位元素，定位元素的 offsetX/offsetY 值,否则 == pageX/pageY
		console.log(`tiltX ${e.tiltX} - ${e.tiltY}`) // 指针（触控笔）的 XZ 平面与屏幕之间的角度,正值 向用户倾斜，不支持位0
	})
	document.addEventListener("keyup",(e)=>{
		console.log(e)
	})
	document.addEventListener("mousemove",(e)=>{
		//console.log(`movementX ${e.movementX} - ${e.movementY}`) // 鼠标移动的时候，这次相对上次移动的距离（移动慢基本是 0 1 -1 -2）
	})

	// 创建自定义事件
    // const event = new Event('build');
    // 创建 自定义 e 属性的对象
    const event = new CustomEvent('build', { detail: "elem.dataset.time" });
    // 监听它
    document.addEventListener('build', (e) => {
		console.log(e)
	}, false);
    // 触发它
	setTimeout(()=>{
		document.dispatchEvent(event);
	},5000)
})
