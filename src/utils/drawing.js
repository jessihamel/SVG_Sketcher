import { SKETCH_HEIGHT, SKETCH_WIDTH } from '../constants'
import { random } from '../seed'

/**
 * Returns either 1 or -1. Useful in conjunction with other functions for generating random positive or negative.
 * @returns {number}
 */
export const posOrNeg = () => (random() > 0.5 ? 1 : -1)

/** Returns a random angle in radians */
export const randomAngle = () => random() * Math.PI * 2

/**
 * Returns a random point within the bounds of the sketch size
 * @returns {[number, number]}
 */
export const randomPointInSketch = () => [random() * SKETCH_WIDTH, random() * SKETCH_HEIGHT]

/**
 * Returns multiple random points within the bounds of the sketch size
 * @param {number} nPoints
 * @returns {Array<[number, number]>}
 */
export const randomPointsInSketch = nPoints => {
  const points = []
  for (let i = 0; i < nPoints; i++) {
    points.push(randomPointInSketch())
  }
  return points
}

/**
 * Whether or not the given point is within the bounds of the sketch
 * @param {[number, number]} p
 * @returns {boolean}
 */
export const pointIsInSketch = p =>
  0 <= p[0] && p[0] <= SKETCH_WIDTH && 0 <= p[1] && p[1] <= SKETCH_HEIGHT

/**
 * Converts cartesian to polar coordinates
 * @param {[number, number]} p - [x, y]
 * @returns {[number, number]} p - [r, theta]
 */
export const cartesianToPolar = ([x, y]) => [Math.sqrt(x ** 2 + y ** 2), Math.atan2(y, x)]

/**
 * Converts polar coordinates to cartesian
 * @param {[number, number]} p - [r, theta]
 * @returns {[number, number]} p - [x, y]
 */
export const polarToCartesian = ([r, theta]) => [r * Math.cos(theta), r * Math.sin(theta)]

export const angleBetweenPoints = (p1, p2) => Math.atan2(p2[1] - p1[1], p2[0] - p1[0])

/**
 * Returns point p1 rotated around point p0
 * @param {[number, number]} p0 anchor point
 * @param {[number, number]} p1 point to rotate
 * @param {[number, number]} theta angle
 * @returns [number, number] rotated point
 */
export const rotatePt = (p0, p1, theta) => {
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  const x = cos * (p1[0] - p0[0]) - sin * (p1[1] - p0[1]) + p0[0]
  const y = cos * (p1[1] - p0[1]) + sin * (p1[0] - p0[0]) + p0[1]
  return [x, y]
}

/**
 * Returns point p1 rotated around point p0
 * @param {[number, number]} p0 anchor point
 * @param {Array<[number, number]>} coordinates collection of points to rotate
 * @param {[number, number]} theta angle
 * @returns Array<[number, number]> rotated coordinates
 */
export const rotateAll = (p0, coordinates, theta) => {
  return coordinates.map(c => rotatePt(p0, c, theta))
}

/**
 * Reutrns a point on a circle with center p, radius r
 * @param {[number, number]} p The center of the circle
 * @param {number} r The radius of the circle
 * @param {number} theta The degrees in radians
 * @returns {[number, number]}
 */
export const pointOnCircle = (p, r, theta) => {
  const [x0, y0] = polarToCartesian([r, theta])
  return [p[0] + x0, p[1] + y0]
}

/**
 * Returns array of coordinates that roughly describe an of the given radius and centroid.
 * Useful for creating arcs that are path elements.
 * @param {number} r
 * @param {[number, number]} centroid
 * @param {number} startAngle
 * @param {number} endAngle
 * @param {number} [segementLength]
 * @returns {Array<[number, number]>}
 */
export const generateArcCoords = (r, centroid, startAngle, endAngle, segmentLength = 5) => {
  const d = r * (endAngle - startAngle)
  const circleCoords = []
  const nSegments = Math.max(Math.ceil(d / segmentLength), 4)
  for (let i = 0; i <= nSegments; i++) {
    const theta = startAngle + (i / nSegments) * (d / r)
    const [x, y] = polarToCartesian([r, theta])
    circleCoords.push([x + centroid[0], y + centroid[1]])
  }
  return circleCoords
}

/**
 * Returns array of coordinates that roughly describe a circle of the given radius and centroid.
 * Useful for creating circles that are path elements.
 * @param {number} r
 * @param {[number, number]} centroid
 * @param {number} [segementLength]
 * @returns {Array<[number, number]>}
 */
export const generateCircleCoords = (r, centroid, segementLength = 5) => {
  const d = r * Math.PI * 2
  const circleCoords = []
  const nSegments = Math.max(Math.ceil(d / segementLength), 4)
  for (let i = 0; i <= nSegments; i++) {
    const theta = (i / nSegments) * 2 * Math.PI
    const [x, y] = polarToCartesian([r, theta])
    circleCoords.push([x + centroid[0], y + centroid[1]])
  }
  return circleCoords
}

/**
 * Generates a regular polygon with the given parameters
 * @param {number} nSides - the number of sides
 * @param {number} size
 * @param {[number, number]} centroid
 * @returns {Array<[number, number]>}
 */
export const generateRegularPolygon = (nSides, size, centroid) => {
  const coordinates = []
  for (let i = 0; i < nSides; i++) {
    const theta = (i * 2 * Math.PI) / nSides
    const pt = polarToCartesian([size, theta])
    coordinates.push([pt[0] + centroid[0], pt[1] + centroid[1]])
  }
  coordinates.push(coordinates[0])
  return coordinates
}

/**
 * Returns a grid of given nColumns and nRows. The first value in the returned array are its points (midpoints of each cell).
 * The second value returned is the cellSizeX and cellSizeY
 * @param {*} nColumns - the number of columns
 * @param {number} nRows - the number of rows
 * @returns {[Array<[number, number]>, [number, number]]}
 */
export const generateGrid = (nColumns, nRows) => {
  const coordinates = []
  const cellSizeX = SKETCH_WIDTH / nColumns
  const cellSizeY = SKETCH_HEIGHT / nRows
  for (let i = 0; i < nColumns; i++) {
    const x = cellSizeX * i + cellSizeX / 2
    for (let j = 0; j < nRows; j++) {
      const y = cellSizeY * j + cellSizeY / 2
      coordinates.push([x, y])
    }
  }
  coordinates.cellSizeX = cellSizeX
  coordinates.cellSizeY = cellSizeY
  return [coordinates, [cellSizeX, cellSizeY]]
}

/**
 * Returns the midpoint of two points
 * @param {[number, number]} p0
 * @param {[number, number]} p1
 * @returns {[number, number]}
 */
export const midPoint = (p0, p1) => [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]

/**
 * Subdivides any svg path into points with the segment length
 * @param {SVGPathElement} el
 * @param {number} [segementLength]
 * @returns {Array<[number, number]>}
 */
export const getPointsAlongSvgPath = (el, segementLength = 10) => {
  const length = el.getTotalLength()
  const points = []
  for (let i = 0; i < length; i += segementLength) {
    const { x, y } = el.getPointAtLength(i)
    points.push([x, y])
  }
  return points
}

/**
 * Subdivides a vector from p0 to p1 into points with the approximate segment length
 * @param {[number, number]} p0
 * @param {[number, number]} p1
 * @param {number} [segmentLength]
 * @returns {Array<[number, number]>}
 */
export const splitVector = (p0, p1, segmentLength = 10) => {
  const xDistance = p1[0] - p0[0]
  const yDistance = p1[1] - p0[1]
  const [r, theta] = cartesianToPolar([xDistance, yDistance])

  const iterations = Math.round(r / segmentLength)
  const fractionalDistance = r / iterations

  const coords = []
  for (let i = 0; i <= iterations; i++) {
    const r = fractionalDistance * i
    const newX = p0[0] + Math.cos(theta) * r
    const newY = p0[1] + Math.sin(theta) * r
    coords.push([newX, newY])
  }
  return coords
}
