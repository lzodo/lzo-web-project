(function(){
    //获取canvas容器
    var can = document.getElementById('canvas2');
    can.width = '1000';
    can.height = '150';
    //创建一个画布
    var ctx = can.getContext('2d');

    // =========状态的保存于恢复==============
    ctx.fillStyle = 'black';
    ctx.fillRect(5, 5, 190, 140);
    ctx.save();  //保存当前状态(保存状态后之前设置的颜色、边框等一系列设置将保存起来之后的设置不受之前设置的影响)
    ctx.fillStyle= '#fff';
    ctx.fillRect(20, 20, 160, 110);
    ctx.restore(); //恢复到刚才保存的状态(取回之前save保存的设置,save之后设置的样式不影响后续操作)
    ctx.fillRect(50,50,100,50);

    // =========位移 ctx.translate(x,y)==============
    for(var i = 0; i< 3; i++) {
      ctx.save();   //使用save方法保存状态，让每次位移时都针对（0，0）移动。
      ctx.translate(60*i, 0);
      ctx.fillRect(210, 50, 50, 50);
      ctx.restore();
    }

     // =========缩放 ctx.scale(x, y)==============
    ctx.save();
    ctx.scale(1, .7);    
    ctx.fillRect(405, 5, 190,140);
    ctx.restore();
     // =========旋转 ctx.rotate(Math.PI * 2)==============
     ctx.save();
     ctx.translate(700,0)
     ctx.rotate(45 * Math.PI/180);    
     ctx.fillRect(0, 0,50,50);
     ctx.restore();

     // =========动画=========
     // setTimeout 和setInterval 
     // requestAnimationFrame(myFun);(请求动画帧,根据一定的时间间隔，会自动执行myFun函数来进行绘制)

     // ==========贝塞尔曲线=========
     // 二次贝塞尔: 起始点 ctx.quadraticCurveTo(x1,y1：控制点1,x3,y3:结束点)
     // 三次贝塞尔: 起始点 ctx.quadraticCurveTo(x1,y1：控制点1,x2,y2：控制点2，x3,y3:结束点)
     ctx.save();
     ctx.beginPath()
     ctx.moveTo(805,5)
     ctx.quadraticCurveTo(995,20,995,145)
     ctx.closePath();
     ctx.stroke();
     ctx.restore();
})()