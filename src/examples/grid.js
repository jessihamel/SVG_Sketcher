import Sketcher from '../sketcher'
import * as drawingUtils from '../utils/drawing'

const draw = () => {
  const [grid, cellSize] = drawingUtils.generateGrid(10, 10)

  const nSides = 6

  // Scale to be a little smaller than the smallest cell size
  const size = Math.min(cellSize[0] / 2, cellSize[1] / 2) * 0.8

  grid.forEach(c => {
    const polygonPts = drawingUtils.generateRegularPolygon(nSides, size, c)
    // We can easily turn an array of points to a path by using a Sketcher helper method
    const polygon = Sketcher.pathFromCoords(polygonPts)
    // And we can change the color
    Sketcher.setAttributes(polygon, [['stroke', '#6fb98f']])
  })
}

export default draw
