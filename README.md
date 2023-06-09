# SVG SKETCHER

SVG Sketcher is a framework for developing generative SVGs with javascript. Its goal is to make developing and saving art faster for generative artists and designers. It has a number of convenience functions for this purpose including:

- Simple helpers for adding SVG elements to your sketch
- Graphics helpers for quick drawing of shapes and doing geometric calculations
- One button export of svg graphics, including an option to export for any paper size for printing or pen plotters such as [AxiDraw](https://axidraw.com/)
- Built in [random number seeding](https://www.npmjs.com/package/seedrandom) to make plots optionally reproducible
- Hot Module Replacement (HMR) via [Parcel](https://parceljs.org/) so that changes to code are reflected in the browser

![screenshot](https://github.com/jessihamel/SVG_Sketcher/blob/main/SVG_Sketcher.png?raw=true)

## Installation

SVG Sketcher uses [Parcel](https://parceljs.org/) for HMR and to load dependencies. To start the server, clone the repo and run

```bash
yarn parcel src/index.html
```

or with npx

```bash
npx parcel src/index.html
```

## Usage

### To set your sketch size

Sketch size is set in `src/constants.js`

```javascript
export const SKETCH_HEIGHT = 600;
export const SKETCH_WIDTH = 600;
```

Update these values to change the output of your sketch

### Adding svg elements to your sketch

The `draw()` function in `src/main.js` is where to start coding up your sketch.

There are a number of ways to add an element to your sketch. The easiest way is to use the convenience functions that are part of the Sketcher class.

```javascript
  draw() {
    const rect = Sketcher.appendElement('rect')
    const attributes = [
      ['width', SKETCH_WIDTH],
      ['height', SKETCH_HEIGHT],
      ['stroke', 'black'],
      ['fill', 'none'],
    ]
    Sketcher.setAttributes(rect, attributes)
  }
```

The above code uses `Sketcher.appendElement` which is a wrapper around `createElementNS` and will add the appropriate SVG namespaces for your SVG element and append it to the sketch.

SVG Sketcher also includes [d3](https://d3js.org/) by default and you can alternatively use its DOM manipulation library or vanilla javascript.

### Using graphics helpers

All graphics helpers are available under the `drawingUtils` namespace. For example:

```javascript
  draw() {
    const randomPoints = drawingUtils.randomPointsInSketch(10)
    Sketcher.pathFromCoords(randomPoints)
  }
```

The helper `drawingUtils.randomPointsInSketch(10)` generates 10 random points in the bounds of the sketch. `Sketcher.pathFromCoords(randomPoints)` is a convenience function that will create a path from the coordinates and add it to the sketch. Graphics helpers are documented with jsdoc.

### Using the random seed

Generative art/design often relies on random numbers to create designs, making it difficult for artists to reproduce their work. However, SVG sketcher uses [seedrandom](https://www.npmjs.com/package/seedrandom) to make a predictable random number generator if required. Read on for more information.

The initial seed is set in `src/seed.js` and is random by default, meaning any code calling it's export random() function will be **non-deterministic** by default. The initial seed is logged to the console, set as the id of the SVG and used as the name of the export. To reproduce the work (assuming no other code has changed), update the SEED value in `src/seed.js`

```javascript
const SEED = Math.random(); // Replace with your desired value
```

Any calls to random() in the codebase will now be **deterministic**.

(Note: by default the seed will only apply to calls to `random()` and not `Math.random()`. If you prefer to make `Math.random()` predictable globally, set `const GLOBAL` to `true`.)

### Saving

Click the `Download Sketch` button to save the output. The random seed used to generate the sketch is used as the output's name.

To save for printing, for example with a pen plotter, click `Download Sketch for Print` this will rescale your sketch to fit the given paper size with the specified margin. This is especially useful for artists who work with pen plotters and want to fit their artwork to a specific paper size. The values can be changed in `src/constants.js`

## Contributing

Pull requests and feedback are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[ISC](https://en.wikipedia.org/wiki/ISC_license)
