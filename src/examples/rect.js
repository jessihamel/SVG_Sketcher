import Sketcher from '../sketcher'

const draw = () => {
  const rect = Sketcher.appendElement('rect')
  const attributes = [
    ['height', 100],
    ['stroke', 'black'],
    ['fill', 'none'],
    ['width', 100],
    ['x', 10],
    ['y', 10],
  ]
  Sketcher.setAttributes(rect, attributes)
}

export default draw
