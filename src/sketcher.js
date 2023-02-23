import * as d3 from 'd3'
import Downloader from './downloader'
import { SEED } from './seed'

import * as constants from './constants'

class Sketcher {
  constructor() {
    const SKETCH_NAME = SEED

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.setAttribute('width', constants.SKETCH_WIDTH + 'px')
    this.svg.setAttribute('height', constants.SKETCH_HEIGHT + 'px')
    this.svg.setAttribute('id', SKETCH_NAME)
    this.svg.setAttribute('class', 'sketch')
    this.svg.style.backgroundColor = constants.BACKGROUND_COLOR

    document.body.appendChild(this.svg)

    new Downloader()

    console.log(SEED)
  }

  getSvg() {
    return this.svg
  }

  /**
   * Convenience wrapper around document.createElementNS
   * @param {string} elementNS - Svg element name i.e. 'rect', 'line', 'path'
   * @param {SVGElement} [target] - The target element the new element should be appended to, will be appended to parent SVG if not provided
   * @returns {SVGElement} The appended element
   */
  appendElement(elementNS, target) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', elementNS)
    ;(target || this.svg).appendChild(element)
    return element
  }

  /**
   * Convenience method around setAttribute, allows for setting multiple attributes of an SVG element including text.
   * @param {SVGElement} element
   * @param {Array<string, number | string>} attributes
   * @returns {SVGElement}
   */
  setAttributes(element, attributes) {
    attributes.forEach(([attribute, value]) => {
      if (attribute === 'text') {
        this.createAndSetTextAttribute(element, value)
        return element
      }
      element.setAttribute(attribute, value)
    })
    return element
  }

  createAndSetTextAttribute(element, value) {
    const textNode = document.createTextNode(value)
    element.appendChild(textNode)
    return element
  }

  /**
   * Create an svg path element from a given set of coordinates
   * @param {Array<[number, number]>} coords
   * @param {SVGElement} [target] - The target element the new element should be appended to, will be appended to parent SVG if not provided
   * @returns {SVGElement}
   */
  pathFromCoords(coords, target) {
    const pathEl = this.appendElement('path', target)
    if (coords.length < 2) {
      return pathEl
    }
    this.setAttributes(pathEl, [
      ['d', d3.line()(coords)],
      ['stroke', 'black'],
      ['fill', 'none'],
    ])
    return pathEl
  }
}

const sketcherInstance = new Sketcher()

export default sketcherInstance
