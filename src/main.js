import { SKETCH_HEIGHT, SKETCH_MIDPOINT, SKETCH_WIDTH } from './constants'
import * as examples from './examples'
import Sketcher from './sketcher.js'
import * as drawingUtils from './utils/drawing'

function draw() {
  // This is the draw function. Use it to create your sketch.
  // Below are some simple lines of code to get you started.

  // First, let's start by logging the svg we're working with:
  console.log(Sketcher.getSvg())
  // If you open the console in your browser, you should see it. Something like: <svg id="...">
  // You can always get the base svg DOM element by calling Sketcher.getSvg()

  // Now let's add a border to our sketch:
  const rect = Sketcher.appendElement('rect')
  const borderAttributes = [
    ['width', SKETCH_WIDTH],
    ['height', SKETCH_HEIGHT],
    ['stroke', 'black'],
    ['fill', 'none'],
  ]
  Sketcher.setAttributes(rect, borderAttributes)

  // Let's add a circle too.
  const circle = Sketcher.appendElement('circle')
  const circleAttributes = [
    ['r', 110],
    ['cx', SKETCH_WIDTH / 2],
    ['cy', SKETCH_HEIGHT / 2],
    ['stroke', '#004445'],
    ['fill', 'none'],
  ]
  Sketcher.setAttributes(circle, circleAttributes)

  // We can add more svg elements, this way, but let's look at some of the other helper methods.
  // Let's start by making a polygon, let's use the drawingUtil to do it.
  const nSides = 8
  const size = 130
  const polygonPts = drawingUtils.generateRegularPolygon(nSides, size, SKETCH_MIDPOINT)
  // We can easily turn an array of points to a path by using a Sketcher helper method
  const polygon = Sketcher.pathFromCoords(polygonPts)
  // And we can change the color
  Sketcher.setAttributes(polygon, [['stroke', '#6fb98f']])

  // Now let's add a bunch more polygons, this time rotating them around and making them a bit bigger
  for (let i = 0; i < 10; i++) {
    const angle = (i * 2 * Math.PI) / 10
    const newSize = size + i * 10
    const polygonPts = drawingUtils.generateRegularPolygon(nSides, newSize, SKETCH_MIDPOINT)
    // We can easily turn an array of points to a path by using a Sketcher helper method
    const polygon = Sketcher.pathFromCoords(
      drawingUtils.rotateAll(SKETCH_MIDPOINT, polygonPts, angle)
    )
    // And we can change the color
    Sketcher.setAttributes(polygon, [['stroke', i % 2 ? '#004445' : '#6fb98f']])
  }

  // Let's finish by adding some text
  const text = Sketcher.appendElement('text')
  Sketcher.setAttributes(text, [
    ['text', 'Welcome to SVG Sketcher!'],
    ['x', SKETCH_MIDPOINT[0]],
    ['y', SKETCH_MIDPOINT[1]],
    ['fill', '#011c1d'],
    ['text-anchor', 'middle'],
    ['font-family', 'monospace'],
    ['font-size', '12px'],
    ['dy', '6px'],
  ])

  // If you'd like to explore more, check out some of the examples in src/examples
  // Or uncomment the examples below.
  // examples.rect()
  // examples.circle()
  // examples.path()
  // examples.grid()
  // examples.sun()
  // examples.snowflake()
}

draw()
