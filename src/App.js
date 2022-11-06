import { useEffect, useState } from "react"
import "./App.css"
import { getRandomNumber } from "./utils"

// - - - - - - - - - - - -
// NOTES:

// translate
// moves 0,0 point
// changes the origin point for scale, rotate, translate

// hsl
// hsl(hue, saturation, lightness)
// `hsl(360, 100%, 50%)`

// - - - - - - - - - - - - End Notes

// Custom

// App

function App() {
  useEffect(() => {
    createArt()
  }, [])

  const { innerWidth, innerHeight } = window

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (ev) => {
    setMousePosition({ x: ev.pageX, y: ev.pageY })
  }

  var particleArray = []

  const createArt = () => {
    // CANVAS
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    const canvasWidth = innerWidth
    const canvasHeight = innerHeight
    const centerW = canvasWidth / 2
    const centerH = canvasHeight / 2
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // PARTICLE
    // const particleArray = []

    // MOUSE
    // mousePosition.x mousePosition.y useState
    const mouseRadius = 150

    // TEXT
    ctx.fillStyle = "pink"
    // weight size family/face
    ctx.font = "900 80px Victor Mono"
    ctx.fillText("A", 0, 60)

    // GET IMAGE DATA
    // ctx.getImageData(x,y,width,height)
    const data = ctx.getImageData(0, 0, 45, 60)
    // box to check
    ctx.strokeStyle = "white"
    ctx.strokeRect(0, 0, 45, 60)

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
      }
      draw() {
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    const init = () => {
      particleArray = []
      for (let i = 0; i < 500; i++) {
        const x = getRandomNumber(0, canvasWidth)
        const y = getRandomNumber(0, canvasHeight)
        particleArray.push(new Particle(x, y))
      }
    }

    init()
    // console.log(particleArray)

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      particleArray.forEach((particle) => {
        particle.draw()
      })
      requestAnimationFrame(animate)
    }
    animate()
  }

  const showMouseData = false

  return (
    <div id="appContainer" onMouseMove={handleMouseMove}>
      {showMouseData && (
        <div id="display">
          Mouse: {mousePosition.x}, {mousePosition.y}
        </div>
      )}
      <canvas id="myCanvas">
        There seems to be an issue with canvas. Please refresh the page to try
        again.
      </canvas>
    </div>
  )
}

export default App
