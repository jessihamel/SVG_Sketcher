import * as d3 from 'd3'
import Sketcher from '../sketcher'
import * as drawingUtils from '../utils/drawing'
import { SKETCH_MIDPOINT } from '../constants'

const draw = () => {
  const blue0 = '#2377A4'
  const blue1 = '#50A3C6'
  const snowflakeSize = 200
  const nEdges = 7 // Number of "spokes" for the snowflake
  const nSpikes = 5 // Number of spikes on each edge

  // https://github.com/d3/d3-random#randomUniform
  const spikeSizeRandom = d3.randomUniform(40, 90)
  const spikeAngleRandom = d3.randomUniform(Math.PI / 6, Math.PI / 2)

  const p0 = SKETCH_MIDPOINT
  const p1 = drawingUtils.pointOnCircle(SKETCH_MIDPOINT, snowflakeSize, 0)
  const edgeCoordinates = [p0, p1] // Defines a single edge

  const spikeCoordinates = [] // Will hold coordinate data for each spike

  const split = drawingUtils.splitVector(p0, p1, snowflakeSize / nSpikes)

  for (let i = 1; i < nSpikes; i++) {
    const spikeAngle = spikeAngleRandom()
    const spikeSize = spikeSizeRandom()

    const s0 = split[i]
    const s1 = drawingUtils.pointOnCircle(s0, spikeSize, spikeAngle)
    const s2 = drawingUtils.pointOnCircle(s0, spikeSize, -spikeAngle)

    spikeCoordinates.push([s1, s0, s2])
  }

  // Repeats the edge around the circle
  for (let i = 0; i < nEdges; i++) {
    const angle = (Math.PI * 2 * i) / nEdges
    const rotatedEdge = drawingUtils.rotateAll(SKETCH_MIDPOINT, edgeCoordinates, angle))
    const edge = Sketcher.pathFromCoords(rotatedEdge)
    Sketcher.setAttributes(edge, [['stroke', blue0]])

    spikeCoordinates.forEach(s => {
      const spike = drawingUtils.rotateAll(SKETCH_MIDPOINT, s, angle)
      const l0 = Sketcher.pathFromCoords(spike)
      Sketcher.setAttributes(l0, [['stroke', blue1]])
    })
  }
}

export default draw
