import Sketcher from '../sketcher'

const draw = () => {
  const circle = Sketcher.appendElement('circle')
  const attributes = [
    ['cx', 50],
    ['cy', 50],
    ['stroke', 'black'],
    ['fill', 'none'],
    ['r', 25],
  ]
  Sketcher.setAttributes(circle, attributes)
}

export default draw
