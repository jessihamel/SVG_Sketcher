import seedrandom from 'seedrandom'

/**
 * The initial seed is set here is random by default, meaning
 * any code calling random() will be *non-deterministicby default.
 * The value of SEED here is logged to the console, set as the id
 * of the SVG sketch and used as the name of the export. To reproduce
 * the work (assuming no other code has changed), update the SEED value below.
 * For more information, check out the README.
 */

const SEED = Math.random()
const GLOBAL = true // Changing this to true will make Math.random() predictable globally

let random = seedrandom(SEED)
if (GLOBAL) {
  seedrandom(SEED, { global: GLOBAL })
  random = Math.random
}

export { SEED, random }
