import Sketcher from '../sketcher'
import * as drawingUtils from '../utils/drawing'
import { SKETCH_HEIGHT, SKETCH_WIDTH, SKETCH_MIDPOINT } from '../constants'

const draw = () => {
  const yellow = '#FFCC00'
  const sunSize = 50
  const raySize = 200
  const nRays = 20

  const circle = Sketcher.appendElement('circle')
  const attributes = [
    ['r', sunSize],
    ['cx', SKETCH_WIDTH / 2],
    ['cy', SKETCH_HEIGHT / 2],
    ['fill', yellow],
  ]
  Sketcher.setAttributes(circle, attributes)

  for (let i = 0; i < nRays; i++) {
    const angle = (Math.PI * 2 * i) / nRays
    const p0 = drawingUtils.pointOnCircle(SKETCH_MIDPOINT, sunSize + 10, angle)
    const p1 = drawingUtils.pointOnCircle(SKETCH_MIDPOINT, raySize, angle)
    const line = Sketcher.pathFromCoords([p0, p1])
    Sketcher.setAttributes(line, [['stroke', yellow]])
  }
}

export default draw
