const cvs = document.createElement('canvas')

document.body.appendChild(cvs)

const ctx = cvs.getContext('2d')

function init() {
  cvs.width = window.innerWidth * devicePixelRatio
  cvs.height = window.innerHeight * devicePixelRatio
}

init()

/**
 * 设置范围内的随机整数
 * @param {*} min
 * @param {*} max
 * @return {Number}
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

class Point {
  constructor() {
    this.r = 6
    this.x = getRandom(0, cvs.width - this.r / 2)
    this.y = getRandom(0, cvs.height - this.r / 2)
    this.xSpeed = getRandom(-50, 50) // 50 // 横向移动速度
    this.ySpeed = getRandom(-50, 50) // 纵向移动速度
    this.lastMoveTime = null //最后移动时间
  }
  draw() {
    // 心跳效果
    // this.xSpeed = getRandom(-50, 50) // 50 // 横向移动速度
    // this.ySpeed = getRandom(-50, 50) // 纵向移动速度
    // 如果不是第一次画
    if (this.lastMoveTime) {
      // 计算新的位置
      const time = (Date.now() - this.lastMoveTime) / 1000
      const x = this.x + this.xSpeed * time
      const y = this.y + this.ySpeed * time

      // 设置边界
      if (x < 0 || x > cvs.width - this.r) {
        this.xSpeed = -this.xSpeed
      }
      if (y < 0 || y > cvs.height - this.r) {
        this.ySpeed = -this.ySpeed
      }
      this.x = x
      this.y = y
    }
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgb(200,200,200)'
    ctx.fill()
    this.lastMoveTime = Date.now() // 纪录绘制时间
  }
}

/**
 * 创建一个图，很多点组成
 * @pointNumber 点的个数
 * @maxDis 最大距离 但超过最大距离就把线隐藏
 */
class Graph {
  constructor(pointNumber = 30, maxDis = 500) {
    this.points = new Array(pointNumber).fill(0).map(() => new Point())
    this.maxDis = maxDis
  }
  draw() {
    requestAnimationFrame(() => {
      this.draw()
    })
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i]
      p1.draw()
      for (let j = 0; j < this.points.length; j++) {
        const p2 = this.points[j]
        // 平方根
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        if (d > this.maxDis) {
          continue
        }
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.closePath()
        ctx.strokeStyle = `rgba(200,200,200,${1 - d / this.maxDis})`
        ctx.stroke()
      }
    }
  }
}

const g = new Graph(30, 500)
g.draw()
