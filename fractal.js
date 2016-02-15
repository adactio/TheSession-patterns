/*
 * Require the Fractal module
 */
var fractal = require('@frctl/fractal');

/*
 * Tell Fractal where to look for components.
 */
fractal.set('components.path', 'src/components');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.set('pages.path', 'src/pages');
