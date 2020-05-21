(function () {
  window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback){
      window.setTimeout(callback, 16)
    }
  })()

  function setStyle (el, css) {
    for (var key in css) {
      el.style[key] = css[key]
    }
  }

  function Snow () {
    this.x = 0
    this.y = 0
    this.vy = 0
    this.vx = 0
    this.r = 0
  
    this.update()
  }
  Snow.prototype.update = function () {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * - window.innerHeight
    this.vy = 1 + Math.random() * 3
    this.vx = 0.5 - Math.random()
    this.r = 1 + Math.random() * 2
    this.o = 0.5 + Math.random() * 0.5
  }

  function SnowEffect (options) {
    opt = options || {}
    var canvas = document.createElement('canvas')
    this.ctx = canvas.getContext('2d')
    this.length = opt.num || 500
    this.clock = null
    this.width = window.innerWidth
    this.height = window.innerHeight

    setStyle(canvas, {
      pointerEvents: 'none',
      position: 'fixed',
      display: 'block',
      zIndex: opt.zIndex || 10000
    })
    canvas.className = opt.className || ''
    canvas.width = this.width
    canvas.height = this.height
    document.body.appendChild(canvas)
    this.canvas = canvas
  
    this.snowList = []
    for (var i = 0; i < this.length; i++) {
      this.snowList.push(new Snow())
    }
  }

  SnowEffect.prototype.start = function () {
    cancelAnimationFrame(this.clock)
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx.fillStyle = '#FFF'
    this.clock = requestAnimFrame(this.render.bind(this))
  }

  SnowEffect.prototype.render = function () {
    var ctx = this.ctx
    // clear
    ctx.clearRect(0, 0, this.width, this.height)
  
    for (i = 0; i < this.length; i++) {
      snow = this.snowList[i]
      snow.y += snow.vy
      snow.x += snow.vx
  
      ctx.globalAlpha = snow.o
      ctx.beginPath()
      ctx.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()
  
      if (snow.y > this.height) {
        snow.update()
      }
    }
    this.clock = requestAnimFrame(this.render.bind(this))
  }

  window.SnowEffect = SnowEffect
})()