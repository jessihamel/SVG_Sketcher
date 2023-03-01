import Sketcher from '../sketcher'
import * as d3 from 'd3'
import * as drawingUtils from '../utils/drawing'
import { SKETCH_HEIGHT, SKETCH_WIDTH, SKETCH_MIDPOINT } from '../constants'

const draw = () => {
  // Simple paths can be made from coordinate arrays
  const coordinates = [
    [50, 50],
    [50, 200],
    [200, 200],
  ]
  const path = Sketcher.pathFromCoords(coordinates)
  Sketcher.setAttributes(path, [
    ['fill', 'none'],
    ['stroke', 'red'],
  ])

  // For more complex paths, set the "d" attribute directly
  // See: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
  const complexPathData = 'M 200 300 C 250 350, 350 350, 400 300'
  const complexPath = Sketcher.appendElement('path')
  Sketcher.setAttributes(complexPath, [
    ['d', complexPathData],
    ['fill', 'none'],
    ['stroke', 'green'],
  ])

  // D3 has a number of helpers to generate path strings
  // See: https://github.com/d3/d3-path
  const p = d3.path()
  p.moveTo(400, 400)
  p.lineTo(400, 500)
  p.bezierCurveTo(450, 600, 500, 600, 550, 500)
  p.closePath()
  const d3PathData = p.toString()
  const d3Path = Sketcher.appendElement('path')
  Sketcher.setAttributes(d3Path, [
    ['d', d3PathData],
    ['fill', 'none'],
    ['stroke', 'blue'],
  ])
}

export default draw
