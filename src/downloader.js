import { PAPER_HEIGHT, PAPER_WIDTH, PAPER_MARGIN, SKETCH_HEIGHT, SKETCH_WIDTH } from './constants'

export default class Downloader {
  constructor() {
    this.createDownloadSketchLink()
    this.createDownloadSketchForPrintLink()
  }

  createDownloadSketchLink() {
    const downloadButton = this.createDownloadButton('Download sketch')
    downloadButton.onclick = () => {
      const svgElement = this.getSvg()
      this.setXmlns()
      const name = svgElement.id + '.svg'
      this.createDownload(name)
    }
  }

  createDownloadSketchForPrintLink() {
    const downloadButton = this.createDownloadButton('Download sketch for print')
    downloadButton.onclick = () => {
      const svgElement = this.getSvg()
      this.setXmlns()
      this.setPrintAttributes()
      const name = svgElement.id + '_print.svg'
      this.createDownload(name)
      this.resetPrintAttributes()
    }
  }

  createDownloadButton(description) {
    const downloadButton = document.createElement('button')
    downloadButton.style.display = 'block'
    downloadButton.style.marginTop = '12px'
    downloadButton.style.cursor = 'pointer'
    downloadButton.innerHTML = description
    document.body.appendChild(downloadButton)
    return downloadButton
  }

  createDownload(fileName) {
    const downloadLink = document.createElement('a')

    downloadLink.href = this.getSvgUrl()
    downloadLink.download = fileName

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  getSvg() {
    return document.getElementsByTagName('svg')[0]
  }

  getSvgUrl() {
    const svgData = this.getSvg().outerHTML
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    return URL.createObjectURL(svgBlob)
  }

  setPrintAttributes() {
    const svg = this.getSvg()
    svg.setAttribute('width', PAPER_WIDTH + 'in')
    svg.setAttribute('height', PAPER_HEIGHT + 'in')

    // https://oreillymedia.github.io/Using_SVG/guide/units.html
    const unitsPerInch = 96
    const marginUnits = PAPER_MARGIN * unitsPerInch

    const availableWidth = (PAPER_WIDTH - PAPER_MARGIN * 2) * unitsPerInch
    const availableHeight = (PAPER_HEIGHT - PAPER_MARGIN * 2) * unitsPerInch

    const marginSizeX = ((marginUnits * 2) / availableWidth) * SKETCH_WIDTH
    const marginSizeY = ((marginUnits * 2) / availableHeight) * SKETCH_HEIGHT

    const viewBox = [
      -marginSizeX / 2,
      -marginSizeY / 2,
      SKETCH_WIDTH + marginSizeX,
      SKETCH_HEIGHT + marginSizeY,
    ]

    svg.setAttribute('viewBox', viewBox.join(' '))
  }

  resetPrintAttributes() {
    const svg = this.getSvg()
    svg.setAttribute('width', SKETCH_WIDTH + 'px')
    svg.setAttribute('height', SKETCH_HEIGHT + 'px')
    svg.removeAttribute('viewBox')
  }

  setXmlns() {
    this.getSvg().setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }
}
