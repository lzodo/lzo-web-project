(function () {
    //获取canvas容器
    var can = document.getElementById('canvas1');
    can.width = '1000';
    can.height = '150';
    //创建一个画布
    var ctx = can.getContext('2d');
    //var canWid = can.width;   //canvas 的宽度
    //var canHei = can.height;   //canvas 的高度

    // ========================设置渐变=======================
    // 设置好后赋给style直接使用
    // ctx.createLinearGradient(x1, y1, x2, y2);  //定义线性渐变，渐变的起点 (x1,y1) 与终点 (x2,y2)。
    // ctx.createRadialGradient(x1, y1, r1,  x2,y2,r2, xn,yn,rn);  //定义径向渐变，渐变的起点 (x1,y1) 与.....终点 (xn,yn)。
    var RadialBg = ctx.createRadialGradient(0, 0, 29, 50, 50, 200);   //定义径向渐变
    RadialBg.addColorStop(0, '#fff');  //定义好，之后开始上色
    RadialBg.addColorStop(0.5, 'blue');
    RadialBg.addColorStop(1, '#00f');

    // ========================绘制图形=======================

    //填充矩形（x, y是横纵坐标，原点在canvas的左上角）
    ctx.fillStyle = RadialBg;
    ctx.fillRect(5, 5, 190, 140); // x,y,w,h
    //边框矩形，默认1px 黑色。   
    ctx.strokeRect(205, 5, 190, 140);
    //清除指定的矩形区域，变为透明
    ctx.clearRect(120, 15, 160, 120);//绘制动态效果时，常用来清除整个画布
    //绘制圆形
    ctx.arc(900, 75, 70, 0, 2 * Math.PI, false)   //x, y圆心，r半径，start和end是开始和结束角度，false表示顺时针（默认），true表示逆时针。
    ctx.setLineDash([10, 5]);  //这个就是设置虚线
    ctx.fillStyle = RadialBg;
    ctx.stroke()
    ctx.setLineDash([]); //清除设置设置虚线


    //========================绘制路径=======================

    //新建路径，beginPath是绘制新图形的开始
    ctx.beginPath()
    //路径（线）的起点，一般在上面这条命令后执行
    ctx.moveTo(405, 145)
    //经过的点
    ctx.lineTo(405, 25)
    //绘制弧线
    ctx.arcTo(405, 5, 425, 5, 15);    //当前端点、(x1,y1)和(x2,y2)这三个点连成的弧线，r是半径。
    ctx.lineTo(595, 5)
    //闭合路径，不是必须的，如果线的终点跟起点一样，会自动闭合。
    ctx.closePath()
    ctx.lineWidth = 3;   //线条宽度
    ctx.strokeStyle = '#00ff00'   //针对stroke()有效的颜色，取值同上。
    ctx.lineCap = 'round'  //线段端点显示的样式 butt(默认)'、'round(圆弧)'、'square(方形)
    ctx.lineJoin = 'bevel' //miter(默认)'、round(圆角)、`bevel(横线)
    //通过线条绘制轮廓（边框）
    ctx.stroke()

    //==================绘制虚线=================

    var offset = 0;
    function draw() {
        offset++;
        if (offset > 160) {
            offset = 0;
        }
        ctx.clearRect(600, 0, 200, 150);
        ctx.setLineDash([10, 5]);  //这个就是设置虚线
        ctx.strokeStyle = '#666'
        ctx.lineDashOffset = -offset;
        ctx.lineCap = 'square'
        ctx.strokeRect(605, 5, 190, 140);

        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        window.requestAnimationFrame(draw) //等到以上操作完成后,再有第二次执行
    }
    // setInterval(draw, 20);
    window.requestAnimationFrame(draw)
    //==================填充路径=================

    ctx.beginPath();
    ctx.moveTo(595, 5)
    ctx.lineTo(595, 145)
    ctx.lineTo(405, 145)
    //设置样式
    ctx.fillStyle = 'red'   //针对fill()有效的颜色，还可以取值：'#fff'、'rgba(0, 0, 0, 0.5)'等。
    ctx.globalAlpha = 0.5;   //透明度
    //通过路径填充区域（实心）
    ctx.fill()

    //==================绘制文字=================
    ctx.shadowOffsetX = 2;     //X轴阴影距离，负值表示往上，正值表示往下
    ctx.shadowOffsetY = 2;     //Y轴阴影距离，负值表示往左，正值表示往右
    ctx.shadowBlur = 2;     //阴影的模糊程度
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";    //阴影颜色
    ctx.font = "30px Times New Roman";    //设置字体和字体大小
    ctx.textAlign = 'left';    //设置水平位置 start, end, left, right or center
    ctx.textBaseline = 'top'  //设置垂直位置 top, hanging, middle, alphabetic, ideographic, bottom
    //ctx.direction = 'inherit'   //ltr, rtl, inherit(无效)
    ctx.fillStyle = RadialBg;
    ctx.fillText("Sample String", 140, 45);    //实体文字
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeText('Hello world', 210, 80);    //边框文字

    //==================绘制图片=================
    //这里的img可以是一个img对象，也可以是一个img元素。
    var strokeImg = new Image();
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
    strokeImg.src = './img/4.jpg';
    strokeImg.onload = function () {
        ctx.drawImage(strokeImg, 790, 0, 80, 80);
    }
})()