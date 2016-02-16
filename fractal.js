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
fractal.set('pages.path', 'src/docs');

/*
 * Tell Fractal which file to use for rendering previews of patterns.
 */
fractal.set('components.preview.layout', '@preview');

/*
 * Tell Fractal where to render the generated output.
 */
fractal.set('plugins.web.static.path', 'public');
