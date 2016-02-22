/*
 * Require the Fractal module
 */
var fractal = require('@frctl/fractal');

/*
 * Add a project title
 */
fractal.set('project.title', 'Patterns from The Session');

/*
 * Tell Fractal where to look for components.
 */
fractal.set('components.path', 'src/components');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.set('docs.path', 'src/docs');

/*
 * Tell Fractal which file to use for rendering previews of patterns.
 */
fractal.set('components.preview.layout', '@preview');

/*
 * Tell Fractal where to render the generated output.
 */
fractal.set('plugins.web.static.path', 'public');
